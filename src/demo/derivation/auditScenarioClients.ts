export type ScenarioAuditIssue = { id: string; category: string; sourceEntityId: string; clientName: string; demoRunId: string; reservationId?: string; expedienteId?: string; severity: "critical" | "repairable" | "warning"; reason: string; repairable: boolean };
export type ScenarioAuditCategoryResult = { category: string; reviewed: number; valid: number; defective: number; critical: number; repairable: number; warnings: number };
export type ScenarioAuditResult = { reviewed: number; valid: number; defective: number; critical: number; repairable: number; warnings: number; categories: ScenarioAuditCategoryResult[]; issues: ScenarioAuditIssue[] };
export type ScenarioRequestedCounts = { reservations: number; vapiLogs: number; sellerReports: number; messages: number };

const categorySources = [
  ["Marta Voz / VAPI", "martaSignals"],
  ["Registro de Seguimiento Comercial", "commercialFollowUps"],
  ["Mensajes entre el Equipo", "internalMessages"],
] as const;

const sourceKeyByCategory = Object.fromEntries(categorySources.map(([category, sourceKey]) => [category, sourceKey])) as Record<string, string>;

const issue = (record: any, category: string, severity: ScenarioAuditIssue["severity"], reason: string): ScenarioAuditIssue => ({
  id: `${category}-${record?.id || record?.sourceEntityId || record?.reservationId || "unknown"}-${reason}`,
  category,
  sourceEntityId: record?.sourceEntityId || record?.id || record?.reservationId || "unknown",
  clientName: record?.clientName || record?.name || record?.client?.name || "Sin cliente",
  demoRunId: record?.demoRunId || "",
  reservationId: record?.reservationId,
  expedienteId: record?.expedienteId,
  severity,
  reason,
  repairable: severity === "repairable",
});

export function auditScenarioClients(scenarios: any[], liveExpedientes: any[], demoRunId: string, requestedCounts?: ScenarioRequestedCounts): ScenarioAuditResult {
  const issues: ScenarioAuditIssue[] = [];
  const seenReservations = new Set<string>();
  const seenExpedientes = new Set<string>();
  const sourceOccurrences = new Map<string, number>();

  scenarios.forEach((scenario) => categorySources.forEach(([, sourceKey]) => (scenario[sourceKey] || []).forEach((signal: any) => {
    const sourceEntityId = signal?.sourceEntityId || signal?.id;
    if (sourceEntityId) sourceOccurrences.set(sourceEntityId, (sourceOccurrences.get(sourceEntityId) || 0) + 1);
  })));

  scenarios.forEach((scenario) => {
    const reservation = scenario.reservation || scenario.client;
    if (!scenario.demoRunId || scenario.demoRunId !== demoRunId) issues.push(issue(reservation, "Gestión de Reservas", "critical", "demoRunId inválido"));
    if (scenario.demoPurpose !== "operational-scenario" || reservation?.demoPurpose !== "operational-scenario") issues.push(issue(reservation, "Gestión de Reservas", "critical", "Registro ajeno al escenario operacional"));
    if (!scenario.reservationId || !scenario.expedienteId) issues.push(issue(reservation, "Gestión de Reservas", "critical", "Falta identidad de reserva o expediente"));
    if (seenReservations.has(scenario.reservationId)) issues.push(issue(reservation, "Gestión de Reservas", "critical", "reservationId duplicado")); else seenReservations.add(scenario.reservationId);
    if (seenExpedientes.has(scenario.expedienteId)) issues.push(issue(reservation, "Gestión de Reservas", "critical", "expedienteId duplicado")); else seenExpedientes.add(scenario.expedienteId);
    const liveExpediente = liveExpedientes.find((item) => item.demoRunId === demoRunId && item.reservationId === scenario.reservationId && item.expedienteId === scenario.expedienteId);
    if (!liveExpediente) issues.push(issue(reservation, "Gestión de Reservas", "critical", "LiveExpediente inexistente"));
    else if (liveExpediente.demoPurpose !== "operational-scenario") issues.push(issue(reservation, "Gestión de Reservas", "critical", "Registro ajeno al escenario operacional"));

    categorySources.forEach(([category, sourceKey]) => (scenario[sourceKey] || []).forEach((signal: any) => {
      const auditRecord = { ...signal, demoRunId: scenario.demoRunId, client: scenario.client, clientName: scenario.client?.name || reservation?.name };
      const sourceEntityId = signal?.sourceEntityId || signal?.id;
      if (!sourceEntityId || (sourceOccurrences.get(sourceEntityId) || 0) !== 1) {
        issues.push(issue(auditRecord, category, "critical", "sourceEntityId ausente o ambiguo"));
        return;
      }
      if (signal.demoPurpose !== "operational-scenario") {
        issues.push(issue(auditRecord, category, "critical", "Registro ajeno al escenario operacional"));
        return;
      }
      if (signal.demoRunId !== scenario.demoRunId || signal.reservationId !== scenario.reservationId || signal.expedienteId !== scenario.expedienteId) {
        issues.push(issue(auditRecord, category, "repairable", "Identidad relacional incompleta o no coincide con ScenarioClient"));
      }
    }));
  });

  if (requestedCounts) {
    const generatedByCategory: Array<[string, number, number]> = [
      ["Gestión de Reservas", requestedCounts.reservations, scenarios.length],
      ["Marta Voz / VAPI", requestedCounts.vapiLogs, scenarios.reduce((total, scenario) => total + (scenario.martaSignals?.length || 0), 0)],
      ["Registro de Seguimiento Comercial", requestedCounts.sellerReports, scenarios.reduce((total, scenario) => total + (scenario.commercialFollowUps?.length || 0), 0)],
      ["Mensajes entre el Equipo", requestedCounts.messages, scenarios.reduce((total, scenario) => total + (scenario.internalMessages?.length || 0), 0)],
    ];
    generatedByCategory.forEach(([category, requested, generated]) => {
      if (requested !== generated) issues.push(issue({ id: `quantity-${category}`, demoRunId, clientName: "Configuración de escenario" }, category, "critical", `Cantidad solicitada ${requested}; cantidad generada ${generated}`));
    });
  }

  const reviewed = scenarios.length + scenarios.reduce((total, scenario) => total + categorySources.reduce((sum, [, sourceKey]) => sum + (scenario[sourceKey]?.length || 0), 0), 0);
  const categories = ["Gestión de Reservas", ...categorySources.map(([category]) => category)].map((category) => {
    const categoryIssues = issues.filter((item) => item.category === category);
    const categoryReviewed = category === "Gestión de Reservas" ? scenarios.length : scenarios.reduce((total, scenario) => total + (scenario[categorySources.find(([name]) => name === category)?.[1] || ""]?.length || 0), 0);
    return { category, reviewed: categoryReviewed, valid: Math.max(0, categoryReviewed - categoryIssues.length), defective: categoryIssues.length, critical: categoryIssues.filter((item) => item.severity === "critical").length, repairable: categoryIssues.filter((item) => item.severity === "repairable").length, warnings: categoryIssues.filter((item) => item.severity === "warning").length };
  });
  return { reviewed, valid: Math.max(0, reviewed - issues.length), defective: issues.length, critical: issues.filter((item) => item.severity === "critical").length, repairable: issues.filter((item) => item.severity === "repairable").length, warnings: issues.filter((item) => item.severity === "warning").length, categories, issues };
}

export function repairScenarioClients(scenarios: any[], issues: ScenarioAuditIssue[], demoRunId: string) {
  const repairableIssues = issues.filter((item) => item.severity === "repairable" && sourceKeyByCategory[item.category]);
  const occurrences = new Map<string, Array<{ scenario: any; signal: any }>>();
  scenarios.forEach((scenario) => {
    if (scenario.demoRunId !== demoRunId) return;
    categorySources.forEach(([, sourceKey]) => (scenario[sourceKey] || []).forEach((signal: any) => {
      const sourceEntityId = signal?.sourceEntityId || signal?.id;
      if (!sourceEntityId) return;
      const matches = occurrences.get(sourceEntityId) || [];
      matches.push({ scenario, signal });
      occurrences.set(sourceEntityId, matches);
    }));
  });
  const repairTargets = new Set<string>();
  repairableIssues.forEach((item) => {
    const matches = occurrences.get(item.sourceEntityId) || [];
    const match = matches[0];
    if (matches.length !== 1 || !match || match.scenario.demoRunId !== demoRunId || item.demoRunId !== demoRunId) return;
    const clientName = match.scenario.client?.name || match.scenario.reservation?.name || "Sin cliente";
    if (!match.scenario.reservationId || !match.scenario.expedienteId || item.reservationId !== match.signal.reservationId || item.clientName !== clientName) return;
    repairTargets.add(`${item.category}:${item.sourceEntityId}`);
  });
  const repairedSourceEntityIds: string[] = [];
  const nextScenarios = scenarios.map((scenario) => {
    if (scenario.demoRunId !== demoRunId) return scenario;
    let changed = false;
    const nextScenario = { ...scenario };
    categorySources.forEach(([category, sourceKey]) => {
      nextScenario[sourceKey] = (scenario[sourceKey] || []).map((signal: any) => {
        const sourceEntityId = signal?.sourceEntityId || signal?.id;
        if (!repairTargets.has(`${category}:${sourceEntityId}`)) return signal;
        changed = true;
        repairedSourceEntityIds.push(sourceEntityId);
        return { ...signal, sourceEntityId, demoRunId: scenario.demoRunId, reservationId: scenario.reservationId, expedienteId: scenario.expedienteId };
      });
    });
    return changed ? nextScenario : scenario;
  });
  return { scenarios: nextScenarios, repairedSourceEntityIds };
}

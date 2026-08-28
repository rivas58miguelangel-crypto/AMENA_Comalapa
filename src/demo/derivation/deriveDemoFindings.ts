import type {
  DemoFindingSource,
  DemoFindingEvidence,
  DemoInjectedFinding,
} from "../domain/demoFindings";

type ReservationEvidence = {
  id: string;
  demoRunId: string;
  name: string;
  unit: string;
  source: string;
  reservationStatus: string;
  createdAt: string;
  expedienteId?: string;
};

type TeamMessageEvidence = {
  id: string;
  demoRunId: string;
  relatedClientName: string;
  fromRole: string;
  toRole: string;
  messageText: string;
  topic: string;
  priority: string;
  createdAt: string;
  expedienteId?: string;
};

type SellerReportEvidence = {
  id: string;
  demoRunId: string;
  clientName: string;
  sellerName: string;
  interactionType: string;
  summary: string;
  detectedNeed: string;
  objection: string;
  nextStep: string;
  priority: string;
  createdAt: string;
  expedienteId?: string;
};

type VapiEvidence = {
  id: string;
  demoRunId: string;
  clientName: string;
  callId: string;
  detectedIntent: string;
  transcriptSummary: string;
  nextStep: string;
  riskSignal: string;
  createdAt: string;
  expedienteId?: string;
  structuredOutput?: {
    wantsFinancing?: boolean;
    documentsPending?: boolean;
    familyDecisionPending?: boolean;
    urgencyLevel?: string;
  };
};

type DeriveDemoFindingsInput = {
  demoRunId: string;
  generatedAt: string;
  reservationClients: ReservationEvidence[];
  internalMessages: TeamMessageEvidence[];
  sellerReports: SellerReportEvidence[];
  vapiCallLogs: VapiEvidence[];
};

const evidence = (
  findingId: string,
  demoRunId: string,
  sourceEntityId: string | undefined,
  expedienteId: string | undefined,
  sourceCreatedAt: string | undefined,
  label: string,
  summary: string,
  source: DemoFindingSource,
  adminTargetPage: DemoInjectedFinding["adminTargetPage"],
  adminTargetSection: string,
): DemoFindingEvidence => ({
  id: sourceEntityId || `${findingId}-evidence`,
  label,
  summary,
  source,
  demoRunId,
  sourceType: source,
  sourceEntityId,
  expedienteId,
  sourceCreatedAt,
  provenance: `FASE 04 · ${source}`,
  adminTargetPage,
  adminTargetSection,
  adminTargetDetail: label,
  adminTargetAnchor: `${findingId}-${adminTargetPage}`,
});

const validSourceTimestamp = (value: string | undefined): string | undefined => {
  if (!value || !/^\d{4}-\d{2}-\d{2}T/.test(value)) return undefined;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : value;
};

const forRun = <T extends { demoRunId: string }>(records: T[], demoRunId: string) =>
  records.filter((record) => record.demoRunId === demoRunId);

const highestPriority = <T extends { priority: string }>(records: T[]) =>
  records.find((record) => record.priority === "Alta") || records[0];

export function deriveDemoFindings({
  demoRunId,
  generatedAt,
  reservationClients,
  internalMessages,
  sellerReports,
  vapiCallLogs,
}: DeriveDemoFindingsInput): DemoInjectedFinding[] {
  const reservations = forRun(reservationClients, demoRunId);
  const messages = forRun(internalMessages, demoRunId);
  const reports = forRun(sellerReports, demoRunId);
  const vapiLogs = forRun(vapiCallLogs, demoRunId);
  const findings: DemoInjectedFinding[] = [];

  const reservation = reservations[0];
  if (reservation) {
    const findingId = `${demoRunId}-finding-reservation`;
    findings.push({
      id: findingId,
      demoRunId,
      title: `Expediente vivo para ${reservation.name}`,
      summary: `${reservation.name} reservó ${reservation.unit} desde ${reservation.source}; la reserva está ${reservation.reservationStatus.toLowerCase()} y debe conservarse como contexto del seguimiento.`,
      severity: reservation.reservationStatus === "En progreso" ? "medium" : "low",
      source: "reservations",
      adminTargetPage: "client",
      adminTargetSection: "Reserva y contexto del cliente",
      operationalRecommendation: "La reserva, unidad y fuente deben permanecer visibles antes de realizar el siguiente contacto humano.",
      recommendedAction: "La vendedora asignada debe revisar el contexto de reserva y registrar el siguiente paso en el Expediente Vivo.",
      responsibleRole: "Vendedora asignada",
      responsibleArea: "Coordinación Comercial",
      evidenceIds: [reservation.id],
      sourceTimestamp: validSourceTimestamp(reservation.createdAt),
      sourceEntityId: reservation.id,
      expedienteId: reservation.expedienteId,
      generatedAt,
      associatedEvidence: [evidence(
        findingId,
        demoRunId,
        reservation.id,
        reservation.expedienteId,
        reservation.createdAt,
        `${reservation.name} · ${reservation.unit}`,
        `Reserva ${reservation.id} · ${reservation.reservationStatus} · ${reservation.createdAt}`,
        "reservations",
        "client",
        "Reserva y contexto del cliente",
      )],
      visibleStatus: "pending",
      timestamp: generatedAt,
    });
  }

  const message = highestPriority(messages);
  if (message) {
    const findingId = `${demoRunId}-finding-team-message`;
    findings.push({
      id: findingId,
      demoRunId,
      title: `Coordinación pendiente para ${message.relatedClientName}`,
      summary: `${message.fromRole} envió a ${message.toRole} una coordinación de prioridad ${message.priority.toLowerCase()}: ${message.topic}.`,
      severity: message.priority === "Alta" ? "high" : "medium",
      source: "team_messages",
      adminTargetPage: "executive",
      adminTargetSection: "Coordinación operacional prioritaria",
      operationalRecommendation: "La coordinación interáreas debe conservar responsable, prioridad y siguiente movimiento verificable.",
      recommendedAction: `${message.toRole} debe revisar el mensaje y dejar evidencia del siguiente movimiento para ${message.relatedClientName}.`,
      responsibleRole: message.toRole,
      responsibleArea: "Coordinación Operacional",
      evidenceIds: [message.id],
      sourceTimestamp: validSourceTimestamp(message.createdAt),
      sourceEntityId: message.id,
      expedienteId: message.expedienteId,
      generatedAt,
      associatedEvidence: [evidence(
        findingId,
        demoRunId,
        message.id,
        message.expedienteId,
        message.createdAt,
        `${message.relatedClientName} · ${message.topic}`,
        `Mensaje ${message.id} · ${message.priority} · ${message.messageText}`,
        "team_messages",
        "executive",
        "Coordinación operacional prioritaria",
      )],
      visibleStatus: "pending",
      timestamp: generatedAt,
    });
  }

  const report = highestPriority(reports);
  if (report) {
    const findingId = `${demoRunId}-finding-seller-report`;
    findings.push({
      id: findingId,
      demoRunId,
      title: `Seguimiento comercial para ${report.clientName}`,
      summary: `${report.sellerName} registró ${report.interactionType.toLowerCase()} con necesidad de ${report.detectedNeed.toLowerCase()} y objeción: ${report.objection.toLowerCase()}.`,
      severity: report.priority === "Alta" ? "high" : "medium",
      source: "commercial_follow_up",
      adminTargetPage: "sellers",
      adminTargetSection: "Seguimientos prioritarios",
      operationalRecommendation: "La necesidad y objeción registradas requieren una decisión humana sobre el siguiente paso comercial.",
      recommendedAction: `${report.sellerName} debe ejecutar “${report.nextStep}” y documentar el resultado del seguimiento.`,
      responsibleRole: report.sellerName,
      responsibleArea: "Ventas / Vendedoras",
      evidenceIds: [report.id],
      sourceTimestamp: validSourceTimestamp(report.createdAt),
      sourceEntityId: report.id,
      expedienteId: report.expedienteId,
      generatedAt,
      associatedEvidence: [evidence(
        findingId,
        demoRunId,
        report.id,
        report.expedienteId,
        report.createdAt,
        `${report.clientName} · ${report.interactionType}`,
        `Reporte ${report.id} · necesidad: ${report.detectedNeed} · objeción: ${report.objection} · siguiente paso: ${report.nextStep}`,
        "commercial_follow_up",
        "sellers",
        "Seguimientos prioritarios",
      )],
      visibleStatus: "pending",
      timestamp: generatedAt,
    });
  }

  const vapiLog = vapiLogs.find((log) =>
    log.structuredOutput?.documentsPending ||
    log.structuredOutput?.familyDecisionPending ||
    log.riskSignal !== "Sin riesgo critico",
  ) || vapiLogs[0];
  if (vapiLog) {
    const findingId = `${demoRunId}-finding-vapi`;
    const signals = [
      vapiLog.structuredOutput?.wantsFinancing ? "interés en financiamiento" : null,
      vapiLog.structuredOutput?.documentsPending ? "documentos pendientes" : null,
      vapiLog.structuredOutput?.familyDecisionPending ? "decisión familiar pendiente" : null,
      vapiLog.structuredOutput?.urgencyLevel ? `urgencia ${vapiLog.structuredOutput.urgencyLevel.toLowerCase()}` : null,
    ].filter(Boolean).join(", ") || vapiLog.detectedIntent;
    findings.push({
      id: findingId,
      demoRunId,
      title: `Intervención humana sugerida para ${vapiLog.clientName}`,
      summary: `La llamada ${vapiLog.callId} detectó ${signals}. Riesgo reportado: ${vapiLog.riskSignal}.`,
      severity: vapiLog.structuredOutput?.urgencyLevel === "Alta" ? "high" : "medium",
      source: "marta_voice_vapi",
      adminTargetPage: "sellers",
      adminTargetSection: "Seguimientos desde Marta Voz",
      operationalRecommendation: "La salida estructurada de Marta debe ser revisada por una persona antes de responder o escalar el caso.",
      recommendedAction: `La vendedora asignada debe revisar la llamada y ejecutar “${vapiLog.nextStep}”.`,
      responsibleRole: "Vendedora asignada",
      responsibleArea: "Ventas / Vendedoras",
      evidenceIds: [vapiLog.id],
      sourceTimestamp: validSourceTimestamp(vapiLog.createdAt),
      sourceEntityId: vapiLog.id,
      expedienteId: vapiLog.expedienteId,
      generatedAt,
      associatedEvidence: [evidence(
        findingId,
        demoRunId,
        vapiLog.id,
        vapiLog.expedienteId,
        vapiLog.createdAt,
        `${vapiLog.clientName} · ${vapiLog.detectedIntent}`,
        `Llamada ${vapiLog.callId} · ${vapiLog.transcriptSummary}`,
        "marta_voice_vapi",
        "sellers",
        "Seguimientos desde Marta Voz",
      )],
      visibleStatus: "pending",
      timestamp: generatedAt,
    });
  }

  return findings;
}

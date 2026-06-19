import type { DemoScenarioBuilderOutput } from "./demoScenarioBuilder";

// Convierte un escenario ya construido en datos operacionales simulados.
// No reconstruye ADN, inventario ni validaciones y no depende de AMENA Comalapa.

export type DemoInjectedPriority = "low" | "medium" | "high";

export type DemoInjectedUnitType = "apartment" | "lot" | "project";

export interface DemoScenarioInjectorCounts {
  reservations: number;
  internalMessages: number;
  salesReports: number;
  martaVapiLogs: number;
  martaWhatsAppFollowUps: number;
  intelligenceSignals: number;
  operationalEvidence: number;
}

export interface DemoScenarioInjectorInput {
  scenario: DemoScenarioBuilderOutput | null;
  injectionId: string;
  generatedAt: string;
  seed: string;
  counts?: Partial<DemoScenarioInjectorCounts>;
}

export interface DemoInjectedEntityBase {
  id: string;
  injectionId: string;
  scenarioId: string;
  createdAt: string;
  isSimulated: true;
}

export interface DemoInjectedInventoryReference {
  projectId?: string;
  unitType: DemoInjectedUnitType;
  unitId?: string;
}

export interface DemoSimulatedReservation extends DemoInjectedEntityBase {
  reference: DemoInjectedInventoryReference;
  status: "pending" | "confirmed" | "follow_up_required";
  prospectLabel: string;
  assignedRole: string;
  nextAction: string;
}

export interface DemoSimulatedInternalMessage extends DemoInjectedEntityBase {
  channel: "commercial" | "operations" | "management";
  priority: DemoInjectedPriority;
  senderRole: string;
  recipientRole: string;
  subject: string;
  message: string;
}

export interface DemoSimulatedSalesReport extends DemoInjectedEntityBase {
  sellerLabel: string;
  periodLabel: string;
  reportedActivity: string;
  opportunityCount: number;
  pendingFollowUps: number;
  summary: string;
}

export interface DemoSimulatedMartaVapiLog extends DemoInjectedEntityBase {
  channel: "voice";
  direction: "inbound" | "outbound";
  status: "completed" | "follow_up_required" | "no_answer";
  contactLabel: string;
  durationSeconds: number;
  summary: string;
}

export interface DemoSimulatedMartaWhatsAppFollowUp
  extends DemoInjectedEntityBase {
  channel: "whatsapp";
  status: "scheduled" | "sent" | "reply_pending";
  contactLabel: string;
  scheduledFor: string;
  message: string;
  relatedReservationId?: string;
}

export interface DemoSimulatedIntelligenceSignal
  extends DemoInjectedEntityBase {
  signalType:
    | "follow_up_risk"
    | "inventory_opportunity"
    | "commercial_pattern"
    | "executive_attention";
  priority: DemoInjectedPriority;
  title: string;
  description: string;
  recommendedAction: string;
  sourceEntityIds: string[];
}

export interface DemoSimulatedOperationalEvidence
  extends DemoInjectedEntityBase {
  evidenceType:
    | "reservation"
    | "message"
    | "sales_report"
    | "voice_log"
    | "whatsapp_follow_up"
    | "intelligence_signal";
  sourceEntityId: string;
  label: string;
  summary: string;
}

export interface DemoScenarioInjection {
  injectionId: string;
  scenarioId: string;
  scenarioName: string;
  generatedAt: string;
  seed: string;
  isSimulated: true;
  reservations: DemoSimulatedReservation[];
  internalMessages: DemoSimulatedInternalMessage[];
  salesReports: DemoSimulatedSalesReport[];
  martaVapiLogs: DemoSimulatedMartaVapiLog[];
  martaWhatsAppFollowUps: DemoSimulatedMartaWhatsAppFollowUp[];
  intelligenceSignals: DemoSimulatedIntelligenceSignal[];
  operationalEvidence: DemoSimulatedOperationalEvidence[];
}

export type DemoScenarioInjectorValidationSeverity = "error" | "warning";

export interface DemoScenarioInjectorValidationIssue {
  code: string;
  severity: DemoScenarioInjectorValidationSeverity;
  path: string;
  message: string;
}

export interface DemoScenarioInjectorValidationResult {
  isValid: boolean;
  issues: DemoScenarioInjectorValidationIssue[];
  errors: DemoScenarioInjectorValidationIssue[];
  warnings: DemoScenarioInjectorValidationIssue[];
}

const defaultCounts: DemoScenarioInjectorCounts = {
  reservations: 3,
  internalMessages: 3,
  salesReports: 2,
  martaVapiLogs: 3,
  martaWhatsAppFollowUps: 3,
  intelligenceSignals: 3,
  operationalEvidence: 7,
};

const hasText = (value: string): boolean => value.trim().length > 0;

const normalizeSeed = (seed: string): string =>
  seed
    .trim()
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "demo-seed";

const createDeterministicId = (
  seed: string,
  collection: string,
  index: number,
): string => `${normalizeSeed(seed)}-${collection}-${index + 1}`;

const createIsoOffset = (baseIso: string, minutes: number): string => {
  const timestamp = Date.parse(baseIso);

  if (Number.isNaN(timestamp)) {
    return baseIso;
  }

  return new Date(timestamp + minutes * 60_000).toISOString();
};

const resolveCount = (
  input: DemoScenarioInjectorInput,
  key: keyof DemoScenarioInjectorCounts,
): number => input.counts?.[key] ?? defaultCounts[key];

const pick = <Value>(values: Value[], index: number): Value | undefined =>
  values.length > 0 ? values[index % values.length] : undefined;

const buildInventoryReferences = (
  scenario: DemoScenarioBuilderOutput,
): DemoInjectedInventoryReference[] => {
  const seed = scenario.operationalSeed;
  const apartmentReferences = seed.apartmentIds.map((unitId, index) => ({
    projectId: pick(seed.projectIds, index),
    unitType: "apartment" as const,
    unitId,
  }));
  const lotReferences = seed.lotIds.map((unitId, index) => ({
    projectId: pick(seed.projectIds, index),
    unitType: "lot" as const,
    unitId,
  }));
  const projectReferences = seed.projectIds.map((projectId) => ({
    projectId,
    unitType: "project" as const,
  }));

  return [...apartmentReferences, ...lotReferences, ...projectReferences];
};

export function validateDemoScenarioInjectorInput(
  input: DemoScenarioInjectorInput,
): DemoScenarioInjectorValidationResult {
  const issues: DemoScenarioInjectorValidationIssue[] = [];

  const addIssue = (
    code: string,
    severity: DemoScenarioInjectorValidationSeverity,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!input.scenario) {
    addIssue(
      "scenario_required",
      "error",
      "scenario",
      "La inyección requiere un escenario construido.",
    );
  } else {
    if (!hasText(input.scenario.scenarioId)) {
      addIssue(
        "scenario_id_required",
        "error",
        "scenario.scenarioId",
        "El escenario construido requiere un identificador.",
      );
    }

    if (input.scenario.readiness.hasBlockingIssues) {
      addIssue(
        "scenario_has_blocking_issues",
        "error",
        "scenario.readiness",
        "No se puede inyectar un escenario con asuntos bloqueantes.",
      );
    }

    if (
      input.scenario.operationalSeed.projectIds.length === 0 &&
      input.scenario.operationalSeed.apartmentIds.length === 0 &&
      input.scenario.operationalSeed.lotIds.length === 0
    ) {
      addIssue(
        "operational_seed_inventory_missing",
        "warning",
        "scenario.operationalSeed",
        "La semilla operacional no contiene referencias de inventario.",
      );
    }
  }

  if (!hasText(input.injectionId)) {
    addIssue(
      "injection_id_required",
      "error",
      "injectionId",
      "La inyección requiere un identificador.",
    );
  }

  if (!hasText(input.generatedAt) || Number.isNaN(Date.parse(input.generatedAt))) {
    addIssue(
      "valid_generation_date_required",
      "error",
      "generatedAt",
      "La inyección requiere una fecha ISO válida.",
    );
  }

  if (!hasText(input.seed)) {
    addIssue(
      "seed_required",
      "error",
      "seed",
      "La inyección requiere una semilla determinista.",
    );
  }

  Object.entries(input.counts ?? {}).forEach(([key, value]) => {
    if (
      value === undefined ||
      !Number.isInteger(value) ||
      value < 0
    ) {
      addIssue(
        "invalid_collection_count",
        "error",
        `counts.${key}`,
        "Las cantidades deben ser enteros iguales o mayores que cero.",
      );
    }
  });

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    isValid: errors.length === 0,
    issues,
    errors,
    warnings,
  };
}

const createBase = (
  input: DemoScenarioInjectorInput,
  scenario: DemoScenarioBuilderOutput,
  collection: string,
  index: number,
): DemoInjectedEntityBase => ({
  id: createDeterministicId(input.seed, collection, index),
  injectionId: input.injectionId,
  scenarioId: scenario.scenarioId,
  createdAt: createIsoOffset(input.generatedAt, index * 15),
  isSimulated: true,
});

export function injectDemoScenario(
  input: DemoScenarioInjectorInput,
): DemoScenarioInjection {
  const validation = validateDemoScenarioInjectorInput(input);

  if (!validation.isValid || !input.scenario) {
    const details = validation.errors.map((issue) => issue.code).join(", ");
    throw new Error(`Invalid demo scenario injector input: ${details}`);
  }

  const scenario = input.scenario;
  const operationalSeed = scenario.operationalSeed;
  const references = buildInventoryReferences(scenario);
  const roles =
    operationalSeed.organizationalRoles.length > 0
      ? operationalSeed.organizationalRoles
      : ["Equipo comercial"];
  const states =
    operationalSeed.processStates.length > 0
      ? operationalSeed.processStates
      : ["Seguimiento"];
  const rules =
    operationalSeed.commercialRules.length > 0
      ? operationalSeed.commercialRules
      : ["Registrar el siguiente paso operacional."];
  const flows =
    operationalSeed.operationalFlows.length > 0
      ? operationalSeed.operationalFlows
      : ["Contacto → seguimiento → evidencia"];
  const indicators =
    operationalSeed.keyIndicators.length > 0
      ? operationalSeed.keyIndicators
      : ["Seguimientos pendientes"];
  const risks =
    operationalSeed.criticalRisks.length > 0
      ? operationalSeed.criticalRisks
      : ["Oportunidad sin seguimiento"];

  const reservations = Array.from(
    { length: resolveCount(input, "reservations") },
    (_, index): DemoSimulatedReservation => ({
      ...createBase(input, scenario, "reservation", index),
      reference:
        pick(references, index) ?? {
          unitType: "project",
          projectId: pick(operationalSeed.projectIds, index),
        },
      status:
        index % 3 === 0
          ? "pending"
          : index % 3 === 1
            ? "confirmed"
            : "follow_up_required",
      prospectLabel: `Prospecto demo ${index + 1}`,
      assignedRole: pick(roles, index) ?? "Equipo comercial",
      nextAction: pick(flows, index) ?? "Registrar seguimiento.",
    }),
  );

  const internalMessages = Array.from(
    { length: resolveCount(input, "internalMessages") },
    (_, index): DemoSimulatedInternalMessage => ({
      ...createBase(input, scenario, "internal-message", index),
      channel:
        index % 3 === 0
          ? "commercial"
          : index % 3 === 1
            ? "operations"
            : "management",
      priority: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
      senderRole: pick(roles, index) ?? "Equipo comercial",
      recipientRole: pick(roles, index + 1) ?? "Dirección",
      subject: `Seguimiento demo: ${pick(states, index) ?? "operación"}`,
      message: pick(rules, index) ?? "Registrar el siguiente paso operacional.",
    }),
  );

  const salesReports = Array.from(
    { length: resolveCount(input, "salesReports") },
    (_, index): DemoSimulatedSalesReport => ({
      ...createBase(input, scenario, "sales-report", index),
      sellerLabel: `Vendedora demo ${index + 1}`,
      periodLabel: `Periodo demo ${index + 1}`,
      reportedActivity: pick(flows, index) ?? "Seguimiento comercial",
      opportunityCount: reservations.length + index,
      pendingFollowUps: reservations.filter(
        (reservation) => reservation.status !== "confirmed",
      ).length,
      summary: `Reporte simulado basado en ${pick(indicators, index) ?? "actividad operacional"}.`,
    }),
  );

  const martaVapiLogs = Array.from(
    { length: resolveCount(input, "martaVapiLogs") },
    (_, index): DemoSimulatedMartaVapiLog => ({
      ...createBase(input, scenario, "marta-vapi-log", index),
      channel: "voice",
      direction: index % 2 === 0 ? "outbound" : "inbound",
      status:
        index % 3 === 0
          ? "completed"
          : index % 3 === 1
            ? "follow_up_required"
            : "no_answer",
      contactLabel: `Contacto demo ${index + 1}`,
      durationSeconds: 45 + index * 30,
      summary: `Interacción simulada sobre ${pick(states, index) ?? "seguimiento comercial"}.`,
    }),
  );

  const martaWhatsAppFollowUps = Array.from(
    { length: resolveCount(input, "martaWhatsAppFollowUps") },
    (_, index): DemoSimulatedMartaWhatsAppFollowUp => ({
      ...createBase(input, scenario, "marta-whatsapp-follow-up", index),
      channel: "whatsapp",
      status:
        index % 3 === 0
          ? "scheduled"
          : index % 3 === 1
            ? "sent"
            : "reply_pending",
      contactLabel: `Contacto demo ${index + 1}`,
      scheduledFor: createIsoOffset(input.generatedAt, 60 + index * 30),
      message: `Seguimiento simulado: ${pick(flows, index) ?? "confirmar el siguiente paso"}.`,
      relatedReservationId: pick(reservations, index)?.id,
    }),
  );

  const intelligenceSignals = Array.from(
    { length: resolveCount(input, "intelligenceSignals") },
    (_, index): DemoSimulatedIntelligenceSignal => {
      const sourceReservation = pick(reservations, index);
      const sourceReport = pick(salesReports, index);

      return {
        ...createBase(input, scenario, "intelligence-signal", index),
        signalType:
          index % 4 === 0
            ? "follow_up_risk"
            : index % 4 === 1
              ? "inventory_opportunity"
              : index % 4 === 2
                ? "commercial_pattern"
                : "executive_attention",
        priority: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
        title: `Señal demo: ${pick(indicators, index) ?? "atención operacional"}`,
        description: pick(risks, index) ?? "Riesgo operacional simulado.",
        recommendedAction:
          pick(rules, index) ?? "Revisar y registrar una acción.",
        sourceEntityIds: [sourceReservation?.id, sourceReport?.id].filter(
          (id): id is string => Boolean(id),
        ),
      };
    },
  );

  const evidenceSources: Array<{
    id: string;
    type: DemoSimulatedOperationalEvidence["evidenceType"];
    summary: string;
  }> = [
    ...reservations.map((item) => ({
      id: item.id,
      type: "reservation" as const,
      summary: item.nextAction,
    })),
    ...internalMessages.map((item) => ({
      id: item.id,
      type: "message" as const,
      summary: item.subject,
    })),
    ...salesReports.map((item) => ({
      id: item.id,
      type: "sales_report" as const,
      summary: item.summary,
    })),
    ...martaVapiLogs.map((item) => ({
      id: item.id,
      type: "voice_log" as const,
      summary: item.summary,
    })),
    ...martaWhatsAppFollowUps.map((item) => ({
      id: item.id,
      type: "whatsapp_follow_up" as const,
      summary: item.message,
    })),
    ...intelligenceSignals.map((item) => ({
      id: item.id,
      type: "intelligence_signal" as const,
      summary: item.description,
    })),
  ];

  const operationalEvidence = Array.from(
    { length: resolveCount(input, "operationalEvidence") },
    (_, index): DemoSimulatedOperationalEvidence => {
      const source = pick(evidenceSources, index) ?? {
        id: createDeterministicId(input.seed, "empty-source", index),
        type: "intelligence_signal" as const,
        summary: "Evidencia demo pendiente de fuente operacional.",
      };

      return {
        ...createBase(input, scenario, "operational-evidence", index),
        evidenceType: source.type,
        sourceEntityId: source.id,
        label: `Evidencia operacional demo ${index + 1}`,
        summary: source.summary,
      };
    },
  );

  return {
    injectionId: input.injectionId,
    scenarioId: scenario.scenarioId,
    scenarioName: scenario.scenarioName,
    generatedAt: input.generatedAt,
    seed: input.seed,
    isSimulated: true,
    reservations,
    internalMessages,
    salesReports,
    martaVapiLogs,
    martaWhatsAppFollowUps,
    intelligenceSignals,
    operationalEvidence,
  };
}

// Plantilla segura: el escenario debe ser suministrado por DemoScenarioBuilder.
export const defaultDemoScenarioInjectorInput: DemoScenarioInjectorInput = {
  scenario: null,
  injectionId: "demo-injection-template",
  generatedAt: "2026-01-01T00:00:00.000Z",
  seed: "generic-prospect-demo",
  counts: { ...defaultCounts },
};

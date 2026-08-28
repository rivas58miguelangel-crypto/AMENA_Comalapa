import type { DemoInjectedFinding } from "../domain/demoFindings";

export const OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION = "1.0";
export const MESSAGING_BRIDGE_READY = "hoperia.messaging.bridge.ready";
export const MESSAGING_BRIDGE_ACK = "hoperia.messaging.bridge.ack";
export const MESSAGING_OPERATIONAL_CASE_OPEN = "hoperia.operational_case.open";
export const MESSAGING_OPERATIONAL_CASE_ACK = "hoperia.operational_case.ack";

const hasText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const validIsoTimestamp = (value: unknown): value is string =>
  hasText(value) && /^\d{4}-\d{2}-\d{2}T/.test(value) && !Number.isNaN(Date.parse(value));

const toParticipantId = (value: string) => `demo-role-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unassigned"}`;

export const createMessagingBridgeId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? `messaging-${crypto.randomUUID()}`
    : `messaging-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

export function buildOperationalCaseFromFinding(finding: DemoInjectedFinding, createdAt: string) {
  const responsibleLabel = finding.responsiblePerson || finding.responsibleRole;
  const participants = responsibleLabel
    ? [{
      id: toParticipantId(responsibleLabel),
      label: responsibleLabel,
      ...(finding.responsibleArea ? { role: finding.responsibleArea } : {}),
      isDemoParticipant: true,
    }, ...(finding.responsibleArea && finding.responsibleArea !== responsibleLabel ? [{
      id: toParticipantId(finding.responsibleArea),
      label: finding.responsibleArea,
      role: "Área participante demo",
      isDemoParticipant: true,
    }] : [])]
    : [];
  const evidenceRefs = (finding.associatedEvidence || []).map((evidence) => ({
    id: evidence.id,
    ...(evidence.sourceEntityId ? { sourceEntityId: evidence.sourceEntityId } : {}),
    label: evidence.label,
    ...(validIsoTimestamp(evidence.sourceCreatedAt) ? { sourceTimestamp: evidence.sourceCreatedAt } : {}),
  }));

  return {
    operationalCaseId: `oc-${finding.demoRunId}-${finding.id}`,
    demoRunId: finding.demoRunId,
    findingId: finding.id,
    ...(finding.expedienteId ? { expedienteId: finding.expedienteId } : {}),
    title: finding.title,
    context: `${finding.summary} ${finding.operationalRecommendation}`.trim(),
    requestedAction: finding.recommendedAction,
    ...(finding.operationalRecommendation ? { objective: finding.operationalRecommendation } : {}),
    participants,
    ...(participants[0] ? { responsibleParticipant: participants[0].id } : {}),
    priority: finding.severity,
    evidenceRefs,
    ...(finding.sourceTimestamp ? { sourceTimestamp: finding.sourceTimestamp } : {}),
    createdAt,
    status: "open",
    isLocalDemo: false,
    originLabel: "H - OperIA Intelligence · integrado",
    messages: [],
  };
}

export const isMessagingBridgeReady = (value: unknown): value is { type: string; schemaVersion: string; demoRunId: string; bridgeId: string } => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  return data.type === MESSAGING_BRIDGE_READY && data.schemaVersion === OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION && hasText(data.demoRunId) && hasText(data.bridgeId);
};

export const isOperationalCaseAck = (value: unknown): value is { type: string; schemaVersion: string; operationalCaseId: string; findingId: string; demoRunId: string; bridgeId: string; accepted: boolean; reason?: string } => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  return data.type === MESSAGING_OPERATIONAL_CASE_ACK && data.schemaVersion === OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION && hasText(data.operationalCaseId) && hasText(data.findingId) && hasText(data.demoRunId) && hasText(data.bridgeId) && typeof data.accepted === "boolean";
};

import type { DemoInjectedFinding, OperationalContribution, OperationalContributionType } from "../domain/demoFindings";

export const OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION = "1.0";
export const MESSAGING_BRIDGE_READY = "hoperia.messaging.bridge.ready";
export const MESSAGING_BRIDGE_ACK = "hoperia.messaging.bridge.ack";
export const MESSAGING_OPERATIONAL_CASE_OPEN = "hoperia.operational_case.open";
export const MESSAGING_OPERATIONAL_CASE_ACK = "hoperia.operational_case.ack";
export const MESSAGING_OPERATIONAL_CASE_CONTRIBUTION = "hoperia.operational_case.contribution";
export const MESSAGING_OPERATIONAL_CASE_CONTRIBUTION_ACK = "hoperia.operational_case.contribution.ack";

export const OPERATIONAL_CONTRIBUTION_TYPES: OperationalContributionType[] = ["comment", "observation", "recommendation", "action"];

export type OperationalContributionEnvelope = {
  bridgeId: string;
  demoPurpose: "operational-scenario";
  demoRunId: string;
  reservationId: string;
  expedienteId: string;
  findingId: string;
  operationalCaseId: string;
  contribution: OperationalContribution;
};

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
    demoPurpose: finding.demoPurpose,
    demoRunId: finding.demoRunId,
    reservationId: finding.reservationId,
    findingId: finding.id,
    sourceEntityId: finding.sourceEntityId,
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

const isContributionType = (value: unknown): value is OperationalContributionType =>
  typeof value === "string" && OPERATIONAL_CONTRIBUTION_TYPES.includes(value as OperationalContributionType);

export const isOperationalCaseContribution = (value: unknown): value is OperationalContributionEnvelope & { type: string; schemaVersion: string } => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  const contribution = data.contribution as Record<string, unknown> | undefined;
  if (!contribution || Array.isArray(contribution)) return false;
  return data.type === MESSAGING_OPERATIONAL_CASE_CONTRIBUTION &&
    data.schemaVersion === OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION &&
    data.demoPurpose === "operational-scenario" &&
    ["bridgeId", "demoRunId", "reservationId", "expedienteId", "findingId", "operationalCaseId"].every((field) => hasText(data[field])) &&
    hasText(contribution.contributionId) &&
    contribution.demoPurpose === "operational-scenario" &&
    hasText(contribution.demoRunId) && hasText(contribution.reservationId) && hasText(contribution.expedienteId) &&
    hasText(contribution.findingId) && hasText(contribution.operationalCaseId) && hasText(contribution.bridgeId) &&
    hasText(contribution.authorParticipantId) && hasText(contribution.authorLabel) && hasText(contribution.text) &&
    isContributionType(contribution.contributionType) && contribution.status === "submitted" &&
    validIsoTimestamp(contribution.createdAt);
};

export const isContributionForOperationalCase = (
  envelope: OperationalContributionEnvelope,
  operationalCase: ReturnType<typeof buildOperationalCaseFromFinding>,
  expectedBridgeId: string,
) => envelope.bridgeId === expectedBridgeId &&
  envelope.demoPurpose === operationalCase.demoPurpose &&
  envelope.demoRunId === operationalCase.demoRunId &&
  envelope.reservationId === operationalCase.reservationId &&
  envelope.expedienteId === operationalCase.expedienteId &&
  envelope.findingId === operationalCase.findingId &&
  envelope.operationalCaseId === operationalCase.operationalCaseId &&
  envelope.contribution.demoPurpose === operationalCase.demoPurpose &&
  envelope.contribution.demoRunId === operationalCase.demoRunId &&
  envelope.contribution.reservationId === operationalCase.reservationId &&
  envelope.contribution.expedienteId === operationalCase.expedienteId &&
  envelope.contribution.findingId === operationalCase.findingId &&
  envelope.contribution.operationalCaseId === operationalCase.operationalCaseId &&
  envelope.contribution.bridgeId === envelope.bridgeId;

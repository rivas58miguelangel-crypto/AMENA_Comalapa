export type DemoFindingSeverity = "low" | "medium" | "high" | "critical";

export type DemoFindingSource =
  | "reservations"
  | "marta_voice_vapi"
  | "marta_text_whatsapp"
  | "commercial_follow_up"
  | "team_messages"
  | "documents"
  | "payments"
  | "customer_service"
  | "h_operia_intelligence"
  | "manual_demo";

export type DemoAdminTargetPage =
  | "executive"
  | "client"
  | "construction"
  | "documents"
  | "payments"
  | "service"
  | "sellers"
  | "campaigns"
  | "campaignDelivery"
  | "funnels"
  | "dashboards";

export interface DemoFindingEvidence {
  id: string;
  label: string;
  summary: string;
  source: DemoFindingSource;
  demoRunId?: string;
  sourceType?: string;
  sourceEntityId?: string;
  expedienteId?: string;
  sourceCreatedAt?: string;
  occurredAt?: string;
  recordedAt?: string;
  subject?: string;
  actors?: string[];
  facts?: string[];
  context?: string;
  provenance?: string;
  adminTargetPage?: DemoAdminTargetPage;
  adminTargetSection?: string;
  adminTargetDetail?: string;
  adminTargetAnchor?: string;
}

export interface DemoInjectedFinding {
  id: string;
  demoRunId: string;
  title: string;
  summary: string;
  severity: DemoFindingSeverity;
  source: DemoFindingSource;
  adminTargetPage: DemoAdminTargetPage;
  adminTargetSection: string;
  operationalRecommendation: string;
  recommendedAction: string;
  responsibleRole: string;
  responsibleArea?: string;
  responsiblePerson?: string;
  /** Source evidence references; optional for compatibility with legacy fixtures. */
  evidenceIds?: string[];
  sourceTimestamp?: string;
  sourceEntityId?: string;
  expedienteId?: string;
  /** When Intelligence generated this finding; distinct from sourceTimestamp. */
  generatedAt?: string;
  associatedEvidence: DemoFindingEvidence[];
  visibleStatus: "pending" | "visible" | "acknowledged" | "hidden";
  timestamp: string;
}

export interface DemoRunPresentationState {
  demoRunId: string;
  findings: DemoInjectedFinding[];
  activeFindingId?: string;
  visibleStatus: "idle" | "prepared" | "injected" | "presented";
  timestamp: string;
}

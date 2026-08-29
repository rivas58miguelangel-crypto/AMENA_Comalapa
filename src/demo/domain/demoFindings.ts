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
  | "operational_messaging"
  | "manual_demo";

export type OperationalContributionType = "comment" | "observation" | "recommendation" | "action";

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
  operationalCaseId?: string;
  findingId?: string;
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
  demoPurpose?: "operational-scenario" | "volunteer-experience";
  reservationId?: string;
  clientName?: string;
  title: string;
  summary: string;
  severity: DemoFindingSeverity;
  source: DemoFindingSource;
  sourceType?: string;
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
  operationalState?: "updated";
  updatedAt?: string;
  associatedEvidence: DemoFindingEvidence[];
  visibleStatus: "pending" | "visible" | "acknowledged" | "hidden";
  timestamp: string;
}

export interface OperationalContribution {
  contributionId: string;
  demoPurpose: "operational-scenario";
  demoRunId: string;
  reservationId: string;
  expedienteId: string;
  findingId: string;
  operationalCaseId: string;
  bridgeId: string;
  authorParticipantId: string;
  authorLabel: string;
  authorRole?: string;
  contributionType: OperationalContributionType;
  text: string;
  createdAt: string;
  status: "submitted" | "accepted" | "rejected";
}

export interface DemoRunPresentationState {
  demoRunId: string;
  findings: DemoInjectedFinding[];
  activeFindingId?: string;
  visibleStatus: "idle" | "prepared" | "injected" | "presented";
  timestamp: string;
}

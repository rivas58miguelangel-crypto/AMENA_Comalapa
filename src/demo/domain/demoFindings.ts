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
  associatedEvidence: Array<{
    id: string;
    label: string;
    summary: string;
    source: DemoFindingSource;
    adminTargetPage?: DemoAdminTargetPage;
    adminTargetSection?: string;
    adminTargetDetail?: string;
    adminTargetAnchor?: string;
  }>;
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

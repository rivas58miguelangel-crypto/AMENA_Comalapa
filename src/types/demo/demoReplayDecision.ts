import type { DemoReplayEligibilityResult } from "./demoReplayEligibility";
import type { DemoReplayPolicyResult } from "./demoReplayPolicy";

// Decision operacional declarativa para un futuro replay.
// No ejecuta replay, no regenera datos y no modifica los resultados recibidos.

export type ReplayDecisionStatus =
  | "replay_approved"
  | "replay_blocked"
  | "review_required"
  | "regeneration_recommended";

export type ReplayDecisionAction =
  | "allow_replay"
  | "block_replay"
  | "request_review"
  | "recommend_regeneration";

export type ReplayDecisionRiskLevel = "low" | "medium" | "high";

export interface DemoReplayDecision {
  status: ReplayDecisionStatus;
  action: ReplayDecisionAction;
  riskLevel: ReplayDecisionRiskLevel;
  eligibilityStatus: DemoReplayEligibilityResult["status"];
  policyDecision: DemoReplayPolicyResult["decision"];
  reasons: string[];
  decidedAt: string;
}

export function buildDemoReplayDecision(
  eligibility: DemoReplayEligibilityResult,
  policy: DemoReplayPolicyResult,
): DemoReplayDecision {
  const reasons = [
    ...eligibility.issues.map((issue) => issue.message),
    ...policy.issues.map((issue) => issue.message),
  ];

  if (policy.decision === "blocked_by_policy") {
    return {
      status: "replay_blocked",
      action: "block_replay",
      riskLevel: "high",
      eligibilityStatus: eligibility.status,
      policyDecision: policy.decision,
      reasons,
      decidedAt: policy.evaluatedAt,
    };
  }

  if (policy.decision === "requires_review") {
    return {
      status: "review_required",
      action: "request_review",
      riskLevel: "medium",
      eligibilityStatus: eligibility.status,
      policyDecision: policy.decision,
      reasons,
      decidedAt: policy.evaluatedAt,
    };
  }

  if (eligibility.status === "eligible") {
    return {
      status: "replay_approved",
      action: "allow_replay",
      riskLevel: "low",
      eligibilityStatus: eligibility.status,
      policyDecision: policy.decision,
      reasons,
      decidedAt: policy.evaluatedAt,
    };
  }

  return {
    status: "regeneration_recommended",
    action: "recommend_regeneration",
    riskLevel: "high",
    eligibilityStatus: eligibility.status,
    policyDecision: policy.decision,
    reasons,
    decidedAt: policy.evaluatedAt,
  };
}

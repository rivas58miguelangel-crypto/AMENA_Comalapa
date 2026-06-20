import type { DemoReplayEligibilityResult } from "./demoReplayEligibility";
import type { DemoRegenerationPlan } from "./demoRegenerationPlan";
import type { DemoCertification } from "./demoCertification";
import type { DemoRunReplayContext } from "./demoRunReplayContext";

// Politica declarativa para autorizar una futura regeneracion completa.
// No ejecuta replay, no regenera datos y no modifica los contratos recibidos.

export type DemoReplayPolicyDecision =
  | "blocked_by_policy"
  | "requires_review"
  | "approved_for_regeneration";

export type DemoReplayPolicySeverity = "error" | "warning";

export type DemoReplayPolicyReasonCode =
  | "replay_not_eligible"
  | "regeneration_not_required"
  | "reason_required"
  | "full_run_scope_required"
  | "full_run_approval_required"
  | "approved_for_regeneration";

export interface DemoReplayPolicyIssue {
  severity: DemoReplayPolicySeverity;
  reasonCode: DemoReplayPolicyReasonCode;
  path: string;
  message: string;
}

export interface DemoReplayPolicyInput {
  eligibilityResult: DemoReplayEligibilityResult;
  regenerationPlan: DemoRegenerationPlan;
  certification: DemoCertification;
  replayContext: DemoRunReplayContext;
  reason?: string;
  approvedBy?: string;
  evaluatedAt: string;
}

export interface DemoReplayPolicyResult {
  decision: DemoReplayPolicyDecision;
  issues: DemoReplayPolicyIssue[];
  reason?: string;
  approvedBy?: string;
  evaluatedAt: string;
}

export function evaluateDemoReplayPolicy(
  input: DemoReplayPolicyInput,
): DemoReplayPolicyResult {
  const issues: DemoReplayPolicyIssue[] = [];
  const reason = input.reason?.trim();
  const approvedBy = input.approvedBy?.trim();

  if (input.eligibilityResult.status === "not_eligible") {
    issues.push({
      severity: "error",
      reasonCode: "replay_not_eligible",
      path: "eligibilityResult.status",
      message: "La corrida no es elegible para replay.",
    });
  }

  if (input.regenerationPlan.status === "not_required") {
    issues.push({
      severity: "error",
      reasonCode: "regeneration_not_required",
      path: "regenerationPlan.status",
      message: "El plan no requiere regeneracion.",
    });
  }

  if (!reason) {
    issues.push({
      severity: "warning",
      reasonCode: "reason_required",
      path: "reason",
      message: "La regeneracion requiere una justificacion.",
    });
  }

  if (input.regenerationPlan.recommendedScope !== "full_run") {
    issues.push({
      severity: "error",
      reasonCode: "full_run_scope_required",
      path: "regenerationPlan.recommendedScope",
      message: "La politica solo permite regeneraciones con alcance completo.",
    });
  }

  if (
    input.regenerationPlan.recommendedScope === "full_run" &&
    !approvedBy
  ) {
    issues.push({
      severity: "warning",
      reasonCode: "full_run_approval_required",
      path: "approvedBy",
      message: "La regeneracion completa requiere aprobacion explicita.",
    });
  }

  const hasBlockingIssue = issues.some(
    (issue) => issue.severity === "error",
  );
  const requiresReview = issues.some(
    (issue) => issue.severity === "warning",
  );

  const decision: DemoReplayPolicyDecision = hasBlockingIssue
    ? "blocked_by_policy"
    : requiresReview
      ? "requires_review"
      : "approved_for_regeneration";

  if (decision === "approved_for_regeneration") {
    issues.push({
      severity: "warning",
      reasonCode: "approved_for_regeneration",
      path: "decision",
      message: "La corrida fue aprobada por politica para regeneracion completa.",
    });
  }

  return {
    decision,
    issues,
    reason,
    approvedBy,
    evaluatedAt: input.evaluatedAt,
  };
}

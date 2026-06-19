import type { DemoRunReplayContext } from "./demoRunReplayContext";
import type {
  DemoRegenerationPlan,
  DemoRegenerationScope,
} from "./demoRegenerationPlan";
import type { DemoCertification } from "./demoCertification";

// Evalúa si un plan puede avanzar hacia una futura regeneración. No ejecuta
// replay, no regenera datos y no modifica los contratos recibidos.

export type DemoReplayEligibilityStatus =
  | "eligible"
  | "not_eligible";

export type DemoReplayEligibilityReasonCode =
  | "replay_not_required"
  | "run_id_mismatch"
  | "unsupported_replay_version"
  | "unsupported_scope"
  | "missing_orchestrator_input"
  | "certification_plan_mismatch"
  | "eligible_for_full_run";

export interface DemoReplayEligibilityIssue {
  code: DemoReplayEligibilityReasonCode;
  path: string;
  message: string;
}

export interface DemoReplayEligibilityInput {
  replayContext: DemoRunReplayContext;
  regenerationPlan: DemoRegenerationPlan;
  certification: DemoCertification;
  evaluatedAt: string;
}

export interface DemoReplayEligibilityResult {
  status: DemoReplayEligibilityStatus;
  eligible: boolean;
  requestedScope: DemoRegenerationScope;
  replayVersion: string;
  issues: DemoReplayEligibilityIssue[];
  evaluatedAt: string;
}

export function evaluateDemoReplayEligibility(
  input: DemoReplayEligibilityInput,
): DemoReplayEligibilityResult {
  const issues: DemoReplayEligibilityIssue[] = [];
  const { replayContext, regenerationPlan, certification } = input;
  const requestedScope = regenerationPlan.recommendedScope;

  const addIssue = (
    code: DemoReplayEligibilityReasonCode,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, path, message });
  };

  if (replayContext.runId !== regenerationPlan.originalRunId) {
    addIssue(
      "run_id_mismatch",
      "replayContext.runId",
      "El contexto de replay no corresponde a la corrida original del plan.",
    );
  }

  if (replayContext.replayVersion !== "1.0") {
    addIssue(
      "unsupported_replay_version",
      "replayContext.replayVersion",
      "La versión del contexto de replay no está soportada.",
    );
  }

  if (!replayContext.orchestratorInput) {
    addIssue(
      "missing_orchestrator_input",
      "replayContext.orchestratorInput",
      "El contexto requiere la entrada original del orquestador.",
    );
  }

  const certificationMatchesPlan =
    certification.status === "certified"
      ? regenerationPlan.status === "not_required"
      : regenerationPlan.status === "regeneration_required";

  if (!certificationMatchesPlan) {
    addIssue(
      "certification_plan_mismatch",
      "certification.status",
      "La certificación y el estado del plan de regeneración no son coherentes.",
    );
  }

  if (requestedScope === "none") {
    addIssue(
      "replay_not_required",
      "regenerationPlan.recommendedScope",
      "La corrida no requiere replay ni regeneración.",
    );
  } else if (
    requestedScope === "category" ||
    requestedScope === "records" ||
    !replayContext.supportedScopes.includes(requestedScope)
  ) {
    addIssue(
      "unsupported_scope",
      "regenerationPlan.recommendedScope",
      "El alcance solicitado todavía no está soportado por el contexto de replay.",
    );
  }

  const eligible =
    requestedScope === "full_run" && issues.length === 0;

  if (eligible) {
    issues.push({
      code: "eligible_for_full_run",
      path: "regenerationPlan.recommendedScope",
      message: "La corrida es elegible para un replay completo.",
    });
  }

  return {
    status: eligible ? "eligible" : "not_eligible",
    eligible,
    requestedScope,
    replayVersion: replayContext.replayVersion,
    issues,
    evaluatedAt: input.evaluatedAt,
  };
}

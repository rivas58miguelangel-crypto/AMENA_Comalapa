import type {
  DemoLifecyclePhase,
  DemoLifecycleState,
  DemoLifecycleStatus,
} from "./demoLifecycleState";
import type {
  DemoLifecycleTransition,
  DemoLifecycleTransitionType,
} from "./demoLifecycleTransition";

// Validador conceptual y puro del lifecycle de una corrida demo.
// No ejecuta transiciones, no modifica datos y no persiste resultados.

export type DemoLifecycleValidationSeverity =
  | "blocking"
  | "warning"
  | "informational";

export type DemoLifecycleValidationReasonCode =
  | "current_state_required"
  | "transition_required"
  | "state_run_id_required"
  | "state_updated_at_required"
  | "transition_run_id_required"
  | "transitioned_at_required"
  | "run_id_mismatch"
  | "from_status_mismatch"
  | "unsupported_transition"
  | "transition_type_mismatch"
  | "state_phase_mismatch"
  | "transition_precedes_state"
  | "transition_approved";

export interface DemoLifecycleValidationIssue {
  code: DemoLifecycleValidationReasonCode;
  severity: DemoLifecycleValidationSeverity;
  path: string;
  message: string;
}

export interface DemoLifecycleValidationResult {
  isValid: boolean;
  canTransition: boolean;
  blockingIssues: DemoLifecycleValidationIssue[];
  warningIssues: DemoLifecycleValidationIssue[];
  informationalIssues: DemoLifecycleValidationIssue[];
  reasonCodes: DemoLifecycleValidationReasonCode[];
}

interface SupportedTransition {
  type: DemoLifecycleTransitionType;
  toStatus: DemoLifecycleStatus;
}

const expectedPhaseByStatus: Record<
  DemoLifecycleStatus,
  DemoLifecyclePhase
> = {
  draft: "preparation",
  prepared: "preparation",
  certified: "certification",
  active: "operation",
  replay_ready: "recovery",
  regeneration_ready: "recovery",
  archived: "archive",
};

const supportedTransitionByStatus: Partial<
  Record<DemoLifecycleStatus, SupportedTransition[]>
> = {
  draft: [{ type: "prepare", toStatus: "prepared" }],
  prepared: [{ type: "certify", toStatus: "certified" }],
  certified: [{ type: "activate", toStatus: "active" }],
  active: [
    { type: "prepare_replay", toStatus: "replay_ready" },
    {
      type: "prepare_regeneration",
      toStatus: "regeneration_ready",
    },
  ],
  replay_ready: [{ type: "archive_replay", toStatus: "archived" }],
  regeneration_ready: [
    { type: "archive_regeneration", toStatus: "archived" },
  ],
};

const hasText = (value: string): boolean => value.trim().length > 0;

const isValidTimestamp = (value: string): boolean =>
  hasText(value) && !Number.isNaN(Date.parse(value));

export function validateDemoLifecycleTransition(
  currentState: DemoLifecycleState | null | undefined,
  requestedTransition: DemoLifecycleTransition | null | undefined,
): DemoLifecycleValidationResult {
  const issues: DemoLifecycleValidationIssue[] = [];

  const addIssue = (
    code: DemoLifecycleValidationReasonCode,
    severity: DemoLifecycleValidationSeverity,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!currentState) {
    addIssue(
      "current_state_required",
      "blocking",
      "currentState",
      "A current lifecycle state is required.",
    );
  }

  if (!requestedTransition) {
    addIssue(
      "transition_required",
      "blocking",
      "requestedTransition",
      "A requested lifecycle transition is required.",
    );
  }

  if (currentState && requestedTransition) {
    if (!hasText(currentState.runId)) {
      addIssue(
        "state_run_id_required",
        "blocking",
        "currentState.runId",
        "The current state requires a runId.",
      );
    }

    if (!isValidTimestamp(currentState.updatedAt)) {
      addIssue(
        "state_updated_at_required",
        "blocking",
        "currentState.updatedAt",
        "The current state requires a valid updatedAt timestamp.",
      );
    }

    if (!hasText(requestedTransition.runId)) {
      addIssue(
        "transition_run_id_required",
        "blocking",
        "requestedTransition.runId",
        "The requested transition requires a runId.",
      );
    }

    if (!isValidTimestamp(requestedTransition.transitionedAt)) {
      addIssue(
        "transitioned_at_required",
        "blocking",
        "requestedTransition.transitionedAt",
        "The requested transition requires a valid transitionedAt timestamp.",
      );
    }

    if (
      hasText(currentState.runId) &&
      hasText(requestedTransition.runId) &&
      currentState.runId !== requestedTransition.runId
    ) {
      addIssue(
        "run_id_mismatch",
        "blocking",
        "requestedTransition.runId",
        "The transition runId does not match the current state runId.",
      );
    }

    if (requestedTransition.fromStatus !== currentState.status) {
      addIssue(
        "from_status_mismatch",
        "blocking",
        "requestedTransition.fromStatus",
        "The transition origin does not match the current lifecycle status.",
      );
    }

    const supportedTransitions =
      supportedTransitionByStatus[currentState.status] ?? [];
    const matchingDestination = supportedTransitions.find(
      (candidate) =>
        candidate.toStatus === requestedTransition.toStatus,
    );

    if (!matchingDestination) {
      addIssue(
        "unsupported_transition",
        "blocking",
        "requestedTransition.toStatus",
        "The requested lifecycle transition is not supported.",
      );
    } else if (matchingDestination.type !== requestedTransition.type) {
      addIssue(
        "transition_type_mismatch",
        "blocking",
        "requestedTransition.type",
        "The transition type does not match its origin and destination.",
      );
    }

    if (
      currentState.phase !== expectedPhaseByStatus[currentState.status]
    ) {
      addIssue(
        "state_phase_mismatch",
        "warning",
        "currentState.phase",
        "The current phase does not match the lifecycle status.",
      );
    }

    if (
      isValidTimestamp(currentState.updatedAt) &&
      isValidTimestamp(requestedTransition.transitionedAt) &&
      Date.parse(requestedTransition.transitionedAt) <
        Date.parse(currentState.updatedAt)
    ) {
      addIssue(
        "transition_precedes_state",
        "warning",
        "requestedTransition.transitionedAt",
        "The transition timestamp precedes the current state timestamp.",
      );
    }
  }

  if (
    currentState &&
    requestedTransition &&
    !issues.some((issue) => issue.severity === "blocking")
  ) {
    addIssue(
      "transition_approved",
      "informational",
      "requestedTransition",
      issues.some((issue) => issue.severity === "warning")
        ? "The transition is approved with warnings."
        : "The transition is approved.",
    );
  }

  const blockingIssues = issues.filter(
    (issue) => issue.severity === "blocking",
  );
  const warningIssues = issues.filter(
    (issue) => issue.severity === "warning",
  );
  const informationalIssues = issues.filter(
    (issue) => issue.severity === "informational",
  );
  const canTransition = blockingIssues.length === 0;

  return {
    isValid: canTransition,
    canTransition,
    blockingIssues,
    warningIssues,
    informationalIssues,
    reasonCodes: issues.map((issue) => issue.code),
  };
}

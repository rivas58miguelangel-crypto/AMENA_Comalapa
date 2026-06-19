import type { DemoRun } from "./demoRun";
import type { DemoGateResult } from "./demoQualityGate";
import type { DemoCertification } from "./demoCertification";

// Contrato declarativo para describir el siguiente intento de una corrida
// rechazada. No genera datos ni ejecuta la regeneración.

export type DemoRegenerationPlanStatus =
  | "not_required"
  | "regeneration_required";

export type DemoRegenerationRootCauseCategory =
  | "inventory"
  | "profile"
  | "validation"
  | "assessment"
  | "quality"
  | "unknown";

export type DemoRegenerationSeedStrategy =
  | "reuse_seed"
  | "derive_new_seed";

export type DemoRegenerationScope =
  | "none"
  | "full_run"
  | "category"
  | "records";

export interface DemoRegenerationTarget {
  blockerCode: string;
  category: DemoGateResult["blockers"][number]["category"];
  affectedPath: string;
  reason: string;
  rootCauseCategory: DemoRegenerationRootCauseCategory;
  affectedCategory?: string;
  affectedRecordIds?: string[];
}

export interface DemoRegenerationPlanInput {
  originalRun: DemoRun;
  gateResult: DemoGateResult;
  certification: DemoCertification;
  planId: string;
  plannedAt: string;
  attemptNumber: number;
  nextRunId: string;
}

export interface DemoRegenerationPlan {
  planId: string;
  status: DemoRegenerationPlanStatus;
  originalRun: DemoRun;
  originalRunId: string;
  attemptNumber: number;
  plannedAt: string;
  targets: DemoRegenerationTarget[];
  nextRunId: string;
  recommendedSeedStrategy: DemoRegenerationSeedStrategy;
  recommendedScope: DemoRegenerationScope;
  requiresRevalidation: boolean;
  requiresRecertification: boolean;
  notes: string[];
}

const determineRootCauseCategory = (
  blockerCode: string,
): DemoRegenerationRootCauseCategory => {
  const rootCauseByBlockerCode: Record<
    string,
    DemoRegenerationRootCauseCategory
  > = {
    inventory_profile_required: "inventory",
    company_profile_required: "profile",
    validation_profile_required: "validation",
    executive_assessment_required: "assessment",
    demo_run_required: "quality",
  };

  return rootCauseByBlockerCode[blockerCode] ?? "unknown";
};

export function createDemoRegenerationPlan(
  input: DemoRegenerationPlanInput,
): DemoRegenerationPlan {
  const status: DemoRegenerationPlanStatus =
    input.certification.status === "certified" &&
    input.gateResult.decision !== "rejected"
      ? "not_required"
      : "regeneration_required";

  const targets = input.gateResult.blockers.map(
    (blocker): DemoRegenerationTarget => ({
      blockerCode: blocker.code,
      category: blocker.category,
      affectedPath: blocker.path,
      reason: blocker.message,
      rootCauseCategory: determineRootCauseCategory(blocker.code),
    }),
  );

  const regenerationRequired = status === "regeneration_required";
  const recommendedScope: DemoRegenerationScope = !regenerationRequired
    ? "none"
    : targets.length > 0
      ? "category"
      : "full_run";

  return {
    planId: input.planId,
    status,
    originalRun: input.originalRun,
    originalRunId: input.originalRun.runId,
    attemptNumber: input.attemptNumber,
    plannedAt: input.plannedAt,
    targets,
    nextRunId: input.nextRunId,
    recommendedSeedStrategy: regenerationRequired
      ? "derive_new_seed"
      : "reuse_seed",
    recommendedScope,
    requiresRevalidation: regenerationRequired,
    requiresRecertification: regenerationRequired,
    notes: regenerationRequired
      ? [
          "La corrida requiere regeneración antes de volver a validarse y certificarse.",
        ]
      : ["La corrida está certificada y no requiere regeneración."],
  };
}

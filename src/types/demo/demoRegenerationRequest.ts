import type { DemoRegenerationPlan } from "./demoRegenerationPlan";

// Solicitud declarativa para una futura regeneracion demo.
// No ejecuta regeneracion, no crea datos y no modifica el plan recibido.

export type DemoRegenerationRequestReason =
  | "expired_data"
  | "prospect_changed"
  | "low_demo_quality"
  | "replay_not_recommended"
  | "manual";

export type DemoRegenerationRequestPriority =
  | "low"
  | "normal"
  | "high";

export interface DemoRegenerationRequest {
  planId: string;
  originalRunId: string;
  nextRunId: string;
  reason: DemoRegenerationRequestReason;
  priority: DemoRegenerationRequestPriority;
  requestedScope: DemoRegenerationPlan["recommendedScope"];
  seedStrategy: DemoRegenerationPlan["recommendedSeedStrategy"];
  targetCount: number;
  requiresRevalidation: boolean;
  requiresRecertification: boolean;
  requestedAt: string;
}

export function buildDemoRegenerationRequest(
  plan: DemoRegenerationPlan,
  reason: DemoRegenerationRequestReason,
  priority: DemoRegenerationRequestPriority,
  requestedAt: string,
): DemoRegenerationRequest {
  return {
    planId: plan.planId,
    originalRunId: plan.originalRunId,
    nextRunId: plan.nextRunId,
    reason,
    priority,
    requestedScope: plan.recommendedScope,
    seedStrategy: plan.recommendedSeedStrategy,
    targetCount: plan.targets.length,
    requiresRevalidation: plan.requiresRevalidation,
    requiresRecertification: plan.requiresRecertification,
    requestedAt,
  };
}

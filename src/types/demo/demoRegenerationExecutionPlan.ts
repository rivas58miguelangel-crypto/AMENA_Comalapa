import type { DemoRegenerationResult } from "./demoRegenerationResult";

// Plan declarativo de pasos internos derivado de un resultado de regeneracion.
// No ejecuta regeneracion, no crea datos y no modifica el resultado recibido.

export type RegenerationExecutionPlanStatus =
  | "regeneration_approved"
  | "regeneration_blocked"
  | "review_required"
  | "priority_regeneration";

export type RegenerationExecutionStepType =
  | "prepare_regeneration"
  | "block_regeneration"
  | "request_review"
  | "prioritize_regeneration";

export interface DemoRegenerationExecutionStep {
  order: number;
  type: RegenerationExecutionStepType;
  description: string;
  required: boolean;
}

export interface DemoRegenerationExecutionPlan {
  status: RegenerationExecutionPlanStatus;
  sourceResultStatus: DemoRegenerationResult["status"];
  requestedScope: DemoRegenerationResult["requestedScope"];
  steps: DemoRegenerationExecutionStep[];
  reasons: string[];
  plannedAt: string;
}

export function buildDemoRegenerationExecutionPlan(
  result: DemoRegenerationResult,
): DemoRegenerationExecutionPlan {
  if (result.status === "regeneration_approved") {
    return {
      status: result.status,
      sourceResultStatus: result.status,
      requestedScope: result.requestedScope,
      steps: [
        {
          order: 1,
          type: "prepare_regeneration",
          description: "Preparar los insumos internos para la regeneracion.",
          required: true,
        },
      ],
      reasons: [...result.reasons],
      plannedAt: result.decidedAt,
    };
  }

  if (result.status === "regeneration_blocked") {
    return {
      status: result.status,
      sourceResultStatus: result.status,
      requestedScope: result.requestedScope,
      steps: [
        {
          order: 1,
          type: "block_regeneration",
          description: "Mantener bloqueada cualquier preparacion de regeneracion.",
          required: true,
        },
      ],
      reasons: [...result.reasons],
      plannedAt: result.decidedAt,
    };
  }

  if (result.status === "review_required") {
    return {
      status: result.status,
      sourceResultStatus: result.status,
      requestedScope: result.requestedScope,
      steps: [
        {
          order: 1,
          type: "request_review",
          description: "Solicitar revision antes de preparar la regeneracion.",
          required: true,
        },
      ],
      reasons: [...result.reasons],
      plannedAt: result.decidedAt,
    };
  }

  return {
    status: result.status,
    sourceResultStatus: result.status,
    requestedScope: result.requestedScope,
    steps: [
      {
        order: 1,
        type: "prioritize_regeneration",
        description: "Priorizar la preparacion interna de la regeneracion.",
        required: true,
      },
    ],
    reasons: [...result.reasons],
    plannedAt: result.decidedAt,
  };
}

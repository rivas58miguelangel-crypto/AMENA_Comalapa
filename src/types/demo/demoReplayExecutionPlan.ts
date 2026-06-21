import type { DemoReplayResult } from "./demoReplayResult";

// Plan declarativo de pasos internos derivado de un resultado de replay.
// No ejecuta replay, no regenera datos y no modifica el resultado recibido.

export type ReplayExecutionPlanStatus =
  | "replay_approved"
  | "replay_blocked"
  | "review_required"
  | "regeneration_recommended";

export type ReplayExecutionStepType =
  | "prepare_replay"
  | "block_replay"
  | "request_review"
  | "prepare_regeneration";

export interface DemoReplayExecutionStep {
  order: number;
  type: ReplayExecutionStepType;
  description: string;
  required: boolean;
}

export interface DemoReplayExecutionPlan {
  status: ReplayExecutionPlanStatus;
  sourceResultStatus: DemoReplayResult["status"];
  steps: DemoReplayExecutionStep[];
  reasons: string[];
  plannedAt: string;
}

export function buildDemoReplayExecutionPlan(
  result: DemoReplayResult,
): DemoReplayExecutionPlan {
  if (result.status === "replay_approved") {
    return {
      status: result.status,
      sourceResultStatus: result.status,
      steps: [
        {
          order: 1,
          type: "prepare_replay",
          description: "Preparar los insumos internos para el replay aprobado.",
          required: true,
        },
      ],
      reasons: [...result.reasons],
      plannedAt: result.decidedAt,
    };
  }

  if (result.status === "replay_blocked") {
    return {
      status: result.status,
      sourceResultStatus: result.status,
      steps: [
        {
          order: 1,
          type: "block_replay",
          description: "Mantener bloqueada cualquier preparacion de replay.",
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
      steps: [
        {
          order: 1,
          type: "request_review",
          description: "Solicitar revision antes de preparar el replay.",
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
    steps: [
      {
        order: 1,
        type: "prepare_regeneration",
        description: "Preparar un plan de regeneracion antes del replay.",
        required: true,
      },
    ],
    reasons: [...result.reasons],
    plannedAt: result.decidedAt,
  };
}

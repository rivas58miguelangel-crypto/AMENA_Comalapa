import type { DemoReplayDecision } from "./demoReplayDecision";

// Resultado comunicable derivado de una decision de replay.
// No ejecuta replay, no regenera datos y no modifica la decision recibida.

export type ReplayResultStatus =
  | "replay_approved"
  | "replay_blocked"
  | "review_required"
  | "regeneration_recommended";

export type ReplayResultSeverity = "success" | "warning" | "error";

export interface DemoReplayResult {
  status: ReplayResultStatus;
  severity: ReplayResultSeverity;
  message: string;
  action: DemoReplayDecision["action"];
  riskLevel: DemoReplayDecision["riskLevel"];
  reasons: string[];
  decidedAt: string;
}

export function buildDemoReplayResult(
  decision: DemoReplayDecision,
): DemoReplayResult {
  if (decision.status === "replay_approved") {
    return {
      status: decision.status,
      severity: "success",
      message: "El replay fue aprobado.",
      action: decision.action,
      riskLevel: decision.riskLevel,
      reasons: [...decision.reasons],
      decidedAt: decision.decidedAt,
    };
  }

  if (decision.status === "replay_blocked") {
    return {
      status: decision.status,
      severity: "error",
      message: "El replay fue bloqueado.",
      action: decision.action,
      riskLevel: decision.riskLevel,
      reasons: [...decision.reasons],
      decidedAt: decision.decidedAt,
    };
  }

  if (decision.status === "review_required") {
    return {
      status: decision.status,
      severity: "warning",
      message: "El replay requiere revision.",
      action: decision.action,
      riskLevel: decision.riskLevel,
      reasons: [...decision.reasons],
      decidedAt: decision.decidedAt,
    };
  }

  return {
    status: decision.status,
    severity: "warning",
    message: "Se recomienda regenerar los datos antes del replay.",
    action: decision.action,
    riskLevel: decision.riskLevel,
    reasons: [...decision.reasons],
    decidedAt: decision.decidedAt,
  };
}

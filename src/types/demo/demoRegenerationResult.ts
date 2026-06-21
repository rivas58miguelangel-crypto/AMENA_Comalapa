import type { DemoRegenerationDecision } from "./demoRegenerationDecision";

// Resultado comunicable derivado de una decision de regeneracion.
// No ejecuta regeneracion, no crea datos y no modifica la decision recibida.

export type RegenerationResultStatus =
  | "regeneration_approved"
  | "regeneration_blocked"
  | "review_required"
  | "priority_regeneration";

export type RegenerationResultSeverity = "success" | "warning" | "error";

export interface DemoRegenerationResult {
  status: RegenerationResultStatus;
  severity: RegenerationResultSeverity;
  message: string;
  action: DemoRegenerationDecision["action"];
  riskLevel: DemoRegenerationDecision["riskLevel"];
  requestReason: DemoRegenerationDecision["requestReason"];
  requestPriority: DemoRegenerationDecision["requestPriority"];
  requestedScope: DemoRegenerationDecision["requestedScope"];
  reasons: string[];
  decidedAt: string;
}

export function buildDemoRegenerationResult(
  decision: DemoRegenerationDecision,
): DemoRegenerationResult {
  if (decision.status === "regeneration_approved") {
    return {
      ...decision,
      severity: "success",
      message: "La regeneracion fue aprobada.",
      reasons: [...decision.reasons],
    };
  }

  if (decision.status === "regeneration_blocked") {
    return {
      ...decision,
      severity: "error",
      message: "La regeneracion fue bloqueada.",
      reasons: [...decision.reasons],
    };
  }

  if (decision.status === "review_required") {
    return {
      ...decision,
      severity: "warning",
      message: "La regeneracion requiere revision.",
      reasons: [...decision.reasons],
    };
  }

  return {
    ...decision,
    severity: "warning",
    message: "La regeneracion debe atenderse con prioridad.",
    reasons: [...decision.reasons],
  };
}

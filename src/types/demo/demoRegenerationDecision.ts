import type { DemoRegenerationRequest } from "./demoRegenerationRequest";

// Decision operacional declarativa para una solicitud de regeneracion.
// No ejecuta regeneracion, no crea datos y no modifica la solicitud recibida.

export type RegenerationDecisionStatus =
  | "regeneration_approved"
  | "regeneration_blocked"
  | "review_required"
  | "priority_regeneration";

export type RegenerationDecisionAction =
  | "approve_regeneration"
  | "block_regeneration"
  | "request_review"
  | "prioritize_regeneration";

export type RegenerationDecisionRiskLevel = "low" | "medium" | "high";

export interface DemoRegenerationDecision {
  status: RegenerationDecisionStatus;
  action: RegenerationDecisionAction;
  riskLevel: RegenerationDecisionRiskLevel;
  requestReason: DemoRegenerationRequest["reason"];
  requestPriority: DemoRegenerationRequest["priority"];
  requestedScope: DemoRegenerationRequest["requestedScope"];
  reasons: string[];
  decidedAt: string;
}

export function buildDemoRegenerationDecision(
  request: DemoRegenerationRequest,
): DemoRegenerationDecision {
  if (request.requestedScope === "none") {
    return {
      status: "regeneration_blocked",
      action: "block_regeneration",
      riskLevel: "high",
      requestReason: request.reason,
      requestPriority: request.priority,
      requestedScope: request.requestedScope,
      reasons: ["La solicitud no define un alcance de regeneracion."],
      decidedAt: request.requestedAt,
    };
  }

  if (request.reason === "manual") {
    return {
      status: "review_required",
      action: "request_review",
      riskLevel: "medium",
      requestReason: request.reason,
      requestPriority: request.priority,
      requestedScope: request.requestedScope,
      reasons: ["La solicitud manual requiere revision antes de aprobarse."],
      decidedAt: request.requestedAt,
    };
  }

  if (request.priority === "high") {
    return {
      status: "priority_regeneration",
      action: "prioritize_regeneration",
      riskLevel: "high",
      requestReason: request.reason,
      requestPriority: request.priority,
      requestedScope: request.requestedScope,
      reasons: ["La solicitud requiere regeneracion prioritaria."],
      decidedAt: request.requestedAt,
    };
  }

  return {
    status: "regeneration_approved",
    action: "approve_regeneration",
    riskLevel: "low",
    requestReason: request.reason,
    requestPriority: request.priority,
    requestedScope: request.requestedScope,
    reasons: ["La solicitud de regeneracion fue aprobada."],
    decidedAt: request.requestedAt,
  };
}

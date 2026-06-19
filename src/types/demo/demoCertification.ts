import type { DemoGateResult } from "./demoQualityGate";

// Certificación formal derivada exclusivamente de la decisión del quality gate.
// No genera, modifica ni persiste datos demo.

export type DemoCertificationStatus = "certified" | "not_certified";

export interface DemoCertification {
  status: DemoCertificationStatus;
  gateDecision: DemoGateResult["decision"];
  certifiedAt: string;
  notes: string;
}

export function certifyDemoQuality(
  gateResult: DemoGateResult,
): DemoCertification {
  const isCertified = gateResult.decision === "approved";

  return {
    status: isCertified ? "certified" : "not_certified",
    gateDecision: gateResult.decision,
    certifiedAt: gateResult.evaluatedAt,
    notes: isCertified
      ? "La corrida demo fue aprobada por el quality gate y quedó certificada."
      : "La corrida demo fue rechazada por el quality gate y no puede certificarse.",
  };
}

export const defaultDemoCertification: DemoCertification = {
  status: "not_certified",
  gateDecision: "rejected",
  certifiedAt: "2026-01-01T00:00:00.000Z",
  notes:
    "La corrida demo fue rechazada por el quality gate y no puede certificarse.",
};

import assert from "node:assert/strict";
import { buildOperationalCaseFromFinding, isContributionForOperationalCase, isOperationalCaseContribution } from "../src/demo/bridge/operationalCaseMessagingBridge";
import { applyOperationalContributionToFinding } from "../src/demo/derivation/applyOperationalContributionToFinding";
import type { DemoInjectedFinding, OperationalContribution } from "../src/demo/domain/demoFindings";

const finding: DemoInjectedFinding = {
  id: "run-1-finding-1", demoPurpose: "operational-scenario", demoRunId: "run-1", reservationId: "res-1", expedienteId: "exp-1",
  sourceEntityId: "source-1", title: "Finding", summary: "Resumen", severity: "medium", source: "reservations", adminTargetPage: "client",
  adminTargetSection: "Hallazgos", operationalRecommendation: "Revisar", recommendedAction: "Contactar", responsibleRole: "Ventas",
  associatedEvidence: [], visibleStatus: "pending", timestamp: "2026-08-29T00:00:00.000Z",
};
const operationalCase = buildOperationalCaseFromFinding(finding, "2026-08-29T00:00:00.000Z");
const base: OperationalContribution = {
  contributionId: "contribution-1", demoPurpose: "operational-scenario", demoRunId: "run-1", reservationId: "res-1", expedienteId: "exp-1",
  findingId: finding.id, operationalCaseId: operationalCase.operationalCaseId, bridgeId: "bridge-1", authorParticipantId: "demo-role-ventas",
  authorLabel: "Ventas", contributionType: "comment", text: "Aporte humano", createdAt: "2026-08-29T00:01:00.000Z", status: "submitted",
};
const envelope = () => ({ type: "hoperia.operational_case.contribution", schemaVersion: "1.0", ...base, contribution: base });
const accepted = (value = envelope()) => isOperationalCaseContribution(value) && isContributionForOperationalCase(value, operationalCase, "bridge-1");

assert.equal(accepted(), true, "1. aporte válido");
const applied = applyOperationalContributionToFinding(finding, { ...base, status: "accepted" });
assert.equal(applied.operationalState, "updated");
assert.equal(applied.associatedEvidence[0]?.sourceType, "operational_messaging");
assert.equal(applyOperationalContributionToFinding(applied, { ...base, status: "accepted" }), applied, "2. contributionId duplicado");
for (const [label, field] of [
  ["3. demoRunId cruzado", "demoRunId"], ["4. reservationId cruzado", "reservationId"], ["5. expedienteId cruzado", "expedienteId"],
  ["6. findingId cruzado", "findingId"], ["7. operationalCaseId cruzado", "operationalCaseId"], ["8. bridgeId cruzado", "bridgeId"],
] as const) {
  const mutated = envelope();
  (mutated as Record<string, unknown>)[field] = `crossed-${field}`;
  (mutated.contribution as unknown as Record<string, unknown>)[field] = `crossed-${field}`;
  assert.equal(accepted(mutated), false, label);
}
const volunteer = envelope();
(volunteer as Record<string, unknown>).demoPurpose = "volunteer-experience";
(volunteer.contribution as unknown as Record<string, unknown>).demoPurpose = "volunteer-experience";
assert.equal(accepted(volunteer), false, "9. volunteer-experience");
assert.equal(operationalCase.isLocalDemo, false, "10. integrated case remains distinct from standalone");
console.log("Operational contribution scenarios: 10 passed");

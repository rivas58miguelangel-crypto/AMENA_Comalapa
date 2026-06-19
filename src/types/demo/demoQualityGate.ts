import type {
  DemoQualityIssue,
  DemoQualityReport,
} from "./demoDataQualityValidator";

// Decisión formal y reutilizable entre el reporte de calidad y una futura
// certificación demo. No genera, modifica ni persiste datos.

export type DemoGateDecision = "approved" | "rejected";

export interface DemoGateResult {
  decision: DemoGateDecision;
  blockers: DemoQualityIssue[];
  evaluatedAt: string;
}

export function evaluateDemoQualityGate(
  report: DemoQualityReport,
): DemoGateResult {
  return {
    decision: report.status === "passed" ? "approved" : "rejected",
    blockers: report.issues.filter(
      (issue) => issue.severity === "blocker",
    ),
    evaluatedAt: report.evaluatedAt,
  };
}

export const defaultDemoGateResult: DemoGateResult = {
  decision: "rejected",
  blockers: [],
  evaluatedAt: "2026-01-01T00:00:00.000Z",
};

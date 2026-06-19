import type { DemoRun } from "./demoRun";
import type { DemoDataQualityRuleCategory } from "./demoDataQualityPolicy";

// Primer control formal de presencia estructural para una corrida demo.
// No genera datos, no persiste resultados y no reemplaza validaciones previas.

export type DemoQualityIssueSeverity = "blocker" | "warning" | "info";

export type DemoQualityReportStatus = "passed" | "failed";

export interface DemoQualityIssue {
  code: string;
  severity: DemoQualityIssueSeverity;
  category: DemoDataQualityRuleCategory;
  path: string;
  message: string;
}

export interface DemoQualityReport {
  status: DemoQualityReportStatus;
  issues: DemoQualityIssue[];
  evaluatedAt: string;
}

export interface DemoDataQualityValidationInput {
  run: DemoRun | null | undefined;
  evaluatedAt?: string;
}

export function validateDemoDataQuality(
  input: DemoDataQualityValidationInput,
): DemoQualityReport {
  const issues: DemoQualityIssue[] = [];
  const addBlocker = (
    code: string,
    category: DemoDataQualityRuleCategory,
    path: string,
    message: string,
  ): void => {
    issues.push({
      code,
      severity: "blocker",
      category,
      path,
      message,
    });
  };

  if (!input.run) {
    addBlocker(
      "demo_run_required",
      "traceability",
      "run",
      "La validación de calidad requiere una corrida demo.",
    );
  } else {
    const scenario = input.run.scenario;

    if (!scenario.activeCompanyProfile?.companyDNA) {
      addBlocker(
        "company_profile_required",
        "realism",
        "run.scenario.activeCompanyProfile.companyDNA",
        "La corrida debe incluir un perfil de empresa.",
      );
    }

    if (!scenario.inventoryValidation) {
      addBlocker(
        "inventory_profile_required",
        "real_estate_coherence",
        "run.scenario.inventoryValidation",
        "La corrida debe incluir un perfil de inventario validado.",
      );
    }

    if (!scenario.companyValidation) {
      addBlocker(
        "validation_profile_required",
        "traceability",
        "run.scenario.companyValidation",
        "La corrida debe incluir el resultado de validación del perfil.",
      );
    }

    if (!scenario.executiveAssessment) {
      addBlocker(
        "executive_assessment_required",
        "executive_limits",
        "run.scenario.executiveAssessment",
        "La corrida debe incluir una evaluación ejecutiva.",
      );
    }
  }

  return {
    status: issues.some((issue) => issue.severity === "blocker")
      ? "failed"
      : "passed",
    issues,
    evaluatedAt: input.evaluatedAt ?? new Date().toISOString(),
  };
}

export const defaultDemoQualityReport: DemoQualityReport = {
  status: "failed",
  issues: [
    {
      code: "demo_run_required",
      severity: "blocker",
      category: "traceability",
      path: "run",
      message: "La validación de calidad requiere una corrida demo.",
    },
  ],
  evaluatedAt: "2026-01-01T00:00:00.000Z",
};

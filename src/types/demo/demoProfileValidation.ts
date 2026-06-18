import {
  type DemoCompanyDNA,
  type DemoCompanyDNAValidationIssue,
  validateDemoCompanyDNA,
} from "./demoCompanyDNA";

export type DemoProfileReadinessStatus =
  | "incompleto"
  | "usable"
  | "listo_para_demo"
  | "premium_demo_ready";

export type DemoProfileValidationSeverity =
  | "bloqueante"
  | "advertencia"
  | "informacion";

export interface DemoProfileValidationIssue {
  code: string;
  severity: DemoProfileValidationSeverity;
  path: string;
  message: string;
}

export interface DemoProfileRecommendedNextStep {
  code: string;
  priority: "alta" | "media" | "baja";
  title: string;
  description: string;
  path?: string;
}

export interface DemoProfileExecutiveSummary {
  headline: string;
  summary: string;
  strengths: string[];
  gaps: string[];
}

export interface DemoProfileValidationResult {
  score: number;
  status: DemoProfileReadinessStatus;
  isReadyForDemo: boolean;
  hasBlockingIssues: boolean;
  hasPremiumOperationalDepth: boolean;
  issues: DemoProfileValidationIssue[];
  blockingIssues: DemoProfileValidationIssue[];
  warnings: DemoProfileValidationIssue[];
  information: DemoProfileValidationIssue[];
  executiveSummary: DemoProfileExecutiveSummary;
  recommendedNextSteps: DemoProfileRecommendedNextStep[];
}

const hasText = (value: string): boolean => value.trim().length > 0;

const countItems = (values: string[]): number =>
  values.filter((value) => hasText(value)).length;

const hasItems = (values: string[]): boolean => countItems(values) > 0;

const scoreText = (value: string, points: number): number =>
  hasText(value) ? points : 0;

const scoreList = (values: string[], points: number): number =>
  hasItems(values) ? points : 0;

const mapBaseIssue = (
  issue: DemoCompanyDNAValidationIssue,
): DemoProfileValidationIssue => ({
  code: issue.code,
  severity:
    issue.severity === "blocking_error"
      ? "bloqueante"
      : issue.severity === "warning"
        ? "advertencia"
        : "informacion",
  path: issue.path,
  message: issue.message,
});

const calculateReadinessScore = (profile: DemoCompanyDNA): number => {
  const corporate = profile.corporateIdentity;
  const project = profile.projectIdentity;
  const brand = profile.brandIdentity;
  const operational = profile.operationalDNA;
  const executive = profile.executiveDNA;

  // Identidad corporativa: 15 puntos.
  const corporateScore =
    scoreText(corporate.companyName, 5) +
    scoreText(corporate.commercialName, 2) +
    scoreText(corporate.legalName, 2) +
    scoreText(corporate.website, 1) +
    scoreText(corporate.location, 2) +
    scoreList(corporate.phones, 1) +
    scoreList(corporate.emails, 2);

  // Identidad del proyecto: 20 puntos.
  const projectScore =
    scoreText(project.projectName, 5) +
    scoreText(project.projectType, 4) +
    scoreText(project.projectLocation, 3) +
    scoreText(project.description, 3) +
    scoreList(project.targetMarket, 2) +
    scoreText(project.valueProposition, 3);

  // Imagen corporativa: 15 puntos.
  const brandScore =
    (hasText(brand.corporateLogoUrl) || hasText(brand.projectLogoUrl) ? 3 : 0) +
    (hasText(brand.primaryColor) || hasText(brand.secondaryColor) ? 3 : 0) +
    scoreList(brand.typography, 2) +
    (hasItems(brand.officialPhotos) || hasItems(brand.renderImages) ? 3 : 0) +
    scoreList(brand.supportImages, 1) +
    scoreList(brand.videos, 1) +
    scoreText(brand.brandManualUrl, 2);

  // ADN operacional: 30 puntos.
  const operationalScore =
    scoreList(operational.inventoryStructure, 5) +
    scoreList(operational.inventoryVocabulary, 4) +
    scoreList(operational.processStates, 5) +
    scoreList(operational.organizationalRoles, 4) +
    scoreList(operational.requiredDocuments, 3) +
    scoreList(operational.commercialRules, 5) +
    scoreList(operational.operationalFlows, 4);

  // ADN ejecutivo: 20 puntos.
  const executiveScore =
    scoreList(executive.executiveConcerns, 4) +
    scoreList(executive.keyIndicators, 5) +
    scoreList(executive.strategicQuestions, 5) +
    scoreList(executive.frequentDecisions, 3) +
    scoreList(executive.criticalRisks, 3);

  return Math.min(
    100,
    corporateScore +
      projectScore +
      brandScore +
      operationalScore +
      executiveScore,
  );
};

const hasPremiumOperationalDepth = (profile: DemoCompanyDNA): boolean => {
  const operational = profile.operationalDNA;
  const executive = profile.executiveDNA;

  return (
    countItems(operational.inventoryStructure) >= 3 &&
    countItems(operational.inventoryVocabulary) >= 3 &&
    countItems(operational.processStates) >= 4 &&
    countItems(operational.organizationalRoles) >= 3 &&
    countItems(operational.requiredDocuments) >= 2 &&
    countItems(operational.commercialRules) >= 3 &&
    countItems(operational.operationalFlows) >= 2 &&
    countItems(executive.keyIndicators) >= 3 &&
    countItems(executive.strategicQuestions) >= 2 &&
    countItems(executive.criticalRisks) >= 2
  );
};

const determineStatus = (
  score: number,
  hasBlockingIssues: boolean,
  premiumOperationalDepth: boolean,
): DemoProfileReadinessStatus => {
  if (score < 40 || hasBlockingIssues) return "incompleto";
  if (score < 70) return "usable";
  if (score >= 90 && premiumOperationalDepth) return "premium_demo_ready";
  return "listo_para_demo";
};

const buildExecutiveSummary = (
  profile: DemoCompanyDNA,
  score: number,
  status: DemoProfileReadinessStatus,
  issues: DemoProfileValidationIssue[],
  premiumOperationalDepth: boolean,
): DemoProfileExecutiveSummary => {
  const strengths: string[] = [];
  const gaps: string[] = [];

  if (hasText(profile.corporateIdentity.companyName)) {
    strengths.push("La identidad corporativa principal está definida.");
  }
  if (
    hasItems(profile.operationalDNA.inventoryStructure) &&
    hasItems(profile.operationalDNA.processStates)
  ) {
    strengths.push("La operación cuenta con estructura de inventario y estados.");
  }
  if (
    hasItems(profile.executiveDNA.keyIndicators) &&
    hasItems(profile.executiveDNA.strategicQuestions)
  ) {
    strengths.push("El perfil incluye contexto ejecutivo para orientar la demo.");
  }
  if (premiumOperationalDepth) {
    strengths.push("El ADN tiene profundidad suficiente para escenarios premium.");
  }

  issues
    .filter((issue) => issue.severity !== "informacion")
    .slice(0, 4)
    .forEach((issue) => gaps.push(issue.message));

  const headlineByStatus: Record<DemoProfileReadinessStatus, string> = {
    incompleto: "Perfil incompleto para una simulación confiable",
    usable: "Perfil usable con preparación adicional recomendada",
    listo_para_demo: "Perfil listo para una demostración operacional",
    premium_demo_ready: "Perfil listo para una demostración premium",
  };

  const summaryByStatus: Record<DemoProfileReadinessStatus, string> = {
    incompleto:
      "Faltan elementos esenciales del ADN. No debe inyectarse un escenario hasta resolver los bloqueantes.",
    usable:
      "El perfil permite preparar un escenario básico, pero todavía necesita mayor contexto para una demo consistente.",
    listo_para_demo:
      "El perfil contiene la información necesaria para generar una demostración creíble sin bloqueantes.",
    premium_demo_ready:
      "El perfil combina identidad, operación y contexto ejecutivo con profundidad suficiente para una demo de alto nivel.",
  };

  return {
    headline: headlineByStatus[status],
    summary: `${summaryByStatus[status]} Puntaje de preparación: ${score}/100.`,
    strengths,
    gaps,
  };
};

const buildRecommendedNextSteps = (
  issues: DemoProfileValidationIssue[],
  premiumOperationalDepth: boolean,
): DemoProfileRecommendedNextStep[] => {
  const steps: DemoProfileRecommendedNextStep[] = issues.map((issue) => ({
    code: `resolve_${issue.code}`,
    priority:
      issue.severity === "bloqueante"
        ? "alta"
        : issue.severity === "advertencia"
          ? "media"
          : "baja",
    title:
      issue.severity === "bloqueante"
        ? "Resolver requisito bloqueante"
        : issue.severity === "advertencia"
          ? "Completar información recomendada"
          : "Fortalecer el perfil",
    description: issue.message,
    path: issue.path,
  }));

  if (!premiumOperationalDepth) {
    steps.push({
      code: "increase_operational_depth",
      priority: "media",
      title: "Profundizar el ADN operacional",
      description:
        "Agregar variedad suficiente de inventario, estados, roles, reglas, flujos, indicadores, preguntas y riesgos para sostener una demo premium.",
      path: "operationalDNA",
    });
  }

  return steps;
};

export function validateDemoCompanyProfile(
  profile: DemoCompanyDNA,
): DemoProfileValidationResult {
  const baseValidation = validateDemoCompanyDNA(profile);
  const issues = baseValidation.issues.map(mapBaseIssue);
  const score = calculateReadinessScore(profile);
  const blockingIssues = issues.filter(
    (issue) => issue.severity === "bloqueante",
  );
  const warnings = issues.filter(
    (issue) => issue.severity === "advertencia",
  );
  const information = issues.filter(
    (issue) => issue.severity === "informacion",
  );
  const premiumOperationalDepth = hasPremiumOperationalDepth(profile);
  const hasBlockingIssues = blockingIssues.length > 0;
  const status = determineStatus(
    score,
    hasBlockingIssues,
    premiumOperationalDepth,
  );

  return {
    score,
    status,
    isReadyForDemo:
      status === "listo_para_demo" || status === "premium_demo_ready",
    hasBlockingIssues,
    hasPremiumOperationalDepth: premiumOperationalDepth,
    issues,
    blockingIssues,
    warnings,
    information,
    executiveSummary: buildExecutiveSummary(
      profile,
      score,
      status,
      issues,
      premiumOperationalDepth,
    ),
    recommendedNextSteps: buildRecommendedNextSteps(
      issues,
      premiumOperationalDepth,
    ),
  };
}

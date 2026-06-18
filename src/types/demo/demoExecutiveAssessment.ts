import type { DemoCompanyDNA } from "./demoCompanyDNA";
import {
  type DemoProfileReadinessStatus,
  type DemoProfileValidationResult,
  validateDemoCompanyProfile,
} from "./demoProfileValidation";

export type DemoRecommendedMode =
  | "discovery_needed"
  | "standard_demo"
  | "executive_demo"
  | "premium_director_demo";

export interface DemoExecutiveStrength {
  code: string;
  title: string;
  description: string;
  source: "corporate" | "project" | "brand" | "operational" | "executive";
}

export interface DemoExecutiveRisk {
  code: string;
  level: "alto" | "medio" | "bajo";
  title: string;
  description: string;
  path?: string;
}

export interface DemoExecutiveOpportunity {
  code: string;
  title: string;
  description: string;
  impact: "alto" | "medio" | "bajo";
}

export interface DemoExecutiveAction {
  code: string;
  priority: "alta" | "media" | "baja";
  title: string;
  description: string;
  path?: string;
}

export interface DemoExecutiveAssessment {
  profileId: string;
  profileName: string;
  readinessStatus: DemoProfileReadinessStatus;
  score: number;
  recommendedMode: DemoRecommendedMode;
  narrative: string;
  directorGeneralMessage: string;
  strengths: DemoExecutiveStrength[];
  risks: DemoExecutiveRisk[];
  opportunities: DemoExecutiveOpportunity[];
  suggestedActions: DemoExecutiveAction[];
  validation: DemoProfileValidationResult;
}

const hasText = (value: string): boolean => value.trim().length > 0;

const countItems = (values: string[]): number =>
  values.filter((value) => hasText(value)).length;

const recommendedModeByStatus: Record<
  DemoProfileReadinessStatus,
  DemoRecommendedMode
> = {
  incompleto: "discovery_needed",
  usable: "standard_demo",
  listo_para_demo: "executive_demo",
  premium_demo_ready: "premium_director_demo",
};

const buildStrengths = (
  profile: DemoCompanyDNA,
  validation: DemoProfileValidationResult,
): DemoExecutiveStrength[] => {
  const strengths: DemoExecutiveStrength[] = [];

  if (
    hasText(profile.corporateIdentity.companyName) &&
    hasText(profile.projectIdentity.projectName)
  ) {
    strengths.push({
      code: "identity_context_defined",
      title: "Contexto corporativo y de proyecto definido",
      description:
        "La demostración puede presentarse con una identidad empresarial y un proyecto claramente identificables.",
      source: "corporate",
    });
  }

  if (
    countItems(profile.operationalDNA.inventoryStructure) > 0 &&
    countItems(profile.operationalDNA.processStates) > 0
  ) {
    strengths.push({
      code: "operational_structure_defined",
      title: "Estructura operacional disponible",
      description:
        "El perfil define inventario y estados suficientes para organizar recorridos y escenarios operacionales.",
      source: "operational",
    });
  }

  if (
    countItems(profile.executiveDNA.keyIndicators) > 0 &&
    countItems(profile.executiveDNA.strategicQuestions) > 0
  ) {
    strengths.push({
      code: "executive_context_defined",
      title: "Contexto ejecutivo disponible",
      description:
        "La demo puede vincular indicadores y preguntas estratégicas con decisiones de dirección.",
      source: "executive",
    });
  }

  if (
    hasText(profile.brandIdentity.primaryColor) ||
    hasText(profile.brandIdentity.secondaryColor) ||
    hasText(profile.brandIdentity.corporateLogoUrl) ||
    hasText(profile.brandIdentity.projectLogoUrl)
  ) {
    strengths.push({
      code: "brand_context_available",
      title: "Base de identidad visual disponible",
      description:
        "Existen elementos de marca que pueden mantener coherencia visual con el cliente.",
      source: "brand",
    });
  }

  if (validation.hasPremiumOperationalDepth) {
    strengths.push({
      code: "premium_operational_depth",
      title: "Profundidad operacional premium",
      description:
        "La combinación de inventario, roles, reglas, flujos, indicadores y riesgos permite una conversación directiva de mayor profundidad.",
      source: "executive",
    });
  }

  return strengths;
};

const buildRisks = (
  validation: DemoProfileValidationResult,
): DemoExecutiveRisk[] =>
  validation.issues.map((issue) => ({
    code: issue.code,
    level:
      issue.severity === "bloqueante"
        ? "alto"
        : issue.severity === "advertencia"
          ? "medio"
          : "bajo",
    title:
      issue.severity === "bloqueante"
        ? "Información esencial pendiente"
        : issue.severity === "advertencia"
          ? "Preparación incompleta"
          : "Oportunidad de profundización",
    description: issue.message,
    path: issue.path,
  }));

const buildOpportunities = (
  profile: DemoCompanyDNA,
  validation: DemoProfileValidationResult,
): DemoExecutiveOpportunity[] => {
  const opportunities: DemoExecutiveOpportunity[] = [];

  if (countItems(profile.executiveDNA.strategicQuestions) > 0) {
    opportunities.push({
      code: "executive_questions_available",
      title: "Orientar la demo a preguntas reales de dirección",
      description:
        "Las preguntas estratégicas registradas permiten construir un cierre centrado en decisiones ejecutivas.",
      impact: "alto",
    });
  }

  if (
    countItems(profile.operationalDNA.commercialRules) > 0 &&
    countItems(profile.operationalDNA.operationalFlows) > 0
  ) {
    opportunities.push({
      code: "operational_scenarios_available",
      title: "Demostrar reglas y flujos propios del cliente",
      description:
        "El escenario puede reflejar cómo H-OperIA acompaña la operación sin depender de un relato genérico.",
      impact: "alto",
    });
  }

  if (
    countItems(profile.executiveDNA.keyIndicators) > 0 &&
    countItems(profile.executiveDNA.criticalRisks) > 0
  ) {
    opportunities.push({
      code: "risk_indicator_story_available",
      title: "Conectar indicadores con riesgos críticos",
      description:
        "La demostración puede mostrar cómo las señales operacionales apoyan prioridades y decisiones de dirección.",
      impact: "alto",
    });
  }

  if (!validation.hasPremiumOperationalDepth) {
    opportunities.push({
      code: "premium_depth_opportunity",
      title: "Elevar la demo a conversación premium",
      description:
        "Profundizar inventario, roles, reglas, indicadores y riesgos permitiría preparar una sesión especializada para Dirección General.",
      impact: "medio",
    });
  }

  return opportunities;
};

const buildSuggestedActions = (
  validation: DemoProfileValidationResult,
): DemoExecutiveAction[] =>
  validation.recommendedNextSteps.map((step) => ({
    code: step.code,
    priority: step.priority,
    title: step.title,
    description: step.description,
    path: step.path,
  }));

const buildNarrative = (
  profile: DemoCompanyDNA,
  validation: DemoProfileValidationResult,
  mode: DemoRecommendedMode,
): string => {
  const company =
    profile.corporateIdentity.commercialName.trim() ||
    profile.corporateIdentity.companyName.trim() ||
    "la empresa evaluada";
  const project =
    profile.projectIdentity.projectName.trim() || "el proyecto evaluado";

  const narrativeByMode: Record<DemoRecommendedMode, string> = {
    discovery_needed: `${company} requiere completar información esencial antes de simular ${project}. La siguiente conversación debe enfocarse en descubrimiento, inventario, estados y reglas comerciales.`,
    standard_demo: `${company} cuenta con una base usable para presentar ${project}. Se recomienda una demostración estándar y controlada, evitando conclusiones ejecutivas que todavía no estén respaldadas por suficiente contexto.`,
    executive_demo: `${company} dispone de un perfil listo para demostrar ${project} con enfoque operacional y ejecutivo. La sesión puede conectar flujos, indicadores, riesgos y próximos pasos sin depender de una narrativa genérica.`,
    premium_director_demo: `${company} presenta un ADN suficientemente completo para una demostración premium de ${project}. La conversación puede centrarse en prioridades de Dirección General, riesgos críticos, indicadores y capacidad de decisión.`,
  };

  return `${narrativeByMode[mode]} Preparación actual: ${validation.score}/100.`;
};

const buildDirectorGeneralMessage = (
  validation: DemoProfileValidationResult,
  mode: DemoRecommendedMode,
): string => {
  const messageByMode: Record<DemoRecommendedMode, string> = {
    discovery_needed:
      "Antes de demostrar resultados, necesitamos comprender mejor cómo opera la organización.",
    standard_demo:
      "La organización ya permite una demostración inicial; conviene completar contexto antes de elevar conclusiones.",
    executive_demo:
      "La demostración puede mostrar cómo la operación se convierte en prioridades, evidencia y capacidad de decisión.",
    premium_director_demo:
      "El perfil está preparado para mostrar a Dirección General riesgos, oportunidades y decisiones respaldadas por evidencia operacional.",
  };

  return `${messageByMode[mode]} Puntaje de preparación: ${validation.score}/100.`;
};

export function createDemoExecutiveAssessment(
  profile: DemoCompanyDNA,
): DemoExecutiveAssessment {
  const validation = validateDemoCompanyProfile(profile);
  const recommendedMode = recommendedModeByStatus[validation.status];

  return {
    profileId: profile.id,
    profileName: profile.name,
    readinessStatus: validation.status,
    score: validation.score,
    recommendedMode,
    narrative: buildNarrative(profile, validation, recommendedMode),
    directorGeneralMessage: buildDirectorGeneralMessage(
      validation,
      recommendedMode,
    ),
    strengths: buildStrengths(profile, validation),
    risks: buildRisks(validation),
    opportunities: buildOpportunities(profile, validation),
    suggestedActions: buildSuggestedActions(validation),
    validation,
  };
}

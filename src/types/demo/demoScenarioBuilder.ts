import {
  type DemoCompanyDNA,
  defaultDemoCompanyDNA,
} from "./demoCompanyDNA";
import {
  type DemoExecutiveAssessment,
  createDemoExecutiveAssessment,
} from "./demoExecutiveAssessment";
import {
  type DemoInventoryProfile,
  type DemoInventoryValidationResult,
  defaultDemoInventoryProfile,
  validateDemoInventoryProfile,
} from "./demoInventoryProfile";
import {
  type DemoProfileValidationResult,
  validateDemoCompanyProfile,
} from "./demoProfileValidation";
import {
  type DemoActiveCompanyProfile,
  createDemoActiveCompanyProfile,
} from "./demoActiveCompanyProfile";

// Puente conceptual del futuro Motor Demo H-OperIA. AMENA Comalapa es solo
// un caso demo: este builder debe aceptar perfiles reemplazables de prospectos.

export interface DemoScenarioBuilderInput {
  scenarioId: string;
  scenarioName: string;
  objective: string;
  audience: string[];
  companyDNA: DemoCompanyDNA;
  inventoryProfile: DemoInventoryProfile;
  generatedAt: string;
}

export type DemoScenarioReadinessStatus =
  | "blocked"
  | "draft"
  | "prepared";

export interface DemoScenarioReadiness {
  status: DemoScenarioReadinessStatus;
  isReadyForDemo: boolean;
  companyProfileScore: number;
  companyProfileReady: boolean;
  inventoryReady: boolean;
  hasBlockingIssues: boolean;
  recommendedMode: DemoExecutiveAssessment["recommendedMode"];
  summary: string;
}

export interface DemoScenarioNarrative {
  title: string;
  opening: string;
  operationalStory: string;
  executiveStory: string;
  closing: string;
}

export interface DemoScenarioOperationalSeed {
  projectIds: string[];
  developmentTypes: Array<"vertical" | "horizontal" | "mixed">;
  phaseIds: string[];
  towerIds: string[];
  blockIds: string[];
  apartmentIds: string[];
  lotIds: string[];
  amenityIds: string[];
  inventoryStructure: string[];
  inventoryVocabulary: string[];
  processStates: string[];
  organizationalRoles: string[];
  commercialRules: string[];
  operationalFlows: string[];
  keyIndicators: string[];
  strategicQuestions: string[];
  criticalRisks: string[];
}

export interface DemoScenarioIndependenceMap {
  isProspectReplaceable: true;
  isIndependentFromAmenaComalapa: true;
  inventorySource: "demoInventoryProfile";
  operationalDnaSource: "demoCompanyDNA";
  preparationSources: Array<
    "demoProfileValidation" | "demoExecutiveAssessment"
  >;
  currentTarget: "detached_scenario";
  futureTargets: Array<
    "centro_demo_ui" | "supabase" | "separate_demo_engine"
  >;
  notes: string[];
}

export interface DemoScenarioBuilderOutput {
  scenarioId: string;
  scenarioName: string;
  objective: string;
  audience: string[];
  generatedAt: string;
  readiness: DemoScenarioReadiness;
  narrative: DemoScenarioNarrative;
  operationalSeed: DemoScenarioOperationalSeed;
  independence: DemoScenarioIndependenceMap;
  companyValidation: DemoProfileValidationResult;
  inventoryValidation: DemoInventoryValidationResult;
  executiveAssessment: DemoExecutiveAssessment;
  activeCompanyProfile: DemoActiveCompanyProfile;
}

export type DemoScenarioBuilderValidationSeverity = "error" | "warning";

export interface DemoScenarioBuilderValidationIssue {
  code: string;
  severity: DemoScenarioBuilderValidationSeverity;
  path: string;
  message: string;
}

export interface DemoScenarioBuilderInputValidation {
  isValid: boolean;
  issues: DemoScenarioBuilderValidationIssue[];
  errors: DemoScenarioBuilderValidationIssue[];
  warnings: DemoScenarioBuilderValidationIssue[];
  companyValidation: DemoProfileValidationResult;
  inventoryValidation: DemoInventoryValidationResult;
}

const hasText = (value: string): boolean => value.trim().length > 0;

const unique = <Value>(values: Value[]): Value[] => [...new Set(values)];

export function validateDemoScenarioBuilderInput(
  input: DemoScenarioBuilderInput,
): DemoScenarioBuilderInputValidation {
  const issues: DemoScenarioBuilderValidationIssue[] = [];
  const companyValidation = validateDemoCompanyProfile(input.companyDNA);
  const inventoryValidation = validateDemoInventoryProfile(
    input.inventoryProfile,
  );

  const addIssue = (
    code: string,
    severity: DemoScenarioBuilderValidationSeverity,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!hasText(input.scenarioId)) {
    addIssue(
      "scenario_id_required",
      "error",
      "scenarioId",
      "El escenario demo requiere un identificador.",
    );
  }

  if (!hasText(input.scenarioName)) {
    addIssue(
      "scenario_name_required",
      "error",
      "scenarioName",
      "El escenario demo requiere un nombre.",
    );
  }

  if (!hasText(input.objective)) {
    addIssue(
      "scenario_objective_required",
      "error",
      "objective",
      "El escenario demo requiere un objetivo.",
    );
  }

  if (!input.audience.some(hasText)) {
    addIssue(
      "scenario_audience_required",
      "warning",
      "audience",
      "Se recomienda definir la audiencia del escenario demo.",
    );
  }

  if (!hasText(input.generatedAt)) {
    addIssue(
      "scenario_generation_date_required",
      "error",
      "generatedAt",
      "El escenario demo requiere una fecha de generación.",
    );
  }

  if (companyValidation.hasBlockingIssues) {
    addIssue(
      "company_dna_not_ready",
      "error",
      "companyDNA",
      "El ADN operacional contiene asuntos bloqueantes.",
    );
  }

  if (!inventoryValidation.isValid) {
    addIssue(
      "inventory_profile_not_ready",
      "error",
      "inventoryProfile",
      "El inventario demo contiene asuntos bloqueantes.",
    );
  }

  if (
    !input.inventoryProfile.projects.some(
      (project) =>
        project.id === input.companyDNA.projectIdentity.projectName ||
        project.name === input.companyDNA.projectIdentity.projectName,
    )
  ) {
    addIssue(
      "project_link_is_conceptual",
      "warning",
      "inventoryProfile.projects",
      "El proyecto del ADN no coincide por ID o nombre con el inventario; el vínculo se mantendrá conceptual.",
    );
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    isValid: errors.length === 0,
    issues,
    errors,
    warnings,
    companyValidation,
    inventoryValidation,
  };
}

const buildReadiness = (
  validation: DemoScenarioBuilderInputValidation,
  assessment: DemoExecutiveAssessment,
): DemoScenarioReadiness => {
  const companyProfileReady = validation.companyValidation.isReadyForDemo;
  const inventoryReady = validation.inventoryValidation.isValid;
  const hasBlockingIssues = !validation.isValid;
  const isReadyForDemo =
    !hasBlockingIssues && companyProfileReady && inventoryReady;
  const status: DemoScenarioReadinessStatus = hasBlockingIssues
    ? "blocked"
    : isReadyForDemo
      ? "prepared"
      : "draft";

  const summaryByStatus: Record<DemoScenarioReadinessStatus, string> = {
    blocked:
      "El escenario requiere corregir información bloqueante antes de prepararse.",
    draft:
      "La estructura es usable, pero todavía necesita profundidad para una demo preparada.",
    prepared:
      "El ADN, el inventario y la evaluación permiten preparar un escenario demo.",
  };

  return {
    status,
    isReadyForDemo,
    companyProfileScore: validation.companyValidation.score,
    companyProfileReady,
    inventoryReady,
    hasBlockingIssues,
    recommendedMode: assessment.recommendedMode,
    summary: summaryByStatus[status],
  };
};

const buildOperationalSeed = (
  input: DemoScenarioBuilderInput,
): DemoScenarioOperationalSeed => {
  const projects = input.inventoryProfile.projects;
  const towers = projects.flatMap((project) => project.towers);
  const blocks = projects.flatMap((project) => project.blocks);

  return {
    projectIds: projects.map((project) => project.id),
    developmentTypes: unique(
      projects.map((project) => project.developmentType),
    ),
    phaseIds: projects.flatMap((project) =>
      project.phases.map((phase) => phase.id),
    ),
    towerIds: towers.map((tower) => tower.id),
    blockIds: blocks.map((block) => block.id),
    apartmentIds: towers.flatMap((tower) =>
      tower.levels.flatMap((level) =>
        level.apartments.map((apartment) => apartment.id),
      ),
    ),
    lotIds: blocks.flatMap((block) => block.lots.map((lot) => lot.id)),
    amenityIds: projects.flatMap((project) =>
      project.amenities.map((amenity) => amenity.id),
    ),
    inventoryStructure: [...input.companyDNA.operationalDNA.inventoryStructure],
    inventoryVocabulary: [
      ...input.companyDNA.operationalDNA.inventoryVocabulary,
    ],
    processStates: [...input.companyDNA.operationalDNA.processStates],
    organizationalRoles: [
      ...input.companyDNA.operationalDNA.organizationalRoles,
    ],
    commercialRules: [...input.companyDNA.operationalDNA.commercialRules],
    operationalFlows: [...input.companyDNA.operationalDNA.operationalFlows],
    keyIndicators: [...input.companyDNA.executiveDNA.keyIndicators],
    strategicQuestions: [
      ...input.companyDNA.executiveDNA.strategicQuestions,
    ],
    criticalRisks: [...input.companyDNA.executiveDNA.criticalRisks],
  };
};

const buildNarrative = (
  input: DemoScenarioBuilderInput,
  assessment: DemoExecutiveAssessment,
): DemoScenarioNarrative => {
  const companyName =
    input.companyDNA.corporateIdentity.commercialName.trim() ||
    input.companyDNA.corporateIdentity.companyName.trim() ||
    "el prospecto demo";
  const projectCount = input.inventoryProfile.projects.length;

  return {
    title: input.scenarioName,
    opening: `Escenario reemplazable preparado para ${companyName}; AMENA Comalapa es únicamente uno de los casos demo posibles.`,
    operationalStory: `El recorrido combina el ADN operacional del prospecto con ${projectCount} proyecto(s) del perfil de inventario demo.`,
    executiveStory: assessment.narrative,
    closing:
      "La preparación puede convertirse más adelante en insumo para el Centro Demo, Supabase o un Motor Demo separado.",
  };
};

const buildIndependenceMap = (): DemoScenarioIndependenceMap => ({
  isProspectReplaceable: true,
  isIndependentFromAmenaComalapa: true,
  inventorySource: "demoInventoryProfile",
  operationalDnaSource: "demoCompanyDNA",
  preparationSources: [
    "demoProfileValidation",
    "demoExecutiveAssessment",
  ],
  currentTarget: "detached_scenario",
  futureTargets: [
    "centro_demo_ui",
    "supabase",
    "separate_demo_engine",
  ],
  notes: [
    "AMENA Comalapa es un caso demo, no una dependencia del builder.",
    "Cada prospecto puede aportar su propio ADN e inventario demo.",
    "Este módulo no persiste datos ni está conectado con la UI.",
  ],
});

export function buildDemoScenario(
  input: DemoScenarioBuilderInput,
): DemoScenarioBuilderOutput {
  const validation = validateDemoScenarioBuilderInput(input);
  const executiveAssessment = createDemoExecutiveAssessment(input.companyDNA);
  const readiness = buildReadiness(validation, executiveAssessment);
  const activeCompanyProfile = createDemoActiveCompanyProfile(
    input.companyDNA,
    {
      activeProfileId: `active-${input.scenarioId}`,
      activatedAt: input.generatedAt,
      scenario: {
        scenarioId: input.scenarioId,
        scenarioName: input.scenarioName,
        description:
          "Escenario reemplazable construido desde ADN e inventario demo.",
        objective: input.objective,
        audience: [...input.audience],
        status:
          readiness.status === "prepared"
            ? "prepared"
            : "draft",
        dataMode: "demo_only",
        seed: `${input.companyDNA.id}:${input.inventoryProfile.id}`,
      },
    },
  );

  return {
    scenarioId: input.scenarioId,
    scenarioName: input.scenarioName,
    objective: input.objective,
    audience: [...input.audience],
    generatedAt: input.generatedAt,
    readiness,
    narrative: buildNarrative(input, executiveAssessment),
    operationalSeed: buildOperationalSeed(input),
    independence: buildIndependenceMap(),
    companyValidation: validation.companyValidation,
    inventoryValidation: validation.inventoryValidation,
    executiveAssessment,
    activeCompanyProfile,
  };
}

const genericDemoCompanyDNA: DemoCompanyDNA = {
  ...defaultDemoCompanyDNA,
  id: "generic-prospect-demo",
  name: "Prospecto inmobiliario demo",
  isExample: true,
  corporateIdentity: {
    ...defaultDemoCompanyDNA.corporateIdentity,
    companyName: "Empresa Prospecto Demo",
    commercialName: "Empresa Prospecto Demo",
    legalName: "Entidad demostrativa sin datos reales",
    website: "https://example.com",
    location: "Ubicación de ejemplo",
    phones: ["+000 0000 0000"],
    emails: ["demo@example.com"],
  },
  projectIdentity: {
    ...defaultDemoCompanyDNA.projectIdentity,
    projectName: "Proyecto Horizonte Demo",
    projectType: "Desarrollo inmobiliario mixto",
    projectLocation: "Ubicación de ejemplo",
    description:
      "Proyecto genérico y reemplazable para preparar escenarios H-OperIA.",
  },
};

export const defaultDemoScenarioBuilderInput: DemoScenarioBuilderInput = {
  scenarioId: "scenario-generic-prospect",
  scenarioName: "Escenario inmobiliario demo reemplazable",
  objective:
    "Demostrar seguimiento, evidencia operacional y apoyo a decisiones sin utilizar datos sensibles.",
  audience: ["Empresa prospecto", "Equipo H-OperIA"],
  companyDNA: genericDemoCompanyDNA,
  inventoryProfile: defaultDemoInventoryProfile,
  generatedAt: "2026-01-01T00:00:00.000Z",
};

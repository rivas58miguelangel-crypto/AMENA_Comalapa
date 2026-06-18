import {
  type BrandIdentity,
  type DemoCompanyDNA,
  defaultDemoCompanyDNA,
} from "./demoCompanyDNA";
import {
  type DemoRecommendedMode,
  createDemoExecutiveAssessment,
} from "./demoExecutiveAssessment";
import {
  type DemoProfileReadinessStatus,
  validateDemoCompanyProfile,
} from "./demoProfileValidation";

export interface DemoActiveCompanyIdentity {
  profileId: string;
  profileVersion: number;
  companyName: string;
  commercialName: string;
  legalName: string;
  location: string;
  website: string;
  phones: string[];
  emails: string[];
  brand: BrandIdentity;
}

export interface DemoActiveCompanyProject {
  projectName: string;
  projectType: string;
  projectLocation: string;
  description: string;
  targetMarket: string[];
  valueProposition: string;
}

export interface DemoActiveCompanyScenario {
  scenarioId: string;
  scenarioName: string;
  description: string;
  objective: string;
  audience: string[];
  status: "draft" | "prepared" | "active";
  dataMode: "demo_only";
  seed?: string;
}

export interface DemoActiveCompanyOperationalContext {
  inventoryStructure: string[];
  inventoryVocabulary: string[];
  processStates: string[];
  organizationalRoles: string[];
  requiredDocuments: string[];
  commercialRules: string[];
  operationalFlows: string[];
  executiveConcerns: string[];
  keyIndicators: string[];
  strategicQuestions: string[];
  frequentDecisions: string[];
  criticalRisks: string[];
}

export interface DemoActiveCompanyReadiness {
  status: DemoProfileReadinessStatus;
  score: number;
  isReadyForDemo: boolean;
  hasBlockingIssues: boolean;
  recommendedMode: DemoRecommendedMode;
  executiveMessage: string;
}

export interface DemoActiveCompanyProfile {
  activeProfileId: string;
  isActive: boolean;
  isReplaceable: true;
  activatedAt: string;
  companyDNA: DemoCompanyDNA;
  identity: DemoActiveCompanyIdentity;
  project: DemoActiveCompanyProject;
  scenario: DemoActiveCompanyScenario;
  operationalContext: DemoActiveCompanyOperationalContext;
  readiness: DemoActiveCompanyReadiness;
}

export interface DemoActiveCompanyProfileOptions {
  activeProfileId?: string;
  activatedAt?: string;
  scenario?: Partial<DemoActiveCompanyScenario>;
}

export interface DemoActiveCompanyProfileValidationIssue {
  code: string;
  severity: "bloqueante" | "advertencia" | "informacion";
  path: string;
  message: string;
}

export interface DemoActiveCompanyProfileValidationResult {
  isValid: boolean;
  isReadyForDemo: boolean;
  issues: DemoActiveCompanyProfileValidationIssue[];
  blockingIssues: DemoActiveCompanyProfileValidationIssue[];
  warnings: DemoActiveCompanyProfileValidationIssue[];
  information: DemoActiveCompanyProfileValidationIssue[];
}

const hasText = (value: string): boolean => value.trim().length > 0;

const cloneList = (values: string[]): string[] => [...values];

const createIdentity = (
  companyDNA: DemoCompanyDNA,
): DemoActiveCompanyIdentity => ({
  profileId: companyDNA.id,
  profileVersion: companyDNA.version,
  companyName: companyDNA.corporateIdentity.companyName,
  commercialName: companyDNA.corporateIdentity.commercialName,
  legalName: companyDNA.corporateIdentity.legalName,
  location: companyDNA.corporateIdentity.location,
  website: companyDNA.corporateIdentity.website,
  phones: cloneList(companyDNA.corporateIdentity.phones),
  emails: cloneList(companyDNA.corporateIdentity.emails),
  brand: {
    ...companyDNA.brandIdentity,
    typography: cloneList(companyDNA.brandIdentity.typography),
    officialPhotos: cloneList(companyDNA.brandIdentity.officialPhotos),
    renderImages: cloneList(companyDNA.brandIdentity.renderImages),
    supportImages: cloneList(companyDNA.brandIdentity.supportImages),
    videos: cloneList(companyDNA.brandIdentity.videos),
  },
});

const createProject = (
  companyDNA: DemoCompanyDNA,
): DemoActiveCompanyProject => ({
  projectName: companyDNA.projectIdentity.projectName,
  projectType: companyDNA.projectIdentity.projectType,
  projectLocation: companyDNA.projectIdentity.projectLocation,
  description: companyDNA.projectIdentity.description,
  targetMarket: cloneList(companyDNA.projectIdentity.targetMarket),
  valueProposition: companyDNA.projectIdentity.valueProposition,
});

const createOperationalContext = (
  companyDNA: DemoCompanyDNA,
): DemoActiveCompanyOperationalContext => ({
  inventoryStructure: cloneList(
    companyDNA.operationalDNA.inventoryStructure,
  ),
  inventoryVocabulary: cloneList(
    companyDNA.operationalDNA.inventoryVocabulary,
  ),
  processStates: cloneList(companyDNA.operationalDNA.processStates),
  organizationalRoles: cloneList(
    companyDNA.operationalDNA.organizationalRoles,
  ),
  requiredDocuments: cloneList(companyDNA.operationalDNA.requiredDocuments),
  commercialRules: cloneList(companyDNA.operationalDNA.commercialRules),
  operationalFlows: cloneList(companyDNA.operationalDNA.operationalFlows),
  executiveConcerns: cloneList(companyDNA.executiveDNA.executiveConcerns),
  keyIndicators: cloneList(companyDNA.executiveDNA.keyIndicators),
  strategicQuestions: cloneList(companyDNA.executiveDNA.strategicQuestions),
  frequentDecisions: cloneList(companyDNA.executiveDNA.frequentDecisions),
  criticalRisks: cloneList(companyDNA.executiveDNA.criticalRisks),
});

export function createDemoActiveCompanyProfile(
  companyDNA: DemoCompanyDNA,
  options: DemoActiveCompanyProfileOptions = {},
): DemoActiveCompanyProfile {
  const validation = validateDemoCompanyProfile(companyDNA);
  const assessment = createDemoExecutiveAssessment(companyDNA);
  const defaultScenario: DemoActiveCompanyScenario = {
    scenarioId: `scenario-${companyDNA.id}`,
    scenarioName: `Escenario demo de ${companyDNA.corporateIdentity.commercialName || companyDNA.corporateIdentity.companyName || "empresa prospecto"}`,
    description:
      "Escenario interno reemplazable, preparado exclusivamente con datos demostrativos.",
    objective:
      "Mostrar cómo H-OperIA convierte actividad operacional en seguimiento, evidencia y capacidad de decisión.",
    audience: ["Equipo comercial", "Dirección", "Equipo H-OperIA"],
    status: validation.isReadyForDemo ? "prepared" : "draft",
    dataMode: "demo_only",
  };

  const scenario: DemoActiveCompanyScenario = {
    ...defaultScenario,
    ...options.scenario,
    audience: options.scenario?.audience
      ? cloneList(options.scenario.audience)
      : defaultScenario.audience,
    dataMode: "demo_only",
  };

  return {
    activeProfileId:
      options.activeProfileId ?? `active-${companyDNA.id}-v${companyDNA.version}`,
    isActive: true,
    isReplaceable: true,
    activatedAt: options.activatedAt ?? new Date().toISOString(),
    companyDNA,
    identity: createIdentity(companyDNA),
    project: createProject(companyDNA),
    scenario,
    operationalContext: createOperationalContext(companyDNA),
    readiness: {
      status: validation.status,
      score: validation.score,
      isReadyForDemo: validation.isReadyForDemo,
      hasBlockingIssues: validation.hasBlockingIssues,
      recommendedMode: assessment.recommendedMode,
      executiveMessage: assessment.directorGeneralMessage,
    },
  };
}

export function validateDemoActiveCompanyProfile(
  profile: DemoActiveCompanyProfile,
): DemoActiveCompanyProfileValidationResult {
  const profileValidation = validateDemoCompanyProfile(profile.companyDNA);
  const issues: DemoActiveCompanyProfileValidationIssue[] =
    profileValidation.issues.map((issue) => ({ ...issue }));

  const addIssue = (
    code: string,
    severity: DemoActiveCompanyProfileValidationIssue["severity"],
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!hasText(profile.activeProfileId)) {
    addIssue(
      "active_profile_id_required",
      "bloqueante",
      "activeProfileId",
      "El perfil activo necesita un identificador.",
    );
  }

  if (profile.identity.profileId !== profile.companyDNA.id) {
    addIssue(
      "profile_identity_mismatch",
      "bloqueante",
      "identity.profileId",
      "La identidad activa no corresponde al ADN de empresa seleccionado.",
    );
  }

  if (profile.identity.profileVersion !== profile.companyDNA.version) {
    addIssue(
      "profile_version_mismatch",
      "bloqueante",
      "identity.profileVersion",
      "La versión activa no corresponde a la versión del ADN seleccionado.",
    );
  }

  if (profile.project.projectName !== profile.companyDNA.projectIdentity.projectName) {
    addIssue(
      "project_identity_mismatch",
      "bloqueante",
      "project.projectName",
      "El proyecto activo no corresponde al proyecto definido en el ADN.",
    );
  }

  if (!hasText(profile.scenario.scenarioId)) {
    addIssue(
      "scenario_id_required",
      "bloqueante",
      "scenario.scenarioId",
      "El escenario activo necesita un identificador.",
    );
  }

  if (!hasText(profile.scenario.scenarioName)) {
    addIssue(
      "scenario_name_required",
      "bloqueante",
      "scenario.scenarioName",
      "El escenario activo necesita un nombre.",
    );
  }

  if (profile.scenario.dataMode !== "demo_only") {
    addIssue(
      "demo_data_mode_required",
      "bloqueante",
      "scenario.dataMode",
      "El perfil activo debe operar exclusivamente con datos demo.",
    );
  }

  if (!profile.isReplaceable) {
    addIssue(
      "replaceable_profile_required",
      "advertencia",
      "isReplaceable",
      "El perfil activo debe poder reemplazarse para preparar otro prospecto.",
    );
  }

  if (
    profile.readiness.score !== profileValidation.score ||
    profile.readiness.status !== profileValidation.status
  ) {
    addIssue(
      "readiness_out_of_sync",
      "advertencia",
      "readiness",
      "La preparación almacenada debe actualizarse desde el ADN vigente.",
    );
  }

  const blockingIssues = issues.filter(
    (issue) => issue.severity === "bloqueante",
  );
  const warnings = issues.filter(
    (issue) => issue.severity === "advertencia",
  );
  const information = issues.filter(
    (issue) => issue.severity === "informacion",
  );

  return {
    isValid: blockingIssues.length === 0,
    isReadyForDemo:
      blockingIssues.length === 0 && profileValidation.isReadyForDemo,
    issues,
    blockingIssues,
    warnings,
    information,
  };
}

const genericDemoCompanyDNA: DemoCompanyDNA = {
  ...defaultDemoCompanyDNA,
  id: "example-prospect-company",
  name: "Empresa Prospecto — Perfil demo reemplazable",
  isExample: true,
  corporateIdentity: {
    ...defaultDemoCompanyDNA.corporateIdentity,
    companyName: "Empresa Prospecto Demo",
    commercialName: "Proyecto Horizonte Demo",
    legalName: "Entidad demostrativa sin datos reales",
    website: "https://example.com",
    location: "Ubicación de ejemplo",
    phones: ["+000 0000 0000"],
    emails: ["demo@example.com"],
  },
  projectIdentity: {
    ...defaultDemoCompanyDNA.projectIdentity,
    projectName: "Proyecto Horizonte Demo",
    projectType: "Proyecto inmobiliario demostrativo",
    projectLocation: "Ubicación de ejemplo",
    description:
      "Proyecto genérico y reemplazable para preparar demostraciones internas de H-OperIA.",
    targetMarket: ["Compradores potenciales", "Familias"],
    valueProposition:
      "Acompañamiento operacional, seguimiento verificable y apoyo a la toma de decisiones.",
  },
};

export const defaultDemoActiveCompanyProfile: DemoActiveCompanyProfile =
  createDemoActiveCompanyProfile(genericDemoCompanyDNA, {
    activeProfileId: "active-example-prospect-company",
    activatedAt: "2026-01-01T00:00:00.000Z",
    scenario: {
      scenarioId: "scenario-generic-realistic-operations",
      scenarioName: "Operación inmobiliaria demo realista",
      description:
        "Escenario seguro con oportunidades, retrasos, objeciones y tareas pendientes.",
      objective:
        "Demostrar capacidades de seguimiento e inteligencia operacional sin mezclar datos de producción.",
      audience: ["Equipo comercial H-OperIA", "Empresa prospecto"],
      status: "prepared",
      dataMode: "demo_only",
      seed: "generic-demo-v1",
    },
  });

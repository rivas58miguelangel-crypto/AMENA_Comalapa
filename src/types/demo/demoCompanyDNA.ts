export interface CorporateIdentity {
  companyName: string;
  commercialName: string;
  legalName: string;
  website: string;
  location: string;
  phones: string[];
  emails: string[];
}

export interface ProjectIdentity {
  projectName: string;
  projectType: string;
  projectLocation: string;
  description: string;
  targetMarket: string[];
  valueProposition: string;
}

export interface BrandIdentity {
  corporateLogoUrl: string;
  projectLogoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  typography: string[];
  officialPhotos: string[];
  renderImages: string[];
  supportImages: string[];
  videos: string[];
  brandManualUrl: string;
}

export interface OperationalDNA {
  inventoryStructure: string[];
  inventoryVocabulary: string[];
  processStates: string[];
  organizationalRoles: string[];
  requiredDocuments: string[];
  commercialRules: string[];
  operationalFlows: string[];
}

export interface ExecutiveDNA {
  executiveConcerns: string[];
  keyIndicators: string[];
  strategicQuestions: string[];
  frequentDecisions: string[];
  criticalRisks: string[];
}

export interface DemoCompanyDNA {
  id: string;
  name: string;
  version: number;
  isExample: boolean;
  corporateIdentity: CorporateIdentity;
  projectIdentity: ProjectIdentity;
  brandIdentity: BrandIdentity;
  operationalDNA: OperationalDNA;
  executiveDNA: ExecutiveDNA;
}

export type DemoCompanyDNAValidationSeverity =
  | "blocking_error"
  | "warning"
  | "information";

export interface DemoCompanyDNAValidationIssue {
  code: string;
  severity: DemoCompanyDNAValidationSeverity;
  path: string;
  message: string;
}

export interface DemoCompanyDNAValidationResult {
  isValid: boolean;
  issues: DemoCompanyDNAValidationIssue[];
  blockingErrors: DemoCompanyDNAValidationIssue[];
  warnings: DemoCompanyDNAValidationIssue[];
  information: DemoCompanyDNAValidationIssue[];
}

const hasText = (value: string): boolean => value.trim().length > 0;

const hasItems = (values: string[]): boolean =>
  values.some((value) => hasText(value));

export function validateDemoCompanyDNA(
  profile: DemoCompanyDNA,
): DemoCompanyDNAValidationResult {
  const issues: DemoCompanyDNAValidationIssue[] = [];

  const addIssue = (
    code: string,
    severity: DemoCompanyDNAValidationSeverity,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!hasText(profile.corporateIdentity.companyName)) {
    addIssue(
      "company_name_required",
      "blocking_error",
      "corporateIdentity.companyName",
      "El nombre de la empresa es obligatorio.",
    );
  }

  if (!hasText(profile.projectIdentity.projectName)) {
    addIssue(
      "project_name_required",
      "blocking_error",
      "projectIdentity.projectName",
      "El nombre del proyecto es obligatorio.",
    );
  }

  if (!hasText(profile.projectIdentity.projectType)) {
    addIssue(
      "project_type_required",
      "blocking_error",
      "projectIdentity.projectType",
      "El tipo de proyecto es obligatorio.",
    );
  }

  if (!hasItems(profile.operationalDNA.inventoryStructure)) {
    addIssue(
      "inventory_structure_required",
      "blocking_error",
      "operationalDNA.inventoryStructure",
      "La estructura de inventario es obligatoria.",
    );
  }

  if (!hasItems(profile.operationalDNA.processStates)) {
    addIssue(
      "process_states_required",
      "blocking_error",
      "operationalDNA.processStates",
      "Los estados del proceso son obligatorios.",
    );
  }

  if (!hasItems(profile.operationalDNA.commercialRules)) {
    addIssue(
      "commercial_rules_required",
      "blocking_error",
      "operationalDNA.commercialRules",
      "Las reglas comerciales son obligatorias.",
    );
  }

  if (
    !hasText(profile.brandIdentity.corporateLogoUrl) &&
    !hasText(profile.brandIdentity.projectLogoUrl)
  ) {
    addIssue(
      "brand_logos_missing",
      "warning",
      "brandIdentity",
      "No se han definido logos corporativos o del proyecto.",
    );
  }

  if (
    !hasText(profile.brandIdentity.primaryColor) &&
    !hasText(profile.brandIdentity.secondaryColor)
  ) {
    addIssue(
      "brand_colors_missing",
      "warning",
      "brandIdentity",
      "No se han definido colores de marca.",
    );
  }

  if (
    !hasItems(profile.brandIdentity.officialPhotos) &&
    !hasItems(profile.brandIdentity.renderImages)
  ) {
    addIssue(
      "brand_images_missing",
      "warning",
      "brandIdentity",
      "No se han incluido fotografías oficiales o renderizados.",
    );
  }

  if (!hasItems(profile.executiveDNA.strategicQuestions)) {
    addIssue(
      "strategic_questions_missing",
      "warning",
      "executiveDNA.strategicQuestions",
      "No se han definido preguntas estratégicas.",
    );
  }

  if (!hasItems(profile.executiveDNA.keyIndicators)) {
    addIssue(
      "key_indicators_missing",
      "warning",
      "executiveDNA.keyIndicators",
      "No se han definido indicadores ejecutivos.",
    );
  }

  if (!hasItems(profile.operationalDNA.inventoryVocabulary)) {
    addIssue(
      "inventory_vocabulary_recommended",
      "information",
      "operationalDNA.inventoryVocabulary",
      "Se recomienda definir el vocabulario propio del cliente.",
    );
  }

  if (
    !profile.operationalDNA.commercialRules.some((rule) =>
      rule.toLocaleLowerCase("es").includes("objeci"),
    )
  ) {
    addIssue(
      "realistic_objections_recommended",
      "information",
      "operationalDNA.commercialRules",
      "Se recomienda incluir objeciones comerciales realistas.",
    );
  }

  if (!hasItems(profile.executiveDNA.criticalRisks)) {
    addIssue(
      "critical_risks_recommended",
      "information",
      "executiveDNA.criticalRisks",
      "Se recomienda incluir riesgos ejecutivos críticos.",
    );
  }

  const blockingErrors = issues.filter(
    (issue) => issue.severity === "blocking_error",
  );
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const information = issues.filter(
    (issue) => issue.severity === "information",
  );

  return {
    isValid: blockingErrors.length === 0,
    issues,
    blockingErrors,
    warnings,
    information,
  };
}

export const defaultDemoCompanyDNA: DemoCompanyDNA = {
  id: "example-amena-comalapa",
  name: "AMENA Comalapa — Perfil de ejemplo",
  version: 1,
  isExample: true,
  corporateIdentity: {
    companyName: "AMENA",
    commercialName: "AMENA",
    legalName: "Empresa inmobiliaria de ejemplo",
    website: "https://example.com",
    location: "Guatemala",
    phones: ["+502 0000 0000"],
    emails: ["demo@example.com"],
  },
  projectIdentity: {
    projectName: "AMENA Comalapa — Demo",
    projectType: "Proyecto residencial mixto",
    projectLocation: "Comalapa, Guatemala",
    description:
      "Perfil demostrativo para validar escenarios operacionales de H-OperIA.",
    targetMarket: ["Familias", "Compradores de primera vivienda"],
    valueProposition:
      "Acompañamiento comercial y operacional durante todo el proceso inmobiliario.",
  },
  brandIdentity: {
    corporateLogoUrl: "",
    projectLogoUrl: "",
    primaryColor: "#254F66",
    secondaryColor: "#D8862E",
    typography: ["Manrope", "Inter"],
    officialPhotos: [],
    renderImages: [],
    supportImages: [],
    videos: [],
    brandManualUrl: "",
  },
  operationalDNA: {
    inventoryStructure: [
      "Sector",
      "Torre o manzana",
      "Nivel o lote",
      "Modelo",
      "Unidad",
    ],
    inventoryVocabulary: [
      "Reserva",
      "Unidad",
      "Modelo",
      "Sector",
      "Torre",
      "Lote",
    ],
    processStates: [
      "Prospecto",
      "Pre-reserva",
      "Reserva",
      "Formalización",
      "Entrega",
    ],
    organizationalRoles: [
      "Dirección comercial",
      "Coordinación comercial",
      "Vendedora",
      "Financiera",
      "Documentos",
      "Servicio al cliente",
    ],
    requiredDocuments: [
      "Documento de identificación",
      "Constancia laboral",
      "Comprobante de ingresos",
    ],
    commercialRules: [
      "Toda reserva debe registrar responsable y siguiente paso.",
      "Las objeciones comerciales deben conservarse como evidencia operacional.",
      "Los compromisos de pago deben incluir fecha y responsable.",
    ],
    operationalFlows: [
      "Reserva → validación → seguimiento comercial → formalización",
      "Documento pendiente → recordatorio → revisión humana",
      "Pago pendiente → contacto → nuevo compromiso → evidencia",
    ],
  },
  executiveDNA: {
    executiveConcerns: [
      "Calidad de los prospectos",
      "Velocidad de seguimiento",
      "Riesgo financiero",
    ],
    keyIndicators: [
      "Conversión por canal",
      "Reservas activas",
      "Compromisos vencidos",
      "Ingresos netos",
    ],
    strategicQuestions: [
      "¿Qué canal genera más ingresos netos y menos atrasos?",
      "¿Dónde se están perdiendo oportunidades por falta de seguimiento?",
    ],
    frequentDecisions: [
      "Priorizar campañas",
      "Escalar riesgos financieros",
      "Reasignar seguimientos",
    ],
    criticalRisks: [
      "Reservas sin seguimiento",
      "Documentos vencidos",
      "Compromisos de pago incumplidos",
    ],
  },
};

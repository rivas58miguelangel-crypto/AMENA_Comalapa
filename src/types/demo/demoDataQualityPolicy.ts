// Normativa declarativa para asegurar que los datos simulados nazcan
// conformes, se verifiquen y se certifiquen antes de cualquier persistencia.

export type DemoDataQualitySeverity =
  | "blocking"
  | "warning"
  | "information";

export type DemoDataQualityRuleCategory =
  | "realism"
  | "professional_tone"
  | "data_safety"
  | "real_estate_coherence"
  | "controlled_edge_cases"
  | "executive_limits"
  | "traceability"
  | "supabase_readiness";

export interface DemoDataQualityRule {
  id: string;
  category: DemoDataQualityRuleCategory;
  severity: DemoDataQualitySeverity;
  title: string;
  requirement: string;
  rejectionReason: string;
  regenerationGuidance: string;
  isRequiredForCertification: boolean;
}

export interface DemoDataQualityPolicy {
  id: string;
  name: string;
  version: string;
  description: string;
  generationPrinciples: string[];
  verificationPrinciples: string[];
  persistencePrinciples: string[];
  rules: DemoDataQualityRule[];
  approvedMessage: string;
  rejectedMessage: string;
}

export type DemoQualityGateStatus =
  | "pending"
  | "verifying"
  | "approved"
  | "rejected"
  | "regeneration_required";

export interface DemoQualityGateAttempt {
  attemptId: string;
  runId: string;
  policyId: string;
  policyVersion: string;
  attemptNumber: number;
  status: DemoQualityGateStatus;
  startedAt: string;
  completedAt?: string;
  evaluatedRuleIds: string[];
  passedRuleIds: string[];
  failedRuleIds: string[];
  notes: string[];
  previousAttemptId?: string;
  regeneratedFromAttemptId?: string;
}

export interface DemoQualityGateCertification {
  certificationId: string;
  runId: string;
  policyId: string;
  policyVersion: string;
  approvedAttemptId: string;
  status: "certified" | "revoked";
  certifiedAt: string;
  certifiedBy: string;
  isApprovedForPersistence: boolean;
  persistenceTarget: "supabase";
  message: string;
  attemptTrace: DemoQualityGateAttempt[];
}

export const defaultDemoDataQualityPolicy: DemoDataQualityPolicy = {
  id: "h-operia-demo-data-quality-policy",
  name: "Normativa de calidad del Motor Demo H-OperIA",
  version: "1.0.0",
  description:
    "Define las condiciones obligatorias para generar, verificar, regenerar, certificar y autorizar datos simulados antes de su persistencia.",
  generationPrinciples: [
    "Los datos demo no deben generarse libremente ni fuera de reglas explícitas.",
    "Cada dato debe nacer conforme a la normativa, con propósito operacional y contexto verificable.",
    "La simulación debe conservar realismo sin representar personas, empresas, precios o transacciones reales.",
  ],
  verificationPrinciples: [
    "Toda corrida debe verificarse antes de considerarse apta para persistencia.",
    "Una falla bloqueante rechaza la corrida completa.",
    "Una corrida rechazada debe regenerarse y someterse a una nueva verificación.",
    "Cada intento debe conservar trazabilidad respecto de intentos anteriores y regeneraciones.",
  ],
  persistencePrinciples: [
    "Solo una corrida aprobada y certificada queda autorizada para persistencia.",
    "La autorización debe identificar la política, su versión y el intento aprobado.",
    "La certificación es previa a cualquier futura escritura en Supabase.",
  ],
  rules: [
    {
      id: "commercial-realism",
      category: "realism",
      severity: "blocking",
      title: "Realismo comercial",
      requirement:
        "Las reservas, contactos, seguimientos, reportes y señales deben representar situaciones comerciales plausibles y consistentes entre sí.",
      rejectionReason:
        "La corrida contiene situaciones arbitrarias, contradictorias o comercialmente inverosímiles.",
      regenerationGuidance:
        "Regenerar los datos utilizando el escenario, inventario y semilla operacional como contexto obligatorio.",
      isRequiredForCertification: true,
    },
    {
      id: "professional-language",
      category: "professional_tone",
      severity: "blocking",
      title: "Tono profesional",
      requirement:
        "Los mensajes, reportes, narrativas y evidencias deben usar lenguaje profesional, claro y apropiado para una operación inmobiliaria.",
      rejectionReason:
        "La corrida contiene lenguaje informal, ambiguo, ofensivo o impropio de una demostración empresarial.",
      regenerationGuidance:
        "Regenerar los textos con tono profesional, neutral y orientado a acciones verificables.",
      isRequiredForCertification: true,
    },
    {
      id: "sensitive-data-exclusion",
      category: "data_safety",
      severity: "blocking",
      title: "Ausencia de datos sensibles reales",
      requirement:
        "La corrida no debe incluir nombres, teléfonos, correos, documentos, credenciales, pagos ni identificadores pertenecientes a personas o entidades reales.",
      rejectionReason:
        "Se detectaron datos sensibles, personales o potencialmente reales.",
      regenerationGuidance:
        "Eliminar la corrida y regenerarla exclusivamente con etiquetas ficticias y valores seguros.",
      isRequiredForCertification: true,
    },
    {
      id: "real-estate-structure-coherence",
      category: "real_estate_coherence",
      severity: "blocking",
      title: "Coherencia inmobiliaria",
      requirement:
        "Las referencias a proyectos, fases, torres, niveles, apartamentos, manzanas y lotes deben conservar la jerarquía y disponibilidad definidas por el escenario.",
      rejectionReason:
        "La corrida contiene referencias inmobiliarias inexistentes o relaciones jerárquicas incoherentes.",
      regenerationGuidance:
        "Regenerar las entidades usando únicamente referencias disponibles en la semilla operacional.",
      isRequiredForCertification: true,
    },
    {
      id: "credible-edge-cases",
      category: "controlled_edge_cases",
      severity: "warning",
      title: "Casos especiales creíbles",
      requirement:
        "Los atrasos, objeciones, ausencias de respuesta, riesgos y excepciones deben ser limitados, plausibles y útiles para la demostración.",
      rejectionReason:
        "Los casos especiales dominan la corrida, carecen de contexto o parecen artificiales.",
      regenerationGuidance:
        "Reducir y redistribuir los casos especiales para conservar una operación demo balanceada.",
      isRequiredForCertification: true,
    },
    {
      id: "executive-claim-limits",
      category: "executive_limits",
      severity: "blocking",
      title: "Límites ejecutivos",
      requirement:
        "Los resúmenes y señales ejecutivas deben limitarse a evidencia simulada disponible, sin afirmar resultados reales, garantías, predicciones definitivas ni conclusiones no respaldadas.",
      rejectionReason:
        "La corrida presenta conclusiones ejecutivas superiores a la evidencia simulada disponible.",
      regenerationGuidance:
        "Reformular las conclusiones como señales, riesgos, oportunidades o recomendaciones demo respaldadas por evidencia.",
      isRequiredForCertification: true,
    },
    {
      id: "attempt-traceability",
      category: "traceability",
      severity: "blocking",
      title: "Trazabilidad de intentos",
      requirement:
        "Cada verificación, rechazo, regeneración y aprobación debe conservar identificadores, fechas, reglas evaluadas y relación con intentos anteriores.",
      rejectionReason:
        "No existe evidencia suficiente para reconstruir el historial de generación y control de calidad.",
      regenerationGuidance:
        "Registrar un nuevo intento vinculado al intento rechazado y conservar el historial completo.",
      isRequiredForCertification: true,
    },
    {
      id: "supabase-authorization",
      category: "supabase_readiness",
      severity: "blocking",
      title: "Autorización previa a Supabase",
      requirement:
        "Solo una corrida sin fallas bloqueantes, con intento aprobado y certificación vigente puede autorizarse para persistencia en Supabase.",
      rejectionReason:
        "La corrida no posee aprobación y certificación suficientes para su persistencia.",
      regenerationGuidance:
        "Regenerar cuando corresponda, repetir la verificación y emitir la certificación antes de autorizar la persistencia.",
      isRequiredForCertification: true,
    },
  ],
  approvedMessage:
    "Los datos fueron creados satisfactoriamente respetando la normativa del Motor Demo H-OperIA. La corrida fue verificada, certificada y está lista para pasar a Supabase.",
  rejectedMessage:
    "La corrida demo fue rechazada por el control de calidad. Debe regenerarse y verificarse nuevamente antes de autorizar su persistencia.",
};

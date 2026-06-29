import type {
  DemoFindingSource,
  DemoInjectedFinding,
} from "../domain/demoFindings";

const evidence = (
  id: string,
  label: string,
  summary: string,
  source: DemoFindingSource,
  adminTargetPage?: DemoInjectedFinding["adminTargetPage"],
  adminTargetSection?: string,
  adminTargetDetail?: string,
  adminTargetAnchor?: string,
): DemoInjectedFinding["associatedEvidence"][number] => ({
  id,
  label,
  summary,
  source,
  adminTargetPage,
  adminTargetSection,
  adminTargetDetail,
  adminTargetAnchor,
});

export function createDemoInjectedFindings(
  demoRunId: string,
): DemoInjectedFinding[] {
  const timestamp = new Date().toISOString();

  return [
    {
      id: "demo-finding-01",
      demoRunId,
      title: "Prioridades ejecutivas posteriores a la reserva",
      summary:
        "La operación posterior a la reserva concentra riesgos comerciales, financieros y de servicio que requieren revisión ejecutiva antes de la siguiente junta.",
      severity: "high",
      source: "team_messages",
      adminTargetPage: "executive",
      adminTargetSection: "Prioridades ejecutivas posteriores a la reserva",
      operationalRecommendation:
        "Revisar los casos transversales en comité comercial y asignar responsables por riesgo antes del próximo corte ejecutivo.",
      associatedEvidence: [
        evidence(
          "demo-evidence-01",
          "Prioridades ejecutivas posteriores a la reserva",
          "Prioridades ejecutivas posteriores a la reserva",
          "team_messages",
          "executive",
          "Prioridades ejecutivas posteriores a la reserva",
          "Prioridades ejecutivas posteriores a la reserva",
          "demo-evidence-executive-priorities",
        ),
        evidence(
          "demo-evidence-01b",
          "Consulta ejecutiva asistida",
          "Respuesta ejecutiva",
          "h_operia_intelligence",
          "executive",
          "Consulta ejecutiva asistida",
          "Respuesta ejecutiva",
          "demo-evidence-executive-assisted-response",
        ),
        evidence(
          "demo-evidence-01c",
          "Prioridades ejecutivas de la semana",
          "Prioridades ejecutivas de la semana",
          "h_operia_intelligence",
          "executive",
          "Prioridades ejecutivas de la semana",
          "Prioridades ejecutivas de la semana",
          "demo-evidence-executive-weekly-priorities",
        ),
        evidence(
          "demo-evidence-01d",
          "Observaciones estratégicas de H-OperIA Intelligence",
          "Observaciones estratégicas de H-OperIA Intelligence",
          "h_operia_intelligence",
          "executive",
          "Observaciones estratégicas de H-OperIA Intelligence",
          "Observaciones estratégicas de H-OperIA Intelligence",
          "demo-evidence-executive-strategic-observations",
        ),
        evidence(
          "demo-evidence-01e",
          "Mensajes entre el Equipo",
          "Coordinacion interna asociada a clientes reservados y prioridades interareas.",
          "team_messages",
          "executive",
          "Mensajes entre el Equipo",
          "Prioridades ejecutivas posteriores a la reserva",
          "demo-evidence-executive-team-messages",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-02",
      demoRunId,
      title: "Expediente vivo con senales dispersas",
      summary:
        "Un cliente prioritario acumula senales de intencion, dudas financieras y seguimiento humano que deben quedar visibles en un solo expediente.",
      severity: "high",
      source: "reservations",
      adminTargetPage: "client",
      adminTargetSection: "Timeline del cliente",
      operationalRecommendation:
        "Unificar reserva, conversacion y seguimiento comercial para que la vendedora revise contexto completo antes de contactar al cliente.",
      associatedEvidence: [
        evidence(
          "demo-evidence-02",
          "Perfil Operacional del Cliente",
          "Cliente, unidad, fuente y estado de reserva originan el expediente operacional.",
          "reservations",
          "client",
          "Perfil Operacional del Cliente",
          "Marta · Acompañamiento al Cliente",
          "demo-evidence-client-operational-profile",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-03",
      demoRunId,
      title: "Inventario con presion comercial",
      summary:
        "La preferencia por modelos familiares debe cruzarse con disponibilidad y avance de construccion antes de prometer fechas o alternativas.",
      severity: "high",
      source: "commercial_follow_up",
      adminTargetPage: "construction",
      adminTargetSection: "Unidades con presion comercial",
      operationalRecommendation:
        "Validar disponibilidad, avance y narrativa tecnica antes de ofrecer alternativas de inventario al cliente.",
      associatedEvidence: [
        evidence(
          "demo-evidence-03",
          "Avances de Construcción",
          "Reportes humanos posteriores registran preferencias, objeciones y proximos pasos.",
          "commercial_follow_up",
          "construction",
          "Avances de Construcción",
          "Exploración operacional por capas",
          "demo-evidence-construction-operational-exploration",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-04",
      demoRunId,
      title: "Checklist documental critico",
      summary:
        "Hay expedientes con documentacion parcial que pueden bloquear formalizacion si no se solicita el faltante correcto en la proxima interaccion.",
      severity: "high",
      source: "documents",
      adminTargetPage: "documents",
      adminTargetSection: "Checklist documental critico",
      operationalRecommendation:
        "Solicitar documentos faltantes con mensaje especifico por cliente y dejar evidencia del proximo compromiso.",
      associatedEvidence: [
        evidence(
          "demo-evidence-04",
          "Documentos del Cliente",
          "Estado documental parcial vinculado a formalizacion y seguimiento comercial.",
          "documents",
          "documents",
          "Documentos del Cliente",
          "Matriz documental operativa",
          "demo-evidence-documents-operational-matrix",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-05",
      demoRunId,
      title: "Compromisos financieros sensibles",
      summary:
        "Varios casos mencionan prima, cuota o claridad financiera como bloqueo para avanzar en el ciclo posterior a la reserva.",
      severity: "high",
      source: "payments",
      adminTargetPage: "payments",
      adminTargetSection: "Compromisos de pago sensibles",
      operationalRecommendation:
        "Priorizar llamadas financieras y registrar nuevo compromiso con monto, fecha, responsable y evidencia.",
      associatedEvidence: [
        evidence(
          "demo-evidence-05",
          "Pagos y Compromisos",
          "Compromisos, atrasos y dudas financieras relacionados con clientes reservados.",
          "payments",
          "payments",
          "Pagos y Compromisos",
          "Pendiente",
          "demo-evidence-payments-pending-commitments",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-06",
      demoRunId,
      title: "Alerta critica de servicio al cliente",
      summary:
        "Un cliente manifiesta riesgo legal por inconsistencias entre informacion comercial recibida y contrato firmado.",
      severity: "critical",
      source: "customer_service",
      adminTargetPage: "service",
      adminTargetSection: "Alertas criticas del cliente",
      operationalRecommendation:
        "Escalar el caso a servicio, legal y direccion comercial con trazabilidad de mensajes, contrato y respuesta autorizada.",
      associatedEvidence: [
        evidence(
          "demo-evidence-06",
          "Servicio al Cliente",
          "Ticket critico que requiere respuesta humana y revision de evidencia contractual.",
          "customer_service",
          "service",
          "Servicio al Cliente",
          "Tickets abiertos",
          "demo-evidence-service-open-tickets",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
    {
      id: "demo-finding-07",
      demoRunId,
      title: "Seguimientos que requieren intervencion humana",
      summary:
        "Algunos seguimientos conversacionales requieren que una vendedora revise tono, prioridad y siguiente paso antes de responder.",
      severity: "high",
      source: "marta_voice_vapi",
      adminTargetPage: "sellers",
      adminTargetSection: "Seguimientos prioritarios",
      operationalRecommendation:
        "Revisar los seguimientos sugeridos por Marta antes de responder y documentar la decision humana tomada.",
      associatedEvidence: [
        evidence(
          "demo-evidence-07",
          "Gestión de Vendedoras",
          "Logs de llamada y structured output con intencion, urgencia y siguiente paso.",
          "marta_voice_vapi",
          "sellers",
          "Gestión de Vendedoras",
          "Mapa operativo de acompañamiento",
          "demo-evidence-sellers-support-map",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
  ];
}

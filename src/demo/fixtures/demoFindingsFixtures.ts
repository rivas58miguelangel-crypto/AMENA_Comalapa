import type {
  DemoFindingSource,
  DemoInjectedFinding,
} from "../domain/demoFindings";

const evidence = (
  id: string,
  label: string,
  summary: string,
  source: DemoFindingSource,
): DemoInjectedFinding["associatedEvidence"][number] => ({
  id,
  label,
  summary,
  source,
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
        "La operacion posterior a la reserva concentra riesgos comerciales, financieros y de servicio que requieren revision ejecutiva antes de la siguiente junta.",
      severity: "high",
      source: "team_messages",
      adminTargetPage: "executive",
      adminTargetSection: "Prioridades de direccion",
      operationalRecommendation:
        "Revisar los casos transversales en comite comercial y asignar responsables por riesgo antes del proximo corte ejecutivo.",
      associatedEvidence: [
        evidence(
          "demo-evidence-01",
          "Mensajes entre el Equipo",
          "Coordinacion interna asociada a clientes reservados y prioridades interareas.",
          "team_messages",
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
          "Reserva publica",
          "Cliente, unidad, fuente y estado de reserva originan el expediente operacional.",
          "reservations",
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
          "Registro de Seguimiento Comercial",
          "Reportes humanos posteriores registran preferencias, objeciones y proximos pasos.",
          "commercial_follow_up",
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
          "Finanzas / Pagos",
          "Compromisos, atrasos y dudas financieras relacionados con clientes reservados.",
          "payments",
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
          "Servicio Cliente",
          "Ticket critico que requiere respuesta humana y revision de evidencia contractual.",
          "customer_service",
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
          "Marta Voz / Vapi",
          "Logs de llamada y structured output con intencion, urgencia y siguiente paso.",
          "marta_voice_vapi",
        ),
      ],
      visibleStatus: "pending",
      timestamp,
    },
  ];
}

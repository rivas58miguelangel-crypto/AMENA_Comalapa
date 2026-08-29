import type { DemoFindingEvidence, DemoFindingSource, DemoInjectedFinding } from "../domain/demoFindings";

type Record = { id: string; demoRunId: string; demoPurpose?: string; reservationId?: string; expedienteId?: string; createdAt?: string; name?: string; clientName?: string; relatedClientName?: string; reservationStatus?: string; unit?: string; source?: string; priority?: string; topic?: string; messageText?: string; fromRole?: string; toRole?: string; sellerName?: string; interactionType?: string; detectedNeed?: string; objection?: string; nextStep?: string; callId?: string; detectedIntent?: string; transcriptSummary?: string; riskSignal?: string; structuredOutput?: { urgencyLevel?: string; documentsPending?: boolean; familyDecisionPending?: boolean } };
type Input = { demoRunId: string; generatedAt: string; reservationClients: Record[]; internalMessages: Record[]; sellerReports: Record[]; vapiCallLogs: Record[] };
const validTime = (value?: string) => value && /^\d{4}-\d{2}-\d{2}T/.test(value) && !Number.isNaN(Date.parse(value)) ? value : undefined;
const nameOf = (record: Record) => record.name || record.clientName || record.relatedClientName || "Cliente";
const sourceOf = (record: Record, source: DemoFindingSource) => ({ id: record.id, label: nameOf(record), summary: record.createdAt || "Evidencia operacional", source, demoRunId: record.demoRunId, sourceType: source, sourceEntityId: record.id, expedienteId: record.expedienteId, sourceCreatedAt: record.createdAt, provenance: `FASE 04 · ${source}` } as DemoFindingEvidence);

export function deriveDemoFindings({ demoRunId, generatedAt, reservationClients, internalMessages, sellerReports, vapiCallLogs }: Input): DemoInjectedFinding[] {
  const operational = (records: Record[]) => records.filter((record) => record.demoRunId === demoRunId && record.demoPurpose === "operational-scenario" && record.reservationId && record.expedienteId);
  const records = [...operational(reservationClients).map((record) => ({ record, source: "reservations" as const })), ...operational(internalMessages).map((record) => ({ record, source: "team_messages" as const })), ...operational(sellerReports).map((record) => ({ record, source: "commercial_follow_up" as const })), ...operational(vapiCallLogs).map((record) => ({ record, source: "marta_voice_vapi" as const }))];
  return records.map(({ record, source }) => {
    const clientName = nameOf(record); const isReservation = source === "reservations";
    const priority = record.priority === "Alta" || record.structuredOutput?.urgencyLevel === "Alta" ? "high" : isReservation && record.reservationStatus === "En progreso" ? "medium" : "medium";
    const title = isReservation ? `Expediente vivo para ${clientName}` : source === "team_messages" ? `Coordinación para ${clientName}` : source === "commercial_follow_up" ? `Seguimiento comercial para ${clientName}` : `Intervención humana para ${clientName}`;
    const summary = isReservation ? `${clientName} reservó ${record.unit || "una unidad"}.` : source === "team_messages" ? `${record.fromRole || "Equipo"}: ${record.topic || record.messageText || "Coordinación registrada"}.` : source === "commercial_follow_up" ? `${record.sellerName || "Vendedora"}: ${record.interactionType || "seguimiento"}.` : `${record.callId || "Llamada"}: ${record.detectedIntent || record.riskSignal || "revisión requerida"}.`;
    const findingId = `${demoRunId}-finding-${source}-${record.id}`;
    const interpretation = source === "marta_voice_vapi"
      ? `${clientName} expresó ${record.detectedIntent || "una necesidad pendiente"}. ${record.riskSignal && record.riskSignal !== "Sin riesgo critico" ? "Si no se resuelve antes del siguiente contacto, la conversación puede estancarse." : "La próxima conversación debe confirmar el acuerdo antes de perder continuidad."}`
      : source === "commercial_follow_up"
        ? `${record.objection || "La necesidad registrada"} puede frenar el avance de ${clientName}; resolverla y confirmar el compromiso evita que el seguimiento pierda continuidad.`
        : source === "team_messages"
          ? `${record.topic || "La coordinación interna"} requiere un responsable claro para evitar respuestas duplicadas o falta de seguimiento sobre el caso.`
          : `${clientName} ya tiene una reserva operacional activa; el siguiente contacto debe conservar el contexto de unidad y condición registrada.`;
    const action = source === "marta_voice_vapi"
      ? `La vendedora asignada debe contactar a ${clientName}, resolver ${record.detectedIntent || "la duda detectada"}, confirmar comprensión y registrar el compromiso siguiente.`
      : source === "commercial_follow_up"
        ? `${record.sellerName || "La vendedora asignada"} debe ejecutar “${record.nextStep || "el siguiente contacto"}” con ${clientName}, resolver ${record.objection || "la necesidad registrada"} y documentar el resultado.`
        : source === "team_messages"
          ? `${record.toRole || "Coordinación Comercial"} debe asumir la respuesta para ${clientName}, confirmar el responsable único y dejar registrado el próximo contacto.`
          : `La vendedora asignada debe confirmar con ${clientName} la reserva ${record.unit || "operacional"}, validar su condición principal y registrar el siguiente paso.`;
    return { id: findingId, demoRunId, demoPurpose: "operational-scenario", reservationId: record.reservationId, expedienteId: record.expedienteId, clientName, title, summary, severity: priority, source, sourceType: source, sourceEntityId: record.id, adminTargetPage: "client", adminTargetSection: "Hallazgos y acciones del expediente", operationalRecommendation: interpretation, recommendedAction: action, responsibleRole: record.sellerName || record.toRole || "Vendedora asignada", evidenceIds: [record.id], sourceTimestamp: validTime(record.createdAt), generatedAt, associatedEvidence: [sourceOf(record, source)], visibleStatus: "pending", timestamp: generatedAt } as DemoInjectedFinding;
  });
}

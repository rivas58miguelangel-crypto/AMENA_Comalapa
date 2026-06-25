import type { DemoLifecycleStatus } from "../../types/demo/demoLifecycleState";
import type { ReactNode } from "react";

type DemoContext = {
  demoRunId: string;
  prospectCompanyName: string;
  projectName: string;
  scenarioName: string;
  status: string;
  injectedAt: string;
};

type ReservationStatus = {
  reservation: string;
  whatsapp: string;
  email: string;
  evidence: string;
};

type DemoEvidenceCounts = {
  reservations: number;
  messages: number;
  sellerReports: number;
  vapiLogs: number;
  whatsappFollowups: number;
  evidence: number;
};

type DemoCommandEvidencePanelProps = {
  demoContext: DemoContext | null;
  demoRunIdShort: string;
  reservationStatus: ReservationStatus;
  martaStatus: string;
  vapiStatus: string;
  simulatedDataInjected: boolean;
  counts: DemoEvidenceCounts;
  evidence: string[][];
};

type Tone = "slate" | "green" | "amber" | "blue" | "violet";

const toneClasses: Record<Tone, string> = {
  slate: "border-slate-200 bg-slate-100 text-slate-900",
  green: "border-emerald-200 bg-emerald-100 text-emerald-800",
  amber: "border-amber-200 bg-amber-100 text-amber-800",
  blue: "border-blue-200 bg-blue-100 text-blue-800",
  violet: "border-violet-200 bg-violet-100 text-violet-800",
};

function StatusBadge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
        {label}
      </div>
      <div className="mt-2 break-words text-base font-black text-slate-950">
        {value}
      </div>
    </div>
  );
}

export default function DemoCommandEvidencePanel({
  demoContext,
  demoRunIdShort,
  reservationStatus,
  martaStatus,
  vapiStatus,
  simulatedDataInjected,
  counts,
  evidence,
}: DemoCommandEvidencePanelProps) {
  const lifecycleStatus: DemoLifecycleStatus | "not_started" =
    simulatedDataInjected
      ? "active"
      : reservationStatus.evidence === "Generada"
        ? "prepared"
        : demoContext
          ? "draft"
          : "not_started";
  const lifecycleValidation =
    lifecycleStatus === "active"
      ? "Contexto demo activo"
      : lifecycleStatus === "prepared"
        ? "Evidencia minima disponible"
        : "Pendiente";
  const lifecycleStatusLabel =
    lifecycleStatus === "not_started" ? "No iniciado" : lifecycleStatus;
  const traceabilitySteps = [
    {
      label: "Reserva",
      value: reservationStatus.reservation,
      ready: reservationStatus.reservation === "Validada",
    },
    {
      label: "Comunicacion",
      value: `${reservationStatus.whatsapp} / ${reservationStatus.email}`,
      ready:
        reservationStatus.whatsapp === "Confirmado" ||
        reservationStatus.email === "Confirmado",
    },
    {
      label: "Seguimiento",
      value: `${counts.sellerReports} reportes`,
      ready: counts.sellerReports > 0,
    },
    {
      label: "Marta / Vapi",
      value: `${martaStatus} / ${vapiStatus}`,
      ready: vapiStatus === "Abierto" || counts.vapiLogs > 0,
    },
    {
      label: "Evidencia",
      value:
        counts.evidence > 0
          ? `${counts.evidence} registros`
          : reservationStatus.evidence,
      ready:
        counts.evidence > 0 || reservationStatus.evidence === "Generada",
    },
  ];

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.22em] text-amber-600">
            FASE 04
          </div>
          <h3 className="mt-2 text-3xl font-black text-slate-950">
            FASE 04 Centro de Mando y Evidencia de la Operación
          </h3>
          <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
            Vista consolidada de la operación ampliada después de cargar la
            Empresa Demo, su trazabilidad, evidencias y estado de gobierno.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={simulatedDataInjected ? "green" : "amber"}>
            {simulatedDataInjected ? "Contexto demo activo" : "Preparacion"}
          </StatusBadge>
          <StatusBadge tone="amber">Supabase no verificado</StatusBadge>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-5">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Capa 01 · Narrativa ejecutiva
          </div>
          <h4 className="mt-2 text-xl font-black text-slate-950">
            Qué está ocurriendo
          </h4>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Lectura compacta de la operación ampliada y su avance visible.
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryItem label="DemoRunId" value={demoRunIdShort} />
          <SummaryItem
            label="Empresa"
            value={demoContext?.prospectCompanyName || "Pendiente"}
          />
          <SummaryItem
            label="Proyecto"
            value={demoContext?.projectName || "Proyecto Comalapa"}
          />
          <SummaryItem
            label="Fuente"
            value={demoContext ? "Demo local" : "Pendiente"}
          />
          <SummaryItem
            label="Ultima actualizacion"
            value={demoContext?.injectedAt || "Pendiente"}
          />
        </div>

        <div className="mt-5 rounded-3xl border border-slate-100 bg-white p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-xl font-black text-slate-950">
                Cadena de trazabilidad
              </h4>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                Lectura compacta desde la reserva hasta la evidencia revisable.
              </p>
            </div>
            <StatusBadge tone="blue">
              {counts.reservations + counts.messages + counts.whatsappFollowups}{" "}
              eventos visibles
            </StatusBadge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {traceabilitySteps.map((step, index) => (
              <div
                key={step.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <StatusBadge tone={step.ready ? "green" : "amber"}>
                    {step.ready ? "Visible" : "Pendiente"}
                  </StatusBadge>
                </div>
                <div className="mt-3 text-base font-black text-slate-950">
                  {step.label}
                </div>
                <div className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                  {step.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            Capa 02 · Evidencia de la Operación
          </div>
          <h4 className="text-xl font-black text-slate-950">
            Evidencia administrativa visible
          </h4>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Qué demuestra que ocurrió después de cargar la Empresa Demo:
            módulos impactados, evidencia disponible y estado actual.
          </p>
          <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] table-fixed text-left text-sm">
                <thead className="bg-slate-100 uppercase tracking-[0.16em] text-slate-950">
                  <tr>
                    <th className="p-4 font-black">Modulo</th>
                    <th className="p-4 font-black">Evidencia</th>
                    <th className="p-4 font-black">Estado</th>
                    <th className="p-4 font-black">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {evidence.map((item, index) => (
                    <tr
                      key={`${item[0]}-${item[1]}-${index}`}
                      className="border-t border-slate-100 align-top"
                    >
                      <td className="p-4">
                        <div className="font-black text-slate-950">
                          {item[0]}
                        </div>
                        <div className="mt-1 font-semibold text-slate-600">
                          {item[1]}
                        </div>
                      </td>
                      <td className="p-4 font-semibold leading-6 text-slate-800">
                        {item[2]}
                      </td>
                      <td className="p-4">
                        <StatusBadge
                          tone={item[4] === "Pendiente" ? "amber" : "green"}
                        >
                          {item[4]}
                        </StatusBadge>
                      </td>
                      <td className="p-4">
                        <button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                          {item[5]}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
            Capa 03 · Información técnica de soporte
          </div>
          <h4 className="text-xl font-black text-slate-950">
            Gobierno de la corrida
          </h4>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            Qué infraestructura respalda la demostración. Lectura conceptual;
            no ejecuta transiciones ni procesos de recuperacion.
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-slate-950">Lifecycle</span>
                <StatusBadge
                  tone={lifecycleStatus === "active" ? "green" : "amber"}
                >
                  {lifecycleStatusLabel}
                </StatusBadge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Validacion conceptual: {lifecycleValidation}.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-slate-950">Replay</span>
                <StatusBadge tone="slate">No evaluado</StatusBadge>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Sin ejecucion funcional.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-slate-950">
                  Regeneration
                </span>
                <StatusBadge tone="slate">No evaluado</StatusBadge>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Sin solicitud ni ejecucion funcional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

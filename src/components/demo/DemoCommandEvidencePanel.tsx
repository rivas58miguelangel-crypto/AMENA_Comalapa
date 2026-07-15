import { useRef, useState, type ReactNode } from "react";
import { UploadCloud } from "lucide-react";

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
  simulatedDataInjected: boolean;
  counts: DemoEvidenceCounts;
  onInjectSimulatedData: (quantities: DemoInjectionQuantities) => void;
};

type DemoInjectionQuantities = {
  reservations: number;
  vapiLogs: number;
  sellerReports: number;
  messages: number;
  prospectCompanyName?: string;
  projectName?: string;
  scenarioName?: string;
};

type Tone = "slate" | "green" | "amber" | "blue" | "violet";
type ScenicFlowStatus =
  | "idle"
  | "generated"
  | "audited"
  | "regenerated"
  | "approved"
  | "injected";

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
  simulatedDataInjected,
  counts,
  onInjectSimulatedData,
}: DemoCommandEvidencePanelProps) {
  const [auditStatus, setAuditStatus] = useState("Pendiente de auditoría");
  const [flowStatus, setFlowStatus] = useState<ScenicFlowStatus>("idle");
  const [rejectedRegenerated, setRejectedRegenerated] = useState(false);
  const layerTwoRef = useRef<HTMLDivElement | null>(null);
  const [quantities, setQuantities] = useState<DemoInjectionQuantities>({
    reservations: 20,
    vapiLogs: 20,
    sellerReports: 20,
    messages: 20,
  });
  const [prospectCompanyName, setProspectCompanyName] = useState(
    demoContext?.prospectCompanyName || "Empresa Demo",
  );
  const [projectName, setProjectName] = useState(
    demoContext?.projectName || "Proyecto de Empresa Demo",
  );
  const [scenarioName, setScenarioName] = useState(
    demoContext?.scenarioName || "Lanzamiento comercial de proyecto habitacional",
  );
  const updateQuantity = (
    key: keyof DemoInjectionQuantities,
    value: string,
  ) => {
    const nextValue = Math.max(0, Number(value) || 0);
    setQuantities((current) => ({ ...current, [key]: nextValue }));
    setAuditStatus("Pendiente de auditoría");
    setFlowStatus("idle");
    setRejectedRegenerated(false);
  };
  const resetGeneration = () => {
    setAuditStatus("Pendiente de auditoría");
    setFlowStatus("idle");
    setRejectedRegenerated(false);
    setQuantities({
      reservations: 20,
      vapiLogs: 20,
      sellerReports: 20,
      messages: 20,
    });
    setProspectCompanyName("");
    setProjectName("");
    setScenarioName("");
  };
  const injectionCategories = [
    {
      label: "Gestion de Reservas",
      key: "reservations" as const,
      sent: counts.reservations,
    },
    {
      label: "Marta Voz / Vapi",
      key: "vapiLogs" as const,
      sent: counts.vapiLogs,
    },
    {
      label: "Registro de Seguimiento Comercial",
      key: "sellerReports" as const,
      sent: counts.sellerReports,
    },
    {
      label: "Mensajes entre el Equipo",
      key: "messages" as const,
      sent: counts.messages,
    },
  ];
  const totalSent =
    counts.reservations +
    counts.vapiLogs +
    counts.sellerReports +
    counts.messages;
  const hasGeneratedData = flowStatus !== "idle";
  const hasAuditedData =
    flowStatus === "audited" ||
    flowStatus === "approved" ||
    flowStatus === "injected";
  const hasApprovedData = flowStatus === "approved" || flowStatus === "injected";
  const auditRows = injectionCategories.map((category) => {
    const configured = quantities[category.key];
    const generated = hasGeneratedData ? configured : 0;
    const rejectedBeforeRegeneration = Math.min(
      configured,
      category.key === "reservations"
        ? 1
        : category.key === "vapiLogs"
          ? 2
          : 1,
    );
    const wasAudited = flowStatus === "audited" || flowStatus === "approved" || flowStatus === "injected";
    const defective = wasAudited && !rejectedRegenerated ? rejectedBeforeRegeneration : 0;
    const valid = wasAudited ? Math.max(generated - defective, 0) : 0;
    const status =
      flowStatus === "idle"
        ? "Pendiente de generación"
        : flowStatus === "generated"
          ? "Pendiente de auditoría"
          : flowStatus === "regenerated"
            ? "Rechazados regenerados"
            : defective > 0
              ? "Requiere regeneración"
              : flowStatus === "injected"
                ? "Carga demo realizada"
                : hasApprovedData
                  ? "Aprobado"
                  : "Auditado";

    return { ...category, configured, generated, valid, defective, status };
  });
  const hasRejectedRows = auditRows.some((row) => row.defective > 0);
  const hasRegeneratedRejectedRows = flowStatus === "regenerated" && rejectedRegenerated;
  const canApproveData = (hasAuditedData || hasRegeneratedRejectedRows) && !hasRejectedRows;
  const canInjectDemo =
    (flowStatus === "approved" || flowStatus === "injected") &&
    !hasRejectedRows;
  const flowLabel =
    flowStatus === "idle"
      ? "Pendiente de generación"
      : flowStatus === "generated"
        ? "Datos generados"
        : flowStatus === "audited"
          ? hasRejectedRows
            ? "Auditoría con rechazos"
            : "Auditoría aprobable"
          : flowStatus === "regenerated"
            ? "Rechazados regenerados; pendiente de auditoría"
            : flowStatus === "approved"
              ? "Datos aprobados"
              : "Empresa Demo simulada cargada";
  const actionButtonClass =
    "rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const secondaryButtonClass =
    "rounded-2xl bg-slate-200 px-5 py-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h3 className="text-3xl font-black text-slate-950">
            FASE 04 Centro de Mando y Evidencia de la Operación
          </h3>
          <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
            Estación para configurar, auditar, regenerar y cargar datos
            simulados de una Empresa Demo antes de la lectura de Intelligence.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={simulatedDataInjected ? "green" : "amber"}>
            {simulatedDataInjected ? "Datos demo cargados" : "Preparación"}
          </StatusBadge>
          <StatusBadge tone="violet">Datos simulados</StatusBadge>
          <StatusBadge tone="amber">No persistido</StatusBadge>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-5">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Capa 01 · Preparación y carga de datos simulados
          </div>
          <h4 className="mt-2 text-xl font-black text-slate-950">
            Qué está ocurriendo
          </h4>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Configure la Empresa Demo, defina cantidades por aplicación, audite
            calidad y cargue el escenario demo local.
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
              Empresa activa
            </label>
            <input
              value={prospectCompanyName}
              onChange={(event) => setProspectCompanyName(event.target.value)}
              placeholder="Empresa Demo"
              className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-base font-black text-slate-950 outline-none"
            />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
              Proyecto
            </label>
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Proyecto de Empresa Demo"
              className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-base font-black text-slate-950 outline-none"
            />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
              Descripción del escenario demo
            </label>
            <input
              value={scenarioName}
              onChange={(event) => setScenarioName(event.target.value)}
              placeholder="Lanzamiento comercial de proyecto habitacional"
              className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-base font-black text-slate-950 outline-none"
            />
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-black text-slate-950">
            Cantidad deseada de datos a generar
          </h4>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            Define cuántos datos simulados deseas generar en cada aplicación al cargar el escenario demo local.
          </p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {injectionCategories.map((category) => (
            <div
              key={category.label}
              className="rounded-2xl border border-amber-100 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-black leading-5 text-slate-950">
                  {category.label}
                </div>
              </div>
              <input
                type="number"
                min={0}
                value={quantities[category.key]}
                onChange={(event) => updateQuantity(category.key, event.target.value)}
                className="mt-3 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-base font-black text-slate-950 outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-amber-100 bg-white p-4 text-sm font-black leading-6 text-slate-800">
          Generar datos → Auditar calidad → Regenerar categoría si falla →
          Volver a auditar → Aprobar → Cargar Empresa Demo simulada
        </div>
        <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-amber-100 bg-white p-5 xl:flex-row xl:items-center xl:justify-between">
          <p className="text-sm font-semibold leading-6 text-slate-700">
            Cuando la configuración esté lista, baja a la Capa 02 para ejecutar el proceso de generación, auditoría y aprobación.
          </p>
          <button
            type="button"
            onClick={() => layerTwoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={secondaryButtonClass}
          >
            Siguiente paso: Capa 02
          </button>
        </div>
        <div ref={layerTwoRef} className="mt-5 scroll-mt-64 rounded-3xl border border-amber-100 bg-white p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Capa 02 · Flujo escénico de preparación
              </div>
              <h4 className="mt-2 text-xl font-black text-slate-950">
                Proceso de generación
              </h4>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                Estos pasos preparan la demostración. La carga demo solo afecta
                el escenario local al presionar Cargar Empresa Demo simulada.
              </p>
            </div>
            <StatusBadge tone={hasApprovedData ? "green" : hasGeneratedData ? "amber" : "slate"}>
              {flowLabel}
            </StatusBadge>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setFlowStatus("generated");
                setAuditStatus("Datos generados");
                setRejectedRegenerated(false);
              }}
              className={actionButtonClass}
            >
              Generar datos simulados
            </button>
            <button
              disabled={!hasGeneratedData}
              onClick={() => {
                setFlowStatus("audited");
                setAuditStatus("Auditoría ejecutada");
              }}
              className={secondaryButtonClass}
            >
              Auditar calidad
            </button>
            <button
              disabled={!hasRejectedRows}
              onClick={() => {
                setFlowStatus("regenerated");
                setAuditStatus("Rechazados regenerados");
                setRejectedRegenerated(true);
              }}
              className={secondaryButtonClass}
            >
              Regenerar rechazados
            </button>
            <button
              disabled={!canApproveData}
              onClick={() => {
                setFlowStatus("approved");
                setAuditStatus("Datos aprobados");
              }}
              className={actionButtonClass}
            >
              Aprobar datos
            </button>
            <button
              onClick={resetGeneration}
              className={secondaryButtonClass}
            >
              Nueva generación demo
            </button>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-3xl border border-amber-100 bg-white">
          <div className="overflow-x-auto">
            <div className="grid min-w-[980px] grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr_0.9fr_1fr_1fr] bg-amber-100/70 text-left text-xs font-black uppercase tracking-[0.16em] text-slate-950">
              <div className="p-4">Aplicacion</div>
              <div className="p-4">Cantidad solicitada</div>
              <div className="p-4">Cantidad generada</div>
              <div className="p-4">Validos</div>
              <div className="p-4">Defectuosos</div>
              <div className="p-4">Estado</div>
              <div className="p-4">Accion</div>
            </div>
            {auditRows.map((row) => (
              <div
                key={row.label}
                className="grid min-w-[980px] grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr_0.9fr_1fr_1fr] border-t border-amber-100 text-sm font-semibold text-slate-800"
              >
                <div className="p-4 font-black text-slate-950">{row.label}</div>
                <div className="p-4">{row.configured}</div>
                <div className="p-4">{row.generated}</div>
                <div className="p-4">{row.valid}</div>
                <div className="p-4">{row.defective}</div>
                <div className="p-4">
                  <StatusBadge tone={row.status === "Aprobado" ? "green" : row.status === "Requiere regeneración" ? "amber" : "slate"}>
                    {row.status}
                  </StatusBadge>
                </div>
                <div className="p-4">
                  <button
                    disabled={!hasRejectedRows}
                    onClick={() => {
                      setFlowStatus("regenerated");
                      setAuditStatus("Rechazados regenerados");
                      setRejectedRegenerated(true);
                    }}
                    className="rounded-2xl bg-slate-200 px-4 py-3 text-xs font-black text-slate-950"
                  >
                    Regenerar rechazados
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
          Los registros válidos se conservan. Solo los rechazados se regeneran
          y se auditan nuevamente antes de cargar el escenario demo.
        </p>
        <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-amber-100 bg-white p-5 xl:flex-row xl:items-center xl:justify-between">
          <p className="text-sm font-semibold leading-6 text-slate-700">
            H - OperIA Intelligence no genera datos simulados en esta fase; su
            interpretación comienza en la FASE 05. La carga queda en memoria local de la demo.
          </p>
          <button
            disabled={!canInjectDemo}
            onClick={() => {
              onInjectSimulatedData({
                ...quantities,
                prospectCompanyName: prospectCompanyName.trim() || "Empresa Demo",
                projectName: projectName.trim() || "Proyecto de Empresa Demo",
                scenarioName: scenarioName.trim() || "Lanzamiento comercial de proyecto habitacional",
              });
              setFlowStatus("injected");
              setAuditStatus("Empresa Demo simulada cargada");
            }}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          >
            <UploadCloud size={18} className="mr-2 inline" />
            Cargar Empresa Demo simulada
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
          Estado consolidado de la corrida
        </div>
        <h4 className="mt-2 text-xl font-black text-slate-950">
          Resumen de Datos Demo Cargados
        </h4>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Resumen posterior a la carga ejecutada desde la preparación simulada.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryItem label="Empresa demo" value={demoContext?.prospectCompanyName || "Pendiente"} />
          <SummaryItem label="Proyecto" value={demoContext?.projectName || "Proyecto de Empresa Demo"} />
          <SummaryItem label="Fecha / última actualización" value={demoContext?.injectedAt || "Pendiente"} />
          <SummaryItem label="Estado demo" value={simulatedDataInjected ? "Cargado localmente" : "Pendiente"} />
          <SummaryItem label="Persistencia" value="No persistido" />
        </div>
        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <div className="grid min-w-[720px] grid-cols-5 bg-slate-100 text-left text-xs font-black uppercase tracking-[0.16em] text-slate-950">
              <div className="p-4">Gestion de Reservas</div>
              <div className="p-4">Marta Voz / Vapi</div>
              <div className="p-4">Registro Comercial</div>
              <div className="p-4">Mensajes Equipo</div>
              <div className="p-4">Total demo</div>
            </div>
            <div className="grid min-w-[720px] grid-cols-5 border-t border-slate-100 text-sm font-black text-slate-950">
              <div className="p-4">{counts.reservations}</div>
              <div className="p-4">{counts.vapiLogs}</div>
              <div className="p-4">{counts.sellerReports}</div>
              <div className="p-4">{counts.messages}</div>
              <div className="p-4">{totalSent}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import DemoCommandEvidencePanel from "./components/demo/DemoCommandEvidencePanel";
import DemoScenarioRoute from "./components/demo/DemoScenarioRoute";
import { createDemoInjectedFindings } from "./demo/fixtures/demoFindingsFixtures";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BadgeDollarSign,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  CreditCard,
  Database,
  ExternalLink,
  FileText,
  HardHat,
  Headphones,
  Home,
  Layers3,
  Mail,
  Megaphone,
  MessageCircle,
  MonitorCog,
  PhoneCall,
  Search,
  Send,
  Smartphone,
  Target,
  UploadCloud,
  UserRound,
  Users,
  WalletCards,
  MapPinned,
} from "lucide-react";

const REPORT_DATE = "Corte: 15 mayo 2026";

const menu = [
  { id: "executive", label: "Centro Ejecutivo", icon: MonitorCog },
  { id: "client", label: "Expediente Vivo", icon: UserRound },
  { id: "construction", label: "Inventario / Construcción", icon: HardHat },
  { id: "documents", label: "Documentos", icon: FileText },
  { id: "payments", label: "Finanzas / Pagos", icon: CreditCard },
  { id: "service", label: "Servicio Cliente", icon: Headphones },
  { id: "sellers", label: "Ventas / Vendedoras", icon: Users },
  { id: "campaigns", label: "Marketing / Canales", icon: Megaphone },
  { id: "campaignDelivery", label: "Campañas", icon: Send },
  { id: "funnels", label: "Embudos", icon: Layers3 },
  { id: "dashboards", label: "Inteligencia Operativa", icon: BarChart3 },
  { id: "demo", label: "Centro Demo", icon: Smartphone },
];

const martaSync = {
  executive: 86,
  client: 91,
  construction: 78,
  documents: 88,
  payments: 82,
  service: 84,
  sellers: 76,
  campaigns: 73,
  campaignDelivery: 81,
  funnels: 84,
  dashboards: 89,
  demo: 94,
};

type BadgeTone = "slate" | "green" | "amber" | "red" | "blue" | "violet" | "dark";
type ClientSignalColor = "green" | "amber" | "red" | "blue";
type TrackingDetailKey = "compromisos" | "montos" | "atraso" | "responsable";

type ClientBadge = {
  label: string;
  tone: BadgeTone;
};

type ClientAiSignal = {
  title: string;
  value: string;
  color: ClientSignalColor;
};

type ClientTimelineItem = {
  time: string;
  title: string;
  description: string;
};

type ClientCommunicationMessage = {
  from: string;
  time: string;
  text: string;
  tag: string;
};

type ClientCommunicationChannel = {
  channel: string;
  badge: string;
  tone: BadgeTone;
  inboxTitle: string;
  messages: ClientCommunicationMessage[];
  actions: string[];
  recommendation: string;
};

type ClientMartaProposal = {
  type: string;
  title: string;
  analysis: string;
  proposal: string;
};

type ClientTrackingDetail = {
  title: string;
  columns: string[];
  rows: string[][];
};

type ClientOperationalProfile = {
  cliente: {
    name: string;
    initials: string;
    amenaId: string;
    badges: ClientBadge[];
  };
  unidadReservada: {
    label: string;
    detail: string;
  };
  vendedora: {
    name: string;
    code: string;
    label: string;
    detail: string;
  };
  pipeline: {
    status: string;
    detail: string;
  };
  riesgo: {
    priority: string;
    nextActions: string;
    nextActionsDetail: string;
  };
  senalesIa: {
    summary: string;
    signals: ClientAiSignal[];
  };
  evidencias: {
    title: string;
    value: string;
  }[];
  timeline: ClientTimelineItem[];
  comunicaciones: ClientCommunicationChannel[];
  propuestasMarta: ClientMartaProposal[];
  seguimientoOperacional: {
    metrics: {
      key: TrackingDetailKey;
      title: string;
      value: string;
      note: string;
    }[];
    details: Record<TrackingDetailKey, ClientTrackingDetail>;
    historyColumns: string[];
    historyRows: string[][];
  };
};

const clientOperationalProfile: ClientOperationalProfile = {
  cliente: {
    name: "Carlos Méndez",
    initials: "CM",
    amenaId: "HOP-2026-000784",
    badges: [
      { label: "Expediente Activo", tone: "green" },
      { label: "Prioridad Alta", tone: "amber" },
      { label: "Marta Activa", tone: "violet" },
    ],
  },
  unidadReservada: {
    label: "Sector 01 · Torre 3 · Nivel 7 · A704",
    detail: "Unidad preferida vinculada al flujo de reserva y al seguimiento comercial.",
  },
  vendedora: {
    name: "María Fernanda",
    code: "VND-034",
    label: "María Fernanda · VND-034",
    detail: "Responsable comercial directa del seguimiento, registro de información y revisión criteriosa de sugerencias de acompañamiento.",
  },
  pipeline: {
    status: "Formalización",
    detail: "Etapa posterior a la pre-reserva: documentación, validación financiera, compromisos de pago y preparación de cierre.",
  },
  riesgo: {
    priority: "Prioridad Alta",
    nextActions: "Llamada financiera + contacto alterno",
    nextActionsDetail: "Llamar antes de 5 PM para confirmar prima; si no responde, contactar a la esposa y enviar resumen por WhatsApp/email.",
  },
  senalesIa: {
    summary: "Cliente con alta intención de compra. H-OperIA Intelligence detectó sensibilidad financiera moderada y sugiere intervención humana hoy mismo, asociando la llamada, la simulación bancaria y los compromisos al expediente operativo. La conversación debe confirmar monto, resolver dudas de crédito y dejar evidencia en el timeline.",
    signals: [
      { title: "Intención", value: "Alta", color: "green" },
      { title: "Objeción", value: "Financiamiento", color: "amber" },
      { title: "Riesgo", value: "72h", color: "red" },
      { title: "Recomendación", value: "Llamada humana", color: "blue" },
    ],
  },
  evidencias: [
    { title: "WhatsApp", value: "Confirmación enviada" },
    { title: "Email", value: "PDF abierto" },
    { title: "Calendario", value: "Cita creada" },
    { title: "Evidencia de la Operación", value: "Log insertado" },
    { title: "Registro de Seguimiento Comercial", value: "Pipeline actualizado" },
  ],
  timeline: [
    { time: "10:04", title: "Reserva recibida desde Reservas AMENA", description: "El Centro de Mando crea el expediente operacional vivo." },
    { time: "10:05", title: "WhatsApp enviado", description: "Confirmación de reserva y próximos pasos." },
    { time: "10:06", title: "Email enviado", description: "PDF, brochure y documentos asociados." },
    { time: "10:08", title: "H-OperIA Intelligence analiza señales", description: "Riesgo financiero moderado detectado." },
    { time: "10:12", title: "Cita financiera agendada", description: "Reunión mañana 3:30 PM." },
  ],
  comunicaciones: [
    {
      channel: "WhatsApp Operacional",
      badge: "2 mensajes nuevos",
      tone: "green",
      inboxTitle: "Últimos mensajes recibidos",
      messages: [
        { from: "Carlos Méndez", time: "10:21 AM", text: "Gracias. ¿Me pueden confirmar cuánto tendría que pagar exactamente esta semana?", tag: "Consulta financiera" },
        { from: "Carlos Méndez", time: "10:24 AM", text: "También quisiera que mi esposa reciba el detalle antes de la cita.", tag: "Decisor secundario" },
      ],
      actions: ["Enviar simulación bancaria", "Enviar recordatorio de cita", "Enviar checklist documental"],
      recommendation: "H-OperIA Intelligence sugiere una respuesta tranquila; la vendedora revisa tono, monto pendiente y destinatarios antes de enviar.",
    },
    {
      channel: "Email Operacional",
      badge: "PDF abierto",
      tone: "blue",
      inboxTitle: "Últimos correos y actividad",
      messages: [
        { from: "H-Operia", time: "10:06 AM", text: "Correo de confirmación enviado con brochure, condiciones y datos de contacto.", tag: "Enviado" },
        { from: "Carlos Méndez", time: "10:18 AM", text: "El cliente abrió el PDF de condiciones y descargó el brochure del proyecto.", tag: "Apertura detectada" },
      ],
      actions: ["Enviar resumen financiero", "Enviar PDF de garantías", "Enviar avance de construcción"],
      recommendation: "H-OperIA Intelligence sugiere preparar un correo ejecutivo con simulación, garantías y próximos pasos antes de la llamada humana.",
    },
  ],
  propuestasMarta: [
    { type: "WhatsApp", title: "Consulta sobre monto a pagar", analysis: "El cliente busca claridad financiera inmediata. Riesgo de ansiedad moderado.", proposal: "Confirmar monto pendiente, enviar simulación y copiar a la esposa por email." },
    { type: "Email", title: "Resumen financiero familiar", analysis: "La esposa influye en la decisión. Conviene correo estructurado.", proposal: "Enviar resumen, PDF, documentos necesarios y próximos pasos." },
    { type: "Documento", title: "Constancia laboral recibida", analysis: "Legible, pero con fecha antigua. Requiere validación financiera.", proposal: "Escalar a financiera antes de aprobar." },
  ],
  seguimientoOperacional: {
    metrics: [
      { key: "compromisos", title: "Compromisos activos", value: "7", note: "4 cliente · 3 internos" },
      { key: "montos", title: "Monto pendiente", value: "$8,500", note: "Prima y gastos legales" },
      { key: "atraso", title: "Días de atraso", value: "5", note: "Pago parcial" },
      { key: "responsable", title: "Responsable", value: "VND-034", note: "María Fernanda" },
    ],
    details: {
      compromisos: {
        title: "Detalle de compromisos activos",
        columns: ["Tipo", "Compromiso", "Monto", "Responsable", "Fecha límite", "Próxima acción"],
        rows: [
          ["Pago", "Completar prima inicial", "$5,000", "Cliente", "Antes 4 PM", "Enviar constancia y comprobante parcial"],
          ["Cita", "Reunión financiera con esposa", "N/A", "Vendedora", "Mañana 3:30 PM", "Confirmar asistencia 2 horas antes"],
          ["Documento", "Enviar constancia laboral", "N/A", "Cliente", "Hoy", "Reenviar checklist y carta modelo"],
        ],
      },
      montos: {
        title: "Detalle de montos pendientes",
        columns: ["Concepto", "Monto", "Estado", "Justificación", "Sugerencia IA"],
        rows: [
          ["Prima inicial", "$5,000", "Atrasado", "Banco solicitó constancia laboral", "Simulación + llamada humana"],
          ["Gastos legales", "$2,000", "Pendiente", "Cliente pidió desglose", "Enviar explicación clara"],
          ["Reserva parcial", "$1,500", "En validación", "Comprobante incompleto", "Solicitar comprobante completo"],
        ],
      },
      atraso: {
        title: "Detalle de días de atraso",
        columns: ["Tema", "Atraso", "Riesgo", "Impacto", "Acción"],
        rows: [
          ["Pago inicial", "5 días", "Medio-alto", "Puede comprometer vigencia de pre-reserva", "Contactar hoy"],
          ["Constancia laboral", "1 día", "Medio", "Retrasa validación financiera", "Enviar carta modelo"],
          ["Confirmación de cita", "0 días", "Bajo", "Debe confirmarse antes de la reunión", "Recordatorio 2 horas antes"],
        ],
      },
      responsable: {
        title: "Detalle de responsable comercial",
        columns: ["Responsable", "Código", "Indicador", "Situación", "Siguiente paso"],
        rows: [
          ["María Fernanda", "VND-034", "91% uso Marta", "2 tareas vencidas", "Debe priorizar riesgo financiero"],
          ["Financiera", "FIN-002", "Pendiente revisión", "Simulación bancaria", "Validar escenario antes de llamada"],
        ],
      },
    },
    historyColumns: ["Fecha", "Tipo", "Compromiso", "Monto", "Estado", "Justificación", "Nuevo compromiso", "Evidencia"],
    historyRows: [
      ["20 May", "Pago", "Completar prima inicial", "$5,000", "Atrasado", "Banco solicitó constancia laboral", "Enviar constancia y comprobante parcial antes 4 PM", "WA + PDF"],
      ["20 May", "Cita", "Reunión financiera con esposa", "N/A", "Pendiente", "La esposa influye en la decisión final", "Confirmar asistencia 2 horas antes", "Calendario"],
      ["19 May", "Documento", "Enviar DUI, NIT y constancia", "N/A", "Parcial", "Solo envió DUI", "Reenviar checklist documental", "Archivo"],
    ],
  },
};

function cls(...v) {
  return v.filter(Boolean).join(" ");
}

function Badge({ children, tone = "slate" }: { children: any; tone?: string; key?: React.Key }) {
  const tones = {
    slate: "bg-slate-100 text-slate-900 border-slate-200",
    green: "bg-emerald-100 text-emerald-800 border-emerald-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    red: "bg-rose-100 text-rose-800 border-rose-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    violet: "bg-violet-100 text-violet-800 border-violet-200",
    dark: "bg-slate-950 text-white border-slate-800",
  };
  return <span className={cls("inline-flex items-center rounded-full border px-3 py-1 text-xs font-black", tones[tone])}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={cls("min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6", className)}>{children}</div>;
}

function TopNav({ active, setActive }) {
  return (
    <div className="sticky top-0 z-50 w-full max-w-full overflow-hidden rounded-[2rem] bg-slate-950 p-4 text-white shadow-2xl sm:p-5">
      <div className="mb-4 flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">H-OperIA</p>
          <p className="mt-1 text-sm font-bold text-slate-300">Humanización de las operaciones con IA</p>
          <h2 className="mt-1 text-3xl font-black">Centro de Mando</h2>
        </div>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-3 lg:w-auto lg:justify-end">
          <Badge tone="dark">Integración demostrativa: {martaSync[active]}%</Badge>
          <button onClick={() => setActive("demo")} className="max-w-full whitespace-normal rounded-2xl bg-amber-300 px-5 py-3 text-left text-sm font-black text-slate-950 transition hover:bg-amber-200">
            <Smartphone size={16} className="mr-2 inline" />Iniciar demostración
          </button>
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-wrap gap-3 pb-1">
        {menu.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cls(
              "flex max-w-full items-center gap-2 whitespace-normal rounded-2xl px-5 py-3 text-left text-sm font-black transition",
              active === id ? "bg-white text-slate-950" : "bg-white/10 text-white hover:bg-white/15"
            )}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, icon: Icon, sync = 80, badges = [], syncNote }) {
  return (
    <Card>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-slate-950 text-white">
            <Icon size={30} />
          </div>
          <div>
            <p className="text-base font-black uppercase tracking-[0.35em] text-amber-600">H-OperIA</p>
            <p className="mt-1 text-base font-extrabold text-slate-800">Humanización de las operaciones con IA</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">{title}</h1>
            <p className="mt-3 max-w-5xl text-lg font-semibold leading-8 text-slate-800">{subtitle}</p>
          </div>
        </div>
        <div className="min-w-0 rounded-3xl bg-slate-50 p-5 border border-slate-100 xl:min-w-[310px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-black text-slate-950">Nivel de Integración Operacional</span>
            <span className="text-3xl font-black text-emerald-500">{sync}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-emerald-300" style={{ width: `${sync}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {syncNote || "Indica qué tanto este módulo conecta información real, señales operativas y criterio humano. Marta acompaña conversaciones; H-OperIA Intelligence analiza señales; el equipo humano revisa, decide y ejecuta."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((b) => <Badge key={b} tone="dark">{b}</Badge>)}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Metric({ title, value, note, tone = "slate", icon: Icon = Activity, onClick = undefined, active = false }) {
  const tones = {
    slate: "bg-slate-50 text-slate-950",
    green: "bg-emerald-50 text-emerald-950",
    amber: "bg-amber-50 text-amber-950",
    red: "bg-rose-50 text-rose-950",
    blue: "bg-blue-50 text-blue-950",
    violet: "bg-violet-50 text-violet-950",
  };
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={cls(
        "rounded-3xl p-6 text-left transition",
        tones[tone],
        onClick && "w-full cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        active && "ring-4 ring-slate-950/10"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-800">{title}</p>
        <Icon size={20} className="text-slate-700" />
      </div>
      <div className="mt-3 text-4xl font-black">{value}</div>
      <p className="mt-1 text-base font-semibold text-slate-700">{note}</p>
      {onClick && <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Clic para ver detalles</p>}
    </Wrapper>
  );
}

function AiObservation({ title = "Observaciones estratégicas de H-OperIA Intelligence", children }) {
  return (
    <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-violet-600 p-3 text-white"><Bot size={20} /></div>
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
      </div>
      <div className="mt-4 text-base font-semibold leading-8 text-slate-800">{children}</div>
    </div>
  );
}

function SimpleTable({ columns, rows }) {
  return (
    <div className="max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left text-sm lg:min-w-[860px]">
          <thead className="bg-slate-100 text-sm uppercase tracking-[0.18em] text-slate-950">
            <tr>{columns.map((c) => <th key={c} className="p-4 font-black">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-100 align-top">
                {row.map((cell, i) => <td key={i} className="p-4 text-base font-semibold leading-7 text-slate-800">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppShell() {
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return "executive";
    const fromHash = window.location.hash.replace("#", "");
    const fromStorage = window.localStorage.getItem("amena.activeSection") || "";
    if (menu.some((item) => item.id === fromHash)) return fromHash;
    if (menu.some((item) => item.id === fromStorage)) return fromStorage;
    return "executive";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("amena.activeSection", active);
    if (window.location.hash.replace("#", "") !== active) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${active}`);
    }
  }, [active]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromHash = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (menu.some((item) => item.id === fromHash)) setActive(fromHash);
    };
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);
  const Page = {
    executive: ExecutivePage,
    client: ClientPage,
    construction: ConstructionPage,
    documents: DocumentsPage,
    payments: PaymentsPage,
    service: ServicePage,
    sellers: SellersPage,
    campaigns: CampaignsPage,
    campaignDelivery: CampaignDeliveryPage,
    funnels: FunnelLibraryPage,
    dashboards: DashboardsPage,
    demo: DemoPage,
  }[active];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-amber-50 text-slate-950">
      <div className="mx-auto max-w-[1800px] space-y-5 p-3 sm:p-5">
        <TopNav active={active} setActive={setActive} />
        <Page setActive={setActive} />
      </div>
    </div>
  );
}

function DetailStack({ title, subtitle, items }) {
  return (
    <Card>
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{subtitle}</p>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-lg font-black text-slate-950">{item.title}</div>
              {item.badge && <Badge tone={item.tone || "slate"}>{item.badge}</Badge>}
            </div>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ExecutivePage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Centro Ejecutivo"
        subtitle="Vista semanal para Director General y Director Comercial: prioridades, riesgos, ingresos, acompañamiento del equipo, lectura de H-OperIA Intelligence y acciones concretas para decidir con criterio operativo."
        icon={MonitorCog}
        sync={martaSync.executive}
        badges={[REPORT_DATE, "Tercera semana de mayo 2026", "Inteligencia estratégica"]}
        syncNote="Este porcentaje resume qué tanto H-OperIA Intelligence cruza señales internas, riesgos, recomendaciones y patrones operativos para que la dirección revise, decida y ejecute con criterio humano."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Ingresos recibidos" value="$184,500" note="Reserva a entrega · corte 15 mayo 2026" tone="green" icon={BadgeDollarSign} />
        <Metric title="Clientes críticos" value="17" note="Riesgo financiero/documental" tone="red" icon={AlertTriangle} />
        <Metric title="Integración H-OperIA Intelligence" value="86%" note="Promedio operativo" tone="violet" icon={Bot} />
        <Metric title="Acciones hoy" value="43" note="Sugeridas para revisión directiva" tone="blue" icon={Target} />
      </div>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Consulta ejecutiva asistida</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">H-OperIA Intelligence transforma preguntas directivas en desgloses verificables y conclusiones accionables.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Texto ejecutivo", "Cuadro comparativo", "Dashboard", "PDF para junta"].map((format) => <Badge key={format} tone="violet">{format}</Badge>)}
          </div>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">1. Pregunta ejecutiva</div>
            <p className="mt-3 text-base font-black leading-7 text-slate-950">¿Qué está frenando la conversión de reservas esta semana?</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-blue-800">2. Desglose propuesto</div>
            <div className="mt-3 space-y-2">
              {["Calidad de leads por canal", "Velocidad de respuesta comercial", "Seguimiento de reservas iniciadas", "Riesgos documentales o financieros"].map((item) => <div key={item} className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-900">{item}</div>)}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-amber-800">3. Validación humana</div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-800">Dirección revisa el desglose, prioriza reservas iniciadas y confirma qué áreas deben responder primero.</p>
            <div className="mt-3 flex flex-wrap gap-2"><Badge tone="amber">Revisión directiva</Badge><Badge tone="dark">Criterio humano</Badge></div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-emerald-800">4. Respuesta ejecutiva</div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-800">La conversión se está viendo afectada principalmente por retrasos de seguimiento y dispersión entre canales. Se recomienda priorizar reservas iniciadas, reforzar contacto humano y revisar casos con documentación pendiente.</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
          <div className="text-sm font-black text-slate-700">Evidencia conectada:</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Ventas / Vendedoras", "Marketing / Canales", "Finanzas / Pagos", "Expediente Vivo"].map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
          </div>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <DetailStack
          title="Prioridades ejecutivas de la semana"
          subtitle="Acciones que H-OperIA Intelligence recomienda revisar en comité comercial."
          items={[
            { title: "Instagram genera volumen, pero formaliza 18% menos que referidos.", text: "Acción: revisar promesas de campaña, calidad de segmentación y consistencia entre anuncio, WhatsApp y seguimiento de vendedoras.", badge: "Marketing", tone: "blue" },
            { title: "Tres vendedoras necesitan más acompañamiento con propuestas asistidas.", text: "Acción: coordinar revisión diaria de propuestas antes de contactar clientes y dar seguimiento claro por vendedora.", badge: "Equipo ventas", tone: "amber" },
            { title: "Torre 3 concentra atrasos de prima y consultas de garantías.", text: "Acción: alinear ventas, financiera, construcción y servicio al cliente para responder con una sola verdad operacional.", badge: "Riesgo", tone: "red" },
            { title: "Clientes que reciben avances de construcción visual abandonan menos.", text: "Acción: automatizar reporte semanal con fotos, hitos, explicación simple y próximos trabajos por torre.", badge: "Construcción", tone: "green" },
          ]}
        />
        <AiObservation>
          <p>La empresa ya no debe dirigir solo por percepción. H-OperIA Intelligence aporta contexto para que los equipos revisen respuestas, analicen documentos, registren compromisos y evalúen campañas por ingresos reales, no solo por leads.</p>
          <p className="mt-3">El nivel de sincronización no mide “actividad decorativa”; muestra cuánta inteligencia operacional real se está usando para decidir mejor, dar seguimiento claro y evitar que cada equipo trabaje con información incompleta.</p>
        </AiObservation>
      </div>
      <SimpleTable
        columns={["Área", "Indicador", "Resultado", "Responsable", "Acción directiva"]}
        rows={[
          ["Campañas", "Ingresos por canal", "Instagram $62,000 / Referidos $51,000", "Marketing", "Premiar referidos y corregir Instagram"],
          ["Vendedoras", "Uso del acompañamiento Marta", "Promedio 76%", "Dir. Comercial", "Revisión semanal individual"],
          ["Pagos", "Atrasos críticos", "$28,500", "Financiera", "Contactar clientes en 72h"],
          ["Documentos", "Pendientes vencidos", "31", "Ventas", "Activar mensajes asistidos y checklist simplificado"],
        ]}
      />
    </div>
  );
}

function ClientPage() {
  const profile = clientOperationalProfile;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Perfil Operacional del Cliente"
        subtitle="Expediente vivo desde la reserva hasta la entrega: Marta acompaña conversaciones, H-OperIA Intelligence ordena señales y la vendedora revisa tono, prioridad y siguiente paso."
        icon={UserRound}
        sync={martaSync.client}
        badges={[REPORT_DATE, profile.cliente.name, profile.pipeline.status]}
        syncNote="Este porcentaje indica qué tan conectado está el expediente post-reserva: Marta acompaña dudas y conversaciones; H-OperIA Intelligence interpreta señales; la vendedora revisa y ejecuta el siguiente paso."
      />

      <Card>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-950 text-4xl font-black text-white">{profile.cliente.initials}</div>
            <div>
              <h2 className="text-4xl font-black text-slate-950">{profile.cliente.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.cliente.badges.map((badge) => <Badge key={badge.label} tone={badge.tone}>{badge.label}</Badge>)}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <InfoCard title="H-Operia ID" value={profile.cliente.amenaId} detail="Identificador único del expediente comercial y operativo." />
                <InfoCard title="Vendedora asignada" value={profile.vendedora.label} detail={profile.vendedora.detail} />
                <InfoCard title="Unidad" value={profile.unidadReservada.label} detail={profile.unidadReservada.detail} />
                <InfoCard title="Pipeline" value={profile.pipeline.status} detail={profile.pipeline.detail} />
                <InfoCard title="Próximas acciones" value={profile.riesgo.nextActions} detail={profile.riesgo.nextActionsDetail} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-3 text-white font-black">IA</div>
          <div>
            <h2 className="text-3xl font-black text-slate-950">Marta · Acompañamiento al Cliente</h2>
            <p className="text-base font-semibold text-slate-700">Marta acompaña conversaciones, H-OperIA Intelligence interpreta señales y la vendedora valida el siguiente paso.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {profile.senalesIa.signals.map((signal) => <KpiCard key={signal.title} title={signal.title} value={signal.value} color={signal.color} />)}
        </div>
        <div className="mt-5 rounded-2xl bg-white p-5 text-base font-semibold leading-8 text-slate-800">
          {profile.senalesIa.summary}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {profile.evidencias.map((evidence) => <EvidenceCard key={evidence.title} title={evidence.title} value={evidence.value} />)}
      </div>

      <TimelineBlock items={profile.timeline} />
      <CommunicationsHub channels={profile.comunicaciones} />
      <MartaProposalReviewCenter proposals={profile.propuestasMarta} />
      <TrackingBlock tracking={profile.seguimientoOperacional} />
    </div>
  );
}

const constructionHierarchy = [
  {
    type: "Apartamentos",
    overview: "Ruta para explorar opciones de reserva nuevas y también para revisar avances de unidades ya reservadas dentro de torres.",
    sectors: [
      {
        sector: "Sector 01",
        overview: "Sector con mayor ritmo comercial. Conviene explicar avances por torre y por nivel para evitar comparaciones confusas.",
        progress: "67%",
        towers: [
          {
            tower: "Torre 3",
            progress: "68%",
            commercialRisk: "Clientes comparan esta torre con otras porque ya observan pintura exterior.",
            levels: [
              {
                level: "Nivel 7",
                progress: "74%",
                units: [
                  { unit: "A704", model: "Modelo A", status: "Instalaciones eléctricas en prueba", reservationId: "HOP-RES-000784", owner: "Carlos Méndez", practicalAdvance: "Muros internos listos, instalaciones eléctricas en validación y ventanas ya colocadas.", directorNote: "Sirve para mostrar consistencia entre promesa comercial y avance real.", sellerNote: "Puede explicarse que la unidad está más avanzada que otras del mismo sector.", reservedClientNote: "Se recomienda enviar fotos internas y cronograma de próximos acabados al propietario de esta unidad.", newLeadNote: "Buena unidad para mostrar seguridad de avance al prospecto, sin revelar información privada del reservante.", nextEvidence: "Enviar set de fotografías + hito de próximas 2 semanas." },
                  { unit: "A705", model: "Modelo A", status: "Ventanas instaladas", reservationId: "HOP-RES-000785", owner: "Reservante privado", practicalAdvance: "Ventanas completas, pruebas de instalaciones pendientes y acabados aún no iniciados.", directorNote: "Unidad útil para comparar secuencia de obra con A704.", sellerNote: "Conviene explicar que no todas las unidades avanzan exactamente al mismo tiempo.", reservedClientNote: "Se puede enviar explicación comparativa corta con A704.", newLeadNote: "Útil para mostrar avance, pero sin prometer acabados inmediatos.", nextEvidence: "Enviar comparativo visual entre dos unidades del mismo nivel." },
                ],
              },
              {
                level: "Nivel 8",
                progress: "69%",
                units: [
                  { unit: "A804", model: "Modelo A", status: "Muros y ductos listos", reservationId: "HOP-RES-000812", owner: "Reservante privado", practicalAdvance: "Ductos e instalaciones preparadas; aún no inicia validación final.", directorNote: "Refuerza visión de avance consistente por encima del nivel 7.", sellerNote: "Se puede usar para explicar orden lógico de ejecución.", reservedClientNote: "Mensaje de tranquilidad: la secuencia está dentro del plan.", newLeadNote: "No mostrar como unidad terminada; mostrarla como avance sólido.", nextEvidence: "Enviar reporte visual simple con lenguaje no técnico." },
                ],
              },
            ],
          },
          {
            tower: "Torre 5",
            progress: "42%",
            commercialRisk: "Genera ansiedad comparativa frente a Torre 3 por ventanas aún no instaladas.",
            levels: [
              { level: "Nivel 6", progress: "45%", units: [ { unit: "B602", model: "Modelo B", status: "Obra gris avanzada", reservationId: "HOP-RES-000901", owner: "Reservante privado", practicalAdvance: "Estructura sólida; ventanas pendientes por lote del proveedor.", directorNote: "Importante coordinar narrativa única entre construcción y ventas.", sellerNote: "Nunca decir solo ‘va atrasado’; explicar secuencia técnica.", reservedClientNote: "Mensaje ideal: la fase actual es correcta y evita retrabajos.", newLeadNote: "Mostrar con prudencia; acompañar siempre con explicación.", nextEvidence: "Enviar bitácora de secuencia técnica y fecha de próxima actualización." } ] },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "Casas",
    overview: "Ruta para casas: sector, manzana, modelo y lote. El nivel de detalle se adapta porque no hay torres ni niveles.",
    sectors: [
      {
        sector: "Sector 05",
        overview: "Sector de casas con interés comercial alto. Conviene mostrar manzanas, lotes y avance de urbanización.",
        progress: "58%",
        towers: [
          { tower: "Manzana 3", progress: "61%", commercialRisk: "Los clientes preguntan por calles internas, acometidas y avance de casa modelo.", levels: [ { level: "Lotes", progress: "61%", units: [ { unit: "Lote 14", model: "Casa Aura", status: "Fundaciones y acometidas listas", reservationId: "HOP-RES-CASA-014", owner: "Reservante privado", practicalAdvance: "Fundaciones terminadas, acometidas preparadas y urbanización de acceso en ejecución.", directorNote: "Permite mostrar avance real de casas sin usar lógica de torres.", sellerNote: "Explicar avances de casa y avances de urbanización por separado.", reservedClientNote: "Enviar informe particular de su lote, fotos de fundación y fecha de siguiente hito.", newLeadNote: "Mostrar casa modelo y avance de urbanización general, sin exponer datos del comprador.", nextEvidence: "Fotos de lote + plano de manzana + hito de urbanización." } ] } ] },
        ],
      },
    ],
  },
];

function ConstructionPage() {
  const [mode, setMode] = useState("explore");
  const [reservationQuery, setReservationQuery] = useState("HOP-RES-000784");
  const [selectedType, setSelectedType] = useState(constructionHierarchy[0].type);
  const currentType = useMemo(() => constructionHierarchy.find((t) => t.type === selectedType) || constructionHierarchy[0], [selectedType]);
  const [selectedSector, setSelectedSector] = useState(currentType.sectors[0].sector);
  const currentSector = useMemo(() => currentType.sectors.find((s) => s.sector === selectedSector) || currentType.sectors[0], [currentType, selectedSector]);
  const [selectedTower, setSelectedTower] = useState(currentSector.towers[0].tower);
  const currentTower = useMemo(() => currentSector.towers.find((t) => t.tower === selectedTower) || currentSector.towers[0], [currentSector, selectedTower]);
  const [selectedLevel, setSelectedLevel] = useState(currentTower.levels[0].level);
  const currentLevel = useMemo(() => currentTower.levels.find((l) => l.level === selectedLevel) || currentTower.levels[0], [currentTower, selectedLevel]);
  const [selectedUnit, setSelectedUnit] = useState(currentLevel.units[0].unit);
  const currentUnit = useMemo(() => currentLevel.units.find((u) => u.unit === selectedUnit) || currentLevel.units[0], [currentLevel, selectedUnit]);

  function resetFromType(typeCode) {
    const nextType = constructionHierarchy.find((item) => item.type === typeCode) || constructionHierarchy[0];
    const firstSector = nextType.sectors[0];
    const firstTower = firstSector.towers[0];
    const firstLevel = firstTower.levels[0];
    const firstUnit = firstLevel.units[0];
    setSelectedType(nextType.type); setSelectedSector(firstSector.sector); setSelectedTower(firstTower.tower); setSelectedLevel(firstLevel.level); setSelectedUnit(firstUnit.unit);
  }
  function handleSectorChange(sectorCode) {
    const nextSector = currentType.sectors.find((item) => item.sector === sectorCode) || currentType.sectors[0];
    const firstTower = nextSector.towers[0]; const firstLevel = firstTower.levels[0]; const firstUnit = firstLevel.units[0];
    setSelectedSector(nextSector.sector); setSelectedTower(firstTower.tower); setSelectedLevel(firstLevel.level); setSelectedUnit(firstUnit.unit);
  }
  function handleTowerChange(towerCode) {
    const nextTower = currentSector.towers.find((item) => item.tower === towerCode) || currentSector.towers[0];
    const firstLevel = nextTower.levels[0]; const firstUnit = firstLevel.units[0];
    setSelectedTower(nextTower.tower); setSelectedLevel(firstLevel.level); setSelectedUnit(firstUnit.unit);
  }
  function handleLevelChange(levelCode) {
    const nextLevel = currentTower.levels.find((item) => item.level === levelCode) || currentTower.levels[0];
    const firstUnit = nextLevel.units[0];
    setSelectedLevel(nextLevel.level); setSelectedUnit(firstUnit.unit);
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Avances de Construcción" subtitle="Control operativo de casas y apartamentos: obra, ventas y servicio trabajan con evidencias visuales, reportes privados y explicaciones claras para clientes, vendedoras y dirección." icon={HardHat} sync={martaSync.construction} badges={[REPORT_DATE, "Tipo → sector → torre/manzana → nivel/lote", "Reportes privados"]} syncNote="Este porcentaje mide qué tan conectados están obra, ventas, evidencias visuales, reportes privados y comunicación al cliente para que el equipo humano revise, decida y comunique con claridad por sector, torre, nivel o unidad." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Avance promedio" value="64%" note="Apartamentos y casas" tone="blue" icon={Building2} />
        <Metric title="Reservantes informados" value="128" note="Con reporte semanal privado" tone="green" icon={Home} />
        <Metric title="Amenidades" value="42%" note="Casa club, piscina y áreas sociales" tone="amber" icon={MapPinned} />
        <Metric title="Alertas obra" value="6" note="2 críticas para comunicación" tone="red" icon={AlertTriangle} />
      </div>

      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Dos formas de consultar construcción</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">La primera es exploratoria, para buscar opciones de reserva. La segunda es privada, mediante ID de reserva, para que la vendedora consulte y envíe al comprador solo el informe de su unidad.</p>
          </div>
          <Badge tone="blue">Exploración o ID de reserva</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <DrillButton active={mode === "explore"} onClick={() => setMode("explore")}>Explorar opciones para nueva reserva</DrillButton>
          <DrillButton active={mode === "reservation"} onClick={() => setMode("reservation")}>Consultar por ID de reserva</DrillButton>
        </div>
      </Card>

      {mode === "reservation" && (
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Informe privado por ID de reserva</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">La vendedora ingresa el ID de reserva y obtiene el informe específico que corresponde al propietario de esa unidad habitacional. Esta información no debe mezclarse con la exploración pública de nuevos interesados.</p>
          <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
            <input value={reservationQuery} onChange={(e) => setReservationQuery(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none" placeholder="Ej. HOP-RES-000784" />
            <button className="rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white"><Search size={18} className="mr-2 inline" />Buscar informe</button>
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-2xl font-black text-slate-950">Informe de avance · {currentUnit.reservationId}</h4>
                <p className="mt-1 text-base font-semibold text-slate-700">Propietario: {currentUnit.owner} · Unidad: {currentUnit.unit} · {currentUnit.model}</p>
              </div>
              <Badge tone="green">Listo para enviar al propietario</Badge>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <BitacoraItem title="Resumen para propietario" text={currentUnit.reservedClientNote} />
              <BitacoraItem title="Evidencia recomendada" text={currentUnit.nextEvidence} />
              <BitacoraItem title="Estado actual" text={currentUnit.practicalAdvance} />
              <BitacoraItem title="Canales de envío" text="WhatsApp, email o ambos, dejando evidencia en el expediente operacional y timeline del cliente." />
            </div>
          </div>
        </Card>
      )}

      {mode === "explore" && (
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">Exploración operacional por capas</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Primero se elige el tipo: casa o apartamento. Luego el usuario decide a qué área quiere entrar: sector, torre o manzana, nivel o lote, y finalmente unidad. Así se entrega una lectura operacional por capas, sin saturar la decisión.</p>
            </div>
            <Badge tone="blue">Tipo → detalle → lupa</Badge>
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <DrillLayer title="1. Tipo de unidad">
                {constructionHierarchy.map((type) => <DrillButton key={type.type} active={selectedType === type.type} onClick={() => resetFromType(type.type)}>{type.type}</DrillButton>)}
              </DrillLayer>
              <DrillLayer title="2. Sectores">
                {currentType.sectors.map((sector) => <DrillButton key={sector.sector} active={selectedSector === sector.sector} onClick={() => handleSectorChange(sector.sector)}>{sector.sector}</DrillButton>)}
              </DrillLayer>
              <DrillLayer title={selectedType === "Casas" ? "3. Manzanas" : "3. Torres"}>
                {currentSector.towers.map((tower) => <DrillButton key={tower.tower} active={selectedTower === tower.tower} onClick={() => handleTowerChange(tower.tower)}>{tower.tower}</DrillButton>)}
              </DrillLayer>
              <DrillLayer title={selectedType === "Casas" ? "4. Lotes" : "4. Niveles"}>
                {currentTower.levels.map((level) => <DrillButton key={level.level} active={selectedLevel === level.level} onClick={() => handleLevelChange(level.level)}>{level.level}</DrillButton>)}
              </DrillLayer>
              <DrillLayer title={selectedType === "Casas" ? "5. Casa / lote" : "5. Apartamentos"}>
                {currentLevel.units.map((unit) => <DrillButton key={unit.unit} active={selectedUnit === unit.unit} onClick={() => setSelectedUnit(unit.unit)}>{unit.unit}</DrillButton>)}
              </DrillLayer>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-black uppercase tracking-[0.22em] text-slate-700">Ruta activa</div>
                <div className="mt-2 text-lg font-black text-slate-950">{selectedType} → {currentSector.sector} → {currentTower.tower} → {currentLevel.level} → {currentUnit.unit}</div>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{currentType.overview}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div><h4 className="text-2xl font-black text-slate-950">Lupa de unidad · {currentUnit.unit}</h4><p className="mt-1 text-base font-semibold text-slate-700">{currentUnit.model} · {currentUnit.status}</p></div>
                <div className="text-3xl font-black text-emerald-600">{currentLevel.progress}</div>
              </div>
              <div className="mt-4 h-3 rounded-full bg-white"><div className="h-3 rounded-full bg-emerald-300" style={{ width: currentLevel.progress }} /></div>
              <div className="mt-5 space-y-3">
                <BitacoraItem title="Avance práctico" text={currentUnit.practicalAdvance} />
                <BitacoraItem title="Qué le sirve al Director Comercial" text={currentUnit.directorNote} />
                <BitacoraItem title="Qué le sirve a la vendedora" text={currentUnit.sellerNote} />
                <BitacoraItem title="Qué conviene decir al cliente reservante" text={currentUnit.reservedClientNote} />
                <BitacoraItem title="Qué conviene mostrar a un nuevo interesado" text={currentUnit.newLeadNote} />
                <BitacoraItem title="Siguiente evidencia a enviar" text={currentUnit.nextEvidence} />
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <h3 className="text-2xl font-black text-slate-950">Bitácora explicativa · Torre 5</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Segunda capa: explicación práctica para vendedoras y clientes cuando comparan una torre con otra.</p>
          <div className="mt-5 space-y-3">
            <BitacoraItem title="Pregunta del cliente" text="¿Por qué la Torre 3 ya está pintada y la Torre 5 todavía no tiene ventanas?" />
            <BitacoraItem title="Respuesta operativa recomendada" text="La Torre 5 tiene un avance estructural compatible con el plan, pero las ventanas dependen de un lote de proveedor programado para la próxima fase. La pintura exterior se realizará después de cerrar instalación de ventanas para evitar retrabajos." />
            <BitacoraItem title="Riesgo comercial" text="Si la vendedora responde de forma improvisada, el cliente puede interpretar atraso grave aunque el hito esté controlado. Conviene enviar reporte visual y explicar secuencia técnica." />
            <BitacoraItem title="Próxima evidencia a enviar" text="Fotos del avance interior, cronograma de instalación de ventanas, explicación de secuencia y fecha de próxima actualización." />
          </div>
        </Card>
        <Card>
          <h3 className="text-2xl font-black text-slate-950">Matriz general de lectura</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Esta tabla resume qué tanto conviene bajar la lupa según la capa que el usuario esté explorando.</p>
          <div className="mt-5"><SimpleTable columns={["Capa", "Qué muestra", "Uso operativo", "Siguiente clic sugerido"]} rows={[["Tipo", "Casa o apartamento", "Define la lógica completa de exploración", "Abrir sectores"], ["Sector", "Panorama global del área", "Sirve para presentar visión general", "Abrir torres o manzanas"], ["Torre / Manzana", "Diferencias visibles entre edificios o zonas", "Reduce comparaciones confusas", "Abrir niveles o lotes"], ["Unidad", "Detalle concreto y accionable", "Sirve a ventas, cliente y dirección", "Ver informe operacional"]]} /></div>
        </Card>
      </div>
    </div>
  );
}

function DocumentsPage() {
  const [activeDoc, setActiveDoc] = useState("espera");
  const docDetails = {
    espera: {
      title: "Detalle de documentos a la espera",
      rows: [["Constancias laborales", "18", "6 días promedio", "Enviar carta modelo para RRHH"], ["Estados de cuenta", "22", "3 días promedio", "Enviar ejemplo visual"], ["NIT", "11", "2 días promedio", "Enviar checklist simplificado"]],
    },
    recibidos: {
      title: "Detalle de documentos recibidos",
      rows: [["DUI", "15", "13 legibles / 2 borrosos", "Revisar solo observados"], ["Comprobantes", "31", "3 en revisión", "Validar referencia bancaria"], ["Constancias", "9", "4 requieren revisión", "Escalar a financiera"]],
    },
    observacion: {
      title: "Detalle de documentos con observación",
      rows: [["Constancia laboral", "12", "Fecha antigua", "Solicitar actualización"], ["DUI", "2", "Imagen borrosa", "Pedir reenvío"], ["Comprobante", "3", "Referencia incompleta", "Pedir comprobante completo"]],
    },
    aprobados: {
      title: "Detalle de documentos aprobados",
      rows: [["DUI", "13", "Aprobado", "Cerrar requisito"], ["Comprobante de reserva", "28", "Validado", "Actualizar expediente"], ["Estados de cuenta", "7", "Validados", "Enviar a financiera"]],
    },
  };
  const currentDoc = docDetails[activeDoc];

  return (
    <div className="space-y-5">
      <PageHeader title="Documentos del Cliente" subtitle="Gestión documental desde visión general hasta microdetalle: Marta acompaña solicitudes y aclaraciones; H-OperIA Intelligence analiza fricciones, vencimientos y prioridades; el equipo valida cada acción." icon={FileText} sync={martaSync.documents} badges={[REPORT_DATE, "Lectura H-OperIA Intelligence", "Checklist operativo"]} syncNote="Este porcentaje combina el acompañamiento de Marta en solicitudes y aclaraciones documentales con la lectura de H-OperIA Intelligence para que ventas, financiera y legal revisen, decidan y ejecuten próximos pasos." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="A la espera" value="147" note="35 reservas con documentos pendientes" tone="slate" icon={ClipboardCheck} onClick={() => setActiveDoc("espera")} active={activeDoc === "espera"} />
        <Metric title="Recibidos" value="96" note="PDF/JPG cargados al expediente" tone="blue" icon={UploadCloud} onClick={() => setActiveDoc("recibidos")} active={activeDoc === "recibidos"} />
        <Metric title="Con observación" value="28" note="Riesgo de rechazo o vencimiento" tone="amber" icon={Bot} onClick={() => setActiveDoc("observacion")} active={activeDoc === "observacion"} />
        <Metric title="Aprobados" value="68" note="Validados por financiera/legal" tone="green" icon={CheckCircle2} onClick={() => setActiveDoc("aprobados")} active={activeDoc === "aprobados"} />
      </div>
      <Card>
        <h3 className="text-3xl font-black text-slate-950">Matriz documental operativa</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Primera capa: visión por tipo de documento, volumen, mora, observación y acción concreta.</p>
        <div className="mt-5">
          <SimpleTable columns={["Documento", "Cantidad / estado", "Formato", "Observación H-OperIA Intelligence", "Acción vendedora", "Evidencia"]} rows={[
            ["DUI", "15 recibidos / 4 pendientes", "PDF/JPG", "Legibles en 13 casos; 2 imágenes borrosas", "Solicitar reenvío solo a casos observados", "Archivo"],
            ["Constancias laborales", "18 pendientes / mora promedio 6 días", "PDF", "Retraso recurrente por tiempos internos de empresas", "Enviar carta modelo para solicitar constancia en RRHH", "Propuesta asistida"],
            ["Comprobante de reserva", "31 recibidos / 3 en revisión", "PDF/Imagen", "2 comprobantes no muestran referencia bancaria", "Pedir comprobante completo", "Evidencia de la Operación"],
            ["Estados de cuenta", "22 esperados / 9 recibidos", "PDF", "Algunos clientes no entienden qué meses enviar", "Enviar checklist con ejemplo visual", "WhatsApp"],
          ]} />
        </div>
      </Card>
      <Card>
        <h3 className="text-2xl font-black text-slate-950">{currentDoc.title}</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Detalle desplegado desde el resumen superior para trabajar con lupa sin saturar la vista general.</p>
        <div className="mt-5"><SimpleTable columns={["Documento", "Cantidad", "Situación", "Acción recomendada"]} rows={currentDoc.rows} /></div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-3">
        <DetailStack title="General" subtitle="Estado documental por cartera." items={[
          { title: "Bloque crítico", text: "Las constancias laborales explican la mayor mora documental. El problema no es desinterés del cliente, sino falta de claridad sobre cómo pedirlas.", badge: "Mora 6 días", tone: "amber" },
          { title: "Acción masiva", text: "Enviar carta modelo editable para que el cliente la entregue en su puesto de trabajo y reduzca fricción con RRHH.", badge: "Sugerencia para revisión humana", tone: "violet" },
        ]} />
        <DetailStack title="Detalle" subtitle="Seguimiento por cliente." items={[
          { title: "Carlos Méndez", text: "DUI recibido, constancia laboral pendiente y comprobante parcial. H-OperIA Intelligence sugiere llamada breve; Marta puede apoyar el checklist por WhatsApp.", badge: "Prioridad alta", tone: "red" },
          { title: "Ana López", text: "Documentos completos, pendiente validación financiera. No requiere presión comercial en este momento.", badge: "Validar", tone: "blue" },
        ]} />
        <AiObservation>
          <p>La gestión documental debe enseñar al equipo dónde se atasca el cliente. Marta acompaña la solicitud; H-OperIA Intelligence explica fricción, prioridad, texto sugerido, escalamiento e impacto sobre la formalización.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Pagos y Compromisos" subtitle="Control del período desde la reserva hasta la entrega: ingresos recibidos, pendientes, atrasos, justificaciones, compromisos, evidencia y prioridades financieras sugeridas por H-OperIA Intelligence." icon={CreditCard} sync={martaSync.payments} badges={[REPORT_DATE, "Reserva a entrega", "Revisión humana"]} syncNote="Este porcentaje muestra qué tanto H-OperIA Intelligence cruza pagos, compromisos, atrasos, justificaciones y evidencias para sugerir prioridades de seguimiento financiero que el equipo revisa, decide y ejecuta." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Ingresos recibidos" value="$184,500" note="Etapa reserva-entrega · corte 15 mayo 2026" tone="green" icon={WalletCards} />
        <Metric title="Pendiente" value="$58,200" note="Primas y gastos" tone="amber" icon={Clock} />
        <Metric title="Atrasos" value="21" note="Clientes con mora" tone="red" icon={AlertTriangle} />
        <Metric title="Seguimientos sugeridos" value="39" note="Para revisión humana" tone="violet" icon={Bot} />
      </div>
      <PaymentBlock title="Ingresos recibidos" tone="green" rows={[
        ["María Fernanda", "S01T05 · A803", "$8,500", "Prima inicial completa", "Enviar agradecimiento y próximos pasos"],
        ["Roberto Castillo", "Casa Aura S5-M3", "$5,000", "Reserva + abono", "Preparar siguiente compromiso de pago"],
        ["Sofía Ramos", "S8-MZB-14", "$7,500", "Abono de prima", "Programar reporte de construcción"],
      ]} />
      <PaymentBlock title="Pendiente" tone="amber" rows={[
        ["Carlos Méndez", "S01T03 · A704", "$5,000", "Prima inicial pendiente", "Enviar simulación bancaria y contactar esposa si no responde"],
        ["Ana López", "D1202", "$2,000", "Gastos legales", "Mandar desglose claro y fecha límite"],
      ]} />
      <PaymentBlock title="Atrasos" tone="red" rows={[
        ["Jorge Aguilar", "Torre 5 · B602", "$3,500", "7 días de atraso", "Escalar a gerente comercial si no confirma hoy"],
        ["Lucía Morales", "Casa Brisa S7-M1", "$4,800", "10 días de atraso", "Revisar si existe dificultad real de crédito"],
      ]} />
    </div>
  );
}

function ServicePage() {
  const [activeService, setActiveService] = useState("tickets");
  const serviceDetails = {
    tickets: {
      title: "Detalle de tickets abiertos",
      rows: [["TCK-1187", "Carlos Méndez", "Acabados", "Medio", "Validar opciones de cocina y responder con PDF"], ["TCK-1191", "Carlos Méndez", "Garantía filtraciones", "Medio", "Adjuntar documento formal de cobertura"], ["TCK-1208", "Ana López", "Fecha de entrega", "Alto", "Enviar hito de construcción y llamada humana"]],
    },
    tiempo: {
      title: "Detalle de tiempos de atención",
      rows: [["Consulta acabados", "42 min", "Dentro de meta", "Mantener respuesta estándar"], ["Garantía", "2h 15m", "Dentro de meta", "Escalar a legal si se repite"], ["Fecha de entrega", "4h 20m", "Fuera de meta", "Crear alerta automática"]],
    },
    escalaciones: {
      title: "Detalle de escalaciones",
      rows: [["ESC-044", "Torre 5", "Construcción", "Preparar explicación técnica para ventas"], ["ESC-047", "Garantía", "Legal", "Crear respuesta estándar validada"], ["ESC-052", "Financiamiento", "Financiera", "Enviar simulación antes de llamada"]],
    },
    resueltos: {
      title: "Detalle de casos resueltos con apoyo de Marta",
      rows: [["Consulta de acabados", "Resuelto", "Guion + PDF", "Convertir en respuesta estándar"], ["Duda de pago", "Resuelto", "Simulación enviada", "Reutilizar para casos similares"], ["Garantía básica", "Resuelto", "Plantilla validada", "Publicar en base de conocimiento"]],
    },
  };
  const currentService = serviceDetails[activeService];

  return (
    <div className="space-y-5">
      <PageHeader title="Servicio al Cliente" subtitle="Tickets, incidencias, garantías, acuerdos, tiempos de atención, reclamos, consultas, escalaciones y aprendizaje operativo para directores y vendedoras." icon={Headphones} sync={martaSync.service} badges={[REPORT_DATE, "Tiempos de atención", "Escalaciones"]} syncNote="Este porcentaje combina el apoyo de Marta en respuestas y seguimiento al cliente con la lectura de H-OperIA Intelligence para ordenar tickets, escalaciones y aprendizajes repetidos." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Tickets abiertos" value="34" note="7 críticos" tone="amber" icon={Headphones} onClick={() => setActiveService("tickets")} active={activeService === "tickets"} />
        <Metric title="Tiempo de atención" value="1h 12m" note="Promedio; meta máxima 4h" tone="green" icon={Clock} onClick={() => setActiveService("tiempo")} active={activeService === "tiempo"} />
        <Metric title="Escalaciones" value="6" note="Legal / Construcción / Financiera" tone="red" icon={AlertTriangle} onClick={() => setActiveService("escalaciones")} active={activeService === "escalaciones"} />
        <Metric title="Resueltos con apoyo asistido" value="68%" note="Con acompañamiento de Marta" tone="violet" icon={Bot} onClick={() => setActiveService("resueltos")} active={activeService === "resueltos"} />
      </div>
      <Card>
        <h3 className="text-2xl font-black text-slate-950">{currentService.title}</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Detalle desplegado desde los cuadros superiores para revisar casos concretos y aprendizaje operativo.</p>
        <div className="mt-5"><SimpleTable columns={activeService === "tickets" ? ["Código", "Cliente", "Tema", "Riesgo", "Detalle operativo"] : activeService === "tiempo" ? ["Tema", "Tiempo", "Estado", "Aprendizaje"] : activeService === "escalaciones" ? ["Código", "Tema", "Área", "Acción"] : ["Caso", "Estado", "Apoyo Marta", "Aprendizaje"]} rows={currentService.rows} /></div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-3">
        <ServiceBlock title="Tickets abiertos" rows={[
          ["TCK-1187", "Carlos Méndez", "Acabados", "Medio", "Validar opciones de cocina y responder con PDF"],
          ["TCK-1191", "Carlos Méndez", "Garantía filtraciones", "Medio", "Adjuntar documento formal de cobertura"],
          ["TCK-1208", "Ana López", "Fecha de entrega", "Alto", "Enviar hito de construcción y llamada humana"],
        ]} />
        <ServiceBlock title="Escalaciones" rows={[
          ["ESC-044", "Torre 5", "Diferencia visual vs Torre 3", "Construcción", "Preparar explicación técnica para ventas"],
          ["ESC-047", "Garantía", "Consulta legal repetida", "Legal", "Crear respuesta estándar validada"],
        ]} />
        <AiObservation title="Aprendizajes operativos de H-OperIA Intelligence">
          <p>Los tickets no deben verse solo como reclamos. Son señales de aprendizaje. Si varios clientes preguntan lo mismo, la empresa debe convertirlo en guion, PDF, respuesta estándar o mejora del reporte semanal.</p>
          <p className="mt-3">H-OperIA Intelligence recomienda explicar internamente cada escalación con pedagogía: qué pasó, por qué importa, cómo responder y qué debe aprender ventas para la próxima conversación.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function SellersPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Gestión de Vendedoras" subtitle="Mapa de apoyo comercial por vendedora: seguimiento, uso del acompañamiento Marta, formularios completados, calidad de información capturada y sugerencias para fortalecer al equipo." icon={Users} sync={martaSync.sellers} badges={[REPORT_DATE, "General → vendedora → formulario", "Acompañamiento"]} syncNote="Este porcentaje mide cómo H-OperIA Intelligence usa formularios, señales comerciales, seguimientos y resultados para detectar necesidades de apoyo, elevar capacidades humanas y dejar la decisión en manos del equipo comercial." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Vendedoras" value="8" note="Equipo activo" tone="blue" icon={Users} />
        <Metric title="Uso del acompañamiento Marta" value="76%" note="Promedio equipo" tone="violet" icon={Bot} />
        <Metric title="Seguimientos pendientes" value="19" note="5 requieren prioridad" tone="red" icon={AlertTriangle} />
        <Metric title="Formularios" value="143" note="Datos humanos/comerciales capturados" tone="green" icon={ClipboardList} />
      </div>

      <Card>
        <h3 className="text-3xl font-black text-slate-950">Mapa operativo de acompañamiento</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Indicadores para acompañar al equipo con contexto, priorizar apoyo y mejorar seguimiento sin convertir la operación en vigilancia.</p>
        <div className="mt-5">
          <SimpleTable columns={["Vendedora", "Clientes", "Uso del acompañamiento Marta", "Formularios", "Seguimientos pendientes", "Ingresos", "Sugerencia asistida"]} rows={[
            ["María Fernanda · VND-034", "28", "91%", "42", "2", "$82,000", "Mantener protocolo; documenta muy bien objeciones familiares"],
            ["Carolina Díaz · VND-021", "22", "63%", "14", "7", "$41,500", "Oportunidad de fortalecer el registro después de cada llamada"],
            ["Ana Guardado · VND-017", "19", "78%", "29", "4", "$36,000", "Revisar propuestas asistidas antes de responder pagos"],
            ["Lucía Herrera · VND-009", "31", "84%", "36", "6", "$59,000", "Alta carga; conviene redistribuir clientes críticos"],
          ]} />
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Lupa de vendedora · María Fernanda</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Perfil individual con observaciones asistidas y seguimiento de recomendaciones.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Fortaleza" value="Seguimiento claro y constante" detail="Registra acuerdos, llama dentro de ventanas recomendadas y revisa propuestas asistidas." />
            <InfoCard title="Riesgo" value="Carga operativa alta" detail="Tiene 28 clientes activos y 4 con sensibilidad financiera." />
            <InfoCard title="Sugerencia H-OperIA Intelligence" value="Priorizar casos financieros" detail="Atender primero clientes con compromisos en 72h." />
            <InfoCard title="Seguimiento vendedora" value="En proceso" detail="Campo para que la vendedora confirme qué hizo con la sugerencia asistida." />
          </div>
        </Card>
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Formularios operativos de vendedoras</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">La información no termina en la reserva. Cada contacto posterior genera datos personales, familiares, económicos y comerciales que deben alimentar el expediente y H-OperIA Intelligence.</p>
          <div className="mt-5 space-y-3">
            <FormItem title="Formulario de llamada de pago" fields="Monto conversado, objeción real, decisor familiar, fecha prometida, tono emocional, evidencia." />
            <FormItem title="Formulario de información familiar" fields="Quién decide, preocupaciones del cónyuge, hijos, prioridades de ubicación, temor principal." />
            <FormItem title="Formulario financiero" fields="Ingreso declarado, banco probable, obstáculos, documentos pendientes, capacidad percibida." />
            <FormItem title="Formulario de construcción" fields="Dudas sobre torre, fecha, acabados, garantía, fotos solicitadas y respuesta dada." />
          </div>
        </Card>
      </div>
      <AiObservation>
        <p>La página de vendedoras debe funcionar como mapa de acompañamiento: qué hacen bien, dónde necesitan apoyo, qué información falta capturar y cómo eso ayuda a clientes, financiera, construcción y dirección comercial.</p>
        <p className="mt-3">H-OperIA Intelligence ayuda a observar hábitos: registrar información, usar recomendaciones, completar llamadas, documentar objeciones y convertir conversaciones dispersas en inteligencia accionable.</p>
      </AiObservation>
    </div>
  );
}

function CampaignsPage() {
  const channelCampaigns = {
    instagram: {
      channel: "Instagram",
      amount: "$62,000",
      summary: "Mayor volumen de leads, pero formalización más débil que referidos.",
      campaigns: {
        modeloA: { title: "Campaña Instagram · Modelo A", result: "Alta atracción / formalización baja", diagnosis: "El anuncio promete vida premium, pero el flujo posterior no filtra capacidad financiera ni urgencia real.", action: "Agregar pregunta de presupuesto, CTA a simulación y retargeting a clientes que abrieron PDF.", marta: "H-OperIA Intelligence detecta una señal temprana: volumen alto que puede saturar vendedoras si no se filtra intención y capacidad desde el primer contacto." },
        torre3: { title: "Campaña Instagram · Torre 3 Avance Visible", result: "Buen interés / dudas por comparación", diagnosis: "La pintura exterior genera confianza, pero también preguntas sobre diferencias con otras torres.", action: "Usar reporte de construcción como soporte de campaña y preparar respuestas comparativas.", marta: "Conviene unir marketing con construcción para no prometer visualmente más de lo que ventas puede explicar." },
      },
    },
    referrals: {
      channel: "Referidos",
      amount: "$51,000",
      summary: "Menor volumen, pero mejor calidad y cierre más rápido.",
      campaigns: {
        compradores: { title: "Campaña Referidos · Compradores Actuales", result: "Pocos leads / alta conversión", diagnosis: "El lead llega con confianza previa; requiere menos educación y más cierre operativo.", action: "Crear incentivo temporal y pedir a compradores actuales compartir avance de construcción.", marta: "El referido reduce fricción emocional. Debe cuidarse con atención premium y velocidad de respuesta." },
      },
    },
    whatsapp: {
      channel: "WhatsApp",
      amount: "$28,500",
      summary: "Buen canal para reenganche si la vendedora llama rápido.",
      campaigns: {
        reenganche: { title: "Campaña WhatsApp · Reenganche", result: "Buen rendimiento si hay llamada humana", diagnosis: "El mensaje reactiva interés, pero el cierre depende de seguimiento rápido de vendedora.", action: "Automatizar alerta de llamada en 2 horas y registrar resultado en formulario.", marta: "El WhatsApp no debe quedar como mensaje suelto: debe activar tarea, formulario y seguimiento medible." },
      },
    },
  };
  const [selectedChannel, setSelectedChannel] = useState("instagram");
  const selectedChannelData = channelCampaigns[selectedChannel];
  const [selectedCampaign, setSelectedCampaign] = useState(Object.keys(selectedChannelData.campaigns)[0]);
  const currentCampaign = selectedChannelData.campaigns[selectedCampaign] || Object.values(selectedChannelData.campaigns)[0];

  function selectChannel(channel) {
    const next = channelCampaigns[channel];
    setSelectedChannel(channel);
    setSelectedCampaign(Object.keys(next.campaigns)[0]);
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Canales y Campañas" subtitle="Radiografía por canal y campaña: H-OperIA Intelligence analiza promesas, calidad de lead, conversión y señales tempranas para que Marketing y Ventas decidan qué ajustar." icon={Megaphone} sync={martaSync.campaigns} badges={[REPORT_DATE, "Canales → campañas → análisis", "Recomendaciones"]} syncNote="Este porcentaje refleja qué tanto H-OperIA Intelligence analiza canales, campañas, promesas, calidad de lead, conversión y señales tempranas para orientar decisiones comerciales revisadas por el equipo humano." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Metric title="Instagram" value="$62,000" note="Mayor volumen" tone="green" icon={BadgeDollarSign} onClick={() => selectChannel("instagram")} active={selectedChannel === "instagram"} />
        <Metric title="Referidos" value="$51,000" note="Mejor calidad" tone="blue" icon={Users} onClick={() => selectChannel("referrals")} active={selectedChannel === "referrals"} />
        <Metric title="WhatsApp" value="$28,500" note="Campañas directas" tone="green" icon={MessageCircle} onClick={() => selectChannel("whatsapp")} active={selectedChannel === "whatsapp"} />
        <Metric title="Email" value="$18,000" note="Reactivación" tone="amber" icon={Mail} />
        <Metric title="Llamadas asistidas" value="$25,000" note="VAPI/Marta" tone="violet" icon={PhoneCall} />
      </div>
      <SimpleTable columns={["Canal", "Responsable", "Leads", "Reservas", "Ingresos", "Dolor detectado", "Acción directiva"]} rows={[
        ["Instagram", "Andrea M.", "412", "18", "$62,000", "Mucho volumen, menor formalización", "Auditar promesas y segmentación"],
        ["Facebook", "Roberto C.", "238", "11", "$31,500", "Leads curiosos con baja urgencia", "Mejorar filtro inicial"],
        ["Referidos", "Equipo ventas", "77", "16", "$51,000", "Poco volumen pero alta calidad", "Escalar incentivo"],
        ["WhatsApp campaña", "María F.", "96", "9", "$28,500", "Buen cierre si hay seguimiento humano oportuno", "Replicar guion"],
      ]} />
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Campañas dentro del canal · {selectedChannelData.channel}</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{selectedChannelData.summary} Selecciona una campaña para abrir diagnóstico, lectura de H-OperIA Intelligence y acciones que el equipo puede revisar y ejecutar.</p>
          </div>
          <Badge tone="blue">Canal → campañas → lupa operativa</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(selectedChannelData.campaigns as Record<string, { title: string; result: string; diagnosis: string; action: string; marta: string }>).map(([key, campaign]) => <DrillButton key={key} active={selectedCampaign === key} onClick={() => setSelectedCampaign(key)}>{campaign.title}</DrillButton>)}
        </div>
        <div className="mt-5"><CampaignCard title={currentCampaign.title} result={currentCampaign.result} diagnosis={currentCampaign.diagnosis} action={currentCampaign.action} /></div>
        <div className="mt-5 rounded-3xl border border-violet-100 bg-violet-50 p-5 text-base font-semibold leading-8 text-slate-800"><span className="font-black text-slate-950">Comentario de H-OperIA Intelligence:</span> {currentCampaign.marta}</div>
      </Card>
      <AiObservation>
        <p>H-OperIA Intelligence recomienda analizar campañas como sistemas completos: promesa del anuncio, calidad del lead, respuesta inicial, conversación con vendedora, documentación, pagos e ingresos reales.</p>
        <p className="mt-3">Una señal temprana puede ser una campaña que genera muchos leads baratos pero consume tiempo, satura vendedoras y no formaliza. Ese riesgo operativo debe verse en esta página.</p>
      </AiObservation>
    </div>
  );
}

function CampaignDeliveryPage() {
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  return (
    <div className="space-y-5">
      <PageHeader title="Envío de Campañas Promocionales" subtitle="Módulo para cargar prospectos, preparar mensajes asistidos y activar campañas por WhatsApp, correo o voz. Las respuestas entran al expediente operacional y pasan a seguimiento humano." icon={Send} sync={martaSync.campaignDelivery} badges={[REPORT_DATE, "Excel → WhatsApp / Email / Voz", "Entrada operacional"]} syncNote="Este porcentaje mide qué tan conectadas están la base de datos, los canales de envío, las respuestas, el expediente operacional y las tareas posteriores para convertir campañas en seguimiento comercial revisado por el equipo." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Prospectos cargados" value="1,250" note="Archivo Excel validado" tone="blue" icon={UploadCloud} />
        <Metric title="Listos para envío" value="1,118" note="132 requieren limpieza" tone="green" icon={CheckCircle2} />
        <Metric title="Canales activos" value="3" note="WhatsApp, email y voz" tone="violet" icon={Layers3} />
        <Metric title="Respuestas esperadas" value="18%" note="Estimación H-OperIA Intelligence" tone="amber" icon={Bot} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Carga de base de datos</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Se carga un Excel con nombre, teléfono, correo, fuente, interés, presupuesto estimado y notas. H-OperIA Intelligence valida duplicados, campos faltantes y señales de baja calidad antes de que el equipo apruebe el envío.</p>
          <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <UploadCloud className="mx-auto text-slate-600" size={42} />
            <h4 className="mt-4 text-2xl font-black text-slate-950">Subir archivo Excel</h4>
            <p className="mt-2 text-base font-semibold text-slate-700">Clientes potenciales · XLSX / CSV · Validación previa al envío.</p>
          </div>
          <div className="mt-5"><SimpleTable columns={["Campo", "Estado", "Comentario H-OperIA Intelligence"]} rows={[["Teléfono", "94% válido", "Normalizar formato +503"], ["Correo", "87% válido", "132 registros sin correo"], ["Interés", "72% clasificado", "Falta categorizar 350 prospectos"], ["Fuente", "Completa", "Lista para atribución de campaña"]]} /></div>
        </Card>
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Canales de envío</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Puedes enviar por un solo canal o combinar WhatsApp, correo electrónico y asistente de voz telefónico según el nivel de interés y la estrategia comercial.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DrillButton active={selectedChannel === "whatsapp"} onClick={() => setSelectedChannel("whatsapp")}>WhatsApp</DrillButton>
            <DrillButton active={selectedChannel === "email"} onClick={() => setSelectedChannel("email")}>Email</DrillButton>
            <DrillButton active={selectedChannel === "voice"} onClick={() => setSelectedChannel("voice")}>Asistente de voz</DrillButton>
            <DrillButton active={selectedChannel === "all"} onClick={() => setSelectedChannel("all")}>Los tres canales</DrillButton>
          </div>
          <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-2xl font-black text-slate-950">Configuración seleccionada</h4>
            <p className="mt-2 text-base font-semibold leading-8 text-slate-800">Canal activo: {selectedChannel === "all" ? "WhatsApp + Email + Voz" : selectedChannel}. Las respuestas se registrarán en el expediente operacional, crearán actividad en el timeline y podrán activar seguimientos para vendedoras.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <button className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white">Preparar audiencia</button>
              <button className="rounded-2xl bg-violet-600 px-5 py-4 text-sm font-black text-white">Revisar mensaje asistido</button>
              <button className="rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white">Programar envío</button>
            </div>
          </div>
        </Card>
      </div>
      <AiObservation>
        <p>Este módulo convierte una base fría de Excel en una campaña operacional conectada. La clave no es solo enviar mensajes: es medir quién responde, qué canal funciona, qué objeciones aparecen y cómo cada respuesta entra al embudo de ventas.</p>
      </AiObservation>
    </div>
  );
}

function FunnelLibraryPage() {
  const [selectedFunnel, setSelectedFunnel] = useState("reserva");
  const funnels = {
    reserva: { title: "Embudo de pre-reserva a formalización", stages: [["Lead interesado", "Origen: campaña, referido o Reservas AMENA", "Asignar vendedora y registrar fuente"], ["Pre-reserva", "Unidad seleccionada", "Enviar confirmación y próximos pasos"], ["Documentos", "Checklist en proceso", "H-OperIA Intelligence detecta faltantes"], ["Pago", "Prima / gastos legales", "Seguimiento financiero"], ["Formalización", "Validación interna", "Cierre operativo"]] },
    reactivacion: { title: "Embudo de reactivación de prospectos", stages: [["Base histórica", "Excel o expediente operacional", "Limpiar datos"], ["Campaña", "WhatsApp, email o voz", "Medir respuesta"], ["Interés renovado", "Cliente responde", "Crear tarea"], ["Reserva potencial", "Explora unidad", "Agendar llamada"], ["Cierre", "Seguimiento humano", "Medir conversión"]] },
    referidos: { title: "Embudo de referidos", stages: [["Comprador actual", "Cliente satisfecho", "Solicitar referido"], ["Referido recibido", "Alta confianza", "Contacto rápido"], ["Exploración", "Unidad sugerida", "Mostrar avance y evidencia"], ["Pre-reserva", "Decisión más rápida", "Acompañamiento Marta"], ["Formalización", "Cierre con menor fricción", "Registrar aprendizaje"]] },
  };
  const current = funnels[selectedFunnel];
  return (
    <div className="space-y-5">
      <PageHeader title="Archivo de Embudos de Ventas" subtitle="Biblioteca operativa para guardar, consultar y reutilizar embudos que convierten campañas, reservas, reactivaciones y referidos en aprendizaje comercial accionable." icon={Layers3} sync={martaSync.funnels} badges={[REPORT_DATE, "Plantillas reutilizables", "Aprendizaje comercial"]} syncNote="Este porcentaje indica qué tanto H-OperIA Intelligence conserva patrones, etapas, mensajes, criterios de avance y aprendizajes para que el equipo decida qué repetir, ajustar o descartar." />
      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Embudos guardados" value="12" note="Plantillas operativas" tone="blue" icon={Layers3} />
        <Metric title="Más efectivo" value="Referidos" note="Mayor conversión" tone="green" icon={Users} />
        <Metric title="En revisión" value="3" note="Requieren ajuste H-OperIA Intelligence" tone="amber" icon={Bot} />
      </div>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div><h3 className="text-3xl font-black text-slate-950">Biblioteca de embudos</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Conserva aprendizajes comerciales, permite reutilizar estructuras efectivas y ayuda a comparar qué embudos funcionan mejor por canal, producto y perfil de cliente.</p></div>
          <Badge tone="green">Recomendado</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <DrillButton active={selectedFunnel === "reserva"} onClick={() => setSelectedFunnel("reserva")}>Pre-reserva a formalización</DrillButton>
          <DrillButton active={selectedFunnel === "reactivacion"} onClick={() => setSelectedFunnel("reactivacion")}>Reactivación</DrillButton>
          <DrillButton active={selectedFunnel === "referidos"} onClick={() => setSelectedFunnel("referidos")}>Referidos</DrillButton>
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-2xl font-black text-slate-950">{current.title}</h4>
          <div className="mt-5"><SimpleTable columns={["Etapa", "Qué significa", "Acción operativa"]} rows={current.stages} /></div>
        </div>
      </Card>
      <AiObservation>
        <p>H-OperIA Intelligence recomienda guardar los embudos como activos comerciales reutilizables. Cada campaña exitosa debe dejar una plantilla: etapas, mensajes, criterios de avance, responsables, métricas y aprendizajes para futuras ejecuciones.</p>
      </AiObservation>
    </div>
  );
}

function DashboardsPage() {
  const [selectedLens, setSelectedLens] = useState("Canal");
  const lensMap = {
    Canal: { winner: "Instagram", detail: "Genera el mayor ingreso total, pero su formalización es más débil que la de referidos. La lupa debe abrir campañas concretas, mensajes, filtros y tiempos de seguimiento.", actions: ["Auditar promesa del anuncio", "Filtrar mejor urgencia y presupuesto", "Comparar con rendimiento de referidos"] },
    Modelo: { winner: "Modelo A", detail: "Domina en reservas y conversaciones iniciales. Conviene analizar qué perfil de cliente conecta mejor con este modelo y por qué.", actions: ["Reforzar contenido visual", "Relacionar con sectores más fuertes", "Analizar objeciones recurrentes"] },
    Sector: { winner: "Sector 01", detail: "Concentra mayor volumen e ingresos. Requiere coordinación constante con construcción, especialmente en Torre 3.", actions: ["Cruzar ventas con hitos de construcción", "Monitorear ansiedad comparativa entre torres", "Enviar reportes semanales visuales"] },
    Vendedora: { winner: "VND-034", detail: "Es la mejor combinación de seguimiento comercial, uso criterioso del acompañamiento Marta e ingresos recibidos.", actions: ["Replicar hábitos", "Estudiar sus formularios", "Usarla como caso interno de aprendizaje"] },
  };
  const currentLens = lensMap[selectedLens];

  return (
    <div className="space-y-5">
      <PageHeader title="Tableros Ejecutivos" subtitle="Tableros base, consultas ejecutivas por texto o voz y respuestas visuales con lupa por canal, modelo, sector o equipo comercial para decidir con contexto, no con vigilancia." icon={BarChart3} sync={martaSync.dashboards} badges={[REPORT_DATE, "Tableros base", "Texto y voz"]} syncNote="Este porcentaje muestra qué tanto H-OperIA Intelligence desagrega preguntas ejecutivas, cruza métricas, detecta riesgos y presenta contexto para que la dirección revise, decida y ejecute con mayor claridad." />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Ingresos totales" value="$184,500" note="Por canal, producto y equipo" tone="green" icon={BadgeDollarSign} />
        <Metric title="Mejor canal" value="Instagram" note="$62,000; revisar calidad" tone="blue" icon={Megaphone} />
        <Metric title="Mejor modelo" value="Modelo A" note="34 reservas" tone="violet" icon={Home} />
        <Metric title="Mejor vendedora" value="VND-034" note="$82,000" tone="amber" icon={Users} />
      </div>
      <Card>
        <h3 className="text-3xl font-black text-slate-950">Tableros que no pueden faltar</h3>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <DashboardMini title="Ingresos y formalización" text="Ingresos recibidos, pendientes, atrasos y conversión real por canal, campaña, modelo y vendedora." />
          <DashboardMini title="Operación comercial" text="Seguimientos pendientes, uso del acompañamiento Marta, formularios completados, velocidad de respuesta y apoyo por equipo." />
          <DashboardMini title="Riesgo integral" text="Clientes críticos por pagos, documentos, construcción, servicio al cliente y señales humanas detectadas." />
        </div>
      </Card>
      <Card>
        <h3 className="text-3xl font-black text-slate-950">Centro de consultas ejecutivas</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-700">A continuación escriba su pregunta o sus preguntas, una por una. Al terminar cada pregunta presione Enter para agregarla al listado.</p>
        <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
          <input className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold outline-none" placeholder="Escribir pregunta ejecutiva individual" />
          <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><Bot size={16} className="mr-2 inline" />Ingrese su pregunta individualmente</button>
        </div>
        <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-700">Preguntas ingresadas</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["¿Qué canal genera más ingresos netos y menos atrasos?", "¿Qué campañas generan leads de baja calidad?"].map((question) => <span key={question} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm">{question}</span>)}
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h4 className="text-xl font-black text-slate-950">Desglose propuesto por H-OperIA Intelligence</h4>
              <p className="mt-3 text-base font-semibold leading-8 text-slate-800">H-OperIA Intelligence descompone la pregunta ejecutiva para revisar ingresos, conversión, acompañamiento humano y riesgos operativos antes de generar una conclusión. Puede modificar, eliminar o aceptar cada desglose antes de enviarlo.</p>
            </div>
            <Badge tone="green">2 seleccionados</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Ingresos netos por canal y campaña", "Conversión por modelo, sector y unidad", "Acompañamiento del equipo y uso de Marta", "Riesgos financieros, documentales y de escrituración"].map((item, index) => (
              <div key={item} className="rounded-2xl bg-white p-4">
                <div className="text-base font-black leading-7 text-slate-950">{index + 1}. {item}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-900">Modificar</button>
                  <button className="rounded-2xl bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">Eliminar</button>
                  <button className="rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">Aceptar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-5">
            <h4 className="text-xl font-black text-slate-950">Desgloses seleccionados para respuesta</h4>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Este es el conjunto final que se enviará para generar la respuesta ejecutiva.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Ingresos netos por canal y campaña", "Riesgos financieros, documentales y de escrituración"].map((item) => <span key={item} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">{item}</span>)}
            </div>
            <button className="mt-4 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white">Enviar desgloses</button>
          </div>
          <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <h4 className="text-xl font-black text-slate-950">Respuestas generadas por H-OperIA Intelligence</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Texto ejecutivo", "Cuadros comparativos", "Dashboard", "PDF descargable", "Imagen ejecutiva"].map((format) => <Badge key={format} tone="violet">{format}</Badge>)}
            </div>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-800">Al enviar los desgloses seleccionados, H-OperIA Intelligence generará una conclusión ejecutiva en los formatos disponibles.</p>
            <button className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><ClipboardCheck size={16} className="mr-2 inline" />Copiar conclusión para junta</button>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Lupa ejecutiva por dimensión</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Desde el resumen general, el usuario puede profundizar haciendo clic en la dimensión que le interese.</p>
          </div>
          <Badge tone="blue">Click para abrir detalle</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.keys(lensMap).map((item) => <DrillButton key={item} active={selectedLens === item} onClick={() => setSelectedLens(item)}>{item}</DrillButton>)}
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-black uppercase tracking-[0.22em] text-slate-700">Lupa activa</div>
          <h4 className="mt-2 text-2xl font-black text-slate-950">{selectedLens} · {currentLens.winner}</h4>
          <p className="mt-3 text-base font-semibold leading-8 text-slate-800">{currentLens.detail}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {currentLens.actions.map((action) => <div key={action} className="rounded-2xl bg-white p-4 text-base font-black text-slate-950">{action}</div>)}
          </div>
        </div>
      </Card>
      <SimpleTable columns={["Dimensión", "Ganador", "Ingresos", "Riesgo", "Lupa ejecutiva"]} rows={[
        ["Canal", "Instagram", "$62,000", "Formalización baja", "Clic: revisar campañas, promesas, leads y recomendaciones"],
        ["Producto", "Apartamento", "$121,000", "Medio", "Clic: modelos, sectores y tiempos de cierre"],
        ["Modelo", "Modelo A", "$74,500", "Bajo", "Clic: compradores típicos y mejores mensajes"],
        ["Sector", "Sector 01", "$93,000", "Medio", "Clic: Torre 3 requiere apoyo de construcción"],
        ["Vendedora", "VND-034", "$82,000", "Bajo", "Clic: hábitos replicables y formularios"],
      ]} />
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <AiObservation>
          <p>Recomendaciones: felicitar a VND-034 por uso criterioso del acompañamiento Marta y resultados; coordinar con Marketing ajustes en Instagram porque genera volumen pero menor calidad; reforzar campañas de referidos por mejor conversión e ingresos reales.</p>
          <p className="mt-3">Al hacer lupa en Instagram, H-OperIA Intelligence debe mostrar campañas concretas, ejemplos de promesas débiles, casos referenciales y acciones para mejorar segmentación, filtro financiero y seguimiento.</p>
        </AiObservation>
        <Card>
          <h3 className="text-2xl font-black text-slate-950">Criterio de gobierno para voz y texto</h3>
          <p className="mt-3 text-base font-semibold leading-8 text-slate-800">El Director General puede definir si el Director Comercial tendrá acceso a consultas por voz o solo por texto. La lectura por texto obliga a revisar con más calma, pensar mejor y documentar decisiones. Para asuntos delicados, se recomienda texto y revisión en escritorio, no escucha pasiva mientras se maneja.</p>
          <div className="mt-4 flex flex-wrap gap-2"><Badge tone="dark">Permiso Director General</Badge><Badge tone="amber">Consultas delicadas por texto</Badge><Badge tone="blue">Voz para exploración rápida</Badge></div>
        </Card>
      </div>
    </div>
  );
}

function DemoPage({ setActive }) {
  const DEMO_BACKEND_URL = "http://localhost:4000";
  const phases = [
    { title: "FASE 01", name: "Reserva en vivo y validación operacional", text: "La reserva crea el cliente operacional y selecciona la unidad que dará origen al resto del ciclo.", nextStep: "validar cliente, unidad, fuente, estado y evidencia visible." },
    { title: "FASE 02", name: "Marta · Acompañamiento Multicanal", text: "Marta acompaña por voz o texto y registra cada interacción como dato estructurado para evidencia, seguimiento e inteligencia.", nextStep: "revisar por separado Marta Voz / Vapi y Marta WhatsApp / Texto." },
    { title: "FASE 03", name: "Registro de Seguimiento Comercial y Mensajes entre el Equipo", text: "Desde clientes reservados mostraremos reportes de vendedoras, objeciones, prioridades, próximos pasos y coordinación interna.", nextStep: "revisar seguimiento comercial y mensajes operacionales del equipo." },
    { title: "FASE 04", name: "Centro de Mando y Evidencia de la Operación", text: "Consolidaremos datos de Reservas, Registro de Seguimiento Comercial, Mensajes entre el Equipo y Marta Multicanal.", nextStep: "validar fuentes, conteos, trazabilidad y evidencia administrativa." },
    { title: "FASE 05", name: "H-OperIA Intelligence", text: "Transformaremos la operación ampliada en impactos visibles, riesgos, oportunidades, prioridades y recomendaciones.", nextStep: "cargar Empresa Demo y revisar los impactos generados por la operación." },
    { title: "FASE 06", name: "Cierre ejecutivo y próximos pasos", text: "Consultaremos el inventario operacional con H-OperIA Intelligence para generar una lectura ejecutiva.", nextStep: "generar respuesta ejecutiva y copiar conclusión para junta." },
  ];
  const emptyVolunteer = { name: "", role: "", company: "", whatsapp: "", email: "" };
  const baseVolunteer = { name: "Andrea López", role: "Gerente comercial", company: "Proyecto Comalapa", whatsapp: "+503 7000-0000", email: "andrea@empresa.com", whatsappStatus: "Pendiente", emailStatus: "Pendiente", reservationStarted: "Pendiente", reservationCompleted: "Pendiente", finished: "No" };
  const createDemoRunId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return `demo-${crypto.randomUUID()}`;
    return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  };
  const createSimulatedReservationClients = (demoRunId) => {
    const names = ["Carlos Mendez", "Andrea Lopez", "Sofia Rivera", "Mario Hernandez", "Lucia Alvarez", "Roberto Castillo", "Paola Garcia", "Jorge Morales", "Elena Torres", "Diego Ramirez", "Natalia Flores", "Victor Pineda", "Claudia Reyes", "Fernando Ortiz", "Gabriela Cruz", "Ricardo Salazar", "Monica Aguilar", "Hector Vasquez", "Daniela Mejia", "Oscar Campos"];
    const channels = ["App Reservas", "Landing publica", "Referido", "Campana digital"];
    return names.map((name, index) => ({
      id: `sim-res-${String(index + 1).padStart(2, "0")}`,
      demoRunId,
      name,
      phone: `+503 7${String(1000000 + index * 317).slice(0, 7)}`,
      unit: `Torre ${index % 3 + 1} · Nivel ${index % 8 + 1} · A${String(701 + index).padStart(3, "0")}`,
      source: channels[index % channels.length],
      reservationStatus: index % 5 === 0 ? "Avanzada" : index % 3 === 0 ? "Completada" : "En progreso",
      createdAt: index < 10 ? `Hoy 3:${String(10 + index).padStart(2, "0")} PM` : `Hoy 4:${String(index - 10).padStart(2, "0")} PM`,
    }));
  };
  const createSimulatedInternalMessages = (demoRunId, clients) => {
    const topics = ["Coordinacion con vendedora", "Alerta de documentos", "Consulta de pagos", "Seguimiento de cita", "Prioridad comercial"];
    const fromRoles = ["Marta", "Coordinacion comercial", "Financiera", "Documentos", "Gerencia comercial"];
    const toRoles = ["Vendedora responsable", "Financiera", "Servicio al cliente", "Coordinacion comercial", "Direccion comercial"];
    return clients.map((client, index) => ({
      id: `sim-msg-${String(index + 1).padStart(2, "0")}`,
      demoRunId,
      relatedClientName: client.name,
      fromRole: fromRoles[index % fromRoles.length],
      toRole: toRoles[index % toRoles.length],
      messageText: `${topics[index % topics.length]} para ${client.name}: revisar reserva ${client.reservationStatus.toLowerCase()} y dejar evidencia del siguiente movimiento.`,
      topic: topics[index % topics.length],
      priority: index % 5 === 0 ? "Alta" : index % 2 === 0 ? "Media" : "Baja",
      createdAt: index < 10 ? `Hoy 4:${String(12 + index).padStart(2, "0")} PM` : `Hoy 5:${String(index - 10).padStart(2, "0")} PM`,
    }));
  };
  const createSimulatedSellerReports = (demoRunId, clients) => {
    const sellers = ["Maria Fernanda", "VND-012", "VND-034", "VND-021"];
    const interactionTypes = ["Llamada post-reserva", "Reunion virtual", "Seguimiento documental", "Visita a sala de ventas"];
    const needs = ["Claridad financiera", "Validar documentos", "Confirmar disponibilidad", "Incluir decisor familiar"];
    const objections = ["Monto de prima", "Tiempo de entrega", "Documentos pendientes", "Comparacion con otra opcion"];
    return clients.map((client, index) => ({
      id: `sim-seller-${String(index + 1).padStart(2, "0")}`,
      demoRunId,
      clientName: client.name,
      sellerName: sellers[index % sellers.length],
      interactionType: interactionTypes[index % interactionTypes.length],
      summary: `${client.name} confirma interes y pide acompanamiento posterior a la reserva ${client.reservationStatus.toLowerCase()}.`,
      detectedNeed: needs[index % needs.length],
      objection: objections[index % objections.length],
      nextStep: index % 4 === 0 ? "Llamada financiera" : index % 4 === 1 ? "Enviar checklist" : index % 4 === 2 ? "Confirmar unidad" : "Agendar seguimiento",
      priority: index % 5 === 0 ? "Alta" : index % 2 === 0 ? "Media" : "Baja",
      createdAt: index < 10 ? `Hoy 4:${String(20 + index).padStart(2, "0")} PM` : `Manana 9:${String(index - 10).padStart(2, "0")} AM`,
    }));
  };
  const createSimulatedVapiCallLogs = (demoRunId, clients) => {
    const intents = ["confirmar financiamiento", "validar modelo preferido", "agendar cita", "resolver documentos", "confirmar decision familiar"];
    const models = ["Modelo A", "Modelo B", "Apartamento 2 hab", "Casa familiar"];
    const budgets = ["$85k-$95k", "$95k-$110k", "$110k-$125k", "$125k-$140k"];
    return clients.map((client, index) => {
      const structuredOutput = {
        wantsFinancing: index % 2 === 0,
        preferredModel: models[index % models.length],
        budgetRange: budgets[index % budgets.length],
        familyDecisionPending: index % 3 === 0,
        documentsPending: index % 4 === 0,
        appointmentRequested: index % 5 !== 0,
        urgencyLevel: index % 5 === 0 ? "Alta" : index % 2 === 0 ? "Media" : "Baja",
      };
      return {
        id: `sim-vapi-${String(index + 1).padStart(2, "0")}`,
        demoRunId,
        clientName: client.name,
        callId: `call_${demoRunId.replace("demo-", "").slice(0, 8)}_${String(index + 1).padStart(2, "0")}`,
        assistantName: "Marta",
        channel: "voice",
        durationSeconds: 105 + index * 11,
        callStatus: index % 6 === 0 ? "needs_review" : "completed",
        transcriptSummary: `${client.name} conversa con Marta sobre reserva ${client.reservationStatus.toLowerCase()}, financiamiento, modelo preferido y siguiente cita.`,
        detectedIntent: intents[index % intents.length],
        verifiedData: `Telefono ${client.phone}; unidad ${client.unit}; fuente ${client.source}.`,
        structuredOutput,
        nextStep: structuredOutput.appointmentRequested ? "Confirmar cita con vendedora" : "Enviar resumen financiero",
        riskSignal: structuredOutput.documentsPending || structuredOutput.familyDecisionPending ? "Requiere seguimiento humano" : "Sin riesgo critico",
        createdAt: index < 10 ? `Hoy 5:${String(10 + index).padStart(2, "0")} PM` : `Manana 8:${String(index - 10).padStart(2, "0")} AM`,
      };
    });
  };
  const createSimulatedMartaWhatsAppFollowups = (demoRunId, clients) => {
    const replies = ["Gracias, quiero revisar financiamiento", "Me falta enviar documentos", "Mi esposa quiere ver el detalle", "Confirmo cita para manana", "Necesito comparar modelos"];
    const intents = ["financiamiento", "documentos", "decision familiar", "cita", "comparacion de modelo"];
    return clients.map((client, index) => ({
      id: `sim-wa-${String(index + 1).padStart(2, "0")}`,
      demoRunId,
      clientName: client.name,
      channel: "whatsapp_text",
      messageText: `Hola ${client.name}, soy Marta. Te comparto el siguiente paso de tu reserva y puedo ayudarte a coordinar documentos, cita o financiamiento.`,
      customerReply: replies[index % replies.length],
      detectedIntent: intents[index % intents.length],
      nextStep: index % 5 === 0 ? "Escalar a financiera" : index % 3 === 0 ? "Agendar llamada humana" : "Registrar seguimiento en expediente",
      status: index % 4 === 0 ? "Requiere respuesta humana" : "Simulado",
      createdAt: index < 10 ? `Hoy 5:${String(25 + index).padStart(2, "0")} PM` : `Manana 8:${String(20 + index - 10).padStart(2, "0")} AM`,
    }));
  };
  const createSimulatedIntelligenceSignals = (demoRunId, clients, messages, reports, vapiLogs, whatsappFollowups) => [
    {
      id: "sim-finding-01",
      demoRunId,
      number: 1,
      adminPage: "Centro Ejecutivo",
      adminTarget: "executive",
      section: "Prioridades de dirección",
      finding: "La operación posterior a la reserva concentra riesgos comerciales, financieros y de servicio que requieren revisión ejecutiva antes de la siguiente junta.",
      source: "Mensajes entre el Equipo",
      adminLink: "Centro Ejecutivo -> Prioridades de dirección",
      externalVerification: null,
      supabaseTable: "demo_executive_priorities",
      status: "Pendiente de verificación",
      priorityReason: "Impacto transversal sobre decisiones directivas y seguimiento interáreas.",
      priority: "Alta",
    },
    {
      id: "sim-finding-02",
      demoRunId,
      number: 2,
      adminPage: "Expediente Vivo",
      adminTarget: "client",
      section: "Timeline del cliente",
      finding: `${clients[0]?.name || "Cliente prioritario"} acumula señales de intención, dudas financieras y seguimiento humano que deben quedar visibles en un solo expediente.`,
      source: "Web Widget",
      adminLink: "Expediente Vivo -> Timeline del cliente",
      externalVerification: "Supabase",
      supabaseTable: "demo_customer_profiles",
      status: "Pendiente de verificación",
      priorityReason: "Evita pérdida de contexto entre reserva, conversación y seguimiento comercial.",
      priority: "Alta",
    },
    {
      id: "sim-finding-03",
      demoRunId,
      number: 3,
      adminPage: "Inventario / Construcción",
      adminTarget: "construction",
      section: "Unidades con presión comercial",
      finding: "La preferencia por modelos familiares debe cruzarse con disponibilidad y avance de construcción antes de prometer fechas o alternativas.",
      source: "Registro de Seguimiento Comercial",
      adminLink: "Inventario / Construcción -> Unidades con presión comercial",
      externalVerification: "Supabase",
      supabaseTable: "demo_inventory_units",
      status: "Pendiente de verificación",
      priorityReason: "Reduce riesgo de prometer inventario o fechas sin evidencia operacional.",
      priority: "Alta",
    },
    {
      id: "sim-finding-04",
      demoRunId,
      number: 4,
      adminPage: "Documentos",
      adminTarget: "documents",
      section: "Checklist documental crítico",
      finding: "Hay expedientes con documentación parcial que pueden bloquear formalización si no se solicita el faltante correcto en la próxima interacción.",
      source: "Documentos",
      adminLink: "Documentos -> Checklist documental crítico",
      externalVerification: "Supabase",
      supabaseTable: "demo_document_checklists",
      status: "Pendiente de verificación",
      priorityReason: "Afecta directamente velocidad de formalización y calidad del expediente.",
      priority: "Alta",
    },
    {
      id: "sim-finding-05",
      demoRunId,
      number: 5,
      adminPage: "Finanzas / Pagos",
      adminTarget: "payments",
      section: "Compromisos de pago sensibles",
      finding: `${reports.filter((item) => item.objection === "Monto de prima").length || "Varios"} casos mencionan prima, cuota o claridad financiera como bloqueo para avanzar.`,
      source: "Registro de Seguimiento Comercial",
      adminLink: "Finanzas / Pagos -> Compromisos de pago sensibles",
      externalVerification: "Supabase",
      supabaseTable: "demo_payment_commitments",
      status: "Pendiente de verificación",
      priorityReason: "Riesgo directo sobre ingresos, atrasos y confianza del cliente.",
      priority: "Alta",
    },
    {
      id: "sim-finding-06",
      demoRunId,
      number: 6,
      adminPage: "Servicio Cliente",
      adminTarget: "service",
      section: "Alertas críticas del cliente",
      finding: "Carlos Armando Domínguez manifestó intención de presentar una demanda judicial por inconsistencias entre la información comercial recibida y el contrato firmado.",
      source: "Registro de Seguimiento Comercial",
      adminLink: "Servicio Cliente -> Alertas críticas",
      externalVerification: "Supabase",
      supabaseTable: "demo_customer_service_cases",
      status: "Pendiente de verificación",
      priorityReason: "Riesgo legal y reputacional.",
      priority: "Alta",
    },
    {
      id: "sim-finding-07",
      demoRunId,
      number: 7,
      adminPage: "Ventas / Vendedoras",
      adminTarget: "sellers",
      section: "Seguimientos que requieren intervención humana",
      finding: `${whatsappFollowups.filter((item) => item.status === "Requiere respuesta humana").length || "Algunos"} seguimientos conversacionales requieren que una vendedora revise tono, prioridad y siguiente paso antes de responder.`,
      source: "Marta Voz / VAPI",
      adminLink: "Ventas / Vendedoras -> Seguimientos prioritarios",
      externalVerification: "VAPI Logs",
      supabaseTable: "demo_seller_followups",
      status: "Pendiente de verificación",
      priorityReason: "Evita respuestas automáticas en casos donde debe decidir una persona.",
      priority: "Alta",
    },
  ];
  const createSimulatedOperationalEvidence = (demoRunId, clients, messages, reports, signals, vapiLogs, whatsappFollowups) => [
    { id: "sim-evidence-01", demoRunId, page: "Aplicacion de Reservas", section: "Clientes/reservas", summary: `${clients.length} registros de reserva simulados`, status: "Visible" },
    { id: "sim-evidence-02", demoRunId, page: "Mensajes entre el Equipo", section: "Coordinacion interna", summary: `${messages.length} mensajes internos asociados a clientes`, status: "Visible" },
    { id: "sim-evidence-03", demoRunId, page: "Aplicacion de Vendedoras", section: "Reportes humanos", summary: `${reports.length} reportes de interacciones posteriores`, status: "Visible" },
    { id: "sim-evidence-04", demoRunId, page: "Marta Voz / Vapi", section: "Logs de llamadas", summary: `${vapiLogs.length} logs de voz simulados con salida estructurada`, status: "Visible" },
    { id: "sim-evidence-05", demoRunId, page: "Marta WhatsApp Texto", section: "Seguimientos conversacionales", summary: `${whatsappFollowups.length} seguimientos de texto simulados`, status: "Visible" },
    { id: "sim-evidence-06", demoRunId, page: "H-OperIA Intelligence", section: "Senales derivadas", summary: `${signals.length} senales ejecutivas generadas`, status: "Generado" },
  ];
  const [activePhase, setActivePhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [volunteerForm, setVolunteerForm] = useState(emptyVolunteer);
  const [volunteers, setVolunteers] = useState([baseVolunteer]);
  const [selectedPhone, setSelectedPhone] = useState(baseVolunteer.whatsapp);
  const [reservationStatus, setReservationStatus] = useState({ reservation: "Pendiente", whatsapp: "Pendiente", email: "Pendiente", evidence: "Pendiente" });
  const [deliveryEvidence, setDeliveryEvidence] = useState([]);
  const [visibleSendStatus, setVisibleSendStatus] = useState({ whatsappStatus: "Pendiente", emailStatus: "Pendiente" });
  const [commercialSearch, setCommercialSearch] = useState("");
  const [martaStatus, setMartaStatus] = useState("Conversación pendiente");
  const [vapiStatus, setVapiStatus] = useState("Pendiente");
  const [activeDemoContext, setActiveDemoContext] = useState(null as null | { demoRunId: string; prospectCompanyName: string; projectName: string; scenarioName: string; status: string; injectedAt: string });
  const [simulatedReservationClients, setSimulatedReservationClients] = useState<any[]>([]);
  const [simulatedInternalMessages, setSimulatedInternalMessages] = useState<any[]>([]);
  const [simulatedSellerReports, setSimulatedSellerReports] = useState<any[]>([]);
  const [simulatedVapiCallLogs, setSimulatedVapiCallLogs] = useState<any[]>([]);
  const [simulatedMartaWhatsAppFollowups, setSimulatedMartaWhatsAppFollowups] = useState<any[]>([]);
  const [simulatedIntelligenceSignals, setSimulatedIntelligenceSignals] = useState<any[]>([]);
  const [simulatedOperationalEvidence, setSimulatedOperationalEvidence] = useState<any[]>([]);
  const [executiveQuery, setExecutiveQuery] = useState("");
  const [executiveQuestions, setExecutiveQuestions] = useState(["¿Qué canal genera más ingresos netos y menos atrasos?", "¿Qué campañas generan leads de baja calidad?"]);
  const [executiveBreakdown, setExecutiveBreakdown] = useState("Ingresos netos por canal y campaña\nConversión por modelo, sector y unidad\nAcompañamiento del equipo y uso de Marta\nRiesgos financieros, documentales y de escrituración");
  const [selectedBreakdowns, setSelectedBreakdowns] = useState(["Ingresos netos por canal y campaña", "Riesgos financieros, documentales y de escrituración"]);
  const [executiveResponseReady, setExecutiveResponseReady] = useState(false);
  const phaseSectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statusTone = { Pendiente: "amber", Activa: "blue", Completada: "green", Enviando: "blue", Enviado: "green", Error: "red", Confirmado: "green", Abierto: "green", Validada: "green", Generada: "green", Generado: "green", Verificado: "green", Visible: "green", No: "slate", Finalizado: "green", Alta: "red", Media: "amber", Baja: "green", "En revisión": "amber", "Logs verificados": "green", "Conversación pendiente": "amber", "Conversación en curso": "blue", "Conversación analizada": "green" };
  const adminTargetsByPage = {
    "Centro Ejecutivo": "executive",
    "Expediente Vivo": "client",
    "Inventario / Construcción": "construction",
    Documentos: "documents",
    "Finanzas / Pagos": "payments",
    "Servicio Cliente": "service",
    "Ventas / Vendedoras": "sellers",
  };
  const demoAdminPageLabels = {
    executive: "Centro Ejecutivo",
    client: "Expediente Vivo",
    construction: "Inventario / ConstrucciÃ³n",
    documents: "Documentos",
    payments: "Finanzas / Pagos",
    service: "Servicio Cliente",
    sellers: "Ventas / Vendedoras",
    campaigns: "Marketing / Canales",
    campaignDelivery: "CampaÃ±as",
    funnels: "Embudos",
    dashboards: "Inteligencia Operativa",
  };
  const demoFindingSourceLabels = {
    reservations: "Reservas",
    marta_voice_vapi: "Marta Voz / VAPI",
    marta_text_whatsapp: "Marta WhatsApp / Texto",
    commercial_follow_up: "Registro de Seguimiento Comercial",
    team_messages: "Mensajes entre el Equipo",
    documents: "Documentos",
    payments: "Finanzas / Pagos",
    customer_service: "Servicio Cliente",
    h_operia_intelligence: "H-OperIA Intelligence",
    manual_demo: "Demo manual",
  };
  const demoFindingSeverityLabels = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    critical: "CrÃ­tica",
  };
  const demoFindingSeverityTone = {
    low: "green",
    medium: "amber",
    high: "red",
    critical: "red",
  };
  const demoVisibleStatusLabels = {
    pending: "Pendiente de verificaciÃ³n",
    visible: "Visible",
    acknowledged: "Revisado",
    hidden: "Oculto",
  };
  const progress = Math.round((completedPhases.length / phases.length) * 100);
  const selectedVolunteer = volunteers.find((item) => item.whatsapp === selectedPhone) || volunteers[0] || baseVolunteer;
  const simulatedDataInjected = activeDemoContext?.status === "injected" && simulatedReservationClients.length > 0 && simulatedInternalMessages.length > 0 && simulatedSellerReports.length > 0 && simulatedVapiCallLogs.length > 0;
  const demoRunIdShort = activeDemoContext ? activeDemoContext.demoRunId.replace("demo-", "").slice(0, 8) : "Sin demo activa";
  const demoStatusBefore = activeDemoContext ? "Sin demo activa" : "Pendiente";
  const demoStatusAfter = activeDemoContext?.status || "Pendiente";
  const normalizeSalvadoranPhone = (value) => {
    const compact = value.trim().replace(/[\s().-]/g, "");
    if (!compact) return "";
    if (compact.startsWith("+")) return `+${compact.slice(1).replace(/\D/g, "")}`;
    const digits = compact.replace(/\D/g, "");
    if (digits.startsWith("503")) return `+${digits}`;
    if (digits.length === 8) return `+503${digits}`;
    return digits ? `+${digits}` : "";
  };
  const resetDemoEvidence = () => {
    setDeliveryEvidence([]);
    setReservationStatus({ reservation: "Pendiente", whatsapp: "Pendiente", email: "Pendiente", evidence: "Pendiente" });
    setVisibleSendStatus({ whatsappStatus: "Pendiente", emailStatus: "Pendiente" });
  };
  const phaseStatus = (index) => completedPhases.includes(index) ? "Completada" : activePhase === index ? "Activa" : "Pendiente";
  const presentPhase = (index) => {
    setActivePhase(index);
    phaseSectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const presentImpactedSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const openAdminFinding = (finding) => {
    const target =
      finding?.adminTargetPage ||
      finding?.adminTarget ||
      adminTargetsByPage[finding?.adminPage];
    if (!menu.some((item) => item.id === target)) return;
    setActive(target);
  };
  const completePhase = (index) => {
    setCompletedPhases((current) => current.includes(index) ? current : [...current, index]);
    if (index < phases.length - 1) setActivePhase(index + 1);
  };
  const addVolunteer = () => {
    if (!volunteerForm.name && !volunteerForm.whatsapp) return;
    const normalizedWhatsapp = normalizeSalvadoranPhone(volunteerForm.whatsapp);
    const next = { ...volunteerForm, whatsapp: normalizedWhatsapp, email: volunteerForm.email.trim(), whatsappStatus: "Pendiente", emailStatus: "Pendiente", reservationStarted: "Pendiente", reservationCompleted: "Pendiente", finished: "No" };
    setVolunteers((current) => [...current, next]);
    setSelectedPhone(next.whatsapp);
    resetDemoEvidence();
  };
  const updateVolunteerStatus = (field, value, identity = selectedPhone) => setVolunteers((current) => current.map((item) => item.whatsapp === identity || item.email === identity ? { ...item, [field]: value } : item));
  const updateVisibleSendStatus = (field, value, identity) => {
    setVisibleSendStatus((current) => ({ ...current, [field]: value }));
    if (identity) updateVolunteerStatus(field, value, identity);
  };
  const demoLink = () => {
    if (typeof window === "undefined") return "#demo";
    return `${window.location.origin}${window.location.pathname}#demo`;
  };
  const addDeliveryEvidence = (entry) => {
    const time = new Date().toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setDeliveryEvidence((current) => [{ ...entry, time }, ...current].slice(0, 6));
  };
  const sendDemoLink = async (channel) => {
    const isWhatsApp = channel === "whatsapp";
    const endpointPath = isWhatsApp ? "/send-whatsapp" : "/send-email";
    const endpoint = `${DEMO_BACKEND_URL}${endpointPath}`;
    const statusField = isWhatsApp ? "whatsappStatus" : "emailStatus";
    const formVolunteer = {
      name: volunteerForm.name.trim(),
      whatsapp: normalizeSalvadoranPhone(volunteerForm.whatsapp),
      email: volunteerForm.email.trim(),
    };
    const recipient = isWhatsApp ? formVolunteer.whatsapp : formVolunteer.email;

    if (!recipient) {
      updateVisibleSendStatus(statusField, "Error", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient: "Sin destinatario",
        result: "Error: falta destinatario",
      });
      return;
    }

    updateVisibleSendStatus(statusField, "Enviando", formVolunteer.whatsapp || formVolunteer.email);

    try {
      const payload = isWhatsApp
        ? { phone: formVolunteer.whatsapp, name: formVolunteer.name, link: demoLink() }
        : { to: formVolunteer.email, name: formVolunteer.name, link: demoLink() };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText || "Error"}`);
      }

      updateVisibleSendStatus(statusField, "Enviado", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient,
        result: `Enviado al backend · HTTP ${response.status}`,
      });
    } catch (error) {
      updateVisibleSendStatus(statusField, "Error", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient,
        result: `Error: ${error instanceof Error ? error.message : "No se pudo contactar el backend"}`,
      });
    }
  };
  const finishVolunteer = () => {
    updateVolunteerStatus("finished", "Finalizado");
    setVolunteerForm(emptyVolunteer);
    resetDemoEvidence();
  };
  const validateReservation = () => setReservationStatus({ reservation: "Validada", whatsapp: selectedVolunteer.whatsappStatus === "Enviado" ? "Confirmado" : "Pendiente", email: selectedVolunteer.emailStatus === "Enviado" ? "Confirmado" : "Pendiente", evidence: "Generada" });
  const simulateMartaConversation = () => {
    setMartaStatus("Conversación en curso");
    setVapiStatus("Pendiente");
  };
  const openVapi = () => {
    setMartaStatus("Conversación analizada");
    setVapiStatus("Abierto");
  };
  const injectSimulatedData = (quantities = { reservations: 20, messages: 20, sellerReports: 20, vapiLogs: 20 }) => {
    const nextDemoRunId = createDemoRunId();
    const baseReservationClients = createSimulatedReservationClients(nextDemoRunId);
    const nextReservationClients = baseReservationClients.slice(0, quantities.reservations);
    const nextInternalMessages = createSimulatedInternalMessages(nextDemoRunId, baseReservationClients).slice(0, quantities.messages);
    const nextSellerReports = createSimulatedSellerReports(nextDemoRunId, baseReservationClients).slice(0, quantities.sellerReports);
    const nextVapiCallLogs = createSimulatedVapiCallLogs(nextDemoRunId, baseReservationClients).slice(0, quantities.vapiLogs);
    const nextMartaWhatsAppFollowups = [];
    const nextIntelligenceSignals = createDemoInjectedFindings(nextDemoRunId);
    const nextOperationalEvidence = createSimulatedOperationalEvidence(nextDemoRunId, nextReservationClients, nextInternalMessages, nextSellerReports, nextIntelligenceSignals, nextVapiCallLogs, nextMartaWhatsAppFollowups);
    setSimulatedReservationClients(nextReservationClients);
    setSimulatedInternalMessages(nextInternalMessages);
    setSimulatedSellerReports(nextSellerReports);
    setSimulatedVapiCallLogs(nextVapiCallLogs);
    setSimulatedMartaWhatsAppFollowups(nextMartaWhatsAppFollowups);
    setSimulatedIntelligenceSignals(nextIntelligenceSignals);
    setSimulatedOperationalEvidence(nextOperationalEvidence);
    setActiveDemoContext({
      demoRunId: nextDemoRunId,
      prospectCompanyName: selectedVolunteer.company || volunteerForm.company || "Empresa demo local",
      projectName: "AMENA Comalapa",
      scenarioName: "Lanzamiento comercial de proyecto habitacional",
      status: "injected",
      injectedAt: new Date().toLocaleString("es-SV", { dateStyle: "short", timeStyle: "short" }),
    });
    setReservationStatus({ reservation: "Validada", whatsapp: "Confirmado", email: "Confirmado", evidence: "Generada" });
    completePhase(4);
  };
  const commercialRows = simulatedDataInjected
    ? simulatedSellerReports.slice(0, 5).map((report) => [report.clientName, report.sellerName, report.interactionType, `${report.summary} Necesidad: ${report.detectedNeed}. Objecion: ${report.objection}.`, report.priority, report.nextStep, report.createdAt, "Activo"])
    : [["Andrea López", "María Fernanda", "Validación inicial", "Reserva creada desde app pública", "Media", "Confirmar recepción", "Hoy 3:00 PM", "Activo"]];
  const adminEvidence = simulatedDataInjected
    ? simulatedOperationalEvidence.map((item) => [item.page, item.section, item.summary, `Evidencia simulada asociada al demoRunId ${demoRunIdShort}.`, item.status, "Abrir página"])
    : [
        ["Perfil Operacional", "Expediente del cliente", "Reserva vinculada", "Datos, comunicación y seguimiento quedan visibles para revisión.", reservationStatus.evidence === "Generada" ? "Visible" : "Pendiente", "Ver evidencia"],
        ["Registro de Seguimiento Comercial", "Seguimientos activos", "Tarea comercial creada", "La vendedora puede continuar el seguimiento desde su app.", "Pendiente", "Abrir página"],
        ["Mensajes entre el Equipo", "Coordinación interna", "Mensaje operativo registrado", "El equipo puede verificar coordinación posterior a la reserva.", "Pendiente", "Abrir página"],
      ];
  const derivedChanges = [
    { phase: "Fase 01", source: "Reservas", page: "Reserva pública", section: "Cliente, unidad, fuente y estado", change: `${simulatedReservationClients.length} reservas disponibles para seguimiento`, observation: "Clientes operacionales y unidades que originan el ciclo.", status: simulatedDataInjected ? "Verificado" : "Pendiente", targetId: "demo-reservation-live" },
    { phase: "Fase 02", source: "Marta Voz / Vapi", page: "Marta Multicanal", section: "Voz, llamadas y structured output", change: `${simulatedVapiCallLogs.length} logs de llamadas disponibles`, observation: "Intenciones, bloqueos, urgencia y casos que requieren intervención humana.", status: simulatedDataInjected ? "Generado" : "Pendiente", targetId: "demo-marta-vapi-voice" },
    { phase: "Fase 02", source: "Marta WhatsApp", page: "Marta Multicanal", section: "WhatsApp / Texto", change: `${simulatedMartaWhatsAppFollowups.length} seguimientos conversacionales`, observation: "Respuestas, intención detectada y siguiente acción por texto.", status: simulatedDataInjected ? "Generado" : "Pendiente", targetId: "demo-marta-whatsapp" },
    { phase: "Fase 03", source: "Vendedoras", page: "Registro de Seguimiento Comercial", section: "Reportes humanos posteriores", change: `${simulatedSellerReports.length} reportes con objeciones, prioridades y próximos pasos`, observation: "Seguimiento humano nacido desde clientes reservados.", status: simulatedDataInjected ? "Verificado" : "Pendiente", targetId: "demo-commercial-operations" },
    { phase: "Fase 03", source: "Mensajes entre el Equipo", page: "Mensajes entre el Equipo", section: "Coordinación interna", change: `${simulatedInternalMessages.length} mensajes operacionales generados`, observation: "Responsables, prioridades y coordinación posterior a la reserva.", status: simulatedDataInjected ? "Generado" : "Pendiente", targetId: "demo-operational-messaging" },
    { phase: "Fase 04", source: "Todas las fuentes", page: "Centro de Mando y Evidencia", section: "Trazabilidad administrativa", change: `${simulatedOperationalEvidence.length} evidencias agregadas a la corrida`, observation: "Reservas, reportes, mensajes, llamadas y seguimientos consolidados.", status: simulatedDataInjected ? "Verificado" : "Pendiente", targetId: "demo-command-evidence" },
    { phase: "Fase 05", source: "H-OperIA Intelligence", page: "Inteligencia Operativa", section: "Hallazgos prioritarios inyectados", change: `${simulatedIntelligenceSignals.length} hallazgos priorizados dentro del Admin`, observation: "La actividad operacional se interpreta como hallazgos verificables en páginas internas.", status: simulatedDataInjected ? "Generado" : "Pendiente", targetId: "demo-intelligence" },
    { phase: "Fase 06", source: "Síntesis ejecutiva", page: "Cierre Ejecutivo", section: "Consultas y conclusión", change: `${simulatedIntelligenceSignals.length} señales disponibles para lectura ejecutiva`, observation: "Las señales se convierten en criterios y una conclusión para junta.", status: simulatedDataInjected ? "Generado" : "Pendiente", targetId: "demo-executive-close" },
    { phase: "Auxiliar", source: "Información pública", page: "Inventario Demo", section: "Sección auxiliar técnica", change: "8 categorías de inventario previstas", observation: "Soporte reutilizable fuera de la ruta escénica principal.", status: "Visible", targetId: "demo-technical-inventory" },
  ];
  const injectionResults = [
    [String(simulatedReservationClients.length), "reservas/clientes simulados"],
    [String(simulatedInternalMessages.length), "mensajes internos equipo"],
    [String(simulatedSellerReports.length), "reportes vendedoras"],
    [String(simulatedVapiCallLogs.length), "logs Marta Voz / Vapi"],
    [String(simulatedMartaWhatsAppFollowups.length), "seguimientos Marta WhatsApp"],
    [String(simulatedIntelligenceSignals.length), "señales H-OperIA Intelligence"],
    [String(simulatedOperationalEvidence.length), "evidencias operacionales"],
  ];
  const breakdownItems = executiveBreakdown.split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 4);
  const addExecutiveQuestion = () => {
    const next = executiveQuery.trim();
    if (!next) return;
    setExecutiveQuestions((current) => current.includes(next) ? current : [...current, next]);
    setExecutiveQuery("");
  };
  const updateBreakdownItems = (items) => setExecutiveBreakdown(items.slice(0, 4).join("\n"));
  const acceptBreakdown = (item) => setSelectedBreakdowns((current) => current.includes(item) ? current : [...current, item]);
  const modifyBreakdown = (item, index) => {
    const modified = `${item} · enfoque ejecutivo ajustado`;
    updateBreakdownItems(breakdownItems.map((current, i) => i === index ? modified : current));
    setSelectedBreakdowns((current) => current.includes(modified) ? current : [...current.filter((value) => value !== item), modified]);
  };
  const removeBreakdown = (item) => {
    updateBreakdownItems(breakdownItems.filter((current) => current !== item));
    setSelectedBreakdowns((current) => current.filter((value) => value !== item));
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Centro Demo" subtitle="Tablero de mando escénico para ejecutar una demostración ejecutiva en vivo: reserva, mensajería, Marta, evidencia operacional, simulación e inteligencia." icon={Smartphone} sync={martaSync.demo} badges={["Operación viva", "Demo ejecutiva", "Evidencia de la Operación"]} syncNote="Mide el avance visible de la demostración: fases completadas, estados operacionales y señales generadas durante la presentación." />
      <Card>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <InfoCard title="Empresa Activa" value={activeDemoContext?.prospectCompanyName || "AMENA"} />
          <InfoCard title="Proyecto Activo" value={activeDemoContext?.projectName || "AMENA Comalapa"} />
          <InfoCard title="Escenario Activo" value={activeDemoContext?.scenarioName || "Centro Demo"} />
          <InfoCard title="Estado" value={activeDemoContext?.status || "Preparado"} />
          <InfoCard title="Última actualización" value={activeDemoContext?.injectedAt || "Pendiente de inyección"} />
        </div>
      </Card>
      <DemoScenarioRoute phases={phases} progress={progress} phaseStatus={phaseStatus} onPresentPhase={presentPhase} onCompletePhase={completePhase} />

      <div ref={(element) => { phaseSectionRefs.current[0] = element; }} className="grid scroll-mt-64 gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">Voluntarios de la sesión</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Personas registradas para recibir links y abrir las aplicaciones durante la demostración. No forman parte de la corrida simulada.</p></div><Badge tone="blue">{volunteers.length} voluntarios registrados</Badge></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[["name", "Nombre completo", "Ej. Andrea López"], ["role", "Cargo", "Ej. Gerente comercial"], ["company", "Empresa", "Ej. Proyecto Comalapa"], ["whatsapp", "WhatsApp", "+503 7000-0000"], ["email", "Email", "persona@empresa.com"]].map(([field, label, placeholder]) => <div key={field}><label className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-700">{label}</label><input value={volunteerForm[field]} onChange={(e) => setVolunteerForm((current) => ({ ...current, [field]: e.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none" placeholder={placeholder} /></div>)}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <button onClick={addVolunteer} className="rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white"><Users size={16} className="mr-2 inline" />Registrar voluntario</button>
            <button onClick={() => sendDemoLink("whatsapp")} disabled={visibleSendStatus.whatsappStatus === "Enviando"} className="rounded-2xl bg-emerald-600 px-4 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"><MessageCircle size={16} className="mr-2 inline" />Enviar link WhatsApp</button>
            <button onClick={() => sendDemoLink("email")} disabled={visibleSendStatus.emailStatus === "Enviando"} className="rounded-2xl bg-blue-600 px-4 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"><Mail size={16} className="mr-2 inline" />Enviar link email</button>
            <button onClick={finishVolunteer} className="rounded-2xl bg-slate-200 px-4 py-4 text-sm font-black text-slate-950">Guardar y limpiar formulario</button>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Evidencia operacional de envío</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Solicitud enviada al backend local. Esto confirma envío solicitado, no recepción final del destinatario.</p>
              </div>
              <Badge tone="violet">Marta acompaña · H-OperIA Intelligence analiza · humano decide</Badge>
            </div>
            <div className="mt-3 grid gap-2">
              {deliveryEvidence.length === 0 && <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">Sin envíos solicitados todavía.</div>}
              {deliveryEvidence.map((item) => (
                <div key={`${item.channel}-${item.time}-${item.recipient}`} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-black text-slate-950">{item.channel}</span>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">{item.time}</span>
                  </div>
                  <div className="mt-2 grid gap-1 md:grid-cols-3">
                    <div><span className="font-black text-slate-950">Endpoint:</span> {item.endpoint}</div>
                    <div><span className="font-black text-slate-950">Destinatario:</span> {item.recipient}</div>
                    <div><span className="font-black text-slate-950">Resultado:</span> {item.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {volunteers.map((item) => <button key={`${item.whatsapp}-${item.email}`} onClick={() => setSelectedPhone(item.whatsapp)} className={cls("rounded-2xl border p-4 text-left", selectedPhone === item.whatsapp ? "border-slate-950 bg-slate-100" : "border-slate-100 bg-slate-50")}><div className="font-black text-slate-950">{item.name || "Voluntario sin nombre"}</div><div className="mt-1 text-sm font-semibold text-slate-700">{item.role} · {item.company} · {item.whatsapp}</div><div className="mt-3 flex flex-wrap gap-2"><Badge tone={statusTone[item.whatsappStatus] || "slate"}>WhatsApp enviado: {item.whatsappStatus}</Badge><Badge tone={statusTone[item.emailStatus] || "slate"}>Email enviado: {item.emailStatus}</Badge><Badge tone={statusTone[item.reservationStarted] || "slate"}>Reserva iniciada: {item.reservationStarted}</Badge><Badge tone={statusTone[item.reservationCompleted] || "slate"}>Reserva completada: {item.reservationCompleted}</Badge></div></button>)}
          </div>
        </Card>
        <div id="demo-reservation-live" className="scroll-mt-64">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">FASE 01 Reserva en vivo y validación operacional</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">La reserva realizada en vivo crea el cliente operacional y selecciona la unidad que dará origen al resto del ciclo.</p></div><div className="flex flex-wrap gap-2"><Badge tone="slate">Reserva base preparada</Badge><Badge tone="blue">Preparado para Evidencia de la Operación</Badge></div></div>
          <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto_auto]"><input value={selectedPhone} onChange={(e) => setSelectedPhone(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none" placeholder="Buscar por teléfono" /><button onClick={validateReservation} className="rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white"><Database size={16} className="mr-2 inline" />Buscar reserva en Supabase</button><button className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"><ExternalLink size={16} className="mr-2 inline" />Abrir registro en Supabase</button></div>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-slate-600">Última actualización: hace 12 segundos</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <InfoCard title="Nombre del cliente" value={selectedVolunteer.name || "Sin registro"} />
            <InfoCard title="Teléfono" value={selectedVolunteer.whatsapp || selectedPhone} />
            <InfoCard title="Email" value={selectedVolunteer.email || "Pendiente"} />
            <InfoCard title="Tipo de propiedad" value="Apartamento" />
            <InfoCard title="Sector" value="Sector 01" />
            <InfoCard title="Torre / manzana" value="Torre 3" />
            <InfoCard title="Nivel / modelo" value="Nivel 7 · Modelo A" />
            <InfoCard title="Unidad / lote" value="A704" />
            <InfoCard title="Estado de reserva" value={reservationStatus.reservation} />
            <InfoCard title="Estado WhatsApp" value={reservationStatus.whatsapp} />
            <InfoCard title="Estado email" value={reservationStatus.email} />
            <InfoCard title="Evidencia de registro" value={reservationStatus.evidence} />
          </div>
          {simulatedDataInjected && (
            <div className="mt-5">
              <SimpleTable columns={["Cliente", "Fuente", "Unidad", "Estado reserva", "Creado"]} rows={simulatedReservationClients.slice(0, 5).map((client) => [client.name, client.source, client.unit, client.reservationStatus, client.createdAt])} />
            </div>
          )}
        </Card>
        </div>
      </div>

      <div id="demo-marta-vapi" ref={(element) => { phaseSectionRefs.current[1] = element; }} className="scroll-mt-64">
        <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">FASE 02 Marta · Acompañamiento Multicanal</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">La interacción real con Marta se registra como dato estructurado para evidencia, expediente, seguimiento e inteligencia.</p></div><Badge tone={statusTone[martaStatus] || "violet"}>{martaStatus}</Badge></div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="green">Activo · Voz / Vapi</Badge>
          <Badge tone="green">Activo · WhatsApp</Badge>
          <Badge tone="slate">Próximo · Email</Badge>
          <Badge tone="slate">Próximo · Widget Web</Badge>
          <Badge tone="slate">Próximo · Link posterior</Badge>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Transcripción:</span> “Quiero confirmar prima, fecha de entrega y documentos para avanzar.”</div><div className="rounded-2xl bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Structured output:</span> intención alta, duda financiera, documento pendiente, próxima acción: llamada humana.</div><div className="rounded-2xl bg-emerald-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Evidencia:</span> resumen de llamada y tarea de seguimiento.</div></div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={simulateMartaConversation} className="rounded-2xl bg-violet-600 px-5 py-4 text-sm font-black text-white"><Bot size={16} className="mr-2 inline" />Mostrar conversación con Marta</button>
          <button onClick={openVapi} className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"><PhoneCall size={16} className="mr-2 inline" />Abrir logs Vapi</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><Badge tone="green">Logs verificados</Badge></div>
        {simulatedDataInjected && (
          <div className="mt-5 space-y-4">
            <div id="demo-marta-vapi-voice" className="scroll-mt-64">
              <h4 className="mb-3 text-xl font-black text-slate-950">Marta Voz / Vapi</h4>
              <div className="grid gap-3 xl:grid-cols-2">
              {simulatedVapiCallLogs.slice(0, 2).map((log) => (
                <div key={log.id} className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone={log.callStatus === "completed" ? "green" : "amber"}>{log.assistantName} · {log.channel}</Badge>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-violet-900">{log.callId} · {log.durationSeconds}s</span>
                  </div>
                  <h4 className="mt-3 text-lg font-black text-slate-950">{log.clientName} · {log.detectedIntent}</h4>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><span className="font-black text-slate-950">Resumen llamada:</span> {log.transcriptSummary}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><span className="font-black text-slate-950">Datos verificados:</span> {log.verifiedData}</p>
                  <div className="mt-3 rounded-xl bg-white p-3 text-sm font-semibold leading-6 text-slate-800">
                    <div className="font-black text-slate-950">Structured output</div>
                    <div className="mt-1 grid gap-1 sm:grid-cols-2">
                      <span>Financiamiento: {log.structuredOutput.wantsFinancing ? "Si" : "No"}</span>
                      <span>Modelo: {log.structuredOutput.preferredModel}</span>
                      <span>Presupuesto: {log.structuredOutput.budgetRange}</span>
                      <span>Familia pendiente: {log.structuredOutput.familyDecisionPending ? "Si" : "No"}</span>
                      <span>Docs pendientes: {log.structuredOutput.documentsPending ? "Si" : "No"}</span>
                      <span>Urgencia: {log.structuredOutput.urgencyLevel}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2"><Badge tone={statusTone[log.structuredOutput.urgencyLevel] || "violet"}>{log.riskSignal}</Badge><Badge tone="blue">{log.nextStep}</Badge></div>
                </div>
              ))}
              </div>
            </div>
            <div id="demo-marta-whatsapp" className="scroll-mt-64">
              <h4 className="mb-3 text-xl font-black text-slate-950">Marta WhatsApp / Texto</h4>
              <div className="grid gap-3 xl:grid-cols-2">
              {simulatedMartaWhatsAppFollowups.slice(0, 2).map((followup) => (
                <div key={followup.id} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone={followup.status === "Simulado" ? "green" : "amber"}>{followup.channel}</Badge>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-900">{followup.createdAt}</span>
                  </div>
                  <h4 className="mt-3 text-lg font-black text-slate-950">{followup.clientName} · {followup.detectedIntent}</h4>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><span className="font-black text-slate-950">Marta:</span> {followup.messageText}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><span className="font-black text-slate-950">Respuesta cliente:</span> {followup.customerReply}</p>
                  <div className="mt-3 flex flex-wrap gap-2"><Badge tone="blue">{followup.nextStep}</Badge><Badge tone={followup.status === "Simulado" ? "green" : "amber"}>{followup.status}</Badge></div>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
        </Card>
      </div>

      <div ref={(element) => { phaseSectionRefs.current[2] = element; }} className="scroll-mt-64">
        <div id="demo-commercial-operations" className="scroll-mt-64">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">FASE 03 Registro de Seguimiento Comercial y Mensajes entre el Equipo</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Seguimiento comercial realizado en vivo desde clientes reservados: interacciones, objeciones, prioridades y próximos pasos.</p>
          <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
            <input value={commercialSearch} onChange={(e) => setCommercialSearch(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none" placeholder="Buscar por cliente o teléfono" />
            <button className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"><Search size={16} className="mr-2 inline" />Buscar informes de vendedora</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white"><ExternalLink size={16} className="mr-2 inline" />Abrir app vendedoras</button>
          </div>
          <div className="mt-5"><SimpleTable columns={["Cliente", "Vendedora", "Interacción", "Resumen", "Prioridad", "Próximo paso", "Fecha/hora", "Estado"]} rows={commercialRows} /></div>
        </Card>
        </div>
      </div>

      <div id="demo-command-evidence" ref={(element) => { phaseSectionRefs.current[3] = element; }} className="scroll-mt-64">
      <DemoCommandEvidencePanel
        demoContext={activeDemoContext}
        simulatedDataInjected={simulatedDataInjected}
        counts={{
          reservations: simulatedReservationClients.length,
          messages: simulatedInternalMessages.length,
          sellerReports: simulatedSellerReports.length,
          vapiLogs: simulatedVapiCallLogs.length,
          whatsappFollowups: simulatedMartaWhatsAppFollowups.length,
          evidence: simulatedOperationalEvidence.length,
        }}
        onInjectSimulatedData={injectSimulatedData}
      />
      </div>

      <div id="demo-intelligence" ref={(element) => { phaseSectionRefs.current[4] = element; }} className="grid scroll-mt-64 gap-5">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">FASE 05 H-OperIA Intelligence</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Índice escénico de hallazgos prioritarios que H-OperIA Intelligence interpreta después de la Empresa Demo y ubica dentro de páginas internas del Admin.</p>
            </div>
            <Badge tone={simulatedDataInjected ? "green" : "amber"}>{simulatedDataInjected ? "Demo activa" : "Sin demo activa"}</Badge>
          </div>
          {!simulatedDataInjected && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-base font-black text-amber-900">Esperando corrida simulada</div>}
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <InfoCard title="Empresa demo activa" value={activeDemoContext?.prospectCompanyName || "Sin demo activa"} detail="Contexto escénico posterior a FASE 04." />
            <InfoCard title="Proyecto demo activo" value={activeDemoContext?.projectName || "Proyecto Comalapa"} detail="Base operativa interpretada por H-OperIA Intelligence." />
            <InfoCard title="Estado de hallazgos" value={simulatedDataInjected ? "Pendiente de verificación" : "Pendiente de corrida"} detail="Los enlaces son simulados y no activan rutas reales." />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">Hallazgos prioritarios inyectados en Admin</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Cada hallazgo muestra dónde debe revisarse dentro del Admin, de qué fuente nace y qué verificación externa corresponde antes de tratarlo como hecho.</p>
            </div>
            <Badge tone={simulatedDataInjected ? "green" : "amber"}>{simulatedIntelligenceSignals.length} hallazgos</Badge>
          </div>
          <div className="mt-5 grid gap-4">
            {simulatedIntelligenceSignals.map((signal, index) => (
              <div key={signal.id} className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="dark">Hallazgo {index + 1}</Badge>
                      <Badge tone="blue">{demoAdminPageLabels[signal.adminTargetPage] || signal.adminTargetPage}</Badge>
                      <Badge tone={demoFindingSeverityTone[signal.severity] || "violet"}>{demoFindingSeverityLabels[signal.severity] || signal.severity}</Badge>
                    </div>
                    <h4 className="mt-3 text-xl font-black text-slate-950">{signal.adminTargetSection}</h4>
                  </div>
                  <Badge tone="amber">{demoVisibleStatusLabels[signal.visibleStatus] || signal.visibleStatus}</Badge>
                </div>
                <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Hallazgo detectado</div>
                    <p className="mt-2 text-base font-semibold leading-7 text-slate-800">{signal.summary}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Motivo de priorización</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{signal.operationalRecommendation}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Fuente del dato</div>
                    <p className="mt-2 text-base font-black text-slate-950">{demoFindingSourceLabels[signal.source] || signal.source}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Ver en Admin</div>
                    <button type="button" onClick={() => openAdminFinding(signal)} className="mt-2 inline-flex items-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                      <ExternalLink size={16} className="mr-2" />{demoAdminPageLabels[signal.adminTargetPage] || signal.adminTargetPage} -&gt; {signal.adminTargetSection}
                    </button>
                    {signal.associatedEvidence.length > 0 && (
                      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Evidencia asociada</div>
                        {signal.associatedEvidence.map((evidence) => (
                          <div key={evidence.id} className="mt-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm">
                            <Database size={15} className="mr-2 inline" />{evidence.label}
                          </div>
                        ))}
                      </div>
                    )}
                    {(signal.externalVerification || signal.supabaseTable) && (
                      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        {signal.externalVerification && (
                          <>
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Verificación externa</div>
                            <button type="button" onClick={(event) => event.preventDefault()} className="mt-2 inline-flex items-center rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm">
                              <ExternalLink size={15} className="mr-2" />{signal.externalVerification}
                            </button>
                          </>
                        )}
                        {signal.supabaseTable && (
                          <div className="mt-3">
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Tabla Supabase prevista</div>
                            <div className="mt-2 inline-flex items-center rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm">
                              <Database size={15} className="mr-2" />{signal.supabaseTable}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div id="demo-executive-close" ref={(element) => { phaseSectionRefs.current[5] = element; }} className="scroll-mt-64">
        <Card>
        <h3 className="text-3xl font-black text-slate-950">FASE 06 Cierre ejecutivo y próximos pasos</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-700">A continuación escriba su pregunta o sus preguntas, una por una. Al terminar cada pregunta presione Enter para agregarla al listado.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-base font-black leading-7 text-slate-900">Las reservas generan oportunidades. Las personas generan contexto. H-OperIA transforma ambas en decisiones ejecutables.</p>
        <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
          <input value={executiveQuery} onChange={(e) => setExecutiveQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addExecutiveQuestion(); }} className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold outline-none" placeholder="Escribir pregunta ejecutiva individual" />
          <button onClick={addExecutiveQuestion} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><Bot size={16} className="mr-2 inline" />Ingrese su pregunta individualmente</button>
        </div>
        <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-700">Preguntas ingresadas</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {executiveQuestions.map((query, index) => <span key={`${query}-${index}`} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm">{index + 1}. {query}</span>)}
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h4 className="text-xl font-black text-slate-950">Desglose propuesto por H-OperIA Intelligence</h4>
              <p className="mt-3 text-base font-semibold leading-8 text-slate-800">H-OperIA Intelligence descompone la pregunta ejecutiva para revisar ingresos, conversión, acompañamiento humano y riesgos operativos antes de generar una conclusión. Puede modificar, eliminar o aceptar cada desglose antes de enviarlo.</p>
            </div>
            <Badge tone={selectedBreakdowns.length ? "green" : "amber"}>{selectedBreakdowns.length} seleccionados</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {breakdownItems.map((item, index) => (
              <div key={item} className="rounded-2xl bg-white p-4">
                <div className="text-base font-black leading-7 text-slate-950">{index + 1}. {item}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => modifyBreakdown(item, index)} className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-900">Modificar</button>
                  <button onClick={() => removeBreakdown(item)} className="rounded-2xl bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">Eliminar</button>
                  <button onClick={() => acceptBreakdown(item)} className="rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">Aceptar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-5">
            <h4 className="text-xl font-black text-slate-950">Desgloses seleccionados para respuesta</h4>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Este es el conjunto final que se enviará para generar la respuesta ejecutiva.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedBreakdowns.map((item) => <span key={item} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">{item}</span>)}
            </div>
            <button onClick={() => setExecutiveResponseReady(true)} className="mt-4 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white">Enviar desgloses</button>
          </div>
          <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
              <h4 className="text-xl font-black text-slate-950">Respuestas generadas por H-OperIA Intelligence</h4>
              <Badge tone={executiveResponseReady ? "green" : "amber"}>{executiveResponseReady ? "Posterior al envío" : "Esperando desgloses"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Texto ejecutivo", "Cuadros comparativos", "Dashboard", "PDF descargable", "Imagen ejecutiva"].map((format) => <Badge key={format} tone="violet">{format}</Badge>)}
            </div>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-800">{executiveResponseReady ? "Resultado mock posterior al envío de desgloses: referidos concentra el mejor balance entre ingresos netos, conversión y menor atraso operativo. Instagram mantiene volumen, pero necesita filtro financiero temprano y seguimiento humano documentado. Para junta, la conclusión es reforzar referidos, ajustar pauta digital y pedir evidencia semanal por vendedora." : "Al enviar los desgloses seleccionados, H-OperIA Intelligence generará una conclusión ejecutiva en los formatos disponibles."}</p>
            <button className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><ClipboardCheck size={16} className="mr-2 inline" />Copiar conclusión para junta</button>
          </div>
        </div>
        </Card>
      </div>

      <div id="demo-technical-inventory" className="scroll-mt-64">
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Inventario Demo Reutilizable</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Sección auxiliar técnica para construir demos reutilizables a partir de información pública del proyecto.</p>
          </div>
          <Badge tone="slate">Sección auxiliar técnica</Badge>
        </div>
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <h4 className="text-xl font-black text-slate-950">Información prevista</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Proyectos", "Torres", "Manzanas", "Niveles", "Modelos", "Apartamentos / lotes", "Amenidades", "Precios y disponibilidad demo"].map((item) => <Badge key={item} tone="slate">{item}</Badge>)}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <h4 className="text-xl font-black text-slate-950">Fuentes previstas</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Sitio web del prospecto", "Redes sociales públicas", "Documentación pública", "Carga manual opcional"].map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
            </div>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}

function InfoCard({ title, value, detail = undefined }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{title}</div><div className="mt-2 text-base font-black text-slate-950">{value}</div>{detail && <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">{detail}</div>}</div>;
}

function KpiCard({ title, value, color }: { title: any; value: any; color: any; key?: React.Key }) {
  const colors = { green: "bg-emerald-100 text-emerald-800", amber: "bg-amber-100 text-amber-800", red: "bg-rose-100 text-rose-800", blue: "bg-blue-100 text-blue-800" };
  return <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{title}</div><div className={`mt-3 inline-flex rounded-full px-4 py-2 text-base font-black ${colors[color]}`}>{value}</div></div>;
}

function EvidenceCard({ title, value }: { title: any; value: any; key?: React.Key }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-lg font-black text-slate-950">{title}</div><div className="mt-3 rounded-full bg-emerald-100 px-4 py-2 text-base font-bold text-emerald-800 inline-flex">{value}</div></div>;
}

function TimelineBlock({ items }) {
  return <Card><h2 className="text-3xl font-black text-slate-950">Timeline Operacional Total</h2><p className="mt-2 text-base font-semibold text-slate-700">Historial unificado de comunicaciones, tickets, pagos, seguimientos y eventos operacionales.</p><div className="mt-6 space-y-4">{items.map((item) => <TimelineItem key={`${item.time}-${item.title}`} time={item.time} title={item.title} description={item.description} />)}</div></Card>;
}

function TimelineItem({ time, title, description }: { time: any; title: any; description: any; key?: React.Key }) {
  return <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"><div className="text-sm font-black text-slate-700 w-16">{time}</div><div><div className="text-lg font-black text-slate-950">{title}</div><div className="mt-1 text-base font-semibold text-slate-700 leading-7">{description}</div></div></div>;
}

function CommunicationsHub({ channels }) {
  return <Card><div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div><h2 className="text-3xl font-black text-slate-950">Comunicaciones Operacionales</h2><p className="mt-2 max-w-4xl text-base font-semibold text-slate-700 leading-7">Desde el perfil del cliente se pueden leer mensajes recibidos, revisar correos, enviar respuestas, usar plantillas, aprobar sugerencias asistidas y dejar evidencia automática en el timeline operacional.</p></div><div className="flex flex-wrap gap-2"><Badge tone="green">WhatsApp conectado</Badge><Badge tone="blue">Email conectado</Badge></div></div><div className="mt-6 grid gap-5 xl:grid-cols-2">{channels.map((channel) => <CommunicationChannel key={channel.channel} channel={channel.channel} badge={channel.badge} tone={channel.tone} inboxTitle={channel.inboxTitle} messages={channel.messages} actions={channel.actions} recommendation={channel.recommendation} />)}</div></Card>;
}

function CommunicationChannel({ channel, badge, tone, inboxTitle, messages, actions, recommendation }: { channel: any; badge: any; tone: any; inboxTitle: any; messages: any; actions: any; recommendation: any; key?: React.Key }) {
  const mainButton = tone === "green" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700";
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h3 className="text-2xl font-black text-slate-950">{channel}</h3><p className="mt-1 text-base font-semibold text-slate-700">Lectura, respuesta, envío y registro automático de evidencia.</p></div><Badge tone={tone}>{badge}</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-3"><button className={`rounded-2xl px-4 py-3 text-sm font-black text-white ${mainButton}`}>Leer recibidos</button><button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white hover:bg-slate-800">Enviar nuevo</button><button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white hover:bg-violet-700">Revisar propuesta asistida</button></div><div className="mt-5 rounded-2xl bg-white p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{inboxTitle}</div><div className="mt-4 space-y-3">{messages.map((message) => <div key={`${message.from}-${message.time}-${message.tag}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div className="font-black text-slate-950">{message.from}</div><div className="text-xs font-bold text-slate-600">{message.time}</div></div><p className="mt-2 text-base font-semibold leading-7 text-slate-700">{message.text}</p><div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">{message.tag}</div></div>)}</div></div><div className="mt-4 rounded-2xl bg-white p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">Acciones rápidas</div><div className="mt-3 flex flex-wrap gap-2">{actions.map((action) => <button key={action} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200">{action}</button>)}</div></div><div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Sugerencia asistida:</span> {recommendation}</div></div>;
}

function MartaProposalReviewCenter({ proposals }) {
  return <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm"><div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div><h2 className="text-3xl font-black text-slate-950">Bandeja de Respuestas Asistidas</h2><p className="mt-2 max-w-4xl text-base font-semibold text-slate-700 leading-7">Marta recibe conversaciones; H-OperIA Intelligence estructura sugerencias para que la vendedora revise, edite, apruebe y envíe.</p></div><div className="flex flex-wrap gap-2"><Badge tone="violet">4 propuestas pendientes</Badge><Badge tone="slate">Revisión humana requerida</Badge></div></div><div className="mt-6 grid gap-5 xl:grid-cols-3">{proposals.map((proposal) => <MartaProposalCard key={`${proposal.type}-${proposal.title}`} type={proposal.type} title={proposal.title} analysis={proposal.analysis} proposal={proposal.proposal} />)}</div></div>;
}

function MartaProposalCard({ type, title, analysis, proposal }: { type: any; title: any; analysis: any; proposal: any; key?: React.Key }) {
  return <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm"><div className="text-sm uppercase tracking-[0.22em] text-violet-600 font-black">{type}</div><h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3><div className="mt-4 rounded-2xl bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Lectura H-OperIA Intelligence:</span> {analysis}</div><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Propuesta:</span> {proposal}</div><div className="mt-5 flex flex-wrap gap-2"><button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white">Revisar</button><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-800">Editar</button><button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Aprobar</button></div></div>;
}

function TrackingBlock({ tracking }) {
  const [activeDetail, setActiveDetail] = useState<TrackingDetailKey>("compromisos");
  const current = tracking.details[activeDetail];

  return (
    <Card>
      <h2 className="text-3xl font-black text-slate-950">Seguimientos Operativos</h2>
      <p className="mt-2 max-w-5xl text-base font-semibold text-slate-700 leading-7">Mesa de control donde se cruzan compromisos adquiridos, pagos esperados, atrasos, justificaciones, notas de seguimiento, nuevos acuerdos, archivos asociados y responsable comercial.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {tracking.metrics.map((metric) => <MiniMetric key={metric.key} title={metric.title} value={metric.value} note={metric.note} onClick={() => setActiveDetail(metric.key)} active={activeDetail === metric.key} />)}
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-2xl font-black text-slate-950">{current.title}</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Esta sección se despliega al hacer clic en los resúmenes superiores para no saturar la página con todos los detalles desde el inicio.</p>
        <div className="mt-5">
          <SimpleTable columns={current.columns} rows={current.rows} />
        </div>
      </div>
      <div className="mt-6"><SimpleTable columns={tracking.historyColumns} rows={tracking.historyRows} /></div>
    </Card>
  );
}

function MiniMetric({ title, value, note, onClick, active = false }: { title: any; value: any; note: any; onClick: any; active?: boolean; key?: React.Key }) {
  const Wrapper = onClick ? "button" : "div";
  return <Wrapper onClick={onClick} className={cls("rounded-3xl border border-slate-100 bg-slate-50 p-5 text-left transition", onClick && "w-full cursor-pointer hover:shadow-md hover:-translate-y-0.5", active && "ring-4 ring-slate-950/10")}><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{title}</div><div className="mt-2 text-3xl font-black text-slate-950">{value}</div><div className="mt-1 text-base font-semibold text-slate-700">{note}</div>{onClick && <div className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Clic para ver detalles</div>}</Wrapper>;
}

function BitacoraItem({ title, text }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm uppercase tracking-[0.2em] text-slate-700 font-black">{title}</div><p className="mt-2 text-base font-semibold leading-7 text-slate-800">{text}</p></div>;
}

function PaymentBlock({ title, tone, rows }) {
  return <Card><div className="flex items-center justify-between gap-3"><h3 className="text-3xl font-black text-slate-950">{title}</h3><Badge tone={tone}>{rows.length} casos</Badge></div><div className="mt-5"><SimpleTable columns={["Cliente", "Unidad", "Monto", "Detalle", "Sugerencia IA"]} rows={rows} /></div></Card>;
}

function ServiceBlock({ title, rows }) {
  return <Card><h3 className="text-2xl font-black text-slate-950">{title}</h3><div className="mt-4"><SimpleTable columns={["Código", "Cliente/área", "Tema", "Riesgo", "Detalle operativo"]} rows={rows} /></div></Card>;
}

function FormItem({ title, fields }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-lg font-black text-slate-950"><ClipboardList size={18} />{title}</div><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Campos: {fields}</p></div>;
}

function CampaignCard({ title, result, diagnosis, action }) {
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><h4 className="text-xl font-black text-slate-950">{title}</h4><div className="mt-3"><Badge tone="amber">{result}</Badge></div><p className="mt-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Diagnóstico:</span> {diagnosis}</p><p className="mt-3 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Acción:</span> {action}</p></div>;
}

function DashboardMini({ title, text }) {
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><div className="flex items-center gap-2"><Layers3 size={20} className="text-slate-700" /><h4 className="text-xl font-black text-slate-950">{title}</h4></div><p className="mt-3 text-base font-semibold leading-7 text-slate-700">{text}</p></div>;
}

function DrillLayer({ title, children }) {
  return <div><p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">{title}</p><div className="flex flex-wrap gap-2">{children}</div></div>;
}

function DrillButton({ children, active, onClick }: { children: any; active: any; onClick: any; key?: React.Key }) {
  return <button onClick={onClick} className={cls("rounded-full px-4 py-2 text-sm font-black transition", active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900 hover:bg-slate-200")}>{children}</button>;
}

function StepCard({ number, title, text }) {
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">{number}</div><div><h4 className="text-xl font-black text-slate-950">{title}</h4><p className="mt-2 text-base font-semibold leading-7 text-slate-700">{text}</p></div></div></div>;
}

function VerificationCard({ icon: Icon, title, text }) {
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><div className="flex items-center gap-3"><div className="rounded-2xl bg-slate-950 p-3 text-white"><Icon size={20} /></div><h4 className="text-xl font-black text-slate-950">{title}</h4></div><p className="mt-3 text-base font-semibold leading-7 text-slate-700">{text}</p></div>;
}

function DemoInput({ label, placeholder }) {
  return <div><label className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-700">{label}</label><input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none" placeholder={placeholder} /></div>;
}

export default function DemoAmenaEnterpriseCommandCenter() {
  return <AppShell />;
}


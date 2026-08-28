import React, { useEffect, useMemo, useRef, useState } from "react";
import DemoCommandEvidencePanel from "./components/demo/DemoCommandEvidencePanel";
import DemoScenarioRoute from "./components/demo/DemoScenarioRoute";
import {
  getFindingsForAdminPage,
} from "./demo/bridge/demoFindingsBridge";
import { deriveDemoFindings } from "./demo/derivation/deriveDemoFindings";
import {
  buildOperationalCaseFromFinding,
  createMessagingBridgeId,
  isMessagingBridgeReady,
  isOperationalCaseAck,
  MESSAGING_BRIDGE_ACK,
  MESSAGING_OPERATIONAL_CASE_OPEN,
  OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION,
} from "./demo/bridge/operationalCaseMessagingBridge";
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
const LOCAL_PUBLIC_RESERVATION_APP_URL = "http://localhost:3001/";
const LOCAL_DEMO_BACKEND_URL = "http://localhost:4000";
const LOCAL_OPERATIONAL_MESSAGING_URL = "http://localhost:3002/";
const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};
const PUBLIC_RESERVATION_APP_URL =
  viteEnv.VITE_PUBLIC_RESERVATION_APP_URL?.trim() || LOCAL_PUBLIC_RESERVATION_APP_URL;
const DEMO_BACKEND_URL =
  viteEnv.VITE_DEMO_BACKEND_URL?.trim() || LOCAL_DEMO_BACKEND_URL;
const OPERATIONAL_MESSAGING_URL =
  viteEnv.VITE_OPERATIONAL_MESSAGING_URL?.trim() || LOCAL_OPERATIONAL_MESSAGING_URL;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
const isConfiguredFromEnv = (key) => Boolean(viteEnv[key]?.trim());
const parseUrlSafely = (value) => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};
const isPublicHttpsUrl = (value) => {
  const url = parseUrlSafely(value);
  return Boolean(url && url.protocol === "https:" && !LOCAL_HOSTNAMES.has(url.hostname));
};

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
const configuredPublicReservationOrigin =
  viteEnv.VITE_PUBLIC_RESERVATION_ORIGIN?.trim().replace(/\/$/, "") ||
  parseUrlSafely(PUBLIC_RESERVATION_APP_URL)?.origin ||
  "http://localhost:3001";
const configuredOperationalMessagingOrigin =
  viteEnv.VITE_OPERATIONAL_MESSAGING_ORIGIN?.trim().replace(/\/$/, "") ||
  parseUrlSafely(OPERATIONAL_MESSAGING_URL)?.origin ||
  "http://localhost:3002";
const ALLOWED_RESERVATION_SOURCE_APPLICATIONS = new Set([
  "hoperia_public_reservation_app",
  "amena_public_reservation_app",
]);

type DemoSession = {
  demoRunId: string;
  startedAt: string;
};

type ResidualDemoSession = {
  demoRunId: string;
  reason: string;
  blockedAt: string;
};

type DemoSessionStatus = "idle" | "preparing" | "active" | "blocked";
type DemoSessionIntent = "start" | "finalize";
type DemoParticipantStatus = "available" | "open" | "connecting" | "connected" | "not_integrated" | "future";

const demoParticipantDefaults: Record<string, DemoParticipantStatus> = {
  reservations: "available",
  marta: "not_integrated",
  sellers: "not_integrated",
  messaging: "not_integrated",
  ux: "future",
};

const demoParticipants = [
  { id: "reservations", name: "App Pública de Reservas", detail: "Bridge publicado disponible", status: "available" as const },
  { id: "marta", name: "Marta", detail: "Integración futura", status: "not_integrated" as const },
  { id: "sellers", name: "Registro de Seguimiento Comercial / Vendedoras", detail: "Integración futura", status: "not_integrated" as const },
  { id: "messaging", name: "Mensajería Operacional", detail: "Integración futura", status: "not_integrated" as const },
  { id: "ux", name: "Experiencia del Usuario / UX", detail: "Aplicación futura prevista", status: "future" as const },
];

type ReservationCompletedEvent = {
  type: "hoperia.reservation.completed";
  schemaVersion: "1.0";
  eventId: string;
  occurredAt: string;
  sourceApplication: "hoperia_public_reservation_app" | "amena_public_reservation_app";
  sourceOrigin: string;
  reservationId: string;
  reservationSessionId?: string;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dui?: string;
  };
  project: {
    name: string;
  };
  selectedUnit: {
    propertyType: string;
    sector?: string;
    towerOrBlock?: string;
    level?: string;
    model?: string;
    unitOrLot: string;
    sourceUnitId?: string;
  };
  sourceChannel: "public_web_app";
  reservationStatus: "completed";
  isDemo: true;
  demoRunId?: string;
  bridgeId?: string;
};

type LiveExpediente = {
  reservationId: string;
  expedienteId: string;
  status: "initial";
  eventId: string;
  receivedAt: string;
  sourceApplication: ReservationCompletedEvent["sourceApplication"];
  sourceOrigin: string;
  client: ReservationCompletedEvent["client"];
  project: ReservationCompletedEvent["project"];
  selectedUnit: ReservationCompletedEvent["selectedUnit"];
  sourceChannel: "public_web_app";
  isDemo: true;
  demoRunId: string;
  persisted: false;
};

type LiveExpedienteCollection = {
  demoRunId: string;
  expedientes: LiveExpediente[];
  selectedReservationId: string | null;
};

type AdminLiveDemoResetRequest = {
  type: "hoperia.demo.live.reset";
  schemaVersion: "1.0";
  resetId: string;
  requestedAt: string;
  sourceApplication: "hoperia_admin_demo";
  demoRunId: string;
  bridgeId: string;
};

type ReservationReplayRequest = {
  type: "hoperia.reservation.replay.request";
  schemaVersion: "1.0";
  requestId: string;
  requestedAt: string;
  sourceApplication: "hoperia_admin_demo";
  demoRunId: string;
  bridgeId?: string;
};

type AdminBridgeReadyMessage = {
  type: "hoperia.admin.bridge.ready";
  schemaVersion: "1.0";
  bridgeId: string;
  mode: "integrated";
  demoRunId: string;
  issuedAt: string;
  sourceApplication: "hoperia_admin_demo";
};

type PublicBridgeAckMessage = {
  type: "hoperia.public.bridge.ack";
  schemaVersion: "1.0";
  bridgeId: string;
  acknowledgedAt: string;
  sourceApplication: ReservationCompletedEvent["sourceApplication"];
  mode: "integrated";
  demoRunId: string;
};

type PublicLiveDemoResetAck = {
  type: "hoperia.demo.live.reset.ack";
  schemaVersion: "1.0";
  resetId: string;
  acknowledgedAt: string;
  sourceApplication: ReservationCompletedEvent["sourceApplication"];
  demoRunId: string;
  bridgeId: string;
  status: "reset_complete";
};

type LiveDemoResetStatus = "idle" | "requesting" | "completed" | "timeout" | "error";

type LiveDemoResetNotice = {
  title: string;
  detail: string;
};

type AdminClient = {
  name: string;
  reservation_id: string;
  expediente_id?: string;
  unit: string;
  status: string;
  seller: string;
  liveExpediente?: LiveExpediente;
};

type ReceptionNotice = {
  kind: "accepted" | "rejected";
  title: string;
  detail: string;
  reservationId?: string;
  expedienteId?: string;
};

const activeDemoSessionStorageKey = "hoperia.admin.active_demo_session.v1";
const residualDemoSessionStorageKey = "hoperia.admin.residual_demo_session.v1";
const legacyLiveExpedienteStorageKey = "hoperia.admin.live_expediente.v1";
const legacyLiveExpedienteStorageKeyForRun = (demoRunId: string) => `${legacyLiveExpedienteStorageKey}.${encodeURIComponent(demoRunId)}`;
const liveExpedientesStorageKey = "hoperia.admin.live_expedientes.v2";
const liveExpedientesStorageKeyForRun = (demoRunId: string) => `${liveExpedientesStorageKey}.${encodeURIComponent(demoRunId)}`;

const readStoredResidualDemoSession = (): ResidualDemoSession | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(residualDemoSessionStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ResidualDemoSession>;
    return typeof parsed.demoRunId === "string" && parsed.demoRunId.trim() &&
      typeof parsed.reason === "string" && parsed.reason.trim() &&
      typeof parsed.blockedAt === "string" && parsed.blockedAt.trim()
      ? { demoRunId: parsed.demoRunId, reason: parsed.reason, blockedAt: parsed.blockedAt }
      : null;
  } catch {
    return null;
  }
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
    summary: "Cliente con alta intención de compra. H - OperIA Intelligence detectó sensibilidad financiera moderada y sugiere intervención humana hoy mismo, asociando la llamada, la simulación bancaria y los compromisos al expediente operativo. La conversación debe confirmar monto, resolver dudas de crédito y dejar evidencia en el timeline.",
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
    { title: "Seguimiento Comercial de Vendedoras", value: "Pipeline actualizado" },
  ],
  timeline: [
    { time: "10:04", title: "Reserva recibida desde Reservas del proyecto", description: "El Centro de Mando crea el expediente operacional vivo." },
    { time: "10:05", title: "WhatsApp enviado", description: "Confirmación de reserva y próximos pasos." },
    { time: "10:06", title: "Email enviado", description: "PDF, brochure y documentos asociados." },
    { time: "10:08", title: "H - OperIA Intelligence analiza señales", description: "Riesgo financiero moderado detectado." },
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
      recommendation: "H - OperIA Intelligence sugiere una respuesta tranquila; la vendedora revisa tono, monto pendiente y destinatarios antes de enviar.",
    },
    {
      channel: "Email Operacional",
      badge: "PDF abierto",
      tone: "blue",
      inboxTitle: "Últimos correos y actividad",
      messages: [
        { from: "H - OperIA", time: "10:06 AM", text: "Correo de confirmación enviado con brochure, condiciones y datos de contacto.", tag: "Enviado" },
        { from: "Carlos Méndez", time: "10:18 AM", text: "El cliente abrió el PDF de condiciones y descargó el brochure del proyecto.", tag: "Apertura detectada" },
      ],
      actions: ["Enviar resumen financiero", "Enviar PDF de garantías", "Enviar avance de construcción"],
      recommendation: "H - OperIA Intelligence sugiere preparar un correo ejecutivo con simulación, garantías y próximos pasos antes de la llamada humana.",
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

function TopNav({ active, setActive, onStartDemoSession }) {
  return (
    <div className="hoperia-admin-topnav">
      <div className="hoperia-admin-topnav-row">
        <div className="hoperia-admin-brand">
          <div className="hoperia-admin-brand-dots" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="hoperia-admin-brand-copy">
            <p className="hoperia-admin-brand-name">Suite H - OperIA</p>
            <p className="hoperia-admin-brand-slogan">Humanización de las operaciones con inteligencia artificial.</p>
            <p className="hoperia-admin-brand-tagline">H - OperIA Inmobiliaria</p>
            <h2 className="hoperia-admin-module-title">Centro de Mando</h2>
          </div>
        </div>
        <div className="hoperia-admin-actions">
          <Badge tone="dark">Integración demostrativa: {martaSync[active]}%</Badge>
          <button onClick={onStartDemoSession} className="hoperia-admin-demo-button">
            <Smartphone size={16} className="mr-2 inline" />Iniciar nueva demostración
          </button>
        </div>
      </div>
      <div className="hoperia-admin-nav-list">
        {menu.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cls(
              "hoperia-admin-nav-button",
              active === id && "hoperia-admin-nav-button--active"
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
            <p className="text-base font-black tracking-[0.35em] text-amber-600">Suite H - OperIA</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">Humanización de las operaciones con inteligencia artificial.</p>
            <p className="mt-1 text-lg font-black text-slate-900">H - OperIA Inmobiliaria</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">{title}</h1>
            <p className="mt-3 max-w-5xl text-lg font-semibold leading-8 text-slate-800">{subtitle}</p>
          </div>
        </div>
        <div className="min-w-0 rounded-3xl bg-slate-50 p-5 border border-slate-100 xl:min-w-[310px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-black text-slate-950">Nivel de Integración Operacional · Demo</span>
            <span className="text-3xl font-black text-emerald-500">{sync}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-emerald-300" style={{ width: `${sync}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {syncNote || "Indicador demostrativo de conexión escénica entre señales operativas, criterio humano y lectura asistida. No representa medición productiva ni persistencia real."}
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

function AiObservation({ title = "Observaciones estratégicas de H - OperIA Intelligence", children }) {
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

const intelligenceActionTextClass = "font-black text-violet-800";

const formatDemoFindingResponsible = (finding) =>
  [
    finding?.responsiblePerson,
    finding?.responsibleRole,
    finding?.responsibleArea,
  ].filter(Boolean).join(" · ");

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
  const [demoFindings, setDemoFindings] = useState([]);
  const [demoContext, setDemoContext] = useState(null);
  const [demoCommandEvidenceState, setDemoCommandEvidenceState] = useState(null);
  const [residualDemoSession, setResidualDemoSession] = useState<ResidualDemoSession | null>(() => readStoredResidualDemoSession());
  const [activeDemoSession, setActiveDemoSession] = useState<DemoSession | null>(() => {
    if (residualDemoSession) {
      window.localStorage.removeItem(activeDemoSessionStorageKey);
      return null;
    }
    try {
      const raw = window.localStorage.getItem(activeDemoSessionStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<DemoSession>;
      return typeof parsed.demoRunId === "string" && parsed.demoRunId.trim() && typeof parsed.startedAt === "string" && parsed.startedAt.trim()
        ? { demoRunId: parsed.demoRunId, startedAt: parsed.startedAt }
        : null;
    } catch { return null; }
  });
  const [demoSessionStatus, setDemoSessionStatus] = useState<DemoSessionStatus>(() => residualDemoSession ? "blocked" : "idle");
  const [demoSessionNotice, setDemoSessionNotice] = useState<string | null>(() => residualDemoSession?.reason || null);
  const [demoSessionResetToken, setDemoSessionResetToken] = useState(0);
  const [demoParticipantStatuses, setDemoParticipantStatuses] = useState(demoParticipantDefaults);
  const [liveExpedientes, setLiveExpedientes] = useState<LiveExpediente[]>([]);
  const [selectedLiveExpedienteReservationId, setSelectedLiveExpedienteReservationId] = useState<string | null>(null);
  const [autoSelectReservationId, setAutoSelectReservationId] = useState<string | null>(null);
  const [receptionNotice, setReceptionNotice] = useState<ReceptionNotice | null>(null);
  const [publicReservationWindowNotice, setPublicReservationWindowNotice] = useState<string | null>(null);
  const [liveDemoResetStatus, setLiveDemoResetStatus] = useState<LiveDemoResetStatus>("idle");
  const [liveDemoResetNotice, setLiveDemoResetNotice] = useState<LiveDemoResetNotice | null>(null);
  const [liveDemoResetToken, setLiveDemoResetToken] = useState(0);
  const publicReservationWindowRef = useRef<Window | null>(null);
  const operationalMessagingWindowRef = useRef<Window | null>(null);
  const operationalMessagingBridgeRef = useRef<{ bridgeId: string; demoRunId: string; operationalCase: ReturnType<typeof buildOperationalCaseFromFinding> } | null>(null);
  const [operationalMessagingNotice, setOperationalMessagingNotice] = useState<string | null>(null);
  const publicReservationBridgeIdRef = useRef<string | null>(null);
  const publicReservationBridgeSourceRef = useRef<MessageEventSource | null>(null);
  const activeDemoSessionRef = useRef<DemoSession | null>(activeDemoSession);
  const liveExpedientesRef = useRef<LiveExpediente[]>([]);
  const selectedLiveExpedienteReservationIdRef = useRef<string | null>(null);
  const processedEventIds = useRef(new Set<string>());
  const expedienteIdByReservationId = useRef(new Map<string, string>());
  const pendingResetIdRef = useRef<string | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const pendingReplayRequestIdRef = useRef<string | null>(null);
  const replayTimeoutRef = useRef<number | null>(null);
  const pendingDemoSessionIntentRef = useRef<DemoSessionIntent | null>(null);
  const pendingReservationResetAfterBridgeRef = useRef<DemoSessionIntent | null>(null);
  const pendingDemoRunIdRef = useRef<string | null>(null);
  const pendingReplayAfterBridgeRef = useRef<{ reservationWindow: Window; detail: string } | null>(null);
  const bridgeTimeoutRef = useRef<number | null>(null);
  const bridgeRetryIntervalRef = useRef<number | null>(null);
  const bridgeRetryTimeoutsRef = useRef<number[]>([]);
  const [reservationReplayNotice, setReservationReplayNotice] = useState<LiveDemoResetNotice | null>(null);
  const [reservationReplayStatus, setReservationReplayStatus] = useState<"idle" | "requesting" | "received" | "empty" | "error">("idle");
  const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;
  const selectedLiveExpediente = liveExpedientes.find(
    (expediente) => expediente.reservationId === selectedLiveExpedienteReservationId,
  ) || null;

  useEffect(() => {
    activeDemoSessionRef.current = activeDemoSession;
  }, [activeDemoSession]);

  const openOperationalCaseInMessaging = (finding) => {
    const activeSession = activeDemoSessionRef.current;
    if (!activeSession || !finding?.demoRunId || finding.demoRunId !== activeSession.demoRunId) {
      setOperationalMessagingNotice("El hallazgo no pertenece a una corrida demo integrada activa.");
      return;
    }
    const operationalCase = buildOperationalCaseFromFinding(finding, new Date().toISOString());
    const existingBridge = operationalMessagingBridgeRef.current;
    const existingMessagingWindow = operationalMessagingWindowRef.current;
    if (
      existingBridge &&
      existingMessagingWindow &&
      !existingMessagingWindow.closed &&
      existingBridge.demoRunId === activeSession.demoRunId &&
      existingBridge.operationalCase.operationalCaseId === operationalCase.operationalCaseId
    ) {
      existingMessagingWindow.focus();
      setOperationalMessagingNotice("El caso operacional ya está abierto en Mensajería.");
      return;
    }
    const bridgeId = createMessagingBridgeId();
    const messagingUrl = parseUrlSafely(OPERATIONAL_MESSAGING_URL);
    if (!messagingUrl) {
      setOperationalMessagingNotice("La URL de Mensajería Operacional no es válida.");
      return;
    }
    messagingUrl.searchParams.set("hoperiaMessagingBridgeId", bridgeId);
    messagingUrl.searchParams.set("hoperiaDemoRunId", activeSession.demoRunId);
    const messagingWindow = window.open(messagingUrl.toString(), "hoperia-operational-messaging");
    if (!messagingWindow) {
      setOperationalMessagingNotice("El navegador bloqueó la apertura de Mensajería Operacional.");
      return;
    }
    operationalMessagingWindowRef.current = messagingWindow;
    operationalMessagingBridgeRef.current = { bridgeId, demoRunId: activeSession.demoRunId, operationalCase };
    messagingWindow.focus();
    setOperationalMessagingNotice("Conectando el caso operacional con Mensajería.");
  };

  useEffect(() => {
    const handleOperationalMessagingMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== configuredOperationalMessagingOrigin || event.source !== operationalMessagingWindowRef.current) return;
      const bridge = operationalMessagingBridgeRef.current;
      if (!bridge) return;
      if (isMessagingBridgeReady(event.data)) {
        if (event.data.bridgeId !== bridge.bridgeId || event.data.demoRunId !== bridge.demoRunId) return;
        (event.source as Window).postMessage({
          type: MESSAGING_BRIDGE_ACK,
          schemaVersion: OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION,
          demoRunId: bridge.demoRunId,
          bridgeId: bridge.bridgeId,
          accepted: true,
        }, configuredOperationalMessagingOrigin);
        (event.source as Window).postMessage({
          type: MESSAGING_OPERATIONAL_CASE_OPEN,
          schemaVersion: OPERATIONAL_CASE_MESSAGING_SCHEMA_VERSION,
          demoRunId: bridge.demoRunId,
          bridgeId: bridge.bridgeId,
          payload: bridge.operationalCase,
        }, configuredOperationalMessagingOrigin);
        return;
      }
      if (!isOperationalCaseAck(event.data)) return;
      if (event.data.bridgeId !== bridge.bridgeId || event.data.demoRunId !== bridge.demoRunId || event.data.operationalCaseId !== bridge.operationalCase.operationalCaseId || event.data.findingId !== bridge.operationalCase.findingId) return;
      setOperationalMessagingNotice(event.data.accepted ? "Caso operacional abierto en Mensajería · demo integrada no persistida." : `Mensajería rechazó el caso: ${event.data.reason || "contrato inválido"}.`);
    };
    window.addEventListener("message", handleOperationalMessagingMessage);
    return () => window.removeEventListener("message", handleOperationalMessagingMessage);
  }, [configuredOperationalMessagingOrigin]);

  const isReservationCompletedEvent = (value: unknown): value is ReservationCompletedEvent => {
    if (!value || typeof value !== "object") return false;
    const data = value as Partial<ReservationCompletedEvent>;
    const client = data.client as ReservationCompletedEvent["client"] | undefined;
    const project = data.project as ReservationCompletedEvent["project"] | undefined;
    const selectedUnit = data.selectedUnit as ReservationCompletedEvent["selectedUnit"] | undefined;

    return data.type === "hoperia.reservation.completed" &&
      data.schemaVersion === "1.0" &&
      ALLOWED_RESERVATION_SOURCE_APPLICATIONS.has(data.sourceApplication || "") &&
      isNonEmptyString(data.sourceOrigin) &&
      data.reservationStatus === "completed" &&
      data.isDemo === true &&
      data.sourceChannel === "public_web_app" &&
      isNonEmptyString(data.eventId) &&
      isNonEmptyString(data.reservationId) &&
      isNonEmptyString(data.occurredAt) &&
      isNonEmptyString(client?.firstName) &&
      isNonEmptyString(client?.lastName) &&
      isNonEmptyString(client?.email) &&
      isNonEmptyString(client?.phone) &&
      isNonEmptyString(project?.name) &&
      isNonEmptyString(selectedUnit?.propertyType) &&
      isNonEmptyString(selectedUnit?.unitOrLot);
  };

  const isLiveExpediente = (value: unknown): value is LiveExpediente => {
    if (!value || typeof value !== "object") return false;
    const data = value as Partial<LiveExpediente>;
    const client = data.client as LiveExpediente["client"] | undefined;
    const project = data.project as LiveExpediente["project"] | undefined;
    const selectedUnit = data.selectedUnit as LiveExpediente["selectedUnit"] | undefined;

    return isNonEmptyString(data.reservationId) &&
      isNonEmptyString(data.expedienteId) &&
      data.status === "initial" &&
      isNonEmptyString(data.eventId) &&
      isNonEmptyString(data.receivedAt) &&
      ALLOWED_RESERVATION_SOURCE_APPLICATIONS.has(data.sourceApplication || "") &&
      isNonEmptyString(data.sourceOrigin) &&
      data.sourceChannel === "public_web_app" &&
      data.isDemo === true &&
      data.persisted === false &&
      isNonEmptyString(data.demoRunId) &&
      isNonEmptyString(client?.firstName) &&
      isNonEmptyString(client?.lastName) &&
      isNonEmptyString(client?.email) &&
      isNonEmptyString(client?.phone) &&
      isNonEmptyString(project?.name) &&
      isNonEmptyString(selectedUnit?.propertyType) &&
      isNonEmptyString(selectedUnit?.unitOrLot);
  };

  const isLiveExpedienteCollection = (value: unknown, demoRunId: string): value is LiveExpedienteCollection => {
    if (!value || typeof value !== "object") return false;
    const data = value as Partial<LiveExpedienteCollection>;
    return data.demoRunId === demoRunId &&
      Array.isArray(data.expedientes) &&
      data.expedientes.every((expediente) => isLiveExpediente(expediente) && expediente.demoRunId === demoRunId) &&
      (data.selectedReservationId === null ||
        (isNonEmptyString(data.selectedReservationId) && data.expedientes.some((expediente) => expediente.reservationId === data.selectedReservationId)));
  };

  const storeLiveExpedienteCollection = (demoRunId: string, expedientes: LiveExpediente[], selectedReservationId: string | null) => {
    window.localStorage.setItem(liveExpedientesStorageKeyForRun(demoRunId), JSON.stringify({
      demoRunId,
      expedientes,
      selectedReservationId,
    }));
    window.localStorage.removeItem(legacyLiveExpedienteStorageKeyForRun(demoRunId));
  };

  const updateLiveExpedienteCollection = (expedientes: LiveExpediente[], selectedReservationId: string | null, demoRunId?: string) => {
    liveExpedientesRef.current = expedientes;
    selectedLiveExpedienteReservationIdRef.current = selectedReservationId;
    setLiveExpedientes(expedientes);
    setSelectedLiveExpedienteReservationId(selectedReservationId);
    if (demoRunId) storeLiveExpedienteCollection(demoRunId, expedientes, selectedReservationId);
  };

  const selectLiveExpediente = (reservationId: string) => {
    const selected = liveExpedientesRef.current.find((expediente) => expediente.reservationId === reservationId);
    const demoRunId = activeDemoSessionRef.current?.demoRunId;
    if (!selected || !demoRunId || selected.demoRunId !== demoRunId) return;
    updateLiveExpedienteCollection(liveExpedientesRef.current, reservationId, demoRunId);
    setAutoSelectReservationId(reservationId);
  };

  const clearStoredLiveExpedientes = (demoRunId?: string) => {
    if (!demoRunId) return;
    window.localStorage.removeItem(liveExpedientesStorageKeyForRun(demoRunId));
    window.localStorage.removeItem(legacyLiveExpedienteStorageKeyForRun(demoRunId));
  };

  const createReplayRequestId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `replay-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  };
  const createBridgeId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `bridge-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  };

  const isPublicBridgeAckMessage = (value: unknown): value is PublicBridgeAckMessage => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const data = value as Partial<PublicBridgeAckMessage>;

    return data.type === "hoperia.public.bridge.ack" &&
      data.schemaVersion === "1.0" &&
      isNonEmptyString(data.bridgeId) &&
      isNonEmptyString(data.acknowledgedAt) &&
      data.mode === "integrated" &&
      isNonEmptyString(data.demoRunId) &&
      ALLOWED_RESERVATION_SOURCE_APPLICATIONS.has(data.sourceApplication || "");
  };

  const sendPublicReservationBridge = (reservationWindow: Window, bridgeId: string, demoRunId: string) => {
    const bridgeMessage: AdminBridgeReadyMessage = {
      type: "hoperia.admin.bridge.ready",
      schemaVersion: "1.0",
      bridgeId,
      mode: "integrated",
      demoRunId,
      issuedAt: new Date().toISOString(),
      sourceApplication: "hoperia_admin_demo",
    };

    reservationWindow.postMessage(bridgeMessage, configuredPublicReservationOrigin);
  };

  const preparePublicReservationBridge = (reservationWindow: Window, demoRunId: string) => {
    clearBridgeTimeout();
    clearBridgeRetryInterval();
    clearBridgeRetryTimeouts();
    const bridgeId = createBridgeId();
    publicReservationBridgeIdRef.current = bridgeId;
    publicReservationBridgeSourceRef.current = null;
    setDemoParticipantStatuses((current) => ({ ...current, reservations: "connecting" }));
    sendPublicReservationBridge(reservationWindow, bridgeId, demoRunId);
    bridgeRetryIntervalRef.current = window.setInterval(() => {
      if (
        publicReservationBridgeIdRef.current !== bridgeId ||
        publicReservationWindowRef.current !== reservationWindow ||
        publicReservationBridgeSourceRef.current ||
        reservationWindow.closed
      ) {
        clearBridgeRetryInterval();
        return;
      }
      sendPublicReservationBridge(reservationWindow, bridgeId, demoRunId);
    }, 600);
    bridgeTimeoutRef.current = window.setTimeout(() => {
      if (
        publicReservationBridgeIdRef.current !== bridgeId ||
        publicReservationBridgeSourceRef.current
      ) return;
      clearBridgeRetryInterval();
      bridgeTimeoutRef.current = null;
      setDemoParticipantStatuses((current) => ({ ...current, reservations: "open" }));
      const pendingReplay = pendingReplayAfterBridgeRef.current;
      pendingReplayAfterBridgeRef.current = null;
      if (pendingReplay) {
        pendingReplayRequestIdRef.current = null;
        setReservationReplayStatus("error");
        setReservationReplayNotice({ title: "No fue posible conectar Ruta 2", detail: "El replay no se envió porque la sesión integrada no confirmó el bridge." });
      } else {
        setPublicReservationWindowNotice("Ruta 2 está abierta, pero no confirmó el bridge integrado. La reserva permanece standalone hasta completar la conexión.");
      }
    }, 10000);
  };

  const isExpectedReservationSource = (event: MessageEvent<unknown>, bridgeId?: string) => (
    (
      event.source !== null &&
      publicReservationWindowRef.current !== null &&
      event.source === publicReservationWindowRef.current
    ) ||
    (
      Boolean(bridgeId) &&
      bridgeId === publicReservationBridgeIdRef.current &&
      event.source !== null &&
      event.source === publicReservationBridgeSourceRef.current
    )
  );
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

  const openPublicReservation = () => {
    if (!activeDemoSession) {
      const standaloneWindow = window.open(PUBLIC_RESERVATION_APP_URL, "hoperia-public-reservation");
      if (standaloneWindow) {
        publicReservationWindowRef.current = standaloneWindow;
        setDemoParticipantStatuses((current) => ({ ...current, reservations: "open" }));
        setPublicReservationWindowNotice("App Pública Ruta 2 abierta en modo standalone. Su evidencia no alimentará Centro Demo.");
        standaloneWindow.focus();
      } else {
        setPublicReservationWindowNotice("No se pudo abrir la App Pública. El navegador pudo bloquear la ventana; permite ventanas emergentes y reintenta.");
      }
      return;
    }
    const demoRunId = activeDemoSession.demoRunId;
    if (publicReservationWindowRef.current && !publicReservationWindowRef.current.closed) {
      preparePublicReservationBridge(publicReservationWindowRef.current, demoRunId);
      publicReservationWindowRef.current.focus();
      setPublicReservationWindowNotice("App Pública Ruta 2 enfocada. Completa y confirma la reserva para transmitirla.");
      return;
    }

    const reservationWindow = window.open(PUBLIC_RESERVATION_APP_URL, "hoperia-public-reservation");
    if (!reservationWindow) {
      publicReservationWindowRef.current = null;
      setPublicReservationWindowNotice("No se pudo abrir la App Pública. El navegador pudo bloquear la ventana; permite ventanas emergentes y reintenta.");
      return;
    }

    publicReservationWindowRef.current = reservationWindow;
    preparePublicReservationBridge(reservationWindow, demoRunId);
    setDemoParticipantStatuses((current) => ({ ...current, reservations: "connecting" }));
    reservationWindow.focus();
    setPublicReservationWindowNotice("App Pública Ruta 2 abierta en una ventana separada. Completa y confirma la reserva para transmitirla.");
  };

  const clearResetTimeout = () => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  };

  const clearReplayTimeout = () => {
    if (replayTimeoutRef.current !== null) {
      window.clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }
  };

  const clearBridgeTimeout = () => {
    if (bridgeTimeoutRef.current !== null) {
      window.clearTimeout(bridgeTimeoutRef.current);
      bridgeTimeoutRef.current = null;
    }
  };

  const clearBridgeRetryInterval = () => {
    if (bridgeRetryIntervalRef.current !== null) {
      window.clearInterval(bridgeRetryIntervalRef.current);
      bridgeRetryIntervalRef.current = null;
    }
  };

  const clearBridgeRetryTimeouts = () => {
    bridgeRetryTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    bridgeRetryTimeoutsRef.current = [];
  };

  const postReservationReplayRequest = (reservationWindow: Window, detail: string) => {
    const demoRunId = activeDemoSessionRef.current?.demoRunId;
    if (!demoRunId || !publicReservationBridgeIdRef.current || !publicReservationBridgeSourceRef.current) return;
    reservationWindow.focus();
    clearReplayTimeout();
    const requestId = createReplayRequestId();
    const replayRequest: ReservationReplayRequest = {
      type: "hoperia.reservation.replay.request",
      schemaVersion: "1.0",
      requestId,
      requestedAt: new Date().toISOString(),
      sourceApplication: "hoperia_admin_demo",
      demoRunId,
      ...(publicReservationBridgeIdRef.current ? { bridgeId: publicReservationBridgeIdRef.current } : {}),
    };

    pendingReplayRequestIdRef.current = requestId;
    setReservationReplayStatus("requesting");
    setReservationReplayNotice({ title: "Recuperación solicitada", detail });

    const postReplayRequest = () => {
      reservationWindow.postMessage(replayRequest, configuredPublicReservationOrigin);
    };

    try {
      postReplayRequest();
      window.setTimeout(() => {
        if (pendingReplayRequestIdRef.current === requestId && !reservationWindow.closed) {
          postReplayRequest();
        }
      }, 700);
    } catch (error) {
      pendingReplayRequestIdRef.current = null;
      setReservationReplayStatus("error");
      setReservationReplayNotice({
        title: "No fue posible solicitar replay",
        detail: error instanceof Error ? error.message : "Error local al solicitar la última reserva demo.",
      });
      return;
    }

    replayTimeoutRef.current = window.setTimeout(() => {
      if (pendingReplayRequestIdRef.current !== requestId) return;
      pendingReplayRequestIdRef.current = null;
      replayTimeoutRef.current = null;
      setReservationReplayStatus("empty");
      setReservationReplayNotice({
        title: "Sin reserva recuperable",
        detail: "Ruta 2 no respondió con una reserva demo almacenada. Completa una reserva o verifica que la ventana pública siga abierta.",
      });
    }, 5000);
  };

  const sendReservationReplayRequest = (detail = "Solicitando a Ruta 2 la última reserva demo disponible.") => {
    const reservationWindow = publicReservationWindowRef.current && !publicReservationWindowRef.current.closed
      ? publicReservationWindowRef.current
      : window.open(PUBLIC_RESERVATION_APP_URL, "hoperia-public-reservation");

    if (!reservationWindow || !activeDemoSession) {
      setReservationReplayStatus("error");
      setReservationReplayNotice({
        title: "No fue posible solicitar replay",
        detail: "La ventana de Ruta 2 no está disponible o fue bloqueada por el navegador.",
      });
      return;
    }

    publicReservationWindowRef.current = reservationWindow;
    if (publicReservationBridgeIdRef.current && publicReservationBridgeSourceRef.current) {
      postReservationReplayRequest(reservationWindow, detail);
      return;
    }

    pendingReplayAfterBridgeRef.current = { reservationWindow, detail };
    setReservationReplayStatus("requesting");
    setReservationReplayNotice({ title: "Conectando Ruta 2", detail: "El replay se enviará después de confirmar el bridge integrado." });
    preparePublicReservationBridge(reservationWindow, activeDemoSession.demoRunId);
  };

  const clearAdminLiveDemoState = (notice: LiveDemoResetNotice) => {
    clearResetTimeout();
    clearReplayTimeout();
    pendingResetIdRef.current = null;
    pendingReplayRequestIdRef.current = null;
    pendingReplayAfterBridgeRef.current = null;
    updateLiveExpedienteCollection([], null);
    setAutoSelectReservationId(null);
    setReceptionNotice(null);
    setPublicReservationWindowNotice(null);
    setReservationReplayNotice(null);
    setReservationReplayStatus("idle");
    processedEventIds.current.clear();
    expedienteIdByReservationId.current.clear();
    clearStoredLiveExpedientes(activeDemoSession?.demoRunId);
    setLiveDemoResetToken((current) => current + 1);
    setLiveDemoResetStatus("completed");
    setLiveDemoResetNotice(notice);
    setActive("demo");
  };

  const createLiveDemoResetId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const randomBytes = crypto.getRandomValues(new Uint8Array(16));
      return `reset-${Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
    }
    return `reset-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  };

  const createDemoSessionId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `demo-${crypto.randomUUID()}`;
    }
    return `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  };

  const clearDemoSessionLocalState = (demoRunId?: string) => {
    clearResetTimeout();
    clearReplayTimeout();
    clearBridgeTimeout();
    clearBridgeRetryInterval();
    clearBridgeRetryTimeouts();
    pendingResetIdRef.current = null;
    pendingReplayRequestIdRef.current = null;
    pendingReservationResetAfterBridgeRef.current = null;
    publicReservationBridgeIdRef.current = null;
    publicReservationBridgeSourceRef.current = null;
    publicReservationWindowRef.current = null;
    updateLiveExpedienteCollection([], null);
    processedEventIds.current.clear();
    expedienteIdByReservationId.current.clear();
    clearStoredLiveExpedientes(demoRunId);
    setAutoSelectReservationId(null);
    setReceptionNotice(null);
    setPublicReservationWindowNotice(null);
    setReservationReplayNotice(null);
    setReservationReplayStatus("idle");
    setLiveDemoResetStatus("idle");
    setLiveDemoResetNotice(null);
    setDemoContext(null);
    setDemoFindings([]);
    setDemoCommandEvidenceState(null);
    setDemoParticipantStatuses(demoParticipantDefaults);
    setLiveDemoResetToken((current) => current + 1);
    setDemoSessionResetToken((current) => current + 1);
  };

  const blockDemoSessionPreparation = (detail: string) => {
    clearResetTimeout();
    clearBridgeTimeout();
    clearBridgeRetryInterval();
    clearBridgeRetryTimeouts();
    pendingResetIdRef.current = null;
    pendingDemoSessionIntentRef.current = null;
    pendingReplayAfterBridgeRef.current = null;
    pendingReservationResetAfterBridgeRef.current = null;
    const residualDemoRunId = activeDemoSessionRef.current?.demoRunId || pendingDemoRunIdRef.current;
    if (residualDemoRunId) {
      const nextResidualDemoSession = { demoRunId: residualDemoRunId, reason: detail, blockedAt: new Date().toISOString() };
      window.localStorage.setItem(residualDemoSessionStorageKey, JSON.stringify(nextResidualDemoSession));
      setResidualDemoSession(nextResidualDemoSession);
    }
    publicReservationBridgeIdRef.current = null;
    publicReservationBridgeSourceRef.current = null;
    setActiveDemoSession(null);
    window.localStorage.removeItem(activeDemoSessionStorageKey);
    setDemoSessionStatus("blocked");
    setDemoSessionNotice(detail);
  };

  const reconnectPublicReservationForDemoSession = (intent: DemoSessionIntent, demoRunId: string) => {
    const reservationWindow = publicReservationWindowRef.current && !publicReservationWindowRef.current.closed
      ? publicReservationWindowRef.current
      : window.open(PUBLIC_RESERVATION_APP_URL, "hoperia-public-reservation");

    if (!reservationWindow) {
      blockDemoSessionPreparation("No fue posible reconectar Ruta 2 para limpiar la corrida anterior. Permite la ventana emergente y reintenta la preparación.");
      return;
    }

    publicReservationWindowRef.current = reservationWindow;
    publicReservationBridgeSourceRef.current = null;
    pendingReservationResetAfterBridgeRef.current = intent;
    setDemoParticipantStatuses((current) => ({ ...current, reservations: "connecting" }));
    setDemoSessionNotice("Reconectando Ruta 2 para limpiar de forma segura la corrida anterior.");
    preparePublicReservationBridge(reservationWindow, demoRunId);
    const bridgeId = publicReservationBridgeIdRef.current;
    reservationWindow.focus();
    clearBridgeTimeout();
    clearBridgeRetryInterval();
    bridgeRetryIntervalRef.current = window.setInterval(() => {
      if (
        !bridgeId ||
        publicReservationBridgeIdRef.current !== bridgeId ||
        publicReservationWindowRef.current !== reservationWindow ||
        reservationWindow.closed ||
        pendingReservationResetAfterBridgeRef.current !== intent
      ) {
        clearBridgeRetryInterval();
        return;
      }
      sendPublicReservationBridge(reservationWindow, bridgeId, demoRunId);
    }, 600);
    bridgeTimeoutRef.current = window.setTimeout(() => {
      if (pendingReservationResetAfterBridgeRef.current !== intent) return;
      blockDemoSessionPreparation("Ruta 2 no confirmó el bridge de limpieza. La corrida anterior se conserva identificada; reintenta la preparación.");
    }, 5000);
  };

  const completeDemoSessionPreparation = (intent: DemoSessionIntent, demoRunId: string) => {
    clearDemoSessionLocalState(demoRunId);
    setResidualDemoSession(null);
    window.localStorage.removeItem(residualDemoSessionStorageKey);
    pendingDemoSessionIntentRef.current = null;
    setActive("demo");

    if (intent === "finalize") {
      setActiveDemoSession(null);
      window.localStorage.removeItem(activeDemoSessionStorageKey);
      setDemoSessionStatus("idle");
      setDemoSessionNotice("Demostración finalizada. No existe una sesión activa.");
      return;
    }

    const session = { demoRunId, startedAt: new Date().toISOString() };
    setActiveDemoSession(session);
    window.localStorage.setItem(activeDemoSessionStorageKey, JSON.stringify(session));
    setDemoSessionStatus("active");
    setDemoSessionNotice("Nueva demostración preparada sin estado heredado.");
  };

  const requestReservationResetForDemoSession = (intent: DemoSessionIntent, demoRunId: string) => {
    const reservationWindow = publicReservationWindowRef.current;
    if (!reservationWindow || reservationWindow.closed) {
      reconnectPublicReservationForDemoSession(intent, demoRunId);
      return;
    }

    if (!publicReservationBridgeIdRef.current || !publicReservationBridgeSourceRef.current) {
      reconnectPublicReservationForDemoSession(intent, demoRunId);
      return;
    }

    const bridgeId = publicReservationBridgeIdRef.current;
    const resetId = createLiveDemoResetId();
    const resetRequest: AdminLiveDemoResetRequest = {
      type: "hoperia.demo.live.reset",
      schemaVersion: "1.0",
      resetId,
      requestedAt: new Date().toISOString(),
      sourceApplication: "hoperia_admin_demo",
      demoRunId,
      bridgeId,
    };

    pendingResetIdRef.current = resetId;
    try {
      reservationWindow.postMessage(resetRequest, configuredPublicReservationOrigin);
    } catch {
      blockDemoSessionPreparation("No fue posible solicitar a Ruta 2 la limpieza de la corrida anterior. La evidencia residual se conserva; reintenta la preparación.");
      return;
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      if (pendingResetIdRef.current !== resetId) return;
      blockDemoSessionPreparation("Ruta 2 no confirmó la limpieza de la corrida anterior. La evidencia residual se conserva; reintenta la preparación.");
    }, 5000);
  };

  const prepareDemoSession = (intent: DemoSessionIntent) => {
    if (demoSessionStatus === "preparing") return;
    const isResidualRetry = demoSessionStatus === "blocked" && residualDemoSession;
    const effectiveIntent: DemoSessionIntent = isResidualRetry ? "finalize" : intent;
    pendingDemoSessionIntentRef.current = effectiveIntent;
    const targetDemoRunId = isResidualRetry
      ? residualDemoSession.demoRunId
      : effectiveIntent === "finalize" ? activeDemoSession?.demoRunId : createDemoSessionId();
    if (!targetDemoRunId) {
      blockDemoSessionPreparation("No existe una corrida activa para finalizar.");
      return;
    }
    pendingDemoRunIdRef.current = targetDemoRunId;
    setDemoSessionStatus("preparing");
    setDemoSessionNotice("Verificando y limpiando el estado efímero de la corrida anterior.");

    if (liveExpedientesRef.current.length > 0 || isResidualRetry) {
      requestReservationResetForDemoSession(effectiveIntent, targetDemoRunId);
      return;
    }

    completeDemoSessionPreparation(effectiveIntent, targetDemoRunId);
  };

  const requestLiveDemoReset = () => {
    const confirmed = window.confirm(
      "Se finalizará la demostración activa y se limpiará su estado efímero tanto en la App Pública como en el Admin. ¿Continuar?",
    );
    if (!confirmed) return;

    prepareDemoSession("finalize");
  };

  const clearOnlyAdminLiveDemoState = () => {
    const confirmed = window.confirm(
      "La App Pública no será reiniciada. Solo se limpiará el estado vivo del Admin. ¿Continuar?",
    );
    if (!confirmed) return;

    clearAdminLiveDemoState({
      title: "Estado local del Admin limpiado",
      detail: "La App Pública debe reiniciarse por separado.",
    });
  };

  useEffect(() => () => {
    clearResetTimeout();
    clearReplayTimeout();
    clearBridgeTimeout();
    clearBridgeRetryInterval();
    clearBridgeRetryTimeouts();
  }, []);

  useEffect(() => {
    try {
      const demoRunId = activeDemoSessionRef.current?.demoRunId;
      if (!demoRunId) return;
      const raw = window.localStorage.getItem(liveExpedientesStorageKeyForRun(demoRunId));
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!isLiveExpedienteCollection(parsed, demoRunId)) {
        clearStoredLiveExpedientes(demoRunId);
        return;
      }
      parsed.expedientes.forEach((expediente) => {
        processedEventIds.current.add(expediente.eventId);
        expedienteIdByReservationId.current.set(expediente.reservationId, expediente.expedienteId);
      });
      updateLiveExpedienteCollection(parsed.expedientes, parsed.selectedReservationId);
      setAutoSelectReservationId(parsed.selectedReservationId);
      const selected = parsed.expedientes.find((expediente) => expediente.reservationId === parsed.selectedReservationId) || parsed.expedientes[0];
      setReceptionNotice({
        kind: "accepted",
        title: "Expedientes Vivos recuperados desde este Centro de Mando",
        detail: `${parsed.expedientes.length} expediente(s) vivo(s) rehidratado(s) · Demo · No persistido`,
        reservationId: selected?.reservationId,
        expedienteId: selected?.expedienteId,
      });
      setReservationReplayStatus("received");
      setReservationReplayNotice({
        title: "Expedientes demo recuperados",
        detail: `${parsed.expedientes.length} expediente(s) asociado(s) a la corrida activa`,
      });
    } catch {
      clearStoredLiveExpedientes(activeDemoSessionRef.current?.demoRunId);
    }
  }, []);

  useEffect(() => {
    const isPublicLiveDemoResetAck = (value: unknown): value is PublicLiveDemoResetAck => {
      if (!value || typeof value !== "object") return false;
      const data = value as Partial<PublicLiveDemoResetAck>;

      return data.type === "hoperia.demo.live.reset.ack" &&
        data.schemaVersion === "1.0" &&
        isNonEmptyString(data.resetId) &&
        isNonEmptyString(data.acknowledgedAt) &&
        ALLOWED_RESERVATION_SOURCE_APPLICATIONS.has(data.sourceApplication || "") &&
        isNonEmptyString(data.bridgeId) &&
        data.status === "reset_complete";
    };

    const rejectReservation = (detail: string) => {
      setReceptionNotice({
        kind: "rejected",
        title: "Evento de reserva rechazado",
        detail,
      });
    };

    const handleReservationMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== configuredPublicReservationOrigin) {
        return;
      }

      if (event.data && typeof event.data === "object" && !Array.isArray(event.data)) {
        const eventType = (event.data as { type?: unknown }).type;
        if (eventType === "hoperia.public.bridge.ack") {
          if (!isPublicBridgeAckMessage(event.data)) return;
          if (event.data.bridgeId !== publicReservationBridgeIdRef.current) return;
          const expectedDemoRunId = pendingDemoRunIdRef.current || activeDemoSessionRef.current?.demoRunId;
          if (event.data.demoRunId !== expectedDemoRunId) return;
          if (event.source !== publicReservationWindowRef.current) return;

          publicReservationBridgeSourceRef.current = event.source;
          clearBridgeTimeout();
          setDemoParticipantStatuses((current) => ({ ...current, reservations: "connected" }));
          clearBridgeRetryInterval();
          clearBridgeRetryTimeouts();
          const pendingReplay = pendingReplayAfterBridgeRef.current;
          pendingReplayAfterBridgeRef.current = null;
          if (pendingReplay && !pendingReservationResetAfterBridgeRef.current) {
            postReservationReplayRequest(pendingReplay.reservationWindow, pendingReplay.detail);
          }
          const intent = pendingReservationResetAfterBridgeRef.current;
          if (intent) {
            clearBridgeTimeout();
            clearBridgeRetryInterval();
            pendingReservationResetAfterBridgeRef.current = null;
            const demoRunId = pendingDemoRunIdRef.current;
            if (demoRunId) requestReservationResetForDemoSession(intent, demoRunId);
          }
          return;
        }
      }

      if (!isExpectedReservationSource(event, (event.data as { bridgeId?: string } | null)?.bridgeId)) {
        return;
      }

      if (!event.data || typeof event.data !== "object") {
        return;
      }

      const eventType = (event.data as { type?: unknown }).type;
      if (eventType === "hoperia.demo.live.reset.ack") {
        if (!isPublicLiveDemoResetAck(event.data)) return;
        if (event.data.resetId !== pendingResetIdRef.current) return;
        if (event.data.demoRunId !== pendingDemoRunIdRef.current) return;
        if (event.data.bridgeId !== publicReservationBridgeIdRef.current) return;

        const intent = pendingDemoSessionIntentRef.current;
        if (intent) {
          const demoRunId = pendingDemoRunIdRef.current;
          if (demoRunId) completeDemoSessionPreparation(intent, demoRunId);
        } else {
          clearAdminLiveDemoState({
            title: "Demostración en vivo reiniciada",
            detail: "Admin y App Pública confirmaron la limpieza coordinada.",
          });
        }
        return;
      }

      if (eventType !== "hoperia.reservation.completed") {
        return;
      }

      if (!isReservationCompletedEvent(event.data)) {
        rejectReservation("Contrato ausente o incompleto.");
        return;
      }

      const reservationEvent = event.data;
      if (!activeDemoSessionRef.current || reservationEvent.demoRunId !== activeDemoSessionRef.current.demoRunId) {
        rejectReservation("Evento rechazado: no pertenece a la sesión integrada activa.");
        return;
      }
      if (processedEventIds.current.has(reservationEvent.eventId)) {
        if (pendingReplayRequestIdRef.current !== null) {
          clearReplayTimeout();
          pendingReplayRequestIdRef.current = null;
          setReservationReplayStatus("received");
          setReservationReplayNotice({
            title: "Reserva demo ya disponible",
            detail: `Reservation ID: ${reservationEvent.reservationId}`,
          });
        } else if (reservationReplayStatus === "empty" || reservationReplayStatus === "error") {
          clearReplayTimeout();
          setReservationReplayStatus("idle");
          setReservationReplayNotice(null);
        }
        return;
      }

      const existingExpedienteId = expedienteIdByReservationId.current.get(reservationEvent.reservationId);
      const expedienteId = existingExpedienteId || buildLiveExpedienteId(reservationEvent.reservationId);
      const nextLiveExpediente: LiveExpediente = {
        reservationId: reservationEvent.reservationId,
        expedienteId,
        status: "initial",
        eventId: reservationEvent.eventId,
        receivedAt: new Date().toISOString(),
        sourceApplication: reservationEvent.sourceApplication,
        sourceOrigin: reservationEvent.sourceOrigin,
        client: reservationEvent.client,
        project: reservationEvent.project,
        selectedUnit: reservationEvent.selectedUnit,
        sourceChannel: reservationEvent.sourceChannel,
        isDemo: reservationEvent.isDemo,
        demoRunId: reservationEvent.demoRunId,
        persisted: false,
      };

      processedEventIds.current.add(reservationEvent.eventId);
      expedienteIdByReservationId.current.set(reservationEvent.reservationId, expedienteId);
      const existingExpediente = liveExpedientesRef.current.find(
        (expediente) => expediente.reservationId === reservationEvent.reservationId,
      );
      const nextExpedientes = existingExpediente
        ? liveExpedientesRef.current
        : [...liveExpedientesRef.current, nextLiveExpediente];
      const nextSelectedReservationId = selectedLiveExpedienteReservationIdRef.current || nextLiveExpediente.reservationId;
      updateLiveExpedienteCollection(nextExpedientes, nextSelectedReservationId, reservationEvent.demoRunId);
      if (!existingExpediente) setAutoSelectReservationId(nextSelectedReservationId);
      if (pendingReplayRequestIdRef.current !== null) {
        clearReplayTimeout();
        pendingReplayRequestIdRef.current = null;
        setReservationReplayStatus("received");
        setReservationReplayNotice({
          title: "Reserva demo recuperada",
          detail: `Reservation ID: ${reservationEvent.reservationId}`,
        });
      } else {
        clearReplayTimeout();
        setReservationReplayStatus("idle");
        setReservationReplayNotice(null);
      }
      if (pendingResetIdRef.current === null) {
        setLiveDemoResetStatus("idle");
        setLiveDemoResetNotice(null);
      }
      setReceptionNotice({
        kind: "accepted",
        title: "Reserva recibida desde la App Pública",
        detail: existingExpediente
          ? "Expediente Vivo existente conservado · Demo · No persistido"
          : `Expediente Vivo agregado · ${nextExpedientes.length} en la sesión demo · No persistido`,
        reservationId: reservationEvent.reservationId,
        expedienteId,
      });
      setActive("client");
    };

    window.addEventListener("message", handleReservationMessage);
    return () => window.removeEventListener("message", handleReservationMessage);
  }, [configuredPublicReservationOrigin]);
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
        <TopNav active={active} setActive={setActive} onStartDemoSession={() => prepareDemoSession("start")} />
        {publicReservationWindowNotice && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-bold leading-6 text-blue-900">
            {publicReservationWindowNotice}
          </div>
        )}
        {receptionNotice && (
          <div className={cls(
            "rounded-2xl border px-5 py-4 text-sm font-bold leading-6",
            demoSessionStatus === "blocked"
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : receptionNotice.kind === "accepted"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900",
          )}>
            {demoSessionStatus === "blocked" && <div className="mb-2 text-xs font-black uppercase tracking-[0.18em]">Estado residual de corrida anterior</div>}
            <div className="font-black">{receptionNotice.title}</div>
            <div>{receptionNotice.detail}</div>
            {receptionNotice.reservationId && <div>Reservation ID: {receptionNotice.reservationId}</div>}
            {receptionNotice.expedienteId && <div>Expediente ID: {receptionNotice.expedienteId}</div>}
          </div>
        )}
        {liveDemoResetNotice && (
          <div className={cls(
            "rounded-2xl border px-5 py-4 text-sm font-bold leading-6",
            liveDemoResetStatus === "completed"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : liveDemoResetStatus === "requesting"
                ? "border-blue-200 bg-blue-50 text-blue-900"
                : "border-amber-200 bg-amber-50 text-amber-900",
          )}>
            <div className="font-black">{liveDemoResetNotice.title}</div>
            <div>{liveDemoResetNotice.detail}</div>
          </div>
        )}
        {reservationReplayNotice && (
          <div className={cls(
            "rounded-2xl border px-5 py-4 text-sm font-bold leading-6",
            demoSessionStatus === "blocked"
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : reservationReplayStatus === "received"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : reservationReplayStatus === "requesting"
                ? "border-blue-200 bg-blue-50 text-blue-900"
                : "border-amber-200 bg-amber-50 text-amber-900",
          )}>
            {demoSessionStatus === "blocked" && <div className="mb-2 text-xs font-black uppercase tracking-[0.18em]">Estado residual de corrida anterior</div>}
            <div className="font-black">{reservationReplayNotice.title}</div>
            <div>{reservationReplayNotice.detail}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {(liveExpedientes.length > 0 || receptionNotice?.kind === "accepted" || liveDemoResetStatus === "requesting") && (
            <div className="flex flex-wrap items-center gap-3">
              {demoSessionStatus === "blocked" && <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-800">Estado residual · limpieza pendiente</span>}
            <button
              type="button"
              disabled={liveDemoResetStatus === "requesting"}
              onClick={requestLiveDemoReset}
              className={cls(
                "rounded-2xl px-5 py-3 text-sm font-black text-white",
                liveDemoResetStatus === "requesting" ? "cursor-wait bg-slate-400" : "bg-slate-950 hover:bg-slate-800",
              )}
            >
              Reiniciar demostración en vivo
            </button>
            </div>
          )}
        </div>
        <Page
          demoContext={demoContext}
          demoFindings={demoFindings}
          demoCommandEvidenceState={demoCommandEvidenceState}
          activeDemoSession={activeDemoSession}
          residualDemoSession={residualDemoSession}
          demoSessionStatus={demoSessionStatus}
          demoSessionNotice={demoSessionNotice}
          demoSessionResetToken={demoSessionResetToken}
          demoParticipantStatuses={demoParticipantStatuses}
          liveExpediente={selectedLiveExpediente}
          liveExpedientes={liveExpedientes}
          selectedLiveExpedienteReservationId={selectedLiveExpedienteReservationId}
          onSelectLiveExpediente={selectLiveExpediente}
          autoSelectReservationId={autoSelectReservationId}
          liveDemoResetToken={liveDemoResetToken}
          reservationReplayStatus={reservationReplayStatus}
          onRequestReservationReplay={sendReservationReplayRequest}
          onDemoContextInjected={setDemoContext}
          onDemoFindingsInjected={setDemoFindings}
          onDemoCommandEvidenceStateChange={setDemoCommandEvidenceState}
          onOpenPublicReservation={openPublicReservation}
          onOpenOperationalCase={openOperationalCaseInMessaging}
          onStartDemoSession={() => prepareDemoSession("start")}
          onFinalizeDemoSession={() => prepareDemoSession("finalize")}
          setActive={setActive}
        />
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

function AdminOperationalEvidenceAnchors({ demoFindings = [], targetPage }) {
  const pageFindings = getFindingsForAdminPage(demoFindings, targetPage);
  const mirrorBlocks = pageFindings.flatMap((finding) => {
    const evidenceItems = finding.associatedEvidence.length
      ? finding.associatedEvidence
      : [{
          id: `${finding.id}-admin-target`,
          label: finding.adminTargetSection,
          summary: finding.title || finding.adminTargetSection,
          source: finding.source,
          adminTargetPage: finding.adminTargetPage,
          adminTargetSection: finding.adminTargetSection,
          adminTargetDetail: finding.title || finding.adminTargetSection,
          adminTargetAnchor: `${finding.id}-${finding.adminTargetPage}`,
        }];

    return evidenceItems
      .filter((evidence) => (evidence.adminTargetPage || finding.adminTargetPage) === targetPage)
      .map((evidence) => ({ finding, evidence }));
  });

  if (!mirrorBlocks.length) return null;

  return (
    <div className="space-y-4">
      {mirrorBlocks.map(({ finding, evidence }) => (
        <div key={`${finding.id}-${evidence.id}`} id={evidence.adminTargetAnchor} className="scroll-mt-64">
          <AiObservation title={evidence.adminTargetDetail || evidence.adminTargetSection || finding.title}>
            <p><span className="font-black text-slate-950">Interpretación:</span> {finding.summary}</p>
            <p className="mt-3"><span className="font-black text-slate-950">Responsable:</span> {formatDemoFindingResponsible(finding)}</p>
            <p className={`mt-3 ${intelligenceActionTextClass}`}><span>Acción sugerida por H - OperIA Intelligence:</span> {finding.recommendedAction}</p>
          </AiObservation>
        </div>
      ))}
    </div>
  );
}

const demo_movement_count = 7;

const demoMovementPipeline = [
  "información recibida",
  "verificación",
  "ordenamiento",
  "análisis",
  "recomendación",
  "acción sugerida",
];

const normalizeDemoIdSegment = (value) =>
  String(value || "demo")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "DEMO";

const buildLiveExpedienteId = (reservationId) => {
  const normalizedReservationId = normalizeDemoIdSegment(reservationId);
  const knownReservationPrefixes = ["HOP-RES-", "AMENA-RES-"];
  const matchingPrefix = knownReservationPrefixes.find((prefix) => normalizedReservationId.startsWith(prefix));
  const expedienteSegment = matchingPrefix
    ? normalizedReservationId.slice(matchingPrefix.length)
    : normalizedReservationId;

  return `HOP-EXP-${normalizeDemoIdSegment(expedienteSegment || normalizedReservationId)}`;
};

const formatDemoDateTime = (value) => {
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("es-GT", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return value;
  }
};

const buildDemoLiveFile = (client) => {
  const reservationId = client?.reservation_id || "HOP-RES-DEMO";
  const reservationSegment = normalizeDemoIdSegment(reservationId);
  const demoRunId = `DEMO-RUN-${reservationSegment}`;
  const expedienteId = `EXP-DEMO-${reservationSegment}`;
  const clientName = client?.name || "Cliente demo";
  const unit = client?.unit || "Unidad demo";
  const seller = client?.seller || "Equipo comercial demo";

  const movements = [
    {
      movement_type: "comentario adicional",
      source: "App Publica demo",
      verification_status: "verificado como dato demo",
      ordering_bucket: "prioridad alta",
      analysis_summary: `${clientName} requiere claridad posterior a la reserva de ${unit}.`,
      recommendation: "Preparar respuesta breve con contexto de unidad, etapa y siguiente paso.",
      suggested_action: "La asesora revisa el mensaje sugerido y confirma seguimiento humano.",
      human_owner: seller,
      human_decision_status: "pendiente de validacion humana",
    },
    {
      movement_type: "actualizacion de preferencia",
      source: "Registro comercial demo",
      verification_status: "pendiente de contraste",
      ordering_bucket: "preferencia de unidad",
      analysis_summary: "El cliente compara unidad reservada con una alternativa cercana.",
      recommendation: "Revisar disponibilidad y narrativa antes de ofrecer cambio.",
      suggested_action: "Validar inventario demo y preparar comparativo para llamada.",
      human_owner: "Coordinacion comercial",
      human_decision_status: "por revisar",
    },
    {
      movement_type: "solicitud de visita",
      source: "Marta demo",
      verification_status: "dato recibido",
      ordering_bucket: "agenda",
      analysis_summary: "La visita puede acelerar formalizacion si participa decisor familiar.",
      recommendation: "Proponer horario y confirmar asistentes antes de bloquear agenda.",
      suggested_action: "Contactar al cliente para validar disponibilidad de visita.",
      human_owner: seller,
      human_decision_status: "pendiente",
    },
    {
      movement_type: "validacion documental pendiente",
      source: "Documentos demo",
      verification_status: "requiere revision humana",
      ordering_bucket: "bloqueo documental",
      analysis_summary: "Falta evidencia documental para continuar la etapa financiera.",
      recommendation: "Solicitar documento exacto y explicar por que desbloquea el expediente.",
      suggested_action: "Enviar checklist documental revisado por la asesora.",
      human_owner: "Equipo documental",
      human_decision_status: "pendiente de accion",
    },
    {
      movement_type: "mensaje interno de asesora",
      source: "Mensajes entre equipo demo",
      verification_status: "trazable en demo",
      ordering_bucket: "coordinacion",
      analysis_summary: "El seguimiento requiere coordinacion entre ventas y financiera.",
      recommendation: "Asignar responsable y hora limite para evitar perdida de contexto.",
      suggested_action: "Registrar compromiso interno y siguiente responsable.",
      human_owner: "Direccion comercial",
      human_decision_status: "en espera",
    },
    {
      movement_type: "alerta de prioridad",
      source: "H - OperIA Intelligence demo",
      verification_status: "senal interpretada",
      ordering_bucket: "riesgo comercial",
      analysis_summary: "La combinacion de duda financiera y documentos pendientes eleva prioridad.",
      recommendation: "Atender hoy antes de que el caso pierda impulso comercial.",
      suggested_action: "Programar llamada humana con guion revisado por la asesora.",
      human_owner: seller,
      human_decision_status: "sugerida para validacion",
    },
    {
      movement_type: "observacion de coordinacion",
      source: "Centro Demo",
      verification_status: "dato simulado consolidado",
      ordering_bucket: "cierre operativo",
      analysis_summary: "El expediente necesita evidencia de decision humana final.",
      recommendation: "Cerrar el movimiento solo cuando el equipo valide accion tomada.",
      suggested_action: "Marcar decision humana despues de revisar contexto completo.",
      human_owner: "Equipo humano",
      human_decision_status: "sin ejecutar automaticamente",
    },
  ].slice(0, demo_movement_count);

  return {
    demo_run_id: demoRunId,
    reservation_id: reservationId,
    expediente_id: expedienteId,
    movements: movements.map((movement, index) => ({
      ...movement,
      movement_id: `${expedienteId}-MOV-${String(index + 1).padStart(2, "0")}`,
      received_at: index < 4 ? `Hoy ${10 + index}:0${index} AM` : `Hoy ${2 + index}:15 PM`,
      is_demo: true,
    })),
  };
};

function DemoLiveFileMovementsPanel({ client }) {
  const liveFile = buildDemoLiveFile(client);

  return (
    <Card className="border-amber-200 bg-amber-50">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="amber">Datos simulados de demo</Badge>
            <Badge tone="blue">Expediente Vivo demo</Badge>
            <Badge tone="violet">Movimientos simulados post-reserva</Badge>
            <Badge tone="green">Acciones sugeridas para validacion humana</Badge>
          </div>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Expediente demo detallado · Carlos Méndez</h2>
          <p className="mt-2 max-w-5xl text-base font-semibold leading-7 text-slate-800">
            Esta vista fixture/local muestra como una reserva demo se convierte en expediente y recibe movimientos posteriores. H - OperIA Intelligence sugiere acciones trazables para revision humana; no decide ni ejecuta automaticamente.
          </p>
        </div>
        <Badge tone="dark">demo_movement_count = {demo_movement_count} ejemplo configurable</Badge>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-100 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
        <span className="font-black text-slate-950">Titular del expediente:</span> {client?.name || "Cliente demo"}
        <span className="ml-2 text-slate-500">· Reservation ID: {liveFile.reservation_id}</span>
        <span className="ml-2 text-xs font-bold text-slate-500">Referencia técnica demo: {liveFile.expediente_id}</span>
      </div>

      <div className="mt-5 rounded-3xl border border-amber-100 bg-white p-4">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Cadena operativa dentro del expediente</div>
        <div className="mt-4 grid gap-2 md:grid-cols-6">
          {demoMovementPipeline.map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs font-black text-slate-500">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm font-black text-slate-950">{step}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-amber-100 bg-white">
        <div className="border-b border-amber-100 bg-amber-100/70 p-4">
          <div className="text-xs font-black uppercase tracking-[0.12em] text-slate-950">Movimientos simulados post-reserva</div>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            Un movimiento por bloque, con acción sugerida trazable para validación humana.
          </p>
        </div>
        <div className="grid gap-4 p-4 xl:grid-cols-2">
          {liveFile.movements.map((movement) => (
            <div key={movement.movement_id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">{movement.movement_type}</div>
                  <div className="mt-1 text-xs font-bold text-slate-500">{movement.movement_id}</div>
                </div>
                <Badge tone="amber">{movement.human_decision_status}</Badge>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InfoCard title="Fuente" value={movement.source} />
                <InfoCard title="Verificación" value={movement.verification_status} />
                <InfoCard title="Ordenamiento" value={movement.ordering_bucket} />
                <InfoCard title="Titular del expediente" value={client?.name || "Cliente demo"} />
                <InfoCard title="Responsable humano" value={movement.human_owner} />
              </div>
              <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-slate-800">
                <p><span className="font-black text-slate-950">Análisis:</span> {movement.analysis_summary}</p>
                <p><span className="font-black text-slate-950">Recomendación:</span> {movement.recommendation}</p>
                <p><span className="font-black text-slate-950">Acción sugerida:</span> {movement.suggested_action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
        Los movimientos y acciones sugeridas pertenecen al expediente {liveFile.expediente_id}. Son datos simulados de demo, no produccion real, no persistencia y no integracion externa.
      </p>
    </Card>
  );
}

function ExecutivePage({ demoFindings = [], setActive }) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Centro Ejecutivo"
        subtitle="Vista semanal para Director General y Director Comercial: prioridades, riesgos, ingresos, acompañamiento del equipo, lectura de H - OperIA Intelligence y acciones concretas para decidir con criterio operativo."
        icon={MonitorCog}
        sync={martaSync.executive}
        badges={[REPORT_DATE, "Tercera semana de mayo 2026", "Inteligencia estratégica"]}
        syncNote="Este porcentaje resume qué tanto H - OperIA Intelligence cruza señales internas, riesgos, recomendaciones y patrones operativos para que la dirección revise, decida y ejecute con criterio humano."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Ingresos recibidos" value="$184,500" note="Reserva a entrega · corte 15 mayo 2026" tone="green" icon={BadgeDollarSign} />
        <Metric title="Clientes críticos" value="17" note="Riesgo financiero/documental" tone="red" icon={AlertTriangle} />
        <Metric title="Integración H - OperIA Intelligence" value="86%" note="Promedio operativo" tone="violet" icon={Bot} />
        <Metric title="Acciones hoy" value="43" note="Sugeridas para revisión directiva" tone="blue" icon={Target} />
      </div>
      <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="executive" />
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Consulta ejecutiva asistida</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">H - OperIA Intelligence transforma preguntas directivas en desgloses verificables y conclusiones accionables.</p>
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
          subtitle="Acciones que H - OperIA Intelligence recomienda revisar en comité comercial."
          items={[
            { title: "Instagram genera volumen, pero formaliza 18% menos que referidos.", text: "Acción: revisar promesas de campaña, calidad de segmentación y consistencia entre anuncio, WhatsApp y seguimiento de vendedoras.", badge: "Marketing", tone: "blue" },
            { title: "Tres vendedoras necesitan más acompañamiento con propuestas asistidas.", text: "Acción: coordinar revisión diaria de propuestas antes de contactar clientes y dar seguimiento claro por vendedora.", badge: "Equipo ventas", tone: "amber" },
            { title: "Torre 3 concentra atrasos de prima y consultas de garantías.", text: "Acción: alinear ventas, financiera, construcción y servicio al cliente para responder con una sola verdad operacional.", badge: "Riesgo", tone: "red" },
            { title: "Clientes que reciben avances de construcción visual abandonan menos.", text: "Acción: automatizar reporte semanal con fotos, hitos, explicación simple y próximos trabajos por torre.", badge: "Construcción", tone: "green" },
          ]}
        />
        <AiObservation>
          <p>La empresa ya no debe dirigir solo por percepción. H - OperIA Intelligence aporta contexto para que los equipos revisen respuestas, analicen documentos, registren compromisos y evalúen campañas por ingresos reales, no solo por leads.</p>
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

function ClientPage({ demoFindings = [], liveExpedientes = [], selectedLiveExpedienteReservationId = null, autoSelectReservationId = null, liveDemoResetToken = 0, reservationReplayStatus = "idle", onRequestReservationReplay, onSelectLiveExpediente, setActive }) {
  const profile = clientOperationalProfile;
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="client" />;
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClientReservationId, setSelectedClientReservationId] = useState(null);
  const baseAdminClients: AdminClient[] = [
    {
      name: profile.cliente.name,
      reservation_id: "HOP-RES-000784",
      expediente_id: "EXP-DEMO-HOP-RES-000784",
      unit: profile.unidadReservada.label,
      status: profile.pipeline.status,
      seller: profile.vendedora.label,
    },
    {
      name: "Ana López",
      reservation_id: "HOP-RES-000812",
      unit: "Sector 01 · Torre 4 · Nivel 8 · A804",
      status: "Documentación",
      seller: "Carolina Díaz · VND-021",
    },
    {
      name: "María Fernanda",
      reservation_id: "HOP-RES-CASA-014",
      unit: "Sector 05 · Manzana 3 · Lote 14",
      status: "Seguimiento financiero",
      seller: "Ana Guardado · VND-017",
    },
  ];
  const liveClients: AdminClient[] = liveExpedientes.map((liveExpediente) => {
    const liveUnit = [
      liveExpediente.selectedUnit.sector,
      liveExpediente.selectedUnit.towerOrBlock,
      liveExpediente.selectedUnit.level,
      liveExpediente.selectedUnit.model,
      liveExpediente.selectedUnit.unitOrLot,
    ].filter(Boolean).join(" · ");
    return {
      name: `${liveExpediente.client.firstName} ${liveExpediente.client.lastName}`.trim(),
      reservation_id: liveExpediente.reservationId,
      expediente_id: liveExpediente.expedienteId,
      unit: liveUnit || liveExpediente.selectedUnit.unitOrLot,
      status: "Expediente inicial",
      seller: "App Pública de Reservas",
      liveExpediente,
    };
  });
  const adminClients: AdminClient[] = [
    ...liveClients,
    ...baseAdminClients.filter((client) => !liveClients.some((liveClient) => liveClient.reservation_id === client.reservation_id)),
  ];
  useEffect(() => {
    const nextSelection = selectedLiveExpedienteReservationId || autoSelectReservationId;
    if (nextSelection) setSelectedClientReservationId(nextSelection);
  }, [selectedLiveExpedienteReservationId, autoSelectReservationId]);
  useEffect(() => {
    if (liveDemoResetToken === 0) return;
    setClientSearch("");
    setSelectedClientReservationId(null);
  }, [liveDemoResetToken]);
  const normalizedClientSearch = clientSearch.trim().toLowerCase();
  const effectiveSelectedClientReservationId = selectedClientReservationId || selectedLiveExpedienteReservationId || autoSelectReservationId;
  const filteredAdminClients = normalizedClientSearch
    ? adminClients.filter((client) =>
        `${client.name} ${client.reservation_id} ${client.unit} ${client.status}`.toLowerCase().includes(normalizedClientSearch),
      )
    : [];
  const selectedAdminClient = adminClients.find((client) => client.reservation_id === effectiveSelectedClientReservationId) || null;
  const selectedClientInitials = selectedAdminClient?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "EV";
  const selectedLiveExpediente = selectedAdminClient?.liveExpediente || null;
  const hasInitialLiveExpediente = selectedLiveExpediente?.status === "initial";
  const hasDetailedDemoFile = !hasInitialLiveExpediente && selectedAdminClient?.reservation_id === "HOP-RES-000784";
  const clientPageBadges = selectedAdminClient
    ? [
        REPORT_DATE,
        hasInitialLiveExpediente ? "Expediente recibido" : hasDetailedDemoFile ? "Expediente demo detallado" : "Expediente seleccionado",
        selectedAdminClient.status,
      ]
    : [REPORT_DATE, "Sin expediente seleccionado", "Vista de búsqueda"];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Perfil Operacional del Cliente"
        subtitle="Expediente vivo desde la reserva hasta la entrega: Marta acompaña conversaciones, H - OperIA Intelligence ordena señales y la vendedora revisa tono, prioridad y siguiente paso."
        icon={UserRound}
        sync={martaSync.client}
        badges={clientPageBadges}
        syncNote="Este porcentaje indica qué tan conectado está el expediente post-reserva: Marta acompaña dudas y conversaciones; H - OperIA Intelligence interpreta señales; la vendedora revisa y ejecuta el siguiente paso."
      />
      {demoEvidenceMirror}

      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Buscar expediente</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-700">
              Escribe un nombre o reservation_id para abrir un expediente demo. La vista inferior permanece en blanco hasta seleccionar un cliente.
            </p>
          </div>
          <div className="w-full xl:max-w-2xl">
            <input
              value={clientSearch}
              onChange={(event) => setClientSearch(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none"
              placeholder="Buscar por nombre o reservation_id"
            />
          </div>
        </div>
        {liveClients.length > 0 && (
          <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
            <div className="text-sm font-black text-slate-950">Expedientes Vivos de esta sesión demo · {liveClients.length}</div>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">El caso principal se mantiene hasta que el presentador seleccione otro expediente vivo.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {liveClients.map((client) => {
                const isPrincipal = client.reservation_id === selectedLiveExpedienteReservationId;
                return (
                  <button
                    key={client.reservation_id}
                    type="button"
                    onClick={() => {
                      setSelectedClientReservationId(client.reservation_id);
                      onSelectLiveExpediente?.(client.reservation_id);
                    }}
                    className={cls(
                      "rounded-2xl px-4 py-3 text-left text-sm font-black",
                      isPrincipal ? "bg-slate-950 text-white" : "bg-white text-slate-900",
                    )}
                  >
                    {client.name} · {client.reservation_id}{isPrincipal ? " · Caso principal" : " · Caso secundario"}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {!selectedAdminClient && liveExpedientes.length === 0 && (
          <button
            type="button"
            disabled={reservationReplayStatus === "requesting"}
            onClick={() => onRequestReservationReplay("Solicitud manual desde Centro de Mando. Ruta 2 reenviará la última reserva demo guardada si existe.")}
            className={cls(
              "mt-4 rounded-2xl px-5 py-3 text-sm font-black text-white",
              reservationReplayStatus === "requesting" ? "cursor-wait bg-slate-400" : "bg-blue-700 hover:bg-blue-800",
            )}
          >
            Recuperar última reserva demo
          </button>
        )}
        {normalizedClientSearch && (
          <div className="mt-5">
            {filteredAdminClients.length > 0 ? (
              <div className="grid gap-3">
                {filteredAdminClients.map((client) => {
                  const selected = client.reservation_id === effectiveSelectedClientReservationId;
                  return (
                    <button
                      key={client.reservation_id}
                      type="button"
                      onClick={() => {
                        setSelectedClientReservationId(client.reservation_id);
                        if (client.liveExpediente) onSelectLiveExpediente?.(client.reservation_id);
                      }}
                      className={cls(
                        "rounded-3xl border p-4 text-left transition",
                        selected ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="text-lg font-black text-slate-950">{client.name}</div>
                          <div className="mt-1 text-sm font-bold text-slate-500">{client.reservation_id}</div>
                        </div>
                        <div className="grid gap-2 text-sm font-semibold leading-6 text-slate-700 md:grid-cols-3 lg:max-w-4xl">
                          <span>{client.unit}</span>
                          <span>{client.status}</span>
                          <span>{client.seller}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-base font-black text-slate-700">
                No se encontraron clientes con ese criterio.
              </div>
            )}
          </div>
        )}
      </Card>

      {selectedAdminClient && (
        <>
          <Card>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-slate-950 text-3xl font-black text-white">{selectedClientInitials}</div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={hasInitialLiveExpediente ? "blue" : "green"}>{hasInitialLiveExpediente ? "Reserva recibida" : "Expediente seleccionado"}</Badge>
                    <Badge tone={hasInitialLiveExpediente ? "amber" : "amber"}>{hasInitialLiveExpediente ? "Demo · No persistido" : "Fixture/local demo"}</Badge>
                    <Badge tone={hasInitialLiveExpediente ? "slate" : "violet"}>{hasInitialLiveExpediente ? "Marta pendiente / opcional" : "Validación humana requerida"}</Badge>
                  </div>
                  <h2 className="mt-3 text-3xl font-black text-slate-950">Expediente seleccionado</h2>
                  <div className="mt-2 text-base font-black text-slate-800">Titular del expediente: {selectedAdminClient.name}</div>
                  <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
                    {hasInitialLiveExpediente
                      ? "Expediente Vivo inicial recibido desde la App Pública. El snapshot queda disponible para enriquecimiento posterior, sin movimientos posteriores todavía."
                      : "Expediente demo abierto desde una búsqueda explícita. Los datos siguientes son simulados y crecen hacia abajo dentro del expediente del cliente seleccionado."}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Reservation ID</div>
                <div className="mt-1 font-black text-slate-950">{selectedAdminClient.reservation_id}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <InfoCard title="Titular del expediente" value={selectedAdminClient.name} detail={selectedAdminClient.reservation_id} />
              <InfoCard title="Unidad" value={selectedAdminClient.unit} />
              <InfoCard title="Estado" value={selectedAdminClient.status} />
              <InfoCard title="Asesora" value={selectedAdminClient.seller} />
            </div>
          </Card>

          {hasInitialLiveExpediente ? (
            <Card className="border-blue-200 bg-blue-50">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <Badge tone="blue">Expediente Vivo inicial</Badge>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">Reserva completada</h2>
                  <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
                    Snapshot recibido desde la App Pública. Marta permanece pendiente y opcional como enriquecimiento posterior.
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-200 bg-white/80 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Expediente ID</div>
                  <div className="mt-1 font-black text-slate-950">{selectedLiveExpediente.expedienteId}</div>
                </div>
              </div>
              <button
                type="button"
                disabled={reservationReplayStatus === "requesting"}
                onClick={() => onRequestReservationReplay("Prueba técnica/demo de recuperación. Ruta 2 reenviará la última reserva demo guardada sin reiniciar la experiencia.")}
                className={cls(
                  "mt-5 rounded-2xl border px-5 py-3 text-sm font-black",
                  reservationReplayStatus === "requesting"
                    ? "cursor-wait border-slate-200 bg-slate-100 text-slate-500"
                    : "border-blue-300 bg-white text-blue-900 hover:bg-blue-100",
                )}
              >
                Probar replay de última reserva demo
              </button>
              <div className="mt-5 rounded-3xl border border-blue-100 bg-white p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Resumen ejecutivo</div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <InfoCard title="Titular" value={selectedLiveExpediente.client.firstName + " " + selectedLiveExpediente.client.lastName} detail={`${selectedLiveExpediente.client.email} · ${selectedLiveExpediente.client.phone}`} />
                  <InfoCard title="Unidad" value={selectedAdminClient.unit} detail={selectedLiveExpediente.project.name} />
                  <InfoCard title="Estado" value="Reserva completada" detail="Sin movimientos posteriores" />
                  <InfoCard title="Siguiente paso" value="Marta pendiente / opcional" detail="Enriquecimiento posterior del expediente." />
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-blue-100 bg-white/70 p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Identificadores y origen</div>
                <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700 md:grid-cols-2 xl:grid-cols-5">
                  <div><span className="font-black text-slate-950">Reservation ID:</span> {selectedLiveExpediente.reservationId}</div>
                  <div><span className="font-black text-slate-950">Expediente ID:</span> {selectedLiveExpediente.expedienteId}</div>
                  <div><span className="font-black text-slate-950">Fecha y hora:</span> {formatDemoDateTime(selectedLiveExpediente.receivedAt)}</div>
                  <div><span className="font-black text-slate-950">Origen:</span> {selectedLiveExpediente.sourceApplication}</div>
                  <div><span className="font-black text-slate-950">Canal:</span> {selectedLiveExpediente.sourceChannel}</div>
                  <div><span className="font-black text-slate-950">Tipo:</span> {selectedLiveExpediente.selectedUnit.propertyType}</div>
                  <div><span className="font-black text-slate-950">Sector:</span> {selectedLiveExpediente.selectedUnit.sector || "No informado"}</div>
                  <div><span className="font-black text-slate-950">Torre o manzana:</span> {selectedLiveExpediente.selectedUnit.towerOrBlock || "No informado"}</div>
                  <div><span className="font-black text-slate-950">Nivel:</span> {selectedLiveExpediente.selectedUnit.level || "No informado"}</div>
                  <div><span className="font-black text-slate-950">Modelo:</span> {selectedLiveExpediente.selectedUnit.model || "No informado"}</div>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-blue-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                Todavía no existen movimientos posteriores. Marta y otras aplicaciones podrán enriquecer este expediente después.
              </div>
            </Card>
          ) : hasDetailedDemoFile ? (
            <DemoLiveFileMovementsPanel client={selectedAdminClient} />
          ) : (
            <Card className="border-dashed border-slate-200 bg-slate-50">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <Badge tone="amber">Fixture/local demo</Badge>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">Expediente sin movimientos detallados</h2>
                  <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
                    Este fixture no tiene todavía movimientos simulados detallados asociados.
                  </p>
                </div>
                <Badge tone="dark">{selectedAdminClient.reservation_id}</Badge>
              </div>
            </Card>
          )}

          {hasDetailedDemoFile && (
            <>
      <Card>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-950 text-4xl font-black text-white">{profile.cliente.initials}</div>
            <div>
              <h2 className="text-3xl font-black text-slate-950">Expediente demo detallado · Carlos Méndez</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.cliente.badges.map((badge) => <Badge key={badge.label} tone={badge.tone}>{badge.label}</Badge>)}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <InfoCard title="H - OperIA ID" value={profile.cliente.amenaId} detail="Identificador único del expediente comercial y operativo." />
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
            <p className="text-base font-semibold text-slate-700">Marta acompaña conversaciones, H - OperIA Intelligence interpreta señales y la vendedora valida el siguiente paso.</p>
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
            </>
          )}
        </>
      )}
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

function ConstructionPage({ demoFindings = [], setActive }) {
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="construction" />;
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
      {demoEvidenceMirror}
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

function DocumentsPage({ demoFindings = [], setActive }) {
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="documents" />;
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
      <PageHeader title="Documentos del Cliente" subtitle="Gestión documental desde visión general hasta microdetalle: Marta acompaña solicitudes y aclaraciones; H - OperIA Intelligence analiza fricciones, vencimientos y prioridades; el equipo valida cada acción." icon={FileText} sync={martaSync.documents} badges={[REPORT_DATE, "Lectura H - OperIA Intelligence", "Checklist operativo"]} syncNote="Este porcentaje combina el acompañamiento de Marta en solicitudes y aclaraciones documentales con la lectura de H - OperIA Intelligence para que ventas, financiera y legal revisen, decidan y ejecuten próximos pasos." />
      {demoEvidenceMirror}
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
          <SimpleTable columns={["Documento", "Cantidad / estado", "Formato", "Observación H - OperIA Intelligence", "Acción vendedora", "Evidencia"]} rows={[
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
          { title: "Carlos Méndez", text: "DUI recibido, constancia laboral pendiente y comprobante parcial. H - OperIA Intelligence sugiere llamada breve; Marta puede apoyar el checklist por WhatsApp.", badge: "Prioridad alta", tone: "red" },
          { title: "Ana López", text: "Documentos completos, pendiente validación financiera. No requiere presión comercial en este momento.", badge: "Validar", tone: "blue" },
        ]} />
        <AiObservation>
          <p>La gestión documental debe enseñar al equipo dónde se atasca el cliente. Marta acompaña la solicitud; H - OperIA Intelligence explica fricción, prioridad, texto sugerido, escalamiento e impacto sobre la formalización.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function PaymentsPage({ demoFindings = [], setActive }) {
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="payments" />;
  return (
    <div className="space-y-5">
      <PageHeader title="Pagos y Compromisos" subtitle="Control del período desde la reserva hasta la entrega: ingresos recibidos, pendientes, atrasos, justificaciones, compromisos, evidencia y prioridades financieras sugeridas por H - OperIA Intelligence." icon={CreditCard} sync={martaSync.payments} badges={[REPORT_DATE, "Reserva a entrega", "Revisión humana"]} syncNote="Este porcentaje muestra qué tanto H - OperIA Intelligence cruza pagos, compromisos, atrasos, justificaciones y evidencias para sugerir prioridades de seguimiento financiero que el equipo revisa, decide y ejecuta." />
      {demoEvidenceMirror}
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

function ServicePage({ demoFindings = [], setActive }) {
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
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="service" />;

  return (
    <div className="space-y-5">
      <PageHeader title="Servicio al Cliente" subtitle="Tickets, incidencias, garantías, acuerdos, tiempos de atención, reclamos, consultas, escalaciones y aprendizaje operativo para directores y vendedoras." icon={Headphones} sync={martaSync.service} badges={[REPORT_DATE, "Tiempos de atención", "Escalaciones"]} syncNote="Este porcentaje combina el apoyo de Marta en respuestas y seguimiento al cliente con la lectura de H - OperIA Intelligence para ordenar tickets, escalaciones y aprendizajes repetidos." />
      {demoEvidenceMirror}
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
        <AiObservation title="Aprendizajes operativos de H - OperIA Intelligence">
          <p>Los tickets no deben verse solo como reclamos. Son señales de aprendizaje. Si varios clientes preguntan lo mismo, la empresa debe convertirlo en guion, PDF, respuesta estándar o mejora del reporte semanal.</p>
          <p className="mt-3">H - OperIA Intelligence recomienda explicar internamente cada escalación con pedagogía: qué pasó, por qué importa, cómo responder y qué debe aprender ventas para la próxima conversación.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function SellersPage({ demoFindings = [], setActive }) {
  const demoEvidenceMirror = <AdminOperationalEvidenceAnchors demoFindings={demoFindings} targetPage="sellers" />;

  return (
    <div className="space-y-5">
      <PageHeader title="Gestión de Vendedoras" subtitle="Mapa de apoyo comercial por vendedora: seguimiento, uso del acompañamiento Marta, formularios completados, calidad de información capturada y sugerencias para fortalecer al equipo." icon={Users} sync={martaSync.sellers} badges={[REPORT_DATE, "General → vendedora → formulario", "Acompañamiento"]} syncNote="Este porcentaje mide cómo H - OperIA Intelligence usa formularios, señales comerciales, seguimientos y resultados para detectar necesidades de apoyo, elevar capacidades humanas y dejar la decisión en manos del equipo comercial." />
      {demoEvidenceMirror}
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
            <InfoCard title="Sugerencia H - OperIA Intelligence" value="Priorizar casos financieros" detail="Atender primero clientes con compromisos en 72h." />
            <InfoCard title="Seguimiento vendedora" value="En proceso" detail="Campo para que la vendedora confirme qué hizo con la sugerencia asistida." />
          </div>
        </Card>
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Formularios operativos de vendedoras</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">La información no termina en la reserva. Cada contacto posterior genera datos personales, familiares, económicos y comerciales que deben alimentar el expediente y H - OperIA Intelligence.</p>
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
        <p className="mt-3">H - OperIA Intelligence ayuda a observar hábitos: registrar información, usar recomendaciones, completar llamadas, documentar objeciones y convertir conversaciones dispersas en inteligencia accionable.</p>
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
        modeloA: { title: "Campaña Instagram · Modelo A", result: "Alta atracción / formalización baja", diagnosis: "El anuncio promete vida premium, pero el flujo posterior no filtra capacidad financiera ni urgencia real.", action: "Agregar pregunta de presupuesto, CTA a simulación y retargeting a clientes que abrieron PDF.", marta: "H - OperIA Intelligence detecta una señal temprana: volumen alto que puede saturar vendedoras si no se filtra intención y capacidad desde el primer contacto." },
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
      <PageHeader title="Canales y Campañas" subtitle="Radiografía por canal y campaña: H - OperIA Intelligence analiza promesas, calidad de lead, conversión y señales tempranas para que Marketing y Ventas decidan qué ajustar." icon={Megaphone} sync={martaSync.campaigns} badges={[REPORT_DATE, "Canales → campañas → análisis", "Recomendaciones"]} syncNote="Este porcentaje refleja qué tanto H - OperIA Intelligence analiza canales, campañas, promesas, calidad de lead, conversión y señales tempranas para orientar decisiones comerciales revisadas por el equipo humano." />
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
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{selectedChannelData.summary} Selecciona una campaña para abrir diagnóstico, lectura de H - OperIA Intelligence y acciones que el equipo puede revisar y ejecutar.</p>
          </div>
          <Badge tone="blue">Canal → campañas → lupa operativa</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(selectedChannelData.campaigns as Record<string, { title: string; result: string; diagnosis: string; action: string; marta: string }>).map(([key, campaign]) => <DrillButton key={key} active={selectedCampaign === key} onClick={() => setSelectedCampaign(key)}>{campaign.title}</DrillButton>)}
        </div>
        <div className="mt-5"><CampaignCard title={currentCampaign.title} result={currentCampaign.result} diagnosis={currentCampaign.diagnosis} action={currentCampaign.action} /></div>
        <div className="mt-5 rounded-3xl border border-violet-100 bg-violet-50 p-5 text-base font-semibold leading-8 text-slate-800"><span className="font-black text-slate-950">Comentario de H - OperIA Intelligence:</span> {currentCampaign.marta}</div>
      </Card>
      <AiObservation>
        <p>H - OperIA Intelligence recomienda analizar campañas como sistemas completos: promesa del anuncio, calidad del lead, respuesta inicial, conversación con vendedora, documentación, pagos e ingresos reales.</p>
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
        <Metric title="Respuestas esperadas" value="18%" note="Estimación H - OperIA Intelligence" tone="amber" icon={Bot} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Carga de base de datos</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Se carga un Excel con nombre, teléfono, correo, fuente, interés, presupuesto estimado y notas. H - OperIA Intelligence valida duplicados, campos faltantes y señales de baja calidad antes de que el equipo apruebe el envío.</p>
          <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <UploadCloud className="mx-auto text-slate-600" size={42} />
            <h4 className="mt-4 text-2xl font-black text-slate-950">Subir archivo Excel</h4>
            <p className="mt-2 text-base font-semibold text-slate-700">Clientes potenciales · XLSX / CSV · Validación previa al envío.</p>
          </div>
          <div className="mt-5"><SimpleTable columns={["Campo", "Estado", "Comentario H - OperIA Intelligence"]} rows={[["Teléfono", "94% válido", "Normalizar formato +503"], ["Correo", "87% válido", "132 registros sin correo"], ["Interés", "72% clasificado", "Falta categorizar 350 prospectos"], ["Fuente", "Completa", "Lista para atribución de campaña"]]} /></div>
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
    reserva: { title: "Embudo de pre-reserva a formalización", stages: [["Lead interesado", "Origen: campaña, referido o Reservas del proyecto", "Asignar vendedora y registrar fuente"], ["Pre-reserva", "Unidad seleccionada", "Enviar confirmación y próximos pasos"], ["Documentos", "Checklist en proceso", "H - OperIA Intelligence detecta faltantes"], ["Pago", "Prima / gastos legales", "Seguimiento financiero"], ["Formalización", "Validación interna", "Cierre operativo"]] },
    reactivacion: { title: "Embudo de reactivación de prospectos", stages: [["Base histórica", "Excel o expediente operacional", "Limpiar datos"], ["Campaña", "WhatsApp, email o voz", "Medir respuesta"], ["Interés renovado", "Cliente responde", "Crear tarea"], ["Reserva potencial", "Explora unidad", "Agendar llamada"], ["Cierre", "Seguimiento humano", "Medir conversión"]] },
    referidos: { title: "Embudo de referidos", stages: [["Comprador actual", "Cliente satisfecho", "Solicitar referido"], ["Referido recibido", "Alta confianza", "Contacto rápido"], ["Exploración", "Unidad sugerida", "Mostrar avance y evidencia"], ["Pre-reserva", "Decisión más rápida", "Acompañamiento Marta"], ["Formalización", "Cierre con menor fricción", "Registrar aprendizaje"]] },
  };
  const current = funnels[selectedFunnel];
  return (
    <div className="space-y-5">
      <PageHeader title="Archivo de Embudos de Ventas" subtitle="Biblioteca operativa para guardar, consultar y reutilizar embudos que convierten campañas, reservas, reactivaciones y referidos en aprendizaje comercial accionable." icon={Layers3} sync={martaSync.funnels} badges={[REPORT_DATE, "Plantillas reutilizables", "Aprendizaje comercial"]} syncNote="Este porcentaje indica qué tanto H - OperIA Intelligence conserva patrones, etapas, mensajes, criterios de avance y aprendizajes para que el equipo decida qué repetir, ajustar o descartar." />
      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Embudos guardados" value="12" note="Plantillas operativas" tone="blue" icon={Layers3} />
        <Metric title="Más efectivo" value="Referidos" note="Mayor conversión" tone="green" icon={Users} />
        <Metric title="En revisión" value="3" note="Requieren ajuste H - OperIA Intelligence" tone="amber" icon={Bot} />
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
        <p>H - OperIA Intelligence recomienda guardar los embudos como activos comerciales reutilizables. Cada campaña exitosa debe dejar una plantilla: etapas, mensajes, criterios de avance, responsables, métricas y aprendizajes para futuras ejecuciones.</p>
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
      <PageHeader title="Tableros Ejecutivos" subtitle="Tableros base, consultas ejecutivas por texto o voz y respuestas visuales con lupa por canal, modelo, sector o equipo comercial para decidir con contexto, no con vigilancia." icon={BarChart3} sync={martaSync.dashboards} badges={[REPORT_DATE, "Tableros base", "Texto y voz"]} syncNote="Este porcentaje muestra qué tanto H - OperIA Intelligence desagrega preguntas ejecutivas, cruza métricas, detecta riesgos y presenta contexto para que la dirección revise, decida y ejecute con mayor claridad." />
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
              <h4 className="text-xl font-black text-slate-950">Desglose propuesto por H - OperIA Intelligence</h4>
              <p className="mt-3 text-base font-semibold leading-8 text-slate-800">H - OperIA Intelligence descompone la pregunta ejecutiva para revisar ingresos, conversión, acompañamiento humano y riesgos operativos antes de generar una conclusión. Puede modificar, eliminar o aceptar cada desglose antes de enviarlo.</p>
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
            <h4 className="text-xl font-black text-slate-950">Respuestas generadas por H - OperIA Intelligence</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Texto ejecutivo", "Cuadros comparativos", "Dashboard", "PDF descargable", "Imagen ejecutiva"].map((format) => <Badge key={format} tone="violet">{format}</Badge>)}
            </div>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-800">Al enviar los desgloses seleccionados, H - OperIA Intelligence generará una conclusión ejecutiva en los formatos disponibles.</p>
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
          <p className="mt-3">Al hacer lupa en Instagram, H - OperIA Intelligence debe mostrar campañas concretas, ejemplos de promesas débiles, casos referenciales y acciones para mejorar segmentación, filtro financiero y seguimiento.</p>
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

function DemoPage({
  demoContext,
  demoFindings = [],
  demoCommandEvidenceState = null,
  activeDemoSession = null,
  residualDemoSession = null,
  demoSessionStatus = "idle",
  demoSessionNotice = null,
  demoSessionResetToken = 0,
  demoParticipantStatuses = demoParticipantDefaults,
  liveExpediente = null,
  liveExpedientes = [],
  selectedLiveExpedienteReservationId = null,
  onStartDemoSession,
  onFinalizeDemoSession,
  onDemoContextInjected,
  onDemoFindingsInjected,
  onDemoCommandEvidenceStateChange,
  onOpenPublicReservation,
  onOpenOperationalCase,
  setActive,
}) {
  const phases = [
    { title: "FASE 01", name: "Reserva en vivo y validación operacional", text: "La reserva crea el cliente operacional y selecciona la unidad que dará origen al resto del ciclo.", nextStep: "validar cliente, unidad, fuente, estado y evidencia visible." },
    { title: "FASE 02", name: "Marta · Acompañamiento Multicanal", text: "Marta acompaña por voz o texto y registra cada interacción como dato estructurado para evidencia, seguimiento e inteligencia.", nextStep: "revisar por separado Marta Voz / Vapi y Marta WhatsApp / Texto." },
    { title: "FASE 03", name: "Coordinación y Seguimiento Operacional", text: "Aportes humanos posteriores a la reserva, provenientes del seguimiento comercial y de la coordinación del equipo.", nextStep: "revisar las capas de seguimiento comercial y mensajería operacional del equipo." },
    { title: "FASE 04", name: "Centro de Mando y Evidencia de la Operación", text: "Configuraremos, auditaremos, regeneraremos y cargaremos localmente datos simulados para una corrida demo no persistida.", nextStep: "validar cantidades, calidad, trazabilidad y evidencia de la corrida demo local." },
    { title: "FASE 05", name: "H - OperIA Intelligence", text: "Transformaremos la operación ampliada en impactos visibles, riesgos, oportunidades, prioridades y recomendaciones.", nextStep: "cargar Empresa Demo y revisar los impactos generados por la operación." },
    { title: "FASE 06", name: "Cierre ejecutivo futuro", text: "Capacidad futura y no operativa: referencia conceptual sin consulta de fuentes reales, sin generación de decisiones operativas y sin persistencia.", nextStep: "conservar la referencia de producto sin presentarla como una capacidad disponible." },
  ];
  const emptyVolunteer = { name: "", role: "", company: "", whatsapp: "", email: "" };
  const baseVolunteer = { name: "Andrea López", role: "Gerente comercial", company: "Proyecto de Empresa Demo", whatsapp: "+503 7000-0000", email: "andrea@empresa.com", whatsappStatus: "Pendiente", emailStatus: "Pendiente", reservationStarted: "Pendiente", reservationCompleted: "Pendiente", finished: "No" };
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
  const createEvidenceClients = (demoRunId) => {
    const scopedLiveExpedientes = liveExpedientes.filter((expediente) => expediente.demoRunId === demoRunId);
    const principal = scopedLiveExpedientes.find(
      (expediente) => expediente.reservationId === selectedLiveExpedienteReservationId,
    );
    const orderedLiveExpedientes = principal
      ? [principal, ...scopedLiveExpedientes.filter((expediente) => expediente.reservationId !== principal.reservationId)]
      : scopedLiveExpedientes;
    const liveEvidenceClients = orderedLiveExpedientes.map((expediente) => ({
      id: expediente.reservationId,
      demoRunId,
      reservationId: expediente.reservationId,
      expedienteId: expediente.expedienteId,
      name: `${expediente.client.firstName} ${expediente.client.lastName}`.trim(),
      phone: expediente.client.phone,
      email: expediente.client.email,
      unit: [
        expediente.selectedUnit.sector,
        expediente.selectedUnit.towerOrBlock,
        expediente.selectedUnit.level,
        expediente.selectedUnit.model,
        expediente.selectedUnit.unitOrLot,
      ].filter(Boolean).join(" · "),
      propertyType: expediente.selectedUnit.propertyType,
      sector: expediente.selectedUnit.sector,
      towerOrBlock: expediente.selectedUnit.towerOrBlock,
      level: expediente.selectedUnit.level,
      model: expediente.selectedUnit.model,
      source: `${expediente.sourceApplication} · ${expediente.sourceChannel}`,
      reservationStatus: "Completada",
      createdAt: expediente.receivedAt,
    }));
    const fixtureClients = createSimulatedReservationClients(demoRunId);
    return [...liveEvidenceClients, ...fixtureClients];
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
  const createSimulatedOperationalEvidence = (demoRunId, clients, messages, reports, signals, vapiLogs, whatsappFollowups) => [
    { id: "sim-evidence-01", demoRunId, page: "Aplicacion de Reservas", section: "Clientes/reservas", summary: `${clients.length} registros de reserva simulados`, status: clients.length ? "Visible" : "Sin registros" },
    { id: "sim-evidence-02", demoRunId, page: "Mensajería Operacional del Equipo", section: "Coordinacion interna", summary: `${messages.length} mensajes internos asociados a clientes`, status: messages.length ? "Visible" : "Sin registros" },
    { id: "sim-evidence-03", demoRunId, page: "Seguimiento Comercial de Vendedoras", section: "Reportes humanos", summary: `${reports.length} reportes de interacciones posteriores`, status: reports.length ? "Visible" : "Sin registros" },
    { id: "sim-evidence-04", demoRunId, page: "Marta Voz / Vapi", section: "Logs de llamadas", summary: `${vapiLogs.length} logs de voz simulados con salida estructurada`, status: vapiLogs.length ? "Visible" : "Sin registros" },
    { id: "sim-evidence-05", demoRunId, page: "Marta WhatsApp Texto", section: "Seguimientos conversacionales", summary: `${whatsappFollowups.length} seguimientos de texto simulados`, status: whatsappFollowups.length ? "Visible" : "Sin registros" },
    { id: "sim-evidence-06", demoRunId, page: "H - OperIA Intelligence", section: "Senales derivadas", summary: `${signals.length} senales ejecutivas generadas`, status: signals.length ? "Generado" : "Sin hallazgos" },
  ].filter((item) => item.status !== "Sin registros" && item.status !== "Sin hallazgos");
  const [activePhase, setActivePhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [volunteerForm, setVolunteerForm] = useState(emptyVolunteer);
  const [volunteers, setVolunteers] = useState([baseVolunteer]);
  const [selectedPhone, setSelectedPhone] = useState(baseVolunteer.whatsapp);
  const [reservationStatus, setReservationStatus] = useState({ reservation: "Pendiente", whatsapp: "Pendiente", email: "Pendiente", evidence: "Pendiente" });
  const [deliveryEvidence, setDeliveryEvidence] = useState([]);
  const [visibleSendStatus, setVisibleSendStatus] = useState({ whatsappStatus: "Pendiente", emailStatus: "Pendiente" });
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
  const [isSimulatedRunDataOpen, setIsSimulatedRunDataOpen] = useState(false);
  const [selectedSimulatedRunDataCategory, setSelectedSimulatedRunDataCategory] = useState<"reservations" | "vapi" | "sellerReports" | "messages">("reservations");
  const [executiveQuery, setExecutiveQuery] = useState("");
  const [executiveQuestions, setExecutiveQuestions] = useState(["¿Qué canal genera más ingresos netos y menos atrasos?", "¿Qué campañas generan leads de baja calidad?"]);
  const [executiveBreakdown, setExecutiveBreakdown] = useState("Ingresos netos por canal y campaña\nConversión por modelo, sector y unidad\nAcompañamiento del equipo y uso de Marta\nRiesgos financieros, documentales y de escrituración");
  const [selectedBreakdowns, setSelectedBreakdowns] = useState(["Ingresos netos por canal y campaña", "Riesgos financieros, documentales y de escrituración"]);
  const [executiveResponseReady, setExecutiveResponseReady] = useState(false);
  const phaseSectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const publicReservationUrl = parseUrlSafely(PUBLIC_RESERVATION_APP_URL);
  const currentAdminUrl = typeof window !== "undefined" ? new URL(window.location.href) : null;
  const localHosts = ["localhost", "127.0.0.1"];
  const publicReservationConfigured = isConfiguredFromEnv("VITE_PUBLIC_RESERVATION_APP_URL");
  const demoBackendConfigured = isConfiguredFromEnv("VITE_DEMO_BACKEND_URL");
  const publicReservationUrlIsPublic = isPublicHttpsUrl(PUBLIC_RESERVATION_APP_URL);
  const demoBackendUrlIsPublic = isPublicHttpsUrl(DEMO_BACKEND_URL);
  const publicReservationBridgeDisabled =
    currentAdminUrl !== null &&
    publicReservationUrl !== null &&
    (currentAdminUrl.origin === publicReservationUrl.origin ||
      (localHosts.includes(currentAdminUrl.hostname) &&
        localHosts.includes(publicReservationUrl.hostname) &&
        currentAdminUrl.port === publicReservationUrl.port));
  const statusTone = { Pendiente: "amber", Preparado: "amber", Activa: "blue", Completada: "green", Enviando: "blue", "Solicitud enviada": "blue", "Proveedor acepto": "green", Error: "red", Confirmado: "green", Abierto: "green", Validada: "green", Generada: "green", Generado: "green", Verificado: "green", Visible: "green", No: "slate", Finalizado: "green", Alta: "red", Media: "amber", Baja: "green", "En revisión": "amber", "Logs verificados": "green", "Conversación pendiente": "amber", "Conversación en curso": "blue", "Conversación analizada": "green" };
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
    construction: "Inventario / Construcción",
    documents: "Documentos",
    payments: "Finanzas / Pagos",
    service: "Servicio Cliente",
    sellers: "Ventas / Vendedoras",
    campaigns: "Marketing / Canales",
    campaignDelivery: "Campañas",
    funnels: "Embudos",
    dashboards: "Inteligencia Operativa",
  };
  const demoFindingSourceLabels = {
    reservations: "Reservas",
    marta_voice_vapi: "Marta Voz / VAPI",
    marta_text_whatsapp: "Marta WhatsApp / Texto",
    commercial_follow_up: "Seguimiento Comercial de Vendedoras",
    team_messages: "Mensajería Operacional del Equipo",
    documents: "Documentos",
    payments: "Finanzas / Pagos",
    customer_service: "Servicio Cliente",
    h_operia_intelligence: "H - OperIA Intelligence",
    manual_demo: "Demo manual",
  };
  const demoFindingSeverityLabels = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    critical: "Crítica",
  };
  const demoFindingSeverityTone = {
    low: "green",
    medium: "amber",
    high: "red",
    critical: "red",
  };
  const demoVisibleStatusLabels = {
    pending: "Pendiente de verificación",
    visible: "Visible",
    acknowledged: "Revisado",
    hidden: "Oculto",
  };
  const progress = Math.round((completedPhases.length / phases.length) * 100);
  const hasActiveLiveReservation = Boolean(activeDemoSession && liveExpedientes.length > 0);
  const latestLiveExpediente = liveExpedientes[liveExpedientes.length - 1] || null;
  const sessionHeading = demoSessionStatus === "blocked"
    ? "Sesión bloqueada"
    : demoSessionStatus === "preparing"
      ? "Preparando demostración"
      : activeDemoSession
        ? "Demostración en curso"
        : "Sin sesión activa";
  const phaseOneStatus = demoSessionStatus === "blocked"
    ? "Pendiente de limpieza de corrida anterior"
    : !activeDemoSession
      ? "Disponible al iniciar sesión"
      : hasActiveLiveReservation
        ? "Reserva recibida"
        : "Esperando reserva";
  const hasSessionEvidence = Boolean(activeDemoSession);
  const selectedVolunteer = volunteers.find((item) => item.whatsapp === selectedPhone) || volunteers[0] || baseVolunteer;
  const liveSnapshot = liveExpediente || null;
  const liveSelectedUnit = liveSnapshot?.selectedUnit || null;
  const liveClientName = liveSnapshot ? `${liveSnapshot.client.firstName} ${liveSnapshot.client.lastName}`.trim() : selectedVolunteer.name;
  const liveLevelAndModel = liveSelectedUnit ? [liveSelectedUnit.level, liveSelectedUnit.model].filter(Boolean).join(" · ") : "";
  const simulatedDataInjected = activeDemoContext?.status === "injected";
  const activeSimulatedDemoRunId = simulatedDataInjected ? activeDemoContext?.demoRunId || null : null;
  const activeSimulatedReservationClients = activeSimulatedDemoRunId
    ? simulatedReservationClients.filter((record) => record.demoRunId === activeSimulatedDemoRunId)
    : [];
  const activeSimulatedVapiCallLogs = activeSimulatedDemoRunId
    ? simulatedVapiCallLogs.filter((record) => record.demoRunId === activeSimulatedDemoRunId)
    : [];
  const activeSimulatedSellerReports = activeSimulatedDemoRunId
    ? simulatedSellerReports.filter((record) => record.demoRunId === activeSimulatedDemoRunId)
    : [];
  const activeSimulatedInternalMessages = activeSimulatedDemoRunId
    ? simulatedInternalMessages.filter((record) => record.demoRunId === activeSimulatedDemoRunId)
    : [];
  const simulatedRunDataCategories = [
    { id: "reservations" as const, label: "Gestión de Reservas", records: activeSimulatedReservationClients },
    { id: "vapi" as const, label: "Marta Voz / VAPI", records: activeSimulatedVapiCallLogs },
    { id: "sellerReports" as const, label: "Registro Comercial", records: activeSimulatedSellerReports },
    { id: "messages" as const, label: "Mensajes entre el Equipo", records: activeSimulatedInternalMessages },
  ];
  const selectedSimulatedRunData = simulatedRunDataCategories.find((category) => category.id === selectedSimulatedRunDataCategory) || simulatedRunDataCategories[0];
  const formatSimulatedRecordTime = (value): string | null => {
    if (typeof value !== "string" || !value.trim()) return null;
    const normalizedValue = value.trim();
    if (/^(hoy|mañana|manana|ayer|hace|recientemente|esta mañana|esta manana|esta tarde)\b/i.test(normalizedValue)) {
      return normalizedValue;
    }
    if (!/^\d{4}-\d{2}-\d{2}T/.test(normalizedValue)) return null;
    const date = new Date(normalizedValue);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("es-GT", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };
  const reservationExecutiveSummary = (client) => [
    client.name ? `${client.name} figura en la evidencia de reservas de esta corrida.` : "Registro de reserva incorporado a esta corrida.",
    client.unit ? `Unidad: ${client.unit}.` : null,
    client.reservationStatus ? `Estado: ${client.reservationStatus}.` : null,
    client.source ? `Origen: ${client.source}.` : null,
  ].filter(Boolean).join(" ");
  const vapiExecutiveSummary = (log) => [
    log.clientName && log.assistantName ? `${log.clientName} conversó con ${log.assistantName}.` : "Se registró una llamada en esta corrida.",
    log.detectedIntent ? `Tema: ${log.detectedIntent}.` : null,
    log.riskSignal ? `Riesgo: ${log.riskSignal}.` : null,
    log.nextStep ? `Siguiente paso: ${log.nextStep}.` : null,
  ].filter(Boolean).join(" ");
  const sellerReportExecutiveSummary = (report) => [
    report.clientName ? `${report.clientName} registra seguimiento comercial.` : "Se registró seguimiento comercial.",
    report.interactionType ? `Interacción: ${report.interactionType}.` : null,
    report.detectedNeed ? `Necesidad: ${report.detectedNeed}.` : null,
    report.objection ? `Objeción: ${report.objection}.` : null,
    report.sellerName ? `Responsable: ${report.sellerName}.` : null,
    report.nextStep ? `Siguiente paso: ${report.nextStep}.` : null,
  ].filter(Boolean).join(" ");
  const hasSimulatedReservations = simulatedDataInjected && simulatedReservationClients.length > 0;
  const hasSimulatedInternalMessages = simulatedDataInjected && simulatedInternalMessages.length > 0;
  const hasSimulatedSellerReports = simulatedDataInjected && simulatedSellerReports.length > 0;
  const hasSimulatedVapiCallLogs = simulatedDataInjected && simulatedVapiCallLogs.length > 0;
  const hasSimulatedMartaWhatsAppFollowups = simulatedDataInjected && simulatedMartaWhatsAppFollowups.length > 0;
  const hasAnySimulatedEvidence = hasSimulatedReservations || hasSimulatedInternalMessages || hasSimulatedSellerReports || hasSimulatedVapiCallLogs || hasSimulatedMartaWhatsAppFollowups;
  const effectiveDemoContext = activeDemoContext || demoContext;
  const phaseFiveFindings = simulatedIntelligenceSignals.length
    ? simulatedIntelligenceSignals
    : demoFindings;
  const phaseFiveHasFindings = phaseFiveFindings.length > 0;
  const phaseFiveDemoActive = phaseFiveHasFindings;
  const demoRunIdShort = effectiveDemoContext ? effectiveDemoContext.demoRunId.replace("demo-", "").slice(0, 8) : "Sin demo activa";
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
  useEffect(() => {
    if (demoSessionResetToken === 0) return;
    setActivePhase(0);
    setCompletedPhases([]);
    setVolunteerForm(emptyVolunteer);
    setVolunteers([baseVolunteer]);
    setSelectedPhone(baseVolunteer.whatsapp);
    resetDemoEvidence();
    setMartaStatus("Conversación pendiente");
    setVapiStatus("Pendiente");
    setActiveDemoContext(null);
    setSimulatedReservationClients([]);
    setSimulatedInternalMessages([]);
    setSimulatedSellerReports([]);
    setSimulatedVapiCallLogs([]);
    setSimulatedMartaWhatsAppFollowups([]);
    setSimulatedIntelligenceSignals([]);
    setSimulatedOperationalEvidence([]);
    setExecutiveQuery("");
    setExecutiveQuestions(["¿Qué canal genera más ingresos netos y menos atrasos?", "¿Qué campañas generan leads de baja calidad?"]);
    setExecutiveBreakdown("Ingresos netos por canal y campaña\nConversión por modelo, sector y unidad\nAcompañamiento del equipo y uso de Marta\nRiesgos financieros, documentales y de escrituración");
    setSelectedBreakdowns(["Ingresos netos por canal y campaña", "Riesgos financieros, documentales y de escrituración"]);
    setExecutiveResponseReady(false);
  }, [demoSessionResetToken]);
  useEffect(() => {
    setIsSimulatedRunDataOpen(false);
    setSelectedSimulatedRunDataCategory("reservations");
  }, [activeSimulatedDemoRunId, demoSessionResetToken]);
  const phaseStatus = (index) => index === 0
    ? phaseOneStatus
    : completedPhases.includes(index)
      ? "Completada"
      : activePhase === index
        ? "Activa"
        : "Pendiente";
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
    if (finding?.adminTargetAnchor) {
      window.setTimeout(() => {
        document.getElementById(finding.adminTargetAnchor)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
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
  const demoLink = () => PUBLIC_RESERVATION_APP_URL;
  const addDeliveryEvidence = (entry) => {
    const time = new Date().toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setDeliveryEvidence((current) => [{ ...entry, time }, ...current].slice(0, 6));
  };
  const sendDemoLink = async (channel) => {
    const isWhatsApp = channel === "whatsapp";
    if (!isWhatsApp) {
      addDeliveryEvidence({
        channel: "Email",
        endpoint: "No activo",
        recipient: volunteerForm.email.trim() || "Sin destinatario",
        link: demoLink(),
        result: "Correo fuera del Paquete 1 de DEMO-0002 Caso 1",
      });
      return;
    }
    const endpointPath = isWhatsApp ? "/send-whatsapp" : "/send-email";
    const endpoint = `${DEMO_BACKEND_URL}${endpointPath}`;
    const statusField = isWhatsApp ? "whatsappStatus" : "emailStatus";
    const formVolunteer = {
      name: volunteerForm.name.trim(),
      whatsapp: normalizeSalvadoranPhone(volunteerForm.whatsapp),
      email: volunteerForm.email.trim(),
    };
    const recipient = isWhatsApp ? formVolunteer.whatsapp : formVolunteer.email;
    const registeredVolunteer = volunteers.some(
      (item) => item.whatsapp === formVolunteer.whatsapp && item.name.trim() === formVolunteer.name,
    );
    const publicConfigurationReady =
      publicReservationConfigured &&
      demoBackendConfigured &&
      publicReservationUrlIsPublic &&
      demoBackendUrlIsPublic;

    if (!recipient) {
      updateVisibleSendStatus(statusField, "Error", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient: "Sin destinatario",
        link: demoLink(),
        result: "Error: falta destinatario",
      });
      return;
    }

    if (!registeredVolunteer || !publicConfigurationReady) {
      updateVisibleSendStatus(statusField, "Error", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: "WhatsApp",
        endpoint,
        recipient,
        link: demoLink(),
        result: !registeredVolunteer
          ? "Error: voluntario no registrado"
          : "Preparado, bloqueado por configuracion publica pendiente",
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
      const result = await response.json();

      const nextStatus = result.status === "provider_accepted" ? "Proveedor acepto" : "Solicitud enviada";
      updateVisibleSendStatus(statusField, nextStatus, formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient,
        link: demoLink(),
        providerMessageId: result.provider_message_id,
        result:
          result.status === "provider_accepted"
            ? `Proveedor acepto · HTTP ${response.status}`
            : `Solicitud enviada al backend · HTTP ${response.status}`,
      });
    } catch (error) {
      updateVisibleSendStatus(statusField, "Error", formVolunteer.whatsapp || formVolunteer.email);
      addDeliveryEvidence({
        channel: isWhatsApp ? "WhatsApp" : "Email",
        endpoint,
        recipient,
        link: demoLink(),
        result: `Error: ${error instanceof Error ? error.message : "No se pudo contactar el backend"}`,
      });
    }
  };
  const finishVolunteer = () => {
    updateVolunteerStatus("finished", "Finalizado");
    setVolunteerForm(emptyVolunteer);
    resetDemoEvidence();
  };
  const normalizedVolunteerPhone = normalizeSalvadoranPhone(volunteerForm.whatsapp);
  const whatsappVolunteerRegistered = volunteers.some(
    (item) => item.whatsapp === normalizedVolunteerPhone && item.name.trim() === volunteerForm.name.trim(),
  );
  const caseOneWhatsappReady =
    whatsappVolunteerRegistered &&
    Boolean(normalizedVolunteerPhone) &&
    publicReservationConfigured &&
    demoBackendConfigured &&
    publicReservationUrlIsPublic &&
    demoBackendUrlIsPublic;
  const validateReservation = () => setReservationStatus({ reservation: "Validada", whatsapp: selectedVolunteer.whatsappStatus === "Proveedor acepto" ? "Confirmado" : "Pendiente", email: selectedVolunteer.emailStatus === "Enviado" ? "Confirmado" : "Pendiente", evidence: "Generada" });
  const simulateMartaConversation = () => {
    setMartaStatus("Conversación en curso");
    setVapiStatus("Pendiente");
  };
  const openVapi = () => {
    setMartaStatus("Conversación analizada");
    setVapiStatus("Abierto");
  };
  const injectSimulatedData = (quantities: {
    reservations: number;
    messages: number;
    sellerReports: number;
    vapiLogs: number;
    prospectCompanyName?: string;
    projectName?: string;
    scenarioName?: string;
  } = { reservations: 20, messages: 20, sellerReports: 20, vapiLogs: 20 }) => {
    if (!activeDemoSession) return;
    const nextDemoRunId = activeDemoSession.demoRunId;
    const evidenceClients = createEvidenceClients(nextDemoRunId);
    const nextReservationClients = evidenceClients.slice(0, quantities.reservations);
    const nextInternalMessages = createSimulatedInternalMessages(nextDemoRunId, evidenceClients).slice(0, quantities.messages);
    const nextSellerReports = createSimulatedSellerReports(nextDemoRunId, evidenceClients).slice(0, quantities.sellerReports);
    const nextVapiCallLogs = createSimulatedVapiCallLogs(nextDemoRunId, evidenceClients).slice(0, quantities.vapiLogs);
    const nextMartaWhatsAppFollowups = [];
    const generatedAt = new Date().toISOString();
    const nextDemoContext = {
      demoRunId: nextDemoRunId,
      prospectCompanyName: quantities.prospectCompanyName || selectedVolunteer.company || volunteerForm.company || "Empresa Demo",
      projectName: quantities.projectName || "Proyecto de Empresa Demo",
      scenarioName: quantities.scenarioName || "Lanzamiento comercial de proyecto habitacional",
      status: "injected",
      injectedAt: new Date(generatedAt).toLocaleString("es-SV", { dateStyle: "short", timeStyle: "short" }),
    };
    const nextIntelligenceSignals = deriveDemoFindings({
      demoRunId: nextDemoRunId,
      generatedAt,
      reservationClients: nextReservationClients,
      internalMessages: nextInternalMessages,
      sellerReports: nextSellerReports,
      vapiCallLogs: nextVapiCallLogs,
    });
    const nextOperationalEvidence = createSimulatedOperationalEvidence(nextDemoRunId, nextReservationClients, nextInternalMessages, nextSellerReports, nextIntelligenceSignals, nextVapiCallLogs, nextMartaWhatsAppFollowups);
    setSimulatedReservationClients(nextReservationClients);
    setSimulatedInternalMessages(nextInternalMessages);
    setSimulatedSellerReports(nextSellerReports);
    setSimulatedVapiCallLogs(nextVapiCallLogs);
    setSimulatedMartaWhatsAppFollowups(nextMartaWhatsAppFollowups);
    setSimulatedIntelligenceSignals(nextIntelligenceSignals);
    onDemoContextInjected?.(nextDemoContext);
    onDemoFindingsInjected?.(nextIntelligenceSignals);
    setSimulatedOperationalEvidence(nextOperationalEvidence);
    setActiveDemoContext(nextDemoContext);
    setReservationStatus({ reservation: "Validada", whatsapp: "Confirmado", email: "Confirmado", evidence: "Generada" });
    completePhase(4);
  };
  const commercialRows = hasSimulatedSellerReports
    ? simulatedSellerReports.slice(0, 5).map((report) => [report.clientName, report.sellerName, report.interactionType, `${report.summary} Necesidad: ${report.detectedNeed}. Objecion: ${report.objection}.`, report.priority, report.nextStep, report.createdAt, "Activo"])
    : simulatedDataInjected ? [] : [["Andrea López", "María Fernanda", "Validación inicial", "Reserva creada desde app pública", "Media", "Confirmar recepción", "Hoy 3:00 PM", "Activo"]];
  const internalMessageRows = hasSimulatedInternalMessages
    ? simulatedInternalMessages.slice(0, 5).map((message) => [message.fromRole, message.toRole, message.topic, message.messageText, message.priority, message.createdAt])
    : simulatedDataInjected ? [] : [["Coordinación comercial", "Vendedora responsable", "Coordinación con vendedora", "Revisar reserva creada y dejar evidencia del siguiente movimiento.", "Media", "Hoy 3:08 PM"]];
  const latestSellerReport = hasSimulatedSellerReports
    ? simulatedSellerReports[simulatedSellerReports.length - 1]
    : simulatedDataInjected ? null : {
        sellerName: "María Fernanda",
        clientName: "Andrea López",
        summary: "Validación inicial registrada desde seguimiento comercial.",
        detectedNeed: "Confirmar recepción",
        interactionType: "Validación inicial",
      };
  const latestTeamMessage = hasSimulatedInternalMessages
    ? simulatedInternalMessages[simulatedInternalMessages.length - 1]
    : simulatedDataInjected ? null : {
        fromRole: "Coordinación comercial",
        toRole: "Vendedora responsable",
        topic: "Coordinación con vendedora",
        messageText: "Revisar reserva creada y dejar evidencia del siguiente movimiento.",
      };
  const recentActivityTime = hasAnySimulatedEvidence ? "Hace un momento" : simulatedDataInjected ? "Sin registros" : "Recientemente";
  const adminEvidence = simulatedDataInjected
    ? simulatedOperationalEvidence.map((item) => [item.page, item.section, item.summary, `Evidencia simulada asociada al demoRunId ${demoRunIdShort}.`, item.status, "Abrir página"])
    : [
        ["Perfil Operacional", "Expediente del cliente", "Reserva vinculada", "Datos, comunicación y seguimiento quedan visibles para revisión.", reservationStatus.evidence === "Generada" ? "Visible" : "Pendiente", "Ver evidencia"],
        ["Seguimiento Comercial de Vendedoras", "Seguimientos activos", "Tarea comercial creada", "La vendedora puede continuar el seguimiento desde su app.", "Pendiente", "Abrir página"],
        ["Mensajería Operacional del Equipo", "Coordinación interna", "Mensaje operativo registrado", "El equipo puede verificar coordinación posterior a la reserva.", "Pendiente", "Abrir página"],
      ];
  const derivedChanges = [
    { phase: "Fase 01", source: "Reservas", page: "Reserva pública", section: "Cliente, unidad, fuente y estado", change: `${simulatedReservationClients.length} reservas disponibles para seguimiento`, observation: "Clientes operacionales y unidades que originan el ciclo.", status: hasSimulatedReservations ? "Verificado" : simulatedDataInjected ? "Sin registros" : "Pendiente", targetId: "demo-reservation-live" },
    { phase: "Fase 02", source: "Marta Voz / Vapi", page: "Marta Multicanal", section: "Voz, llamadas y structured output", change: `${simulatedVapiCallLogs.length} logs de llamadas disponibles`, observation: "Intenciones, bloqueos, urgencia y casos que requieren intervención humana.", status: hasSimulatedVapiCallLogs ? "Generado" : simulatedDataInjected ? "Sin registros" : "Pendiente", targetId: "demo-marta-vapi-voice" },
    { phase: "Fase 02", source: "Marta WhatsApp", page: "Marta Multicanal", section: "WhatsApp / Texto", change: `${simulatedMartaWhatsAppFollowups.length} seguimientos conversacionales`, observation: "Respuestas, intención detectada y siguiente acción por texto.", status: hasSimulatedMartaWhatsAppFollowups ? "Generado" : simulatedDataInjected ? "Sin registros" : "Pendiente", targetId: "demo-marta-whatsapp" },
    { phase: "Fase 03", source: "Seguimiento Comercial de Vendedoras", page: "Coordinación y Seguimiento Operacional", section: "Capa 1 · Reportes humanos posteriores", change: `${simulatedSellerReports.length} reportes con objeciones, prioridades y próximos pasos`, observation: "Seguimiento humano nacido desde clientes reservados.", status: hasSimulatedSellerReports ? "Verificado" : simulatedDataInjected ? "Sin registros" : "Pendiente", targetId: "demo-commercial-operations" },
    { phase: "Fase 03", source: "Mensajería Operacional del Equipo", page: "Coordinación y Seguimiento Operacional", section: "Capa 2 · Coordinación interna", change: `${simulatedInternalMessages.length} mensajes operacionales generados`, observation: "Responsables, prioridades y coordinación posterior a la reserva.", status: hasSimulatedInternalMessages ? "Generado" : simulatedDataInjected ? "Sin registros" : "Pendiente", targetId: "demo-operational-messaging" },
    { phase: "Fase 04", source: "Todas las fuentes", page: "Centro de Mando y Evidencia", section: "Trazabilidad administrativa", change: `${simulatedOperationalEvidence.length} evidencias de la corrida demo local`, observation: "Datos simulados configurados, auditados, regenerados cuando corresponde y cargados sin persistencia.", status: simulatedDataInjected ? "Cargado" : "Pendiente", targetId: "demo-command-evidence" },
    { phase: "Fase 05", source: "H - OperIA Intelligence", page: "Inteligencia Operativa", section: "Hallazgos prioritarios cargados", change: `${phaseFiveFindings.length} hallazgos priorizados dentro del Admin`, observation: "La actividad operacional se interpreta como hallazgos verificables en páginas internas.", status: phaseFiveDemoActive ? "Generado" : "Pendiente", targetId: "demo-intelligence" },
    { phase: "Fase 06", source: "Síntesis ejecutiva", page: "Cierre Ejecutivo", section: "Referencia conceptual", change: `${phaseFiveFindings.length} señales de referencia conceptual`, observation: "No consulta fuentes reales, no genera decisiones operativas y no persiste resultados.", status: phaseFiveDemoActive ? "Referencia futura / no operativa" : "Futura / no operativa", targetId: "demo-executive-close" },
    { phase: "Auxiliar", source: "Información pública", page: "Inventario Demo", section: "Sección auxiliar técnica", change: "8 categorías de inventario previstas", observation: "Soporte reutilizable fuera de la ruta escénica principal.", status: "Visible", targetId: "demo-technical-inventory" },
  ];
  const injectionResults = [
    [String(simulatedReservationClients.length), "reservas/clientes simulados"],
    [String(simulatedInternalMessages.length), "mensajes internos equipo"],
    [String(simulatedSellerReports.length), "reportes vendedoras"],
    [String(simulatedVapiCallLogs.length), "logs Marta Voz / Vapi"],
    [String(simulatedMartaWhatsAppFollowups.length), "seguimientos Marta WhatsApp"],
    [String(phaseFiveFindings.length), "señales H - OperIA Intelligence"],
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
      <Card className="border-blue-100 bg-blue-50">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Sesión demo</div>
            <h3 className="mt-2 text-2xl font-black text-slate-950">{sessionHeading}</h3>
            {(activeDemoSession || residualDemoSession) && <p className="mt-2 text-sm font-semibold text-slate-700">demoRunId: {(activeDemoSession || residualDemoSession).demoRunId}</p>}
            {demoSessionNotice && <p className="mt-2 text-sm font-semibold text-slate-700">{demoSessionNotice}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            {!activeDemoSession && demoSessionStatus === "blocked" && <button type="button" onClick={onStartDemoSession} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white disabled:cursor-wait disabled:bg-slate-400">Reintentar preparación</button>}
            {activeDemoSession && <button type="button" disabled={demoSessionStatus === "preparing"} onClick={onFinalizeDemoSession} className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-900 disabled:cursor-wait disabled:opacity-60">Finalizar demostración</button>}
          </div>
        </div>
        {demoSessionStatus === "blocked" && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-black text-amber-900">No fue posible preparar una nueva demostración porque existe estado pendiente de la corrida anterior.</div>}
        {activeDemoSession && <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{demoParticipants.map((participant) => {
          const status = demoParticipantStatuses[participant.id] || participant.status;
          const label = status === "connected" ? "Conectada" : status === "connecting" ? "Conectando" : status === "open" ? "Abierta" : status === "available" ? "Disponible" : status === "future" ? "Prevista" : "No integrada";
          const tone = status === "connected" ? "green" : status === "connecting" || status === "open" || status === "available" ? "blue" : status === "future" ? "violet" : "slate";
          return <div key={participant.id} className="rounded-2xl border border-blue-100 bg-white p-4"><div className="text-sm font-black text-slate-950">{participant.name}</div><div className="mt-1 text-xs font-semibold leading-5 text-slate-600">{participant.detail}</div><div className="mt-3"><Badge tone={tone}>{label}</Badge></div></div>;
        })}</div>}
      </Card>
      <Card>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <InfoCard title="Empresa configurada" value={effectiveDemoContext?.prospectCompanyName || "Empresa Demo"} />
          <InfoCard title="Proyecto de referencia" value={effectiveDemoContext?.projectName || "Proyecto de Empresa Demo"} />
          <InfoCard title="Escenario base" value={effectiveDemoContext?.scenarioName || "Centro Demo"} />
          <InfoCard title="Estado de sesión" value={demoSessionStatus === "blocked" ? "Bloqueada · limpieza pendiente" : demoSessionStatus === "preparing" ? "Preparando limpieza segura" : activeDemoSession ? "Sesión demo activa" : "Sin sesión demo"} />
          <InfoCard title="Última actualización" value={effectiveDemoContext?.injectedAt || "Pendiente de carga demo"} />
        </div>
      </Card>
      <Card className="border-blue-100 bg-blue-50">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">Demo</Badge>
              <Badge tone="slate">Aplicación separada</Badge>
            </div>
            <h3 className="mt-3 text-2xl font-black text-slate-950">Experiencia pública de reserva</h3>
            <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">
              Abre la App Pública, una aplicación separada, en una pestaña nueva para mostrar el inicio del recorrido del cliente. Debe estar activa en {PUBLIC_RESERVATION_APP_URL}.
            </p>
            {publicReservationBridgeDisabled && (
              <p className="mt-2 max-w-4xl text-sm font-black leading-6 text-amber-900">
                Admin está usando el mismo puerto preparado para la App Pública. Inicia Admin en http://localhost:3000/ y la App Pública en {PUBLIC_RESERVATION_APP_URL} para habilitar este puente.
              </p>
            )}
          </div>
          {publicReservationBridgeDisabled ? (
            <button disabled className="inline-flex items-center justify-center rounded-2xl bg-amber-100 px-5 py-4 text-sm font-black text-amber-900 opacity-90">
              <ExternalLink size={16} className="mr-2" />
              App Pública requiere otro puerto
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenPublicReservation}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"
            >
              <ExternalLink size={16} className="mr-2" />
              Abrir experiencia pública de reserva
            </button>
          )}
        </div>
      </Card>
      <DemoScenarioRoute phases={phases} progress={progress} phaseStatus={phaseStatus} onPresentPhase={presentPhase} onCompletePhase={completePhase} />

      <div ref={(element) => { phaseSectionRefs.current[0] = element; }} className="grid scroll-mt-64 gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">Voluntarios de la sesión</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Personas registradas para recibir links y abrir las aplicaciones durante la demostración. No forman parte de la corrida simulada.</p></div><Badge tone="blue">{volunteers.length} voluntarios registrados</Badge></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[["name", "Nombre completo", "Ej. Andrea López"], ["role", "Cargo", "Ej. Gerente comercial"], ["company", "Empresa", "Ej. Proyecto de Empresa Demo"], ["whatsapp", "WhatsApp", "+503 7000-0000"], ["email", "Email", "persona@empresa.com"]].map(([field, label, placeholder]) => <div key={field}><label className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-700">{label}</label><input value={volunteerForm[field]} onChange={(e) => setVolunteerForm((current) => ({ ...current, [field]: e.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none" placeholder={placeholder} /></div>)}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <button onClick={addVolunteer} className="rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white"><Users size={16} className="mr-2 inline" />Registrar voluntario</button>
            <button
              onClick={() => sendDemoLink("whatsapp")}
              disabled={!caseOneWhatsappReady}
              className={cls(
                "rounded-2xl px-4 py-4 text-sm font-black",
                caseOneWhatsappReady
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-100 text-emerald-800 opacity-80",
              )}
            >
              <MessageCircle size={16} className="mr-2 inline" />
              {caseOneWhatsappReady ? "Enviar enlace por WhatsApp" : "WhatsApp preparado · requiere VPS"}
            </button>
            <button disabled className="rounded-2xl bg-blue-100 px-4 py-4 text-sm font-black text-blue-800 opacity-80"><Mail size={16} className="mr-2 inline" />Email demo no activo</button>
            <button onClick={finishVolunteer} className="rounded-2xl bg-slate-200 px-4 py-4 text-sm font-black text-slate-950">Guardar y limpiar formulario</button>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Evidencia operacional de envío</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">El Caso 1 queda preparado para solicitar envío al backend solo con configuración pública VPS certificada. La evidencia distingue solicitud, aceptación técnica del proveedor o error; no certifica entrega, recepción ni lectura.</p>
              </div>
              <Badge tone="violet">Marta acompaña · H - OperIA Intelligence analiza · humano decide</Badge>
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
                  <div className="mt-2 grid gap-1 md:grid-cols-2">
                    <div><span className="font-black text-slate-950">Enlace preparado:</span> {item.link || "Pendiente"}</div>
                    <div><span className="font-black text-slate-950">ID proveedor:</span> {item.providerMessageId || "No disponible"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {volunteers.map((item) => <button key={`${item.whatsapp}-${item.email}`} onClick={() => setSelectedPhone(item.whatsapp)} className={cls("rounded-2xl border p-4 text-left", selectedPhone === item.whatsapp ? "border-slate-950 bg-slate-100" : "border-slate-100 bg-slate-50")}><div className="font-black text-slate-950">{item.name || "Voluntario sin nombre"}</div><div className="mt-1 text-sm font-semibold text-slate-700">{item.role} · {item.company} · {item.whatsapp}</div><div className="mt-3 flex flex-wrap gap-2"><Badge tone={statusTone[item.whatsappStatus] || "slate"}>WhatsApp estado: {item.whatsappStatus}</Badge><Badge tone={statusTone[item.emailStatus] || "slate"}>Email estado: {item.emailStatus}</Badge><Badge tone={statusTone[item.reservationStarted] || "slate"}>Reserva iniciada: {item.reservationStarted}</Badge><Badge tone={statusTone[item.reservationCompleted] || "slate"}>Reserva completada: {item.reservationCompleted}</Badge></div></button>)}
          </div>
        </Card>
        <div id="demo-reservation-live" className="scroll-mt-64">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">FASE 01 Reserva en vivo y validación operacional</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Cada reserva integrada concluida conserva su Expediente Vivo efímero dentro de la sesión demo activa.</p></div><div className="flex flex-wrap gap-2"><Badge tone={demoSessionStatus === "blocked" ? "amber" : hasActiveLiveReservation ? "blue" : "slate"}>{phaseOneStatus}</Badge>{liveExpediente && demoSessionStatus === "blocked" && <Badge tone="amber">Estado residual anterior</Badge>}<Badge tone="amber">Demo · No persistido</Badge></div></div>
          <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]"><input value={selectedPhone} onChange={(e) => setSelectedPhone(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none" placeholder="Buscar por teléfono" /><button disabled={Boolean(liveExpediente)} onClick={validateReservation} className={cls("rounded-2xl px-5 py-4 text-sm font-black", liveExpediente ? "bg-slate-200 text-slate-600" : "bg-emerald-600 text-white")}><Search size={16} className="mr-2 inline" />{liveExpediente ? "Validación demo separada" : "Validar reserva demo"}</button></div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">El acceso técnico al registro externo queda fuera del recorrido comercial; esta validación solo actualiza el escenario local.</p>
          {liveExpediente && <p className={cls("mt-3 rounded-2xl border px-4 py-3 text-sm font-black leading-6", demoSessionStatus === "blocked" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-blue-200 bg-blue-50 text-blue-900")}>{demoSessionStatus === "blocked" ? "Esta reserva pertenece a una corrida anterior pendiente de limpieza segura. No representa evidencia de una nueva sesión." : "La reserva viva recibida desde la App Pública es la autoridad del caso. La validación demo local permanece separada y no crea ni duplica el Expediente Vivo."}</p>}
          <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-slate-600">Última actualización: hace 12 segundos</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <InfoCard title="Reservas integradas concluidas" value={String(liveExpedientes.length)} />
            <InfoCard title="Caso principal actual" value={liveExpediente ? `${liveClientName} · ${liveExpediente.reservationId}` : "Pendiente"} detail={latestLiveExpediente && latestLiveExpediente.reservationId !== liveExpediente?.reservationId ? `Última reserva recibida: ${latestLiveExpediente.reservationId}` : undefined} />
            <InfoCard title="Nombre del cliente" value={liveClientName || "Sin registro"} />
            <InfoCard title="Teléfono" value={liveSnapshot?.client.phone || selectedVolunteer.whatsapp || selectedPhone} />
            <InfoCard title="Email" value={liveSnapshot?.client.email || selectedVolunteer.email || "Pendiente"} />
            <InfoCard title="Tipo de propiedad" value={liveSelectedUnit?.propertyType || "Apartamento"} />
            <InfoCard title="Sector" value={liveSelectedUnit?.sector || "Sector 01"} />
            <InfoCard title="Torre / manzana" value={liveSelectedUnit?.towerOrBlock || "Torre 3"} />
            <InfoCard title="Nivel / modelo" value={liveLevelAndModel || "Nivel 7 · Modelo A"} />
            <InfoCard title="Unidad / lote" value={liveSelectedUnit?.unitOrLot || "A704"} />
            <InfoCard title="Estado de reserva" value={liveExpediente ? "Confirmada" : reservationStatus.reservation} />
            <InfoCard title="Estado WhatsApp" value={liveExpediente ? "No incluido en evento" : reservationStatus.whatsapp} />
            <InfoCard title="Estado email" value={liveExpediente ? "No incluido en evento" : reservationStatus.email} />
            <InfoCard title="Evidencia de registro" value={liveExpediente ? "Evento recibido · demo/no persistido" : reservationStatus.evidence} />
          </div>
          {simulatedDataInjected && (
            <div className="mt-5">
              {hasSimulatedReservations
                ? <SimpleTable columns={["Cliente", "Fuente", "Unidad", "Estado reserva", "Creado"]} rows={simulatedReservationClients.slice(0, 5).map((client) => [client.name, client.source, client.unit, client.reservationStatus, client.createdAt])} />
                : <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">0 reservas simuladas configuradas para esta corrida.</p>}
            </div>
          )}
        </Card>
        </div>
      </div>

      <div id="demo-marta-vapi" ref={(element) => { phaseSectionRefs.current[1] = element; }} className="scroll-mt-64">
        <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between"><div><h3 className="text-3xl font-black text-slate-950">FASE 02 Marta · Acompañamiento Multicanal</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">La interacción con Marta se muestra como evidencia demo estructurada para seguimiento e inteligencia. No activa llamadas ni mensajería real.</p></div><Badge tone={statusTone[martaStatus] || "violet"}>{martaStatus}</Badge></div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="violet">Demo · Voz / Vapi</Badge>
          <Badge tone="violet">Demo · WhatsApp</Badge>
          <Badge tone="slate">Próximo · Email</Badge>
          <Badge tone="slate">Próximo · Widget Web</Badge>
          <Badge tone="slate">Próximo · Link posterior</Badge>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Transcripción:</span> “Quiero confirmar prima, fecha de entrega y documentos para avanzar.”</div><div className="rounded-2xl bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Structured output:</span> intención alta, duda financiera, documento pendiente, próxima acción: llamada humana.</div><div className="rounded-2xl bg-emerald-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Evidencia:</span> resumen de llamada y tarea de seguimiento.</div></div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={simulateMartaConversation} className="rounded-2xl bg-violet-600 px-5 py-4 text-sm font-black text-white"><Bot size={16} className="mr-2 inline" />Mostrar conversación demo con Marta</button>
          <button onClick={openVapi} className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"><PhoneCall size={16} className="mr-2 inline" />Ver logs Vapi simulados</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><Badge tone="violet">Logs demo</Badge><Badge tone="amber">No persistido</Badge></div>
        {simulatedDataInjected && (
          <div className="mt-5 space-y-4">
            <div id="demo-marta-vapi-voice" className="scroll-mt-64">
              <h4 className="mb-3 text-xl font-black text-slate-950">Marta Voz / Vapi</h4>
              {hasSimulatedVapiCallLogs ? <div className="grid gap-3 xl:grid-cols-2">
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
              </div> : <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">0 logs Vapi simulados configurados para esta corrida.</p>}
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
        <div className="mb-5">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">FASE 03</div>
          <h3 className="mt-2 text-3xl font-black text-slate-950">Coordinación y Seguimiento Operacional</h3>
          <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">Aportes humanos posteriores a la reserva, provenientes del seguimiento comercial y de la coordinación del equipo.</p>
        </div>
        <div id="demo-commercial-operations" className="scroll-mt-64">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">CAPA 1 — Seguimiento Comercial de Vendedoras</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Evidencia de actividades realizadas en la app de vendedoras: interacciones, objeciones, prioridades y próximos pasos.</p>
            </div>
            {simulatedDataInjected && (
              <Badge tone="green">{simulatedSellerReports.length} registros comerciales</Badge>
            )}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">{hasSimulatedSellerReports ? "Actividad reciente" : simulatedDataInjected ? "Sin registros simulados en esta categoría" : hasSessionEvidence ? "Actividad reciente" : "Datos de referencia · sin evidencia de sesión"}</div>
            <div className="mt-3 grid gap-3 text-sm font-semibold text-slate-700 md:grid-cols-4">
              <div><span className="font-black text-slate-950">Asesora:</span> {latestSellerReport?.sellerName || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Cliente:</span> {latestSellerReport?.clientName || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Última gestión:</span> {latestSellerReport?.interactionType || latestSellerReport?.summary || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Actualizado:</span> {recentActivityTime}</div>
            </div>
          </div>
          <div className="mt-5">{hasSimulatedSellerReports || !simulatedDataInjected ? <SimpleTable columns={["Cliente", "Vendedora", "Interacción", "Resumen", "Prioridad", "Próximo paso", "Fecha/hora", "Estado"]} rows={commercialRows} /> : <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">0 reportes comerciales simulados configurados para esta corrida.</p>}</div>
        </Card>
        </div>
        <div id="demo-operational-messaging" className="mt-5 scroll-mt-64">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">CAPA 2 — Mensajería Operacional del Equipo</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Evidencia de coordinación interna posterior a la reserva: responsables, destinatarios, temas, decisiones y prioridad operativa.</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">{hasSimulatedInternalMessages ? "Actividad reciente" : simulatedDataInjected ? "Sin registros simulados en esta categoría" : hasSessionEvidence ? "Actividad reciente" : "Datos de referencia · sin evidencia de sesión"}</div>
            <div className="mt-3 grid gap-3 text-sm font-semibold text-slate-700 md:grid-cols-4">
              <div><span className="font-black text-slate-950">Remitente:</span> {latestTeamMessage?.fromRole || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Destinatario:</span> {latestTeamMessage?.toRole || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Último asunto:</span> {latestTeamMessage?.topic || latestTeamMessage?.messageText || "Sin registros"}</div>
              <div><span className="font-black text-slate-950">Actualizado:</span> {recentActivityTime}</div>
            </div>
          </div>
          <div className="mt-5">{hasSimulatedInternalMessages || !simulatedDataInjected ? <SimpleTable columns={["Origen", "Destino", "Tema", "Mensaje", "Prioridad", "Fecha/hora"]} rows={internalMessageRows} /> : <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">0 mensajes internos simulados configurados para esta corrida.</p>}</div>
        </Card>
        </div>
      </div>

      <div id="demo-command-evidence" ref={(element) => { phaseSectionRefs.current[3] = element; }} className="scroll-mt-64">
      <DemoCommandEvidencePanel
        demoContext={effectiveDemoContext}
        simulatedDataInjected={simulatedDataInjected}
        hasActiveDemoSession={Boolean(activeDemoSession)}
        counts={{
          reservations: simulatedReservationClients.length,
          messages: simulatedInternalMessages.length,
          sellerReports: simulatedSellerReports.length,
          vapiLogs: simulatedVapiCallLogs.length,
          whatsappFollowups: simulatedMartaWhatsAppFollowups.length,
          evidence: simulatedOperationalEvidence.length,
        }}
        onInjectSimulatedData={injectSimulatedData}
        resetToken={demoSessionResetToken}
        persistedState={demoCommandEvidenceState}
        onPersistState={onDemoCommandEvidenceStateChange}
      />
      {simulatedDataInjected && (
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <button
            type="button"
            onClick={() => setIsSimulatedRunDataOpen((current) => !current)}
            className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"
          >
            {isSimulatedRunDataOpen ? "Ocultar datos simulados de esta corrida" : "Ver datos simulados de esta corrida"}
          </button>
          {isSimulatedRunDataOpen && (
            <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Lectura ejecutiva · FASE 04</div>
                  <h4 className="mt-2 text-xl font-black text-slate-950">Datos simulados de esta corrida</h4>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">Ejemplos generados localmente para la corrida activa. No se consultan ni conservan datos históricos.</p>
                </div>
                <Badge tone="blue">Corrida activa</Badge>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {simulatedRunDataCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedSimulatedRunDataCategory(category.id)}
                    className={cls(
                      "rounded-2xl border px-4 py-3 text-sm font-black",
                      selectedSimulatedRunDataCategory === category.id
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-blue-100 bg-white text-slate-800",
                    )}
                  >
                    {category.label} · {category.records.length}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h5 className="text-lg font-black text-slate-950">{selectedSimulatedRunData.label} · {selectedSimulatedRunData.records.length}</h5>
                  {selectedSimulatedRunData.records.length > 3 && <span className="text-sm font-bold text-slate-600">Mostrando 3 de {selectedSimulatedRunData.records.length} datos simulados generados.</span>}
                </div>
                {selectedSimulatedRunData.records.length === 0 ? (
                  <p className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">0 datos simulados generados para esta categoría en esta corrida.</p>
                ) : (
                  <div className="mt-4 grid gap-3">
                    {selectedSimulatedRunDataCategory === "reservations" && activeSimulatedReservationClients.slice(0, 3).map((client) => {
                      const recordTime = formatSimulatedRecordTime(client.createdAt);
                      return (
                      <div key={client.id} className="rounded-2xl border border-blue-100 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2"><h6 className="font-black text-slate-950">{client.name || "Reserva simulada"}</h6>{recordTime && <span className="text-sm font-bold text-slate-500">{recordTime}</span>}</div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{reservationExecutiveSummary(client)}</p>
                      </div>
                    )})}
                    {selectedSimulatedRunDataCategory === "vapi" && activeSimulatedVapiCallLogs.slice(0, 3).map((log) => {
                      const recordTime = formatSimulatedRecordTime(log.createdAt);
                      return (
                      <div key={log.id} className="rounded-2xl border border-violet-100 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2"><h6 className="font-black text-slate-950">{log.clientName || "Llamada simulada"}</h6>{recordTime && <span className="text-sm font-bold text-slate-500">{recordTime}</span>}</div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{vapiExecutiveSummary(log)}</p>
                      </div>
                    )})}
                    {selectedSimulatedRunDataCategory === "sellerReports" && activeSimulatedSellerReports.slice(0, 3).map((report) => {
                      const recordTime = formatSimulatedRecordTime(report.createdAt);
                      return (
                      <div key={report.id} className="rounded-2xl border border-emerald-100 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2"><h6 className="font-black text-slate-950">{report.clientName || "Registro comercial"}</h6>{recordTime && <span className="text-sm font-bold text-slate-500">{recordTime}</span>}</div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{sellerReportExecutiveSummary(report)}</p>
                      </div>
                    )})}
                    {selectedSimulatedRunDataCategory === "messages" && activeSimulatedInternalMessages.slice(0, 3).map((message) => {
                      const recordTime = formatSimulatedRecordTime(message.createdAt);
                      return (
                      <div key={message.id} className="rounded-2xl border border-amber-100 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2"><h6 className="font-black text-slate-950">{message.relatedClientName || "Mensaje operativo"}</h6>{recordTime && <span className="text-sm font-bold text-slate-500">{recordTime}</span>}</div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{message.messageText}</p>
                      </div>
                    )})}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      <div id="demo-intelligence" ref={(element) => { phaseSectionRefs.current[4] = element; }} className="grid scroll-mt-64 gap-5">
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">FASE 05 H - OperIA Intelligence</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Índice escénico de hallazgos prioritarios que H - OperIA Intelligence interpreta después de la Empresa Demo y ubica dentro de páginas internas del Admin.</p>
              <p className="mt-2 max-w-4xl text-sm font-black leading-6 text-violet-800">Escenario demo / corrida simulada / no persistida. Los hallazgos actuales se derivan localmente de la evidencia cargada para esta corrida; no consultan Supabase.</p>
            </div>
            <div className="flex flex-wrap gap-2"><Badge tone={phaseFiveDemoActive ? "green" : "amber"}>{phaseFiveDemoActive ? "Demo activa" : "Sin demo activa"}</Badge><Badge tone="violet">Datos simulados</Badge><Badge tone="amber">No persistido</Badge></div>
          </div>
          {!phaseFiveDemoActive && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-base font-black text-amber-900">Esperando corrida simulada</div>}
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <InfoCard title="Empresa demo activa" value={effectiveDemoContext?.prospectCompanyName || "Sin demo activa"} detail="Contexto escénico posterior a FASE 04." />
            <InfoCard title="Proyecto demo activo" value={effectiveDemoContext?.projectName || "Proyecto de Empresa Demo"} detail="Base operativa interpretada por H - OperIA Intelligence." />
            <InfoCard title="Estado de hallazgos" value={phaseFiveDemoActive ? "Pendiente de verificación" : "Pendiente de corrida"} detail="Los enlaces son simulados y no activan rutas reales." />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">Hallazgos prioritarios cargados en Admin</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Cada hallazgo muestra qué detectó Intelligence, por qué importa, quién debe actuar, qué acción ejecutar y dónde abrir la evidencia operacional.</p>
            </div>
            <Badge tone={phaseFiveDemoActive ? "green" : "amber"}>{phaseFiveFindings.length} hallazgos</Badge>
          </div>
          <div className="mt-5 grid gap-4">
            {phaseFiveFindings.map((signal, index) => (
              <div key={signal.id} className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="dark">Hallazgo {index + 1}</Badge>
                      <Badge tone="blue">{demoAdminPageLabels[signal.adminTargetPage] || signal.adminTargetPage}</Badge>
                      <Badge tone={demoFindingSeverityTone[signal.severity] || "violet"}>{demoFindingSeverityLabels[signal.severity] || signal.severity}</Badge>
                    </div>
                    <h4 className="mt-3 text-xl font-black text-slate-950">{signal.title || signal.adminTargetSection}</h4>
                  </div>
                  <Badge tone="amber">{demoVisibleStatusLabels[signal.visibleStatus] || signal.visibleStatus}</Badge>
                </div>
                <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Hallazgo detectado</div>
                    <p className="mt-2 text-base font-semibold leading-7 text-slate-800">{signal.summary}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Por qué importa</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{signal.operationalRecommendation}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-violet-700">Acción sugerida por H - OperIA Intelligence</div>
                    <p className={`mt-2 text-sm leading-6 ${intelligenceActionTextClass}`}>{signal.recommendedAction}</p>
                    <button type="button" onClick={() => onOpenOperationalCase?.(signal)} className="mt-4 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Abrir caso operacional</button>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Fuente del dato</div>
                    <p className="mt-2 text-base font-black text-slate-950">{demoFindingSourceLabels[signal.source] || signal.source}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Responsable</div>
                    <p className="mt-2 text-base font-black text-slate-950">{formatDemoFindingResponsible(signal)}</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Corrida demo</div>
                    <p className="mt-2 text-sm font-bold text-slate-700">{signal.demoRunId ? signal.demoRunId.replace("demo-", "").slice(0, 8) : demoRunIdShort} · simulada · no persistida</p>
                    <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-600">Ver evidencias en Admin</div>
                    <div className="mt-2 grid gap-2">
                      {(signal.associatedEvidence.length ? signal.associatedEvidence : [{
                        id: `${signal.id}-admin-target`,
                        label: signal.adminTargetSection,
                        summary: signal.title || signal.adminTargetSection,
                        source: signal.source,
                        adminTargetPage: signal.adminTargetPage,
                        adminTargetSection: signal.adminTargetSection,
                      }]).map((evidence, evidenceIndex) => {
                        const evidenceTarget = {
                          ...signal,
                          adminTargetPage: evidence.adminTargetPage || signal.adminTargetPage,
                          adminTargetAnchor: evidence.adminTargetAnchor,
                        };
                        const targetPageLabel = demoAdminPageLabels[evidence.adminTargetPage || signal.adminTargetPage] || evidence.adminTargetPage || signal.adminTargetPage;
                        const targetSectionLabel = evidence.adminTargetSection || signal.adminTargetSection;
                        const targetDetailLabel = evidence.adminTargetDetail || evidence.summary;
                        return (
                          <button key={evidence.id} type="button" onClick={() => openAdminFinding(evidenceTarget)} className="flex items-start gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-left text-sm font-black leading-6 text-white">
                            <span className="shrink-0 text-white/70">{evidenceIndex + 1}.</span>
                            <span className="min-w-0">
                              <ExternalLink size={16} className="mr-2 inline" />{targetPageLabel} -&gt; {targetSectionLabel}{targetDetailLabel ? ` -> ${targetDetailLabel}` : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
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
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Verificación externa prevista</div>
                            <button type="button" onClick={(event) => event.preventDefault()} className="mt-2 inline-flex items-center rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-sm">
                              <ExternalLink size={15} className="mr-2" />{signal.externalVerification === "Supabase" ? "Validación externa futura" : signal.externalVerification}
                            </button>
                          </>
                        )}
                        {signal.supabaseTable && (
                          <div className="mt-3">
                            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Referencia técnica prevista</div>
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
        <h3 className="text-3xl font-black text-slate-950">FASE 06 Cierre ejecutivo futuro / no operativo</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-700">Esta vista conserva una maqueta conceptual de una capacidad futura. No consulta fuentes reales, no genera decisiones operativas y no persiste resultados.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-base font-black leading-7 text-slate-900">Las reservas generan oportunidades. Las personas generan contexto. La futura Suite H - OperIA podría convertir ambas en decisiones verificables; esta vista no ejecuta esa capacidad.</p>
        <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto]">
          <input value={executiveQuery} onChange={(e) => setExecutiveQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addExecutiveQuestion(); }} className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold outline-none" placeholder="Escribir pregunta conceptual individual" />
          <button onClick={addExecutiveQuestion} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><Bot size={16} className="mr-2 inline" />Agregar pregunta conceptual</button>
        </div>
        <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-700">Preguntas conceptuales</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {executiveQuestions.map((query, index) => <span key={`${query}-${index}`} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm">{index + 1}. {query}</span>)}
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h4 className="text-xl font-black text-slate-950">Desglose conceptual previsto por H - OperIA Intelligence</h4>
              <p className="mt-3 text-base font-semibold leading-8 text-slate-800">La futura capacidad de H - OperIA Intelligence podría descomponer una pregunta ejecutiva para revisar ingresos, conversión, acompañamiento humano y riesgos operativos. Esta maqueta no ejecuta una consulta ni produce una conclusión operativa.</p>
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
            <h4 className="text-xl font-black text-slate-950">Desgloses conceptuales de referencia</h4>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Esta selección ilustra una futura respuesta ejecutiva; no activa consultas, decisiones ni persistencia.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedBreakdowns.map((item) => <span key={item} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">{item}</span>)}
            </div>
            <button onClick={() => setExecutiveResponseReady(true)} className="mt-4 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white">Preparar vista conceptual</button>
          </div>
          <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
              <h4 className="text-xl font-black text-slate-950">Resultado conceptual previsto por H - OperIA Intelligence</h4>
              <Badge tone={executiveResponseReady ? "green" : "amber"}>{executiveResponseReady ? "Vista conceptual preparada" : "Referencia futura"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Texto ejecutivo futuro", "Cuadros comparativos previstos", "Dashboard previsto", "PDF futuro", "Imagen ejecutiva futura"].map((format) => <Badge key={format} tone="violet">{format}</Badge>)}
            </div>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-800">{executiveResponseReady ? "Referencia conceptual: una futura lectura ejecutiva podría comparar ingresos, conversión, atraso operativo y seguimiento humano. Esta maqueta no consulta datos reales ni emite una decisión operativa." : "Una futura implementación podría mostrar una lectura ejecutiva en los formatos previstos, con fuentes verificables y autorización explícita."}</p>
            <button className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"><ClipboardCheck size={16} className="mr-2 inline" />Copiar referencia conceptual</button>
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
  return <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm"><div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div><h2 className="text-3xl font-black text-slate-950">Bandeja de Respuestas Asistidas</h2><p className="mt-2 max-w-4xl text-base font-semibold text-slate-700 leading-7">Marta recibe conversaciones; H - OperIA Intelligence estructura sugerencias para que la vendedora revise, edite, apruebe y envíe.</p></div><div className="flex flex-wrap gap-2"><Badge tone="violet">4 propuestas pendientes</Badge><Badge tone="slate">Revisión humana requerida</Badge></div></div><div className="mt-6 grid gap-5 xl:grid-cols-3">{proposals.map((proposal) => <MartaProposalCard key={`${proposal.type}-${proposal.title}`} type={proposal.type} title={proposal.title} analysis={proposal.analysis} proposal={proposal.proposal} />)}</div></div>;
}

function MartaProposalCard({ type, title, analysis, proposal }: { type: any; title: any; analysis: any; proposal: any; key?: React.Key }) {
  return <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm"><div className="text-sm uppercase tracking-[0.22em] text-violet-600 font-black">{type}</div><h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3><div className="mt-4 rounded-2xl bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Lectura H - OperIA Intelligence:</span> {analysis}</div><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Propuesta:</span> {proposal}</div><div className="mt-5 flex flex-wrap gap-2"><button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white">Revisar</button><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-800">Editar</button><button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Aprobar</button></div></div>;
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

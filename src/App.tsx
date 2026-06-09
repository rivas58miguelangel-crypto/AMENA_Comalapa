import React, { useMemo, useState } from "react";
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
  Mic,
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
  PencilLine,
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
  { id: "dashboards", label: "Dashboard Inteligente", icon: BarChart3 },
  { id: "demo", label: "Guía Demo", icon: Smartphone },
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
    amenaId: "AMENA-2026-000784",
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
    detail: "Responsable comercial directa del seguimiento, registro de información y aplicación criteriosa de recomendaciones de Marta.",
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
    summary: "Cliente con alta intención de compra. Marta detectó sensibilidad financiera moderada y recomienda intervención humana hoy mismo, asociando la llamada, la simulación bancaria y los compromisos al expediente operativo. La conversación debe confirmar monto, resolver dudas de crédito y dejar evidencia en el timeline.",
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
    { title: "Supabase", value: "Log insertado" },
    { title: "CRM", value: "Pipeline actualizado" },
  ],
  timeline: [
    { time: "10:04", title: "Reserva recibida desde app pública", description: "El Centro de Mando crea el expediente operacional vivo." },
    { time: "10:05", title: "WhatsApp enviado", description: "Confirmación de reserva y próximos pasos." },
    { time: "10:06", title: "Email enviado", description: "PDF, brochure y documentos asociados." },
    { time: "10:08", title: "Marta analiza señales", description: "Riesgo financiero moderado detectado." },
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
      recommendation: "Marta recomienda responder con tono tranquilo, confirmar monto pendiente y copiar a la esposa en el resumen por email.",
    },
    {
      channel: "Email Operacional",
      badge: "PDF abierto",
      tone: "blue",
      inboxTitle: "Últimos correos y actividad",
      messages: [
        { from: "Sistema AMENA", time: "10:06 AM", text: "Correo de confirmación enviado con brochure, condiciones y datos de contacto.", tag: "Enviado" },
        { from: "Carlos Méndez", time: "10:18 AM", text: "El cliente abrió el PDF de condiciones y descargó el brochure del proyecto.", tag: "Apertura detectada" },
      ],
      actions: ["Enviar resumen financiero", "Enviar PDF de garantías", "Enviar avance de construcción"],
      recommendation: "Marta recomienda enviar un correo ejecutivo con simulación, garantías y próximos pasos antes de la llamada humana.",
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

function Badge({ children, tone = "slate" }) {
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
  return <div className={cls("rounded-3xl border border-slate-200 bg-white p-6 shadow-sm", className)}>{children}</div>;
}

function TopNav({ active, setActive }) {
  return (
    <div className="sticky top-0 z-50 rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">AMENA</p>
          <h2 className="text-3xl font-black">Centro de Mando</h2>
        </div>
        <Badge tone="dark">{martaSync[active]}% Marta</Badge>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {menu.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cls(
              "flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition",
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
            <p className="text-sm font-black uppercase tracking-[0.35em] text-amber-500">AMENA Enterprise</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">{title}</h1>
            <p className="mt-3 max-w-5xl text-lg font-semibold leading-8 text-slate-800">{subtitle}</p>
          </div>
        </div>
        <div className="min-w-[310px] rounded-3xl bg-slate-50 p-5 border border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-black text-slate-950">Nivel de Sincronización con Marta</span>
            <span className="text-3xl font-black text-emerald-500">{sync}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-emerald-300" style={{ width: `${sync}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {syncNote || "Indica qué tanto este módulo está usando información capturada por Marta, eventos reales, formularios y señales operativas para generar recomendaciones accionables. No significa aceptar automáticamente todo lo que Marta proponga: el valor está en revisar, sumar criterio humano y actuar con disciplina."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((b) => <Badge key={b} tone="dark">{b}</Badge>)}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Metric({ title, value, note, tone = "slate", icon: Icon = Activity, onClick, active = false }) {
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

function AiObservation({ title = "Observaciones estratégicas de Marta", children }) {
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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
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
  const [active, setActive] = useState("executive");
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
      <div className="mx-auto max-w-[1800px] space-y-5 p-5">
        <TopNav active={active} setActive={setActive} />
        <Page />
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
        subtitle="Vista semanal para Director General y Director Comercial: prioridades, riesgos, ingresos, desempeño humano, desempeño IA y acciones concretas para dirigir equipos con autoridad."
        icon={MonitorCog}
        sync={martaSync.executive}
        badges={[REPORT_DATE, "Tercera semana de mayo 2026", "IA estratégica"]}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Ingresos recibidos" value="$184,500" note="Reserva a entrega · corte 15 mayo 2026" tone="green" icon={BadgeDollarSign} />
        <Metric title="Clientes críticos" value="17" note="Riesgo financiero/documental" tone="red" icon={AlertTriangle} />
        <Metric title="Sincronización Marta" value="86%" note="Promedio operativo" tone="violet" icon={Bot} />
        <Metric title="Acciones hoy" value="43" note="Recomendadas por IA" tone="blue" icon={Target} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <DetailStack
          title="Prioridades ejecutivas de la semana"
          subtitle="Acciones que Marta recomienda revisar en comité comercial."
          items={[
            { title: "Instagram genera volumen, pero formaliza 18% menos que referidos.", text: "Acción: revisar promesas de campaña, calidad de segmentación y consistencia entre anuncio, WhatsApp y seguimiento de vendedoras.", badge: "Marketing", tone: "blue" },
            { title: "Tres vendedoras tienen baja adopción de propuestas Marta.", text: "Acción: exigir revisión diaria de bandeja IA antes de contactar clientes y medir cumplimiento por vendedora.", badge: "Equipo ventas", tone: "amber" },
            { title: "Torre 3 concentra atrasos de prima y consultas de garantías.", text: "Acción: alinear ventas, financiera, construcción y servicio al cliente para responder con una sola verdad operacional.", badge: "Riesgo", tone: "red" },
            { title: "Clientes que reciben avances de construcción visual abandonan menos.", text: "Acción: automatizar reporte semanal con fotos, hitos, explicación simple y próximos trabajos por torre.", badge: "Construcción", tone: "green" },
          ]}
        />
        <AiObservation>
          <p>La empresa ya no debe dirigir solo por percepción. Marta detecta que los mejores resultados aparecen cuando los equipos siguen el protocolo IA: respuestas revisadas, documentos analizados, compromisos registrados y campañas evaluadas por ingresos reales, no solo por leads.</p>
          <p className="mt-3">El nivel de sincronización no mide “actividad decorativa”; mide cuánta inteligencia operacional real se está usando para dirigir decisiones, exigir cumplimiento y evitar que cada equipo trabaje con información incompleta.</p>
        </AiObservation>
      </div>
      <SimpleTable
        columns={["Área", "Indicador", "Resultado", "Responsable", "Acción directiva"]}
        rows={[
          ["Campañas", "Ingresos por canal", "Instagram $62,000 / Referidos $51,000", "Marketing", "Premiar referidos y corregir Instagram"],
          ["Vendedoras", "Uso de Marta", "Promedio 76%", "Dir. Comercial", "Revisión semanal individual"],
          ["Pagos", "Atrasos críticos", "$28,500", "Financiera", "Contactar clientes en 72h"],
          ["Documentos", "Pendientes vencidos", "31", "Ventas", "Activar mensajes IA y checklist simplificado"],
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
        subtitle="Expediente vivo desde la reserva hasta la entrega: comunicaciones, documentos, pagos, citas, servicio, compromisos, evidencias y propuestas de Marta."
        icon={UserRound}
        sync={martaSync.client}
        badges={[REPORT_DATE, profile.cliente.name, profile.pipeline.status]}
        syncNote="El 91% representa una estimación global de qué tanto la vendedora asignada está revisando, aprovechando y dando seguimiento a las recomendaciones de Marta en este expediente. No se busca obediencia ciega: se espera criterio humano, revisión y acción disciplinada."
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
                <InfoCard title="AMENA ID" value={profile.cliente.amenaId} detail="Identificador único del expediente comercial y operativo." />
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
            <h2 className="text-3xl font-black text-slate-950">Marta · Inteligencia Operacional</h2>
            <p className="text-base font-semibold text-slate-700">Marta interpreta señales humanas, comerciales y operativas.</p>
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
                  { unit: "A704", model: "Modelo A", status: "Instalaciones eléctricas en prueba", reservationId: "AMENA-RES-000784", owner: "Carlos Méndez", practicalAdvance: "Muros internos listos, instalaciones eléctricas en validación y ventanas ya colocadas.", directorNote: "Sirve para mostrar consistencia entre promesa comercial y avance real.", sellerNote: "Puede explicarse que la unidad está más avanzada que otras del mismo sector.", reservedClientNote: "Se recomienda enviar fotos internas y cronograma de próximos acabados al propietario de esta unidad.", newLeadNote: "Buena unidad para mostrar seguridad de avance al prospecto, sin revelar información privada del reservante.", nextEvidence: "Enviar set de fotografías + hito de próximas 2 semanas." },
                  { unit: "A705", model: "Modelo A", status: "Ventanas instaladas", reservationId: "AMENA-RES-000785", owner: "Reservante privado", practicalAdvance: "Ventanas completas, pruebas de instalaciones pendientes y acabados aún no iniciados.", directorNote: "Unidad útil para comparar secuencia de obra con A704.", sellerNote: "Conviene explicar que no todas las unidades avanzan exactamente al mismo tiempo.", reservedClientNote: "Se puede enviar explicación comparativa corta con A704.", newLeadNote: "Útil para mostrar avance, pero sin prometer acabados inmediatos.", nextEvidence: "Enviar comparativo visual entre dos unidades del mismo nivel." },
                ],
              },
              {
                level: "Nivel 8",
                progress: "69%",
                units: [
                  { unit: "A804", model: "Modelo A", status: "Muros y ductos listos", reservationId: "AMENA-RES-000812", owner: "Reservante privado", practicalAdvance: "Ductos e instalaciones preparadas; aún no inicia validación final.", directorNote: "Refuerza visión de avance consistente por encima del nivel 7.", sellerNote: "Se puede usar para explicar orden lógico de ejecución.", reservedClientNote: "Mensaje de tranquilidad: la secuencia está dentro del plan.", newLeadNote: "No mostrar como unidad terminada; mostrarla como avance sólido.", nextEvidence: "Enviar reporte visual simple con lenguaje no técnico." },
                ],
              },
            ],
          },
          {
            tower: "Torre 5",
            progress: "42%",
            commercialRisk: "Genera ansiedad comparativa frente a Torre 3 por ventanas aún no instaladas.",
            levels: [
              { level: "Nivel 6", progress: "45%", units: [ { unit: "B602", model: "Modelo B", status: "Obra gris avanzada", reservationId: "AMENA-RES-000901", owner: "Reservante privado", practicalAdvance: "Estructura sólida; ventanas pendientes por lote del proveedor.", directorNote: "Importante coordinar narrativa única entre construcción y ventas.", sellerNote: "Nunca decir solo ‘va atrasado’; explicar secuencia técnica.", reservedClientNote: "Mensaje ideal: la fase actual es correcta y evita retrabajos.", newLeadNote: "Mostrar con prudencia; acompañar siempre con explicación.", nextEvidence: "Enviar bitácora de secuencia técnica y fecha de próxima actualización." } ] },
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
          { tower: "Manzana 3", progress: "61%", commercialRisk: "Los clientes preguntan por calles internas, acometidas y avance de casa modelo.", levels: [ { level: "Lotes", progress: "61%", units: [ { unit: "Lote 14", model: "Casa Aura", status: "Fundaciones y acometidas listas", reservationId: "AMENA-RES-CASA-014", owner: "Reservante privado", practicalAdvance: "Fundaciones terminadas, acometidas preparadas y urbanización de acceso en ejecución.", directorNote: "Permite mostrar avance real de casas sin usar lógica de torres.", sellerNote: "Explicar avances de casa y avances de urbanización por separado.", reservedClientNote: "Enviar informe particular de su lote, fotos de fundación y fecha de siguiente hito.", newLeadNote: "Mostrar casa modelo y avance de urbanización general, sin exponer datos del comprador.", nextEvidence: "Fotos de lote + plano de manzana + hito de urbanización." } ] } ] },
        ],
      },
    ],
  },
];

function ConstructionPage() {
  const [mode, setMode] = useState("explore");
  const [reservationQuery, setReservationQuery] = useState("AMENA-RES-000784");
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
      <PageHeader title="Avances de Construcción" subtitle="Control operativo de casas y apartamentos. La exploración sirve para nuevos interesados; el acceso por ID de reserva sirve para enviar informes privados al propietario de la unidad reservada." icon={HardHat} sync={martaSync.construction} badges={[REPORT_DATE, "Tipo → sector → torre/manzana → nivel/lote", "Reportes privados"]} />
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
            <input value={reservationQuery} onChange={(e) => setReservationQuery(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-900 outline-none" placeholder="Ej. AMENA-RES-000784" />
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
              <BitacoraItem title="Canales de envío" text="WhatsApp, email o ambos, dejando evidencia en CRM y timeline del cliente." />
            </div>
          </div>
        </Card>
      )}

      {mode === "explore" && (
        <Card>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">Exploración operacional por capas</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Primero se elige el tipo: casa o apartamento. Luego el usuario decide a qué área quiere entrar: sector, torre o manzana, nivel o lote, y finalmente unidad. Así se evita mostrar una “Biblia completa” desde el inicio.</p>
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
      <PageHeader title="Documentos del Cliente" subtitle="Gestión documental desde visión general hasta microdetalle: documentos esperados, recibidos, observados, aprobados, mora promedio y acciones sugeridas por Marta." icon={FileText} sync={martaSync.documents} badges={[REPORT_DATE, "Revisión IA", "Checklist operativo"]} />
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
          <SimpleTable columns={["Documento", "Cantidad / estado", "Formato", "Observación Marta", "Acción vendedora", "Evidencia"]} rows={[
            ["DUI", "15 recibidos / 4 pendientes", "PDF/JPG", "Legibles en 13 casos; 2 imágenes borrosas", "Solicitar reenvío solo a casos observados", "Archivo"],
            ["Constancias laborales", "18 pendientes / mora promedio 6 días", "PDF", "Retraso recurrente por tiempos internos de empresas", "Enviar carta modelo para solicitar constancia en RRHH", "Propuesta Marta"],
            ["Comprobante de reserva", "31 recibidos / 3 en revisión", "PDF/Imagen", "2 comprobantes no muestran referencia bancaria", "Pedir comprobante completo", "Supabase"],
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
          { title: "Acción masiva", text: "Enviar carta modelo editable para que el cliente la entregue en su puesto de trabajo y reduzca fricción con RRHH.", badge: "IA sugerida", tone: "violet" },
        ]} />
        <DetailStack title="Detalle" subtitle="Seguimiento por cliente." items={[
          { title: "Carlos Méndez", text: "DUI recibido, constancia laboral pendiente y comprobante parcial. Marta recomienda llamada breve + checklist por WhatsApp.", badge: "Prioridad alta", tone: "red" },
          { title: "Ana López", text: "Documentos completos, pendiente validación financiera. No requiere presión comercial en este momento.", badge: "Validar", tone: "blue" },
        ]} />
        <AiObservation>
          <p>La gestión documental debe enseñar al equipo dónde se atasca el cliente. Marta no solo debe decir “falta documento”; debe explicar por qué falta, qué texto enviar, a quién escalar y qué impacto tiene sobre la formalización.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Pagos y Compromisos" subtitle="Control del período desde la reserva hasta la entrega: ingresos recibidos, pendientes, atrasos, justificaciones, compromisos, evidencia y sugerencias puntuales de IA." icon={CreditCard} sync={martaSync.payments} badges={[REPORT_DATE, "Reserva a entrega", "Sugerencias IA"]} />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Ingresos recibidos" value="$184,500" note="Etapa reserva-entrega · corte 15 mayo 2026" tone="green" icon={WalletCards} />
        <Metric title="Pendiente" value="$58,200" note="Primas y gastos" tone="amber" icon={Clock} />
        <Metric title="Atrasos" value="21" note="Clientes con mora" tone="red" icon={AlertTriangle} />
        <Metric title="Acciones IA" value="39" note="Recordatorios sugeridos" tone="violet" icon={Bot} />
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
      <PageHeader title="Servicio al Cliente" subtitle="Tickets, incidencias, garantías, acuerdos, tiempos de atención, reclamos, consultas, escalaciones y aprendizaje operativo para directores y vendedoras." icon={Headphones} sync={martaSync.service} badges={[REPORT_DATE, "Tiempos de atención", "Escalaciones"]} />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Tickets abiertos" value="34" note="7 críticos" tone="amber" icon={Headphones} onClick={() => setActiveService("tickets")} active={activeService === "tickets"} />
        <Metric title="Tiempo de atención" value="1h 12m" note="Promedio; meta máxima 4h" tone="green" icon={Clock} onClick={() => setActiveService("tiempo")} active={activeService === "tiempo"} />
        <Metric title="Escalaciones" value="6" note="Legal / Construcción / Financiera" tone="red" icon={AlertTriangle} onClick={() => setActiveService("escalaciones")} active={activeService === "escalaciones"} />
        <Metric title="Resueltos con IA" value="68%" note="Con apoyo de Marta" tone="violet" icon={Bot} onClick={() => setActiveService("resueltos")} active={activeService === "resueltos"} />
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
        <AiObservation title="Aprendizajes operativos de Marta">
          <p>Los tickets no deben verse solo como reclamos. Son señales de aprendizaje. Si varios clientes preguntan lo mismo, la empresa debe convertirlo en guion, PDF, respuesta estándar o mejora del reporte semanal.</p>
          <p className="mt-3">Marta recomienda explicar internamente cada escalación con pedagogía: qué pasó, por qué importa, cómo responder y qué debe aprender ventas para la próxima conversación.</p>
        </AiObservation>
      </div>
    </div>
  );
}

function SellersPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Gestión de Vendedoras" subtitle="Lupa operativa sobre cada vendedora: productividad, disciplina comercial, adopción de Marta, formularios completados, calidad de información capturada y recomendaciones de mejora." icon={Users} sync={martaSync.sellers} badges={[REPORT_DATE, "General → vendedora → formulario", "Indicadores"]} />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Vendedoras" value="8" note="Equipo activo" tone="blue" icon={Users} />
        <Metric title="Uso Marta" value="76%" note="Promedio equipo" tone="violet" icon={Bot} />
        <Metric title="Tareas vencidas" value="19" note="5 críticas" tone="red" icon={AlertTriangle} />
        <Metric title="Formularios" value="143" note="Datos humanos/comerciales capturados" tone="green" icon={ClipboardList} />
      </div>

      <Card>
        <h3 className="text-3xl font-black text-slate-950">Dashboard operativo de vendedoras</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Indicadores que permiten retroalimentar al equipo sin esperar al cierre del mes.</p>
        <div className="mt-5">
          <SimpleTable columns={["Vendedora", "Clientes", "Uso Marta", "Formularios", "Tareas vencidas", "Ingresos", "Recomendación Marta"]} rows={[
            ["María Fernanda · VND-034", "28", "91%", "42", "2", "$82,000", "Mantener protocolo; documenta muy bien objeciones familiares"],
            ["Carolina Díaz · VND-021", "22", "63%", "14", "7", "$41,500", "Debe registrar datos después de cada llamada; baja captura humana"],
            ["Ana Guardado · VND-017", "19", "78%", "29", "4", "$36,000", "Revisar propuestas Marta antes de responder pagos"],
            ["Lucía Herrera · VND-009", "31", "84%", "36", "6", "$59,000", "Alta carga; conviene redistribuir clientes críticos"],
          ]} />
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Lupa de vendedora · María Fernanda</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Perfil individual con observaciones de Marta y seguimiento de recomendaciones.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard title="Fortaleza" value="Alta disciplina de seguimiento" detail="Registra acuerdos, llama dentro de ventanas recomendadas y usa propuestas IA." />
            <InfoCard title="Riesgo" value="Carga operativa alta" detail="Tiene 28 clientes activos y 4 con sensibilidad financiera." />
            <InfoCard title="Recomendación Marta" value="Priorizar casos financieros" detail="Atender primero clientes con compromisos en 72h." />
            <InfoCard title="Seguimiento vendedora" value="En proceso" detail="Campo para que la vendedora confirme qué hizo con la recomendación de Marta." />
          </div>
        </Card>
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Formularios operativos de vendedoras</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">La información no termina en la reserva. Cada contacto posterior genera datos personales, familiares, económicos y comerciales que deben alimentar a Marta.</p>
          <div className="mt-5 space-y-3">
            <FormItem title="Formulario de llamada de pago" fields="Monto conversado, objeción real, decisor familiar, fecha prometida, tono emocional, evidencia." />
            <FormItem title="Formulario de información familiar" fields="Quién decide, preocupaciones del cónyuge, hijos, prioridades de ubicación, temor principal." />
            <FormItem title="Formulario financiero" fields="Ingreso declarado, banco probable, obstáculos, documentos pendientes, capacidad percibida." />
            <FormItem title="Formulario de construcción" fields="Dudas sobre torre, fecha, acabados, garantía, fotos solicitadas y respuesta dada." />
          </div>
        </Card>
      </div>
      <AiObservation>
        <p>La página de vendedoras debe funcionar como espejo operativo: qué hacen bien, qué omiten, qué información no están capturando y cómo eso afecta a clientes, financiera, construcción y dirección comercial.</p>
        <p className="mt-3">Marta no solo evalúa resultados finales; evalúa hábitos: registrar información, usar recomendaciones, cumplir llamadas, documentar objeciones y convertir conversaciones dispersas en inteligencia accionable.</p>
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
        modeloA: { title: "Campaña Instagram · Modelo A", result: "Alta atracción / formalización baja", diagnosis: "El anuncio promete vida premium, pero el flujo posterior no filtra capacidad financiera ni urgencia real.", action: "Agregar pregunta de presupuesto, CTA a simulación y retargeting a clientes que abrieron PDF.", marta: "Marta detecta un tumor silencioso: volumen alto que puede saturar vendedoras si no se filtra intención y capacidad desde el primer contacto." },
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
      <PageHeader title="Canales y Campañas" subtitle="Radiografía por canal y por campaña: primero se elige el canal, luego se despliegan sus campañas vigentes o históricas, y después se abre la lupa con análisis y comentarios de Marta." icon={Megaphone} sync={martaSync.campaigns} badges={[REPORT_DATE, "Canales → campañas → análisis IA", "Recomendaciones"]} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Metric title="Instagram" value="$62,000" note="Mayor volumen" tone="green" icon={BadgeDollarSign} onClick={() => selectChannel("instagram")} active={selectedChannel === "instagram"} />
        <Metric title="Referidos" value="$51,000" note="Mejor calidad" tone="blue" icon={Users} onClick={() => selectChannel("referrals")} active={selectedChannel === "referrals"} />
        <Metric title="WhatsApp" value="$28,500" note="Campañas directas" tone="green" icon={MessageCircle} onClick={() => selectChannel("whatsapp")} active={selectedChannel === "whatsapp"} />
        <Metric title="Email" value="$18,000" note="Reactivación" tone="amber" icon={Mail} />
        <Metric title="Llamadas IA" value="$25,000" note="VAPI/Marta" tone="violet" icon={PhoneCall} />
      </div>
      <SimpleTable columns={["Canal", "Responsable", "Leads", "Reservas", "Ingresos", "Dolor detectado", "Acción directiva"]} rows={[
        ["Instagram", "Andrea M.", "412", "18", "$62,000", "Mucho volumen, menor formalización", "Auditar promesas y segmentación"],
        ["Facebook", "Roberto C.", "238", "11", "$31,500", "Leads curiosos con baja urgencia", "Mejorar filtro inicial"],
        ["Referidos", "Equipo ventas", "77", "16", "$51,000", "Poco volumen pero alta calidad", "Escalar incentivo"],
        ["WhatsApp campaña", "María F.", "96", "9", "$28,500", "Buen cierre si hay seguimiento IA", "Replicar guion"],
      ]} />
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-3xl font-black text-slate-950">Campañas dentro del canal · {selectedChannelData.channel}</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-700">{selectedChannelData.summary} Selecciona una campaña para abrir su diagnóstico, comentarios de Marta y acciones correctivas.</p>
          </div>
          <Badge tone="blue">Canal → campañas → lupa IA</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(selectedChannelData.campaigns).map(([key, campaign]) => <DrillButton key={key} active={selectedCampaign === key} onClick={() => setSelectedCampaign(key)}>{campaign.title}</DrillButton>)}
        </div>
        <div className="mt-5"><CampaignCard title={currentCampaign.title} result={currentCampaign.result} diagnosis={currentCampaign.diagnosis} action={currentCampaign.action} /></div>
        <div className="mt-5 rounded-3xl border border-violet-100 bg-violet-50 p-5 text-base font-semibold leading-8 text-slate-800"><span className="font-black text-slate-950">Comentario de Marta:</span> {currentCampaign.marta}</div>
      </Card>
      <AiObservation>
        <p>Marta recomienda analizar campañas como sistemas completos: promesa del anuncio, calidad del lead, respuesta inicial, conversación con vendedora, documentación, pagos e ingresos reales.</p>
        <p className="mt-3">Un tumor silencioso puede ser una campaña que genera muchos leads baratos pero consume tiempo, satura vendedoras y no formaliza. Ese tipo de daño debe verse en esta página.</p>
      </AiObservation>
    </div>
  );
}

function CampaignDeliveryPage() {
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  return (
    <div className="space-y-5">
      <PageHeader title="Envío de Campañas Promocionales" subtitle="Módulo para cargar una base de datos de prospectos y enviar campañas por WhatsApp, correo electrónico o asistente de voz. Las respuestas del destinatario entran al CRM y alimentan el embudo de ventas normal." icon={Send} sync={martaSync.campaignDelivery} badges={[REPORT_DATE, "Excel → WhatsApp / Email / Voz", "Entrada a CRM"]} />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Prospectos cargados" value="1,250" note="Archivo Excel validado" tone="blue" icon={UploadCloud} />
        <Metric title="Listos para envío" value="1,118" note="132 requieren limpieza" tone="green" icon={CheckCircle2} />
        <Metric title="Canales activos" value="3" note="WhatsApp, email y voz" tone="violet" icon={Layers3} />
        <Metric title="Respuestas esperadas" value="18%" note="Estimación Marta" tone="amber" icon={Bot} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Carga de base de datos</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Se carga un Excel con nombre, teléfono, correo, fuente, interés, presupuesto estimado y notas. Marta valida duplicados, campos faltantes y riesgo de baja calidad.</p>
          <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <UploadCloud className="mx-auto text-slate-600" size={42} />
            <h4 className="mt-4 text-2xl font-black text-slate-950">Subir archivo Excel</h4>
            <p className="mt-2 text-base font-semibold text-slate-700">Clientes potenciales · XLSX / CSV · Validación previa al envío.</p>
          </div>
          <div className="mt-5"><SimpleTable columns={["Campo", "Estado", "Comentario Marta"]} rows={[["Teléfono", "94% válido", "Normalizar formato +503"], ["Correo", "87% válido", "132 registros sin correo"], ["Interés", "72% clasificado", "Falta categorizar 350 prospectos"], ["Fuente", "Completa", "Lista para atribución de campaña"]]} /></div>
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
            <p className="mt-2 text-base font-semibold leading-8 text-slate-800">Canal activo: {selectedChannel === "all" ? "WhatsApp + Email + Voz" : selectedChannel}. Las respuestas se registrarán en CRM, crearán actividad en el timeline y podrán disparar tareas para vendedoras.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <button className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white">Preparar audiencia</button>
              <button className="rounded-2xl bg-violet-600 px-5 py-4 text-sm font-black text-white">Revisar mensaje Marta</button>
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
    reserva: { title: "Embudo de pre-reserva a formalización", stages: [["Lead interesado", "Origen: campaña, referido o app pública", "Asignar vendedora y registrar fuente"], ["Pre-reserva", "Unidad seleccionada", "Enviar confirmación y próximos pasos"], ["Documentos", "Checklist en proceso", "Marta detecta faltantes"], ["Pago", "Prima / gastos legales", "Seguimiento financiero"], ["Formalización", "Validación interna", "Cierre operativo"]] },
    reactivacion: { title: "Embudo de reactivación de prospectos", stages: [["Base histórica", "Excel o CRM", "Limpiar datos"], ["Campaña", "WhatsApp, email o voz", "Medir respuesta"], ["Interés renovado", "Cliente responde", "Crear tarea"], ["Reserva potencial", "Explora unidad", "Agendar llamada"], ["Cierre", "Seguimiento humano", "Medir conversión"]] },
    referidos: { title: "Embudo de referidos", stages: [["Comprador actual", "Cliente satisfecho", "Solicitar referido"], ["Referido recibido", "Alta confianza", "Contacto rápido"], ["Exploración", "Unidad sugerida", "Mostrar avance y evidencia"], ["Pre-reserva", "Decisión más rápida", "Acompañamiento Marta"], ["Formalización", "Cierre con menor fricción", "Registrar aprendizaje"]] },
  };
  const current = funnels[selectedFunnel];
  return (
    <div className="space-y-5">
      <PageHeader title="Archivo de Embudos de Ventas" subtitle="Biblioteca operativa para guardar, consultar y reutilizar las estructuras de embudos que funcionen en campañas, reservas, reactivaciones y referidos." icon={Layers3} sync={martaSync.funnels} badges={[REPORT_DATE, "Plantillas reutilizables", "Aprendizaje comercial"]} />
      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Embudos guardados" value="12" note="Plantillas operativas" tone="blue" icon={Layers3} />
        <Metric title="Más efectivo" value="Referidos" note="Mayor conversión" tone="green" icon={Users} />
        <Metric title="En revisión" value="3" note="Requieren ajuste Marta" tone="amber" icon={Bot} />
      </div>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div><h3 className="text-3xl font-black text-slate-950">Biblioteca de embudos</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Conviene tener esta página. Evita perder aprendizajes, permite reutilizar estructuras efectivas y ayuda a comparar qué embudos funcionan mejor por canal, producto y perfil de cliente.</p></div>
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
        <p>Marta recomienda guardar los embudos como activos comerciales reutilizables. Cada campaña exitosa debe dejar una plantilla: etapas, mensajes, criterios de avance, responsables, métricas y aprendizajes para futuras ejecuciones.</p>
      </AiObservation>
    </div>
  );
}

function DashboardsPage() {
  const [query, setQuery] = useState("Muéstrame ingresos recibidos por canal, modelo, sector y vendedora");
  const [selectedLens, setSelectedLens] = useState("Canal");
  const lensMap = {
    Canal: { winner: "Instagram", detail: "Genera el mayor ingreso total, pero su formalización es más débil que la de referidos. La lupa debe abrir campañas concretas, mensajes, filtros y tiempos de seguimiento.", actions: ["Auditar promesa del anuncio", "Filtrar mejor urgencia y presupuesto", "Comparar con rendimiento de referidos"] },
    Modelo: { winner: "Modelo A", detail: "Domina en reservas y conversaciones iniciales. Conviene analizar qué perfil de cliente conecta mejor con este modelo y por qué.", actions: ["Reforzar contenido visual", "Relacionar con sectores más fuertes", "Analizar objeciones recurrentes"] },
    Sector: { winner: "Sector 01", detail: "Concentra mayor volumen e ingresos. Requiere coordinación constante con construcción, especialmente en Torre 3.", actions: ["Cruzar ventas con hitos de construcción", "Monitorear ansiedad comparativa entre torres", "Enviar reportes semanales visuales"] },
    Vendedora: { winner: "VND-034", detail: "Es la mejor combinación de disciplina comercial, uso de Marta e ingresos recibidos.", actions: ["Replicar hábitos", "Estudiar sus formularios", "Usarla como caso interno de aprendizaje"] },
  };
  const currentLens = lensMap[selectedLens];

  return (
    <div className="space-y-5">
      <PageHeader title="Dashboards Ejecutivos" subtitle="Dashboards básicos, consultas ejecutivas por texto o voz, desagregación inteligente de preguntas y respuestas visuales con lupa por canal, modelo, sector o vendedora." icon={BarChart3} sync={martaSync.dashboards} badges={[REPORT_DATE, "Dashboards base", "Texto y voz"]} />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Ingresos totales" value="$184,500" note="Por canal, producto y equipo" tone="green" icon={BadgeDollarSign} />
        <Metric title="Mejor canal" value="Instagram" note="$62,000; revisar calidad" tone="blue" icon={Megaphone} />
        <Metric title="Mejor modelo" value="Modelo A" note="34 reservas" tone="violet" icon={Home} />
        <Metric title="Mejor vendedora" value="VND-034" note="$82,000" tone="amber" icon={Users} />
      </div>
      <Card>
        <h3 className="text-3xl font-black text-slate-950">Dashboards que no pueden faltar</h3>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <DashboardMini title="Ingresos y formalización" text="Ingresos recibidos, pendientes, atrasos y conversión real por canal, campaña, modelo y vendedora." />
          <DashboardMini title="Operación comercial" text="Tareas vencidas, uso de Marta, formularios completados, velocidad de respuesta y seguimiento por equipo." />
          <DashboardMini title="Riesgo integral" text="Clientes críticos por pagos, documentos, construcción, servicio al cliente y señales humanas detectadas." />
        </div>
      </Card>
      <Card>
        <h3 className="text-3xl font-black text-slate-950">Centro de consultas ejecutivas</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">El Director plantea una inquietud amplia. Marta la desagrega en preguntas o categorías para responderla con más rigor.</p>
        <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_auto_auto]">
          <div className="rounded-2xl bg-slate-50 p-4 text-base font-bold text-slate-800">“{query}”</div>
          <button className="rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white"><PencilLine size={18} className="mr-2 inline" />Texto</button>
          <button className="rounded-2xl bg-violet-600 px-6 py-4 text-base font-black text-white"><Mic size={18} className="mr-2 inline" />Voz</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["¿Qué canal genera más ingresos reales y menos atrasos?", "¿Qué vendedoras aprovechan mejor a Marta?", "¿Qué modelos se venden más rápido por sector?", "¿Qué campañas generan leads de baja calidad?"].map((s) => <button key={s} onClick={() => setQuery(s)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-800 hover:bg-slate-200">{s}</button>)}
        </div>
        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <h4 className="text-xl font-black text-slate-950">Desagregación propuesta por Marta</h4>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Para resolver la inquietud del Director, Marta propone separar el requerimiento en cuatro categorías complementarias:</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Ingresos reales por canal y campaña", "Conversión por modelo, sector y unidad", "Desempeño de vendedoras y adopción de Marta", "Riesgos financieros, documentales y de construcción"].map((c, i) => <div key={c} className="rounded-2xl bg-white p-4 text-base font-black text-slate-950">{i + 1}. {c}</div>)}
          </div>
          <div className="mt-5 grid gap-3 xl:grid-cols-[auto_1fr_auto]">
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Estoy de acuerdo</button>
            <input className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold outline-none" placeholder="Escriba sus ampliaciones antes de enviar el requerimiento final" />
            <button className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white"><Mic size={16} className="mr-2 inline" />Ampliar por voz</button>
          </div>
          <button className="mt-4 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-black text-white">Enviar requerimiento final</button>
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
          <p>Recomendaciones: felicitar a VND-034 por adopción de Marta y resultados; exigir a Marketing corrección de Instagram porque genera volumen pero menor calidad; reforzar campañas de referidos por mejor conversión e ingresos reales.</p>
          <p className="mt-3">Al hacer lupa en Instagram, Marta debe mostrar campañas concretas, ejemplos de promesas débiles, casos referenciales y acciones para mejorar segmentación, filtro financiero y seguimiento.</p>
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

function DemoPage() {
  const verificationPanels = {
    invitation: { title: "Invitación y reserva en vivo", items: ["Verificar que el director comercial haya recibido el link por WhatsApp o email.", "Abrir la app pública en el móvil del invitado.", "Abrir en la computadora la misma app para la demostración paralela.", "Confirmar que ambos recorridos están visibles para el público."] },
    vapi: { title: "Verificaciones Vapi y Marta", items: ["Mostrar transcripción de la conversación.", "Mostrar evaluación de la llamada.", "Mostrar salida estructurada.", "Mostrar costos de la llamada."] },
    operations: { title: "Verificaciones operacionales", items: ["Mostrar registro en Supabase.", "Mostrar mensaje enviado por WhatsApp.", "Mostrar correo electrónico enviado.", "Mostrar actualización en CRM.", "Mostrar cita agendada en calendario."] },
    analytics: { title: "Verificaciones analíticas", items: ["Mostrar dashboards ejecutivos.", "Consultar una métrica en tiempo real.", "Abrir lupa por canal, sector o vendedora.", "Cerrar la demo mostrando trazabilidad completa."] },
  };
  const [selectedPanel, setSelectedPanel] = useState("invitation");
  const currentPanel = verificationPanels[selectedPanel];

  return (
    <div className="space-y-5">
      <PageHeader title="Sala Demo Operativa" subtitle="Orquesta la presentación frente al cliente: envío del link, ejecución simultánea de la reserva, conversación con Marta y verificación en vivo de todas las evidencias técnicas y operacionales." icon={Smartphone} sync={martaSync.demo} badges={[REPORT_DATE, "Presentación en vivo", "Credibilidad operacional"]} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Invitados en sala" value="7" note="Comité comercial y decisores" tone="blue" icon={Users} />
        <Metric title="Verificaciones" value="9" note="Técnicas y operacionales" tone="green" icon={CheckCircle2} />
        <Metric title="Canales en vivo" value="6" note="App, Marta, Vapi, CRM, WA, Email" tone="violet" icon={Layers3} />
        <Metric title="Estado demo" value="92%" note="Lista para presentación" tone="amber" icon={Target} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Captura del invitado principal</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Durante la presentación, aquí se escriben los datos del director comercial o del miembro del equipo que va a recibir el link y hacer la prueba en su móvil.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DemoInput label="Nombre completo" placeholder="Ej. Carlos Pérez" />
            <DemoInput label="Cargo" placeholder="Ej. Director Comercial" />
            <DemoInput label="Correo electrónico" placeholder="director@empresa.com" />
            <DemoInput label="Teléfono" placeholder="+503 7000-0000" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <button className="rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white"><Send size={16} className="mr-2 inline" />Enviar link app reservas</button>
            <button className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white"><ExternalLink size={16} className="mr-2 inline" />Abrir app pública</button>
            <button className="rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white"><Smartphone size={16} className="mr-2 inline" />Copiar link</button>
          </div>
          <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-black uppercase tracking-[0.22em] text-slate-700">Propósito del bloque</div>
            <p className="mt-2 text-base font-semibold leading-8 text-slate-800">Este bloque te permite mostrar, desde el primer minuto, que el demo no es una simulación aislada sino una experiencia conectada: se captura un contacto real, se le envía un link real y el invitado entra realmente a la app pública desde su móvil.</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-3xl font-black text-slate-950">Ruta escénica de la demostración</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Secuencia recomendada para la presentación frente al cliente.</p>
          <div className="mt-5 space-y-3">
            <StepCard number="1" title="Envío del link" text="Capturas el nombre, cargo, correo y teléfono del invitado; envías el link de la app de reservas y le pides abrirlo en su móvil." />
            <StepCard number="2" title="Recorrido paralelo" text="Mientras el invitado interactúa con la app en su celular, tú proyectas la misma app desde tu computadora y haces una reserva paralela." />
            <StepCard number="3" title="Conversación con Marta" text="Al terminar la reserva, ambos pueden conversar con Marta; el público escucha y ve la interacción." />
            <StepCard number="4" title="Prueba de credibilidad" text="Después abres Vapi, Supabase, WhatsApp, email, CRM y calendario para mostrar evidencia real de todo lo que ocurrió." />
            <StepCard number="5" title="Cierre ejecutivo" text="Finalizas con dashboards, métricas y una consulta analítica para demostrar que la operación también genera inteligencia ejecutiva." />
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div><h3 className="text-3xl font-black text-slate-950">Accesos rápidos durante la demo</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Todo lo necesario para moverte durante la presentación sin perder ritmo ni credibilidad.</p></div>
          <Badge tone="blue">Operación en vivo</Badge>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <VerificationCard icon={Home} title="App pública" text="Abrir la experiencia de reserva que usarán los asistentes." />
          <VerificationCard icon={Bot} title="Marta" text="Entrar al widget o al punto de conversación posterior a la reserva." />
          <VerificationCard icon={Database} title="Base de datos" text="Mostrar el registro creado en Supabase." />
          <VerificationCard icon={BarChart3} title="Dashboards" text="Abrir los cuadros ejecutivos y hacer una consulta final." />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <button className="rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white">Abrir app pública</button>
          <button className="rounded-2xl bg-violet-600 px-4 py-4 text-sm font-black text-white">Abrir conversación Marta</button>
          <button className="rounded-2xl bg-emerald-600 px-4 py-4 text-sm font-black text-white">Abrir Vapi</button>
          <button className="rounded-2xl bg-blue-600 px-4 py-4 text-sm font-black text-white">Abrir Supabase</button>
          <button className="rounded-2xl bg-amber-600 px-4 py-4 text-sm font-black text-white">Abrir CRM</button>
          <button className="rounded-2xl bg-slate-200 px-4 py-4 text-sm font-black text-slate-900">Abrir calendarios</button>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div><h3 className="text-3xl font-black text-slate-950">Centro de verificaciones de credibilidad</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">Este bloque es crítico: aquí muestras que lo conversado en la reserva y con Marta se transformó en evidencias reales dentro del ecosistema operativo.</p></div>
          <Badge tone="green">Demostración de confiabilidad</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <DrillButton active={selectedPanel === "invitation"} onClick={() => setSelectedPanel("invitation")}>Invitación y reserva</DrillButton>
          <DrillButton active={selectedPanel === "vapi"} onClick={() => setSelectedPanel("vapi")}>Vapi y Marta</DrillButton>
          <DrillButton active={selectedPanel === "operations"} onClick={() => setSelectedPanel("operations")}>Operaciones</DrillButton>
          <DrillButton active={selectedPanel === "analytics"} onClick={() => setSelectedPanel("analytics")}>Analítica</DrillButton>
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-2xl font-black text-slate-950">{currentPanel.title}</h4>
          <div className="mt-4 grid gap-3">{currentPanel.items.map((item) => <div key={item} className="rounded-2xl bg-white p-4 text-base font-semibold leading-7 text-slate-800">{item}</div>)}</div>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <AiObservation title="Por qué esta página es tan importante">
          <p>Esta no es una página decorativa. Es la mesa de control de la presentación. Desde aquí tú provocas el evento, guías la interacción, muestras la trazabilidad y conviertes la experiencia en una demostración contundente de confiabilidad.</p>
          <p className="mt-3">La lógica correcta de esta página no es “mostrar botones”, sino ayudarte a dirigir un momento empresarial donde el cliente percibe que la solución ya está viva, conectada y lista para operar.</p>
        </AiObservation>
        <Card>
          <h3 className="text-2xl font-black text-slate-950">Cierre sugerido del demo</h3>
          <p className="mt-3 text-base font-semibold leading-8 text-slate-800">1. Confirmas que el invitado recibió el link y usó la app.<br />2. Muestras la reserva paralela y la conversación con Marta.<br />3. Enseñas Vapi: transcripción, evaluación, salida estructurada y costos.<br />4. Enseñas Supabase, WhatsApp, email, CRM y calendario.<br />5. Cierras con dashboards y una consulta ejecutiva en vivo.</p>
          <div className="mt-4 flex flex-wrap gap-2"><Badge tone="dark">Escena empresarial</Badge><Badge tone="blue">Prueba simultánea</Badge><Badge tone="green">Confiabilidad demostrada</Badge></div>
        </Card>
      </div>
    </div>
  );
}

function InfoCard({ title, value, detail }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{title}</div><div className="mt-2 text-base font-black text-slate-950">{value}</div>{detail && <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">{detail}</div>}</div>;
}

function KpiCard({ title, value, color }) {
  const colors = { green: "bg-emerald-100 text-emerald-800", amber: "bg-amber-100 text-amber-800", red: "bg-rose-100 text-rose-800", blue: "bg-blue-100 text-blue-800" };
  return <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{title}</div><div className={`mt-3 inline-flex rounded-full px-4 py-2 text-base font-black ${colors[color]}`}>{value}</div></div>;
}

function EvidenceCard({ title, value }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-lg font-black text-slate-950">{title}</div><div className="mt-3 rounded-full bg-emerald-100 px-4 py-2 text-base font-bold text-emerald-800 inline-flex">{value}</div></div>;
}

function TimelineBlock({ items }) {
  return <Card><h2 className="text-3xl font-black text-slate-950">Timeline Operacional Total</h2><p className="mt-2 text-base font-semibold text-slate-700">Historial unificado de comunicaciones, tickets, pagos, seguimientos y eventos operacionales.</p><div className="mt-6 space-y-4">{items.map((item) => <TimelineItem key={`${item.time}-${item.title}`} time={item.time} title={item.title} description={item.description} />)}</div></Card>;
}

function TimelineItem({ time, title, description }) {
  return <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"><div className="text-sm font-black text-slate-700 w-16">{time}</div><div><div className="text-lg font-black text-slate-950">{title}</div><div className="mt-1 text-base font-semibold text-slate-700 leading-7">{description}</div></div></div>;
}

function CommunicationsHub({ channels }) {
  return <Card><div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div><h2 className="text-3xl font-black text-slate-950">Comunicaciones Operacionales</h2><p className="mt-2 max-w-4xl text-base font-semibold text-slate-700 leading-7">Desde el perfil del cliente se pueden leer mensajes recibidos, revisar correos, enviar respuestas, usar plantillas, aprobar sugerencias de Marta y dejar evidencia automática en el timeline operacional.</p></div><div className="flex flex-wrap gap-2"><Badge tone="green">WhatsApp conectado</Badge><Badge tone="blue">Email conectado</Badge></div></div><div className="mt-6 grid gap-5 xl:grid-cols-2">{channels.map((channel) => <CommunicationChannel key={channel.channel} channel={channel.channel} badge={channel.badge} tone={channel.tone} inboxTitle={channel.inboxTitle} messages={channel.messages} actions={channel.actions} recommendation={channel.recommendation} />)}</div></Card>;
}

function CommunicationChannel({ channel, badge, tone, inboxTitle, messages, actions, recommendation }) {
  const mainButton = tone === "green" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700";
  return <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h3 className="text-2xl font-black text-slate-950">{channel}</h3><p className="mt-1 text-base font-semibold text-slate-700">Lectura, respuesta, envío y registro automático de evidencia.</p></div><Badge tone={tone}>{badge}</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-3"><button className={`rounded-2xl px-4 py-3 text-sm font-black text-white ${mainButton}`}>Leer recibidos</button><button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white hover:bg-slate-800">Enviar nuevo</button><button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white hover:bg-violet-700">Revisar propuesta Marta</button></div><div className="mt-5 rounded-2xl bg-white p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">{inboxTitle}</div><div className="mt-4 space-y-3">{messages.map((message) => <div key={`${message.from}-${message.time}-${message.tag}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div className="font-black text-slate-950">{message.from}</div><div className="text-xs font-bold text-slate-600">{message.time}</div></div><p className="mt-2 text-base font-semibold leading-7 text-slate-700">{message.text}</p><div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">{message.tag}</div></div>)}</div></div><div className="mt-4 rounded-2xl bg-white p-4"><div className="text-sm uppercase tracking-[0.22em] text-slate-700 font-black">Acciones rápidas</div><div className="mt-3 flex flex-wrap gap-2">{actions.map((action) => <button key={action} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200">{action}</button>)}</div></div><div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black text-slate-950">Sugerencia Marta:</span> {recommendation}</div></div>;
}

function MartaProposalReviewCenter({ proposals }) {
  return <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm"><div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div><h2 className="text-3xl font-black text-slate-950">Bandeja de Propuestas de Marta</h2><p className="mt-2 max-w-4xl text-base font-semibold text-slate-700 leading-7">Marta analiza WhatsApp, correo o documentos; propone respuestas, próximos pasos y deja todo listo para que la vendedora revise, edite, apruebe y envíe.</p></div><div className="flex flex-wrap gap-2"><Badge tone="violet">4 propuestas pendientes</Badge><Badge tone="slate">Revisión humana requerida</Badge></div></div><div className="mt-6 grid gap-5 xl:grid-cols-3">{proposals.map((proposal) => <MartaProposalCard key={`${proposal.type}-${proposal.title}`} type={proposal.type} title={proposal.title} analysis={proposal.analysis} proposal={proposal.proposal} />)}</div></div>;
}

function MartaProposalCard({ type, title, analysis, proposal }) {
  return <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm"><div className="text-sm uppercase tracking-[0.22em] text-violet-600 font-black">{type}</div><h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3><div className="mt-4 rounded-2xl bg-violet-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Análisis Marta:</span> {analysis}</div><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-base font-semibold leading-7 text-slate-800"><span className="font-black">Propuesta:</span> {proposal}</div><div className="mt-5 flex flex-wrap gap-2"><button className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-black text-white">Revisar</button><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-800">Editar</button><button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Aprobar</button></div></div>;
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

function MiniMetric({ title, value, note, onClick, active = false }) {
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

function DrillButton({ children, active, onClick }) {
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


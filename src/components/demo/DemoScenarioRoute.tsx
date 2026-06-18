type DemoPhase = {
  title: string;
  name: string;
  text: string;
  nextStep: string;
};

type DemoScenarioRouteProps = {
  phases: DemoPhase[];
  progress: number;
  phaseStatus: (index: number) => string;
  onPresentPhase: (index: number) => void;
  onCompletePhase: (index: number) => void;
};

function cls(...values: unknown[]) {
  return values.filter(Boolean).join(" ");
}

function DemoRouteBadge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-900 border-slate-200",
    green: "bg-emerald-100 text-emerald-800 border-emerald-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return <span className={cls("inline-flex items-center rounded-full border px-3 py-1 text-xs font-black", tones[tone] || tones.slate)}>{children}</span>;
}

export default function DemoScenarioRoute({
  phases,
  progress,
  phaseStatus,
  onPresentPhase,
  onCompletePhase,
}: DemoScenarioRouteProps) {
  const statusTone = {
    Pendiente: "amber",
    Activa: "blue",
    Completada: "green",
  };

  return (
    <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div><h3 className="text-3xl font-black text-slate-950">{"Ruta esc\u00e9nica de la demostraci\u00f3n"}</h3><p className="mt-2 text-base font-semibold leading-7 text-slate-700">{"Gu\u00eda operativa para avanzar la demo frente a audiencia, con estado por fase y progreso general."}</p></div>
        <DemoRouteBadge tone="green">{progress}% avance</DemoRouteBadge>
      </div>
      <div className="mt-5 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-emerald-400" style={{ width: `${progress}%` }} /></div>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {phases.map((phase, index) => {
          const state = phaseStatus(index);
          return <div key={phase.title} className={cls("rounded-3xl border p-5", state === "Activa" ? "border-blue-200 bg-blue-50" : state === "Completada" ? "border-emerald-200 bg-emerald-50" : "border-slate-100 bg-slate-50")}><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-black uppercase tracking-[0.22em] text-slate-700">{phase.title}</div><h4 className="mt-2 text-xl font-black text-slate-950">{phase.name}</h4></div><DemoRouteBadge tone={statusTone[state] || "slate"}>{state}</DemoRouteBadge></div><p className="mt-3 text-base font-semibold leading-7 text-slate-700">{phase.text}</p><p className="mt-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-black leading-6 text-slate-800">Siguiente paso: {phase.nextStep}</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => onPresentPhase(index)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Presentar esta fase</button><button onClick={() => onCompletePhase(index)} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white">Fase demostrada</button></div></div>;
        })}
      </div>
    </div>
  );
}

// Estado declarativo del ciclo de vida de una corrida demo.
// No ejecuta transiciones, no modifica datos y no persiste el estado.

export type DemoLifecycleStatus =
  | "draft"
  | "prepared"
  | "certified"
  | "active"
  | "replay_ready"
  | "regeneration_ready"
  | "archived";

export type DemoLifecyclePhase =
  | "preparation"
  | "certification"
  | "operation"
  | "recovery"
  | "archive";

export interface DemoLifecycleState {
  runId: string;
  status: DemoLifecycleStatus;
  phase: DemoLifecyclePhase;
  updatedAt: string;
}

export function buildDemoLifecycleState(
  runId: string,
  status: DemoLifecycleStatus,
  updatedAt: string,
): DemoLifecycleState {
  const phase: DemoLifecyclePhase =
    status === "draft" || status === "prepared"
      ? "preparation"
      : status === "certified"
        ? "certification"
        : status === "active"
          ? "operation"
          : status === "archived"
            ? "archive"
            : "recovery";

  return {
    runId,
    status,
    phase,
    updatedAt,
  };
}

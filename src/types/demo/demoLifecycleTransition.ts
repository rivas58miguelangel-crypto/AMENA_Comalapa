import type {
  DemoLifecycleState,
  DemoLifecycleStatus,
} from "./demoLifecycleState";

// Transicion declarativa entre estados del ciclo de vida de una corrida demo.
// No ejecuta transiciones, no modifica datos y no persiste el estado.

export type DemoLifecycleTransitionType =
  | "prepare"
  | "certify"
  | "activate"
  | "prepare_replay"
  | "prepare_regeneration"
  | "archive_replay"
  | "archive_regeneration";

export interface DemoLifecycleTransition {
  runId: string;
  type: DemoLifecycleTransitionType;
  fromStatus: DemoLifecycleStatus;
  toStatus: DemoLifecycleStatus;
  transitionedAt: string;
}

export function buildDemoLifecycleTransition(
  state: DemoLifecycleState,
  toStatus: DemoLifecycleStatus,
  transitionedAt: string,
): DemoLifecycleTransition {
  const transitionType =
    state.status === "draft" && toStatus === "prepared"
      ? "prepare"
      : state.status === "prepared" && toStatus === "certified"
        ? "certify"
        : state.status === "certified" && toStatus === "active"
          ? "activate"
          : state.status === "active" && toStatus === "replay_ready"
            ? "prepare_replay"
            : state.status === "active" &&
                toStatus === "regeneration_ready"
              ? "prepare_regeneration"
              : state.status === "replay_ready" &&
                  toStatus === "archived"
                ? "archive_replay"
                : state.status === "regeneration_ready" &&
                    toStatus === "archived"
                  ? "archive_regeneration"
                  : undefined;

  if (!transitionType) {
    throw new Error(
      `Unsupported demo lifecycle transition: ${state.status} -> ${toStatus}`,
    );
  }

  return {
    runId: state.runId,
    type: transitionType,
    fromStatus: state.status,
    toStatus,
    transitionedAt,
  };
}

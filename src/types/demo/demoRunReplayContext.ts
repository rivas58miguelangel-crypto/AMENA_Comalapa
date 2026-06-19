import type { DemoOrchestratorInput } from "./demoOrchestrator";

// Conserva la entrada necesaria para repetir una corrida completa sin
// regenerar datos, ejecutar el orquestador ni modificar la corrida original.

export type DemoRunReplayInputSource =
  | "captured_at_run_creation"
  | "supplied_for_regeneration";

export interface DemoRunReplayContextInput {
  runId: string;
  capturedAt: string;
  source: DemoRunReplayInputSource;
  replayVersion?: string;
  orchestratorInput: DemoOrchestratorInput;
}

export interface DemoRunReplayContext {
  runId: string;
  capturedAt: string;
  source: DemoRunReplayInputSource;
  replayVersion: string;
  orchestratorInput: DemoOrchestratorInput;
  supportedScopes: Array<"none" | "full_run">;
  deferredScopes: Array<"category" | "records">;
}

export function createDemoRunReplayContext(
  input: DemoRunReplayContextInput,
): DemoRunReplayContext {
  return {
    runId: input.runId,
    capturedAt: input.capturedAt,
    source: input.source,
    replayVersion: input.replayVersion || "1.0",
    orchestratorInput: structuredClone(input.orchestratorInput),
    supportedScopes: ["none", "full_run"],
    deferredScopes: ["category", "records"],
  };
}

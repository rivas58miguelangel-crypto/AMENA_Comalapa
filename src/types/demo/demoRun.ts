import type { DemoOrchestratorOutput } from "./demoOrchestrator";
import {
  defaultDemoOrchestratorInput,
  orchestrateDemo,
} from "./demoOrchestrator";

// Representa una ejecución completa ya orquestada del Motor Demo H-OperIA.
// No reconstruye escenarios, no reinyecta datos y no persiste información.

export type DemoRunStatus =
  | "draft"
  | "ready"
  | "running"
  | "completed"
  | "archived";

export interface DemoRunAuditMetadata {
  createdAt: string;
  createdBy: string;
  engineVersion: string;
  seed: string;
  isSimulated: true;
  source: "demo_orchestrator";
}

export interface DemoRunOperationalSummary {
  reservations: number;
  internalMessages: number;
  salesReports: number;
  martaVapiLogs: number;
  martaWhatsAppFollowUps: number;
  intelligenceSignals: number;
  operationalEvidence: number;
}

export interface DemoRunExecutiveSummary {
  readinessStatus: DemoOrchestratorOutput["scenario"]["readiness"]["status"];
  companyProfileScore: number;
  recommendedMode: DemoOrchestratorOutput["scenario"]["readiness"]["recommendedMode"];
  isReadyForDemo: boolean;
  narrative: string;
  strategicQuestions: string[];
  criticalRisks: string[];
}

export interface DemoRun {
  runId: string;
  generatedAt: string;
  status: DemoRunStatus;
  prospectCompanyName: string;
  scenarioId: string;
  scenarioName: string;
  scenario: DemoOrchestratorOutput["scenario"];
  injection: DemoOrchestratorOutput["injection"];
  operationalSummary: DemoRunOperationalSummary;
  executiveSummary: DemoRunExecutiveSummary;
  audit: DemoRunAuditMetadata;
}

export interface DemoRunInput {
  runId: string;
  generatedAt: string;
  status?: DemoRunStatus;
  prospectCompanyName: string;
  orchestratorOutput: DemoOrchestratorOutput;
  audit?: Partial<
    Omit<DemoRunAuditMetadata, "isSimulated" | "source">
  >;
}

export function createDemoRun(input: DemoRunInput): DemoRun {
  const { scenario, injection } = input.orchestratorOutput;

  const operationalSummary: DemoRunOperationalSummary = {
    reservations: injection.reservations.length,
    internalMessages: injection.internalMessages.length,
    salesReports: injection.salesReports.length,
    martaVapiLogs: injection.martaVapiLogs.length,
    martaWhatsAppFollowUps: injection.martaWhatsAppFollowUps.length,
    intelligenceSignals: injection.intelligenceSignals.length,
    operationalEvidence: injection.operationalEvidence.length,
  };

  const executiveSummary: DemoRunExecutiveSummary = {
    readinessStatus: scenario.readiness.status,
    companyProfileScore: scenario.readiness.companyProfileScore,
    recommendedMode: scenario.readiness.recommendedMode,
    isReadyForDemo: scenario.readiness.isReadyForDemo,
    narrative: scenario.executiveAssessment.narrative,
    strategicQuestions: [...scenario.operationalSeed.strategicQuestions],
    criticalRisks: [...scenario.operationalSeed.criticalRisks],
  };

  const audit: DemoRunAuditMetadata = {
    createdAt: input.generatedAt,
    createdBy: "h-operia-demo-engine",
    engineVersion: "demo-engine-v1",
    seed: injection.seed,
    ...input.audit,
    isSimulated: true,
    source: "demo_orchestrator",
  };

  return {
    runId: input.runId,
    generatedAt: input.generatedAt,
    status: input.status ?? "completed",
    prospectCompanyName: input.prospectCompanyName,
    scenarioId: scenario.scenarioId,
    scenarioName: scenario.scenarioName,
    scenario,
    injection,
    operationalSummary,
    executiveSummary,
    audit,
  };
}

export const defaultDemoRunInput: DemoRunInput = {
  runId: "demo-run-template",
  generatedAt: "2026-01-01T00:00:00.000Z",
  prospectCompanyName: "Empresa Prospecto Demo",
  orchestratorOutput: orchestrateDemo(defaultDemoOrchestratorInput),
};

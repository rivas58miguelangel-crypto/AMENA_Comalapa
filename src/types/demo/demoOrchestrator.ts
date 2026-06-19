import {
  type DemoScenarioBuilderInput,
  type DemoScenarioBuilderInputValidation,
  type DemoScenarioBuilderOutput,
  buildDemoScenario,
  defaultDemoScenarioBuilderInput,
  validateDemoScenarioBuilderInput,
} from "./demoScenarioBuilder";
import {
  type DemoScenarioInjection,
  type DemoScenarioInjectorInput,
  type DemoScenarioInjectorValidationResult,
  defaultDemoScenarioInjectorInput,
  injectDemoScenario,
  validateDemoScenarioInjectorInput,
} from "./demoScenarioInjector";

// Capa de coordinación del Motor Demo H-OperIA. Solo encadena contratos ya
// existentes; no redefine ADN, inventario, evaluación ni lógica operacional.

export type DemoOrchestratorStage =
  | "input_validation"
  | "scenario_build"
  | "scenario_injection"
  | "completed";

export type DemoOrchestratorStatus = "blocked" | "ready" | "completed";

export type DemoOrchestratorStageStatus =
  | "pending"
  | "completed"
  | "blocked";

export interface DemoOrchestratorStageTrace {
  stage: DemoOrchestratorStage;
  status: DemoOrchestratorStageStatus;
  message: string;
}

export interface DemoOrchestratorInput {
  scenario: DemoScenarioBuilderInput;
  injection: Omit<DemoScenarioInjectorInput, "scenario">;
}

export interface DemoOrchestratorValidationResult {
  isValid: boolean;
  status: Exclude<DemoOrchestratorStatus, "completed">;
  scenarioValidation: DemoScenarioBuilderInputValidation;
  injectorValidation: DemoScenarioInjectorValidationResult | null;
  stages: DemoOrchestratorStageTrace[];
}

export interface DemoOrchestratorOutput {
  status: "completed";
  stages: DemoOrchestratorStageTrace[];
  scenarioValidation: DemoScenarioBuilderInputValidation;
  injectorValidation: DemoScenarioInjectorValidationResult;
  scenario: DemoScenarioBuilderOutput;
  injection: DemoScenarioInjection;
}

const pendingStage = (
  stage: DemoOrchestratorStage,
  message: string,
): DemoOrchestratorStageTrace => ({
  stage,
  status: "pending",
  message,
});

export function validateDemoOrchestratorInput(
  input: DemoOrchestratorInput,
): DemoOrchestratorValidationResult {
  const scenarioValidation = validateDemoScenarioBuilderInput(input.scenario);

  if (!scenarioValidation.isValid) {
    return {
      isValid: false,
      status: "blocked",
      scenarioValidation,
      injectorValidation: null,
      stages: [
        {
          stage: "input_validation",
          status: "blocked",
          message:
            "La entrada del escenario contiene asuntos bloqueantes.",
        },
        pendingStage(
          "scenario_build",
          "La construcción espera una entrada válida.",
        ),
        pendingStage(
          "scenario_injection",
          "La inyección espera un escenario construido.",
        ),
        pendingStage(
          "completed",
          "La orquestación todavía no puede completarse.",
        ),
      ],
    };
  }

  const scenario = buildDemoScenario(input.scenario);
  const injectorValidation = validateDemoScenarioInjectorInput({
    ...input.injection,
    scenario,
  });

  if (!injectorValidation.isValid) {
    return {
      isValid: false,
      status: "blocked",
      scenarioValidation,
      injectorValidation,
      stages: [
        {
          stage: "input_validation",
          status: "completed",
          message: "La entrada del escenario es válida.",
        },
        {
          stage: "scenario_build",
          status: "completed",
          message: "El escenario pudo construirse para validar la inyección.",
        },
        {
          stage: "scenario_injection",
          status: "blocked",
          message:
            "La configuración de inyección contiene asuntos bloqueantes.",
        },
        pendingStage(
          "completed",
          "La orquestación todavía no puede completarse.",
        ),
      ],
    };
  }

  return {
    isValid: true,
    status: "ready",
    scenarioValidation,
    injectorValidation,
    stages: [
      {
        stage: "input_validation",
        status: "completed",
        message: "La entrada del orquestador es válida.",
      },
      pendingStage(
        "scenario_build",
        "El escenario está listo para construirse.",
      ),
      pendingStage(
        "scenario_injection",
        "La configuración está lista para inyectarse.",
      ),
      pendingStage(
        "completed",
        "La orquestación está lista para ejecutarse.",
      ),
    ],
  };
}

export function orchestrateDemo(
  input: DemoOrchestratorInput,
): DemoOrchestratorOutput {
  const validation = validateDemoOrchestratorInput(input);

  if (!validation.isValid || !validation.injectorValidation) {
    const scenarioErrors = validation.scenarioValidation.errors.map(
      (issue) => issue.code,
    );
    const injectorErrors =
      validation.injectorValidation?.errors.map((issue) => issue.code) ?? [];
    const details = [...scenarioErrors, ...injectorErrors].join(", ");

    throw new Error(`Invalid demo orchestrator input: ${details}`);
  }

  const scenario = buildDemoScenario(input.scenario);
  const injectorInput: DemoScenarioInjectorInput = {
    ...input.injection,
    scenario,
  };
  const injectorValidation =
    validateDemoScenarioInjectorInput(injectorInput);
  const injection = injectDemoScenario(injectorInput);

  return {
    status: "completed",
    stages: [
      {
        stage: "input_validation",
        status: "completed",
        message: "La entrada del orquestador fue validada.",
      },
      {
        stage: "scenario_build",
        status: "completed",
        message: "El escenario demo fue construido.",
      },
      {
        stage: "scenario_injection",
        status: "completed",
        message: "La inyección operacional simulada fue generada.",
      },
      {
        stage: "completed",
        status: "completed",
        message: "El flujo integrado del Motor Demo fue completado.",
      },
    ],
    scenarioValidation: validation.scenarioValidation,
    injectorValidation,
    scenario,
    injection,
  };
}

const {
  scenario: _defaultInjectorScenario,
  ...defaultInjectionConfiguration
} = defaultDemoScenarioInjectorInput;

export const defaultDemoOrchestratorInput: DemoOrchestratorInput = {
  scenario: defaultDemoScenarioBuilderInput,
  injection: defaultInjectionConfiguration,
};

# DemoRegenerator deferred decision

## Contexto

`DemoRegenerationPlan` ya existe y describe declarativamente la intención, alcance, causas y requisitos de una futura regeneración.

## Decisión

`DemoRegenerator` no se implementa todavía porque `DemoRun` no conserva toda la entrada original necesaria para reconstruir una corrida de forma segura. En particular, la regeneración futura requiere conservar o suministrar explícitamente `DemoOrchestratorInput`.

La regeneración parcial por categoría o por registros tampoco está soportada actualmente por `DemoScenarioInjector`.

Implementar el regenerator en este estado obligaría a inventar datos, utilizar valores por defecto o simular una regeneración que no sería arquitectónicamente real.

Por lo tanto, se difiere `DemoRegenerator` hasta que la entrada original del orquestador pueda conservarse o suministrarse explícitamente y exista soporte de regeneración segmentada.

## Alcance futuro

- `none`: omitir la regeneración.
- `full_run`: regenerar una corrida completa.
- `category`: regenerar únicamente una categoría.
- `records`: regenerar registros puntuales.

## Restricción

El futuro `DemoRegenerator` no debe tocar UI, backend, Supabase ni persistencia.

# CENTRO-DEMO-EXPEDIENTE-VIVO-0004 - Movimientos simulados post-reserva dentro del Expediente Vivo

## 1. Proposito

Formalizar que el Centro Demo debe mostrar como una reserva completada en la App Publica puede convertirse en un Expediente Vivo del cliente, y como ese expediente recibe movimientos simulados posteriores que son procesados por H - OperIA Intelligence para apoyar al equipo humano.

Este documento es rector conceptual y WIP. No implementa codigo, no modifica App Publica, no modifica backend, no opera WhatsApp, no opera Meta, no opera Dokploy, no toca Supabase, no ejecuta SQL y no crea persistencia.

## 2. Contexto

Las plantillas Meta WhatsApp Caso 1 y Caso 2 siguen en revision.

Por tanto, no se debe avanzar ahora en envio WhatsApp real.

El frente activo recomendado es Centro Demo / Expediente Vivo / movimientos simulados post-reserva.

Este frente no depende de Meta, WhatsApp, Supabase ni backend. Debe mantenerse como fixture local y demo hasta una nueva autorizacion.

## 3. Flujo rector

Cadena conceptual que debe representar el Centro Demo:

```text
reserva demo completada
-> nacimiento/consolidacion del Expediente Vivo
-> recepcion de movimientos simulados
-> verificacion
-> ordenamiento
-> analisis
-> recomendaciones
-> acciones sugeridas humanas
-> decision/ejecucion por equipo humano
```

La reserva no debe quedar como evento aislado. Debe verse como el origen del expediente y como el punto desde el cual nacen movimientos posteriores trazables.

## 4. Identificadores rectores

Identificadores conceptuales para la demo:

- `demo_run_id`
- `reservation_id`
- `expediente_id`

Reglas:

- no se debe identificar el caso por telefono;
- no se debe usar correo ni telefono como llave principal;
- `reservation_id` existe parcialmente en la UI actual;
- `demoRunId` existe parcialmente en el Centro Demo y findings;
- `expediente_id` falta formalizar;
- este documento no implementa persistencia.

Telefono, WhatsApp y correo pueden existir como canales de contacto, pero no como identidad rectora del expediente.

## 5. Movimientos simulados post-reserva

Los movimientos simulados post-reserva son eventos posteriores asociados al Expediente Vivo del cliente.

Ejemplos:

- comentario adicional del cliente;
- actualizacion de preferencia;
- solicitud de visita;
- validacion documental pendiente;
- mensaje interno de asesora;
- nota comercial;
- seguimiento posterior;
- alerta de prioridad;
- respuesta de Marta o canal conversacional, si aplica solo como fuente secundaria;
- observacion de coordinacion.

Todos estos movimientos deben rotularse como datos simulados de demo. No deben presentarse como produccion real ni como informacion persistida.

## 6. Cantidad configurable

`demo_movement_count` debe ser configurable.

El valor `7` es solo un ejemplo util para presentacion.

La demo puede usar `5`, `7`, `10`, `12` u otra cantidad segun el escenario.

No debe quedar hardcodeado como regla conceptual ni como numero fijo de movimientos.

## 7. Estructura minima propuesta

Estructura fixture/local conceptual:

```ts
{
  demo_run_id,
  reservation_id,
  expediente_id,
  movement_id,
  movement_type,
  source,
  received_at,
  verification_status,
  ordering_bucket,
  analysis_summary,
  recommendation,
  suggested_action,
  human_owner,
  human_decision_status,
  is_demo
}
```

La estructura debe permitir explicar trazabilidad, pertenencia al expediente, estado de procesamiento y accion humana sugerida.

## 8. Cadena operativa dentro del expediente

Cada movimiento debe procesarse visualmente dentro del expediente:

```text
informacion recibida
-> verificacion
-> ordenamiento
-> analisis
-> recomendacion
-> accion sugerida
```

Las acciones sugeridas deben aparecer dentro del Expediente Vivo del cliente. No deben mostrarse como recomendaciones genericas externas ni como conclusiones desconectadas del `reservation_id` y `expediente_id`.

## 9. Rol de H - OperIA Intelligence

H - OperIA Intelligence debe actuar sobre el expediente y sus movimientos simulados.

Debe:

- interpretar movimientos dentro del expediente;
- ordenar la informacion;
- generar recomendaciones;
- sugerir acciones concretas;
- apoyar al equipo humano.

No debe:

- decidir automaticamente;
- ejecutar acciones automaticamente;
- reemplazar la validacion humana;
- presentar recomendaciones como hechos de produccion.

La decision y ejecucion final corresponden al equipo humano.

## 10. Relacion con Centro Demo actual

Hallazgos de auditoria sobre el estado actual:

- la evidencia demo se muestra hoy en `DemoPage` / Fase 04;
- los findings se muestran en Fase 05 con `phaseFiveFindings` y `createDemoInjectedFindings()`;
- existe concepto visual de Expediente Vivo en `ClientPage`;
- existen clientes demo seleccionables por `reservation_id`;
- no existe todavia `expediente_id` explicito;
- no existe todavia tabla o lista unificada de movimientos simulados post-reserva.

El Centro Demo ya tiene piezas utiles para construir la narrativa, pero falta una capa explicita que conecte reserva, expediente, movimientos e inteligencia en una misma lectura.

## 11. Ubicacion futura recomendada

Futura microcirugia visual sugerida:

### ClientPage

Ubicacion recomendada:

Despues de los `InfoCard` del cliente seleccionado y antes del bloque Marta / IA.

Objetivo:

Mostrar nacimiento del Expediente Vivo y tabla de movimientos simulados del cliente.

### DemoPage

Ubicacion recomendada:

Alrededor de Fase 01 / Fase 04 / Fase 05.

Objetivo:

Mostrar la relacion:

```text
reserva -> expediente -> movimientos -> inteligencia
```

Esta primera implementacion puede hacerse como fixture/local sin backend ni Supabase.

## 12. Rotulado obligatorio

Todo bloque futuro debe rotular claramente:

- `Datos simulados de demo`;
- `Expediente Vivo demo`;
- `Movimientos simulados post-reserva`;
- `Acciones sugeridas para validacion humana`.

El rotulado debe evitar que la audiencia confunda la maqueta demo con produccion real, persistencia real o automatizacion activa.

## 13. Riesgos

Riesgos principales:

- que los movimientos parezcan datos reales;
- que `7` se interprete como cantidad fija;
- que H - OperIA Intelligence parezca decidir o ejecutar;
- que se mezcle indebidamente con WhatsApp o Meta;
- que se introduzca Supabase o backend antes de validar la narrativa local;
- que las acciones sugeridas parezcan genericas y no ligadas al expediente.

Mitigacion recomendada:

- mantener datos fixture/local;
- rotular todo como demo;
- conservar `demo_movement_count` configurable;
- mostrar `demo_run_id`, `reservation_id` y `expediente_id`;
- ubicar acciones sugeridas dentro del expediente del cliente;
- mantener decision y ejecucion en manos humanas.

## 14. Recomendacion final

Primero documentar la arquitectura demo.

Despues hacer una microcirugia visual fixture/local.

No activar backend, Supabase, WhatsApp ni Meta.

No conectar App Publica en tiempo real todavia.

El avance minimo recomendado es representar en Centro Demo y Expediente Vivo la cadena:

```text
reserva demo -> expediente -> movimientos simulados -> H - OperIA Intelligence -> acciones sugeridas humanas
```

sin persistencia, sin envio real y sin dependencias externas.

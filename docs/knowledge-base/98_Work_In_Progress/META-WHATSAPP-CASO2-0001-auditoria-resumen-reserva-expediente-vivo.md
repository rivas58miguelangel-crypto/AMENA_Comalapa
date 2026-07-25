# META-WHATSAPP-CASO2-0001 - Auditoria ampliada Caso 2, resumen de reserva y Expediente Vivo

## 1. Proposito

Documentar la auditoria ampliada del Caso 2 WhatsApp Automatico, incorporando la decision conceptual sobre el nacimiento del Expediente Vivo, datos simulados visibles, movimientos demo posteriores y cantidades configurables para presentaciones.

Este documento es WIP rector. No implementa codigo, no despliega servicios, no opera Meta, no opera Dokploy, no toca Supabase, no envia WhatsApp y no crea una implementacion del Caso 2.

## 2. Estado Meta

- `h_operia_demo_reservation_link`: en revision.
- `h_operia_reservation_summary`: en revision.

## 3. Estado Git certificado en laptop

### AMENA_Demo_API

- Ruta: `C:\Amena\Codex\AMENA_Demo_API`
- Rama: `main`
- HEAD: `319e42b0bbd45f8341457458ae953af13303d84b`
- Ahead/behind: `0 0`
- Working tree: limpio

### AMENA_Comalapa

- Ruta: `C:\Amena\Codex\AMENA_Comalapa`
- Rama: `centro-mando-admin10`
- HEAD: `4a768d83afe5f1eae5a38baafb7442feb9e41c34`
- Ahead/behind: `0 0`
- Working tree: limpio

### AMENA_Reservas_Publica_Ruta2

- Ruta: `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
- Rama: `codex/ruta-2-reservas-generico-manual`
- HEAD: `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
- Ahead/behind: `0 0`
- Working tree: limpio

## 4. Repositorio real de App Publica

Segun certificacion local, la App Publica desplegada en:

`https://reservas.automatizahoy.ai`

corresponde a:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`

Rama:

`codex/ruta-2-reservas-generico-manual`

No se opero Dokploy ni se hizo comprobacion externa durante esta documentacion.

## 5. Flujo final de reserva

El flujo final de reserva vive en:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2\src\App.tsx`

Referencias aproximadas detectadas:

- `CONFIRMAR SELECCION`: linea aproximada 1517.
- `AccompanimentSummaryScreen`: linea aproximada 2409.
- `OfficialClosureScreen`: linea aproximada 2509.
- `FinalSuccessScreen`: linea aproximada 2896.

Conclusion: el punto futuro correcto para disparar Caso 2 no es la seleccion inicial, sino despues del cierre oficial, cuando el resumen inicial del expediente este consolidado.

## 6. Nacimiento del Expediente Vivo

Decision conceptual: la App Publica de Reservas es la genesis del Expediente Vivo.

El nacimiento del expediente ocurre como un capitulo inicial unico compuesto por:

- seleccion de unidad;
- datos del interesado;
- reserva o intencion;
- comentarios;
- respuestas;
- preferencias;
- interaccion o acompanamiento con Marta/Vapi;
- cierre oficial;
- confirmacion WhatsApp Caso 2.

El expediente nace ahi, pero permanece vivo y seguira evolucionando con nuevas interacciones, acciones, decisiones, evidencias y resultados.

## 7. WhatsApp Caso 2

WhatsApp Caso 2 es una confirmacion externa derivada del cierre de reserva. No sustituye al Expediente Vivo.

La plantilla propuesta, actualmente en revision, es:

`h_operia_reservation_summary`

Variables esperadas:

- `{{1}}` = nombre del cliente
- `{{2}}` = ID de reserva
- `{{3}}` = unidad seleccionada
- `{{4}}` = precio de referencia
- `{{5}}` = link para continuar con Marta
- `{{6}}` = contacto de ventas

El mensaje puede contener informacion valiosa para el cliente, incluyendo resumen de reserva y proximos pasos, pero no debe contener todo el expediente ni interpretaciones extensas de IA.

## 8. Marta

Hallazgo critico: no existe literal exacto `Habla con Marta ahora`. El equivalente actual es `Conversar ahora con Marta`.

Referencias aproximadas:

- `App.tsx` linea aproximada 2095.
- `App.tsx` linea aproximada 2255.
- Boton final `CONTACTAR A MARTA`.

Diagnostico tecnico:

- No es `href`.
- No es link permanente certificado.
- No es WhatsApp directo.
- Es una funcion que llama `(window as any).conectarVapi?.()`.

Referencia aproximada:

- `App.tsx` linea aproximada 2276.

La funcion se define en:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2\index.html`

Referencia aproximada:

- `index.html` linea 15.

Conclusion: el link permanente de Marta todavia no existe como URL real certificada. Es requisito futuro antes de implementar Caso 2 completo.

## 9. Datos disponibles al cierre

Existen en React state:

- nombre;
- apellido;
- email;
- telefono;
- DUI opcional;
- seleccion;
- unidad;
- torre/manzana;
- nivel;
- modelo;
- proyecto;
- precio desde `selectedModel.price`;
- comentarios;
- `analysisResult`;
- `finalComments`;
- `observations`;
- `prompts`;
- `postReservationStatus`;
- `accompanimentSelections`.

Persistencia y ubicacion actual:

- `sessionStorage` conserva solo `amena_reservation_session_id`.
- Supabase conserva parcialmente sesion inicial y eventos de seleccion.
- Catalogo, precios, proyecto y Vapi/Marta estan en parte hardcode/local.
- No existe todavia persistencia completa del expediente final.

## 10. Datos faltantes para Caso 2

Faltan:

- `marta_link` real;
- `sales_contact` oficial;
- persistencia del expediente final;
- endpoint de cierre;
- idempotencia de envio;
- mapeo explicito de `h_operia_reservation_summary` con 6 variables;
- estado final de envio.

## 11. Datos simulados visibles para credibilidad demo

Decision confirmada: en Fase 4, la generacion de datos simulados para demo debe permitir escoger la cantidad al momento de la presentacion.

No debe documentarse `20` como cantidad fija. La cifra `20` debe entenderse unicamente como ejemplo operativo o cantidad tipica de referencia.

Debe existir conceptualmente un parametro configurable, por ejemplo:

`demo_seed_count`

Ejemplos validos:

- generar 10 datos simulados;
- generar 20 datos simulados;
- generar 30 datos simulados;
- generar otra cantidad definida por el presentador.

Estos datos no deben quedar ocultos. Deben mostrarse a los asistentes de la presentacion en un cuadro visible para crear credibilidad.

Objetivo: que los asistentes vean claramente la data simulada y luego se demuestre que esa misma data aparece recogida, ordenada y trazable dentro del Expediente Vivo.

Regla: la data simulada demo debe identificarse explicitamente como demo/simulada y nunca mezclarse con produccion.

## 12. Movimientos simulados posteriores configurables

Nueva decision conceptual: despues del nacimiento del expediente desde App Publica + Marta/Vapi, el demo debe poder generar movimientos simulados posteriores.

La cantidad de movimientos tambien debe ser configurable al momento de la presentacion.

No debe documentarse `7` como cantidad fija. La cifra `7` debe entenderse como ejemplo narrativo inicial.

Debe existir conceptualmente un parametro configurable, por ejemplo:

`demo_movement_count`

Ejemplos validos:

- generar 3 movimientos posteriores;
- generar 7 movimientos posteriores;
- generar 10 movimientos posteriores;
- generar otra cantidad definida por el presentador.

Estos movimientos representan la vida operacional inicial del caso.

Ejemplos de tipos de movimiento:

1. Mensaje interno de coordinacion comercial.
2. Nota de vendedora sobre interes, objecion o preferencia familiar.
3. Nueva interaccion con Marta/Vapi.
4. Cambio de cita para visita al proyecto.
5. Solicitud de informacion financiera.
6. Seguimiento de documentos o requisitos.
7. Resultado observado: cliente confirma interes, pide llamada, cambia cita o solicita mas informacion.

Estos movimientos deben:

- mostrarse primero en un cuadro visible para los asistentes;
- alimentar luego el Expediente Vivo;
- servir de base para analisis de H - OperIA Intelligence;
- producir recomendaciones;
- terminar en sugerencias concretas de accion para el equipo, especialmente vendedoras.

## 13. Identificador rector de demo

Decision conceptual: no usar WhatsApp, telefono ni correo como identificador principal del caso demo.

Motivo: durante presentaciones, el mismo WhatsApp del presentador puede usarse repetidamente para diferentes clientes o escenarios demo.

Identificadores recomendados:

- `demo_run_id`;
- `reservation_id`;
- `expediente_id`.

Ejemplo conceptual:

```text
demo_run_id = DEMO-20260724-001
reservation_id = AMENA-DEMO-000784
expediente_id = EV-DEMO-000784
```

El telefono debe tratarse como canal de comunicacion, no como identidad principal.

## 14. Limpieza o reinicio de demo

Decision futura a disenar: el sistema demo debe contemplar una opcion segura para:

- crear nueva corrida demo;
- archivar corrida demo;
- limpiar datos de la corrida actual;
- reiniciar demo.

Regla critica: esto solo aplica a datos demo. Nunca debe aplicarse a produccion.

## 15. Payload futuro recomendado

Propuesta conceptual:

```json
{
  "template": "h_operia_reservation_summary",
  "type": "reservation_summary",
  "demo_run_id": "DEMO-20260724-001",
  "demo_seed_count": 20,
  "demo_movement_count": 7,
  "phone": "+50370000000",
  "reservation": {
    "reservation_id": "AMENA-DEMO-000784",
    "expediente_id": "EV-DEMO-000784",
    "customer_name": "Nombre Apellido",
    "selected_unit": "Apartamento 101 / Torre T1 / Nivel 01 / Modelo Prisma",
    "reference_price": "$59,800",
    "marta_link": "https://...",
    "sales_contact": "+503..."
  },
  "context": {
    "session_id": "uuid",
    "final_comments": "...",
    "marta_preference": "talk_now",
    "advisor_preferences": [],
    "source": "reservas_publica_ruta2"
  },
  "idempotency_key": "reservation-summary:DEMO-20260724-001:AMENA-DEMO-000784"
}
```

El payload es conceptual, no implementacion aprobada.

Los valores `demo_seed_count = 20` y `demo_movement_count = 7` son ejemplos, no valores fijos.

## 16. Impacto backend

`AMENA_Demo_API` actualmente soporta `/send-whatsapp` con:

- `phone`;
- `name`;
- `link`.

Y envia 2 parametros de body.

Caso 2 requiere solucion separada o extension controlada porque la plantilla `h_operia_reservation_summary` requiere 6 variables.

Recomendacion preliminar: preferir endpoint separado o dispatcher explicito por `type/template` para evitar mezclar Caso 1 y Caso 2.

## 17. Relacion con App Vendedoras

La App Vendedoras es destino interno de informacion y acciones sugeridas.

No debe enviarse al cliente un link a la App Vendedoras.

El cliente recibe confirmacion y canal de acompanamiento con Marta.

El equipo interno recibe datos ordenados, recomendaciones y sugerencias de accion.

## 18. Riesgos

- Envio duplicado.
- Variables en orden incorrecto.
- Depender de estado React no persistido.
- Usar link Marta ficticio.
- Filtrar datos sensibles.
- Convertir WhatsApp en sustituto del Expediente Vivo.
- Confundir Caso 1 y Caso 2.
- Identificar clientes por telefono en lugar de `demo_run_id`/`reservation_id`.
- Mezclar datos demo con produccion.
- Hardcodear cantidades demo como si fueran fijas.
- Exponer o depender de credenciales/client keys hardcodeadas sin revision posterior.

## 19. Restricciones ejecutadas

Durante esta documentacion:

- no se modifico App Publica;
- no se modifico backend;
- no se toco Supabase;
- no se opero Meta;
- no se opero Dokploy;
- no se enviaron WhatsApp;
- no se leyeron `.env`;
- no se creo implementacion de Caso 2.

## 20. Dictamen WIP

El Caso 2 queda documentado como frente futuro de integracion, no como implementacion aprobada.

El criterio rector es que WhatsApp Caso 2 debe ser una salida externa controlada, derivada del Expediente Vivo, y nunca su reemplazo.

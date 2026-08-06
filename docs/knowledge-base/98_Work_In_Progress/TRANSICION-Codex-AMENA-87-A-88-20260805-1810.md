# TRANSICION-Codex-AMENA-87-A-88-20260805-1810

## A. Identificacion formal

- Chat que se cierra: Codex AMENA 87.
- Chat siguiente preparado: Codex AMENA 88.
- Fecha y hora local de preparacion: 2026-08-05 18:10.
- Repositorio rector trabajado: `C:\Amena\Codex\AMENA_Comalapa`.
- Rama vigente: `centro-mando-admin10`.
- HEAD de partida antes del cierre documental: `539900070862d0eeff37005f259353e88ecc2b5e`.
- Documento de transicion inmediatamente anterior localizado: `TRANSICION-Codex-AMENA-86-A-87-20260725.md`.
- Documento de cierre funcional publicado que queda como antecedente directo: `docs/knowledge-base/98_Work_In_Progress/INTEGRACION-APP-PUBLICA-ADMIN-0001-cierre-reserva-reset-ack.md`.

Este documento no modifica arquitectura, codigo, variables, servicios ni datos productivos. Su objetivo unico es dejar preparado el contexto operativo para que el siguiente chat no reconstruya el frente desde memoria parcial.

## B. Protocolo aplicado

Se aplica el procedimiento de continuidad y gobierno vigente:

- `KB-0003`: continuidad del conocimiento entre chats mediante documento de transicion en `98_Work_In_Progress`.
- `FO-COC-0001`: reconstruccion certificada, verificacion Git y cierre operativo legible.
- `ADR-002`: gobierno por autoridades rectoras de la Suite H-OperIA.
- `REG-0001`: registro vigente de autoridad rectora visual.
- `CF-0001`: Arquitectura Visual Comun de la Suite H-OperIA.

El nuevo chat debe reconstruir el contexto desde este documento y desde la documentacion citada. Este documento no sustituye la base de conocimiento; solo ordena el traspaso.

## CERTIFICACION DE AUTORIDAD RECTORA

- Dominio afectado: continuidad visual y operativa del Centro Demo, App Publica Ruta 2, futura alineacion de Vendedoras y Mensajeria Operacional.
- Entrada vigente en `REG-0001`: `AR-VIS-001`.
- Autoridad rectora: Admin / Centro de Mando.
- Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`.
- Rama rectora: `centro-mando-admin10`.
- HEAD de partida antes del cierre documental: `539900070862d0eeff37005f259353e88ecc2b5e`.
- Fuente fundacional: `CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA`.
- Aplicaciones hermanas reconocidas por gobierno: Comunicaciones Internas y Registro Operacional.
- Aplicaciones objetivo inmediatas: App Publica Ruta 2 y Centro Demo.
- Excepcion autorizada vigente: la identidad del cliente puede contextualizar encabezados o marca puntual, sin reemplazar el ADN visual comun de la Suite H-OperIA.

Resultado: valido para continuidad. Este cierre no redefine autoridad visual ni crea una familia documental paralela.

## C. Estado Git certificado del repositorio rector

Verificacion realizada sin `fetch` y sin modificar archivos:

- Ruta: `C:\Amena\Codex\AMENA_Comalapa`.
- Top level Git: `C:/Amena/Codex/AMENA_Comalapa`.
- Rama local: `centro-mando-admin10`.
- HEAD local de partida antes del cierre documental: `539900070862d0eeff37005f259353e88ecc2b5e`.
- Referencia remota local `origin/centro-mando-admin10`: `539900070862d0eeff37005f259353e88ecc2b5e`.
- Ahead/behind: `0 0`.
- Working tree inicial: limpio.

Ultimos commits observados:

- `5399000 docs: close public app admin integration block`
- `4b0e8f6 feat: receive public reservation events in admin demo`
- `47437b9 feat: refine demo live file experience`
- `6a219d1 docs: add transition document for Codex AMENA 86`
- `ad265af feat: show demo live file simulated movements`
- `756e6d8 docs: define demo live file simulated movements`
- `2b62187 docs: record simulated case 2 whatsapp closure flow`
- `81a06eb docs: add whatsapp case 2 backend endpoint`

## D. Repositorios y commits publicados relevantes

### Admin / Centro Demo

- Ruta: `C:\Amena\Codex\AMENA_Comalapa`.
- Rama: `centro-mando-admin10`.
- Commit funcional publicado: `4b0e8f6e34ce8b1fb4f86938ab2f25466603e238`.
- Commit documental de cierre publicado: `539900070862d0eeff37005f259353e88ecc2b5e`.

### App Publica Ruta 2

- Ruta: `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`.
- Rama: `codex/ruta-2-reservas-generico-manual`.
- Commit integrado publicado: `2a869c1e9f95cafa21913e4845796168ac6bd4b7`.
- Estado funcional registrado: preserva emision de reservas, reset coordinado, ACK, Caso 2 WhatsApp simulado, branding, catalogo, imagenes e inventario visual de Ruta 2.

### Variante AMENA de App Publica

- Ruta: `C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602`.
- Rama: `feature/complete-tracking-funnel`.
- Commit publicado: `16eb171c14764196f1d96ec9e7e662a52cbb8c8a`.

Los repositorios externos al rector no fueron modificados en este cierre documental.

## E. Trabajo completado en el bloque que se cierra

Queda completada y publicada la integracion demo/local de App Publica Ruta 2 hacia Admin / Centro Demo.

Elementos certificados:

- Emision de `ReservationCompletedEvent` desde App Publica Ruta 2.
- Recepcion en Admin mediante canal controlado.
- Validacion exacta de `event.origin`.
- Validacion exacta de `event.source`.
- Dedupe por `eventId`.
- Mapeo estable `reservationId -> expedienteId`.
- Creacion de Expediente Vivo inicial.
- Fecha visible localizada.
- Estado visible `Demo · No persistido`.
- Reset coordinado.
- ACK correlacionado.
- Nueva reserva creada y recibida despues del reset.
- Integracion preservada con Caso 2 WhatsApp en la App Publica.

IDs humanos certificados durante la prueba:

| Prueba | Reservation ID | Expediente ID |
| --- | --- | --- |
| Reserva A | `HOP-RES-QHI4PTEA-L8X2VN` | `HOP-EXP-QHI4PTEA-L8X2VN` |
| Reserva B | `HOP-RES-8S24UQF7-AZ4TLM` | `HOP-EXP-8S24UQF7-AZ4TLM` |
| Reserva C visual | `HOP-RES-AGCMJWCL-E5KXYQ` | `HOP-EXP-AGCMJWCL-E5KXYQ` |

Reserva A fue recibida antes del reset. El reset coordinado fue confirmado mediante ACK. Reserva B fue creada y recibida correctamente despues del reset. Reserva A no reaparecio despues del nuevo ciclo. Reserva C queda registrada como evidencia humana adicional para revision visual.

## F. Nuevas decisiones operativas incorporadas

El frente inmediato cambia de ritmo por oportunidad comercial urgente:

- Una empresa constructora pidio ver demo para el 6 de agosto de 2026.
- Una segunda empresa constructora pidio ver demo aproximadamente para el 8 de agosto de 2026.
- Antecedente de lenguaje original: estas fechas fueron descritas durante la operacion como "manana" y "aproximadamente tres dias despues".
- Ambas fechas deben confirmarse con el usuario al abrir el siguiente chat.
- La estrategia se divide en dos sprints:
  - Sprint urgente: demo estable, presentable y ensayable.
  - Sprint posterior: integracion operacional expandida.

No se debe abrir una reconstruccion profunda ni una expansion simultanea de todos los repositorios antes de la primera presentacion.

## G. Oportunidades urgentes

Prioridad comercial inmediata:

- Preparar una demo estable para la primera presentacion solicitada para el 6 de agosto de 2026.
- Reducir friccion visual del Expediente Vivo solo en lo esencial.
- Certificar las dos plantillas de WhatsApp aprobadas por Meta.
- Probar el flujo minimo seguro sin exponer secretos.
- Ensayar la narrativa FASE 03 / FASE 04 / FASE 05 solo al nivel necesario para explicar valor.

La demo debe presentarse como flujo integrado, no como coleccion de modulos aislados.

## H. Dos plantillas WhatsApp aprobadas por Meta

Correccion de estado: ya no debe tratarse el frente como si solo existiera una plantilla pendiente de aprobacion.

Estado informado por validacion humana:

- Existen dos plantillas aprobadas por Meta.
- Ambas requieren certificacion individual antes de usarse como evidencia operativa.

Pendiente para el siguiente chat:

- Documentar nombre exacto de cada plantilla.
- Documentar idioma.
- Documentar categoria.
- Documentar contenido aprobado.
- Documentar variables.
- Documentar botones, si existen.
- Documentar caso de uso.
- Probar cada plantilla de forma controlada.

Reglas:

- No copiar tokens ni secretos en Codex, ChatGPT, Git ni documentos.
- No inventar nombres, variables ni contenido de plantillas.
- Diferenciar siempre `provider_accepted`, entrega, lectura y respuesta humana.
- No afirmar entrega o lectura sin evidencia humana o tecnica especifica.

## I. Observaciones pendientes sobre Expediente Vivo

Durante la revision visual quedo detectado que el Expediente Vivo inicial ya funciona, pero requiere microcirugia visual antes de presentacion.

Observaciones:

- Puede causar confusion que `Carlos Mendez / Formalizacion` permanezca visible mientras el expediente seleccionado proviene de App Publica.
- Hay redundancia entre nombre de cliente, Reservation ID, Expediente ID, unidad y estado.
- La metadata tecnica aparece demasiado mezclada con el resumen ejecutivo.

Concepto recomendado, sin ejecutar aun:

- `RESUMEN EJECUTIVO`: cliente, reserva, unidad, estado y siguiente paso.
- `EVIDENCIA TECNICA SECUNDARIA`: `reservationId`, `expedienteId`, origen, canal y fecha.

No hacer microcirugia visual sin revalidar Git y sin autorizacion explicita del siguiente frente.

## J. Vendedoras / Registro Operacional de Ventas

Repositorio pendiente:

- Ruta: `C:\Amena\Codex\AMENA_Registro_Operacional_Ventas`.

Rol funcional previsto:

- Registrar interacciones comerciales.
- Reuniones.
- Llamadas.
- WhatsApp.
- Correos.
- Acuerdos.
- Documentos pendientes.
- Siguiente paso comercial.

Pendiente:

- Auditoria tecnica.
- Identificar rama y HEAD.
- Migracion visual desde AMENA hacia Suite H-OperIA / Ruta 2.
- Definir contrato posterior de movimiento comercial.
- Integrar con Expediente Vivo.

No iniciar este frente antes de asegurar la demo inmediata.

## K. Mensajeria Operacional

Repositorio pendiente:

- Ruta: `C:\Amena\Codex\AMENA_Mensajeria_Operacional`.

Rol funcional previsto:

- Coordinacion interna.
- Comentarios.
- Asignaciones.
- Seguimiento interno.

Este modulo no reemplaza la comunicacion comercial directa con el cliente.

Pendiente:

- Auditoria tecnica.
- Identificar rama y HEAD.
- Migracion visual hacia Suite H-OperIA / Ruta 2.
- Definir contrato posterior de movimiento interno.
- Integrar con Expediente Vivo.

No iniciar este frente antes de asegurar la demo inmediata.

## L. Continuidad de FASE 03

FASE 03 debe demostrar un flujo operacional integrado:

`reserva -> Expediente Vivo inicial -> seguimiento comercial Vendedoras -> coordinacion interna Mensajeria Operacional -> Marta / WhatsApp -> Expediente Vivo enriquecido`

Regla narrativa:

- Las aplicaciones no deben presentarse como modulos aislados.
- El valor esta en que el expediente se enriquece con eventos y acciones conectadas.
- La integracion debe ser incremental y certificada.

## M. Continuidad de FASE 04

FASE 04 ya fue trabajada y no debe reabrirse como rediseño profundo antes de la primera presentacion solicitada para el 6 de agosto de 2026.

Pendiente minimo:

- Revisar coherencia narrativa.
- Explicar origen y administracion de los datos simulados.
- Explicar como conviven reserva real de demo, Expediente Vivo inicial, movimientos posteriores, datos simulados adicionales, regeneracion, auditoria e inyeccion.

No iniciar Supabase, SQL ni persistencia para resolver esta narrativa urgente.

## N. Continuidad de FASE 05

FASE 05 ya fue trabajada y no debe reconstruirse profundamente antes de la primera presentacion solicitada para el 6 de agosto de 2026.

Pendiente minimo:

- Mostrar como H-OperIA Intelligence interpreta un expediente enriquecido.
- Explicar que propone hallazgos o acciones, pero no decide por el humano.
- Conectar la inteligencia con evidencia operacional acumulada, no con datos sueltos.

## O. Prioridades

### Sprint urgente antes de la primera presentacion solicitada para el 6 de agosto de 2026

1. Revalidar Git del repositorio rector.
2. Registrar formalmente el sprint urgente.
3. Preparar microcirugia visual minima del Expediente Vivo.
4. Certificar las dos plantillas WhatsApp aprobadas.
5. Determinar ruta segura minima para conectarlas.
6. Ensayar demo inmediata.
7. Revisar solo coherencia narrativa esencial de FASE 03 / FASE 04 / FASE 05.

### Sprint posterior a la primera presentacion y orientado a la segunda presentacion solicitada aproximadamente para el 8 de agosto de 2026

1. Auditar Vendedoras.
2. Auditar Mensajeria Operacional.
3. Definir capa visual comun.
4. Migrar cada app por separado.
5. Definir contratos de movimiento.
6. Conectar movimientos al Expediente Vivo.
7. Ajustar FASE 03.
8. Ejecutar prueba integrada.
9. Documentar cierre.

## P. Prohibiciones y limites inmediatos

No abrir antes de la primera presentacion solicitada para el 6 de agosto de 2026:

- Supabase.
- SQL.
- Persistencia productiva.
- Nueva arquitectura de inventario.
- Rediseño profundo de FASE 04.
- Rediseño profundo de FASE 05.
- Vapi completo.
- Integracion simultanea amplia de multiples repositorios.
- Paquetes nuevos.
- Cambios no esenciales.

Reglas persistentes:

- No exponer secretos.
- No copiar tokens.
- No documentar valores sensibles.
- No operar servicios externos sin autorizacion.
- No hacer commit ni push sin autorizacion expresa.

## Q. Riesgos

- Confundir una demo local integrada con persistencia productiva.
- Presentar `provider_accepted` como entrega, lectura o respuesta.
- Abrir demasiados frentes antes de la presentacion.
- Que el Expediente Vivo sea funcional pero visualmente confuso para audiencia comercial.
- Que las plantillas WhatsApp aprobadas no esten aun certificadas una por una.
- Que `postMessage` dependa de ventana controlada.
- Que la falta de persistencia sea percibida como carencia si no se explica como demo.
- Que la advertencia no bloqueante de tamaño de bundle en AMENA distraiga si se trata como frente urgente.

## R. Tareas pendientes ordenadas

1. Abrir el siguiente chat reconstruyendo desde este documento.
2. Confirmar fechas y prioridad real de las dos presentaciones.
3. Registrar el sprint urgente como frente operacional.
4. Revalidar Git del repositorio rector.
5. Preparar, sin editar todavia, microcirugia visual minima del Expediente Vivo.
6. Ejecutar microcirugia solo si se autoriza.
7. Certificar las dos plantillas WhatsApp aprobadas.
8. Probar una plantilla por vez con evidencia segura.
9. Ensayar la demo de reserva hacia Admin.
10. Ensayar narrativa minima FASE 03 / FASE 04 / FASE 05.
11. Despues de la primera presentacion solicitada para el 6 de agosto de 2026, auditar Vendedoras.
12. Despues de la primera presentacion solicitada para el 6 de agosto de 2026, auditar Mensajeria Operacional.
13. Definir contratos conceptuales de movimiento solo despues de auditar codigo real.

Contratos conceptuales posibles, no adoptados aun:

- `hoperia.sales.activity.recorded`
- `hoperia.team.message.recorded`

No deben adoptarse definitivamente antes de revisar los repositorios reales.

## S. Primera tarea concreta del siguiente chat

La primera tarea recomendada para Codex AMENA 88 es:

1. Reconstruir contexto certificado desde este documento.
2. Confirmar con el usuario las fechas y urgencia de las dos presentaciones: 6 de agosto de 2026 y aproximadamente 8 de agosto de 2026.
3. Registrar formalmente el sprint urgente.
4. Revalidar Git del repositorio rector `C:\Amena\Codex\AMENA_Comalapa`.
5. Preparar, sin editar todavia, la microcirugia visual minima del Expediente Vivo.
6. Inmediatamente despues, certificar las dos plantillas WhatsApp aprobadas por Meta.

No comenzar con Vendedoras ni Mensajeria antes de asegurar la demo inmediata.

## T. Instruccion formal de apertura para el siguiente chat

Usar esta instruccion como punto de arranque:

```text
Aplicar KB-0003, FO-COC-0001, ADR-002, REG-0001 y CF-0001.

Reconstruir el contexto exclusivamente desde:
C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base\98_Work_In_Progress\TRANSICION-Codex-AMENA-87-A-88-20260805-1810.md

Trabajar inicialmente en:
C:\Amena\Codex\AMENA_Comalapa

Rama esperada:
centro-mando-admin10

ESTADO GIT ESPERADO AL ABRIR EL SIGUIENTE CHAT:
- rama centro-mando-admin10;
- working tree limpio;
- ahead/behind 0 0;
- HEAD local igual a origin/centro-mando-admin10;
- el HEAD debe corresponder al commit documental que publique esta transicion;
- el hash definitivo sera certificado durante el Paso 2 oficial y trasladado en la instruccion humana de apertura.

Objetivo inicial:
preparar el sprint urgente de demo para la presentacion solicitada para el 6 de agosto de 2026, revalidar Git, confirmar las fechas del 6 de agosto de 2026 y aproximadamente 8 de agosto de 2026, preparar sin editar la microcirugia visual minima del Expediente Vivo y luego certificar las dos plantillas WhatsApp aprobadas por Meta.

Restricciones:
no iniciar Supabase, SQL, persistencia, Vapi completo, Vendedoras, Mensajeria Operacional, rediseño profundo FASE 04/05, servidores, commit ni push sin autorizacion expresa.
```

## Cierre operativo

Durante este cierre documental no se modifico codigo, no se iniciaron servidores, no se opero Supabase, Dokploy, Meta, WhatsApp, Elastic Email ni DNS, y no se hizo commit ni push.

El unico cambio previsto por este cierre es la creacion de este documento de transicion.
```

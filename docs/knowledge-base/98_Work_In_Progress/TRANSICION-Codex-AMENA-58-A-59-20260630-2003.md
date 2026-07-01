# TRANSICION - Codex AMENA 58 a Codex AMENA 59

Fecha de generacion: 2026-06-30 20:03

Documento de transicion generado al cierre operativo de Codex AMENA 58, conforme a la Fase de Cierre del Chat definida en KB-0003.

Este documento se genero antes de entregar instrucciones para abrir un nuevo chat.

## Alcance de esta transicion

Esta transicion reconstruye el trabajo completo del chat Codex AMENA 58, no solo su cierre.

Repositorios trabajados:

* `C:\Amena\Codex\AMENA_Comalapa`
* `C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602`

Ramas:

* Admin / Centro Demo: `centro-mando-admin10`
* Reservas Publica: `feature/complete-tracking-funnel`

## Estado final confirmado

### AMENA_Comalapa

* Rama: `centro-mando-admin10`
* HEAD: `442e1f9 docs: clarify chat closure transition procedure`
* HEAD == `origin/centro-mando-admin10`
* Working tree clean antes de crear este documento de transicion.
* Ultimos commits confirmados:
  * `442e1f9 docs: clarify chat closure transition procedure`
  * `1a5f09f docs: add demo scenario and production white label specifications`
  * `c052268 feat: add client search in admin`
  * `f0fbc02 feat: add recent activity blocks to phase 03`
  * `3948553 docs: add live evidence panel specification`

### AMENA_Reservas_Publica_Codex_260602

* Rama: `feature/complete-tracking-funnel`
* HEAD: `7d6b957 feat: show reservation continuity in post-reservation flow`
* HEAD == `origin/feature/complete-tracking-funnel`
* Working tree clean.
* Ultimos commits confirmados:
  * `7d6b957 feat: show reservation continuity in post-reservation flow`
  * `75d2c8d fix: normalize post-reservation navigation`
  * `0e50e92 fix: add vite environment type declarations`
  * `5e6f1b7 fix: unify reservations browser branding h-operia`
  * `864828b fix: support reservations dated subfolder deployment`

## Microcirugias implementadas

### AMENA_Comalapa - Documentacion estrategica

Se crearon dos documentos separados para distinguir ambitos:

* Centro Demo:
  * `docs/knowledge-base/06_Centro_Demo/Proyectos_Pendientes/CD-PP-0001 - Constructor de Escenarios del Centro Demo.md`
* Produccion:
  * `docs/knowledge-base/07_Especificaciones_Desarrollo/Produccion/PD-0001 - Arquitectura White Label y Parametrizacion de Produccion.md`

Objetivo:

* Separar el Constructor de Escenarios del Centro Demo de la Arquitectura White Label de produccion.
* Preservar que el constructor pertenece al demo y genera escenarios temporales.
* Preservar que la parametrizacion white label pertenece a producto de produccion y clientes reales.

Commit:

* `1a5f09f docs: add demo scenario and production white label specifications`

### AMENA_Comalapa - Gobernanza de continuidad entre chats

Se actualizo:

* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md`

Cambio:

* Se agrego la seccion `Fase de Cierre del Chat (Obligatoria)`.
* Se definio que el chat que termina debe escanear completamente la conversacion.
* Debe generar el Documento de Transicion antes de entregar instrucciones para abrir o iniciar el nuevo chat.
* Debe almacenarlo en `docs/knowledge-base/98_Work_In_Progress`.
* Debe verificar su existencia.

Commit:

* `442e1f9 docs: clarify chat closure transition procedure`

### Reservas Publica - Tipos de entorno Vite

Se corrigio la falla de TypeScript por `import.meta.env`.

Archivo:

* `src/vite-env.d.ts`

Commit:

* `0e50e92 fix: add vite environment type declarations`

Resultado:

* `npm.cmd run lint` correcto.
* `npm.cmd run build` correcto.
* No se modifico logica funcional, UX, Supabase ni textos visibles.

### Reservas Publica - Navegacion post-reserva

Se normalizo la navegacion posterior a la confirmacion de reserva.

Archivo:

* `src/App.tsx`

Commit:

* `75d2c8d fix: normalize post-reservation navigation`

Cambios:

* `BackButton` global se mantuvo con texto `REGRESAR`.
* En `UserCommentsScreen` se elimino el boton interno duplicado `REGRESAR` cuando `commentsChoice === 'no'`.
* En `AnalysisReportScreen` se elimino `CERRAR SESION`.
* En `handleBack`, `acompanamiento_amena` ahora regresa a `analysis_report`.
* En `FinalSuccessScreen` se dejo una sola accion clara para volver al inicio: `VOLVER AL INICIO`.
* Se eliminaron `REGRESAR AL INICIO` y `CERRAR SESION` cuando duplicaban o reiniciaban el flujo.

Validacion:

* `npm.cmd run lint` correcto.
* `npm.cmd run build` correcto.

### Reservas Publica - Continuidad operacional post-reserva

Se fortalecio la continuidad visual del flujo post-reserva mostrando el identificador de reserva y un resumen compacto.

Archivo:

* `src/App.tsx`

Commit:

* `7d6b957 feat: show reservation continuity in post-reservation flow`

Cambios:

* Se centralizo `reservationId` a nivel de `App`.
* Se agrego `reservationSummaryItems`.
* Se agrego el componente `ReservationContinuityBadge`.
* Se mostro `Reserva activa` con `Reservation ID` y resumen operativo.

Pantallas cubiertas:

* `NextStepsInstructionsScreen`
* `UserCommentsScreen`
* `AnalysisReportScreen`
* `AcompanamientoAmenaScreen`
* `WhatsAppConfirmationScreen`
* `OfficeScheduleScreen`
* `ProjectVisitScheduleScreen`
* `FinalSuccessScreen`

Datos incluidos:

* Proyecto.
* Torre o Manzana.
* Nivel, si aplica.
* Modelo.
* Unidad o Lote.
* Reservation ID.

Validacion:

* `npm.cmd run lint` correcto.
* `npm.cmd run build` correcto.

## Commits realizados en AMENA 58

### AMENA_Comalapa

* `1a5f09f docs: add demo scenario and production white label specifications`
* `442e1f9 docs: clarify chat closure transition procedure`

### AMENA_Reservas_Publica_Codex_260602

* `0e50e92 fix: add vite environment type declarations`
* `75d2c8d fix: normalize post-reservation navigation`
* `7d6b957 feat: show reservation continuity in post-reservation flow`

## Push realizados

### AMENA_Comalapa

Push realizado:

* Rama: `centro-mando-admin10`
* Resultado: `c052268..442e1f9 centro-mando-admin10 -> centro-mando-admin10`
* Estado final: HEAD sincronizado con origin.

### AMENA_Reservas_Publica_Codex_260602

Push realizado:

* Rama: `feature/complete-tracking-funnel`
* Resultado: `5e6f1b7..7d6b957 feature/complete-tracking-funnel -> feature/complete-tracking-funnel`
* Estado final: HEAD sincronizado con origin.

## Decisiones arquitectonicas tomadas

### Separacion Centro Demo vs Produccion

Se distinguieron dos lineas:

* Constructor de Escenarios del Centro Demo.
* Arquitectura White Label y Parametrizacion de Produccion.

Decision:

* El Constructor de Escenarios pertenece al Centro Demo y debe desarrollarse despues de FASE 06.
* La parametrizacion white label pertenece al producto de produccion y no debe depender del Centro Demo.

### Continuidad operacional en Reservas

Decision:

* El `Reservation ID` debe estar visible durante todo el flujo post-reserva.
* La mejor solucion es un componente comun discreto, no duplicar texto por pantalla.
* El resumen debe transmitir continuidad operacional sin redisenar la aplicacion.

### Navegacion post-reserva

Decision:

* Durante el flujo post-reserva debe existir una unica accion clara de regreso: `REGRESAR`.
* `VOLVER AL INICIO` solo debe quedar como accion de cierre cuando el flujo ya finalizo.
* No deben existir reinicios del flujo antes de completar post-reserva.

### Gobernanza de cierre de chats

Decision:

* Cuando un chat operativo se cierre o entregue instrucciones para abrir otro, el documento de transicion debe generarse antes.
* Esta obligacion complementa el modelo previo de transicion, no lo reemplaza.

## Cambios en la Base de Conocimiento

Documentos creados:

* `docs/knowledge-base/06_Centro_Demo/Proyectos_Pendientes/CD-PP-0001 - Constructor de Escenarios del Centro Demo.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/Produccion/PD-0001 - Arquitectura White Label y Parametrizacion de Produccion.md`

Documento modificado:

* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md`

Documento creado por esta fase de cierre:

* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-58-A-59-20260630-2003.md`

## Cambios al procedimiento de gobernanza

KB-0003 ahora exige una Fase de Cierre del Chat cuando el cierre operativo sea identificado o solicitado.

La fase exige:

* escaneo completo del chat que termina;
* generacion del Documento de Transicion;
* almacenamiento en `98_Work_In_Progress`;
* verificacion de existencia;
* entrega de instrucciones del nuevo chat solo despues de completar lo anterior.

Observacion:

* Se mantuvo intacto el principio de que la continuidad no depende exclusivamente de cerrar chats, ya que un chat puede permanecer abierto indefinidamente.

## Diagnosticos y auditorias realizadas

### Auditoria funcional post-reserva

Se audito el flujo posterior a la creacion de una reserva en Reservas Publica.

Hallazgos:

* El flujo post-reserva esta concentrado en `src/App.tsx`.
* La navegacion se maneja mediante `screen`, `step` y `navigateTo`.
* Los eventos persistentes disponibles son `startReservationSession` y `trackSelectionEvent`.
* Los eventos post-reserva actuales se construyen localmente mediante `trackPostReservationEvent`, pero no persisten aun en Supabase.
* `Hablar ahora con Marta` y `Agendar llamada con Marta` aparecen en `AcompanamientoAmenaScreen`.
* Una futura tercera opcion de atencion humana debe ubicarse en `AcompanamientoAmenaScreen`, junto a las opciones actuales, sin plantearla como origen de todo el ciclo comercial.

### Auditoria de navegacion post-reserva

Se audito:

* `handleBack`.
* `BackButton`.
* Pantallas posteriores a confirmacion de reserva.
* Botones `Volver`, `Regresar`, `Volver al inicio`, `Inicio`, `Cerrar sesion`.

Resultado:

* Se propuso y luego implemento una microcirugia para eliminar duplicidades y reinicios prematuros.

### Auditoria de continuidad operacional post-reserva

Se identifico que:

* `reservationId` solo existia dentro de `AcompanamientoAmenaScreen`.
* El resumen de reserva no era consistente en todas las pantallas.

Resultado:

* Se elevo `reservationId` a nivel de `App`.
* Se agrego resumen compacto en todo el flujo post-reserva.

## Pendientes abiertos

### AMENA_Comalapa

* No hay working tree pendiente al cierre previo de esta fase de transicion.
* Este Documento de Transicion queda sin commit hasta autorizacion posterior.
* El commit `442e1f9` ya fue pusheado.

Pendientes conceptuales:

* Continuar Centro Demo sin iniciar nuevas microcirugias hasta autorizacion.
* Constructor de Escenarios queda como proyecto pendiente posterior a FASE 06.
* Arquitectura white label queda documentada como proyecto futuro de produccion.

### Reservas Publica

* No hay working tree pendiente.
* HEAD esta sincronizado con origin.
* No iniciar cambios adicionales sin nueva autorizacion.

Pendientes funcionales:

* Disenar futura tercera opcion de atencion humana en `AcompanamientoAmenaScreen`.
* No presentar esa opcion como origen de toda la operacion comercial.
* Si se implementa persistencia de eventos post-reserva, definir primero contrato y ruta de Supabase.

## Proxima microcirugia sugerida

Prioridad recomendada:

* Reservas Publica: disenar, auditar y luego implementar la tercera opcion de atencion humana dentro de `AcompanamientoAmenaScreen`, sin tocar Supabase inicialmente.

Condiciones:

* Mantener narrativa natural.
* No afirmar rechazo de tecnologia.
* No modificar servicios ni Supabase hasta contar con contrato claro.
* Validar `npm.cmd run lint` y `npm.cmd run build`.

Alternativa:

* Admin / Centro Demo: continuar con microcirugias del Centro Demo solo si el usuario autoriza explicitamente retomar ese frente.

## Riesgos conocidos

### Reservas Publica

* Los eventos post-reserva aun no persisten en Supabase; se registran como debug local mediante `trackPostReservationEvent`.
* `Reservation ID` se deriva actualmente de `selectedUnit.id`; es consistente para demo, pero podria necesitar contrato persistente cuando exista reserva real.
* `AcompanamientoAmenaScreen` depende de `analysis_report` como retroceso normalizado. Si se habilitan rutas heredadas hacia acompanamiento, debe revisarse que `analysisResult` exista.
* Hay pantallas heredadas renderizables (`further_steps`, `digital_agent`, `agent_call`, `visit_schedule`) que no se tocaron por restriccion y pueden conservar copias antiguas de patrones de navegacion.

### AMENA_Comalapa

* El Centro Demo sigue mayoritariamente integrado en `src/App.tsx`; las fronteras conceptuales han avanzado, pero la separacion fisica aun no esta completa.
* Las especificaciones nuevas son vision futura y no deben tratarse como implementacion aprobada inmediata.

## Observaciones relevantes de AMENA 58

* La disciplina de microcirugias se mantuvo: cambios pequenos, validados y commit/push solo con autorizacion.
* Se trabajo en dos repositorios diferentes, manteniendo cuidado de no mezclar Admin y Reservas.
* En varias ocasiones se verifico explicitamente que no se tocaran Supabase, servicios ni `package.json`.
* El procedimiento de continuidad se fortalecio durante el propio chat y se aplico inmediatamente para esta transicion.
* Se confirmo que el Documento de Transicion debe existir antes de iniciar un nuevo chat.

## Documentos que debe leer el siguiente chat

Al abrir Codex AMENA 59, leer como minimo:

* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`
* `docs/knowledge-base/00_Gobernanza/GOV-0001 - Sistema de Continuidad del Conocimiento.md`
* `docs/knowledge-base/00_Gobernanza/GOV-0002 - Protocolo de Inicialización de Nuevos Proyectos y Bootstrap Metodológico.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0004 - Arquitectura de Madurez del Conocimiento.md`
* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-58-A-59-20260630-2003.md`
* Ultimo Plan de Trabajo vigente, si existe.

## Instrucciones de apertura para el siguiente chat

No iniciar trabajo tecnico hasta:

1. Confirmar repositorio objetivo.
2. Confirmar rama.
3. Ejecutar `git status`.
4. Leer IME, GOV y KB aplicables.
5. Leer este Documento de Transicion.
6. Confirmar explicitamente los documentos leidos.
7. Esperar autorizacion del usuario antes de modificar archivos.

## Verificacion de esta transicion

Este documento fue generado en:

* `docs/knowledge-base/98_Work_In_Progress`

Nombre:

* `TRANSICION-Codex-AMENA-58-A-59-20260630-2003.md`

Estado esperado despues de su creacion:

* Un unico archivo nuevo sin commit en `AMENA_Comalapa`.
* Sin modificaciones de codigo.
* Sin modificaciones a documentacion distinta de este Documento de Transicion.

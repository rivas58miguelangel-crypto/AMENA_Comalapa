# SUPABASE-0001 - Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual

## Estado certificado de AMENA 62

Documento rector creado durante Codex AMENA 62, en laptop, dentro del repositorio rector:

`C:\Amena\Codex\AMENA_Comalapa`

Estado Git verificado al inicio de la sesion:

- Rama: `centro-mando-admin10`.
- HEAD: `bf77eb8 docs: add certified operational context specification`.
- Estado inicial: working tree limpio y alineado con `origin/centro-mando-admin10`.
- Ultimos commits verificados:
  - `bf77eb8 docs: add certified operational context specification`.
  - `7f40290 docs: formalize certified project continuity workflow`.
  - `ef4f3ee docs: add transition document for Codex AMENA 59`.

Fuentes documentales aplicadas:

- `KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats`.
- `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado`.
- `TRANSICION-Codex-AMENA-59-A-60-20260702-1251`.
- `architecture-decisions.md`.
- `demo-supabase-coherence-audit.md`.
- `PD-0001 - Arquitectura White Label y Parametrizacion de Produccion`.

Este documento no modifica codigo, no ejecuta SQL, no altera Supabase y no constituye una migracion.

## Restricciones absolutas

Durante la elaboracion de este documento rigen las siguientes restricciones absolutas:

- No modificar codigo.
- No ejecutar migraciones.
- No crear tablas en Supabase.
- No eliminar tablas en Supabase.
- No alterar Supabase.
- No ejecutar cambios de RLS, policies, funciones, triggers, indices ni vistas.
- No hacer commit hasta autorizacion humana posterior.

Cualquier modelo, tabla, columna o relacion mencionada aqui es una propuesta documental derivada de auditoria del codigo y de la Base de Conocimiento. No autoriza implementacion directa.

## Metodo rector corregido

El modelo definitivo de Supabase no debe partir de una lista anticipada de tablas ni de Marta/Vapi como eje aislado.

El metodo aprobado para AMENA 62 es:

1. Auditar primero el sistema ya codificado.
2. Identificar que datos ya se capturan, muestran, simulan, envian, consultan o necesitan persistencia.
3. Derivar necesidades de datos por aplicacion y modulo.
4. Construir el modelo objetivo a partir de esas necesidades.
5. Mantener la clasificacion del esquema actual como preliminar mientras no exista inventario remoto de solo lectura.

Por tanto, este documento distingue:

- dato observado en codigo;
- uso actual;
- persistencia actual;
- posible tabla actual;
- tabla objetivo propuesta;
- justificacion;
- prioridad.

## Matriz de necesidades de datos derivadas del codigo existente

### App Publica de Reservas

- Dato observado en codigo: cliente, telefono, email, unidad, sector, torre, nivel, modelo, estado de reserva, fuente, hora de creacion.
- Donde aparece: `src/App.tsx`, funciones `createSimulatedReservationClients`, `validateReservation`, FASE 01 del Centro Demo y vistas de expediente.
- Uso actual: simulacion de reserva en vivo, validacion operacional y origen del recorrido demo.
- Persistencia actual: estado React y datos mock; no se verifico persistencia remota real.
- Tabla actual posible: `operational_records` podria registrar eventos asociados, pero no cubre el dominio canonico de reservas.
- Tabla objetivo propuesta: `reservations`, `reservation_clients`, `reservation_units` o equivalentes segun inventario remoto.
- Justificacion: la reserva crea el caso operacional y activa el expediente vivo; no debe vivir solo como bitacora transversal.
- Prioridad: Alta.

### App de Vendedoras / Operaciones Comerciales

- Dato observado en codigo: vendedora, codigo, cliente, tipo de interaccion, resumen, necesidad detectada, objecion, prioridad, proximo paso, fecha/hora, formularios y uso de acompanamiento Marta.
- Donde aparece: `src/App.tsx`, funciones `createSimulatedSellerReports`, pagina `SellersPage` y FASE 03 del Centro Demo.
- Uso actual: reportes humanos simulados, mapa de apoyo comercial, seguimiento posterior a reserva y evidencia para Intelligence.
- Persistencia actual: estado React y datos mock.
- Tabla actual posible: `operational_records` puede registrar interacciones humanas puntuales.
- Tabla objetivo propuesta: `seller_profiles`, `seller_followups`, `commercial_interactions`, `seller_activity_reports` o equivalentes.
- Justificacion: el seguimiento comercial es un dominio operativo propio; debe poder analizarse por persona, cliente, reserva, prioridad y resultado.
- Prioridad: Alta.

### Mensajeria entre el Equipo

- Dato observado en codigo: remitente, destinatario, rol origen, rol destino, tema, mensaje, prioridad, cliente relacionado y fecha/hora.
- Donde aparece: `src/App.tsx`, funcion `createSimulatedInternalMessages` y FASE 03 Mensajes entre el Equipo.
- Uso actual: coordinacion interna posterior a reserva y fuente de hallazgos ejecutivos.
- Persistencia actual: estado React y datos mock.
- Tabla actual posible: ninguna verificada en codigo.
- Tabla objetivo propuesta: `team_messages`, `team_message_threads`, `team_message_events` o equivalentes.
- Justificacion: la mensajeria interna no debe confundirse con WhatsApp del cliente ni con bitacoras genericas; necesita trazabilidad por responsable y asunto.
- Prioridad: Alta.

### Centro Demo

- Dato observado en codigo: empresa demo, proyecto, escenario, fases, voluntarios, WhatsApp, email, estado de envio, estados de reserva, evidencia de envio, conteos por dominio, hallazgos visibles y estado de presentacion.
- Donde aparece: `src/App.tsx`, componente `DemoCommandEvidencePanel`, `DemoScenarioRoute` y dominio `demoFindings`.
- Uso actual: tablero escenico para conducir demostracion ejecutiva, validar fases, registrar evidencias visibles y activar inyeccion simulada.
- Persistencia actual: estado React; no se verifica persistencia Supabase.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `demo_runs`, `demo_run_events`, `demo_delivery_evidence`, `demo_presentation_states` o equivalentes.
- Justificacion: el Centro Demo presenta una corrida; no debe convertirse en fuente canonica productiva ni mezclarse con datos reales.
- Prioridad: Alta.

### Motor Demo

- Dato observado en codigo: cantidades a generar por dominio, auditoria, validos, defectuosos, regeneracion, aprobacion, inyeccion, contexto de corrida, seed, escenario, readiness, narrativa, inyeccion operacional y resumen ejecutivo.
- Donde aparece: `src/types/demo/*`, `DemoCommandEvidencePanel`, `createDemoRun`, `injectDemoScenario`, `buildDemoScenario`.
- Uso actual: generacion y validacion simulada de datos; preparacion conceptual de corridas demo.
- Persistencia actual: tipos TypeScript, estado React y objetos en memoria.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `demo_runs`, `demo_run_scenarios`, `demo_run_injections`, `demo_quality_gate_attempts`, `demo_quality_certifications` o equivalentes.
- Justificacion: toda corrida demo persistida debe conservar origen, semilla, auditoria, aprobacion y certificacion.
- Prioridad: Alta.

### Marta Voz / Vapi

- Dato observado en codigo: `callId`, asistente, canal voz, duracion, estado de llamada, resumen de transcripcion, intencion detectada, datos verificados, salida estructurada, siguiente paso, senal de riesgo, fecha/hora.
- Donde aparece: `src/App.tsx`, funcion `createSimulatedVapiCallLogs`, FASE 02 Marta Multicanal y hallazgos demo.
- Uso actual: logs de voz simulados con structured output; evidencia para seguimiento humano e Intelligence.
- Persistencia actual: estado React y datos mock.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `vapi_call_logs`, `marta_voice_interactions`, `voice_structured_outputs` o equivalentes.
- Justificacion: Vapi es canal tecnico de voz; sus logs completos y salidas estructuradas deben preservarse sin convertir Vapi en motor de WhatsApp texto.
- Prioridad: Alta.

### Marta Texto / WhatsApp

- Dato observado en codigo: mensaje de Marta, respuesta del cliente, intencion detectada, siguiente paso, estado, cliente, canal `whatsapp_text`, fecha/hora.
- Donde aparece: `src/App.tsx`, funcion `createSimulatedMartaWhatsAppFollowups`, FASE 02 Marta WhatsApp / Texto.
- Uso actual: simulacion de seguimientos conversacionales; en una ruta actual de inyeccion el arreglo de followups queda vacio, lo que indica deuda de integracion.
- Persistencia actual: estado React y datos mock.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `marta_text_conversations`, `marta_text_messages`, `whatsapp_followups`, `conversation_memory` o equivalentes.
- Justificacion: Marta Texto debe atender WhatsApp y futuro widget web con backend propio; comparte expediente, no tabla tecnica con Vapi.
- Prioridad: Alta.

### WhatsApp

- Dato observado en codigo: telefono normalizado, destinatario, nombre, link demo, endpoint `/send-whatsapp`, estado de envio, evidencia visible, resultado HTTP o error.
- Donde aparece: `src/App.tsx`, funcion `sendDemoLink`, voluntarios del Centro Demo y estados de envio.
- Uso actual: envio solicitado a backend local `http://localhost:4000/send-whatsapp`; la UI registra evidencia de solicitud, no confirmacion final del destinatario.
- Persistencia actual: backend local y estado React; no se verifico persistencia Supabase.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `whatsapp_messages`, `whatsapp_delivery_events`, `channel_delivery_events` o equivalentes.
- Justificacion: WhatsApp es canal operacional y debe dejar evidencia auditable ligada al expediente o a la corrida demo.
- Prioridad: Alta.

### Correo

- Dato observado en codigo: email, destinatario, nombre, link demo, endpoint `/send-email`, estado de envio, evidencia visible, apertura simulada de PDF, brochure y condiciones.
- Donde aparece: `src/App.tsx`, funcion `sendDemoLink`, comunicaciones del expediente y voluntarios del Centro Demo.
- Uso actual: envio solicitado a backend local y evidencia mock de apertura.
- Persistencia actual: backend local y estado React; no se verifico persistencia Supabase.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `email_messages`, `email_delivery_events`, `email_engagement_events` o equivalentes.
- Justificacion: correo es canal propio, con entregas, aperturas, adjuntos y evidencia que deben quedar asociados al expediente.
- Prioridad: Media-Alta.

### H-OperIA Intelligence

- Dato observado en codigo: hallazgos, senales, severidad, fuente, pagina destino, seccion destino, recomendacion operacional, evidencia asociada, estado visible, timestamp, preguntas ejecutivas, desgloses y respuesta generada.
- Donde aparece: `src/demo/domain/demoFindings.ts`, `src/demo/fixtures/demoFindingsFixtures.ts`, FASE 05 y FASE 06 de `src/App.tsx`.
- Uso actual: interpretacion demo de riesgos, oportunidades, prioridades y navegacion hacia paginas internas.
- Persistencia actual: fixtures, estado React y objetos mock.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `intelligence_signals`, `intelligence_findings`, `signal_evidence_links`, `executive_queries` o equivalentes.
- Justificacion: H-OperIA Intelligence interpreta datos operacionales; no conversa como Marta y debe preservar fuente, evidencia y recomendacion.
- Prioridad: Alta.

### Expediente Vivo

- Dato observado en codigo: identificador H-OperIA, cliente, reserva, unidad, vendedora, pipeline, prioridad, proxima accion, senales IA, timeline, comunicaciones, propuestas de Marta, documentos, pagos, compromisos, evidencias y responsables.
- Donde aparece: `src/App.tsx`, `ClientOperationalProfile`, `ClientPage`, `TrackingBlock`, `CommunicationsHub`, `MartaProposalReviewCenter`.
- Uso actual: vista central del cliente y continuidad post-reserva.
- Persistencia actual: mock local; `operational_records` puede aportar eventos si Supabase esta configurado, pero no contiene todo el expediente.
- Tabla actual posible: `operational_records` parcial y transversal.
- Tabla objetivo propuesta: `living_records` o `expedientes`, con relaciones a cliente, reserva, unidad, comunicaciones, documentos, pagos, evidencias e intelligence.
- Justificacion: el expediente vivo es el eje operacional. El canal no modifica el expediente y Marta es un unico agente multicanal que alimenta la misma continuidad.
- Prioridad: Critica.

### Documentos

- Dato observado en codigo: tipo de documento, cantidad, formato, estado, observacion de Intelligence, accion recomendada, evidencia y detalle por cliente.
- Donde aparece: `src/App.tsx`, `DocumentsPage`, `docDetails` y matriz documental operativa.
- Uso actual: gestion documental mock y priorizacion de fricciones.
- Persistencia actual: mock local; el servicio `operationalRecordService` soporta registros tipo `document`.
- Tabla actual posible: `operational_records` parcial.
- Tabla objetivo propuesta: `client_documents`, `document_requirements`, `document_reviews` o equivalentes.
- Justificacion: documentos afectan formalizacion y requieren estados, observaciones, responsables y evidencia verificable.
- Prioridad: Alta.

### Pagos / Finanzas

- Dato observado en codigo: ingresos recibidos, pendiente, atrasos, monto, moneda, fecha limite, pago realizado, compromiso, justificacion, accion recomendada.
- Donde aparece: `src/App.tsx`, `PaymentsPage`, `PaymentBlock`, `TrackingBlock`; `src/services/operationalRecordService.ts` soporta registros tipo `payment`.
- Uso actual: vista mock de pagos y compromisos; resumen operativo.
- Persistencia actual: `operational_records` si Supabase esta configurado; fallback demo si no.
- Tabla actual posible: `operational_records` parcial.
- Tabla objetivo propuesta: `payment_commitments`, `payment_events`, `financial_followups` o equivalentes.
- Justificacion: finanzas requiere estructura propia por montos, vencimientos, comprobantes, estados y consecuencias operativas.
- Prioridad: Alta.

### Servicio al Cliente

- Dato observado en codigo: tickets, codigo, cliente, tema, riesgo, detalle operativo, tiempo de atencion, escalaciones, area responsable, resoluciones con apoyo de Marta y aprendizaje.
- Donde aparece: `src/App.tsx`, `ServicePage`, `serviceDetails`, `ServiceBlock`.
- Uso actual: mock de servicio, escalaciones y aprendizaje operacional.
- Persistencia actual: mock local.
- Tabla actual posible: `operational_records` podria registrar eventos, pero no tickets completos.
- Tabla objetivo propuesta: `customer_service_cases`, `service_escalations`, `service_resolution_patterns` o equivalentes.
- Justificacion: servicio al cliente debe conectarse al expediente, pero conserva estados, SLA, escalaciones y aprendizaje propios.
- Prioridad: Media-Alta.

### Marketing / Canales / Campanas

- Dato observado en codigo: canal, campana, responsable, leads, reservas, ingresos, dolor detectado, accion directiva, diagnostico, comentario de Intelligence.
- Donde aparece: `src/App.tsx`, `CampaignsPage`, `CampaignDeliveryPage`, `FunnelLibraryPage`, `DashboardsPage`.
- Uso actual: analisis mock por canal, campana y embudos.
- Persistencia actual: mock local.
- Tabla actual posible: ninguna verificada.
- Tabla objetivo propuesta: `marketing_channels`, `campaigns`, `campaign_leads`, `campaign_performance`, `sales_funnels` o equivalentes.
- Justificacion: las campanas generan reservas, respuestas y aprendizaje; deben relacionarse con expediente y conversion real.
- Prioridad: Media-Alta.

### Evidencia Operacional

- Dato observado en codigo: evidencia, fuente, entidad fuente, pagina destino, seccion destino, detalle destino, resumen, estado visible y enlace a hallazgos.
- Donde aparece: `src/App.tsx`, `createSimulatedOperationalEvidence`, `AdminOperationalEvidenceAnchors`, `demoFindings`.
- Uso actual: puente entre datos simulados, hallazgos y paginas del Admin.
- Persistencia actual: estado React y fixtures.
- Tabla actual posible: `operational_records` como bitacora transversal.
- Tabla objetivo propuesta: `operational_evidence`, `evidence_links`, `evidence_sources` o equivalentes.
- Justificacion: la evidencia debe conectar dominios sin reemplazar sus tablas canonicas.
- Prioridad: Critica.

## Conclusion metodologica

El sistema codificado ya expresa una arquitectura operacional mas amplia que una sola integracion.

La reserva crea el caso. El seguimiento comercial, los mensajes internos, Marta Voz, Marta Texto, WhatsApp, correo, documentos, pagos, servicio al cliente e Intelligence agregan capas de evidencia y decision. Todas esas capas deben converger en un Expediente Vivo unico.

Por tanto:

- El modelo objetivo no debe nacer desde Marta/Vapi.
- El modelo objetivo no debe nacer desde una tabla generica unica.
- El modelo objetivo debe nacer desde el recorrido operacional ya codificado.
- El Expediente Vivo debe actuar como eje relacional y conceptual.
- Cada dominio debe conservar su responsabilidad canonica.
- `operational_records` debe conservarse como bitacora/evidencia transversal, no como reemplazo de reservas, documentos, pagos, mensajes, llamadas o inteligencia.
- La clasificacion del esquema actual permanece preliminar hasta inventario remoto de solo lectura.

## Modelo objetivo derivado

El modelo objetivo se organiza en capas.

### Capa 1 - Identidad y configuracion

Debe cubrir clientes, proyectos, identidad visual, inventario, activos, mensajes, documentos y contexto IA.

Entidades objetivo posibles:

- `clients`.
- `projects`.
- `project_branding`.
- `project_inventory`.
- `project_assets`.
- `project_messages`.
- `project_documents`.
- `project_ai_context`.

Estas entidades derivan de PD-0001 y de los modulos de Centro Demo, campanas, inventario y parametrizacion productiva.

### Capa 2 - Operacion comercial canonica

Debe cubrir reservas, clientes reservantes, unidades, vendedoras, seguimientos, documentos, pagos y servicio.

Entidades objetivo posibles:

- `reservations`.
- `reservation_clients`.
- `reservation_units`.
- `seller_profiles`.
- `commercial_interactions`.
- `seller_followups`.
- `client_documents`.
- `document_reviews`.
- `payment_commitments`.
- `payment_events`.
- `customer_service_cases`.
- `service_escalations`.

### Capa 3 - Expediente Vivo

Debe unir la operacion sin duplicarla.

Entidades objetivo posibles:

- `living_records` o `expedientes`.
- `living_record_events`.
- `living_record_links`.
- `living_record_timeline`.

El expediente no reemplaza a las tablas canonicas. Coordina su lectura, continuidad y trazabilidad.

### Capa 4 - Canales conversacionales y comunicacion

Debe separar canal, mensaje, entrega, respuesta y evidencia.

Entidades objetivo posibles:

- `whatsapp_messages`.
- `whatsapp_delivery_events`.
- `email_messages`.
- `email_delivery_events`.
- `email_engagement_events`.
- `vapi_call_logs`.
- `marta_voice_interactions`.
- `marta_text_conversations`.
- `marta_text_messages`.
- `conversation_memory`.

Marta es un unico agente multicanal, pero los canales tecnicos no deben mezclarse en una tabla opaca.

### Capa 5 - Mensajeria interna

Debe cubrir coordinacion entre roles, equipos y responsables.

Entidades objetivo posibles:

- `team_messages`.
- `team_message_threads`.
- `team_message_events`.

### Capa 6 - H-OperIA Intelligence

Debe interpretar datos operacionales y preservar fuente, evidencia, recomendacion y estado.

Entidades objetivo posibles:

- `intelligence_signals`.
- `intelligence_findings`.
- `signal_evidence_links`.
- `executive_queries`.
- `executive_query_breakdowns`.
- `executive_responses`.

H-OperIA Intelligence no es Marta. Intelligence analiza, prioriza, recomienda y explica para usuarios internos.

### Capa 7 - Evidencia transversal

Debe registrar evidencia sin sustituir el dominio canonico.

Entidades objetivo posibles:

- `operational_evidence`.
- `evidence_sources`.
- `evidence_links`.
- `operational_records`.

### Capa 8 - Demo y Motor Demo

Debe separar completamente datos simulados de datos productivos.

Entidades objetivo posibles:

- `demo_runs`.
- `demo_run_scenarios`.
- `demo_run_injections`.
- `demo_quality_gate_attempts`.
- `demo_quality_certifications`.
- `demo_reservations`.
- `demo_internal_messages`.
- `demo_sales_reports`.
- `demo_marta_vapi_logs`.
- `demo_marta_whatsapp_followups`.
- `demo_intelligence_signals`.
- `demo_operational_evidence`.

Los nombres son preliminares y deben validarse contra el inventario remoto antes de disenar SQL.

## Expediente Vivo como eje central

El Expediente Vivo es el eje operacional del modelo.

Debe responder:

- Quien es el cliente o prospecto.
- Que reserva o interes origino el caso.
- Que unidad, proyecto o producto esta relacionado.
- Que vendedora o responsable humano esta asignado.
- Que ha ocurrido en cada canal.
- Que documentos, pagos, compromisos y tickets existen.
- Que evidencias respaldan cada afirmacion.
- Que senales detecto H-OperIA Intelligence.
- Que decisiones humanas fueron tomadas.
- Cual es el siguiente paso.

Reglas rectoras:

- Existe un unico expediente por continuidad operacional valida.
- El canal no modifica el expediente.
- Marta Voz, Marta Texto, WhatsApp, correo, vendedoras, documentos, pagos y servicio alimentan el mismo expediente.
- El expediente no debe ser una bolsa JSON opaca.
- El expediente no debe reemplazar los dominios canonicos.
- El expediente debe conservar timeline, relaciones y evidencias.

## Separacion produccion vs demo

La separacion produccion/demo es obligatoria.

### Produccion

Produccion representa operacion real de clientes, proyectos, reservas, comunicaciones, documentos, pagos, seguimientos y decisiones.

Debe protegerse mediante:

- RLS adecuada.
- Aislamiento por cliente/proyecto/organizacion cuando corresponda.
- Auditoria de cambios.
- Validacion humana para acciones sensibles.
- Integridad referencial.
- Respaldos.

### Demo

Demo representa corridas simuladas, certificables y regenerables.

Debe protegerse mediante:

- `demo_run_id` obligatorio.
- `is_simulated = true` o equivalente.
- Semilla, version de motor y politica.
- Quality gate antes de persistir.
- Certificacion antes de usar en presentacion.
- Separacion clara respecto a datos reales.

Una tabla demo no debe convertirse automaticamente en tabla productiva. Una tabla productiva no debe recibir datos demo sin aislamiento aprobado.

## Rol de operational_records

`operational_records` es la unica tabla usada directamente por el codigo auditado mediante `src/services/operationalRecordService.ts`.

Uso verificado:

- Lectura de registros operacionales desde Supabase si las variables estan configuradas.
- Fallback demo local si Supabase no esta configurado o falla.
- Insercion de interacciones humanas.
- Soporte para tipos `interaction`, `document` y `payment`.
- Campos como `reservation_id`, `customer_name`, `client_name`, `title`, `description`, `notes`, `channel`, `created_by`, `interaction_type`, `priority`, `next_step`, `status` y `created_at`.

Clasificacion rectora:

- Conservar.
- Modificar conceptualmente despues de inventario remoto.
- No usar como modelo canonico unico.
- Usar como bitacora/evidencia transversal.
- Relacionar con Expediente Vivo y entidades canonicas cuando existan.

`operational_records` no debe sustituir:

- reservas;
- clientes;
- unidades;
- documentos;
- pagos;
- mensajes internos;
- WhatsApp;
- correo;
- Vapi;
- Marta Texto;
- Intelligence;
- evidencia estructurada.

## Clasificacion preliminar del esquema actual

Esta clasificacion es preliminar porque no se ha ejecutado inventario remoto de solo lectura de Supabase.

### Conservar

- `operational_records`.

Motivo: es la unica tabla referenciada por el codigo actual. Debe conservarse como bitacora/evidencia transversal y puente incremental mientras se disena el modelo canonico.

Tambien deben conservarse, si existen en Supabase remoto, todas las tablas con datos reales, dependencias, policies, vistas, funciones, triggers o consumidores no auditados todavia. Ninguna tabla remota puede descartarse sin inventario.

### Modificar

Candidatas conceptuales a modificar despues de inventario remoto:

- `operational_records`, para relacionarse con Expediente Vivo, entidades fuente y evidencia estructurada.
- Cualquier tabla remota existente que ya represente reservas, clientes, proyectos, mensajes, documentos, pagos o logs, si su estructura es recuperable.

La modificacion debe definirse solo despues de conocer columnas, relaciones, RLS, volumen, consumidores y dependencias.

### Fusionar

No se aprueba fusionar ninguna tabla todavia.

Fusionar solo podria evaluarse cuando el inventario remoto demuestre duplicidad real entre tablas equivalentes y exista:

- respaldo;
- plan de migracion;
- mapeo de columnas;
- validacion de consumidores;
- plan de rollback;
- aprobacion humana.

Posibles areas a revisar en el futuro:

- duplicados entre bitacoras genericas y evidencias;
- duplicados entre mensajes internos y seguimientos comerciales;
- duplicados entre eventos de canal y eventos de expediente.

### Crear

No se autoriza crear tablas en Supabase durante AMENA 62.

Tablas o familias candidatas a diseno SQL futuro, derivadas del codigo:

- Expediente Vivo: `living_records`, `living_record_events`, `living_record_links`.
- Reservas: `reservations`, `reservation_clients`, `reservation_units`.
- Vendedoras: `seller_profiles`, `seller_followups`, `commercial_interactions`.
- Mensajeria interna: `team_messages`, `team_message_threads`.
- Marta Voz/Vapi: `vapi_call_logs`, `marta_voice_interactions`.
- Marta Texto/WhatsApp: `marta_text_conversations`, `marta_text_messages`, `whatsapp_followups`, `conversation_memory`.
- WhatsApp: `whatsapp_messages`, `whatsapp_delivery_events`.
- Correo: `email_messages`, `email_delivery_events`, `email_engagement_events`.
- Documentos: `client_documents`, `document_requirements`, `document_reviews`.
- Pagos: `payment_commitments`, `payment_events`.
- Servicio: `customer_service_cases`, `service_escalations`.
- Intelligence: `intelligence_signals`, `intelligence_findings`, `signal_evidence_links`, `executive_queries`.
- Evidencia: `operational_evidence`, `evidence_sources`, `evidence_links`.
- Demo: `demo_runs`, `demo_run_scenarios`, `demo_run_injections`, `demo_quality_gate_attempts`, `demo_quality_certifications` y tablas demo por dominio.

Estas son candidatas documentales. No son instrucciones SQL.

### Eliminar solo despues de respaldo e inventario remoto

No se clasifica ninguna tabla como eliminable en este momento.

Toda eliminacion futura requiere:

- inventario remoto de solo lectura;
- confirmacion de que la tabla no contiene datos vigentes;
- revision de consumidores en codigo, vistas, funciones, triggers, policies, reportes e integraciones externas;
- respaldo verificado;
- plan de reversibilidad;
- aprobacion humana explicita.

Eliminar por simple ausencia de referencias en frontend queda prohibido.

## Pendientes antes de cualquier migracion

Antes de ejecutar cualquier migracion, crear tabla, modificar tabla, eliminar tabla, cambiar RLS o conectar persistencia real, deben completarse estos pendientes:

1. Inventario remoto de solo lectura.
   - Listar esquemas, tablas, columnas, tipos, constraints, FKs, indices, vistas, funciones, triggers, policies, RLS, volumen y fechas de actualizacion.

2. Respaldo.
   - Generar respaldo verificable antes de cualquier cambio.
   - Confirmar restauracion o mecanismo de recuperacion.

3. Revision de dependencias.
   - Revisar consumidores en frontend, backend, funciones, RPC, vistas, triggers, jobs, integraciones externas, reportes y procesos manuales.

4. Diseno SQL.
   - Preparar migraciones revisables, separadas por dominio, con comentarios, constraints y RLS.
   - No mezclar limpieza, creacion y conexion funcional en una sola intervencion.

5. Validacion humana.
   - Revisar modelo, nombres, alcance, riesgos, datos reales/demo, RLS y plan de ejecucion.
   - Obtener aprobacion explicita antes de tocar Supabase.

6. Plan de rollback.
   - Definir como revertir cada cambio.
   - Probar estrategia en entorno seguro cuando aplique.
   - Mantener ventana de recuperacion y criterios de abortar.

## Criterio de cierre de este documento

Este documento cumple su funcion si permite continuar AMENA 62 con un metodo claro:

- primero auditar el codigo;
- luego derivar necesidades;
- despues disenar modelo;
- mantener `operational_records` como bitacora transversal;
- colocar el Expediente Vivo como eje;
- separar produccion y demo;
- y bloquear cualquier migracion hasta completar inventario remoto, respaldo, dependencias, SQL, validacion humana y rollback.

# SUPABASE-RUTA2-0019 - Clasificacion definitiva de tablas para pausa formal

Fecha de cierre documental: 2026-07-11
Proyecto: AMENA / H-OperIA / Centro Demo
Repositorio base: AMENA_Comalapa
Rama base certificada antes de este paquete: centro-mando-admin10
HEAD base certificado antes de este paquete: 6b5b468ead7d2381b436a847eebbb3c75a6bf088

## 1. Naturaleza del documento

Este documento clasifica las tablas conocidas de Supabase Ruta 2 al momento de declarar la pausa formal del frente Supabase Centro Demo.

No autoriza persistencia.
No autoriza COMMIT SQL.
No autoriza creacion, eliminacion ni modificacion de tablas.
No autoriza reutilizar tablas legacy.
No autoriza cambios de aplicacion.

Su funcion es preservar criterio tecnico para que una reanudacion futura no confunda tablas rectoras nuevas, tablas operativas existentes, tablas legacy, tablas auxiliares o tablas aun indeterminadas.

## 2. Fuentes documentales revisadas

- TRANSICION-Codex-AMENA-77-A-78-20260710.md
- SUPABASE-0001 - Revision Tecnica de Uso Real de Supabase en el Codigo Actual.md
- SUPABASE-0007 - Inventario y Clasificacion de Tablas Supabase Existentes Frente al Plan Maestro SQL.md
- SUPABASE-RUTA2-0001 a SUPABASE-RUTA2-0018
- BLOQUE-01-nucleo-institucional.sql
- BLOQUE-02-identidad-proyecto.sql
- BLOQUE-03-project-inventory.sql
- BLOQUE-04-project-catalog.sql.md
- BLOQUE-05-project-commercial-types.sql.md
- BLOQUE-06-project-commercial-type-attributes.sql.md
- RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md
- RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md
- RUTA2-SUPABASE-0002-mapa-conversion-funcional.md
- RUTA2-SUPABASE-0003-plan-implementacion-faseada.md

## 3. Criterios de clasificacion

Las tablas se clasifican en seis grupos:

- A: Rectoras nuevas y validas para Ruta 2.
- B: Operativas existentes que deben conservarse, auditarse o integrarse mas adelante.
- C: Tablas proyectadas o pendientes de diseno/aplicacion.
- D: Legacy o candidatas a no uso operativo directo.
- E: Tecnicas, auxiliares o de evidencia.
- F: Indeterminadas hasta nueva auditoria.

La clasificacion no certifica existencia actual en Supabase al 2026-07-11. La existencia real debe ser reconfirmada en una fase futura autorizada, sin inferencias.

## 4. Categoria A: tablas rectoras nuevas y validas de Ruta 2

Estas son las siete tablas rectoras cubiertas por el dry-run humano exitoso con ROLLBACK de los Bloques 01 a 05.

| tabla | bloque | funcion | dependencia principal | estado en dry-run | decision de pausa |
|---|---:|---|---|---|---|
| organizations | 01 | Empresa rectora demo | Ninguna padre dentro del lote | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| projects | 01 | Proyecto Ruta 2 Demo | organizations.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| project_branding | 02 | Identidad visual/textual del proyecto | projects.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| project_assets | 02 | Activos visuales, incluido hero primario | projects.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| project_inventory | 03 | Inventario comercial rector por unidad | projects.id y project_catalog.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| project_catalog | 04 | Catalogo comercial parametrizable | projects.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |
| project_commercial_types | 05 | Tipos comerciales por catalogo | project_catalog.id | INSERT temporal observado y revertido | Conservar como tabla rectora nueva |

Decision: estas siete tablas son el nucleo rector preservado de Ruta 2, pero permanecen sin datos persistidos por decision expresa de pausa formal.

## 5. Categoria B: tablas operativas existentes que se conservan pero no son rectoras

Estas tablas aparecen en el inventario Supabase previo y/o en auditorias de codigo. Deben conservarse como superficie operativa posible, pero no sustituyen las siete tablas rectoras.

| tabla | funcion esperada | relacion con Ruta 2 | decision de pausa |
|---|---|---|---|
| appointments | Citas | Consumidor futuro de reservas/prospectos | Conservar; no poblar desde Ruta 2 ahora |
| campaigns | Campanas | Marketing/CRM | Conservar; auditar antes de integrar |
| communication_logs | Comunicaciones | Registro operativo | Conservar; no usar como canon comercial |
| construction_updates | Avances de obra | Operacion postventa/obra | Conservar; fuera de alcance actual |
| crm_activity_logs | Actividad CRM | Seguimiento comercial | Conservar; requiere mapa CRM futuro |
| customer_service_cases | Casos de servicio | Postventa/soporte | Conservar; fuera de alcance actual |
| documents | Documentos | Evidencia/documentacion | Conservar; requiere politica documental |
| human_notes | Notas humanas | Bitacora manual | Conservar; no usar como fuente rectora |
| marta_access_sessions | Sesiones Marta | Auditoria de agente/asistente | Conservar; futura integracion Marta |
| marta_interactions | Interacciones Marta | Conversaciones/acciones Marta | Conservar; futura integracion Marta |
| operational_events | Eventos operativos | Telemetria operativa | Conservar; no reemplaza reservas |
| operational_records | Registro transversal usado por codigo | Evidencia/operacion actual | Conservar; no usar como tabla canonica universal |
| payments | Pagos | Flujo comercial/post-reserva | Conservar; fuera de alcance actual |
| post_delivery_support_cases | Soporte post-entrega | Postventa | Conservar; fuera de alcance actual |
| prospects | Prospectos | Reserva/comercial | Conservar; requiere integracion real |
| reservation_app_sessions | Sesiones app publica | Seleccion publica | Conservar; pieza parcial detectada |
| reservation_cta_actions | Acciones CTA post-reserva | Funnel publico | Conservar; pieza parcial detectada |
| reservation_selection_events | Eventos de seleccion | Sector/manzana/lote/modelo | Conservar; pieza parcial detectada |
| reservations | Reservas canonicas | Reserva final | Conservar; falta insercion real confirmada |
| sales_funnel_stages | Etapas funnel | CRM/comercial | Conservar; auditar antes de integrar |
| unit_construction_updates | Avances por unidad | Obra/unidad | Conservar; fuera de alcance actual |
| user_generated_comments | Comentarios usuario | Operacion/soporte | Conservar; auditar permisos antes de integrar |
| users_internal | Usuarios internos | Operacion/admin | Conservar; requiere RLS y roles |

Decision: estas tablas no deben ser borradas ni sobreescritas. Tampoco deben absorber responsabilidades de las tablas rectoras Ruta 2 sin un diseno posterior.

## 6. Categoria C: tablas proyectadas o pendientes

| tabla o familia | origen documental | estado | decision de pausa |
|---|---|---|---|
| project_commercial_type_attributes | Bloque 06 | Propuesta fuera del dry-run exitoso | Pendiente; no poblar ni integrar |
| reservation_clients | Planificacion conceptual | No certificada como tabla existente | Pendiente; no inferir |
| reservation_units | Planificacion conceptual | No certificada como tabla existente | Pendiente; no inferir |
| living_records | Planificacion conceptual | No certificada como tabla existente | Pendiente; no inferir |
| team_messages | Planificacion conceptual | No certificada como tabla existente | Pendiente; no inferir |
| intelligence_outputs | Planificacion conceptual | No certificada como tabla existente | Pendiente; no inferir |

Decision: ninguna tabla proyectada queda autorizada para creacion, migracion o carga durante la pausa.

## 7. Categoria D: legacy o candidatas a no uso operativo directo

Estas tablas no deben usarse como base para el Centro Demo ni como reemplazo de Ruta 2.

| tabla | motivo de alerta | decision de pausa |
|---|---|---|
| property_inventory | Tabla preexistente/legacy; no coincide con el modelo rector nuevo | No usar para nuevo demo; solo futura auditoria/migracion si se autoriza |
| property_models | Tabla preexistente/legacy; no representa el catalogo parametrizable nuevo | No usar para nuevo demo; solo futura auditoria/migracion si se autoriza |
| inventory_import_batches | Tabla de importaciones; no es fuente comercial rectora | No usar para flujo demo; conservar para trazabilidad si aplica |

Prohibicion: no conectar la App Publica, Centro de Mando, Vendedoras, Marta ni Intelligence a estas tablas para aparentar avance de Ruta 2.

## 8. Categoria E: tecnicas, auxiliares o de evidencia

| tabla | funcion | decision de pausa |
|---|---|---|
| technical_evidence_logs | Evidencia tecnica/auditoria | Conservar; no usar como sustituto de reserva ni inventario |
| knowledge_chunks | Fragmentos de conocimiento | Conservar; futura integracion H-OperIA Intelligence |
| knowledge_documents | Documentos de conocimiento | Conservar; futura integracion H-OperIA Intelligence |

Decision: estas tablas pueden ser relevantes para trazabilidad y conocimiento, pero no son tablas rectoras comerciales.

## 9. Categoria F: indeterminadas

| tabla | motivo | decision de pausa |
|---|---|---|
| amena_keepalive_logs | Detectada en inventario como existencia sin proposito funcional suficiente | Mantener indeterminada hasta auditoria futura |

Decision: no usar ni eliminar hasta confirmar origen, productor, consumidor y valor operativo.

## 10. Resumen de decisiones

1. Las siete tablas rectoras nuevas son: organizations, projects, project_branding, project_assets, project_inventory, project_catalog y project_commercial_types.
2. El Bloque 06 permanece fuera de alcance y no validado.
3. Las tablas operativas se conservan, pero no sustituyen la arquitectura rectora.
4. Las tablas legacy property_inventory, property_models e inventory_import_batches no deben usarse para construir el demo nuevo.
5. La existencia real, columnas, RLS y datos actuales de cualquier tabla no cubierta por el dry-run deben reconfirmarse en una fase futura autorizada.
6. La pausa formal deja congelado el frente Supabase Ruta 2 sin persistencia.

## 11. Confirmacion de alcance

- SQL no ejecutado.
- Supabase no abierto.
- Esquema no modificado.
- Aplicaciones no modificadas.
- Commit SQL no autorizado.
- Persistencia no autorizada.

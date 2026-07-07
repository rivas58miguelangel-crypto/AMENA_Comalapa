# SUPABASE-0007 - Auditoria de Clasificacion de Tablas Public

## Estado

Borrador documental para revision humana.

Documento creado durante Codex AMENA 72 como pausa obligatoria de gobernanza Supabase antes de continuar con el diseno SQL revisable del Bloque 3 `project_inventory`.

Este documento no modifica codigo, no ejecuta SQL, no altera Supabase, no crea tablas, no modifica tablas, no elimina tablas, no crea migraciones, no hace commit y no autoriza implementacion tecnica.

## Fecha

2026-07-07

## Objetivo

Registrar una fuente de verdad documental preliminar sobre el estado actual de las tablas existentes en el esquema `public` de Supabase antes de disenar el Bloque 3 `project_inventory`.

La auditoria distingue explicitamente entre:

- A. Tablas rectoras nuevas del Plan Maestro SQL.
- B. Tablas operacionales vigentes.
- C. Tablas legacy/preexistentes.
- D. Tablas desconocidas o pendientes de clasificacion.

Bloque 3 queda detenido hasta que esta clasificacion sea revisada y aprobada humanamente.

## SQL utilizado

Consulta de solo lectura ejecutada manualmente por el usuario en Supabase SQL Editor:

```sql
select
  schemaname as table_schema,
  tablename as table_name,
  tableowner as table_owner,
  hasindexes as has_indexes,
  hasrules as has_rules,
  hastriggers as has_triggers,
  rowsecurity as row_level_security
from pg_catalog.pg_tables
where schemaname = 'public'
order by tablename;
```

## Listado completo obtenido

| table_schema | table_name | table_owner | has_indexes | has_rules | has_triggers | row_level_security |
| --- | --- | --- | --- | --- | --- | --- |
| public | amena_keepalive_logs | postgres | true | false | false | true |
| public | appointments | postgres | true | false | true | true |
| public | campaigns | postgres | true | false | true | true |
| public | communication_logs | postgres | true | false | true | true |
| public | construction_updates | postgres | true | false | true | true |
| public | crm_activity_logs | postgres | true | false | true | true |
| public | customer_service_cases | postgres | true | false | true | true |
| public | documents | postgres | true | false | true | true |
| public | human_notes | postgres | true | false | true | true |
| public | inventory_import_batches | postgres | true | false | false | true |
| public | knowledge_chunks | postgres | true | false | true | true |
| public | knowledge_documents | postgres | true | false | true | true |
| public | marta_access_sessions | postgres | true | false | true | true |
| public | marta_interactions | postgres | true | false | true | true |
| public | operational_events | postgres | true | false | true | true |
| public | operational_records | postgres | true | false | true | true |
| public | organizations | postgres | true | false | true | false |
| public | payments | postgres | true | false | true | true |
| public | post_delivery_support_cases | postgres | true | false | true | true |
| public | project_assets | postgres | true | false | true | false |
| public | project_branding | postgres | true | false | true | false |
| public | projects | postgres | true | false | true | false |
| public | property_inventory | postgres | true | false | true | true |
| public | property_models | postgres | true | false | true | true |
| public | prospects | postgres | true | false | true | true |
| public | reservation_app_sessions | postgres | true | false | true | true |
| public | reservation_cta_actions | postgres | true | false | true | true |
| public | reservation_selection_events | postgres | true | false | true | true |
| public | reservations | postgres | true | false | true | true |
| public | sales_funnel_stages | postgres | true | false | true | true |
| public | technical_evidence_logs | postgres | true | false | true | true |
| public | unit_construction_updates | postgres | true | false | true | true |
| public | user_generated_comments | postgres | true | false | true | true |
| public | users_internal | postgres | true | false | true | true |

## Matriz de clasificacion

| Tabla | Clasificacion propuesta | Evidencia o razon de clasificacion | Riesgo de mezclarla con modelo nuevo | Recomendacion |
| --- | --- | --- | --- | --- |
| `amena_keepalive_logs` | D. Desconocida/pendiente de clasificacion | Tabla tecnica visible en `public`; no pertenece al Plan Maestro SQL y su uso operativo no esta certificado en esta auditoria. | Puede representar monitoreo tecnico, automatizacion o integracion previa; mezclarla con dominios rectores contaminaria trazabilidad operacional. | Conservar y auditar. No relacionar con Bloque 3. |
| `appointments` | B. Operacional vigente probable | Nombre indica citas/agendamientos; tiene RLS y triggers, senal de uso operacional previo. No pertenece al Plan Maestro SQL. | Podria confundirse con reservas, seguimientos o acciones comerciales futuras. | Conservar y auditar consumidores antes de cualquier integracion. |
| `campaigns` | B. Operacional vigente probable | Dominio reconocido en SUPABASE-0001/PD-0002 como marketing/campanas; tabla con RLS y triggers. | Podria usarse indebidamente como fuente de catalogo o inventario por origen comercial. | Conservar. Auditar relacion futura con catalogo y reservas. |
| `communication_logs` | B. Operacional vigente probable | Nombre indica bitacora de comunicaciones; canal/comunicaciones es dominio operacional reconocido. Tiene RLS y triggers. | Riesgo de convertir canal en frontera de memoria o mezclar comunicaciones con inventario. | Conservar y auditar. Mantener fuera de Bloque 3. |
| `construction_updates` | B. Operacional vigente probable | Nombre indica actualizaciones de construccion; puede alimentar conocimiento de proyecto o avance. Tiene RLS y triggers. | Podria confundirse con atributos de inventario o disponibilidad comercial sin validacion. | Conservar y auditar. No usar como fuente maestra de inventario. |
| `crm_activity_logs` | B. Operacional vigente probable | Nombre indica actividad CRM; seguimiento comercial es dominio operacional. Tiene RLS y triggers. | Alto riesgo de mezclar actividad operacional con Fuente Comercial. | Conservar como operacional. No usar para `project_inventory`. |
| `customer_service_cases` | B. Operacional vigente probable | Coincide con dominio de servicio al cliente identificado en SUPABASE-0001. Tiene RLS y triggers. | Podria absorberse indebidamente en Expediente Vivo o inventario si se confunden casos con productos. | Conservar y auditar dependencias. |
| `documents` | B. Operacional vigente probable | Dominio documental reconocido por ACO/SUPABASE. Tiene RLS y triggers. | Riesgo de mezclar documentos de cliente, documentos comerciales y evidencia. | Conservar. Auditar tipos y separar de futuros `commercial_documents`. |
| `human_notes` | B. Operacional vigente probable | Notas humanas son evidencia/criterio operacional reconocido. Tiene RLS y triggers. | Riesgo de tratar notas como hechos confirmados o como datos maestros. | Conservar y auditar. Mantener como insumo operacional, no rector. |
| `inventory_import_batches` | C. Legacy/preexistente candidata | Nombre indica proceso de importacion de inventario previo al Plan Maestro SQL; no pertenece a Bloques 1/2. | Critico si se usa para poblar `project_inventory` sin mapeo, validacion y aprobacion. | Congelar y auditar. Migrar solo despues de decision humana. |
| `knowledge_chunks` | B. Operacional vigente probable | Tabla de conocimiento/RAG o base de conocimiento operativa; tiene RLS y triggers. | Riesgo de mezclar conocimiento documental con memoria operacional o catalogo. | Conservar y auditar. No mezclar con catalogo comercial. |
| `knowledge_documents` | B. Operacional vigente probable | Relacionada con documentos de conocimiento; tiene RLS y triggers. | Riesgo de confundir documentos de conocimiento con documentos comerciales o evidencia. | Conservar y auditar. Mantener fuera de Bloque 3. |
| `marta_access_sessions` | B. Operacional vigente probable | Tabla asociada a Marta y sesiones de acceso; Marta es dominio operacional reconocido. Tiene RLS y triggers. | Riesgo de que Marta se trate como fuente de verdad comercial. | Conservar y auditar. Marta consume catalogo, no lo gobierna. |
| `marta_interactions` | B. Operacional vigente probable | Tabla asociada a interacciones de Marta; dominio reconocido en SUPABASE-0001. Tiene RLS y triggers. | Alto riesgo de convertir interpretaciones/conversaciones en datos maestros de inventario. | Conservar y auditar. No usar para Bloque 3. |
| `operational_events` | B. Operacional vigente probable | Nombre indica eventos operacionales transversales; tiene RLS y triggers. | Riesgo de usar bitacora/eventos como modelo canonico unico. | Conservar y auditar. Mantener subordinada a dominios canonicos. |
| `operational_records` | B. Operacional vigente | SUPABASE-0001 la identifica como unica tabla referenciada por codigo actual mediante `operationalRecordService`. | Muy alto si sustituye dominios canonicos o se mezcla con inventario rector. | Conservar. Auditar. Mantener como bitacora/puente transversal. |
| `organizations` | A. Rectora nueva Plan Maestro SQL | Creada por Bloque 1 y registrada en `BLOQUE-01-nucleo-institucional.sql`. | Bajo si se usa como raiz rectora; alto si se mezcla con legacy sin mapeo. | Conservar como tabla rectora. |
| `payments` | B. Operacional vigente probable | Dominio financiero reconocido en ACO/SUPABASE; tabla con RLS y triggers. | Riesgo de mezclar pagos o compromisos con reservas/inventario. | Conservar y auditar. Mantener fuera de Bloque 3. |
| `post_delivery_support_cases` | B. Operacional vigente probable | Nombre indica postventa/soporte posterior a entrega; dominio de servicio/postventa reconocido. | Puede mezclarse indebidamente con servicio al cliente o Expediente Vivo sin frontera. | Conservar y auditar. |
| `project_assets` | A. Rectora nueva Plan Maestro SQL | Creada por Bloque 2 y registrada en `BLOQUE-02-identidad-proyecto.sql`. | Alto si se usa para activos de producto/unidad o catalogo comercial. | Conservar como tabla rectora de Bloque 2. No usar como inventario. |
| `project_branding` | A. Rectora nueva Plan Maestro SQL | Creada por Bloque 2 y registrada en `BLOQUE-02-identidad-proyecto.sql`. | Alto si se mezcla con catalogo, inventario o assets comerciales. | Conservar como tabla rectora de Bloque 2. |
| `projects` | A. Rectora nueva Plan Maestro SQL | Creada por Bloque 1 y registrada en `BLOQUE-01-nucleo-institucional.sql`. | Bajo como base rectora; alto si se le adjuntan relaciones legacy sin auditoria. | Conservar como tabla rectora y base futura de Bloque 3. |
| `property_inventory` | C. Legacy/preexistente candidata | Tabla visible anterior al Plan Maestro SQL; nombre inmobiliario especifico. No pertenece a Bloques 1/2. | Critico si se usa como base directa de `project_inventory`; podria arrastrar supuestos legacy e inmobiliarios. | Congelar y auditar. No usar como base de Bloque 3 sin decision humana formal. |
| `property_models` | C. Legacy/preexistente candidata | Tabla visible anterior al Plan Maestro SQL; nombre inmobiliario especifico. No pertenece a Bloques 1/2. | Critico si se convierte automaticamente en `product_models` o fuente de catalogo rector. | Congelar y auditar. No usar sin decision humana formal. |
| `prospects` | B. Operacional vigente probable | Cliente/prospecto es dominio operacional reconocido. Tiene RLS y triggers. | Riesgo de mezclar identidad relacional con reservas o inventario. | Conservar y auditar relaciones futuras. |
| `reservation_app_sessions` | B. Operacional vigente probable | Relacionada con sesiones de App Publica de Reservas; tiene RLS y triggers. | Riesgo de que comportamiento de sesion gobierne catalogo/inventario. | Conservar y auditar. Reservas consume inventario. |
| `reservation_cta_actions` | B. Operacional vigente probable | Relacionada con acciones CTA de reservas; tiene RLS y triggers. | Riesgo de confundir accion/seleccion con disponibilidad o Fuente Comercial. | Conservar y auditar. Mantener fuera de Bloque 3. |
| `reservation_selection_events` | B. Operacional vigente probable | Eventos de seleccion de reserva; tiene RLS y triggers. | Critico si se usa como estado maestro de inventario o disponibilidad. | Conservar y auditar. No usar como fuente de `project_inventory`. |
| `reservations` | B. Operacional vigente probable | Dominio de reservas reconocido por SUPABASE-0001; tiene RLS y triggers. | Alto si se permite que reservas gobierne inventario, precios o disponibilidad. | Conservar y auditar. Mantener como consumidor futuro del catalogo. |
| `sales_funnel_stages` | B. Operacional vigente probable | Embudo comercial reconocido como dominio de marketing/ventas; tiene RLS y triggers. | Riesgo de mezclar pipeline comercial con catalogo o inventario. | Conservar y auditar. |
| `technical_evidence_logs` | B. Operacional vigente probable | Evidencia tecnica es dominio estructural reconocido; tiene RLS y triggers. | Riesgo de que evidencia sustituya dominio canonico. | Conservar y auditar. Mantener evidencia como soporte, no como inventario. |
| `unit_construction_updates` | B. Operacional vigente probable | Actualizaciones de construccion por unidad; relacionada con avance/estado de unidades. Tiene RLS y triggers. | Alto si se mezcla con disponibilidad o inventario comercial sin validacion. | Conservar y auditar. No usar como base de Bloque 3 sin mapeo formal. |
| `user_generated_comments` | B. Operacional vigente probable | Comentarios humanos/usuarios; tiene RLS y triggers. | Riesgo de tratar comentarios como hechos o atributos maestros. | Conservar y auditar. |
| `users_internal` | B. Operacional vigente probable | Usuarios internos/roles operativos; tiene RLS y triggers. | Riesgo bajo para Bloque 3, pero alto si se altera sin conocer autenticacion/consumidores. | Conservar y auditar dependencias. |

## Resumen cuantitativo

Total de tablas public listadas: 34.

- A. Rectoras nuevas Plan Maestro SQL: 4.
- B. Operacionales vigentes o vigentes probables: 27.
- C. Legacy/preexistentes candidatas: 3.
- D. Desconocidas/pendientes de clasificacion: 1.

## Riesgos detectados

1. Riesgo de usar `property_inventory` como base directa de `project_inventory`.
   - Esto mezclaria una tabla legacy/preexistente con el modelo rector nuevo.
   - Puede arrastrar supuestos inmobiliarios y romper el principio multiindustria de PD-0003.

2. Riesgo de convertir `property_models` en `product_models` sin decision formal.
   - El nombre sugiere modelo inmobiliario previo, no modelo comercial multiindustria rector.

3. Riesgo de que tablas de reservas gobiernen inventario.
   - `reservations`, `reservation_selection_events`, `reservation_cta_actions` y `reservation_app_sessions` deben tratarse como actividad operacional consumidora, no como Fuente Comercial.

4. Riesgo de mezclar evidencias con dominios canonicos.
   - `technical_evidence_logs`, `operational_events` y `operational_records` pueden respaldar o narrar hechos, pero no sustituir inventario, catalogo, reservas, pagos o documentos.

5. Riesgo de contaminacion entre modelo rector nuevo y tablas operacionales existentes.
   - Muchas tablas actuales tienen RLS y triggers, lo que sugiere uso o configuracion operacional previa.
   - No deben alterarse sin inventario profundo de columnas, relaciones, policies, triggers y consumidores.

6. Riesgo de sobreadaptar Bloque 3 al sector inmobiliario.
   - Tablas como `property_inventory`, `property_models`, `construction_updates` y `unit_construction_updates` pueden ser utiles como evidencia futura, pero no deben definir la arquitectura universal.

7. Riesgo de asumir que RLS activo equivale a vigencia funcional.
   - RLS y triggers son senales de posible uso, no prueba suficiente de uso vigente.

## Reglas de gobierno

1. Las tablas rectoras nuevas del Plan Maestro SQL son:
   - `organizations`;
   - `projects`;
   - `project_branding`;
   - `project_assets`.

2. Las tablas rectoras nuevas no deben mezclarse automaticamente con tablas legacy/preexistentes.

3. `property_inventory` y `property_models` quedan clasificadas como legacy/preexistentes candidatas hasta auditoria mas profunda.

4. `property_inventory` no debe usarse como base de `project_inventory` sin decision humana formal.

5. `property_models` no debe usarse como base de `product_models` sin decision humana formal.

6. Bloque 3 debe disenar `project_inventory` desde PD-0002 y PD-0003, no desde tablas legacy.

7. Reservas consume catalogo e inventario; no gobierna Fuente Comercial, disponibilidad ni precio maestro.

8. Operational records, events y technical evidence pueden actuar como bitacora/evidencia, pero no como dominios canonicos sustitutos.

9. Ninguna tabla con RLS, triggers o posible dependencia operacional debe modificarse, migrarse, fusionarse o eliminarse sin inventario tecnico especifico.

10. Toda tabla desconocida o no certificada debe conservarse hasta clasificacion posterior.

## Recomendaciones

1. Aprobar esta matriz como Bloque 0 de gobernanza Supabase antes del Bloque 3.

2. Mantener Bloque 3 detenido hasta decision humana sobre esta auditoria.

3. Disenar Bloque 3 solo como `project_inventory` rector nuevo, dependiente de `projects`, sin usar `property_inventory` ni `property_models` como plantilla directa.

4. Tratar `property_inventory`, `property_models` e `inventory_import_batches` como fuentes legacy potenciales para una migracion futura, no para diseno rector inicial.

5. En una fase posterior, ejecutar auditoria de columnas, constraints, FKs, policies, triggers, volumen y consumidores para las tablas operacionales y legacy.

6. No eliminar ninguna tabla del esquema `public` en esta etapa.

7. No modificar RLS, triggers, policies, indices ni datos existentes durante el diseno del Bloque 3.

8. Si en el futuro se requiere migracion desde legacy hacia el modelo rector, preparar un plan separado con respaldo, mapeo, validacion humana y rollback.

## Punto de partida para continuar AMENA 72

El punto de partida queda detenido en:

```text
Revision humana del borrador SUPABASE-0007 antes de continuar con el diseno SQL revisable del Bloque 3 project_inventory.
```

Despues de aprobacion humana, AMENA 72 podra continuar con el diseno SQL revisable del Bloque 3 usando como fuentes oficiales:

- PD-0002;
- PD-0003;
- SUPABASE-0007 aprobado;
- SQL ejecutado del Bloque 1;
- SQL ejecutado del Bloque 2;
- PERSISTENCIA-0001;
- ACO-0001 a ACO-0006;
- SUPABASE-0001 a SUPABASE-0006.

No se debe ejecutar SQL ni tocar Supabase antes de una aprobacion humana posterior y explicita.

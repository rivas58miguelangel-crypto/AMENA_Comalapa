# SUPABASE-RUTA2-0001 - Auditoria Preintegracion Bloques 01 a 05

Fecha de auditoria documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Rama certificada al inicio: `centro-mando-admin10`.

Estado: auditoria documental de preintegracion. No constituye implementacion, consulta directa certificada a Supabase, SQL ejecutable, migracion ni autorizacion para tocar Supabase, Ruta 2 o Reservas tradicional.

## 1. Proposito del documento

Definir la auditoria de preintegracion necesaria antes de conectar la App Publica de Reservas Ruta 2 con los Bloques Supabase 01 a 05.

El objetivo es separar tres planos que no deben confundirse:

- lo documentado y gobernado en Admin;
- lo que puede existir o no existir realmente en Supabase en este momento;
- lo que una aplicacion consume funcionalmente desde codigo.

Esta auditoria prepara la decision sobre si Ruta 2 puede avanzar hacia una implementacion faseada o si primero debe verificarse/poblarse Supabase.

## 2. Contexto

Ruta 2 es prioridad comercial inmediata porque permite presentar una demo generica/manual a prospectos sin depender de AMENA original.

Ruta 2 aun no consume funcionalmente Bloques Supabase 01 a 05.

Ruta 2 tiene Supabase parcial solo para eventos/trazabilidad, principalmente mediante:

- `reservation_app_sessions`;
- `reservation_selection_events`;
- `technical_evidence_logs`.

Antes de implementar una integracion Ruta 2 -> Supabase, hay que verificar el estado real de Supabase.

Reglas de interpretacion:

- Documentado no equivale a ejecutado.
- Ejecutado en Supabase no equivale a consumido por app.
- Cliente Supabase configurado no equivale a Catalogo Comercial Parametrizable conectado.
- Solo el consumo funcional desde codigo permite decir que un bloque esta aplicado en una app.

## 3. Base documental revisada

Se revisaron localmente, sin modificarlos:

- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-01-nucleo-institucional.sql`;
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-02-identidad-proyecto.sql`;
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-03-project-inventory.sql`;
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-04-project-catalog.sql.md`;
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-05-project-commercial-types.sql.md`;
- `docs/knowledge-base/98_Work_In_Progress/RUTA2-SUPABASE-0003-plan-implementacion-faseada.md`;
- `docs/knowledge-base/98_Work_In_Progress/RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md`.

Estado documental certificado por esos archivos:

- Bloque 01 reporta creacion manual de `public.organizations` y `public.projects`.
- Bloque 02 reporta creacion manual de `public.project_branding` y `public.project_assets`.
- Bloque 03 reporta creacion manual de `public.project_inventory`.
- Bloque 04 reporta creacion manual de `public.project_catalog` y FK compuesta desde `project_inventory`.
- Bloque 05 reporta creacion manual de `public.project_commercial_types` subordinada a `project_catalog`.
- Ruta 2 no consume aun esas tablas.

Esta revision local no reemplaza una verificacion directa actual en Supabase.

## 4. Tablas esperadas segun Bloques 01 a 05

Tablas esperadas:

- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`;
- `project_inventory`;
- `project_catalog`;
- `project_commercial_types`.

Relaciones rectoras esperadas:

- `projects.organization_id` -> `organizations.id`.
- `project_branding.project_id` -> `projects.id`.
- `project_assets.project_id` -> `projects.id`.
- `project_inventory.project_id` -> `projects.id`.
- `project_catalog.project_id` -> `projects.id`.
- `project_inventory(project_id, project_catalog_id)` -> `project_catalog(project_id, id)`.
- `project_commercial_types(project_id, project_catalog_id)` -> `project_catalog(project_id, id)`.

Estados y campos conceptuales importantes:

- origen del dato mediante `data_origin`;
- ambiente mediante `operational_environment`;
- estado legacy mediante `legacy_status`;
- estados operativos como `catalog_status`, `type_status`, `inventory_status`, `asset_status` o `branding_status`;
- visibilidad publica mediante `public_visibility`;
- metadatos auxiliares gobernados, no como sustituto del modelo normalizado.

## 5. Requisitos minimos para iniciar integracion Ruta 2

Antes de iniciar implementacion en Ruta 2 deberia verificarse:

- existencia real de las tablas esperadas;
- relaciones y constraints coherentes;
- datos base suficientes;
- al menos una `organization` identificable;
- al menos un `project` identificable;
- identidad visual o branding asociado al proyecto;
- assets publicos o de preview suficientes;
- catalogo activo o validado;
- tipos comerciales activos o validados;
- inventario comercial base utilizable;
- proyecto demo o cliente objetivo claramente identificable;
- politicas/RLS compatibles con lectura desde app publica o via capa segura;
- criterio de fallback para no romper la demo si Supabase no responde;
- separacion clara entre trazabilidad de eventos y catalogo comercial.

## 6. Resultado de verificacion directa

Resultado: pendiente de verificacion directa en Supabase.

Motivo:

- En el repositorio Admin no se encontro `.env` ni `.env.local`.
- Solo existe `.env.example` con variables vacias.
- No se encontro `supabase.toml`.
- No se encontro script local seguro de auditoria de solo lectura.
- No se encontro herramienta ya configurada para consultar Supabase sin exponer secretos.
- No se debe improvisar conexion, imprimir secretos ni usar credenciales no gobernadas.

Por esas razones, esta auditoria queda como auditoria documental de preintegracion, pendiente de verificacion directa segura en Supabase.

## 7. Matriz de verificacion pendiente

| Tabla | Esperada por | Existe en Supabase | Conteo disponible | Observaciones | Riesgo |
| --- | --- | --- | --- | --- | --- |
| `organizations` | Bloque 01 | Pendiente de verificacion directa | Pendiente | Debe existir como raiz institucional. | Sin organization no hay contexto rector para proyecto. |
| `projects` | Bloque 01 | Pendiente de verificacion directa | Pendiente | Debe depender de `organizations`. | Sin project no hay contexto para branding, catalogo ni inventario. |
| `project_branding` | Bloque 02 | Pendiente de verificacion directa | Pendiente | Debe existir como identidad visual por proyecto. | Ruta 2 seguiria usando branding hardcoded. |
| `project_assets` | Bloque 02 | Pendiente de verificacion directa | Pendiente | Debe contener assets gobernados del proyecto. | Ruta 2 seguiria usando imagenes locales/remotas hardcoded. |
| `project_inventory` | Bloque 03 | Pendiente de verificacion directa | Pendiente | Debe contener inventario comercial base. | Ruta 2 no podria reemplazar `inventoryService.ts`. |
| `project_catalog` | Bloque 04 | Pendiente de verificacion directa | Pendiente | Debe actuar como dominio rector del catalogo. | No habria raiz comercial gobernada para Ruta 2. |
| `project_commercial_types` | Bloque 05 | Pendiente de verificacion directa | Pendiente | Debe estar subordinada a `project_catalog`. | No se podrian reemplazar tipos hardcoded como `casas` y `apartamentos`. |

## 8. Datos minimos pendientes de verificar

Debe verificarse directamente en Supabase si existen:

- al menos una organizacion valida;
- al menos un proyecto demo o cliente objetivo;
- branding asociado al proyecto;
- assets publicos o de preview para la experiencia publica;
- catalogo comercial activo, validado o al menos revisable;
- tipos comerciales activos o validados;
- inventario base con visibilidad y modo de seleccion compatibles;
- consistencia entre `project_id`, `project_catalog_id` e inventario;
- datos suficientes para no degradar la experiencia comercial de Ruta 2.

Tambien debe verificarse si las reglas de acceso permiten lectura segura:

- directamente desde app publica con permisos apropiados;
- o mediante una capa segura posterior;
- o mediante Edge Function/servicio intermedio si corresponde.

## 9. Brechas detectadas o pendientes

Brechas confirmadas documentalmente:

- Ruta 2 no consume Bloques 01 a 05.
- Reservas tradicional tampoco consume Bloques 01 a 05.
- Los datos comerciales visibles de Ruta 2 siguen saliendo principalmente de `src/constants.ts` y `src/services/inventoryService.ts`.
- La trazabilidad Supabase existente no equivale a catalogo funcional.

Brechas pendientes de verificacion directa:

- existencia actual real de las siete tablas esperadas;
- conteos por tabla;
- existencia de datos base suficientes;
- proyecto demo o cliente objetivo identificable;
- relacion efectiva entre catalogo, tipos e inventario;
- estado de RLS/policies o mecanismo seguro de lectura;
- compatibilidad de datos con la experiencia visual actual de Ruta 2.

## 10. Riesgos para integrar Ruta 2 sin esta verificacion

Riesgos principales:

1. Conectar contra tablas incompletas o inexistentes.
2. Fallar en demo local por falta de datos base.
3. Romper experiencia comercial antes de vender.
4. Exponer datos indebidamente si las politicas de lectura no estan claras.
5. Confundir trazabilidad existente con catalogo funcional.
6. Diseñar servicios contra una estructura no certificada.
7. Mantener doble fuente de verdad entre Supabase y datos hardcoded.
8. Avanzar a Bloque 6 sin catalogo, tipos e inventario funcionales.
9. Usar datos demo como si fueran datos productivos.
10. Perder velocidad comercial por una integracion prematura.

## 11. Recomendacion

No conviene iniciar implementacion funcional de Ruta 2 contra Bloques 01 a 05 sin una verificacion directa segura de Supabase.

Recomendacion operativa:

1. Revisar y commitear esta auditoria si queda aprobada.
2. Crear o autorizar un checklist manual de verificacion en Supabase.
3. Confirmar existencia, conteos y datos minimos de las siete tablas esperadas.
4. Confirmar si hay datos demo suficientes para Ruta 2.
5. Confirmar estrategia de lectura publica o capa segura.
6. Solo despues decidir si se inicia implementacion Fase 1 de Ruta 2.

Si la verificacion manual demuestra que faltan datos, primero deberia prepararse un plan de poblado/validacion revisable. Ese plan deberia ser documental y aprobado antes de cualquier SQL o modificacion en Supabase.

## 12. Proximo paso recomendado

Revisar esta auditoria.

Si queda aprobada, commitearla como documento rector de preintegracion.

Despues decidir una de estas rutas:

- realizar verificacion manual directa en Supabase con checklist controlado;
- preparar un mecanismo seguro de auditoria de solo lectura;
- poblar o validar datos base mediante documento revisable previo;
- iniciar implementacion Fase 1 solo si Supabase queda certificado como suficiente.

Regla final:

```text
Antes de tocar codigo de Ruta 2, debe quedar claro si Supabase tiene tablas, relaciones y datos base suficientes para sostener la integracion.
```

# SUPABASE-RUTA2-0005 - SQL Revisable de Poblacion Minima Bloques 01 a 05

Fecha de diseno documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## ADVERTENCIA PRINCIPAL

Este documento contiene SQL revisable dentro de Markdown.

No fue ejecutado.

No constituye migracion ejecutable.

No autoriza tocar Supabase.

No autoriza insertar, actualizar ni borrar datos.

No autoriza modificar Ruta 2 Reservas.

No autoriza modificar Reservas tradicional.

No autoriza modificar codigo.

Su unico objetivo es dejar una propuesta tecnica revisable para una futura poblacion minima demo/generica de Bloques Supabase 01 a 05, sujeta a validacion humana posterior y a verificacion de columnas reales en Supabase antes de cualquier ejecucion.

## 1. Proposito y alcance

Preparar SQL revisable para poblar de forma minima, controlada y demo/generica las tablas esperadas por los Bloques Supabase 01 a 05:

- `public.organizations`
- `public.projects`
- `public.project_branding`
- `public.project_assets`
- `public.project_catalog`
- `public.project_commercial_types`
- `public.project_inventory`

El proposito operativo es habilitar, en una fase futura, condiciones minimas para evaluar integracion Ruta 2 -> Bloques Supabase sin conectar la app contra tablas vacias.

Este documento no implementa la integracion. Solo prepara una propuesta de datos base.

## 2. Estado certificado de partida

Segun la reconstruccion certificada de AMENA 76:

- Admin / repositorio rector esta sincronizado en `centro-mando-admin10`.
- HEAD y `origin/centro-mando-admin10` quedaron alineados en `d1b9163d36009afa9c8f59b693ec3bb419af8a12`.
- Ultimo commit publicado: `d1b9163 docs: add transition document for Codex AMENA 75`.
- Working tree previo a FASE 2: limpio.

Segun evidencia humana registrada en `SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`:

- Las tablas esperadas de Bloques 01 a 05 aparentemente existen en Supabase.
- Miguel confirmo visualmente que ninguna de las tablas revisadas tiene datos.
- No se ejecuto SQL.
- No se copiaron secretos.
- No se modifico Supabase.

Estado operativo:

```text
Tablas esperadas: aparentemente existentes.
Datos base: ausentes.
Ruta 2 lista para integracion funcional: no.
Accion permitida en este documento: diseno SQL revisable, sin ejecucion.
```

## 3. Fuentes rectoras utilizadas

Este documento se basa en:

- `SUPABASE-RUTA2-0004-diseno-poblacion-minima-bloques-01-05.md`
- `SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`
- `SUPABASE-RUTA2-0002-checklist-manual-verificacion-bloques-01-05.md`
- `SUPABASE-RUTA2-0001-auditoria-preintegracion-bloques-01-05.md`
- `RUTA2-SUPABASE-0003-plan-implementacion-faseada.md`
- `RUTA2-SUPABASE-0002-mapa-conversion-funcional.md`
- `RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md`
- `RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md`
- `RUTA2-PRODUCCION-0001-genesis-version-productiva.md`

Rutas rectoras de Bloques 01 a 05 localizadas durante reconstruccion:

- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-01-nucleo-institucional.sql`
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-02-identidad-proyecto.sql`
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-03-project-inventory.sql`
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-04-project-catalog.sql.md`
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-05-project-commercial-types.sql.md`

## 4. Reglas conceptuales obligatorias

Reglas que gobiernan este documento:

1. Documentado en Admin no significa aplicado funcionalmente en una app.
2. Tabla existente o ejecutada en Supabase no significa tabla poblada.
3. Tabla poblada no significa consumida funcionalmente por Ruta 2.
4. Solo consumo real en codigo permite decir que un bloque esta aplicado funcionalmente en una app.

Consecuencia:

```text
Este SQL revisable, aun si se aprobara y ejecutara en el futuro, no significaria que Ruta 2 ya consume Bloques 01 a 05.
La aplicacion funcional solo podria declararse cuando el codigo de Ruta 2 lea, interprete y use esas tablas.
```

## 5. Principios de poblacion minima

La poblacion propuesta debe ser:

- minima;
- demo/generica;
- controlada;
- no sensible;
- no vinculada a clientes reales;
- no amarrada a AMENA original;
- compatible con los constraints documentados;
- separada de produccion real;
- suficiente para evaluar una futura integracion Ruta 2 sin romper la demo manual actual.

Valores rectores propuestos:

```text
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
public_visibility: preview
```

## 6. Validaciones obligatorias antes de cualquier ejecucion futura

Antes de ejecutar cualquier SQL derivado de este documento, una persona autorizada debe verificar en Supabase:

- que todas las tablas existen;
- columnas exactas de cada tabla;
- tipos de datos reales;
- constraints vigentes;
- foreign keys vigentes;
- indices o unique constraints disponibles;
- estado de RLS/policies;
- si `project_inventory_project_catalog_fk` existe realmente;
- si `project_commercial_types_catalog_fk` existe realmente;
- si `gen_random_uuid()` esta disponible;
- si los valores `fase_04_demo`, `demo`, `none`, `preview`, `validated`, `active`, `reference_only` y `not_applicable` siguen permitidos;
- si se requiere ejecutar dentro de transaccion controlada;
- plan de rollback o limpieza;
- estrategia de idempotencia;
- autorizacion humana explicita de ejecucion.

## 7. SQL revisable propuesto

El siguiente bloque es SQL revisable. No debe copiarse ni ejecutarse sin aprobacion humana posterior.

```sql
-- ============================================================
-- SUPABASE-RUTA2-0005
-- SQL REVISABLE - NO EJECUTAR SIN APROBACION HUMANA POSTERIOR
--
-- Objetivo:
-- Poblar datos minimos demo/genericos para Bloques 01 a 05:
-- organizations, projects, project_branding, project_assets,
-- project_catalog, project_commercial_types y project_inventory.
--
-- Restricciones:
-- - No usar datos reales de clientes.
-- - No usar datos sensibles.
-- - No crear reservas.
-- - No crear precios reales.
-- - No crear disponibilidad real.
-- - No crear atributos de Bloque 6.
-- - No modificar Ruta 2.
-- - No asumir que este SQL implica consumo funcional por la app.
--
-- Antes de ejecutar:
-- - Verificar columnas reales.
-- - Verificar constraints reales.
-- - Verificar foreign keys reales.
-- - Verificar RLS/policies.
-- - Verificar estrategia de rollback/limpieza.
-- - Obtener aprobacion humana explicita.
-- ============================================================

with
params as (
  select
    'Operador Demo Ruta 2'::text as organization_name,
    'Operador Demo Ruta 2 S.A. de C.V. (generico)'::text as organization_legal_name,
    'RUTA2-DEMO'::text as organization_short_name,
    'Distrito Demo Ruta 2'::text as project_name,
    'ruta2-demo'::text as project_code,
    'Catalogo Demo Ruta 2'::text as catalog_name,
    'catalogo-ruta2-demo'::text as catalog_code
),

-- ------------------------------------------------------------
-- Bloque 01: organizations
-- Crea una organizacion demo/generica si no existe por short_name.
-- Nota: organizations no tiene unique constraint documentado sobre short_name.
-- La condicion WHERE NOT EXISTS debe revisarse antes de ejecucion real.
-- ------------------------------------------------------------
organization_insert as (
  insert into public.organizations (
    name,
    legal_name,
    short_name,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    p.organization_name,
    p.organization_legal_name,
    p.organization_short_name,
    'fase_04_demo',
    'demo',
    'none',
    'Registro demo/generico para validar poblacion minima futura de Ruta 2.'
  from params p
  where not exists (
    select 1
    from public.organizations o
    where o.short_name = p.organization_short_name
  )
  returning id
),
organization_ref as (
  select id from organization_insert
  union all
  select o.id
  from public.organizations o
  join params p on p.organization_short_name = o.short_name
  limit 1
),

-- ------------------------------------------------------------
-- Bloque 01: projects
-- Crea un proyecto demo/generico subordinado a la organizacion demo.
-- Nota: projects no tiene unique constraint documentado sobre code.
-- ------------------------------------------------------------
project_insert as (
  insert into public.projects (
    organization_id,
    name,
    code,
    description,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    o.id,
    p.project_name,
    p.project_code,
    'Proyecto demo generico para preparar futura integracion Ruta 2 sin datos reales de cliente.',
    'fase_04_demo',
    'demo',
    'none',
    'Proyecto demo minimo para validar Bloques 01 a 05 antes de tocar Ruta 2.'
  from organization_ref o
  cross join params p
  where not exists (
    select 1
    from public.projects pr
    where pr.code = p.project_code
      and pr.organization_id = o.id
  )
  returning id
),
project_ref as (
  select id from project_insert
  union all
  select pr.id
  from public.projects pr
  join organization_ref o on o.id = pr.organization_id
  join params p on p.project_code = pr.code
  limit 1
),

-- ------------------------------------------------------------
-- Bloque 02: project_branding
-- Crea identidad visual minima, generica y revisable.
-- Usa unique documentado: project_branding_project_id_unique.
-- ------------------------------------------------------------
branding_insert as (
  insert into public.project_branding (
    project_id,
    brand_name,
    public_project_name,
    tagline,
    short_description,
    primary_color,
    secondary_color,
    accent_color,
    background_color,
    text_color,
    branding_status,
    public_visibility,
    theme_tokens,
    public_copy,
    navigation_config,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    p.id,
    'Ruta 2 Demo',
    'Distrito Demo',
    'Vive tu proxima etapa',
    'Experiencia demo generica para exploracion comercial.',
    '#1E5D8C',
    '#8B847E',
    '#D0833B',
    '#F2F2EB',
    '#1F2933',
    'validated',
    'preview',
    '{"source":"SUPABASE-RUTA2-0005","mode":"demo_minimal"}'::jsonb,
    '{"headline":"Distrito Demo","subheadline":"Experiencia comercial generica para nuevos prospectos."}'::jsonb,
    '{"primaryFlow":"reservas_demo_manual","notes":"No reemplaza aun la navegacion de Ruta 2."}'::jsonb,
    'fase_04_demo',
    'demo',
    'none',
    'Branding demo minimo para futura lectura gobernada por Ruta 2.'
  from project_ref p
  on conflict (project_id) do nothing
  returning id
),

-- ------------------------------------------------------------
-- Bloque 02: project_assets
-- Crea assets placeholder, no imagenes reales de cliente.
-- Usa URLs de example.invalid como referencias no productivas.
-- ------------------------------------------------------------
asset_hero_insert as (
  insert into public.project_assets (
    project_id,
    asset_type,
    asset_purpose,
    asset_context,
    title,
    description,
    alt_text,
    storage_provider,
    asset_reference,
    thumbnail_reference,
    sort_order,
    is_primary,
    is_public,
    asset_status,
    metadata,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    p.id,
    'hero_image',
    'public_experience',
    'public_reservations',
    'Hero demo Ruta 2',
    'Referencia placeholder para experiencia publica demo.',
    'Imagen placeholder generica para Ruta 2 demo.',
    'external_url',
    'https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg',
    null,
    0,
    true,
    true,
    'validated',
    '{"placeholder":true,"source":"SUPABASE-RUTA2-0005"}'::jsonb,
    'fase_04_demo',
    'demo',
    'none',
    'No es asset real de cliente. Debe reemplazarse por asset autorizado antes de produccion.'
  from project_ref p
  where not exists (
    select 1
    from public.project_assets a
    where a.project_id = p.id
      and a.asset_type = 'hero_image'
      and a.asset_reference = 'https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg'
  )
  returning id
),

-- ------------------------------------------------------------
-- Bloque 04: project_catalog
-- Crea catalogo rector demo/generico.
-- Usa unique documentado: (project_id, catalog_code).
-- ------------------------------------------------------------
catalog_insert as (
  insert into public.project_catalog (
    project_id,
    catalog_code,
    catalog_name,
    catalog_description,
    catalog_status,
    public_visibility,
    catalog_mode,
    catalog_scope,
    configuration,
    metadata,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    p.id,
    params.catalog_code,
    params.catalog_name,
    'Catalogo demo/generico para preparar futura integracion Ruta 2.',
    'validated',
    'preview',
    'standard',
    'commercial',
    '{"route2Integration":"future","phase":"minimal_seed_review"}'::jsonb,
    '{"source":"SUPABASE-RUTA2-0005","demo":true}'::jsonb,
    'fase_04_demo',
    'demo',
    'none',
    'Catalogo minimo. No contiene precios reales, disponibilidad real ni reservas.'
  from project_ref p
  cross join params
  on conflict (project_id, catalog_code) do nothing
  returning id, project_id
),
catalog_ref as (
  select id, project_id from catalog_insert
  union all
  select pc.id, pc.project_id
  from public.project_catalog pc
  join project_ref p on p.id = pc.project_id
  join params on params.catalog_code = pc.catalog_code
  limit 1
),

-- ------------------------------------------------------------
-- Bloque 05: project_commercial_types
-- Crea tipos comerciales minimos y multiindustria.
-- No crea atributos de Bloque 6.
-- Usa unique documentado: (project_catalog_id, type_code).
-- ------------------------------------------------------------
commercial_types_seed as (
  select *
  from (
    values
      ('residencia-demo', 'Residencia demo', 'Tipo comercial demo para oferta inmobiliaria generica.', 'real_estate', 10),
      ('servicio-demo', 'Servicio demo', 'Tipo comercial demo para servicios configurables.', 'service', 20),
      ('curso-demo', 'Curso demo', 'Tipo comercial demo para educacion/capacitacion.', 'course', 30)
  ) as v(type_code, type_name, type_description, commercial_domain, sort_order)
),
commercial_types_insert as (
  insert into public.project_commercial_types (
    project_id,
    project_catalog_id,
    type_code,
    type_name,
    type_description,
    commercial_domain,
    type_status,
    public_visibility,
    sort_order,
    metadata,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    c.project_id,
    c.id,
    s.type_code,
    s.type_name,
    s.type_description,
    s.commercial_domain,
    'validated',
    'preview',
    s.sort_order,
    jsonb_build_object(
      'source', 'SUPABASE-RUTA2-0005',
      'demo', true,
      'block6AttributesIncluded', false
    ),
    'fase_04_demo',
    'demo',
    'none',
    'Tipo comercial demo minimo. No define atributos de Bloque 6.'
  from catalog_ref c
  cross join commercial_types_seed s
  on conflict (project_catalog_id, type_code) do nothing
  returning id, project_id, project_catalog_id, type_code
),
commercial_types_ref as (
  select id, project_id, project_catalog_id, type_code
  from commercial_types_insert
  union all
  select pct.id, pct.project_id, pct.project_catalog_id, pct.type_code
  from public.project_commercial_types pct
  join catalog_ref c on c.id = pct.project_catalog_id
  where pct.type_code in ('residencia-demo', 'servicio-demo', 'curso-demo')
),

-- ------------------------------------------------------------
-- Bloque 03: project_inventory
-- Crea inventario base demo en modo referencia.
-- No crea precios reales ni disponibilidad real.
-- No asume commercial_type_id, porque Bloque 05 no modifico project_inventory.
-- La relacion con tipo comercial queda en metadata gobernada como referencia
-- transitoria hasta que un bloque posterior defina la relacion fisica.
-- Usa unique documentado: (project_id, inventory_code).
-- ------------------------------------------------------------
inventory_seed as (
  select *
  from (
    values
      (
        'INV-RUTA2-RES-001',
        'Residencia demo A',
        'unit',
        'residencia-demo',
        'Unidad demo generica para validar catalogo e inventario base.',
        'Zona demo 1',
        10
      ),
      (
        'INV-RUTA2-RES-002',
        'Residencia demo B',
        'unit',
        'residencia-demo',
        'Segunda unidad demo generica sin precio ni disponibilidad real.',
        'Zona demo 1',
        20
      ),
      (
        'INV-RUTA2-SRV-001',
        'Servicio demo inicial',
        'service',
        'servicio-demo',
        'Servicio demo para probar oferta no inmobiliaria.',
        'Atencion demo',
        30
      ),
      (
        'INV-RUTA2-CUR-001',
        'Curso demo inicial',
        'course',
        'curso-demo',
        'Curso demo para validar multiindustria sin modelo avanzado.',
        'Modalidad demo',
        40
      )
  ) as v(
    inventory_code,
    inventory_name,
    inventory_type,
    commercial_type_code,
    short_description,
    location_label,
    sort_order
  )
),
inventory_insert as (
  insert into public.project_inventory (
    project_id,
    project_catalog_id,
    inventory_code,
    inventory_name,
    inventory_type,
    commercial_category,
    short_description,
    location_label,
    inventory_status,
    commercial_status,
    public_visibility,
    selection_mode,
    attributes,
    metadata,
    data_origin,
    operational_environment,
    legacy_status,
    notes
  )
  select
    c.project_id,
    c.id,
    s.inventory_code,
    s.inventory_name,
    s.inventory_type,
    s.commercial_type_code,
    s.short_description,
    s.location_label,
    'validated',
    'not_applicable',
    'preview',
    'reference_only',
    '{}'::jsonb,
    jsonb_build_object(
      'source', 'SUPABASE-RUTA2-0005',
      'demo', true,
      'commercial_type_code', s.commercial_type_code,
      'sort_order', s.sort_order,
      'real_price_included', false,
      'real_availability_included', false,
      'block6_attributes_included', false
    ),
    'fase_04_demo',
    'demo',
    'none',
    'Inventario demo minimo para futura integracion Ruta 2. No contiene precio real, disponibilidad real ni reserva real.'
  from catalog_ref c
  cross join inventory_seed s
  on conflict (project_id, inventory_code) do nothing
  returning id
)

select
  (select count(*) from organization_ref) as organizations_ready,
  (select count(*) from project_ref) as projects_ready,
  (select count(*) from branding_insert) as branding_inserted_if_absent,
  (select count(*) from asset_hero_insert) as assets_inserted_if_absent,
  (select count(*) from catalog_ref) as catalog_ready,
  (select count(*) from commercial_types_ref) as commercial_types_ready,
  (select count(*) from inventory_insert) as inventory_inserted_if_absent;
```

## 8. Comentarios de revision sobre el SQL

El SQL fue escrito como propuesta idempotente inicial, usando:

- `where not exists` para tablas sin unique constraint documentado en los campos de busqueda;
- `on conflict do nothing` cuando existe unique constraint documentado;
- CTEs para preservar orden de dependencias;
- referencias demo/genericas;
- `metadata` solo como informacion auxiliar gobernada, no como sustituto permanente del modelo normalizado.

Puntos que requieren especial revision humana:

1. `organizations.short_name` no tiene unique constraint documentado. La deteccion de duplicados por `short_name = 'RUTA2-DEMO'` debe validarse.
2. `projects.code` no tiene unique constraint documentado. La deteccion de duplicados por `code = 'ruta2-demo'` debe validarse.
3. El uso de `on conflict (project_id)` en `project_branding` depende del constraint `project_branding_project_id_unique`.
4. El uso de `on conflict (project_id, catalog_code)` depende del constraint `project_catalog_project_code_unique`.
5. El uso de `on conflict (project_catalog_id, type_code)` depende del constraint `project_commercial_types_catalog_code_unique`.
6. El uso de `on conflict (project_id, inventory_code)` depende del constraint `project_inventory_project_code_unique`.
7. El uso de `project_inventory.project_catalog_id` depende de que la relacion agregada por Bloque 04 exista realmente y sea compatible.
8. El SQL no usa `commercial_type_id` en `project_inventory` porque Bloque 05 no modifico fisicamente esa tabla.
9. `commercial_type_code` dentro de `metadata` es una referencia auxiliar y transitoria; no debe convertirse en fuente final de verdad.

## 9. Exclusiones explicitas

Este documento excluye:

- aplicacion funcional de Bloque 6;
- creacion de `project_commercial_type_attributes`;
- integracion de Ruta 2;
- conexion de apps;
- modificacion de `src/constants.ts`;
- modificacion de `src/services/inventoryService.ts`;
- modificacion de `src/services/supabaseClient.ts`;
- modificacion de Reservas tradicional;
- datos reales de clientes;
- informacion sensible;
- reservas reales;
- disponibilidad real;
- precios reales productivos;
- pagos;
- modelos/familias avanzadas;
- variantes comerciales;
- unidades productivas especificas;
- migraciones ejecutables.

## 10. Checklist de revision humana previa a cualquier ejecucion futura

Antes de ejecutar cualquier version derivada de este SQL, revisar:

- [ ] Se confirmo que las tablas existen en Supabase.
- [ ] Se confirmaron columnas exactas.
- [ ] Se confirmaron constraints y unique constraints.
- [ ] Se confirmaron foreign keys.
- [ ] Se confirmo el estado real de RLS/policies.
- [ ] Se confirmo que no hay datos previos que puedan duplicarse.
- [ ] Se confirmo que el dataset demo no usa datos reales de clientes.
- [ ] Se confirmo que no se usa identidad de AMENA original como cliente real.
- [ ] Se confirmo que no hay precios reales.
- [ ] Se confirmo que no hay disponibilidad real.
- [ ] Se confirmo que no se crean reservas.
- [ ] Se confirmo que no se toca Ruta 2.
- [ ] Se confirmo que no se toca Reservas tradicional.
- [ ] Se definio plan de rollback o limpieza.
- [ ] Se definio si el SQL debe ejecutarse dentro de transaccion.
- [ ] Se obtuvo aprobacion humana explicita para ejecucion.

## 11. Confirmacion final

Este documento no ejecuta nada por si mismo.

El SQL incluido es texto revisable dentro de Markdown.

No se toco Supabase.

No se ejecuto SQL.

No se insertaron, actualizaron ni borraron datos.

No se modifico Ruta 2.

No se modifico Reservas tradicional.

No se modifico codigo.

No se creo migracion ejecutable.

No se hizo `git add`.

No se hizo commit.

No se hizo push.

El siguiente paso recomendado es revision humana integral del documento antes de decidir cualquier `git add`, commit, push o preparacion de ejecucion futura.

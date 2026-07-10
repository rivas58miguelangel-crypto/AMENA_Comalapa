# SUPABASE-RUTA2-0015 - Paquete Dry-Run Ajustado con Rollback Obligatorio Seed Bloques 01 a 05

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia Principal

Este documento es Markdown revisable.

No ejecutar todavia.

No copiar a Supabase sin autorizacion humana posterior.

Es un dry-run documental.

Incluye `ROLLBACK` obligatorio.

No incluye `COMMIT` operativo.

Si ocurre cualquier error dentro de la transaccion y el script se detiene antes del `ROLLBACK` final, Miguel debe ejecutar `ROLLBACK` manualmente antes de cualquier otra accion.

No toca Supabase.

No ejecuta SQL.

No inserta, actualiza ni borra datos en Supabase.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No crea migraciones ejecutables.

No crea archivo `.sql` ejecutable.

No crea constraints nuevos.

No avanza Bloque 6 funcionalmente.

## 1. Proposito

Crear una version ajustada de `SUPABASE-RUTA2-0013` que conserve el paquete dry-run con `ROLLBACK` obligatorio, pero corrija los dos ajustes requeridos en `SUPABASE-RUTA2-0014`:

1. Reenfocar las validaciones posteriores para que sean especificas del dataset Ruta 2 y no conteos amplios de todos los registros demo.
2. Agregar una regla humana explicita de emergencia para ejecutar `ROLLBACK` manual si Supabase detiene el script antes del `ROLLBACK` final.

Este documento no autoriza ejecucion.

Este documento no autoriza persistencia de datos.

## 2. Relacion con Documentos Previos

### SUPABASE-RUTA2-0013

Documento base del paquete dry-run con SQL real reforzado, sin placeholder, con `BEGIN` y `ROLLBACK` obligatorio.

`SUPABASE-RUTA2-0013` queda como antecedente tecnico valido, pero no debe ejecutarse todavia.

### SUPABASE-RUTA2-0014

Dictamen que detecto dos ajustes obligatorios antes de cualquier dry-run:

- validaciones posteriores demasiado amplias;
- falta de regla humana explicita de emergencia para `ROLLBACK` manual si el flujo se interrumpe.

Este documento incorpora ambos ajustes.

## 3. Prechecks Reforzados

Antes de cualquier prueba futura, una persona autorizada debera revisar los prechecks.

Los prechecks se enfocan en:

- `organizations.short_name = 'RUTA2-DEMO'`;
- `projects.code = 'ruta2-demo'` dentro de la organizacion demo;
- `project_assets` con `asset_type = 'hero_image'` e `is_primary = true` para el proyecto demo.

Reglas:

- si hay mas de una organizacion con `short_name = 'RUTA2-DEMO'`, abortar;
- si hay mas de un proyecto `code = 'ruta2-demo'` dentro de la organizacion demo, abortar;
- si ya existe un `hero_image` primario para el proyecto demo, no insertar otro;
- si hay duda humana, abortar;
- si aparece cualquier error SQL, abortar y aplicar la regla de emergencia.

## 4. Regla Humana de Emergencia

Esta regla debe ser leida antes de cualquier intento futuro.

Si ocurre cualquier error dentro de la transaccion y Supabase no llega al `ROLLBACK` final:

1. No ejecutar `COMMIT`.
2. No intentar corregir con modificaciones manuales.
3. No ejecutar comandos adicionales de escritura.
4. Ejecutar `ROLLBACK` manualmente antes de cualquier otra accion.
5. Capturar evidencia del error.
6. Detener la prueba.
7. Volver al analisis documental antes de cualquier nuevo intento.

Esta regla aplica tambien ante perdida de conexion, pantalla inesperada, resultado ambiguo, bloqueo del editor SQL o duda humana.

## 5. Paquete SQL Dry-Run Ajustado

El siguiente bloque es SQL revisable dentro de Markdown.

No debe ejecutarse todavia.

No debe copiarse a Supabase sin autorizacion humana posterior.

No contiene `COMMIT` operativo.

Termina con `ROLLBACK` obligatorio.

```sql
-- ============================================================
-- SUPABASE-RUTA2-0015
-- Paquete dry-run ajustado con rollback obligatorio.
-- Bloques cubiertos: 01 a 05.
-- Bloque 6 queda fuera de alcance.
--
-- ADVERTENCIA:
-- No ejecutar todavia.
-- No copiar a Supabase sin autorizacion humana posterior.
-- Si ocurre cualquier error antes del ROLLBACK final,
-- ejecutar ROLLBACK manualmente antes de cualquier otra accion.
-- No persistir datos.
-- ============================================================

-- ============================================================
-- 0. PRECHECKS DE LECTURA ESPECIFICOS DE RUTA 2
-- Revisar manualmente los resultados antes de continuar.
-- ============================================================

select
  'precheck_organizations_ruta2_demo' as check_name,
  count(*) as matching_rows,
  array_agg(id) as matching_ids
from public.organizations
where short_name = 'RUTA2-DEMO';

with organization_ref as (
  select id
  from public.organizations
  where short_name = 'RUTA2-DEMO'
)
select
  'precheck_projects_ruta2_demo' as check_name,
  count(*) as matching_rows,
  array_agg(p.id) as matching_ids
from public.projects p
join organization_ref o on o.id = p.organization_id
where p.code = 'ruta2-demo';

with
organization_ref as (
  select id
  from public.organizations
  where short_name = 'RUTA2-DEMO'
),
project_ref as (
  select p.id
  from public.projects p
  join organization_ref o on o.id = p.organization_id
  where p.code = 'ruta2-demo'
)
select
  'precheck_primary_hero_asset_ruta2_demo' as check_name,
  count(*) as matching_rows,
  array_agg(a.asset_reference) as matching_asset_references
from public.project_assets a
join project_ref p on p.id = a.project_id
where a.asset_type = 'hero_image'
  and a.is_primary = true;

-- ============================================================
-- 1. DRY-RUN TRANSACCIONAL
-- Iniciar solo si los prechecks fueron revisados y aceptados
-- humanamente.
-- ============================================================

BEGIN;

with
params as (
  select
    'Operador Demo Ruta 2'::text as organization_name,
    'Operador Demo Ruta 2 S.A. de C.V. (generico)'::text as organization_legal_name,
    'RUTA2-DEMO'::text as organization_short_name,
    'Distrito Demo Ruta 2'::text as project_name,
    'ruta2-demo'::text as project_code,
    'Catalogo Demo Ruta 2'::text as catalog_name,
    'catalogo-ruta2-demo'::text as catalog_code,
    'https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg'::text as hero_asset_reference
),

organization_candidates as (
  select o.id
  from public.organizations o
  join params p on p.organization_short_name = o.short_name
),
organization_guard as (
  select
    count(*) as organization_count,
    case when count(*) <= 1 then true else false end as can_continue
  from organization_candidates
),
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
  cross join organization_guard g
  where g.can_continue = true
    and g.organization_count = 0
  returning id
),
organization_ref as (
  select id from organization_insert
  union all
  select oc.id
  from organization_candidates oc
  cross join organization_guard g
  where g.can_continue = true
  limit 1
),

project_candidates as (
  select pr.id
  from public.projects pr
  join organization_ref o on o.id = pr.organization_id
  join params p on p.project_code = pr.code
),
project_guard as (
  select
    count(*) as project_count,
    case when count(*) <= 1 then true else false end as can_continue
  from project_candidates
),
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
  cross join project_guard g
  where g.can_continue = true
    and g.project_count = 0
  returning id
),
project_ref as (
  select id from project_insert
  union all
  select pc.id
  from project_candidates pc
  cross join project_guard g
  where g.can_continue = true
  limit 1
),

asset_guard as (
  select
    count(*) as primary_hero_assets_count,
    array_agg(a.asset_reference) as primary_hero_asset_references,
    case when count(*) = 0 then true else false end as can_insert_primary_hero
  from public.project_assets a
  join project_ref p on p.id = a.project_id
  where a.asset_type = 'hero_image'
    and a.is_primary = true
),

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
    '{"source":"SUPABASE-RUTA2-0015","mode":"dry_run_adjusted"}'::jsonb,
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
    params.hero_asset_reference,
    null,
    0,
    true,
    true,
    'validated',
    '{"placeholder":true,"source":"SUPABASE-RUTA2-0015","dry_run":true}'::jsonb,
    'fase_04_demo',
    'demo',
    'none',
    'No es asset real de cliente. Debe reemplazarse por asset autorizado antes de produccion.'
  from project_ref p
  cross join params
  cross join asset_guard g
  where g.can_insert_primary_hero = true
    and not exists (
      select 1
      from public.project_assets a
      where a.project_id = p.id
        and a.asset_type = 'hero_image'
        and a.asset_reference = params.hero_asset_reference
    )
  returning id
),

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
    '{"route2Integration":"future","phase":"dry_run_adjusted"}'::jsonb,
    '{"source":"SUPABASE-RUTA2-0015","demo":true,"dry_run":true}'::jsonb,
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
      'source', 'SUPABASE-RUTA2-0015',
      'demo', true,
      'dry_run', true,
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

inventory_seed as (
  select *
  from (
    values
      ('INV-RUTA2-RES-001', 'Residencia demo A', 'unit', 'residencia-demo', 'Unidad demo generica para validar catalogo e inventario base.', 'Zona demo 1', 10),
      ('INV-RUTA2-RES-002', 'Residencia demo B', 'unit', 'residencia-demo', 'Segunda unidad demo generica sin precio ni disponibilidad real.', 'Zona demo 1', 20),
      ('INV-RUTA2-SRV-001', 'Servicio demo inicial', 'service', 'servicio-demo', 'Servicio demo para probar oferta no inmobiliaria.', 'Atencion demo', 30),
      ('INV-RUTA2-CUR-001', 'Curso demo inicial', 'course', 'curso-demo', 'Curso demo para validar multiindustria sin modelo avanzado.', 'Modalidad demo', 40)
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
      'source', 'SUPABASE-RUTA2-0015',
      'demo', true,
      'dry_run', true,
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
  (select organization_count from organization_guard) as precheck_organizations_existing,
  (select can_continue from organization_guard) as precheck_organizations_can_continue,
  (select project_count from project_guard) as precheck_projects_existing,
  (select can_continue from project_guard) as precheck_projects_can_continue,
  (select primary_hero_assets_count from asset_guard) as precheck_primary_hero_assets_existing,
  (select can_insert_primary_hero from asset_guard) as precheck_asset_can_insert_primary_hero,
  (select count(*) from organization_ref) as organizations_ready,
  (select count(*) from project_ref) as projects_ready,
  (select count(*) from branding_insert) as branding_inserted_if_absent,
  (select count(*) from asset_hero_insert) as assets_inserted_if_absent,
  (select count(*) from catalog_ref) as catalog_ready,
  (select count(*) from commercial_types_ref) as commercial_types_ready,
  (select count(*) from inventory_insert) as inventory_inserted_if_absent;

-- ============================================================
-- 2. VALIDACIONES POSTERIORES AJUSTADAS
-- Estas validaciones se enfocan en el dataset Ruta 2.
-- No usar conteos amplios solo por data_origin, ambiente o legacy.
-- ============================================================

with
route2_org as (
  select id, name, short_name
  from public.organizations
  where short_name = 'RUTA2-DEMO'
),
route2_project as (
  select p.id, p.organization_id, p.name, p.code
  from public.projects p
  join route2_org o on o.id = p.organization_id
  where p.code = 'ruta2-demo'
),
route2_catalog as (
  select pc.id, pc.project_id, pc.catalog_code, pc.catalog_name
  from public.project_catalog pc
  join route2_project p on p.id = pc.project_id
  where pc.catalog_code = 'catalogo-ruta2-demo'
)
select
  'route2_dataset_counts' as evidence_type,
  (select count(*) from route2_org) as organizations_ruta2_demo,
  (select count(*) from route2_project) as projects_ruta2_demo,
  (select count(*) from public.project_branding pb join route2_project p on p.id = pb.project_id) as branding_for_project,
  (select count(*) from public.project_assets a join route2_project p on p.id = a.project_id where a.asset_type = 'hero_image' and a.is_primary = true) as primary_hero_assets_for_project,
  (select count(*) from route2_catalog) as catalogs_ruta2_demo,
  (select count(*) from public.project_commercial_types pct join route2_catalog c on c.id = pct.project_catalog_id) as commercial_types_for_catalog,
  (select count(*) from public.project_inventory pi join route2_catalog c on c.id = pi.project_catalog_id) as inventory_for_catalog;

select
  'route2_organization_evidence' as evidence_type,
  o.id,
  o.name,
  o.short_name,
  o.data_origin,
  o.operational_environment,
  o.legacy_status
from public.organizations o
where o.short_name = 'RUTA2-DEMO';

select
  'route2_project_evidence' as evidence_type,
  p.id,
  p.organization_id,
  p.name,
  p.code,
  o.short_name as organization_short_name,
  p.data_origin,
  p.operational_environment,
  p.legacy_status
from public.projects p
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo';

select
  'route2_branding_evidence' as evidence_type,
  pb.project_id,
  p.code as project_code,
  o.short_name as organization_short_name,
  pb.brand_name,
  pb.public_visibility,
  pb.branding_status
from public.project_branding pb
join public.projects p on p.id = pb.project_id
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo';

select
  'route2_hero_asset_evidence' as evidence_type,
  a.project_id,
  p.code as project_code,
  o.short_name as organization_short_name,
  a.asset_type,
  a.asset_reference,
  a.is_primary,
  a.asset_status
from public.project_assets a
join public.projects p on p.id = a.project_id
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo'
  and a.asset_type = 'hero_image';

select
  'route2_catalog_evidence' as evidence_type,
  pc.id as project_catalog_id,
  pc.project_id,
  p.code as project_code,
  o.short_name as organization_short_name,
  pc.catalog_code,
  pc.catalog_name,
  pc.catalog_status,
  pc.public_visibility
from public.project_catalog pc
join public.projects p on p.id = pc.project_id
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo'
  and pc.catalog_code = 'catalogo-ruta2-demo';

select
  'route2_commercial_types_evidence' as evidence_type,
  pct.project_catalog_id,
  pc.catalog_code,
  p.code as project_code,
  o.short_name as organization_short_name,
  pct.type_code,
  pct.type_name,
  pct.commercial_domain,
  pct.type_status
from public.project_commercial_types pct
join public.project_catalog pc on pc.id = pct.project_catalog_id
join public.projects p on p.id = pc.project_id
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo'
  and pc.catalog_code = 'catalogo-ruta2-demo'
order by pct.sort_order;

select
  'route2_inventory_evidence' as evidence_type,
  pi.project_catalog_id,
  pc.catalog_code,
  p.code as project_code,
  o.short_name as organization_short_name,
  pi.inventory_code,
  pi.inventory_name,
  pi.inventory_type,
  pi.commercial_status,
  pi.selection_mode
from public.project_inventory pi
join public.project_catalog pc on pc.id = pi.project_catalog_id
join public.projects p on p.id = pc.project_id
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo'
  and pc.catalog_code = 'catalogo-ruta2-demo'
order by pi.inventory_code;

-- ============================================================
-- 3. ROLLBACK OBLIGATORIO
-- Este paquete es dry-run. No persistir datos.
-- Si hubo cualquier error antes de este punto, ejecutar ROLLBACK
-- manualmente antes de cualquier otra accion.
-- ============================================================

ROLLBACK;
```

## 6. Bloque Post-ROLLBACK de Solo Lectura

Este bloque debe ejecutarse solamente despues de confirmar que el `ROLLBACK` anterior fue ejecutado.

Debe ejecutarse fuera de la transaccion ya revertida.

No contiene `BEGIN`.

No contiene `COMMIT`.

No contiene sentencias de escritura.

No modifica datos.

Su proposito es demostrar, mediante lectura posterior, que no quedo persistencia del paquete dry-run Ruta 2 y que el estado observable regreso a lo capturado antes del dry-run.

La comparacion humana debe hacerse contra la evidencia capturada en los prechecks previos y contra los resultados del bloque transaccional antes del `ROLLBACK`.

```sql
-- ============================================================
-- SUPABASE-RUTA2-0015
-- BLOQUE POST-ROLLBACK DE SOLO LECTURA
--
-- Ejecutar unicamente despues de confirmar que ROLLBACK fue
-- ejecutado en el bloque dry-run anterior.
--
-- Este bloque debe correr fuera de la transaccion revertida.
-- No contiene BEGIN.
-- No contiene COMMIT.
-- No contiene INSERT, UPDATE, DELETE, MERGE, ALTER, DROP,
-- CREATE, TRUNCATE ni ninguna sentencia de escritura.
-- ============================================================

with
route2_org as (
  select id, name, short_name, data_origin, operational_environment, legacy_status
  from public.organizations
  where short_name = 'RUTA2-DEMO'
),
route2_project as (
  select p.id, p.organization_id, p.name, p.code, p.data_origin, p.operational_environment, p.legacy_status
  from public.projects p
  join route2_org o on o.id = p.organization_id
  where p.code = 'ruta2-demo'
),
route2_catalog as (
  select pc.id, pc.project_id, pc.catalog_code, pc.catalog_name, pc.data_origin, pc.operational_environment, pc.legacy_status
  from public.project_catalog pc
  join route2_project p on p.id = pc.project_id
  where pc.catalog_code = 'catalogo-ruta2-demo'
),
route2_branding as (
  select pb.id, pb.project_id, pb.brand_name, pb.data_origin, pb.operational_environment, pb.legacy_status
  from public.project_branding pb
  join route2_project p on p.id = pb.project_id
),
route2_hero_assets as (
  select a.id, a.project_id, a.asset_type, a.asset_reference, a.is_primary, a.data_origin, a.operational_environment, a.legacy_status
  from public.project_assets a
  join route2_project p on p.id = a.project_id
  where a.asset_type = 'hero_image'
),
route2_commercial_types as (
  select pct.id, pct.project_id, pct.project_catalog_id, pct.type_code, pct.data_origin, pct.operational_environment, pct.legacy_status
  from public.project_commercial_types pct
  join route2_catalog c on c.id = pct.project_catalog_id
  where pct.type_code in ('residencia-demo', 'servicio-demo', 'curso-demo')
),
route2_inventory as (
  select pi.id, pi.project_id, pi.project_catalog_id, pi.inventory_code, pi.data_origin, pi.operational_environment, pi.legacy_status
  from public.project_inventory pi
  join route2_catalog c on c.id = pi.project_catalog_id
  where pi.inventory_code in (
    'INV-RUTA2-RES-001',
    'INV-RUTA2-RES-002',
    'INV-RUTA2-SRV-001',
    'INV-RUTA2-CUR-001'
  )
)
select
  'post_rollback_route2_scoped_counts' as evidence_type,
  (select count(*) from route2_org) as organizations_ruta2_demo,
  (select count(*) from route2_project) as projects_ruta2_demo,
  (select count(*) from route2_branding) as branding_for_project,
  (select count(*) from route2_hero_assets where is_primary = true) as primary_hero_assets_for_project,
  (select count(*) from route2_catalog) as catalogs_ruta2_demo,
  (select count(*) from route2_commercial_types) as commercial_types_for_catalog,
  (select count(*) from route2_inventory) as inventory_for_catalog,
  'Comparar estos conteos contra los prechecks capturados antes del dry-run. Deben volver exactamente al estado previo.' as human_review_rule;

with
package_markers as (
  select 'organizations' as table_name, count(*) as matching_rows
  from public.organizations
  where short_name = 'RUTA2-DEMO'
    and data_origin = 'fase_04_demo'
    and operational_environment = 'demo'
    and legacy_status = 'none'

  union all

  select 'projects' as table_name, count(*) as matching_rows
  from public.projects p
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and p.data_origin = 'fase_04_demo'
    and p.operational_environment = 'demo'
    and p.legacy_status = 'none'

  union all

  select 'project_branding' as table_name, count(*) as matching_rows
  from public.project_branding pb
  join public.projects p on p.id = pb.project_id
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and pb.brand_name = 'Ruta 2 Demo'
    and pb.data_origin = 'fase_04_demo'
    and pb.operational_environment = 'demo'
    and pb.legacy_status = 'none'

  union all

  select 'project_assets' as table_name, count(*) as matching_rows
  from public.project_assets a
  join public.projects p on p.id = a.project_id
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and a.asset_reference = 'https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg'
    and a.data_origin = 'fase_04_demo'
    and a.operational_environment = 'demo'
    and a.legacy_status = 'none'

  union all

  select 'project_catalog' as table_name, count(*) as matching_rows
  from public.project_catalog pc
  join public.projects p on p.id = pc.project_id
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and pc.catalog_code = 'catalogo-ruta2-demo'
    and pc.data_origin = 'fase_04_demo'
    and pc.operational_environment = 'demo'
    and pc.legacy_status = 'none'

  union all

  select 'project_commercial_types' as table_name, count(*) as matching_rows
  from public.project_commercial_types pct
  join public.project_catalog pc on pc.id = pct.project_catalog_id
  join public.projects p on p.id = pc.project_id
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and pc.catalog_code = 'catalogo-ruta2-demo'
    and pct.type_code in ('residencia-demo', 'servicio-demo', 'curso-demo')
    and pct.data_origin = 'fase_04_demo'
    and pct.operational_environment = 'demo'
    and pct.legacy_status = 'none'

  union all

  select 'project_inventory' as table_name, count(*) as matching_rows
  from public.project_inventory pi
  join public.project_catalog pc on pc.id = pi.project_catalog_id
  join public.projects p on p.id = pc.project_id
  join public.organizations o on o.id = p.organization_id
  where o.short_name = 'RUTA2-DEMO'
    and p.code = 'ruta2-demo'
    and pc.catalog_code = 'catalogo-ruta2-demo'
    and pi.inventory_code in (
      'INV-RUTA2-RES-001',
      'INV-RUTA2-RES-002',
      'INV-RUTA2-SRV-001',
      'INV-RUTA2-CUR-001'
    )
    and pi.data_origin = 'fase_04_demo'
    and pi.operational_environment = 'demo'
    and pi.legacy_status = 'none'
)
select
  'post_rollback_package_markers' as evidence_type,
  table_name,
  matching_rows,
  'Aprobar solo si matching_rows coincide exactamente con el estado previo capturado antes del dry-run; para filas creadas por el paquete durante la transaccion, debe ser 0 despues del ROLLBACK.' as human_review_rule
from package_markers
order by table_name;

with expected_codes as (
  select *
  from (
    values
      ('organization_short_name', 'RUTA2-DEMO'),
      ('project_code', 'ruta2-demo'),
      ('catalog_code', 'catalogo-ruta2-demo'),
      ('hero_asset_reference', 'https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg'),
      ('commercial_type_code', 'residencia-demo'),
      ('commercial_type_code', 'servicio-demo'),
      ('commercial_type_code', 'curso-demo'),
      ('inventory_code', 'INV-RUTA2-RES-001'),
      ('inventory_code', 'INV-RUTA2-RES-002'),
      ('inventory_code', 'INV-RUTA2-SRV-001'),
      ('inventory_code', 'INV-RUTA2-CUR-001')
  ) as v(marker_type, marker_value)
)
select
  'post_rollback_marker_inventory' as evidence_type,
  marker_type,
  marker_value,
  'Debe no existir como fila nueva persistida por el dry-run. Si existia antes, debe coincidir con la evidencia previa y no aumentar conteo.' as human_review_rule
from expected_codes
order by marker_type, marker_value;

select
  'post_rollback_out_of_scope_tables' as evidence_type,
  'El paquete dry-run solo contiene DML sobre organizations, projects, project_branding, project_assets, project_catalog, project_commercial_types y project_inventory.' as touched_tables,
  'Aprobar solo si el diff documental y la ejecucion humana confirman que no se ejecuto escritura sobre tablas ajenas. Este bloque post-ROLLBACK es solo lectura y no puede alterar tablas.' as human_review_rule;
```

### Criterios Humanos Post-ROLLBACK

Aprobar el dry-run humano solo si:

- el bloque post-`ROLLBACK` se ejecuto despues del `ROLLBACK` confirmado;
- los conteos Ruta 2 post-`ROLLBACK` coinciden exactamente con los prechecks capturados antes del dry-run;
- no aparece ninguna fila nueva persistida por el paquete Ruta 2;
- no aparecen nuevos codigos, slugs, referencias o identificadores temporales del dry-run;
- los marcadores `RUTA2-DEMO`, `ruta2-demo`, `catalogo-ruta2-demo`, `https://example.invalid/amena/ruta2-demo/hero-placeholder.jpg`, `residencia-demo`, `servicio-demo`, `curso-demo`, `INV-RUTA2-RES-001`, `INV-RUTA2-RES-002`, `INV-RUTA2-SRV-001` e `INV-RUTA2-CUR-001` coinciden con el estado previo o no existen si fueron creados solo durante la transaccion;
- no hubo escritura sobre tablas ajenas a `organizations`, `projects`, `project_branding`, `project_assets`, `project_catalog`, `project_commercial_types` y `project_inventory`;
- no existe `COMMIT`;
- no existe duda humana.

Abortar y volver a analisis documental si:

- cualquier conteo post-`ROLLBACK` difiere del precheck previo;
- aparece una fila nueva persistida del paquete Ruta 2;
- aparece un codigo, slug, referencia o identificador temporal que no existia antes;
- hay evidencia o sospecha de escritura sobre una tabla ajena;
- el bloque post-`ROLLBACK` fue ejecutado antes de confirmar el `ROLLBACK`;
- aparece cualquier error SQL;
- el resultado es ambiguo;
- alguien intenta agregar `COMMIT` o cambiar el alcance.

## 7. Validaciones Posteriores Ajustadas

Las validaciones posteriores del paquete 0015 se enfocan exclusivamente en el dataset Ruta 2.

Usan como llaves de identidad:

- `organizations.short_name = 'RUTA2-DEMO'`;
- `projects.code = 'ruta2-demo'`;
- `project_catalog.catalog_code = 'catalogo-ruta2-demo'`.

Tambien validan relaciones por:

- `organization_id`;
- `project_id`;
- `project_catalog_id`.

El paquete evita usar como criterio principal conteos amplios basados solo en:

- `data_origin = 'fase_04_demo'`;
- `operational_environment = 'demo'`;
- `legacy_status = 'none'`.

Esos campos pueden seguir existiendo como contexto del dataset, pero no deben ser el criterio principal de exito.

## 8. Evidencias Posteriores Ajustadas

El paquete busca producir evidencia especifica de:

- organizacion demo especifica;
- proyecto demo especifico;
- branding del proyecto demo;
- hero asset del proyecto demo, si aplica;
- catalogo demo especifico;
- tipos comerciales del catalogo demo especifico;
- inventario del catalogo demo especifico.

Toda evidencia debe revisarse antes de considerar cualquier siguiente paso.

Un dry-run exitoso no autoriza persistencia de datos.

## 9. Senales de Aborto

Abortar si:

- hay duplicados en `organizations`;
- hay duplicados en `projects`;
- hay conflicto de asset primario;
- aparece error de FK;
- aparece error de constraint;
- aparecen conteos inesperados;
- aparece cualquier error SQL;
- existe duda humana;
- alguien intenta cambiar `ROLLBACK` por `COMMIT`;
- alguien intenta conectar Ruta 2;
- alguien intenta avanzar Bloque 6.

Si el script se detiene antes del `ROLLBACK` final, Miguel debe ejecutar `ROLLBACK` manualmente antes de cualquier otra accion.

## 10. Decisiones Vigentes

Ruta 2 sigue desconectada.

Bloque 6 sigue pospuesto.

Dry-run exitoso no equivale a autorizacion de `COMMIT`.

Poblar datos no equivale a integrar.

Tabla poblada no equivale a consumo funcional por una app.

Solo consumo real en codigo permite declarar que un bloque esta aplicado funcionalmente en Ruta 2.

## 11. Acciones Explicitamente No Realizadas

Durante la creacion de este documento:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos en Supabase.
- No se actualizaron datos en Supabase.
- No se borraron datos en Supabase.
- No se modifico codigo.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se avanzo Bloque 6 funcionalmente.
- No se creo migracion ejecutable.
- No se creo archivo `.sql` ejecutable.
- No se crearon constraints nuevos.

## 12. Conclusion

`SUPABASE-RUTA2-0015` deja preparado un paquete dry-run ajustado, sin placeholder, con validaciones posteriores especificas del dataset Ruta 2 y con regla humana explicita de emergencia para `ROLLBACK` manual.

Este documento no autoriza ejecucion.

Este documento no autoriza persistencia de datos.

El siguiente paso seguro es revision humana del paquete 0015 antes de decidir si se permite una prueba futura con `ROLLBACK` obligatorio.

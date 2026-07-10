# SUPABASE-RUTA2-0013 - Paquete Dry-Run con Rollback Obligatorio Seed Bloques 01 a 05

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es Markdown revisable.

No ejecutar todavia.

No copiar a Supabase sin autorizacion humana posterior.

Es un dry-run documental.

Incluye `ROLLBACK` obligatorio.

No incluye `COMMIT` operativo.

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

Corregir documentalmente la limitacion detectada en `SUPABASE-RUTA2-0012`, que reservaba un espacio textual para el SQL seed reforzado sin incluir todavia el bloque completo.

Este documento prepara un paquete dry-run reforzado, sin placeholder, derivado de `SUPABASE-RUTA2-0005` e incorporando los riesgos y refuerzos definidos en `SUPABASE-RUTA2-0011`.

El paquete esta disenado para que, incluso si en una fase posterior autorizada se copiara a Supabase, termine con `ROLLBACK` obligatorio y no deje datos persistidos.

## 2. Relacion con documentos previos

### SUPABASE-RUTA2-0005

Contiene el SQL seed revisable original para poblacion minima demo/generica de Bloques 01 a 05.

Este documento toma su estructura base, tablas, campos y dataset demo.

### SUPABASE-RUTA2-0009

Contiene el primer paquete humano controlado con propuesta de `BEGIN`, SQL derivado, SELECTs de validacion y `COMMIT` / `ROLLBACK` comentados.

Este documento conserva el enfoque humano controlado, pero elimina el `COMMIT` operativo y fuerza `ROLLBACK`.

### SUPABASE-RUTA2-0011

Contiene el dictamen de riesgos:

- `organizations.short_name` sin unique constraint visible;
- `projects.code` sin unique constraint visible;
- `project_assets` con unique index parcial para un solo asset primario por `project_id + asset_type` cuando `is_primary = true`.

Este documento incorpora esos riesgos como prechecks.

### SUPABASE-RUTA2-0012

Contiene el paquete humano reforzado conceptual.

Este documento lo reemplaza como paquete dry-run recomendado porque ya incluye SQL seed reforzado real y no deja placeholder.

## 3. Prechecks reforzados

Antes del bloque transaccional se proponen prechecks de lectura.

Reglas:

- Si `organizations` con `short_name = 'RUTA2-DEMO'` es mayor que `1`, abortar.
- Si `projects` con `code = 'ruta2-demo'` dentro de la organizacion demo es mayor que `1`, abortar.
- Si ya existe `hero_image` primario del proyecto demo, no insertar otro.
- Si existe un `hero_image` primario con otra URL, abortar y documentar.

Estos prechecks no crean datos. En el paquete dry-run quedan integrados tambien como CTEs de guardia para impedir inserts si hay ambiguedad.

## 4. Paquete SQL dry-run reforzado

El siguiente bloque es SQL dentro de Markdown.

No debe ejecutarse todavia.

Si en una fase posterior se autoriza copiarlo para prueba, debe terminar en `ROLLBACK`.

```sql
-- ============================================================
-- SUPABASE-RUTA2-0013
-- PAQUETE DRY-RUN REFORZADO - NO EJECUTAR TODAVIA
--
-- Objetivo:
-- Probar de forma transaccional y reversible el seed demo/generico
-- de Bloques 01 a 05, incorporando refuerzos preventivos sobre:
-- organizations, projects y project_assets.
--
-- REGLA ABSOLUTA:
-- Este paquete termina en ROLLBACK obligatorio.
-- No incluye COMMIT operativo.
--
-- Prohibido en este paquete:
-- - UPDATE
-- - DELETE
-- - ALTER
-- - DROP
-- - CREATE CONSTRAINT
-- - COMMIT
-- ============================================================

-- ============================================================
-- 0. PRECHECKS DE LECTURA
-- Si algun resultado contradice las reglas, NO continuar.
-- ============================================================

select
  count(*) as ruta2_demo_organizations_count
from public.organizations
where short_name = 'RUTA2-DEMO';

with organization_ref as (
  select id
  from public.organizations
  where short_name = 'RUTA2-DEMO'
)
select
  count(*) as ruta2_demo_projects_count
from public.projects p
join organization_ref o on o.id = p.organization_id
where p.code = 'ruta2-demo';

with organization_ref as (
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
  count(*) as primary_hero_assets_count,
  array_agg(asset_reference) as primary_hero_asset_references
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

-- ------------------------------------------------------------
-- Guardias reforzadas.
-- Si hay duplicados ambiguos, no se insertan datos.
-- ------------------------------------------------------------
organization_candidates as (
  select o.id
  from public.organizations o
  join params p on p.organization_short_name = o.short_name
),
organization_guard as (
  select
    count(*) as organization_count,
    case
      when count(*) <= 1 then true
      else false
    end as can_continue
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
    case
      when count(*) <= 1 then true
      else false
    end as can_continue
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
    case
      when count(*) = 0 then true
      else false
    end as can_insert_primary_hero
  from public.project_assets a
  join project_ref p on p.id = a.project_id
  where a.asset_type = 'hero_image'
    and a.is_primary = true
),

-- ------------------------------------------------------------
-- Bloque 02: project_branding
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
    '{"source":"SUPABASE-RUTA2-0013","mode":"dry_run_hardened"}'::jsonb,
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
-- Refuerzo: no inserta hero_image primario si ya existe uno.
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
    params.hero_asset_reference,
    null,
    0,
    true,
    true,
    'validated',
    '{"placeholder":true,"source":"SUPABASE-RUTA2-0013","dry_run":true}'::jsonb,
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

-- ------------------------------------------------------------
-- Bloque 04: project_catalog
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
    '{"route2Integration":"future","phase":"dry_run_hardened"}'::jsonb,
    '{"source":"SUPABASE-RUTA2-0013","demo":true,"dry_run":true}'::jsonb,
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
      'source', 'SUPABASE-RUTA2-0013',
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

-- ------------------------------------------------------------
-- Bloque 03: project_inventory
-- ------------------------------------------------------------
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
      'source', 'SUPABASE-RUTA2-0013',
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
-- 2. SELECTS DE VALIDACION POSTERIOR DENTRO DEL DRY-RUN
-- ============================================================

select
  'organizations' as table_name,
  count(*) as rows_count
from public.organizations
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'projects' as table_name,
  count(*) as rows_count
from public.projects
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'project_branding' as table_name,
  count(*) as rows_count
from public.project_branding
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'project_assets' as table_name,
  count(*) as rows_count
from public.project_assets
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'project_catalog' as table_name,
  count(*) as rows_count
from public.project_catalog
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'project_commercial_types' as table_name,
  count(*) as rows_count
from public.project_commercial_types
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'project_inventory' as table_name,
  count(*) as rows_count
from public.project_inventory
where data_origin = 'fase_04_demo'
  and operational_environment = 'demo'
  and legacy_status = 'none';

select
  'demo_organization' as evidence_type,
  id,
  name,
  short_name,
  data_origin,
  operational_environment,
  legacy_status
from public.organizations
where short_name = 'RUTA2-DEMO';

select
  'demo_project' as evidence_type,
  p.id,
  p.name,
  p.code,
  p.data_origin,
  p.operational_environment,
  p.legacy_status
from public.projects p
join public.organizations o on o.id = p.organization_id
where o.short_name = 'RUTA2-DEMO'
  and p.code = 'ruta2-demo';

select
  'demo_branding' as evidence_type,
  pb.project_id,
  pb.brand_name,
  pb.public_visibility,
  pb.branding_status
from public.project_branding pb
join public.projects p on p.id = pb.project_id
where p.code = 'ruta2-demo';

select
  'demo_hero_asset' as evidence_type,
  a.project_id,
  a.asset_type,
  a.asset_reference,
  a.is_primary,
  a.asset_status
from public.project_assets a
join public.projects p on p.id = a.project_id
where p.code = 'ruta2-demo'
  and a.asset_type = 'hero_image';

select
  'demo_catalog' as evidence_type,
  pc.project_id,
  pc.catalog_code,
  pc.catalog_name,
  pc.catalog_status,
  pc.public_visibility
from public.project_catalog pc
join public.projects p on p.id = pc.project_id
where p.code = 'ruta2-demo';

select
  'demo_commercial_types' as evidence_type,
  pct.project_catalog_id,
  pct.type_code,
  pct.type_name,
  pct.commercial_domain,
  pct.type_status
from public.project_commercial_types pct
join public.project_catalog pc on pc.id = pct.project_catalog_id
where pc.catalog_code = 'catalogo-ruta2-demo'
order by pct.sort_order;

select
  'demo_inventory' as evidence_type,
  pi.project_catalog_id,
  pi.inventory_code,
  pi.inventory_name,
  pi.inventory_type,
  pi.commercial_status,
  pi.selection_mode
from public.project_inventory pi
join public.project_catalog pc on pc.id = pi.project_catalog_id
where pc.catalog_code = 'catalogo-ruta2-demo'
order by pi.inventory_code;

-- ============================================================
-- 3. ROLLBACK OBLIGATORIO
-- Este paquete es dry-run. No persistir datos.
-- ============================================================

ROLLBACK;
```

## 5. Validaciones posteriores dentro del dry-run

El paquete incluye validaciones para capturar:

- conteos por tabla;
- evidencia de organizacion demo;
- evidencia de proyecto demo;
- evidencia de branding demo;
- evidencia de asset hero si aplica;
- evidencia de catalogo demo;
- evidencia de tipos comerciales;
- evidencia de inventario.

Estas validaciones no convierten el dry-run en ejecucion autorizada.

## 6. Senales de aborto

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

## 7. Decisiones vigentes

Ruta 2 sigue desconectada.

Bloque 6 sigue pospuesto.

Poblar datos no equivale a integrar.

Dry-run exitoso no equivale a autorizacion de `COMMIT`.

Estructura compatible no equivale a ejecucion autorizada.

## 8. Acciones explicitamente no realizadas

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

## 9. Conclusion

`SUPABASE-RUTA2-0013` deja preparado un paquete dry-run reforzado, con SQL real y sin placeholder.

Este documento no autoriza ejecucion.

Este documento no autoriza persistencia de datos.

El siguiente paso seguro es revision humana del paquete dry-run antes de decidir si se autoriza una prueba futura con `ROLLBACK` obligatorio.

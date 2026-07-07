-- ============================================================
-- AMENA 72 - SQL de trazabilidad
-- Bloque 3: project_inventory
-- Fecha: 2026-07-07
--
-- Estado: Ejecutado manualmente en Supabase por aprobacion humana.
-- Resultado de ejecucion reportado: Success. No rows returned.
-- Tabla creada: public.project_inventory.
-- Indices creados:
--   - project_inventory_project_id_idx
--   - project_inventory_project_catalog_idx
--   - project_inventory_project_type_idx
--   - project_inventory_project_status_idx
--   - project_inventory_project_commercial_status_idx
--   - project_inventory_project_visibility_idx
--   - project_inventory_project_selection_idx
--
-- Notas de control:
--   - No se activo RLS.
--   - No se crearon policies.
--   - No se crearon triggers.
--   - No se crearon funciones.
--   - No se tocaron tablas legacy.
--   - No se ejecutaron DROP TABLE ni ALTER sobre tablas existentes.
--   - No se creo project_catalog.
--   - No se crearon product_types, product_models ni product_variants.
--   - No se crearon commercial_units.
--   - No se crearon precios ni disponibilidad avanzada.
--   - No se crearon activos comerciales ni reservas.
-- ============================================================

create table if not exists public.project_inventory (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id)
    on delete restrict,

  project_catalog_id uuid,

  inventory_code text not null,
  inventory_name text not null,
  inventory_type text not null,
  commercial_category text,

  short_description text,
  location_label text,

  inventory_status text not null default 'draft',
  commercial_status text not null default 'not_applicable',
  public_visibility text not null default 'hidden',
  selection_mode text not null default 'not_selectable',

  attributes jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',

  notes text,

  created_by text,
  updated_by text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_inventory_project_code_unique
    unique (project_id, inventory_code),

  constraint project_inventory_inventory_type_check
    check (
      inventory_type in (
        'unit',
        'lot',
        'space',
        'product',
        'service',
        'package',
        'membership',
        'quota',
        'course',
        'event_slot',
        'variant_group',
        'other'
      )
    ),

  constraint project_inventory_status_check
    check (
      inventory_status in (
        'draft',
        'in_review',
        'validated',
        'active',
        'inactive',
        'archived',
        'rejected'
      )
    ),

  constraint project_inventory_commercial_status_check
    check (
      commercial_status in (
        'available',
        'unavailable',
        'reserved_reference',
        'sold_reference',
        'not_applicable'
      )
    ),

  constraint project_inventory_public_visibility_check
    check (public_visibility in ('hidden', 'preview', 'public')),

  constraint project_inventory_selection_mode_check
    check (
      selection_mode in (
        'not_selectable',
        'selectable',
        'reference_only',
        'reservable_reference'
      )
    ),

  constraint project_inventory_data_origin_check
    check (data_origin in ('moc_vitrina', 'fase_04_demo', 'production', 'legacy')),

  constraint project_inventory_operational_environment_check
    check (operational_environment in ('demo', 'production', 'legacy')),

  constraint project_inventory_legacy_status_check
    check (legacy_status in ('none', 'imported', 'archived', 'pending_classification')),

  constraint project_inventory_origin_environment_consistency_check
    check (
      (data_origin = 'moc_vitrina' and operational_environment = 'demo')
      or
      (data_origin = 'fase_04_demo' and operational_environment = 'demo')
      or
      (data_origin = 'production' and operational_environment = 'production')
      or
      (data_origin = 'legacy' and operational_environment = 'legacy')
    ),

  constraint project_inventory_legacy_status_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status <> 'none')
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);

comment on table public.project_inventory is
  'Primera materializacion fisica controlada del inventario comercial por proyecto. No representa project_catalog completo, product_types, product_models, product_variants, commercial_units, precios, disponibilidad avanzada, assets ni reservas.';

comment on column public.project_inventory.project_catalog_id is
  'Referencia conceptual futura. Permanece nullable y sin FK porque project_catalog aun no existe fisicamente. No debe usarse como FK hasta que exista el bloque rector project_catalog.';

comment on column public.project_inventory.project_id is
  'Relacion obligatoria actual hacia projects.';

comment on column public.project_inventory.inventory_code is
  'Identificador comercial unico dentro del proyecto.';

comment on column public.project_inventory.inventory_status is
  'Gobierna validacion y ciclo documental del registro.';

comment on column public.project_inventory.commercial_status is
  'Expresa una lectura comercial basica, sin reemplazar disponibilidad avanzada futura.';

comment on column public.project_inventory.selection_mode is
  'Prepara consumo futuro por reservas sin crear reservas ni disponibilidad.';

comment on column public.project_inventory.attributes is
  'Permite atributos flexibles iniciales sin sustituir futuros dominios normalizados.';

create index if not exists project_inventory_project_id_idx
  on public.project_inventory (project_id);

create index if not exists project_inventory_project_catalog_idx
  on public.project_inventory (project_id, project_catalog_id);

create index if not exists project_inventory_project_type_idx
  on public.project_inventory (project_id, inventory_type);

create index if not exists project_inventory_project_status_idx
  on public.project_inventory (project_id, inventory_status);

create index if not exists project_inventory_project_commercial_status_idx
  on public.project_inventory (project_id, commercial_status);

create index if not exists project_inventory_project_visibility_idx
  on public.project_inventory (project_id, public_visibility);

create index if not exists project_inventory_project_selection_idx
  on public.project_inventory (project_id, selection_mode);

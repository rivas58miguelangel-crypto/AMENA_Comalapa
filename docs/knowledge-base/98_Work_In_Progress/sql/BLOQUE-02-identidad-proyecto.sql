-- ============================================================
-- AMENA 71 - SQL de trazabilidad
-- Bloque 2: Identidad del proyecto
-- Fecha: 2026-07-07
--
-- Estado: Ejecutado manualmente en Supabase por aprobacion humana.
-- Resultado de ejecucion reportado: Success. No rows returned.
-- Tablas creadas: public.project_branding, public.project_assets.
-- Indices creados:
--   - project_assets_project_id_idx
--   - project_assets_project_type_idx
--   - project_assets_project_status_idx
--   - project_assets_project_primary_idx
--   - project_assets_one_primary_per_type_idx
--
-- Notas de control:
--   - No se activo RLS.
--   - No se crearon policies.
--   - No se crearon triggers.
--   - No se crearon funciones.
--   - No se tocaron tablas legacy.
--   - No se ejecutaron DROP TABLE ni ALTER sobre tablas existentes.
--   - No se incorporo catalogo comercial.
--   - No se incorporo inventario comercial.
--   - No se incorporaron reservas.
-- ============================================================

create table if not exists public.project_branding (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id)
    on delete restrict,

  brand_name text not null,
  public_project_name text,
  tagline text,
  short_description text,

  primary_color text,
  secondary_color text,
  accent_color text,
  background_color text,
  text_color text,

  font_family text,
  heading_font_family text,

  branding_status text not null default 'draft',
  public_visibility text not null default 'hidden',

  theme_tokens jsonb not null default '{}'::jsonb,
  public_copy jsonb not null default '{}'::jsonb,
  navigation_config jsonb not null default '{}'::jsonb,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',

  notes text,

  created_by text,
  updated_by text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_branding_project_id_unique
    unique (project_id),

  constraint project_branding_status_check
    check (branding_status in ('draft', 'in_review', 'validated', 'active', 'inactive', 'archived', 'rejected')),

  constraint project_branding_public_visibility_check
    check (public_visibility in ('hidden', 'preview', 'public')),

  constraint project_branding_primary_color_check
    check (primary_color is null or primary_color ~ '^#[0-9A-Fa-f]{6}$'),

  constraint project_branding_secondary_color_check
    check (secondary_color is null or secondary_color ~ '^#[0-9A-Fa-f]{6}$'),

  constraint project_branding_accent_color_check
    check (accent_color is null or accent_color ~ '^#[0-9A-Fa-f]{6}$'),

  constraint project_branding_background_color_check
    check (background_color is null or background_color ~ '^#[0-9A-Fa-f]{6}$'),

  constraint project_branding_text_color_check
    check (text_color is null or text_color ~ '^#[0-9A-Fa-f]{6}$'),

  constraint project_branding_data_origin_check
    check (data_origin in ('moc_vitrina', 'fase_04_demo', 'production', 'legacy')),

  constraint project_branding_operational_environment_check
    check (operational_environment in ('demo', 'production', 'legacy')),

  constraint project_branding_legacy_status_check
    check (legacy_status in ('none', 'imported', 'archived', 'pending_classification')),

  constraint project_branding_origin_environment_consistency_check
    check (
      (data_origin = 'moc_vitrina' and operational_environment = 'demo')
      or
      (data_origin = 'fase_04_demo' and operational_environment = 'demo')
      or
      (data_origin = 'production' and operational_environment = 'production')
      or
      (data_origin = 'legacy' and operational_environment = 'legacy')
    ),

  constraint project_branding_legacy_status_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status <> 'none')
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);

create table if not exists public.project_assets (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id)
    on delete restrict,

  asset_type text not null,
  asset_purpose text not null,
  asset_context text not null default 'project',

  title text,
  description text,
  alt_text text,

  storage_provider text not null default 'external_url',
  asset_reference text not null,
  thumbnail_reference text,

  mime_type text,
  file_extension text,
  file_size_bytes bigint,

  asset_checksum text,
  checksum_algorithm text,

  sort_order integer not null default 0,

  is_primary boolean not null default false,
  is_public boolean not null default false,

  asset_status text not null default 'draft',

  metadata jsonb not null default '{}'::jsonb,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',

  notes text,

  created_by text,
  updated_by text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_assets_asset_type_check
    check (asset_type in ('logo', 'favicon', 'hero_image', 'gallery_image', 'background_image', 'map_image', 'brochure', 'document', 'video', 'icon', 'other')),

  constraint project_assets_asset_purpose_check
    check (asset_purpose in ('brand_identity', 'project_presence', 'public_experience', 'marketing_support', 'documentary_support', 'other')),

  constraint project_assets_asset_context_check
    check (asset_context in ('project', 'brand', 'public_reservations', 'admin', 'marta', 'intelligence')),

  constraint project_assets_storage_provider_check
    check (storage_provider in ('external_url', 'supabase_storage', 'future_storage', 'legacy_reference')),

  constraint project_assets_file_extension_check
    check (file_extension is null or file_extension ~ '^\.[A-Za-z0-9]{1,12}$'),

  constraint project_assets_file_size_bytes_check
    check (file_size_bytes is null or file_size_bytes >= 0),

  constraint project_assets_checksum_check
    check (
      (asset_checksum is null and checksum_algorithm is null)
      or
      (asset_checksum is not null and checksum_algorithm in ('sha256', 'sha1', 'md5', 'etag', 'other'))
    ),

  constraint project_assets_sort_order_check
    check (sort_order >= 0),

  constraint project_assets_status_check
    check (asset_status in ('draft', 'in_review', 'validated', 'active', 'inactive', 'archived', 'rejected')),

  constraint project_assets_data_origin_check
    check (data_origin in ('moc_vitrina', 'fase_04_demo', 'production', 'legacy')),

  constraint project_assets_operational_environment_check
    check (operational_environment in ('demo', 'production', 'legacy')),

  constraint project_assets_legacy_status_check
    check (legacy_status in ('none', 'imported', 'archived', 'pending_classification')),

  constraint project_assets_origin_environment_consistency_check
    check (
      (data_origin = 'moc_vitrina' and operational_environment = 'demo')
      or
      (data_origin = 'fase_04_demo' and operational_environment = 'demo')
      or
      (data_origin = 'production' and operational_environment = 'production')
      or
      (data_origin = 'legacy' and operational_environment = 'legacy')
    ),

  constraint project_assets_legacy_status_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status <> 'none')
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);

create index if not exists project_assets_project_id_idx
  on public.project_assets (project_id);

create index if not exists project_assets_project_type_idx
  on public.project_assets (project_id, asset_type);

create index if not exists project_assets_project_status_idx
  on public.project_assets (project_id, asset_status);

create index if not exists project_assets_project_primary_idx
  on public.project_assets (project_id, is_primary);

create unique index if not exists project_assets_one_primary_per_type_idx
  on public.project_assets (project_id, asset_type)
  where is_primary = true;

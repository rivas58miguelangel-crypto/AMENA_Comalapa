-- ============================================================
-- AMENA 69 - SQL de trazabilidad
-- Bloque 1: Nucleo institucional
-- Fecha: 2026-07-06
--
-- Estado: Ejecutado manualmente en Supabase por aprobacion humana.
-- Tablas creadas: public.organizations, public.projects.
--
-- Notas de control:
--   - No se activo RLS.
--   - No se crearon policies.
--   - No se crearon triggers.
--   - No se crearon funciones.
--   - No se tocaron tablas legacy.
--   - No se ejecutaron DROP TABLE ni ALTER sobre tablas existentes.
-- ============================================================

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  legal_name text,
  short_name text,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',

  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint organizations_data_origin_check
    check (data_origin in ('moc_vitrina', 'fase_04_demo', 'production', 'legacy')),

  constraint organizations_operational_environment_check
    check (operational_environment in ('demo', 'production', 'legacy')),

  constraint organizations_legacy_status_check
    check (legacy_status in ('none', 'imported', 'archived', 'pending_classification')),

  constraint organizations_origin_environment_consistency_check
    check (
      (data_origin = 'moc_vitrina' and operational_environment = 'demo')
      or
      (data_origin = 'fase_04_demo' and operational_environment = 'demo')
      or
      (data_origin = 'production' and operational_environment = 'production')
      or
      (data_origin = 'legacy' and operational_environment = 'legacy')
    ),

  constraint organizations_legacy_status_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status <> 'none')
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);

comment on table public.organizations is
  'Raiz institucional del ecosistema H-OperIA/AMENA. Separa organizaciones productivas, demo, MOC/vitrina y legacy.';

comment on column public.organizations.data_origin is
  'Origen conceptual del dato: moc_vitrina, fase_04_demo, production o legacy.';

comment on column public.organizations.operational_environment is
  'Ambiente operativo permitido para el registro: demo, production o legacy.';


create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references public.organizations(id)
    on delete restrict,

  name text not null,
  code text,
  description text,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',

  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint projects_data_origin_check
    check (data_origin in ('moc_vitrina', 'fase_04_demo', 'production', 'legacy')),

  constraint projects_operational_environment_check
    check (operational_environment in ('demo', 'production', 'legacy')),

  constraint projects_legacy_status_check
    check (legacy_status in ('none', 'imported', 'archived', 'pending_classification')),

  constraint projects_origin_environment_consistency_check
    check (
      (data_origin = 'moc_vitrina' and operational_environment = 'demo')
      or
      (data_origin = 'fase_04_demo' and operational_environment = 'demo')
      or
      (data_origin = 'production' and operational_environment = 'production')
      or
      (data_origin = 'legacy' and operational_environment = 'legacy')
    ),

  constraint projects_legacy_status_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status <> 'none')
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);

comment on table public.projects is
  'Proyecto operativo subordinado a una organizacion. Base para inventario, reservas, demo y operacion comercial futura.';

comment on column public.projects.organization_id is
  'Relacion obligatoria hacia organizations. Usa ON DELETE RESTRICT para evitar borrar organizaciones con proyectos.';

comment on column public.projects.data_origin is
  'Origen conceptual del dato: moc_vitrina, fase_04_demo, production o legacy.';

comment on column public.projects.operational_environment is
  'Ambiente operativo permitido para el registro: demo, production o legacy.';

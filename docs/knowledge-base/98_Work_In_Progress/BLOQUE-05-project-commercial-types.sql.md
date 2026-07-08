# BLOQUE-05 — project_commercial_types y Tipos Comerciales Parametrizables

Fecha de ejecucion: 2026-07-08

Chat de ejecucion: Codex AMENA 73

Estado: Ejecutado manualmente en Supabase por aprobacion humana.

Resultado general certificado: bloque ejecutado correctamente como capa rectora de Tipos Comerciales Parametrizables subordinada a `project_catalog`.

---

## Objetivo del bloque

Crear `public.project_commercial_types` como capa rectora minima de tipos comerciales parametrizables permitidos dentro de un `project_catalog`.

El bloque permite que cada catalogo comercial declare sus tipos comerciales de forma controlada, multiindustria y subordinada al dominio rector `project_catalog`.

Este bloque no modifica `public.project_inventory`. El campo `project_inventory.inventory_type` queda intacto y se considera conceptualmente transitorio, pero no deprecado fisicamente.

---

## Resultados certificados

- `public.project_commercial_types` creada correctamente.
- Comentarios documentales agregados correctamente.
- Indices de `public.project_commercial_types` creados correctamente.
- `project_commercial_types_exists = project_commercial_types`.
- `project_commercial_types_catalog_fk = EXISTS`.
- Seis indices verificados correctamente.

Resultados Supabase reportados por ejecucion humana:

- Creacion de `public.project_commercial_types`: `Success. No rows returned`
- Comentarios documentales: `Success. No rows returned`
- Indices: `Success. No rows returned`

---

## Tabla nueva

- `public.project_commercial_types`

## Tablas relacionadas

- `public.projects`
- `public.project_catalog`

## Constraint / FK

- `project_commercial_types_catalog_fk`

Relacion:

```text
project_commercial_types(project_id, project_catalog_id)
-> project_catalog(project_id, id)
```

## Indices creados y verificados

- `project_commercial_types_project_id_idx`
- `project_commercial_types_catalog_idx`
- `project_commercial_types_project_catalog_idx`
- `project_commercial_types_catalog_status_idx`
- `project_commercial_types_catalog_domain_idx`
- `project_commercial_types_catalog_visibility_idx`

---

## Decisiones explicitas

- `public.project_inventory` no fue modificada.
- `project_inventory.inventory_type` queda intacto.
- `inventory_type` se considera conceptualmente transitorio, pero no deprecado fisicamente.
- No se crearon atributos configurables.
- No se crearon modelos, familias, variantes ni unidades comerciales.
- No se crearon precios, disponibilidad ni reservas.
- No se crearon RLS, policies ni triggers.
- No se usaron tablas legacy como base.

---

## SQL ejecutado

### Micropaso 1: creacion de `public.project_commercial_types`

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
create table if not exists public.project_commercial_types (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null,
  project_catalog_id uuid not null,

  type_code text not null,
  type_name text not null,
  type_description text,

  commercial_domain text not null default 'other',

  type_status text not null default 'draft',
  public_visibility text not null default 'hidden',

  sort_order integer not null default 0,

  metadata jsonb not null default '{}'::jsonb,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',
  notes text,

  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_commercial_types_catalog_code_unique
    unique (project_catalog_id, type_code),

  constraint project_commercial_types_catalog_fk
    foreign key (project_id, project_catalog_id)
    references public.project_catalog (project_id, id)
    on delete restrict,

  constraint project_commercial_types_domain_check
    check (commercial_domain in (
      'real_estate',
      'physical_product',
      'digital_product',
      'service',
      'package',
      'membership',
      'quota',
      'course',
      'event_slot',
      'other'
    )),

  constraint project_commercial_types_status_check
    check (type_status in (
      'draft',
      'in_review',
      'validated',
      'active',
      'inactive',
      'archived',
      'rejected'
    )),

  constraint project_commercial_types_public_visibility_check
    check (public_visibility in (
      'hidden',
      'preview',
      'public'
    )),

  constraint project_commercial_types_sort_order_check
    check (sort_order >= 0),

  constraint project_commercial_types_data_origin_check
    check (data_origin in (
      'moc_vitrina',
      'fase_04_demo',
      'production',
      'legacy'
    )),

  constraint project_commercial_types_operational_environment_check
    check (operational_environment in (
      'demo',
      'production',
      'legacy'
    )),

  constraint project_commercial_types_legacy_status_check
    check (legacy_status in (
      'none',
      'imported',
      'archived',
      'pending_classification'
    )),

  constraint project_commercial_types_origin_environment_consistency_check
    check (
      (data_origin = 'legacy' and operational_environment = 'legacy')
      or
      (data_origin <> 'legacy' and operational_environment in ('demo', 'production'))
    ),

  constraint project_commercial_types_legacy_consistency_check
    check (
      (data_origin = 'legacy' and legacy_status in ('imported', 'archived', 'pending_classification'))
      or
      (data_origin <> 'legacy' and legacy_status = 'none')
    )
);
```

### Micropaso 2: comentarios documentales

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
comment on table public.project_commercial_types is
  'Capa rectora de tipos comerciales parametrizables permitidos dentro de un project_catalog. No representa atributos configurables, modelos, familias, variantes, unidades comerciales, precios, disponibilidad ni reservas.';

comment on column public.project_commercial_types.project_id is
  'Proyecto propietario del catalogo al que pertenece el tipo comercial.';

comment on column public.project_commercial_types.project_catalog_id is
  'Catalogo comercial rector al que pertenece el tipo comercial.';

comment on column public.project_commercial_types.type_code is
  'Identificador funcional unico del tipo comercial dentro del catalogo.';

comment on column public.project_commercial_types.type_name is
  'Nombre visible u operativo del tipo comercial.';

comment on column public.project_commercial_types.commercial_domain is
  'Clasificacion amplia multiindustria del tipo comercial. No sustituye atributos, modelos ni variantes futuras.';

comment on column public.project_commercial_types.type_status is
  'Estado de gobernanza documental y validacion del tipo comercial.';

comment on column public.project_commercial_types.metadata is
  'Metadatos auxiliares del tipo comercial. No debe usarse como sustituto de futuros atributos configurables normalizados.';
```

### Micropaso 3: indices

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
create index if not exists project_commercial_types_project_id_idx
  on public.project_commercial_types (project_id);

create index if not exists project_commercial_types_catalog_idx
  on public.project_commercial_types (project_catalog_id);

create index if not exists project_commercial_types_project_catalog_idx
  on public.project_commercial_types (project_id, project_catalog_id);

create index if not exists project_commercial_types_catalog_status_idx
  on public.project_commercial_types (project_catalog_id, type_status);

create index if not exists project_commercial_types_catalog_domain_idx
  on public.project_commercial_types (project_catalog_id, commercial_domain);

create index if not exists project_commercial_types_catalog_visibility_idx
  on public.project_commercial_types (project_catalog_id, public_visibility);
```

### Micropaso 4: verificacion de existencia de tabla

Resultado certificado:

```text
project_commercial_types_exists = project_commercial_types
```

SQL de verificacion reportado por ejecucion humana:

```sql
select
  to_regclass('public.project_commercial_types') as project_commercial_types_exists;
```

### Micropaso 5: verificacion de FK

Resultado certificado:

```text
project_commercial_types_catalog_fk = EXISTS
```

SQL de verificacion reportado por ejecucion humana:

```sql
select
  case
    when exists (
      select 1
      from pg_constraint c
      join pg_class t on t.oid = c.conrelid
      join pg_namespace n on n.oid = t.relnamespace
      where c.conname = 'project_commercial_types_catalog_fk'
        and t.relname = 'project_commercial_types'
        and n.nspname = 'public'
    )
    then 'EXISTS'
    else 'MISSING'
  end as project_commercial_types_catalog_fk;
```

### Micropaso 6: verificacion de indices

Resultado certificado:

```text
project_commercial_types_catalog_domain_idx
project_commercial_types_catalog_idx
project_commercial_types_catalog_status_idx
project_commercial_types_catalog_visibility_idx
project_commercial_types_project_catalog_idx
project_commercial_types_project_id_idx
```

SQL de verificacion reportado por ejecucion humana:

```sql
select
  indexname
from pg_indexes
where schemaname = 'public'
  and tablename = 'project_commercial_types'
  and indexname in (
    'project_commercial_types_project_id_idx',
    'project_commercial_types_catalog_idx',
    'project_commercial_types_project_catalog_idx',
    'project_commercial_types_catalog_status_idx',
    'project_commercial_types_catalog_domain_idx',
    'project_commercial_types_catalog_visibility_idx'
  )
order by indexname;
```

---

## Fuera de alcance

Este bloque no incluyo:

- atributos configurables;
- modelos;
- familias;
- variantes;
- unidades comerciales;
- precios;
- disponibilidad;
- reservas;
- operaciones comerciales;
- pagos;
- App Publica;
- escenarios demo;
- importacion web;
- Marta;
- Vapi;
- H-OperIA Intelligence;
- migracion legacy;
- RLS;
- policies;
- triggers.

---

## Dictamen

El bloque quedo ejecutado correctamente como capa rectora de Tipos Comerciales Parametrizables subordinada a `project_catalog`.

`public.project_commercial_types` queda creada como dominio minimo para definir tipos comerciales permitidos por catalogo, manteniendo separadas las responsabilidades de:

- catalogo rector;
- tipos comerciales parametrizables;
- inventario comercial;
- atributos configurables futuros;
- modelos, familias, variantes y unidades comerciales futuras;
- precios, disponibilidad y reservas futuras;
- tablas legacy.

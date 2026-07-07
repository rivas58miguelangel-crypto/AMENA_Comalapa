# BLOQUE-04 — project_catalog y parametrizacion comercial base

Fecha de ejecucion: 2026-07-07

Chat de ejecucion: Codex AMENA 73

Estado: Ejecutado manualmente en Supabase por aprobacion humana.

Resultado general certificado: Bloque 4 ejecutado correctamente como dominio rector minimo del Catalogo Comercial Parametrizable.

---

## Objetivo del bloque

Crear `public.project_catalog` como dominio rector minimo del Catalogo Comercial Parametrizable por proyecto, alineado con PD-0002 y PD-0003.

El bloque establece el contenedor superior que permite relacionar posteriormente `project_inventory` con un catalogo comercial gobernado, sin disenar precios, disponibilidad avanzada, reservas, variantes comerciales avanzadas, operaciones comerciales, importacion web, escenarios demo, Marta, Vapi ni H-OperIA Intelligence.

---

## Resultados certificados

- `public.project_catalog` creada correctamente.
- Comentarios documentales agregados correctamente.
- Indices de `public.project_catalog` creados correctamente.
- `invalid_project_catalog_references = 0`.
- Constraint `project_inventory_project_catalog_fk = EXISTS`.
- `project_catalog_exists = project_catalog`.

Resultados Supabase reportados por ejecucion humana:

- Creacion de `public.project_catalog`: `Success. No rows returned`
- Comentarios documentales: `Success. No rows returned`
- Indices: `Success. No rows returned`
- FK compuesta: `Success. No rows returned`

---

## Tablas nuevas

- `public.project_catalog`

## Tablas relacionadas

- `public.projects`
- `public.project_inventory`

## Constraint nueva

- `project_inventory_project_catalog_fk`

Relacion:

```text
project_inventory(project_id, project_catalog_id)
-> project_catalog(project_id, id)
```

## Indices creados

- `project_catalog_project_id_idx`
- `project_catalog_project_status_idx`
- `project_catalog_project_visibility_idx`
- `project_catalog_project_mode_idx`

---

## SQL ejecutado

### Micropaso 1: creacion de `public.project_catalog`

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
create table if not exists public.project_catalog (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references public.projects(id) on delete restrict,

  catalog_code text not null,
  catalog_name text not null,
  catalog_description text,

  catalog_status text not null default 'draft',
  public_visibility text not null default 'hidden',

  catalog_mode text not null default 'standard',
  catalog_scope text not null default 'commercial',

  configuration jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,

  data_origin text not null,
  operational_environment text not null,
  legacy_status text not null default 'none',
  notes text,

  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_catalog_project_code_unique unique (project_id, catalog_code),
  constraint project_catalog_project_id_id_unique unique (project_id, id),

  constraint project_catalog_status_check
    check (catalog_status in (
      'draft',
      'in_review',
      'validated',
      'active',
      'inactive',
      'archived',
      'rejected'
    )),

  constraint project_catalog_public_visibility_check
    check (public_visibility in (
      'hidden',
      'preview',
      'public'
    )),

  constraint project_catalog_mode_check
    check (catalog_mode in (
      'standard',
      'segmented',
      'reference_only',
      'future_parametric'
    )),

  constraint project_catalog_scope_check
    check (catalog_scope in (
      'commercial',
      'informational',
      'mixed'
    )),

  constraint project_catalog_data_origin_check
    check (data_origin in (
      'moc_vitrina',
      'fase_04_demo',
      'production',
      'legacy'
    )),

  constraint project_catalog_operational_environment_check
    check (operational_environment in (
      'demo',
      'production',
      'legacy'
    )),

  constraint project_catalog_legacy_status_check
    check (legacy_status in (
      'none',
      'imported',
      'archived',
      'pending_classification'
    )),

  constraint project_catalog_origin_environment_consistency_check
    check (
      (data_origin = 'legacy' and operational_environment = 'legacy')
      or
      (data_origin <> 'legacy' and operational_environment in ('demo', 'production'))
    ),

  constraint project_catalog_legacy_consistency_check
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
comment on table public.project_catalog is
  'Dominio rector del Catalogo Comercial Parametrizable por proyecto. Representa el contenedor superior del catalogo comercial y no sustituye project_inventory, product_types, product_models, product_variants, commercial_units, precios, disponibilidad avanzada ni reservas.';

comment on column public.project_catalog.project_id is
  'Relacion obligatoria con el proyecto propietario del catalogo comercial.';

comment on column public.project_catalog.catalog_code is
  'Identificador funcional unico del catalogo dentro del proyecto.';

comment on column public.project_catalog.catalog_status is
  'Estado de gobernanza documental y validacion del catalogo.';

comment on column public.project_catalog.public_visibility is
  'Control basico de visibilidad publica del catalogo sin sustituir reglas futuras de publicacion comercial.';

comment on column public.project_catalog.catalog_mode is
  'Modo rector inicial del catalogo. No define todavia tipos de producto, modelos, variantes, disponibilidad ni reservas.';

comment on column public.project_catalog.configuration is
  'Configuracion flexible inicial del catalogo sin sustituir futuros dominios normalizados de parametrizacion comercial.';
```

### Micropaso 3: indices

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
create index if not exists project_catalog_project_id_idx
  on public.project_catalog (project_id);

create index if not exists project_catalog_project_status_idx
  on public.project_catalog (project_id, catalog_status);

create index if not exists project_catalog_project_visibility_idx
  on public.project_catalog (project_id, public_visibility);

create index if not exists project_catalog_project_mode_idx
  on public.project_catalog (project_id, catalog_mode);
```

### Micropaso 4: validacion previa

Resultado certificado:

```text
invalid_project_catalog_references = 0
```

SQL ejecutado:

```sql
select
  count(*) as invalid_project_catalog_references
from public.project_inventory pi
where pi.project_catalog_id is not null
  and not exists (
    select 1
    from public.project_catalog pc
    where pc.id = pi.project_catalog_id
      and pc.project_id = pi.project_id
  );
```

### Micropaso 5: FK compuesta

Resultado Supabase:

```text
Success. No rows returned
```

SQL ejecutado:

```sql
do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where c.conname = 'project_inventory_project_catalog_fk'
      and t.relname = 'project_inventory'
      and n.nspname = 'public'
  ) then
    alter table public.project_inventory
      add constraint project_inventory_project_catalog_fk
      foreign key (project_id, project_catalog_id)
      references public.project_catalog (project_id, id)
      on delete restrict;
  end if;
end
$$;
```

### Micropaso 6: verificacion final

Resultado certificado:

```text
project_catalog_exists = project_catalog
project_inventory_project_catalog_fk = EXISTS
```

SQL de verificacion reportado por ejecucion humana:

```sql
select
  to_regclass('public.project_catalog') as project_catalog_exists;

select
  case
    when exists (
      select 1
      from pg_constraint c
      join pg_class t on t.oid = c.conrelid
      join pg_namespace n on n.oid = t.relnamespace
      where c.conname = 'project_inventory_project_catalog_fk'
        and t.relname = 'project_inventory'
        and n.nspname = 'public'
    )
    then 'EXISTS'
    else 'MISSING'
  end as project_inventory_project_catalog_fk;
```

---

## Fuera de alcance

Este bloque no incluyo:

- precios;
- disponibilidad;
- disponibilidad avanzada;
- reservas;
- `product_types`;
- `product_models`;
- `product_variants`;
- `commercial_units`;
- importacion web;
- escenarios demo;
- Marta;
- Vapi;
- H-OperIA Intelligence;
- RLS;
- policies;
- triggers;
- migracion legacy.

---

## Dictamen

Bloque 4 ejecutado correctamente como dominio rector minimo del Catalogo Comercial Parametrizable.

`public.project_catalog` queda creado como contenedor superior del catalogo comercial por proyecto, y `public.project_inventory` queda relacionado mediante la FK compuesta `project_inventory_project_catalog_fk` hacia `(project_id, id)` de `public.project_catalog`.

La ejecucion mantiene la separacion entre:

- identidad del proyecto;
- activos visuales/documentales;
- catalogo comercial rector;
- inventario comercial;
- disponibilidad futura;
- reservas futuras;
- tablas legacy.

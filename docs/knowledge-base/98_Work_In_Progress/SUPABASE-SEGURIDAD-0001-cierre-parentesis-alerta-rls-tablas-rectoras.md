# SUPABASE-SEGURIDAD-0001 - Cierre de parentesis de seguridad por alerta RLS en tablas rectoras

## Estado

Completado y verificado.

Este documento registra el parentesis formal de seguridad abierto durante Codex AMENA 80 para atender una alerta critica del Security Advisor de Supabase sobre tablas expuestas en el esquema `public`.

El parentesis queda cerrado. Codex AMENA 80 puede regresar a su objetivo original sin reactivar Ruta 2, Bloque 6, persistencia ni cambios funcionales.

## Alcance

Proyecto Supabase revisado:

- `amena-demo-03`.

Tablas rectoras auditadas:

- `public.organizations`.
- `public.projects`.
- `public.project_branding`.
- `public.project_assets`.
- `public.project_inventory`.
- `public.project_catalog`.
- `public.project_commercial_types`.

Tabla operacional revisada:

- `public.operational_records`.

Fuera de alcance:

- Correcciones funcionales en aplicaciones.
- Conexion de Ruta 2 a persistencia.
- Inicio de Bloque 6.
- Modificacion de tablas legacy.
- Cambios en default privileges globales de Supabase.
- Pulsar `Resolve issue` en Supabase.

## Origen de la alerta

Supabase Security Advisor reporto una alerta critica asociada a tablas del esquema `public` con RLS deshabilitado y privilegios amplios para roles expuestos.

La alerta fue tratada como un parentesis controlado de seguridad, separado del frente funcional principal. La regla aplicada fue no abrir multiples frentes: se atendio exclusivamente la superficie de seguridad confirmada, sin introducir integraciones nuevas ni cambios de aplicacion.

## Diagnostico vivo certificado

La auditoria viva en Supabase confirmo:

- Las siete tablas rectoras existen.
- Las siete tablas rectoras tenian RLS deshabilitado.
- `anon` y `authenticated` conservaban privilegios amplios sobre esas tablas.
- Las siete tablas rectoras tenian 0 filas.
- `public.operational_records` tenia RLS habilitado.
- `public.operational_records` tenia 0 filas.
- `auth.users` tenia 0 usuarios.
- No existia consumo activo identificado de las siete tablas rectoras.
- La politica `admin_read_operational_records` usaba `app_metadata` y `user_metadata`.
- La referencia a `user_metadata` debia eliminarse por no ser un mecanismo confiable de autorizacion.

## Distincion de dominios

### Tablas rectoras

Las siete tablas rectoras forman parte del modelo nuevo del Plan Maestro SQL y de la futura base parametrizable para empresas, proyectos, identidad, activos, catalogo, inventario y tipos comerciales.

En este momento no deben quedar abiertas a `anon` ni a `authenticated`, porque todavia no existe una capa funcional validada que consuma esos datos ni politicas de pertenencia por empresa/proyecto.

Estado final esperado:

- RLS habilitado.
- Sin politicas permisivas nuevas.
- Sin privilegios efectivos para `anon`.
- Sin privilegios efectivos para `authenticated`.
- `deny-by-default`.

### operational_records

`public.operational_records` es una tabla operacional vigente usada como bitacora/evidencia transversal por el codigo actual. No sustituye dominios canonicos como inventario, catalogo, reservas, pagos, documentos o mensajes.

Estado final esperado:

- RLS permanece habilitado.
- `admin_read_operational_records` usa solo `auth.jwt() -> 'app_metadata' ->> 'role'`.
- Roles futuros admitidos: `admin` y `amena_admin`.
- `user_metadata` queda eliminado completamente de la politica admin.
- `app_vendedoras_insert_operational_records` se conserva.

### Tablas legacy

Las tablas legacy no fueron modificadas durante este parentesis. Cualquier tratamiento futuro de tablas legacy debe hacerse como frente separado, con inventario, clasificacion y pruebas propias.

## SQL de remediacion ejecutado

La remediacion se ejecuto como una sola transaccion `begin` / `commit`.

```sql
begin;

-- Fase A: habilitar RLS en las siete tablas rectoras

alter table public.project_branding enable row level security;
alter table public.organizations enable row level security;
alter table public.projects enable row level security;
alter table public.project_assets enable row level security;
alter table public.project_inventory enable row level security;
alter table public.project_catalog enable row level security;
alter table public.project_commercial_types enable row level security;


-- Fase B: revocar todos los privilegios de anon y authenticated

revoke all privileges on table public.project_branding from anon, authenticated;
revoke all privileges on table public.organizations from anon, authenticated;
revoke all privileges on table public.projects from anon, authenticated;
revoke all privileges on table public.project_assets from anon, authenticated;
revoke all privileges on table public.project_inventory from anon, authenticated;
revoke all privileges on table public.project_catalog from anon, authenticated;
revoke all privileges on table public.project_commercial_types from anon, authenticated;


-- Fase C: no se crean politicas nuevas.
-- Con RLS habilitado y sin politicas permisivas, las siete tablas quedan deny-by-default.


-- Fase D: reemplazar admin_read_operational_records sin user_metadata.
-- Compatibilidad futura: admin y amena_admin via app_metadata.role.

drop policy if exists admin_read_operational_records
on public.operational_records;

create policy admin_read_operational_records
on public.operational_records
as permissive
for select
to authenticated
using (
  auth.jwt() -> 'app_metadata' ->> 'role' in ('admin', 'amena_admin')
);

commit;
```

## Verificacion posterior ejecutada

La verificacion posterior confirmo los puntos siguientes:

1. RLS habilitado en las siete tablas rectoras.
2. Ausencia de privilegios efectivos para `anon` y `authenticated` sobre las siete tablas rectoras.
3. Ausencia de privilegios directos de `PUBLIC` sobre las siete tablas rectoras.
4. Definicion corregida de `admin_read_operational_records`.
5. Conservacion de `app_vendedoras_insert_operational_records`.
6. Conteos en cero para las ocho tablas auditadas.
7. Conteo en cero para `auth.users`.
8. Ausencia de referencias a `user_metadata` en politicas de `public.operational_records`.

Resultado general: todas las verificaciones posteriores resultaron OK.

Consulta de verificacion usada:

```sql
/* 1. RLS habilitado en las siete tablas rectoras */
with target_tables as (
  select *
  from (values
    ('public', 'project_branding'),
    ('public', 'organizations'),
    ('public', 'projects'),
    ('public', 'project_assets'),
    ('public', 'project_inventory'),
    ('public', 'project_catalog'),
    ('public', 'project_commercial_types')
  ) as t(table_schema, table_name)
)
select
  '01_rls_status' as section,
  tt.table_schema,
  tt.table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as force_rls_enabled
from target_tables tt
join pg_namespace n
  on n.nspname = tt.table_schema
join pg_class c
  on c.relnamespace = n.oid
 and c.relname = tt.table_name
 and c.relkind in ('r', 'p')
order by tt.table_schema, tt.table_name;


/* 2. Privilegios de anon y authenticated */
with target_tables as (
  select *
  from (values
    ('public', 'project_branding'),
    ('public', 'organizations'),
    ('public', 'projects'),
    ('public', 'project_assets'),
    ('public', 'project_inventory'),
    ('public', 'project_catalog'),
    ('public', 'project_commercial_types')
  ) as t(table_schema, table_name)
),
target_roles as (
  select *
  from (values
    ('anon'),
    ('authenticated')
  ) as r(role_name)
),
target_privileges as (
  select *
  from (values
    ('SELECT'),
    ('INSERT'),
    ('UPDATE'),
    ('DELETE'),
    ('TRUNCATE'),
    ('REFERENCES'),
    ('TRIGGER')
  ) as p(privilege_name)
),
table_oids as (
  select
    tt.table_schema,
    tt.table_name,
    c.oid
  from target_tables tt
  join pg_namespace n
    on n.nspname = tt.table_schema
  join pg_class c
    on c.relnamespace = n.oid
   and c.relname = tt.table_name
   and c.relkind in ('r', 'p')
)
select
  '02_anon_authenticated_privileges' as section,
  t.table_schema,
  t.table_name,
  r.role_name,
  p.privilege_name,
  has_table_privilege(r.role_name, t.oid, p.privilege_name) as has_privilege
from table_oids t
cross join target_roles r
cross join target_privileges p
order by t.table_schema, t.table_name, r.role_name, p.privilege_name;


/* 3. Definicion corregida de admin_read_operational_records */
select
  '03_admin_read_operational_records' as section,
  p.schemaname as table_schema,
  p.tablename as table_name,
  p.policyname as policy_name,
  p.permissive,
  p.roles,
  p.cmd as command,
  p.qual as using_expression,
  p.with_check as with_check_expression
from pg_policies p
where p.schemaname = 'public'
  and p.tablename = 'operational_records'
  and p.policyname = 'admin_read_operational_records';


/* 4. Conservacion de app_vendedoras_insert_operational_records */
select
  '04_app_vendedoras_insert_operational_records' as section,
  p.schemaname as table_schema,
  p.tablename as table_name,
  p.policyname as policy_name,
  p.permissive,
  p.roles,
  p.cmd as command,
  p.qual as using_expression,
  p.with_check as with_check_expression
from pg_policies p
where p.schemaname = 'public'
  and p.tablename = 'operational_records'
  and p.policyname = 'app_vendedoras_insert_operational_records';


/* 5. Conteos de las ocho tablas */
with target_tables as (
  select *
  from (values
    ('public', 'project_branding'),
    ('public', 'organizations'),
    ('public', 'projects'),
    ('public', 'project_assets'),
    ('public', 'project_inventory'),
    ('public', 'project_catalog'),
    ('public', 'project_commercial_types'),
    ('public', 'operational_records')
  ) as t(table_schema, table_name)
),
table_meta as (
  select
    tt.table_schema,
    tt.table_name,
    c.oid
  from target_tables tt
  join pg_namespace n
    on n.nspname = tt.table_schema
  join pg_class c
    on c.relnamespace = n.oid
   and c.relname = tt.table_name
   and c.relkind in ('r', 'p')
)
select
  '05_table_counts' as section,
  table_schema,
  table_name,
  (
    (
      xpath(
        '/table/row/row_count/text()',
        query_to_xml(
          format(
            'select count(*)::bigint as row_count from %I.%I',
            table_schema,
            table_name
          ),
          false,
          true,
          ''
        )
      )
    )[1]::text
  )::bigint as exact_row_count
from table_meta
order by table_schema, table_name;


/* 6. Ausencia de referencias a user_metadata */
select
  '06_user_metadata_references' as section,
  p.schemaname as table_schema,
  p.tablename as table_name,
  p.policyname as policy_name,
  p.cmd as command,
  p.qual as using_expression,
  p.with_check as with_check_expression,
  (
    concat_ws(' ', p.qual, p.with_check) ilike '%user_metadata%'
  ) as contains_user_metadata
from pg_policies p
where p.schemaname = 'public'
  and p.tablename = 'operational_records'
  and concat_ws(' ', p.qual, p.with_check) ilike '%user_metadata%'
order by p.policyname;
```

## Resultados certificados

### Tablas rectoras protegidas

Las siguientes tablas quedaron protegidas:

- `public.organizations`.
- `public.projects`.
- `public.project_branding`.
- `public.project_assets`.
- `public.project_inventory`.
- `public.project_catalog`.
- `public.project_commercial_types`.

Resultado:

- RLS habilitado: si.
- Politicas permisivas nuevas: ninguna.
- Estado funcional: `deny-by-default`.
- Privilegios efectivos de `anon`: ninguno.
- Privilegios efectivos de `authenticated`: ninguno.
- Privilegios directos de `PUBLIC`: ninguno.
- Filas actuales: 0.

### operational_records

Resultado:

- RLS continua habilitado.
- `admin_read_operational_records` corregida.
- Autorizacion admin basada unicamente en:

```sql
auth.jwt() -> 'app_metadata' ->> 'role'
```

- Roles futuros admitidos:
  - `admin`.
  - `amena_admin`.
- `user_metadata` eliminado completamente.
- `app_vendedoras_insert_operational_records` conservada.
- Filas actuales: 0.

### auth.users

Resultado:

- `auth.users` tiene 0 usuarios.
- No existia riesgo actual de bloquear usuarios administradores reales durante la remediacion.

## Default privileges globales

Los default privileges globales de Supabase no fueron modificados.

Quedaron identificados como deuda tecnica independiente, fuera del alcance de este parentesis de seguridad.

La remediacion se limito a:

- habilitar RLS sobre siete tablas concretas;
- revocar privilegios existentes de `anon` y `authenticated` sobre esas siete tablas;
- reemplazar una politica concreta en `public.operational_records`.

No se ejecutaron cambios globales sobre privilegios por defecto, schemas, ownership, roles ni funciones.

## Regla preventiva

Toda futura tabla creada en esquemas expuestos, especialmente `public`, debe nacer con:

1. RLS habilitado desde su creacion o inmediatamente en el mismo paquete controlado.
2. Privilegios explicitos y minimos.
3. Ausencia de grants amplios a `anon` y `authenticated` salvo justificacion funcional documentada.
4. Politicas RLS especificas por caso de uso.
5. Autorizacion basada en mecanismos confiables, como `app_metadata` controlado por backend o tablas de membresia/roles, no `user_metadata`.
6. Verificacion posterior de Security Advisor y consultas read-only de metadatos.

Cualquier reapertura futura debe disenar politicas explicitas y privilegios minimos. No debe revertirse a RLS deshabilitado ni restaurarse `GRANT ALL` para roles expuestos.

## Trabajo pendiente (fuera del alcance de este paréntesis)

- Revisar la politica global de `ALTER DEFAULT PRIVILEGES` del proyecto.
- Definir una plantilla oficial para creacion segura de nuevas tablas.
- Incorporar esa plantilla a la documentacion doctrinal de Supabase.
- Revisar periodicamente Security Advisor.

## Cierre del parentesis

El parentesis de seguridad queda cerrado.

No se conecto Ruta 2.

No se inicio Bloque 6.

No se reactivo persistencia.

No se modificaron aplicaciones.

No se modificaron tablas legacy.

Codex AMENA 80 puede regresar a su objetivo original.

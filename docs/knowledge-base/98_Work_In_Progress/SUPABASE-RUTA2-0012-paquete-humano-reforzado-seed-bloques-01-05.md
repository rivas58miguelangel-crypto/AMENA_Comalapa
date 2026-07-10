# SUPABASE-RUTA2-0012 - Paquete Humano Reforzado Seed Bloques 01 a 05

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es una version documental reforzada del paquete humano controlado.

No ejecutar todavia.

No copiar a Supabase sin autorizacion humana posterior.

No sustituye una migracion.

No modifica estructura.

No crea constraints nuevos.

No toca Supabase.

No ejecuta SQL.

No inserta, actualiza ni borra datos.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No avanza Bloque 6 funcionalmente.

No crea archivo `.sql` ejecutable.

## 1. Proposito

Preparar una version documental reforzada del paquete humano controlado para una posible ejecucion futura del seed demo/generico de Bloques Supabase 01 a 05.

Este documento deriva de:

- `SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md`;
- `SUPABASE-RUTA2-0009-paquete-humano-controlado-ejecucion-seed-bloques-01-05.md`;
- `SUPABASE-RUTA2-0011-dictamen-refuerzo-preventivo-riesgos-seed-bloques-01-05.md`.

Su objetivo es incorporar prechecks documentales para reducir riesgos antes de cualquier ejecucion futura.

## 2. Relacion con documentos previos

### SUPABASE-RUTA2-0005

Contiene el SQL revisable base.

Decision vigente:

```text
SUPABASE-RUTA2-0005 no debe ejecutarse tal como esta.
```

### SUPABASE-RUTA2-0009

Contiene el paquete humano controlado con propuesta de `BEGIN`, SQL derivado, SELECTs de validacion y `COMMIT` / `ROLLBACK` comentados.

Este documento refuerza ese paquete.

### SUPABASE-RUTA2-0010

Contiene la guia manual para verificar columnas, constraints y FKs reales.

Este documento asume que esa verificacion fue revisada humanamente antes de preparar cualquier ejecucion.

### SUPABASE-RUTA2-0011

Contiene el dictamen de riesgos:

- `organizations.short_name` no muestra unique constraint;
- `projects.code` no muestra unique constraint;
- `project_assets` tiene unique index parcial para un solo asset primario por `project_id + asset_type` cuando `is_primary = true`.

Este documento incorpora esos riesgos como prechecks y criterios de aborto.

## 3. Refuerzo previo para `organizations`

### Consulta previa documental

Antes de insertar o reutilizar una organizacion demo, verificar cuantos registros existen con:

```text
short_name = 'RUTA2-DEMO'
```

Consulta de referencia para revision humana futura:

```sql
select
  count(*) as ruta2_demo_organizations_count
from public.organizations
where short_name = 'RUTA2-DEMO';
```

### Reglas

- Si el conteo es `0`, permitir creacion controlada de organizacion demo.
- Si el conteo es `1`, reutilizarla de forma controlada, siempre que sea claramente demo.
- Si el conteo es mayor que `1`, abortar.
- No crear unique constraint en esta fase.
- No hacer `UPDATE`.
- No hacer `DELETE`.

### Criterio de aborto

```text
Abortar si ruta2_demo_organizations_count > 1.
```

## 4. Refuerzo previo para `projects`

### Consulta previa documental

Antes de insertar o reutilizar el proyecto demo, verificar cuantos proyectos existen con:

```text
organization_id = organizacion demo
code = 'ruta2-demo'
```

Consulta de referencia para revision humana futura:

```sql
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
```

### Reglas

- Si el conteo es `0`, permitir creacion controlada del proyecto demo.
- Si el conteo es `1`, reutilizarlo de forma controlada.
- Si el conteo es mayor que `1`, abortar.
- No crear unique constraint en esta fase.
- No hacer `UPDATE`.
- No hacer `DELETE`.

### Criterio de aborto

```text
Abortar si ruta2_demo_projects_count > 1.
```

## 5. Refuerzo previo para `project_assets`

### Consulta previa documental

Antes de insertar un `hero_image` primario, verificar si ya existe otro asset primario para el mismo proyecto:

```text
project_id = proyecto demo
asset_type = 'hero_image'
is_primary = true
```

Consulta de referencia para revision humana futura:

```sql
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
```

### Reglas

- Si no existe `hero_image` primario, permitir insert controlado.
- Si ya existe un `hero_image` primario para ese proyecto, no insertar otro.
- Si existe uno con otra URL, abortar y documentar.
- Si existen multiples, abortar.
- No hacer `UPDATE`.
- No hacer `DELETE`.
- No reemplazar assets en esta fase.
- No modificar el unique index parcial.

### Criterio de aborto

```text
Abortar si primary_hero_assets_count >= 1 y la decision humana no autoriza un plan separado de reemplazo.
```

## 6. Propuesta de estructura reforzada

La siguiente estructura es documental y revisable.

No debe ejecutarse automaticamente.

No debe copiarse a Supabase sin autorizacion humana posterior.

```sql
-- ============================================================
-- SUPABASE-RUTA2-0012
-- PAQUETE HUMANO REFORZADO - NO EJECUTAR TODAVIA
--
-- Objetivo:
-- Envolver el seed demo/generico de Bloques 01 a 05 con
-- prechecks, transaccion, validacion y decision humana.
-- ============================================================

-- ============================================================
-- 0. PRECHECKS DOCUMENTALES
-- Ejecutar solo si Miguel autoriza una fase futura de prueba
-- controlada. Si algun precheck falla, NO continuar a BEGIN.
-- ============================================================

-- Precheck A: organizations
select
  count(*) as ruta2_demo_organizations_count
from public.organizations
where short_name = 'RUTA2-DEMO';

-- Regla:
-- 0 = permitir creacion controlada
-- 1 = reutilizar controladamente
-- >1 = ABORTAR

-- Precheck B: projects
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

-- Regla:
-- 0 = permitir creacion controlada
-- 1 = reutilizar controladamente
-- >1 = ABORTAR

-- Precheck C: project_assets hero primario
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

-- Regla:
-- 0 = permitir insert de hero_image primario
-- >=1 = ABORTAR o documentar decision separada

-- ============================================================
-- 1. TRANSACCION
-- Iniciar solo si todos los prechecks fueron aceptados
-- humanamente.
-- ============================================================

BEGIN;

-- ============================================================
-- 2. SQL SEED REFORZADO
--
-- Sustituir aqui por una version reforzada del SQL de
-- SUPABASE-RUTA2-0005 que incorpore los criterios anteriores:
--
-- - no continuar si organizations tiene multiples RUTA2-DEMO;
-- - no continuar si projects tiene multiples ruta2-demo;
-- - no insertar hero_image primario si ya existe uno;
-- - no hacer UPDATE;
-- - no hacer DELETE.
-- ============================================================

-- [SQL SEED REFORZADO VA AQUI]

-- ============================================================
-- 3. SELECTS DE VALIDACION
-- Ejecutar dentro de la transaccion antes de decidir COMMIT.
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

-- ============================================================
-- 4. DECISION HUMANA FINAL
--
-- COMMIT debe permanecer comentado hasta que Miguel confirme
-- manualmente que todo fue correcto.
--
-- Si hay cualquier duda, ejecutar ROLLBACK.
-- ============================================================

-- COMMIT;
-- ROLLBACK;
```

## 7. Senales de aborto

Abortar si ocurre cualquiera de estas condiciones:

- duplicados en `organizations` para `short_name = 'RUTA2-DEMO'`;
- duplicados en `projects` para `organization_id + code = 'ruta2-demo'`;
- existe `hero_image` primario con otra URL;
- existe mas de un `hero_image` primario;
- aparece error de FK;
- aparece error de constraint;
- los conteos previos no coinciden con lo esperado;
- los conteos posteriores son inesperados;
- RLS/policies generan duda;
- existe duda humana;
- alguien intenta ejecutar `COMMIT` sin autorizacion explicita;
- alguien intenta hacer `UPDATE` o `DELETE`;
- alguien intenta conectar Ruta 2;
- alguien intenta avanzar Bloque 6.

## 8. Decisiones vigentes

### Ruta 2 sigue desconectada

Ruta 2 sigue desconectada porque poblar datos no equivale a integrar.

La integracion requiere una fase posterior de codigo, lectura, interpretacion y pruebas funcionales.

### Bloque 6 sigue pospuesto

Bloque 6 sigue pospuesto porque primero deben estar Bloques 01 a 05 poblados, coherentes y validados.

### Poblar datos no equivale a integrar

Incluso si en el futuro se ejecuta un seed correctamente, Ruta 2 no estara integrada hasta que su codigo consuma funcionalmente esas tablas.

### Estructura compatible no equivale a ejecucion autorizada

Aunque la estructura parezca compatible, la ejecucion requiere autorizacion humana explicita y separada.

## 9. Acciones explicitamente no realizadas

Durante la creacion de este documento:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos.
- No se actualizaron datos.
- No se borraron datos.
- No se modifico codigo.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se avanzo Bloque 6 funcionalmente.
- No se creo migracion ejecutable.
- No se creo archivo `.sql` ejecutable.
- No se crearon constraints nuevos.

## 10. Conclusion

Este documento reemplaza operativamente a `SUPABASE-RUTA2-0009` como paquete humano recomendado, porque incorpora los refuerzos preventivos definidos en `SUPABASE-RUTA2-0011`.

No autoriza ejecucion.

No debe copiarse a Supabase sin autorizacion posterior.

El siguiente paso seguro es una revision humana de este paquete reforzado antes de decidir si se autoriza preparar una version final de ejecucion controlada.

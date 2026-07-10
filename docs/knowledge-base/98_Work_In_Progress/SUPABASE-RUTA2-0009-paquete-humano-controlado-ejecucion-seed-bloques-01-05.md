# SUPABASE-RUTA2-0009 - Paquete Humano Controlado de Ejecucion Seed Bloques 01 a 05

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es una guia humana revisable.

No es un archivo `.sql`.

No es una migracion ejecutable.

No toca Supabase.

No ejecuta SQL.

No inserta, actualiza ni borra datos.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No avanza Bloque 6 funcionalmente.

El contenido SQL mencionado aqui solo deberia copiarse a Supabase si Miguel autoriza una fase posterior de ejecucion humana controlada.

## 1. Proposito del documento

Transformar documentalmente el SQL revisable de `SUPABASE-RUTA2-0005` en una guia humana de ejecucion controlada.

Este documento responde a la observacion humana de Miguel:

```text
El SQL revisable observado en SUPABASE-RUTA2-0005 contiene CTEs, INSERT INTO,
WHERE NOT EXISTS, ON CONFLICT DO NOTHING, jsonb y SELECT final de conteos,
pero no incluye explicitamente BEGIN, COMMIT ni ROLLBACK.
```

La finalidad de este documento es preparar una envoltura transaccional conceptual y un checklist de control antes de cualquier ejecucion futura.

## 2. Relacion con documentos previos

### SUPABASE-RUTA2-0005

Contiene el SQL revisable de poblacion minima demo/generica para Bloques 01 a 05.

Ese SQL no fue ejecutado.

Ese SQL no debe ejecutarse directamente sin control humano posterior.

### SUPABASE-RUTA2-0006

Define el protocolo documental de ejecucion controlada.

Este documento complementa ese protocolo con una propuesta de paquete humano de ejecucion.

### SUPABASE-RUTA2-0007

Define la revision previa a verificacion humana.

Este documento hereda sus restricciones: verificar antes de ejecutar y no exponer secretos.

### SUPABASE-RUTA2-0008

Registra la evidencia humana visual mas reciente:

- proyecto Supabase observado: `amena-demo-03`;
- schema observado: `public`;
- tablas esperadas aparentemente visibles;
- `organizations` aparece vacia;
- varias tablas aparecen como `UNRESTRICTED` o con RLS disabled;
- no se ejecuto SQL;
- no se modifico Supabase.

## 3. Condiciones minimas antes de copiar SQL a Supabase

Antes de copiar cualquier SQL a Supabase, deben cumplirse todas estas condiciones:

1. Miguel autoriza explicitamente pasar de revision documental a preparacion de ejecucion humana.
2. Se confirma el proyecto Supabase correcto: `amena-demo-03`.
3. Se confirma el schema correcto: `public`.
4. Se confirma que no hay secretos visibles en pantalla o capturas.
5. Se verifican columnas reales de las siete tablas.
6. Se verifican constraints y unique constraints.
7. Se verifican foreign keys.
8. Se verifica estado de RLS/policies.
9. Se confirma si las tablas siguen vacias o si alguna ya tiene datos.
10. Se revisa el SQL de `SUPABASE-RUTA2-0005` contra la estructura real actual.
11. Se decide si el SQL puede usarse tal como esta o debe ajustarse.
12. Se confirma que el dataset sigue siendo demo/generico y sin datos reales.
13. Se confirma plan de rollback o limpieza.
14. Se confirma que Ruta 2 seguira desconectada.
15. Se confirma que Bloque 6 no sera avanzado funcionalmente.

Si cualquiera de estas condiciones falla, no se debe copiar ni ejecutar SQL.

## 4. Checklist humano final antes de ejecucion

Antes de ejecutar cualquier bloque SQL, Miguel debe poder marcar:

- [ ] Estoy en el proyecto Supabase correcto.
- [ ] Estoy en el schema `public`.
- [ ] No estoy copiando secretos al chat.
- [ ] Verifique que `organizations` esta vacia o que el manejo de duplicados esta claro.
- [ ] Verifique conteos de `projects`.
- [ ] Verifique conteos de `project_branding`.
- [ ] Verifique conteos de `project_assets`.
- [ ] Verifique conteos de `project_catalog`.
- [ ] Verifique conteos de `project_commercial_types`.
- [ ] Verifique conteos de `project_inventory`.
- [ ] Verifique columnas reales de todas las tablas.
- [ ] Verifique constraints y FKs.
- [ ] Entiendo el estado de RLS/policies.
- [ ] Lei `SUPABASE-RUTA2-0005`.
- [ ] Lei `SUPABASE-RUTA2-0006`.
- [ ] Lei `SUPABASE-RUTA2-0008`.
- [ ] Tengo evidencia previa capturada.
- [ ] Tengo plan de rollback/limpieza documental.
- [ ] Entiendo que ejecutar SQL no conecta Ruta 2.
- [ ] Entiendo que ejecutar SQL no aplica Bloque 6.
- [ ] Autorizo explicitamente ejecutar la fase controlada.

Sin esta confirmacion humana, no debe ejecutarse nada.

## 5. Propuesta de envoltorio transaccional

La siguiente estructura es una propuesta documental de envoltorio.

No debe ejecutarse automaticamente.

No debe copiarse sin revision humana.

```sql
-- ============================================================
-- PAQUETE HUMANO CONTROLADO - NO EJECUTAR TODAVIA
-- Derivado documentalmente de SUPABASE-RUTA2-0005.
--
-- Este bloque muestra la forma recomendada de envolver el SQL
-- revisable en una transaccion humana controlada.
--
-- COMMIT solo debe ejecutarse si Miguel confirma manualmente
-- que todo fue correcto.
-- ============================================================

BEGIN;

-- ============================================================
-- 1. SQL DERIVADO
-- Pegar aqui el SQL revisable validado de SUPABASE-RUTA2-0005,
-- despues de contrastarlo contra columnas reales, constraints,
-- FKs, RLS/policies y conteos actuales.
-- ============================================================

-- [SQL DERIVADO DE SUPABASE-RUTA2-0005 VA AQUI]

-- ============================================================
-- 2. SELECTS DE VALIDACION
-- Estos SELECTs deben confirmar que la poblacion minima quedo
-- coherente antes de decidir COMMIT.
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
-- 3. DECISION HUMANA
--
-- Si los SELECTs de validacion muestran resultados correctos,
-- Miguel puede autorizar manualmente COMMIT.
--
-- Si algo falla, Miguel debe ejecutar ROLLBACK.
-- ============================================================

-- COMMIT;
-- ROLLBACK;
```

## 6. Nota sobre COMMIT

El `COMMIT` no debe ejecutarse automaticamente.

Debe permanecer comentado o separado hasta que Miguel confirme manualmente:

- que no hubo errores;
- que los conteos tienen sentido;
- que no se insertaron datos reales;
- que no se afectaron datos no demo;
- que las relaciones minimas quedaron coherentes;
- que no se modifico Ruta 2;
- que no se avanzo Bloque 6.

Si existe duda, debe ejecutarse `ROLLBACK`, no `COMMIT`.

## 7. Plan de rollback / limpieza documental

El rollback primario recomendado durante una ejecucion controlada es transaccional:

```text
Si algo falla antes de COMMIT, ejecutar ROLLBACK.
```

Si por error se ejecutara `COMMIT` y luego se detectara un problema, no se debe improvisar un borrado.

En ese caso debe crearse un documento separado de limpieza controlada que:

- identifique registros creados;
- identifique dependencias;
- proponga orden de limpieza;
- evite borrar datos reales;
- requiera aprobacion humana especifica;
- capture evidencia antes y despues.

Orden conceptual de limpieza, solo si se aprobara en otro documento:

```text
project_inventory
-> project_commercial_types
-> project_catalog
-> project_assets
-> project_branding
-> projects
-> organizations
```

Este orden no es SQL de limpieza ni autoriza borrar datos.

## 8. Evidencia que debe capturarse antes

Antes de cualquier ejecucion futura:

- proyecto Supabase visible;
- schema visible;
- lista de tablas;
- conteos de filas previos;
- estado de `organizations`;
- estado de RLS/policies;
- columnas relevantes;
- constraints/FKs visibles;
- SQL final que se propone ejecutar;
- autorizacion humana explicita.

No capturar secretos.

## 9. Evidencia que debe capturarse despues

Despues de una ejecucion futura autorizada:

- resultado de ejecucion;
- errores, si existieron;
- conteos por tabla;
- evidencia de organizacion demo;
- evidencia de proyecto demo;
- evidencia de catalogo demo;
- evidencia de tipos comerciales demo;
- evidencia de inventario demo;
- decision `COMMIT` o `ROLLBACK`;
- confirmacion de que Ruta 2 no fue modificada;
- confirmacion de que Bloque 6 no fue aplicado.

## 10. Senales de aborto

Abortar si:

- el proyecto Supabase no es `amena-demo-03`;
- el schema no es `public`;
- aparecen secretos visibles;
- hay dudas sobre columnas reales;
- hay dudas sobre constraints o FKs;
- RLS/policies no se entienden;
- existen datos previos que podrian duplicarse;
- el SQL de `SUPABASE-RUTA2-0005` no coincide con la estructura actual;
- aparece cualquier error durante la ejecucion;
- los conteos finales son inesperados;
- no hay autorizacion humana explicita para `COMMIT`;
- alguien intenta conectar Ruta 2 en la misma fase;
- alguien intenta avanzar Bloque 6 en la misma fase.

## 11. Por que Ruta 2 sigue desconectada

Ruta 2 sigue desconectada porque:

- la tarea actual es preparar ejecucion humana controlada, no integrar apps;
- Ruta 2 sigue siendo demo manual/generica;
- ejecutar un seed, incluso si fuera autorizado, no modifica codigo;
- el consumo funcional requiere que el codigo lea, interprete y use las tablas;
- aun falta validar que la poblacion minima sea suficiente y segura.

Regla vigente:

```text
Poblar datos no equivale a integrar Ruta 2.
```

## 12. Por que Bloque 6 sigue pospuesto

Bloque 6 sigue pospuesto porque:

- depende de tipos comerciales ya poblados y coherentes;
- no debe aplicarse antes de validar Bloques 01 a 05;
- no debe usarse para ocultar metadata libre;
- no resuelve poblacion minima institucional, catalogo ni inventario;
- aun no existe consumo funcional desde Ruta 2.

Regla vigente:

```text
Primero Bloques 01 a 05 poblados y verificados.
Despues posible integracion Ruta 2.
Solo despues Bloque 6 funcional.
```

## 13. Acciones explicitamente no realizadas

Durante la creacion de este documento:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos.
- No se actualizaron datos.
- No se borraron datos.
- No se modifico codigo.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se creo archivo `.sql`.
- No se creo migracion ejecutable.
- No se avanzo Bloque 6 funcionalmente.

## 14. Conclusion

Este documento no reemplaza a `SUPABASE-RUTA2-0005`.

Este documento no autoriza ejecucion.

Su funcion es preparar el paquete humano controlado que Miguel podria usar como referencia si en una fase posterior autoriza copiar SQL a Supabase.

El siguiente paso correcto no es ejecutar, sino revisar humanamente este paquete y decidir si se autoriza una fase separada de ejecucion controlada.

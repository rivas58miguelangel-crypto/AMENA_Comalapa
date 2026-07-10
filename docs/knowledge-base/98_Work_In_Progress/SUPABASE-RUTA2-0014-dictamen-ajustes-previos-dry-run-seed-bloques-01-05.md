# SUPABASE-RUTA2-0014 - Dictamen de Ajustes Previos al Dry-Run Seed Bloques 01 a 05

Fecha de dictamen documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## 1. Documento revisado

Documento revisado:

`docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0013-paquete-dry-run-rollback-obligatorio-seed-bloques-01-05.md`

Este dictamen registra la revision humana y tecnica realizada por Miguel sobre el paquete dry-run reforzado de poblacion minima demo/generica para Bloques Supabase 01 a 05.

## 2. Resultado

`SUPABASE-RUTA2-0013` queda aprobado como avance tecnico documental.

Sin embargo, `SUPABASE-RUTA2-0013` no queda aprobado para ejecucion todavia, ni siquiera como dry-run.

Antes de cualquier prueba futura con `ROLLBACK` obligatorio, deben incorporarse ajustes documentales adicionales para reducir ambiguedad y riesgo operativo.

## 3. Fortalezas confirmadas

La revision humana confirma que `SUPABASE-RUTA2-0013` mejora sustancialmente `SUPABASE-RUTA2-0012` porque:

- ya no contiene placeholder;
- no incluye `COMMIT` operativo;
- termina con `ROLLBACK` obligatorio;
- incluye prechecks reforzados;
- no usa `UPDATE`;
- no usa `DELETE`;
- no usa `ALTER`;
- no usa `DROP`;
- no crea constraints;
- mantiene Ruta 2 desconectada;
- mantiene Bloque 6 pospuesto;
- se mantiene como documento Markdown revisable;
- no crea archivo `.sql` ejecutable;
- no crea migracion ejecutable.

## 4. Ajuste Requerido 1 - Validaciones Posteriores Especificas de Ruta 2

Las validaciones posteriores incluidas en `SUPABASE-RUTA2-0013` son utiles como primera version, pero todavia son demasiado amplias para una prueba controlada.

El riesgo principal es que algunos conteos se apoyan en filtros generales como:

- `data_origin = 'fase_04_demo'`;
- `operational_environment = 'demo'`;
- `legacy_status = 'none'`.

Estos filtros podrian incluir registros demo no pertenecientes al dataset especifico de Ruta 2 si en el futuro existieran otros datos demo/genericos en las mismas tablas.

Antes de cualquier dry-run futuro, las validaciones posteriores deben enfocarse especificamente en el dataset Ruta 2.

Las validaciones deben comprobar, como minimo:

- `organizations.short_name = 'RUTA2-DEMO'`;
- `projects.code = 'ruta2-demo'`;
- `project_catalog.catalog_code = 'catalogo-ruta2-demo'`;
- relaciones por `organization_id`;
- relaciones por `project_id`;
- relaciones por `project_catalog_id`;
- correspondencia entre proyecto demo, catalogo demo, tipos comerciales demo e inventario demo.

El objetivo no es contar todos los registros demo del ambiente, sino validar que el paquete afectaria exactamente el conjunto Ruta 2 previsto.

### Regla de revision para version ajustada

Una version posterior del dry-run debe reemplazar los conteos amplios por consultas orientadas a identidad y relaciones del dataset Ruta 2.

Los conteos generales podrian conservarse solo como diagnostico secundario, pero no como criterio principal de exito.

## 5. Ajuste Requerido 2 - Regla de Emergencia para ROLLBACK Manual

`SUPABASE-RUTA2-0013` termina con `ROLLBACK` obligatorio.

Sin embargo, antes de cualquier dry-run futuro debe agregarse una regla humana explicita de emergencia:

Si ocurre cualquier error dentro de la transaccion y Supabase no llega al `ROLLBACK` final, Miguel debe ejecutar `ROLLBACK` manualmente antes de hacer cualquier otra cosa.

Esta regla debe quedar visible antes del bloque SQL y tambien cerca del cierre del paquete.

### Regla operativa propuesta

Ante cualquier error, interrupcion, pantalla inesperada, bloqueo del editor SQL, perdida de conexion, duda humana o resultado no entendido:

1. No ejecutar `COMMIT`.
2. No intentar corregir con `UPDATE`.
3. No intentar corregir con `DELETE`.
4. No ejecutar comandos adicionales de modificacion.
5. Ejecutar `ROLLBACK` manualmente si la transaccion sigue abierta.
6. Capturar evidencia del error.
7. Detener la prueba.
8. Volver al analisis documental antes de cualquier nuevo intento.

## 6. Decision sobre SUPABASE-RUTA2-0013

`SUPABASE-RUTA2-0013` no debe ejecutarse todavia.

No debe copiarse a Supabase todavia.

No debe probarse todavia como dry-run.

No debe usarse como base de ejecucion hasta preparar y revisar una version ajustada que incorpore:

- validaciones posteriores especificas del dataset Ruta 2;
- regla explicita de emergencia para `ROLLBACK` manual;
- confirmacion visible de que no existe `COMMIT` operativo;
- confirmacion visible de que Ruta 2 sigue desconectada;
- confirmacion visible de que Bloque 6 sigue pospuesto.

## 7. Decision sobre una version posterior ajustada

Si Miguel lo autoriza posteriormente, conviene preparar una nueva version documental ajustada del paquete dry-run.

Esa version debera derivarse de:

- `SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md`;
- `SUPABASE-RUTA2-0009-paquete-humano-controlado-ejecucion-seed-bloques-01-05.md`;
- `SUPABASE-RUTA2-0011-dictamen-refuerzo-preventivo-riesgos-seed-bloques-01-05.md`;
- `SUPABASE-RUTA2-0012-paquete-humano-reforzado-seed-bloques-01-05.md`;
- `SUPABASE-RUTA2-0013-paquete-dry-run-rollback-obligatorio-seed-bloques-01-05.md`;
- este dictamen `SUPABASE-RUTA2-0014`.

La version ajustada debe seguir siendo Markdown revisable.

No debe convertirse en archivo `.sql` ejecutable.

No debe crear migracion.

No debe autorizar ejecucion por si misma.

## 8. Decisiones Vigentes

Ruta 2 sigue desconectada.

Bloque 6 sigue pospuesto.

Dry-run exitoso no equivale a autorizacion de `COMMIT`.

Poblar datos no equivale a integrar.

Tabla poblada no equivale a consumo funcional por una app.

Solo consumo real en codigo permite declarar que un bloque esta aplicado funcionalmente en Ruta 2.

## 9. Acciones Explicitamente No Realizadas

Durante la creacion de este dictamen:

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

## 10. Proximo Paso Recomendado

El proximo paso recomendado, si Miguel lo autoriza, es preparar una version ajustada del paquete dry-run que sustituya las validaciones posteriores amplias por validaciones especificas del dataset Ruta 2 y que incorpore la regla de emergencia de `ROLLBACK` manual.

Hasta entonces, `SUPABASE-RUTA2-0013` debe permanecer como avance tecnico documental no ejecutable.

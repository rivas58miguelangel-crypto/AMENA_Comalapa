# SUPABASE-RUTA2-0010 - Guia de Verificacion de Columnas, Constraints y FKs Bloques 01 a 05

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es una guia humana de verificacion manual.

No ejecuta SQL.

No toca Supabase.

No inserta, actualiza ni borra datos.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No crea migraciones ejecutables.

No crea archivo `.sql`.

No avanza Bloque 6 funcionalmente.

Su objetivo es que Miguel pueda verificar visualmente en Supabase si el SQL revisable de `SUPABASE-RUTA2-0005` coincide con la estructura real actual antes de autorizar cualquier ejecucion futura.

## 1. Proposito

Preparar una guia manual, tabla por tabla, para validar columnas, constraints y foreign keys de Bloques Supabase 01 a 05.

La guia debe permitir tomar una decision humana antes de copiar cualquier SQL:

```text
OK
ajustar SQL
abortar
```

## 2. Relacion con documentos previos

### SUPABASE-RUTA2-0005

Contiene el SQL revisable de poblacion minima demo/generica.

Esta guia verifica si ese SQL coincide con la estructura real actual.

### SUPABASE-RUTA2-0006

Define el protocolo documental de ejecucion controlada.

Esta guia aporta una verificacion previa especifica de columnas, constraints y FKs.

### SUPABASE-RUTA2-0007

Define la revision previa a verificacion humana.

Esta guia convierte esa revision en una lista tecnica tabla por tabla.

### SUPABASE-RUTA2-0008

Registra evidencia humana visual en Supabase:

- proyecto observado: `amena-demo-03`;
- schema observado: `public`;
- tablas visibles;
- `organizations` vacia;
- alerta sobre `UNRESTRICTED` / RLS disabled.

### SUPABASE-RUTA2-0009

Prepara un paquete humano controlado con propuesta de `BEGIN`, SQL derivado, SELECTs de validacion y `COMMIT` / `ROLLBACK` comentados.

Esta guia debe ejecutarse documentalmente antes de usar ese paquete.

## 3. Tablas a verificar

Tablas incluidas:

- `public.organizations`
- `public.projects`
- `public.project_branding`
- `public.project_assets`
- `public.project_catalog`
- `public.project_commercial_types`
- `public.project_inventory`

## 4. `public.organizations`

### Columnas que el SQL intenta usar

- `name`
- `legal_name`
- `short_name`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `name` acepta texto y es requerida.
- [ ] `legal_name` existe y puede ser nullable.
- [ ] `short_name` existe.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.
- [ ] `notes` existe.
- [ ] La tabla esta vacia o se entiende como evitar duplicado `RUTA2-DEMO`.

### Constraints / unique esperados

Esperados por Bloque 01:

- check de `data_origin`;
- check de `operational_environment`;
- check de `legacy_status`;
- check de coherencia origen/ambiente;
- check de coherencia legacy.

No se documento unique sobre `short_name`.

### FKs esperadas

No aplica. `organizations` es raiz institucional.

### Riesgos si algo no coincide

- Si `short_name` no existe, el SQL no puede detectar duplicados como esta.
- Si `fase_04_demo` no esta permitido, el SQL fallara.
- Si `organizations` ya tiene datos no revisados, podria haber duplicidad conceptual.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 5. `public.projects`

### Columnas que el SQL intenta usar

- `organization_id`
- `name`
- `code`
- `description`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `organization_id` existe y apunta a `organizations`.
- [ ] `name` acepta texto y es requerida.
- [ ] `code` existe.
- [ ] `description` existe.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.
- [ ] `notes` existe.
- [ ] No existe ya un proyecto `ruta2-demo` o, si existe, esta entendido.

### Constraints / unique esperados

Esperados por Bloque 01:

- checks de origen, ambiente y legacy;
- checks de coherencia.

No se documento unique sobre `code`.

### FKs esperadas

- `projects.organization_id -> organizations.id`

### Riesgos si algo no coincide

- Si no existe FK a `organizations`, la cadena base queda debil.
- Si `code` no existe, el SQL debe ajustarse.
- Si hay proyectos previos no revisados, podria duplicarse la raiz demo.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 6. `public.project_branding`

### Columnas que el SQL intenta usar

- `project_id`
- `brand_name`
- `public_project_name`
- `tagline`
- `short_description`
- `primary_color`
- `secondary_color`
- `accent_color`
- `background_color`
- `text_color`
- `branding_status`
- `public_visibility`
- `theme_tokens`
- `public_copy`
- `navigation_config`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `project_id` existe y apunta a `projects`.
- [ ] Colores aceptan formato `#RRGGBB`.
- [ ] `branding_status` permite `validated`.
- [ ] `public_visibility` permite `preview`.
- [ ] Campos JSON existen y aceptan JSONB.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.

### Constraints / unique esperados

Esperados por Bloque 02:

- unique sobre `project_id`;
- checks de estado;
- checks de visibilidad;
- checks de color;
- checks de origen, ambiente y legacy.

### FKs esperadas

- `project_branding.project_id -> projects.id`

### Riesgos si algo no coincide

- Si no existe unique sobre `project_id`, `on conflict (project_id)` podria fallar.
- Si colores o estados difieren, el SQL debe ajustarse.
- Si JSONB no coincide, fallaran `theme_tokens`, `public_copy` o `navigation_config`.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 7. `public.project_assets`

### Columnas que el SQL intenta usar

- `project_id`
- `asset_type`
- `asset_purpose`
- `asset_context`
- `title`
- `description`
- `alt_text`
- `storage_provider`
- `asset_reference`
- `thumbnail_reference`
- `sort_order`
- `is_primary`
- `is_public`
- `asset_status`
- `metadata`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `project_id` existe y apunta a `projects`.
- [ ] `asset_type` permite `hero_image`.
- [ ] `asset_purpose` permite `public_experience`.
- [ ] `asset_context` permite `public_reservations`.
- [ ] `storage_provider` permite `external_url`.
- [ ] `asset_status` permite `validated`.
- [ ] `metadata` existe y acepta JSONB.
- [ ] `is_primary` e `is_public` existen como boolean.
- [ ] `sort_order` existe y acepta entero.

### Constraints / unique esperados

Esperados por Bloque 02:

- checks de `asset_type`;
- checks de `asset_purpose`;
- checks de `asset_context`;
- checks de `storage_provider`;
- checks de `asset_status`;
- checks de origen, ambiente y legacy;
- unique parcial de un primary por tipo/proyecto.

### FKs esperadas

- `project_assets.project_id -> projects.id`

### Riesgos si algo no coincide

- Si no existe `public_reservations`, el SQL debe ajustar `asset_context`.
- Si `external_url` no esta permitido, debe ajustarse `storage_provider`.
- Si el unique parcial no existe, no bloquea necesariamente el SQL, pero cambia el riesgo de duplicidad.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 8. `public.project_catalog`

### Columnas que el SQL intenta usar

- `project_id`
- `catalog_code`
- `catalog_name`
- `catalog_description`
- `catalog_status`
- `public_visibility`
- `catalog_mode`
- `catalog_scope`
- `configuration`
- `metadata`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `project_id` existe y apunta a `projects`.
- [ ] `catalog_code` existe.
- [ ] `catalog_status` permite `validated`.
- [ ] `public_visibility` permite `preview`.
- [ ] `catalog_mode` permite `standard`.
- [ ] `catalog_scope` permite `commercial`.
- [ ] `configuration` y `metadata` aceptan JSONB.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.

### Constraints / unique esperados

Esperados por Bloque 04:

- unique `(project_id, catalog_code)`;
- unique `(project_id, id)`;
- checks de estado, visibilidad, modo y alcance;
- checks de origen, ambiente y legacy.

### FKs esperadas

- `project_catalog.project_id -> projects.id`

### Riesgos si algo no coincide

- Si no existe unique `(project_id, catalog_code)`, `on conflict (project_id, catalog_code)` fallara.
- Si `project_id, id` no es unique, podrian fallar FKs compuestas posteriores.
- Si valores de estado o scope difieren, debe ajustarse SQL.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 9. `public.project_commercial_types`

### Columnas que el SQL intenta usar

- `project_id`
- `project_catalog_id`
- `type_code`
- `type_name`
- `type_description`
- `commercial_domain`
- `type_status`
- `public_visibility`
- `sort_order`
- `metadata`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `project_id` existe.
- [ ] `project_catalog_id` existe.
- [ ] `type_code` existe.
- [ ] `commercial_domain` permite `real_estate`, `service` y `course`.
- [ ] `type_status` permite `validated`.
- [ ] `public_visibility` permite `preview`.
- [ ] `sort_order` existe y acepta entero.
- [ ] `metadata` existe y acepta JSONB.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.

### Constraints / unique esperados

Esperados por Bloque 05:

- unique `(project_catalog_id, type_code)`;
- checks de `commercial_domain`;
- checks de `type_status`;
- checks de `public_visibility`;
- check de `sort_order`;
- checks de origen, ambiente y legacy.

### FKs esperadas

- `project_commercial_types(project_id, project_catalog_id) -> project_catalog(project_id, id)`

### Riesgos si algo no coincide

- Si no existe unique `(project_catalog_id, type_code)`, `on conflict` fallara.
- Si la FK compuesta no existe, la coherencia catalogo/tipos debe revisarse.
- Si `course` no esta permitido, el SQL debe ajustar el tipo educativo.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 10. `public.project_inventory`

### Columnas que el SQL intenta usar

- `project_id`
- `project_catalog_id`
- `inventory_code`
- `inventory_name`
- `inventory_type`
- `commercial_category`
- `short_description`
- `location_label`
- `inventory_status`
- `commercial_status`
- `public_visibility`
- `selection_mode`
- `attributes`
- `metadata`
- `data_origin`
- `operational_environment`
- `legacy_status`
- `notes`

### Que debe revisar Miguel

- [ ] La tabla existe.
- [ ] Las columnas anteriores existen.
- [ ] `project_id` existe y apunta a `projects`.
- [ ] `project_catalog_id` existe.
- [ ] `inventory_code` existe.
- [ ] `inventory_type` permite `unit`, `service` y `course`.
- [ ] `inventory_status` permite `validated`.
- [ ] `commercial_status` permite `not_applicable`.
- [ ] `public_visibility` permite `preview`.
- [ ] `selection_mode` permite `reference_only`.
- [ ] `attributes` y `metadata` aceptan JSONB.
- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.

### Constraints / unique esperados

Esperados por Bloque 03:

- unique `(project_id, inventory_code)`;
- checks de `inventory_type`;
- checks de `inventory_status`;
- checks de `commercial_status`;
- checks de `public_visibility`;
- checks de `selection_mode`;
- checks de origen, ambiente y legacy.

Esperado por Bloque 04, si fue aplicado:

- FK compuesta de `project_inventory(project_id, project_catalog_id)` hacia `project_catalog(project_id, id)`.

### FKs esperadas

- `project_inventory.project_id -> projects.id`
- `project_inventory(project_id, project_catalog_id) -> project_catalog(project_id, id)`, si existe en Supabase real.

### Riesgos si algo no coincide

- Si no existe `project_catalog_id`, el SQL no puede vincular inventario al catalogo.
- Si no existe FK compuesta, debe decidirse si se ejecuta igual o se aborta.
- Si `course` no esta permitido como `inventory_type`, debe ajustarse el registro educativo.
- Si `reference_only` no esta permitido, debe ajustarse `selection_mode`.
- Si `commercial_type_code` queda solo en metadata, debe tratarse como auxiliar transitorio, no fuente final de verdad.

### Decision humana posible

```text
OK / ajustar SQL / abortar
```

## 11. Checklist final antes de copiar cualquier SQL

Antes de copiar cualquier SQL:

- [ ] Se revisaron las siete tablas.
- [ ] Todas las columnas usadas por el SQL existen.
- [ ] Todos los valores propuestos son aceptados por constraints.
- [ ] Todos los `on conflict` tienen unique constraint compatible.
- [ ] Todas las FKs esperadas fueron verificadas o la diferencia fue documentada.
- [ ] RLS/policies fueron observadas y entendidas.
- [ ] Se confirmo si las tablas estan vacias o tienen datos.
- [ ] No hay datos reales de clientes involucrados.
- [ ] No hay precios reales.
- [ ] No hay disponibilidad real.
- [ ] No hay reservas reales.
- [ ] El SQL fue ajustado si hubo diferencias.
- [ ] Miguel autoriza explicitamente pasar a preparacion de ejecucion.

## 12. Senales de aborto

Abortar si:

- falta una columna usada por el SQL;
- falta un unique requerido por `on conflict`;
- falta una FK critica;
- los valores propuestos no pasan checks;
- hay datos existentes que no se entienden;
- RLS/policies generan incertidumbre;
- hay riesgo de tocar datos reales;
- no se puede capturar evidencia sin secretos;
- se intenta ejecutar sin autorizacion humana explicita;
- se intenta conectar Ruta 2;
- se intenta avanzar Bloque 6.

## 13. Evidencia visual o textual a capturar

Evidencia recomendada:

- nombre del proyecto Supabase;
- schema;
- lista de tablas;
- columnas por tabla;
- conteo de filas por tabla;
- constraints visibles;
- FKs visibles;
- estado RLS/policies;
- observaciones sobre datos existentes;
- decision por tabla: `OK`, `ajustar SQL` o `abortar`;
- fecha y hora;
- responsable humano.

No capturar:

- claves;
- tokens;
- secretos;
- variables de entorno;
- datos sensibles innecesarios.

## 14. Ruta 2 sigue desconectada

Ruta 2 sigue desconectada porque esta guia solo verifica estructura.

Aunque todas las tablas fueran compatibles, todavia haria falta:

- ejecutar una poblacion minima aprobada;
- validar resultados;
- decidir una fase posterior de integracion;
- modificar codigo en una tarea separada y autorizada;
- probar consumo funcional.

Regla vigente:

```text
Verificar estructura no equivale a conectar Ruta 2.
```

## 15. Bloque 6 sigue pospuesto

Bloque 6 sigue pospuesto porque esta guia solo cubre Bloques 01 a 05.

Bloque 6 no debe avanzar hasta que:

- Bloques 01 a 05 esten verificados;
- la poblacion minima este aprobada y ejecutada, si se autoriza;
- los datos base sean coherentes;
- exista una decision posterior sobre integracion Ruta 2;
- se evite usar atributos como sustituto de catalogo, tipos o inventario.

Regla vigente:

```text
Primero estructura y poblacion minima de Bloques 01 a 05.
Despues, si procede, integracion Ruta 2.
Solo despues Bloque 6 funcional.
```

## 16. Acciones explicitamente no realizadas

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

## 17. Conclusion

Esta guia debe usarse antes de copiar cualquier SQL a Supabase.

Si todas las tablas pasan verificacion, el siguiente paso podria ser revisar el paquete humano controlado `SUPABASE-RUTA2-0009`.

Si alguna tabla no coincide, el siguiente paso correcto es ajustar `SUPABASE-RUTA2-0005` documentalmente o abortar la ejecucion futura.

No procede ejecutar SQL hasta completar esta guia y recibir autorizacion humana expresa.

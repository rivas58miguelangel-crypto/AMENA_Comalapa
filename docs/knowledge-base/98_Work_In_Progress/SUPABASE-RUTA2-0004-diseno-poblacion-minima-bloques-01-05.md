# SUPABASE-RUTA2-0004 - Diseno de Poblacion Minima Bloques 01 a 05

Fecha de diseno documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: diseno conceptual revisable. No constituye SQL ejecutable, migracion, insercion de datos ni autorizacion para tocar Supabase, Ruta 2 o Reservas tradicional.

## 1. Proposito del documento

Definir el diseno conceptual de una poblacion minima controlada para las tablas de Bloques Supabase 01 a 05, con el fin de preparar una futura integracion Ruta 2 -> Supabase sin conectar la app contra tablas vacias.

Este documento describe que datos demo/genericos deberian existir antes de escribir SQL revisable. No ejecuta SQL, no inserta datos y no modifica Supabase.

## 2. Contexto certificado

Las tablas esperadas de Bloques 01 a 05 aparentemente existen en Supabase.

Segun verificacion manual humana registrada en `SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`, las tablas revisadas estan vacias.

Ruta 2 no debe conectarse contra tablas vacias porque no tendria datos suficientes para sostener identidad, catalogo, tipos comerciales ni inventario base.

Antes de cualquier integracion se necesita una poblacion minima controlada.

Este documento no ejecuta SQL ni autoriza tocar Supabase. Su funcion es preparar el diseno que luego podria convertirse en SQL revisable, solo con autorizacion humana posterior.

## 3. Principio rector

La poblacion minima debe cumplir estos principios:

- poblar solo lo minimo necesario;
- mantener datos genericos/demo;
- evitar datos sensibles o reales sin autorizacion;
- no contaminar produccion;
- preservar trazabilidad de origen, ambiente y estado;
- permitir que Ruta 2 pueda probar una integracion futura sin romper la experiencia comercial;
- no reemplazar aun la demo manual de Ruta 2;
- no incorporar Bloque 6 todavia;
- no adelantar precios reales, disponibilidad real, modelos avanzados ni variantes comerciales.

Lectura operativa:

```text
Primero datos base demo y coherentes.
Despues SQL revisable.
Despues aprobacion humana.
Solo despues poblacion controlada.
Finalmente se evalua integracion Ruta 2.
```

## 4. Entidades minimas a poblar

Entidades minimas:

- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`;
- `project_catalog`;
- `project_commercial_types`;
- `project_inventory`.

Secuencia conceptual:

```text
organizations
-> projects
-> project_branding
-> project_assets
-> project_catalog
-> project_commercial_types
-> project_inventory
```

## 5. `organizations`

### Objetivo

Crear una organizacion demo/generica que funcione como raiz institucional para el proyecto demo que Ruta 2 podria consumir despues.

### Datos minimos necesarios

- Nombre generico.
- Nombre legal generico.
- `short_name`.
- Origen de datos demo.
- Ambiente demo.
- Estado legacy `none`.
- Notas que indiquen que es registro demo.

### Campos esperados segun Bloque 01

Campos relevantes:

- `name`;
- `legal_name`;
- `short_name`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

Valores conceptuales compatibles:

- `data_origin`: `fase_04_demo` o valor demo permitido por la tabla.
- `operational_environment`: `demo`.
- `legacy_status`: `none`.

### Ejemplo conceptual de contenido

```text
name: Operador Demo Ruta 2
legal_name: Operador Demo Ruta 2 S.A. de C.V. (generico)
short_name: RUTA2-DEMO
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
notes: Registro demo/generico para validar integracion futura de Ruta 2.
```

### Dependencias

No depende de otras tablas.

Debe existir antes de `projects`.

### Riesgos

- Usar datos reales de cliente sin autorizacion.
- Reutilizar identidad de AMENA original.
- Marcar ambiente incorrectamente como produccion.

### Criterios de validacion

- Existe una sola organizacion demo claramente identificable.
- No contiene datos sensibles.
- Su ambiente es `demo`.
- Puede referenciarse desde un proyecto demo.

## 6. `projects`

### Objetivo

Crear un proyecto demo/generico vinculado a la organizacion demo, sin amarrarlo a AMENA original.

### Datos minimos necesarios

- `organization_id` de la organizacion demo.
- Nombre generico del proyecto.
- Codigo o identificador funcional.
- Descripcion breve.
- Origen demo.
- Ambiente demo.
- Estado legacy `none`.

### Campos esperados segun Bloque 01

Campos relevantes:

- `organization_id`;
- `name`;
- `code`;
- `description`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

### Ejemplo conceptual de contenido

```text
name: Distrito Demo Ruta 2
code: ruta2-demo
description: Proyecto generico para validar experiencia comercial Ruta 2 sin datos de cliente real.
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
notes: Proyecto demo minimo para futura integracion Ruta 2.
```

### Dependencias

Depende de:

- `organizations.id`.

Debe existir antes de `project_branding`, `project_assets`, `project_catalog` y `project_inventory`.

### Riesgos

- Usar un nombre de proyecto real no autorizado.
- Confundir proyecto demo con proyecto productivo.
- Omitir `organization_id`.

### Criterios de validacion

- Esta vinculado a una organizacion demo.
- Tiene codigo estable y legible.
- No usa identidad de AMENA original.
- Puede actuar como raiz para branding, assets, catalogo e inventario.

## 7. `project_branding`

### Objetivo

Crear una identidad visual minima para que Ruta 2 pueda probar lectura de branding gobernado en una fase posterior.

### Datos minimos necesarios

- `project_id` del proyecto demo.
- Nombre de marca generico.
- Nombre publico del proyecto.
- Tagline generico.
- Colores en formato hexadecimal.
- Estado activo o validado segun se decida.
- Visibilidad `preview` o `public` segun criterio posterior.
- JSON minimo para tokens/copy si aplica.
- Origen demo y ambiente demo.

### Campos esperados segun Bloque 02

Campos relevantes:

- `project_id`;
- `brand_name`;
- `public_project_name`;
- `tagline`;
- `short_description`;
- `primary_color`;
- `secondary_color`;
- `accent_color`;
- `background_color`;
- `text_color`;
- `branding_status`;
- `public_visibility`;
- `theme_tokens`;
- `public_copy`;
- `navigation_config`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

### Ejemplo conceptual de contenido

```text
brand_name: Ruta 2 Demo
public_project_name: Distrito Demo
tagline: Vive tu proxima etapa
short_description: Experiencia demo generica para exploracion comercial.
primary_color: #1e5d8c
secondary_color: #8b847e
accent_color: #d0833b
background_color: #f2f2eb
text_color: #1f2933
branding_status: active
public_visibility: preview
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
```

### Dependencias

Depende de:

- `projects.id`.

### Riesgos

- Usar marcas reales sin autorizacion.
- Crear colores o textos que contradigan la experiencia visual actual sin validacion.
- Marcar visibilidad publica sin entender RLS/policies.

### Criterios de validacion

- Existe un branding por proyecto demo.
- Los colores cumplen formato hexadecimal.
- No contiene marca sensible.
- Puede funcionar como fallback visual gobernado para pruebas futuras.

## 8. `project_assets`

### Objetivo

Crear assets minimos demo o referencias placeholder para que Ruta 2 pueda probar lectura de recursos visuales sin depender de imagenes reales de cliente.

### Datos minimos necesarios

- `project_id`.
- Tipo de asset.
- Proposito.
- Contexto.
- Titulo.
- Texto alternativo.
- `storage_provider`.
- Referencia del asset.
- Estado.
- Indicador de publicacion si corresponde.
- Origen demo y ambiente demo.

### Campos esperados segun Bloque 02

Campos relevantes:

- `project_id`;
- `asset_type`;
- `asset_purpose`;
- `asset_context`;
- `title`;
- `description`;
- `alt_text`;
- `storage_provider`;
- `asset_reference`;
- `thumbnail_reference`;
- `sort_order`;
- `is_primary`;
- `is_public`;
- `asset_status`;
- `metadata`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

### Ejemplo conceptual de contenido

```text
asset_type: hero_image
asset_purpose: public_experience
asset_context: public_reservations
title: Imagen principal demo Ruta 2
alt_text: Vista generica de proyecto demo
storage_provider: external_url o future_storage, segun decision posterior
asset_reference: placeholder seguro aprobado
sort_order: 0
is_primary: true
is_public: true
asset_status: active
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
```

### Dependencias

Depende de:

- `projects.id`.

### Riesgos

- Usar imagenes con derechos dudosos.
- Usar imagenes de clientes reales.
- Exponer URLs privadas o no gobernadas.
- Confundir assets de proyecto con inventario comercial.

### Criterios de validacion

- Los assets son demo o placeholders autorizados.
- Tienen proposito y contexto claros.
- Al menos un asset puede usarse para experiencia publica o preview.
- No contienen datos sensibles.

## 9. `project_catalog`

### Objetivo

Crear un catalogo comercial minimo que actue como contenedor rector para tipos comerciales e inventario base.

### Datos minimos necesarios

- `project_id`.
- Codigo de catalogo.
- Nombre.
- Descripcion.
- Estado activo o validado.
- Visibilidad `preview` o `public` segun autorizacion posterior.
- Modo estandar.
- Alcance comercial.
- Configuracion y metadata iniciales.
- Origen demo y ambiente demo.

### Campos esperados segun Bloque 04

Campos relevantes:

- `project_id`;
- `catalog_code`;
- `catalog_name`;
- `catalog_description`;
- `catalog_status`;
- `public_visibility`;
- `catalog_mode`;
- `catalog_scope`;
- `configuration`;
- `metadata`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

### Ejemplo conceptual de contenido

```text
catalog_code: ruta2-demo-catalog
catalog_name: Catalogo Demo Ruta 2
catalog_description: Catalogo generico para validar integracion futura de Ruta 2.
catalog_status: active
public_visibility: preview
catalog_mode: standard
catalog_scope: commercial
configuration: {}
metadata: { "demo_purpose": "route_2_preintegration" }
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
```

### Dependencias

Depende de:

- `projects.id`.

Debe existir antes de:

- `project_commercial_types`;
- relacion compuesta de `project_inventory` hacia catalogo.

### Riesgos

- Crear catalogo sin proyecto.
- Usar metadata como sustituto de tipos comerciales.
- Marcarlo como productivo.
- Crear mas catalogos de los necesarios para la primera prueba.

### Criterios de validacion

- Un catalogo demo identificable por proyecto.
- Estado utilizable.
- Visibilidad controlada.
- Relacion coherente con proyecto.

## 10. `project_commercial_types`

### Objetivo

Crear tipos comerciales minimos, genericos y multiindustria para que Ruta 2 pueda probar el reemplazo gradual de tipos hardcoded sin quedar rigidamente inmobiliaria.

### Datos minimos necesarios

- `project_id`.
- `project_catalog_id`.
- Codigo de tipo.
- Nombre visible.
- Descripcion.
- Dominio comercial.
- Estado activo o validado.
- Visibilidad controlada.
- Orden.
- Metadata auxiliar.
- Origen demo y ambiente demo.

### Campos esperados segun Bloque 05

Campos relevantes:

- `project_id`;
- `project_catalog_id`;
- `type_code`;
- `type_name`;
- `type_description`;
- `commercial_domain`;
- `type_status`;
- `public_visibility`;
- `sort_order`;
- `metadata`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

### Ejemplo conceptual de contenido

Tipos candidatos:

```text
type_code: residencia-demo
type_name: Residencia demo
commercial_domain: real_estate
type_status: active
public_visibility: preview
```

```text
type_code: lote-demo
type_name: Lote demo
commercial_domain: real_estate
type_status: active
public_visibility: preview
```

```text
type_code: servicio-demo
type_name: Servicio demo
commercial_domain: service
type_status: active
public_visibility: preview
```

La combinacion debe mantenerse generica. No debe convertir Ruta 2 en un modelo exclusivamente inmobiliario.

### Dependencias

Depende de:

- `projects.id`;
- `project_catalog(project_id, id)`.

### Riesgos

- Crear solo tipos inmobiliarios y bloquear el objetivo multiindustria.
- Confundir tipo comercial con modelo/familia.
- Adelantar atributos de Bloque 6.
- Usar metadata para esconder atributos normalizables.

### Criterios de validacion

- Al menos dos o tres tipos demo.
- Relacion correcta con catalogo.
- Estado utilizable.
- Nombres genericos sin datos de cliente.
- Dominio comercial compatible con checks de Bloque 05.

## 11. `project_inventory`

### Objetivo

Crear pocos registros de inventario base demo para que una fase posterior pueda probar listado, seleccion o referencia comercial desde Ruta 2 sin depender aun de precios reales, disponibilidad real ni modelos avanzados.

### Datos minimos necesarios

- `project_id`.
- `project_catalog_id`.
- Codigo de inventario.
- Nombre visible.
- Tipo de inventario.
- Categoria comercial.
- Descripcion corta.
- Ubicacion o etiqueta generica si aplica.
- Estado activo o validado.
- Estado comercial basico.
- Visibilidad controlada.
- Modo de seleccion.
- Atributos JSON minimos solo si son necesarios y gobernados.
- Metadata auxiliar.
- Origen demo y ambiente demo.

### Campos esperados segun Bloque 03 y Bloque 04

Campos relevantes:

- `project_id`;
- `project_catalog_id`;
- `inventory_code`;
- `inventory_name`;
- `inventory_type`;
- `commercial_category`;
- `short_description`;
- `location_label`;
- `inventory_status`;
- `commercial_status`;
- `public_visibility`;
- `selection_mode`;
- `attributes`;
- `metadata`;
- `data_origin`;
- `operational_environment`;
- `legacy_status`;
- `notes`.

Nota conceptual:

Bloque 05 no modifico `project_inventory`. Por tanto, el vinculo directo a `project_commercial_types` no debe asumirse como columna fisica hasta verificar columnas reales o aprobar un bloque posterior. Para esta etapa, cualquier relacion con tipo comercial debe tratarse como conceptual o metadata auxiliar gobernada, no como FK inventada.

### Ejemplo conceptual de contenido

```text
inventory_code: demo-res-001
inventory_name: Residencia Demo 01
inventory_type: unit
commercial_category: residencia-demo
short_description: Unidad demo para validar listado comercial generico.
location_label: Sector Demo
inventory_status: active
commercial_status: available
public_visibility: preview
selection_mode: reference_only o selectable, segun decision posterior
attributes: {}
metadata: { "commercial_type_code": "residencia-demo" }
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
```

```text
inventory_code: demo-serv-001
inventory_name: Servicio Demo 01
inventory_type: service
commercial_category: servicio-demo
short_description: Servicio demo para validar comportamiento no inmobiliario.
location_label: Modalidad demo
inventory_status: active
commercial_status: not_applicable
public_visibility: preview
selection_mode: reference_only
attributes: {}
metadata: { "commercial_type_code": "servicio-demo" }
data_origin: fase_04_demo
operational_environment: demo
legacy_status: none
```

### Dependencias

Depende de:

- `projects.id`;
- `project_catalog(project_id, id)` si se usa `project_catalog_id`.

No debe depender todavia de Bloque 6.

### Riesgos

- Insertar inventario sin catalogo.
- Inventar columna `commercial_type_id` si no existe.
- Tratar `metadata` como modelo final.
- Introducir precios definitivos.
- Introducir disponibilidad real.
- Crear demasiados registros antes de validar integracion.

### Criterios de validacion

- Pocos registros demo.
- Relacion coherente con proyecto y catalogo.
- Estados y visibilidad compatibles con pruebas.
- Sin precios reales.
- Sin disponibilidad real.
- Sin datos sensibles.
- Suficiente para que Ruta 2 pueda listar opciones en una fase posterior.

## 12. Datos que no deben incluirse

No incluir:

- datos personales;
- datos sensibles;
- precios reales no autorizados;
- disponibilidad real;
- datos de clientes;
- imagenes con derechos dudosos;
- informacion de AMENA original si el objetivo es demo generico;
- atributos de Bloque 6;
- modelos/familias avanzadas;
- variantes comerciales;
- unidades comerciales productivas;
- reglas de reserva;
- pagos;
- datos legacy importados sin clasificacion.

## 13. Secuencia de poblacion recomendada

Secuencia recomendada para un futuro SQL revisable:

1. `organizations`.
2. `projects`.
3. `project_branding`.
4. `project_assets`.
5. `project_catalog`.
6. `project_commercial_types`.
7. `project_inventory`.

La secuencia debe respetar dependencias. No debe insertarse inventario antes de tener proyecto y catalogo.

## 14. Validaciones antes de escribir SQL

Antes de escribir SQL revisable, confirmar:

- columnas exactas de cada tabla;
- constraints vigentes;
- foreign keys vigentes;
- checks de valores permitidos;
- si `project_inventory_project_catalog_fk` existe en Supabase real;
- si `project_commercial_types_catalog_fk` existe en Supabase real;
- RLS/policies;
- si se permite lectura publica o requiere capa segura;
- si el ambiente demo debe distinguirse por `data_origin`, `operational_environment`, estados o metadata;
- si los nombres/codigos demo son aceptables;
- si se necesita rollback o limpieza;
- si la poblacion minima debe ser idempotente;
- si se usaran UUID generados por Supabase o valores controlados;
- si los assets placeholder seran URLs externas, storage futuro o referencias internas.

## 15. Riesgos

Riesgos principales:

1. Poblar con estructura equivocada.
2. Crear datos imposibles de consumir.
3. Mezclar demo y produccion.
4. Depender de columnas que no existen.
5. Avanzar sin confirmar RLS.
6. Preparar datos demasiado inmobiliarios.
7. Dificultar la futura Ruta 2 generica.
8. Usar metadata como sustituto permanente.
9. Crear datos no idempotentes o dificiles de limpiar.
10. Insertar assets sin permisos o derechos claros.
11. Hacer que la demo dependa de datos incompletos.
12. Saltar a Bloque 6 sin base poblada.

## 16. Proximo paso recomendado

Revisar este diseno.

Si queda aprobado, commitearlo como documento rector de poblacion minima.

Despues, crear un SQL revisable de poblacion minima.

Ese SQL no debe ejecutarse hasta contar con:

- nueva aprobacion humana;
- verificacion de columnas reales;
- verificacion de constraints;
- verificacion de RLS/policies;
- plan de rollback o limpieza;
- confirmacion de que los datos demo son aceptables.

Regla final:

```text
No tocar Ruta 2 ni ejecutar SQL hasta que la poblacion minima este disenada, revisada, aprobada y verificada contra la estructura real de Supabase.
```

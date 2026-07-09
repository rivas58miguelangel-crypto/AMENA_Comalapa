# RUTA2-SUPABASE-0002 - Mapa de Conversion Funcional

Fecha de diseno documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: analisis y diseno revisable. No constituye implementacion, SQL ejecutable, migracion ni autorizacion para tocar Supabase o Ruta 2.

## 1. Proposito del documento

Disenar el mapa funcional de conversion entre la App Publica de Reservas Ruta 2, actualmente manual/generica, y la arquitectura Supabase gobernada definida por los Bloques 01 a 05.

El objetivo es determinar que debe cambiar funcionalmente en Ruta 2 para dejar de depender de datos hardcoded/mock/manuales y empezar a consumir la arquitectura Supabase ya definida.

Este documento prepara el terreno para retomar Bloque 6 con una dependencia explicita: antes de que Ruta 2 pueda beneficiarse funcionalmente de atributos configurables, debe consumir primero las capas base de Bloques 01 a 05.

## 2. Contexto

Ruta 2 es una demo generica/manual.

Ruta 2 es prioridad comercial inmediata porque permite presentar una experiencia no amarrada a AMENA original y buscar nuevos clientes/proyectos.

Ruta 2 sera la genesis practica de produccion futura si un cliente aprueba el demo, pero no debe confundirse con una version productiva actual.

Ruta 2 no tiene incorporados funcionalmente los Bloques Supabase 01 a 05.

Documentos relacionados:

- `RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md`.
- `RUTA2-PRODUCCION-0001-genesis-version-productiva.md`.
- `BLOQUE-06-project-commercial-type-attributes.sql.md`.

## 3. Estado funcional actual de Ruta 2

Repositorio revisado en solo lectura:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2
```

Rama revisada:

```text
codex/ruta-2-reservas-generico-manual
```

Ultimo commit revisado:

```text
2afecf5 feat: create generic route 2 reservation demo
```

Working tree revisado:

```text
limpio
```

### Datos que vienen de `src/constants.ts`

`src/constants.ts` define actualmente gran parte de la experiencia comercial visible:

- tipos de vivienda/producto (`HOUSING_TYPES`);
- modelos comerciales (`Model`);
- precios (`price`);
- areas (`area`);
- habitaciones (`bedrooms`);
- banos (`bathrooms`);
- imagenes y planos (`image`, `planImage`, `gallery`);
- sectores y subsectores (`SECTORS`, `SECTORS_DATA`);
- torres, niveles, manzanas y unidades visuales (`visualTargets`, `unitTargets`);
- textos descriptivos y caracteristicas de productos;
- estructura local para apartamentos y casas.

Estos datos son manuales/hardcoded/mock y no provienen del Catalogo Comercial Parametrizable en Supabase.

### Datos que vienen de `src/services/inventoryService.ts`

`src/services/inventoryService.ts` funciona como servicio puente local.

Estado actual:

```text
Hoy devuelve datos locales para no romper la demo.
```

La funcion `getAvailableInventory` devuelve `SECTORS_DATA` desde `src/constants.ts`.

Esto confirma que el inventario visible de Ruta 2 no se consulta todavia desde Supabase gobernado.

### Datos que si van a Supabase actualmente

Ruta 2 tiene cliente Supabase en:

```text
src/services/supabaseClient.ts
```

Usa variables de entorno:

- `VITE_SUPABASE_URL`.
- `VITE_SUPABASE_ANON_KEY`.

`src/services/reservationEventService.ts` inserta datos hacia Supabase en tablas/eventos operacionales:

- `reservation_app_sessions`;
- `reservation_selection_events`;
- `technical_evidence_logs`.

Esos registros corresponden a sesiones, selecciones y evidencia tecnica de la experiencia.

### Datos que no vienen de Supabase

No se encontro consumo funcional de:

- `project_catalog`;
- `project_commercial_types`;
- `project_inventory`;
- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`.

Tampoco se encontro uso funcional de atributos configurables.

### Partes hardcoded/manual/mock

Partes actualmente hardcoded/manual/mock:

- modelos;
- precios;
- areas;
- habitaciones y banos;
- imagenes;
- galerias;
- planos;
- sectores;
- subsectores;
- torres;
- niveles;
- manzanas;
- unidades/lotes visuales;
- caracteristicas;
- textos de presentacion comercial;
- datos de comparacion inicial;
- disponibilidad demo;
- algunos textos de continuidad post-reserva.

## 4. Mapa de conversion hacia Bloques 01 a 05

### `organizations`

Funcion futura:

Representar la empresa, desarrollador, institucion o cliente propietario del contexto comercial.

Uso esperado para Ruta 2:

- identificar que organizacion opera la experiencia;
- separar datos por cliente;
- permitir que la misma base de app pueda servir a mas de una empresa.

### `projects`

Funcion futura:

Representar el proyecto, sede, linea comercial, desarrollo, programa o unidad de negocio que se presenta en la App Publica.

Uso esperado para Ruta 2:

- reemplazar nombres genericos del proyecto;
- definir el contexto activo de la experiencia publica;
- asociar catalogo, branding, assets e inventario.

### `project_branding`

Funcion futura:

Gobernar identidad visual y presentacion basica del proyecto.

Uso esperado para Ruta 2:

- reemplazar branding hardcoded;
- permitir colores, nombres publicos y parametros visuales por proyecto;
- mantener Ruta 2 generica pero configurable por cliente.

### `project_assets`

Funcion futura:

Gobernar imagenes, planos, mapas, documentos y recursos visuales por proyecto.

Uso esperado para Ruta 2:

- reemplazar rutas locales e imagenes hardcoded cuando aplique;
- administrar imagenes de producto/proyecto;
- diferenciar assets de branding, mapa, modelo, inventario o soporte comercial.

### `project_catalog`

Funcion futura:

Ser el dominio rector del catalogo comercial del proyecto.

Uso esperado para Ruta 2:

- reemplazar la estructura fija de `SECTORS_DATA` como fuente primaria de oferta;
- definir que se ofrece comercialmente;
- servir como raiz funcional para tipos, inventario y futuras capas.

### `project_commercial_types`

Funcion futura:

Definir tipos comerciales permitidos dentro de un catalogo.

Uso esperado para Ruta 2:

- reemplazar tipos hardcoded como `casas` y `apartamentos`;
- habilitar otros sectores o industrias sin reescribir la app;
- permitir que Ruta 2 pase de demo inmobiliaria generica a experiencia multiindustria configurable.

### `project_inventory`

Funcion futura:

Representar inventario comercial base o elementos vendibles/gobernados del proyecto.

Uso esperado para Ruta 2:

- reemplazar modelos, unidades/lotes y disponibilidad demo hardcoded;
- asociar cada elemento visible al proyecto y catalogo;
- permitir trazabilidad de seleccion/interes/reserva hacia una fuente comercial gobernada.

## 5. Tabla conceptual de correspondencia

| Elemento actual en Ruta 2 | Archivo actual | Tipo de dato | Tabla Supabase futura | Campo o entidad probable | Prioridad | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Tipos `casas` / `apartamentos` | `src/constants.ts` | Tipo comercial demo | `project_commercial_types` | `type_code`, `type_name`, `commercial_domain` | Alta | Debe dejar de estar hardcoded antes de multiindustria real. |
| Nombre/descripcion de tipo | `src/constants.ts` | Texto comercial | `project_commercial_types` | `type_name`, descripcion o metadata gobernada | Alta | Mantener como contenido configurable. |
| Sectores/subsectores | `src/constants.ts` | Agrupacion comercial/visual | `project_catalog` / `project_inventory` | estructura segun alcance aprobado | Media | Requiere decidir si son catalogo, agrupacion de inventario o atributos futuros. |
| Modelos | `src/constants.ts` | Oferta/modelo demo | Futura capa posterior a Bloques 01-05 | modelos/familias futuras | Media | No forzar dentro de Bloque 6; puede requerir bloque posterior. |
| Precio visible | `src/constants.ts` / `src\App.tsx` | Precio demo | Futuro dominio de precios | precio base o regla futura | Media/Baja | Fuera de Bloques 01-05; no resolver ahora. |
| Area, habitaciones, banos | `src/constants.ts` | Atributos de producto demo | Bloque 6 futuro | atributos configurables | Media | Solo despues de integrar catalogo y tipos. |
| Imagen de modelo | `src/constants.ts` | Asset comercial | `project_assets` o futura relacion de assets comerciales | asset_url, asset_type, asset_context | Alta | Determinar si pertenece a assets de proyecto o assets comerciales posteriores. |
| Plano / `planImage` | `src/constants.ts` | Asset de producto | `project_assets` o futura capa comercial | asset_url, asset_purpose | Media | Puede requerir clasificacion por contexto. |
| Galeria | `src/constants.ts` | Assets multiples | `project_assets` o futura capa comercial | orden, contexto, visibilidad | Media | Puede necesitar entidad de relacion posterior. |
| Mapa general / master plan | `src/constants.ts` | Asset de proyecto | `project_assets` | asset_type / asset_purpose | Alta | Candidato natural para Bloque 02. |
| Torres/niveles/manzanas | `src/constants.ts` / `src\App.tsx` | Jerarquia visual/inventario | `project_inventory` o bloques posteriores | agrupacion, ubicacion, atributo | Alta | No imponer como universal; puede variar por industria. |
| Unidades/lotes visuales | `src/constants.ts` / `src\App.tsx` | Inventario demo | `project_inventory` | inventory_code, display_name, status | Alta | Debe conectarse antes de reservas productivas. |
| Disponibilidad demo | `src/constants.ts` / `src\App.tsx` | Estado no vinculante | `project_inventory` o dominio futuro de disponibilidad | inventory_status / future availability | Media | No confundir con disponibilidad productiva. |
| Sesion de app | `reservationEventService.ts` | Evento operacional | `reservation_app_sessions` | status, source, device_type | Ya existe | Mantener trazabilidad si no rompe UX. |
| Seleccion de usuario | `reservationEventService.ts` | Evento de seleccion | `reservation_selection_events` | step_name, selected_value, raw_payload | Ya existe | Debe enlazarse luego a IDs gobernados. |
| Evidencia tecnica | `reservationEventService.ts` | Evidencia/log | `technical_evidence_logs` | event_type, status, payload | Ya existe | No sustituye catalogo ni inventario. |
| Branding generico | `src\App.tsx` / CSS / constants | Identidad visual | `project_branding` | public_project_name, colors, visibility | Alta | Convertir solo cuando exista configuracion por proyecto. |
| Textos dependientes del cliente | `src\App.tsx` / `src/constants.ts` | Copy comercial | `projects`, `project_branding`, futuras configs | texto publico/configurable | Media | Separar textos globales de textos por cliente. |

## 6. Que debe seguir funcionando igual en Ruta 2

Durante la conversion, Ruta 2 debe conservar:

- experiencia visual;
- flujo de seleccion;
- recorrido comercial;
- narrativa generica;
- claridad de demo;
- velocidad de presentacion;
- sensacion de producto funcional;
- trazabilidad de sesiones/eventos si ya existe;
- interacciones principales de seleccion, interes y pre-reserva;
- capacidad de usarse comercialmente mientras la arquitectura productiva se prepara.

La conversion no debe romper la demo comercial antes de tener una alternativa funcional equivalente.

## 7. Que debe dejar de estar hardcoded

Debera dejar de estar hardcoded cuando se apruebe una fase de implementacion:

- modelos;
- precios;
- areas;
- imagenes;
- sectores;
- tipos comerciales;
- caracteristicas;
- datos de proyecto;
- branding;
- assets;
- textos dependientes del cliente/proyecto;
- unidades/lotes;
- estado de disponibilidad o seleccion;
- datos que deban variar por empresa, proyecto o industria.

No todo debe reemplazarse al mismo tiempo. La conversion debe ser incremental y controlada.

## 8. Secuencia recomendada de conversion

1. Conservar Ruta 2 como demo manual para vender.
2. Disenar modo de carga/configuracion de proyecto.
3. Conectar identidad institucional/proyecto mediante `organizations` y `projects`.
4. Conectar identidad visual y assets mediante `project_branding` y `project_assets`.
5. Conectar catalogo mediante `project_catalog`.
6. Conectar tipos comerciales mediante `project_commercial_types`.
7. Conectar inventario mediante `project_inventory` o la estructura que corresponda.
8. Despues retomar Bloque 6 para atributos configurables.
9. Luego avanzar a modelos, variantes, precios y disponibilidad segun corresponda.

Secuencia sintetica:

```text
Ruta 2 manual para vender
-> configuracion de cliente/proyecto
-> organizations/projects
-> project_branding/project_assets
-> project_catalog
-> project_commercial_types
-> project_inventory
-> Bloque 6 / atributos configurables
-> modelos / variantes / precios / disponibilidad
```

## 9. Fuera de alcance

Este documento no autoriza:

- implementar conexion ahora;
- ejecutar SQL;
- migrar datos;
- modificar Ruta 2;
- reemplazar `constants.ts`;
- tocar Supabase;
- modificar Reservas original;
- crear migraciones ejecutables;
- disenar Bloque 6 en detalle aqui;
- hacer commit o push sin autorizacion humana posterior.

## 10. Riesgos

Riesgos principales:

1. Romper la demo comercial durante la conversion.
2. Sobrearquitecturar antes de vender.
3. Mantener doble fuente de verdad entre constants locales y Supabase.
4. Creer que Supabase parcial equivale a catalogo conectado.
5. Confundir demo manual con produccion.
6. Convertir eventos de seleccion en fuente maestra de inventario.
7. Forzar estructura inmobiliaria sobre otros sectores.
8. Reemplazar datos manuales sin un modo de carga/configuracion suficientemente claro.
9. Introducir latencia, errores o dependencias remotas que deterioren la demo.
10. Avanzar a Bloque 6 sin haber conectado tipos comerciales e inventario base.

## 11. Criterios para aprobar una fase posterior de implementacion

Antes de autorizar implementacion, deben cumplirse estos criterios:

- definir si Ruta 2 seguira vendiendo como demo manual durante la conversion;
- identificar un proyecto/cliente objetivo o modo demo gobernado;
- aprobar el alcance minimo de conexion con Bloques 01 a 05;
- definir si la conexion sera directa, mediante servicio intermedio o Edge Function;
- definir estrategia de fallback para no romper la demo;
- decidir que datos se migran primero desde `constants.ts`;
- decidir que datos quedan temporalmente locales;
- validar que `reservation_app_sessions` y `reservation_selection_events` no sustituyan catalogo/inventario;
- confirmar que no se tocara Supabase sin SQL revisable y aprobacion humana;
- definir pruebas visuales y funcionales antes de reemplazar fuentes de datos;
- aprobar plan de rollback o reversibilidad;
- mantener separacion entre demo, produccion y datos de cliente.

## 12. Proximo paso recomendado

Revisar este mapa funcional.

Si el mapa queda aprobado, decidir si se commitea como documento rector.

Despues, retomar Bloque 6 con esta dependencia explicita:

```text
Bloque 6 es valido como arquitectura de atributos configurables,
pero Ruta 2 solo podra beneficiarse funcionalmente de el
despues de integrarse con Bloques Supabase 01 a 05.
```

Recomendacion preliminar:

Comitear este documento como puente funcional antes de avanzar a SQL o implementacion. Luego reabrir Bloque 6 desde una posicion mas precisa: atributos configurables posteriores a tipos comerciales y dependientes de una Ruta 2 conectada al catalogo base.

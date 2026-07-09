# BLOQUE-06 - project_commercial_type_attributes y Atributos Configurables por Tipo Comercial

Fecha de diseno documental: 2026-07-09

Estado: propuesta formal revisable. No constituye aprobacion de SQL ejecutable.

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion activa: Admin / repositorio rector.

Rama activa al momento de creacion documental: `centro-mando-admin10`.

## 1. Proposito

Definir el diseno conceptual revisable del Bloque 6: Atributos Configurables por Tipo Comercial.

El objetivo del bloque es crear una capa gobernada para declarar que atributos estan permitidos o exigidos por cada tipo comercial definido en `public.project_commercial_types`.

Bloque 6 no guarda valores concretos de inventario. Define la plantilla conceptual de atributos que, en bloques posteriores, podra ser usada por modelos, variantes, inventario, unidades comerciales u otras capas comerciales.

Este documento no aprueba todavia SQL ejecutable, no autoriza migraciones y no implica tocar Supabase.

## 2. Contexto rector

El Catalogo Comercial Parametrizable debe permitir que H-OperIA represente ofertas comerciales de multiples industrias sin forzar una estructura inmobiliaria, sin depender de metadata libre y sin convertir la App Publica de Reservas en fuente maestra de inventario o catalogo.

Documentos rectores aplicables:

- KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.
- FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado.
- SUPABASE-0001 a SUPABASE-0007.
- PERSISTENCIA-0001 - Especificacion Arquitectonica Rectora de Persistencia y Conocimiento Operacional.
- PD-0001 - Arquitectura White Label y Parametrizacion de Produccion.
- PD-0002 - Arquitectura Rectora del Catalogo Comercial Parametrizable.
- PD-0003 - Arquitectura Jerarquica del Catalogo Comercial Parametrizable.
- BLOQUE-01-nucleo-institucional.sql.
- BLOQUE-02-identidad-proyecto.sql.
- BLOQUE-03-project-inventory.sql.
- BLOQUE-04-project-catalog.sql.md.
- BLOQUE-05-project-commercial-types.sql.md.

Principio rector:

```text
Bloque 6 define atributos permitidos o exigidos por tipo comercial. No almacena valores concretos de inventario y no debe convertirse en metadata libre sin gobierno.
```

## 3. Relacion con Bloques 01 a 05

Bloque 01 creo el nucleo institucional:

- `public.organizations`.
- `public.projects`.

Bloque 02 creo identidad de proyecto:

- `public.project_branding`.
- `public.project_assets`.

Bloque 03 creo inventario comercial base:

- `public.project_inventory`.

Bloque 04 creo el catalogo comercial rector:

- `public.project_catalog`.
- Relaciono `project_inventory` con `project_catalog` mediante una FK compuesta.

Bloque 05 creo tipos comerciales parametrizables:

- `public.project_commercial_types`.
- Establecio tipos comerciales permitidos dentro de un `project_catalog`.
- No modifico `public.project_inventory`.
- No creo atributos configurables.

Bloque 6 viene despues de `project_commercial_types` porque los atributos no pueden definirse correctamente sin conocer primero a que tipo comercial pertenecen.

Ejemplo: `area_construida` puede aplicar a un apartamento; `duracion_horas` puede aplicar a un curso o servicio; `capacidad_personas` puede aplicar a hoteleria o eventos. El atributo necesita contexto comercial gobernado.

## 4. Alcance funcional

Bloque 6 debe permitir declarar, por tipo comercial:

- que atributos existen;
- que atributos son obligatorios u opcionales;
- que tipo de dato conceptual acepta cada atributo;
- como se ordenan;
- si son publicos, comparables o filtrables;
- si tienen unidad de medida o etiqueta auxiliar;
- que estado operativo tienen;
- en que ambiente aplican;
- que origen de datos tienen;
- que restricciones conceptuales deberian respetar antes de pasar a SQL.

El bloque debe resolver la definicion de atributos, no los valores especificos de esos atributos.

Los valores concretos deberan resolverse en un bloque posterior, posiblemente asociado a modelos, variantes, inventario o unidades comerciales, segun la secuencia arquitectonica que se apruebe.

## 5. Fuera de alcance

Queda fuera de Bloque 6:

- modelos/familias comerciales;
- variantes comerciales;
- unidades comerciales especificas;
- precios;
- disponibilidad;
- inventario demo;
- valores concretos de inventario;
- metadata libre sin gobierno;
- migracion desde tablas legacy;
- carga de datos reales o demo;
- modificaciones a `public.project_inventory`;
- modificaciones a Reservas;
- modificaciones a Ruta 2 Reservas;
- ejecucion de SQL;
- migraciones ejecutables.

Bloque 6 no debe usarse para adelantar capas futuras ni para ocultar entidades canonicas dentro de `metadata`.

## 6. Entidad candidata principal

Entidad candidata principal:

```text
project_commercial_type_attributes
```

Responsabilidad conceptual:

Declarar los atributos permitidos o exigidos por un tipo comercial especifico dentro de un catalogo comercial de proyecto.

No representa:

- valores de atributos para items concretos;
- modelos;
- variantes;
- unidades comerciales;
- precios;
- disponibilidad;
- reservas;
- activos visuales;
- documentos comerciales.

## 7. Campos candidatos conceptuales

Los siguientes campos son candidatos conceptuales. No constituyen decision cerrada de implementacion fisica ni SQL aprobado.

Identidad y relacion:

- `id`: identificador tecnico del atributo.
- `project_id`: proyecto propietario, candidato para coherencia compuesta y consultas.
- `project_catalog_id`: catalogo propietario, candidato para coherencia compuesta y consultas.
- `commercial_type_id`: tipo comercial propietario del atributo.

`project_id` y `project_catalog_id`, si aparecen en el diseno final, deben servir para preservar coherencia compuesta, facilitar consultas y evitar relaciones ambiguas. No deben crear una fuente de verdad paralela ni contradecir `commercial_type_id`. La fuente funcional del atributo debe seguir siendo su pertenencia al tipo comercial.

Definicion funcional:

- `attribute_code`: codigo unico funcional dentro del tipo comercial.
- `attribute_name`: nombre legible.
- `attribute_description`: descripcion operativa.
- `attribute_group`: agrupacion conceptual o visual simple.
- `data_type`: tipo de dato conceptual.
- `unit_label`: unidad o etiqueta auxiliar, cuando aplique.
- `sort_order`: orden de presentacion.

Comportamiento:

- `is_required`: indica si el atributo es obligatorio para ese tipo comercial.
- `is_filterable`: indica si puede usarse como filtro.
- `is_comparable`: indica si puede usarse para comparacion.
- `is_public`: indica si puede mostrarse publicamente.

Gobierno:

- `attribute_status`: estado operativo del atributo.
- `data_origin`: origen de los datos.
- `operational_environment`: ambiente operativo.
- `legacy_status`: estado frente a fuentes legacy.
- `metadata`: informacion auxiliar gobernada.

Validacion conceptual:

- `allowed_values`: conjunto simple de valores permitidos, si el atributo requiere lista corta.
- `min_value`: valor minimo conceptual.
- `max_value`: valor maximo conceptual.
- `validation_pattern`: patron conceptual de validacion.
- `default_value`: valor por defecto conceptual.

Los campos `allowed_values`, `min_value`, `max_value`, `validation_pattern` y `default_value` son candidatos conceptuales. No son decision cerrada de implementacion.

`allowed_values` podria permanecer en la tabla principal si es simple, acotado y no requiere ciclo de vida propio. Si crece, necesita gobierno independiente, traducciones, orden, estados, auditoria o reutilizacion, deberia convertirse en una tabla separada en un bloque posterior, por ejemplo:

```text
project_commercial_attribute_options
```

## 8. Relaciones candidatas

Relacion principal:

```text
project_commercial_type_attributes
-> project_commercial_types
```

Relacion conceptual completa:

```text
organizations
-> projects
-> project_catalog
-> project_commercial_types
-> project_commercial_type_attributes
```

Reglas candidatas:

- Un tipo comercial puede tener muchos atributos.
- Un atributo pertenece a un solo tipo comercial.
- El atributo debe pertenecer al mismo proyecto y catalogo que su tipo comercial.
- La combinacion `commercial_type_id + attribute_code` deberia ser unica conceptualmente.
- La entidad no debe depender de `project_inventory` para existir.
- La entidad no debe almacenar valores concretos de inventario.

## 9. Reglas de gobierno

1. Todo atributo debe estar asociado a un tipo comercial gobernado.
2. Todo atributo debe declarar estado operativo.
3. Todo atributo debe distinguir origen de datos y ambiente operativo.
4. Todo atributo debe poder separarse entre demo, produccion, legacy u otro origen si el diseno final lo requiere.
5. Metadata solo puede ser auxiliar; no debe sustituir atributos normalizados.
6. La arquitectura debe seguir siendo multiindustria.
7. Ningun atributo inmobiliario debe convertirse en columna universal obligatoria.
8. Bloque 6 no debe modificar `project_inventory`.
9. Bloque 6 no debe tocar Reservas ni Ruta 2 Reservas.
10. Bloque 6 no debe ejecutar SQL sin aprobacion humana posterior.

## 10. Reglas de validacion conceptual

Antes de pasar a SQL, debe validarse:

- que el atributo pertenece a un tipo comercial existente;
- que el codigo del atributo es estable y no ambiguo;
- que el tipo de dato conceptual es suficiente;
- que los campos obligatorios no fuerzan una industria especifica;
- que los atributos publicos no exponen datos sensibles;
- que las reglas de comparacion y filtrado son coherentes;
- que `allowed_values` no requiere aun entidad propia;
- que no se esta usando metadata libre para evitar modelado;
- que no se almacenan valores de inventario en la definicion del atributo;
- que no se mezclan precios, disponibilidad, reservas o unidades comerciales.

## 11. Ejemplos por industria

### Inmobiliario

Tipo comercial posible:

- apartamento.

Atributos candidatos:

- area construida;
- habitaciones;
- banos;
- nivel;
- torre;
- parqueos;
- balcon;
- vista;
- orientacion.

Cuidado de diseno:

Torre, nivel, lote, manzana o sector no deben convertirse en columnas universales obligatorias. Pueden existir como atributos configurables cuando el tipo comercial los requiera.

### Servicios

Tipo comercial posible:

- paquete de consultoria.

Atributos candidatos:

- duracion estimada;
- modalidad;
- entregables incluidos;
- numero de sesiones;
- nivel de acompanamiento;
- idioma.

Cuidado de diseno:

No confundir atributos del servicio con precio, disponibilidad de agenda o asignacion de consultor.

### Educacion

Tipo comercial posible:

- curso.

Atributos candidatos:

- duracion;
- modalidad;
- nivel;
- prerequisitos;
- certificacion incluida;
- cupo recomendado;
- idioma.

Cuidado de diseno:

Matricula, alumnos inscritos, calendario academico y disponibilidad de cupos deben resolverse en dominios posteriores.

### Salud

Tipo comercial posible:

- consulta medica o paquete clinico.

Atributos candidatos:

- especialidad;
- duracion aproximada;
- modalidad;
- preparacion requerida;
- restricciones;
- requiere receta;
- edad minima.

Cuidado de diseno:

Bloque 6 no debe almacenar expediente clinico, diagnosticos, datos sensibles de pacientes ni resultados medicos.

### Turismo/hoteleria

Tipo comercial posible:

- habitacion, tour o paquete turistico.

Atributos candidatos:

- capacidad;
- tipo de cama;
- noches incluidas;
- amenidades;
- politica de cancelacion;
- incluye transporte;
- dificultad del tour.

Cuidado de diseno:

Disponibilidad por fecha, tarifa dinamica, reservas y ocupacion quedan fuera de Bloque 6.

### Manufactura / productos industriales

Tipo comercial posible:

- maquinaria o equipo.

Atributos candidatos:

- capacidad operativa;
- voltaje;
- dimensiones;
- peso;
- material;
- garantia;
- certificaciones;
- compatibilidad.

Cuidado de diseno:

Inventario por serie, stock, mantenimiento, precio y disponibilidad quedan fuera de Bloque 6.

## 12. Riesgos de diseno

1. Convertir Bloque 6 en metadata libre sin gobierno.
2. Sobreadaptar el modelo a inmobiliario.
3. Mezclar definicion de atributo con valor concreto de inventario.
4. Adelantar modelos, variantes, unidades comerciales, precios o disponibilidad.
5. Crear listas de valores demasiado complejas dentro de la tabla principal.
6. Duplicar verdad entre `commercial_type_id`, `project_catalog_id` y `project_id`.
7. Exponer atributos publicos sin revisar sensibilidad.
8. Ejecutar SQL antes de aprobacion humana.

## 13. Criterios de validacion antes de pasar a SQL

Antes de disenar SQL revisable, debe confirmarse:

- Bloque 6 se limita a definiciones de atributos.
- La entidad candidata depende de `project_commercial_types`.
- `project_id` y `project_catalog_id` se usan solo para coherencia compuesta y consultas, no como fuente paralela.
- No se modifica `project_inventory`.
- No se almacenan valores concretos de inventario.
- Los valores concretos se resolveran en un bloque posterior.
- No se crean modelos, variantes ni unidades comerciales.
- No se crean precios ni disponibilidad.
- No se crea inventario demo.
- `allowed_values` se mantiene simple o se difiere a entidad propia.
- Metadata no sustituye el modelo de atributos.
- El diseno soporta multiples industrias.
- El diseno esta alineado con PD-0002, PD-0003, PERSISTENCIA-0001 y SUPABASE-0001 a SUPABASE-0007.
- Existe aprobacion humana explicita para avanzar a SQL revisable.

## 14. Proximo paso recomendado

Revisar humanamente este documento conceptual del Bloque 6.

Si se aprueba, el siguiente paso seria autorizar la elaboracion de SQL revisable dentro de este mismo documento o en una seccion posterior, manteniendo todavia estas restricciones:

- no tocar Supabase;
- no ejecutar SQL;
- no crear migraciones ejecutables;
- no modificar Reservas original;
- no modificar Ruta 2 Reservas;
- no hacer commit ni push sin autorizacion posterior.

El paso inmediatamente posterior no debe ser ejecucion. Debe ser, como maximo, diseno SQL revisable con plan de verificacion y rollback conceptual.

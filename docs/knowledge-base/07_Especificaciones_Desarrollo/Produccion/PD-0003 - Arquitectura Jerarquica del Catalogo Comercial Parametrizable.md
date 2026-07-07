# PD-0003 - Arquitectura Jerarquica del Catalogo Comercial Parametrizable

## Estado

Especificacion arquitectonica rectora.

Documento creado durante Codex AMENA 72 para consolidar la arquitectura jerarquica oficial del Catalogo Comercial Parametrizable de H-OperIA antes del diseno SQL revisable del Bloque 3 del Plan Maestro SQL.

Este documento no implementa codigo, no ejecuta SQL, no altera Supabase, no crea tablas, no modifica tablas, no crea migraciones y no autoriza por si solo ninguna ejecucion tecnica.

Su funcion es fijar la jerarquia conceptual que debera gobernar el diseno posterior de `project_inventory` y de los bloques futuros del dominio comercial parametrizable.

## Relacion con documentos rectores

Este documento se subordina a:

- ACO-0001 a ACO-0006.
- SUPABASE-0001 a SUPABASE-0006.
- PERSISTENCIA-0001.
- PD-0001 - Arquitectura White Label y Parametrizacion de Produccion.
- PD-0002 - Arquitectura Rectora del Catalogo Comercial Parametrizable.
- SQL ejecutado del Bloque 1: `BLOQUE-01-nucleo-institucional.sql`.
- SQL ejecutado del Bloque 2: `BLOQUE-02-identidad-proyecto.sql`.
- Documento de transicion AMENA 71 a AMENA 72.

PD-0003 no reemplaza PD-0002.

PD-0002 define el dominio comercial parametrizable, sus responsabilidades, limites y relacion con Reservas, Marta, Intelligence, Centro Demo y White Label.

PD-0003 define la jerarquia conceptual oficial dentro de ese dominio para impedir que `project_inventory` sea usado como dominio rector unico o como contenedor excesivo.

## Restricciones

Este documento no autoriza:

- ejecutar SQL;
- crear tablas;
- modificar tablas;
- tocar Supabase;
- crear RLS;
- crear policies;
- crear triggers;
- crear funciones;
- crear indices;
- modificar codigo;
- conectar aplicaciones;
- iniciar reservas;
- mezclar datos demo con datos productivos;
- convertir esta arquitectura conceptual en migracion sin aprobacion humana explicita.

Cualquier diseno fisico posterior debera ser revisable, incremental, validado por humanos, trazable documentalmente y ejecutado solo despues de aprobacion explicita.

## Proposito

Definir la arquitectura jerarquica oficial del Catalogo Comercial Parametrizable de H-OperIA.

El documento responde:

- cuales son los niveles oficiales del dominio comercial;
- donde se ubica `project_inventory`;
- si `project_inventory` es dominio rector o si requiere un dominio superior;
- como se relacionan Proyecto, Catalogo, Inventario, Producto, Modelo, Variante, Unidad comercial y Reserva;
- que entidades deberan existir como bloques futuros;
- que principios impediran que el Bloque 3 sea redisenado cuando aparezcan nuevos sectores distintos al inmobiliario.

## Principio rector

`project_inventory` no es el dominio rector del Catalogo Comercial Parametrizable.

El dominio rector superior debe ser `project_catalog`.

`project_catalog` representa la Fuente Comercial gobernada de un proyecto.

`project_inventory` representa una primera materializacion controlada del inventario comercial dentro de esa Fuente Comercial.

Reservas, Marta, H-OperIA Intelligence, Centro Demo y futuras aplicaciones productivas deben consumir informacion comercial gobernada, no inventarla ni reemplazarla.

## Niveles oficiales del dominio comercial

La jerarquia oficial separa contexto, catalogo, oferta, inventario y operacion.

### 1. Organizacion

Representa la entidad institucional o cliente dueno de la operacion.

Existe fisicamente en el Bloque 1 como `public.organizations`.

Responsabilidad conceptual:

- ubicar la raiz institucional;
- separar organizaciones productivas, demo, MOC/vitrina y legacy;
- permitir que proyectos e iniciativas comerciales dependan de una entidad responsable.

### 2. Proyecto

Representa el proyecto operativo o comercial dentro de una organizacion.

Existe fisicamente en el Bloque 1 como `public.projects`.

Responsabilidad conceptual:

- ubicar el contexto comercial de una oferta;
- servir como base para branding, activos, catalogo, inventario, reservas y futuras operaciones;
- preservar separacion entre demo, produccion y legacy.

### 3. Catalogo de proyecto

Representa el catalogo comercial gobernado de un proyecto.

Nombre conceptual rector: `project_catalog`.

Responsabilidad conceptual:

- definir la Fuente Comercial estructural del proyecto;
- declarar que ofrece el proyecto;
- declarar que tipos de producto admite;
- gobernar reglas generales de presentacion, seleccion, disponibilidad y validacion;
- indicar version, vigencia y estado de validacion de la oferta comercial;
- actuar como fuente oficial para Reservas, Marta, Intelligence y aplicaciones internas.

`project_catalog` es superior a `project_inventory`.

### 4. Tipo de producto

Representa la familia o tipo de oferta.

Nombre conceptual candidato: `product_types`.

Ejemplos:

- apartamento;
- casa;
- lote;
- finca;
- local;
- bodega;
- parqueo;
- vehiculo;
- maquinaria;
- servicio;
- membresia;
- paquete;
- curso;
- producto digital;
- producto fisico.

Responsabilidad conceptual:

- clasificar la naturaleza comercial de lo ofrecido;
- permitir que H-OperIA soporte multiples industrias;
- evitar que conceptos inmobiliarios se vuelvan obligatorios para sectores no inmobiliarios.

### 5. Modelo de producto

Representa una plantilla comercial repetible dentro de un tipo de producto.

Nombre conceptual candidato: `product_models`.

Ejemplos:

- modelo de apartamento de dos habitaciones;
- casa Aura;
- lote premium;
- paquete estandar;
- plan mensual;
- version base de un servicio.

Responsabilidad conceptual:

- agrupar atributos comunes;
- evitar duplicar informacion repetible en cada unidad;
- permitir que varias unidades o variantes compartan una definicion comercial.

Un modelo no necesariamente es una unidad vendible individual.

### 6. Variante de producto

Representa una configuracion especifica de un modelo.

Nombre conceptual candidato: `product_variants`.

Ejemplos:

- tamano;
- color;
- etapa;
- nivel de servicio;
- version;
- paquete;
- combinacion;
- subtipo;
- orientacion;
- configuracion de entrega.

Responsabilidad conceptual:

- permitir variaciones sin crear un modelo nuevo para cada diferencia menor;
- soportar industrias donde las variantes son esenciales;
- conservar flexibilidad sin convertir inventario en una bolsa de atributos sin gobierno.

### 7. Inventario de proyecto

Representa elementos comercializables concretos o agrupaciones vendibles dentro del proyecto.

Nombre del Bloque 3: `project_inventory`.

Responsabilidad conceptual:

- declarar elementos ofrecibles, seleccionables, reservables o analizables comercialmente;
- ubicar el inventario dentro de un proyecto y de su catalogo;
- preservar estado comercial general, visibilidad y posibilidad de seleccion;
- actuar como primera materializacion fisica controlada del inventario comercial;
- preparar relacion futura con tipos, modelos, variantes, disponibilidad, precios, activos y reservas.

`project_inventory` es inventario comercial base.

No es catalogo completo.

No es reserva.

No es activo.

No es branding.

No es Expediente Vivo.

No es evidencia operacional.

### 8. Unidad comercial

Representa la unidad concreta seleccionable o reservable cuando el negocio requiere granularidad individual.

Nombre conceptual candidato: `commercial_units`.

Ejemplos:

- apartamento A-704;
- lote M3-15;
- casa en sector 05;
- vehiculo con identificador individual;
- cupo disponible;
- maquinaria especifica;
- paquete asignable;
- servicio contratado bajo una configuracion concreta.

Responsabilidad conceptual:

- representar la unidad comercial de seleccion cuando aplique;
- permitir que algunas industrias operen con unidades fisicas, cupos o asignaciones concretas;
- no obligar a todos los sectores a tener unidad fisica si venden servicios, membresias o paquetes no unitarios.

### 9. Reserva

Representa actividad operacional derivada.

Nombre conceptual futuro: `reservations` o equivalente.

Responsabilidad conceptual:

- registrar interes, seleccion, bloqueo, pre-reserva, reserva o formalizacion;
- vincular cliente, unidad comercial o elemento inventariable, fuente, canal y estado operacional;
- alimentar Expediente Vivo y seguimiento comercial.

Reservas consume catalogo e inventario.

Reservas no gobierna la Fuente Comercial.

Reservas no debe convertirse en fuente maestra de inventario, disponibilidad, precio o condiciones.

## Jerarquia conceptual oficial

La jerarquia oficial es:

```text
organization
  -> project
    -> project_catalog
      -> product_type
        -> product_model
          -> product_variant
            -> project_inventory
              -> commercial_unit
                -> reservation
```

Esta jerarquia puede comprimirse en implementaciones iniciales, pero no debe negarse conceptualmente.

Una implementacion inicial puede crear primero una tabla `project_inventory` subordinada a `projects` y preparada para vincularse posteriormente con `project_catalog`, `product_types`, `product_models`, `product_variants` y `commercial_units`.

Esa compresion fisica inicial no convierte `project_inventory` en dominio rector.

## Relacion conceptual entre entidades

### Proyecto y Catalogo

Un proyecto puede tener un catalogo comercial gobernado.

El proyecto ubica el contexto.

El catalogo define que se ofrece y bajo que estructura comercial.

### Catalogo e Inventario

El catalogo define la Fuente Comercial estructural.

El inventario representa elementos comercializables concretos o agrupaciones vendibles dentro de esa fuente.

El inventario no debe existir como oferta sin catalogo conceptual, aunque en una primera etapa fisica pueda depender directamente de `projects`.

### Inventario y Producto

El producto representa una clase o concepto comercial ofrecido.

El inventario representa existencias, unidades, agrupaciones o elementos vendibles asociados a esa oferta.

Un producto puede tener cero, una o muchas unidades inventariables segun industria.

### Producto y Modelo

El modelo describe una plantilla comercial repetible.

Un producto puede tener modelos.

Un modelo puede compartir atributos con muchas unidades o variantes.

### Modelo y Variante

La variante especializa un modelo sin crear una familia nueva.

Permite representar diferencias relevantes para seleccion, presentacion o condiciones comerciales.

### Variante e Inventario

El inventario puede referenciar una variante cuando el elemento vendible surge de una configuracion especifica.

En implementaciones iniciales, esa relacion puede quedar preparada como campo futuro o metadata gobernada, sin obligar a crear todas las tablas en Bloque 3.

### Inventario y Unidad comercial

La unidad comercial es el elemento seleccionable concreto cuando se requiere granularidad.

En algunos sectores, `project_inventory` y unidad comercial pueden coincidir inicialmente.

En otros, `project_inventory` puede representar un grupo, cupo, paquete o disponibilidad agregada, y la unidad comercial puede definirse despues.

### Unidad comercial y Reserva

La reserva selecciona o referencia una unidad comercial o elemento inventariable.

La reserva no define la existencia de la unidad.

La reserva no gobierna el estado maestro del inventario.

## Ubicacion del Bloque 3

Bloque 3 debe disenar `project_inventory` como primera tabla fisica del nivel Inventario de proyecto.

Debe quedar subordinado a `projects` porque `project_catalog` aun no existe fisicamente.

Debe quedar conceptualmente subordinado a `project_catalog` para no convertirse en dominio rector.

El diseno fisico posterior debera permitir evolucionar desde:

```text
projects -> project_inventory
```

hacia:

```text
projects -> project_catalog -> product_types/product_models/product_variants -> project_inventory -> commercial_units -> reservations
```

sin redisenar la responsabilidad central de `project_inventory`.

## Entidades que deberan existir como bloques futuros

Los siguientes bloques futuros quedan reconocidos como necesarios o probables. Su existencia conceptual no obliga a implementarlos en Bloque 3.

### Catalogo rector

- `project_catalog`
- `catalog_versions`
- `catalog_validation_events`

### Clasificacion comercial

- `product_types`
- `product_models`
- `product_variants`

### Inventario detallado

- `commercial_units`
- `unit_attributes`
- `unit_availability`
- `unit_prices`
- `inventory_change_events`

### Activos y documentos comerciales

- `catalog_assets`
- `unit_media_assets`
- `catalog_documents`
- `commercial_documents`

### Reglas de presentacion y visibilidad

- `catalog_presentation_rules`
- `catalog_visibility_rules`

### Relacion con operacion

- `reservation_inventory_links`
- `reservations`
- entidades futuras de seguimiento comercial, evidencia, Expediente Vivo e Intelligence.

## Entidades que no deben ser absorbidas por Bloque 3

Bloque 3 no debe absorber:

- catalogo rector completo;
- tipos de producto;
- modelos;
- variantes;
- unidades comerciales avanzadas;
- disponibilidad historica;
- precios avanzados;
- reglas de presentacion;
- activos comerciales;
- documentos comerciales;
- reservas;
- bloqueos;
- clientes;
- pagos;
- documentos de cliente;
- evidencia operacional;
- Expediente Vivo;
- senales de Intelligence;
- transiciones operacionales;
- eventos de validacion complejos;
- versionamiento completo de catalogo.

## Principios multiindustria

### Principio 1 - No asumir inmobiliaria como forma universal

La arquitectura no debe codificar torre, nivel, lote, manzana, etapa o sector como columnas universales obligatorias.

Estos conceptos pueden existir como atributos, metadata o entidades futuras especificas, pero no deben definir la arquitectura base para todas las industrias.

### Principio 2 - Tipo, modelo y variante protegen diversidad

La combinacion tipo-modelo-variante permite representar industrias distintas sin redisenar el sistema.

### Principio 3 - La unidad comercial es opcional segun industria

Algunas industrias requieren unidades fisicas concretas.

Otras venden servicios, membresias, cupos o paquetes donde la unidad fisica no existe o no es relevante.

### Principio 4 - Inventario no es reserva

Seleccion, bloqueo o reserva son actividad operacional.

El inventario declara oferta comercial disponible o gobernada.

### Principio 5 - Disponibilidad no es actividad de reserva

La disponibilidad puede ser consultada por reservas, pero no debe nacer exclusivamente de reservas.

Reservas puede afectar disponibilidad en dominios posteriores, pero no debe ser su fuente maestra.

### Principio 6 - Precio base no es motor de precios

Bloque 3 puede preparar campos o relaciones futuras para precio base o condicion simple si se aprueba en diseno posterior.

Reglas complejas de precio, historicos, promociones, moneda, descuentos, planes y simulaciones deben tratarse en bloques futuros.

### Principio 7 - Activo comercial no es inventario

Imagenes, planos, videos, documentos, mapas y fichas pueden representar inventario, pero no sustituyen la entidad comercial.

### Principio 8 - Metadata no debe volverse desorden

La metadata puede permitir flexibilidad inicial, pero no debe usarse para ocultar entidades canonicas que ya requieran ciclo de vida, validacion o relaciones propias.

### Principio 9 - Demo no valida produccion

Un escenario demo puede representar inventario simulado.

No puede transformarse automaticamente en inventario productivo sin validacion, migracion y aprobacion independiente.

### Principio 10 - El catalogo gobierna la Fuente Comercial

Toda reserva, interaccion, precio, disponibilidad, documento, evidencia o senal de Intelligence debe poder trazarse hacia una Fuente Comercial o dominio rector autorizado.

## Implicaciones para el diseno SQL del Bloque 3

El diseno SQL revisable del Bloque 3 debera:

- materializar solo `project_inventory` como inventario comercial base;
- depender de `public.projects`;
- reconocer conceptualmente a `project_catalog` como futuro dominio superior;
- no crear `project_catalog` salvo aprobacion especifica posterior;
- no crear tipos, modelos, variantes, unidades comerciales avanzadas, precios ni disponibilidad historica en el mismo bloque;
- incluir campos que no bloqueen evolucion futura hacia `project_catalog`;
- preservar `data_origin`, `operational_environment` y `legacy_status`;
- mantener estados de validacion y visibilidad coherentes con los bloques anteriores;
- evitar columnas inmobiliarias obligatorias;
- permitir atributos flexibles sin reemplazar futuros dominios canonicos;
- no incorporar reservas ni actividad operacional.

## Criterio de cierre

PD-0003 queda cumplido si permite disenar el Bloque 3 sin confundir inventario con catalogo completo.

La regla central queda fijada:

```text
project_catalog gobierna la Fuente Comercial del proyecto.
project_inventory materializa inventario comercial base.
reservations consumen inventario y no lo gobiernan.
```

El Bloque 3 podra avanzar hacia SQL revisable solo si respeta esta jerarquia y se mantiene limitado a una primera materializacion controlada de inventario comercial por proyecto.

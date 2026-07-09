# RUTA2-SUPABASE-0003 - Plan de Implementacion Faseada

Fecha de diseno documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: plan tecnico documental revisable. No constituye implementacion, SQL ejecutable, migracion ni autorizacion para tocar Supabase, Ruta 2 o Reservas tradicional.

## 1. Proposito del documento

Definir un plan tecnico faseado para conectar la App Publica de Reservas Ruta 2 con los Bloques Supabase 01 a 05, sin romper la demo comercial actual y sin asumir que la integracion ya existe.

Este documento ordena la ruta de conversion desde datos manuales/hardcoded/mock hacia Supabase gobernado. No ejecuta la conversion, no modifica codigo y no autoriza tocar Supabase.

## 2. Contexto certificado

Ruta 2 es prioridad comercial inmediata porque permite vender y validar una experiencia publica generica con prospectos nuevos.

Ruta 2 es hoy una demo manual/generica. Su valor actual esta en mostrar el recorrido comercial, la seleccion guiada y la experiencia de pre-reserva sin depender de un cliente productivo especifico.

Ruta 2 sera la genesis practica de una version productiva futura si un cliente aprueba el demo, pero no debe confundirse con produccion actual.

Ruta 2 no consume funcionalmente los Bloques Supabase 01 a 05:

- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`;
- `project_catalog`;
- `project_commercial_types`;
- `project_inventory`.

Ruta 2 tiene Supabase parcial para eventos/trazabilidad mediante:

- `reservation_app_sessions`;
- `reservation_selection_events`;
- `technical_evidence_logs`.

Los datos comerciales visibles siguen saliendo principalmente de:

- `src/constants.ts`;
- `src/services/inventoryService.ts`.

Bloque 6 sigue siendo valido como arquitectura futura de atributos configurables, pero debe retomarse despues de integrar funcionalmente los Bloques 01 a 05.

## 3. Principio rector

La conversion debe proteger la demo que sirve para vender.

Principios operativos:

- no romper la demo actual;
- convertir gradualmente, no rehacer desde cero;
- conservar la experiencia visual validable por cliente;
- mantener `constants.ts` e `inventoryService.ts` como respaldo temporal mientras se conecta Supabase;
- evitar doble fuente de verdad en produccion final;
- distinguir siempre trazabilidad Supabase de catalogo Supabase;
- no aplicar Bloque 6 antes de que Ruta 2 consuma catalogo, tipos e inventario base.

Lectura sintetica:

```text
Ruta 2 vende y valida.
Admin/Supabase gobierna.
La conversion debe unir ambos sin romper el activo comercial.
```

## 4. Fase 1 propuesta - Lectura de identidad institucional/proyecto

Tablas rectoras involucradas:

- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`.

### Objetivo funcional

Permitir que Ruta 2 lea una identidad institucional/proyecto gobernada, sin depender exclusivamente de branding hardcoded.

La primera integracion deberia responder preguntas basicas:

- que organizacion opera la experiencia;
- que proyecto esta activo;
- que nombre publico, colores, textos base y assets aplican;
- que imagenes o mapas pertenecen al proyecto.

### Archivos probables a tocar despues

No se autorizan cambios ahora. En una fase posterior podrian intervenirse:

- `src/config/projectBranding.ts`;
- `src/services/supabaseClient.ts`;
- `src/App.tsx`;
- componentes o funciones que usan `projectBranding`;
- puntos donde se muestran nombre de proyecto, empresa, tagline, colores y assets principales.

### Riesgos

- romper la identidad visual actual de la demo;
- introducir dependencia remota antes de tener fallback;
- confundir assets de proyecto con assets de inventario;
- cargar identidad incompleta y degradar la presentacion comercial.

### Criterios de validacion

- la demo carga aunque Supabase no este disponible;
- el branding gobernado reemplaza solo lo aprobado;
- el fallback local conserva la experiencia comercial;
- no se modifica el flujo de seleccion;
- no se afirma que Ruta 2 ya consume catalogo o inventario por solo leer branding.

## 5. Fase 2 propuesta - Catalogo comercial

Tabla rectora involucrada:

- `project_catalog`.

### Objetivo funcional

Conectar Ruta 2 con el catalogo comercial rector del proyecto para que la oferta visible empiece a tener una raiz gobernada.

El catalogo debe actuar como dominio base de lo que el proyecto puede presentar comercialmente, antes de entrar a tipos, inventario o atributos.

### Como reemplazar parte de `constants.ts`

La sustitucion debe ser gradual. En una fase posterior podria extraerse desde `constants.ts` lo que represente estructura comercial base del proyecto, manteniendo temporalmente los datos locales como fallback.

Ejemplos de piezas candidatas a migrar parcialmente:

- estructura general de oferta;
- agrupaciones comerciales base;
- nombres y descripciones dependientes del proyecto;
- referencias a activos principales si ya estan gobernadas.

### Que debe seguir funcionando igual

- seleccion inicial del usuario;
- recorrido visual;
- textos comerciales esenciales;
- experiencia de sectores/modelos mientras no exista reemplazo equivalente;
- trazabilidad de eventos ya existente;
- capacidad de presentar el demo sin cliente productivo.

### Riesgos

- convertir `project_catalog` en cajon de metadata libre;
- intentar resolver modelos, precios o disponibilidad antes de tiempo;
- romper `SECTORS_DATA` sin una estructura equivalente;
- crear doble fuente de verdad permanente.

### Criterios de validacion

- existe un catalogo activo para el proyecto demo o cliente objetivo;
- Ruta 2 puede leerlo sin afectar la experiencia si falla;
- se documenta que datos siguen locales;
- no se reemplazan precios, unidades ni disponibilidad en esta fase si no estan gobernados;
- no se toca Supabase sin autorizacion explicita posterior.

## 6. Fase 3 propuesta - Tipos comerciales

Tabla rectora involucrada:

- `project_commercial_types`.

### Objetivo funcional

Permitir que Ruta 2 lea tipos comerciales gobernados en lugar de depender exclusivamente de tipos hardcoded como `casas` y `apartamentos`.

Esta fase prepara el camino para que Ruta 2 pueda operar en otros sectores o industrias sin reescribir la app desde cero.

### Relacion con sectores/tipos actuales

Hoy `src/constants.ts` define `HOUSING_TYPES` y `SECTORS_DATA`. En una fase posterior, `project_commercial_types` deberia mapear o reemplazar gradualmente la decision inicial del usuario sobre que categoria comercial desea explorar.

Ejemplos actuales:

- `casas`;
- `apartamentos`.

Ejemplos futuros posibles:

- unidades inmobiliarias;
- servicios;
- programas educativos;
- paquetes turisticos;
- categorias comerciales no inmobiliarias.

### Riesgos

- confundir tipo comercial con modelo/familia;
- mezclar tipos comerciales con atributos de Bloque 6 antes de tiempo;
- forzar una jerarquia inmobiliaria sobre industrias no inmobiliarias;
- romper la navegacion inicial de Ruta 2.

### Criterios de validacion

- los tipos se leen desde una fuente gobernada;
- la UI conserva la decision inicial clara;
- existe fallback local para demo;
- no se implementan atributos configurables todavia;
- no se crean modelos, variantes ni precios en esta fase.

## 7. Fase 4 propuesta - Inventario comercial base

Tabla rectora involucrada:

- `project_inventory`.

### Objetivo funcional

Conectar el inventario comercial base de Ruta 2 con una fuente gobernada, reemplazando gradualmente inventario local/manual sin romper la demo.

Esta fase debe permitir que los elementos seleccionables tengan identidad trazable contra el modelo rector.

### Relacion con `inventoryService.ts`

`src/services/inventoryService.ts` ya funciona como punto puente:

```text
Hoy devuelve datos locales para no romper la demo.
```

La funcion `getAvailableInventory` devuelve actualmente `SECTORS_DATA` desde `src/constants.ts`.

En una fase posterior, este servicio podria convertirse en la frontera controlada entre la UI y Supabase, manteniendo fallback local durante la transicion.

### Transicion desde datos locales hacia Supabase

Secuencia recomendada:

1. mantener la firma del servicio si resulta suficiente;
2. agregar lectura remota solo con aprobacion posterior;
3. normalizar respuesta para no obligar a reescribir toda la UI de una vez;
4. preservar `SECTORS_DATA` como fallback temporal;
5. registrar claramente que datos vienen de Supabase y cuales siguen locales;
6. retirar el fallback solo cuando exista fuente gobernada suficiente y pruebas aprobadas.

### Fallback temporal

El fallback temporal debe proteger:

- carga inicial del demo;
- recorrido comercial;
- seleccion de tipo, sector, modelo, nivel y unidad/lote;
- visuales principales;
- precios demo si todavia no existe dominio de precios;
- trazabilidad de eventos.

El fallback no debe convertirse en fuente paralela permanente en produccion.

### Riesgos

- romper disponibilidad visible;
- mapear mal unidades/lotes;
- convertir eventos de seleccion en fuente de inventario;
- introducir inconsistencias entre inventario local y remoto;
- tratar precios demo como precios productivos;
- enlazar Bloque 6 antes de tener inventario base.

### Criterios de validacion

- Ruta 2 sigue funcionando con y sin Supabase configurado;
- los elementos visibles pueden trazarse a IDs gobernados cuando existan;
- la UI no cambia drasticamente sin aprobacion comercial;
- el servicio mantiene comportamiento estable;
- los datos locales quedan identificados como fallback temporal;
- no se modifica disponibilidad productiva sin bloque o decision posterior.

## 8. Fase 5 propuesta - Retomar Bloque 6

Entidad arquitectonica futura:

- `project_commercial_type_attributes`.

### Objetivo

Retomar Bloque 6 para definir atributos configurables permitidos o exigidos por tipo comercial una vez que Ruta 2 ya consuma funcionalmente los Bloques 01 a 05.

### Aclaracion

Bloque 6 no se implementa todavia en Ruta 2.

Bloque 6 no debe usarse para guardar valores concretos de inventario. Su rol es definir atributos permitidos/exigidos por tipo comercial. Los valores concretos deben resolverse en una capa posterior.

### Condiciones necesarias antes de implementarlo

- Ruta 2 consume `project_catalog`;
- Ruta 2 consume `project_commercial_types`;
- Ruta 2 consume inventario base gobernado;
- existe criterio claro sobre que atributos son por tipo y cuales son por inventario;
- no se usa metadata libre sin gobierno como sustituto del modelo;
- existe aprobacion humana explicita para pasar de documento a implementacion.

## 9. Fase 6 futura - Produccion real para cliente aprobado

Esta fase solo aplica si un cliente aprueba el demo y se decide avanzar a version productiva.

Secuencia propuesta:

1. clonar o ramificar Ruta 2 validada;
2. configurar cliente, organizacion y proyecto;
3. cargar catalogo real;
4. cargar tipos comerciales reales;
5. cargar inventario base;
6. validar datos reales con el cliente;
7. sustituir hardcoded aprobado por Supabase gobernado;
8. conservar componentes visuales validados;
9. preparar pruebas locales y de aceptacion;
10. preparar despliegue productivo;
11. retirar fallback local solo cuando exista estabilidad suficiente.

La produccion futura debe nacer de Ruta 2 validada y Supabase gobernado, no de una reescritura desde cero ni de una demo hardcoded llevada sin gobierno a produccion.

## 10. Archivos probables de Ruta 2 a intervenir en fase posterior

No se autoriza modificar estos archivos ahora.

Archivos detectados como candidatos:

- `src/constants.ts`;
- `src/services/inventoryService.ts`;
- `src/services/supabaseClient.ts`;
- `src/services/reservationEventService.ts`;
- `src/config/projectBranding.ts`;
- `src/config/inventoryStatus.ts`;
- `src/App.tsx`.

Puntos funcionales detectados:

- `src/App.tsx` importa `SECTORS`, `HOUSING_TYPES` y `SECTORS_DATA` desde `src/constants.ts`;
- `src/App.tsx` usa `projectBranding` para identidad visual;
- `src/App.tsx` muestra precios desde `model.price`;
- `src/services/inventoryService.ts` devuelve `SECTORS_DATA`;
- `src/services/reservationEventService.ts` inserta eventos en Supabase parcial;
- `src/config/inventoryStatus.ts` gobierna estados visuales locales de inventario.

## 11. Que NO se debe hacer todavia

No se debe:

- modificar Ruta 2;
- modificar Reservas tradicional;
- borrar `constants.ts`;
- reemplazar `inventoryService.ts`;
- ejecutar SQL;
- tocar Supabase;
- crear migraciones ejecutables;
- implementar Bloque 6;
- redisenar visualmente la demo;
- romper la experiencia comercial actual;
- convertir eventos de trazabilidad en catalogo o inventario;
- asumir que una tabla documentada ya esta consumida por la app;
- hacer git add, commit o push sin aprobacion humana posterior.

## 12. Riesgos principales

Riesgos principales de la conversion:

1. Romper la demo antes de vender.
2. Sobrearquitecturar antes de tener cliente.
3. Mantener doble fuente de verdad entre datos locales y Supabase.
4. Confundir trazabilidad Supabase con catalogo Supabase.
5. Aplicar Bloque 6 antes de Bloques 01 a 05.
6. Perder velocidad comercial.
7. Convertir `constants.ts` en una deuda invisible si no se planifica retiro gradual.
8. Llevar datos demo a produccion sin validacion de cliente.
9. Forzar estructura inmobiliaria sobre industrias futuras.
10. Rehacer desde cero y perder lo ya validado visualmente en Ruta 2.

## 13. Criterios para autorizar implementacion posterior

Antes de autorizar cualquier implementacion posterior, deben cumplirse estos criterios:

- aprobacion humana explicita;
- repositorio correcto;
- aplicacion correcta;
- rama correcta;
- working tree limpio;
- plan de rollback/fallback;
- prueba local de la demo;
- conservacion de experiencia visual;
- validacion de que Supabase tenga datos base suficientes;
- decision sobre proyecto/cliente objetivo o modo demo gobernado;
- alcance cerrado de la fase a implementar;
- confirmacion de que Bloque 6 no entra antes de conectar Bloques 01 a 05;
- confirmacion de que no se ejecutara SQL sin documento o script revisable aprobado.

## 14. Proximo paso recomendado

Revisar este plan.

Si queda aprobado, commitearlo como documento rector de implementacion faseada.

Despues decidir una de estas rutas:

- iniciar Fase 1 de implementacion con aprobacion humana explicita;
- revisar primero el estado real de Supabase y datos base disponibles;
- preparar un plan tecnico mas detallado para el servicio puente de inventario;
- mantener Ruta 2 como demo manual mientras se busca cliente y posponer implementacion.

Recomendacion preliminar:

```text
Revisar y commitear este plan antes de tocar codigo.
Luego decidir si la prioridad es implementar Fase 1 o certificar primero datos reales en Supabase.
```

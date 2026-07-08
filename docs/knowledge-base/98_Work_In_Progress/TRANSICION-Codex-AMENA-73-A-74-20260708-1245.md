# TRANSICION Codex AMENA 73 a AMENA 74

Fecha-hora de cierre: 2026-07-08 12:45 America/Guatemala

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Rama: `centro-mando-admin10`

Procedimiento aplicable para continuidad: KB-0003 y FO-COC-0001.

## 1. Estado certificado de AMENA 73

AMENA 73 completo la ejecucion manual, trazabilidad documental y publicacion Git de los siguientes avances del Plan Maestro SQL:

- Bloque 4 - Dominio Rector del Catalogo Comercial Parametrizable.
- Bloque 5 - Dominio de Tipos Comerciales Parametrizables.

Ultimo commit publicado antes de crear esta transicion:

```text
f763cb508be3b8c256161414697135bad542310c docs: add executed sql trace for commercial types
```

Estado Git verificado antes de crear esta transicion:

- Rama: `centro-mando-admin10`
- HEAD: `f763cb508be3b8c256161414697135bad542310c`
- Origin `centro-mando-admin10`: `f763cb508be3b8c256161414697135bad542310c`
- HEAD == origin: confirmado.
- Ahead/behind: `0 0`.
- Working tree: limpio.

No se ejecuto SQL desde Codex.

No se modifico Supabase desde Codex.

No se modifico codigo de aplicacion.

## 2. Bloques ejecutados y documentados

Bloques ejecutados y documentados al cierre operativo de AMENA 73:

- Bloque 1: nucleo institucional.
- Bloque 2: identidad del proyecto.
- Bloque 3: `project_inventory`.
- Bloque 4: `project_catalog`.
- Bloque 5: `project_commercial_types`.

Archivos de trazabilidad relevantes:

- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-01-nucleo-institucional.sql`
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-02-identidad-proyecto.sql`
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-03-project-inventory.sql`
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-04-project-catalog.sql.md`
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-05-project-commercial-types.sql.md`

## 3. Resultado del Bloque 4

Tabla nueva:

- `public.project_catalog`

Resultado certificado:

- `public.project_catalog` creada correctamente.
- Comentarios documentales agregados correctamente.
- Indices creados correctamente.
- `invalid_project_catalog_references = 0`.
- FK `project_inventory_project_catalog_fk = EXISTS`.
- `project_catalog_exists = project_catalog`.

Commit documental:

```text
f0e10f6 docs: add executed sql trace for block 4
```

## 4. Resultado del Bloque 5

Tabla nueva:

- `public.project_commercial_types`

Resultado certificado:

- `public.project_commercial_types` creada correctamente.
- Comentarios documentales agregados correctamente.
- Indices creados correctamente.
- `project_commercial_types_exists = project_commercial_types`.
- FK `project_commercial_types_catalog_fk = EXISTS`.
- Seis indices verificados correctamente.

Decision preservada:

- `public.project_inventory` no fue modificada.
- `project_inventory.inventory_type` queda intacto.
- `inventory_type` se considera conceptualmente transitorio, pero no deprecado fisicamente.

Commit documental:

```text
f763cb5 docs: add executed sql trace for commercial types
```

## 5. Decision estrategica sobre Fase 6 directiva del Centro Demo

La Fase 6 directiva del Centro Demo, entendida como capacidad para que el Director General haga preguntas abiertas del tipo:

- Por que las personas de la Torre 5 no estan escogiendo tal modelo?
- Que objeciones se repiten?
- Que esta afectando la conversion?
- Que recomienda H-OperIA?

no debe formar parte del Centro Demo inicial como capacidad interactiva completa.

Motivo:

Ese tipo de preguntas requiere una capa hibrida que combine:

- SQL / analitica estructurada;
- RAG sobre conversaciones, notas, llamadas, reportes y evidencias;
- H-OperIA Intelligence como motor de sintesis;
- suficientes datos operacionales acumulados.

Sin esa evidencia, cualquier respuesta causal seria especulativa y podria afectar la credibilidad del demo.

Texto rector:

```text
H-OperIA Intelligence no debe responder preguntas directivas causales sin evidencia operacional suficiente. La version inicial del Centro Demo puede mostrar la vision ejecutiva futura, pero no debe prometer diagnostico causal completo hasta contar con eventos, conversaciones, reservas, reportes, llamadas y trazabilidad suficiente.
```

## 6. Nueva orientacion para Centro Demo inicial

El Centro Demo inicial debe enfocarse en demostrar:

- catalogo comercial parametrizable;
- tipos comerciales;
- atributos por tipo;
- modelos/familias comerciales;
- inventario inicial demo / MOC Vitrina;
- precios referenciales;
- disponibilidad basica no vinculante;
- publicacion controlada;
- acompanamiento de Marta sobre catalogo e inventario.

La antigua Fase 6 debe quedar reubicada como:

1. Cierre ejecutivo narrativo no vinculante.
2. Futuro modulo H-OperIA Intelligence / Director General para version avanzada o productiva.

## 7. Inventario Inicial Demo / MOC Vitrina

Inventario Inicial Demo / MOC Vitrina queda como hito futuro posterior a:

- atributos configurables por tipo comercial;
- modelos/familias comerciales;
- relacion inventario - tipo - modelo.

No debe cargarse inventario demo antes de contar con esas capas minimas, para evitar contaminar `project_inventory`, abusar de `metadata` o convertir datos publicos no verificados en estructura productiva.

El inventario inicial demo, cuando se autorice, debera marcar informacion como:

- demo;
- no verificada;
- fuente publica;
- no vinculante;
- sin cantidades exactas de unidades si no estan publicadas.

## 8. Punto exacto de partida para AMENA 74

AMENA 74 debe iniciar con Reconstruccion Certificada conforme a KB-0003 y FO-COC-0001.

Proximo objetivo recomendado:

- Analizar Bloque 6: Atributos Configurables por Tipo Comercial.

Restricciones para AMENA 74:

- No disenar SQL nuevo hasta completar Reconstruccion Certificada y recibir aprobacion humana.
- No avanzar a Inventario Inicial Demo / MOC Vitrina antes de atributos, modelos/familias y relacion inventario - tipo - modelo.
- No prometer diagnostico causal directivo completo en el Centro Demo inicial.
- No reubicar Fase 6 como capacidad interactiva completa sin evidencia operacional suficiente.

## 9. Documentos que debe reconstruir AMENA 74

AMENA 74 debe reconstruir como minimo:

- IME-0001.
- GOV-0001.
- GOV-0002.
- KB-0003.
- KB-0004.
- FO-COC-0001.
- ACO-0001 a ACO-0006.
- SUPABASE-0001 a SUPABASE-0007.
- PERSISTENCIA-0001.
- PD-0001.
- PD-0002.
- PD-0003.
- `docs/architecture-decisions.md`.
- VAPI-0001.
- `BLOQUE-01-nucleo-institucional.sql`.
- `BLOQUE-02-identidad-proyecto.sql`.
- `BLOQUE-03-project-inventory.sql`.
- `BLOQUE-04-project-catalog.sql.md`.
- `BLOQUE-05-project-commercial-types.sql.md`.
- Este documento de transicion AMENA 73 a AMENA 74.

## 10. Confirmacion de continuidad

AMENA 73 deja como estado documentado:

- Bloques 1 a 5 ejecutados y documentados.
- Bloque 4 publicado como dominio rector `project_catalog`.
- Bloque 5 publicado como dominio `project_commercial_types`.
- Decision estrategica incorporada: Fase 6 directiva no pertenece al Centro Demo inicial como capacidad interactiva completa.
- Punto recomendado para AMENA 74: Reconstruccion Certificada y analisis de Bloque 6, Atributos Configurables por Tipo Comercial.

Este documento prepara la continuidad, pero no sustituye la Reconstruccion Certificada obligatoria de AMENA 74.

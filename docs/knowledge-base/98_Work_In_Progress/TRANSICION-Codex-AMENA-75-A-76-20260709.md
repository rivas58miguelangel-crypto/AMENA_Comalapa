# TRANSICION - Codex AMENA 75 a Codex AMENA 76

Fecha de transicion: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama certificada: `centro-mando-admin10`

## 1. Proposito de la transicion

Dejar formalmente cerrado el estado operativo de Codex AMENA 75 y preparar el arranque ordenado de Codex AMENA 76.

Esta transicion conserva la evidencia documental, las decisiones operativas y las restricciones vigentes para evitar que AMENA 76 arranque asumiendo que Ruta 2 ya consume funcionalmente los Bloques Supabase 01 a 05.

## 2. Estado certificado del repositorio

Repositorio:

```text
C:\Amena\Codex\AMENA_Comalapa
```

Rama:

```text
centro-mando-admin10
```

HEAD local certificado:

```text
62f87e801a432f3f558922a0a3153475670e6533
```

origin/centro-mando-admin10 certificado:

```text
62f87e801a432f3f558922a0a3153475670e6533
```

Ahead/behind certificado:

```text
0 0
```

Working tree al cierre certificado:

```text
limpio
```

Ultimo commit publicado:

```text
62f87e8 docs: design minimal supabase seed data for route 2
```

## 3. Resumen ejecutivo de AMENA 75

AMENA 75 ordeno la relacion entre la arquitectura rectora Supabase, las aplicaciones publicas de Reservas y la app Ruta 2.

Durante el ciclo se corrigio una confusion importante: la existencia documental o estructural de los Bloques Supabase 01 a 05 no implica que una aplicacion los consuma funcionalmente.

Tambien se establecio que Ruta 2 sigue siendo una demo comercial generica/manual y que no debe conectarse todavia contra Bloques 01 a 05 porque las tablas esperadas parecen existir, pero estan vacias.

La conclusion operativa principal fue:

```text
Antes de integrar Ruta 2 contra Supabase, se requiere poblacion minima controlada de Bloques 01 a 05.
```

## 4. Correccion conceptual clave aprendida

Regla rectora consolidada:

```text
Documentado en Admin no significa aplicado funcionalmente en una app.
Tabla existente o ejecutada en Supabase no significa tabla poblada.
Tabla poblada no significa consumida funcionalmente por Ruta 2.
Solo consumo real en codigo permite decir que un bloque esta aplicado en una app.
```

Esta regla aplica tanto para Reservas tradicional como para Ruta 2 Reservas.

## 5. Documentos creados y commits relevantes

Documentos creados y publicados durante AMENA 75:

1. `docs/knowledge-base/98_Work_In_Progress/RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md`
2. `docs/knowledge-base/98_Work_In_Progress/RUTA2-PRODUCCION-0001-genesis-version-productiva.md`
3. `docs/knowledge-base/98_Work_In_Progress/BLOQUE-06-project-commercial-type-attributes.sql.md`
4. `docs/knowledge-base/98_Work_In_Progress/RUTA2-SUPABASE-0002-mapa-conversion-funcional.md`
5. `docs/knowledge-base/98_Work_In_Progress/RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md`
6. `docs/knowledge-base/98_Work_In_Progress/RUTA2-SUPABASE-0003-plan-implementacion-faseada.md`
7. `docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0001-auditoria-preintegracion-bloques-01-05.md`
8. `docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0002-checklist-manual-verificacion-bloques-01-05.md`
9. `docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`
10. `docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0004-diseno-poblacion-minima-bloques-01-05.md`

Commits recientes relevantes:

```text
62f87e8 docs: design minimal supabase seed data for route 2
a43027e docs: record manual supabase verification result
95fe503 docs: add manual supabase verification checklist for route 2
124d436 docs: add supabase preintegration audit for route 2
8a2ad38 docs: add route 2 supabase phased implementation plan
```

## 6. Estado real de Admin, Supabase, Reservas tradicional y Ruta 2

### Admin / repositorio rector

Admin conserva la documentacion rectora y los documentos de trabajo publicados para ordenar la futura integracion Ruta 2 -> Supabase.

Los Bloques Supabase 01 a 05 existen como arquitectura/documentacion rectora en Admin. Bloque 6 existe como diseno arquitectonico revisable para atributos configurables por tipo comercial, pero no debe considerarse aplicado funcionalmente a Ruta 2.

### Supabase

Segun verificacion manual humana desde el panel de Supabase:

- las tablas esperadas de Bloques 01 a 05 aparentemente existen;
- ninguna de las tablas revisadas tiene datos;
- no se ejecuto SQL durante esa verificacion;
- no se copiaron secretos;
- no se modificaron datos.

Tablas relevantes observadas o esperadas:

- `organizations`
- `projects`
- `project_branding`
- `project_assets`
- `project_catalog`
- `project_commercial_types`
- `project_inventory`

Estado interpretado:

```text
Estructura aparente: si.
Datos base: no.
Listo para integracion Ruta 2: no.
```

### Reservas tradicional

Reservas tradicional no consume funcionalmente Bloques Supabase 01 a 05 segun evidencia local revisada.

Tiene Supabase parcial para trazabilidad/eventos y mantiene datos comerciales visibles desde archivos como:

- `src/constants.ts`
- `src/services/inventoryService.ts`

### Ruta 2 Reservas

Ruta 2 Reservas tampoco consume funcionalmente Bloques Supabase 01 a 05 segun evidencia local revisada.

Tiene Supabase parcial para trazabilidad/eventos y mantiene datos comerciales visibles desde archivos como:

- `src/constants.ts`
- `src/services/inventoryService.ts`

Ruta 2 permanece como demo comercial generica/manual.

## 7. Decision operativa actual

Decision vigente:

```text
No tocar Ruta 2 todavia.
No conectar Ruta 2 contra tablas vacias.
No modificar Reservas tradicional.
No ejecutar SQL.
No tocar Supabase.
```

Antes de una integracion funcional, Bloques 01 a 05 deben estar no solo creados, sino poblados de forma minima, coherente y verificable.

Bloque 6 sigue siendo valido como arquitectura futura, pero queda posterior a que Bloques 01 a 05 esten poblados y funcionalmente integrables.

## 8. Pendiente principal para AMENA 76

La tarea sugerida para AMENA 76 es crear, revisar y publicar, sin ejecutar, el documento:

```text
docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md
```

Objetivo:

Preparar SQL revisable para poblacion minima demo/generica de Bloques 01 a 05, sin ejecutarlo, sin tocar Supabase y validando columnas reales antes de cualquier ejecucion futura.

El documento debera partir de:

- `SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`
- `SUPABASE-RUTA2-0004-diseno-poblacion-minima-bloques-01-05.md`

## 9. Instruccion recomendada para arrancar AMENA 76

Instruccion sugerida:

```text
Actua como Codex en el proyecto H-OperIA / AMENA.

CHAT OPERATIVO OFICIAL: Codex AMENA 76.

Objetivo inicial:
Crear una propuesta documental revisable para:

docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md

La propuesta debe preparar SQL revisable de poblacion minima demo/generica para Bloques Supabase 01 a 05, sin ejecutarlo, sin tocar Supabase, sin modificar Ruta 2, sin modificar Reservas tradicional, sin crear migraciones ejecutables y validando primero columnas reales, constraints, foreign keys, RLS/policies, estados, flags demo/produccion/legacy, rollback y limpieza.

No ejecutar SQL.
No tocar Supabase.
No modificar codigo.
No hacer git add, commit ni push hasta autorizacion humana posterior.
```

## 10. Restricciones obligatorias para AMENA 76

Restricciones de arranque:

- No tocar Supabase al inicio.
- No ejecutar SQL.
- No insertar datos.
- No actualizar datos.
- No borrar datos.
- No modificar Ruta 2 Reservas.
- No modificar Reservas tradicional.
- No modificar codigo.
- No crear migraciones ejecutables.
- No avanzar Bloque 6 funcionalmente todavia.
- No asumir que las tablas vacias estan listas.
- No conectar Ruta 2 hasta tener datos minimos coherentes.
- No pedir ni imprimir secretos.
- No usar datos reales de clientes sin autorizacion.
- No amarrar la demo generica a AMENA original.

## 11. Verificacion Git final

Verificacion previa a crear este documento:

```text
Rama: centro-mando-admin10
HEAD: 62f87e801a432f3f558922a0a3153475670e6533
origin/centro-mando-admin10: 62f87e801a432f3f558922a0a3153475670e6533
ahead/behind: 0 0
working tree: limpio
ultimo commit: 62f87e8 docs: design minimal supabase seed data for route 2
```

Este documento de transicion queda como artefacto pendiente de revision y commit humano posterior.

# RESERVAS-SUPABASE-0001 - Aclaracion Admin, Reservas y Ruta 2

Fecha de aclaracion documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: documento aclaratorio. No constituye implementacion, SQL ejecutable, migracion ni autorizacion para tocar Supabase o apps de Reservas.

## 1. Proposito del documento

Aclarar formalmente donde existen los Bloques Supabase 01 a 05 y donde no estan incorporados funcionalmente.

Este documento distingue entre:

- arquitectura documentada/gobernada en Admin;
- tablas posiblemente existentes en Supabase;
- consumo funcional real desde las apps de Reservas.

La finalidad es evitar asumir que un bloque esta aplicado en una app solo porque existe como documento rector o porque fue ejecutado manualmente en Supabase.

## 2. Contexto de la confusion

Durante AMENA 75 surgio una confusion importante: se asumio, o se pudo interpretar, que los Bloques Supabase 01 a 05 estaban aplicados funcionalmente en Reservas.

La verificacion demostro que los Bloques 01 a 05 existen como arquitectura rectora en Admin, pero no como consumo funcional en las apps de Reservas revisadas.

Hallazgo central:

```text
Los Bloques 01 a 05 estan documentados/gobernados en Admin.
Eso no significa que Reservas tradicional ni Ruta 2 los consuman funcionalmente.
```

## 3. Aclaracion de carpetas

Admin / repositorio rector:

```text
C:\Amena\Codex\AMENA_Comalapa
```

Reservas tradicional:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602
```

Ruta 2 Reservas:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2
```

Estas carpetas no deben confundirse. Cada una representa un frente distinto de trabajo.

## 4. Tres niveles que deben distinguirse siempre

### Nivel 1 - Bloques documentados/gobernados en Admin

Significa que existe documentacion, SQL de trazabilidad o diseno rector dentro del repositorio Admin.

Este nivel define arquitectura y continuidad, pero no prueba consumo funcional por una app.

### Nivel 2 - Tablas posiblemente existentes en Supabase

Significa que una tabla pudo haber sido creada o modificada en Supabase, usualmente por ejecucion manual aprobada.

Este nivel prueba existencia o ejecucion si hay evidencia suficiente, pero tampoco prueba que una app consuma esa tabla.

### Nivel 3 - Apps que realmente consumen esas tablas en codigo

Significa que el codigo de una aplicacion consulta, inserta, actualiza o depende funcionalmente de esas tablas.

Solo este nivel permite decir que un bloque esta aplicado funcionalmente en una app.

## 5. Estado de Admin

Admin funciona como repositorio rector de arquitectura, conocimiento y trazabilidad documental.

En Admin existen los Bloques Supabase 01 a 05 como documentacion/SQL rector:

- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-01-nucleo-institucional.sql`.
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-02-identidad-proyecto.sql`.
- `docs/knowledge-base/98_Work_In_Progress/sql/BLOQUE-03-project-inventory.sql`.
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-04-project-catalog.sql.md`.
- `docs/knowledge-base/98_Work_In_Progress/BLOQUE-05-project-commercial-types.sql.md`.

Esto significa que Admin contiene la arquitectura rectora y la trazabilidad de Bloques 01 a 05.

No significa que las apps consumidoras ya usen esas tablas.

## 6. Estado de Reservas tradicional

Reservas tradicional:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602
```

Estado verificado:

- Tiene cliente Supabase en `src/services/supabaseClient.ts`.
- Usa Supabase para eventos/trazabilidad mediante `src/services/reservationEventService.ts`.
- Registra o prepara registros hacia:
  - `reservation_app_sessions`;
  - `reservation_selection_events`;
  - `technical_evidence_logs`.
- No se encontro consumo funcional de:
  - `project_catalog`;
  - `project_commercial_types`;
  - `project_inventory`;
  - `organizations`;
  - `projects`;
  - `project_branding`;
  - `project_assets`.
- Sus datos comerciales visibles siguen saliendo de:
  - `src/constants.ts`;
  - `src/services/inventoryService.ts`.

Conclusion:

Reservas tradicional tiene Supabase parcial para trazabilidad/eventos, pero no consume funcionalmente los Bloques 01 a 05 como catalogo comercial gobernado.

## 7. Estado de Ruta 2 Reservas

Ruta 2 Reservas:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2
```

Estado verificado:

- Tiene cliente Supabase en `src/services/supabaseClient.ts`.
- Usa Supabase para eventos/trazabilidad mediante `src/services/reservationEventService.ts`.
- Registra o prepara registros hacia:
  - `reservation_app_sessions`;
  - `reservation_selection_events`;
  - `technical_evidence_logs`.
- No se encontro consumo funcional de:
  - `project_catalog`;
  - `project_commercial_types`;
  - `project_inventory`;
  - `organizations`;
  - `projects`;
  - `project_branding`;
  - `project_assets`.
- Sus datos comerciales visibles siguen siendo manuales/hardcoded/mock, principalmente en:
  - `src/constants.ts`;
  - `src/services/inventoryService.ts`.

Conclusion:

Ruta 2 Reservas tiene Supabase parcial para trazabilidad/eventos, pero no consume funcionalmente los Bloques 01 a 05 como catalogo comercial gobernado.

## 8. Diferencia entre Reservas tradicional y Ruta 2

Reservas tradicional es la app original de reservas.

Ruta 2 es la demo generica/manual derivada para venta a nuevos clientes.

Ambas comparten el mismo problema estructural:

```text
ninguna consume funcionalmente los Bloques Supabase 01 a 05.
```

Diferencia principal:

- Reservas tradicional conserva la linea original de la App Publica de Reservas.
- Ruta 2 prioriza una experiencia generica/manual para presentacion comercial a nuevos clientes.

Problema comun:

- ambas tienen cliente Supabase parcial para trazabilidad;
- ambas dependen todavia de datos comerciales locales/manuales;
- ninguna consume `project_catalog`, `project_commercial_types` ni `project_inventory` como fuente comercial gobernada.

## 9. Consecuencia para Bloque 6

Bloque 6 sigue siendo valido como arquitectura de atributos configurables.

Pero Bloque 6 no debe aplicarse funcionalmente a Reservas tradicional ni a Ruta 2 antes de integrar primero Bloques 01 a 05.

Primero debe resolverse la conexion funcional de:

- catalogo;
- tipos comerciales;
- inventario base;
- identidad de proyecto;
- branding y assets cuando aplique.

Despues podra retomarse Bloque 6 para atributos configurables conectados a tipos comerciales ya consumidos por la app correspondiente.

Regla:

```text
No se puede aplicar funcionalmente Bloque 6 en una app que todavia no consume Bloques 01 a 05.
```

## 10. Regla operativa aprendida

Antes de decir que un bloque esta "aplicado", debe distinguirse:

1. Documentado.
2. Ejecutado en Supabase.
3. Consumido funcionalmente por una app.

Solo el tercer nivel permite decir que un bloque esta aplicado en una app.

Ejemplo:

- "Bloque 04 esta documentado en Admin" no equivale a "Ruta 2 consume `project_catalog`".
- "Una tabla existe en Supabase" no equivale a "Reservas tradicional la usa".
- "Una app tiene cliente Supabase" no equivale a "consume el Catalogo Comercial Parametrizable".

## 11. Secuencia recomendada

1. Mantener Ruta 2 como prioridad comercial inmediata.
2. Mantener Admin/Supabase como arquitectura rectora.
3. Documentar claramente la brecha entre arquitectura y consumo funcional.
4. Disenar integracion funcional de Bloques 01 a 05 hacia Ruta 2.
5. Verificar si Reservas tradicional tambien requiere un mapa de conversion propio.
6. Despues retomar Bloque 6.

Secuencia sintetica:

```text
Admin documenta y gobierna
-> Supabase puede contener tablas
-> apps deben integrarse explicitamente
-> primero Bloques 01 a 05
-> despues Bloque 6
```

## 12. Riesgos si no se documenta

Riesgos principales:

1. Repetir trabajo por asumir integracion inexistente.
2. Aplicar Bloque 6 antes de conectar catalogo e inventario base.
3. Confundir repositorios.
4. Confundir cliente Supabase parcial con consumo funcional del modelo rector.
5. Perder tiempo comercial corrigiendo supuestos.
6. Mantener doble fuente de verdad sin reconocerla.
7. Decir que una app usa una tabla sin evidencia en codigo.
8. Disenar integraciones futuras sobre una premisa falsa.

## 13. Proximo paso recomendado

Revisar este documento.

Si queda aprobado, commitearlo como aclaracion rectora.

Despues continuar con la ruta de conversion funcional:

- Ruta 2 -> Bloques Supabase 01 a 05;
- luego Bloque 6;
- luego capas posteriores como modelos, variantes, precios y disponibilidad, segun corresponda.

Tambien puede evaluarse si Reservas tradicional necesita su propio mapa de conversion funcional o si basta con esta aclaracion comparativa.

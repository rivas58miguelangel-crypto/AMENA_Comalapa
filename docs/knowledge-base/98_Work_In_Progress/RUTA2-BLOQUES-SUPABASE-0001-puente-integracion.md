# RUTA2-BLOQUES-SUPABASE-0001 - Puente de Integracion

Fecha de decision documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: documento puente inicial. No constituye integracion funcional, SQL ejecutable ni autorizacion para tocar Supabase.

## 1. Proposito del documento

Establecer formalmente el mapa real entre la App Publica de Reservas Ruta 2 y los Bloques Supabase 01 a 06.

Este documento evita confundir tres planos distintos:

- la arquitectura rectora Supabase documentada en Admin;
- la demo manual/generica Ruta 2;
- una futura integracion funcional entre Ruta 2 y los Bloques Supabase.

## 2. Contexto de la decision

Durante AMENA 75 se aprobo elaborar el diseno conceptual revisable del Bloque 6: Atributos Configurables por Tipo Comercial.

Antes de preparar su commit, surgio una duda estrategica humana: si Ruta 2 Reservas ya incorporaba funcionalmente los Bloques Supabase 01 a 05, o si seguia siendo una demo generica/manual.

La verificacion de solo lectura confirmo la conclusion B:

```text
Ruta 2 Reservas solo tiene demo generica/manual y no tiene incorporados funcionalmente los Bloques Supabase 01 a 05.
```

Por decision humana, el commit de `BLOQUE-06-project-commercial-type-attributes.sql.md` queda pausado hasta revisar este documento puente.

## 3. Estado real certificado de Ruta 2 Reservas

Repositorio verificado:

```text
C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2
```

Rama verificada:

```text
codex/ruta-2-reservas-generico-manual
```

Ultimo commit verificado:

```text
2afecf5 feat: create generic route 2 reservation demo
```

Estado Git verificado:

- HEAD alineado con `origin/codex/ruta-2-reservas-generico-manual`.
- Ahead/behind previamente certificado: `0 0`.
- Working tree limpio.

Supabase parcial existente:

- Ruta 2 tiene cliente Supabase real en `src/services/supabaseClient.ts`.
- El cliente depende de `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- La integracion encontrada no corresponde al Catalogo Comercial Parametrizable ni a Bloques 01 a 05.

Uso actual de tablas/eventos Supabase encontrados:

- `reservation_app_sessions`.
- `reservation_selection_events`.
- `technical_evidence_logs`.

Archivos relevantes:

- `src/services/supabaseClient.ts`.
- `src/services/reservationEventService.ts`.
- `src/services/inventoryService.ts`.
- `src/constants.ts`.

Evidencia funcional relevante:

- `src/services/reservationEventService.ts` inserta eventos/sesiones/evidencia tecnica mediante Supabase.
- `src/services/inventoryService.ts` declara que hoy devuelve datos locales para no romper la demo.
- `src/constants.ts` contiene datos comerciales visibles hardcoded/manuales/mock: modelos, sectores, precios, areas, imagenes, niveles, torres/manzanas y tipos de vivienda.

Conclusion sobre datos comerciales:

Ruta 2 no obtiene su catalogo comercial visible desde Bloques Supabase. La experiencia comercial visible se alimenta principalmente de datos locales/manuales/mock dentro del codigo.

## 4. Estado real de Bloques Supabase en Admin

En el repositorio rector/Admin se encuentran documentados y ejecutados los Bloques Supabase 01 a 05:

- Bloque 01: nucleo institucional.
- Bloque 02: identidad del proyecto.
- Bloque 03: `project_inventory`.
- Bloque 04: `project_catalog`.
- Bloque 05: `project_commercial_types`.

Estado documental actual:

- Los Bloques 01 a 05 estan documentados como ejecutados manualmente en Supabase por aprobacion humana.
- El Bloque 06 fue creado como documento formal revisable en:
  `docs/knowledge-base/98_Work_In_Progress/BLOQUE-06-project-commercial-type-attributes.sql.md`.
- El Bloque 06 todavia no ha sido commiteado.
- El Bloque 06 no debe considerarse aplicado funcionalmente a Ruta 2.

La existencia del diseno de Bloque 06 en Admin no implica que Ruta 2 ya pueda consumir atributos configurables.

## 5. Brecha principal

Ruta 2 no consume actualmente:

- `project_catalog`;
- `project_commercial_types`;
- `project_inventory`;
- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`;
- atributos configurables por tipo comercial.

Ruta 2 no tiene evidencia funcional de uso de los Bloques Supabase 01 a 05 como fuente de datos comerciales visibles.

Brecha sintetica:

```text
Admin contiene la arquitectura rectora documentada.
Ruta 2 contiene una demo generica/manual operativa.
La integracion funcional entre ambos planos aun no existe.
```

## 6. Diferencia entre arquitectura rectora, demo manual e integracion futura

### Arquitectura rectora Supabase

Vive en Admin y se documenta mediante los Bloques Supabase.

Define el modelo gobernado para:

- organizaciones;
- proyectos;
- branding;
- assets;
- inventario;
- catalogo;
- tipos comerciales;
- atributos configurables futuros.

### Demo manual Ruta 2

Vive en la App Publica de Reservas Ruta 2.

Sirve como punto comercial generico inmediato.

Actualmente:

- usa contenido demo;
- usa datos locales/manuales/mock;
- registra algunos eventos en Supabase;
- no consume aun catalogo ni tipos comerciales desde Bloques Supabase.

### Integracion funcional futura

Sera el trabajo que conecte Ruta 2 con la arquitectura rectora Supabase.

Antes de que Ruta 2 pueda beneficiarse funcionalmente del Bloque 6, debe existir una integracion con los Bloques 01 a 05, especialmente:

- proyecto;
- branding;
- assets;
- catalogo;
- inventario;
- tipos comerciales.

## 7. Secuencia recomendada

1. Conservar Ruta 2 como punto comercial generico inmediato.
2. Documentar este puente Ruta 2 - Bloques Supabase antes de publicar el Bloque 6.
3. Revisar humanamente si el commit de Bloque 6 debe hacerse junto con este puente o despues.
4. Antes de aplicar Bloque 6 funcionalmente a Ruta 2, conectar primero Ruta 2 con Bloques 01 a 05.
5. Disenar despues la integracion de atributos configurables.

Secuencia conceptual:

```text
Ruta 2 manual estable
-> puente documental
-> decision de commit documental
-> integracion Ruta 2 con Bloques 01 a 05
-> diseno funcional de atributos configurables
-> eventual uso de Bloque 6 en Ruta 2
```

## 8. Riesgos si no se crea este puente

1. Creer falsamente que Ruta 2 ya usa Bloques 01 a 05.
2. Avanzar Bloque 6 desconectado de la app comercial prioritaria.
3. Duplicar estructura hardcoded sin plan de salida.
4. Perder velocidad comercial por sobrearquitectura.
5. Perder velocidad tecnica por una integracion mal entendida.
6. Confundir trazabilidad de eventos Supabase con catalogo comercial gobernado.
7. Presentar atributos configurables como disponibles funcionalmente cuando solo existen como diseno arquitectonico.
8. Mezclar demo manual, arquitectura rectora e integracion productiva sin frontera documental.

## 9. Decision operativa

Decision humana registrada:

- Bloque 06 sigue siendo valido como diseno arquitectonico.
- El commit de Bloque 06 queda pausado hasta revisar este documento puente.
- Ruta 2 queda definida como prioridad comercial generica.
- La integracion funcional Ruta 2 - Bloques Supabase debe planificarse explicitamente.

Reglas operativas vigentes:

- No borrar `BLOQUE-06-project-commercial-type-attributes.sql.md`.
- No hacer `git add` sin autorizacion humana posterior.
- No hacer commit sin autorizacion humana posterior.
- No hacer push sin autorizacion humana posterior.
- No ejecutar SQL.
- No tocar Supabase.
- No modificar Reservas original.
- No modificar Ruta 2 Reservas.

## 10. Proximo paso recomendado

Revisar humanamente este documento puente.

Despues de la revision, decidir entre:

1. commitear juntos el documento puente y el documento Bloque 06;
2. commitear primero solo el documento puente;
3. ajustar el documento Bloque 06 antes de cualquier commit.

Recomendacion preliminar:

Comitear juntos el puente y el Bloque 06 puede ser conveniente si ambos quedan aprobados, porque el puente contextualiza correctamente el alcance real del Bloque 06 y evita que se interprete como aplicacion funcional inmediata sobre Ruta 2.

# Transicion Operativa - Codex AMENA 82 a 83

**Fecha:** 2026-07-19
**Estado:** Cierre formal de Codex AMENA 82
**Alcance:** Continuidad operativa hacia auditoria y eventual intervencion de Ruta 2 generica/manual del Centro Demo

---

## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio:** Visual
* **Entrada vigente de REG-0001:** AR-VIS-001
* **Autoridad Rectora:** Admin / Centro de Mando
* **Tipo de autoridad:** Aplicacion rectora original del ADN visual comun
* **Repositorio, documento o artefacto inspeccionado:** `C:\Amena\Codex\AMENA_Comalapa`; CF-0001; ADR-002; REG-0001; FO-COC-0001; Ruta 1 Reservas; Ruta 2 Reservas
* **Rama, commit o version certificada:** `centro-mando-admin10`, commit `2b96e71deaff7fa6a97022bc0ecd496f86095d13`
* **Implementaciones hermanas o derivadas:** Comunicaciones Internas; Registro Operacional
* **Aplicacion o artefacto objetivo:** App Publica de Reservas Ruta 2 generica/manual
* **Excepciones autorizadas:** Para Ruta 2 no aplica identidad AMENA como excepcion vigente. La identidad contextual esperada es Empresa Demo / Proyecto de Empresa Demo.
* **Declaracion expresa de derivacion:** Este documento deriva sus criterios de ADR-002, REG-0001, FO-COC-0001, GOV-0001, KB-0003 y CF-0001. No redefine la Autoridad Rectora Visual.
* **Resultado de la regla de bloqueo:** VALIDO
* **Nombre y fecha del entregable:** TRANSICION-Codex-AMENA-82-A-83-20260719-1551 - 2026-07-19

---

## 1. Resumen ejecutivo

Codex AMENA 82 concluye con la gobernanza visual fortalecida, el primer documento del Corpus Fundacional publicado, la declaracion inicial de CF-0002 aprobada y pausada, y la prioridad operativa redirigida desde la Ruta 1 especifica de AMENA hacia la Ruta 2 generica/manual del Centro Demo.

La microcirugia visual ejecutada sobre Ruta 1 no fue aprobada como estrategia comercial vigente. Fue preservada en una rama checkpoint como experimento no aprobado y no debe trasladarse automaticamente a Ruta 2.

Ruta 2 fue auditada en modo solo lectura. Se certifico que esta limpia, alineada con su remoto localmente conocido y que conserva una generalizacion parcial: ya no opera como AMENA visible principal, pero mantiene residuos nominales, tecnicos, documentales y visuales de Ruta 1.

---

## 2. Reconstruccion del contexto operativo

La sesion comenzo con la publicacion del documento de transicion de Codex AMENA 82 y continuo con el fortalecimiento de FO-COC-0001. Despues se desarrollo y publico CF-0001 como primer documento del Corpus Fundacional de la Suite H - OperIA.

Durante la exploracion visual de Reservas se determino que el problema no era solo de componentes, colores o radios, sino de identidad perceptiva global. Esa decision dio origen a la reflexion fundacional sobre la Arquitectura Visual Comun de la Suite H - OperIA y a la planificacion futura de CF-0002 - Metodologia de Derivacion de Aplicaciones H - OperIA.

Posteriormente se identifico que la microcirugia visual en curso correspondia a Ruta 1 especifica de AMENA, mientras que la prioridad comercial vigente del Centro Demo es Ruta 2 generica/manual. Por ello se detuvo la mejora de Ruta 1, se preservo el experimento y se audito Ruta 2 como aplicacion correcta para la siguiente etapa.

---

## 3. Estado del Semaforo de Continuidad

* **Gobernanza de Autoridades Rectoras:** Verde. ADR-002 y REG-0001 publicados; AR-VIS-001 vigente.
* **FO-COC-0001:** Verde. Regla de Validez del Entregable para Dominios Gobernados publicada.
* **CF-0001:** Verde. Publicado como Primera Version Fundacional.
* **CF-0002:** Amarillo. Planificado y pausado; no existe documento definitivo.
* **Ruta 1 Reservas:** Verde para resguardo; rojo para publicacion visual. El experimento queda no aprobado.
* **Ruta 2 Reservas:** Verde para auditoria Git; amarillo para generalizacion visual; no intervenida aun.
* **Supabase Ruta 2:** Amarillo/pausado. No abrir, no ejecutar SQL y no activar integraciones sin autorizacion especifica.
* **Working tree rector al cierre previo a esta transicion:** Limpio despues de publicar RESERVAS-VISUAL-0001.

---

## 4. Repositorios auditados y certificacion Git

### Repositorio rector

Repositorio:

`C:\Amena\Codex\AMENA_Comalapa`

Rama:

`centro-mando-admin10`

HEAD local/remoto despues de publicar RESERVAS-VISUAL-0001:

`2b96e71deaff7fa6a97022bc0ecd496f86095d13`

Ahead/behind:

`0 0`

Working tree:

Limpio antes de crear este documento de transicion.

### Ruta 1 - App Publica especifica de AMENA

Repositorio:

`C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602`

Rama estable:

`feature/complete-tracking-funnel`

HEAD estable:

`da852f0604eab355d8413b80f8d23bdb001af757`

Rama checkpoint:

`checkpoint/amena-82-visual-experiment`

Commit checkpoint local/remoto:

`5115b47185525860654b2f0e0abe562f591e2dbe`

Working tree:

Limpio al cierre del resguardo.

### Ruta 2 - App Publica generica/manual

Repositorio:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`

Rama:

`codex/ruta-2-reservas-generico-manual`

HEAD local/remoto localmente conocido:

`2afecf5d9a98833fa1030229a1de2cb4f741aa4d`

Ahead/behind:

`0 0`

Working tree:

Limpio.

---

## 5. Decisiones arquitectonicas tomadas

1. La validacion visual de Reservas debe aplicar simultaneamente AR-VIS-001 y CF-0001.
2. La identidad institucional de H - OperIA gobierna la experiencia; la identidad del cliente la contextualiza.
3. La microcirugia de Ruta 1 no representa la estrategia comercial vigente del Centro Demo.
4. Ruta 2 generica/manual queda como aplicacion correcta para la prioridad comercial inmediata.
5. El checkpoint de Ruta 1 queda preservado como experimento visual no aprobado.
6. CF-0002 queda planificado, pero su desarrollo completo se difiere hasta despues de prioridades actuales del Centro Demo.
7. Supabase Ruta 2 permanece bajo pausa formal; no se autoriza SQL, apertura de Supabase ni integracion funcional.

---

## 6. Documentos creados, modificados y publicados

### Publicados durante Codex AMENA 82

* `TRANSICION-Codex-AMENA-82-20260718.md` - commit `3f6dc63`.
* `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado.md` - commit `9825863`.
* `Arquitectura Visual Comun de la Suite H - OperIA.md` - commit `679d979`.
* `RESERVAS-VISUAL-0001-especificacion-temporal-diseno-experiencia-inicial.md` - commit `2b96e71`.

### No publicados como documentos definitivos

* CF-0002 - Metodologia de Derivacion de Aplicaciones H - OperIA. Queda planificado y pausado.

---

## 7. Evolucion de la gobernanza

ADR-002, REG-0001 y AR-VIS-001 quedaron como marco obligatorio para dominios gobernados. FO-COC-0001 fue fortalecido mediante la Regla de Validez del Entregable para Dominios Gobernados, que invalida auditorias, diagnosticos, propuestas, planes, microcirugias, validaciones, cierres y transiciones si no inician con la certificacion de autoridad rectora correspondiente.

CF-0001 inaugura la serie provisional CF-000X del Corpus Fundacional:

* CF-0000 - Mapa del Corpus Fundacional queda previsto.
* CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA queda publicado.
* CF-0002 - Metodologia de Derivacion de Aplicaciones H - OperIA queda planificado.

---

## 8. Estado de CF-0001 y CF-0002

CF-0001 queda publicado como Primera Version Fundacional de la Arquitectura Visual Comun de la Suite H - OperIA. No debe seguir refinandose por estilo salvo errores objetivos, contradicciones o cambios arquitectonicos aprobados.

CF-0002 queda oficialmente planificado dentro del Corpus Fundacional. Su Declaracion Metodologica Fundacional fue aprobada como punto de partida, pero no se creo documento definitivo ni se desarrollaron fases, matrices, anexos o procedimientos. Su desarrollo completo queda diferido.

---

## 9. Estado de Ruta 1

Ruta 1 corresponde a la App Publica especifica de AMENA en `C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602`.

La tercera microcirugia visual fue implementada sobre `src/App.tsx` y `src/index.css`, validada tecnicamente con build, pero no aprobada humanamente para publicacion porque seguia siendo insuficiente para la estrategia comercial vigente del Centro Demo.

El trabajo fue preservado en la rama `checkpoint/amena-82-visual-experiment` con commit `5115b47185525860654b2f0e0abe562f591e2dbe`. La rama estable `feature/complete-tracking-funnel` quedo restaurada en `da852f0604eab355d8413b80f8d23bdb001af757`, limpia y sin commit del experimento.

---

## 10. Estado de Ruta 2

Ruta 2 corresponde a `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`, rama `codex/ruta-2-reservas-generico-manual`, commit `2afecf5d9a98833fa1030229a1de2cb4f741aa4d`.

La auditoria de solo lectura certifico:

* working tree limpio;
* ahead/behind `0 0`;
* identidad visible parcialmente generalizada;
* existencia de `Nova Habitat / Distrito Norte` como identidad demo parcial;
* ausencia de AMENA como identidad visible principal;
* persistencia de residuos nominales y tecnicos heredados: `acompanamiento_amena`, `AcompanamientoAmenaScreen`, `amena-btn`, `amena-card-welcome`, `amena_reservation_session_id`, `amena_public_reservation_app`;
* persistencia de textos no genericos: `Automatiza Hoy IA`, correo `marivas@automatizahoy.ai`, `App ADMIN`;
* existencia de README heredado AMENA;
* assets demo junto a assets heredados potencialmente contaminantes.

Ruta 2 no consume actualmente los Bloques Supabase 01 a 05 como catalogo comercial visible. Usa datos locales/manuales/mock y solo conserva persistencia parcial de eventos mediante Supabase.

---

## 11. Checkpoint preservado y su proposito

Checkpoint:

`checkpoint/amena-82-visual-experiment`

Commit:

`5115b47185525860654b2f0e0abe562f591e2dbe`

Proposito:

Preservar la microcirugia visual de Ruta 1 como experimento no aprobado, ejecutado sobre la app especifica de AMENA. Este checkpoint no representa la estrategia comercial vigente del Centro Demo, no debe fusionarse automaticamente, no debe trasladarse automaticamente a Ruta 2 y cualquier reutilizacion futura requiere auditoria especifica.

---

## 12. Trabajo pendiente

1. Iniciar AMENA 83 con auditoria de continuidad y certificacion FO-COC-0001.
2. Reanudar sobre Ruta 2 generica/manual, no sobre Ruta 1.
3. Preparar plan de microcirugia para Ruta 2 basado en AR-VIS-001 y CF-0001.
4. Separar visualmente Suite H - OperIA / Empresa Demo / Proyecto Demo.
5. Limpiar residuos visibles de AMENA, Automatiza Hoy IA y nomenclatura Ruta 1 sin tocar logica hasta autorizacion.
6. Mantener Supabase pausado.
7. No iniciar CF-0002 ni nuevos documentos fundacionales hasta autorizacion.

---

## 13. Riesgos y bloqueos

* Riesgo de copiar el checkpoint de Ruta 1 hacia Ruta 2 sin auditoria.
* Riesgo de confundir generalizacion parcial con demo generica lista.
* Riesgo de tratar eventos Supabase parciales como integracion funcional con Bloques 01 a 05.
* Riesgo de modificar nombres tecnicos que participen en estado, tracking o navegacion sin plan funcional.
* Riesgo de diluir H - OperIA si la intervencion solo cambia textos o colores y no arquitectura perceptiva.
* Bloqueo vigente: no abrir Supabase, no ejecutar SQL, no activar integraciones y no modificar backend sin nueva autorizacion.

---

## 14. Punto exacto de reanudacion para AMENA 83

AMENA 83 debe iniciar en el repositorio:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`

Rama:

`codex/ruta-2-reservas-generico-manual`

HEAD esperado:

`2afecf5d9a98833fa1030229a1de2cb4f741aa4d`

Primera tarea recomendada:

Preparar una propuesta de microcirugia visual para Ruta 2 generica/manual, en modo documental o de plan, antes de modificar codigo. La propuesta debe derivar de AR-VIS-001 y CF-0001, y debe atender la separacion perceptiva entre Suite H - OperIA, Empresa Demo y Proyecto Demo.

---

## 15. Instruccion inicial para el siguiente chat

Aplicar FO-COC-0001 vigente. Iniciar con `CERTIFICACION DE AUTORIDAD RECTORA` para el dominio Visual, certificando AR-VIS-001, Admin / Centro de Mando como unica Autoridad Rectora Visual, CF-0001 como documento rector complementario y Ruta 2 generica/manual como aplicacion objetivo.

Confirmar antes de cualquier trabajo:

1. repositorio `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`;
2. rama `codex/ruta-2-reservas-generico-manual`;
3. HEAD local/remoto localmente conocido `2afecf5d9a98833fa1030229a1de2cb4f741aa4d`;
4. ahead/behind `0 0`;
5. working tree limpio;
6. no hacer fetch.

No tocar Ruta 1, no fusionar el checkpoint, no abrir Supabase, no ejecutar SQL, no modificar backend y no crear documentos fundacionales nuevos. La continuidad debe seguir sobre Ruta 2 y esperar validacion humana antes de cualquier implementacion.

---

## 16. Cierre

Codex AMENA 82 queda cerrado. La continuidad hacia AMENA 83 queda trazada, con gobernanza vigente, Ruta 1 resguardada como experimento historico no aprobado y Ruta 2 establecida como prioridad operativa del Centro Demo.

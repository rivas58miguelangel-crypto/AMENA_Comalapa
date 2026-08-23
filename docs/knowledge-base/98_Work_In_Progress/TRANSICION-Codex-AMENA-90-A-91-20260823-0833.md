# TRANSICION-Codex-AMENA-90-A-91-20260823-0833

## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio:** Continuidad operativa, Centro Demo y aplicaciones derivadas de la Suite H - OperIA.
* **Entrada vigente de REG-0001:** AR-VIS-001.
* **Autoridad Rectora:** Admin / Centro de Mando.
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`.
* **Rama certificada al cierre:** `centro-mando-admin10`.
* **Aplicacion o artefacto objetivo:** Transicion segura de CODEX AMENA 90 a CODEX AMENA 91.
* **Declaracion de derivacion:** Este documento aplica la autoridad vigente; no la redefine.
* **Resultado de la regla de bloqueo:** VALIDO para continuidad documental. La Microcirugia A permanece como trabajo local pendiente de prueba humana.
* **Fecha y equipo:** 2026-08-23; Laptop.

## A. GOBERNANZA Y REGLAS DE CONTINUIDAD

Este cierre aplica `KB-0003`, `FO-COC-0001`, `ADR-002`, `REG-0001` y `CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA`.

Reglas vigentes:

* La Base de Conocimiento y Git son fuentes rectoras; este documento las complementa y no las sustituye.
* Toda certificacion Git posterior a cambio de equipo, apertura de chat o reanudacion debe iniciar con `git fetch origin --prune` en cada repositorio involucrado.
* No se declara sincronismo usando referencias `origin` locales sin actualizar.
* No se hacen commit ni push sin autorizacion humana expresa.
* Las microcirugias deben ser acotadas, reversibles y verificables.
* Si se cambia de Laptop a PC, no continuar automaticamente: aplicar protocolo completo de cambio de equipo. La Microcirugia A no existe aun en GitHub.

## B. CERTIFICACION GIT DEL CIERRE

Se ejecuto `git fetch origin --prune` antes de certificar cada repositorio.

| Repositorio | Rama | HEAD local = origin | Ahead/behind | Working tree |
| --- | --- | --- | --- | --- |
| Centro Demo `AMENA_Comalapa` | `centro-mando-admin10` | `6a867e2b8ea1ab7ee17e9559ea22b883c7e45f54` | `0 0` | Modificado solo por Microcirugia A: `src/App.tsx` |
| Mensajeria Operacional | `master` | `9f306dc66eb7faf8cad6e16e2783c910aacc6309` | `0 0` | Modificado solo por Microcirugia A: `src/main.jsx`, `src/styles.css` |
| Ruta 2 Reservas | `codex/ruta-2-reservas-generico-manual` | `043d7f72927b458882d4a7f992b369e9837206ba` | `0 0` | Limpio |
| Demo API | `main` | `d50378e66920dce2535140e7e09bf3b18734da73` | `0 0` | Limpio |

Checkpoints publicados previos a la Microcirugia A:

* Centro Demo: `6a867e2b8ea1ab7ee17e9559ea22b883c7e45f54` - `refactor: structure phase 03 operational layers`.
* Mensajeria: `9f306dc66eb7faf8cad6e16e2783c910aacc6309` - `feat: refine operational messaging experience`.

Los working trees modificados de Centro Demo y Mensajeria son esperados. No se deben revertir, añadir ni publicar durante este cierre.

## C. BLOQUE C - WHATSAPP REAL

Estado: **CERRADO Y CERTIFICADO**.

| Caso | Flujo certificado | Plantilla | Language | Estado | Categoria |
| --- | --- | --- | --- | --- | --- |
| Caso 1 | Centro Demo -> Demo API -> Meta Cloud API -> WhatsApp real recibido | `h_operia_demo_reservation_link` | `es_ES` | `APPROVED` | `UTILITY` |
| Caso 2 | Ruta 2 -> Demo API -> Meta Cloud API -> WhatsApp real recibido | `h_operia_reservation_summary` | `es_ES` | `APPROVED` | `UTILITY` |

Guia operativa rectora: `docs/knowledge-base/98_Work_In_Progress/GUIA-OPERATIVA-WHATSAPP-META-HOPERIA-20260821.md`.

Hallazgos reutilizables:

* No envolver variables reales con signos `< >`.
* `provider_accepted` no equivale a `delivered` ni `read`; la recepcion humana certifica el cierre.
* Antes del primer envio de una plantilla nueva, certificar directamente en Meta `name`, `language`, `status` y `category`.
* Spanish (SPA) no implica `language.code = "es"`; ambos casos requieren `es_ES`.
* Modificar Environment requiere Deploy/Rebuild; Vite necesita variables correctas al iniciar y `--strictPort`.
* Revisar logs antes de gastar reintentos.

## D. BLOQUE D - MENSAJERIA OPERACIONAL Y FASE 03

Objetivos rectores:

1. Diseno grafico y coherencia visual de Mensajeria Operacional.
2. Integracion progresiva: Mensajeria Operacional -> Centro Demo -> FASE 03 -> Expediente Vivo -> pagina operativa -> segunda lectura H - OperIA Intelligence.

El checkpoint visual de Mensajeria ya publicado incluyo identidad H - OperIA, layout responsive, semantica honesta de Expediente Vivo, adjuntos declarados demo y senal de destinatario seleccionado.

La estructura publicada de FASE 03 es unica:

* **FASE 03 - Coordinacion y Seguimiento Operacional.** Aportes humanos posteriores a la reserva, provenientes del seguimiento comercial y de la coordinacion del equipo.
* **CAPA 1 - Seguimiento Comercial de Vendedoras.** Fuente: App de Vendedoras / Registro de Seguimiento Comercial.
* **CAPA 2 - Mensajeria Operacional del Equipo.** Fuente: Mensajeria Operacional.

Las fuentes permanecen independientes. No se fusionaron sus arrays ni fixtures.

## E. ARQUITECTURA FUNCIONAL ACORDADA

Flujo objetivo completo:

`Mensajeria Operacional -> aporte humano -> FASE 03 CAPA 2 -> Expediente Vivo -> pagina operativa correspondiente -> H - OperIA Intelligence -> analisis -> recomendacion -> responsable funcional -> pagina -> seccion exacta -> link navegable.`

Siempre distinguir evidencia humana de interpretacion H - OperIA Intelligence. Para el routing demo no usar IA:

| Area | Destino |
| --- | --- |
| Documentos | Documentos + Expediente Vivo |
| Finanzas / Cobros | Finanzas / Pagos + Expediente Vivo |
| Arquitectura / Construccion | Inventario / Construccion + Expediente Vivo |
| Direccion | Centro Ejecutivo + Expediente Vivo |
| Servicio al Cliente | Servicio Cliente + Expediente Vivo |
| Ventas / Comercial | Ventas / Vendedoras + Expediente Vivo |

La segunda lectura de FASE 03 debera mostrar analisis, recomendacion, responsable por rol, pagina destino, seccion exacta y link navegable. Reutilizar cuando encaje `demoFindings`, `AiObservation`, `openAdminFinding` y `adminTargetAnchor`; FASE 03 conserva origen/trazabilidad y FASE 05 la vista transversal consolidada. No inventar nombres de personas: usar roles.

## F. MICROCIRUGIA A - IMPLEMENTADA, NO PUBLICADA

**Estado:** implementada en working tree, sin prueba humana, sin commit y sin push. Debe preservarse integra como Work In Progress.

Alcance implementado:

* Centro Demo: `src/App.tsx` agrega `Registrar aporte operativo`, visible solo con `liveExpediente` activo.
* Abre o reutiliza ventana nombrada `hoperia-operational-messaging` mediante `VITE_OPERATIONAL_MESSAGING_APP_URL`, con fallback `http://localhost:3002/`.
* Genera `bridgeId` efimero, conserva referencia de ventana y usa origen exacto; nunca `postMessage("*")`.
* Define handshake: `hoperia.operational.messaging.bridge.ready`, `hoperia.operational.messaging.bridge.context` y `hoperia.operational.messaging.bridge.ack`.
* Centro Demo emite `ready` y `context` con reintentos breves para carga inicial; Mensajeria valida y responde ACK.
* Mensajeria: `src/main.jsx` acepta solo `event.origin === VITE_ADMIN_ORIGIN`, fallback `http://localhost:3000`, y valida contrato, version, `bridgeId`, fuente y flags demo/no persistido.
* Mensajeria: `src/styles.css` presenta el contexto recibido.

Contexto efimero transmitido:

* cliente;
* `Reservation ID` (identificador rector);
* `Expediente ID`;
* proyecto;
* unidad;
* `demoRunId` si existe;
* `isDemo: true` y `persisted: false`.

UI esperada en Mensajeria:

* Apertura directa: `Modo demostrativo sin expediente activo.`
* Con contexto valido: `Contexto operativo recibido`, cliente, Reservation ID, Expediente ID, proyecto, unidad y `Demo - No persistido`.

Validaciones ya realizadas:

* `git diff --check` correcto en ambos repositorios.
* `npm.cmd run build` correcto en Centro Demo y Mensajeria.

Expresamente no implementado:

* composer funcional, aporte real, `OperationalContributionEvent`, `eventId` de aporte, ACK/deduplicacion de aportes o replay;
* FASE 03 dinamica, Expediente Vivo dinamico, espejos en paginas o segunda lectura H - OperIA;
* analisis, recomendaciones, responsables, anchors nuevos o navegacion operativa;
* backend, Supabase, persistencia, adjuntos reales o paquetes.

## G. PUNTO DE REANUDACION PARA CODEX AMENA 91

Primer trabajo obligatorio: **prueba humana de handshake de la Microcirugia A ya implementada**. No volver a implementarla ni iniciar la Microcirugia B antes de certificarla.

Secuencia humana:

1. Certificar servidores locales: Centro Demo `http://localhost:3000` y Mensajeria `http://localhost:3002`.
2. Abrir un `liveExpediente` valido en Centro Demo.
3. Pulsar `Registrar aporte operativo`.
4. Confirmar apertura de Mensajeria en ventana separada.
5. Confirmar cliente, Reservation ID, Expediente ID, proyecto, unidad y `Demo - No persistido`.
6. Confirmar que no existe envio de aporte todavia.
7. Abrir Mensajeria directamente y confirmar `Modo demostrativo sin expediente activo.`
8. Revisar consola y errores.
9. Solo si la prueba es correcta, evaluar commit/push independiente de Microcirugia A.

Plan posterior, estrictamente secuencial:

1. Composer real y `OperationalContributionEvent`.
2. Recepcion, ACK y deduplicacion.
3. FASE 03 CAPA 2 dinamica como registro maestro humano.
4. Expediente Vivo y espejo en pagina destino.
5. Segunda lectura H - OperIA: analisis, recomendacion y responsable.
6. Pagina, seccion exacta y navegacion.
7. Prueba humana integral.

## H. RESTRICCIONES DE REANUDACION

No asumir que los working trees de Centro Demo y Mensajeria son un error: deben coincidir exactamente con los tres archivos y alcance de la Microcirugia A. No transportar ni continuar desde otro equipo hasta resolver expresamente el trabajo no publicado. No implementar Microcirugia B antes de certificar A.

## I. CIERRE

* **CODEX AMENA 90:** cerrado documentalmente.
* **Transicion a CODEX AMENA 91:** publicada con este documento.
* **Microcirugia A:** preservada como Work In Progress para prueba humana; sin commit ni push.

# TRANSICION-Codex-AMENA-92-A-93-20260828-1014

## CIERRE FORMAL Y PROTOCOLO DE CONTINUIDAD

**Cierre:** Codex AMENA 92  
**Continuidad:** Codex AMENA 93  
**Fecha y hora local de creación:** 28 agosto 2026, 10:14 (America/Guatemala)  
**Tipo de artefacto:** Documento auxiliar de continuidad, subordinado a la Base de Conocimiento y a los documentos rectores.  
**Estado:** transición documental; no constituye publicación de código, commit, push ni deploy.

## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio:** Visual, únicamente para la superficie de Admin / Centro de Mando y sus adaptaciones documentadas.
* **Entrada vigente de REG-0001:** `AR-VIS-001`.
* **Autoridad Rectora:** Admin / Centro de Mando, en `C:\Amena\Codex\AMENA_Comalapa`.
* **Evidencia inspeccionada:** `ADR-002`; `REG-0001`; `CF-0001` localizado en `docs/knowledge-base/02_Corpus_Fundacional/Arquitectura Visual Comun de la Suite H - OperIA.md`; y el estado Git certificado de este repositorio.
* **Implementaciones hermanas:** Comunicaciones Internas y Registro Operacional; son referencias derivadas y no redefinen la autoridad.
* **Aplicación objetivo:** Centro Demo / Centro de Mando dentro de este repositorio.
* **Excepciones autorizadas:** identidad gráfica específica del cliente solo en los límites declarados por `AR-VIS-001`; no se propone ni ejecuta una excepción visual en este cierre.
* **Derivación:** las decisiones visuales futuras de AMENA 93 deberán derivar de `AR-VIS-001`, `ADR-002`, `REG-0001` y `CF-0001`. Este documento no crea, sustituye ni redefine una Autoridad Rectora.

## 1. DOCUMENTOS CONSULTADOS Y JERARQUIA APLICADA

La reconstrucción se realizó desde la Base de Conocimiento de `AMENA_Comalapa`, Git y la transición inmediatamente anterior. Se consultaron:

* `KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats`.
* `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado`.
* `GOV-0001 - Sistema de Continuidad del Conocimiento`.
* `GOV-0002 - Protocolo de Inicialización de Nuevos Proyectos y Bootstrap Metodológico`.
* `ADR-002-gobernanza-de-autoridades-rectoras-suite-h-operia.md`.
* `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA`.
* `CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA`, cuyo archivo vigente contiene el identificador provisional `CF-0001`.
* `docs/architecture-decisions.md`.
* `PD-0001 - Arquitectura White Label y Parametrizacion de Produccion`.
* `VAPI-0001 - Auditoria y migracion de descarga autenticada de grabaciones de Marta`.
* Series conceptuales `ACO-0001` a `ACO-0005` y `SUPABASE-0001` a `SUPABASE-0003`, como marco de conocimiento operacional y futura persistencia; no se abre trabajo de persistencia en AMENA 93 por este documento.
* `TRANSICION-Codex-AMENA-91-A-92-20260827-1206.md`.

### Observaciones documentales

* No existe un archivo cuyo nombre literal sea `CF-0001`; el documento fundacional existe bajo su nombre descriptivo y declara `CF-0001` como identificador provisional. Se aplica esa equivalencia trazable.
* No fue localizado un documento separado con nombre literal `CF-0001`; no se inventa uno ni se duplica.
* No se identificó un documento posterior que contradiga los principios de continuidad, aislamiento de corridas, Expedientes Vivos múltiples o Autoridad Rectora Visual.
* `REG-0001` designa actualmente autoridad para el dominio Visual. No designa autoridad rectora para persistencia, IA, operación o integraciones; por tanto, este cierre no certifica esas áreas como dominios gobernados ni autoriza cambios en ellas.

## 2. AUDITORIA PREVIA DEL REPOSITORIO RECTOR

La auditoría se ejecutó antes de crear este archivo. Conforme a KB-0003 y FO-COC-0001 se actualizó la referencia remota con `git fetch origin --prune` y se verificó nuevamente:

| Campo | Resultado certificado |
| --- | --- |
| Repositorio | `C:\Amena\Codex\AMENA_Comalapa` |
| Origin fetch/push | `https://github.com/rivas58miguelangel-crypto/AMENA_Comalapa.git` |
| Rama | `centro-mando-admin10` |
| HEAD local | `dc08555e759d0ff6343e27ba72d1079c569e608e` |
| HEAD remoto | `dc08555e759d0ff6343e27ba72d1079c569e608e` |
| HEAD == origin | Sí |
| Ahead/behind | `0 0` |
| Working tree antes de crear este documento | Limpio |
| Último commit | `dc08555 feat: add active demo evidence summary panel` |
| Deploy posterior | No consta deploy posterior en el estado certificado de partida |

El HEAD certificado de partida es el commit previo a este documento. La creación de esta transición constituye el único cambio documental esperado.

## 3. SEMAFORO DE CONTINUIDAD

### AMARILLO — continuidad permitida con observaciones explícitas

| Área | Estado | Fundamento |
| --- | --- | --- |
| Git rector | Verde | Rama, HEAD, remoto, sincronización y árbol limpio fueron verificados. |
| Documentación | Amarillo | `CF-0001` existe por nombre descriptivo con identificador provisional; no hay conflicto sustantivo. |
| Estado funcional AMENA 92 | Verde | Los cuatro hitos y la corrida funcional descritos abajo están trazados a commits y datos de prueba proporcionados y verificados. |
| Arquitectura | Verde con restricción | Se preservan aislamiento, `demoRunId`, finalize scoped, ACK, replay scoped y Expediente Vivo scoped. |
| Repositorios relacionados | Amarillo | Mensajería Operacional y Ruta 2 tienen estado conocido, pero deberán auditarse de forma independiente al intervenirlos. |
| Trabajo publicado | Verde | El HEAD rector contiene el panel temporal de datos simulados; no se afirma deploy posterior. |
| Trabajo pendiente | Amarillo | FASE 05 accionable y el circuito con Mensajería aún requieren auditoría, contrato e implementación posterior. |
| Riesgos | Amarillo | Ventana nombrada Ruta 2, bridgeId, replay múltiple y multidispositivo permanecen abiertos, sin convertirse en frente inmediato. |
| Punto de reanudación | Verde | AMENA 93 debe comenzar sin modificar código: auditoría de FASE 05, Mensajería y calidad de evidencia. |

El amarillo no impide esta transición documental porque Git está certificado, las fuentes rectoras fueron reconstruidas y las incertidumbres quedan delimitadas. Sí impide presentar como implementado el circuito futuro FASE 05 ↔ Mensajería.

## 4. CONTEXTO OPERATIVO CERTIFICADO

### A. Hechos certificados

* AMENA 92 trabajó sobre `centro-mando-admin10` y cerró en `dc08555e759d0ff6343e27ba72d1079c569e608e`.
* FASE 05 dejó de depender del fixture fijo de hallazgos y deriva hallazgos de evidencia de FASE 04.
* Una sesión demo integrada puede contener múltiples Expedientes Vivos; cada reserva concluida y válidamente vinculada a la sesión activa genera su expediente correspondiente.
* FASE 04 prioriza los Expedientes Vivos del `demoRunId` activo, respeta cantidades 0/1/N y admite evidencia parcial sin fallback visual falso.
* El panel temporal de datos simulados es opcional, cerrado por defecto, scoped a la corrida activa y no persistido.
* Una prueba con cliente `Miguel 10 Rivas`, Reservation ID `HOP-RES-A48D1K07-8AY12R`, Expediente ID `HOP-EXP-A48D1K07-8AY12R` y `demoRunId` `demo-ac8fa031-cab2-42e0-b1ad-e2616813e823` produjo 9 registros: VAPI 3, Registro Comercial 3 y Mensajes 3; Reservas 0. FASE 05 produjo únicamente hallazgos respaldados por las tres categorías con evidencia.

### B. Decisiones vigentes

* Standalone/promocional permanece aislado y no crea Expediente Vivo en Admin.
* Solo una reserva integrada, correctamente vinculada a una sesión demo activa, entra al Centro Demo.
* Principal/secundarios es una selección escénica del presentador, no jerarquía arquitectónica.
* `demoRunId` es la identidad de la corrida; finalize, reset, ACK, replay y liveExpediente deben permanecer scoped.
* Una corrida cerrada no puede rehidratarse como evidencia vigente.
* FASE 05 debe convertir hallazgos respaldados en instrucciones humanas, ejecutivas y accionables, sin inventar fechas, responsables, hechos ni estados.
* Mensajería Operacional es parte del circuito operacional central de H-OperIA, no un canal secundario.

### C. Trabajo publicado en AMENA 92

#### FASE 04 → FASE 05

* `b6e873d7acb945b748a413d1c6b1ae83256340c6` — `feat: derive demo findings from phase 04 evidence`.
* Solo se generan hallazgos con evidencia existente; cero evidencia no produce hallazgos ficticios.
* No se abrió persistencia, backend ni Supabase.

#### Múltiples Expedientes Vivos

* `b156ed6a169ff45bb3706d1965573db64927c59a` — `feat: support multiple live expedientes per demo run`.
* Cada reserva concluida dentro de la sesión activa genera su Expediente Vivo.

#### Alineación FASE 04 con Expedientes Vivos

* `971bbe0d14ea94d9bbdf9c41946b6e0065447ff1` — `feat: align phase 04 evidence with live expedientes`.
* Expediente seleccionado primero; los demás después; fixtures solo completan cantidades solicitadas.

#### Panel temporal de datos simulados

* `dc08555e759d0ff6343e27ba72d1079c569e608e` — `feat: add active demo evidence summary panel`.
* Toggle único, cerrado por defecto, cuatro categorías, conteos explícitos, máximo tres tarjetas ejecutivas, sin históricos, sin fallback, sin persistencia, backend ni Supabase.

### D. Trabajo no realizado

* No existe todavía una conversión completa de cada hallazgo en caso/hilo de Mensajería Operacional.
* No existe todavía un ciclo productivo completo composer → evento operacional → nueva evidencia → reevaluación de Intelligence → actualización de Admin.
* No se certifican adjuntos, archivos, imágenes, videos u otras capacidades no demostradas.
* No se abrió persistencia productiva, Supabase productivo, backend definitivo ni industrialización.
* No se modificó código de Mensajería Operacional ni de otros repositorios en AMENA 92.

### E. Hipótesis y riesgos pendientes

* Ruta 2 puede conservar contexto integrated antiguo en memoria en ciertos cierres.
* `ReservationCompletedEvent` podría endurecer la validación de `bridgeId` en Admin.
* La Ruta 2 conserva solo el último evento para replay y no reconstruye por sí sola una colección completa de reservas.
* Un teléfono independiente no obtiene automáticamente opener, bridge ni `demoRunId`; no debe resolverse con una simulación frontend falsa.
* La calidad de Intelligence dependerá de evidencia de FASE 04 práctica, realista, específica y operativamente rica.

### F. Próximo punto operativo

AMENA 93 debe iniciar en este orden, sin modificar código inicialmente:

1. Reconstruir contexto desde esta transición, documentos rectores y Git.
2. Emitir Semáforo de Continuidad de apertura y certificar el contexto operativo.
3. Auditar FASE 05 existente y la calidad actual de evidencia FASE 04.
4. Auditar independientemente `C:\Amena\Codex\AMENA_Mensajeria_Operacional` antes de tocarlo.
5. Definir el contrato mínimo `Hallazgo → Caso Mensajería`.
6. Definir el contrato mínimo `Mensajería → nueva evidencia / Admin / Intelligence`.
7. Diseñar un hallazgo accionable con qué, por qué, qué hacer, quién, cuándo, objetivo y lugar de seguimiento, usando fecha/hora de fuente solo cuando sea válida.
8. Ejecutar únicamente microcirugías pequeñas, reversibles y auditables; revisar diff y validar build antes de cualquier publicación.
9. Realizar posteriormente una prueba integrada de punta a punta, incluyendo cantidades 0/1/N, múltiples expedientes, aislamiento por `demoRunId`, categorías vacías, panel temporal, fechas humanas, no fallbacks y no contaminación entre corridas.

## 5. MENSAJERIA OPERACIONAL COMO COMPONENTE CRITICO

### Estado conocido

* Repositorio: `C:\Amena\Codex\AMENA_Mensajeria_Operacional`.
* Rama conocida: `master`.
* Último HEAD certificado conocido: `9f306dc66eb7faf8cad6e16e2783c910aacc6309`.
* Estado funcional conocido: React/Vite, bandeja, conversaciones, pantalla de creación y UI operacional evolucionada; composer sin ciclo productivo completo; antecedentes de `OperationalContributionEvent`; una microcirugía anterior de integración revertida; integración completa Admin ↔ Mensajería no construida.

Antes de cualquier modificación en ese repositorio deberán auditarse de nuevo origin, rama, HEAD, HEAD remoto, ahead/behind y working tree. El estado anterior no se presume vigente.

### Circuito objetivo no certificado como existente

`EVIDENCIA → HALLAZGO → CASO EN MENSAJERIA OPERACIONAL → PARTICIPACION HUMANA → NUEVA EVIDENCIA / COMENTARIOS / DECISIONES → REEVALUACION POR INTELLIGENCE → ACTUALIZACION DEL HALLAZGO → REFLEJO EN ADMIN`.

El caso debe conservar contexto, participantes pertinentes y objetivo de resolución. Las aportaciones humanas deberán poder convertirse en nueva evidencia operacional y regresar a Intelligence/Admin; el caso no debe quedar aislado. Este es el objetivo arquitectónico de AMENA 93, no una funcionalidad declarada como implementada.

## 6. PRINCIPIOS DE INTEGRIDAD QUE NO DEBEN DEGRADARSE

* aislamiento standalone/integrated;
* `demoRunId` como identidad de corrida;
* finalize scoped;
* reset/ACK asociados a la corrida correcta;
* corrida cerrada no rehidratable como evidencia vigente;
* validación de origin;
* integridad de bridge/postMessage;
* replay scoped;
* liveExpediente scoped;
* ausencia de limpieza global;
* no contaminación entre corridas.

## 7. TRAZABILIDAD Y REGLAS DE PUBLICACION

Este documento cumple la función de pieza formal de continuidad prevista por `KB-0003` y el formato de salida de `FO-COC-0001`. No sustituye la Base de Conocimiento, el IME, los documentos rectores, las decisiones arquitectónicas ni los planes de trabajo.

AMENA 93 no debe asumir desde esta transición rama, HEAD, working tree, origin, servidores o deploy de ningún repositorio relacionado. Toda intervención posterior requiere nueva certificación independiente. Este cierre no autoriza commit, push, deploy ni modificación de otros repositorios.

## 8. DICTAMEN DE CIERRE DOCUMENTAL

### APROBABLE

El repositorio rector fue auditado y coincide con el estado certificado de partida; el contexto fue reconstruido desde la Base de Conocimiento y los documentos rectores; el Semáforo AMARILLO permite continuidad documental; y el documento separa hechos, decisiones, trabajo publicado, trabajo no realizado, riesgos y punto exacto de reanudación.

La observación nominal de `CF-0001` queda trazada a su archivo descriptivo vigente y no constituye contradicción sustantiva. El documento está listo para la posterior verificación independiente y publicación conforme al Paso 2 indicado en la solicitud de continuidad.


# TRANSICION-Codex-AMENA-93-A-94-20260831-1106

## CIERRE FORMAL Y PROTOCOLO DE CONTINUIDAD

**Cierre:** Codex AMENA 93
**Continuidad:** Codex AMENA 94
**Fecha y hora local:** 31 de agosto de 2026, 11:06 (America/Guatemala)
**Tipo:** documento rector auxiliar de transición, subordinado a la Base de Conocimiento y a los documentos rectores.
**Estado:** transición documental publicada; no autoriza modificaciones de código, despliegues ni cambios en repositorios relacionados.

## 1. DOCUMENTOS RECTORES APLICABLES Y AUDITORÍA

Se aplicaron y revisaron:

- `KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats`.
- `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado`.
- `ADR-002 - Gobernanza de Autoridades Rectoras de la Suite H - OperIA`.
- `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA`.
- `CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA`.

`CF-0001` no tiene un archivo con ese nombre literal: corresponde al identificador provisional declarado dentro de `docs/knowledge-base/02_Corpus_Fundacional/Arquitectura Visual Comun de la Suite H - OperIA.md`. No se creó, modificó ni duplicó un documento fundacional.

La transición preserva las decisiones cerradas, la arquitectura vigente, las restricciones operativas, los protocolos Git, el aislamiento por corrida, los stashes protegidos y la separación entre hechos certificados, decisiones, pendientes y riesgos. No se detectó contradicción sustantiva con los documentos rectores ni deuda documental introducida. El semáforo de continuidad es **AMARILLO CONTROLADO** por la observación nominal de `CF-0001`, la modificación local preexistente en Ruta 2 y los despliegues VPS aún pendientes de auditoría; no impide la continuidad documental.

## 2. REPOSITORIO RECTOR Y ESTADO GIT INICIAL

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`
Rama: `centro-mando-admin10`
Origin: `https://github.com/rivas58miguelangel-crypto/AMENA_Comalapa.git`

Se ejecutó `git fetch origin --prune` antes de la certificación.

| Campo | Estado inicial certificado |
|---|---|
| HEAD local | `4789e28d84ddb2b8e467e5fed8067cbd8c0321a4` |
| HEAD remoto | `4789e28d84ddb2b8e467e5fed8067cbd8c0321a4` |
| Ahead/behind | `0 0` |
| Working tree antes de este documento | Limpio |
| Stash | `stash@{0}`: `WIP AMENA93 microcirugia4 contribution-return` |
| Último commit | `feat: integrate operational messaging contributions` |

El objeto del stash rector es `a13e335698a5d88e4df2f6c93d0414abae01ffea`. Se preservó intacto.

## 3. REPOSITORIOS RELACIONADOS

Todos fueron auditados sin modificar archivos, con `git fetch origin --prune`.

| Repositorio | Rama | HEAD local = remoto | Working tree | Stash |
|---|---|---|---|---|
| `C:\Amena\Codex\AMENA_Comalapa` | `centro-mando-admin10` | `4789e28d84ddb2b8e467e5fed8067cbd8c0321a4` = `4789e28d84ddb2b8e467e5fed8067cbd8c0321a4`; `0 0` | Limpio antes de crear transición | `stash@{0}`, objeto `a13e335698a5d88e4df2f6c93d0414abae01ffea` |
| `C:\Amena\Codex\AMENA_Mensajeria_Operacional` | `master` | `a8aecfc380d271c4358764c7b093d2c95b362842` = `a8aecfc380d271c4358764c7b093d2c95b362842`; `0 0` | Limpio | `stash@{0}`, objeto `cfd38b43a8da03ab699fa8b822fef363c2c5c022` |
| `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2` | `codex/ruta-2-reservas-generico-manual` | `d9cc8d883cb97663a922978aec348c142a4a3aa2` = `d9cc8d883cb97663a922978aec348c142a4a3aa2`; `0 0` | **Modificado:** `src/App.tsx` (preexistente, preservado) | No existe |
| `C:\Amena\Codex\AMENA_Registro_Operacional_Ventas` | `main` | `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7` = `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7`; `0 0` | Limpio | No existe |
| `C:\Amena\Codex\AMENA_Demo_API` | `main` | `d50378e66920dce2535140e7e09bf3b18734da73` = `d50378e66920dce2535140e7e09bf3b18734da73`; `0 0` | Limpio | No existe |

El HEAD certificado conocido de Mensajería coincide con `a8aecfc...`: `feat: humanize operational messaging workflow`. Ningún stash fue aplicado, extraído, eliminado, reescrito, reemplazado ni alterado.

## 4. CIERRE FUNCIONAL DE AMENA 93

Quedó completado y validado el flujo:

`Finding → ABRIR GRUPO Y PARTICIPAR → Mensajería Operacional → bandeja principal → grupo operacional humano → ingreso al grupo → aporte humano → ACK aceptado → aporte incorporado al Expediente Vivo → mismo Finding actualizado → APORTES DEL EQUIPO`.

Mensajería quedó humanizada con nombres de grupos por cliente y tema, prioridad y estado en lenguaje humano, situación que requiere atención, por qué importa, acción recomendada, responsable actual, personas que pueden aportar, detalles técnicos secundarios, composer de participación y tipos `Comentario`, `Observación`, `Recomendación` y `Acción`. También quedaron `YA TERMINÉ DE PARTICIPAR`, `IR A MENSAJERÍA OPERACIONAL`, navegación de regreso y standalone preservado.

### Bridge

La reentrada quedó resuelta. La causa raíz fue `integratedCases` en dependencias del `useEffect`, que encadenaba `operational_case.open`, `setIntegratedCases`, nueva referencia, cleanup/mount, nuevo `ready`, nuevo `open` y `setScreen('inbox')`.

La corrección validada usa listener estable, `useEffect` desacoplado de `integratedCases`, actualización funcional, idempotencia por `operationalCaseId`, ausencia de duplicados y ausencia de retorno a inbox para el mismo caso. Un caso nuevo puede llevar a bandeja y resaltarse. Se preservaron navegación de detalle, React.StrictMode y standalone. La instrumentación `[AMENA93-RUNTIME]` fue eliminada y verificada independientemente: `NO_AMENA93_RUNTIME_OCCURRENCES` y `NO_TEMP_RUNTIME_LOGS_FOUND`.

## 5. ARQUITECTURA FUNCIONAL Y RESTRICCIONES VIGENTES

Arquitectura demostrada:

`App Pública de Reservas → Centro Demo → Expediente Vivo → Evidencias → H-OperIA Intelligence → Findings → Mensajería Operacional → aporte humano → nueva evidencia → actualización del mismo Finding`.

Se preservan `demoRunId`, `reservationId`, `expedienteId`, `sourceEntityId` y `operationalCaseId`; validación de origin; `postMessage` controlado; reset y cierre scoped; ausencia de limpieza global; y ausencia de rehidratación indebida de corridas cerradas. Standalone permanece aislado. No se modifica código de aplicaciones durante este cierre.

## 6. DECISIONES CERRADAS Y ALCANCE DE INTEGRACIÓN

La integración real demostrada comprende Reservas, Centro Demo, Expediente Vivo, H-OperIA Intelligence y Mensajería Operacional. No se cablearán ahora todas las aplicaciones al Centro de Mando.

UX/Experiencia del Usuario, Director General y Registro/Vendedoras se mostrarán preparadas funcional y visualmente para futura integración. Servicio al Cliente, Cobros, Documentos, Construcción, Finanzas y otras áreas pueden formar parte del ecosistema sin ser necesariamente visibles en el demo. La narrativa debe distinguir siempre integración real de preparación futura.

H-OperIA Inmobiliaria es un caso demostrativo, no un límite sectorial. La Suite conecta progresivamente personas, procesos, información, evidencia, decisiones e inteligencia para distintas áreas e industrias.

## 7. ESTADO DEL DEMO Y VPS

La regla vigente es que las aplicaciones de demostraciones reales se ejecuten desde VPS Hostinger. `localhost` queda para desarrollo, pruebas y diagnóstico. No se realizó despliegue durante este cierre.

Existe una demostración durante la tarde del 31 de agosto de 2026. El frente urgente posterior a la apertura de AMENA 94 es **AUDITORÍA Y DESPLIEGUE VPS PARA DEMO**, incluyendo inventario, estado de despliegue, URLs, repositorios, ramas, builds, procesos, puertos, Nixpacks/servicios, variables, API, origins, `postMessage`, bridge, reset, prueba integral y corrida final.

## 8. PUNTO EXACTO DE REANUDACIÓN: UX

AMENA 94 debe iniciar directamente con **DISEÑO Y DESARROLLO DE LA APLICACIÓN UX / EXPERIENCIA DEL USUARIO**. El usuario aportará los insumos de negocio. La aplicación debe ser práctica, estructurada, operacional, clara, fácil de usar, orientada a acciones, coherente con Suite H-OperIA y útil durante la vida del negocio.

Modelo inicial:

`Situación observada → clasificación → evidencia → impacto → recomendación → responsable → acción → seguimiento → resultado → aprendizaje`.

Personas designadas de distintos roles registrarán observaciones estructuradas sobre la experiencia del cliente. La aplicación deberá quedar preparada para alertas, oportunidades, acciones, recomendaciones, capacitación, decisiones, aprendizaje, conocimiento organizacional y futura alimentación de H-OperIA Intelligence. No se cableará al Centro de Mando sin autorización expresa posterior.

## 9. PLAN AMENA 94

1. Apertura AMENA 94 y certificación de continuidad.
2. UX / Experiencia del Usuario.
3. Auditoría y despliegue VPS urgente para la demostración del 31-08-2026; puede interrumpir temporalmente UX.
4. Director General: lectura de qué ocurre, qué importa, decisiones, mejoras, empeoramientos, riesgos, oportunidades, asuntos sin responsable y decisiones pendientes; visual, funcional y sin duplicar Centro de Mando.
5. Revisión gráfica, narrativa, funcional y de coherencia de Registro/Vendedoras; sin puente completo.
6. Métricas de valor, ganancia, pérdida e impacto de H-OperIA.
7. Revisión integral del Demo y certificación VPS.
8. Narrativa comercial definitiva, guiones, audios y videos nuevos.
9. Definición de las tres ofertas, perfiles de prospectos e investigación en El Salvador y Guatemala.
10. Elastic Email, WhatsApp, prospección controlada y primeras reuniones.
11. Cursos empresariales y programas académicos/institucionales.

### Métricas de valor

Es un frente estratégico sin modelo definitivo. Debe distinguir resultado observado, pérdida real, riesgo estimado, oportunidad estimada, acción recomendada, acción ejecutada, resultado posterior, valor recuperado, valor protegido, valor generado, contribución atribuible y contribución asistida por H-OperIA. No debe afirmar causalidad donde solo exista correlación o contribución parcial.

### Oferta y comercialización

Las tres líneas vigentes son: (1) soluciones empresariales con IA —diagnóstico, diseño, desarrollo e implementación—; (2) formación empresarial en IA para transformar procesos y trabajo, en niveles ejecutivo, gerencial, operativo y taller aplicado; y (3) formación académica/institucional para universidades, institutos, maestrías, escuelas de negocio, gremiales, cámaras y asociaciones, con formatos de conferencia a programa. Concepto paraguas preliminar: “De usar IA a transformar organizaciones con IA”.

La prospección inicial se concentra en El Salvador y Guatemala, con lista pequeña y priorizada para inmobiliarias, constructoras, industria, distribución, logística, servicios, fuerzas de ventas y procesos administrativos intensivos. Elastic Email deberá usar segmentación, secuencias, asuntos, cuerpos, videos, CTA, seguimiento y métricas; no campañas masivas genéricas. WhatsApp deberá usar mensajes breves y humanos según tipo de contacto y una secuencia coordinada `Email → video → WhatsApp → conversación → reunión`, evitando saturación.

### Videos

Después de estabilizar las pantallas en cámara se crearán guiones, audios y videos nuevos: un anzuelo comercial de 90–120 segundos; una demo principal de 4–6 minutos con Reserva, Expediente Vivo, evidencias, Intelligence, Findings, Mensajería, aporte humano, Vendedoras, UX y Director General; y un video conceptual sobre humanizar la operación con IA y fortalecer al equipo completo. No se reutilizarán automáticamente audios que ya no representen el producto vigente.

La presentación breve preparada el 31-08-2026 es material inicial y deberá actualizarse con UX, métricas, demo, narrativa, videos y oferta comercial.

## 10. DICTAMEN DE CIERRE Y PUBLICACIÓN

Solo se creó este documento de transición. No se modificó código de aplicación ni documentación fundacional. El cambio único fue publicado en `centro-mando-admin10`; los archivos relacionados, incluido `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2\src\App.tsx`, no fueron incluidos.

La continuidad AMENA 94 queda autorizada desde el punto exacto indicado en la sección 8, sujeto a nueva certificación operativa cuando se intervenga cualquier repositorio o se prepare el VPS.

## 11. ADENDA — CERTIFICACIÓN FUNCIONAL DEL CICLO DE RETORNO

**Fecha:** 2 de septiembre de 2026 (America/Guatemala)
**Alcance:** certificación funcional puntual del ciclo `Expediente Vivo → Mensajería Operacional → aporte humano → ACK → actualización del mismo hallazgo → evidencia incorporada`.

### Hechos certificados

1. Los expedientes y hallazgos utilizados provenían de una corrida simulada previamente generada y ya verificada.
2. Desde esa corrida existente se abrió el Expediente Vivo de **Andrea Lopez**.
3. Desde un hallazgo de ese expediente se abrió correctamente Mensajería Operacional mediante **ABRIR GRUPO Y PARTICIPAR**.
4. Mensajería recibió el caso integrado correcto.
5. Se registró un aporte humano.
6. El aporte fue aceptado mediante ACK.
7. Mensajería mostró **Aporte incorporado al Expediente Vivo**.
8. Al regresar al Centro Demo sin recargar, el mismo hallazgo apareció como **Actualizado** y mostró **Aportes del equipo**, preservando autor, tipo, texto y fecha, sin duplicación visible.

### Precisión de alcance

Durante esta comprobación **no** se volvió a ejecutar FASE 04, ni se regeneraron, auditaron, aprobaron o cargaron datos simulados. La generación, auditoría, aprobación y carga de FASE 04, así como la creación de clientes y hallazgos de FASE 05, pertenecían a una corrida previa ya verificada. No hubo cambios de código posteriores conocidos en ese tramo durante esta certificación puntual.

### Dictamen

**SEMÁFORO VERDE** para el ciclo pendiente certificado. La integración preserva identidad de caso, confirma el aporte mediante ACK y reincorpora la evidencia al mismo hallazgo dentro del Expediente Vivo.

No se modificó código, configuración, despliegue ni ningún repositorio operativo durante esta certificación. Esta adenda es exclusivamente documental y no autoriza cambios posteriores sin la verificación y el alcance que correspondan.

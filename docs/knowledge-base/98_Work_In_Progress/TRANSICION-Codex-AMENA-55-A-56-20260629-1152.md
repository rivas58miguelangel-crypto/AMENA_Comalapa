# TRANSICION - Codex AMENA 55 a Codex AMENA 56

Fecha de generacion: 2026-06-29 11:52

Documento de transicion generado al cierre operativo de Codex AMENA 55, conforme al protocolo vigente de continuidad entre chats.

## Alcance de esta transicion

Esta transicion reconstruye el trabajo completo del chat Codex AMENA 55, no solo su cierre.

Fuente principal escaneada:

* Thread Codex local `019f13b9-d122-7d93-b830-f281a81da109`
* Titulo del thread: `Diagnosticar Centro Demo`
* Repositorio: `C:\Amena\Codex\AMENA_Comalapa`
* Rama: `centro-mando-admin10`

## Estado Git confirmado por el usuario al cerrar AMENA 55

* Rama: `centro-mando-admin10`
* HEAD: `5566439 fix: correct phase 04 preparation lifecycle`
* HEAD == `origin/centro-mando-admin10`
* Working tree clean
* `npm.cmd run lint` correcto
* `npm.cmd run build` correcto
* Push confirmado por el usuario antes de iniciar esta Fase 2.

## Punto de partida de AMENA 55

AMENA 55 inicio en Laptop con:

* Rama: `centro-mando-admin10`
* HEAD: `78b7f7f docs: add new project initialization governance protocol`
* HEAD == `origin/centro-mando-admin10`
* Working tree clean
* Lint/build correctos

Objetivo inicial:

Definir la frontera arquitectonica del Centro Demo como aplicacion demostrativa independiente, aunque temporalmente permaneciera dentro del mismo repositorio.

## Diagnostico arquitectonico inicial

El diagnostico inicial determino:

* El Centro Demo tiene identidad conceptual propia, respaldada por ADR-001.
* La implementacion visible seguia incrustada principalmente en `src/App.tsx`.
* `DemoPage` concentraba FASE 01-06, generadores demo, navegacion hacia Admin, datos simulados y hallazgos.
* `src/components/demo/DemoScenarioRoute.tsx` y `src/components/demo/DemoCommandEvidencePanel.tsx` ya eran piezas asociadas al Centro Demo.
* `src/types/demo` contiene contratos y motor conceptual mas avanzado que la UI monolitica actual, pero todavia no estaba conectado a la experiencia visible.
* Existia riesgo de mezclar Centro Demo con Admin productivo, Supabase futuro y paginas Admin reales.

Separacion logica recomendada:

* `src/demo/domain`
* `src/demo/fixtures`
* `src/demo/engine`
* `src/demo/ui`
* `src/demo/bridge`

Decision operativa:

No mover masivamente codigo. Avanzar por microcirugias reversibles.

## Trabajo realizado en AMENA 55

### Microcirugia 01 - Contrato de hallazgos demo

Commit:

* `e8337ff feat: add demo findings presentation contract`

Archivos:

* `src/demo/domain/demoFindings.ts`
* `src/demo/fixtures/demoFindingsFixtures.ts`

Resultado:

* Se creo un contrato minimo para representar hallazgos inyectados del Centro Demo hacia paginas Admin.
* Se definieron tipos exportables:
  * `DemoFindingSeverity`
  * `DemoFindingSource`
  * `DemoAdminTargetPage`
  * `DemoInjectedFinding`
  * `DemoRunPresentationState`
* Se creo `createDemoInjectedFindings(demoRunId)` con 7 hallazgos representativos de FASE 05.
* No se toco `App.tsx`.
* No se cambio UI.

### Microcirugia 03 - Puente Demo -> Admin

Commit:

* `56df504 feat: add demo findings admin bridge`

Archivo:

* `src/demo/bridge/demoFindingsBridge.ts`

Resultado:

* Se creo una capa pura de filtrado de hallazgos por pagina Admin destino.
* Funciones exportadas:
  * `getFindingsForAdminPage`
  * `hasDemoFindingsForAdminPage`
  * `getPrimaryFindingForAdminPage`
* No se toco `App.tsx`.
* No se cambio UI.

### Integracion 01 - FASE 05 conectada al contrato

Commit:

* `01b528c feat: connect phase 05 to demo findings contract`

Archivo:

* `src/App.tsx`

Resultado:

* FASE 05 dejo de crear hallazgos desde el generador local legacy.
* `injectSimulatedData` ahora usa `createDemoInjectedFindings(nextDemoRunId)`.
* El render de FASE 05 lee campos del contrato `DemoInjectedFinding`.
* No se conectaron paginas Admin destino.
* No se toco Supabase/backend/package.json.

### Integracion 02 - Centro Ejecutivo como piloto

Commit:

* `12c4128 feat: show demo evidence in executive page`

Archivo:

* `src/App.tsx`

Resultado:

* `AppShell` conserva `demoFindings`.
* `ExecutivePage` usa el bridge para leer el hallazgo `executive`.
* Centro Ejecutivo muestra bloque minimo `Evidencia Demo` con:
  * titulo
  * resumen
  * recomendacion operacional
  * evidencia asociada
  * accion `Volver al Centro Demo`
* Solo Centro Ejecutivo fue conectado como piloto.
* Las otras seis paginas Admin quedaron pendientes.

### Correccion FASE 05 - Persistencia al volver desde Admin

Commit:

* `f8fee8f fix: preserve phase 05 findings after admin navigation`

Archivo:

* `src/App.tsx`

Problema:

Al navegar desde FASE 05 hacia Centro Ejecutivo, `DemoPage` se desmontaba. Al regresar, sus estados locales se reiniciaban y los hallazgos desaparecian.

Correccion:

* `AppShell` conserva tambien `demoContext`.
* `DemoPage` recibe `demoContext` y `demoFindings` como respaldo persistente.
* Al inyectar datos, `DemoPage` publica hallazgos y contexto hacia el shell.
* FASE 05 usa valores efectivos:
  * primero estado local si existe;
  * si la pagina fue desmontada, recupera desde `AppShell`.

### Auditoria forense de regresiones FASE 03/04

Hallazgos:

* FASE 03 separada visualmente existio en Git en `abbfb30`.
* En `2dc1650` FASE 03 ya estaba combinada en una sola tarjeta.
* `demo-operational-messaging` permanecia como `targetId`, pero sin bloque visual propio.
* FASE 04 tuvo boton `Regenerar empresa demo completa` en `2dc1650`.
* Ese boton fue eliminado en `019c407`.
* Las regresiones principales no fueron introducidas por los commits nuevos de AMENA 55.
* Si existia una version correcta mas reciente en la PC, no estaba en GitHub al momento de la auditoria.

Decision:

No revertir commits completos. Recuperar por microcirugias selectivas.

### Microcirugia FASE 03 - Separar evidencias comerciales y mensajes

Commit:

* `856f57a fix: separate phase 03 sales and team messages evidence`

Archivo:

* `src/App.tsx`

Resultado:

* FASE 03 vuelve a mostrar dos bloques separados:
  * `Registro de Seguimiento Comercial`
  * `Mensajes entre el Equipo`
* El bloque comercial mantiene `Abrir app vendedoras`.
* La tabla comercial muestra registros de vendedoras.
* Mensajes internos se muestran en listado propio.
* No se toco FASE 04 ni FASE 05.

### Microcirugia FASE 04 - Ciclo de preparacion

Commit:

* `5566439 fix: correct phase 04 preparation lifecycle`

Archivo:

* `src/components/demo/DemoCommandEvidencePanel.tsx`

Problemas corregidos:

* Antes de generar, FASE 04 mostraba:
  * 20 configurados
  * 0 validos
  * 20 defectuosos
  * estado pendiente
* Esto era incorrecto porque aun no se habia generado nada.
* El boton `Inyectar Empresa Demo` quedaba bloqueado tras regenerar y aprobar.

Resultado:

* Estado inicial:
  * cantidad prevista/configurada: 20
  * validos: 0
  * defectuosos: 0
  * estado: pendiente de generacion
* Generar:
  * estado: datos generados
  * filas pendientes de auditoria
* Auditar:
  * calcula validos y defectuosos simulados
  * si hay rechazos: requiere regeneracion
* Regenerar rechazados:
  * limpia rechazo simulado
  * queda pendiente de auditoria/aprobacion valida
* Aprobar:
  * estado: datos aprobados
* Inyectar:
  * estado: Empresa Demo inyectada / inyeccion realizada
* Se agrego `Nueva generacion demo`.
* Se agregaron condiciones explicitas:
  * `canApproveData`
  * `canInjectDemo`
* No se toco FASE 03 ni FASE 05.

## Secuencia de commits producidos en AMENA 55

Orden cronologico:

1. `e8337ff feat: add demo findings presentation contract`
2. `56df504 feat: add demo findings admin bridge`
3. `01b528c feat: connect phase 05 to demo findings contract`
4. `12c4128 feat: show demo evidence in executive page`
5. `f8fee8f fix: preserve phase 05 findings after admin navigation`
6. `856f57a fix: separate phase 03 sales and team messages evidence`
7. `5566439 fix: correct phase 04 preparation lifecycle`

Estado final confirmado por el usuario:

* Estos commits fueron pusheados.
* `HEAD == origin/centro-mando-admin10`.

## Archivos modificados o creados durante AMENA 55

Archivos nuevos:

* `src/demo/domain/demoFindings.ts`
* `src/demo/fixtures/demoFindingsFixtures.ts`
* `src/demo/bridge/demoFindingsBridge.ts`

Archivos modificados:

* `src/App.tsx`
* `src/components/demo/DemoCommandEvidencePanel.tsx`

No se tocaron:

* Supabase
* Backend
* `package.json`
* `package-lock.json`

## Estado conceptual actual del Centro Demo

El Centro Demo ya tiene una frontera logica inicial:

* contrato de hallazgos;
* fixtures demo;
* bridge Demo -> Admin;
* FASE 05 alimentada por contrato;
* Centro Ejecutivo conectado como pagina piloto;
* persistencia de hallazgos al navegar Admin -> Demo;
* FASE 03 separada visualmente;
* FASE 04 con ciclo de vida mas coherente.

Pero todavia no es una aplicacion completamente separada:

* `DemoPage` sigue viviendo en `src/App.tsx`.
* Varias funciones puras de generacion demo siguen embebidas en `App.tsx`.
* Solo Centro Ejecutivo consume hallazgos demo.
* Las otras seis paginas Admin destino siguen pendientes.
* No hay persistencia real en Supabase.
* No hay conexion real App Vendedoras / Mensajes -> Supabase -> FASE 03.

## Pendientes principales para AMENA 56

Pendientes funcionales inmediatos:

1. No modificar nada sin autorizacion expresa del usuario.
2. Reconstruir contexto desde Base de Conocimiento antes de tocar archivos.
3. Definir siguiente microcirugia antes de editar.
4. Posibles siguientes pasos:
   * conectar una segunda pagina Admin destino usando el bridge;
   * extraer funciones puras de generacion demo desde `App.tsx` hacia `src/demo/engine`;
   * revisar FASE 04 visualmente despues del push;
   * definir plan para conexion futura App -> Supabase -> FASE 03;
   * documentar frontera logica del Centro Demo con una decision de arquitectura complementaria.

Pendientes estructurales:

* Extraer progresivamente `DemoPage` de `src/App.tsx`.
* Evitar mezclar operacion real y demo escenica.
* Mantener Supabase como frontera futura, no simulada como real.
* Mantener Centro Demo como aplicacion demostrativa independiente aunque siga temporalmente en el repo Admin.

## Restricciones permanentes heredadas

* No tocar Supabase sin instruccion expresa.
* No tocar backend sin instruccion expresa.
* No tocar `package.json` o `package-lock.json` sin necesidad aprobada.
* No hacer push sin confirmacion del usuario.
* No conectar mas paginas Admin sin autorizacion.
* No redisenar UI.
* No revertir commits completos para recuperar FASE 03/04; usar microcirugias selectivas.
* No asumir que la PC y Laptop tienen el mismo estado si hay evidencia de cambios no pusheados.

## Documentos que debe leer el siguiente chat

Lectura obligatoria para AMENA 56 antes de modificar archivos:

* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`
* `docs/knowledge-base/00_Gobernanza/GOV-0001 - Sistema de Continuidad del Conocimiento.md`
* `docs/knowledge-base/00_Gobernanza/GOV-0002 - Protocolo de Inicialización de Nuevos Proyectos y Bootstrap Metodológico.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0004 - Arquitectura de Madurez del Conocimiento.md`
* Este documento de transicion.
* Ultimo Plan de Trabajo vigente en `docs/knowledge-base/98_Work_In_Progress`.

## Cierre operativo

AMENA 55 deja el repositorio en estado sincronizado y limpio, con Centro Demo protegido por microcirugias commiteadas y pusheadas.

AMENA 56 debe continuar desde Base de Conocimiento y esperar autorizacion explicita antes de modificar archivos.

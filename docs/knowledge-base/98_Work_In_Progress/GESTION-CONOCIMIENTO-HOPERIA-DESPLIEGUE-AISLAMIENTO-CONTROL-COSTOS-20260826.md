# BORRADOR — Gestión del conocimiento H‑OperIA
## Despliegue, WhatsApp Caso 2, continuidad Git y decisión de aislamiento Producción vs Demo

**Fecha:** 26 agosto 2026  
**Ámbito:** Suite H‑OperIA / H‑OperIA Inmobiliaria  
**Estado:** Borrador para revisión humana antes de publicación en la base de conocimiento

---

## 1. Propósito

Registrar la experiencia operativa y técnica de los últimos días para que un futuro despliegue o recuperación no obligue a reconstruir desde cero el razonamiento, las rutas, los contratos, los estados Git, la configuración de Dokploy ni la integración Meta WhatsApp.

El objetivo es convertir una secuencia que requirió diagnóstico prolongado en un procedimiento corto, verificable y repetible.

Este documento complementa la guía operativa previa de WhatsApp/Meta y añade tres aprendizajes nuevos:

1. cómo distinguir un problema de código de un problema de configuración de build;
2. cómo resolver de forma segura una divergencia Git cuando el remoto ya contiene trabajo equivalente o más avanzado;
3. qué decisión arquitectónica queda pendiente sobre la frontera entre reservas autónomas/producción y sesiones de demostración.

---

## 2. Componentes involucrados

### 2.1 Centro Demo / Centro de Mando
- Repo: `C:\Amena\Codex\AMENA_Comalapa`
- Rama: `centro-mando-admin10`
- Dominio público: `https://demo.automatizahoy.ai`
- Función: orquestar la demostración, abrir aplicaciones participantes y concentrar evidencia/Expediente Vivo.

### 2.2 App Pública de Reservas — Ruta 2
- Repo local: `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
- Rama: `codex/ruta-2-reservas-generico-manual`
- Repo remoto usado por Dokploy: `AMENA_Reservas_Publica.git`
- Dominio público: `https://reservas.automatizahoy.ai`
- Commit certificado tras respaldo de cita Marta: `281f51a5c04a854c3bf08bee96b8ea6b5a66cb94`

### 2.3 Demo API
- Repo: `C:\Amena\Codex\AMENA_Demo_API`
- Rama: `main`
- Dominio: `https://demo-api.automatizahoy.ai`
- HEAD certificado actual: `d50378e66920dce2535140e7e09bf3b18734da73`

---

## 3. Incidente principal — WhatsApp Caso 2

### 3.1 Síntoma

Al completar una reserva en Ruta 2, el frontend mostraba:

> “No pudimos solicitar tu resumen por WhatsApp en este momento.”

El botón de reintento no resolvía el problema.

### 3.2 Causa operativa encontrada

La aplicación desplegada de Ruta 2 **no tenía configurada** en Dokploy la variable de build:

`VITE_DEMO_BACKEND_URL`

Valor correcto:

`https://demo-api.automatizahoy.ai`

Ruta 2 construye el endpoint Caso 2 a partir de esa variable. Al ser una variable `VITE_...`, su valor debe existir **durante el build del frontend**; no basta con agregarla sin reconstruir la aplicación.

### 3.3 Corrección aplicada

En Dokploy → App Pública de Reservas → Environment:

`VITE_DEMO_BACKEND_URL=https://demo-api.automatizahoy.ai`

Después:

1. Guardar Environment.
2. Ejecutar **Deploy** desde la pestaña General.
3. Confirmar deployment `Done`.
4. Confirmar que el commit desplegado seguía siendo:
   `043d7f72927b458882d4a7f992b369e9837206ba`
   (`feat: connect real whatsapp reservation summary`).
5. Abrir `https://reservas.automatizahoy.ai` y forzar recarga.
6. Ejecutar una prueba de reserva real de punta a punta.

### 3.4 Resultado

WhatsApp Caso 2 quedó operativo y el mensaje fue recibido correctamente.

Ejemplo real validado:
- Cliente: Miguel04 Rivas
- Reservation ID: `HOP-RES-50CCC854-IJ496V`
- Unidad: Apartamento / 102 / Torre T5 / Nivel 01 / Lumen Oeste
- Precio: `$72,500`

La recepción real confirmó que el problema principal no estaba en Meta ni en el endpoint productivo, sino en la **configuración del build de Ruta 2**.

---

## 4. Plantilla Meta realmente aprobada

Plantilla:

`h_operia_reservation_summary`

Idioma aprobado:

`Spanish (SPA)` → código API usado correctamente: `es_ES`

Número de variables en body: **6**

Orden operativo vigente:

1. nombre
2. reservationId
3. selectedUnit
4. referencePrice
5. martaLink
6. salesContact

### 4.1 Lección importante

No rediseñar el payload backend basándose únicamente en una propuesta local sin comparar primero con la plantilla **realmente aprobada en Meta**.

Se construyó temporalmente una variante local de 5 parámetros y `followUpSummary`, pero al revisar Meta se comprobó que la plantilla aprobada usa 6 variables. Por tanto, la implementación remota existente era la alineada con producción.

---

## 5. Divergencia Git en Demo API — patrón seguro de recuperación

### 5.1 Situación encontrada

Se creó localmente el commit:

`66ce0919cfd93392eee78537e2cb950dc7ef2133`

mensaje:

`feat: add reservation summary whatsapp endpoint`

El push fue rechazado porque `origin/main` ya había avanzado con:

- `c43ed25 feat: add reservation summary whatsapp endpoint`
- `e94c021 fix: use approved whatsapp summary locale`
- `d50378e fix: use approved whatsapp link locale`

Resultado de divergencia:

- local: 1 commit
- remoto: 3 commits

### 5.2 Regla operativa

Ante un push rechazado por non-fast-forward:

**NO ejecutar inmediatamente `git pull`.**

Primero:

1. `git fetch origin`
2. comparar `HEAD` vs `origin/main`
3. revisar `git log --graph --all`
4. identificar si el remoto contiene una versión equivalente o superior
5. comparar diffs antes de integrar

### 5.3 Protección del trabajo local

Se creó una rama de respaldo:

`backup/caso2-local-66ce091`

apuntando exactamente a:

`66ce0919cfd93392eee78537e2cb950dc7ef2133`

Después se alineó `main` con el remoto:

`git reset --hard origin/main`

Estado final certificado:

- HEAD local = `d50378e66920dce2535140e7e09bf3b18734da73`
- origin/main = igual
- ahead/behind = `0 0`
- working tree = limpio

### 5.4 Lección

Un respaldo de rama antes de realinear permite abandonar una variante local sin perder evidencia ni posibilidad de recuperación.

---

## 6. Marta — cita preservada en Ruta 2

Se mantuvo una microcirugía local en `src/App.tsx` para preservar una cita con Marta como dato estructurado:

```ts
{
  date: string;
  time: string;
  channel: 'marta_call';
  status: 'requested';
}
```

El cambio:
- captura fecha/hora;
- limpia el estado al reiniciar/cerrar;
- lo agrega opcionalmente a `case2WhatsappPayload`;
- lo muestra en el resumen final de Ruta 2.

Commit:

`281f51a5c04a854c3bf08bee96b8ea6b5a66cb94`

Mensaje:

`feat: preserve marta appointment in reservation flow`

Estado Git final:
- HEAD == origin
- ahead/behind `0 0`
- working tree limpio

### 6.1 Pendiente funcional

La plantilla Meta actual no posee una variable específica para la cita con Marta ni para una visita al proyecto. Por ahora esos datos pueden conservarse internamente, pero no se incluyen en el WhatsApp aprobado.

No modificar la plantilla solo para cerrar este pendiente. Tratarlo como mejora futura de contenido/contrato Meta.

---

## 7. Advertencias de build que NO fueron causa raíz

Durante el build de Ruta 2 aparecieron advertencias:

- Node `20.18.1` frente a requisito de `@vitejs/plugin-react@5.2.0`: `^20.19.0 || >=22.12.0`
- vulnerabilidades npm reportadas
- chunk JS mayor de 500 kB

El build terminó correctamente.

Regla:

**No mezclar advertencias no bloqueantes con la resolución del incidente principal.** Registrar como deuda técnica separada y no introducir refactors o upgrades durante una recuperación funcional urgente.

---

## 8. Decisión arquitectónica consolidada — Opción A+ / Demo dual aislado

### 8.1 Necesidad comercial que obliga a ampliar la Opción A

La App Pública de Reservas no puede quedar limitada a demostraciones iniciadas manualmente desde Centro Demo.

En campañas comerciales, el prospecto podrá recibir por correo electrónico o WhatsApp:

- el video comercial de H‑OperIA;
- un enlace directo para vivir la experiencia de reserva;
- posteriormente, un código promocional/control de consumo para funciones con costo variable.

Por tanto, Ruta 2 debe poder operar de forma autónoma las 24 horas, sin requerir que Centro Demo esté abierto ni que exista una sesión demo previamente iniciada.

### 8.2 Arquitectura adoptada para la etapa Demo

Se adopta conceptualmente la **Opción A+ — Demo dual aislado**.

La misma App Pública de Reservas admite dos contextos de ejecución:

#### Modo 1 — Demo pública autónoma

Entrada típica:

`campaña / correo / WhatsApp / video → https://reservas.automatizahoy.ai`

Comportamiento:

1. el prospecto abre Ruta 2 directamente;
2. completa la experiencia de reserva;
3. puede usar las funciones demostrativas autorizadas;
4. recibe su resumen por WhatsApp;
5. la experiencia se cierra y vuelve a estado inicial;
6. **no debe convertirse en Expediente Vivo del Centro Demo**;
7. no requiere `demoRunId` emitido por Centro Demo.

Esta modalidad es pública y comercial, pero **no equivale todavía a una reserva productiva persistente**. Mientras no exista el frente productivo de persistencia, debe tratarse como experiencia demostrativa autónoma.

#### Modo 2 — Demo integrada desde Centro Demo

Entrada típica:

`Centro Demo → Iniciar nueva demostración → demoRunId → Ruta 2`

Comportamiento:

1. Centro Demo crea una sesión demo identificada por `demoRunId`;
2. abre/conecta Ruta 2;
3. Ruta 2 genera la reserva dentro de esa corrida;
4. Centro Demo acepta únicamente evidencia vinculada a la sesión activa y coincidente;
5. se crea/enriquece el Expediente Vivo demo;
6. las fases posteriores continúan dentro de la misma corrida;
7. al finalizar la demostración se elimina únicamente la evidencia perteneciente a ese `demoRunId`.

### 8.3 Regla rectora de aislamiento

> **Sin una sesión demo activa y coincidente no debe incorporarse una reserva autónoma al Expediente Vivo del Centro Demo. Una experiencia pública autónoma puede completar reserva y WhatsApp, pero permanece fuera del espacio de evidencia de la demostración integrada.**

La separación no debe depender del dominio, porque ambos modos utilizan la misma Ruta 2. Debe depender del contexto explícito de sesión, principalmente `demoRunId` y su validación en ambos extremos.

### 8.4 Evolución futura a producción real

La arquitectura A+ es transitoria para la etapa Demo.

En una versión productiva futura, una reserva autónoma sí podrá originar un Expediente Vivo real y persistente mediante backend/base de datos productiva, identidad durable y reglas de retención propias. Esa evolución no debe simularse ahora dentro del Centro Demo sin persistencia real.

---

## 9. Implicaciones de la Opción A+ frente a las alternativas

### Frente a Demo cerrado puro

La Opción A+ conserva la simplicidad de la demo integrada, pero resuelve el uso comercial del enlace público. No exige que cada prospecto tenga una sesión preparada manualmente desde Centro Demo.

### Frente a producción inmediata

Evita introducir prematuramente:

- persistencia productiva permanente;
- clasificación durable `production/demo`;
- reglas complejas de borrado;
- permisos y retención productiva;
- dependencia de una base de datos productiva todavía no cerrada.

### Consecuencia técnica principal

Debe existir una barrera inequívoca entre:

- `Ruta 2 autónoma`;
- `Ruta 2 vinculada a demoRunId`.

Cualquier replay, rehidratación o `postMessage` debe respetar esa frontera.

---

## 10. Control de consumo promocional — Marta / Vapi

### 10.1 Riesgo comercial

La difusión masiva de Ruta 2 es deseable, pero Marta/Vapi introduce un costo variable por interacción. Un enlace compartido sin control podría producir consumo repetido por una misma persona o por terceros.

### 10.2 Solución recomendada

Incorporar una **llave o código promocional único por destinatario**.

Ejemplo conceptual:

`HOP-MR7K-42Q9`

El código controlaría únicamente las funciones con costo variable, sin bloquear la experiencia general de reserva.

Campos mínimos futuros:

- código;
- estado: activo / agotado / vencido / bloqueado;
- máximo de sesiones Marta;
- sesiones consumidas;
- fecha de expiración;
- opcionalmente identificador de campaña/origen.

### 10.3 Política inicial recomendada para Marta

Como punto de partida configurable:

- **3 sesiones de Marta por código**;
- **máximo 5 minutos por sesión**;
- **vencimiento en 30 días**.

La validación debe ocurrir antes de abrir/iniciar la sesión Vapi. Si se agota el cupo, la reserva puede continuar normalmente, pero Marta queda bloqueada para ese código.

### 10.4 Arquitectura recomendada

Para una prueba temprana puede existir un control sencillo en backend. Para difusión comercial real, el consumo debe persistirse en una tabla/almacenamiento central y actualizarse de forma atómica para evitar consumos simultáneos del mismo último crédito.

---

## 11. Control de consumo promocional — Meta / WhatsApp

El mismo principio puede proteger el costo de los mensajes Meta.

No es necesario depender de una función especial de Meta. **Nuestro backend decide primero si existe cupo y solo entonces llama a Meta Cloud API.**

### Política inicial recomendada

Por código o por reserva:

- **1 envío inicial del resumen**;
- **1 reintento máximo**;
- después de agotar el cupo, no se realiza una nueva llamada a Meta.

Esto protege frente a pulsaciones repetidas del botón de reenvío o uso compartido del enlace/código.

### Modelo unificado de consumo promocional

Un mismo código puede manejar cupos independientes, por ejemplo:

- Marta/Vapi: 3 sesiones, máximo 5 min cada una;
- Meta/WhatsApp resumen: 1 envío + 1 reintento;
- expiración general: 30 días.

La reserva pública debe seguir siendo accesible aunque alguno de esos cupos se agote.

---

## 12. Prueba de aceptación requerida para Opción A+

### 12.1 Demo pública autónoma

1. confirmar que Centro Demo no tiene sesión activa;
2. abrir Ruta 2 directamente;
3. completar una reserva autónoma;
4. confirmar WhatsApp;
5. cerrar la experiencia;
6. abrir Centro Demo;
7. confirmar que esa reserva **no aparece** como Expediente Vivo demo ni por replay automático.

### 12.2 Demo integrada

1. abrir Centro Demo limpio;
2. pulsar `Iniciar nueva demostración`;
3. confirmar creación de `demoRunId`;
4. abrir Ruta 2 desde Centro Demo;
5. completar reserva;
6. confirmar que la reserva sí aparece en Centro Demo;
7. continuar las fases posteriores bajo la misma sesión;
8. finalizar demostración;
9. confirmar que se elimina únicamente la evidencia de esa corrida;
10. confirmar que queda apto para iniciar otra demostración.

---

## 13. Ruta rápida — diagnóstico de WhatsApp Caso 2 en el futuro

Si vuelve a fallar el WhatsApp de resumen:

1. confirmar que Ruta 2 desplegada carga;
2. confirmar en Dokploy Environment: `VITE_DEMO_BACKEND_URL=https://demo-api.automatizahoy.ai`;
3. si cambió Environment, ejecutar **Deploy**, no solo Reload;
4. confirmar Demo API disponible;
5. confirmar plantilla Meta `h_operia_reservation_summary`;
6. confirmar locale `es_ES`;
7. confirmar **6 parámetros** en el body;
8. probar una sola reserva real;
9. si falla, revisar logs del Demo API antes de tocar Git;
10. no crear una nueva implementación del endpoint sin comparar primero con `origin/main` y la plantilla aprobada.

---

## 14. Principios operativos consolidados

- Verificar repo, rama, HEAD, origin, ahead/behind y working tree antes de cambios.
- No usar `git pull` como reacción automática a un push rechazado.
- Antes de descartar un commit local, crear rama de respaldo.
- Variables `VITE_...` requieren rebuild/deploy del frontend.
- `provider_accepted` confirma aceptación por Meta, no necesariamente entrega/lectura.
- La plantilla Meta aprobada es la fuente de verdad para número y orden de variables.
- No confundir dominio público con persistencia productiva.
- No mezclar deuda técnica no bloqueante con correcciones urgentes.
- No modificar simultáneamente backend, frontend, Dokploy y Meta sin aislar primero la causa.
- Después de resolver un incidente, respaldar Git y documentar configuración externa que Git no conserva.
- Una función pública puede ser demostrativa sin pertenecer al Centro Demo.
- El `demoRunId` debe ser la frontera de pertenencia a la corrida integrada.
- Los controles de costo deben aplicarse en backend antes de llamar a Vapi o Meta.
- Limitar servicios pagados no debe impedir que el prospecto complete la experiencia general de reserva.

---

## 15. Pendientes técnicos priorizados

1. Auditar y corregir el aislamiento entre Ruta 2 autónoma y Ruta 2 integrada al Centro Demo.
2. Garantizar que replay/rehidratación/postMessage solo incorporen evidencia a Centro Demo cuando exista `demoRunId` activo y coincidente.
3. Diseñar e implementar el control de acceso/cupo promocional para Marta/Vapi.
4. Diseñar e implementar el control de envíos Meta/WhatsApp por código/reserva.
5. Ejecutar la demo integrada completa desde `Iniciar nueva demostración` hasta cierre.
6. Registrar el comportamiento de limpieza final por `demoRunId`.
7. Mantener pendiente futuro de WhatsApp: incluir cita con Marta/visita al proyecto mediante evolución de plantilla Meta, no como urgencia actual.
8. Registrar deuda técnica Node/Nixpacks y vulnerabilidades npm en frente separado.
9. Evolucionar posteriormente de Demo A+ a persistencia productiva real cuando se abra ese frente.

---

## 16. Estado Git y despliegue certificado al cierre de este conocimiento

### Ruta 2

- Repo local: `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
- Rama: `codex/ruta-2-reservas-generico-manual`
- HEAD local/remoto: `281f51a5c04a854c3bf08bee96b8ea6b5a66cb94`
- ahead/behind: `0 0`
- working tree: limpio
- último commit: `feat: preserve marta appointment in reservation flow`

### Demo API

- Repo local: `C:\Amena\Codex\AMENA_Demo_API`
- Rama: `main`
- HEAD local/remoto: `d50378e66920dce2535140e7e09bf3b18734da73`
- ahead/behind: `0 0`
- working tree: limpio
- rama de respaldo local preservada: `backup/caso2-local-66ce091`

### Configuración externa crítica

Dokploy / Ruta 2:

`VITE_DEMO_BACKEND_URL=https://demo-api.automatizahoy.ai`

Meta:

- template: `h_operia_reservation_summary`
- locale API: `es_ES`
- body variables: 6

---

## 17. Nota obligatoria para sincronización posterior en Laptop

Este documento se cerró trabajando en **PC**.

Cuando se retome trabajo en **Laptop**, antes de continuar cualquier desarrollo:

1. identificar explícitamente que el equipo activo es Laptop;
2. ejecutar `git fetch` en los repositorios involucrados;
3. verificar rama, HEAD local, HEAD remoto, ahead/behind y working tree;
4. actualizar la Laptop desde los estados remotos certificados, sin copiar WIP manualmente si Git ya contiene el trabajo;
5. verificar especialmente Ruta 2 en `281f51a5...` y Demo API en `d50378e6...` o en los HEAD posteriores que existan en ese momento;
6. recordar que la configuración `VITE_DEMO_BACKEND_URL` vive en Dokploy y no se recupera mediante Git.

No asumir que la Laptop quedó sincronizada por el solo hecho de que GitHub esté actualizado.

---

## 18. Criterio de cierre de este paquete de conocimiento

Este paquete queda suficientemente consolidado para publicación en `98_Work_In_Progress` con las siguientes decisiones registradas:

- WhatsApp Caso 2 recuperado y probado de extremo a extremo;
- causa raíz de despliegue documentada;
- divergencia Git resuelta de forma segura;
- Opción A+ / Demo dual aislado adoptada como arquitectura transitoria recomendada;
- necesidad comercial de acceso público autónomo preservada;
- controles futuros de costo para Marta/Vapi y Meta definidos conceptualmente;
- estados Git críticos y configuración externa registrados;
- nota de sincronización PC → Laptop incluida.

La promoción posterior a documentación rectora/estable deberá hacerse únicamente después de implementar y validar el aislamiento A+ y los controles que se decidan llevar a producción/demo pública.

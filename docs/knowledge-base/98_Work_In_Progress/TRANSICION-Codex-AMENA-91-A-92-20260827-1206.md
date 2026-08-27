# TRANSICION-Codex-AMENA-91-A-92-20260827-1206

## CERTIFICACIÓN A+ — AISLAMIENTO Y FINALIZACIÓN SCOPED EN PRODUCCIÓN

**Fecha:** 27 agosto 2026
**Ámbito:** Centro Demo / Centro de Mando y App Pública de Reservas — Ruta 2
**Estado:** Certificación funcional en producción, basada en prueba humana E2E certificada.

---

## 1. Dictamen certificado

> **ARQUITECTURA A+ — AISLAMIENTO STANDALONE / INTEGRADO Y FINALIZACIÓN SCOPED: CERTIFICADA FUNCIONALMENTE EN PRODUCCIÓN.**

La certificación confirma que las sesiones demo integradas quedan delimitadas por su `demoRunId`, mientras que el modo standalone se mantiene aislado. La finalización limpia exclusivamente la corrida integrada correspondiente después de recibir el ACK de Ruta 2; la corrida cerrada no vuelve a presentarse como evidencia vigente.

## 2. Evidencia de release y repositorios

| Componente | Rama / release | Commit certificado |
| --- | --- | --- |
| Centro Demo publicado | `release/centro-demo-5c4a692-node20` | `730a964cca3918a3efae06d6daaac564f2b85532` |
| Centro Demo funcional | `centro-mando-admin10` | `5c4a69288184f705f4788b8afe6a9b057ff2ceab` |
| Ruta 2 | `codex/ruta-2-reservas-generico-manual` | `d9cc8d883cb97663a922978aec348c142a4a3aa2` |

## 3. Prueba E2E certificada

| Campo | Valor |
| --- | --- |
| demoRunId | `demo-27b38d1f-f6ba-4e38-8824-a3e587ea481d` |
| Reservation ID | `HOP-RES-9807D4F9-HOMLQ0` |
| Expediente ID | `HOP-EXP-9807D4F9-HOMLQ0` |
| Cliente | Miguel 08 Rivas |

Resultado humano certificado:

1. La nueva corrida inició sin estado heredado.
2. Ruta 2 transmitió la reserva integrada.
3. Centro Demo recibió la reserva y creó el Expediente Vivo inicial.
4. No se utilizó replay.
5. `Finalizar demostración` completó la limpieza con ACK.
6. Centro Demo terminó en `Sin sesión activa`.
7. FASE 01 volvió a estado disponible.
8. Expediente Vivo terminó en `Sin expediente seleccionado`.
9. La corrida finalizada no se rehidrató como evidencia vigente.

## 4. Invariantes certificados

- El aislamiento standalone no ingresa evidencia al flujo integrado de Centro Demo.
- La reserva integrada y el Expediente Vivo quedan asociados a la corrida activa.
- La limpieza final es scoped al `demoRunId` de la corrida.
- El ACK de Ruta 2 confirma la limpieza antes de que Centro Demo dé por cerrada la sesión.
- Una corrida terminada no debe reaparecer como sesión activa ni como evidencia vigente.

## 5. Continuidad

Esta certificación cierra la microcirugía A+ de aislamiento y finalización. Cualquier cambio posterior en handshake, replay, reset, ACK, persistencia de sesión o rehidratación debe preservar los invariantes documentados arriba y requerir una nueva prueba E2E certificada.

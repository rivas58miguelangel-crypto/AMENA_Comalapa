# VAPI-0001 - Auditoria y migracion de descarga autenticada de grabaciones de Marta

## Estado

Pendiente tecnico prioritario.

No implementar ahora. No modificar codigo funcional. No tocar integraciones. No exponer API keys. No hacer pruebas con credenciales reales todavia.

---

## Objetivo

Auditar la integracion de Vapi/Marta antes del 15 de julio de 2026 para determinar si AMENA/H-OperIA depende de URLs publicas de grabaciones y, si aplica, preparar la migracion hacia descargas autenticadas.

---

## Contexto

Vapi informo que, a partir del 15 de julio de 2026, las descargas de grabaciones dejaran de funcionar mediante URLs publicas como `recordingUrl` o `stereoRecordingUrl`.

Las descargas deberan realizarse mediante endpoints autenticados con:

`Authorization: Bearer <VAPI_API_KEY>`

El endpoint redirige con HTTP 302 a una URL firmada temporal. El cliente HTTP debe seguir redirects.

---

## Endpoints a considerar

* `GET https://api.vapi.ai/call/{id}/mono-recording`
* `GET https://api.vapi.ai/call/{id}/stereo-recording`
* `GET https://api.vapi.ai/call/{id}/customer-recording`
* `GET https://api.vapi.ai/call/{id}/assistant-recording`
* `GET https://api.vapi.ai/call/{id}/video-recording`
* `GET https://api.vapi.ai/call/{id}/call-logs`
* `GET https://api.vapi.ai/call/{id}/pcap`

---

## Prioridad

Alta.

Debe ejecutarse inmediatamente despues de estabilizar Centro Demo.

Fecha limite: antes del 15 de julio de 2026.

---

## Alcance futuro

1. Buscar en todos los repositorios y flujos externos referencias a:
   * `recordingUrl`
   * `stereoRecordingUrl`
   * `videoRecordingUrl`
   * `storage.vapi.ai`
   * `calllogs.vapi.ai`
2. Determinar si AMENA/H-OperIA descarga audios o solo consume transcripts/analisis.
3. Si hay descarga de grabaciones, migrar a endpoints autenticados de Vapi.
4. Verificar si el flujo esta en codigo propio, backend, n8n u otro sistema.
5. Probar con un `callId` reciente usando API key segura.
6. Documentar el procedimiento final sin exponer credenciales.

---

## Repositorios y sistemas a considerar

* `AMENA_Demo_API`
* `AMENA_Comalapa`
* `AMENA_Reservas_Publica_Codex_260602`
* `AMENA_Registro_Operacional_Ventas`
* `AMENA_Mensajeria_Operacional`
* cualquier flujo externo n8n relacionado con Marta/Vapi

---

## Restricciones

* No exponer API keys.
* No registrar credenciales en documentos, commits, logs ni capturas.
* No probar con credenciales reales hasta definir entorno seguro.
* No asumir que existe descarga de grabaciones sin evidencia.
* No modificar integraciones antes de completar auditoria.

---

## Proxima accion recomendada

Cuando Centro Demo este estabilizado, ejecutar auditoria de busqueda en los repositorios y sistemas listados, clasificar hallazgos y definir si se requiere migracion tecnica.

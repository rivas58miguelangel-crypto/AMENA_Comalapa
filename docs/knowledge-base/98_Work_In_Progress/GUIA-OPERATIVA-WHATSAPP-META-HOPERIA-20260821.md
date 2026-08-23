# GUÍA OPERATIVA — WhatsApp real con Meta Cloud API
## Suite H - OperIA · Demo Inmobiliaria
**Casos 1 y 2 · Configuración, diagnóstico, prueba y recuperación**
**Corte:** 21 de agosto de 2026

## Propósito
Poder repetir dentro de meses o años el proceso completo de conexión WhatsApp–Meta–H-OperIA sin reconstruirlo desde cero, reduciendo una jornada de diagnóstico a una ejecución guiada de aproximadamente 30 minutos cuando las credenciales y plantillas ya estén aprobadas.

## 1. Alcance y estado certificado
- **Caso 1:** envío del enlace de la App Pública de Reservas al voluntario desde el Centro Demo. Probado de extremo a extremo y recibido en WhatsApp real.
- **Caso 2:** envío del resumen al terminar la experiencia en Ruta 2. Probado de extremo a extremo y recibido en WhatsApp real.
- No guardar en documentación tokens, Phone Number IDs, WABA IDs ni números personales.
- `provider_accepted` no equivale a `delivered` ni `read`. La recepción se confirma humanamente en Ruta 2.

## 2. Arquitectura
**Caso 1**
`Centro Demo → Demo API → Meta Cloud API → WhatsApp del voluntario → enlace a reservas`

**Caso 2**
`Ruta 2 → Demo API → Meta Cloud API → WhatsApp del usuario → confirmación humana en Ruta 2`

Backend público: `https://demo-api.automatizahoy.ai`
App Pública de Reservas: `https://reservas.automatizahoy.ai`

## 3. Repositorios
- Centro Demo: `C:\Amena\Codex\AMENA_Comalapa` · rama `centro-mando-admin10`
- Ruta 2: `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2` · rama `codex/ruta-2-reservas-generico-manual`
- Demo API: `C:\Amena\Codex\AMENA_Demo_API` · rama `main`

## 4. Plantillas Meta
### Caso 1
- Nombre: `h_operia_demo_reservation_link`
- Uso: enviar enlace de reservas
- Idioma Graph certificado: `es_ES`
- Estado: `APPROVED`
- Categoría: `UTILITY`

### Caso 2
- Nombre: `h_operia_reservation_summary`
- Idioma Graph certificado: `es_ES`
- Estado: `APPROVED`
- Categoría: `UTILITY`

**Regla reutilizable:** antes del primer envío de cualquier plantilla Meta, certificar por Graph API su `name`, `language` exacto, `status` y `category`. Nunca asumir que “Spanish (SPA)” equivale a `language.code = "es"`.

## 5. Environment en Dokploy
Servicio: **API del Centro Demo → Environment**

```text
NODE_ENV=production
HOST=0.0.0.0
PORT=4000
DEMO_ALLOWED_ORIGINS=https://reservas.automatizahoy.ai,http://localhost:3000,http://localhost:3001
META_ACCESS_TOKEN=TOKEN_CRUDO_SIN_SIGNOS
META_PHONE_NUMBER_ID=ID_CRUDO_SIN_SIGNOS
META_WHATSAPP_TEMPLATE=h_operia_demo_reservation_link
```

Caso 2 usa `META_WHATSAPP_RESERVATION_SUMMARY_TEMPLATE` si existe; si no, fallback `h_operia_reservation_summary`.

### Reglas
- Nunca usar `<TOKEN>` ni `<ID>`: los signos `<` y `>` se vuelven parte del valor.
- No envolver el token en comillas.
- No anteponer `Bearer `; el backend ya lo hace.
- Después de cambiar Environment: **Guardar → Deploy/Rebuild**.

## 6. Verificaciones seguras del contenedor
En **Dokploy → Docker Terminal → Bash**:

```bash
printenv META_ACCESS_TOKEN | cut -c1-3
```
Esperado: `EAA`

```bash
printenv META_PHONE_NUMBER_ID | grep -q '[<>]' && echo ANGULOS || echo OK
```
Esperado: `OK`

La terminal web de Dokploy puede introducir `^[[200~` o mutilar líneas largas. Preferir comandos cortos o Node REPL.

## 7. CORS
Origins usados:
- Centro Demo local: `http://localhost:3000`
- Ruta 2 local: `http://localhost:3001`
- Ruta 2 producción: `https://reservas.automatizahoy.ai`

Preflight Ruta 2:

```powershell
$headers = @{
  Origin = "http://localhost:3001"
  "Access-Control-Request-Method" = "POST"
  "Access-Control-Request-Headers" = "content-type"
}

Invoke-WebRequest `
  -Uri "https://demo-api.automatizahoy.ai/send-reservation-summary-whatsapp" `
  -Method OPTIONS `
  -Headers $headers
```

Esperado: HTTP `204` + `Access-Control-Allow-Origin: http://localhost:3001`.

## 8. Levantar Ruta 2 correctamente
```powershell
cd C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2
$env:VITE_DEMO_BACKEND_URL="https://demo-api.automatizahoy.ai"
npm.cmd run dev -- --port 3001 --host 0.0.0.0 --strictPort
```

Usar `--strictPort` para impedir que Vite salte silenciosamente a 3002.

Ver puertos:
```powershell
Get-NetTCPConnection -State Listen |
Where-Object { $_.LocalPort -in 3001,3002 } |
Select-Object LocalAddress,LocalPort,OwningProcess
```

## 9. Caso 2 — integración real
Se sustituyó `simulateCase2WhatsappSend` por `sendCase2WhatsappSummary`.

Endpoint:
```text
${VITE_DEMO_BACKEND_URL}/send-reservation-summary-whatsapp
```

Payload:
```json
{
  "phone": "...",
  "name": "...",
  "reservationId": "...",
  "selectedUnit": "...",
  "referencePrice": "...",
  "martaLink": "...",
  "salesContact": "..."
}
```

Estados:
- `sending`
- `provider_accepted`
- `error`
- `receipt_confirmed`

Controles:
- `Enviar mi resumen por WhatsApp`
- `Reenviar mi resumen por WhatsApp`
- `Confirmo que ya recibí el WhatsApp.`
- `Finalizar experiencia con seguimiento humano`

## 10. Error 190 — token no parseable
Log:
```text
http_status: 401
provider_code: 190
provider_message: Invalid OAuth access token - Cannot parse access token
```

Causa real:
- `META_ACCESS_TOKEN` tenía `<` al inicio y `>` al final.
- `META_PHONE_NUMBER_ID` también tenía `<` y `>`.

Corrección:
1. quitar solo `<` y `>`;
2. guardar Environment;
3. Deploy/Rebuild;
4. verificar prefijo `EAA` y ausencia de ángulos.

## 11. Error 132001 — traducción de template
Log:
```text
http_status: 404
provider_code: 132001
provider_message: (#132001) Template name does not exist in the translation
```

El nombre estaba correcto: `h_operia_reservation_summary`.
El backend enviaba `language.code = "es"` y Meta tenía la traducción aprobada como `es_ES`.

## 12. Certificar idioma exacto de plantilla
Encontrar WABA ID en:
**Meta Business Settings → Cuentas → Cuentas de WhatsApp → seleccionar la cuenta → Identificador**

No confundir con:
- App ID
- System User ID

Consulta conceptual:
```text
GET /{WABA_ID}/phone_numbers?limit=100
GET /{WABA_ID}/message_templates?fields=name,language,status,category&limit=100
```

Resultado certificado:
```json
{"found":true,"name":"h_operia_reservation_summary","language":"es_ES","status":"APPROVED","category":"UTILITY"}
```

## 13. Corrección final Caso 2
En `AMENA_Demo_API/server.js`:

```diff
- code: "es",
+ code: "es_ES",
```

Solo en `POST /send-reservation-summary-whatsapp`.

Caso 1 quedó intacto.

Commit publicado:
- `e94c0210e746703cbc5bbc80030543f72b764bf4`
- `fix: use approved whatsapp summary locale`

## 14. Evidencia de éxito
Después del deploy:
- `/health` = HTTP 200
- WhatsApp real recibido con:
  - nombre
  - Reservation ID
  - unidad
  - precio
  - próximos pasos
  - enlace de Marta
  - contacto de ventas

Certificación funcional:
`Ruta 2 → Demo API → Meta → teléfono real`

## 15. Mejoras no críticas
- Fecha y hora de reserva.
- Asesor/vendedor/responsable.
- Manejo de varias reservas.
- Decidir si requiere nueva plantilla/variables y nueva aprobación Meta.
- Paso 12 de Ruta 2 “Enviar enlace a mi WhatsApp” para Marta: no crítico para la demo inmediata.

## 16. Caso 1 — certificación final
Plantilla certificada:
```json
{"found":true,"name":"h_operia_demo_reservation_link","language":"es_ES","status":"APPROVED","category":"UTILITY"}
```

El backend se corrigió para enviar `language.code = "es_ES"` exclusivamente en `POST /send-whatsapp`.

Prueba real certificada:
`Centro Demo → Demo API → Meta Cloud API → WhatsApp del voluntario`

El mensaje fue recibido con el enlace público `https://reservas.automatizahoy.ai`, mensaje de prueba autorizada, instrucción de confirmación de apertura y footer de demostración autorizada.

Commit publicado:
- `d50378e66920dce2535140e7e09bf3b18734da73`
- `fix: use approved whatsapp link locale`

## 17. Ruta rápida — 30 minutos
| Min. | Paso | Criterio |
|---|---|---|
| 0–3 | Git + servicio | Repo/rama correctos; clean; `/health=200` |
| 3–7 | Meta | Token/Phone ID crudos; template APPROVED; language certificado |
| 7–10 | Dokploy | Variables correctas; Deploy/Rebuild verde |
| 10–13 | CORS | OPTIONS 204 |
| 13–17 | Frontend | Backend correcto; puerto exacto |
| 17–22 | Prueba | Un solo envío real |
| 22–25 | Logs | `provider_accepted` o error Meta específico |
| 25–27 | Recepción | Mensaje recibido físicamente |
| 27–30 | Cierre | Confirmación humana + Git/documentación |

## 18. Árbol de diagnóstico
| Síntoma | Primera revisión |
|---|---|
| No llega al backend | VITE_DEMO_BACKEND_URL, puerto, CORS |
| Preflight falla | DEMO_ALLOWED_ORIGINS + Deploy/Rebuild |
| 401 / 190 | Token: `< >`, comillas, Bearer, espacios, truncamiento |
| 404 / 132001 | `name` + `language` exactos en WABA |
| provider_accepted pero no llega | No asumir delivered; logs + recepción física |
| UI muestra error | Leer logs antes de gastar reintento |

## 19. Reglas operativas
- Nunca guardar secretos en chats/documentos.
- Antes de tocar código, descartar Environment/Meta.
- Environment cambiado → Deploy/Rebuild.
- Backend cambiado → commit/push → Deploy/Rebuild.
- `provider_accepted` ≠ delivered/read.
- No gastar reintentos sin leer logs.
- No tocar Caso 1 al corregir Caso 2 ni viceversa.
- En terminal inestable, usar comandos cortos.

## 20. Checklist final
- [x] Caso 1 certificado: plantilla `h_operia_demo_reservation_link`, `es_ES`, `APPROVED`, `UTILITY` y recepción humana.
- [x] Caso 2 certificado: plantilla `h_operia_reservation_summary`, `es_ES`, `APPROVED`, `UTILITY` y recepción humana.
- [ ] Plantilla aprobada en la WABA correcta para cualquier plantilla nueva.
- [ ] Nombre exacto certificado para cualquier plantilla nueva.
- [ ] `language` exacto certificado por GET para cualquier plantilla nueva.
- [ ] Token crudo y vigente.
- [ ] Phone Number ID crudo.
- [ ] CORS correcto.
- [ ] Backend `/health=200`.
- [ ] Frontend apunta al backend correcto.
- [ ] Puerto local certificado.
- [ ] Un único envío real.
- [ ] Logs revisados.
- [ ] Recepción humana confirmada.
- [ ] Commit/push/deploy certificados.
- [ ] Pendientes no críticos registrados sin reabrir lo estable.

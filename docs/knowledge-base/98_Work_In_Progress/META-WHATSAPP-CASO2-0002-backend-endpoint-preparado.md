# META-WHATSAPP-CASO2-0002 - Backend endpoint preparado para Caso 2 WhatsApp

## 1. Proposito

Registrar en el repositorio rector que el backend `AMENA_Demo_API` ya fue preparado tecnicamente para soportar Caso 2 WhatsApp mediante un endpoint separado, sin activar todavia la App Publica y sin enviar mensajes.

Este documento complementa el frente WIP de Meta WhatsApp Caso 2. No implementa cambios adicionales, no modifica codigo, no despliega servicios y no activa integraciones.

## 2. Estado del backend

Repositorio:

`C:\Amena\Codex\AMENA_Demo_API`

Rama:

`main`

Commit publicado:

`c43ed25a62879dbab7df5789d6bd5c347e524f0b`

Mensaje:

`feat: add reservation summary whatsapp endpoint`

Estado certificado:

- HEAD local == `origin/main`.
- Ahead/behind: `0 0`.
- Working tree: limpio.

## 3. Cambio publicado

Archivo incluido:

`server.js`

Endpoint agregado:

`POST /send-reservation-summary-whatsapp`

Proposito:

Preparar Caso 2 WhatsApp con un endpoint separado del Caso 1, manteniendo la separacion funcional entre plantillas, variables y flujo futuro de activacion.

## 4. Separacion Caso 1 / Caso 2

### Caso 1

Endpoint:

`POST /send-whatsapp`

Plantilla:

`h_operia_demo_reservation_link`

Variables:

- `name`
- `link`

### Caso 2

Endpoint:

`POST /send-reservation-summary-whatsapp`

Plantilla:

`h_operia_reservation_summary`

Variables:

- `name`
- `reservationId`
- `selectedUnit`
- `referencePrice`
- `martaLink`
- `salesContact`

## 5. Orden Meta Caso 2

Orden exacto de variables esperado por la plantilla `h_operia_reservation_summary`:

- `{{1}}` = `name`
- `{{2}}` = `reservationId`
- `{{3}}` = `selectedUnit`
- `{{4}}` = `referencePrice`
- `{{5}}` = `martaLink`
- `{{6}}` = `salesContact`

## 6. Variable de entorno propuesta

Variable:

`META_WHATSAPP_RESERVATION_SUMMARY_TEMPLATE`

Fallback:

`h_operia_reservation_summary`

## 7. Restricciones preservadas

Durante la microcirugia backend:

- no se conecto App Publica;
- no se envio WhatsApp;
- no se opero Meta;
- no se opero Dokploy;
- no se toco Supabase;
- no se leyo ni modifico `.env`;
- no se implemento disparo automatico;
- no se creo webhook;
- no se creo persistencia;
- no se introdujo idempotencia falsa.

## 8. Estado pendiente

Caso 2 sigue sin activarse hasta:

- aprobacion Meta de `h_operia_reservation_summary`;
- `marta_link` real certificado;
- autorizacion posterior para conectar App Publica;
- definicion de control/idempotencia del envio;
- decision de despliegue Dokploy.

## 9. Relacion con documento anterior

Este documento complementa:

`META-WHATSAPP-CASO2-0001-auditoria-resumen-reserva-expediente-vivo.md`

El documento `0001` era auditoria y diseno conceptual.

El documento `0002` registra la preparacion tecnica backend publicada.

## 10. Dictamen WIP

El backend queda preparado tecnicamente para Caso 2 mediante endpoint separado, pero Caso 2 no esta activado operacionalmente.

La siguiente fase requiere aprobacion Meta, link real certificado de Marta, autorizacion explicita para conectar App Publica y decision controlada de despliegue.

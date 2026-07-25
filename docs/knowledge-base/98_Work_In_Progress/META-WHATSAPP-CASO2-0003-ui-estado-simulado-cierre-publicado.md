# META-WHATSAPP-CASO2-0003 - UI y estado simulado de cierre publicado

## 1. Proposito

Registrar en el repositorio rector que la App Publica Ruta 2 ya tiene publicado el flujo visual y de estado simulado para Caso 2 WhatsApp al cierre final, sin activar todavia el envio real.

El envio real sigue detenido principalmente porque la plantilla Meta `h_operia_reservation_summary` continua en revision.

Este documento no implementa codigo, no modifica la App Publica, no modifica backend, no opera Meta, no opera Dokploy, no toca Supabase y no envia WhatsApp.

## 2. Estado publicado de App Publica Ruta 2

Repositorio:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`

Rama:

`codex/ruta-2-reservas-generico-manual`

Commit publicado:

`7c6121e6387a2ce8959b010909e854551b4dfa08`

Mensaje:

`feat: prepare simulated case 2 whatsapp closure flow`

Archivo incluido:

`src/App.tsx`

## 3. Estado backend relacionado

Repositorio:

`C:\Amena\Codex\AMENA_Demo_API`

Endpoint Caso 2 ya preparado:

`POST /send-reservation-summary-whatsapp`

Commit backend:

`c43ed25a62879dbab7df5789d6bd5c347e524f0b`

El backend esta preparado tecnicamente con endpoint separado, pero la App Publica publicada en el commit de este documento no lo conecta todavia.

## 4. Plantilla Meta Caso 2

Plantilla:

`h_operia_reservation_summary`

Estado actual:

En revision.

El flujo real no debe activarse hasta que esta plantilla este aprobada y exista autorizacion explicita para conectar la App Publica con el backend.

## 5. Aclaracion central

El flujo publicado en la App Publica es UI y estado simulado.

No conecta backend.

No usa `POST /send-reservation-summary-whatsapp`.

No envia WhatsApp real.

No opera Meta.

No opera Dokploy.

No toca Supabase.

La razon principal por la que el envio real no se activa todavia es que la plantilla Meta `h_operia_reservation_summary` sigue en revision.

## 6. Flujo modelado en cierre final

El cierre final ahora modela visualmente:

- preparar confirmacion por WhatsApp;
- estado `provider_accepted`;
- pregunta de recepcion: si el usuario ya recibio el mensaje;
- confirmacion humana de recepcion;
- reintento controlado;
- salida con seguimiento humano.

`provider_accepted` no se presenta como entrega final al cliente. Se documenta y se muestra como aceptacion por el proveedor, no como confirmacion de recepcion.

Despues del reintento maximo ya no existe bloqueo sin salida. La UI permite finalizar con seguimiento humano sin afirmar que el WhatsApp fue recibido.

## 7. Alcance simulado

La preparacion publicada mantiene el Caso 2 en modo simulado:

- no hace `fetch` real;
- no llama a `AMENA_Demo_API`;
- no usa el endpoint `POST /send-reservation-summary-whatsapp`;
- no envia WhatsApp;
- no instala dependencias;
- no modifica `package.json`;
- no modifica `.env`;
- no toca Supabase;
- no toca Marta/Vapi;
- no implementa ruta nueva.

## 8. MartaLink como dato secundario

Marta/Vapi no es el centro tecnico ni operativo del Caso 2.

`martaLink` existe porque la plantilla vigente incluye la variable secundaria `{{5}}`. Su funcion es servir como recurso util para que, si en el futuro el cliente desea volver a ser acompanado por Marta, tenga el acceso dentro del mensaje de confirmacion.

Si el cliente no usa ese enlace, no afecta el cierre de la experiencia ni el nacimiento o consolidacion del Expediente Vivo.

No debe documentarse `martaLink` como bloqueo arquitectonico principal.

## 9. Validacion local

Durante la publicacion del cambio de App Publica:

- `git diff --check` no reporto errores;
- `npm run build` fue intentado;
- el build no pudo ejecutarse localmente porque `vite` no estaba disponible en el entorno;
- no se instalo nada;
- no se ejecuto `npm install`.

La limitacion de build queda registrada como condicion del entorno local, no como activacion ni prueba funcional del envio real.

## 10. Puertas pendientes para envio real

El estado sigue simulado hasta que se cumplan y autoricen, como minimo, las siguientes puertas:

- aprobacion Meta de `h_operia_reservation_summary`;
- definicion de `salesContact`;
- asignacion simple de valor para `{{5}}` como dato secundario;
- configuracion backend en Dokploy;
- prueba controlada del endpoint `POST /send-reservation-summary-whatsapp`;
- autorizacion explicita de conexion real desde App Publica.

## 11. Relacion con documentos anteriores

Este documento complementa:

`META-WHATSAPP-CASO2-0001-auditoria-resumen-reserva-expediente-vivo.md`

`META-WHATSAPP-CASO2-0002-backend-endpoint-preparado.md`

El documento `0001` registra auditoria y diseno conceptual.

El documento `0002` registra la preparacion tecnica backend publicada.

El documento `0003` registra la preparacion visual y de estado simulado publicada en la App Publica Ruta 2.

## 12. Dictamen WIP

La App Publica Ruta 2 ya cuenta con el cierre visual y estado simulado para Caso 2 WhatsApp publicado en `src/App.tsx`.

El flujo todavia no envia WhatsApp real, no conecta backend y no debe activarse hasta aprobacion Meta y autorizacion posterior de conexion real.

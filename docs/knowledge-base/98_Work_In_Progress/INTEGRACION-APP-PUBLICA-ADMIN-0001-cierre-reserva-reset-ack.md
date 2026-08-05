# INTEGRACION-APP-PUBLICA-ADMIN-0001 - Cierre reserva reset ACK

* **Fecha de cierre documental:** 2026-08-05
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama certificada:** `centro-mando-admin10`
* **HEAD Admin publicado:** `4b0e8f6e34ce8b1fb4f86938ab2f25466603e238`
* **Alcance:** cierre breve de evidencia tecnica del bloque de integracion App Publica Ruta 2 -> Admin.

## 1. Objetivo

Registrar el cierre del bloque completado de integracion demo/local entre la App Publica Ruta 2 y el Admin/Centro Demo, incluyendo reserva completada, validacion de mensajes, expediente inicial, reset coordinado y preservacion del frente Caso 2 WhatsApp.

Este documento no modifica codigo, no altera commits publicados, no opera Supabase, no inicia servidores, no agrega paquetes, no hace commit y no hace push.

## 2. Commits publicados certificados

| Componente | Commit publicado |
| --- | --- |
| Admin / Centro Demo | `4b0e8f6e34ce8b1fb4f86938ab2f25466603e238` |
| App Publica Ruta 2 | `2a869c1e9f95cafa21913e4845796168ac6bd4b7` |
| AMENA | `16eb171c14764196f1d96ec9e7e662a52cbb8c8a` |

## 3. Evidencia del bloque completado

### Integracion Ruta 2 -> Admin

Queda cerrada la integracion demo/local en la que la App Publica Ruta 2 comunica al Admin la finalizacion de una reserva mediante `postMessage` en una ventana controlada.

Evidencia versionada en Admin:

* `src/App.tsx` define `configuredPublicReservationOrigin`.
* `src/App.tsx` abre la App Publica Ruta 2 en una ventana controlada.
* `src/App.tsx` escucha eventos `message` y procesa el evento de reserva completada.

### ReservationCompletedEvent

El evento certificado del bloque es `ReservationCompletedEvent`. Su funcion es transportar al Admin la evidencia de reserva completada desde la App Publica Ruta 2 dentro del flujo demo/local autorizado.

Contrato observado en codigo versionado:

* `type`: `hoperia.reservation.completed`;
* `schemaVersion`: `1.0`;
* `sourceApplication`: `hoperia_public_reservation_app` o `amena_public_reservation_app`;
* `sourceChannel`: `public_web_app`;
* `reservationStatus`: `completed`;
* `isDemo`: `true`;
* `reservationId`: cadena no vacia;
* datos de cliente, proyecto y unidad obligatorios.

### Validacion exacta de `origin` y `source`

El bloque incorpora validacion exacta de:

* `origin`: `event.origin` debe ser exactamente igual a `configuredPublicReservationOrigin`.
* `source`: `event.source` debe ser exactamente igual a `publicReservationWindowRef.current`.

Esta validacion evita aceptar mensajes de origen no autorizado o de ventanas ajenas al flujo controlado.

### Expediente Vivo inicial

El Admin genera el Expediente Vivo inicial a partir del evento de reserva completada recibido desde Ruta 2. Esta version corresponde a evidencia demo/local inicial y no constituye persistencia productiva.

### IDs certificados

| Prueba | Reservation ID | Expediente ID |
| --- | --- | --- |
| Reserva A | `HOP-RES-QHI4PTEA-L8X2VN` | `HOP-EXP-QHI4PTEA-L8X2VN` |
| Reserva B | `HOP-RES-8S24UQF7-AZ4TLM` | `HOP-EXP-8S24UQF7-AZ4TLM` |

* Reserva A fue recibida correctamente por el Admin antes del reset.
* El reset coordinado fue confirmado mediante ACK.
* Reserva B fue creada y recibida correctamente despues del reset.
* La Reserva A no reaparecio despues del nuevo ciclo.

### Reset coordinado y ACK

El bloque conserva reset coordinado entre App Publica Ruta 2 y Admin, con confirmacion tipo ACK para dejar evidencia de coordinacion del ciclo demo/local antes de una nueva prueba.

Evidencia versionada en Admin:

* el Admin emite `hoperia.demo.live.reset`;
* el mensaje se envia por `postMessage` hacia `configuredPublicReservationOrigin`;
* el ACK esperado confirma `reset_complete`;
* el reset limpia Expediente Vivo, seleccion automatica, avisos y eventos procesados.

### Caso 2 WhatsApp preservado

La integracion queda preservada para Caso 2 WhatsApp. Este cierre no implementa Caso 2, no modifica el motor de WhatsApp y no altera el flujo pendiente de certificacion del envio final.

## 4. Estado final de repositorios

| Repositorio | Estado de cierre |
| --- | --- |
| Admin / Centro Demo | Commit publicado `4b0e8f6e34ce8b1fb4f86938ab2f25466603e238`; rama `centro-mando-admin10`; verificado local/remoto `0 0` antes de crear este cierre documental; sin cambios de codigo. |
| App Publica Ruta 2 | Commit publicado informado: `2a869c1e9f95cafa21913e4845796168ac6bd4b7`; sin modificaciones desde este cierre documental. |
| AMENA | Commit publicado informado: `16eb171c14764196f1d96ec9e7e662a52cbb8c8a`; sin modificaciones desde este cierre documental. |

## 5. Ausencias certificadas del bloque

Durante este cierre documental no se incorporo ni modifico:

* persistencia;
* backend;
* Supabase;
* SQL;
* paquetes nuevos;
* dependencias;
* variables de entorno;
* codigo fuente.

## 6. Limitaciones residuales

Permanecen las siguientes limitaciones:

* la integracion certificada es demo/local;
* no existe persistencia productiva asociada a este cierre;
* `postMessage` depende de una ventana controlada;
* AMENA conserva advertencia no bloqueante de tamano de bundle;
* Caso 2 WhatsApp permanece preservado, pero no implementado ni certificado por este documento.

## 7. Dictamen documental

El bloque de integracion App Publica Ruta 2 -> Admin queda documentado como cerrado para revision humana, con evidencia tecnica de reserva completada, validacion exacta de `origin` y `source`, Expediente Vivo inicial, reset coordinado y ACK.

El siguiente paso queda fuera de este documento y requerira autorizacion separada si se decide continuar hacia persistencia, backend, Supabase, SQL, despliegue productivo o Caso 2 WhatsApp.

# META-WHATSAPP-CASO1-0001 - Auditoria y preparacion segura de Meta WhatsApp Caso 1

## Estado documental

* **Identificador:** META-WHATSAPP-CASO1-0001
* **Tipo:** Auditoria tecnica y plan seguro preparatorio
* **Estado:** Preparado para revision independiente
* **Fecha:** 2026-07-23
* **Repositorio rector documental:** `C:\Amena\Codex\AMENA_Comalapa`
* **Repositorio operativo principal:** `C:\Amena\Codex\AMENA_Demo_API`
* **Fuentes rectoras aplicadas:** KB-0003, FO-COC-0001, ADR-002, REG-0001 y CF-0001.

Este documento audita el estado actual del Backend Demo API y prepara de forma segura la configuracion de Meta/WhatsApp necesaria para probar el Caso 1. No introduce secretos reales, no modifica codigo, no lee `.env`, no opera Meta, no opera Dokploy, no modifica DNS, no envia mensajes, no toca Supabase ni SQL, no inicia Elastic Email, no inicia Expediente Vivo, no inicia tabla de 20 casos, no implementa Caso 2, no hace commit y no hace push.

---

## 1. Reconstruccion realizada

La reconstruccion de continuidad se realizo desde:

* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-85-A-86-20260723-1028.md`

Se incorporo como estado publicado posterior:

* `docs/knowledge-base/98_Work_In_Progress/CERT-DESPLIEGUE-DEMO-API-0001-backend-demo-api-dokploy.md`
* Commit publicado: `8b1419b552e34592c066fbf81cf5d03391d8f63f`

Documentacion revisada para precisar Caso 1, topologia y limites:

* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0002 - Especificacion de Comunicaciones Reales WhatsApp Correo Centro Demo.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0004 - Especificacion Funcional del Cierre Inteligente y Expediente Vivo del Centro Demo.md`
* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`

Ubicacion y relacion documental:

* El archivo se conserva en `docs/knowledge-base/98_Work_In_Progress/` como documento preparatorio de trabajo.
* `META-WHATSAPP-CASO1-0001` es un identificador de trabajo para esta auditoria; no declara ni crea una familia documental canonica nueva.
* `DEMO-0002` sigue siendo la especificacion rectora de las comunicaciones reales del Centro Demo y del Caso 1.
* No reemplaza `DEMO-0002`, que sigue siendo la especificacion rectora de comunicaciones reales.
* No reemplaza `CERT-DESPLIEGUE-DEMO-API-0001`, que certifica despliegue y topologia del Backend Demo API.
* No crea certificacion de envio real; solo prepara auditoria, contrato y plan seguro.

---

## 2. Estado Git certificado

La verificacion Git inicial se realizo sin `fetch`.

### Repositorio operativo principal - Backend Demo API

* **Ruta esperada:** `C:\Amena\Codex\AMENA_Demo_API`
* **Ruta verificada:** `C:/Amena/Codex/AMENA_Demo_API`
* **Rama esperada:** `main`
* **Rama verificada:** `main`
* **HEAD esperado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **HEAD local verificado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Referencia remota verificada:** `origin/main`
* **HEAD remoto local verificado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Ahead/behind:** `0 0`
* **Working tree inicial:** limpio

### Repositorio rector documental - AMENA_Comalapa

* **Ruta esperada:** `C:\Amena\Codex\AMENA_Comalapa`
* **Ruta verificada:** `C:/Amena/Codex/AMENA_Comalapa`
* **Rama esperada:** `centro-mando-admin10`
* **Rama verificada:** `centro-mando-admin10`
* **HEAD esperado:** `8b1419b552e34592c066fbf81cf5d03391d8f63f`
* **HEAD local verificado:** `8b1419b552e34592c066fbf81cf5d03391d8f63f`
* **Referencia remota verificada:** `origin/centro-mando-admin10`
* **HEAD remoto local verificado:** `8b1419b552e34592c066fbf81cf5d03391d8f63f`
* **Ahead/behind:** `0 0`
* **Working tree inicial:** limpio

No se detectaron divergencias antes de iniciar esta auditoria.

---

## 3. Definicion documentada de WhatsApp Caso 1

La definicion documentada de Caso 1 existe y queda reconstruida asi:

* **Evento que inicia el Caso 1:** una persona del equipo opera el Centro Demo, registra o selecciona un voluntario en "Voluntarios de la sesion" y activa el envio del enlace por WhatsApp mediante control humano.
* **Aplicacion que origina la accion:** Centro Demo dentro del repositorio rector `AMENA_Comalapa`.
* **Backend que procesa la solicitud:** `AMENA_Demo_API`.
* **Informacion enviada al backend:** telefono WhatsApp del voluntario, nombre del voluntario y enlace publico HTTPS de la App Publica de Reservas.
* **Destinatario:** voluntario autorizado de la sesion demo.
* **Canal prioritario:** WhatsApp real mediante Meta WhatsApp Cloud API.
* **Tipo de envio:** manual/iniciado por control humano, no automatico.
* **Respuesta esperada inmediata:** solicitud aceptada por el proveedor cuando Meta acepte la peticion y devuelva identificador de mensaje.
* **Evidencia necesaria:** registro visible del intento, endpoint usado, destinatario, enlace publico, estado HTTP, respuesta del backend, identificador de proveedor si existe y distincion explicita entre solicitud enviada, proveedor acepto, entregado y leido.
* **Criterio de verdad:** `provider_accepted` no equivale a entregado ni leido.

Diferencia frente a Caso 2:

* Caso 1 envia el enlace de acceso a la App Publica desde el Centro Demo, por accion humana.
* Caso 2 ocurre al final del recorrido de la App Publica, despues de reserva y acompanamiento, y no debe dispararse inmediatamente despues de reservar.
* Caso 2 contempla WhatsApp consolidado, confirmacion del usuario dentro de la App Publica y cierre definitivo posterior.

Brecha documental menor:

* DEMO-0002 exige evidencia visible del intento y resultado, pero no define todavia un contrato formal completo de auditoria persistente para entrega/lectura. Esa persistencia queda fuera del Caso 1 inmediato y no debe inventarse en esta microcirugia.

---

## 4. Estado actual del Backend Demo API

Archivos seguros y versionados revisados:

* `package.json`
* `package-lock.json`
* `server.js`
* `.env.example`

No existe `README.md` en `AMENA_Demo_API`.

No se abrio ni se leyo `.env`.

### Estructura y runtime

* Backend Express en un solo archivo principal: `server.js`.
* Runtime versionado: Node `20.x`.
* Comando de inicio: `node server.js`.
* Dependencias principales: `express`, `cors`, `axios`, `dotenv`.
* JSON parsing: `app.use(express.json())`.
* Puerto: `process.env.PORT || 4000`.
* Host: `process.env.HOST || "0.0.0.0"`.
* Escucha: `app.listen(PORT, HOST, ...)`.

### CORS

* `DEMO_ALLOWED_ORIGINS` se parsea como lista separada por comas.
* En produccion, si no hay origen permitido, no se permite automaticamente `localhost`.
* En no produccion, se permiten origenes locales controlados cuando `DEMO_ALLOWED_ORIGINS` esta vacio.
* El Centro Demo desplegado debe estar incluido en `DEMO_ALLOWED_ORIGINS` para llamar al backend desde navegador.

### Endpoints existentes

* `GET /`
* `GET /health`
* `POST /send-whatsapp`
* `POST /send-email`

No existen endpoints de webhook de Meta/WhatsApp.

### Integracion parcial con Meta/WhatsApp

Existe integracion parcial en `POST /send-whatsapp`:

* recibe `phone`, `name` y `link`;
* valida `phone`;
* valida `name`;
* valida que `link` sea URL publica HTTPS y no local;
* lee `META_ACCESS_TOKEN`;
* lee `META_PHONE_NUMBER_ID`;
* lee `META_WHATSAPP_TEMPLATE`, con default `demo_ok`;
* llama a `https://graph.facebook.com/v20.0/{phone-number-id}/messages`;
* envia un mensaje de tipo `template`;
* devuelve `provider_message_id` cuando Meta responde con `messages[0].id`;
* devuelve estado `provider_accepted`;
* registra errores externos de proveedor sin imprimir token.

Riesgos o brechas del estado actual:

* la version Graph API esta hardcodeada como `v20.0`;
* no existe variable para version de Graph API;
* no existe `META_WABA_ID`;
* no existe `META_WEBHOOK_VERIFY_TOKEN`;
* no existe `META_APP_SECRET`;
* no existe endpoint `GET /webhooks/whatsapp` para verificacion;
* no existe endpoint `POST /webhooks/whatsapp` para eventos;
* no hay validacion de firma `x-hub-signature-256`;
* no hay validacion estricta del formato del telefono mas alla de presencia;
* `phone` y `provider_error_message` aparecen en respuestas; para demo controlado puede ser util, pero debe evitarse exponer datos personales innecesarios en logs o pantallas publicas;
* el payload actual no usa `name` ni `link` dentro de `template.components`; el propio codigo deja pendiente validar humanamente que la plantilla Meta aprobada soporte parametros;
* el backend tiene codigo de Elastic Email, pero este frente no lo inicia ni lo prueba.

---

## 5. Estado del Centro Demo y App Publica Ruta 2

### Centro Demo

Evidencia versionada en `AMENA_Comalapa/src/App.tsx`:

* define `VITE_PUBLIC_RESERVATION_APP_URL`;
* define `VITE_DEMO_BACKEND_URL`;
* en ausencia de variables usa valores locales;
* calcula si las URLs publicas estan configuradas y son HTTPS;
* registra voluntarios con nombre, cargo, empresa, WhatsApp y email;
* normaliza telefono;
* bloquea el boton WhatsApp si el voluntario no esta registrado o las URLs publicas no estan configuradas como HTTPS;
* `sendDemoLink("whatsapp")` llama a `{DEMO_BACKEND_URL}/send-whatsapp`;
* payload actual del Centro Demo: `{ phone, name, link }`;
* muestra evidencia visible: endpoint, destinatario, enlace, `providerMessageId` y resultado;
* interpreta `provider_accepted` como "Proveedor acepto", no como entregado o leido.

Esto coincide con Caso 1.

### App Publica Ruta 2

No se encontro punto de integracion directa de la App Publica Ruta 2 con `AMENA_Demo_API` para Caso 1.

Evidencia encontrada:

* existen pantallas y estado de confirmacion de WhatsApp relacionados con el tramo final del recorrido;
* la confirmacion de recepcion en la App Publica corresponde a Caso 2, no a Caso 1;
* no se detecto llamada directa a `send-whatsapp` ni a `demo-api.automatizahoy.ai` desde la App Publica.

---

## 6. Contrato de configuracion segura sin valores

No se deben escribir valores reales en chat, documentacion, codigo ni Git. Los nombres siguientes son inventario operativo sin secretos.

| Variable | Estado en codigo actual | Clasificacion | Caso 1 | Webhook / fase posterior | Finalidad |
| --- | --- | --- | --- | --- | --- |
| `NODE_ENV` | Existe en `.env.example` | publica/no sensible | requerida operacionalmente | requerida operacionalmente | Definir modo de ejecucion, especialmente CORS local vs produccion. |
| `HOST` | Existe en `.env.example` | publica/no sensible | requerida operacionalmente | requerida operacionalmente | Escucha del servidor, esperado `0.0.0.0` en Dokploy. |
| `PORT` | Existe en `.env.example` | publica/no sensible | requerida operacionalmente | requerida operacionalmente | Puerto interno, esperado `4000`. |
| `DEMO_ALLOWED_ORIGINS` | Existe en `.env.example` | publica/no sensible si solo contiene origenes publicos | requerida para navegador | requerida para navegador | Permitir origen del Centro Demo desplegado. |
| `META_ACCESS_TOKEN` | Existe en `.env.example` | secreta | requerida | requerida | Token Bearer para llamar Graph API. |
| `META_PHONE_NUMBER_ID` | Existe en `.env.example` | sensible | requerida | requerida | Identificador del numero remitente de WhatsApp Business. |
| `META_WHATSAPP_TEMPLATE` | Existe en `.env.example`; el codigo usa `demo_ok` si falta | publica/no sensible | opcional para el runtime actual, pero debe confirmarse humanamente una plantilla aprobada antes de prueba real | aplicable si se usa plantilla | Nombre de plantilla aprobada para Caso 1. |
| `META_GRAPH_API_VERSION` | No existe | publica/no sensible | recomendada | recomendada | Version de Graph API para no dejar `v20.0` hardcodeado. |
| `META_WABA_ID` | No existe | sensible | no requerida para enviar si ya existe Phone Number ID | dato de configuracion humana de WABA o suscripcion | Identificador de cuenta WhatsApp Business; no es variable de runtime necesaria para el endpoint actual. |
| `META_WEBHOOK_VERIFY_TOKEN` | No existe | secreta | no requerida para Caso 1 sin webhook | requerida solo al implementar verificacion de webhook | Token compartido para verificacion GET del webhook. |
| `META_APP_SECRET` | No existe | secreta | no requerida para Caso 1 sin webhook | requerida solo al implementar validacion de firma | Secreto de app para validar `x-hub-signature-256`. |
| `META_TEST_RECIPIENT_PHONE` | No existe | sensible/dato personal | dato humano de prueba, no variable requerida por el codigo ni candidata a `.env.example` | no necesariamente | Numero autorizado de prueba; no debe guardarse en Git. |
| `DEMO_PUBLIC_API_BASE_URL` | No existe | publica/no sensible | opcional documental | opcional documental | URL publica del backend para configurar Callback URL o referencia humana. |
| `DEMO_OPERATION_MODE` | No existe | publica/no sensible | opcional | opcional | Modo `audit`, `dry_run`, `live_controlled` si se decide agregar control explicito futuro. |

Variables estrictamente requeridas por el endpoint actual para emitir la solicitud a Meta:

* `META_ACCESS_TOKEN`
* `META_PHONE_NUMBER_ID`

Configuracion operacional necesaria para la prueba desplegada desde navegador:

* `META_WHATSAPP_TEMPLATE`, si se requiere sustituir el valor por defecto; en todo caso se debe confirmar humanamente la plantilla aprobada que el backend utilizara.
* `DEMO_ALLOWED_ORIGINS`
* `HOST`
* `PORT`
* `NODE_ENV`

Variables recomendadas para microcirugia segura:

* agregar `META_GRAPH_API_VERSION`;
* no agregar todavia webhook si la prueba de Caso 1 solo certifica proveedor acepto;
* preparar webhook en documento separado o fase posterior si se desea certificar entrega/lectura.

---

## 7. Requisitos verificados con fuentes oficiales Meta

Fecha de consulta: 2026-07-23.

Fuentes oficiales utilizadas:

* Meta WhatsApp Cloud API en Postman, publicado por Meta: `https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api`
* Documentacion oficial enlazada desde la coleccion Meta: `https://developers.facebook.com/docs/whatsapp/cloud-api/overview`
* Guia Get Started enlazada desde la coleccion Meta: `https://developers.facebook.com/docs/whatsapp/cloud-api/get-started`
* Referencia historica hospedada por Meta para la semantica de webhook: `https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/webhooks/start/`. El SDK esta archivado y esta referencia no es suficiente para implementar un webhook nuevo.

Hallazgos oficiales relevantes:

* Para usar Cloud API se requieren activos de Meta: portafolio de negocio, WhatsApp Business Account y numero de negocio.
* La API usa tokens de acceso; para pruebas puede existir token de usuario desde App Dashboard, y para uso mas estable se recomienda token de system user.
* Los permisos oficiales relevantes son `whatsapp_business_management` y `whatsapp_business_messaging`.
* Para enviar mensajes se usa `POST https://graph.facebook.com/{Version}/{Phone-Number-ID}/messages`.
* La peticion de envio usa encabezado `Authorization: Bearer {token}` y `Content-Type: application/json`.
* El envio de prueba documentado por Meta usa `messaging_product: "whatsapp"` y mensaje de tipo `template`.
* La respuesta aceptada incluye `messages[0].id`; eso prueba aceptacion tecnica, no entrega ni lectura.
* La referencia historica de webhook describe suscripcion a la WABA, verificacion GET mediante `hub.verify_token` y `hub.challenge`, y validacion de autenticidad POST mediante `x-hub-signature-256` y app secret.

Limitacion de esta verificacion:

* No se ingreso a Meta Business, no se opero App Dashboard, no se obtuvo token, no se verificaron numeros reales, no se consulto WABA real y no se envio ningun mensaje.
* La documentacion del SDK de webhook enlazada arriba esta archivada. Antes de cualquier fase de webhook se debe confirmar el procedimiento vigente exclusivamente en la documentacion actual de Meta y en el App Dashboard; esta auditoria no lo certifica.

---

## 8. Secuencia humana segura para Meta

No ejecutar en esta tarea. Secuencia propuesta para autorizacion posterior:

1. Ingresar a Meta for Developers / WhatsApp desde navegador humano.
2. Confirmar la app correcta y el negocio correcto.
3. Confirmar WABA y numero remitente autorizados.
4. Confirmar si se usara numero de prueba o numero real aprobado.
5. Confirmar destinatario de prueba autorizado, sin pegar telefono en chat ni Git.
6. Confirmar plantilla disponible para Caso 1.
7. Verificar si la plantilla acepta parametros para nombre y enlace.
8. Si la plantilla no acepta parametros, decidir si se prueba con plantilla `hello_world` o si se requiere nueva plantilla aprobada.
9. Obtener o generar token por via segura.
10. No copiar token en Codex, chat, documentacion ni repositorio.
11. Registrar solo evidencia no sensible: app correcta, WABA confirmada, numero remitente confirmado, plantilla confirmada y permisos confirmados.

---

## 9. Secuencia humana segura para Dokploy

No ejecutar en esta tarea. Secuencia propuesta para autorizacion posterior:

1. Ingresar a Dokploy humanamente.
2. Confirmar proyecto `h-operia-inmobiliaria`.
3. Confirmar aplicacion `API del Centro Demo`.
4. Confirmar Autodeploy OFF.
5. Confirmar rama `main` y commit backend esperado antes de despliegue.
6. Configurar variables de entorno solo en Dokploy, nunca en Git.
7. Incluir `DEMO_ALLOWED_ORIGINS` con el origen HTTPS del Centro Demo que ejecutara el boton.
8. Mantener secretos ocultos y no capturar pantallas con valores.
9. Reiniciar o redeployar solo cuando exista autorizacion especifica.
10. Verificar `/health` despues de cualquier despliegue autorizado.

---

## 10. Microcirugia propuesta

No implementar en esta tarea.

### A. Configuracion humana en Meta

* Confirmar activos Meta correctos.
* Confirmar permisos.
* Confirmar token seguro.
* Confirmar `Phone Number ID`.
* Confirmar plantilla aprobada y parametros.
* Confirmar destinatario autorizado.

### B. Configuracion humana de variables en Dokploy

* Configurar `META_ACCESS_TOKEN`.
* Configurar `META_PHONE_NUMBER_ID`.
* Configurar `META_WHATSAPP_TEMPLATE`.
* Configurar `DEMO_ALLOWED_ORIGINS`.
* Mantener `HOST=0.0.0.0`, `PORT=4000`, `NODE_ENV=production`.
* Si se autoriza microcirugia, agregar `META_GRAPH_API_VERSION`.

### C. Cambios de codigo requeridos

Archivos que seria necesario modificar:

* `C:\Amena\Codex\AMENA_Demo_API\server.js`
* `C:\Amena\Codex\AMENA_Demo_API\.env.example`

Archivos que no deben tocarse para Caso 1 minimo:

* `.env`
* `package.json`, salvo que se justifique una dependencia nueva; no se requiere para el Caso 1 minimo actual.
* `package-lock.json`, salvo que se agregue dependencia; no recomendado.
* App Publica Ruta 2.
* Supabase/SQL.

Cambios minimos propuestos:

1. Sustituir la version Graph API hardcodeada por `META_GRAPH_API_VERSION`, cuyo valor se confirme como version vigente y compatible en la documentacion oficial de Meta antes del cambio. No conservar una version por defecto solo por herencia del codigo actual.
2. Agregar `META_GRAPH_API_VERSION=` a `.env.example` sin valor real.
3. Confirmar contrato de plantilla:
   * si la plantilla aprobada requiere parametros, agregar `template.components` conforme a definicion aprobada;
   * si no requiere parametros, conservar payload sin componentes y documentar que el enlace no viaja hasta aprobar plantilla adecuada.
4. Endurecer validacion de telefono con regla simple compatible con Meta: digitos con codigo de pais, sin `+`, despues de normalizacion del Centro Demo.
5. Evitar devolver detalles de error de proveedor que puedan exponer informacion sensible; devolver codigo seguro y conservar detalle minimo en log sanitizado.
6. Mantener logs sin token, sin cuerpo completo, sin credenciales y sin dump de respuesta completa.

Endpoints:

* Usar endpoint existente `POST /send-whatsapp`.
* No crear webhook para Caso 1 minimo.
* Si se requiere entrega/lectura, planificar fase posterior con `GET /webhooks/whatsapp` y `POST /webhooks/whatsapp`, verify token y validacion de firma.

Peticion esperada desde Centro Demo:

```json
{
  "phone": "numero_autorizado_sin_valor_en_documento",
  "name": "nombre_del_voluntario",
  "link": "https://reservas.automatizahoy.ai"
}
```

Respuesta esperada de backend ante aceptacion de Meta:

```json
{
  "ok": true,
  "channel": "whatsapp",
  "simulated": false,
  "provider": "meta_cloud_api",
  "template": "nombre_de_plantilla_sin_valor_real",
  "provider_message_id": "id_devuelto_por_meta",
  "status": "provider_accepted"
}
```

### D. Prueba funcional del Caso 1

No ejecutar en esta tarea.

Prueba local futura:

1. Verificar Git y entorno.
2. Ejecutar backend local con variables seguras fuera de Git.
3. Usar destinatario autorizado.
4. Usar enlace publico HTTPS real de App Publica; no `localhost`.
5. Ejecutar `POST /send-whatsapp` una sola vez.
6. Confirmar respuesta `provider_accepted`.
7. Confirmar recepcion humana en el dispositivo destinatario si aplica.
8. Registrar evidencia sin exponer telefono completo ni token.

Prueba desplegada futura:

1. Confirmar Dokploy y variables.
2. Confirmar `/health`.
3. Operar Centro Demo desplegado.
4. Registrar voluntario autorizado.
5. Activar boton WhatsApp una sola vez.
6. Registrar evidencia visible del Centro Demo.
7. Confirmar recepcion humana.
8. Documentar resultado y actualizar IME-014 solo si corresponde.

Procedimiento de reversion:

* quitar o vaciar variables Meta en Dokploy;
* dejar Autodeploy OFF;
* revertir commit de microcirugia si causa regresion;
* verificar `/health`;
* bloquear boton WhatsApp dejando sin configuracion publica o sin variables backend;
* documentar pausa sin declarar cierre.

---

## 11. Plan de pruebas y criterios de aprobacion

### Pruebas previas

* `git status --short` limpio en repositorios involucrados.
* `npm` no instala dependencias nuevas para Caso 1 minimo.
* `npm start` o prueba local equivalente levanta en `0.0.0.0:4000`.
* `GET /health` responde `{"ok":true,"service":"amena-demo-api"}`.
* CORS acepta solo origen autorizado del Centro Demo.

### Pruebas de validacion de entrada

* Sin `phone`: `400 missing_phone`.
* Sin `name`: `400 missing_name`.
* Sin `link`: `400 missing_link`.
* Link no HTTPS: `400 link_must_use_https`.
* Link local: `400 link_must_not_be_local`.
* Sin variables Meta: `500 missing_meta_configuration`, sin token en respuesta.

### Criterios de aprobacion del Caso 1

* Solo destinatario autorizado.
* Enlace enviado corresponde a App Publica Ruta 2 publica HTTPS.
* Backend no expone secretos.
* Meta acepta la solicitud y devuelve identificador de mensaje.
* Centro Demo muestra "Proveedor acepto" y no "Entregado" ni "Leido".
* Existe evidencia humana de recepcion si se pretende certificar recepcion.
* Documento de cierre distingue solicitud, aceptacion de proveedor, entrega y lectura.

---

## 12. Riesgos y controles

| Riesgo | Control |
| --- | --- |
| Exponer token Meta en chat, Git o logs | Configurar secretos solo en Dokploy o entorno local seguro; nunca documentar valores. |
| Enviar a numero no autorizado | Usar destinatario de prueba aprobado humanamente; no automatizar lista. |
| Enviar enlace `localhost` | Mantener validacion de URL publica HTTPS en frontend y backend. |
| Confundir `provider_accepted` con entregado | Etiquetar como aceptacion tecnica, no entrega ni lectura. |
| Plantilla no coincide con payload | Validar humanamente plantilla antes de prueba real. |
| CORS bloquea Centro Demo desplegado | Configurar `DEMO_ALLOWED_ORIGINS` con origen exacto autorizado. |
| Error de proveedor expone datos | Sanitizar errores y no retornar payloads completos. |
| Webhook incompleto da falsa trazabilidad | No declarar entrega/lectura sin webhook validado o evidencia humana. |
| App Publica se confunde con Caso 1 | Mantener Caso 1 en Centro Demo; App Publica queda para recorrido y Caso 2 posterior. |

Hallazgo fuera de alcance a tratar en frente separado:

* En la App Publica Ruta 2 existe una clave o identificador de Vapi visible en frontend versionado. No corresponde a Meta/WhatsApp Caso 1 y no se modifica aqui, pero debe revisarse en el frente Vapi/Marta correspondiente para confirmar si es clave publica esperada o exposicion sensible.

---

## 13. Limites del alcance

Queda expresamente documentado:

* Meta/WhatsApp no fue configurado ni probado en esta tarea.
* Elastic Email no fue configurado ni probado en esta tarea.
* Supabase y SQL no fueron tocados.
* No se leyo `.env`.
* No se opero Dokploy.
* No se opero DNS.
* No se envio ningun mensaje.
* No se inicio Expediente Vivo.
* No se inicio la tabla visible de 20 casos simulados.
* No se implemento Caso 2.
* No se hizo commit ni push.

Siguiente paso autorizado, pero no iniciado aqui:

* solicitar autorizacion posterior para microcirugia limitada del Backend Demo API y configuracion humana segura de Meta/Dokploy para probar WhatsApp Caso 1.

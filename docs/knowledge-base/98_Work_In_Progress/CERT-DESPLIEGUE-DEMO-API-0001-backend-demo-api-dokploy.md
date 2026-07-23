# CERT-DESPLIEGUE-DEMO-API-0001 - Certificacion tecnica del Backend Demo API en Dokploy

## Estado documental

* **Identificador:** CERT-DESPLIEGUE-DEMO-API-0001
* **Tipo:** Certificacion tecnica de despliegue
* **Estado:** Preparado para revision humana
* **Fecha de certificacion:** 2026-07-23
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Documento rector de reconstruccion:** `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-85-A-86-20260723-1028.md`
* **Fuentes rectoras aplicadas:** KB-0003, FO-COC-0001, ADR-002, REG-0001 y CF-0001.

Esta certificacion documenta el despliegue vigente del Backend Demo API y la topologia actual de Dokploy. No modifica codigo, no modifica `package.json`, no cambia dependencias, no cambia variables de entorno, no opera Dokploy, DNS, Meta, WhatsApp, Elastic Email ni Supabase, no ejecuta endpoints de envio, no hace commit y no hace push.

---

## 1. Objetivo y alcance

El objetivo unico de este documento es dejar certificada la situacion vigente del Backend Demo API y su relacion con la App Publica Ruta 2 dentro del demo.

Alcance incluido:

* repositorios, ramas y commits certificados;
* topologia vigente de App Publica Ruta 2 y Backend Demo API;
* dominios publicos certificados;
* relacion funcional esperada entre frontend publico y backend;
* evidencia tecnica del endpoint publico `GET /health`;
* evidencia HTTPS de App Publica Ruta 2;
* separacion entre evidencia comprobada desde repositorio o endpoint y estado certificado por validacion humana.

Fuera de alcance:

* configuracion o prueba de Meta/WhatsApp;
* configuracion o prueba de Elastic Email;
* Supabase, SQL o persistencia nueva;
* Expediente Vivo;
* tabla visible de 20 casos simulados;
* cambios funcionales en aplicaciones;
* operacion directa de Dokploy, DNS o proveedores externos.

---

## 2. Reconstruccion documental

La reconstruccion se realizo exclusivamente desde:

`docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-85-A-86-20260723-1028.md`

Documentacion revisada para ubicar familia, nomenclatura y referencias previas:

* `docs/knowledge-base/98_Work_In_Progress/CERT-DESPLIEGUE-RUTA2-0001-app-publica-reservas-https-dokploy.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger.md`
* `docs/knowledge-base/01_Protocolos_Operativos/OPS-0002 - Protocolo Operativo de Despliegue Frontend Vite en Dokploy.md`
* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`

Criterio documental aplicado:

* la familia canonica para evidencia concreta de despliegue es `CERT-DESPLIEGUE-*` dentro de `docs/knowledge-base/98_Work_In_Progress/`;
* `DEMO-0003` conserva la topologia oficial minima del demo;
* `OPS-0002` conserva el procedimiento reutilizable para frontends Vite en Dokploy y no aplica automaticamente a backends;
* este documento no duplica OPS-0002 ni reemplaza DEMO-0003.

---

## 3. Verificacion Git independiente inicial

La verificacion Git inicial se realizo sin `fetch` y sin modificar archivos.

### Repositorio rector - AMENA_Comalapa

* **Ruta:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama esperada:** `centro-mando-admin10`
* **Rama verificada:** `centro-mando-admin10`
* **HEAD esperado:** `52e1e2c1ca8aab3fd4876655813935577f78cdee`
* **HEAD local verificado:** `52e1e2c1ca8aab3fd4876655813935577f78cdee`
* **Referencia remota verificada:** `origin/centro-mando-admin10`
* **HEAD remoto local verificado:** `52e1e2c1ca8aab3fd4876655813935577f78cdee`
* **Ahead/behind:** `0 0`
* **Working tree inicial:** limpio

### Backend Demo API

* **Ruta:** `C:\Amena\Codex\AMENA_Demo_API`
* **Rama esperada:** `main`
* **Rama verificada:** `main`
* **HEAD esperado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **HEAD local verificado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Referencia remota verificada:** `origin/main`
* **HEAD remoto local verificado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Ahead/behind:** `0 0`
* **Working tree inicial:** limpio

### App Publica Ruta 2

* **Ruta:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
* **Rama esperada:** `codex/ruta-2-reservas-generico-manual`
* **Rama verificada:** `codex/ruta-2-reservas-generico-manual`
* **HEAD esperado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **HEAD local verificado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **Referencia remota verificada:** `origin/codex/ruta-2-reservas-generico-manual`
* **HEAD remoto local verificado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **Ahead/behind:** `0 0`
* **Working tree inicial:** limpio

No se detectaron divergencias en la verificacion Git inicial.

---

## 4. Repositorios, ramas y commits certificados

| Componente | Ruta | Rama | Commit certificado |
| --- | --- | --- | --- |
| Repositorio rector | `C:\Amena\Codex\AMENA_Comalapa` | `centro-mando-admin10` | `52e1e2c1ca8aab3fd4876655813935577f78cdee` |
| Backend Demo API | `C:\Amena\Codex\AMENA_Demo_API` | `main` | `77f3f95415c29ca899b2314c55fdbe4029e2ec39` |
| App Publica Ruta 2 | `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2` | `codex/ruta-2-reservas-generico-manual` | `f34fc6d9cf4ef427763f9827b224afd3b19e9005` |

---

## 5. Topologia vigente

### App Publica Ruta 2

* **Repositorio:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
* **Rama:** `codex/ruta-2-reservas-generico-manual`
* **Commit certificado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **Dominio publico:** `https://reservas.automatizahoy.ai`
* **Estado HTTPS tecnico:** respuesta HTTP `200` verificada mediante consulta HTTPS de solo lectura.
* **Certificacion previa:** `CERT-DESPLIEGUE-RUTA2-0001-app-publica-reservas-https-dokploy.md`

### Backend Demo API

* **Repositorio:** `C:\Amena\Codex\AMENA_Demo_API`
* **Rama:** `main`
* **Commit certificado:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Dominio publico:** `https://demo-api.automatizahoy.ai`
* **Endpoint publico certificado:** `GET https://demo-api.automatizahoy.ai/health`
* **Runtime versionado en repositorio:** Node `20.x`
* **Comando de inicio versionado:** `npm start`, definido como `node server.js`
* **Puerto interno versionado:** `PORT=4000` como valor por defecto en `server.js` y en `.env.example`
* **Host de escucha versionado:** `HOST=0.0.0.0` como valor por defecto en `server.js` y en `.env.example`
* **Configuracion de escucha versionada:** `app.listen(PORT, HOST, ...)`

### Dokploy

Los siguientes datos no fueron comprobados mediante acceso directo a Dokploy en esta sesion. Quedan clasificados como **estado certificado por validacion humana**, reconstruido desde el documento rector de transicion:

* **Proyecto Dokploy:** `h-operia-inmobiliaria`
* **Aplicacion:** `API del Centro Demo`
* **Backend Demo API:** desplegado en Dokploy
* **Autodeploy:** OFF
* **HTTPS validado en navegacion normal e incognito:** certificado por validacion humana previa

---

## 6. Relacion frontend-backend

La topologia minima vigente queda expresada asi:

```text
Usuario demo / voluntario
        |
        | HTTPS
        v
https://reservas.automatizahoy.ai
        |
        | Integracion progresiva del flujo demo
        v
https://demo-api.automatizahoy.ai
        |
        | Servicio Node/Express en Dokploy
        v
AMENA_Demo_API escuchando en 0.0.0.0:4000
```

La App Publica Ruta 2 y el Backend Demo API estan publicados como componentes separados del demo. La relacion funcional completa entre App Publica, Centro Demo y Backend Demo API permanece sujeta al cierre posterior del flujo funcional de App Publica y al frente autorizado de WhatsApp.

---

## 7. Evidencia tecnica del Backend Demo API

### Endpoint publico `GET /health`

Consulta realizada:

```powershell
Invoke-RestMethod -Uri 'https://demo-api.automatizahoy.ai/health' -Method Get -TimeoutSec 20 | ConvertTo-Json -Compress
```

Resultado obtenido:

```json
{"ok":true,"service":"amena-demo-api"}
```

Resultado esperado:

```json
{"ok":true,"service":"amena-demo-api"}
```

Dictamen:

* el endpoint publico `GET /health` responde correctamente;
* la respuesta coincide exactamente con el resultado esperado;
* esta evidencia certifica salud publica basica del Backend Demo API, no certifica WhatsApp, correo ni endpoints de envio.

### Evidencia versionada en el repositorio Backend Demo API

`package.json`:

* `scripts.start`: `node server.js`
* `engines.node`: `20.x`

`server.js`:

* define `GET /health`;
* responde `200` con `{"ok":true,"service":"amena-demo-api"}`;
* define `const PORT = process.env.PORT || 4000`;
* define `const HOST = process.env.HOST || "0.0.0.0"`;
* inicia Express mediante `app.listen(PORT, HOST, ...)`.

`.env.example`:

* documenta `NODE_ENV=production`;
* documenta `HOST=0.0.0.0`;
* documenta `PORT=4000`;
* mantiene campos vacios para Meta/WhatsApp y Elastic Email, sin exponer secretos.

No se leyo ni se documento el contenido de `.env`.

---

## 8. Estado HTTPS

### Backend Demo API

El endpoint `https://demo-api.automatizahoy.ai/health` respondio correctamente sobre HTTPS con el JSON esperado.

### App Publica Ruta 2

Consulta realizada:

```powershell
Invoke-WebRequest -Uri 'https://reservas.automatizahoy.ai' -Method Get -TimeoutSec 20
```

Resultado obtenido:

```text
StatusCode=200
ContentLength=2315
```

Dictamen:

* la App Publica Ruta 2 responde por HTTPS con estado `200`;
* la validacion en navegacion normal e incognito queda clasificada como estado certificado por validacion humana previa, no como comprobacion directa de esta sesion.

---

## 9. Limites y componentes pendientes

Permanecen pendientes y fuera de alcance de esta certificacion:

* **Meta/WhatsApp:** no configurado ni probado en esta sesion.
* **Elastic Email:** no configurado ni probado en esta sesion.
* **Supabase y SQL:** no tocados en esta sesion.
* **Endpoints de envio:** no ejecutados en esta sesion.
* **Expediente Vivo:** no iniciado.
* **Tabla visible de 20 casos simulados:** no iniciada.
* **Cierre inteligente:** no iniciado.

Esta certificacion no autoriza declarar comunicaciones reales, entregas, lecturas, mensajes enviados ni integraciones multicanal completas.

---

## 10. Controles de seguridad

Controles aplicados:

* no documentar secretos;
* no copiar tokens;
* no copiar contrasenas;
* no copiar variables sensibles;
* no leer ni publicar `.env`;
* no operar proveedores externos;
* no ejecutar endpoints de envio;
* distinguir evidencia tecnica directa de estado certificado por validacion humana.

Los campos vacios visibles en `.env.example` no son secretos y solo sirven como plantilla documental de configuracion esperada.

---

## 11. Estado operativo certificado

Estado certificado al cierre de esta documentacion:

* Backend Demo API publicado y respondiendo por HTTPS en `https://demo-api.automatizahoy.ai/health`;
* respuesta publica `{"ok":true,"service":"amena-demo-api"}` verificada;
* App Publica Ruta 2 respondiendo por HTTPS en `https://reservas.automatizahoy.ai`;
* repositorios certificados en ramas y commits esperados;
* working tree limpio en Backend Demo API y App Publica Ruta 2;
* repositorio rector queda con este nuevo documento pendiente de revision humana, sin commit ni push;
* proyecto Dokploy `h-operia-inmobiliaria`, aplicacion `API del Centro Demo`, autodeploy OFF y validacion normal/incognito quedan como estado certificado por validacion humana.

---

## 12. Siguiente paso autorizado

El siguiente paso autorizado, despues de revision humana de esta certificacion, es configurar Meta/WhatsApp de forma segura en el Backend Demo API.

Ese paso no se inicia en esta sesion. Antes de iniciarlo debera mantenerse la regla de foco, verificar nuevamente Git y proteger secretos, tokens, variables sensibles y evidencia de proveedores.

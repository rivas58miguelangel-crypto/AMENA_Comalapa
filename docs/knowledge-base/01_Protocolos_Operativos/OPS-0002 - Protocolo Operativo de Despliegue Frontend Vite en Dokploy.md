# OPS-0002 - Protocolo Operativo de Despliegue Frontend Vite en Dokploy

## Estado documental

* **Identificador:** OPS-0002
* **Tipo:** Protocolo operativo reutilizable
* **Estado:** Vigente
* **Alcance:** Frontend Vite estatico, salida `dist`, Nixpacks, NGINX, puerto 80 y publicacion mediante Dokploy/Traefik.
* **No alcance:** backends, Supabase, SQL, correo, WhatsApp, logica funcional y despliegues productivos generales.
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`

Este documento no modifica codigo, no toca Dokploy, no abre Supabase, no ejecuta SQL, no configura proveedores externos y no despliega aplicaciones por si mismo.

---

## 1. Proposito

Establecer un procedimiento repetible y verificable para desplegar frontends Vite de la Suite H - OperIA en Dokploy, evitando repetir errores ya certificados durante el primer despliegue exitoso.

El procedimiento busca preservar trazabilidad, reducir ensayo y error, separar hechos certificados de supuestos y proteger la continuidad tecnica entre equipos, chats y aplicaciones.

---

## 2. Evidencia certificada

El primer caso validado usado como evidencia es:

* **Aplicacion:** App Publica de Reservas Ruta 2.
* **Dominio:** `https://reservas.automatizahoy.ai`.
* **Repositorio:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`.
* **Rama:** `codex/ruta-2-reservas-generico-manual`.
* **HEAD certificado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`.
* **Build:** `vite build`.
* **Salida:** `dist`.
* **Node:** 20.
* **Servidor final:** NGINX.
* **Puerto de dominio:** 80.
* **HTTPS:** Let's Encrypt.

### Evidencia versionada en repositorio

La evidencia versionada de Ruta 2 incluye:

* `package.json` con script `build` definido como `vite build`.
* `package.json` con:

```json
"engines": {
  "node": "20.x"
}
```

* `nixpacks.toml` con:

```toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm-9_x"]
```

* `package-lock.json` presente.
* `vite.config.ts` presente.

### Evidencia confirmada mediante operacion humana en Dokploy

La operacion humana certifico:

* aplicacion publicada y accesible por HTTPS en `https://reservas.automatizahoy.ai`;
* uso de Dokploy/Traefik como capa de publicacion;
* patron final de frontend estatico servido por NGINX;
* uso de puerto 80 para recibir trafico del dominio;
* correccion de errores NXDOMAIN, Bad Gateway, TRAEFIK DEFAULT CERT y `Cannot find native binding`.

### Datos no registrados por seguridad

No deben publicarse en este documento:

* IP publica exacta del VPS;
* secretos;
* tokens;
* credenciales;
* valores privados de proveedores;
* capturas que expongan configuracion sensible.

---

## 3. Preparacion previa

Antes de crear o modificar cualquier despliegue en Dokploy:

1. Confirmar el equipo desde el que se esta trabajando.
2. Confirmar el repositorio correcto.
3. Confirmar la aplicacion correcta.
4. Ejecutar siempre `git fetch origin --prune`.
5. Verificar rama activa.
6. Verificar HEAD local.
7. Verificar HEAD remoto.
8. Verificar `ahead/behind`.
9. Verificar `working tree`.
10. Revisar `package.json`.
11. Revisar `package-lock.json`.
12. Revisar scripts, especialmente `build`.
13. Revisar directorio de salida esperado.
14. Revisar variables requeridas.
15. Separar variables publicas de secretos.

Comandos Git minimos:

```powershell
git fetch origin --prune
git status
git branch --show-current
git rev-parse HEAD
git rev-parse origin/[rama]
git rev-list --left-right --count HEAD...origin/[rama]
```

No se debe iniciar una publicacion si la rama esta atrasada, divergente, con cambios locales no revisados o con referencias `origin` locales no actualizadas.

---

## 4. Creacion en Dokploy

La creacion inicial debe documentar y verificar:

* proyecto;
* environment;
* aplicacion o servicio;
* proveedor Git;
* URL del repositorio;
* rama;
* Build Path `/`;
* Watch Paths vacio salvo necesidad documentada;
* submodules OFF;
* autodeploy OFF durante la primera publicacion.

No deben inventarse nombres internos de proyecto, environment o servicio si no estan certificados.

Durante la primera publicacion se recomienda mantener autodeploy desactivado para evitar ejecuciones automaticas mientras DNS, HTTPS, variables y build todavia estan en verificacion.

---

## 5. Patron frontend Vite certificado

Para un frontend Vite estatico de la Suite H - OperIA, el patron certificado es:

* **Build Type:** Nixpacks.
* **Publish Directory:** `dist`.
* **Container Port:** 80.

`package.json` debe declarar:

```json
"engines": {
  "node": "20.x"
}
```

`nixpacks.toml` debe declarar:

```toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm-9_x"]
```

Secuencia esperada durante el despliegue:

1. `npm ci`.
2. `npm run build`.
3. Generacion de `dist/`.
4. Construccion de imagen final NGINX.

El resultado esperado del log debe incluir, segun la salida disponible:

* `nodejs_20`;
* `npm ci`;
* `npm run build`;
* generacion de `dist`;
* `Successfully Built`;
* `Nixpacks build completed`;
* `Docker build completed`.

### Razones tecnicas certificadas

Node 18 fallo con `@tailwindcss/oxide` porque la combinacion observada de dependencias requeria Node 20 para construir correctamente.

`engines.node` por si solo no fue suficiente en la integracion observada porque Nixpacks podia seleccionar una version de Node no compatible. Por eso se agrego `nixpacks.toml` como garantia explicita y versionada del runtime.

El puerto 3000 produjo Bad Gateway porque corresponde al servidor de desarrollo Vite, no al contenedor estatico final. La imagen final servida por NGINX recibe trafico HTTP en el puerto 80.

Para este patron, el dominio de Dokploy/Traefik debe apuntar al Container Port 80.

---

## 6. Variables de entorno

Las variables deben configurarse en la pestana Environment de Dokploy.

Reglas:

* usar formato `NOMBRE=valor`;
* no incluir espacios alrededor de `=`;
* guardar antes de desplegar;
* no exponer secretos en capturas;
* no registrar secretos en documentos;
* distinguir variables publicas del frontend de secretos reales de backend.

Las variables con prefijo `VITE_` quedan integradas en el bundle del navegador y no deben tratarse como secretos privados.

Los secretos reales de backend no deben incorporarse al frontend.

Para este patron frontend estatico no se debe agregar `NODE_ENV` ni `PORT` salvo justificacion tecnica documentada.

---

## 7. Dominio y HTTPS

Patron de dominio:

* **Host:** subdominio aprobado.
* **Path:** `/`.
* **Internal Path:** `/`.
* **Strip Path:** OFF.
* **Container Port:** 80.
* **Custom Entrypoint:** OFF.
* **HTTPS:** ON.
* **Certificate Provider:** Let's Encrypt.
* **Middlewares:** vacio salvo necesidad justificada.

No debe declararse HTTPS valido hasta comprobar que el navegador no muestra `Not Secure` ni `TRAEFIK DEFAULT CERT`.

---

## 8. DNS

El DNS del subdominio debe apuntar al VPS mediante:

* registro tipo A;
* nombre igual al subdominio aprobado;
* valor igual a la IP publica del VPS;
* TTL configurable segun el proveedor DNS.

No copiar en el valor DNS:

* protocolo;
* puerto;
* ruta;
* URL completa.

La IP publica exacta del VPS no debe publicarse en este documento.

Debe distinguirse:

* **NXDOMAIN:** el subdominio no existe o aun no propaga en DNS.
* **Bad Gateway:** el DNS puede resolver, pero Traefik/Dokploy no logra conectar correctamente con el servicio o puerto configurado.

Antes de diagnosticar aplicacion o build, confirmar `DNS Valid` cuando Dokploy lo muestre y esperar propagacion si corresponde.

---

## 9. Deploy controlado

Durante la primera publicacion:

1. Ejecutar un solo deploy manual.
2. Revisar el log antes de repetir.
3. Confirmar runtime, instalacion, build, salida y construccion de imagen.
4. No pulsar repetidamente Deploy.
5. No usar Rebuild, Start o Delete sin diagnostico previo.
6. No borrar despliegues como reaccion inmediata ante un error.

El log debe revisarse buscando:

* `nodejs_20`;
* `npm ci`;
* `npm run build`;
* `dist` generado;
* `Successfully Built`;
* `Nixpacks build completed`;
* `Docker build completed`.

Cada intento fallido debe analizarse antes de ejecutar una nueva accion.

---

## 10. Errores certificados

### NXDOMAIN

**Causa:** subdominio aun inexistente o no propagado.

**Tratamiento:** corregir o esperar DNS antes de diagnosticar la aplicacion.

### Bad Gateway

**Causa certificada:** dominio apuntando a puerto 3000 cuando la imagen final NGINX servia en puerto 80.

**Tratamiento:** corregir Container Port a 80 para el patron frontend estatico.

### TRAEFIK DEFAULT CERT

**Causa:** certificado Let's Encrypt aun no emitido o configuracion HTTPS pendiente de aplicar.

**Tratamiento:** verificar HTTPS, Certificate Provider, emision del certificado, propagacion y prueba en incognito.

### Cannot find native binding

**Causa:** Nixpacks usando Node 18 con dependencias que exigian Node 20.

**Tratamiento:** declarar Node 20 en `package.json` y fijarlo explicitamente en `nixpacks.toml`.

### Advertencias no bloqueantes

Las siguientes advertencias no bloquearon el despliegue certificado:

* vulnerabilidades npm;
* chunks mayores de 500 kB;
* warning de version menor de Node;
* advertencias Docker/Nixpacks.

No ejecutar `npm audit fix` dentro de una microcorreccion no relacionada.

---

## 11. Validacion final

La validacion final debe confirmar:

* abrir URL HTTPS;
* probar en incognito;
* confirmar carga de la aplicacion;
* confirmar ausencia de `Not Secure`;
* confirmar ausencia de `TRAEFIK DEFAULT CERT`;
* confirmar pantalla inicial;
* no ejecutar casos funcionales si el alcance era solo publicacion;
* registrar explicitamente que integraciones siguen no certificadas.

Una publicacion HTTPS visible no certifica por si sola Supabase, WhatsApp, correo, Vapi, backend, webhooks ni flujos funcionales completos.

---

## 12. Limites

OPS-0002 no aplica automaticamente a `AMENA_Demo_API`.

Para un backend deben revisarse por separado:

* proceso persistente;
* puerto interno real;
* health endpoint;
* secretos;
* variables privadas;
* CORS;
* webhooks;
* reinicios;
* logs;
* dependencia de bases de datos o proveedores externos.

No se debe reutilizar automaticamente el patron estatico de Vite/NGINX para un servicio backend.

---

## 13. Checklist final reutilizable

```text
1. Git preflight
   - git fetch origin --prune
   - rama correcta
   - HEAD local == origin
   - ahead/behind 0 0
   - working tree limpio

2. Runtime
   - package.json revisado
   - engines.node 20.x cuando aplique
   - nixpacks.toml con nodejs_20 y npm-9_x

3. Build
   - package-lock.json presente
   - npm ci esperado
   - npm run build esperado
   - salida dist

4. Variables
   - Environment guardado
   - NOMBRE=valor
   - variables VITE tratadas como publicas
   - secretos fuera del frontend

5. Dominio
   - Host aprobado
   - Path /
   - Internal Path /
   - Strip Path OFF
   - Container Port 80
   - Custom Entrypoint OFF

6. DNS
   - registro A
   - subdominio correcto
   - IP publica del VPS sin protocolo, puerto ni ruta
   - DNS Valid o propagacion identificada

7. HTTPS
   - HTTPS ON
   - Let's Encrypt
   - sin TRAEFIK DEFAULT CERT
   - sin Not Secure

8. Deploy
   - un solo deploy manual
   - no repetir sin diagnostico
   - no usar Rebuild, Start o Delete sin motivo

9. Logs
   - nodejs_20
   - npm ci
   - npm run build
   - dist generado
   - Successfully Built
   - Nixpacks build completed
   - Docker build completed

10. Validacion
    - URL HTTPS abre
    - prueba incognito
    - pantalla inicial correcta
    - integraciones no certificadas registradas

11. Cierre documental
    - evidencia registrada
    - brechas abiertas declaradas
    - Git certificado despues de fetch --prune
```

---

## 14. Referencias cruzadas

* `OPS-0001 - Protocolo Operativo PC Laptop Git.md`.
* `DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger.md`.
* `DEMO-0002 - Especificacion de Comunicaciones Reales WhatsApp Correo Centro Demo.md`.
* `IME-0001 - Indice Maestro de Ejecucion.md`.

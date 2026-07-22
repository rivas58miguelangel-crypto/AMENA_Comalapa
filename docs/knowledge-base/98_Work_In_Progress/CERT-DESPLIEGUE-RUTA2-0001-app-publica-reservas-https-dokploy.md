# CERT-DESPLIEGUE-RUTA2-0001 - Certificacion tecnica del despliegue HTTPS de App Publica Ruta 2

## Estado documental

* **Identificador:** CERT-DESPLIEGUE-RUTA2-0001
* **Tipo:** Certificacion tecnica de despliegue
* **Estado:** Vigente
* **Fecha:** 2026-07-22
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`

Esta certificacion no modifica codigo, no toca Dokploy, no toca DNS, no abre Supabase, no ejecuta SQL y no despliega otra aplicacion.

---

## 1. Contexto certificado

Esta certificacion corresponde exclusivamente a la publicacion tecnica de la App Publica de Reservas Ruta 2 mediante HTTPS en Dokploy.

No certifica casos funcionales, comunicaciones externas reales, backend, persistencia integral ni estados de mensajeria.

---

## 2. Repositorio desplegado

* **Ruta local de referencia:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
* **Rama:** `codex/ruta-2-reservas-generico-manual`
* **HEAD desplegado:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`

Commits relevantes:

* `00eaad1d6980a437bcd5c8cc942c86b21056f500` - `fix: require node 20 for dokploy build`
* `f34fc6d9cf4ef427763f9827b224afd3b19e9005` - `fix: pin node 20 in nixpacks`

---

## 3. Dominio certificado

Dominio:

`https://reservas.automatizahoy.ai`

Evidencia confirmada:

* DNS resuelto;
* HTTPS operativo;
* aplicacion cargando correctamente;
* validacion satisfactoria en ventana de incognito.

No se publica la IP exacta del VPS por seguridad.

---

## 4. Evidencia tecnica confirmada

* **Build Type:** Nixpacks
* **Runtime:** Node 20
* **`npm ci`:** correcto
* **`npm run build`:** correcto
* **Salida:** `dist`
* **Nixpacks build completed:** confirmado
* **Docker build completed:** confirmado
* **Imagen final:** NGINX
* **Container Port:** 80
* **HTTPS:** Let's Encrypt
* **Pantalla inicial:** cargo correctamente

---

## 5. Incidentes resueltos

### A. Node 18 / Cannot find native binding

Nixpacks seleccionaba Node 18 y se produjo incompatibilidad con `@tailwindcss/oxide`.

Correccion certificada:

* se declaro Node 20 en `package.json`;
* se fijo explicitamente mediante `nixpacks.toml`.

### B. `engines.node` insuficiente por si solo

La integracion observada continuo usando Node 18 aun despues de declarar `engines.node`.

Correccion certificada:

* `nixpacks.toml` garantizo `nodejs_20`.

### C. NXDOMAIN

El subdominio todavia no existia en DNS.

Correccion certificada:

* se creo registro tipo A hacia la IP publica del VPS;
* no se publica la IP exacta del VPS.

### D. Bad Gateway

El dominio apuntaba al puerto 3000, pero la imagen final NGINX servia por puerto 80.

Correccion certificada:

* se corrigio `Container Port` a 80.

### E. TRAEFIK DEFAULT CERT

HTTPS todavia no estaba emitido o aplicado correctamente.

Correccion certificada:

* se confirmo Let's Encrypt;
* posteriormente la navegacion HTTPS funciono correctamente.

---

## 6. Relacion con OPS-0002

Procedimiento relacionado:

`docs/knowledge-base/01_Protocolos_Operativos/OPS-0002 - Protocolo Operativo de Despliegue Frontend Vite en Dokploy.md`

OPS-0002 contiene el procedimiento operativo reutilizable para despliegues frontend Vite en Dokploy.

CERT-DESPLIEGUE-RUTA2-0001 contiene la evidencia concreta del despliegue HTTPS de la App Publica de Reservas Ruta 2.

Este documento no duplica el protocolo completo.

---

## 7. Limites explicitos

Esta certificacion no certifica:

* WhatsApp;
* correo electronico;
* Backend Demo API;
* Caso 1;
* Caso 2;
* persistencia funcional integral;
* estados enviado, entregado o leido;
* integraciones externas completas.

---

## 8. Resultado

La App Publica de Reservas Ruta 2 quedo publicada y accesible correctamente mediante HTTPS en Dokploy.

No se declaran completados los casos funcionales.

---

## 9. Referencias cruzadas

* `docs/knowledge-base/01_Protocolos_Operativos/OPS-0002 - Protocolo Operativo de Despliegue Frontend Vite en Dokploy.md`
* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger.md`
* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`
* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-84-A-85-20260722-0728.md`

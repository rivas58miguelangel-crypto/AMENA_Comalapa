# TRANSICION-Codex-AMENA-85-A-86-20260723-1028

## Estado documental

* **Origen:** Codex AMENA 85
* **Destino:** Codex AMENA 86
* **Fecha y hora:** 2026-07-23 10:28
* **Equipo actual:** PC
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Fuentes rectoras aplicadas:** KB-0003, FO-COC-0001, ADR-002 y REG-0001.

Este documento cierra formalmente Codex AMENA 85 y conserva la continuidad obligatoria hacia Codex AMENA 86. No implementa codigo, no modifica aplicaciones, no toca Supabase ni SQL, no configura Meta, WhatsApp ni Elastic Email, no ejecuta endpoints de envio y no abre nuevos frentes.

---

## 1. Estado Git certificado antes del cierre

### Repositorio rector - AMENA_Comalapa

* **Ruta:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama:** `centro-mando-admin10`
* **HEAD local:** `1ee7f2e768f8299c485e7711f80f74f0f880e575`
* **HEAD remoto:** `1ee7f2e768f8299c485e7711f80f74f0f880e575`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

### Backend Demo API

* **Ruta:** `C:\Amena\Codex\AMENA_Demo_API`
* **Rama:** `main`
* **HEAD local:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **HEAD remoto:** `77f3f95415c29ca899b2314c55fdbe4029e2ec39`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

### App Publica Ruta 2

* **Ruta:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
* **Rama:** `codex/ruta-2-reservas-generico-manual`
* **HEAD local:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **HEAD remoto:** `f34fc6d9cf4ef427763f9827b224afd3b19e9005`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

---

## 2. Estado operativo certificado

* **App Publica Ruta 2:** desplegada y certificada en `https://reservas.automatizahoy.ai`.
* **Backend Demo API:** desplegado en Dokploy.
* **Endpoint publico certificado:** `GET https://demo-api.automatizahoy.ai/health`.
* **Respuesta certificada:** `{"ok":true,"service":"amena-demo-api"}`.
* **HTTPS:** validado en navegacion normal e incognito.
* **Backend:** ejecutandose en `0.0.0.0:4000`.

---

## 3. Topologia vigente de Dokploy

La topologia vigente a conservar para AMENA 86 queda registrada asi:

* **Proyecto rector en Dokploy:** `h-operia-inmobiliaria`.
* **Aplicacion:** `API del Centro Demo`.
* **Backend Demo API:** desplegado en Dokploy.
* **Puerto de ejecucion del backend:** `0.0.0.0:4000`.
* **Endpoint publico:** `https://demo-api.automatizahoy.ai/health`.
* **Autodeploy:** OFF.

AMENA 86 debe documentar y certificar esta topologia antes de iniciar configuraciones de Meta, WhatsApp, correo u otros canales.

---

## 4. Integraciones activas y desactivadas

### Activas o certificadas

* App Publica Ruta 2 publicada en `https://reservas.automatizahoy.ai`.
* Backend Demo API publicado en Dokploy.
* Endpoint `/health` publico certificado con respuesta `ok`.
* HTTPS validado en navegacion normal e incognito.

### Desactivadas, no configuradas o no probadas

* **Meta/WhatsApp:** no configurado ni probado.
* **Elastic Email:** no configurado ni probado.
* **Supabase/SQL:** no tocados durante este cierre.
* **Endpoints de envio:** no ejecutados durante este cierre.

---

## 5. Decisiones sobre WhatsApp Caso 1 y Caso 2

WhatsApp sigue siendo el frente operativo prioritario para AMENA 86.

### Caso 1 real

* Debe configurarse de forma segura en el Backend Demo API.
* Debe ejecutarse con destinatario autorizado.
* Debe certificarse con evidencia antes de cerrar el frente.
* No puede declararse cerrado por despliegue, existencia de endpoint o aceptacion tecnica sin evidencia de prueba real.

### Caso 2 automatico en App Publica

* Debe implementarse despues de configurar y certificar el Caso 1 real.
* Debe integrarse en el flujo de la App Publica de Reservas.
* El cierre debe incluir confirmacion humana dentro de la experiencia de la aplicacion.
* No debe adelantarse antes de cerrar el Caso 1.

---

## 6. Alcance demo del Expediente Vivo

El Expediente Vivo forma parte obligatoria del demo, pero no se inicia en este cierre.

Debe desarrollarse despues de concluir completamente el frente de WhatsApp y cerrar el flujo de la App Publica de Reservas. La primera version sera funcional y demostrable dentro de la aplicacion de administradores, con alcance controlado de demo.

Debe consolidar progresivamente:

* identidad y datos del cliente;
* reserva y producto o unidad seleccionada;
* respuestas y decisiones tomadas;
* conversaciones de voz o texto con Marta;
* hechos expresados por el usuario;
* interpretaciones y recomendaciones de IA separadas claramente de los hechos;
* comunicaciones realizadas;
* confirmaciones humanas;
* acciones, proximos pasos y trazabilidad.

No construir todavia:

* arquitectura productiva definitiva;
* Supabase definitivo;
* RAG permanente;
* permisos empresariales complejos;
* automatizacion multicanal completa;
* expediente universal parametrizable para multiples industrias.

---

## 7. Nueva tarea obligatoria: tabla visible de 20 casos simulados

Queda registrada como tarea obligatoria de backlog para AMENA 86 o continuidad posterior, segun la regla de foco.

El Centro Demo no debe limitarse a tener los 20 casos simulados almacenados internamente. Debe incorporar una vista demostrable, visible y auditable, accesible mediante un control como:

`Ver los 20 casos simulados`

La tabla debera presentar, para cada caso simulado, informacion integrada proveniente de:

* App Publica de Reservas;
* identidad del interesado;
* producto o unidad seleccionada;
* necesidades, respuestas y decisiones del cliente;
* estado del proceso;
* conversaciones simuladas con Marta;
* conversaciones simuladas entre vendedores y clientes;
* chats internos simulados entre miembros del equipo;
* acciones realizadas;
* proximos pasos;
* datos que alimentaran posteriormente el Expediente Vivo y el cierre ejecutivo.

Esta vista no debe tratarse como una simple tabla tecnica o estructura interna de React. Debe disenarse como una vista clara para la presentacion comercial del demo, permitiendo demostrar como H - OperIA reune, relaciona y hace visible el conocimiento operativo generado por diferentes canales y participantes.

Registro de backlog:

* **Backlog ID provisional:** `DEMO-BACKLOG-20-CASOS-VISIBLES`.
* **Estado:** pendiente.
* **Prioridad:** obligatoria, despues de WhatsApp, cierre de App Publica, Expediente Vivo y cierre ejecutivo.
* **Restriccion:** no desarrollar durante el cierre de AMENA 85.

---

## 8. Orden exacto de trabajo para Codex AMENA 86

1. Reconstruccion certificada desde este documento rector de transicion.
2. Documentar y certificar el despliegue del Backend Demo API y la topologia actual de Dokploy.
3. Configurar Meta/WhatsApp de forma segura en el Backend Demo API.
4. Ejecutar y certificar WhatsApp Caso 1 real.
5. Implementar y certificar WhatsApp Caso 2 automatico en la App Publica.
6. Cerrar completamente el flujo funcional de la App Publica de Reservas.
7. Disenar e implementar la primera version demo del Expediente Vivo en la aplicacion de administradores.
8. Construir el cierre inteligente y ejecutivo sobre el Expediente Vivo.
9. Disenar e implementar la tabla visible de los 20 casos simulados, integrando reservas, Marta, conversaciones vendedor-cliente y chats internos.
10. Conectar progresivamente Registro Comercial, Mensajeria y otras fuentes demo.
11. Abordar correo electronico despues de estabilizar WhatsApp, salvo dependencia tecnica justificada.

---

## 9. Restricciones operativas

* Mantener un solo frente operativo activo.
* No iniciar el Expediente Vivo, el cierre inteligente ni la tabla visible de 20 casos hasta concluir y certificar WhatsApp y el cierre de la App Publica.
* No realizar cambios funcionales durante este cierre.
* No modificar aplicaciones durante este cierre.
* No tocar Supabase ni SQL.
* No configurar Meta, WhatsApp o Elastic Email durante este cierre.
* No ejecutar endpoints de envio durante este cierre.
* No abrir nuevos frentes.
* No declarar comunicaciones reales sin evidencia verificable.
* No asumir automatizaciones multicanal no certificadas.
* No convertir el alcance demo del Expediente Vivo en arquitectura productiva definitiva.

---

## 10. Primera accion obligatoria del nuevo chat

Codex AMENA 86 debe iniciar reconstruyendo y certificando continuidad desde este documento.

Primera accion obligatoria:

1. Leer este documento completo.
2. Verificar repositorios, ramas, HEAD local/remoto, ahead/behind y working tree de los tres repositorios declarados.
3. Documentar y certificar el despliegue del Backend Demo API y la topologia actual de Dokploy.
4. Confirmar que Meta/WhatsApp, Elastic Email y Supabase siguen sin tocarse antes de iniciar cualquier configuracion.

Solo despues de esa reconstruccion certificada podra abrirse el frente operativo de Meta/WhatsApp Caso 1.

---

## 11. Cierre formal de Codex AMENA 85

Codex AMENA 85 queda cerrado con:

* App Publica Ruta 2 desplegada y certificada;
* Backend Demo API desplegado en Dokploy;
* endpoint `/health` publico certificado;
* HTTPS validado en navegacion normal e incognito;
* repositorios certificados y sincronizados antes del cierre;
* Meta/WhatsApp no configurado ni probado;
* Elastic Email no configurado ni probado;
* Supabase/SQL no tocados;
* Expediente Vivo confirmado como parte obligatoria del demo, diferido por regla de foco;
* tabla visible de 20 casos simulados registrada como tarea obligatoria de backlog, diferida por regla de foco;
* ninguna modificacion funcional realizada durante este cierre.

AMENA 86 no debe iniciar trabajo nuevo sin reconstruccion certificada desde este documento.

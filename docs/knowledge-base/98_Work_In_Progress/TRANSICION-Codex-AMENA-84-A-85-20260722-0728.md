# TRANSICION-Codex-AMENA-84-A-85-20260722-0728

## Estado documental

* **Origen:** Codex AMENA 84
* **Destino:** Codex AMENA 85
* **Fecha y hora:** 2026-07-22 07:28
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Fuentes rectoras aplicadas:** KB-0003, FO-COC-0001, ADR-002, REG-0001, CF-0001, DEMO-0002, DEMO-0003 e IME-014.

Este documento cierra formalmente Codex AMENA 84 y conserva la continuidad obligatoria hacia Codex AMENA 85. No implementa codigo, no despliega aplicaciones, no crea proyectos Dokploy, no modifica DNS, no accede a Meta Business, no envia mensajes reales, no abre Supabase y no ejecuta SQL.

---

## 1. Estado Git certificado

### Repositorio rector - AMENA_Comalapa

* **Ruta:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama:** `centro-mando-admin10`
* **HEAD local:** `68321649fdc2dba9982a4f39a519812d28ace3e6`
* **HEAD remoto:** `68321649fdc2dba9982a4f39a519812d28ace3e6`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

### Demo API

* **Ruta:** `C:\Amena\Codex\AMENA_Demo_API`
* **Rama:** `main`
* **HEAD local:** `2f176235810fdb352c760906f65f8fafc25cf82a`
* **HEAD remoto:** `2f176235810fdb352c760906f65f8fafc25cf82a`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

### App Publica vigente del demo

* **Ruta:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`
* **Rama:** `codex/ruta-2-reservas-generico-manual`
* **HEAD local:** `d03c71a49390fe84672b7434f5c0442538f644a7`
* **HEAD remoto:** `d03c71a49390fe84672b7434f5c0442538f644a7`
* **Ahead/behind:** `0 0`
* **Working tree:** limpio

---

## 2. Trabajo completado en AMENA 84

Durante AMENA 84 se completo el frente documental y tecnico preparatorio de DEMO-0002 Caso 1, sin activar despliegue ni envios reales.

Trabajo completado:

* auditoria de WhatsApp, correo, Vapi, voz y artefactos existentes relacionados con comunicaciones del demo;
* creacion y publicacion de `DEMO-0002 - Especificacion de Comunicaciones Reales WhatsApp Correo Centro Demo`;
* registro, refuerzo obligatorio y conservacion de IME-014 como pendiente activo;
* creacion y publicacion de `DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger`;
* implementacion y publicacion del Paquete 1 del Caso 1;
* configuracion por entorno local/VPS para Centro Demo y Demo API;
* enlace correcto hacia la App Publica de Reservas;
* boton WhatsApp bloqueado cuando no existe configuracion publica certificable;
* validaciones backend de `phone`, `name` y `link`;
* rechazo de `localhost` y URLs no HTTPS para comunicaciones reales;
* respuesta veraz `provider_accepted` cuando el proveedor acepta la solicitud;
* CORS configurable mediante `DEMO_ALLOWED_ORIGINS`;
* ausencia de envios reales durante AMENA 84.

El Paquete 1 quedo publicado, pero no activado ni desplegado.

---

## 3. Decisiones arquitectonicas vigentes

Las siguientes decisiones quedan vigentes para AMENA 85:

* Centro Demo y Aplicacion Administrativa son aplicaciones conceptualmente distintas.
* Actualmente cohabitan tecnicamente dentro de `AMENA_Comalapa`.
* El despliegue conjunto en AMENA 85 sera transitorio.
* La separacion futura continua siendo obligatoria.
* No debe crearse una falsa separacion usando el mismo bundle bajo otro nombre.
* Los proyectos Dokploy representan aplicaciones completas, no paginas, rutas, pantallas ni modulos internos.
* La lista de aplicaciones es abierta y seguira el patron `h-operia-[nombre-funcional-de-la-aplicacion]`.

Estas decisiones son coherentes con ADR-001 y ADR-002: preservan la diferencia entre Centro Demo y aplicaciones operativas, no crean nuevas Autoridades Rectoras y no sustituyen REG-0001.

---

## 4. Nomenclatura conceptual vigente

La nomenclatura conceptual vigente para aplicaciones completas de la Suite H - OperIA es:

* `h-operia-admin`
* `h-operia-centro-demo`
* `h-operia-reservas`
* `h-operia-registro-operacional`
* `h-operia-mensajeria`
* `h-operia-vendedoras`
* `h-operia-demo-api`

Para el despliegue inmediato:

* Centro Demo cohabitara transitoriamente dentro de `h-operia-admin`.
* `h-operia-centro-demo` queda como identidad futura cuando exista separacion tecnica real.

La lista no es cerrada ni definitiva. Futuras aplicaciones de recepcion de documentos, cobros y pagos, atencion al cliente u otros roles operativos deberan documentarse antes de incorporarse y seguir el patron de nomenclatura vigente.

---

## 5. Dominios aprobados

Los dominios aprobados para la preparacion del despliegue del demo son:

* `demo.automatizahoy.ai`
* `reservas.automatizahoy.ai`
* `api-demo.automatizahoy.ai`

Estos dominios no certifican despliegue por si mismos. AMENA 85 debera verificar HTTPS, rutas, health checks y configuracion publica antes de realizar pruebas reales.

---

## 6. Estado de DEMO-0002 / IME-014

DEMO-0002 e IME-014 quedan:

* activos;
* pendientes;
* con prioridad alta;
* con Caso 1 no cerrado;
* sin despliegue certificado;
* sin validacion de plantilla Meta;
* sin prueba humana real;
* sin evidencia de recepcion por voluntario;
* con Caso 2 y Elastic Email todavia diferidos.

DEMO-0002 no puede cerrarse por publicacion documental, interfaz visible, endpoint declarado, backend disponible, solicitud aceptada por proveedor o evidencia simulada.

Correccion obligatoria sobre WhatsApp Caso 2:

* no debe asumirse que el mensaje de WhatsApp se genera o envia inmediatamente despues de concretarse la reserva;
* el usuario completa la reserva y continua todo el acompanamiento posterior;
* el WhatsApp consolidado ocurre en el tramo final del recorrido, antes de salir de la experiencia;
* el usuario debe confirmar dentro de la aplicacion que ya recibio el mensaje;
* solo despues de esa confirmacion se completa el cierre definitivo;
* la auditoria debe identificar el paso exacto, sea 14, 15, 16 o equivalente, donde ocurre la solicitud de envio, el envio real o simulado, la confirmacion de recepcion y el cierre definitivo.

---

## 7. Objetivo operativo inicial de AMENA 85

AMENA 85 debera iniciar con un paquete minimo de despliegue y activacion controlada:

1. Crear la estructura correcta en Dokploy.
2. Desplegar App Publica.
3. Verificar URL HTTPS.
4. Desplegar Demo API.
5. Verificar `/health`.
6. Desplegar transitoriamente Admin/Centro Demo.
7. Configurar variables publicas y CORS.
8. Validar plantilla Meta aprobada.
9. Realizar una prueba real con destinatario autorizado.
10. Registrar evidencia.
11. Mantener IME-014 abierto hasta cierre certificado.

El objetivo inmediato es habilitar DEMO-0002 Caso 1 sin abrir Caso 2 ni arquitectura general de comunicaciones.

---

## 8. Restricciones de continuidad

AMENA 85 debe preservar las siguientes restricciones:

* no abrir Supabase;
* no ejecutar SQL;
* no reabrir Ruta 2 para cambios no autorizados;
* no separar estructuralmente Centro Demo/Admin en este paquete;
* no tocar Caso 2;
* no modificar plantilla Meta sin validacion humana;
* no mostrar secretos;
* no declarar entrega o lectura sin evidencia;
* no cerrar IME-014 por despliegue, endpoint o aceptacion del proveedor;
* no crear proyectos Dokploy por paginas, pantallas, rutas o modulos internos.

---

## 9. Cierre formal de AMENA 84

Codex AMENA 84 queda cerrado con:

* DEMO-0002 publicado y activo;
* DEMO-0003 publicado y actualizado;
* Paquete 1 del Caso 1 publicado en Centro Demo y Demo API;
* repositorios certificados y sincronizados;
* ninguna modificacion de codigo pendiente;
* ningun despliegue ejecutado;
* ningun envio real realizado;
* IME-014 activo y pendiente para continuidad en AMENA 85.

La siguiente sesion debe reconstruir este documento junto con DEMO-0002, DEMO-0003 e IME-014 antes de cualquier despliegue, configuracion publica o prueba real.

---

## 10. Incidente de continuidad Git detectado en AMENA 85

Durante la apertura operativa de Codex AMENA 85, al cambiar de PC a Laptop, se detecto una falsa percepcion inicial de sincronia Git.

La Laptop parecia alineada porque se comparo `HEAD` contra la referencia `origin` local, pero esa referencia estaba desactualizada. Al ejecutar posteriormente `git fetch origin --prune`, se detecto el atraso real:

* `AMENA_Comalapa`: behind 17 commits.
* `AMENA_Demo_API`: behind 1 commit.
* `AMENA_Reservas_Publica_Ruta2`: behind 1 commit.

La actualizacion por fast-forward corrigio el estado de la Laptop y el cierre operativo posterior certifico `ahead/behind 0 0` y `working tree` limpio en los tres repositorios.

Evidencia historica incorporada:

* hubo falsa percepcion inicial de sincronia por uso de referencias `origin` locales no actualizadas;
* el `fetch` posterior detecto atrasos reales;
* la actualizacion por fast-forward corrigio la Laptop;
* el estado final quedo certificado `0 0` en los tres repositorios.

Regla operativa derivada:

Toda certificacion Git posterior a cambio de equipo, apertura de nuevo chat, reanudacion despues de varias horas o sospecha de trabajo remoto previo debe ejecutar primero `git fetch origin --prune` en cada repositorio involucrado. No se puede declarar `HEAD == origin`, `ahead/behind 0 0` ni `working tree` operativo certificado usando referencias `origin` locales no actualizadas.

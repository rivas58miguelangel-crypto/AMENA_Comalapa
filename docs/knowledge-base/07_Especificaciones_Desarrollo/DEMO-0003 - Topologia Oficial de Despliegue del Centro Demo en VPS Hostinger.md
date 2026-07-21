# DEMO-0003 - Topologia Oficial de Despliegue del Centro Demo en VPS Hostinger

## Estado documental

* **Identificador:** DEMO-0003
* **Tipo:** Especificacion de topologia minima de despliegue
* **Estado:** Activa como referencia documental
* **Alcance:** Demo limitado
* **Implementacion:** Pendiente
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Relacion principal:** DEMO-0002 / IME-014

Este documento no implementa aplicaciones, no modifica codigo, no despliega servicios, no abre Supabase, no ejecuta SQL y no autoriza una arquitectura empresarial de produccion.

---

## 1. Proposito

Definir la topologia oficial minima para desplegar el Centro Demo en el VPS Hostinger ya reconocido como entorno de validacion comercial, usando Dokploy y Traefik como infraestructura existente cuando corresponda.

La topologia se limita al ecosistema necesario para ejecutar la demostracion controlada y sostener el alcance activo de DEMO-0002.

---

## 2. Componentes del Demo

El demo queda compuesto por tres componentes de despliegue principales:

| Componente | Rol dentro del demo |
| --- | --- |
| Centro Demo | Aplicacion web operativa desde donde el equipo inicia el flujo, consulta voluntarios y activa el envio real del enlace. |
| App Publica de Reservas | Aplicacion web publica que recibira el voluntario para completar el recorrido y la reserva. |
| AMENA_Demo_API | Servicio backend para comunicaciones externas autorizadas y otras funciones del demo. |

No forman parte de esta topologia minima: monitoreo empresarial, alta disponibilidad, balanceadores adicionales, automatizacion CI/CD avanzada, persistencia nueva en Supabase, webhooks de entrega/lectura ni arquitectura multiempresa.

---

## 3. Ubicacion de cada aplicacion

En entorno local, las aplicaciones pueden seguir operando como recursos de desarrollo:

| Aplicacion | Local |
| --- | --- |
| Centro Demo | Vite en `localhost`, tipicamente puerto `3000`. |
| App Publica | Vite en `localhost`, puerto separado cuando se ejecute junto al Centro Demo. |
| Demo API | Express en `localhost:4000`. |

En entorno VPS Hostinger, cada aplicacion debe contar con una URL publica HTTPS definida mediante Dokploy/Traefik:

| Aplicacion | VPS Hostinger |
| --- | --- |
| Centro Demo | URL publica para uso del equipo demo. |
| App Publica | URL publica que sera enviada al voluntario. |
| Demo API | URL publica o ruta API HTTPS consumida por el Centro Demo. |

---

## 4. Flujo de comunicacion

El flujo minimo para DEMO-0002 Caso 1 sera:

1. El equipo opera desde el Centro Demo desplegado en VPS.
2. El Centro Demo identifica al voluntario y construye el enlace publico de acceso a la App Publica.
3. El Centro Demo envia una solicitud HTTPS a AMENA_Demo_API.
4. AMENA_Demo_API procesa la solicitud y utiliza el proveedor WhatsApp autorizado.
5. El voluntario recibe por WhatsApp el enlace publico de la App Publica.
6. La App Publica se abre desde el dispositivo del voluntario usando una URL accesible fuera del entorno local.

El Centro Demo no debe enviar enlaces `localhost` ni enlaces internos del propio Centro Demo cuando el objetivo sea dar acceso a la App Publica.

---

## 5. Servicios externos autorizados

Los servicios externos autorizados no forman parte de la Suite H-OperIA. Son proveedores externos consumidos por AMENA_Demo_API cuando corresponda al alcance aprobado del demo.

Para DEMO-0002, los servicios actualmente pertinentes son:

| Servicio externo | Uso dentro de DEMO-0002 |
| --- | --- |
| Meta WhatsApp Cloud API | Envio real por WhatsApp, prioritario para Caso 1 y Caso 2 segun alcance aprobado. |
| Elastic Email | Previsto para correo electronico posterior del Caso 2 unicamente cuando dicho caso sea autorizado e implementado conforme a DEMO-0002. |

Cualquier futura integracion, incluyendo OpenAI, Vapi u otras, debera documentarse expresamente antes de incorporarse al demo.

---

## 6. Uso de Traefik/Dokploy

Dokploy debe usarse como capa operativa existente para alojar las aplicaciones del demo.

Traefik debe actuar como entrada HTTPS, asignando dominios o rutas publicas a cada componente.

Esta especificacion no exige modificar Traefik todavia; solo fija que la publicacion posterior debe respetar la separacion entre frontend publico, frontend operativo y backend API.

---

## 7. Separacion Local/VPS

El entorno local queda reservado para desarrollo y verificacion tecnica preliminar.

El entorno VPS Hostinger sera el entorno valido para prueba demo real, especialmente cuando intervengan enlaces enviados a voluntarios o comunicaciones externas.

Ninguna comunicacion real destinada a voluntarios podra depender de URLs `localhost`, ni certificarse fuera del entorno VPS.

Toda URL usada en comunicaciones reales debe ser publica, HTTPS y correspondiente al despliegue VPS.

---

## 8. Relacion con DEMO-0002

Esta topologia sirve unicamente como soporte para implementar posteriormente DEMO-0002.

En particular, habilita el Caso 1: envio real del enlace de acceso a la App Publica de Reservas al voluntario desde el Centro Demo.

DEMO-0002 e IME-014 permanecen activos y pendientes hasta que exista implementacion real, prueba controlada, evidencia de resultado y documentacion de cierre validada humanamente.

# DEMO-0004 - Especificacion Funcional del Cierre Inteligente y Expediente Vivo del Centro Demo

## Estado documental

* **Identificador:** DEMO-0004
* **Tipo:** Especificacion funcional demo
* **Estado:** Activa como referencia funcional
* **Alcance:** Centro Demo limitado
* **Implementacion:** Pendiente
* **Produccion futura:** Expresamente diferida
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Relacion principal:** DEMO-0002 / IME-014

Este documento no modifica aplicaciones, no despliega servicios, no abre Dokploy, no toca Supabase, no ejecuta SQL, no envia WhatsApp, no envia correo y no disena la arquitectura productiva completa.

---

## 1. Proposito

Definir como debe manifestarse en el Centro Demo el cierre inteligente de la experiencia y la visualizacion inmediata del Expediente Vivo.

El proposito es demostrar de forma creible como H - OperIA transforma una experiencia de reserva, acompanamiento, conversacion, analisis y comunicacion final en memoria operacional util, visible y explicable.

El Expediente Vivo ya existe conceptualmente dentro de la arquitectura vigente como continuidad operacional del cliente, reserva, comunicaciones, evidencias, interpretaciones, decisiones y proximos pasos. Este documento no redefine esa arquitectura; solo especifica su expresion funcional demo.

---

## 2. Secuencia funcional del Caso 2

La secuencia funcional rectora del Caso 2 es:

1. Reserva completada.
2. Acompanamiento completo.
3. Conversacion o informacion de Marta/Vapi incorporada al recorrido.
4. Extraccion estructurada de senales relevantes.
5. Analisis y recomendaciones de IA.
6. Disparo automatico del WhatsApp al alcanzar el punto definido del tramo final.
7. Aceptacion tecnica del proveedor.
8. Aviso al usuario dentro de la App Publica.
9. El usuario sale momentaneamente a WhatsApp.
10. El usuario abre y lee el mensaje.
11. El usuario regresa a la App Publica.
12. El usuario confirma recepcion dentro de la aplicacion.
13. Cierre definitivo.
14. Consolidacion inmediata del Expediente Vivo.
15. Visualizacion del Expediente Vivo en Centro Demo.

El expediente puede comenzar a formarse antes del cierre. En este punto queda consolidado y presentado como resultado completo de la experiencia demo.

---

## 3. Fuentes que alimentan el expediente demo

El Expediente Vivo demo puede alimentarse de:

* datos del usuario;
* unidad habitacional seleccionada;
* datos de reserva;
* recorrido dentro de la aplicacion;
* respuestas y preferencias;
* conversacion de Marta/Vapi;
* expresiones personales, familiares o sensibles relevantes;
* interpretacion de IA;
* recomendaciones;
* acciones siguientes;
* evidencia del WhatsApp;
* confirmacion humana del usuario.

---

## 4. Separacion obligatoria de informacion

El Expediente Vivo debe separar claramente:

| Categoria | Regla |
| --- | --- |
| Hechos objetivos | Datos verificables del recorrido, reserva, unidad, eventos y acciones. |
| Expresiones del usuario | Frases, preferencias o senales expresadas por la persona usuaria. |
| Evidencia o fuente | Origen de cada dato importante: formulario, interaccion, Marta, WhatsApp, confirmacion o sistema. |
| Interpretacion de IA | Lectura inferida o sintetizada, siempre rotulada como interpretacion. |
| Recomendaciones de IA | Siguientes acciones sugeridas, separadas de los hechos. |
| Confirmaciones humanas | Declaraciones hechas por el usuario, incluyendo recepcion del WhatsApp. |
| Acciones realizadas | Solicitudes, aceptaciones tecnicas, confirmaciones y pasos completados. |
| Proximos pasos | Acciones recomendadas para equipo humano o cliente. |

No debe presentarse una interpretacion de IA como hecho. No deben atribuirse al usuario frases que no expreso.

---

## 5. Marta y Vapi en el demo

Marta es el unico agente conversacional visible en esta etapa del demo.

Vapi es el canal o infraestructura de voz. No debe presentarse como otro agente frente al usuario.

La conversacion puede ser real, simulada o preestructurada segun el escenario demo, siempre que su estado quede claramente rotulado. El demo puede preservar fragmentos o elementos relevantes de la conversacion y procesarlos mediante fixtures o estructuras controladas.

Esta especificacion no autoriza construir todavia webhooks productivos completos, memoria longitudinal ni analisis irrestricto de llamadas.

---

## 6. WhatsApp final del Caso 2

El WhatsApp final del Caso 2 debe contemplar:

* identificacion breve del usuario;
* resumen de la unidad seleccionada;
* necesidades o preferencias relevantes expresadas;
* interpretacion claramente rotulada;
* recomendacion;
* posibles acciones siguientes;
* lenguaje prudente para asuntos personales o familiares;
* enlace o referencia al resumen ampliado cuando el contenido sea demasiado extenso.

El WhatsApp no debe convertirse en una copia completa del Expediente Vivo.

El envio debe dispararse automaticamente por avance del usuario al punto definido del tramo final. No debe requerir que el usuario pulse conscientemente un boton para solicitar el WhatsApp.

Los estados minimos del Caso 2 son:

| Estado | Significado |
| --- | --- |
| `whatsapp_request_created` | La App Publica genero automaticamente la solicitud. |
| `whatsapp_provider_accepted` | El proveedor acepto la solicitud. No equivale a entregado ni leido. |
| `whatsapp_user_confirmed` | El usuario declara dentro de la aplicacion que recibio y leyo el mensaje. |
| `final_flow_completed` | El recorrido continuo despues de la confirmacion. |

---

## 7. Expediente Vivo visible en Centro Demo

El Centro Demo debe poder mostrar inmediatamente una vista demo del Expediente Vivo con:

* identidad del caso;
* estado de la reserva;
* unidad seleccionada;
* timeline resumido;
* aportes de Marta;
* hechos y expresiones relevantes;
* analisis de IA;
* recomendaciones;
* WhatsApp solicitado, aceptado y confirmado;
* proximos pasos;
* fuente y nivel de certeza de cada elemento importante.

La vista debe permitir explicar la cadena:

fuente -> dato capturado -> interpretacion -> recomendacion -> comunicacion -> confirmacion -> Expediente Vivo.

---

## 8. Alcance demo permitido

Para terminar el Centro Demo se permite:

* datos preestructurados;
* conversacion representativa;
* fixtures;
* analisis controlado;
* expediente generado localmente o mediante backend demo;
* envio real o simulado claramente rotulado.

No es obligatorio todavia:

* pipeline productivo completo de Vapi;
* multiples agentes;
* persistencia productiva definitiva;
* webhooks completos;
* aprendizaje longitudinal;
* gobierno productivo de datos sensibles;
* automatizacion universal para cualquier conversacion.

---

## 9. Criterio de credibilidad

La demo debe mostrar una cadena coherente y verificable:

fuente -> dato capturado -> interpretacion -> recomendacion -> comunicacion -> confirmacion -> Expediente Vivo.

No debe simular como real aquello que no lo sea. Una solicitud aceptada por proveedor no debe presentarse como entrega o lectura confirmada.

---

## 10. Diferencia futura de produccion

En esta especificacion:

* Marta acompana e interactua con el cliente.
* H - OperIA Intelligence analiza transversalmente y produce inteligencia adicional.
* Produccion podra incorporar otros agentes.
* No se disena todavia la arquitectura completa de produccion.

---

## 11. Referencias rectoras

* `docs/knowledge-base/07_Especificaciones_Desarrollo/DEMO-0002 - Especificacion de Comunicaciones Reales WhatsApp Correo Centro Demo.md`
* `docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md`

DEMO-0003 permanece como referencia de topologia cuando sea necesario hablar de despliegue o conectividad, pero esta especificacion no introduce detalles de despliegue.

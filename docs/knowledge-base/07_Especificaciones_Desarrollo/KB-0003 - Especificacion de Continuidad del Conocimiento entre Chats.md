# KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats

## Estado

Especificacion para desarrollo posterior.

No constituye todavia un estandar definitivo.

---

# Objetivo

Garantizar que la continuidad metodologica del proyecto no dependa de la memoria del modelo ni del historial visible de un chat determinado.

Cada nuevo chat debe comenzar con suficiente contexto para preservar no solo el estado tecnico del proyecto, sino tambien su identidad, sus principios rectores y su modelo de trabajo.

---

# Problema identificado

Hasta ahora los resumenes de apertura contienen correctamente:

* repositorio;
* rama;
* ultimo commit;
* estado Git;
* tareas pendientes.

Sin embargo, esos resumenes no preservan por si solos el conocimiento metodologico acumulado durante el proyecto.

Como consecuencia, al abrir un nuevo chat pueden perderse decisiones estrategicas, criterios de diseno, principios de gobernanza y formas de trabajo ya consolidadas.

---

# Principio rector

La continuidad del proyecto debe depender de la Base de Conocimiento y no exclusivamente de la memoria del modelo.

Un resumen de apertura ayuda a orientar el arranque, pero no reemplaza la lectura de los documentos fuente. El resumen puede seleccionar, comprimir u omitir partes del recorrido intelectual que explican por que una decision existe.

La memoria conversacional tampoco es fuente de verdad. Puede servir como contexto inmediato, pero no debe tratarse como repositorio estable, versionado ni auditable.

Por eso la continuidad debe conservar:

* la conclusion alcanzada;
* el razonamiento que llevo a esa conclusion;
* las alternativas descartadas cuando sean relevantes;
* las advertencias y restricciones que condicionan la decision;
* los documentos donde el aprendizaje debe quedar consolidado.

La transicion entre chats debe preparar la apertura efectiva del siguiente chat. La continuidad no depende de cerrar una conversacion, sino de convertir el recorrido del chat inmediatamente anterior en conocimiento consultable, trazable y accionable cuando se abre un nuevo chat del mismo proyecto.

---

# Prerrequisito para proyectos nuevos

Si el chat pertenece a un proyecto nuevo o recien creado, primero debe verificarse que GOV-0002 haya sido aplicado.

La Transicion entre Chats opera plenamente unicamente sobre Proyectos Operativamente Inicializados (POI).

Si el Bootstrap Metodologico no esta completo y el proyecto aun no alcanza estado POI, el chat debe priorizar completar GOV-0002 antes de continuar cualquier desarrollo funcional.

---

# Ciclo conceptual de continuidad

La continuidad entre chats debe entenderse como un ciclo.

El protocolo no asume que un chat se cierra. Un chat puede permanecer abierto indefinidamente.

El evento que dispara el ciclo es la apertura de un nuevo chat del mismo proyecto.

## Fase de transicion

El nuevo chat localiza el chat inmediatamente anterior. Desde ese chat anterior se escanea la conversacion completa, se identifican decisiones, compromisos, pendientes, riesgos, hallazgos, aprendizajes y razonamientos relevantes, y se define donde debe quedar documentado cada elemento.

La transicion genera un documento de transicion en `docs/knowledge-base/98_Work_In_Progress`.

## Fase de apertura efectiva

El chat entrante verifica Git, consulta el IME, lee los documentos fuente aplicables, lee el documento de transicion recien generado y confirma explicitamente que documentos fueron leidos antes de diagnosticar, proponer o modificar.

## Resultado del ciclo

El proyecto conserva continuidad porque el conocimiento no queda encerrado en una conversacion. Queda distribuido en documentos fuente, planes vivos, indices y registros de transicion que pueden ser auditados y reutilizados.

Este modelo elimina la ambiguedad de "cerrar un chat" porque la obligacion ya no depende de un cierre formal. La obligacion aparece cuando existe un nuevo chat que debe continuar el trabajo.

---

# Estructura recomendada para cada nuevo chat

Todo contexto de apertura debera dividirse en tres bloques.

## Bloque 1 - Identidad del Proyecto

Informacion estable que cambia muy raramente.

Debe responder preguntas como:

* Que es H-OperIA?
* Que es el Centro Demo?
* Que papel cumple Marta?
* Que papel cumple H-OperIA Intelligence?
* Cual es el objetivo comercial del ecosistema?

---

## Bloque 2 - Principios Rectores

Conjunto de reglas metodologicas que gobiernan todas las decisiones.

Ejemplos:

* La Base de Conocimiento es la fuente de verdad metodologica.
* Los ADR gobiernan la arquitectura.
* El codigo implementa decisiones; no las redefine.
* Microcirugias unicamente.
* No redisenar el ADN visual.
* Evitar deuda tecnica.
* Priorizar credibilidad demostrativa sobre complejidad visual.

---

## Bloque 3 - Estado Operativo

Informacion cambiante de la sesion.

Incluye:

* repositorio;
* rama;
* ultimo commit;
* estado Git;
* validaciones;
* trabajo realizado;
* proximo objetivo;
* documento de transicion recien generado;
* instrucciones iniciales para PowerShell.

---

# Relacion con la Base de Conocimiento

Antes de iniciar nuevos desarrollos, el contexto del chat debe recordar que la Base de Conocimiento constituye la referencia metodologica principal.

Cuando exista una decision documentada, el desarrollo debera alinearse con ella.

Cuando no exista, podra proponerse una nueva especificacion para futura incorporacion.

---

# Beneficios esperados

* Reducir perdida de contexto entre conversaciones.
* Disminuir reinterpretaciones innecesarias.
* Mantener coherencia metodologica.
* Facilitar proyectos de larga duracion.
* Separar claramente conocimiento, arquitectura y codigo.

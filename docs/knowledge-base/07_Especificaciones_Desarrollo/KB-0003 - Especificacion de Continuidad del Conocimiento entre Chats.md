# KB-0003 – Especificación de Continuidad del Conocimiento entre Chats

## Estado

Especificación para desarrollo posterior.

No constituye todavía un estándar definitivo.

---

# Objetivo

Garantizar que la continuidad metodológica del proyecto no dependa de la memoria del modelo ni del historial visible de un chat determinado.

Cada nuevo chat debe comenzar con suficiente contexto para preservar no solo el estado técnico del proyecto, sino también su identidad, sus principios rectores y su modelo de trabajo.

---

# Problema identificado

Hasta ahora los resúmenes de apertura contienen correctamente:

* repositorio;
* rama;
* último commit;
* estado Git;
* tareas pendientes.

Sin embargo, esos resúmenes no preservan el conocimiento metodológico acumulado durante el proyecto.

Como consecuencia, al abrir un nuevo chat pueden perderse decisiones estratégicas, criterios de diseño, principios de gobernanza y formas de trabajo ya consolidadas.

---

# Principio rector

La continuidad del proyecto debe depender de la Base de Conocimiento y no exclusivamente de la memoria del modelo.

---

# Estructura recomendada para cada nuevo chat

Todo contexto de apertura deberá dividirse en tres bloques.

## Bloque 1 — Identidad del Proyecto

Información estable que cambia muy raramente.

Debe responder preguntas como:

* ¿Qué es H-OperIA?
* ¿Qué es el Centro Demo?
* ¿Qué papel cumple Marta?
* ¿Qué papel cumple H-OperIA Intelligence?
* ¿Cuál es el objetivo comercial del ecosistema?

---

## Bloque 2 — Principios Rectores

Conjunto de reglas metodológicas que gobiernan todas las decisiones.

Ejemplos:

* La Base de Conocimiento es la fuente de verdad metodológica.
* Los ADR gobiernan la arquitectura.
* El código implementa decisiones; no las redefine.
* Microcirugías únicamente.
* No rediseñar el ADN visual.
* Evitar deuda técnica.
* Priorizar credibilidad demostrativa sobre complejidad visual.

---

## Bloque 3 — Estado Operativo

Información cambiante de la sesión.

Incluye:

* repositorio;
* rama;
* último commit;
* estado Git;
* validaciones;
* trabajo realizado;
* próximo objetivo;
* instrucciones iniciales para PowerShell.

---

# Relación con la Base de Conocimiento

Antes de iniciar nuevos desarrollos, el contexto del chat debe recordar que la Base de Conocimiento constituye la referencia metodológica principal.

Cuando exista una decisión documentada, el desarrollo deberá alinearse con ella.

Cuando no exista, podrá proponerse una nueva especificación para futura incorporación.

---

# Beneficios esperados

* Reducir pérdida de contexto entre conversaciones.
* Disminuir reinterpretaciones innecesarias.
* Mantener coherencia metodológica.
* Facilitar proyectos de larga duración.
* Separar claramente conocimiento, arquitectura y código.

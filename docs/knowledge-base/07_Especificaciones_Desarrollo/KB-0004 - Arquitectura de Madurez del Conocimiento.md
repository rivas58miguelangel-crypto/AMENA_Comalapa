# KB-0004 - Arquitectura de Madurez del Conocimiento

## Pregunta que responde

Como madura un elemento de conocimiento dentro de H-OperIA?

---

# Estado

Modelo conceptual inicial.

Este documento explica los niveles de madurez del conocimiento. No registra tareas concretas, prioridades de ejecucion ni compromisos operativos.

---

# Objetivo

Definir una escala comun para clasificar ideas, iniciativas, especificaciones, planes, implementaciones y conocimiento consolidado.

La escala evita dos errores:

* tratar una idea temprana como si ya fuera una especificacion aprobada;
* perder conocimiento importante solo porque todavia no tiene documento propio.

---

# Horizontes del conocimiento

El sistema distingue dos horizontes.

## Centro Demo

Laboratorio inmediato donde se prueban flujos, narrativa operativa, integraciones, interfaces y decisiones metodologicas.

## H-OperIA

Producto futuro, escalable, comercial y organizacional.

Los aprendizajes del Centro Demo pueden madurar hacia H-OperIA cuando esten validados y documentados.

---

# Niveles de madurez

## Idea

Tema mencionado, posible necesidad, oportunidad o direccion futura.

No tiene todavia alcance suficiente para especificacion formal.

## Iniciativa

Idea con intencion clara de exploracion o ejecucion.

Tiene motivacion identificable, pero aun requiere definicion.

## Especificacion

Tema descrito con suficiente detalle para orientar decisiones, desarrollo o validacion.

Debe contar con documento asociado o referencia documental clara.

## Planificado

Trabajo definido y ordenado para ejecucion.

Debe tener proxima accion clara, dependencias identificadas cuando apliquen y criterio minimo de cierre.

## Desarrollo

Trabajo en construccion activa.

Puede incluir implementacion, documentacion, integracion, pruebas o preparacion de datos.

## Implementado

Trabajo ya incorporado al repositorio, sistema o documentacion operativa.

Requiere validacion antes de considerarse estable.

## Validado

Trabajo revisado y confirmado contra el objetivo esperado.

Puede pasar a conocimiento consolidado si tambien queda documentado y trazable.

## Conocimiento consolidado

Decision, regla, especificacion o aprendizaje estable.

Debe estar documentado, versionado y disponible para consultas futuras.

---

# Criterios de transicion

## Idea a Iniciativa

Una idea pasa a iniciativa cuando existe intencion explicita de explorarla, priorizarla o convertirla en accion futura.

Evidencia minima:

* necesidad, oportunidad o problema identificado;
* horizonte tentativo;
* responsable o siguiente accion probable.

## Iniciativa a Especificacion

Una iniciativa pasa a especificacion cuando su alcance puede describirse con suficiente claridad para orientar decisiones.

Evidencia minima:

* objetivo definido;
* limites iniciales;
* relaciones con documentos o modulos existentes;
* dudas abiertas registradas.

## Especificacion a Planificado

Una especificacion pasa a planificado cuando existe una secuencia de trabajo ejecutable.

Evidencia minima:

* proxima accion concreta;
* dependencias identificadas;
* criterio de cierre;
* prioridad estimada.

## Planificado a Desarrollo

Un elemento planificado pasa a desarrollo cuando se inicia trabajo activo.

Evidencia minima:

* tarea en ejecucion;
* alcance inmediato confirmado;
* restricciones operativas conocidas.

## Desarrollo a Implementado

Un elemento pasa a implementado cuando el cambio queda incorporado al repositorio, sistema o documentacion operativa.

Evidencia minima:

* artefacto creado o modificado;
* ubicacion verificable;
* estado listo para revision.

## Implementado a Validado

Un elemento implementado pasa a validado cuando se confirma que cumple el objetivo esperado.

Evidencia minima:

* revision realizada;
* pruebas, lectura o comprobacion segun aplique;
* ausencia de bloqueadores conocidos.

## Validado a Conocimiento consolidado

Un elemento validado pasa a conocimiento consolidado cuando queda documentado como referencia estable.

Evidencia minima:

* documento fuente actualizado;
* trazabilidad clara;
* regla, decision o aprendizaje disponible para nuevos chats.

---

# Base de Conocimiento como modulo futuro

H-OperIA podra tener una pagina o modulo llamado Base de Conocimiento.

Ese modulo podra gestionar:

* ideas;
* documentos;
* compromisos;
* auditorias de sesion;
* planes vivos;
* continuidad organizacional.

El objetivo del modulo no sera solo almacenar archivos, sino mantener trazabilidad entre decisiones, avances, dudas y siguientes acciones.

---

# Regla conceptual

No todo pendiente requiere documento propio.

Si un tema es una idea sin desarrollo, debe registrarse como idea.

Si un tema ya tiene documento parcial, debe vincularse por ID documental.

Si un tema madura hacia especificacion, plan o conocimiento consolidado, debe evaluarse si necesita documento propio.

---

# Resultado esperado

La arquitectura de madurez debe permitir que el conocimiento avance de forma gradual, sin inflarlo artificialmente y sin perder contexto.

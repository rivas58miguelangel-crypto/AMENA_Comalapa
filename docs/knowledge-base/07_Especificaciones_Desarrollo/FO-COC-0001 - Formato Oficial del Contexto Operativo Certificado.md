# FO-COC-0001 – Formato Oficial del Contexto Operativo Certificado

## Proposito

Definir el procedimiento operativo obligatorio de inicio de cada chat y el formato minimo del Contexto Operativo Certificado.

El Contexto Operativo Certificado convierte la reconstruccion documental en un entregable operativo certificado, accionable, completo y auditable.

Su objetivo es permitir que cualquier asistente, equipo o sesion posterior pueda continuar exactamente en el punto en que quedo el proyecto, sin reconstruir parcialmente el contexto ni reinterpretar decisiones ya cerradas.

---

## Alcance

FO-COC-0001 no sustituye:

* Base de Conocimiento;
* Documento de Transicion;
* Estado Operativo del Proyecto;
* Plan de Trabajo.

Su unica finalidad es entregar de forma certificada el resultado de la reconstruccion documental para que pueda convertirse en continuidad operativa accionable.

---

## Relacion con KB-0003

KB-0003 gobierna el procedimiento de continuidad.

FO-COC-0001 gobierna la ejecucion operativa de inicio de cada chat y el artefacto de salida.

KB-0003 define la metodologia de Continuidad Certificada y la Reconstruccion Certificada del Estado Intelectual del Proyecto.

FO-COC-0001 define el orden obligatorio de ejecucion, las verificaciones, las certificaciones que deben emitirse y la condicion para iniciar modificaciones.

La distribucion de responsabilidades es:

* KB-0003 explica objetivos, principios, fases, criterios, validaciones e integridad arquitectonica.
* FO-COC-0001 funciona como checklist operativo para ejecutar la apertura certificada de cada chat.

---

## Principio rector

La reconstruccion puede estar correctamente ejecutada, pero si el artefacto final entregado es incompleto, la continuidad sigue siendo parcial.

La salida del procedimiento no debe limitarse a un resumen narrativo. Debe funcionar como una interfaz operativa certificada entre la Base de Conocimiento y la siguiente intervencion tecnica, documental o funcional.

---

## Uso obligatorio

El Contexto Operativo Certificado debe emitirse despues de:

* Reconstruccion Certificada del Estado Intelectual del Proyecto;
* Auditoria de Reconstruccion;
* Semaforo de Continuidad;
* Estado Operativo del Proyecto;

Y antes de cualquier Plan de Trabajo o microcirugia.

No debe emitirse antes de verificar los repositorios aplicables ni antes de identificar limitaciones, cambios locales, validaciones pendientes o contradicciones documentales.

Ningun chat debe iniciar analisis, propuesta, diseno, modificacion documental, modificacion tecnica o desarrollo funcional sin completar este procedimiento.

---

## Checklist operativo de inicio de chat

Este checklist debe ejecutarse en el orden indicado.

### Paso 1 - Verificacion operativa

Verificar el repositorio rector y, cuando aplique, cada repositorio operativo relacionado.

Debe confirmarse explicitamente:

* rama activa;
* HEAD;
* HEAD == origin;
* working tree limpio o cambios locales identificados y autorizados.

Comandos minimos sugeridos:

```text
git status
git branch --show-current
git log --oneline --decorate -3
```

Si el repositorio no esta alineado, si existen cambios locales no autorizados o si no puede verificarse `HEAD == origin`, el Semaforo de Continuidad no puede ser verde.

### Paso 2 - Reconstruccion documental

Reconstruir contexto utilizando exclusivamente la Base de Conocimiento del repositorio rector.

Como minimo revisar:

Documentos rectores:

* IME-0001;
* GOV-0001;
* GOV-0002.

Continuidad:

* KB-0003;
* FO-COC-0001.

Arquitectura:

* `architecture-decisions.md`;
* PD-0001;
* VAPI-0001.

Transicion:

* el documento de transicion mas reciente disponible.

Debe declararse que documentos fueron revisados y si existen contradicciones, omisiones o limitaciones.

### Paso 3 - Reconstruccion arquitectonica

Verificar coherencia con la arquitectura vigente.

Como minimo revisar:

Serie SUPABASE:

* SUPABASE-0001;
* SUPABASE-0002;
* SUPABASE-0003.

Serie ACO:

* ACO-0001;
* ACO-0002;
* ACO-0003;
* ACO-0004.

Debe declararse explicitamente que estas series constituyen actualmente la base conceptual de:

* la Arquitectura del Conocimiento Operacional;
* el futuro modelo logico de persistencia;
* la arquitectura de Supabase.

Antes de proponer nuevo desarrollo debe validarse coherencia con:

* principios arquitectonicos vigentes;
* serie ACO;
* serie SUPABASE;
* decisiones arquitectonicas certificadas.

### Paso 4 - Reconstruccion del Estado Intelectual del Proyecto

Reconstruir explicitamente:

* objetivo estrategico vigente;
* estado operativo de cada repositorio aplicable;
* decisiones arquitectonicas vigentes;
* principios rectores;
* conocimiento consolidado;
* trabajo concluido en el chat anterior;
* trabajo pendiente;
* riesgos conocidos;
* prioridades.

Este paso debe permitir continuar el proyecto desde su estado intelectual completo, no solo desde la ultima tarea visible.

### Paso 5 - Certificaciones obligatorias

Antes de cualquier modificacion deben emitirse, en este orden:

1. Auditoria de Reconstruccion.
2. Semaforo de Continuidad.
3. Estado Operativo del Proyecto.
4. Contexto Operativo Certificado.
5. Plan de Trabajo.

Si cualquiera de estas certificaciones queda incompleta, el chat no debe iniciar modificaciones.

---

## Auditoria de Reconstruccion

La Auditoria de Reconstruccion debe indicar:

* fuentes oficiales revisadas;
* repositorios verificados;
* documento de transicion revisado;
* series arquitectonicas revisadas;
* contradicciones detectadas;
* omisiones o limitaciones;
* discrepancias entre documentacion y conversacion saliente, si aplica.

La auditoria no aprueba por si sola el inicio de trabajo. Alimenta el Semaforo de Continuidad.

---

## Semaforo de Continuidad

El Semaforo de Continuidad debe declarar:

* repositorio rector verificado;
* rama activa;
* HEAD;
* HEAD == origin;
* working tree;
* repositorios operativos verificados, cuando aplique;
* documentos revisados;
* validaciones ejecutadas;
* bloqueadores;
* resultado general: verde, amarillo o rojo.

Resultado:

* Verde: reconstruccion completa, repositorios alineados, sin bloqueadores y condiciones suficientes para planificar o modificar.
* Amarillo: reconstruccion suficiente, pero existen cambios locales, validaciones pendientes, advertencias o decisiones que requieren confirmacion antes de modificar.
* Rojo: no se pudo reconstruir contexto, existe divergencia no resuelta, conflicto Git, contradiccion critica o riesgo de perdida de trabajo.

---

## Estado Operativo del Proyecto

El Estado Operativo del Proyecto debe sintetizar:

* objetivo estrategico;
* estado operativo de cada repositorio;
* intervencion activa;
* trabajo concluido;
* trabajo pendiente;
* decisiones arquitectonicas vigentes;
* restricciones;
* riesgos;
* prioridades;
* siguiente recomendacion operativa.

No debe sustituir al Contexto Operativo Certificado. Es la fotografia vigente que alimenta el artefacto final.

---

## Estructura obligatoria del Contexto Operativo Certificado

Debe incluir como minimo:

1. Semaforo de Continuidad.
2. Repositorio rector:
   * rama;
   * HEAD;
   * HEAD == origin;
   * working tree.
3. Repositorio operativo:
   * ruta;
   * rama;
   * HEAD;
   * HEAD == origin;
   * working tree.
4. Validaciones ejecutadas:
   * lint;
   * build;
   * pruebas visuales;
   * limitaciones.
5. Documentos revisados.
6. Fuentes oficiales utilizadas.
7. Objetivo estrategico vigente.
8. Intervencion activa.
9. Ultimo punto validado.
10. Trabajo ya en curso.
11. Proxima microcirugia recomendada.
12. Decisiones cerradas que no deben reabrirse salvo evidencia nueva.
13. Elementos no aprobados o pendientes de validacion.
14. Restricciones operativas.
15. Riesgos.
16. Pendientes activos.
17. Pendientes en espera.
18. Pendientes en revision.
19. Archivos probablemente involucrados.
20. Estado exacto de cambios locales.
21. Punto exacto de reanudacion.
22. Decision inmediata requerida del usuario.

---

## Reglas de calidad

El Contexto Operativo Certificado debe cumplir las siguientes reglas:

* No debe inventar informacion.
* No debe resolver contradicciones por inferencia.
* Debe separar hechos verificados, inferencias y decisiones pendientes.
* Debe senalar contradicciones documentales.
* Debe indicar que informacion proviene de fuentes oficiales y cual proviene del contraste con la conversacion saliente.
* Debe evitar resumenes narrativos insuficientes.
* Debe permitir que otro asistente continue exactamente donde quedo el proyecto.

Cuando exista duda, el formato debe conservar la duda como restriccion, riesgo, pendiente de validacion o contradiccion documental. No debe convertirla en hecho operativo.

---

## Decisiones cerradas

Este bloque debe listar decisiones ya aprobadas que no deben reabrirse salvo evidencia nueva.

Ejemplos:

* Marta es un unico agente multicanal.
* Existe un unico expediente.
* El canal no modifica el expediente.
* La IA no vende, no negocia, no promete y no asume compromisos.
* WhatsApp consolidado ocurre al final del recorrido.

Las decisiones cerradas deben provenir de documentos oficiales, documentos de transicion, planes aprobados, commits o instrucciones explicitas del usuario.

---

## Punto exacto de reanudacion

Debe declarar explicitamente:

* microcirugia activa;
* archivo o modulo probable;
* estado actual;
* siguiente accion;
* elementos que no deben reabrirse.

El punto exacto de reanudacion debe redactarse de manera accionable. Debe permitir iniciar la siguiente intervencion sin repetir reconstrucciones parciales, sin reabrir decisiones ya cerradas y sin perder trabajo en curso.

---

## Riesgos del formato

Este formato tambien tiene riesgos que deben reconocerse:

* si el formato se llena con inferencias, puede generar falsa certeza;
* si se vuelve demasiado largo, puede ser burocratico;
* si duplica documentos vivos, puede generar mantenimiento redundante.

Para reducir esos riesgos, el Contexto Operativo Certificado debe ser preciso, verificable y orientado a continuidad operativa. No debe intentar reemplazar a la Base de Conocimiento, al Documento de Transicion, al IME ni a los planes de trabajo vigentes.

---

## Criterio de cierre

FO-COC-0001 se considera cumplido solo si el lector puede responder sin ambiguedad:

* Estamos autorizados tecnicamente para continuar?
* Que estaba exactamente en curso?
* Que ya fue aprobado?
* Que falta validar?
* Cual es la proxima microcirugia?
* Que decision necesita el usuario?

Si el lector no puede responder esas preguntas, el Contexto Operativo Certificado esta incompleto y debe corregirse antes de iniciar el Plan de Trabajo o cualquier microcirugia.

---

## Principio de reproducibilidad

Dos asistentes que apliquen correctamente KB-0003 y FO-COC-0001 sobre las mismas fuentes oficiales deberian producir un Contexto Operativo Certificado sustancialmente equivalente.

Si esto no ocurre, el procedimiento debera revisarse, porque la continuidad certificada no puede depender del estilo, memoria o interpretacion individual del asistente.


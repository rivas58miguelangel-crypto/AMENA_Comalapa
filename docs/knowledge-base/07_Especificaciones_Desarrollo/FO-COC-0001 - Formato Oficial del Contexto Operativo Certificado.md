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

La Base de Conocimiento y Git son las fuentes oficiales de la reconstruccion certificada. El Documento de Transicion es una fuente auxiliar de continuidad entre sesiones: complementa el contexto operativo, pero no sustituye la Base de Conocimiento, los documentos rectores, el IME ni el estado Git certificado.

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

Si el Documento de Transicion esta ausente, nominalmente desfasado o desactualizado, debe registrarse como observacion documental o pendiente de regularizacion cuando:

* Git esta certificado y sincronizado;
* la Base de Conocimiento fue reconstruida integramente;
* los documentos rectores fueron leidos;
* no existen contradicciones sustantivas;
* no existen decisiones posteriores que dependan exclusivamente del documento de transicion ausente o desfasado.

En esas condiciones, el desfase no degrada por si solo el Semaforo de Continuidad.

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

### Paso 3A - Certificacion de Autoridades Rectoras Aplicables

Este paso es obligatorio antes de iniciar cualquier auditoria, propuesta o modificacion dentro de un dominio gobernado por una Autoridad Rectora.

Debe consultarse `ADR-002-gobernanza-de-autoridades-rectoras-suite-h-operia.md` y `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA.md`.

La certificacion debe declarar explicitamente:

* dominio intervenido;
* identificador de entrada vigente del Registro;
* Autoridad Rectora;
* evidencia concreta inspeccionada;
* implementaciones hermanas;
* aplicacion objetivo;
* excepciones autorizadas;
* declaracion expresa de que las decisiones derivaran de la Autoridad Rectora aplicable.

La ausencia, ambiguedad, contradiccion o falta de certificacion de una Autoridad Rectora aplicable bloquea toda auditoria, propuesta o modificacion dentro del dominio afectado.

La Auditoria de Reconstruccion debe indicar las Autoridades Rectoras aplicables y las entradas del Registro consultadas. El Semaforo de Continuidad debe declarar su estado de certificacion y tratar una deficiencia como bloqueo del dominio afectado. El Contexto Operativo Certificado debe incluir la certificacion, las excepciones, las restricciones y la referencia al identificador de entrada en Decisiones Cerradas y Punto de Reanudacion cuando aplique.

FO-COC-0001 certifica y aplica Autoridades Rectoras ya aprobadas. No las inventa, no las crea ni las redefine. Para evitar duplicidad, debe referenciar el identificador y la evidencia de la entrada vigente del Registro, sin replicar su contenido normativo completo.

### Regla de Validez del Entregable para Dominios Gobernados

Todo entregable que pertenezca a un dominio gobernado por una Autoridad Rectora debe iniciar con un bloque visible denominado `CERTIFICACION DE AUTORIDAD RECTORA`.

Esta regla verifica que el entregable aplico la entrada vigente de REG-0001 antes de auditar, diagnosticar, proponer, planificar, validar, cerrar, transicionar o modificar el dominio gobernado.

Si el bloque falta, el entregable es NO VALIDO conforme a FO-COC-0001.

Si el bloque esta incompleto, es ambiguo o contradice REG-0001, el entregable es NO VALIDO conforme a FO-COC-0001.

Un entregable NO VALIDO no puede autorizar auditoria, autorizar propuesta, autorizar modificacion, justificar commit, justificar push ni servir como base de continuidad.

Un entregable NO VALIDO no podra utilizarse como fundamento para instrucciones operativas, decisiones tecnicas, documentacion de continuidad, aprobaciones humanas ni ejecucion de cambios posteriores hasta recuperar su validez conforme a FO-COC-0001.

La validez no puede presumirse por contexto conversacional, memoria del asistente, conocimiento previo ni proximidad documental. La certificacion debe aparecer de forma visible al inicio del entregable.

Esta regla es obligatoria para auditorias, diagnosticos, propuestas, planes, microcirugias, validaciones, cierres y transiciones cuando involucren un dominio gobernado.

FO-COC-0001 verifica y aplica Autoridades Rectoras existentes. No crea, redefine ni sustituye autoridades. La autoridad vigente se consulta en REG-0001 y debe mantener trazabilidad hacia la decision arquitectonica aprobada correspondiente.

#### Plantilla obligatoria

```text
## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio:** [dominio gobernado]
* **Entrada vigente de REG-0001:** [identificador]
* **Autoridad Rectora:** [entidad aprobada]
* **Tipo de autoridad:** [tipo declarado en REG-0001]
* **Repositorio, documento o artefacto inspeccionado:** [ruta/evidencia]
* **Rama, commit o version certificada:** [rama + commit/version, cuando corresponda]
* **Implementaciones hermanas o derivadas:** [lista o "No aplica"]
* **Aplicacion o artefacto objetivo:** [objetivo del entregable]
* **Excepciones autorizadas:** [excepciones vigentes o "Ninguna"]
* **Declaracion expresa de derivacion:** Este entregable deriva sus criterios del registro vigente indicado y no redefine la Autoridad Rectora.
* **Resultado de la regla de bloqueo:** [VALIDO / NO VALIDO]
* **Nombre y fecha del entregable:** [nombre] - [AAAA-MM-DD]
```

La plantilla no debe replicar el contenido normativo completo de REG-0001. Debe citar el identificador vigente, la evidencia inspeccionada y la declaracion de derivacion suficiente para hacer verificable el entregable.

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
* Autoridades Rectoras aplicables y entradas del Registro consultadas, cuando corresponda;
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
* estado de certificacion de Autoridades Rectoras aplicables, cuando corresponda;
* bloqueadores;
* resultado general: verde, amarillo o rojo.

Resultado:

* Verde: reconstruccion completa, repositorios alineados, sin bloqueadores y condiciones suficientes para planificar o modificar.
* Amarillo: reconstruccion suficiente, pero existen cambios locales, validaciones pendientes, advertencias o decisiones que requieren confirmacion antes de modificar.
* Rojo: no se pudo reconstruir contexto, existe divergencia no resuelta, conflicto Git, contradiccion critica, riesgo de perdida de trabajo o falta de certificacion de una Autoridad Rectora aplicable para el dominio intervenido.

La ausencia, desfase nominal o desactualizacion del Documento de Transicion no degrada por si sola el resultado del Semaforo cuando las fuentes oficiales fueron reconstruidas, Git esta certificado y no existen decisiones posteriores dependientes exclusivamente de ese documento. En ese caso debe declararse como observacion documental o pendiente de regularizacion.

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
7. Autoridades Rectoras Aplicables, cuando corresponda:
   * dominio;
   * identificador de entrada;
   * Autoridad Rectora;
   * evidencia inspeccionada;
   * implementaciones hermanas;
   * aplicacion objetivo;
   * excepciones autorizadas;
   * estado de certificacion y declaracion de derivacion.
8. Objetivo estrategico vigente.
9. Intervencion activa.
10. Ultimo punto validado.
11. Trabajo ya en curso.
12. Proxima microcirugia recomendada.
13. Decisiones cerradas que no deben reabrirse salvo evidencia nueva.
14. Elementos no aprobados o pendientes de validacion.
15. Restricciones operativas.
16. Riesgos.
17. Pendientes activos.
18. Pendientes en espera.
19. Pendientes en revision.
20. Archivos probablemente involucrados.
21. Estado exacto de cambios locales.
22. Punto exacto de reanudacion.
23. Decision inmediata requerida del usuario.
24. Entrega Consolidada de Instrucciones para Codex, cuando la siguiente accion natural sea una intervencion ejecutable en Codex.

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
* Autoridad Rectora aplicable y estado de certificacion, cuando corresponda.

El punto exacto de reanudacion debe redactarse de manera accionable. Debe permitir iniciar la siguiente intervencion sin repetir reconstrucciones parciales, sin reabrir decisiones ya cerradas y sin perder trabajo en curso.

---

## Entrega Consolidada de Instrucciones para Codex

Cuando el resultado logico del analisis, auditoria, revision, diseno o decision arquitectonica conduzca naturalmente a una intervencion de Codex, la respuesta debe cerrar con una seccion denominada:

```text
Entrega Consolidada de Instrucciones para Codex
```

Esta seccion no debe emitirse si el siguiente paso logico es continuar el analisis, debatir alternativas, tomar una decision arquitectonica, revisar resultados o solicitar aclaraciones.

Cuando corresponda emitirla, debe cumplir todos estos criterios:

* constituir una unica version consolidada;
* incorporar todas las observaciones, conclusiones y mejoras detectadas durante el analisis;
* no dejar modificaciones pendientes para mensajes posteriores;
* no finalizar con recomendaciones que alteren la propia instruccion;
* estar lista para copiar y ejecutar inmediatamente;
* entregarse dentro de un unico bloque de codigo para facilitar la copia integra mediante el boton Copiar de ChatGPT;
* representar la version definitiva de trabajo para Codex.

Si durante su elaboracion surge una mejora metodologica o arquitectonica relevante, esa mejora debe incorporarse directamente antes de entregar la version final y no como observacion posterior.

Esta entrega constituye el puente formal entre el cierre del analisis y la ejecucion de la siguiente microcirugia en Codex.

---

## Estandar operativo de instrucciones ejecutables

Toda recomendacion operativa debe finalizar con la instruccion completa correspondiente, lista para ejecutar.

Cuando una recomendacion implique Codex, Git, PowerShell u otra herramienta operativa, el recurso ejecutable debe entregarse en el mismo mensaje. No debe requerir una solicitud adicional del usuario para obtener la instruccion final, salvo que falte una decision humana necesaria para definir el alcance.

Las explicaciones, contexto, advertencias o justificaciones deben preceder a las instrucciones. El mensaje debe finalizar con el recurso ejecutable correspondiente.

### Instrucciones para Codex

Las instrucciones dirigidas a Codex deben:

* estar claramente identificadas como "Instrucción para Codex";
* entregarse dentro de un bloque de codigo;
* estar listas para copiarse y ejecutarse sin ajustes posteriores;
* contener la version completa, consolidada y definitiva de la intervencion solicitada.

Formato obligatorio:

```text
Instrucción para Codex

[Instruccion completa lista para copiar y ejecutar]
```

### Instrucciones para PowerShell

Las instrucciones para PowerShell deben:

* contener unicamente los comandos necesarios;
* entregarse dentro de un bloque de codigo independiente;
* estar listas para copiarse y ejecutarse sin modificaciones;
* evitar explicaciones dentro del bloque de codigo.

Formato obligatorio:

```powershell
[comandos necesarios]
```

### Vigencia del estandar

Este estandar forma parte de la continuidad operativa entre chats.

Debe mantenerse durante todas las sesiones futuras salvo que una decision de gobernanza posterior lo sustituya expresamente.

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
* Si corresponde una intervencion de Codex, la Entrega Consolidada de Instrucciones para Codex esta lista para copiarse y ejecutarse sin ajustes posteriores?

Si el lector no puede responder esas preguntas, el Contexto Operativo Certificado esta incompleto y debe corregirse antes de iniciar el Plan de Trabajo o cualquier microcirugia.

---

## Principio de reproducibilidad

Dos asistentes que apliquen correctamente KB-0003 y FO-COC-0001 sobre las mismas fuentes oficiales deberian producir un Contexto Operativo Certificado sustancialmente equivalente.

Si esto no ocurre, el procedimiento debera revisarse, porque la continuidad certificada no puede depender del estilo, memoria o interpretacion individual del asistente.


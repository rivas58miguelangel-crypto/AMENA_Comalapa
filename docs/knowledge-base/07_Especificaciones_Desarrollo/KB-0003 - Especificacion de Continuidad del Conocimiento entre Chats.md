# KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats

## Estado

Especificacion para desarrollo posterior.

No constituye todavia un estandar definitivo.

---

# Objetivo

Garantizar que la continuidad metodologica del proyecto no dependa de la memoria del modelo ni del historial visible de un chat determinado.

Cada nuevo chat debe comenzar con suficiente contexto para preservar no solo el estado tecnico del proyecto, sino tambien su identidad, sus principios rectores y su modelo de trabajo.

La Continuidad Certificada se obtiene mediante una Reconstruccion Certificada del Estado Intelectual del Proyecto.

Ambos conceptos deben mantenerse diferenciados:

* Continuidad Certificada: objetivo de gobernanza que asegura continuidad, trazabilidad y capacidad de evolucion sin perdida de conocimiento.
* Reconstruccion Certificada: procedimiento obligatorio que permite alcanzar esa continuidad antes de cualquier analisis, propuesta, diseno, modificacion o desarrollo.

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

La Base de Conocimiento y Git constituyen las fuentes rectoras de la Reconstruccion Certificada. La Base de Conocimiento conserva el contenido metodologico, arquitectonico, operativo e intelectual del proyecto. Git conserva la version oficial, auditable y sincronizable de ese conocimiento.

Un resumen de apertura ayuda a orientar el arranque, pero no reemplaza la lectura de los documentos fuente. El resumen puede seleccionar, comprimir u omitir partes del recorrido intelectual que explican por que una decision existe.

La memoria conversacional tampoco es fuente de verdad. Puede servir como contexto inmediato, pero no debe tratarse como repositorio estable, versionado ni auditable.

Por eso la continuidad debe conservar:

* la conclusion alcanzada;
* el razonamiento que llevo a esa conclusion;
* las alternativas descartadas cuando sean relevantes;
* las advertencias y restricciones que condicionan la decision;
* los documentos donde el aprendizaje debe quedar consolidado.

La transicion entre chats debe preparar la apertura efectiva del siguiente chat. La continuidad no depende de cerrar una conversacion, sino de convertir el recorrido del chat inmediatamente anterior en conocimiento consultable, trazable y accionable cuando se abre un nuevo chat del mismo proyecto.

El Documento de Transicion es una fuente auxiliar de continuidad entre sesiones. Complementa la Base de Conocimiento, el IME, los documentos rectores y el estado Git certificado, pero no los sustituye ni puede prevalecer sobre ellos.

---

# Ubicacion rectora de la Base de Conocimiento

La Base de Conocimiento oficial de H-OperIA reside actualmente en:

`C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base`

Esta ubicacion aplica como fuente rectora para todos los repositorios del ecosistema H-OperIA, independientemente de si el desarrollo operativo se realiza en Reservas, Admin, Vendedoras, Mensajeria, Demo API u otro repositorio relacionado.

No se debe buscar la Base de Conocimiento dentro del repositorio de trabajo salvo que ese repositorio sea AMENA_Comalapa. Primero se reconstruye contexto desde AMENA_Comalapa y solo despues se cambia al repositorio operativo correspondiente.

La eventual migracion de la Base de Conocimiento a una carpeta o repositorio independiente debera realizarse solo mediante una microcirugia documental/tecnica especifica, garantizando versionamiento Git, trazabilidad historica y actualizacion de todas las rutas de referencia.

---

# Prerrequisito para proyectos nuevos

Si el chat pertenece a un proyecto nuevo o recien creado, primero debe verificarse que GOV-0002 haya sido aplicado.

La Transicion entre Chats opera plenamente unicamente sobre Proyectos Operativamente Inicializados (POI).

Si el Bootstrap Metodologico no esta completo y el proyecto aun no alcanza estado POI, el chat debe priorizar completar GOV-0002 antes de continuar cualquier desarrollo funcional.

---

# Fase de Cierre del Chat (Obligatoria)

Cuando un chat operativo va a finalizar su intervencion y entregar instrucciones para abrir o continuar en un nuevo chat, debe ejecutar una fase de cierre antes de emitir dichas instrucciones.

Esta fase no reemplaza el modelo general de transicion entre chats ni modifica el principio de que un chat puede permanecer abierto indefinidamente. Define una obligacion adicional para los casos en que el cierre operativo si es identificado o solicitado.

El chat que termina debe:

* escanear completamente la conversacion, no solo los ultimos mensajes;
* identificar decisiones, commits, restricciones, pendientes, riesgos, documentos leidos, documentos creados, validaciones realizadas y advertencias relevantes;
* generar el Documento de Transicion correspondiente;
* almacenarlo en `docs/knowledge-base/98_Work_In_Progress`;
* verificar que el Documento de Transicion exista en esa ubicacion;
* confirmar que el documento contiene los insumos necesarios para que el siguiente chat reconstruya contexto desde la Base de Conocimiento;
* y unicamente despues entregar las instrucciones para abrir o iniciar el nuevo chat.

El Documento de Transicion debe quedar disponible antes de que el nuevo chat sea creado o usado como continuidad operativa.

---

# Ciclo conceptual de continuidad

La continuidad entre chats debe entenderse como un ciclo.

El protocolo no asume que un chat se cierra. Un chat puede permanecer abierto indefinidamente.

El evento que dispara el ciclo es la apertura de un nuevo chat del mismo proyecto.

## Fase de transicion

El nuevo chat localiza el chat inmediatamente anterior. Desde ese chat anterior se escanea la conversacion completa, se identifican decisiones, compromisos, pendientes, riesgos, hallazgos, aprendizajes y razonamientos relevantes, y se define donde debe quedar documentado cada elemento.

La transicion genera un documento de transicion en `docs/knowledge-base/98_Work_In_Progress`.

## Fase de apertura efectiva

El chat entrante verifica Git, consulta el IME, lee los documentos fuente aplicables, lee el documento de transicion recien generado, ejecuta la Auditoria de Reconstruccion, emite el Semaforo de Continuidad, reconstruye el Estado Operativo del Proyecto, emite el Contexto Operativo Certificado segun FO-COC-0001 y solamente entonces puede proponer un Plan de Trabajo, diagnostico o intervencion tecnica.

## Resultado del ciclo

El proyecto conserva continuidad porque el conocimiento no queda encerrado en una conversacion. Queda distribuido en documentos fuente, planes vivos, indices y registros de transicion que pueden ser auditados y reutilizados.

Este modelo elimina la ambiguedad de "cerrar un chat" porque la obligacion ya no depende de un cierre formal. La obligacion aparece cuando existe un nuevo chat que debe continuar el trabajo.

---

# Instrumentos obligatorios de continuidad

## Principio de continuidad certificada

La continuidad del proyecto debe depender de informacion documentada, verificable y trazable.

La reconstruccion nunca debera basarse principalmente en la memoria del asistente ni en inferencias sobre conversaciones anteriores.

La conversacion saliente unicamente podra utilizarse como mecanismo de validacion para detectar posibles omisiones de documentacion.

La continuidad operativa debe seguir este flujo general:

1. Reconstruccion Certificada del Estado Intelectual del Proyecto.
2. Auditoria de Reconstruccion.
3. Semaforo de Continuidad.
4. Estado Operativo del Proyecto.
5. Contexto Operativo Certificado segun FO-COC-0001.
6. Plan de Trabajo.
7. Microcirugias.

La reconstruccion debe completarse antes de emitir diagnosticos, recomendaciones, planes, propuestas de arquitectura, cambios documentales o cambios tecnicos.

## Reconstruccion Certificada del Estado Intelectual del Proyecto

La Reconstruccion Certificada del Estado Intelectual del Proyecto es el procedimiento obligatorio mediante el cual un chat, asistente o equipo reconstruye el contexto completo del proyecto antes de continuar su evolucion.

Su proposito no es producir un resumen narrativo. Su proposito es reconstruir de forma verificable:

* el estado operativo;
* el estado documental;
* el estado arquitectonico;
* el estado intelectual;
* las decisiones vigentes;
* las restricciones;
* los pendientes;
* los riesgos;
* las prioridades.

La reconstruccion debe utilizar exclusivamente la Base de Conocimiento del repositorio rector como fuente oficial. La memoria conversacional, el historial visible del chat o inferencias del asistente solo pueden utilizarse como contraste para detectar omisiones recientes, nunca como fuente rectora.

### Fase 1 - Verificacion Operativa

Antes de leer, diagnosticar, proponer o modificar, debe verificarse el repositorio rector y, cuando aplique, el repositorio operativo.

Como minimo debe confirmarse:

* rama activa;
* HEAD;
* HEAD == origin;
* working tree limpio o cambios locales identificados y autorizados.

Si estas condiciones no se cumplen, la continuidad no puede declararse verde. El asistente debe reportar el bloqueo, divergencia o cambio local antes de continuar.

### Fase 2 - Reconstruccion Documental

Debe reconstruirse el contexto desde la Base de Conocimiento del repositorio rector.

Como minimo deben revisarse:

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

* el documento de transicion mas reciente disponible en `docs/knowledge-base/98_Work_In_Progress`.

La reconstruccion documental debe identificar contradicciones, omisiones, documentos obsoletos, pendientes vivos y fuentes que requieran lectura adicional.

### Fase 3 - Reconstruccion Arquitectonica

Debe verificarse la coherencia de la arquitectura vigente antes de proponer o iniciar cualquier nuevo desarrollo.

Como minimo deben revisarse:

Serie SUPABASE:

* SUPABASE-0001;
* SUPABASE-0002;
* SUPABASE-0003.

Serie ACO:

* ACO-0001;
* ACO-0002;
* ACO-0003;
* ACO-0004.

Estas series constituyen actualmente la base conceptual de:

* la Arquitectura del Conocimiento Operacional;
* el futuro modelo logico de persistencia;
* la arquitectura de Supabase.

Toda propuesta futura debera ser coherente con:

* principios arquitectonicos vigentes;
* serie ACO;
* serie SUPABASE;
* decisiones arquitectonicas certificadas.

Esta validacion de integridad arquitectonica debe realizarse antes de iniciar cualquier nuevo desarrollo. Si existe tension entre una propuesta y la arquitectura certificada, debe reportarse explicitamente antes de modificar documentos, codigo, persistencia o integraciones.

### Fase 4 - Reconstruccion del Estado Intelectual del Proyecto

Debe reconstruirse explicitamente:

* objetivo estrategico vigente;
* estado operativo de cada repositorio aplicable;
* decisiones arquitectonicas vigentes;
* principios rectores;
* conocimiento consolidado;
* trabajo concluido en el chat anterior;
* trabajo pendiente;
* riesgos conocidos;
* prioridades.

Esta fase reconstruye el estado intelectual completo del proyecto antes de continuar su evolucion. No debe limitarse a tareas inmediatas ni a cambios recientes.

### Fase 5 - Certificacion

Antes de iniciar cualquier modificacion debe emitirse obligatoriamente:

* Auditoria de Reconstruccion;
* Semaforo de Continuidad;
* Estado Operativo del Proyecto;
* Contexto Operativo Certificado;
* Plan de Trabajo.

No se debe iniciar ninguna modificacion sin completar esta certificacion.

La certificacion debe separar hechos verificados, inferencias, limitaciones, contradicciones y decisiones pendientes.

## Separacion de responsabilidades

La continuidad entre chats debe distinguir cinco instrumentos complementarios. Ninguno reemplaza a los demas.

### Base de Conocimiento

La Base de Conocimiento conserva el conocimiento permanente del proyecto.

Incluye reglas, modelos, especificaciones, decisiones consolidadas, indices, protocolos, documentos vivos y registros versionados.

No describe solamente lo ultimo que ocurrio en un chat. Su funcion es preservar conocimiento estable, consultable y trazable.

### Documento de Transicion

El Documento de Transicion registra que ocurrio en el chat anterior y que debe heredarse al siguiente chat.

Debe incluir decisiones, trabajo realizado, commits, validaciones, restricciones, riesgos, pendientes, advertencias y documentos que deben consultarse al abrir la siguiente sesion.

No sustituye a la Base de Conocimiento ni al Estado Operativo del Proyecto.

La ausencia, desfase nominal o desactualizacion del Documento de Transicion no degrada por si sola la continuidad intelectual cuando se cumplen simultaneamente estas condiciones:

* Git esta certificado y sincronizado;
* la Base de Conocimiento fue reconstruida integramente;
* los documentos rectores aplicables fueron leidos;
* no existen contradicciones sustantivas entre fuentes rectoras;
* no existen decisiones posteriores que dependan exclusivamente del Documento de Transicion ausente o desfasado.

En ese caso, el desfase debe registrarse como observacion documental o pendiente de regularizacion, sin afectar por si mismo el Semaforo de Continuidad.

### Auditoria de Reconstruccion

La Auditoria de Reconstruccion forma parte obligatoria del procedimiento de continuidad antes de emitir el Semaforo de Continuidad.

Debe verificar como minimo:

* reconstruccion desde la Base de Conocimiento;
* lectura del IME;
* lectura de documentos obligatorios;
* lectura del Documento de Transicion;
* verificacion Git;
* coherencia documental;
* contraste con la conversacion saliente para detectar acuerdos relevantes que aun no hayan sido incorporados a la documentacion oficial.

La conversacion saliente nunca sustituye a la documentacion. Unicamente actua como auditoria de posibles omisiones recientes.

Si la auditoria detecta acuerdos, decisiones o pendientes relevantes no documentados, el asistente debe reportarlos como discrepancias u omisiones pendientes de documentacion. No debe tratarlos como conocimiento oficial hasta que queden incorporados en la Base de Conocimiento o documento correspondiente.

### Semaforo de Continuidad

El Semaforo de Continuidad es el diagnostico tecnico minimo que indica si es seguro comenzar diagnostico, planificacion o desarrollo.

Debe emitirse siempre despues de:

* reconstruir contexto desde la Base de Conocimiento;
* ejecutar la Auditoria de Reconstruccion;
* verificar el repositorio documental rector;
* verificar el repositorio operativo correspondiente, cuando aplique;
* ejecutar las validaciones solicitadas o requeridas para el estado inicial.

El Semaforo de Continuidad debe mostrar unicamente estados derivados de verificaciones reales. No debe contener supuestos.

Debe informar, como minimo:

* repositorio rector verificado;
* rama activa;
* HEAD;
* HEAD == origin;
* working tree;
* repositorio operativo verificado, cuando aplique;
* validaciones ejecutadas;
* bloqueadores;
* resultado general: verde, amarillo o rojo.

Criterio sugerido:

* Verde: contexto reconstruido, repositorios alineados, working tree limpio o cambios conocidos/autorizados, validaciones iniciales correctas y sin bloqueadores.
* Amarillo: contexto reconstruido, pero existen cambios locales, validaciones pendientes, advertencias o decisiones que requieren confirmacion antes de modificar.
* Rojo: no se pudo reconstruir contexto, hay divergencia no resuelta, conflicto Git, validaciones fallidas criticas o riesgo de perdida de trabajo.

El desfase nominal, ausencia o desactualizacion del Documento de Transicion no debe convertirse automaticamente en resultado amarillo o rojo si las fuentes rectoras fueron reconstruidas, Git esta certificado y no hay decisiones posteriores dependientes exclusivamente de ese documento. Debe registrarse como observacion documental o pendiente de regularizacion.

### Estado Operativo del Proyecto

El Estado Operativo del Proyecto es la fotografia vigente del proyecto, no solamente el resumen de lo ultimo que se hizo.

Debe sintetizar:

* objetivo estrategico vigente;
* lineas de trabajo activas;
* prioridades;
* cartera de pendientes vigentes;
* pendientes activos;
* pendientes en espera;
* pendientes en revision;
* decisiones arquitectonicas vigentes;
* riesgos;
* proxima recomendacion operativa.

#### Construccion del Estado Operativo

El Estado Operativo del Proyecto se construye exclusivamente utilizando las fuentes oficiales del proyecto.

Orden de precedencia:

1. Base de Conocimiento.
2. IME.
3. Documento de Transicion mas reciente.
4. Planes de trabajo vigentes.
5. Documentos rectores asociados.
6. Estado verificado de los repositorios.

Si dos fuentes entran en contradiccion, el asistente debera reportarlo explicitamente y no resolver la discrepancia mediante inferencias.

No debe inventar prioridades ni convertir pendientes ambiguos en hechos.

#### Ciclo de vida de pendientes

Cada pendiente de la cartera vigente debe encontrarse exactamente en uno de los siguientes estados:

* Activo;
* En espera;
* En revision;
* Completado;
* Archivado.

No deberan mantenerse pendientes duplicados ni contradictorios.

Cuando exista ambiguedad, el asistente debera reportar la discrepancia y proponer la actualizacion documental correspondiente antes de reclasificar el pendiente.

### Contexto Operativo Certificado

El Contexto Operativo Certificado es el formato obligatorio de salida de la reconstruccion certificada.

Debe emitirse conforme a FO-COC-0001 despues del Semaforo de Continuidad y del Estado Operativo del Proyecto, y antes de cualquier Plan de Trabajo o microcirugia.

### Plan de Trabajo

El Plan de Trabajo organiza tacticamente la ejecucion inmediata.

Debe nacer despues del Semaforo de Continuidad y del Estado Operativo del Proyecto.

Su funcion es ordenar pasos concretos, alcance, validaciones y criterios de cierre de una intervencion especifica.

No reemplaza al Estado Operativo del Proyecto ni debe redefinir decisiones arquitectonicas vigentes.

### Entrega Consolidada de Instrucciones para Codex

La Entrega Consolidada de Instrucciones para Codex es la norma que gobierna el cierre de un analisis, auditoria, revision, diseno o decision arquitectonica cuando el resultado natural del trabajo conduce a una intervencion de Codex.

Principio rector:

```text
Siempre que el resultado logico de un analisis, auditoria, revision, diseno o decision arquitectonica conduzca naturalmente a una intervencion de Codex, la respuesta debera concluir entregando directamente las instrucciones completas para Codex.
```

Esta regla aplica unicamente cuando la siguiente accion natural del flujo de trabajo sea ejecutar una intervencion en Codex.

No aplica cuando el siguiente paso logico sea:

* continuar el analisis;
* debatir alternativas;
* tomar una decision arquitectonica;
* revisar resultados;
* solicitar aclaraciones.

Cuando si corresponda una intervencion de Codex, las instrucciones deberan:

* constituir una unica version consolidada;
* incorporar todas las observaciones, conclusiones y mejoras detectadas durante el analisis;
* no dejar modificaciones pendientes para mensajes posteriores;
* no finalizar con recomendaciones que alteren la propia instruccion;
* estar listas para copiar y ejecutar inmediatamente;
* entregarse dentro de un unico bloque de codigo para facilitar la copia integra mediante el boton Copiar de ChatGPT;
* representar la version definitiva de trabajo para Codex.

Si durante la elaboracion de las instrucciones surge una mejora metodologica o arquitectonica relevante, esta debera incorporarse directamente antes de entregar la version final y nunca como una observacion posterior.

La entrega consolidada constituye el cierre natural del proceso de analisis y el puente formal entre ChatGPT y Codex.

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



# GOV-0001 - Sistema de Continuidad del Conocimiento

## Pregunta que responde

Que reglas permanentes gobiernan la continuidad del conocimiento de H-OperIA?

---

# Estado

Gobernanza inicial vigente.

Este documento define reglas generales del sistema de continuidad del conocimiento. No define protocolos operativos de equipos, comandos Git ni tareas concretas de ejecucion.

---

# Regla fuente

Git y GitHub son la fuente oficial versionada del conocimiento del proyecto.

Todo documento rector, especificacion, indice, plan vivo o registro de continuidad debe estar versionado en el repositorio.

Google Drive puede existir como respaldo, espejo o copia consultable, pero no es fuente rectora.

En caso de diferencia entre Git/GitHub y una copia externa, prevalece Git/GitHub.

---

# Ciclo de Continuidad del Conocimiento

La continuidad del conocimiento funciona como un ciclo completo, no como eventos aislados.

GOV-0001 gobierna la continuidad del conocimiento durante la vida de un Proyecto Operativamente Inicializado (POI).

GOV-0002 gobierna la inicializacion de nuevos proyectos antes de que exista continuidad operativa.

Ningun proyecto nuevo debe entrar al sistema de continuidad descrito por GOV-0001 sin haber alcanzado el estado Proyecto Operativamente Inicializado (POI) segun GOV-0002.

El protocolo no asume que un chat se cierra formalmente. Un chat puede permanecer abierto indefinidamente.

El evento que dispara el ciclo es la apertura de un nuevo chat del mismo proyecto.

A partir de ese evento se activa una transicion entre chats:

* el nuevo chat localiza el chat inmediatamente anterior;
* el chat anterior se escanea completo para preservar el recorrido, clasificar lo aprendido y generar el documento de transicion;
* el nuevo chat verifica la fuente versionada, lee los documentos indicados y recupera el contexto antes de diagnosticar, proponer o modificar.

Este modelo elimina la ambiguedad de "cerrar un chat" porque no depende de que el chat saliente termine. La obligacion nace cuando existe un nuevo chat que necesita continuar el trabajo del mismo proyecto.

Ningun conocimiento relevante debe quedar solamente en la conversacion si afecta decisiones, compromisos, pendientes, riesgos, aprendizajes, hallazgos, razonamientos o siguientes acciones del proyecto.

---

# Regla de inicio

Todo nuevo chat debe iniciar revisando el Indice Maestro de Ejecucion.

El IME indica que documentos consultar para recuperar contexto operativo, compromisos, prioridades y estado de madurez.

El asistente no debe asumir que el historial visible del chat contiene todo el conocimiento necesario.

Si un tema aparece en el IME con documento asociado, ese documento debe consultarse antes de ejecutar trabajo relacionado.

Al abrir un nuevo chat, el asistente debe:

* verificar el estado Git del repositorio;
* localizar el chat inmediatamente anterior del mismo proyecto;
* realizar el procedimiento de transicion entre chats definido en este documento;
* consultar el IME;
* leer los documentos indicados por el IME que apliquen al trabajo solicitado;
* leer el documento de transicion recien generado en `98_Work_In_Progress`;
* confirmar explicitamente que documentos fueron leidos antes de diagnosticar, proponer o modificar.

---

# Regla de transicion entre chats

La apertura de un nuevo chat del mismo proyecto obliga a realizar una transicion de conocimiento desde el chat inmediatamente anterior.

La transicion debe incluir una auditoria de decisiones, aprendizajes, compromisos, pendientes, riesgos y razonamientos relevantes.

La auditoria debe buscar compromisos explicitos e implicitos mencionados durante el chat anterior.

La transicion debe escanear toda la conversacion del chat inmediatamente anterior, no solo los ultimos mensajes.

Ese escaneo debe detectar:

* decisiones;
* compromisos;
* pendientes;
* riesgos;
* aprendizajes;
* hallazgos;
* razonamientos relevantes;
* advertencias operativas;
* documentos que debe leer el siguiente chat.

La transicion debe verificar que nada importante quede unicamente en el chat anterior.

Todo compromiso detectado debe clasificarse por:

* estado operativo;
* nivel de certeza;
* prioridad cuando corresponda;
* documento asociado cuando exista;
* proxima accion recomendada.

Cada elemento relevante debe clasificarse segun su destino documental:

* documento de transicion o plan de trabajo;
* IME;
* corpus fundacional;
* roadmap;
* GOV, KB, OPS, ADR u otro documento correspondiente.

La transicion debe generar el documento de transicion correspondiente y almacenarlo en `docs/knowledge-base/98_Work_In_Progress`.

Ese documento debe preparar el puente hacia el nuevo chat indicando estado Git, equipo usado, commits relevantes, temas tratados, decisiones, pendientes, advertencias y documentos que deben consultarse al abrir.

Una vez generado el documento de transicion, el asistente debe regresar al nuevo chat, consultar el IME, leer todos los documentos asociados aplicables, leer el documento de transicion recien generado, confirmar explicitamente que documentos fueron leidos y solamente entonces comenzar el diagnostico o el trabajo tecnico.

---

# Estado operativo

El estado operativo describe que ocurre con un tema, compromiso o decision.

Valores permitidos:

* Idea;
* Pendiente;
* En curso;
* En validacion inicial;
* Completado pendiente de validacion;
* Completado confirmado;
* Descartado explicitamente;
* Requiere verificacion.

"Requiere verificacion" es un estado operativo. Se usa cuando existe una posible obligacion, decision o pendiente, pero falta evidencia suficiente para tratarlo como hecho.

---

# Nivel de certeza

El nivel de certeza describe cuanta confianza existe sobre la existencia o interpretacion de un tema.

Valores permitidos:

* Alta;
* Media;
* Baja.

Criterios:

* Alta: compromiso expresado directamente o respaldado por documento;
* Media: compromiso inferido con soporte razonable;
* Baja: posible compromiso, pero ambiguo o incompleto.

Los compromisos dudosos deben conservarse con estado operativo "Requiere verificacion" y nivel de certeza "Baja" o "Media", segun la evidencia disponible.

---

# Regla de no eliminacion

Nada se elimina del sistema de continuidad salvo que este:

* completado confirmado; o
* descartado explicitamente.

La ausencia de avance no equivale a descarte.

Cuando exista duda, el elemento debe conservarse con estado operativo "Requiere verificacion".

---

# Relacion con documentos del sistema

El sistema separa responsabilidades documentales:

* GOV define reglas permanentes;
* GOV-0002 define el Bootstrap Metodologico obligatorio para proyectos nuevos;
* KB define modelos conceptuales;
* OPS define protocolos operativos;
* IME registra ejecucion viva;
* ADR registra decisiones arquitectonicas.

El IME no reemplaza los documentos fuente; los organiza y los referencia.

---

# Responsabilidad del asistente

El asistente debe:

* revisar el IME al iniciar trabajo nuevo;
* leer los documentos asociados aplicables antes de ejecutar trabajo relacionado;
* confirmar explicitamente los documentos leidos al abrir un nuevo chat;
* respetar Git/GitHub como fuente rectora;
* no convertir dudas en hechos;
* no eliminar compromisos ambiguos;
* realizar la transicion de conocimiento al abrir un nuevo chat del mismo proyecto;
* escanear toda la conversacion del chat inmediatamente anterior durante la transicion;
* generar el documento de transicion correspondiente en `docs/knowledge-base/98_Work_In_Progress`;
* registrar compromisos explicitos e implicitos detectados durante la sesion;
* proponer actualizaciones documentales solo cuando ayuden a preservar continuidad.

---

# Resultado esperado

El proyecto debe poder continuar entre chats sin perder decisiones, compromisos, ideas, planes vivos, documentos rectores, madurez de cada tema ni trazabilidad entre el Centro Demo y H-OperIA como producto futuro.

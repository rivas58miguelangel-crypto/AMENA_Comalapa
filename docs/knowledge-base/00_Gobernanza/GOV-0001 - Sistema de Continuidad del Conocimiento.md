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

# Regla de inicio

Todo nuevo chat debe iniciar revisando el Indice Maestro de Ejecucion.

El IME indica que documentos consultar para recuperar contexto operativo, compromisos, prioridades y estado de madurez.

El asistente no debe asumir que el historial visible del chat contiene todo el conocimiento necesario.

Si un tema aparece en el IME con documento asociado, ese documento debe consultarse antes de ejecutar trabajo relacionado.

---

# Regla de cierre

Al cerrar un chat debe hacerse una auditoria de compromisos.

El asistente debe hacer esta auditoria especialmente cuando el usuario pida instrucciones para abrir un nuevo chat.

La auditoria debe buscar compromisos explicitos e implicitos mencionados durante el chat.

Todo compromiso detectado debe clasificarse por:

* estado operativo;
* nivel de certeza;
* prioridad cuando corresponda;
* documento asociado cuando exista;
* proxima accion recomendada.

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
* KB define modelos conceptuales;
* OPS define protocolos operativos;
* IME registra ejecucion viva;
* ADR registra decisiones arquitectonicas.

El IME no reemplaza los documentos fuente; los organiza y los referencia.

---

# Responsabilidad del asistente

El asistente debe:

* revisar el IME al iniciar trabajo nuevo;
* respetar Git/GitHub como fuente rectora;
* no convertir dudas en hechos;
* no eliminar compromisos ambiguos;
* hacer auditoria de cierre cuando el usuario pida instrucciones para nuevo chat;
* registrar compromisos explicitos e implicitos detectados durante la sesion;
* proponer actualizaciones documentales solo cuando ayuden a preservar continuidad.

---

# Resultado esperado

El proyecto debe poder continuar entre chats sin perder decisiones, compromisos, ideas, planes vivos, documentos rectores, madurez de cada tema ni trazabilidad entre el Centro Demo y H-OperIA como producto futuro.

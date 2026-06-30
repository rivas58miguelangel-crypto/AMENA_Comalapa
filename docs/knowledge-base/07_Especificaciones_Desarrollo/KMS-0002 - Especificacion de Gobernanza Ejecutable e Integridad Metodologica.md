# KMS-0002 - Especificacion de Gobernanza Ejecutable e Integridad Metodologica

## Estado

Especificacion conceptual de alto nivel.

Este documento preserva descubrimientos metodologicos realizados durante AMENA 56. No modifica todavia ningun documento rector y no introduce procedimientos aprobados.

Su funcion es servir posteriormente como insumo para disenar una arquitectura definitiva de gobernanza ejecutable e integridad metodologica.

---

# Problema identificado

Durante el trabajo metodologico de AMENA 56 se hizo visible una tension critica:

* existen documentos rectores y protocolos;
* existen ciclos operativos de chats, transiciones, commits y validaciones;
* existe necesidad de continuidad estricta;
* pero el cumplimiento metodologico puede depender todavia de lectura manual, memoria conversacional o reconstruccion parcial.

Cuando un chat inicia, continua o cambia de foco, puede existir riesgo de actuar sin haber reconstruido completamente el estado metodologico vigente.

---

# Motivacion

La gobernanza de H-OperIA necesita evolucionar desde reglas documentadas hacia reglas que puedan ser verificadas, reconstruidas y aplicadas operativamente.

El objetivo futuro no es burocratizar el trabajo, sino proteger:

* continuidad;
* trazabilidad;
* foco;
* integridad documental;
* seguridad metodologica;
* coherencia entre decisiones, planes y ejecucion.

---

# Integridad metodologica

La integridad metodologica significa que cada accion relevante del proyecto debe ocurrir dentro de un estado comprensible, verificable y alineado con documentos fuente.

Implica que el agente, la persona o el equipo no deben actuar solo con una impresion general del contexto, sino con evidencia suficiente de:

* rama;
* estado Git;
* documentos rectores aplicables;
* plan vigente;
* transicion mas reciente cuando exista;
* restricciones del usuario;
* alcance autorizado;
* estado de validacion.

---

# Gobernanza ejecutable

La gobernanza ejecutable es la vision futura de convertir reglas metodologicas en controles operativos verificables.

No significa automatizar decisiones humanas ni reemplazar documentos rectores.

Significa que, en el futuro, ciertas condiciones podrian ser comprobadas antes, durante o despues de una accion:

* si el proyecto fue inicializado correctamente;
* si el chat leyo documentos requeridos;
* si el alcance autorizado coincide con los archivos modificados;
* si un commit contiene solo lo permitido;
* si una transicion fue generada;
* si un cierre deja estado limpio;
* si una microcirugia respeta sus restricciones.

Esta especificacion no define aun herramientas, scripts, hooks, bases de datos ni automatizaciones.

---

# Reconstruccion del estado metodologico

Un descubrimiento central de AMENA 56 es que el estado metodologico no puede inferirse solo desde el ultimo mensaje.

Debe poder reconstruirse desde:

* Base de Conocimiento;
* documentos rectores;
* planes vivos;
* documentos de transicion;
* historial Git;
* estado del repositorio;
* instrucciones vigentes del usuario;
* evidencias de validacion.

La reconstruccion debe diferenciar entre contexto tecnico, contexto metodologico y contexto estrategico.

---

# Estado metodologico certificado

Vision futura.

Un estado metodologico certificado seria una declaracion verificable de que el proyecto, chat o tarea se encuentra en condiciones de continuar.

Podria incluir:

* documentos leidos;
* commit base;
* rama;
* estado del arbol de trabajo;
* alcance autorizado;
* restricciones activas;
* validaciones ejecutadas;
* pendientes conocidos.

Esta idea no esta aprobada como procedimiento obligatorio. Queda preservada como concepto para evolucion posterior.

---

# Habilitacion operativa

Vision futura.

La habilitacion operativa seria la condicion que permite pasar de diagnostico a modificacion, de modificacion a commit, o de commit a push.

Podria apoyarse en evidencias como:

* autorizacion explicita;
* alcance documental o tecnico confirmado;
* estado Git conocido;
* pruebas requeridas ejecutadas;
* ausencia de cambios no autorizados;
* identificacion de archivos permitidos.

Esta especificacion no cambia el protocolo actual. Solo conserva el concepto.

---

# Evidencias de cumplimiento

La gobernanza futura debera poder registrar o verificar evidencias como:

* salida de `git status`;
* salida de validaciones;
* lista de documentos leidos;
* archivos modificados;
* archivos staged;
* hash de commit;
* resultado de push;
* confirmacion de estado limpio;
* relacion con plan, transicion o documento rector.

Estas evidencias no sustituyen juicio humano. Sirven para reducir ambiguedad.

---

# Auditoria metodologica

La auditoria metodologica futura debera responder preguntas como:

* se respeto el alcance autorizado?
* se modificaron documentos prohibidos?
* se hizo commit con archivos correctos?
* se ejecuto la validacion requerida?
* se preservo continuidad entre chats?
* se distinguio diagnostico de implementacion?
* se evito introducir reglas no aprobadas?

Esta auditoria debera apoyarse en documentos fuente y evidencias verificables.

---

# Ciclos operativos

El proyecto opera mediante ciclos recurrentes:

* diagnostico;
* autorizacion;
* microcirugia;
* validacion;
* commit;
* push;
* transicion;
* reconstruccion de contexto.

KMS-0002 no convierte esta lista en protocolo nuevo. Solo identifica un patron metodologico observado que podria informar gobernanza futura.

---

# Apertura y cierre de chats

Durante AMENA 56 se reforzo que la continuidad entre chats no debe depender de memoria conversacional.

La apertura efectiva de un chat debe poder reconstruir contexto desde la Base de Conocimiento y documentos relacionados.

El cierre o transicion debe preservar:

* decisiones;
* alcance trabajado;
* estado Git;
* validaciones;
* pendientes;
* riesgos;
* documentos leidos o generados.

Este documento no modifica el protocolo de continuidad existente. Lo toma como insumo para pensar una gobernanza mas verificable.

---

# Relacion futura con GOV-0001

GOV-0001 conserva su autoridad como documento rector cuando aplique.

KMS-0002 no lo modifica. Podria servir posteriormente para proponer mecanismos que hagan verificable su cumplimiento operativo.

---

# Relacion futura con GOV-0002

GOV-0002 conserva su autoridad sobre inicializacion metodologica de proyectos cuando aplique.

KMS-0002 no altera su contenido. Podria informar una futura capa de verificacion sobre estado de inicializacion, estado POI y condiciones de arranque.

---

# Relacion futura con KB-0003

KB-0003 define la continuidad del conocimiento entre chats.

KMS-0002 no duplica sus reglas. Preserva la idea de que esa continuidad podria tener evidencias, checks y certificaciones futuras.

---

# Relacion futura con IME

El IME conserva su funcion de indice maestro y punto de orientacion documental.

KMS-0002 no modifica su estructura. Podria servir como insumo para futuras relaciones entre indice, documentos requeridos, estado metodologico y habilitacion operativa.

---

# Relacion futura con otros documentos

Esta especificacion debera mantenerse subordinada a documentos rectores vigentes hasta que exista una decision formal distinta.

Puede relacionarse en el futuro con:

* ADR;
* OPS;
* planes vivos;
* documentos de transicion;
* especificaciones de Base de Conocimiento;
* especificaciones de agentes o automatizaciones.

---

# Vision futura

La gobernanza ejecutable podria evolucionar hacia una arquitectura donde documentos, reglas, checks, evidencias y decisiones esten conectados.

En ese horizonte, un agente podria saber:

* que documentos debe leer;
* que acciones estan autorizadas;
* que archivos puede tocar;
* que pruebas debe ejecutar;
* que evidencia debe reportar;
* que estado final debe dejar.

Esa vision debera disenar su arquitectura con cuidado para no convertir reglas vivas en automatismos rigidos.

---

# Evolucion futura

KMS-0002 puede evolucionar hacia:

* especificacion formal de gobernanza ejecutable;
* modelo de estado metodologico;
* matriz de evidencias;
* checks preoperativos;
* checks precommit;
* auditoria de transiciones;
* integracion con Codex;
* integracion con ChatGPT;
* integracion con el Sistema Corporativo de Gestion del Conocimiento.

Toda evolucion futura requerira autorizacion explicita y, cuando corresponda, modificacion formal de documentos rectores.

---

# Resultado esperado

KMS-0002 preserva el descubrimiento metodologico de AMENA 56 sin convertirlo todavia en regla obligatoria.

Su valor inmediato es evitar perdida de conocimiento y servir como base para una futura arquitectura de gobernanza ejecutable e integridad metodologica.

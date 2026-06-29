# GOV-0002 - Protocolo de Inicializacion de Nuevos Proyectos y Bootstrap Metodologico

## Proposito

Establecer el procedimiento oficial para inicializar cualquier proyecto nuevo bajo la metodologia H-OperIA.

Este documento define las condiciones minimas que deben existir antes de comenzar desarrollo funcional, tecnico, documental u operativo en un proyecto.

Un proyecto no comienza cuando se crea un repositorio; un proyecto comienza cuando finaliza satisfactoriamente su Bootstrap Metodologico.

---

## Alcance

Este protocolo aplica a cualquier proyecto nuevo que adopte la metodologia H-OperIA, independientemente de su industria, cliente, dominio o tecnologia.

Puede aplicarse a proyectos de salud, educacion, industria, inmobiliaria, comercio, servicios profesionales, gobierno, operaciones internas u otros contextos organizacionales.

El documento es independiente de cualquier proyecto especifico. No depende de AMENA, Centro Demo ni de una implementacion tecnica particular.

---

## Principios Rectores

1. La metodologia antecede al desarrollo funcional.
2. La Base de Conocimiento es fuente de continuidad metodologica.
3. Git y el repositorio versionado son fuente rectora de documentos, decisiones y codigo.
4. El IME organiza la ejecucion viva, pero no sustituye documentos fuente.
5. Las decisiones arquitectonicas deben registrarse como ADR cuando afecten estructura, tecnologia o criterios permanentes.
6. Los protocolos operativos recurrentes deben documentarse como OPS.
7. Los modelos conceptuales, especificaciones y conocimiento consolidado deben documentarse como KB.
8. La continuidad entre chats debe preservarse mediante documentos de transicion, no mediante memoria conversacional.
9. Ningun proyecto debe iniciar desarrollo funcional sin gobierno documental, tecnico y operativo minimo.
10. Toda duda relevante debe conservarse como pendiente, riesgo o elemento por verificar; no debe convertirse en hecho.

---

## Definicion del Bootstrap Metodologico

El Bootstrap Metodologico es el proceso inicial mediante el cual un proyecto instala sus reglas de gobernanza, continuidad, trazabilidad, operacion documental y gobierno tecnico minimo.

Su objetivo es asegurar que el proyecto pueda:

* conservar decisiones;
* preservar contexto entre sesiones;
* distinguir ideas de compromisos;
* clasificar madurez del conocimiento;
* operar con una fuente unica de verdad;
* ejecutar trabajo tecnico con validaciones;
* continuar entre equipos, dispositivos o chats sin perdida metodologica.

El Bootstrap Metodologico constituye el requisito previo para iniciar cualquier desarrollo funcional.

---

## Estructura documental minima obligatoria

Todo proyecto nuevo debe instalar una Base de Conocimiento con, al menos, las siguientes familias documentales:

* `00_Gobernanza`: reglas permanentes, principios rectores y gobierno del sistema.
* `01_Protocolos_Operativos`: rutinas operativas recurrentes.
* `07_Especificaciones_Desarrollo`: especificaciones, modelos conceptuales y criterios tecnicos o metodologicos.
* `98_Work_In_Progress`: IME, planes vivos, documentos de transicion y registros de trabajo activo.

Cuando el proyecto lo requiera, tambien pueden existir:

* `02_Corpus_Fundacional`: fundamentos de disciplina, producto, investigacion o modelo conceptual mayor.
* `ADR`: decisiones arquitectonicas.
* otras carpetas documentales, siempre que su funcion sea clara y no duplique responsabilidades existentes.

---

## Instalacion de la Base de Conocimiento

La Base de Conocimiento debe crearse dentro del repositorio versionado del proyecto.

Debe contener documentos rectores suficientes para responder:

* que reglas gobiernan el proyecto;
* que protocolos operativos se deben seguir;
* que decisiones estan vigentes;
* que temas estan activos, pendientes o en revision;
* que conocimiento ya esta consolidado;
* que elementos requieren verificacion.

La Base de Conocimiento no debe ser un archivo decorativo. Debe ser operativa, consultable y obligatoria para iniciar trabajo.

---

## Instalacion del IME

Todo proyecto debe instalar un Indice Maestro de Ejecucion.

El IME debe registrar:

* temas vivos;
* documento asociado;
* area;
* tipo;
* nivel de madurez;
* estado operativo;
* nivel de certeza;
* prioridad;
* horizonte;
* proxima accion;
* observaciones.

El IME no sustituye documentos fuente. Su funcion es orientar la lectura, la priorizacion y la continuidad.

Antes de iniciar trabajo, el asistente o equipo debe consultar el IME y luego leer los documentos asociados aplicables.

---

## Instalacion del Sistema de Continuidad del Conocimiento

Todo proyecto debe instalar reglas de continuidad que definan:

* fuente rectora del conocimiento;
* relacion entre Git, documentos y copias externas;
* criterios de inicio de trabajo;
* criterios de transicion entre chats o sesiones;
* estados operativos permitidos;
* niveles de certeza;
* regla de no eliminacion;
* responsabilidades del asistente o equipo.

El sistema de continuidad debe impedir que decisiones, compromisos, riesgos o aprendizajes queden solamente en conversaciones, mensajes o memoria informal.

---

## Instalacion del Sistema de Transicion entre Chats

Todo proyecto debe contar con un sistema de transicion entre chats o sesiones de trabajo.

El evento disparador es la apertura de un nuevo chat o nueva sesion del mismo proyecto.

A partir de ese evento se debe:

1. Localizar la sesion inmediatamente anterior.
2. Escanear completamente la conversacion o registro anterior.
3. Identificar decisiones, aprendizajes, compromisos, pendientes, riesgos y razonamientos relevantes.
4. Generar un documento de transicion.
5. Almacenar el documento en la carpeta de trabajo vivo correspondiente.
6. Consultar el IME.
7. Leer documentos asociados aplicables.
8. Leer el documento de transicion recien generado.
9. Confirmar explicitamente los documentos leidos.
10. Iniciar diagnostico o trabajo solo despues de completar los pasos anteriores.

Este sistema evita depender de memoria conversacional, resumen informal o cierre manual de una sesion.

---

## Instalacion del Gobierno Tecnico

Todo proyecto debe instalar gobierno tecnico minimo antes de iniciar desarrollo funcional.

Ese gobierno debe definir:

* repositorio oficial;
* rama o ramas activas;
* fuente remota oficial;
* comandos de verificacion inicial;
* reglas para `git fetch`, `git status`, `git pull --ff-only`, commits y push;
* validaciones obligatorias segun tecnologia;
* criterios para trabajar en PC, Laptop u otros equipos;
* reglas sobre secretos, variables de entorno y credenciales;
* prohibicion de publicar informacion sensible;
* condiciones para modificar codigo, backend, integraciones o infraestructura.

El gobierno tecnico debe estar documentado como OPS cuando sea una rutina operativa recurrente.

---

## Fuente Unica de Verdad

Git y el repositorio versionado son la fuente unica de verdad para documentos rectores, conocimiento consolidado, decisiones, planes vivos, registros de transicion y codigo.

Pueden existir copias, respaldos o espejos externos, pero no reemplazan la fuente versionada.

En caso de conflicto entre el repositorio y una copia externa, prevalece el repositorio.

---

## Lista de Verificacion del Bootstrap Metodologico

Un proyecto completa su Bootstrap Metodologico cuando se verifica lo siguiente:

* repositorio oficial creado;
* rama activa definida;
* fuente remota oficial configurada;
* Base de Conocimiento creada;
* carpeta de gobernanza creada;
* carpeta de protocolos operativos creada;
* carpeta de especificaciones o conocimiento creada;
* carpeta de trabajo vivo creada;
* IME instalado;
* sistema de continuidad instalado;
* sistema de transicion entre chats instalado;
* protocolo tecnico Git instalado;
* reglas PC/Laptop o multi-equipo definidas cuando apliquen;
* validaciones iniciales definidas;
* criterio de fuente unica de verdad documentado;
* reglas de no eliminacion y certeza documentadas;
* relacion GOV, OPS, ADR y KB documentada;
* primer estado Git verificado;
* primer conjunto de documentos rectores leido y confirmado;
* restricciones iniciales del proyecto registradas;
* riesgos iniciales registrados;
* proxima accion documentada en el IME.

---

## Proyecto Operativamente Inicializado (POI)

Un Proyecto Operativamente Inicializado (POI) es aquel que ha completado satisfactoriamente el Bootstrap Metodologico y cumple todos los requisitos minimos establecidos por GOV-0002.

El estado POI exige, como minimo:

* Bootstrap Metodologico completado;
* Base de Conocimiento instalada;
* IME creado y validado;
* documentos GOV iniciales instalados;
* documentos OPS iniciales instalados;
* documentos KB iniciales instalados;
* ADR iniciales creados cuando correspondan;
* Sistema de Continuidad del Conocimiento operativo;
* Sistema de Transicion entre Chats operativo;
* Fuente Unica de Verdad establecida;
* reglas Git y flujo PC/Laptop configurados cuando apliquen;
* primer commit de inicializacion realizado;
* checklist de Bootstrap aprobado.

Unicamente a partir del estado POI puede comenzar el desarrollo funcional del proyecto.

---

## Criterios para declarar un proyecto Operativamente Inicializado

Un proyecto puede declararse Operativamente Inicializado cuando:

1. Existe repositorio versionado y accesible.
2. Existe Base de Conocimiento minima.
3. Existe IME vigente.
4. Existe sistema de continuidad del conocimiento.
5. Existe sistema de transicion entre chats o sesiones.
6. Existe gobierno tecnico minimo.
7. Existe fuente unica de verdad documentada.
8. El equipo sabe que documentos leer antes de trabajar.
9. Los estados, prioridades, riesgos y pendientes iniciales estan registrados.
10. Se puede abrir una nueva sesion sin depender de memoria informal.

Solo despues de cumplir estos criterios puede comenzar desarrollo funcional.

---

## Relacion con documentos GOV, OPS, ADR y KB existentes

Este documento pertenece a la familia GOV porque define una regla permanente de gobernanza para inicializar proyectos.

La relacion documental esperada es:

* GOV define reglas permanentes, principios rectores y gobierno metodologico.
* OPS define rutinas operativas recurrentes, como sincronizacion Git, trabajo multi-equipo o validaciones.
* ADR registra decisiones arquitectonicas relevantes y sus razones.
* KB define modelos conceptuales, especificaciones, conocimiento consolidado y criterios de madurez.
* IME registra ejecucion viva, prioridades, estados y proximas acciones.

GOV-0002 no reemplaza esos documentos. Define el proceso para instalarlos correctamente al iniciar un proyecto nuevo.

---

## Resultado esperado

Todo nuevo proyecto bajo metodologia H-OperIA debe comenzar con continuidad, trazabilidad, gobierno documental y gobierno tecnico minimo.

El Bootstrap Metodologico debe convertir un repositorio vacio o inicial en un proyecto operativamente gobernado, preparado para sostener trabajo funcional sin perder conocimiento ni decisiones.

# SUPABASE-0006 - Arquitectura Modular de Persistencia Conceptual

## Estado

Documento conceptual creado como continuacion de SUPABASE-0001, SUPABASE-0002, SUPABASE-0003, SUPABASE-0004 y SUPABASE-0005.

Este documento no modifica codigo, no toca Supabase, no ejecuta cambios tecnicos y no autoriza implementacion.

Su funcion es definir la Arquitectura Modular de Persistencia Conceptual de H-OperIA, preservando la identidad de los dominios definidos en SUPABASE-0005 y preparando un siguiente nivel de concrecion sin cruzar hacia diseno fisico.

## Restriccion rectora

SUPABASE-0006 permanece estrictamente en nivel conceptual.

No define estructuras fisicas, instrucciones tecnicas, seguridad operativa, conexion real a Supabase, inventario remoto ni implementacion en aplicaciones.

Cualquier traduccion futura de esta arquitectura requerira documentos posteriores, validacion humana, revision de dependencias, mecanismos de reversibilidad y gobierno especifico.

## Proposito

Definir la Arquitectura Modular de Persistencia Conceptual de H-OperIA, estableciendo modulos conceptuales, sus responsabilidades, limites, reglas de composicion y dependencias, preservando integramente la identidad y responsabilidad de los dominios definidos en SUPABASE-0005, sin traducirlos todavia a diseno fisico, estructuras tecnicas, nombres definitivos ni implementacion Supabase.

SUPABASE-0006 responde la siguiente pregunta:

```text
Como debe organizarse modularmente la persistencia conceptual futura de H-OperIA para que los dominios definidos en SUPABASE-0005 puedan coexistir, relacionarse y evolucionar sin perder identidad ni ser absorbidos por estructuras genericas?
```

## Resultado esperado

Este documento debe permitir:

- entender que un modulo conceptual no reemplaza a un dominio;
- organizar responsabilidades relacionadas sin borrar identidades canonicas;
- definir limites entre modulos conceptuales;
- establecer reglas de composicion entre modulos conceptuales;
- declarar dependencias conceptuales permitidas y prohibidas;
- preservar la separacion demo/productiva;
- proteger Expediente Vivo, Evidencia Operacional, Transicion Operacional y Bitacora Transversal contra usos genericos indebidos;
- ubicar H-OperIA Intelligence como consumidor de informacion gobernada;
- preparar documentos posteriores sin anticipar diseno fisico.

## Relacion con ACO

La serie ACO gobierna la doctrina superior de H-OperIA.

ACO-0001 establece que H-OperIA convierte operacion en dato, informacion, conocimiento, memoria, aprendizaje, inteligencia, decision, accion, resultado y nuevo conocimiento.

ACO-0002 establece los principios que protegen evidencia, responsabilidad humana, historia, incertidumbre, Expediente Vivo, no fragmentacion por canal, separacion demo/productiva y explicabilidad.

ACO-0003 establece que una inferencia no es un hecho y que el conocimiento debe conservar calidad, confianza, certeza, vigencia, contradiccion y condiciones de uso.

ACO-0004 establece que existen tipos distintos de conocimiento operacional y que esos tipos pueden coexistir sin reemplazarse.

ACO-0005 establece que la organizacion aprende cuando transforma evidencia, experiencia y patrones validados en conocimiento institucional reutilizable.

ACO-0006 establece que el conocimiento institucional requiere gobernanza para conservar responsabilidad, vigencia, trazabilidad, historia, contradicciones, reemplazos, retiro y archivo historico.

SUPABASE-0006 no redefine ACO. Organiza modularmente la persistencia conceptual que debera servir a esa doctrina.

## Relacion con SUPABASE-0001 a SUPABASE-0005

SUPABASE-0001 identifico necesidades de persistencia derivadas del sistema existente y establecio que el modelo objetivo no debe nacer desde una estructura generica unica ni desde un canal aislado.

SUPABASE-0002 definio el flujo conceptual de memoria operacional:

```text
Punto de captura
  -> evento bruto
  -> interpretacion IA
  -> objeto operacional
  -> verificacion humana
  -> evidencia
  -> Expediente Vivo
  -> inteligencia ejecutiva
```

SUPABASE-0003 definio que los objetos operacionales evolucionan y que sus transiciones deben conservar historia, actores, motivos, evidencia, recomendaciones, decisiones, acciones y resultados.

SUPABASE-0004 construyo el puente entre la doctrina ACO y los dominios logicos de persistencia operacional.

SUPABASE-0005 definio la arquitectura de dominios y relaciones logicas, distinguiendo dominios de negocio, dominios estructurales, capacidades transversales, propiedades transversales y consumidores de informacion.

SUPABASE-0006 toma esa arquitectura y la organiza en modulos conceptuales. No corrige SUPABASE-0005. No sustituye sus dominios. Solo establece como agrupar responsabilidades relacionadas para preparar el siguiente nivel de concrecion.

## Principio rector de modularidad conceptual

La modularidad conceptual organiza responsabilidades sin absorber identidades.

Un modulo conceptual puede reunir varios dominios relacionados, estructuras de soporte, capacidades y propiedades que deben actuar coordinadamente. Sin embargo, esa organizacion no autoriza que un dominio pierda su responsabilidad propia ni que una estructura transversal se convierta en reemplazo de dominios canonicos.

El modulo sirve para ordenar arquitectura.

El dominio conserva responsabilidad operacional.

La tecnologia futura debera implementar esta arquitectura, pero no podra redefinirla.

## Definicion de Dominio

Un dominio representa una responsabilidad operacional canonica dentro de H-OperIA.

Un dominio conserva:

- identidad conceptual;
- significado reconocible;
- responsabilidad propia;
- reglas conceptuales;
- relacion con otros dominios;
- participacion en la memoria operacional;
- capacidad de explicar que problema resuelve.

Un dominio no es una estructura tecnica, una pantalla, un servicio, una API, una integracion ni una implementacion.

Los dominios definidos por SUPABASE-0005 deben preservar su identidad. En particular, los dominios de negocio no deben ser absorbidos por Expediente Vivo, Evidencia Operacional, Transicion Operacional, Bitacora Transversal, Intelligence ni por ningun modulo conceptual amplio.

## Definicion de Modulo Conceptual de Persistencia

Un Modulo Conceptual de Persistencia organiza arquitectonicamente uno o varios dominios relacionados, capacidades asociadas o estructuras de soporte, sin alterar la identidad ni la responsabilidad de los dominios que contiene, coordina o conecta.

Un modulo conceptual debe:

- agrupar responsabilidades relacionadas;
- declarar su limite conceptual;
- explicar que conserva y que no conserva;
- indicar de que dominios depende;
- indicar que dominios puede alimentar;
- preservar relaciones logicas sin convertirlas en diseno fisico;
- respetar separacion demo/productiva;
- impedir absorcion de dominios canonicos por estructuras genericas.

Un modulo conceptual no es una unidad tecnica de implementacion. Es una unidad arquitectonica de organizacion conceptual.

## Diferencia entre Dominio y Modulo Conceptual

El dominio responde:

```text
Que responsabilidad operacional debe preservarse?
```

El modulo conceptual responde:

```text
Como se organiza arquitectonicamente esa responsabilidad junto con otras responsabilidades relacionadas?
```

La diferencia es central:

- un dominio conserva identidad;
- un modulo organiza responsabilidades;
- un dominio puede pertenecer conceptualmente a un modulo;
- un dominio puede relacionarse con varios modulos;
- un modulo puede coordinar varios dominios;
- ningun modulo debe borrar la responsabilidad propia del dominio;
- ningun modulo debe convertir lo transversal en sustituto de lo canonico.

## Arquitectura Modular Conceptual

La Arquitectura Modular Conceptual organiza la persistencia conceptual futura en familias modulares.

Estas familias no son estructuras fisicas ni nombres definitivos. Son agrupaciones conceptuales que permiten razonar sobre responsabilidad, dependencia, limites y composicion.

### 7.1 Criterios para delimitar modulos conceptuales

Un modulo conceptual debe existir solo cuando ayuda a organizar responsabilidades que necesitan coherencia arquitectonica compartida.

Los criterios de delimitacion son:

- responsabilidad comun;
- relacion estable entre dominios;
- necesidad de preservar trazabilidad conjunta;
- riesgo de confusion si se mantiene disperso;
- necesidad de distinguir limites frente a otros modulos;
- proteccion contra absorcion generica;
- utilidad para preparar decisiones posteriores sin anticiparlas.

Un modulo conceptual no debe crearse solo por conveniencia terminologica.

Tampoco debe crearse para convertir una capacidad transversal en dominio falso, ni para ocultar diferencias entre dominios de negocio.

### 7.2 Modulo conceptual de contexto e identidad operacional

Este modulo organiza el contexto que permite ubicar la operacion.

Responsabilidad conceptual:

- declarar quien opera;
- ubicar organizacion, proyecto, cliente institucional o contexto operativo;
- conservar configuraciones conceptuales que condicionan comportamiento;
- permitir que dominios operacionales se interpreten dentro del marco correcto.

Incluye conceptualmente el dominio de Identidad y configuracion operacional definido en SUPABASE-0005.

Limites:

- no conserva la operacion sustantiva;
- no reemplaza clientes, reservas, documentos, pagos, comunicaciones ni servicio;
- no debe convertirse en contenedor opaco de todo lo variable;
- no define implementacion multiempresa ni parametrizacion tecnica.

Dependencias:

- alimenta la interpretacion contextual de los demas modulos;
- depende de gobernanza conceptual para evitar configuraciones ambiguas;
- debe respetar separacion demo/productiva.

### 7.3 Modulo conceptual del nucleo operacional canonico

Este modulo organiza los dominios que representan la operacion sustantiva de negocio.

Responsabilidad conceptual:

- preservar responsabilidades canonicas;
- mantener identidad de cliente, proyecto, reserva, actividad comercial, documentos, pagos, servicio y marketing;
- permitir que cada dominio conserve su ciclo conceptual propio;
- evitar que la memoria operacional se reduzca a una bitacora o expediente generico.

Dominios que puede coordinar conceptualmente:

- Cliente y prospecto;
- Proyecto, producto e inventario;
- Reserva e interes operacional;
- Actividad comercial y seguimiento humano;
- Documentos;
- Pagos y compromisos financieros;
- Servicio al cliente, postventa y escalaciones;
- Marketing, campanas y origen comercial.

Limites:

- no absorbe comunicaciones;
- no sustituye Expediente Vivo;
- no convierte evidencia en dominio de negocio;
- no mezcla demo con produccion;
- no transforma recomendaciones o senales en decisiones.

Dependencias:

- se vincula con memoria estructural para continuidad;
- se apoya en evidencia para explicabilidad;
- produce hechos, decisiones, acciones y resultados que alimentan aprendizaje;
- puede ser consumido por Intelligence bajo reglas de trazabilidad y certeza.

### 7.4 Modulo conceptual de comunicaciones y coordinacion

Este modulo organiza comunicaciones multicanal y coordinacion interna sin mezclarlas.

Responsabilidad conceptual:

- distinguir comunicacion externa con clientes, usuarios, agentes, sistemas o canales;
- distinguir mensajeria interna y coordinacion entre roles;
- preservar fuente, actor, direccion, contexto, evidencia y relacion con continuidad operacional;
- impedir que el canal cree memorias separadas.

Dominios que puede coordinar conceptualmente:

- Comunicaciones y canales;
- Mensajeria interna y coordinacion operacional.

Limites:

- no reemplaza actividad comercial;
- no reemplaza servicio al cliente;
- no convierte mensajes en decisiones por si mismos;
- no convierte canal en frontera de expediente;
- no mezcla coordinacion interna con conversacion externa.

Dependencias:

- se relaciona con Expediente Vivo cuando existe continuidad valida;
- puede generar evidencia;
- puede originar acciones, decisiones o resultados;
- puede ser interpretado por IA sin que esa interpretacion se vuelva hecho confirmado.

### 7.5 Modulo conceptual de memoria estructural

Este modulo organiza las estructuras que preservan continuidad, memoria e historia entre dominios.

Responsabilidad conceptual:

- conectar dominios sin absorberlos;
- conservar continuidad operacional;
- permitir lectura historica del caso;
- sostener memoria explicable;
- preservar la relacion entre objetos, eventos, evidencias, decisiones, acciones y resultados.

Dominios estructurales que coordina conceptualmente:

- Expediente Vivo;
- Bitacora Transversal, con caracter auxiliar y restricciones fuertes.

Limites:

- el Expediente Vivo no es bolsa generica;
- la Bitacora Transversal no es modelo canonico unico;
- las estructuras de memoria no sustituyen dominios de negocio;
- la continuidad no borra la responsabilidad del objeto fuente.

Dependencias:

- depende del nucleo operacional canonico para conservar significado;
- depende de evidencia para explicabilidad;
- depende de transiciones para historia;
- alimenta Intelligence sin convertirse en fuente no trazable.

### 7.6 Modulo conceptual de evidencia, transiciones y trazabilidad

Este modulo organiza los elementos que permiten explicar por que se sabe algo, como cambio y que lo respalda.

Responsabilidad conceptual:

- conservar evidencia operacional;
- conservar transiciones operacionales;
- preservar fuente, contexto, motivo, actor, decision, accion y resultado cuando existan;
- permitir auditoria conceptual;
- impedir perdida de historia.

Dominios estructurales que coordina conceptualmente:

- Evidencia Operacional;
- Transicion Operacional.

Propiedades transversales especialmente relevantes:

- trazabilidad;
- certeza;
- confianza;
- vigencia;
- contradiccion;
- responsabilidad;
- explicabilidad.

Limites:

- evidencia no reemplaza dominio;
- transicion no reemplaza objeto;
- trazabilidad no convierte toda actividad en aprendizaje;
- una evidencia no es necesariamente hecho confirmado;
- un cambio historico no debe borrar la version conceptual anterior.

Dependencias:

- se relaciona con todos los dominios cuando existe afirmacion, cambio o decision relevante;
- alimenta gobernanza del conocimiento;
- permite que Intelligence explique sus lecturas;
- sostiene la separacion entre hecho, inferencia, recomendacion, decision, accion y resultado.

### 7.7 Modulo conceptual de interpretacion, decision, accion y resultado

Este modulo organiza el recorrido conceptual desde lectura inteligente hasta consecuencia observada.

Responsabilidad conceptual:

- distinguir interpretacion IA;
- distinguir recomendacion IA;
- distinguir verificacion y decision humana;
- distinguir accion ejecutada;
- distinguir resultado observado;
- preservar la secuencia entre esos momentos;
- evitar falsa certeza.

Capacidades que coordina conceptualmente:

- Interpretacion IA;
- Recomendacion IA;
- Verificacion y decision humana;
- Accion ejecutada;
- Resultado observado.

Limites:

- una interpretacion IA no es hecho confirmado;
- una recomendacion IA no es decision humana;
- una decision no garantiza accion;
- una accion ejecutada no equivale a resultado observado;
- un resultado aislado no constituye aprendizaje organizacional por si solo.

Dependencias:

- depende de evidencia para justificar lecturas y decisiones;
- depende de dominios canonicos para significado operacional;
- depende de transiciones para explicar cambios;
- alimenta aprendizaje cuando los resultados pueden compararse con decisiones y acciones previas.

### 7.8 Modulo conceptual de aprendizaje, conocimiento institucional y gobernanza

Este modulo organiza la evolucion desde experiencia operacional hacia conocimiento institucional gobernado.

Responsabilidad conceptual:

- conservar experiencia acumulada;
- permitir identificacion de patrones;
- distinguir hipotesis, patron preliminar, aprendizaje consolidado y conocimiento institucional;
- preservar responsabilidad, vigencia, contradiccion, revision, reemplazo, retiro y archivo historico;
- impedir que aprendizaje no validado se convierta en regla institucional.

Conceptos que coordina conceptualmente:

- Aprendizaje organizacional;
- Conocimiento institucional;
- Gobernanza del conocimiento;
- Calidad, certeza, vigencia y contradiccion del conocimiento.

Limites:

- no todo hecho es aprendizaje;
- no todo patron es conocimiento institucional;
- Intelligence no reemplaza aprendizaje;
- una recomendacion recurrente no se convierte automaticamente en criterio gobernado;
- la gobernanza no es burocracia documental, sino integridad del conocimiento.

Dependencias:

- depende de evidencia acumulada;
- depende de resultados observados;
- depende de trazabilidad historica;
- puede alimentar Intelligence;
- debe preservar demo/productivo como frontera conceptual.

### 7.9 Modulo conceptual de consumo de informacion e Intelligence

Este modulo organiza el consumo de memoria operacional, evidencia y conocimiento gobernado para lectura ejecutiva y apoyo a decisiones.

Responsabilidad conceptual:

- producir senales, hallazgos, prioridades, preguntas, respuestas, recomendaciones y explicaciones;
- consumir conocimiento trazable;
- declarar origen, evidencia, certeza, vigencia y limitaciones;
- mantener separacion entre lectura, recomendacion y decision.

Consumidor principal:

- H-OperIA Intelligence.

Limites:

- Intelligence no reemplaza Marta;
- Intelligence no reemplaza dominios de negocio;
- Intelligence no crea verdad por si misma;
- Intelligence no debe operar sobre conocimiento no trazable como si fuera certeza;
- Intelligence no convierte predicciones en resultados.

Dependencias:

- depende de memoria estructural;
- depende de evidencia y trazabilidad;
- depende de conocimiento gobernado;
- depende de la separacion entre hechos, inferencias, recomendaciones, decisiones, acciones y resultados.

### 7.10 Modulo conceptual demo y escenarios simulados

Este modulo organiza la persistencia conceptual de escenarios demo y simulados sin contaminacion productiva.

Responsabilidad conceptual:

- conservar contexto de simulacion;
- preservar proposito de la corrida demo;
- distinguir evidencia demo de evidencia productiva;
- permitir aprendizaje sobre narrativa, presentacion y validacion conceptual;
- impedir que escenarios simulados se traten como operacion real.

Dominio que coordina conceptualmente:

- Demo y escenarios simulados.

Limites:

- demo no es produccion;
- una evidencia demo no respalda decisiones productivas;
- una senal demo no debe alimentar aprendizaje productivo;
- una corrida demo no valida comportamiento real de clientes;
- demo puede relacionarse con dominios de negocio solo como representacion simulada.

Dependencias:

- depende de separacion demo/productiva;
- puede reutilizar patrones conceptuales de otros modulos sin mezclarse con ellos;
- puede alimentar aprendizaje sobre demostracion, narrativa o arquitectura conceptual;
- debe permanecer marcado como ambiente conceptual especial.

## Relaciones entre modulos conceptuales

Las relaciones entre modulos conceptuales expresan dependencia conceptual, flujo de significado y necesidad de coherencia.

No son relaciones fisicas ni instrucciones tecnicas.

### Relacion de contexto

El modulo de contexto e identidad operacional permite interpretar correctamente los demas modulos.

Regla:

- el contexto ubica la operacion, pero no reemplaza la operacion.

### Relacion de continuidad

El nucleo operacional canonico y las comunicaciones pueden vincularse con memoria estructural cuando existe continuidad valida.

Regla:

- la continuidad organiza el caso, pero no absorbe dominios.

### Relacion de soporte evidencial

Los modulos operacionales, estructurales, de decision, de aprendizaje e Intelligence pueden depender de evidencia.

Regla:

- la evidencia respalda, pero no sustituye.

### Relacion de cambio historico

Los objetos y conocimientos relevantes pueden generar transiciones conceptuales.

Regla:

- el estado actual debe poder explicarse por historia, no por sobrescritura opaca.

### Relacion de decision y consecuencia

Interpretaciones, recomendaciones, decisiones, acciones y resultados deben relacionarse sin mezclarse.

Regla:

- cada momento conserva naturaleza propia.

### Relacion de aprendizaje

Resultados observados, experiencias acumuladas y patrones pueden alimentar aprendizaje.

Regla:

- el aprendizaje requiere evidencia, comparacion, validacion y gobernanza.

### Relacion de consumo por Intelligence

Intelligence consume informacion de modulos conceptuales y produce lectura para usuarios internos.

Regla:

- toda lectura debe poder regresar a su origen, evidencia, certeza y vigencia.

### Relacion demo/productiva

Demo puede representar recorridos conceptuales semejantes a produccion, pero debe conservar frontera clara.

Regla:

- similitud narrativa no equivale a equivalencia operacional.

## Reglas de composicion entre modulos conceptuales

La composicion modular permite que varios modulos actuen coordinadamente sin fusionarse.

### Regla 1 - La composicion no borra limites

Cuando dos modulos se relacionan, cada uno conserva su responsabilidad.

Ejemplo conceptual:

- una comunicacion puede alimentar un expediente;
- el expediente organiza continuidad;
- la comunicacion conserva su naturaleza;
- la evidencia respalda la afirmacion;
- la decision humana conserva responsabilidad propia.

### Regla 2 - La composicion debe preservar origen

Todo flujo entre modulos debe conservar de donde proviene la informacion.

Sin origen, la memoria operacional pierde explicabilidad.

### Regla 3 - La composicion debe preservar naturaleza conceptual

Un elemento no cambia de naturaleza solo por relacionarse con otro.

Una recomendacion no se vuelve decision. Una accion no se vuelve resultado. Una evidencia no se vuelve dominio. Una senal no se vuelve hecho confirmado.

### Regla 4 - La composicion debe declarar dependencia

Si un modulo necesita informacion, evidencia, contexto o gobernanza de otro modulo, esa dependencia debe quedar conceptualmente clara.

La dependencia no autoriza absorcion.

### Regla 5 - La composicion debe permitir auditoria

Toda composicion relevante debe permitir reconstruir:

- origen;
- contexto;
- evidencia;
- interpretacion;
- decision;
- accion;
- resultado;
- cambio historico;
- estado de certeza;
- vigencia.

### Regla 6 - La composicion debe respetar demo/productivo

Ninguna composicion puede mezclar simulacion con operacion real.

Demo puede modelar, ensayar o presentar recorridos. Produccion conserva responsabilidad real.

### Regla 7 - La composicion debe impedir contenedores genericos

Un modulo amplio no debe convertirse en contenedor indiferenciado.

Si una responsabilidad canonica existe, debe conservarse como tal.

## Reglas de no absorcion entre modulos y dominios

### El nucleo operacional canonico no debe ser absorbido por memoria estructural

Expediente Vivo y Bitacora Transversal pueden conectar elementos del nucleo operacional, pero no reemplazan cliente, reserva, documentos, pagos, servicio, marketing ni actividad comercial.

### Evidencia no debe absorber objetos operacionales

La evidencia explica y respalda. No sustituye el objeto, decision, accion o resultado que respalda.

### Transicion no debe absorber dominio

La transicion explica cambio. No reemplaza el objeto que cambia.

### Intelligence no debe absorber dominios ni gobernanza

Intelligence consume memoria y conocimiento gobernado. No es fuente autonoma de verdad ni autoridad final.

### Demo no debe absorber ni contaminar produccion

Demo puede representar dominios para fines de demostracion. No puede alimentar evidencia productiva ni aprendizaje productivo sin validacion posterior explicita.

### Contexto no debe absorber operacion

La configuracion ubica el comportamiento. No sustituye eventos, decisiones, expedientes, documentos, pagos ni resultados.

## Separacion demo/productiva en la arquitectura modular

La separacion demo/productiva es una propiedad transversal obligatoria de toda la arquitectura modular.

En SUPABASE-0006, demo se trata como modulo conceptual especial porque organiza escenarios simulados, no operacion productiva.

Reglas:

- todo elemento demo debe conservar condicion simulada;
- ninguna evidencia demo debe presentarse como productiva;
- ningun resultado demo debe usarse como resultado operacional real;
- ningun aprendizaje productivo debe derivarse automaticamente de una corrida demo;
- demo puede alimentar aprendizaje sobre presentacion, narrativa, validacion conceptual y diseno demostrativo;
- produccion requiere evidencia real, responsabilidad humana y gobernanza completa.

Esta separacion debe preservarse en cualquier documento posterior.

## Dependencias conceptuales permitidas y prohibidas

### Dependencias permitidas

Son permitidas las dependencias que preservan identidad, origen, evidencia y responsabilidad.

Ejemplos conceptuales:

- un dominio canonico puede depender de contexto operacional;
- una comunicacion puede depender de un expediente para continuidad;
- una decision puede depender de evidencia;
- una accion puede depender de una decision;
- un resultado puede depender de una accion previa;
- un aprendizaje puede depender de resultados observados;
- Intelligence puede depender de memoria gobernada.

Estas dependencias son validas si no borran naturaleza, fuente ni responsabilidad.

### Dependencias prohibidas

Son prohibidas las dependencias que producen falsa certeza, absorcion o perdida de trazabilidad.

No se permite:

- que una inferencia dependa de si misma como si fuera hecho;
- que una recomendacion se trate como decision;
- que una accion se trate como resultado;
- que Intelligence consuma conocimiento no trazable como certeza;
- que demo alimente produccion sin frontera conceptual;
- que Bitacora Transversal reemplace dominios canonicos;
- que Expediente Vivo se convierta en contenedor generico;
- que evidencia sustituya objeto operacional;
- que contexto operacional o configuracion absorba operacion real.

## Riesgos arquitectonicos de modularizacion conceptual

### Riesgo de diseno fisico prematuro

El riesgo principal es interpretar los modulos como estructuras tecnicas.

Control:

- SUPABASE-0006 solo define organizacion conceptual;
- cualquier traduccion posterior requerira documentos especificos;
- ningun modulo debe entenderse como decision tecnica.

### Riesgo de sobreabstraccion

Existe riesgo de crear modulos tan amplios que pierdan utilidad.

Control:

- cada modulo debe declarar responsabilidad, limite y dependencias;
- si un modulo no ayuda a preservar claridad, no debe existir.

### Riesgo de absorcion de dominios canonicos

Existe riesgo de que modulos amplios sustituyan dominios definidos por SUPABASE-0005.

Control:

- el dominio conserva identidad;
- el modulo organiza, pero no reemplaza;
- lo transversal no borra lo especifico.

### Riesgo de duplicidad conceptual

Existe riesgo de duplicar responsabilidades entre memoria estructural, evidencia, transiciones y gobernanza.

Control:

- Expediente Vivo organiza continuidad;
- Evidencia Operacional respalda afirmaciones;
- Transicion Operacional explica cambios;
- Gobernanza conserva integridad del conocimiento institucional.

### Riesgo de falsa certeza

Existe riesgo de que una organizacion modular parezca resolver problemas que aun son conceptuales.

Control:

- conservar separacion entre arquitectura conceptual y decisiones posteriores;
- distinguir hecho, inferencia, recomendacion, decision, accion y resultado.

### Riesgo de contaminacion demo/productiva

Existe riesgo de usar la similitud entre escenarios demo y productivos para mezclar evidencias.

Control:

- mantener modulo demo separado;
- conservar condicion simulada;
- impedir uso productivo de evidencia demo.

### Riesgo de Intelligence como centro indebido

Existe riesgo de organizar la arquitectura alrededor de Intelligence en lugar de memoria gobernada.

Control:

- Intelligence consume, interpreta y presenta;
- no reemplaza evidencia, dominios, decisiones humanas ni gobernanza.

## Que deja preparado SUPABASE-0006

SUPABASE-0006 deja preparado:

- un criterio modular conceptual para continuar la serie SUPABASE;
- una diferencia formal entre dominio y modulo conceptual;
- reglas para agrupar responsabilidades sin borrar identidades;
- una arquitectura para razonar sobre dependencias conceptuales;
- controles contra absorcion generica;
- continuidad entre dominios, memoria, evidencia, decision, aprendizaje, gobernanza e Intelligence;
- proteccion explicita de la separacion demo/productiva;
- base para documentos posteriores de mayor concrecion.

SUPABASE-0006 no deja preparado todavia:

- diseno fisico;
- estructura tecnica;
- seguridad operativa;
- conexion remota;
- inventario operativo;
- implementacion;
- cambios sobre aplicaciones.

## Criterios de cierre de SUPABASE-0006

SUPABASE-0006 queda cumplido si permite responder:

- que es un dominio;
- que es un modulo conceptual de persistencia;
- por que un modulo no reemplaza a un dominio;
- que familias modulares conceptuales organizan la persistencia futura;
- que responsabilidad tiene cada modulo;
- que limites conserva cada modulo;
- que dependencias conceptuales son permitidas;
- que dependencias conceptuales son prohibidas;
- como se preserva la identidad de dominios definidos en SUPABASE-0005;
- como se evita que Expediente Vivo, Evidencia Operacional, Transicion Operacional o Bitacora Transversal absorban dominios canonicos;
- como se mantiene Intelligence como consumidor de informacion gobernada;
- como se conserva separacion demo/productiva;
- por que nada de lo anterior autoriza implementacion fisica.

El documento queda incompleto si el lector confunde modulo conceptual con dominio, dominio con implementacion, o arquitectura modular conceptual con diseno fisico.

## Cierre

La Arquitectura Modular de Persistencia Conceptual organiza el siguiente nivel de concrecion de la serie SUPABASE.

Su aporte central es ordenar responsabilidades sin borrar identidades.

SUPABASE-0005 definio dominios y relaciones logicas.

SUPABASE-0006 define como esos dominios y relaciones pueden agruparse conceptualmente en modulos, preservando responsabilidad, limite, dependencia, trazabilidad, separacion demo/productiva y subordinacion plena a ACO.

El siguiente avance de la serie SUPABASE debera partir de esta organizacion modular conceptual y continuar aplicando el Principio de Concrecion Progresiva, sin anticipar implementacion.

# SUPABASE-0005 - Arquitectura de Dominios y Relaciones Logicas

## Estado

Documento conceptual creado como continuacion de SUPABASE-0001, SUPABASE-0002, SUPABASE-0003 y SUPABASE-0004.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas, no elimina tablas y no autoriza implementacion tecnica.

Su funcion es definir la arquitectura conceptual de dominios y relaciones logicas que debera orientar cualquier diseno posterior de persistencia operacional, manteniendo subordinacion plena a la Arquitectura del Conocimiento Operacional.

## Restricciones absolutas

SUPABASE-0005 no incluye ni autoriza:

- SQL;
- migraciones;
- tablas;
- diseno fisico;
- nombres fisicos definitivos de entidades;
- tipos de datos;
- RLS;
- policies;
- triggers;
- funciones;
- indices;
- vistas;
- conexion a Supabase;
- inventario remoto;
- implementacion tecnica;
- cambios de codigo;
- cambios sobre aplicaciones existentes.

Cualquier dominio, relacion, estructura o regla mencionada aqui es conceptual. Su traduccion futura a implementacion fisica requerira documentos posteriores, inventario remoto, respaldo, revision de dependencias, validacion humana y plan de rollback.

## Proposito

Definir como debe organizarse conceptualmente la arquitectura de dominios y relaciones logicas de H-OperIA para que la futura persistencia operacional pueda representar dominios de negocio, estructuras de memoria, evidencias, transiciones, decisiones, acciones, resultados, aprendizaje, gobernanza e Intelligence sin mezclar responsabilidades ni anticipar diseno fisico.

SUPABASE-0005 responde la siguiente pregunta:

```text
Que dominios conceptuales y relaciones logicas debe reconocer la arquitectura futura de persistencia para preservar la memoria operacional explicable de H-OperIA sin convertir todavia esa arquitectura en tablas, SQL ni implementacion?
```

## Resultado esperado

Este documento debe permitir:

- distinguir dominios conceptuales con responsabilidad propia;
- separar dominios de negocio de estructuras centrales de memoria;
- ubicar capacidades transversales sin convertirlas en dominios falsos;
- reconocer propiedades transversales sin tratarlas como objetos autonomos;
- definir relaciones logicas entre dominios sin convertirlas en relaciones fisicas;
- proteger el Expediente Vivo como eje de continuidad sin absorber dominios canonicos;
- proteger la evidencia como soporte explicativo sin reemplazar objetos operacionales;
- preservar historia, transiciones, decisiones, acciones y resultados observados;
- mantener separacion conceptual entre demo y produccion;
- preparar el camino para diseno posterior sin adelantar implementacion.

## Relacion con la doctrina vigente

### Relacion con ACO-0001 a ACO-0006

La serie ACO define la doctrina superior de H-OperIA.

ACO-0001 establece que H-OperIA convierte operacion en dato, informacion, conocimiento, memoria, aprendizaje, inteligencia, decision, accion, resultado y nuevo conocimiento.

ACO-0002 establece los principios que protegen evidencia, responsabilidad humana, historia, incertidumbre, Expediente Vivo, no fragmentacion por canal, separacion demo/productiva y explicabilidad.

ACO-0003 establece que una inferencia no es un hecho y que todo conocimiento debe declarar calidad, confianza, certeza, vigencia, contradiccion y condiciones de uso.

ACO-0004 establece que existen tipos distintos de conocimiento operacional y que esos tipos pueden coexistir sin reemplazarse.

ACO-0005 establece que la organizacion aprende cuando transforma evidencia, experiencia y patrones validados en conocimiento institucional reutilizable.

ACO-0006 establece que el conocimiento institucional requiere gobernanza para conservar responsabilidad, vigencia, trazabilidad, historia, contradicciones, reemplazos, retiro y archivo historico.

SUPABASE-0005 no redefine esa doctrina. La traduce hacia una arquitectura conceptual de dominios y relaciones logicas.

### Relacion con SUPABASE-0001 a SUPABASE-0004

SUPABASE-0001 identifico necesidades de datos derivadas del codigo existente y establecio que el modelo objetivo no debe nacer desde una tabla generica unica ni desde un canal aislado.

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

SUPABASE-0003 definio que los objetos operacionales evolucionan y que sus transiciones deben conservar estado anterior, estado nuevo, actor, motivo, evidencia, recomendacion IA, decision humana y vinculo al Expediente Vivo.

SUPABASE-0004 definio los dominios logicos amplios que la persistencia futura debe reconocer, subordinados a ACO.

SUPABASE-0005 toma esas bases y refina su organizacion conceptual: no basta listar dominios logicos; tambien debe distinguir que tipo de dominio o elemento es cada concepto, que responsabilidad conserva y que tipo de relacion puede establecer con los demas.

## Principio rector

La arquitectura de dominios y relaciones logicas debe preservar responsabilidad conceptual.

Cada dominio debe resolver un problema propio. Cada estructura de memoria debe conectar sin absorber. Cada capacidad transversal debe operar sobre varios dominios sin convertirse en dominio falso. Cada propiedad transversal debe acompanar el conocimiento sin transformarse en entidad autonoma.

La tecnologia implementa esta arquitectura, pero no la redefine.

## Definiciones conceptuales

### Dominio conceptual

Un dominio conceptual es un area de responsabilidad estable dentro de la arquitectura de H-OperIA.

Un dominio conceptual debe:

- tener responsabilidad propia;
- conservar significado reconocible;
- relacionarse con otros dominios sin perder identidad;
- poder explicar que problema resuelve;
- tener reglas conceptuales propias;
- participar en la memoria operacional sin diluirse en estructuras genericas.

Un dominio conceptual no es una tabla, una pantalla, un servicio, una API ni una migracion.

### Dominio de negocio

Un dominio de negocio representa una parte sustantiva de la operacion de una organizacion.

Tiene vocabulario operativo propio, responsabilidades reconocibles por usuarios humanos y relacion directa con procesos reales de negocio.

Ejemplos conceptuales:

- cliente y prospecto;
- proyecto y unidad;
- reserva;
- actividad comercial;
- comunicaciones;
- documentos;
- pagos y compromisos financieros;
- servicio al cliente;
- marketing y campanas;
- demo como operacion simulada claramente marcada.

Un dominio de negocio debe conservar su identidad. No debe ser absorbido por Expediente Vivo, evidencia, bitacora transversal ni Intelligence.

### Dominio estructural

Un dominio estructural no representa un area de negocio, pero organiza, preserva o explica la memoria operacional.

Tiene identidad conceptual, ciclo de vida, reglas propias y relaciones propias. Su responsabilidad es permitir continuidad, trazabilidad, explicabilidad, historia o soporte de decisiones entre multiples dominios.

Ejemplos conceptuales:

- Expediente Vivo;
- Evidencia Operacional;
- Transicion Operacional;
- Bitacora Transversal, con caracter auxiliar y restricciones fuertes.

Un dominio estructural puede atravesar dominios de negocio, pero no debe reemplazarlos.

### Capacidad transversal

Una capacidad transversal es una funcion conceptual que opera sobre varios dominios.

Puede capturar, interpretar, validar, revisar, recomendar, auditar, clasificar, consumir o presentar informacion, pero no necesariamente constituye un dominio con identidad propia.

Ejemplos conceptuales:

- captura operacional;
- interpretacion IA;
- recomendacion IA;
- verificacion humana;
- auditoria;
- revision;
- consulta ejecutiva;
- generacion de senales;
- evaluacion de aprendizaje.

Una capacidad transversal puede producir objetos, evidencias o relaciones, pero no debe confundirse automaticamente con un dominio.

### Propiedad transversal

Una propiedad transversal es una cualidad que debe acompanar al conocimiento, a los dominios o a las relaciones.

No es un dominio ni una capacidad por si misma.

Ejemplos conceptuales:

- trazabilidad;
- certeza;
- confianza;
- vigencia;
- contradiccion;
- obsolescencia;
- separacion demo/productiva;
- responsabilidad;
- auditabilidad;
- explicabilidad.

Una propiedad transversal debe conservarse en toda la arquitectura. No debe convertirse prematuramente en entidad fisica.

### Vista o consumidor de informacion

Una vista o consumidor de informacion usa memoria operacional, evidencia, conocimiento gobernado o relaciones existentes para producir lectura, presentacion, analisis, priorizacion o recomendacion.

H-OperIA Intelligence es el consumidor conceptual principal de informacion gobernada.

Intelligence no debe reemplazar los dominios que analiza ni convertirse en fuente no trazable de verdad. Sus senales, hallazgos y recomendaciones deben poder regresar a evidencia, fuentes, niveles de certeza, vigencia, decisiones y resultados observados.

## Mapa conceptual de dominios

El mapa conceptual de dominios distingue dominios de negocio y dominios estructurales. Las capacidades transversales, propiedades transversales y consumidores se tratan en secciones separadas para evitar mezcla de niveles.

### Dominios de negocio

#### Identidad y configuracion operacional

Representa la identidad organizacional, clientes institucionales, proyectos, configuraciones, parametros operativos y contexto base que permite ubicar la operacion.

Este dominio se considera un dominio operacional habilitador. No representa por si solo una actividad sustantiva como reserva, pago o servicio, pero permite que los dominios de negocio operen dentro de un contexto organizacional, comercial y configuracional claro.

Responsabilidad conceptual:

- definir quien opera;
- bajo que cliente, organizacion o proyecto se opera;
- que configuraciones condicionan el comportamiento operativo;
- que contexto permite interpretar acciones, mensajes, documentos, inventario y decisiones.

Este dominio no debe convertirse en repositorio opaco de todo lo variable. Lo configurable debe mantenerse separado de objetos operacionales, evidencia, decisiones e historia.

#### Cliente y prospecto

Representa personas, familias, empresas, compradores, prospectos o usuarios que interactuan con la organizacion.

Responsabilidad conceptual:

- conservar identidad y contexto relacional;
- preservar preferencias, necesidades, objeciones y compromisos declarados;
- distinguir datos capturados de hechos confirmados;
- vincular la continuidad del cliente con expedientes, reservas, comunicaciones, documentos, pagos, servicio y resultados.

El conocimiento del cliente puede provenir de multiples canales, pero el canal no debe fragmentar su memoria.

#### Proyecto, producto e inventario

Representa los proyectos, productos, unidades, disponibilidad, condiciones, avance, atributos y contexto comercial u operativo que condicionan una interaccion.

Responsabilidad conceptual:

- ubicar a que proyecto, unidad o producto se refiere una continuidad operacional;
- evitar promesas comerciales no sustentadas;
- distinguir informacion vigente, historica, simulada o pendiente de validacion;
- conectar reservas, campanas, documentos, pagos y comunicaciones con el objeto ofrecido.

Este dominio debe aspirar a alta certeza cuando afecta promesas, disponibilidad, precio, condiciones o compromisos.

#### Reserva e interes operacional

Representa la intencion, solicitud, reserva, seleccion o caso inicial que origina continuidad operacional.

Responsabilidad conceptual:

- registrar el origen del caso;
- relacionar cliente, proyecto, unidad, fuente y estado;
- activar o alimentar el Expediente Vivo cuando exista continuidad valida;
- preservar eventos, decisiones, acciones, resultados y evidencias asociadas al avance o abandono.

La reserva no debe vivir solo como bitacora transversal ni como resumen en el expediente. Conserva responsabilidad propia.

#### Actividad comercial y seguimiento humano

Representa interacciones comerciales, criterio de vendedoras, seguimientos, objeciones, prioridades, proximos pasos y acciones de venta.

Responsabilidad conceptual:

- conservar juicio humano comercial;
- distinguir reporte humano, recomendacion IA, decision y accion ejecutada;
- relacionar seguimiento con cliente, reserva, expediente, evidencia y resultado observado;
- permitir aprendizaje sobre conversion, friccion, objeciones y efectividad.

Este dominio no debe confundirse con mensajeria interna ni con Intelligence. Puede alimentarlas y ser alimentado por ellas.

#### Comunicaciones y canales

Representa comunicaciones con clientes, usuarios, equipos o sistemas a traves de voz, texto, WhatsApp, correo, widget, llamadas u otros canales.

Responsabilidad conceptual:

- conservar mensaje, conversacion o interaccion segun su naturaleza;
- distinguir canal tecnico de continuidad operacional;
- registrar fuente, actor, fecha, direccion, contexto, estado y evidencia;
- permitir relacion con cliente, expediente, decisiones, acciones y resultados.

Este dominio cubre interacciones multicanal con clientes, usuarios, agentes, sistemas o canales externos. No debe absorber la coordinacion interna entre roles de la organizacion.

Marta Voz y Marta Texto pueden compartir continuidad operacional cuando corresponda, pero los canales tecnicos no deben mezclarse en una estructura opaca ni crear expedientes aislados por canal.

#### Mensajeria interna y coordinacion operacional

Representa coordinacion entre roles, areas y responsables dentro de la organizacion.

Responsabilidad conceptual:

- conservar quien informa, quien recibe, que tema se trata y que accion queda pendiente;
- distinguir mensaje interno de comunicacion con cliente;
- relacionar coordinacion con expediente, seguimiento, decision, accion y resultado;
- permitir trazabilidad de responsables y escalaciones.

Este dominio cubre coordinacion operacional interna. No debe confundirse con WhatsApp del cliente, correo al cliente, conversacion de Marta ni otros canales externos. Su frontera conceptual es la colaboracion entre personas, roles o areas responsables de actuar sobre un caso.

#### Documentos

Representa documentos requeridos, solicitados, recibidos, observados, aprobados, rechazados, vencidos o archivados.

Responsabilidad conceptual:

- conservar estado documental y evidencia asociada;
- distinguir declaracion de envio, archivo recibido, interpretacion IA y validacion humana;
- relacionar documento con cliente, reserva, expediente, decision y resultado;
- permitir aprendizaje sobre fricciones documentales.

La evidencia documental respalda el dominio, pero no sustituye el objeto documental ni su ciclo de vida.

#### Pagos y compromisos financieros

Representa pagos, compromisos, montos, vencimientos, comprobantes, atrasos, reprogramaciones, validaciones y riesgos financieros.

Responsabilidad conceptual:

- distinguir promesa de pago, pago recibido y pago validado;
- conservar evidencia financiera;
- relacionar compromisos con reserva, expediente, acciones, decisiones y resultados;
- permitir deteccion de riesgo y aprendizaje sobre formalizacion.

La exigencia de certeza en este dominio debe ser alta cuando afecta decisiones comerciales o financieras.

#### Servicio al cliente, postventa y escalaciones

Representa tickets, reclamos, consultas, garantias, entregas, escalaciones, resoluciones, tiempos de atencion y aprendizajes de servicio.

Responsabilidad conceptual:

- conservar el caso de servicio y sus estados;
- registrar responsables, escalaciones, decisiones, acciones y resultados;
- relacionar servicio con expediente, evidencia y conocimiento institucional;
- convertir recurrencias en aprendizaje organizacional cuando aplique.

Servicio puede conectarse al Expediente Vivo, pero conserva responsabilidad propia.

#### Marketing, campanas y origen comercial

Representa campanas, canales, fuentes de lead, embudos, rendimiento, mensajes comerciales, atribucion y patrones de conversion.

Responsabilidad conceptual:

- relacionar origen comercial con reservas, clientes y resultados;
- distinguir dato de campana, interpretacion, hipotesis, aprendizaje y decision estrategica;
- conservar periodo, fuente, evidencia y nivel de certeza;
- alimentar Intelligence sin ocultar limitaciones.

Este dominio no debe convertir correlaciones en hechos confirmados ni predicciones en resultados.

#### Demo y escenarios simulados

Representa corridas demo, escenarios, datos simulados, inyecciones, calidad de presentacion, certificaciones demo y evidencias de demostracion.

Demo se considera un dominio operacional especial y simulado. Su excepcionalidad consiste en que organiza una operacion de demostracion, no una operacion productiva real.

Responsabilidad conceptual:

- separar datos demo de datos productivos;
- conservar contexto, origen, proposito, escenario y trazabilidad de la simulacion;
- permitir aprendizaje sobre narrativa, presentacion y validacion conceptual;
- impedir que la evidencia demo se trate como evidencia productiva.

Demo puede relacionarse con dominios de negocio para fines de presentacion y validacion conceptual, pero no debe confundirse con esos dominios en produccion. Debe permanecer marcado, aislado y limitado a su naturaleza simulada.

### Dominios estructurales

#### Expediente Vivo

El Expediente Vivo es el eje estructural de continuidad operacional.

Responsabilidad conceptual:

- unir objetos, eventos, evidencias, decisiones, comunicaciones, acciones y resultados alrededor de una continuidad valida;
- preservar timeline, historia, proximos pasos y relacion entre dominios;
- permitir reconstruir que se sabe, de donde salio, quien lo valido, que se decidio, que se ejecuto y que resultado produjo;
- conectar dominios sin absorberlos.

Reglas:

- el canal no modifica el expediente;
- un mensaje nuevo no crea automaticamente un expediente nuevo;
- el expediente no reemplaza reservas, documentos, pagos, comunicaciones, servicio ni actividad comercial;
- el expediente no debe convertirse en bolsa generica;
- el expediente debe preservar relacion con evidencia, transiciones, decisiones y resultados.

#### Evidencia Operacional

La Evidencia Operacional es el dominio estructural que respalda afirmaciones, decisiones, eventos, transiciones, objetos y conocimiento.

Responsabilidad conceptual:

- conservar que respalda una afirmacion;
- declarar fuente, origen, fecha, contexto y relacion con objetos o expedientes;
- distinguir evidencia tecnica, documental, conversacional, humana, transaccional, ejecutiva, demo o productiva;
- permitir auditoria y explicacion.

Reglas:

- evidencia conecta dominios, pero no los reemplaza;
- una evidencia no es necesariamente un hecho confirmado;
- la evidencia debe conservar su relacion con certeza, vigencia, validacion y posible contradiccion;
- la ausencia de evidencia tambien puede ser informacion operacional.

#### Transicion Operacional

La Transicion Operacional es el dominio estructural que conserva cambios relevantes en estado, significado, prioridad, responsable, riesgo, oportunidad, evidencia, decision o resultado de un objeto operacional.

Responsabilidad conceptual:

- explicar como un objeto llego a su estado actual;
- conservar estado anterior, estado nuevo, actor, motivo, fecha, evidencia y contexto;
- vincular recomendacion IA, decision humana, accion ejecutada y resultado observado cuando existan;
- preservar historia sin sobrescribirla.

Reglas:

- no basta guardar el ultimo estado;
- todo cambio relevante debe poder reconstruirse;
- una correccion humana no debe borrar el dato original ni la interpretacion previa cuando tienen valor de auditoria;
- una transicion puede ser corregida, revertida, reemplazada o archivada, pero no debe perder historia.

#### Bitacora Transversal

La Bitacora Transversal es un dominio estructural auxiliar.

Responsabilidad conceptual:

- servir como registro puente o bitacora comun cuando todavia no existe dominio canonico completo;
- conservar eventos operacionales transversales;
- facilitar continuidad incremental;
- relacionarse con Expediente Vivo, evidencia y objetos fuente.

Restricciones:

- no debe convertirse en modelo canonico unico;
- no debe reemplazar reservas, documentos, pagos, conversaciones, llamadas, mensajes, Intelligence, evidencia estructurada ni Expediente Vivo;
- no debe diluir responsabilidades de dominios de negocio;
- debe permanecer subordinada a dominios canonicos y estructuras de memoria.

La Bitacora Transversal tiene valor como puente incremental, pero su uso debe controlarse para evitar que lo transversal borre lo especifico.

## Capacidades transversales

Las capacidades transversales operan sobre dominios de negocio y dominios estructurales.

No son el foco central del mapa de dominios, pero deben reconocerse para evitar que se transformen en dominios falsos.

### Captura operacional

Introduce informacion al sistema desde aplicaciones, canales, formularios, llamadas, mensajes, correos, documentos, acciones humanas, automatizaciones o procesos asistidos por IA.

Debe conservar fuente, actor, canal, fecha/hora, contexto minimo, separacion demo/productiva y posible relacion con Expediente Vivo.

### Interpretacion IA

Analiza eventos, objetos, evidencias o memoria operacional para identificar entidades, riesgos, oportunidades, intenciones, resumenes, patrones, recomendaciones o senales.

No es hecho confirmado. Debe conservar fuente, contexto, evidencia interpretada, proceso o motor cuando aplique, nivel de confianza y estado de revision.

### Recomendacion IA

Propone acciones o prioridades.

No es decision humana. Debe poder ser aceptada, corregida, rechazada o ignorada por una persona responsable cuando tenga impacto operativo.

### Verificacion y decision humana

Confirma, corrige, rechaza, aprueba o decide sobre informacion relevante.

Debe conservar actor, fecha/hora, motivo, evidencia usada y relacion con recomendaciones previas cuando existan.

### Accion ejecutada

Representa intervenciones realizadas por humanos, sistemas, automatizaciones o integraciones.

Una accion ejecutada no equivale a resultado observado. Debe conservar actor, fecha/hora, objeto afectado, motivo, canal, evidencia y relacion con decision o recomendacion cuando corresponda.

### Resultado observado

Registra consecuencias posteriores a una accion.

Permite evaluar si una decision funciono, si una recomendacion fue util, si una accion produjo efecto y si existe aprendizaje potencial.

### Auditoria y revision

Permite reconstruir origen, evidencia, cambios, decisiones, usos, resultados, contradicciones, vigencia y necesidad de correccion o archivo.

La auditoria no es solo control tecnico. Es capacidad conceptual para preservar confianza en la memoria operacional.

## Consumidores y vistas de informacion

Los consumidores y vistas de informacion usan dominios, capacidades y propiedades transversales para producir lectura, presentacion, analisis, priorizacion o explicacion.

No son dominios de negocio ni dominios estructurales por si mismos. Tampoco son simplemente capacidades transversales, porque su responsabilidad principal es consumir memoria operacional y presentar lectura para personas, decisiones o procesos internos.

### H-OperIA Intelligence

H-OperIA Intelligence consume memoria operacional, evidencia, aprendizaje y conocimiento gobernado para producir senales, hallazgos, preguntas, respuestas, recomendaciones y explicaciones.

No reemplaza Marta, no reemplaza dominios de negocio y no crea verdad por si misma.

Toda lectura de Intelligence debe poder explicar su origen, evidencia, certeza, vigencia y relacion con decisiones o resultados observados.

## Propiedades transversales

Las propiedades transversales deben acompanar dominios, relaciones, evidencias, transiciones, conocimiento e Intelligence.

### Trazabilidad

Todo conocimiento relevante debe poder reconstruir origen, fuente, captura, interpretacion, evidencia, validacion, decision, accion, resultado y evolucion.

### Certeza y confianza

La arquitectura debe distinguir hecho confirmado, dato capturado, declaracion, interpretacion IA, hipotesis, recomendacion, prediccion, decision humana y resultado observado.

La confianza puede aumentar, disminuir o quedar provisional segun evidencia, resultados y revisiones.

### Vigencia y obsolescencia

Un conocimiento puede ser verdadero historicamente y no estar vigente operacionalmente.

La arquitectura debe distinguir conocimiento vigente, historico, contradictorio, provisional, obsoleto, retirado y archivado.

### Contradiccion

La contradiccion debe conservarse hasta resolverse.

Ocultar contradicciones produce falsa certeza y debilita Intelligence.

### Responsabilidad

Las decisiones humanas, validaciones y conocimientos institucionales deben conservar responsables.

Un conocimiento sin responsable no debe tratarse como plenamente gobernado.

### Separacion demo/productiva

Demo y produccion deben permanecer claramente separados.

La evidencia demo puede validar narrativa, arquitectura conceptual o presentacion. No puede presentarse como evidencia productiva.

### Explicabilidad

El sistema debe poder explicar que sabe, por que lo sabe, con que evidencia, con que certeza, quien lo valido, como se uso, que decision produjo y que resultado se observo.

## Relaciones logicas entre dominios

Las relaciones logicas describen como se conectan conceptos. No son relaciones fisicas, foreign keys, tablas puente ni constraints.

### Relacion de origen

Conecta una captura, evento o dato inicial con el dominio que lo recibe o interpreta.

Debe responder:

- de donde salio;
- quien o que lo genero;
- cuando ocurrio;
- por que canal ingreso;
- si pertenece a demo o produccion.

### Relacion de pertenencia operacional

Conecta objetos de negocio con una continuidad operacional valida.

Ejemplos conceptuales:

- una reserva pertenece a una continuidad de cliente;
- un documento pertenece a un proceso de formalizacion;
- un pago pertenece a un compromiso financiero de una reserva;
- un ticket pertenece a una situacion de servicio.

Esta relacion no implica absorcion por el Expediente Vivo.

### Relacion de vinculacion al Expediente Vivo

Conecta dominios de negocio y dominios estructurales con el eje de continuidad.

Debe permitir reconstruir:

- que objetos participan en el caso;
- que eventos ocurrieron;
- que evidencias existen;
- que decisiones fueron tomadas;
- que acciones se ejecutaron;
- que resultados se observaron.

El expediente organiza continuidad, pero no sustituye responsabilidades de cada dominio.

### Relacion de evidencia

Conecta evidencia con afirmaciones, objetos, transiciones, decisiones, acciones, resultados, hallazgos o conocimiento.

Debe conservar:

- que respalda;
- de donde proviene;
- nivel de confianza;
- vigencia;
- estado de validacion;
- posibles contradicciones.

### Relacion de interpretacion

Conecta una interpretacion IA con los eventos, evidencias u objetos que analiza.

Debe impedir que la interpretacion se presente como hecho confirmado.

### Relacion de recomendacion y decision

Conecta recomendacion IA, criterio humano y decision responsable.

Debe conservar separacion conceptual:

- recomendacion IA propone;
- humano decide cuando existe impacto operativo;
- decision puede aceptar, modificar o rechazar la recomendacion.

### Relacion de accion y resultado

Conecta decisiones o recomendaciones con acciones ejecutadas y resultados observados.

Debe impedir que ejecutar una accion se confunda con lograr el resultado.

### Relacion de transicion historica

Conecta objetos con los cambios relevantes que explican su evolucion.

Debe permitir reconstruir:

- estado anterior;
- estado nuevo;
- actor;
- motivo;
- evidencia;
- decision relacionada;
- accion ejecutada;
- resultado observado.

### Relacion de aprendizaje

Conecta hechos, experiencias, patrones, resultados observados y conocimiento institucional.

Debe impedir que un hecho aislado se convierta automaticamente en aprendizaje organizacional.

### Relacion de gobernanza

Conecta conocimiento institucional con responsable, vigencia, evidencia, versiones, contradicciones, reemplazos, retiro, archivo y revision.

Debe permitir que el conocimiento evolucione sin perder historia.

### Relacion de consumo por Intelligence

Conecta H-OperIA Intelligence con memoria, evidencia, conocimiento gobernado, dominios y resultados observados.

Debe permitir que toda senal, hallazgo, recomendacion o respuesta ejecutiva explique su origen y su grado de certeza.

## Reglas de relacion logica

### Ninguna relacion debe borrar fuente

Toda relacion debe preservar el origen del dato, evento, interpretacion, evidencia, decision o accion.

### Ninguna relacion debe convertir inferencia en hecho

Una interpretacion IA, hipotesis, prediccion o recomendacion debe conservar su naturaleza.

### Ninguna relacion debe mezclar recomendacion IA con decision humana

La recomendacion puede orientar. La decision responsable pertenece al humano cuando hay impacto operativo.

### Ninguna relacion debe confundir accion ejecutada con resultado observado

Enviar, solicitar, llamar, agendar o escalar no equivale automaticamente a respuesta, recepcion, llamada realizada, cita cumplida o resolucion.

### Ninguna relacion debe mezclar demo y produccion

Los datos demo deben permanecer marcados y separados. Su evidencia no debe presentarse como evidencia productiva.

### Ninguna relacion debe diluir dominios canonicos

Lo transversal no debe borrar lo especifico.

Expediente Vivo, evidencia, transiciones y bitacora pueden conectar dominios, pero no reemplazar su responsabilidad.

### Ninguna relacion debe ocultar contradicciones

Cuando existan fuentes incompatibles, interpretaciones divergentes o evidencia conflictiva, la contradiccion debe conservarse hasta resolverse.

## Relaciones prohibidas o riesgosas

### Expediente Vivo como bolsa generica

Riesgo:

- convertir el expediente en contenedor indiferenciado de todo;
- perder responsabilidad de dominios canonicos;
- impedir auditoria precisa.

Regla:

- el expediente conecta y organiza continuidad, no reemplaza objetos operacionales.

### Evidencia como sustituto del dominio

Riesgo:

- tratar un comprobante como todo el pago;
- tratar una transcripcion como toda la conversacion;
- tratar un mensaje como toda la decision.

Regla:

- evidencia respalda, no sustituye.

### Bitacora Transversal como modelo unico

Riesgo:

- convertir un puente incremental en arquitectura canonica;
- diluir reservas, documentos, pagos, comunicaciones y servicio en registros genericos.

Regla:

- la bitacora transversal debe permanecer auxiliar y subordinada.

### Canal como frontera de memoria

Riesgo:

- crear memorias separadas por WhatsApp, voz, correo, widget o Admin;
- romper continuidad del cliente.

Regla:

- el canal se registra como fuente, no como frontera automatica del conocimiento.

### Intelligence como fuente no trazable

Riesgo:

- presentar senales o recomendaciones sin evidencia;
- amplificar falsa certeza;
- ocultar contradicciones.

Regla:

- Intelligence debe consumir conocimiento trazable y explicar su origen.

### Demo como evidencia productiva

Riesgo:

- confundir simulacion con operacion real;
- extraer aprendizaje productivo desde escenarios no productivos.

Regla:

- demo debe permanecer separado, marcado y contextualizado.

## Criterios de coherencia arquitectonica

SUPABASE-0005 sera coherente si cumple estos criterios:

1. No redefine ACO.
2. No convierte dominios conceptuales en tablas.
3. No convierte nombres candidatos en nombres fisicos definitivos.
4. No trata capacidades transversales como dominios de negocio.
5. No trata propiedades transversales como objetos autonomos.
6. Reconoce dominios estructurales sin permitir que absorban dominios canonicos.
7. Protege Expediente Vivo como eje de continuidad.
8. Protege Evidencia Operacional como soporte explicativo.
9. Protege Transicion Operacional como historia de cambio.
10. Mantiene Bitacora Transversal como auxiliar.
11. Conserva separacion demo/productiva.
12. Conserva fuente, evidencia, certeza, vigencia, contradiccion y responsabilidad.
13. Distingue recomendacion IA, decision humana, accion ejecutada y resultado observado.
14. Permite consumo por Intelligence sin ocultar incertidumbre.
15. Respeta el Principio de Concrecion Progresiva.

## Riesgos doctrinales

### Diseno fisico prematuro

El riesgo principal es convertir dominios y relaciones logicas en tablas, columnas, constraints o migraciones antes de completar la arquitectura conceptual.

Control:

- este documento no autoriza implementacion;
- cualquier traduccion fisica debera ocurrir en documentos posteriores.

### Sobreabstraccion

Existe riesgo de crear categorias conceptuales tan generales que dejen de orientar decisiones.

Control:

- cada dominio debe declarar responsabilidad propia;
- cada relacion debe explicar que conecta y que no reemplaza.

### Duplicidad conceptual

Existe riesgo de que Expediente Vivo, Evidencia, Transicion y Bitacora Transversal se superpongan.

Control:

- Expediente Vivo organiza continuidad;
- Evidencia respalda afirmaciones;
- Transicion explica cambios;
- Bitacora registra auxiliarmente eventos transversales.

### Falsa certeza

Existe riesgo de que la arquitectura parezca resolver fisicamente problemas que solo han sido ordenados conceptualmente.

Control:

- distinguir hecho, inferencia, hipotesis, recomendacion, decision, accion y resultado;
- declarar siempre que este documento es conceptual.

### Contaminacion demo/productiva

Existe riesgo de que escenarios demo se usen como evidencia real.

Control:

- mantener demo como dominio separado, marcado y limitado.

## Que deja preparado SUPABASE-0005

SUPABASE-0005 deja preparada una base conceptual para:

- refinar el modelo logico posterior;
- evaluar inventario remoto futuro con mejor criterio;
- clasificar estructuras existentes sin confundirlas con dominios de negocio;
- decidir que elementos requieren diseno fisico propio en etapas posteriores;
- evitar que bitacoras genericas sustituyan dominios canonicos;
- orientar futuras decisiones de persistencia sin anticipar implementacion.

No deja preparado todavia:

- SQL;
- migraciones;
- diseno fisico;
- nombres definitivos;
- politicas de seguridad;
- RLS;
- indices;
- vistas;
- funciones;
- triggers;
- integraciones;
- cambios de codigo.

## Criterio de cierre

SUPABASE-0005 queda cumplido si permite responder:

- que dominios de negocio debe reconocer la arquitectura conceptual;
- que dominios estructurales organizan memoria, evidencia, historia y continuidad;
- que capacidades transversales operan sobre varios dominios;
- que propiedades transversales deben conservarse en todo el sistema;
- como se relacionan logicamente los dominios sin reemplazarse;
- que relaciones son riesgosas o prohibidas;
- como se protege el Expediente Vivo sin convertirlo en bolsa generica;
- como se protege la Evidencia Operacional sin convertirla en sustituto del dominio;
- como se preservan transiciones, decisiones, acciones y resultados;
- como se mantiene separacion demo/productiva;
- por que nada de lo anterior autoriza implementacion fisica.

El documento queda incompleto si el lector no puede distinguir dominio de negocio, dominio estructural, capacidad transversal y propiedad transversal sin saltar a diseno fisico.

## Anexo A - Hipotesis Arquitectonica en Validacion

Este anexo no forma parte de la doctrina del documento.

Su finalidad es registrar una hipotesis arquitectonica utilizada durante la elaboracion de SUPABASE-0005 y conservar su trazabilidad historica.

No crea una familia documental nueva, no modifica la serie ACO y no convierte la hipotesis en doctrina oficial de H-OperIA.

### Nombre de la hipotesis

Clasificacion de Componentes Arquitectonicos.

### Estado

En validacion.

### Motivo de su utilizacion en SUPABASE-0005

Durante la preparacion de SUPABASE-0005 se detecto que un mapa unico de dominios podia mezclar elementos de naturaleza distinta:

- dominios de negocio;
- estructuras centrales de memoria;
- capacidades que operan transversalmente;
- propiedades que deben acompanar todo el sistema;
- consumidores de informacion como H-OperIA Intelligence.

La hipotesis se utilizo como criterio provisional para ordenar el documento sin convertir capacidades, propiedades o consumidores en dominios falsos.

### Evidencias observadas durante la validacion

#### Ambiguedades resueltas

La hipotesis permitio distinguir que Expediente Vivo, Evidencia Operacional y Transicion Operacional no son simples capacidades transversales, sino dominios estructurales con identidad, ciclo de vida, reglas y relaciones propias.

Tambien permitio distinguir que certeza, vigencia, contradiccion, trazabilidad y separacion demo/productiva son propiedades transversales, no dominios ni objetos de negocio.

#### Mejoras arquitectonicas

La hipotesis mejoro la arquitectura al separar:

- dominios de negocio que representan operacion sustantiva;
- dominios estructurales que preservan memoria, evidencia, continuidad e historia;
- capacidades transversales como captura, interpretacion IA, verificacion humana, auditoria e Intelligence;
- propiedades transversales como certeza, vigencia, contradiccion, responsabilidad y separacion demo/productiva.

Esta separacion redujo el riesgo de que el mapa de dominios se convirtiera en una lista indiferenciada de conceptos.

#### Excepciones detectadas

La Bitacora Transversal requiere tratamiento especial.

Puede entenderse como dominio estructural auxiliar porque tiene responsabilidad conceptual y relaciones propias, pero debe mantenerse bajo restriccion fuerte para no convertirse en modelo canonico unico ni reemplazar dominios de negocio.

H-OperIA Intelligence tambien requiere cuidado: consume y produce lectura sobre informacion, pero no debe clasificarse como dominio base ni como fuente no trazable de verdad.

#### Ajustes requeridos

La hipotesis requiere validacion adicional al finalizar la serie conceptual SUPABASE.

Debe evaluarse si las categorias propuestas son suficientes, si requieren nombres mas precisos, si existen categorias adicionales o si alguna categoria genera confusion.

### Decision pendiente al finalizar la serie conceptual SUPABASE

Al concluir la serie conceptual SUPABASE debera decidirse si esta hipotesis debe:

- mantenerse como criterio local;
- promoverse a doctrina ACO;
- incorporarse al futuro sistema independiente de Gestion del Conocimiento Operacional;
- descartarse si no demuestra utilidad suficiente.

### Nota de gobernanza

La forma definitiva de gestionar este tipo de hipotesis sera definida durante el diseno del sistema independiente de Gestion del Conocimiento Operacional de H-OperIA.

Hasta entonces, esta hipotesis permanece registrada unicamente como hipotesis arquitectonica en validacion dentro de este anexo, sin identificador documental oficial y sin crear una nueva familia documental.

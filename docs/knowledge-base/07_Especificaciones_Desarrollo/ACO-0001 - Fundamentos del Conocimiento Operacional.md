# ACO-0001 - Fundamentos del Conocimiento Operacional

## Estado

Documento fundacional de la familia ACO - Arquitectura del Conocimiento Operacional.

Creado durante Codex AMENA 62 como respuesta a la auditoria arquitectonica de la serie SUPABASE.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas y no autoriza implementacion tecnica.

## Proposito

Definir el marco conceptual que gobierna toda la arquitectura del conocimiento de H-OperIA.

La familia ACO existe porque la arquitectura de H-OperIA ya no puede entenderse solamente como persistencia de datos. H-OperIA necesita una disciplina propia para explicar como una organizacion captura informacion, la interpreta, la convierte en conocimiento, aprende de sus acciones y toma mejores decisiones.

Este documento no habla de tablas, SQL ni Supabase. Define los fundamentos de la disciplina del Conocimiento Operacional.

## Principio rector

H-OperIA no busca almacenar datos por almacenarlos.

H-OperIA busca transformar la operacion diaria de una organizacion en conocimiento util para decidir, actuar, aprender y mejorar.

El conocimiento operacional nace cuando la experiencia de trabajo deja de perderse en conversaciones, formularios, pantallas, mensajes o decisiones aisladas, y se convierte en memoria explicable, reutilizable y accionable.

## Modelo conceptual de evolucion

El conocimiento operacional evoluciona en el siguiente ciclo:

```text
Dato
  -> Informacion
  -> Conocimiento
  -> Memoria
  -> Aprendizaje
  -> Inteligencia
  -> Decision
  -> Accion
  -> Resultado
  -> Nuevo conocimiento
```

Este ciclo no es lineal una sola vez. Es continuo.

Cada resultado genera nueva experiencia. Esa experiencia, si se captura y se interpreta correctamente, vuelve a alimentar la memoria operacional y mejora futuras decisiones.

## Que es un dato

Un dato es una unidad basica de registro.

Puede ser un nombre, una fecha, un monto, un telefono, un estado, un mensaje, una duracion de llamada, un documento recibido, una respuesta, una ubicacion, un identificador o una marca de tiempo.

Un dato por si solo no necesariamente explica nada. Tiene valor potencial, pero todavia no tiene suficiente contexto para orientar una decision.

Ejemplos:

- `Carlos Mendez`.
- `HOP-RES-000784`.
- `5 dias de atraso`.
- `Documento recibido`.
- `WhatsApp enviado`.
- `Riesgo alto`.

Un dato es materia prima. No debe confundirse con conocimiento.

## Que es informacion

Informacion es un dato ubicado en contexto.

Un dato se convierte en informacion cuando se entiende a que pertenece, de donde viene, cuando ocurrio, que representa y por que importa.

Ejemplo:

- Dato: `5 dias de atraso`.
- Informacion: `Carlos Mendez tiene 5 dias de atraso en la prima inicial de la reserva HOP-RES-000784`.

La informacion responde preguntas basicas:

- Que ocurrio?
- A quien le ocurrio?
- Donde ocurrio?
- Cuando ocurrio?
- De donde salio?
- Con que se relaciona?

La informacion permite comprender una situacion, pero todavia no necesariamente indica que debe hacerse.

## Que es conocimiento operacional

Conocimiento operacional es informacion interpretada dentro de una operacion real, con significado suficiente para orientar criterio, decision o accion.

No es solo saber que algo ocurrio. Es entender que implica para la operacion.

Ejemplo:

- Informacion: `Carlos Mendez tiene 5 dias de atraso en la prima inicial`.
- Conocimiento operacional: `El atraso puede comprometer la formalizacion si no se realiza una llamada humana hoy y se aclara el monto pendiente con el decisor familiar`.

El conocimiento operacional conecta:

- hechos;
- contexto;
- patrones;
- riesgos;
- oportunidades;
- responsables;
- consecuencias;
- posibles acciones.

Es conocimiento porque ayuda a actuar mejor.

Es operacional porque nace de la realidad diaria de la organizacion: ventas, clientes, documentos, pagos, mensajes, llamadas, entregas, garantias, servicio, decisiones y resultados.

## Que es memoria operacional

Memoria operacional es la capacidad de una organizacion para conservar conocimiento operacional de manera trazable, consultable y reutilizable.

No es solo guardar archivos ni historiales. Es preservar la continuidad de lo que se sabe, por que se sabe, quien lo valido, que evidencia existe, que decisiones se tomaron y que paso despues.

La memoria operacional debe conservar:

- datos originales relevantes;
- informacion contextualizada;
- interpretaciones;
- evidencias;
- decisiones humanas;
- recomendaciones de IA;
- acciones ejecutadas;
- resultados observados;
- aprendizajes derivados;
- cambios de estado;
- responsables;
- razones.

Sin memoria operacional, la organizacion repite errores, pierde contexto, depende de personas individuales y decide con informacion incompleta.

## Que es aprendizaje operacional

Aprendizaje operacional es el proceso mediante el cual una organizacion transforma resultados y experiencias en mejoras futuras.

Una organizacion aprende cuando no solo registra lo que ocurrio, sino que modifica su forma de operar a partir de lo aprendido.

Ejemplo:

- Se detecta que muchos clientes no envian constancia laboral porque no saben como pedirla.
- El equipo crea una carta modelo para RRHH.
- Los atrasos documentales bajan.
- La carta modelo se vuelve practica institucional.

Eso es aprendizaje operacional.

El aprendizaje operacional requiere:

- experiencia capturada;
- interpretacion;
- evidencia;
- decision;
- accion;
- resultado;
- evaluacion;
- ajuste;
- reutilizacion.

No hay aprendizaje si el resultado no cambia el comportamiento futuro.

## Que es inteligencia operacional

Inteligencia operacional es la capacidad de convertir memoria y aprendizaje en decisiones mejores, mas rapidas y mas explicables.

No es solo analitica ni reporteria. Es lectura contextual de la operacion para orientar accion.

La inteligencia operacional permite:

- detectar riesgos antes de que escalen;
- priorizar esfuerzos;
- explicar causas;
- encontrar patrones;
- recomendar acciones;
- evaluar resultados;
- conectar areas;
- convertir evidencia en criterio;
- apoyar decisiones humanas.

H-OperIA Intelligence es una expresion de esta inteligencia operacional, pero la inteligencia operacional no depende solamente de IA. Tambien depende de evidencia, memoria, juicio humano y aprendizaje organizacional.

## Diferencia entre conocimiento humano y conocimiento generado por IA

### Conocimiento humano

El conocimiento humano nace de experiencia, juicio, responsabilidad, intuicion, contexto social, criterio profesional y comprension de consecuencias.

El ser humano puede asumir responsabilidad, ponderar matices, decidir excepciones, entender relaciones humanas y responder por una decision.

Ejemplos:

- una vendedora sabe que un cliente esta ansioso aunque no lo diga directamente;
- una gerente decide escalar un caso por riesgo reputacional;
- financiera interpreta que un documento es aceptable aunque tenga una imperfeccion menor;
- legal define que una respuesta debe ser autorizada antes de enviarse.

### Conocimiento generado por IA

El conocimiento generado por IA surge de procesar datos, detectar patrones, inferir relaciones, resumir informacion, clasificar riesgos, proponer acciones o explicar tendencias.

La IA puede ayudar a ver lo que esta disperso, recordar contexto, detectar inconsistencias, comparar casos y sugerir proximos pasos.

Pero la IA no debe confundirse con responsabilidad humana. Una recomendacion IA no es decision final.

### Diferencia central

La IA puede interpretar y recomendar.

El humano decide, valida, corrige, asume responsabilidad y comprende el impacto institucional.

La arquitectura de H-OperIA debe conservar ambas cosas:

- la interpretacion generada por IA;
- la decision humana que acepta, corrige o rechaza esa interpretacion.

## Papel de la IA

El papel de la IA en H-OperIA es amplificar la capacidad de interpretar la operacion.

La IA puede:

- leer grandes cantidades de informacion;
- detectar patrones;
- identificar riesgos;
- resumir conversaciones;
- extraer entidades;
- sugerir proximos pasos;
- generar preguntas ejecutivas;
- conectar evidencia dispersa;
- proponer acciones;
- ayudar a explicar decisiones.

La IA no debe:

- sustituir responsabilidad humana;
- prometer resultados;
- negociar por la organizacion sin autorizacion;
- ocultar incertidumbre;
- convertir inferencias en hechos;
- borrar el dato original;
- decidir en asuntos sensibles sin verificacion humana.

La IA es interprete, asistente, analista y acelerador de aprendizaje. No es autoridad final por si sola.

## Papel del ser humano

El ser humano es responsable del criterio, la validacion y la decision.

En H-OperIA, el ser humano:

- valida informacion sensible;
- corrige interpretaciones;
- decide acciones;
- asume responsabilidad;
- interpreta contexto humano;
- define excepciones;
- aprueba respuestas delicadas;
- convierte recomendaciones en practica;
- evalua resultados;
- transforma aprendizaje en cambio organizacional.

El sistema debe estar disenado para fortalecer el juicio humano, no para desplazarlo.

Una organizacion inteligente no es aquella donde la IA decide todo. Es aquella donde humanos e IA colaboran con memoria, evidencia y responsabilidad clara.

## Papel del Expediente Vivo

El Expediente Vivo es el eje de continuidad del conocimiento operacional alrededor de un caso.

Une datos, informacion, conocimiento, memoria, decisiones, evidencias, acciones y resultados relacionados con un cliente, prospecto, reserva, proyecto o proceso operacional.

El Expediente Vivo permite que la organizacion no pierda contexto entre canales, personas, areas y momentos.

Debe responder:

- que se sabe de este caso;
- de donde salio;
- que ha ocurrido;
- que interpreto la IA;
- que decidio el humano;
- que evidencia existe;
- que acciones se ejecutaron;
- que resultado produjeron;
- que se aprendio.

El Expediente Vivo no es solo historial. Es memoria operacional organizada alrededor de una continuidad real.

## Que significa que una organizacion aprenda

Una organizacion aprende cuando convierte experiencia en mejora repetible.

No basta con que una persona aprenda. El aprendizaje debe quedar disponible para la organizacion.

Una organizacion aprende cuando:

- identifica patrones en su operacion;
- entiende causas, no solo sintomas;
- conserva evidencia;
- ajusta procesos;
- mejora guiones, formularios, respuestas o criterios;
- reduce errores repetidos;
- reutiliza buenas practicas;
- evalua si sus decisiones funcionaron;
- incorpora aprendizajes a su memoria colectiva;
- evita depender exclusivamente de memoria individual.

Ejemplo:

Si varias reservas se atrasan por falta de claridad financiera y el equipo crea una rutina de llamada temprana, plantilla de simulacion y seguimiento familiar, la organizacion aprendio.

Si solo resolvio un caso y luego olvido el patron, no aprendio: reacciono.

## Objetivo final de H-OperIA respecto al conocimiento

El objetivo final de H-OperIA es ayudar a las organizaciones a convertir su operacion diaria en conocimiento operacional vivo.

Esto significa:

- capturar informacion sin perder contexto;
- transformar datos en conocimiento util;
- conservar memoria historica;
- hacer explicables las decisiones;
- amplificar el criterio humano con IA;
- detectar patrones y riesgos;
- aprender de resultados;
- mejorar procesos;
- fortalecer la memoria colectiva;
- convertir experiencia en ventaja operacional.

H-OperIA no debe limitarse a digitalizar procesos.

Debe ayudar a que la organizacion piense, recuerde, aprenda y decida mejor.

## Disciplina del Conocimiento Operacional

La Arquitectura del Conocimiento Operacional es la disciplina que define como H-OperIA organiza el ciclo completo de conocimiento dentro de una organizacion.

Esta disciplina estudia y gobierna:

- datos;
- informacion;
- conocimiento;
- memoria;
- aprendizaje;
- inteligencia;
- decisiones;
- acciones;
- resultados;
- evidencia;
- confianza;
- responsabilidad humana;
- interpretacion IA;
- continuidad historica;
- reutilizacion del aprendizaje.

Su unidad central no es la tabla, la pantalla ni el reporte.

Su unidad central es el conocimiento operacional que permite actuar mejor.

## Relacion con la serie SUPABASE

La serie SUPABASE define como preparar el camino hacia persistencia, trazabilidad y modelo fisico futuro.

La familia ACO gobierna el marco conceptual superior: que es conocimiento, como se transforma, como se conserva, como se aprende y como se decide.

Relacion:

- SUPABASE-0001 identifica necesidades derivadas del codigo.
- SUPABASE-0002 define captura e interpretacion.
- SUPABASE-0003 define evolucion y trazabilidad.
- ACO-0001 define los fundamentos del conocimiento operacional que dan sentido a todo lo anterior.

La arquitectura fisica futura debe obedecer la disciplina ACO, no al reves.

## Criterio de cierre

ACO-0001 queda cumplido si establece que H-OperIA no es solamente una plataforma de datos ni una integracion de IA.

H-OperIA es una arquitectura para convertir operacion en conocimiento, conocimiento en memoria, memoria en aprendizaje, aprendizaje en inteligencia, inteligencia en decisiones, decisiones en acciones y acciones en nuevo conocimiento.

Ese ciclo es el fundamento conceptual de toda la plataforma.

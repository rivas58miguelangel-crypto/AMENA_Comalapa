# ACO-0002 - Principios Rectores del Conocimiento Operacional

## Estado

Documento rector de la familia ACO - Arquitectura del Conocimiento Operacional.

Creado durante Codex AMENA 62 como continuacion de ACO-0001.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas y no autoriza implementacion tecnica.

## Proposito

Formalizar los principios rectores que deben gobernar toda captura, interpretacion, memoria, aprendizaje, inteligencia y decision dentro de H-OperIA.

Estos principios aplican a cualquier modulo, aplicacion, canal, agente, flujo, evidencia, expediente, recomendacion, decision o aprendizaje que forme parte del ecosistema H-OperIA.

El documento no define tablas fisicas, migraciones ni SQL. Define criterio arquitectonico.

## Relacion con ACO-0001

ACO-0001 define los fundamentos del Conocimiento Operacional.

ACO-0002 formaliza los principios rectores que deben proteger esos fundamentos en el diseno, evolucion y operacion de H-OperIA.

Si ACO-0001 responde que es conocimiento operacional, ACO-0002 responde que reglas no deben romperse al capturarlo, interpretarlo, conservarlo, usarlo o convertirlo en decisiones.

## Principio 1 - La IA interpreta, recomienda y prioriza; el humano decide

La IA puede analizar datos, detectar patrones, identificar riesgos, resumir conversaciones, proponer proximos pasos y priorizar casos.

Pero la decision operativa pertenece al ser humano cuando existe impacto comercial, financiero, legal, reputacional, documental, relacional o estrategico.

Reglas:

- La IA no debe presentarse como autoridad final.
- Una recomendacion IA debe poder ser aceptada, corregida o rechazada por una persona.
- Toda decision humana relevante debe registrarse como decision, no confundirse con la recomendacion que la antecedio.
- El sistema debe fortalecer el criterio humano, no reemplazarlo.

## Principio 2 - El conocimiento operacional debe ser explicable

Todo conocimiento operacional relevante debe poder explicarse.

El sistema debe responder:

- que se sabe;
- de donde salio;
- cuando ocurrio;
- quien o que lo genero;
- como fue interpretado;
- que evidencia lo respalda;
- quien lo valido;
- como se uso;
- que decision o accion produjo.

Un conocimiento que no puede explicarse no debe tratarse como fundamento suficiente para decisiones sensibles.

## Principio 3 - La evidencia acompana toda decision relevante

Toda decision relevante debe estar acompanada por evidencia suficiente.

La evidencia puede ser documental, conversacional, tecnica, humana, transaccional, ejecutiva, demo o productiva.

Reglas:

- Una decision sin evidencia debe quedar marcada como decision no sustentada o pendiente de respaldo.
- La evidencia debe vincularse al caso, expediente, objeto o accion que respalda.
- La evidencia no debe reemplazar el criterio humano, pero debe hacerlo auditable.
- La ausencia de evidencia tambien es informacion operacional.

## Principio 4 - El dato bruto con valor operacional debe conservarse

Cuando un dato bruto tiene valor operacional, tecnico, legal, historico, explicativo o de auditoria, debe conservarse.

La interpretacion, resumen o clasificacion posterior no debe borrar la forma original del dato.

Ejemplos:

- mensaje original;
- transcripcion de llamada;
- carga documental;
- payload de una reserva;
- respuesta HTTP de un envio;
- nota escrita por una persona;
- salida estructurada de una IA;
- pregunta ejecutiva original.

Conservar el dato bruto permite corregir interpretaciones, auditar decisiones y reconstruir contexto.

## Principio 5 - El Expediente Vivo es el eje de continuidad

El Expediente Vivo es el eje que une eventos, objetos, evidencias, decisiones, comunicaciones, acciones y resultados alrededor de una continuidad operacional valida.

No es solo historial. Es memoria organizada del caso.

Reglas:

- Todo dato relevante debe poder vincularse al Expediente Vivo cuando exista continuidad valida.
- El Expediente Vivo conecta dominios sin sustituirlos.
- El Expediente Vivo debe preservar timeline, evidencias, decisiones y proximos pasos.
- La continuidad del caso debe poder reconstruirse sin depender de memoria conversacional externa.

## Principio 6 - El canal no crea memorias separadas

El canal por el que entra la informacion no debe fragmentar la memoria.

WhatsApp, correo, voz, widget, llamada, formulario, Admin, App Publica, App Vendedoras o cualquier canal futuro deben alimentar la misma continuidad operacional cuando correspondan al mismo caso.

Reglas:

- Marta Voz y Marta Texto pueden usar canales distintos, pero no deben crear expedientes aislados por canal.
- Un cliente no debe tener memorias incompatibles solo porque interactuo por medios diferentes.
- El canal debe registrarse como fuente, no convertirse automaticamente en frontera de conocimiento.

## Principio 7 - La historia importa tanto como el estado actual

El estado actual de un objeto operacional no explica por si solo como se llego ahi.

La memoria operacional debe preservar la secuencia de eventos, interpretaciones, decisiones, acciones y resultados que produjo ese estado.

Reglas:

- No basta saber que un pago esta atrasado; importa desde cuando, por que, que se intento y que respondio el cliente.
- No basta saber que una reserva esta formalizada; importa que evidencias, decisiones y seguimientos la hicieron avanzar.
- El sistema debe conservar historia relevante, no solo ultimo estado.

## Principio 8 - Toda transicion debe ser trazable

Todo cambio relevante debe dejar rastro.

Una transicion debe poder explicar:

- objeto afectado;
- estado anterior;
- estado nuevo;
- actor o sistema que origino el cambio;
- fecha/hora;
- motivo;
- evidencia;
- recomendacion IA si existio;
- decision humana si existio;
- vinculo al Expediente Vivo.

Sin transiciones trazables, la memoria operacional se vuelve una coleccion de estados finales sin explicacion.

## Principio 9 - La incertidumbre debe preservarse, no maquillarse como certeza

La arquitectura debe distinguir hechos, inferencias, hipotesis, recomendaciones, decisiones y resultados.

Cuando exista duda, falta de evidencia, baja confianza, conflicto entre fuentes o interpretacion incompleta, el sistema debe conservar esa incertidumbre.

Reglas:

- Una inferencia no debe presentarse como hecho.
- Una senal no verificada no debe presentarse como decision cerrada.
- Una recomendacion con baja confianza debe mostrar su condicion.
- La incertidumbre bien conservada protege mejores decisiones.

## Principio 10 - Una recomendacion IA no es una decision humana

Una recomendacion IA es una propuesta.

Una decision humana es una aceptacion, correccion, rechazo o aprobacion realizada por una persona responsable.

Reglas:

- Deben registrarse por separado.
- La recomendacion IA debe conservar su fuente, contexto y, cuando sea posible, grado de confianza.
- La decision humana debe conservar usuario, fecha/hora, motivo y consecuencia.
- El sistema debe poder mostrar cuando el humano siguio, modifico o rechazo la recomendacion.

## Principio 11 - Una accion ejecutada no equivale a resultado observado

Ejecutar una accion no significa que se logro el resultado.

Ejemplos:

- Enviar un WhatsApp no significa que el cliente lo leyo.
- Agendar una llamada no significa que la llamada ocurrio.
- Solicitar un documento no significa que el documento fue recibido.
- Recomendar un pago no significa que el pago fue realizado.

Reglas:

- Accion y resultado deben registrarse como momentos distintos.
- El sistema debe poder evaluar si la accion produjo el efecto esperado.
- La diferencia entre accion y resultado alimenta el aprendizaje operacional.

## Principio 12 - Demo y produccion deben permanecer claramente separados

Los datos, evidencias, senales, resultados y aprendizajes demo deben distinguirse de la operacion real.

Reglas:

- Una corrida demo no debe contaminar memoria productiva.
- Un resultado demo no debe presentarse como evidencia real.
- La demo puede generar aprendizaje sobre presentacion, narrativa o validacion conceptual, pero debe marcarse como tal.
- Produccion requiere controles, responsabilidad y evidencia real.

## Principio 13 - Los dominios canonicos no deben diluirse en una estructura generica

Cada dominio operacional importante debe conservar su identidad conceptual.

Reservas, documentos, pagos, conversaciones, llamadas, mensajes internos, seguimientos, evidencias, decisiones, garantias, entregas y senales no deben diluirse en una estructura generica que impida entender su naturaleza.

Reglas:

- Lo transversal no debe borrar lo especifico.
- La memoria comun no debe convertir todos los objetos en notas indistintas.
- El Expediente Vivo conecta dominios, pero no reemplaza la responsabilidad de cada dominio.

## Principio 14 - La evidencia conecta dominios, pero no los reemplaza

La evidencia permite conectar objetos, decisiones y eventos de distintos dominios.

Pero una evidencia no sustituye al objeto que respalda.

Ejemplos:

- Un comprobante respalda un pago, pero no es todo el pago.
- Una transcripcion respalda una conversacion, pero no es toda la relacion con el cliente.
- Un mensaje interno respalda una coordinacion, pero no reemplaza la tarea o decision derivada.

Reglas:

- La evidencia debe vincular, no absorber.
- La evidencia debe conservar fuente y contexto.
- La evidencia debe poder usarse para auditoria y explicacion.

## Principio 15 - El conocimiento es un activo organizacional

El conocimiento operacional no pertenece solo a una pantalla, persona, chat o modulo.

Pertenece a la organizacion y debe poder sobrevivir a cambios de personas, sesiones, canales, herramientas o interfaces.

Reglas:

- La experiencia relevante debe convertirse en memoria reutilizable.
- Las buenas practicas deben poder compartirse.
- Los errores recurrentes deben poder detectarse.
- La organizacion no debe depender solo de memoria individual.

## Principio 16 - El aprendizaje debe retroalimentar decisiones futuras

Aprender significa que la experiencia cambia decisiones futuras.

Si una decision produjo buen resultado, el sistema debe poder detectar, conservar y reutilizar ese aprendizaje.

Si una decision produjo mal resultado, el sistema debe poder registrar la causa, ajustar criterios y prevenir repeticion.

Reglas:

- Los resultados deben evaluarse contra las acciones que los produjeron.
- Las recomendaciones IA deben poder evaluarse con el tiempo.
- Las decisiones humanas deben poder generar aprendizajes institucionales.
- El aprendizaje debe volver al ciclo de inteligencia operacional.

## Principio 17 - Todo nuevo punto de captura debe alimentar la memoria operacional, no crear silos

Cada nuevo modulo, canal, formulario, automatizacion o aplicacion debe integrarse a la memoria operacional.

Reglas:

- Debe conservar fuente, actor, canal y fecha/hora.
- Debe poder vincularse al Expediente Vivo cuando corresponda.
- Debe generar o relacionarse con evidencia.
- Debe permitir interpretacion IA cuando tenga sentido.
- No debe guardar informacion relevante sin ruta de integracion.
- No debe duplicar memoria canonica.

## Principio 18 - El sistema debe explicar que sabe, por que lo sabe, con que evidencia y con que grado de certeza

La arquitectura de H-OperIA debe permitir explicabilidad operacional.

Para cualquier conocimiento relevante, el sistema deberia poder responder:

- que sabe;
- por que lo sabe;
- de que fuente proviene;
- que evidencia existe;
- que tan confiable es;
- que parte fue interpretacion IA;
- que parte fue decision humana;
- que incertidumbre permanece;
- que accion se ejecuto;
- que resultado se observo.

Este principio resume la disciplina ACO: no basta con tener informacion; hay que poder explicar su origen, su calidad, su uso y su consecuencia.

## Uso de estos principios

Estos principios deben usarse para evaluar:

- nuevos modulos;
- nuevos canales;
- nuevos agentes IA;
- nuevas pantallas;
- nuevos flujos de captura;
- nuevas formas de evidencia;
- nuevas decisiones automatizadas o asistidas;
- nuevos modelos de memoria;
- nuevas integraciones;
- nuevos documentos rectores.

Cuando una decision tecnica o funcional contradiga estos principios, debe documentarse explicitamente la excepcion, su motivo, sus riesgos y su mecanismo de control.

## Relacion con la serie SUPABASE

La serie SUPABASE debe obedecer estos principios cuando avance hacia diseno fisico.

En particular:

- no debe convertir el Expediente Vivo en una estructura opaca;
- no debe mezclar demo y produccion;
- no debe perder dato bruto valioso;
- no debe registrar solo estados actuales sin historia;
- no debe confundir recomendacion IA con decision humana;
- no debe diluir dominios canonicos;
- no debe crear persistencia que impida explicar que se sabe y por que se sabe.

## Criterio de cierre

ACO-0002 queda cumplido si establece una brujula clara para toda la arquitectura de conocimiento de H-OperIA.

Cada captura, interpretacion, memoria, aprendizaje, inteligencia y decision debe poder evaluarse contra estos principios.

Si un nuevo desarrollo los cumple, fortalece la memoria operacional.

Si los rompe, crea deuda de conocimiento.

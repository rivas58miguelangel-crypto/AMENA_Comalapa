# ACO-0004 - Taxonomia del Conocimiento Operacional

## Estado

Documento rector de la familia ACO - Arquitectura del Conocimiento Operacional.

Creado durante Codex AMENA 62 como continuacion de ACO-0001, ACO-0002 y ACO-0003.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas y no autoriza implementacion tecnica.

## Proposito

Definir y clasificar los tipos de conocimiento que H-OperIA puede capturar, interpretar, conservar, aprender y utilizar.

La taxonomia del conocimiento operacional permite distinguir naturalezas distintas de conocimiento sin mezclarlas en una sola categoria generica.

El documento no habla de SQL, tablas fisicas ni migraciones.

## Que es una taxonomia del conocimiento operacional

Una taxonomia del conocimiento operacional es una clasificacion conceptual de los diferentes tipos de conocimiento que existen dentro de la operacion de una organizacion.

Su funcion es ordenar la memoria operacional para que H-OperIA pueda responder:

- que tipo de conocimiento es;
- de donde proviene;
- que tan confiable suele ser;
- como se relaciona con el Expediente Vivo;
- para que sirve en la inteligencia operacional;
- como convive con otros tipos de conocimiento.

Una taxonomia no convierte el conocimiento en compartimentos cerrados. Un mismo evento puede producir varios tipos de conocimiento al mismo tiempo.

Ejemplo:

Una llamada de Marta puede generar conocimiento del cliente, conocimiento comercial, conocimiento financiero, conocimiento generado por IA, conocimiento temporal y evidencia historica.

## Principio rector

Los tipos de conocimiento pueden coexistir sin reemplazarse entre si.

Un conocimiento comercial no reemplaza el conocimiento financiero.

Una interpretacion IA no reemplaza la confirmacion humana.

Un dato historico no reemplaza un dato vigente.

Una prediccion no reemplaza un resultado observado.

H-OperIA debe conservar la naturaleza de cada conocimiento para usarlo correctamente.

## Clasificacion inicial de tipos de conocimiento

Esta clasificacion es inicial y podra ampliarse conforme madure la arquitectura del conocimiento operacional.

## 1. Conocimiento del cliente

### Definicion

Conocimiento sobre una persona, familia, empresa, comprador, prospecto o usuario que interactua con la organizacion.

Incluye identidad, preferencias, necesidades, objeciones, historial, respuestas, compromisos, sensibilidad, decisores y contexto relacional.

### Origen

- App Publica de Reservas.
- Marta Voz.
- Marta Texto.
- WhatsApp.
- Correo.
- App Vendedoras.
- Servicio al cliente.
- Documentos.
- Pagos.
- Declaraciones humanas.

### Ejemplos

- El cliente prefiere apartamento de dos habitaciones.
- El cliente necesita incluir a su esposa en la decision.
- El cliente tiene duda financiera recurrente.
- El cliente responde mejor por WhatsApp que por correo.
- El cliente manifesto inconformidad por fecha de entrega.

### Nivel tipico de confianza

Variable.

Puede ser alto cuando proviene de documentos o acciones confirmadas. Puede ser probable o incierto cuando proviene de inferencias, mensajes ambiguos o interpretaciones IA.

### Relacion con el Expediente Vivo

Es uno de los nucleos principales del Expediente Vivo.

El Expediente Vivo debe conservar la continuidad del conocimiento del cliente entre canales, areas y momentos.

### Utilidad para la inteligencia operacional

Permite personalizar seguimiento, priorizar riesgos, detectar oportunidades, evitar repeticion de preguntas y mejorar decisiones comerciales o de servicio.

## 2. Conocimiento del proyecto

### Definicion

Conocimiento sobre el proyecto, producto, unidad, inventario, etapa, disponibilidad, avance, ubicacion, precio, condiciones, entregas, amenidades y promesas operativas.

### Origen

- Inventario.
- App Publica de Reservas.
- Admin / Centro de Mando.
- Construccion.
- Marketing.
- Documentacion del proyecto.
- Reportes de avance.
- Centro Demo.

### Ejemplos

- Torre 3 tiene avance mayor que Torre 5.
- Unidad A704 esta reservada.
- Casa Aura pertenece a Sector 05, Manzana 3.
- El proyecto tiene amenidades en fase de construccion.
- Una unidad no debe ofrecerse como disponible sin validacion.

### Nivel tipico de confianza

Debe aspirar a alto o confirmado, porque afecta promesas comerciales y decisiones del cliente.

Si proviene de demo, proyeccion o informacion publica no validada, debe marcarse con menor certeza.

### Relacion con el Expediente Vivo

Se vincula al expediente cuando un cliente o prospecto interactua con un proyecto, unidad o inventario especifico.

### Utilidad para la inteligencia operacional

Permite evitar promesas incorrectas, explicar avances, cruzar ventas con inventario y orientar decisiones de direccion comercial.

## 3. Conocimiento comercial

### Definicion

Conocimiento sobre ventas, seguimiento, embudos, vendedoras, objeciones, conversion, campañas, canales, oportunidades, prioridades y acciones comerciales.

### Origen

- App Vendedoras.
- Marketing.
- Mensajeria entre el Equipo.
- H-OperIA Intelligence.
- Reservas.
- Marta.
- Reportes humanos.
- Campanas.

### Ejemplos

- Instagram genera volumen, pero menor formalizacion.
- Referidos convierten mejor.
- Una vendedora tiene seguimientos vencidos.
- Un cliente necesita llamada humana antes de avanzar.
- Una objecion frecuente es el monto de prima.

### Nivel tipico de confianza

Medio a alto, dependiendo de evidencia, fuente y actualidad.

Los reportes humanos y patrones estadisticos deben conservar su fuente y periodo.

### Relacion con el Expediente Vivo

Se vincula mediante seguimientos, tareas, decisiones de vendedoras, interacciones y resultados de conversion.

### Utilidad para la inteligencia operacional

Permite priorizar equipo, mejorar campanas, detectar cuellos de botella y convertir experiencia comercial en aprendizaje reutilizable.

## 4. Conocimiento documental

### Definicion

Conocimiento sobre documentos requeridos, recibidos, observados, aprobados, rechazados, vencidos o faltantes.

### Origen

- App de documentos.
- Cargas del cliente.
- App Vendedoras.
- Financiera.
- Legal.
- Marta.
- Correo.
- WhatsApp.

### Ejemplos

- DUI recibido pero borroso.
- Constancia laboral pendiente.
- Comprobante incompleto.
- Documento aprobado por financiera.
- Checklist documental genera friccion.

### Nivel tipico de confianza

Alto cuando existe documento y validacion humana.

Medio o no verificado cuando solo existe declaracion de envio o interpretacion IA.

### Relacion con el Expediente Vivo

Forma parte de la continuidad del caso y puede bloquear o habilitar formalizacion.

### Utilidad para la inteligencia operacional

Permite detectar fricciones, automatizar recordatorios, priorizar revisiones y mejorar plantillas o instrucciones.

## 5. Conocimiento financiero

### Definicion

Conocimiento sobre pagos, compromisos, montos, atrasos, comprobantes, validaciones, capacidad, dudas financieras, reprogramaciones y riesgos economicos.

### Origen

- App de pagos.
- Financiera.
- Declaraciones del cliente.
- Comprobantes.
- Marta.
- Vendedoras.
- Correo.
- WhatsApp.
- H-OperIA Intelligence.

### Ejemplos

- Cliente tiene prima pendiente.
- Pago parcial recibido.
- Comprobante requiere validacion.
- Cliente necesita simulacion bancaria.
- Atraso de cinco dias incrementa riesgo de formalizacion.

### Nivel tipico de confianza

Debe tratarse con alta exigencia.

Un monto declarado por cliente no equivale a pago confirmado. Un pago solo debe considerarse confirmado cuando existe validacion adecuada.

### Relacion con el Expediente Vivo

Es central para reservas, formalizacion, seguimiento y decisiones de riesgo.

### Utilidad para la inteligencia operacional

Permite priorizar cobros, detectar riesgo, coordinar financiera y ventas, y evaluar salud de ingresos.

## 6. Conocimiento operativo

### Definicion

Conocimiento sobre procesos, tareas, responsables, estados, tiempos, escalaciones, acciones ejecutadas y coordinacion entre areas.

### Origen

- Admin / Centro de Mando.
- Mensajeria entre el Equipo.
- App Vendedoras.
- Servicio al cliente.
- Postventa.
- Entregas.
- Garantias.
- Automatizaciones.

### Ejemplos

- Un ticket fue escalado a legal.
- Una tarea esta vencida.
- Un responsable cambio.
- Una accion fue ejecutada pero no produjo respuesta.
- Una garantia requiere inspeccion.

### Nivel tipico de confianza

Medio a alto cuando proviene de acciones registradas por sistema o responsables humanos.

Debe revisarse si proviene de notas incompletas o estados no actualizados.

### Relacion con el Expediente Vivo

Conecta acciones, responsables y resultados alrededor del caso.

### Utilidad para la inteligencia operacional

Permite mejorar coordinacion, detectar cuellos de botella, medir cumplimiento y convertir operacion en aprendizaje.

## 7. Conocimiento estrategico

### Definicion

Conocimiento que orienta decisiones de direccion, priorizacion, enfoque comercial, riesgos de negocio, oportunidades, patrones de mercado y mejora organizacional.

### Origen

- H-OperIA Intelligence.
- Tableros ejecutivos.
- Resultados comerciales.
- Patrones de expedientes.
- Campanas.
- Finanzas.
- Servicio.
- Aprendizajes acumulados.

### Ejemplos

- Referidos tienen mejor conversion que pauta digital.
- La documentacion es el principal cuello de botella de formalizacion.
- Vendedoras con mejor uso de Marta logran respuestas mas rapidas.
- Cierto sector concentra ansiedad por avance de construccion.

### Nivel tipico de confianza

Depende de la calidad de las fuentes y amplitud de evidencia.

Debe distinguir analisis confirmado, hipotesis ejecutiva y recomendacion estrategica.

### Relacion con el Expediente Vivo

Puede agregarse desde muchos expedientes para detectar patrones, sin perder posibilidad de volver a casos fuente.

### Utilidad para la inteligencia operacional

Permite dirigir mejor, priorizar recursos, ajustar procesos y aprender a nivel organizacional.

## 8. Conocimiento generado por IA

### Definicion

Conocimiento producido o interpretado por modelos o procesos de IA a partir de datos, eventos, documentos, conversaciones o patrones.

### Origen

- Marta.
- H-OperIA Intelligence.
- Analisis automatizados.
- Resumenes.
- Clasificaciones.
- Deteccion de riesgos.
- Predicciones.

### Ejemplos

- Riesgo financiero moderado.
- Intencion de compra alta.
- Recomendacion de llamada humana.
- Resumen de conversacion.
- Deteccion de patron documental.

### Nivel tipico de confianza

Variable.

Debe conservar nivel de certeza, fuente, version del proceso cuando aplique, evidencia interpretada y estado de verificacion humana.

### Relacion con el Expediente Vivo

Alimenta el expediente como interpretacion, recomendacion o senal, pero no reemplaza hechos confirmados ni decisiones humanas.

### Utilidad para la inteligencia operacional

Acelera lectura, priorizacion, deteccion de patrones y aprendizaje; debe usarse con explicabilidad y control humano.

## 9. Conocimiento confirmado por humanos

### Definicion

Conocimiento validado, corregido, aprobado o decidido por una persona responsable.

### Origen

- Vendedoras.
- Gerentes.
- Financiera.
- Legal.
- Servicio.
- Direccion.
- Administradores.

### Ejemplos

- Financiera aprueba documento.
- Gerencia decide escalar caso.
- Vendedora confirma que el cliente requiere llamada.
- Legal valida respuesta sensible.
- Servicio cierra ticket.

### Nivel tipico de confianza

Alto cuando el humano tiene autoridad, contexto y evidencia suficiente.

Debe conservar actor, motivo, fecha/hora y evidencia usada.

### Relacion con el Expediente Vivo

Es clave para convertir interpretaciones o recomendaciones en decisiones responsables.

### Utilidad para la inteligencia operacional

Permite evaluar criterio humano, aprender de decisiones y distinguir autoridad de inferencia automatizada.

## 10. Conocimiento historico

### Definicion

Conocimiento que explica lo que ocurrio en el pasado, aunque ya no este activo como estado vigente.

### Origen

- Transiciones.
- Eventos anteriores.
- Expedientes cerrados.
- Decisiones pasadas.
- Resultados observados.
- Evidencia archivada.

### Ejemplos

- Una reserva estuvo en riesgo antes de formalizarse.
- Un cliente habia rechazado una opcion inicial.
- Una campana funciono durante cierto periodo.
- Un documento fue observado antes de aprobarse.

### Nivel tipico de confianza

Puede ser alto si esta bien trazado. Su riesgo principal no es falsedad, sino uso fuera de contexto o vigencia.

### Relacion con el Expediente Vivo

Forma la memoria del caso y permite explicar como se llego al estado actual.

### Utilidad para la inteligencia operacional

Permite reconstruir decisiones, aprender de procesos y evitar repetir errores.

## 11. Conocimiento predictivo

### Definicion

Conocimiento orientado a estimar eventos futuros, probabilidades, riesgos, tendencias o resultados esperados.

### Origen

- H-OperIA Intelligence.
- Analisis estadistico.
- Patrones historicos.
- Modelos IA.
- Indicadores operativos.

### Ejemplos

- Probabilidad de formalizacion.
- Riesgo de atraso.
- Posible abandono del cliente.
- Tendencia de conversion por canal.
- Estimacion de respuesta a campana.

### Nivel tipico de confianza

Nunca debe tratarse como confirmado.

Puede ser probable, incierto o altamente confiable segun evidencia, modelo, periodo y consistencia.

### Relacion con el Expediente Vivo

Puede alimentar alertas, prioridades y recomendaciones, pero debe conservarse como prediccion, no como hecho.

### Utilidad para la inteligencia operacional

Permite anticipar riesgos, priorizar acciones y medir si las predicciones se cumplen para mejorar aprendizaje.

## 12. Conocimiento temporal

### Definicion

Conocimiento cuyo valor depende fuertemente del tiempo, vigencia, plazo, secuencia o momento operacional.

### Origen

- Reservas.
- Pagos.
- Documentos.
- Campanas.
- Seguimientos.
- Entregas.
- Garantias.
- Eventos de canal.

### Ejemplos

- Pago vence hoy.
- Documento esta vencido.
- Oferta aplica hasta cierta fecha.
- Cliente debe recibir llamada antes de las 5 PM.
- Estado de disponibilidad puede cambiar.

### Nivel tipico de confianza

Depende de actualidad.

Puede ser confirmado y aun asi volverse obsoleto rapidamente.

### Relacion con el Expediente Vivo

Define urgencias, vencimientos, riesgos y prioridades dentro del caso.

### Utilidad para la inteligencia operacional

Permite priorizar tareas, prevenir vencimientos y evitar decisiones basadas en informacion caduca.

## 13. Conocimiento colectivo

### Definicion

Conocimiento que pertenece a la organizacion, no solo a una persona, pantalla o modulo.

Surge de patrones repetidos, buenas practicas, errores aprendidos, criterios compartidos y experiencia acumulada.

### Origen

- Multiples expedientes.
- Decisiones humanas repetidas.
- Resultados observados.
- Recomendaciones evaluadas.
- Practicas institucionales.
- Aprendizajes de equipos.

### Ejemplos

- Los clientes entienden mejor documentos cuando reciben carta modelo.
- Referidos requieren menos educacion inicial.
- Ciertas objeciones financieras deben atenderse con llamada humana.
- Un tipo de garantia necesita respuesta estandar validada.

### Nivel tipico de confianza

Crece con repeticion, evidencia, resultados y validacion organizacional.

Debe revisarse periodicamente para evitar obsolescencia.

### Relacion con el Expediente Vivo

Nace de muchos expedientes y puede volver a ellos como criterio, recomendacion o practica mejorada.

### Utilidad para la inteligencia operacional

Permite que la organizacion aprenda, estandarice buenas practicas y reduzca dependencia de memoria individual.

## Coexistencia de tipos de conocimiento

Diferentes tipos de conocimiento pueden coexistir sobre el mismo caso sin reemplazarse.

Ejemplo:

Un cliente dice por WhatsApp que pagara manana.

Ese evento puede generar:

- conocimiento del cliente: el cliente tiene intencion de continuar;
- conocimiento financiero: existe compromiso de pago pendiente;
- conocimiento temporal: el compromiso vence manana;
- conocimiento generado por IA: riesgo moderado si no hay comprobante;
- conocimiento comercial: la vendedora debe dar seguimiento;
- conocimiento historico: quedara registro de la promesa;
- evidencia: mensaje original;
- conocimiento predictivo: probabilidad de atraso si no responde;
- conocimiento confirmado por humanos: cuando financiera valide o rechace el pago.

Ninguno reemplaza a los demas. Cada uno cumple una funcion distinta.

## Un evento puede generar multiples objetos y tipos de conocimiento

Un mismo evento puede producir varios objetos operacionales y varios tipos de conocimiento.

Ejemplo: una llamada de Marta Voz.

Puede generar objetos:

- llamada;
- transcripcion;
- resumen;
- intencion detectada;
- recomendacion;
- tarea de seguimiento;
- senal de riesgo;
- evidencia;
- transicion del expediente.

Y puede generar conocimiento:

- del cliente;
- comercial;
- financiero;
- temporal;
- generado por IA;
- predictivo;
- historico;
- colectivo si se repite como patron.

Por eso la arquitectura debe permitir multiplicidad sin duplicacion desordenada.

## Reglas de uso de la taxonomia

La taxonomia debe usarse para:

- clasificar conocimiento nuevo;
- evaluar confianza y certeza;
- decidir que requiere verificacion humana;
- organizar memoria operacional;
- evitar que inferencias se traten como hechos;
- detectar conocimiento obsoleto;
- alimentar inteligencia operacional;
- convertir experiencia en aprendizaje colectivo.

Reglas:

- Todo conocimiento relevante debe poder clasificarse al menos parcialmente.
- La clasificacion puede ser multiple.
- La clasificacion no reemplaza la evidencia.
- La clasificacion debe conservar fuente y nivel de certeza.
- Un tipo de conocimiento no debe borrar otro.

## Relacion con ACO-0001, ACO-0002 y ACO-0003

ACO-0001 define los fundamentos del Conocimiento Operacional: dato, informacion, conocimiento, memoria, aprendizaje, inteligencia, decision, accion, resultado y nuevo conocimiento.

ACO-0002 define los principios rectores que protegen la memoria operacional y la responsabilidad humana.

ACO-0003 define calidad, confianza, certeza, vigencia y confiabilidad del conocimiento operacional.

ACO-0004 define la taxonomia: los tipos de conocimiento que H-OperIA debe reconocer, conservar, interpretar y utilizar.

La secuencia conceptual es:

```text
ACO-0001 -> fundamentos
ACO-0002 -> principios
ACO-0003 -> calidad y certeza
ACO-0004 -> tipos de conocimiento
```

## Criterio de cierre

ACO-0004 queda cumplido si permite entender que H-OperIA no maneja un solo tipo de conocimiento.

La operacion produce conocimiento de cliente, proyecto, comercio, documentos, finanzas, operacion, estrategia, IA, humanos, historia, prediccion, tiempo y colectivo.

La arquitectura debe reconocer esas diferencias para usar cada conocimiento de manera correcta, explicable y responsable.

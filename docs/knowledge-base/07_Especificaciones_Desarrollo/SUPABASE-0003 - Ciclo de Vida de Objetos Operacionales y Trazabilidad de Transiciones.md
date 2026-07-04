# SUPABASE-0003 - Ciclo de Vida de Objetos Operacionales y Trazabilidad de Transiciones

## Estado

Documento conceptual creado durante Codex AMENA 62.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas, no elimina tablas y no autoriza implementacion fisica.

Su funcion es definir como evolucionan los objetos operacionales dentro de la memoria operacional de H-OperIA, conservando la historia de sus transiciones en lugar de sobrescribirla.

## Restricciones operativas

Durante la elaboracion y aplicacion de este documento rigen estas restricciones:

- No modificar codigo.
- No tocar Supabase.
- No ejecutar migraciones.
- No crear tablas.
- No eliminar tablas.
- No hacer commit sin autorizacion posterior.

Cualquier referencia a eventos, transiciones, historicos, auditoria o tablas futuras es conceptual. Su traduccion a modelo fisico requiere inventario remoto, respaldo, diseno SQL, validacion humana y plan de rollback.

## Objetivo

Definir el ciclo de vida conceptual de los objetos operacionales de H-OperIA y las reglas de trazabilidad que deben cumplirse cuando esos objetos cambian.

El objetivo no es disenar tablas fisicas todavia. El objetivo es fijar una regla metodologica: la memoria operacional no debe perder historia.

## Principio rector

Los objetos operacionales no son registros estaticos.

Evolucionan mediante:

- eventos brutos;
- decisiones humanas;
- recomendaciones de IA;
- acciones automatizadas;
- integraciones externas;
- cambios de estado;
- correcciones;
- verificaciones;
- evidencias nuevas;
- resultados observados.

Por tanto, el sistema no debe limitarse a guardar el ultimo estado. Debe poder reconstruir como, cuando, por que y por quien un objeto llego a su estado actual.

## Filosofia de conservacion historica

La memoria operacional de H-OperIA debe cumplir tres principios:

1. No perder la historia.
   - Un cambio relevante no debe borrar el contexto anterior.
   - El estado actual debe entenderse como resultado de una secuencia.

2. No sobrescribir sin trazabilidad.
   - Si un valor cambia, debe existir una transicion que explique el cambio.
   - La correccion humana no debe ocultar el dato capturado ni la interpretacion IA previa cuando estos tengan valor de auditoria.

3. Registrar transiciones, causas, actores, contexto y evidencia.
   - Toda evolucion relevante debe dejar rastro comprensible.
   - La trazabilidad debe permitir auditoria tecnica, operativa, humana y ejecutiva.

La conservacion historica no significa guardar ruido sin criterio. Significa preservar los cambios relevantes que explican decisiones, riesgos, compromisos, evidencias, estados y resultados.

## Concepto de transicion operacional

Una Transicion Operacional es todo cambio relevante que afecta el significado, estado, prioridad, responsable, riesgo, oportunidad, evidencia, decision o resultado de un objeto operacional.

Puede ocurrir sobre:

- una reserva;
- un expediente vivo;
- un cliente o prospecto;
- un documento;
- un pago o compromiso financiero;
- una conversacion;
- una llamada;
- un mensaje interno;
- un seguimiento comercial;
- una senal de Intelligence;
- una evidencia operacional;
- una corrida demo;
- una decision humana;
- una accion ejecutada.

Ejemplos:

- una reserva pasa de iniciada a validada;
- un documento pasa de esperado a recibido;
- un pago pasa de pendiente a atrasado;
- una conversacion genera una tarea humana;
- Marta detecta intencion alta;
- Intelligence eleva un riesgo de medio a alto;
- una vendedora confirma que la recomendacion IA fue correcta;
- un ticket se escala a legal;
- una corrida demo pasa de generada a aprobada;
- una evidencia se vincula a un hallazgo ejecutivo.

## Regla central de trazabilidad

Todo cambio relevante debe registrar como minimo:

- objeto afectado;
- estado anterior;
- estado nuevo;
- quien o que origino el cambio;
- fecha/hora;
- motivo;
- evidencia;
- si hubo recomendacion IA;
- si hubo decision humana;
- vinculo al Expediente Vivo.

Cuando aplique, tambien debe registrar:

- fuente o punto de captura;
- canal;
- usuario humano;
- sistema o automatizacion;
- version del motor IA;
- confianza de la interpretacion;
- entidad fuente;
- objeto resultante;
- impacto esperado;
- resultado observado;
- si el cambio fue corregido, revertido o archivado.

## Diferencias conceptuales obligatorias

El sistema debe diferenciar claramente seis conceptos.

### Evento bruto

Informacion capturada originalmente, sin perder su forma inicial.

Ejemplo: payload de reserva, texto de WhatsApp, transcripcion de llamada, archivo recibido, respuesta HTTP, nota escrita por vendedora.

### Interpretacion IA

Lectura que la IA hace sobre uno o varios eventos brutos.

Ejemplo: identifica intencion de compra alta, documentos pendientes, riesgo financiero moderado o necesidad de llamada humana.

### Recomendacion IA

Propuesta accionable generada por IA a partir de la interpretacion.

Ejemplo: llamar antes de las 5 PM, enviar checklist documental, escalar a financiera, preparar correo ejecutivo.

### Decision humana

Confirmacion, correccion, rechazo o aprobacion realizada por una persona.

Ejemplo: la vendedora decide llamar, financiera rechaza un documento, gerencia aprueba una respuesta, legal solicita escalar.

### Accion ejecutada

Intervencion realizada por humano, sistema o automatizacion.

Ejemplo: enviar WhatsApp, registrar llamada, agendar cita, subir documento, cambiar estado, crear ticket.

### Resultado observado

Consecuencia posterior a la accion.

Ejemplo: cliente responde, documento llega, pago se completa, cita se realiza, riesgo baja, reserva avanza, ticket se resuelve.

Estos conceptos no deben mezclarse. Una recomendacion IA no es decision humana. Una decision humana no es necesariamente accion ejecutada. Una accion ejecutada no garantiza resultado observado.

## Ciclos de vida minimos

Los siguientes ciclos son conceptuales. No definen tablas fisicas ni estados definitivos de base de datos.

### Reserva

Estados minimos sugeridos:

- iniciada;
- recibida;
- en validacion;
- validada;
- en seguimiento;
- formalizada;
- cancelada;
- archivada.

Transiciones relevantes:

- seleccion de unidad;
- confirmacion de datos de contacto;
- asignacion de vendedora;
- envio de confirmacion;
- vinculacion con Expediente Vivo;
- deteccion de riesgo;
- validacion humana;
- formalizacion o cancelacion.

### Expediente Vivo

Estados minimos sugeridos:

- creado;
- activo;
- en seguimiento;
- en riesgo;
- en revision humana;
- estabilizado;
- cerrado operacionalmente;
- archivado.

Transiciones relevantes:

- nueva reserva asociada;
- nueva conversacion;
- nuevo documento;
- nuevo pago;
- nueva evidencia;
- nueva senal de Intelligence;
- cambio de responsable;
- decision humana relevante;
- cierre o archivo.

### Cliente / prospecto

Estados minimos sugeridos:

- prospecto;
- interesado;
- reservante;
- cliente en formalizacion;
- cliente activo;
- cliente en postventa;
- cliente archivado.

Transiciones relevantes:

- captura inicial;
- enriquecimiento de perfil;
- respuesta a campana;
- inicio de reserva;
- formalizacion;
- cambio de datos de contacto;
- vinculacion con decisor secundario;
- cambio de prioridad.

### Documento

Estados minimos sugeridos:

- requerido;
- solicitado;
- recibido;
- en revision;
- observado;
- aprobado;
- rechazado;
- vencido;
- archivado.

Transiciones relevantes:

- solicitud enviada;
- carga recibida;
- interpretacion IA de calidad o vigencia;
- revision humana;
- observacion;
- reenvio;
- aprobacion;
- rechazo.

### Pago / compromiso financiero

Estados minimos sugeridos:

- esperado;
- comprometido;
- pendiente;
- parcial;
- recibido;
- en validacion;
- validado;
- atrasado;
- reprogramado;
- cancelado;
- archivado.

Transiciones relevantes:

- compromiso creado;
- fecha limite asignada;
- recordatorio enviado;
- comprobante recibido;
- validacion financiera;
- atraso detectado;
- reprogramacion;
- pago completado.

### Conversacion

Estados minimos sugeridos:

- iniciada;
- en curso;
- pausada;
- requiere respuesta humana;
- resumida;
- cerrada;
- archivada.

Transiciones relevantes:

- mensaje entrante;
- respuesta saliente;
- intencion detectada;
- cambio de canal;
- escalamiento humano;
- resumen generado;
- accion derivada.

### Mensaje interno

Estados minimos sugeridos:

- creado;
- enviado;
- recibido;
- leido;
- accion requerido;
- atendido;
- cerrado;
- archivado.

Transiciones relevantes:

- envio entre roles;
- asignacion de responsable;
- cambio de prioridad;
- respuesta;
- accion ejecutada;
- cierre.

### Seguimiento comercial

Estados minimos sugeridos:

- creado;
- asignado;
- pendiente;
- en ejecucion;
- completado;
- requiere escalamiento;
- vencido;
- archivado.

Transiciones relevantes:

- deteccion de necesidad;
- recomendacion IA;
- validacion de vendedora;
- llamada realizada;
- mensaje enviado;
- resultado registrado;
- proximo paso creado;
- escalamiento.

### Senal de Intelligence

Estados minimos sugeridos:

- detectada;
- pendiente de verificacion;
- visible;
- reconocida;
- en accion;
- resuelta;
- descartada;
- archivada.

Transiciones relevantes:

- generacion por IA;
- vinculacion a evidencia;
- revision humana;
- cambio de severidad;
- conversion en accion;
- resolucion;
- descarte documentado.

### Evidencia operacional

Estados minimos sugeridos:

- capturada;
- vinculada;
- visible;
- verificada;
- observada;
- reemplazada;
- archivada.

Transiciones relevantes:

- captura desde punto de origen;
- vinculacion a objeto;
- vinculacion a expediente;
- uso en hallazgo;
- verificacion humana;
- correccion;
- archivo.

### Corrida Demo

Estados minimos sugeridos:

- borrador;
- generada;
- auditada;
- con rechazos;
- regenerada;
- aprobada;
- inyectada;
- presentada;
- archivada.

Transiciones relevantes:

- definicion de empresa/proyecto/escenario;
- generacion de datos simulados;
- auditoria de calidad;
- regeneracion de rechazados;
- aprobacion;
- inyeccion en Centro Demo;
- presentacion ejecutiva;
- cierre y archivo.

## Ejemplo narrativo de reconstruccion historica

Una venta debe poder reconstruirse historicamente de principio a fin.

Ejemplo:

1. Reserva inicial.
   - La App Publica de Reservas captura nombre, telefono, email, unidad seleccionada, fuente y estado inicial.
   - Se conserva el evento bruto de reserva.
   - Se crea o vincula el Expediente Vivo.

2. Confirmacion y primer seguimiento.
   - El sistema envia confirmacion por WhatsApp y correo.
   - Se registran eventos de envio, destinatarios, estado y evidencia.
   - El expediente muestra que la reserva fue recibida y que el cliente fue contactado.

3. Interaccion con Marta Voz.
   - Marta llama o recibe llamada mediante Vapi.
   - Se conserva transcripcion, `callId`, duracion, estado y structured output.
   - La IA interpreta intencion alta, duda financiera y documentos pendientes.
   - Se genera recomendacion: llamada humana y checklist documental.

4. Revision de vendedora.
   - La vendedora revisa la recomendacion IA.
   - Confirma que el caso requiere llamada humana.
   - Registra decision humana y proximo paso.
   - El seguimiento comercial cambia de pendiente a en ejecucion.

5. Documentos.
   - El cliente envia DUI y comprobante, pero falta constancia laboral.
   - La IA detecta documento pendiente y posible friccion.
   - El equipo valida que debe reenviarse checklist.
   - El documento cambia de requerido a solicitado, luego recibido u observado segun revision.

6. Pago o compromiso financiero.
   - El cliente asume compromiso de completar prima inicial antes de una fecha.
   - El compromiso queda vinculado al expediente.
   - Si no paga a tiempo, el estado cambia a atrasado.
   - Intelligence eleva una senal de riesgo financiero.

7. Mensajeria interna.
   - Coordinacion comercial informa a financiera y a la vendedora.
   - Se registra mensaje interno con prioridad y responsable.
   - El mensaje genera accion requerida.

8. Decision humana.
   - La gerente comercial decide priorizar llamada antes de cierre del dia.
   - Esa decision queda registrada con motivo y evidencia.
   - La accion ejecutada es llamada humana.

9. Resultado observado.
   - El cliente responde, envia documento faltante y confirma cita con esposa.
   - El riesgo baja o cambia de categoria.
   - El expediente conserva todos los pasos, no solo el estado final.

10. Cierre.
   - La reserva avanza a formalizacion.
   - Pagos y documentos quedan validados.
   - Intelligence puede explicar por que la venta avanzo: respuesta oportuna, evidencia clara, intervencion humana y seguimiento multicanal.

Esta reconstruccion debe ser posible sin depender de memoria conversacional ni de inferencias no verificables.

## Principio de memoria explicable

El sistema debe poder responder, para cualquier objeto operacional relevante:

- Que ocurrio?
- Cuando ocurrio?
- Quien intervino?
- Que sistema, canal o automatizacion participo?
- Que recomendo la IA?
- Que decidio el humano?
- Que accion se ejecuto?
- Que evidencia existe?
- Por que cambio el estado?
- Que paso despues?
- Cual es el estado actual?
- Cual fue la secuencia completa para llegar a ese estado?

Si el sistema no puede responder estas preguntas, la memoria operacional esta incompleta.

## Relacion con SUPABASE-0001 y SUPABASE-0002

SUPABASE-0001 define necesidades derivadas del codigo actual.

- Identifica que datos ya se capturan, muestran, simulan, envian, consultan o necesitan persistencia.
- Clasifica preliminarmente el esquema actual mientras no exista inventario remoto.

SUPABASE-0002 define captura e interpretacion.

- Establece el recorrido desde Punto de Captura hasta Evento Bruto, Interpretacion IA, Objeto Operacional, Verificacion Humana, Evidencia, Expediente Vivo e Inteligencia Ejecutiva.

SUPABASE-0003 define evolucion, historia y trazabilidad.

- Establece que los objetos operacionales cambian con el tiempo.
- Exige preservar transiciones, causas, actores, evidencia, recomendaciones IA y decisiones humanas.

Los tres documentos forman una secuencia:

```text
SUPABASE-0001 -> que datos existen y se necesitan
SUPABASE-0002 -> como entran y se interpretan
SUPABASE-0003 -> como evolucionan y se explican historicamente
```

## Implicacion futura para el modelo fisico

El diseno fisico futuro de Supabase debera considerar:

- tablas canonicas de objetos operacionales;
- tablas o estructuras de eventos brutos;
- historicos de estado;
- transiciones operacionales;
- auditoria de cambios;
- evidencia vinculada;
- relacion al Expediente Vivo;
- recomendaciones IA;
- decisiones humanas;
- acciones ejecutadas;
- resultados observados;
- separacion produccion/demo;
- RLS y permisos por sensibilidad;
- consultas eficientes para reconstruccion historica.

Implicaciones concretas:

- No basta con guardar `status` actual.
- No basta con guardar `updated_at`.
- No basta con guardar un resumen IA.
- El modelo debe permitir reconstruir la secuencia completa.
- Las tablas futuras deben distinguir estado actual de historia de transiciones.
- Los eventos y evidencias deben poder conectarse al Expediente Vivo.
- Las decisiones humanas deben quedar separadas de recomendaciones IA.

Ninguna de estas implicaciones autoriza migraciones inmediatas. Son criterios para el diseno futuro.

## Criterio de cierre

Este documento queda cumplido si establece claramente que la memoria operacional de H-OperIA debe conservar no solo objetos, sino tambien su evolucion.

El estado actual de un objeto debe ser explicable por su historia.

La historia debe conservar:

- eventos;
- interpretaciones;
- recomendaciones;
- decisiones;
- acciones;
- resultados;
- evidencias;
- responsables;
- fechas;
- causas;
- vinculos al Expediente Vivo.

Sin trazabilidad de transiciones, H-OperIA no tendria memoria operacional explicable, sino solo datos finales desconectados.

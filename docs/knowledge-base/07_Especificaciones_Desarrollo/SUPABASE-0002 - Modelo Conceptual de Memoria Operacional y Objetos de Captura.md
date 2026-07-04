# SUPABASE-0002 - Modelo Conceptual de Memoria Operacional y Objetos de Captura

## Estado

Documento conceptual creado durante Codex AMENA 62.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas, no elimina tablas y no autoriza implementacion fisica.

Su funcion es definir la arquitectura conceptual de la memoria operacional de H-OperIA antes de disenar tablas fisicas, migraciones SQL, RLS, integraciones o persistencia real.

## Restricciones operativas

Durante la elaboracion y aplicacion de este documento rigen estas restricciones:

- No modificar codigo.
- No tocar Supabase.
- No ejecutar migraciones.
- No crear tablas.
- No eliminar tablas.
- No hacer commit sin autorizacion posterior.

Cualquier entidad, objeto o flujo descrito aqui es conceptual. Su traduccion a tablas fisicas requiere inventario remoto, respaldo, diseno SQL, validacion humana y plan de rollback, conforme a SUPABASE-0001.

## Objetivo

Definir el modelo conceptual de memoria operacional de H-OperIA para que cada dato que ingrese al sistema pueda conservar trazabilidad desde su captura original hasta su uso en el Expediente Vivo y en H-OperIA Intelligence.

El objetivo no es definir tablas fisicas todavia. El objetivo es establecer como pensar la informacion antes de persistirla.

## Principio rector

La memoria operacional de H-OperIA sigue este recorrido:

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

Este flujo protege tres principios:

- No se pierde el dato original.
- La IA interpreta, pero no reemplaza la verificacion humana cuando hay impacto operativo.
- El Expediente Vivo concentra continuidad sin convertir todos los datos en una tabla unica opaca.

## Definicion de Punto de Captura

Un Punto de Captura es cualquier aplicacion, canal, formulario, llamada, mensaje, correo, carga documental, accion humana o automatizacion que introduce informacion al sistema.

Un Punto de Captura puede ser visible para el usuario final, interno para el equipo, tecnico, automatizado o asistido por IA.

Ejemplos de datos introducidos por un Punto de Captura:

- una reserva iniciada;
- un cliente o prospecto identificado;
- una llamada con Marta Voz;
- una respuesta por WhatsApp;
- un correo enviado o abierto;
- un documento recibido;
- un comprobante de pago;
- una nota de vendedora;
- un mensaje interno;
- una accion de seguimiento;
- una decision humana;
- una senal de riesgo;
- una evidencia operacional.

Un Punto de Captura no debe crear un silo aislado. Debe introducir informacion con trazabilidad suficiente para que pueda conectarse al Expediente Vivo.

## Puntos de captura actuales

### App Publica de Reservas

Captura datos iniciales de interes, seleccion de unidad, cliente/prospecto, canal de origen, estado de reserva y continuidad del recorrido.

Rol conceptual:

- Origina el caso operacional.
- Puede crear o alimentar el Expediente Vivo.
- Debe preservar fuente, unidad, estado, fecha/hora y datos de contacto.

### App Vendedoras

Captura actividad humana comercial: llamadas, reuniones, seguimientos, objeciones, necesidades detectadas, proximo paso, prioridad y criterio de la vendedora.

Rol conceptual:

- Agrega juicio humano al expediente.
- Convierte interacciones comerciales en objetos operacionales verificables.
- Permite que Intelligence detecte patrones de seguimiento, riesgo o oportunidad.

### Mensajeria entre el Equipo

Captura coordinacion interna entre roles, areas y responsables.

Rol conceptual:

- Registra comunicacion operacional interna.
- Permite rastrear quien informo, quien recibio, que tema se trato y que accion quedo pendiente.
- No debe confundirse con WhatsApp del cliente ni con mensajes de Marta.

### Centro Demo

Captura estados escenicos, voluntarios, envios de links, fases, evidencias visibles, contexto demo, datos inyectados y hallazgos presentados.

Rol conceptual:

- Orquesta la demostracion ejecutiva.
- No es fuente canonica productiva.
- Debe separar datos demo de datos reales.

### Marta Voz / Vapi

Captura llamadas, transcripciones, structured output, duracion, estado, intenciones, datos verificados, riesgo y siguiente paso.

Rol conceptual:

- Canal tecnico de voz de Marta.
- Debe preservar el evento bruto de llamada y la interpretacion estructurada.
- No debe absorber Marta Texto ni WhatsApp.

### Marta Texto / WhatsApp

Captura conversaciones de texto, mensajes salientes, respuestas del cliente, intenciones, seguimiento y acciones propuestas.

Rol conceptual:

- Canal textual de Marta.
- Alimenta el mismo Expediente Vivo que Marta Voz.
- No depende de Vapi como motor principal.

### Correo

Captura mensajes enviados, destinatarios, aperturas, adjuntos, links, rebotes, respuestas y evidencia de entrega o engagement.

Rol conceptual:

- Canal formal de comunicacion.
- Debe conservar envio, contenido, destinatario, estado y relacion con expediente.

### H-OperIA Intelligence

Captura preguntas ejecutivas, desgloses, senales, hallazgos, recomendaciones, prioridades, evidencias asociadas y respuestas generadas.

Rol conceptual:

- No es Marta.
- No atiende al cliente final como agente conversacional.
- Interpreta memoria operacional para usuarios internos y decisiones ejecutivas.

### Admin / Centro de Mando

Captura seleccion, revision, aprobacion, cambios de estado, navegacion operativa, acciones humanas y evidencia de decisiones internas.

Rol conceptual:

- Es superficie de control y lectura operacional.
- Permite ver, corregir, aprobar y ejecutar acciones sobre objetos operacionales.
- Debe registrar intervencion humana cuando modifique o confirme informacion relevante.

## Puntos de captura futuros previstos

### App de documentos

Capturara documentos requeridos, documentos recibidos, observaciones, reenvios, validaciones, aprobaciones y rechazos.

### App de pagos

Capturara compromisos de pago, pagos recibidos, comprobantes, mora, justificaciones, vencimientos, aprobaciones y alertas financieras.

### App de servicio al cliente

Capturara tickets, reclamos, consultas, garantias, tiempos de respuesta, escalaciones, resoluciones y aprendizajes recurrentes.

### App de postventa

Capturara seguimiento posterior a formalizacion, entregas programadas, comunicaciones de avance, satisfaccion, pendientes y acuerdos.

### App de cobros

Capturara gestiones de cobro, promesas de pago, estados de cuenta, acuerdos, recordatorios, respuestas y escalaciones.

### App de entregas

Capturara programacion de entrega, checklist, firma, observaciones, documentos entregados, pendientes y aceptacion final.

### App de garantias

Capturara reclamos de garantia, inspecciones, evidencias fotograficas, responsables, tiempos, resoluciones y reincidencias.

### Nuevos canales de Marta

Podran incluir widget web, voz adicional, chat embebido, integraciones futuras u otros canales.

Cada nuevo canal debe alimentar el mismo Expediente Vivo cuando corresponda. El canal no debe crear un expediente separado salvo que exista una regla operacional explicita.

## Definicion de Evento Bruto

Un Evento Bruto es la informacion capturada originalmente, antes de ser normalizada, interpretada, resumida o convertida en objeto operacional.

El Evento Bruto conserva la forma inicial del dato.

Ejemplos:

- payload original de una reserva;
- texto completo de un mensaje;
- transcripcion completa de una llamada;
- structured output original recibido desde Vapi;
- archivo cargado;
- metadata de un correo;
- registro de envio a backend;
- respuesta HTTP;
- texto escrito por una vendedora;
- pregunta ejecutiva original;
- accion humana registrada en Admin.

Reglas:

- El Evento Bruto no debe perderse si contiene valor operacional, legal, tecnico o de auditoria.
- La interpretacion IA no reemplaza al Evento Bruto.
- El Evento Bruto debe conservar fuente, canal, fecha/hora y contexto minimo.
- Si contiene informacion sensible, debe protegerse con controles de acceso y retencion.

## Definicion de Interpretacion IA

La Interpretacion IA es el proceso mediante el cual una inteligencia artificial analiza un Evento Bruto o un conjunto de eventos para identificar significado operacional.

Puede identificar:

- entidades;
- cliente/prospecto;
- reserva;
- unidad/proyecto;
- intencion;
- urgencia;
- riesgo;
- oportunidad;
- objecion;
- sentimiento operacional;
- documentos requeridos;
- compromisos;
- proximos pasos;
- evidencias relevantes;
- posibles objetos operacionales;
- senales para H-OperIA Intelligence.

Reglas:

- La Interpretacion IA debe registrar que modelo, motor, version o proceso la genero cuando aplique.
- Debe conservar relacion con el Evento Bruto que interpreta.
- Debe declarar nivel de confianza o estado de revision cuando sea posible.
- No debe asumir compromiso comercial, legal o financiero por si sola.
- Cuando impacte decisiones operativas, debe pasar por verificacion humana.

## Definicion de Objeto Operacional

Un Objeto Operacional es una unidad estructurada de memoria que representa algo accionable, verificable o reutilizable dentro de H-OperIA.

Ejemplos de Objetos Operacionales:

- cliente;
- prospecto;
- reserva;
- unidad;
- proyecto;
- documento;
- pago;
- conversacion;
- llamada;
- mensaje;
- seguimiento;
- ticket;
- garantia;
- entrega;
- senal;
- hallazgo;
- decision;
- evidencia;
- accion;
- compromiso;
- tarea;
- escalacion;
- recomendacion;
- pregunta ejecutiva;
- respuesta ejecutiva.

Reglas:

- Un Objeto Operacional debe tener identidad, fuente y estado.
- Debe poder vincularse a su Evento Bruto cuando aplique.
- Debe poder vincularse al Expediente Vivo cuando exista continuidad operacional valida.
- No debe duplicar memoria canonica de otro objeto.
- Puede nacer de captura humana, automatizacion, integracion o interpretacion IA.

## Definicion de Verificacion Humana

La Verificacion Humana es la confirmacion, correccion, rechazo o aprobacion por parte de un usuario humano cuando la informacion impacta decisiones operativas.

Aplica especialmente cuando la informacion puede afectar:

- una reserva;
- una promesa al cliente;
- un pago;
- una validacion documental;
- una respuesta sensible;
- una escalacion;
- un hallazgo ejecutivo;
- una accion comercial;
- un riesgo legal, financiero, reputacional o de servicio.

Reglas:

- La IA puede sugerir; el humano confirma cuando hay impacto operativo.
- La verificacion debe registrar usuario, fecha/hora, decision y cambios realizados.
- Una correccion humana debe preservar la diferencia entre dato original, interpretacion IA y dato validado.
- No toda informacion requiere aprobacion humana previa, pero toda informacion sensible debe ser trazable.

## Definicion de Evidencia

Evidencia es cualquier registro, archivo, evento, mensaje, salida estructurada, decision, accion o fuente que respalda una afirmacion operacional.

La evidencia debe permitir responder:

- Que se sabe?
- De donde salio?
- Cuando ocurrio?
- Quien o que lo genero?
- Fue interpretado por IA?
- Fue validado por un humano?
- A que expediente, cliente, reserva, proyecto o decision se relaciona?

La evidencia puede ser:

- tecnica;
- documental;
- conversacional;
- humana;
- transaccional;
- ejecutiva;
- demo;
- productiva.

## Definicion de Expediente Vivo

El Expediente Vivo es el eje central que une todos los objetos, eventos, evidencias, decisiones, comunicaciones y acciones alrededor de un cliente, prospecto, reserva o proyecto.

El Expediente Vivo no es simplemente una tabla ni un resumen. Es la continuidad operacional verificable de un caso.

Debe poder integrar:

- datos de reserva;
- perfil del cliente o prospecto;
- unidad o proyecto relacionado;
- vendedora o responsable;
- conversaciones de Marta Voz;
- conversaciones de Marta Texto;
- WhatsApp;
- correo;
- mensajes internos;
- documentos;
- pagos;
- servicio al cliente;
- postventa;
- cobros;
- entregas;
- garantias;
- senales de Intelligence;
- evidencias;
- decisiones humanas;
- proximos pasos.

Reglas:

- El canal no modifica el expediente.
- Un nuevo mensaje no crea automaticamente un nuevo expediente si pertenece a una continuidad existente.
- El Expediente Vivo conecta dominios, pero no reemplaza sus objetos canonicos.
- Debe evitar duplicidad y silos.
- Debe preservar timeline y trazabilidad.
- Debe permitir lectura ejecutiva y operativa.

## Inteligencia ejecutiva

La inteligencia ejecutiva es el resultado de transformar memoria operacional verificada en lectura para direccion, gerencia o equipos internos.

Puede producir:

- senales;
- hallazgos;
- riesgos;
- oportunidades;
- prioridades;
- recomendaciones;
- preguntas sugeridas;
- respuestas ejecutivas;
- tableros;
- comparativos;
- narrativas para junta;
- decisiones sugeridas.

Reglas:

- Debe basarse en eventos, objetos y evidencias trazables.
- Debe distinguir entre hecho, interpretacion, recomendacion y decision.
- No debe confundirse con Marta.
- No debe ocultar incertidumbre ni falta de verificacion.

## Reglas para nuevos puntos de captura

Todo nuevo modulo, aplicacion, canal, integracion o automatizacion que introduzca informacion al sistema debe cumplir estas reglas:

1. Conservar el dato bruto.
   - Debe preservarse la forma original del evento cuando tenga valor operacional, tecnico, legal o de auditoria.

2. Registrar fuente.
   - Debe indicarse de que aplicacion, canal, integracion, formulario, usuario, backend o automatizacion provino.

3. Registrar usuario/canal.
   - Debe distinguirse si el origen fue humano, IA, sistema, canal externo, cliente, vendedora, administrador o servicio.

4. Registrar fecha/hora.
   - Todo evento debe tener timestamp confiable y, cuando aplique, zona horaria o normalizacion.

5. Permitir interpretacion IA.
   - El dato debe estructurarse lo suficiente para que pueda ser interpretado sin perder su fuente original.

6. Vincular al Expediente Vivo.
   - Si existe continuidad operacional valida, el dato debe poder asociarse al expediente correspondiente.

7. Generar evidencia.
   - Todo dato relevante debe poder convertirse en evidencia o relacionarse con evidencia.

8. No crear silos aislados.
   - Ningun modulo nuevo debe guardar informacion importante sin ruta de integracion al expediente, evidencia e Intelligence.

9. No duplicar memoria canonica.
   - Si un objeto ya existe como entidad canonica, el nuevo modulo debe referenciarlo, no crear una copia divergente.

10. Registrar estado de verificacion.
    - Debe distinguirse informacion capturada, interpretada, validada, corregida, aprobada, rechazada o archivada.

11. Separar demo y produccion.
    - Los datos demo deben identificarse y aislarse de la operacion real.

12. Proteger datos sensibles.
    - Deben aplicarse permisos, RLS, retencion y auditoria cuando corresponda.

## Relacion con SUPABASE-0001

SUPABASE-0001 deriva necesidades de datos desde el codigo actual y clasifica preliminarmente el esquema Supabase sin inventario remoto.

SUPABASE-0002 define la arquitectura conceptual que permite incorporar nuevos puntos de captura sin romper el modelo.

La relacion entre ambos documentos es:

- SUPABASE-0001 responde: que datos aparecen hoy en el sistema codificado y que necesidades de persistencia derivan de ellos.
- SUPABASE-0002 responde: como debe fluir cualquier dato, actual o futuro, desde la captura hasta el Expediente Vivo e Intelligence.

SUPABASE-0002 no reemplaza a SUPABASE-0001. Lo complementa.

SUPABASE-0001 evita inventar tablas desconectadas del codigo actual.

SUPABASE-0002 evita que futuras aplicaciones creen silos o rompan la memoria operacional.

## Criterio de cierre

Este documento queda cumplido si establece claramente que toda informacion de H-OperIA debe recorrer un ciclo trazable:

```text
captura original
  -> evento bruto conservado
  -> interpretacion IA trazable
  -> objeto operacional estructurado
  -> verificacion humana cuando aplique
  -> evidencia
  -> Expediente Vivo
  -> inteligencia ejecutiva
```

Ningun punto de captura actual o futuro debe operar fuera de este ciclo sin decision arquitectonica documentada.

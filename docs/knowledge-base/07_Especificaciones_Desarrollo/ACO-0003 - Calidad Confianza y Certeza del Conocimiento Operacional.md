# ACO-0003 - Calidad Confianza y Certeza del Conocimiento Operacional

## Estado

Documento rector de la familia ACO - Arquitectura del Conocimiento Operacional.

Creado durante Codex AMENA 62 como continuacion de ACO-0001 y ACO-0002.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas y no autoriza implementacion tecnica.

## Proposito

Definir como H-OperIA evalua la calidad, confianza, certeza, vigencia y confiabilidad del conocimiento operacional.

Este documento protege un principio esencial: H-OperIA no debe presentar una inferencia como si fuera un hecho confirmado.

La arquitectura del conocimiento operacional debe distinguir que se sabe, como se sabe, con que evidencia, desde que fuente, con que nivel de certeza y hasta cuando sigue vigente.

## Relacion con ACO-0001 y ACO-0002

ACO-0001 define los fundamentos del Conocimiento Operacional.

ACO-0002 define los principios rectores que gobiernan captura, interpretacion, memoria, aprendizaje, inteligencia y decision.

ACO-0003 define como evaluar calidad, confianza, certeza, vigencia y confiabilidad del conocimiento operacional.

En conjunto:

```text
ACO-0001 -> que es conocimiento operacional
ACO-0002 -> que principios lo gobiernan
ACO-0003 -> que tan confiable, vigente y util es
```

## Principio central

H-OperIA no debe presentar una inferencia como si fuera un hecho confirmado.

El sistema debe distinguir entre:

- lo capturado;
- lo declarado;
- lo interpretado;
- lo inferido;
- lo recomendado;
- lo decidido;
- lo ejecutado;
- lo observado;
- lo confirmado.

Cuando exista incertidumbre, debe conservarse como incertidumbre.

Cuando exista contradiccion, debe mostrarse como contradiccion.

Cuando exista obsolescencia, debe marcarse como conocimiento que requiere revision o archivo.

## Diferencias conceptuales obligatorias

### Hecho confirmado

Un hecho confirmado es conocimiento respaldado por evidencia suficiente y, cuando aplica, por verificacion humana o validacion del sistema.

Ejemplo:

- un pago fue validado por financiera;
- un documento fue aprobado;
- una reserva fue formalizada;
- una llamada ocurrio y existe registro tecnico;
- un correo fue enviado y existe evidencia de entrega.

Un hecho confirmado puede usarse como base fuerte para decisiones.

### Dato capturado

Un dato capturado es informacion recibida o registrada por un punto de captura.

Puede ser verdadero, incompleto, incorrecto, duplicado o requerir validacion.

Ejemplo:

- telefono ingresado en formulario;
- nombre escrito por cliente;
- monto indicado en un mensaje;
- estado recibido desde una integracion;
- archivo cargado.

Un dato capturado no debe tratarse automaticamente como hecho confirmado.

### Declaracion humana

Una declaracion humana es informacion expresada por una persona.

Puede venir de cliente, vendedora, colaborador, gerente, financiero, legal, soporte o cualquier usuario.

Ejemplo:

- el cliente dice que pagara manana;
- la vendedora reporta que el cliente esta interesado;
- financiera indica que un comprobante parece incompleto;
- legal advierte riesgo.

Una declaracion humana tiene valor, pero debe conservar fuente, contexto y nivel de confianza.

### Interpretacion IA

Una interpretacion IA es lectura generada por un modelo o proceso inteligente sobre datos, eventos o evidencias.

Ejemplo:

- la IA detecta riesgo financiero moderado;
- clasifica una conversacion como urgente;
- identifica documentos pendientes;
- interpreta intencion alta de compra;
- resume una llamada.

Una interpretacion IA no es un hecho confirmado. Debe conservar fuente, contexto y, cuando sea posible, nivel de confianza.

### Hipotesis

Una hipotesis es una explicacion posible, todavia no confirmada.

Ejemplo:

- los atrasos documentales podrian deberse a falta de claridad del checklist;
- una campana podria estar generando leads de baja calidad;
- un cliente podria estar evitando avanzar por duda financiera.

Una hipotesis debe tratarse como objeto de investigacion o validacion, no como conclusion final.

### Recomendacion

Una recomendacion es una propuesta de accion.

Puede provenir de IA, humano, regla operativa o analisis combinado.

Ejemplo:

- llamar hoy al cliente;
- enviar carta modelo;
- escalar a financiera;
- pausar campana;
- solicitar nuevo documento.

Una recomendacion no es decision. Debe poder aceptarse, modificarse o rechazarse.

### Prediccion

Una prediccion es una estimacion sobre algo que podria ocurrir.

Ejemplo:

- probabilidad de formalizacion;
- riesgo de atraso;
- probabilidad de respuesta;
- tendencia de conversion;
- posibilidad de abandono.

Una prediccion debe mostrar incertidumbre y no debe presentarse como resultado garantizado.

### Decision humana

Una decision humana es una determinacion tomada por una persona responsable.

Ejemplo:

- aprobar documento;
- rechazar comprobante;
- llamar al cliente;
- escalar caso;
- cambiar prioridad;
- cerrar seguimiento.

La decision humana debe conservar actor, fecha/hora, motivo, evidencia y relacion con recomendaciones previas si existieron.

### Resultado observado

Un resultado observado es la consecuencia registrada despues de una decision o accion.

Ejemplo:

- el cliente respondio;
- el pago fue recibido;
- el documento fue corregido;
- la cita se realizo;
- la campana bajo conversion;
- el riesgo se resolvio.

El resultado observado permite evaluar si una decision funciono y alimenta aprendizaje operacional.

## Escala conceptual de certeza

### Confirmado

Conocimiento respaldado por evidencia suficiente y validacion adecuada.

Uso recomendado: puede servir como base fuerte para decisiones.

### Altamente confiable

Conocimiento con fuente solida, evidencia consistente y baja probabilidad de error, aunque no necesariamente confirmado por todos los mecanismos posibles.

Uso recomendado: puede orientar decisiones, dejando claro su nivel.

### Probable

Conocimiento razonable segun evidencia disponible, pero con incertidumbre relevante.

Uso recomendado: puede orientar investigacion, priorizacion o accion preventiva, no decision final sensible sin validacion.

### Incierto

Conocimiento incompleto, ambiguo o insuficiente.

Uso recomendado: debe marcarse como pendiente de aclaracion o validacion.

### No verificado

Dato, declaracion, interpretacion o recomendacion que aun no cuenta con evidencia o revision suficiente.

Uso recomendado: no debe presentarse como hecho.

### Contradictorio

Existen fuentes, evidencias o interpretaciones incompatibles entre si.

Uso recomendado: debe conservar contradiccion y activar revision humana.

### Obsoleto

Conocimiento que pudo haber sido valido, pero ha perdido vigencia por tiempo, cambios de contexto, nuevos datos o decisiones posteriores.

Uso recomendado: conservar como historico, pero no usar como base actual sin revision.

## Fuentes de confianza

### Evidencia documental

Ejemplos:

- documento cargado;
- contrato;
- comprobante;
- archivo firmado;
- correo formal;
- fotografia de evidencia;
- PDF validado.

Suele tener alta fuerza probatoria, pero debe revisarse autenticidad, vigencia, legibilidad y correspondencia con el caso.

### Accion humana registrada

Ejemplos:

- aprobacion de financiera;
- decision de gerente;
- revision de vendedora;
- escalamiento de legal;
- cierre de ticket.

Su confianza depende de actor, autoridad, contexto y evidencia usada.

### Dato del sistema

Ejemplos:

- timestamp;
- estado interno;
- evento de envio;
- registro de llamada;
- cambio de estado;
- identificador de reserva.

Suele ser confiable para describir que el sistema registro algo, pero no siempre confirma realidad externa.

### Declaracion del cliente

Ejemplos:

- promesa de pago;
- interes declarado;
- objecion;
- queja;
- confirmacion verbal;
- preferencia de unidad.

Tiene alto valor operacional, pero puede requerir confirmacion, seguimiento o evidencia.

### Reporte de colaborador

Ejemplos:

- nota de vendedora;
- reporte de coordinacion;
- observacion de servicio;
- evaluacion de financiera;
- comentario de legal.

Su confianza depende de responsabilidad, experiencia, evidencia y consistencia con otras fuentes.

### Interpretacion IA

Ejemplos:

- clasificacion de riesgo;
- resumen;
- intencion detectada;
- recomendacion de accion;
- identificacion de patron.

Es util para acelerar lectura, pero debe mostrar incertidumbre y no reemplazar verificacion humana en decisiones sensibles.

### Senal estadistica

Ejemplos:

- tendencia de conversion;
- patron de atraso;
- correlacion entre canal y formalizacion;
- aumento de reclamos;
- probabilidad de respuesta.

Puede ser potente para inteligencia ejecutiva, pero debe explicarse con contexto, muestra, periodo y limitaciones.

### Dato demo o simulado

Ejemplos:

- corrida demo;
- cliente ficticio;
- evidencia simulada;
- senal generada para presentacion;
- escenario construido.

Debe marcarse claramente como demo o simulado. No debe tratarse como evidencia productiva.

## Reglas para conflictos entre fuentes

### No ocultar contradicciones

Cuando dos fuentes se contradicen, el sistema debe conservar y mostrar la contradiccion.

Ejemplo:

- el cliente dice que pago, pero financiera no ha validado comprobante;
- la vendedora reporta interes alto, pero el cliente no responde;
- la IA detecta urgencia alta, pero el humano la clasifica como media.

### Conservar versiones

Las versiones anteriores no deben borrarse sin trazabilidad.

Debe poder verse que cambio, cuando cambio, quien lo cambio y por que.

### Registrar fuente

Cada afirmacion relevante debe conservar su fuente.

La fuente permite evaluar confianza, autoridad, contexto y posible sesgo.

### Marcar nivel de confianza

Cuando exista conflicto, incertidumbre o evidencia incompleta, debe indicarse nivel de certeza.

No todo conocimiento tiene el mismo peso.

### Permitir revision humana

Las contradicciones importantes deben poder escalar a revision humana.

El humano puede confirmar, corregir, rechazar, pedir evidencia adicional o declarar que la contradiccion permanece abierta.

### Vincular evidencia

Toda resolucion de conflicto debe vincular evidencia.

Si no existe evidencia suficiente, la resolucion debe marcarse como criterio humano o decision provisional, no como hecho confirmado.

## Vigencia y obsolescencia

### Cuando un conocimiento sigue vigente

Un conocimiento sigue vigente cuando:

- no ha sido reemplazado por evidencia posterior;
- su contexto operativo no ha cambiado;
- su fecha sigue siendo relevante;
- no existe contradiccion activa;
- mantiene utilidad para decisiones actuales.

Ejemplo: una aprobacion documental reciente y no revocada sigue vigente.

### Cuando debe revisarse

Un conocimiento debe revisarse cuando:

- paso demasiado tiempo;
- aparecio nueva evidencia;
- cambio el estado del expediente;
- cambio el responsable;
- hay contradiccion;
- el resultado observado no coincide con la expectativa;
- el conocimiento se usara para una decision sensible.

### Cuando debe archivarse

Un conocimiento debe archivarse cuando:

- ya no tiene utilidad operacional activa;
- pertenece a un caso cerrado;
- fue reemplazado por conocimiento mas reciente;
- debe conservarse solo por historial, auditoria o aprendizaje.

Archivar no significa eliminar. Significa retirar de la operacion activa sin perder memoria historica.

### Cuando debe considerarse historico

Un conocimiento es historico cuando explica el pasado, pero no debe guiar una decision actual sin revision.

Ejemplo:

- una intencion de compra expresada hace meses;
- una disponibilidad de unidad antigua;
- una recomendacion IA previa a nueva evidencia;
- un estado de pago antes de validacion final.

## Calidad del conocimiento

La calidad del conocimiento operacional debe evaluarse mediante criterios complementarios.

### Completitud

Mide si el conocimiento contiene los elementos necesarios para entender y actuar.

Preguntas:

- faltan datos clave?
- falta fuente?
- falta responsable?
- falta evidencia?
- falta contexto?

### Precision

Mide si el conocimiento es correcto y especifico.

Preguntas:

- el dato corresponde al cliente correcto?
- el monto es exacto?
- el estado es el vigente?
- la interpretacion distingue hechos de inferencias?

### Trazabilidad

Mide si puede reconstruirse origen, cambios y uso del conocimiento.

Preguntas:

- sabemos de donde salio?
- sabemos quien lo valido?
- sabemos cuando cambio?
- sabemos que evidencia lo respalda?

### Actualidad

Mide si el conocimiento sigue vigente para la decision actual.

Preguntas:

- esta actualizado?
- fue reemplazado?
- necesita revision?
- ya es historico?

### Relevancia

Mide si el conocimiento importa para el objetivo operativo.

Preguntas:

- ayuda a decidir?
- explica riesgo u oportunidad?
- orienta accion?
- aporta al expediente o solo agrega ruido?

### Verificabilidad

Mide si el conocimiento puede comprobarse.

Preguntas:

- existe evidencia?
- puede revisarlo un humano?
- puede contrastarse con otra fuente?
- puede auditarse?

### Utilidad operacional

Mide si el conocimiento permite actuar mejor.

Preguntas:

- reduce incertidumbre?
- mejora priorizacion?
- evita error?
- acelera respuesta?
- genera aprendizaje?

## Evaluacion conceptual de confianza

Para evaluar un conocimiento operacional, H-OperIA debe considerar:

- tipo de conocimiento;
- fuente;
- evidencia;
- vigencia;
- consistencia con otras fuentes;
- impacto de usarlo;
- riesgo de error;
- necesidad de verificacion humana;
- resultado observado si ya se actuo con base en el.

No todos los conocimientos requieren el mismo nivel de certeza. La exigencia aumenta cuando la decision tiene mayor impacto.

## Reglas de uso segun certeza

### Conocimiento confirmado

Puede usarse para decisiones operativas y ejecutivas, manteniendo trazabilidad.

### Conocimiento altamente confiable

Puede usarse con claridad sobre su fuente y nivel, especialmente si el riesgo es moderado.

### Conocimiento probable

Debe usarse para priorizar, investigar o prevenir, no para cerrar decisiones sensibles sin validacion.

### Conocimiento incierto

Debe activar busqueda de mas informacion o revision humana.

### Conocimiento no verificado

Debe mostrarse como pendiente de verificacion.

### Conocimiento contradictorio

Debe activar resolucion o conservar conflicto visible.

### Conocimiento obsoleto

Debe retirarse de decisiones activas y conservarse como historico.

## Responsabilidad humana ante incertidumbre

Cuando el conocimiento tenga baja certeza y alto impacto, debe intervenir una persona responsable.

La persona puede:

- aceptar el riesgo;
- pedir evidencia;
- corregir informacion;
- rechazar una interpretacion;
- marcar una decision como provisional;
- escalar a otra area;
- archivar conocimiento obsoleto.

La responsabilidad humana no elimina la incertidumbre automaticamente. La gestiona.

## Relacion con la IA

La IA debe ayudar a clasificar calidad, confianza y certeza, pero no debe esconder sus limites.

La IA puede:

- detectar contradicciones;
- marcar baja confianza;
- sugerir evidencia faltante;
- comparar fuentes;
- identificar obsolescencia;
- proponer revision humana;
- estimar probabilidad.

La IA no debe:

- convertir una hipotesis en hecho;
- ocultar contradicciones;
- exagerar certeza;
- borrar versiones previas;
- presentar dato demo como productivo;
- reemplazar decision humana sensible.

## Criterio de cierre

ACO-0003 queda cumplido si establece que H-OperIA debe evaluar todo conocimiento operacional segun calidad, confianza, certeza, vigencia y utilidad.

El sistema debe poder distinguir lo confirmado de lo probable, lo incierto, lo contradictorio y lo obsoleto.

La arquitectura debe proteger una regla central:

```text
Una inferencia no es un hecho.
```

Y una segunda regla inseparable:

```text
La calidad del conocimiento determina como puede usarse para decidir.
```

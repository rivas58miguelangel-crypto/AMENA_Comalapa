# SUPABASE-0004 - Arquitectura Logica del Modelo de Persistencia Operacional

## Estado

Documento conceptual creado como puente formal entre la doctrina ACO y el futuro modelo logico de persistencia operacional.

Este documento no modifica codigo, no toca Supabase, no ejecuta migraciones, no crea tablas, no elimina tablas y no autoriza implementacion tecnica.

Su funcion es traducir la Arquitectura del Conocimiento Operacional hacia dominios logicos de persistencia, sin convertir esos dominios en diseno fisico.

## Restricciones absolutas

SUPABASE-0004 no incluye ni autoriza:

- SQL;
- `CREATE TABLE`;
- migraciones;
- diseno fisico;
- nombres definitivos de tablas;
- RLS;
- policies;
- triggers;
- indices;
- vistas;
- funciones;
- conexion a Supabase;
- inventario remoto;
- implementacion tecnica.

Cualquier traduccion conceptual contenida en este documento debera ser refinada posteriormente mediante documentos, auditorias e intervenciones especificas antes de convertirse en diseno fisico o ejecucion tecnica.

## Proposito

Construir el puente formal entre la doctrina ACO y el futuro modelo logico de persistencia operacional de H-OperIA.

SUPABASE-0004 responde la siguiente pregunta:

```text
Como debe organizarse logicamente la persistencia operacional futura para implementar la Arquitectura del Conocimiento Operacional sin redefinirla?
```

El objetivo no es proponer tablas. El objetivo es establecer los dominios logicos, separaciones conceptuales y reglas de traduccion que cualquier modelo fisico futuro debera respetar.

## Principio rector

La tecnologia implementa la arquitectura, pero no la redefine.

SUPABASE permanece subordinada a ACO.

La persistencia futura debe servir a la memoria operacional, la evidencia, la trazabilidad, la certeza, la vigencia, la historia, el aprendizaje y la gobernanza del conocimiento. Si una decision tecnica impide preservar esos principios, la decision tecnica debera revisarse antes de considerarse arquitectonicamente valida.

## Relacion con la serie ACO

La serie ACO define el cuerpo doctrinal de la Arquitectura del Conocimiento Operacional.

- ACO-0001 define los fundamentos: dato, informacion, conocimiento, memoria, aprendizaje, inteligencia, decision, accion, resultado y nuevo conocimiento.
- ACO-0002 define los principios rectores que protegen captura, interpretacion, evidencia, responsabilidad humana, historia, incertidumbre, Expediente Vivo, separacion demo/productiva y explicabilidad.
- ACO-0003 define calidad, confianza, certeza, vigencia, conflicto, obsolescencia y reglas de uso del conocimiento.
- ACO-0004 define la taxonomia de tipos de conocimiento que H-OperIA debe reconocer sin mezclarlos.
- ACO-0005 define como la experiencia operacional acumulada se transforma en aprendizaje organizacional y conocimiento institucional.
- ACO-0006 define como ese conocimiento institucional se gobierna para conservar integridad durante anos de evolucion.

SUPABASE-0004 no reemplaza ni corrige esa doctrina. La traduce hacia persistencia logica.

## Relacion con SUPABASE-0001 a SUPABASE-0003

SUPABASE-0001 identifica necesidades de datos derivadas del codigo existente y clasifica preliminarmente el esquema actual sin inventario remoto.

SUPABASE-0002 define el flujo conceptual de memoria operacional:

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

SUPABASE-0003 define el ciclo de vida de objetos operacionales y la trazabilidad de transiciones.

SUPABASE-0004 integra esas bases y las ordena como arquitectura logica del modelo de persistencia operacional.

## Matriz ACO hacia Persistencia Logica

| Fuente ACO | Principio doctrinal | Traduccion a persistencia logica |
| --- | --- | --- |
| ACO-0001 | La operacion se transforma en dato, informacion, conocimiento, memoria, aprendizaje, inteligencia, decision, accion, resultado y nuevo conocimiento. | El modelo logico debe representar el ciclo completo, no solo registros finales. |
| ACO-0001 | El Expediente Vivo es eje de continuidad. | Todo dominio debe poder vincularse a una continuidad operacional valida sin ser absorbido por ella. |
| ACO-0002 | La IA interpreta, recomienda y prioriza; el humano decide. | Interpretacion IA, recomendacion IA y decision humana deben ser objetos logicos separados. |
| ACO-0002 | La evidencia acompana toda decision relevante. | La evidencia debe ser vinculable a decisiones, eventos, objetos, transiciones y expedientes. |
| ACO-0002 | El canal no crea memorias separadas. | Voz, texto, WhatsApp, correo, Admin y aplicaciones deben alimentar una continuidad comun cuando corresponda. |
| ACO-0002 | Los dominios canonicos no deben diluirse en una estructura generica. | Reservas, documentos, pagos, conversaciones, llamadas, servicio, senales, mensajes y otros dominios conservan identidad logica propia. |
| ACO-0003 | Una inferencia no es un hecho. | El modelo logico debe distinguir hecho confirmado, dato capturado, declaracion, hipotesis, prediccion, recomendacion y resultado. |
| ACO-0003 | Certeza, vigencia y contradiccion deben conservarse. | Cada conocimiento relevante requiere fuente, evidencia, nivel de certeza, vigencia y posibilidad de contradiccion. |
| ACO-0004 | Existen tipos distintos de conocimiento. | El modelo debe permitir clasificar conocimiento por naturaleza: cliente, proyecto, comercial, documental, financiero, operativo, estrategico, IA, humano, historico, predictivo, temporal y colectivo. |
| ACO-0005 | La organizacion aprende desde evidencia acumulada. | La persistencia logica debe permitir experiencia acumulada, patrones, aprendizajes, aplicacion futura y resultados observados. |
| ACO-0005 | H-OperIA Intelligence consume aprendizaje; no lo reemplaza. | Las senales ejecutivas deben conservar trazabilidad hacia evidencia, conocimiento base y resultados. |
| ACO-0006 | El conocimiento institucional requiere gobernanza. | Deben existir conceptos logicos para responsable, vigencia, revision, contradiccion, resolucion, reemplazo, retiro, archivo y auditoria. |
| ACO-0006 | Ningun conocimiento puede perder su historia. | Deben separarse estado actual, historia, versiones, transiciones y criterios de cambio. |

## Dominios logicos del modelo

Los dominios logicos no son tablas. Son areas conceptuales que el futuro modelo fisico debera resolver sin romper la doctrina ACO.

### 1. Identidad y configuracion operacional

Representa la identidad organizacional, proyectos, configuraciones, contexto operativo y parametros necesarios para ubicar la operacion.

Este dominio prepara la futura coherencia con arquitecturas white label y multiempresa sin definir estructuras fisicas.

### 2. Puntos de captura

Representa aplicaciones, canales, formularios, llamadas, mensajes, correos, cargas documentales, acciones humanas, automatizaciones o procesos asistidos por IA que introducen informacion al sistema.

Todo punto de captura debe declarar fuente, canal, actor, fecha/hora y contexto minimo.

### 3. Eventos brutos

Representa la informacion capturada originalmente antes de ser normalizada, interpretada, resumida o convertida en objeto operacional.

El evento bruto no debe perderse cuando contiene valor operacional, legal, tecnico, historico, explicativo o de auditoria.

### 4. Objetos operacionales canonicos

Representa unidades estructuradas de memoria operacional con identidad, fuente y estado.

Incluye dominios como cliente, prospecto, reserva, unidad, documento, pago, conversacion, llamada, mensaje, seguimiento, ticket, garantia, entrega, senal, hallazgo, decision, evidencia, accion, compromiso, tarea, escalacion, pregunta ejecutiva o respuesta ejecutiva.

Cada objeto operacional debe conservar su identidad conceptual. Lo transversal no debe borrar lo especifico.

### 5. Expediente Vivo

El Expediente Vivo es el eje logico de continuidad operacional.

Une objetos, eventos, evidencias, decisiones, comunicaciones y acciones alrededor de una continuidad valida de cliente, prospecto, reserva, proyecto o proceso.

El Expediente Vivo no debe absorber los dominios canonicos. Los conecta, los organiza y permite reconstruir continuidad, pero no reemplaza sus responsabilidades propias.

Reglas:

- el canal no modifica el expediente;
- un nuevo mensaje no crea automaticamente un nuevo expediente si pertenece a una continuidad existente;
- Marta Voz, Marta Texto, WhatsApp, correo, Admin, aplicaciones internas e Intelligence pueden alimentar la misma continuidad;
- el expediente debe preservar timeline, evidencias, decisiones, proximos pasos e historia.

### 6. Evidencia operacional

Representa cualquier registro, archivo, evento, mensaje, salida estructurada, decision, accion o fuente que respalda una afirmacion operacional.

La evidencia conecta dominios, pero no los reemplaza.

Debe permitir responder que se sabe, de donde salio, cuando ocurrio, quien o que lo genero, si fue interpretado por IA, si fue validado por humano y con que expediente u objeto se relaciona.

### 7. Interpretaciones y recomendaciones IA

Representa lecturas, clasificaciones, senales, resumenes, inferencias, predicciones y propuestas generadas por IA.

Una interpretacion IA no es un hecho confirmado.

Una recomendacion IA no es una decision humana.

Este dominio debe conservar fuente, evidencia interpretada, contexto, proceso o motor cuando aplique, nivel de confianza y estado de revision.

### 8. Verificaciones y decisiones humanas

Representa confirmaciones, correcciones, rechazos, aprobaciones y decisiones realizadas por personas responsables.

La decision humana debe conservar actor, fecha/hora, motivo, evidencia y relacion con recomendaciones previas cuando existan.

La correccion humana no debe borrar el dato original ni la interpretacion IA previa cuando tengan valor de auditoria.

### 9. Acciones ejecutadas

Representa intervenciones realizadas por humanos, sistemas, automatizaciones o integraciones.

Una accion ejecutada no equivale a resultado observado.

Debe conservar actor, fecha/hora, objeto afectado, motivo, canal, evidencia y relacion con decision o recomendacion previa cuando corresponda.

### 10. Resultados observados

Representa consecuencias registradas despues de una accion.

Permite evaluar si una decision funciono, si una recomendacion fue util, si una accion produjo efecto y si un aprendizaje debe confirmarse, ajustarse o descartarse.

### 11. Transiciones operacionales

Representa cambios relevantes en estado, significado, prioridad, responsable, riesgo, oportunidad, evidencia, decision o resultado de objetos operacionales.

Toda transicion debe conservar:

- objeto afectado;
- estado anterior;
- estado nuevo;
- actor humano, sistema, IA o automatizacion;
- fecha/hora;
- motivo;
- evidencia;
- recomendacion IA si existio;
- decision humana si existio;
- vinculo al Expediente Vivo.

### 12. Certeza, confianza, vigencia y contradiccion

Representa el estado de calidad del conocimiento operacional.

Debe permitir distinguir conocimiento confirmado, altamente confiable, probable, incierto, no verificado, contradictorio, obsoleto, historico, provisional o retirado.

La incertidumbre debe preservarse. La contradiccion debe conservarse hasta resolverse.

### 13. Taxonomia del conocimiento

Representa la clasificacion conceptual del conocimiento operacional.

Debe permitir reconocer conocimiento de cliente, proyecto, comercial, documental, financiero, operativo, estrategico, generado por IA, confirmado por humanos, historico, predictivo, temporal y colectivo.

Un conocimiento puede tener multiples clasificaciones sin que una borre otra.

### 14. Aprendizaje organizacional

Representa la evolucion desde hechos y experiencia acumulada hacia patrones, aprendizaje y conocimiento institucional.

No todo hecho aislado constituye aprendizaje. El aprendizaje requiere evidencia, contexto, validacion, alcance, limites, vigencia y consecuencia operativa.

### 15. Conocimiento institucional

Representa aprendizaje consolidado, trazable, reutilizable y disponible para la organizacion.

Debe conservar evidencia, vigencia, condiciones de aplicacion, historia, responsable y mecanismo de revision.

### 16. Gobernanza del conocimiento

Representa las reglas logicas que permiten mantener integridad del conocimiento durante anos de evolucion.

Debe cubrir responsabilidad, validacion, niveles de confianza, vigencia, revision, contradicciones, resolucion, versionamiento, reemplazo, obsolescencia, retiro, archivo historico, reutilizacion, auditoria y trazabilidad completa.

### 17. H-OperIA Intelligence

Representa lectura ejecutiva, senales, hallazgos, preguntas, respuestas, prioridades, recomendaciones y explicaciones para usuarios internos.

H-OperIA Intelligence no crea aprendizaje por si misma. Consume memoria, evidencia, aprendizaje y conocimiento gobernado.

Toda senal o recomendacion ejecutiva debe poder explicar su origen, evidencia, certeza, vigencia y relacion con decisiones o resultados observados.

### 18. Separacion demo/productiva

Representa la distincion obligatoria entre operacion real y escenarios simulados.

Demo puede validar narrativa, recorridos conceptuales y presentaciones, pero no debe presentarse como evidencia productiva.

Produccion requiere controles, responsabilidad, evidencia real, trazabilidad y gobierno de conocimiento.

### 19. Auditoria y trazabilidad

Representa la capacidad de reconstruir origen, captura, interpretacion, evidencia, validacion, conocimiento, uso, decision, accion, resultado, revision y evolucion.

Un conocimiento no auditable no debe usarse como base fuerte para decisiones relevantes.

### 20. Bitacora transversal

Representa registros operacionales transversales que pueden servir como puente incremental, evidencia o bitacora.

Una bitacora transversal no debe convertirse en modelo canonico unico ni reemplazar reservas, documentos, pagos, mensajes, llamadas, Intelligence, evidencia estructurada o Expediente Vivo.

## Ciclo logico de memoria operacional

El modelo logico de persistencia operacional debe permitir este recorrido:

```text
Punto de captura
  -> Evento bruto
  -> Interpretacion IA
  -> Objeto operacional
  -> Verificacion humana
  -> Evidencia
  -> Expediente Vivo
  -> Transicion operacional
  -> Accion ejecutada
  -> Resultado observado
  -> Aprendizaje organizacional
  -> Conocimiento institucional
  -> Gobernanza
  -> H-OperIA Intelligence
  -> Nueva decision
  -> Nueva captura operacional
```

Este ciclo no es lineal ni unico. Representa una arquitectura de retroalimentacion continua.

## Separaciones conceptuales obligatorias

SUPABASE-0004 establece que los siguientes conceptos no deben mezclarse:

- evento bruto;
- interpretacion IA;
- recomendacion IA;
- decision humana;
- accion ejecutada;
- resultado observado;
- evidencia;
- objeto operacional;
- transicion operacional;
- Expediente Vivo;
- conocimiento institucional.

Estas separaciones protegen la explicabilidad y evitan falsa certeza.

## Reglas logicas para persistencia futura

Toda persistencia futura debera:

- preservar evidencia;
- conservar trazabilidad;
- declarar fuente;
- distinguir hecho, inferencia, hipotesis, prediccion, recomendacion, decision, accion y resultado;
- conservar certeza y confianza;
- declarar vigencia;
- preservar contradicciones;
- conservar historia;
- registrar transiciones;
- permitir auditoria;
- separar demo y produccion;
- proteger dominios canonicos;
- permitir gobierno del conocimiento;
- alimentar H-OperIA Intelligence sin ocultar incertidumbre.

## Riesgos doctrinales de traduccion

Riesgos principales:

- convertir dominios logicos en tablas fisicas prematuramente;
- tratar nombres candidatos de SUPABASE-0001 como nombres definitivos;
- disenar desde Supabase en vez de traducir desde ACO;
- reducir el Expediente Vivo a una tabla opaca;
- usar una bitacora generica como reemplazo de dominios canonicos;
- confundir interpretacion IA con hecho confirmado;
- confundir recomendacion IA con decision humana;
- registrar accion ejecutada sin resultado observado;
- guardar solo estado actual sin historia ni transiciones;
- mezclar demo y produccion;
- perder fuente, evidencia, certeza, vigencia o responsable;
- convertir aprendizaje preliminar en regla institucional sin gobernanza;
- disenar persistencia que H-OperIA Intelligence no pueda auditar;
- automatizar decisiones antes de validar aprendizaje;
- ocultar contradicciones para preservar apariencia de coherencia;
- borrar conocimiento retirado que conserva valor historico.

## Que no autoriza SUPABASE-0004

SUPABASE-0004 no autoriza:

- implementar cambios tecnicos;
- tocar Supabase;
- crear, modificar, fusionar o eliminar tablas;
- ejecutar SQL;
- crear migraciones;
- definir nombres fisicos definitivos;
- cambiar RLS, policies, triggers, indices, vistas o funciones;
- conectar aplicaciones a persistencia nueva;
- modificar codigo;
- tratar dominios logicos como estructuras fisicas aprobadas.

## Criterios para documentos posteriores

Cualquier documento posterior que avance hacia diseno fisico debera demostrar coherencia con:

- ACO-0001 a ACO-0006;
- SUPABASE-0001 a SUPABASE-0004;
- separacion entre dominios canonicos, evidencia y Expediente Vivo;
- separacion entre evento bruto, interpretacion IA, recomendacion IA, decision humana, accion ejecutada y resultado observado;
- trazabilidad de transiciones;
- certeza, vigencia, contradiccion, obsolescencia y gobernanza;
- separacion demo/productiva;
- restricciones de no implementacion hasta inventario remoto, respaldo, revision de dependencias, validacion humana y plan de rollback.

## Criterio de cierre

SUPABASE-0004 queda cumplido si establece una arquitectura logica suficientemente clara para que el futuro modelo fisico de persistencia pueda disenarse sin traicionar la doctrina ACO.

El documento debe permitir responder:

- que dominios logicos debe reconocer la persistencia operacional;
- que conceptos no deben mezclarse;
- como se vincula el Expediente Vivo sin absorber dominios canonicos;
- como se preservan evidencia, trazabilidad, certeza, vigencia, contradiccion, historia y gobernanza;
- por que demo y produccion deben permanecer separados;
- que riesgos doctrinales deben evitarse antes de cualquier diseno fisico.

El resultado esperado es una base conceptual para el siguiente paso arquitectonico, no una implementacion tecnica.

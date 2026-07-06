# PERSISTENCIA-0001 - Especificacion Arquitectonica Rectora de Persistencia y Conocimiento Operacional

## Estado

Documento rector integrador de la arquitectura de persistencia y conocimiento operacional de H-OperIA.

Integra las fases aprobadas de arquitectura de persistencia y conocimiento operacional de H-OperIA:

- Modelo Conceptual Rector.
- Diseno Logico Rector.
- Enmienda Arquitectonica.
- Arquitectura Fisica Conceptual.
- Ruta Operacional del Conocimiento.
- Cierre del ciclo de aprendizaje operacional.

Este documento no sustituye la serie ACO ni la serie SUPABASE.

Su funcion es consolidar su aplicacion practica como un unico marco arquitectonico referenciable para las siguientes fases de diseno.

## Estado documental

PERSISTENCIA-0001 constituye el documento integrador oficial del corpus de persistencia y conocimiento operacional.

Toda evolucion futura de las familias ACO, SUPABASE y de los documentos arquitectonicos relacionados debera evaluarse tambien respecto a PERSISTENCIA-0001 para preservar la coherencia del modelo.

## Restricciones

Este documento no autoriza:

- SQL.
- DDL.
- migraciones.
- creacion, modificacion o eliminacion de tablas.
- cambios en Supabase.
- cambios de codigo.
- definicion detallada de columnas.
- definicion de tipos de datos.
- policies, RLS, triggers, indices, vistas o funciones.

Todo avance fisico posterior requiere aprobacion humana explicita.

## Fuentes rectoras

Este documento se subordina a:

- ACO-0001 - Fundamentos del Conocimiento Operacional.
- ACO-0002 - Principios Rectores del Conocimiento Operacional.
- ACO-0003 - Calidad, Confianza y Certeza del Conocimiento Operacional.
- ACO-0004 - Taxonomia del Conocimiento Operacional.
- ACO-0005 - Aprendizaje Organizacional.
- ACO-0006 - Gobernanza del Conocimiento Operacional.
- SUPABASE-0001 - Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual.
- SUPABASE-0002 - Modelo Conceptual de Memoria Operacional y Objetos de Captura.
- SUPABASE-0003 - Ciclo de Vida de Objetos Operacionales y Trazabilidad de Transiciones.
- SUPABASE-0004 - Arquitectura Logica del Modelo de Persistencia Operacional.
- SUPABASE-0005 - Arquitectura de Dominios y Relaciones Logicas.
- SUPABASE-0006 - Arquitectura Modular de Persistencia Conceptual.

La serie ACO define la doctrina superior del conocimiento operacional.

La serie SUPABASE traduce esa doctrina hacia persistencia conceptual, logica y modular.

PERSISTENCIA-0001 consolida la arquitectura aplicada que debera orientar el diseno detallado posterior.

## Principio rector

H-OperIA no persiste datos por almacenarlos.

H-OperIA persiste memoria operacional gobernada para convertir operacion en conocimiento, conocimiento en decisiones, decisiones en acciones, acciones en resultados y resultados en aprendizaje reutilizable.

La persistencia futura debe permitir explicar:

```text
que se sabe
por que se sabe
de donde salio
con que evidencia
con que certeza
quien lo valido
que decision produjo
que accion se ejecuto
que resultado se observo
que aprendizaje genero
como queda disponible para futuras decisiones
```

## Modelo Conceptual Rector

El Modelo Conceptual Rector establece que la persistencia de H-OperIA debe representar memoria operacional viva, no solo registros.

El ciclo conceptual base es:

```text
operacion
  -> captura
  -> evidencia
  -> conocimiento
  -> decision
  -> accion
  -> resultado
  -> aprendizaje
  -> conocimiento gobernado
  -> inteligencia futura
```

### Dominios conceptuales mayores

La arquitectura reconoce estos grandes dominios:

- contexto e identidad operacional;
- cliente, prospecto y relacion humana;
- proyecto, producto e inventario;
- reserva e interes operacional;
- actividad comercial y seguimiento humano;
- comunicaciones externas multicanal;
- Marta como acompanamiento;
- VAPI y voz;
- coordinacion interna;
- documentos;
- pagos y compromisos financieros;
- servicio, postventa, entregas y garantias;
- marketing, campanas y origen comercial;
- H-OperIA Intelligence;
- demo y escenarios simulados;
- legacy y puente de transicion;
- evidencia y trazabilidad;
- Expediente Vivo;
- aprendizaje y gobernanza.

### Ejes estructurales

Los ejes estructurales del modelo son:

- Expediente Vivo: continuidad operacional del caso.
- Evidencia: soporte explicativo de afirmaciones, decisiones y transiciones.
- Transicion operacional: historia de cambios relevantes.
- Decision humana: responsabilidad y criterio.
- Accion ejecutada: intervencion realizada.
- Resultado observado: consecuencia posterior.
- Gobernanza: integridad, vigencia, revision y archivo del conocimiento.

## Diseno Logico Rector

El Diseno Logico Rector traduce el modelo conceptual en agrupaciones logicas persistibles sin definir estructuras fisicas.

Cada agrupacion logica debe declarar:

- responsabilidad;
- fronteras;
- relaciones;
- criterios de persistencia;
- separacion demo/productiva;
- separacion legacy/modelo rector;
- diferencia entre canal, agente, evidencia, interpretacion, decision, accion y resultado.

### Agrupaciones logicas rectoras

1. Contexto e identidad operacional.
2. Identidad relacional.
3. Proyecto, producto e inventario.
4. Nucleo comercial.
5. Comunicaciones externas.
6. Marta.
7. VAPI y voz.
8. Coordinacion interna.
9. Documentos.
10. Finanzas y pagos.
11. Servicio, postventa, entregas y garantias.
12. Evidencia y trazabilidad.
13. Expediente Vivo.
14. Interpretacion IA, decision, accion y resultado.
15. H-OperIA Intelligence.
16. Aprendizaje y gobernanza.
17. Demo.
18. Legacy.

### Reglas logicas

- Cada dominio conserva identidad propia.
- El Expediente Vivo conecta sin absorber.
- La Evidencia respalda sin reemplazar.
- Intelligence interpreta, prioriza y recomienda; no decide.
- El humano valida, corrige, acepta, rechaza o decide.
- La accion ejecutada no equivale a resultado observado.
- El resultado observado alimenta aprendizaje.
- Demo no contamina produccion.
- Legacy se clasifica y se vincula; no gobierna el modelo nuevo.

## Enmienda Arquitectonica

La Enmienda Arquitectonica incorpora dos conceptos transversales obligatorios:

1. Objeto Operacional Canonico.
2. Origen Operacional Canonico.

### Objeto Operacional Canonico

Un Objeto Operacional Canonico representa el hecho operacional unico sobre el cual convergen canales, agentes, evidencias, interpretaciones y procesos.

Ejemplos:

- cliente identificado;
- reserva iniciada;
- documento requerido;
- documento recibido;
- pago prometido;
- pago validado;
- seguimiento comercial pendiente;
- llamada realizada;
- mensaje enviado;
- decision humana tomada;
- accion ejecutada;
- resultado observado;
- riesgo detectado;
- ticket de servicio abierto;
- garantia solicitada.

Regla de no duplicidad:

```text
Un mismo hecho operacional solo podra tener un Objeto Operacional Canonico.
Los canales, agentes, evidencias, interpretaciones, vistas y procesos posteriores deberan relacionarse con dicho objeto sin sustituirlo, fragmentarlo ni duplicarlo.
```

### Origen Operacional Canonico

El Origen Operacional Canonico representa el nacimiento gobernado de un Objeto Operacional Canonico.

Debe explicar:

- punto inicial de captura;
- actor humano, sistema, agente o integracion que lo genero;
- canal usado;
- contexto operativo;
- momento de captura;
- ambiente demo, produccion o legacy;
- responsabilidad inicial;
- evidencia inicial;
- confianza inicial;
- relacion con evento bruto;
- posibilidad de verificacion humana;
- ciclo de vida desde su creacion.

El Origen Operacional Canonico no se reduce a una etiqueta de aplicacion fuente. Es una explicacion arquitectonica de procedencia, responsabilidad y trazabilidad.

### Fronteras reforzadas

- Comunicaciones externas conservan intercambio, no objetos derivados.
- Marta acompana e interpreta, no decide ni reemplaza dominios.
- VAPI conserva voz tecnica, no reemplaza Marta ni WhatsApp.
- Intelligence analiza y recomienda, no crea verdad sin evidencia.
- Coordinacion interna conserva acuerdos internos, no reemplaza decisiones formales.
- Evidencia explica, no sustituye objeto.
- Expediente Vivo conecta, no absorbe.
- Demo simula, no contamina produccion.
- Legacy se clasifica, no gobierna arquitectura nueva.

## Arquitectura Fisica Conceptual

La Arquitectura Fisica Conceptual identifica futuras entidades fisicas candidatas sin definir tablas, columnas ni tipos de datos.

### Criterio para entidad fisica independiente

Una entidad candidata merece convertirse en tabla independiente si cumple una o varias condiciones:

- tiene ciclo de vida propio;
- tiene estado, transiciones o responsables propios;
- puede existir desde varios origenes de captura;
- requiere evidencia o auditoria especifica;
- es consultada directamente por la operacion;
- no debe depender de un canal particular;
- puede alimentar Intelligence o aprendizaje;
- tiene reglas de negocio propias;
- mezclarla con otra entidad causaria perdida de significado;
- persistirla como estructura generica impediria trazabilidad.

No merece tabla independiente si solo es:

- propiedad descriptiva simple;
- clasificacion auxiliar;
- estado derivable;
- vista de lectura;
- duplicacion de otro objeto canonico;
- salida temporal sin valor historico, operativo o evidencial.

### Familias de entidades fisicas candidatas

La arquitectura fisica conceptual reconoce familias candidatas asociadas a:

- organizaciones, proyectos y contextos;
- clientes, prospectos, usuarios, roles y responsables;
- proyectos, unidades, inventario, disponibilidad y condiciones;
- intereses, reservas, seguimientos, actividades y resultados comerciales;
- conversaciones, mensajes, eventos y entregas de canal;
- interacciones, propuestas y resumenes de Marta;
- llamadas, registros tecnicos, transcripciones y salidas de VAPI;
- mensajes internos, hilos, coordinaciones y escalaciones;
- requisitos, documentos, revisiones, observaciones y validaciones;
- compromisos, comprobantes, pagos, validaciones y atrasos;
- tickets, reclamos, garantias, entregas y resoluciones;
- evidencias, fuentes, eventos brutos y vinculos evidenciales;
- expedientes, vinculos, timeline y estados de expediente;
- interpretaciones, recomendaciones, decisiones, acciones y resultados;
- senales, hallazgos, riesgos, oportunidades y respuestas ejecutivas;
- experiencias, patrones, aprendizajes, conocimiento institucional y revisiones;
- corridas, escenarios, inyecciones y evidencias demo;
- registros legacy, bitacoras, clasificaciones y correspondencias.

Estas familias son candidatas conceptuales. No constituyen diseno fisico detallado.

## Ruta Operacional del Conocimiento

La Ruta Operacional del Conocimiento es el mecanismo arquitectonico rector que consolida como una salida de H-OperIA Intelligence llega al lugar correcto, para la persona correcta, en el contexto correcto y con la trazabilidad adecuada.

### Justificacion del nombre

El corpus existente ya contenia piezas parciales:

- Expediente Vivo como continuidad.
- Evidencia como soporte.
- Recomendacion como propuesta.
- Decision como responsabilidad humana.
- Accion como ejecucion.
- Resultado como consecuencia.
- Pagina destino y seccion destino como ubicacion visual-operativa en demo.
- Vistas como consumidores.
- Gobernanza como proteccion del conocimiento.

Sin embargo, ninguna denominacion existente cubria todo el recorrido de distribucion operacional del conocimiento generado por Intelligence.

Por eso se consolida el nombre rector:

```text
Ruta Operacional del Conocimiento
```

### Definicion

La Ruta Operacional del Conocimiento conecta una salida de H-OperIA Intelligence con:

- objeto operacional afectado;
- Expediente Vivo correspondiente cuando aplica;
- evidencia que la sustenta;
- dominio responsable;
- vista, pagina o seccion donde debe manifestarse;
- consumidor operacional;
- responsable humano;
- recomendacion sugerida;
- decision humana posterior;
- accion ejecutada;
- resultado observado;
- aprendizaje validado;
- conocimiento gobernado actualizado.

### Regla rectora

```text
Toda salida relevante de H-OperIA Intelligence debe tener una Ruta Operacional del Conocimiento antes de considerarse accionable.
```

La ruta debe responder:

- que detecto Intelligence;
- sobre que objeto o expediente aplica;
- con que evidencia;
- en que dominio debe revisarse;
- en que vista, pagina o seccion debe aparecer;
- quien debe revisarlo;
- que recomendacion propone;
- que decision humana requiere;
- que accion puede derivarse;
- que resultado debera observarse;
- como se auditara despues;
- como alimentara aprendizaje futuro.

### Componentes integrados

1. Salida Intelligence.
2. Objeto Operacional Canonico afectado.
3. Expediente Vivo.
4. Evidencia.
5. Contexto de actuacion.
6. Consumidor operacional.
7. Pagina destino y seccion destino.
8. Vista.
9. Recomendacion.
10. Decision humana.
11. Accion.
12. Resultado.
13. Aprendizaje validado.
14. Conocimiento gobernado actualizado.
15. Distribucion gobernada.

### Reglas de no confusion

- La Ruta Operacional del Conocimiento no es una tabla.
- No es una pantalla.
- No es una recomendacion IA.
- No es el Expediente Vivo.
- No es la evidencia.
- No es una decision humana.
- No reemplaza dominios canonicos.
- No convierte una senal en hecho confirmado.
- No mezcla demo con produccion.
- No permite que Intelligence actue como autoridad final.

## Cierre del ciclo de aprendizaje operacional

El ciclo rector completo queda definido asi:

```text
H-OperIA Intelligence detecta
-> vincula con objeto operacional
-> sustenta con evidencia
-> ubica en Expediente Vivo si aplica
-> determina contexto de actuacion
-> asigna consumidor operacional
-> manifiesta en pagina/seccion/vista destino
-> propone recomendacion
-> espera decision humana
-> deriva accion
-> observa resultado
-> valida aprendizaje
-> actualiza conocimiento gobernado
-> queda disponible para futuras decisiones y actuaciones de H-OperIA Intelligence
```

La Ruta Operacional del Conocimiento no termina en la accion.

Tampoco termina en el resultado observado.

Termina cuando el resultado observado permite validar aprendizaje, actualizar conocimiento gobernado y dejar ese conocimiento disponible para futuras decisiones y actuaciones de H-OperIA Intelligence.

## Preparacion para diseno detallado de entidades fisicas

Antes de iniciar el diseno detallado de entidades fisicas, toda entidad candidata debera declarar:

- dominio rector;
- responsabilidad;
- frontera;
- Objeto Operacional Canonico que representa o relaciona;
- Origen Operacional Canonico cuando aplique;
- relacion con Expediente Vivo;
- relacion con Evidencia;
- relacion con recomendaciones, decisiones, acciones y resultados;
- relacion con Ruta Operacional del Conocimiento cuando aplique;
- separacion demo/productiva;
- tratamiento legacy si aplica;
- criterio de independencia fisica;
- riesgos de duplicidad;
- consumidor operacional principal;
- valor para aprendizaje y gobernanza.

## Criterio de cierre

PERSISTENCIA-0001 queda cumplido si ofrece un marco unico y referenciable para continuar hacia el diseno detallado de entidades fisicas sin perder la doctrina ACO, la progresion SUPABASE ni las fases aprobadas.

Este documento consolida:

- el modelo conceptual;
- el diseno logico;
- la enmienda contra duplicidad;
- la arquitectura fisica conceptual;
- la Ruta Operacional del Conocimiento;
- el cierre del ciclo de aprendizaje operacional.

El siguiente paso autorizado, previa aprobacion humana, sera iniciar el diseno detallado de entidades fisicas.

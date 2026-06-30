# DEMO-0001 - Especificacion del Panel de Evidencia Viva del Centro Demo

## Estado

Especificacion futura.

Este documento preserva un concepto descubierto durante el trabajo del Centro Demo. No constituye implementacion inmediata, no modifica el alcance vigente y no autoriza cambios de codigo por si mismo.

---

# Proposito

Definir el concepto futuro de Panel de Evidencia Viva para el Centro Demo.

El panel debera permitir mostrar acciones recientes capturadas durante una presentacion, integradas de forma natural dentro de la narrativa operativa, sin romper la sensacion de estar observando una operacion real de produccion.

---

# Problema que resuelve

Durante una demostracion puede existir una brecha entre:

* la corrida operacional base ya preparada;
* las acciones realizadas en vivo por el presentador o usuario;
* la necesidad de que esas acciones se vean reflejadas como evidencia verificable;
* la obligacion de no contaminar la interfaz con lenguaje artificial de demo.

Si la evidencia aparece como bloque explicativo, maqueta o aviso escenico, pierde credibilidad.

Si no aparece, el usuario puede sentir que la accion realizada durante la presentacion no tuvo efecto visible.

El Panel de Evidencia Viva busca resolver esa tension.

---

# Principio narrativo

La evidencia viva debe sonar como operacion real.

La interfaz visible no debe explicar que esta creando credibilidad, simulando datos o preparando una demostracion. Debe presentar actividad operacional reciente como si perteneciera naturalmente al flujo de produccion.

La demostracion debe conservar su narrativa sin revelar el artificio interno de la demo.

---

# Diferencia entre corrida operacional base y evidencia viva

## Corrida operacional base

La corrida operacional base representa el conjunto principal de datos ya generados o preparados para sostener la demostracion.

Puede incluir reservas, llamadas, reportes comerciales, mensajes internos, evidencias administrativas y hallazgos interpretados por H-OperIA Intelligence.

Su objetivo es dar volumen y continuidad al Centro Demo.

## Evidencia viva

La evidencia viva representa acciones recientes capturadas durante la presentacion.

No reemplaza la operacion principal. No pretende generar una nueva base masiva de datos. Su funcion es mostrar que una accion realizada en vivo queda reflejada como actividad operacional verificable.

La evidencia viva debe aparecer como informacion reciente, puntual y contextual.

---

# Aplicacion inicial en FASE 03

La aplicacion inicial prevista es FASE 03, donde conviven:

* Registro de Seguimiento Comercial;
* Mensajes entre el Equipo.

Estas dos areas permiten mostrar actividad posterior a una reserva sin introducir lenguaje artificial.

El Panel de Evidencia Viva podria aparecer como una seccion discreta de actividad reciente dentro de cada bloque, sin sustituir la tabla principal ni alterar la corrida base.

---

# Ejemplo para Registro de Seguimiento Comercial

En Registro de Seguimiento Comercial, la evidencia viva podria mostrar una accion reciente de una vendedora:

* origen: app de vendedoras;
* tipo de interaccion: seguimiento posterior a reserva;
* resumen: llamada realizada, objecion registrada o siguiente paso acordado;
* prioridad;
* fecha y hora;
* estado.

La redaccion debe parecer parte normal del seguimiento comercial.

Ejemplo conceptual:

* Vendedora responsable registro llamada de seguimiento.
* Cliente solicito detalle financiero antes de confirmar cita.
* Proximo paso: enviar simulacion y confirmar respuesta.

No debe describirse como evidencia preparada para la demo.

---

# Ejemplo para Mensajes entre el Equipo

En Mensajes entre el Equipo, la evidencia viva podria mostrar coordinacion interna reciente:

* origen;
* destino;
* tema;
* mensaje;
* prioridad;
* fecha y hora.

La mensajeria interna no debe asociarse visualmente a un cliente como columna principal si la intencion es mostrar coordinacion del equipo.

Ejemplo conceptual:

* Coordinacion comercial informa a financiera que existe una duda de pago.
* Servicio al cliente solicita validar documento antes de responder.
* Direccion comercial pide confirmar responsable del siguiente paso.

Debe sentirse como comunicacion operacional real, no como narracion de prueba.

---

# Regla estricta de lenguaje

En la interfaz visible no deben usarse expresiones como:

* preparado para esta demostracion;
* evidencia para crear credibilidad;
* maqueta;
* simulacion cerrada;
* datos ficticios visibles;
* bloque demo;
* evidencia demo;
* contenido escenico;
* cualquier frase equivalente que exponga el artificio de la demostracion.

El lenguaje visible debe ser natural, operativo y compatible con produccion.

---

# Experiencia esperada

La experiencia debe transmitir que el sistema esta mostrando actividad reciente de una operacion real.

El usuario debe poder reconocer:

* que ocurrio una accion;
* donde quedo registrada;
* quien o que area intervino;
* cual es el siguiente paso;
* que la operacion principal sigue intacta.

El panel debe apoyar la credibilidad sin declarar que esta intentando producirla.

---

# Limites del patron

El Panel de Evidencia Viva no debe aplicarse como motor de generacion masiva de datos simulados.

No debe sustituir:

* FASE 04 como preparacion, auditoria e inyeccion de datos;
* la corrida operacional base;
* los registros principales de cada pagina;
* la interpretacion posterior de H-OperIA Intelligence.

Su funcion es puntual: reflejar acciones recientes capturadas durante la presentacion.

---

# Relacion futura con FASE 04

FASE 04 seguira siendo el espacio conceptual para preparar, auditar, regenerar, aprobar e inyectar datos simulados de la Empresa Demo.

El Panel de Evidencia Viva podria relacionarse con FASE 04 como una capa complementaria de actividad reciente, posterior o paralela a la corrida base.

No debe confundirse con el proceso de generacion masiva ni con la auditoria de calidad de datos.

---

# Relacion futura con H-OperIA Intelligence

H-OperIA Intelligence podria interpretar evidencia viva cuando esta exista y cuando tenga suficiente trazabilidad.

En ese horizonte, una accion reciente podria influir en:

* prioridades;
* riesgos;
* oportunidades;
* recomendaciones;
* observaciones ejecutivas;
* hallazgos verificables dentro del Admin.

Sin embargo, la evidencia viva no debe forzar hallazgos artificiales. Su valor dependera de su coherencia operacional.

---

# Evolucion futura

Esta especificacion puede evolucionar hacia:

* criterios de visualizacion;
* reglas de captura;
* modelo de estado temporal;
* integracion con FASE 03;
* integracion con FASE 04;
* interpretacion por H-OperIA Intelligence;
* auditoria de acciones recientes;
* patrones de lenguaje natural de produccion.

Toda evolucion futura debera ser autorizada explicitamente y documentada antes de implementarse.

---

# Resultado esperado

DEMO-0001 preserva el concepto de Panel de Evidencia Viva sin convertirlo todavia en cambio funcional.

Su valor inmediato es proteger la direccion narrativa: mostrar evidencia reciente de forma natural, creible y productiva, sin exponer la maquinaria de la demostracion.

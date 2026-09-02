# Patron H-OperIA Intelligence para hallazgos y acciones

## 1. Proposito

H-OperIA Intelligence transforma senales y evidencia operativa dispersa en conocimiento accionable para el equipo humano. El objetivo no es producir texto descriptivo: es ayudar a una persona o area a entender que ocurrio, por que importa, que debe hacer y que evidencia debe quedar despues.

El patron conserva la decision en manos del equipo. Intelligence interpreta, ordena y propone; no sustituye la coordinacion humana ni inventa hechos fuera de las fuentes disponibles.

## 2. Anatomia de un hallazgo de alta calidad

La secuencia reusable es:

```text
EVIDENCIA / SENAL
-> HALLAZGO DETECTADO
-> POR QUE IMPORTA
-> ACCION SUGERIDA
-> RESPONSABLE
-> TRAZABILIDAD TEMPORAL
-> CONVERSACION / SEGUIMIENTO OPERACIONAL
```

En la implementacion vigente, la evidencia aporta una fuente, una identidad de origen y, cuando es valida, una fecha. El hallazgo conserva `demoRunId`, `reservationId`, `expedienteId`, `sourceEntityId`, `sourceTimestamp` y `generatedAt`. La interpretacion se expresa como `operationalRecommendation`; la accion como `recommendedAction`; y el responsable como `responsibleRole` o `responsiblePerson`.

Un aporte humano aceptado puede volver al mismo hallazgo como evidencia de `operational_messaging`, dejando su autor, tipo, fecha y procedencia. La identidad del aporte debe coincidir con la del caso y del hallazgo antes de enriquecerlo.

## 3. Principios de calidad

- Contextualizar por cliente, reserva y expediente; no mezclar senales de casos distintos.
- Usar hechos concretos disponibles en la fuente: unidad, tema, objecion, intencion, rol, proximo paso o estado registrado.
- Explicar causalmente por que una senal puede frenar, duplicar, desordenar o hacer perder continuidad al caso.
- Proponer una accion especifica, ejecutable y expresada con verbo: contactar, resolver, confirmar, documentar, asignar o registrar.
- Asignar un responsable explicito: vendedora, coordinacion comercial, financiera u otra area identificada por la evidencia.
- Definir un siguiente paso verificable y que resultado debe quedar registrado.
- Mantener trazabilidad a evidencia, fuente, identidad temporal y procedencia.
- Conservar `reservationId`, `expedienteId` y `demoRunId` cuando el flujo corresponda a una corrida operacional.
- Usar lenguaje operacional, directo y legible por quien debe actuar; no lenguaje academico ni diagnosticos abstractos.
- Evitar el equivalente vacio de "dar seguimiento". Debe indicar quien actua, sobre que hecho, que debe resolver y que debe documentar.

## 4. Hallazgo debil y hallazgo fuerte

| Nivel | Ejemplo | Por que sirve o falla |
| --- | --- | --- |
| Debil | "Cliente tiene duda financiera. Dar seguimiento." | No identifica fuente, alcance de la duda, responsable, accion ni evidencia de cierre. |
| Fuerte | "El cliente expreso una necesidad de financiamiento en la interaccion registrada. Si no se resuelve antes del siguiente contacto, la conversacion puede estancarse. La vendedora asignada debe contactar al cliente, resolver la duda, confirmar comprension y registrar el compromiso siguiente." | Parte de una senal concreta, explica el impacto, asigna responsable, define accion y deja un cierre verificable. |

El ejemplo fuerte reproduce la forma semantica de la derivacion vigente para una senal de voz; no convierte una frase particular, una persona ni un dato demo en regla universal.

## 5. Patron semantico recomendado

**Hallazgo detectado.** Que ocurrio o que senal aparecio. Debe referirse al hecho disponible, no a una suposicion.

**Por que importa.** Que consecuencia operacional puede producir si se deja sin atender. Debe agregar causalidad, no repetir el hallazgo.

**Accion sugerida.** Que debe hacer concretamente una persona o area, incluyendo el asunto que debe resolver.

**Responsable.** Quien asume la siguiente accion, tomado de la fuente o de la asignacion operacional disponible.

**Cierre esperado.** Que compromiso, decision, evidencia o proximo paso debe quedar registrado para conservar continuidad.

## 6. Ejemplo validado: Roberto Castillo

La validacion humana del 1 de septiembre de 2026 uso a Roberto Castillo como muestra semantica del patron. El nombre forma parte de las cohortes simuladas y no debe tratarse como dato persistente ni como regla de negocio.

Cuando una corrida contenga evidencia equivalente para ese expediente, los cuatro tipos de hallazgo conservan esta estructura:

1. **Coordinacion con vendedora.** Un mensaje interno registra un tema de coordinacion. El hallazgo explica que hace falta un responsable claro para evitar respuestas duplicadas o ausencia de seguimiento; la accion asigna la respuesta y exige registrar el proximo contacto.
2. **Seguimiento comercial / monto de prima.** Un reporte de vendedora registra una objecion concreta, como el monto de prima, y un siguiente paso. El hallazgo explica que la objecion puede frenar el avance; la accion exige ejecutar el siguiente contacto, resolver la objecion y documentar el resultado.
3. **Intervencion humana / confirmar financiamiento.** Una interaccion de voz registra la intencion de confirmar financiamiento. El hallazgo vincula la necesidad con el riesgo de perder continuidad; la accion pide contacto humano, resolucion, confirmacion de comprension y registro del compromiso.
4. **Reserva operacional activa.** La reserva contiene cliente y unidad. El hallazgo conserva el contexto de la unidad y pide confirmar la condicion principal y registrar el siguiente paso.

El valor a preservar es siempre el mismo: **hecho concreto -> consecuencia -> accion concreta -> responsable**.

## 7. Relacion con Expediente Vivo

FASE 05 es una sintesis agrupada por expediente para priorizar lectura. El detalle rico vive en Expediente Vivo, donde el equipo puede consultar todos los hallazgos del mismo `expedienteId` junto con evidencia, interpretacion, accion, responsable, procedencia, temporalidad y aportes posteriores.

Esta separacion evita saturar la vista ejecutiva y permite que una sintesis lleve a una investigacion contextualizada. La seleccion manual del expediente conserva la responsabilidad humana sobre cual caso se abre y revisa.

## 8. Relacion con Mensajeria Operacional

El principio de integracion es:

```text
H-OperIA Intelligence detecta e interpreta
-> propone una accion
-> puede abrir un caso operacional
-> personas aportan hechos, evidencia o recomendaciones
-> el conocimiento vuelve al expediente y puede enriquecer el hallazgo
```

La implementacion actual valida identidad de corrida, reserva, expediente, hallazgo, caso y bridge antes de aceptar un aporte. Un aporte aceptado se agrega como evidencia y marca el hallazgo como actualizado. Esto describe el flujo integrado disponible; no implica que toda futura mensajeria, fuente o automatizacion este implementada.

## 9. Anti-patrones

- Textos genericos intercambiables entre clientes o expedientes.
- Repetir el hallazgo en "Por que importa" sin explicar su consecuencia.
- Recomendaciones sin verbo de accion o sin objeto concreto.
- Acciones sin responsable.
- Recomendaciones desconectadas de la evidencia disponible.
- Inventar hechos, fechas, roles, riesgos o compromisos que no aparecen en las fuentes.
- Exceso de texto cuando una instruccion concreta basta.
- Sustituir una decision humana cuando corresponde coordinacion, contraste o aprobacion del equipo.
- Perder identidad relacional entre `demoRunId`, reserva, expediente, fuente y hallazgo.

## 10. Reutilizacion futura

El dominio puede cambiar sin cambiar el patron. Se puede aplicar a Ventas, Cobros, Documentos, Construccion, Servicio al Cliente, Experiencia del Usuario, Direccion General y otros componentes de la Suite H-OperIA.

```text
senal
-> interpretacion
-> impacto
-> accion
-> responsable
-> evidencia
-> aprendizaje organizacional
```

Cada modulo debe definir sus fuentes, responsables y criterios de cierre propios. No debe reutilizar ciegamente textos de la demo; debe reutilizar la estructura de razonamiento, trazabilidad y colaboracion humana.

## 11. Checklist de aceptacion

- [ ] Esta sustentado por evidencia identificable.
- [ ] Identifica claramente que ocurrio.
- [ ] Explica por que importa sin repetir el hallazgo.
- [ ] Indica una accion especifica.
- [ ] Tiene responsable.
- [ ] Define que debe quedar registrado.
- [ ] Mantiene trazabilidad de fuente, tiempo e identidad.
- [ ] Evita inventar informacion.
- [ ] Ayuda al equipo a actuar mejor.
- [ ] Convierte informacion en conocimiento operacional.

## 12. Trazabilidad tecnica

**HEAD de referencia:** `684f7598739117eb9b20d98d545085f3826d35da`.

**Logica vigente:**

- `src/demo/derivation/deriveDemoFindings.ts`: transforma reservas, mensajes internos, seguimientos comerciales y logs de voz de FASE 04 en hallazgos con interpretacion, accion, responsable, fuente y temporalidad.
- `src/demo/derivation/auditScenarioClients.ts`: verifica identidad de corrida, reserva, expediente, fuente y relacion con `LiveExpediente`; no genera el texto del hallazgo.
- `src/demo/domain/demoFindings.ts`: define el contrato de hallazgos, evidencia y aportes operacionales.
- `src/demo/derivation/applyOperationalContributionToFinding.ts`: incorpora aportes humanos aceptados al mismo hallazgo sin duplicar evidencia.
- `src/demo/bridge/operationalCaseMessagingBridge.ts`: construye y valida el caso operacional para mensajeria.
- `src/App.tsx`: genera evidencia simulada, invoca la derivacion, presenta la sintesis en FASE 05 y muestra el detalle filtrado por `expedienteId` en Expediente Vivo.

**Evolucion historica relevante:**

- `b6e873d7acb945b748a413d1c6b1ae83256340c6`: derivacion de hallazgos desde evidencia FASE 04.
- `b156ed6`: soporte para multiples Expedientes Vivos por corrida.
- `971bbe0`: alineacion entre evidencia FASE 04 y Expedientes Vivos.
- `375bfb8fa502bc655064ff8b45e0de325754a360`: conservacion de procedencia de evidencia.
- `800b513230986392354354d9df765a902f79acac`: apertura de hallazgos en Mensajeria Operacional.
- `48a07d18535602a9c91c2f0cf2152f8e113d3c78`: refinamiento del flujo Intelligence y Expediente Vivo, incluida la sintesis por expediente.
- `4789e28d84ddb2b8e467e5fed8067cbd8c0321a4`: aportes humanos que enriquecen el hallazgo.
- `684f7598739117eb9b20d98d545085f3826d35da`: restauracion de FASE 05 compacta y navegacion general a Expediente Vivo.

Los nombres, montos, unidades, mensajes y escenarios de FASE 04 son fixtures o datos simulados de demostracion. El patron reusable es la conversion trazable de evidencia en interpretacion, accion responsable y aprendizaje operacional dentro del expediente.

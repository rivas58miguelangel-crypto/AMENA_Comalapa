# ADR-002 - Gobernanza de Autoridades Rectoras de la Suite H - OperIA

* **Estado:** Aprobado
* **Version:** 1.0
* **Fecha de aprobacion:** 2026-07-18
* **Responsable:** Arquitectura H - OperIA
* **Clasificacion:** Decision arquitectonica rectora
* **Alcance:** Suite H - OperIA y aplicaciones que adopten su arquitectura

---

## 1. Problema arquitectonico

La Suite H - OperIA contiene aplicaciones especializadas, documentos, componentes e implementaciones derivadas. Sin un mecanismo explicito de autoridad por dominio, una implementacion hermana, una referencia practica o una instruccion temporal puede ser tratada incorrectamente como criterio canonico.

Esa ambiguedad debilita la coherencia entre aplicaciones, permite decisiones por aproximacion y dificulta reconstruir por que una direccion arquitectonica debe prevalecer sobre otra.

---

## 2. Proposito

Establecer un mecanismo permanente para designar, versionar, consultar y certificar Autoridades Rectoras dentro de los dominios de la Suite H - OperIA.

El mecanismo permite que cada intervencion identifique la entidad aprobada que dirige las decisiones de su dominio, distinga las implementaciones derivadas y preserve las excepciones autorizadas sin crear autoridades alternativas.

---

## 3. Alcance y no alcance

Este ADR aplica a todo dominio de la Suite que requiera una direccion arquitectonica explicita, incluyendo visual, persistencia, IA, seguridad, operacion e integraciones cuando exista una decision aprobada que lo justifique.

Este ADR no:

* designa Autoridades Rectoras para dominios futuros sin una decision especifica aprobada;
* sustituye ADR-001, GOV-0001, KB-0003, FO-COC-0001 ni documentos tecnicos especializados;
* convierte una aplicacion, documento o repositorio en autoridad por su mera existencia;
* sustituye Git/GitHub como medio oficial versionado y trazable.

---

## 4. Diferenciacion normativa

**Git/GitHub** es el medio oficial versionado y trazable donde residen documentos, decisiones, registros y codigo aprobados.

**Ubicacion documental o repositorio** es la ruta verificable donde se encuentra la evidencia de una decision o implementacion.

**Autoridad Rectora** es la entidad aprobada que posee autoridad arquitectonica para dirigir decisiones dentro de un dominio determinado.

Una Autoridad Rectora debe estar documentada y versionada en Git/GitHub, pero Git/GitHub no se convierte por ello en Autoridad Rectora de cada dominio.

---

## 5. Terminologia normativa

* **Dominio:** ambito arquitectonico que puede requerir direccion propia.
* **Autoridad Rectora:** entidad aprobada que define la direccion canonica de un dominio.
* **Implementacion hermana:** implementacion derivada con valor de referencia que no puede sustituir ni redefinir la Autoridad Rectora.
* **Aplicacion objetivo:** aplicacion, modulo o artefacto al que se aplica una intervencion derivada de la Autoridad Rectora.
* **Excepcion autorizada:** limite expresamente aprobado que conserva identidad o comportamiento propio sin crear una Autoridad Rectora alternativa.
* **Registro de Autoridades Rectoras:** artefacto vivo y versionado que contiene las designaciones vigentes y su evidencia.

---

## 6. Decision arquitectonica

La Suite H - OperIA se regira por Autoridades Rectoras declaradas por dominio. Ninguna auditoria, propuesta o modificacion dentro de un dominio gobernado puede iniciar sin reconstruir y certificar la entrada aplicable del Registro de Autoridades Rectoras.

La ausencia, ambiguedad, contradiccion o falta de certificacion de una Autoridad Rectora aplicable bloquea el trabajo dentro del dominio afectado hasta que la deficiencia quede resuelta mediante gobierno documental aprobado.

Las implementaciones hermanas pueden aportar evidencia practica de adaptacion, pero no adquieren autoridad para redefinir el dominio.

---

## 7. Modelo de autoridad

Cada designacion vigente debe establecer, como minimo:

1. dominio y alcance;
2. Autoridad Rectora y evidencia verificable;
3. implementaciones hermanas, cuando existan;
4. aplicaciones objetivo vigentes, cuando correspondan;
5. excepciones autorizadas y sus limites;
6. estado y trazabilidad de la decision.

Solo puede existir una Autoridad Rectora vigente por dominio y alcance. Cualquier subdivision de un dominio debe estar definida, aprobada y registrada formalmente. No pueden existir autoridades concurrentes o competidoras sobre el mismo dominio y alcance.

La autoridad dirige la derivacion arquitectonica. Las implementaciones hermanas ilustran adaptaciones y pueden aportar evidencia practica, pero no pueden sustituir, redefinir ni competir con la Autoridad Rectora. No adquieren autoridad por antiguedad, similitud, conveniencia o reutilizacion.

La aplicacion objetivo recibe y adapta las decisiones de la Autoridad Rectora. No puede redefinir el dominio durante una adaptacion ni convertirse automaticamente en Autoridad Rectora como consecuencia de una implementacion.

Las excepciones solo operan dentro de sus limites declarados. Toda excepcion debe ser aprobada, delimitada, verificable, trazable y constar en el Registro. Nunca puede ser implicita ni deducirse por proximidad visual, tecnica o funcional.

---

## 8. Registro de Autoridades Rectoras

`REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA` es el artefacto vivo y versionado que conserva las designaciones vigentes.

El Registro implementa este ADR; no lo sustituye ni puede crear una Autoridad Rectora sin una decision arquitectonica aprobada. Las entradas nuevas, modificaciones, sustituciones y retiros deben seguir el procedimiento del Registro y mantener trazabilidad hacia la decision aprobada correspondiente.

---

## 9. Primera declaracion vinculante: dominio visual

La primera designacion vigente es `AR-VIS-001`.

* **Autoridad Rectora Visual:** Admin / Centro de Mando, dentro de `C:\Amena\Codex\AMENA_Comalapa`.
* **Implementaciones hermanas:** Comunicaciones Internas y Registro Operacional. Son referencias derivadas y no pueden sustituir ni redefinir la Autoridad Rectora Visual.
* **Aplicacion objetivo actual:** App Publica de Reservas.

La Autoridad Rectora Visual dirige el ADN visual comun de la Suite, incluyendo geometria, tipografia, jerarquia, densidad, superficies, tarjetas, botones, campos, bordes, sombras, radios, iconografia, navegacion, modales, estados y espaciados.

---

## 10. Excepciones de identidad del cliente

La identidad grafica especifica del proyecto cliente puede conservarse en el encabezado cuando este claramente delimitada por la entrada aplicable del Registro.

La excepcion puede incluir logo, nombre, tagline, colores, fondo u otros activos graficos propios del cliente. No convierte la navegacion del flujo, las superficies comunes ni el cuerpo de la aplicacion en una excepcion automatica ni en una Autoridad Rectora alternativa.

La excepcion de identidad grafica no incluye automaticamente progreso, navegacion, superficies comunes, cuerpo de la aplicacion, controles, estados, modales ni espaciados estructurales. Estos elementos permanecen gobernados por la Autoridad Rectora Visual, salvo una excepcion adicional aprobada y registrada formalmente.

---

## 11. Puerta de validacion y regla de bloqueo

Antes de iniciar una auditoria, propuesta o modificacion en un dominio gobernado, debe verificarse:

1. que existe una entrada vigente aplicable en el Registro;
2. que la Autoridad Rectora y su evidencia fueron inspeccionadas;
3. que las implementaciones hermanas y la aplicacion objetivo fueron distinguidas correctamente;
4. que las excepciones autorizadas estan delimitadas;
5. que la derivacion hacia la aplicacion objetivo fue declarada expresamente.

Si cualquiera de estas condiciones no se cumple, la intervencion queda bloqueada. FO-COC-0001 certifica esta puerta de validacion durante la apertura operativa de cada chat.

---

## 12. Gestion de ciclo de vida

Una Autoridad Rectora solo puede darse de alta mediante una decision arquitectonica aprobada y versionada.

Las modificaciones deben preservar la trazabilidad de la entrada anterior, indicar motivo, alcance e impacto, y actualizar el Registro. Las sustituciones requieren declarar la autoridad saliente, la entrante y la transicion aplicable. Los retiros no eliminan el historial: cambian el estado de la entrada y conservan la evidencia historica.

---

## 13. Compatibilidad documental

Este ADR complementa:

* **ADR-001:** mantiene su jerarquia normativa, puerta de validacion y trazabilidad arquitectonica.
* **GOV-0001:** preserva a Git/GitHub como medio oficial versionado y exige consultar las Autoridades Rectoras aplicables.
* **KB-0003:** incorpora las decisiones y restricciones de autoridad a la Reconstruccion Certificada.
* **FO-COC-0001:** certifica y aplica las Autoridades Rectoras vigentes, sin inventarlas ni redefinirlas.

---

## 14. Consecuencias, riesgos y mantenimiento

La gobernanza de Autoridades Rectoras fortalece coherencia, trazabilidad y reproducibilidad entre aplicaciones. Tambien exige mantener el Registro al dia y distinguir cuidadosamente una autoridad aprobada de una referencia practica.

Los riesgos principales son burocracia innecesaria, entradas ambiguas o designaciones desactualizadas. Se mitigan limitando cada entrada a evidencia verificable, manteniendo el ADR como mecanismo y evitando designar autoridades futuras sin una decision especifica.

Todo cambio aprobado que afecte una Autoridad Rectora, su alcance, una implementacion hermana o una excepcion debe revisar y actualizar el Registro de Autoridades Rectoras y las referencias operativas afectadas.

---

## 15. Trazabilidad

* ADR rector superior: `ADR-001-marco-rector-ecosistema-demostracion.md`.
* Registro operativo de designaciones: `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA.md`.
* Certificacion operativa: `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado.md`.
* Continuidad del conocimiento: `GOV-0001 - Sistema de Continuidad del Conocimiento.md` y `KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md`.

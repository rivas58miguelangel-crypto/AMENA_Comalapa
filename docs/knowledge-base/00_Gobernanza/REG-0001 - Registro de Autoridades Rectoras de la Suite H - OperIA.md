# REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA

* **Estado:** Vigente
* **Version:** 1.0
* **Fecha de creacion:** 2026-07-18
* **Responsable:** Arquitectura H - OperIA
* **Clasificacion:** Registro vivo y versionado de gobernanza

---

## Proposito

Conservar las designaciones vigentes de Autoridades Rectoras por dominio, junto con su evidencia, alcance, implementaciones hermanas, aplicaciones objetivo y excepciones autorizadas.

Este Registro permite incorporar nuevos dominios sin modificar el mecanismo establecido por ADR-002.

---

## Relacion con ADR-002

ADR-002 establece el mecanismo permanente de Gobernanza de Autoridades Rectoras. Este Registro lo implementa como artefacto vivo y versionado.

El Registro no crea, inventa ni redefine Autoridades Rectoras. Toda entrada debe derivar de una decision arquitectonica aprobada y mantener trazabilidad verificable hacia ella.

---

## Reglas de uso

* Toda entrada debe usar el esquema obligatorio definido en este documento.
* Las entradas vigentes deben consultarse antes de auditar, proponer o modificar un dominio gobernado.
* FO-COC-0001 certifica y aplica la entrada pertinente; no la redefine.
* Las implementaciones hermanas no adquieren autoridad por su uso, cercania o similitud.
* Las excepciones deben ser expresas, delimitadas y no pueden crear una Autoridad Rectora alternativa.
* Git/GitHub conserva el medio oficial versionado y trazable del Registro.

---

## Esquema obligatorio de entradas

Cada entrada debe incluir:

1. identificador unico;
2. dominio y subdominio, cuando aplique;
3. Autoridad Rectora;
4. tipo de autoridad;
5. repositorio, ruta y evidencia certificada;
6. alcance;
7. implementaciones hermanas;
8. aplicaciones objetivo vigentes, cuando correspondan;
9. excepciones autorizadas;
10. estado;
11. decision arquitectonica de respaldo;
12. fecha de ultima revision;
13. historial de cambios de la entrada.

---

## Estados permitidos

* **Vigente:** autoridad aplicable y certificable.
* **En revision:** designacion bajo revision; no habilita intervenciones nuevas salvo autorizacion expresa.
* **Sustituida:** autoridad reemplazada por una entrada sucesora identificada.
* **Retirada:** autoridad sin aplicacion vigente; su historial se conserva.
* **No designada:** dominio sin Autoridad Rectora aprobada; cualquier intervencion queda bloqueada.

---

## Procedimiento de ciclo de vida

### Alta

Una alta requiere decision arquitectonica aprobada, evidencia verificable, entrada completa y versionado del Registro.

### Revision y modificacion

Toda revision debe indicar motivo, alcance, impacto, evidencia y trazabilidad hacia la decision que la autoriza.

### Sustitucion

Debe declarar la entrada saliente, la entrada sucesora, la fecha efectiva y la regla de transicion para intervenciones en curso.

### Retiro

Debe conservar la entrada y su evidencia historica, cambiar su estado y declarar la razon del retiro.

---

## Declaraciones vigentes

### AR-VIS-001

* **Identificador:** AR-VIS-001
* **Dominio:** Visual
* **Autoridad Rectora:** Admin / Centro de Mando
* **Tipo de autoridad:** Aplicacion rectora original del ADN visual comun
* **Repositorio:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Evidencia certificada inicial:** commit `ea17194f928c802e8a51d5eb04d20adc21dc2904`
* **Decision arquitectonica de respaldo:** ADR-002
* **Estado:** Vigente
* **Fecha de ultima revision:** 2026-07-18

#### Alcance

Admin / Centro de Mando es la unica Autoridad Rectora Visual vigente para el dominio y alcance definidos en AR-VIS-001.

El ADN visual comun de la Suite H - OperIA incluye:

* geometria;
* tipografia;
* jerarquia;
* densidad;
* superficies;
* tarjetas;
* botones;
* campos;
* bordes;
* sombras;
* radios;
* iconografia;
* navegacion;
* modales;
* estados;
* espaciados.

#### Implementaciones hermanas

* Comunicaciones Internas.
* Registro Operacional.

Son implementaciones hermanas derivadas con valor practico de adaptacion. No pueden sustituir, redefinir ni competir con Admin / Centro de Mando, y no adquieren autoridad por servir como referencia practica.

#### Aplicacion objetivo actual

App Publica de Reservas es una aplicacion objetivo. No es Autoridad Rectora y no puede redefinir el ADN visual comun durante su adaptacion.

#### Excepcion autorizada

La identidad grafica especifica del proyecto cliente puede conservarse en el encabezado cuando este claramente delimitada.

La excepcion puede incluir:

* logo;
* nombre;
* tagline;
* colores;
* fondo;
* otros activos graficos propios del cliente.

La excepcion de identidad grafica no incluye automaticamente progreso, navegacion, superficies comunes, cuerpo de la aplicacion, controles, estados, modales ni espaciados estructurales. Estos elementos permanecen gobernados por la Autoridad Rectora Visual.

Cualquier excepcion adicional debe aprobarse formalmente, quedar delimitada, ser trazable, registrarse en REG-0001 y no ser implicita.

#### Historial de la entrada

* 2026-07-18 - Alta inicial de `AR-VIS-001` mediante ADR-002.

---

## Dominios futuros o no designados

Persistencia, IA, seguridad, operacion e integraciones pueden registrarse cuando exista una decision arquitectonica aprobada que designe su Autoridad Rectora. No reciben una autoridad por anticipacion ni por inferencia.

---

## Historial de cambios del Registro

* Version 1.0 - 2026-07-18 - Creacion del Registro y alta de `AR-VIS-001`.

---

## Referencias cruzadas

* `ADR-002-gobernanza-de-autoridades-rectoras-suite-h-operia.md`.
* `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado.md`.
* `GOV-0001 - Sistema de Continuidad del Conocimiento.md`.

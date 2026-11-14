# Transición controlada · San Juan Buenavista 02 → 03

**Fecha:** 13 de noviembre de 2026  
**Estado:** Documento de continuidad para revisión; semáforo AMARILLO  
**Alcance:** Preservar decisiones, evidencias, restricciones y pendientes del frente comercial San Juan Buenavista. Este documento no certifica integraciones, no autoriza cambios de diseño ni constituye una orden de despliegue.

## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio gobernado aplicable:** Visual, únicamente para preservar y evaluar futuros cambios de la experiencia HTML y del correo en la línea gráfica de H-OperIA Inmobiliaria.
* **Entrada vigente de REG-0001:** AR-VIS-001.
* **Autoridad Rectora:** Admin / Centro de Mando, según REG-0001.
* **Evidencia inspeccionada:** ADR-002, REG-0001 y `docs/knowledge-base/02_Corpus_Fundacional/Arquitectura Visual Comun de la Suite H - OperIA.md` (CF-0001, identificador provisional).
* **Implementaciones hermanas y aplicación objetivo:** Consultar la entrada vigente de REG-0001 antes de cualquier intervención visual. La aplicación objetivo de una eventual intervención es el HTML comercial de San Juan Buenavista; este documento no certifica una nueva implementación ni la convierte en autoridad.
* **Excepciones autorizadas:** Ninguna identificada para alterar la autoridad visual mediante esta transición.
* **Derivación:** Toda decisión visual posterior deberá derivar de AR-VIS-001 y CF-0001, con certificación específica de la entrada vigente de REG-0001. No se crea ni redefine una Autoridad Rectora.

## 1. Identidad del proyecto y alcance

San Juan Buenavista es el nombre comercial del proyecto de comercialización de un terreno en el cantón El Botoncillal, Colón, La Libertad, El Salvador. La superficie comercial indicada es **39.80 manzanas**. Se contempla vender el terreno completo o por sectores mediante una página web interactiva, presentación audiovisual, formularios de interesados, Google Sheets y confirmaciones comerciales por correo electrónico.

La numeración **02 → 03 identifica chats**. **V54_k y V54_n identifican versiones HTML**; no son etapas del protocolo de transición.

## 2. Fuentes rectoras revisadas y precedencia

La Base de Conocimiento del repositorio `C:\Amena\Codex\AMENA_Comalapa` y Git son las fuentes oficiales para reconstrucción. Se revisaron KB-0003, FO-COC-0001, GOV-0001, GOV-0002, IME-0001, ADR-002, REG-0001 y `docs/architecture-decisions.md`. Se consultó CF-0001 para el dominio visual. El documento de transición es auxiliar: no sustituye esas fuentes ni el estado Git certificado.

Se examinó en Google Drive `Protocolo Transición Chats 261006a`, que contiene SKILL-0008. Su Pasaporte inaugural certifica otro frente (H-OperIA Comercial / Elastic Email / demostraciones); no cubre San Juan Buenavista. SKILL-0008 declara expresamente que no deroga los requisitos superiores de KB-0003 y FO-COC-0001 sin su reconocimiento formal en esos documentos. Por ello esta transición usa reconstrucción completa, no revalidación por delta.

No se localizó una transición San Juan Buenavista 01 → 02 ni un Pasaporte de Continuidad Certificada específico en el repositorio rector revisado. El historial completo del chat 02 no fue examinado directamente en esta fase; el operador aportó precisiones para preservar sus decisiones.

## 3. Estado técnico y operativo

| Elemento | Estado |
| --- | --- |
| Repositorio rector | `C:\Amena\Codex\AMENA_Comalapa` |
| Rama | `centro-mando-admin10` |
| HEAD local | `0d82d718cd55625d5db7056e99adbf7e6da9596a` antes de crear este documento |
| Árbol de trabajo | Limpio antes de la creación; la creación dejará este archivo sin seguimiento hasta una autorización posterior |
| Referencia remota | El operador informa HEAD remoto igual y ahead/behind `0 / 0` tras `git fetch origin --prune` ejecutado previamente en PowerShell; esta fase no ejecutó `fetch` |
| HTML aprobado por el operador | `San_Juan_Buenavista_V54_n.html`, localizado en dos copias idénticas de Google Drive |
| HTML publicado según el operador | V54_k en `https://sjb-01.automatizahoy.ai/`; V54_n no está publicada |
| VPS informado | `72.60.24.37`, carpeta `/opt/sjb-01/site`; sin inspección directa del VPS en esta fase |
| Integraciones | Google Apps Script y Elastic Email pendientes de activación, configuración y pruebas reales |

## 4. Evidencias verificadas en la reconstrucción

* Se localizaron dos archivos de Drive titulados `San_Juan_Buenavista_V54_n.html`, de 1,912,801 bytes según sus metadatos, y se comparó su contenido: son idénticos. El HTML contiene el título `San Juan Buenavista · V54_n`, referencias a 39.80 manzanas, al correo comercial y a los formularios. La aprobación de esa versión procede del operador.
* La hoja conectada `SJB · Registro de interesados y presentaciones · V54_j` contiene las pestañas `Interesados`, `Presentaciones`, `Detalle de porciones` y `EJEMPLO - NO REAL`.
* Se comprobaron los encabezados: `Interesados` separa cuerpo completo y porciones 1, 2 y 3, con superficies, precios unitarios, subtotales y `GRAN TOTAL US$`; `Presentaciones` contiene `ID expediente` y `Estado coordinación`. No se verificó una escritura real desde los formularios.
* La consulta disponible de la URL pública no permitió inspeccionar la página ni comprobar por cuenta propia el archivo actualmente servido.

## 5. Declaraciones del operador pendientes de verificación independiente

Durante el chat 02 el operador verificó en PowerShell que la URL pública respondía **HTTP 200 OK** y **1,913,147 bytes**; posteriormente aprobó visualmente V54_k en computadora y móvil. Es evidencia histórica proporcionada por el operador, no una comprobación directa actual del VPS. El tamaño informado coincide con el tamaño de una copia V54_k localizada en Drive, pero esa coincidencia no demuestra identidad del archivo servido.

El operador declara V54_n como última versión HTML aprobada y no publicada. También informa que la cuenta Elastic Email Marketing ofrece API, SMTP, dominios y seguimiento. Aún no se ha certificado el dominio `automatizahoy.ai` ni el envío automático. No hay pruebas verificadas aquí de procesamiento por Apps Script, escritura de solicitudes ni entrega de confirmaciones.

## 6. Decisiones aprobadas y restricciones

* Preservar la versión V54_n aprobada sin modificar diseño comercial, contenidos, gráficos, imágenes, precios, cálculos ni formularios sin autorización.
* Conservar tres escenarios: solicitud de información; solicitud de presentación presencial; ambas solicitudes. Cada solicitud debe registrarse y generar la confirmación que corresponda. Las solicitudes vinculadas conservan el mismo número de expediente.
* Una presentación **solicitada** no equivale a una reunión **confirmada**. El texto aprobado informa que el comprador recibirá correo de confirmación al registrar la solicitud y no debe mostrar la dirección Gmail personal en esa explicación.
* Utilizar `marivas@automatizahoy.ai` como identidad comercial ante compradores. Elastic Email es el motor propuesto para confirmaciones automáticas; Outlook Classic se mantiene para recibir y responder; Google Sheets es el registro central; Google Apps Script procesará y conectará los formularios una vez configurado y probado.
* No utilizar `rivas58.miguelangel@gmail.com` como correo comercial. No integrar WhatsApp automático en esta etapa.
* El correo de confirmación HTML tiene una presentación profesional aprobada conceptualmente en la línea gráfica de H-OperIA Inmobiliaria. Falta comprobar e incorporar el logotipo gráfico oficial y validar mensajes realmente enviados.
* El acercamiento con Mónica Martel está suspendido. No existe acuerdo de colaboración ni negociación de comisiones concluida.

## 7. Archivos y enlaces esenciales

* HTML V54_n, copia 1: `https://drive.google.com/file/d/1AtDD2NAHE-160uFhj1xnY4PF2O_om4kw/view`.
* HTML V54_n, copia 2: `https://drive.google.com/file/d/1-2_ul-4kmZ79_vzgU1uq0vT9X5RsJiAS/view`.
* Registro central: `https://docs.google.com/spreadsheets/d/1pQ_6NLj5BbNz6jQ5Ueazck4w5Zy97BKqaumYo-reZXQ/edit`.
* Página pública informada: `https://sjb-01.automatizahoy.ai/`.
* SKILL-0008 en `Protocolo Transición Chats 261006a`: `https://docs.google.com/document/d/1kcDVAnKzT2NZAu0cUMzNEezIzTfBOk1ikRZcd-T3QAk/edit`.
* Base de Conocimiento rectora: `C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base`.

## 8. Riesgos y pendientes

* El título de la hoja conserva `V54_j`; debe aclararse su relación documental con V54_n. El título por sí solo no prueba que la estructura esté desactualizada.
* La URL pública y el VPS no fueron revalidados directamente. No confundir disponibilidad histórica de V54_k con publicación de V54_n.
* Verificar dominio, autorización de envío y capacidades de Elastic Email antes de configurar confirmaciones. Probar Apps Script y la conexión con Sheets sin presumir que estén operativos.
* Probar por separado información, presentación y ambas solicitudes; verificar expediente compartido, registros correctos, confirmación correspondiente y recepción efectiva del correo.
* Verificar logotipo oficial y presentación final de los correos antes de enviarlos a compradores.
* Contrastar con el historial completo del chat 02 cualquier decisión o pendiente que no haya quedado en fuentes oficiales; registrar omisiones sin convertir memoria conversacional en autoridad.
* Respaldar y publicar únicamente la versión comercial que resulte validada, mediante una operación posterior expresamente autorizada.

## 9. Semáforo de Continuidad

**AMARILLO.** El repositorio local estaba limpio al inicio, las fuentes rectoras se identificaron, V54_n se localizó y la estructura de la hoja se comprobó. La certificación remota reciente se atribuye al operador. Permanecen pendientes la inspección directa del VPS, las pruebas de integración y correo, y el contraste completo del chat saliente. El estado permite continuidad documental; no certifica que el flujo comercial esté operativo ni autoriza publicación.

## 10. Contexto Operativo para San Juan Buenavista 03

El objetivo inmediato es dejar operativos los formularios, el registro central y las confirmaciones automáticas antes de nuevas campañas. Se hereda V54_n como última versión HTML aprobada por el operador y V54_k como versión publicada según su evidencia histórica. La primera operación debe verificar `automatizahoy.ai` y las capacidades disponibles en Elastic Email. El chat 03 debe certificar su propia apertura conforme a KB-0003 y FO-COC-0001 antes de diagnosticar o intervenir.

## 11. Plan ordenado de reanudación

1. Verificar el dominio `automatizahoy.ai` y las capacidades disponibles en Elastic Email.
2. Definir y configurar el envío automático desde `marivas@automatizahoy.ai`, con pruebas controladas.
3. Conectar formularios, Google Apps Script y Google Sheets; verificar registro y trazabilidad por expediente.
4. Activar y validar los correos de confirmación, incluido el logotipo gráfico oficial.
5. Probar los tres escenarios: información, presentación presencial e información más presentación presencial.
6. Comprobar registros reales, expediente compartido cuando corresponda y recepción efectiva de cada confirmación.
7. Respaldar y publicar la versión comercial validada solo tras autorización y verificación operativa específica.
8. Preparar la campaña y configurar Outlook para Android después de asegurar el flujo de solicitudes y confirmaciones.

## 12. Reglas para certificar la apertura del chat 03

Verificar Git del repositorio rector y de cualquier repositorio operativo aplicable, con actualización de referencias remotas conforme a KB-0003 y FO-COC-0001 cuando esté autorizada; leer las fuentes rectoras, este documento y los documentos específicos del frente. Ejecutar Auditoría de Reconstrucción, emitir Semáforo, reconstruir Estado Operativo y emitir Contexto Operativo Certificado. Certificar la Autoridad Rectora de cualquier dominio gobernado antes de auditar, proponer o modificar ese dominio. Separar hechos verificados, declaraciones del operador y pendientes. Si el chat saliente revela acuerdos no documentados, registrarlos como omisiones y regularizarlos en la fuente correspondiente. No convertir la transición ni SKILL-0008 en sustitutos de la Base de Conocimiento o Git.

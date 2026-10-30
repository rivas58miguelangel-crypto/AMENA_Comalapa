# Transición controlada · H-OperIA Bancos y Financieras 01 → 02

**Fecha:** 30 de octubre de 2026  
**Proyecto:** H-OperIA InmobiliarIA  
**Frente activo:** bancos y entidades financieras de El Salvador  
**Alcance:** continuidad comercial y documental; este paso no autoriza envíos, cambios en Elastic Email, cambios de aplicaciones, commit, push ni despliegue.

## 1. Estado técnico verificado al abrir la transición

| Repositorio rector | Rama | HEAD local y remoto | Ahead / behind | Árbol de trabajo |
| --- | --- | --- | --- | --- |
| `C:\Amena\Codex\AMENA_Comalapa` | `centro-mando-admin10` | `e2c43c133be80c4c77bb3f09dcb119fdb57ec401` | `0 / 0` después de `git fetch origin --prune` | Limpio antes de crear este documento |

El `origin` verificado es `https://github.com/rivas58miguelangel-crypto/AMENA_Comalapa.git`. El único delta posterior al pasaporte certificado del 6 de octubre de 2026 (`d4c33f03eed92d85dbd5afcc05eda7cd257d737b`) era la transición del Radar Comercial del 21 de octubre. Ese delta no modifica código ni contradice este frente bancario; lo separa metodológicamente del Radar Comercial ordinario.

## 2. Fuentes reconstruidas en Google Drive

La reconstrucción se hizo en modo lectura con la cuenta conectada de Miguel Angel Rivas. La carpeta identificada contiene los siguientes artefactos rectores:

- [Bancos HOI 261026a](https://docs.google.com/document/d/1DZAXZ6MJyRUOXlE_REeXwmIrfEjqMH55d4xqg0zzOII/edit): transcripción temática y acuerdos del 25 al 27 de octubre.
- [Radar integrado 261026g](https://docs.google.com/spreadsheets/d/1Y04NRC3x8mV4GPbO0W8_W-8ClIMTAncj/edit): versión más reciente del radar, con contactos directos, contactos de canalización, 26 metas pendientes, reglas y base acumulativa.
- Versiones anteriores del radar: `261026a`, `261026b`, `261026c`, `261026d`, `261026e`, `261026e_Pruebas` y `261026f`. Se conservan como historial; `261026g` es la referencia operativa más reciente encontrada.
- [Canalización 261026d](https://drive.google.com/file/d/1MV_TMzFv59rYxZl0z6x-HCNKEXvPEKGq/view): HTML más reciente de la plantilla de canalización.
- Versiones anteriores de canalización: `261026`, `261026b` y `261026c`.
- [Presentación directa 261027b · FIRMA ÚNICA](https://drive.google.com/file/d/1TTLA6R3DpvIxM4LYSMtSarscaCmHyxjS/view): HTML más reciente de presentación directa y versión que corrige la firma duplicada.

Los artefactos de la carpeta aparecen como no compartidos públicamente. Esta transición registra sus enlaces para trazabilidad, pero no cambia permisos ni propiedad.

## 3. Propósito de la línea comercial bancaria

La investigación no busca crear un directorio bancario genérico. Busca identificar personas o unidades que puedan conducir a una reunión de presentación de H-OperIA.

Hay dos rutas comerciales distintas:

1. **Venta directa:** el banco o entidad financiera puede ser cliente potencial de H-OperIA para sus propias operaciones de comercialización inmobiliaria, activos extraordinarios, proyectos residenciales o seguimiento de compradores.
2. **Canalización o alianza:** el banco puede facilitar una presentación ante desarrolladoras, constructoras e inmobiliarias relacionadas con la institución.

El objetivo inmediato no es cerrar una venta por correo. Es conseguir una conversación o derivación interna legítima con la persona adecuada.

## 4. Clasificación rectora de contactos y plantilla aplicable

### 4.1 Presentación directa

Se aplica a personas o áreas vinculadas públicamente con comercialización de inmuebles, activos extraordinarios, proyectos residenciales o una función sectorial suficientemente próxima. La clasificación no prueba autoridad para contratar software ni consentimiento para una campaña masiva.

Plantilla: **HOperIA_ElasticEmail_Bancos_Presentacion_Directa_261027b_FIRMA_UNICA.html**.

Objetivo: solicitar una breve reunión para presentar H-OperIA; permitir que el destinatario derive la propuesta si no es el responsable correcto.

### 4.2 Canalización

Se aplica a servicio al cliente, comunicaciones, gerencias generales u otros contactos cuya responsabilidad directa sobre operaciones inmobiliarias o tecnología no está comprobada.

Plantilla: **HOperIA_ElasticEmail_Canalizacion_Bancos_261026d.html**.

Objetivo: pedir el correo corporativo de la persona o unidad responsable y conocer el procedimiento institucional apropiado. No presentar el mensaje como si el contacto general fuera decisor.

### 4.3 Regla de selección

- Correo especializado y función pertinente: presentación directa, personalizada y orientada a reunión.
- Correo general o función no decisora: canalización, solicitando derivación.
- Correo de uso restringido: no utilizar hasta comprobar que admite esta clase de propuesta.
- Contacto no verificado: no enviar.
- Varios correos de una misma institución no obligan a enviar a todos. Evitar duplicaciones y escoger el canal más pertinente.

## 5. Estado certificado de las plantillas

### 5.1 Canalización

El asunto base aprobado es:

> Tenemos un sistema de ventas inmobiliarias. ¿Podrían ayudarnos?

El texto presenta H-OperIA como una solución para que desarrolladoras, constructoras e inmobiliarias vinculadas al banco mejoren la exploración de viviendas, la reserva y la continuidad de atención. Reconoce la función bancaria en financiamiento de proyectos y crédito hipotecario, anuncia tres entregas audiovisuales y solicita el contacto corporativo apropiado o el procedimiento para una posible difusión institucional.

Estado certificado según la fuente:

- Se recuperó el bloque corporativo de contacto.
- Se eliminó el botón «SOLICITAR DEMOSTRACIÓN» porque confundía una solicitud de colaboración con una solicitud directa de demo.
- La versión fue probada en Outlook y el usuario confirmó que funcionaba correctamente.
- El HTML rector encontrado en Drive es `261026d`.

### 5.2 Presentación directa

**Asunto:** Una propuesta de IA para fortalecer la comercialización inmobiliaria de su banco  
**Preencabezado:** Conozca H-OperIA InmobiliarIA: exploración de propiedades, reservas y seguimiento comercial coordinado.

Texto aprobado y reflejado en el HTML final:

> Estimados señores:
>
> ¿Se imaginan que las personas interesadas en las propiedades que comercializa su banco pudieran explorarlas visualmente, comparar alternativas y avanzar hacia su reserva con información clara y acompañamiento continuo?
>
> ¿Y que, desde ese primer contacto, los equipos responsables de la comercialización, documentación, cobros y servicio al cliente pudieran trabajar coordinadamente, conservando la historia de las conversaciones, gestiones y compromisos con cada interesado?
>
> Esa es la propuesta de H-OperIA InmobiliarIA: utilizar inteligencia artificial para fortalecer las ventas inmobiliarias, conectar a las personas y dar continuidad al seguimiento comercial, desde la exploración de una propiedad hasta la conclusión del proceso.
>
> Consideramos que esta solución podría resultar valiosa para las operaciones inmobiliarias de su banco, así como para las empresas desarrolladoras, constructoras e inmobiliarias con las que mantiene relaciones comerciales.
>
> Hemos preparado tres correos electrónicos que incluyen breves entregas audiovisuales, en las que mostramos la experiencia del comprador y la lógica de nuestra solución.
>
> A continuación, le enviaremos la primera de estas entregas, para que pueda apreciar de manera concreta la experiencia que proponemos.
>
> Nos gustaría tener la oportunidad de presentarle H-OperIA InmobiliarIA en una breve reunión virtual, para que pueda conocer su funcionamiento y evaluar si podría aportar valor a las actividades de su institución.
>
> Si esta propuesta corresponde a otra área de su banco, le agradeceríamos mucho que nos facilitara el correo electrónico corporativo de la persona responsable de evaluar este tipo de iniciativas, o que tuviera la gentileza de hacerle llegar nuestra comunicación.
>
> Estaremos encantados de realizar la presentación conjuntamente con los funcionarios que ustedes consideren convenientes.
>
> Agradecemos sinceramente su atención y esperamos tener la oportunidad de compartir esta iniciativa con su institución.
>
> Cordialmente,

El HTML final usa un único bloque corporativo con Miguel Ángel Rivas, Director de Automatiza Hoy IA, teléfono/WhatsApp `+503 7576-2213`, correo `marivas@automatizahoy.ai` y el lema «Construyendo hoy las inmobiliarias del futuro». El nombre `FIRMA_UNICA` certifica la corrección del problema de firma duplicada.

### 5.3 Banner bancario reutilizado

- Archivo publicado: `hoperia-canalizacion-bancos-v1.jpg`.
- URL: `https://solicitud-demo-01.automatizahoy.ai/email-assets/hoperia-canalizacion-bancos-v1.jpg`.
- Resolución registrada: `1672 × 941` píxeles.
- Peso registrado: `425.7 KB`, aproximadamente 80 % menor que el original.
- Publicación registrada en el repositorio de la PWA mediante commit `71801d4` y comprobada en Dokploy según la transcripción.

## 6. Radar bancario rector: contactos identificados

El radar `261026g` contiene una base acumulativa de 32 direcciones: 14 clasificadas para presentación directa y 17 para canalización, con una dirección repetida en la base consolidada según sus hojas de trabajo. La existencia del correo no certifica entregabilidad, vigencia, consentimiento ni autoridad de compra.

### 6.1 Presentación directa, sujeta a verificación individual

| Institución | Persona / área | Correo | Cautela principal |
| --- | --- | --- | --- |
| Banco Agrícola | Daniela García | `cdgarcia@bancoagricola.com.sv` | Fuente 2025; verificar vigencia y pertinencia |
| Banco Agrícola | Francisco Pérez | `jofperez@bancoagricola.com.sv` | Fuente 2025; verificar vigencia y pertinencia |
| Banco Agrícola | Mauricio Cisneros | `macisner@bancoagricola.com.sv` | Fuente 2025; verificar vigencia y pertinencia |
| Banco Agrícola | Persona no identificada | `gueromer@bancoagricola.com.sv` | Fuente 2025; identificar titular y vigencia |
| Banco Azul | Activos extraordinarios | `activosextraordinarios@bancoazul.com` | Evaluar envío individual contextualizado |
| Banco Hipotecario | Vanessa Barrera | `vanessa.barrera@hipotecario.com.sv` | Verificar vigencia antes de contactar |
| Banco Hipotecario | Ricardo Aguilar | `ricardo.aguilar@hipotecario.com.sv` | Verificar vigencia antes de contactar |
| Banco Promerica | Hans Dorcich Martell | `hmartell@promerica.com.sv` | Hay dos correos para la misma persona; escoger uno |
| Banco Promerica | Hans Dorcich Martell | `hans.dorcich@promerica.com.sv` | No duplicar el envío |
| Banco Promerica | Karla Gálvez | `karla.galvez@promerica.com.sv` | Verificar vigencia |
| Banco Promerica | Banca preferencial / proyectos | `bancapreferencial@promerica.com.sv` | Confirmar pertinencia |
| BAC Credomatic | Activos extraordinarios | `ventasactivos@baccredomatic.sv` | Canal publicado para ofertas de compra; no usar para marketing sin validar |
| Fondo Social para la Vivienda | Luis Josué Ventura Hernández | `josue.ventura@fsv.gob.sv` | Acercamiento individual; cargo no prueba facultad de compra |
| Fondo Social para la Vivienda | Presidencia / Dirección Ejecutiva | `administracion.superior@fsv.gob.sv` | Uso excepcional y contextual |

### 6.2 Canalización, sujeta a verificación individual

| Institución | Persona / área | Correo | Cautela principal |
| --- | --- | --- | --- |
| Banco Cuscatlán | Yesenia Matal, lectura provisional | `yesenia.matal@bancocuscatlan.com` | No enviar hasta validar nombre y correo contra una fuente legible |
| Banco Azul | Atención general | `aloazul@bancoazul.com` | Revalidar publicación exacta |
| Banco Hipotecario | Atención general | `servicio.cliente@hipotecario.com.sv` | Solicitar derivación |
| Banco Promerica | Canal general | `soluciones@promerica.com.sv` | Revalidar publicación exacta |
| ABANK | Atención general | `atencionalcliente@abank.com.sv` | Solicitar derivación |
| Banco Cuscatlán | Atención general | `servicioalclientesv@bancocuscatlan.com` | Comprobar vigencia y excluir si ya fue contactado |
| Banco de Fomento Agropecuario | Atención general | `servicioalcliente@bfa.gob.sv` | Solicitar derivación |
| Fondo Social para la Vivienda | Información institucional | `info@fsv.gob.sv` | Enmarcar como propuesta institucional, no intermediación |
| SAC Credicomer | Atención clientes | `atencion_clientes@credicomer.com.sv` | Solicitar derivación |
| SAC Credicomer | Aliados personas | `aliados_personas@credicomer.com.sv` | El área no es necesariamente inmobiliaria |
| FEDECRÉDITO | Información general | `informacion@fedecredito.com.sv` | Falta enlace específico de publicación |
| Fondo Social para la Vivienda | Gabriela María Sosa Lemus | `gabriela.sosa@fsv.gob.sv` | Solicitar reunión institucional; no presentarla como vendedora |
| Banco de Fomento Agropecuario | Ever Cruz | `ever.cruz@bfa.gob.sv` | Función no inmobiliaria confirmada |
| Banco de Fomento Agropecuario | Juan Urquilla | `juan.urquilla@bfa.gob.sv` | Comunicaciones; solicitar derivación |
| BANDESAL | Francisco Moreno | `francisco.moreno@bandesal.gob.sv` | No afirmar que gestiona constructoras |
| BANDESAL | Gracia Chávez | `gracia.chavez@bandesal.gob.sv` | Confirmar identidad y vigencia |
| Banco Hipotecario | Julio César Herrera Cornejo | `julio.herrera@hipotecario.com.sv` | Contacto institucional; no se acredita rol inmobiliario |

## 7. Pendientes concretos de investigación

Prioridad inmediata registrada en el radar:

1. **Banco Cuscatlán:** conseguir correo oficial directo de banca empresarial, negocios inmobiliarios, activos extraordinarios o responsable equivalente, con cargo y fuente.
2. **BAC Credomatic:** localizar un correo de negocios apropiado distinto de `ventasactivos@`, reservado públicamente para ofertas de compra de inmuebles.
3. **Banco Atlántida:** localizar un correo sectorial directo publicado.
4. **Banco Davivienda Salvadoreño:** localizar un correo de área o ejecutivo de proyectos habitacionales, constructoras o crédito inmobiliario.
5. **Banco Industrial:** localizar un correo de responsable o unidad comercial relevante.

Segunda prioridad: ABANK, BANDESAL, Banco Agrícola, Banco Azul, Banco Hipotecario, Banco Promerica, Banco de Fomento Agropecuario, Citibank, FEDECRÉDITO y Fondo Social para la Vivienda.

Cobertura exploratoria pendiente: BANCOVI, BTS Banco de los Trabajadores, Banco Apoyo Integral, Banco Izalqueño de los Trabajadores, COMEDICA, Multi Inversiones Banco Cooperativo, Primer Banco de los Trabajadores, SAC Constelación, SAC Credicomer, SAC Multimoney y SAC Óptima.

Cada pendiente se cierra únicamente con correo institucional publicado, cargo o unidad pertinente, fuente verificable y cautela de uso. LinkedIn u otro directorio puede ayudar a identificar nombres y cargos, pero no autoriza inventar patrones de correo.

## 8. Procedimiento para extraer correos del Excel por color

La habilidad documentada debe:

1. Trabajar sobre una copia o en modo lectura y conservar intacto el Excel original.
2. Identificar la hoja y la columna solicitadas.
3. Leer el color de fuente de cada celda, no el color de relleno salvo instrucción expresa.
4. Extraer solo las direcciones del color seleccionado.
5. Excluir celdas de otros colores.
6. Eliminar duplicados.
7. Entregar una línea separada por comas, lista para pegar en Elastic Email.
8. Generar un respaldo `.txt`.

Ejemplo rector: «Extraer los correos amarillos de la columna C de la pestaña Canalización; entregarlos separados por comas y generar respaldo». Antes de usar el resultado debe revisarse que el color realmente represente una decisión de envío vigente y no solo una clasificación histórica.

## 9. Estado de campaña y restricciones

### Estado certificado

- Existen dos mensajes y dos HTML diferenciados: canalización y presentación directa.
- El banner bancario está publicado y reutilizado por ambas plantillas.
- La plantilla de canalización fue probada satisfactoriamente en Outlook.
- La presentación directa final contiene una sola firma corporativa.
- El radar rector es `261026g` y conserva fuentes, cautelas, prioridad y próximo paso.

### No certificado

- No hay evidencia suficiente en las fuentes revisadas de que la programación del 27 de octubre a las 9:00 y 9:05 a. m. se haya ejecutado.
- No está confirmada la entregabilidad de los correos del radar.
- No está confirmado el consentimiento para campañas automatizadas.
- No está confirmada la vigencia o pertinencia de todos los contactos.
- No está certificada la sustitución de `{unsubscribe}` ni la dirección postal del remitente en Elastic Email para una campaña real.
- No se ha decidido aquí qué destinatarios concretos recibirán cada envío.

## 10. Reglas que el siguiente chat no debe perder

- Mantener este frente separado del Radar Comercial ordinario de desarrolladoras.
- No presentar hipótesis como hechos ni cargos públicos como autoridad de compra.
- No inventar correos por patrón de nombre o dominio.
- No usar un buzón restringido para una finalidad distinta de la publicada.
- No enviar a todos los correos de una institución por el solo hecho de existir.
- Verificar vigencia, pertinencia, fuente y duplicados antes de preparar una lista de destinatarios.
- Mantener una fila por correo y una base acumulativa; no perder contactos anteriores al crear nuevas versiones.
- Conservar asunto, preencabezado, cuerpo aprobado, banner y bloque corporativo salvo decisión explícita y documentada.
- Todo envío, importación de contactos o cambio de campaña requiere autorización humana separada.

## 11. Punto exacto de reanudación

1. Abrir el radar `261026g` como fuente rectora y no reconstruir desde cero las versiones anteriores.
2. Verificar primero los cinco pendientes prioritarios: Banco Cuscatlán, BAC, Atlántida, Davivienda e Industrial.
3. Confirmar para cada contacto candidato: correo publicado, cargo o unidad, fuente, vigencia, pertinencia y restricciones.
4. Revisar los 14 contactos directos y 17 de canalización para eliminar duplicados y marcar cuáles son aptos, cuáles requieren validación y cuáles deben excluirse.
5. Preparar una propuesta de destinatarios y plantilla aplicable para revisión humana; **no enviar correos todavía**.
6. Solo después de aprobación, extraer la lista por color, generar respaldo y preparar Elastic Email sin alterar las plantillas rectoras.

## 12. Límite de este Paso 1

Este documento es el único cambio previsto. No se modificaron aplicaciones, archivos de Drive, campañas, contactos ni permisos. No se hizo commit ni push. El Paso 2 de revisión, versionado y certificación debe ejecutarse posteriormente y de forma independiente.

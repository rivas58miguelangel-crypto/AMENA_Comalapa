# TRANSICION-Codex-AMENA-89-A-90-20260818-1048

## CERTIFICACION DE AUTORIDAD RECTORA

* **Dominio:** Continuidad operativa y visual/documental de la Suite H - OperIA.
* **Entrada vigente de REG-0001:** AR-VIS-001.
* **Autoridad Rectora:** Admin / Centro de Mando.
* **Tipo de autoridad:** Aplicacion rectora original del ADN visual comun.
* **Repositorio, documento o artefacto inspeccionado:** `C:\Amena\Codex\AMENA_Comalapa`; `ADR-002-gobernanza-de-autoridades-rectoras-suite-h-operia.md`; `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA.md`; `Arquitectura Visual Comun de la Suite H - OperIA.md`.
* **Rama, commit o version certificada:** `centro-mando-admin10`, HEAD local `04412563dba5933adf04e0eacc6bb51a6dfb56d3`.
* **Implementaciones hermanas o derivadas:** Comunicaciones Internas, Registro Operacional, Mensajeria Operacional y App Publica de Reservas como derivaciones/aplicaciones objetivo cuando corresponda.
* **Aplicacion o artefacto objetivo:** Documento de transicion de Codex AMENA 89 a Codex AMENA 90.
* **Excepciones autorizadas:** Identidad grafica especifica del cliente solo en encabezado o marca puntual, segun AR-VIS-001; no incluye navegacion, superficies, controles, estados, modales ni espaciados estructurales.
* **Declaracion expresa de derivacion:** Este entregable deriva sus criterios del registro vigente indicado y no redefine la Autoridad Rectora.
* **Resultado de la regla de bloqueo:** VALIDO para cierre documental y continuidad; cualquier intervencion tecnica futura requiere nueva certificacion del repositorio objetivo.
* **Nombre y fecha del entregable:** `TRANSICION-Codex-AMENA-89-A-90-20260818-1048` - 2026-08-18.

## A. GOBERNANZA Y PROTOCOLO

Este cierre aplica el protocolo oficial de continuidad conforme a:

* `KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats`.
* `FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado`.
* `ADR-002 - Gobernanza de Autoridades Rectoras de la Suite H - OperIA`.
* `REG-0001 - Registro de Autoridades Rectoras de la Suite H - OperIA`.
* `CF-0001 - Arquitectura Visual Comun de la Suite H - OperIA`, localizado como `docs/knowledge-base/02_Corpus_Fundacional/Arquitectura Visual Comun de la Suite H - OperIA.md`.

Reglas rectoras vigentes:

* La continuidad debe reconstruirse desde la Base de Conocimiento y Git, no desde memoria conversacional.
* Antes de intervenir se debe certificar repositorio, rama, HEAD, origin, HEAD remoto, ahead/behind y working tree.
* No se debe asumir como vigente ningun HEAD historico sin verificacion.
* Las intervenciones se hacen por microcirugias: alcance pequeño, reversible, verificable y sin rediseños profundos innecesarios.
* No hay commit ni push sin autorizacion humana expresa.
* Debe separarse claramente demo/local frente a arquitectura productiva.
* Sin autorizacion expresa quedan fuera Supabase productivo, SQL nuevo, backend, paquetes nuevos, stashes, servidores y cambios funcionales amplios.
* Este cierre solo autoriza crear este documento de transicion.

## B. REPOSITORIOS Y ESTADO GIT ACTUAL

### Metodo de certificacion ejecutado

Se verificaron rutas, ramas, HEAD local, origin, HEAD remoto simbolico, HEAD remoto de la rama activa, ahead/behind y working tree. Para evitar depender de referencias remotas historicas, se uso `git ls-remote` contra GitHub para las ramas activas. No se ejecuto commit, push, stash, instalacion ni servidor.

Nota tecnica: en repositorios relacionados con diferente propietario Git bloqueo inicialmente por `dubious ownership`; la lectura se repitio con `git -c safe.directory=...` solo para el comando, sin modificar configuracion global.

### 1. Centro de Mando / Admin / Centro Demo

* **Ruta:** `C:\Amena\Codex\AMENA_Comalapa`.
* **Rama:** `centro-mando-admin10`.
* **HEAD local:** `04412563dba5933adf04e0eacc6bb51a6dfb56d3`.
* **Origin:** `https://github.com/rivas58miguelangel-crypto/AMENA_Comalapa.git`.
* **HEAD remoto simbolico de origin:** `refs/heads/main` -> `3c4702b2b1f4ec507e30edd8c50ec17a1b36f3f5`.
* **HEAD remoto de rama activa:** `origin/centro-mando-admin10` -> `04412563dba5933adf04e0eacc6bb51a6dfb56d3`.
* **Ahead/behind:** `0 0`.
* **Working tree antes de crear este documento:** limpio.
* **Ultimo commit significativo:** `04412563dba5933adf04e0eacc6bb51a6dfb56d3` - `2026-08-08 14:50:27 -0600` - `fix: scope demo reservation recovery to expediente`.

### 2. Ruta 2 / Reservas

* **Ruta:** `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`.
* **Rama:** `codex/ruta-2-reservas-generico-manual`.
* **HEAD local:** `13403de3376290a1ed4b91a71805daebe81ddafb`.
* **Origin:** `https://github.com/rivas58miguelangel-crypto/AMENA_Reservas_Publica.git`.
* **HEAD remoto simbolico de origin:** `refs/heads/main` -> `741ed07168bf8d3c01c0920c9a7b5eb13214bea8`.
* **HEAD remoto de rama activa:** `origin/codex/ruta-2-reservas-generico-manual` -> `13403de3376290a1ed4b91a71805daebe81ddafb`.
* **Ahead/behind:** `0 0`.
* **Working tree:** limpio.
* **Ultimo commit significativo:** `13403de3376290a1ed4b91a71805daebe81ddafb` - `2026-08-06 15:07:20 -0600` - `feat: persist and replay reservation demo events`.

### 3. Registro Operacional

* **Ruta:** `C:\Amena\Codex\AMENA_Registro_Operacional_Ventas`.
* **Rama:** `main`.
* **HEAD local:** `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7`.
* **Origin:** `https://github.com/rivas58miguelangel-crypto/AMENA_Registro_Operacional_Ventas.git`.
* **HEAD remoto simbolico de origin:** `refs/heads/main` -> `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7`.
* **HEAD remoto de rama activa:** `origin/main` -> `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7`.
* **Ahead/behind:** `0 0`.
* **Working tree:** limpio.
* **Ultimo commit significativo:** `7dd843fdfea6d86e5327fe22f75f2d2c89f119b7` - `2026-08-07 15:25:20 -0600` - `feat: align registro operacional with expediente vivo`.

### 4. Mensajeria Operacional

* **Ruta:** `C:\Amena\Codex\AMENA_Mensajeria_Operacional`.
* **Rama:** `master`.
* **HEAD local:** `222b1aac22c389a7e264d814b2799916739e5bc1`.
* **Origin:** `https://github.com/rivas58miguelangel-crypto/AMENA_Mensajeria_Operacional.git`.
* **HEAD remoto simbolico de origin:** `refs/heads/master` -> `222b1aac22c389a7e264d814b2799916739e5bc1`.
* **HEAD remoto de rama activa:** `origin/master` -> `222b1aac22c389a7e264d814b2799916739e5bc1`.
* **Ahead/behind:** `0 0`.
* **Working tree:** limpio.
* **Ultimo commit significativo:** `222b1aac22c389a7e264d814b2799916739e5bc1` - `2026-08-07 16:13:11 -0600` - `feat: align messaging with operational context`.

### 5. Demo API

* **Ruta:** `C:\Amena\Codex\AMENA_Demo_API`.
* **Rama:** `main`.
* **HEAD local:** `c43ed25a62879dbab7df5789d6bd5c347e524f0b`.
* **Origin:** `https://github.com/rivas58miguelangel-crypto/AMENA_Demo_API.git`.
* **HEAD remoto simbolico de origin:** `refs/heads/main` -> `c43ed25a62879dbab7df5789d6bd5c347e524f0b`.
* **HEAD remoto de rama activa:** `origin/main` -> `c43ed25a62879dbab7df5789d6bd5c347e524f0b`.
* **Ahead/behind:** `0 0`.
* **Working tree:** limpio.
* **Ultimo commit significativo:** `c43ed25a62879dbab7df5789d6bd5c347e524f0b` - `2026-07-25 12:27:19 -0600` - `feat: add reservation summary whatsapp endpoint`.

## C. ESTADO FUNCIONAL ACTUAL

El estado funcional heredado para AMENA 90 es:

* Ruta 2 sigue siendo la aplicacion publica generica/manual vigente para demostracion comercial. No debe presentarse como produccion parametrizada ni como consumo completo de Supabase.
* La integracion Ruta 2 -> Centro de Mando / Expediente Vivo esta vigente en modo demo/local.
* El flujo relevante es: seleccion/preferencias del cliente -> reserva -> `Reservation ID` -> emision del evento -> recepcion controlada en Centro de Mando -> creacion/recuperacion de Expediente Vivo.
* El mecanismo actual de recepcion/replay/rehidratacion conserva la reserva demo mediante memoria local, permite recuperar la ultima reserva, evita duplicados por `eventId`, valida `origin`, conserva `event.source` y no debe usar `postMessage("*")`.
* El Expediente Vivo es el eje de continuidad operacional de la demo. No debe confundirse con una bolsa generica ni con persistencia productiva.
* Registro Operacional fue actualizado para alinearse con Expediente Vivo y el contexto operacional vigente.
* Mensajeria Operacional fue actualizada para alinearse con el contexto operacional vigente.
* Marta conserva su papel conversacional: escucha, pregunta, aclara, estructura, acompaña y aporta contexto. No vende, no negocia, no promete, no decide ni sustituye al equipo humano.
* H - OperIA Intelligence observa, interpreta, prioriza y recomienda a partir de evidencia; no reemplaza a Marta, no reemplaza dominios de negocio y no crea verdad autonoma sin trazabilidad.
* Las limitaciones demo/local siguen vigentes: localStorage/memoria local para recuperacion demo, datos simulados o generados en FASE 04, ausencia de persistencia productiva en ese flujo, y necesidad de distinguir siempre que partes son reales frente a simuladas.

## D. VIDEO Y MATERIAL COMERCIAL

El frente de produccion de video ya no es una tarea tecnica pendiente inmediata para Codex AMENA 90 salvo nueva instruccion humana expresa.

Actualmente existen dos piezas comerciales diferenciadas:

1. **Video Intro / Anzuelo**
   * Nombre publico: `hoperia-inmobiliaria-intro.mp4`.
   * Uso: primer contacto comercial.
2. **Video Presentacion**
   * Nombre publico: `hoperia-inmobiliaria-presentacion.mp4`.
   * Uso: interesados, reuniones o segunda etapa del proceso comercial.

Ambos videos estan alojados en el VPS/Hostinger bajo `automatizahoy.ai`.

Instruccion de continuidad: no abrir un nuevo frente de edicion de video en la reanudacion tecnica salvo instruccion humana expresa.

## E. WHATSAPP - NUEVA PRIORIDAD

Meta ya aprobo dos plantillas WhatsApp. AMENA 90 debe retomar este frente como prioridad tecnica cercana, pero no antes de completar la auditoria inicial de BLOQUE A.

Trabajo requerido:

* Certificar individualmente ambas plantillas aprobadas.
* Registrar nombre exacto, idioma, categoria, componentes, variables y orden de variables.
* Identificar endpoint utilizado y payload actual.
* Ejecutar prueba real controlada.
* Distinguir explicitamente: `provider accepted`, `delivered`, `read` y respuesta humana.
* Definir e implementar el camino minimo seguro para conectar las plantillas con el Centro Demo / Demo API.
* No exponer tokens en frontend.
* No ampliar arquitectura innecesariamente.

Objetivo comercial demostrable:

```text
Ruta 2
-> reserva
-> Expediente Vivo / Centro de Mando
-> accion humana o sugerida
-> Demo API
-> plantilla Meta aprobada
-> WhatsApp real
```

## F. PLAN DE TRABAJO CONSOLIDADO APROBADO

### BLOQUE A - DEMO SEGURO

1. Certificar Git y aplicaciones.
2. Ejecutar recorrido integral.
3. Detectar unicamente fallos criticos que puedan afectar una demostracion.
4. No abrir rediseños innecesarios.

### BLOQUE B - CENTRO DEMO

Revisar y cerrar lo imprescindible de FASE 04 - Centro de Mando y Evidencia:

* cantidad a generar;
* cantidad generada;
* defectuosos;
* aprobados;
* inyectados;
* estado cero cuando no existe corrida;
* reinicio / limpieza / regeneracion;
* inyeccion de registros demo;
* navegacion contextual;
* evidencia visible.

Principio: FASE 04 genera, audita, aprueba e inyecta.

Revisar y cerrar lo imprescindible de FASE 05 - H - OperIA Intelligence:

* hallazgos;
* riesgos;
* oportunidades;
* prioridades;
* recomendaciones;
* correspondencia con paginas operativas;
* visualizacion de evidencia;
* accion sugerida a personas concretas.

Principio:

```text
FASE 04 genera evidencia
-> FASE 05 interpreta y prioriza
-> la pagina operativa correspondiente muestra el hallazgo
-> una persona sabe que accion ejecutar
```

Paginas destino minimas:

1. Centro Ejecutivo.
2. Expediente Vivo.
3. Construccion / Inventario.
4. Documentos.
5. Finanzas / Pagos.
6. Servicio al Cliente.
7. Ventas / Vendedoras.

### BLOQUE C - WHATSAPP REAL

1. Certificar las dos plantillas aprobadas.
2. Revisar Demo API.
3. Identificar endpoint y payload actual.
4. Definir integracion minima segura.
5. Ejecutar prueba real controlada.
6. Certificar resultado.
7. Integrarlo al recorrido del demo sin ampliar innecesariamente arquitectura.

### BLOQUE D - COMERCIALIZACION

Este frente se trabajara principalmente desde ChatGPT y no requiere desarrollo inmediato en Codex.

Primera etapa: campaña por correo electronico.

Objetivo: identificar empresas con proyectos inmobiliarios vivos/en construccion o comercializacion y preparar una campaña dirigida.

Datos a investigar posteriormente:

* desarrolladora;
* proyecto;
* ubicacion;
* estado comercial;
* contacto;
* responsable cuando sea posible;
* email publico;
* sitio web;
* prioridad comercial.

Primer material: Video Intro.

CTA: conseguir conversacion o demostracion.

Segunda etapa: campaña WhatsApp dirigida.

Video Presentacion: utilizar despues de manifestacion de interes o dentro de la reunion.

## G. ENSAYO INTEGRAL POSTERIOR

Despues de cerrar FASE 04, FASE 05 y WhatsApp, ejecutar un ensayo integral:

```text
Cliente
-> Ruta 2
-> reserva
-> Expediente Vivo
-> Registro
-> Mensajeria
-> Marta
-> evidencia
-> Intelligence
-> recomendacion
-> WhatsApp
-> Cierre Ejecutivo
```

El ensayo debe distinguir claramente:

* partes reales;
* partes simuladas/demo;
* partes locales;
* partes pendientes de integracion productiva.

## H. FUERA DEL ALCANCE INMEDIATO

Mantener fuera salvo nueva autorizacion humana expresa:

* Supabase productivo;
* SQL nuevo;
* Bloque 6;
* inventario maestro productivo;
* Vapi completo;
* nueva arquitectura productiva;
* grandes refactorizaciones;
* separacion estructural definitiva Centro Demo/Admin;
* paquetes nuevos;
* rediseños profundos de FASE 04/05;
* servidores durante el cierre;
* backend no relacionado directamente con la prueba minima segura autorizada de WhatsApp.

## I. RIESGOS Y PENDIENTES

### Riesgos Git y certificacion

* Los repositorios relacionados requirieron `safe.directory` temporal por diferencias de propietario bajo el usuario sandbox; AMENA 90 debe repetir certificacion antes de intervenir.
* El ahead/behind `0 0` fue calculado contra upstream local, y la vigencia remota de cada rama activa fue contrastada con `git ls-remote`. No se hizo commit ni push.
* El working tree del repositorio rector queda con este documento nuevo sin publicar hasta autorizacion humana.

### Riesgos funcionales

* Presentar el flujo demo/local como productivo.
* Confundir aceptacion del proveedor WhatsApp con entrega, lectura o respuesta humana.
* Exponer tokens en frontend durante la integracion WhatsApp.
* Abrir rediseños de FASE 04/05 antes de certificar el recorrido demo seguro.
* Mezclar Marta, Intelligence, Registro, Mensajeria y Expediente Vivo sin trazabilidad clara de evidencia.
* Reabrir Supabase, SQL o arquitectura productiva antes de la prioridad WhatsApp/demo.

### Pendientes vivos

* Ejecutar BLOQUE A - DEMO SEGURO.
* Auditar FASE 04 y FASE 05 solo despues del dictamen inicial.
* Certificar las dos plantillas WhatsApp aprobadas por Meta.
* Revisar Demo API y endpoint de resumen/plantilla WhatsApp.
* Ejecutar prueba real controlada y registrar evidencia.
* Preparar el recorrido demo comercial con distincion real/demo.

## J. PUNTO EXACTO DE REANUDACION

Codex AMENA 90 debe comenzar por:

1. Reconstruir contexto exclusivamente desde este documento rector y las fuentes oficiales citadas.
2. Certificar nuevamente el repositorio rector y repositorios relacionados:
   * `C:\Amena\Codex\AMENA_Comalapa`;
   * `C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`;
   * `C:\Amena\Codex\AMENA_Registro_Operacional_Ventas`;
   * `C:\Amena\Codex\AMENA_Mensajeria_Operacional`;
   * `C:\Amena\Codex\AMENA_Demo_API`.
3. Ejecutar BLOQUE A - DEMO SEGURO.
4. No modificar todavia FASE 04, FASE 05 ni WhatsApp hasta terminar esa auditoria inicial y emitir dictamen.
5. Despues proponer la primera microcirugia concreta segun el plan aprobado.

Decision inmediata requerida del usuario al cierre de AMENA 89: verificar este documento y autorizar o rechazar su publicacion posterior. No publicar todavia.

## K. INSTRUCCION INICIAL PARA CODEX AMENA 90

Aplicar `KB-0003`, `FO-COC-0001`, `ADR-002`, `REG-0001` y `CF-0001`.

Reconstruir continuidad desde:

`C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base\98_Work_In_Progress\TRANSICION-Codex-AMENA-89-A-90-20260818-1048.md`

Primera accion obligatoria:

1. Certificar Git del repositorio rector `C:\Amena\Codex\AMENA_Comalapa`: ruta, rama, HEAD, origin, HEAD remoto, ahead/behind y working tree.
2. Certificar Git de los repositorios relacionados Ruta 2, Registro Operacional, Mensajeria Operacional y Demo API antes de intervenirlos.
3. No modificar codigo, no iniciar servidores, no tocar Supabase/SQL/backend, no instalar paquetes, no crear stash, no hacer commit ni push sin autorizacion humana.
4. Ejecutar BLOQUE A - DEMO SEGURO: recorrido integral y deteccion solo de fallos criticos para demostracion.
5. Emitir dictamen. Solo despues proponer la primera microcirugia concreta, probablemente sobre el minimo necesario para cerrar FASE 04/FASE 05 o preparar WhatsApp real, segun lo que arroje la auditoria.

Prioridad cercana despues del dictamen: certificar las dos plantillas WhatsApp aprobadas por Meta y conectar el camino minimo seguro Centro Demo / Demo API / WhatsApp real sin exponer tokens ni ampliar arquitectura.

## L. CIERRE DE AMENA 89

Este documento cierra formalmente Codex AMENA 89 y prepara Codex AMENA 90. El unico archivo creado en este cierre es:

`docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-89-A-90-20260818-1048.md`

No se modifico codigo. No se inicio servidor. No se toco Supabase ni SQL. No se modifico backend. No se instalaron paquetes. No se creo stash. No se hizo commit. No se hizo push.

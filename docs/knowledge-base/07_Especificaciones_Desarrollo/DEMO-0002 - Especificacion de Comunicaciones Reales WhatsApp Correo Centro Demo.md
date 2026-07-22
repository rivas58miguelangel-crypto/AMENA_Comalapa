# DEMO-0002 - Especificacion de Comunicaciones Reales WhatsApp Correo Centro Demo

## Estado documental

* **Identificador:** DEMO-0002
* **Tipo:** Especificacion rectora activa
* **Estado:** Activa
* **Alcance:** Demo limitado
* **Implementacion:** Pendiente
* **Produccion futura:** Expresamente diferida
* **Repositorio rector:** `C:\Amena\Codex\AMENA_Comalapa`
* **Rama rectora:** `centro-mando-admin10`
* **Vinculacion operativa:** Codex AMENA 84

Este documento formaliza un alcance demo limitado. No modifica aplicaciones, no disena la arquitectura general de comunicaciones, no abre Supabase, no ejecuta SQL, no implementa backend, no instala paquetes y no autoriza integraciones productivas.

---

## 1. Proposito

Formalizar las comunicaciones reales limitadas que necesita el Centro Demo, evitando convertir este trabajo en la arquitectura completa de comunicaciones de produccion.

El proposito inmediato es delimitar dos casos concretos donde la demostracion requiere mensajes reales y verificables en la medida en que los motores tecnicos correspondientes lo permitan.

---

## 2. Decision rectora

WhatsApp y correo electronico no deben tratarse unicamente como simulaciones visuales.

Para los casos definidos en este documento se requieren mensajes reales, utilizando los motores tecnicos correspondientes, con el objetivo de producir credibilidad verificable durante la demostracion.

Esta decision no afirma que WhatsApp, Elastic Email, Vapi, Supabase, backend o persistencia ya esten plenamente integrados. Solo establece que, para el Centro Demo, los casos aqui definidos no deben quedar reducidos a una maqueta visual cuando se autorice su implementacion.

---

## 3. Alcance presente del Centro Demo

### Caso 1 - Envio del enlace al voluntario

El caso ocurre desde "Voluntarios de la sesion" en el Centro Demo.

El voluntario proporciona:

* nombre;
* cargo;
* empresa;
* WhatsApp;
* correo electronico.

Debe enviarse realmente el enlace para acceder a la App Publica de Reservas. El canal prioritario del alcance inmediato es WhatsApp.

El correo electronico podra utilizarse cuando su autenticacion y entregabilidad esten verificadas. Mientras esa condicion no exista, el correo debe tratarse como previsto o pendiente, no como envio real certificado.

Debe conservarse evidencia visible del intento y del resultado del envio.

No debe presentarse como entregado si solamente se hizo una solicitud al backend. La evidencia debe diferenciar, como minimo, entre solicitud realizada y confirmacion tecnica superior cuando exista.

### Caso 2 - Resumen final del recorrido

El caso ocurre despues de completar la reserva y todo el recorrido de acompanamiento de la App Publica.

No ocurre inmediatamente despues de seleccionar o reservar una unidad.

Debe generarse o enviarse por WhatsApp un resumen consolidado del proceso en el tramo final del recorrido, antes de que el usuario salga de la experiencia.

La secuencia funcional correcta es:

1. El usuario completa la reserva.
2. El usuario continua todo el acompanamiento posterior.
3. El usuario llega al tramo final del recorrido.
4. Antes de salir de la experiencia, la aplicacion solicita el envio del WhatsApp consolidado.
5. El mensaje se envia realmente o se simula, segun el estado tecnico certificado del motor disponible.
6. El usuario confirma dentro de la aplicacion que ya recibio el mensaje.
7. Solo despues de esa confirmacion se completa el cierre definitivo.

La auditoria funcional debe identificar con precision el paso exacto del flujo, sea 14, 15, 16 o equivalente, donde ocurre cada evento:

* solicitud de envio;
* envio real o simulado;
* confirmacion de recepcion por parte del usuario;
* cierre definitivo.

No debe describirse WhatsApp como una accion inmediata post-reserva.

El resumen debera incluir, segun la informacion realmente disponible:

* identificacion o referencia de la reserva;
* seleccion realizada;
* acuerdos y decisiones;
* comentarios relevantes;
* proximos pasos;
* acceso permanente o enlace correspondiente a Marta, cuando aplique.

El correo electronico queda previsto como envio posterior.

No debe enviarse simultaneamente de manera automatica si ello puede producir sensacion de duplicidad o spam.

---

## 4. Estado tecnico encontrado

Los hallazgos de auditoria aplicables al momento de crear esta especificacion son:

* En Admin existe `sendDemoLink`.
* Existe normalizacion de telefono.
* Existe un endpoint esperado: `http://localhost:4000/send-whatsapp`.
* Los botones reales de WhatsApp y correo estan desactivados actualmente.
* El proveedor real de WhatsApp todavia no quedo identificado ni certificado.
* El backend correspondiente no esta incluido ni certificado dentro del repositorio rector.
* No existe confirmacion certificada de entrega o lectura.
* No existe persistencia certificada del envio.
* No esta implementado el WhatsApp consolidado real al final de la App Publica.
* Elastic Email esta previsto, pero su autenticacion, variables y entregabilidad todavia deben validarse.

Estos hallazgos no deben interpretarse como integracion real disponible. Describen el punto de partida documental para una implementacion futura limitada.

---

## 5. Frontera entre demo y produccion

### Demo actual

Resolver solamente los dos casos concretos anteriores con comunicaciones reales y controladas:

* envio del enlace de acceso al voluntario desde Centro Demo;
* envio del resumen final del recorrido por WhatsApp al completar reserva y acompanamiento en App Publica.

### Produccion futura

Se conservan como especificaciones pendientes, sin desarrollarse ahora:

* proveedor definitivo de WhatsApp;
* contrato de payloads;
* consentimiento del destinatario;
* plantillas aprobadas;
* autenticacion y entregabilidad del correo;
* confirmacion de entrega y lectura;
* reintentos y manejo de errores;
* trazabilidad y expediente operacional;
* seguridad de credenciales;
* limites de frecuencia;
* auditoria;
* arquitectura general de comunicaciones;
* campanas y otros eventos del journey.

Estos puntos no amplian el alcance de AMENA 84. Quedan preservados para produccion futura y requieren autorizacion documental especifica antes de convertirse en diseno tecnico o implementacion.

---

## 6. Principios de verdad demo

* No llamar "real" a un envio simulado.
* No llamar "entregado" a una solicitud aceptada por un frontend.
* Diferenciar:
  * mensaje preparado;
  * solicitud enviada al backend;
  * proveedor acepto el mensaje;
  * mensaje entregado;
  * mensaje leido, cuando el proveedor lo permita.
* No exponer credenciales en frontend, documentacion o repositorio.
* No afirmar que WhatsApp, Elastic Email o Vapi estan plenamente integrados sin evidencia tecnica.

---

## 7. Evidencia y trazabilidad

Esta especificacion deriva de la auditoria y delimitacion aprobadas para AMENA 84 y debe consultarse junto con:

* `src/App.tsx`: evidencia de `PUBLIC_RESERVATION_APP_URL`, `DEMO_BACKEND_URL`, `sendDemoLink`, normalizacion de telefono, endpoint `/send-whatsapp`, endpoint `/send-email`, estados visibles y evidencia local de solicitud.
* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-59-A-60-20260702-1251.md`: decision historica de que el WhatsApp consolidado no se envia inmediatamente despues de reservar, sino al finalizar todo el recorrido de acompanamiento.
* `docs/knowledge-base/07_Especificaciones_Desarrollo/FO-COC-0001 - Formato Oficial del Contexto Operativo Certificado.md`: regla de continuidad que reconoce que el WhatsApp consolidado ocurre al final del recorrido.
* `docs/knowledge-base/07_Especificaciones_Desarrollo/SUPABASE-0001 - Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual.md`: evidencia documental del dato observado en codigo para WhatsApp, correo y estado de envio.
* `docs/knowledge-base/98_Work_In_Progress/TRANSICION-Codex-AMENA-83-A-84-20260720-1851.md`: continuidad hacia AMENA 84, restricciones vigentes y pausa de Supabase.
* `docs/knowledge-base/02_Corpus_Fundacional/Arquitectura Visual Comun de la Suite H - OperIA.md`: CF-0001 como documento rector visual complementario; esta especificacion no lo redefine ni lo amplia.

El archivo `src/App_BACKUP_ANTES_CENTRO_MANDO_ADMIN10_260522.tsx` puede servir como evidencia historica o heredada del flujo de reserva, analisis y acompanamiento, pero no debe utilizarse como fuente de implementacion vigente sin advertir expresamente su condicion de backup.

---

## 8. Regla de continuidad

"Mientras las comunicaciones reales del Centro Demo no esten cerradas y certificadas, este documento debera citarse en cada documento de transicion Codex AMENA como referencia activa del frente."

---

## 9. Relacion con CF-0001

Esta especificacion no contradice CF-0001 porque no redefine identidad visual, arquitectura de interfaz, metodologia de derivacion ni autoridad rectora visual.

Su alcance es operacional-documental: definir cuando una comunicacion del Centro Demo debe ser real, que verdad debe declararse sobre su estado y que frontera debe conservarse entre demo limitado y produccion futura.

---

## 10. Activacion obligatoria, continuidad y criterio de cierre

### Naturaleza operativa

DEMO-0002 no es unicamente una referencia documental.

Constituye un frente activo y pendiente de:

* implementacion;
* prueba controlada;
* obtencion de evidencia;
* certificacion;
* cierre documental.

### Reconstruccion obligatoria

Mientras el frente permanezca abierto:

* DEMO-0002 debe citarse en cada transicion Codex AMENA;
* debe incluirse entre las fuentes obligatorias de reconstruccion del siguiente chat;
* no puede omitirse del Contexto Operativo Certificado;
* debe conservarse como pendiente activo en IME-0001;
* debe revisarse antes de intervenir WhatsApp, correo, Centro Demo o App Publica en aspectos relacionados con estos dos casos.

### Casos de ejecucion obligatoria

El frente no podra considerarse resuelto hasta implementar y probar:

**Caso 1**

Envio real del enlace de acceso al voluntario desde el Centro Demo.

**Caso 2**

Envio real por WhatsApp del resumen consolidado en el tramo final del recorrido, despues de completar la reserva y todo el acompanamiento posterior, antes de salir de la experiencia y antes del cierre definitivo.

La implementacion y la auditoria deberan distinguir explicitamente:

* paso de solicitud de envio;
* paso de envio real o simulado;
* paso de confirmacion de recepcion por parte del usuario dentro de la aplicacion;
* paso de cierre definitivo posterior a esa confirmacion.

**Correo electronico**

Debe conservarse como tarea posterior trazable y separada, sujeta a:

* autenticacion de dominio o remitente;
* configuracion segura;
* verificacion de entregabilidad;
* validacion de Elastic Email;
* decision humana sobre el momento exacto del envio.

No declarar el correo completado unicamente porque exista codigo, configuracion parcial o una cuenta de proveedor.

### Criterio minimo de cierre

DEMO-0002 solo podra declararse cerrado cuando existan:

* implementacion tecnica real;
* prueba controlada con destinatario autorizado;
* evidencia del intento y del resultado;
* distincion verificable entre:
  * mensaje preparado;
  * solicitud enviada al backend;
  * solicitud aceptada por el proveedor;
  * mensaje entregado;
  * mensaje leido, cuando el proveedor lo permita;
* tratamiento documentado de errores;
* confirmacion de que no se exponen credenciales;
* actualizacion de IME-014;
* documento o seccion formal de cierre;
* referencia al cierre en la transicion Codex AMENA correspondiente.

### Prohibicion de cierre prematuro

No podra considerarse cerrado el frente unicamente porque:

* DEMO-0002 haya sido publicado;
* exista una interfaz;
* exista un boton;
* exista un endpoint declarado;
* el frontend muestre estado exitoso;
* el backend acepte una solicitud;
* exista evidencia simulada;
* exista un mensaje preparado;
* exista configuracion parcial;
* se haya realizado una prueba sin evidencia verificable.

### Condicion de permanencia

Mientras no se cumpla el criterio de cierre:

* DEMO-0002 permanecera activo;
* IME-014 permanecera con estado Pendiente;
* su prioridad permanecera Alta;
* no podra eliminarse de futuras transiciones;
* cualquier pausa debera quedar documentada expresamente, sin confundirse con cierre.

---

## 11. Resultado esperado

DEMO-0002 debe permitir que AMENA 84 continue el frente de comunicaciones reales del Centro Demo con una frontera clara:

* dos casos concretos;
* mensajes reales solo cuando exista motor tecnico certificado;
* evidencia visible sin exagerar el estado de entrega;
* correo diferido hasta validacion de Elastic Email;
* produccion futura preservada, pero no abierta.

Hasta que exista implementacion validada, este documento no certifica ningun envio real ni ninguna integracion productiva.

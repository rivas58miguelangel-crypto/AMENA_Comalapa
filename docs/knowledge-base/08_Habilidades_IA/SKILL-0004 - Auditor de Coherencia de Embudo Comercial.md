# SKILL-0004 - Auditor de Coherencia de Embudo Comercial

## Estado
Especificacion inicial.

## Objetivo
Detectar contradicciones entre campaña, formulario, backend, plantillas, automatizaciones y decisiones vigentes antes de modificar o publicar una pieza.

## Momento de uso
Aplicar antes de:
- entregar HTML;
- cambiar CTA;
- modificar formulario;
- cambiar automatizacion;
- publicar un correo;
- tocar backend relacionado con leads;
- reactivar una plantilla antigua.

## Auditoria minima
### 1. Identidad de la pieza
- ¿Es promocional, transaccional u operativa manual?
- ¿Quien la envia?
- ¿Quien la recibe?
- ¿Que accion debe provocar?

### 2. Estado del embudo
- ¿En que etapa ocurre?
- ¿Que paso la precede?
- ¿Que paso la sigue?
- ¿Existe una decision mas reciente que invalida el flujo anterior?

### 3. Sistema responsable
- Elastic Email;
- backend de la app;
- accion humana;
- WhatsApp;
- Google Meet.

### 4. Datos y variables
- ¿Que datos ya existen?
- ¿Que datos faltan?
- ¿Son automaticos o manuales?
- ¿Se esta pidiendo al prospecto algo que ya proporciono?

### 5. Version
- ¿Existe una plantilla FINAL?
- ¿Existe una version mas reciente en Git o biblioteca?
- ¿Se esta reutilizando una captura vieja?
- ¿La version fue aprobada o solo propuesta?

### 6. Enlaces
- CTA video;
- CTA demo;
- landing;
- formulario;
- activos;
- Meet cuando proceda.

## Semaforo
- VERDE: consistente, se puede ejecutar.
- AMARILLO: falta una validacion menor.
- ROJO: existe contradiccion de arquitectura, version o responsabilidad de sistema.

## Regla de bloqueo
No entregar una pieza como final si el semaforo es ROJO.

## Resultado esperado
Un dictamen corto:
- pieza;
- version;
- sistema responsable;
- cambios requeridos;
- semaforo;
- siguiente accion.

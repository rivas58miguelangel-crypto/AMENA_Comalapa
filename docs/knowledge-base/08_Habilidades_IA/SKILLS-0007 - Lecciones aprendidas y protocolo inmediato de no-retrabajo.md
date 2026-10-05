# SKILLS-0007 - Lecciones aprendidas y protocolo inmediato de no-retrabajo

## Estado
Registro inicial para revision futura.

## Contexto
El desarrollo reciente del embudo comercial, formularios y plantillas de correo de H-OperIA Inmobiliaria evidencio un patron de retrabajo: decisiones correctas fueron documentadas, pero no siempre consultadas antes de nuevas intervenciones.

## Lecciones principales

### 1. Documentar no es suficiente
El conocimiento solo reduce esfuerzo si existe un mecanismo que obliga a consultarlo antes de actuar.

### 2. El HTML no es el problema principal
El mayor costo aparece al reconstruir:
- que version es la correcta;
- por que se tomo una decision;
- que piezas dependen de ella;
- que sistema ejecuta cada paso.

### 3. Campaña y operacion deben separarse
Elastic Email gestiona campañas promocionales y plantillas manuales. El backend gestiona confirmaciones transaccionales y avisos automaticos.

### 4. Una decision aprobada debe congelarse
No se debe rediseñar una pieza aprobada por mejoras menores. Los cambios deben ser microcirugias.

### 5. Un solo formulario reduce complejidad
El flujo comercial actual adopta:
**una intencion de compra -> un formulario -> un expediente -> una coordinacion.**

### 6. El control humano es parte del diseño
La demo no se agenda automaticamente. Se revisa contexto, necesidad y horarios antes de confirmar.

### 7. La continuidad debe verificarse
Antes de intervenir se deben consultar documentos rectores, ultima version y pendientes.

## Protocolo inmediato
Para cada pieza:
1. identificar el paquete;
2. recuperar ultima version;
3. revisar decisiones rectoras;
4. acordar cambios de contenido;
5. congelar texto;
6. ejecutar HTML/codigo;
7. verificar;
8. aprobar;
9. marcar FINAL;
10. no reabrir salvo error real o nueva decision explicita.

## Definicion de paquete terminado
Un paquete termina cuando tiene:
- objetivo;
- contenido final;
- version final;
- ubicacion;
- enlaces;
- variables;
- prueba;
- estado;
- siguiente dependencia.

## Aplicacion inmediata
Los siguientes paquetes deben completarse con este protocolo:
1. plantilla manual de confirmacion de horario + Google Meet;
2. plantilla manual de nueva propuesta de horario;
3. Email 03 - Gestion del Conocimiento;
4. Email 04 - Experiencia del Usuario;
5. automatizacion de la secuencia en Elastic Email.

## Criterio de exito
Reducir iteraciones, evitar reabrir decisiones y permitir que PC o Laptop continúen desde Git sin depender de la memoria del chat.

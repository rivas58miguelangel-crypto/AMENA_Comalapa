# SKILL-0003 - Orquestador de Solicitud y Coordinacion de Demo

## Estado
Especificacion inicial basada en el flujo vigente de H-OperIA Inmobiliaria.

## Objetivo
Gestionar de forma coherente el paso desde una solicitud de demostracion hasta la confirmacion final de la reunion.

## Flujo rector
1. Prospecto hace clic en Solicitar Demostracion.
2. Completa un formulario unico.
3. El formulario registra:
   - nombre;
   - apellido;
   - cargo;
   - empresa;
   - correo empresarial;
   - WhatsApp;
   - ciudad;
   - pais;
   - proyecto(s);
   - ubicacion del proyecto;
   - necesidad concreta;
   - primera propuesta de fecha/hora;
   - segunda propuesta opcional;
   - zona horaria;
   - consentimiento.
4. El sistema guarda un expediente/lead.
5. El prospecto recibe confirmacion automatica.
6. H-OperIA recibe avisos administrativos.
7. Revision humana de empresa, proyecto, necesidad y horarios.
8. Se ejecuta uno de dos caminos:
   - aceptar una propuesta y enviar confirmacion final + Google Meet;
   - proponer un nuevo horario y esperar confirmacion.
9. Solo despues del acuerdo se envia Google Meet.

## Plantillas manuales requeridas
### A. Confirmacion de horario aceptado
Debe incluir:
- nombre;
- referencia;
- fecha y hora confirmadas;
- zona horaria;
- enlace de Google Meet;
- instrucciones breves;
- firma.

### B. Nueva propuesta de horario
Debe incluir:
- agradecimiento por las propuestas recibidas;
- nueva fecha y hora propuesta;
- zona horaria;
- instruccion para confirmar por correo o WhatsApp;
- sin enlace de Google Meet hasta que exista acuerdo.

## Regla de oro
**Una intencion de compra -> un formulario -> un expediente -> una coordinacion.**

## Reglas
- no usar segundo formulario;
- no usar Google Calendar en el flujo actual;
- no automatizar una aceptacion que requiere criterio humano;
- mantener correo y WhatsApp como canales de coordinacion;
- no enviar Meet antes de confirmar horario;
- registrar el estado de la coordinacion cuando exista mecanismo operativo para ello.

## Pendiente actual
Crear, cargar y probar en Elastic Email:
1. plantilla manual de confirmacion de horario + Google Meet;
2. plantilla manual de nueva propuesta de horario.

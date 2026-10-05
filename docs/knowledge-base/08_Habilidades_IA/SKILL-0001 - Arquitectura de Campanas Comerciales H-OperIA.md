# SKILL-0001 - Arquitectura de Campanas Comerciales H-OperIA

## Estado
Especificacion inicial. Pendiente de validacion formal.

## Objetivo
Diseñar secuencias comerciales por correo que conduzcan al prospecto desde un primer contacto hasta una accion concreta, sin mezclar campañas promocionales con comunicaciones transaccionales u operativas.

## Problema que resuelve
Evitar que cada campaña se diseñe desde cero, que se mezclen etapas del embudo o que se introduzcan CTAs contradictorios con el flujo vigente.

## Entradas
- objetivo comercial;
- tipo de prospecto;
- producto o vertical H-OperIA;
- activos disponibles: videos, imagenes, landing pages;
- CTA deseado;
- formulario vigente;
- reglas de automatizacion de Elastic Email;
- documentos rectores del embudo.

## Salidas
- mapa de secuencia;
- objetivo de cada correo;
- asunto y preheader;
- CTA primario y secundario;
- condicion de envio;
- reglas de reenvio;
- dependencia con formularios;
- puntos de control humano;
- criterios de cierre.

## Flujo de referencia actual H-OperIA Inmobiliaria
1. Email 01 - Video Anzuelo.
2. Reenvio de Email 01 si no fue abierto.
3. Email 03 - Gestion del Conocimiento desde la perspectiva del contexto, independientemente de la apertura o solicitud previa.
4. Email 04 - Experiencia del Usuario.
5. CTA Solicitar Demostracion -> formulario unico.
6. Coordinacion humana de horario.
7. Confirmacion final + Google Meet.

## Reglas
- Una intencion de compra -> un formulario -> un expediente -> una coordinacion.
- No usar Google Calendar para la coordinacion actual.
- No crear segundos formularios para proponer horario.
- No mezclar campaña promocional con confirmaciones transaccionales.
- No bloquear correos publicos sin decision expresa.
- Mantener control humano antes de confirmar la demo.
- El enlace de Google Meet solo se envia cuando exista horario acordado.

## Control de calidad
Antes de aprobar una campaña verificar:
- el CTA conduce al destino correcto;
- el formulario vigente coincide con la narrativa;
- no hay pasos obsoletos;
- la automatizacion no depende de condiciones no configuradas;
- cada correo tiene un solo objetivo primario;
- existe continuidad entre mensajes;
- las plantillas aprobadas no se rediseñan sin motivo.

## Riesgos frecuentes
- duplicar formularios;
- volver a una arquitectura anterior;
- condicionar incorrectamente Email 03 a la apertura del Email 01;
- convertir un correo transaccional en pieza promocional excesiva;
- reutilizar HTML antiguo sin comparar contra decisiones recientes.

## Relacion con otras skills
- SKILL-0002 para construir las plantillas.
- SKILL-0003 para coordinar la demo.
- SKILL-0004 para auditar coherencia antes de ejecutar.
- SKILL-0005 para asegurar continuidad documental.

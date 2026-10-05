# SKILL-0002 - Constructor de Plantillas Elastic Email H-OperIA

## Estado
Especificacion inicial basada en trabajo real. Pendiente de validacion formal.

## Objetivo
Crear, revisar y mantener plantillas HTML para Elastic Email con identidad visual H-OperIA, compatibilidad razonable entre clientes de correo y coherencia total con el embudo vigente.

## Entradas
- tipo de correo: promocional, transaccional, operativo manual;
- texto aprobado;
- asunto y preheader;
- CTA y URL;
- imagenes aprobadas;
- placeholders;
- plantilla visual de referencia;
- reglas de campaña o coordinacion.

## Salidas
- HTML completo;
- asunto;
- preheader;
- variables a reemplazar;
- enlaces usados;
- nombre sugerido de plantilla;
- checklist de verificacion.

## ADN visual a preservar
- fondo negro/navy;
- dorado;
- blanco;
- logo Suite H-OperIA;
- barra de progreso o acento dorado;
- tarjetas claras;
- firma H-OperIA Inmobiliaria / Automatiza Hoy IA;
- pie oscuro con lema;
- jerarquia visual consistente.

## Reglas de construccion
1. Mantener tablas HTML para compatibilidad de email.
2. Usar estilos inline para elementos criticos.
3. Mantener responsive basico con media queries.
4. No introducir dependencias externas innecesarias.
5. Verificar que imagenes usen URL publica HTTPS.
6. Verificar que CTA tenga URL vigente.
7. No usar placeholders que el sistema no pueda sustituir.
8. Distinguir claramente variables automaticas de campos manuales.
9. No rediseñar una plantilla aprobada por una correccion funcional menor.
10. Una pieza transaccional debe priorizar claridad sobre densidad promocional.

## Checklist antes de entregar
- [ ] Tipo de correo identificado.
- [ ] Flujo vigente revisado.
- [ ] Asunto aprobado.
- [ ] Preheader aprobado.
- [ ] CTA correcto.
- [ ] URL correcta.
- [ ] Imagenes publicas verificadas.
- [ ] Placeholders identificados.
- [ ] Pie y firma correctos.
- [ ] Version movil razonable.
- [ ] No existe texto de arquitectura obsoleta.
- [ ] No existen CTAs de formularios retirados.
- [ ] No se han mezclado campañas con correos operativos.

## Leccion aprendida
El costo principal no esta en escribir HTML sino en reconstruir por que la plantilla existe, que version es vigente y que decisiones debe respetar. Por eso esta skill debe comenzar siempre con una auditoria de contexto.

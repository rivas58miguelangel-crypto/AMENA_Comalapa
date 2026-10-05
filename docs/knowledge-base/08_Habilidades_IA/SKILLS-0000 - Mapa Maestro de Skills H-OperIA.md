# SKILLS-0000 - Mapa Maestro de Skills H-OperIA

## Estado
Borrador rector para revision futura.

## Proposito
Organizar las habilidades reutilizables que surgen del trabajo acumulado en H-OperIA y AMENA, evitando que el conocimiento quede disperso entre chats, documentos, repositorios y memoria humana.

## Principio rector
**Escalar el conocimiento para no escalar proporcionalmente el esfuerzo.**

Las skills no deben entenderse como prompts largos. Deben ser paquetes operativos reutilizables compuestos por:
- proposito y alcance;
- contexto rector;
- reglas permanentes;
- entradas requeridas;
- procedimiento;
- criterios de decision;
- salidas esperadas;
- controles de calidad;
- dependencias documentales;
- version y estado de madurez.

## Fuentes metodologicas de base
Este mapa se apoya en la arquitectura documental ya existente en AMENA/H-OperIA:
- GOV: reglas permanentes.
- KB: modelos conceptuales y continuidad.
- OPS: protocolos operativos.
- IME: ejecucion viva y pendientes.
- Documentos de transicion: continuidad entre sesiones.
- Especificaciones de desarrollo: contratos de comportamiento.
- Planes de trabajo: secuencia y alcance de intervenciones.
- Registro de aprendizaje: problemas, decisiones, errores evitados y mejoras.

## Regla de gobierno
Antes de crear o modificar una skill:
1. Reconstruir el contexto desde la Base de Conocimiento.
2. Identificar si existe una habilidad, protocolo o especificacion equivalente.
3. Reutilizar y extender antes que duplicar.
4. Separar decisiones vigentes de propuestas.
5. Marcar claramente el estado de madurez.
6. No convertir una experiencia aislada en regla sin evidencia suficiente.
7. Registrar dependencias y documentos fuente.

## Familias de skills

### A. Skills comerciales
1. SKILL-0001 - Arquitectura de Campanas Comerciales H-OperIA.
2. SKILL-0002 - Constructor de Plantillas Elastic Email H-OperIA.
3. SKILL-0003 - Orquestador de Solicitud y Coordinacion de Demo.
4. SKILL-0004 - Auditor de Coherencia de Embudo Comercial.

### B. Skills de continuidad y conocimiento
5. SKILL-0005 - Gestor de Continuidad y Versionado de Trabajo IA.
6. SKILL-0006 - Captura y Transformacion de Aprendizajes en Conocimiento Reutilizable.

### C. Skills futuras identificadas en trabajos previos
Estas no se desarrollan en este paquete; quedan como inventario para revision futura:
- Arquitecto H-OperIA.
- Marta Builder.
- Centro Demo Builder.
- Auditor Supabase.
- Demo Project Analyzer.
- Generador de demos sectoriales parametrizados.
- Auditor de persistencia y trazabilidad.
- Constructor de Contexto Operativo Certificado.

## Estados de madurez propuestos
- Idea.
- Iniciativa.
- Especificacion.
- Prototipo.
- En validacion.
- Validada.
- Skill operativa.
- Conocimiento consolidado.

## Criterio para promover una skill
Una skill puede pasar a "Skill operativa" cuando:
- se haya usado al menos en un caso real completo;
- produzca resultados consistentes;
- tenga entradas y salidas definidas;
- incluya checklist de control;
- evite retrabajo medible;
- no dependa de memoria conversacional;
- tenga version y ubicacion rectora.

## Regla de no duplicacion
Si una nueva necesidad coincide en mas del 60% con una skill existente, se debe evaluar extender la existente antes de crear otra.

## Relacion con la Base de Conocimiento
Las skills no sustituyen la Base de Conocimiento. La Base de Conocimiento conserva las decisiones y evidencias; las skills convierten ese conocimiento en una capacidad repetible.

## Proxima revision
Revisar este mapa cuando se cierre el paquete de correos y automatizacion comercial de H-OperIA Inmobiliaria y decidir que skills alcanzan estado de Especificacion o superior.

# IME-0001 - Indice Maestro de Ejecucion

## Pregunta que responde

Que temas vivos existen, donde se documentan y cual es su proxima accion?

---

# Estado

Indice vivo inicial.

Este documento registra ejecucion viva. No define la gobernanza del sistema, el modelo conceptual de madurez ni protocolos operativos.

---

# Documentos rectores

Antes de trabajar, consultar este indice y luego los documentos asociados segun corresponda:

* GOV-0001: reglas permanentes del sistema de continuidad;
* GOV-0002: protocolo oficial para inicializar nuevos proyectos mediante Bootstrap Metodologico;
* KB-0004: modelo conceptual de madurez del conocimiento;
* OPS-0001: protocolo operativo PC/Laptop/Git;
* PERSISTENCIA-0001: documento rector integrador de la arquitectura de persistencia y conocimiento operacional;
* ADR: decisiones arquitectonicas cuando un tema afecte arquitectura.

El IME no sustituye los documentos fuente. Consultar el IME obliga a leer los documentos asociados aplicables antes de diagnosticar, proponer o modificar trabajo relacionado.

Al abrir un nuevo chat del mismo proyecto debe localizarse el chat inmediatamente anterior, generarse el documento de transicion correspondiente en `98_Work_In_Progress` y leerse ese documento antes de diagnosticar, proponer o modificar trabajo relacionado.

---

# Matriz rectora

| Familia documental | Funcion | Pregunta que responde |
| --- | --- | --- |
| ADR | Decisiones arquitectonicas | Que decision tecnica o arquitectonica fue tomada y por que? |
| GOV | Reglas permanentes | Que regla debe respetarse de forma continua? |
| KB | Modelos conceptuales | Como se entiende o clasifica un concepto del proyecto? |
| OPS | Protocolos operativos | Como se ejecuta una rutina operativa recurrente? |
| PERSISTENCIA | Arquitectura de persistencia y conocimiento operacional | Como se integra el modelo rector de persistencia, conocimiento, evidencia, rutas operacionales y aprendizaje? |
| IME | Ejecucion viva | Que temas estan activos, pendientes o en revision? |

---

# Valores cerrados

## Tipo

* Compromiso funcional;
* Compromiso tecnico;
* Revision;
* Sistema documental;
* Modulo futuro;
* Regla operativa;
* Respaldo / espejo.

## Nivel de madurez

* Idea;
* Iniciativa;
* Especificacion;
* Planificado;
* Desarrollo;
* Implementado;
* Validado;
* Conocimiento consolidado.

## Estado operativo

* Idea;
* Pendiente;
* En curso;
* En validacion inicial;
* Completado pendiente de validacion;
* Completado confirmado;
* Descartado explicitamente;
* Requiere verificacion.

## Nivel de certeza

* Alta;
* Media;
* Baja.

## Prioridad

* Alta;
* Media;
* Baja.

## Horizonte

* Centro Demo;
* H-OperIA producto futuro;
* Ambos.

---

# Indice vivo

| ID | Documento asociado | Area | Tipo | Nivel de madurez | Estado operativo | Nivel de certeza | Prioridad | Horizonte | Proxima accion | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IME-001 | Sin documento propio | App Reservas | Compromiso funcional | Idea | Pendiente | Media | Alta | Centro Demo | Verificar alcance y definir si requiere especificacion o implementacion directa | Boton "Prefiero hablar con un humano" en App Reservas. No asumir implementado. |
| IME-002 | Documentos FASE 04 existentes por verificar | Integraciones | Compromiso tecnico | Planificado | Pendiente | Alta | Alta | Centro Demo | Consultar documentacion FASE 04 y definir plan de integracion real con Supabase | Integracion real FASE 04 -> Supabase. |
| IME-003 | Documentos FASE 03 existentes por verificar | Integraciones | Compromiso tecnico | Planificado | Pendiente | Alta | Alta | Centro Demo | Verificar fuentes App Vendedoras y Mensajeria; definir lectura via Supabase | FASE 03 leyendo App Vendedoras y Mensajeria via Supabase. |
| IME-004 | Documentos FASE 05 existentes por verificar | H-OperIA Intelligence | Revision | Iniciativa | Pendiente | Media | Media | H-OperIA producto futuro | Revisar alcance, narrativa y dependencias de FASE 05 | Revision de FASE 05 H-OperIA Intelligence. |
| IME-005 | GOV-0001; KB-0003; KB-0004; IME-0001 | Gobernanza | Sistema documental | Implementado | En validacion inicial | Alta | Alta | Ambos | Validar reglas iniciales usando el sistema en sesiones reales | Sistema de Continuidad del Conocimiento. |
| IME-006 | KB-0004 | Base de Conocimiento | Modulo futuro | Idea | Pendiente | Alta | Media | H-OperIA producto futuro | Definir alcance cuando el producto requiera gestion interna de conocimiento | Futuro modulo/pagina Base de Conocimiento en H-OperIA. |
| IME-007 | OPS-0001 | Operacion de repositorio | Regla operativa | Iniciativa | Pendiente | Media | Alta | Centro Demo | Usar OPS-0001 como protocolo base y validar su aplicacion antes de trabajar | Regla permanente de sincronizacion PC/Laptop antes de trabajar. |
| IME-008 | GOV-0001 | Continuidad documental | Respaldo / espejo | Idea | Pendiente | Alta | Media | Ambos | Definir si se requiere espejo en Google Drive y responsable de actualizacion | Acceso futuro o espejo en Google Drive. Git sigue siendo fuente rectora. |
| IME-009 | GOV-0002 | Gobernanza | Sistema documental | Implementado | En validacion inicial | Alta | Alta | Ambos | Usar GOV-0002 como protocolo rector al iniciar proyectos nuevos bajo metodologia H-OperIA | Protocolo oficial de Bootstrap Metodologico previo a cualquier desarrollo funcional. El Bootstrap concluye cuando el proyecto alcanza estado POI. |
| IME-010 | VAPI-0001 | Marta / Vapi | Compromiso tecnico | Planificado | Pendiente | Alta | Alta | Ambos | Auditar integracion Vapi/Marta inmediatamente despues de estabilizar Centro Demo y antes del 15 de julio de 2026 | VAPI-0001 - Auditoria y migracion de descarga autenticada de grabaciones de Marta. No implementar aun. No exponer API keys. Verificar endpoints autenticados, redirects 302 y repositorios/flujos externos relacionados. |
| IME-011 | PERSISTENCIA-0001 | Persistencia / Conocimiento Operacional | Sistema documental | Conocimiento consolidado | Completado confirmado | Alta | Alta | Ambos | Usar como documento rector integrador antes de iniciar diseno detallado de entidades fisicas | Documento rector permanente de la arquitectura de persistencia y conocimiento operacional. Toda evolucion futura de ACO, SUPABASE y documentos arquitectonicos relacionados debe evaluarse tambien contra PERSISTENCIA-0001. |

---

# Mantenimiento

Este indice se actualiza cuando aparecen nuevos compromisos, cambia el estado operativo de un tema o se identifica un documento asociado.

Las reglas de auditoria, certeza y no eliminacion estan definidas en GOV-0001.

Los criterios de madurez estan definidos en KB-0004.

Los protocolos operativos recurrentes deben referenciar documentos OPS.

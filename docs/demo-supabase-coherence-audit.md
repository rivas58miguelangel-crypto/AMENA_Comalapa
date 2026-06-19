# Auditoría de coherencia y saneamiento futuro de Supabase

## Estado del documento

Estado: Propuesta para revisión humana  
Ámbito: H-OperIA / Centro Demo  
Acción actual: Documentación y diseño; **Supabase no está siendo modificado**.

Este documento no autoriza migraciones, eliminación de tablas o campos, cambios de RLS, ejecución de SQL ni persistencia de datos demo. Su propósito es definir cómo auditar y sanear Supabase de forma segura antes de conectar el Motor Demo.

## 1. Objetivo de la auditoría

Evaluar la coherencia entre el modelo persistente futuro de Supabase y la arquitectura del Motor Demo H-OperIA, identificando:

- activos actuales que deben conservarse;
- tablas o campos sin uso demostrado;
- estructuras incompletas que deben ampliarse;
- tablas faltantes para corridas demo certificadas;
- riesgos de seguridad, integridad y trazabilidad;
- condiciones necesarias antes de conectar Supabase con el Centro Demo.

Supabase no es el resultado final del Motor Demo. Es la memoria persistente que debe almacenar corridas certificadas y alimentar posteriormente la proyección visual del Centro Demo H-OperIA.

## 2. Estado conocido actual

El repositorio define contratos TypeScript para ADN corporativo y operacional, inventario, validación, evaluación ejecutiva, construcción de escenarios, inyección operacional, orquestación, corridas demo y normativa de calidad.

También existe una separación arquitectónica prevista entre:

- Marta Voz / Vapi;
- Marta Texto / WhatsApp;
- H-OperIA Intelligence;
- reservas, reportes, señales y evidencias operacionales.

Sin embargo, en esta auditoría:

- no se ha inspeccionado ni modificado el esquema remoto de Supabase;
- no se ha ejecutado SQL;
- no se confirma todavía qué tablas, columnas, índices, triggers o policies están desplegados;
- no se clasifica ningún activo como eliminable sin evidencia adicional;
- no se ha conectado `DemoRun` con persistencia real.

El estado real debe levantarse mediante un inventario controlado y de solo lectura antes de proponer cambios.

## 3. Alcance de saneamiento

El saneamiento futuro deberá contemplar cinco clases de decisión:

1. **Eliminar tablas innecesarias:** solo cuando se demuestre que no contienen información vigente, no tienen consumidores y cuentan con respaldo.
2. **Eliminar campos innecesarios:** únicamente tras verificar uso en código, vistas, funciones, triggers, reportes, integraciones y consultas.
3. **Conservar tablas útiles:** proteger estructuras canónicas o transversales que sigan cumpliendo una función clara.
4. **Modificar tablas incompletas:** agregar relaciones, auditoría, restricciones o separación demo/real cuando el activo sea recuperable.
5. **Crear tablas faltantes:** incorporar almacenamiento específico para el Motor Demo sin forzar sus dominios dentro de tablas genéricas.

No debe confundirse saneamiento con borrado. La primera tarea es clasificar y documentar.

## 4. Auditoría de tablas actuales

Para cada tabla actual se deberá registrar:

| Criterio | Pregunta de auditoría |
|---|---|
| Propósito | ¿Qué dominio representa y quién es responsable de sus datos? |
| Uso actual | ¿Qué código, vista, función, integración o usuario la consume? |
| Tipo de dato | ¿Contiene datos reales, demo, configuración o evidencia técnica? |
| Volumen | ¿Cuántas filas contiene y cuál es su crecimiento? |
| Relaciones | ¿Qué foreign keys explícitas o relaciones implícitas mantiene? |
| Seguridad | ¿Tiene RLS activo y policies adecuadas? |
| Calidad | ¿Existen duplicados, nulos inválidos o estados inconsistentes? |
| Decisión preliminar | Conservar, modificar, migrar, archivar o candidata a eliminar. |

La decisión “eliminar” debe quedar bloqueada hasta completar análisis de dependencias, respaldo, ventana de reversión y aprobación humana.

Tablas transversales como `operational_records`, si existen, deben evaluarse como bitácora o evidencia; no deben asumir automáticamente el papel de almacenamiento canónico para todos los dominios.

## 5. Auditoría de campos actuales usados y no usados

Cada columna deberá clasificarse como:

- usada y necesaria;
- usada pero mal definida;
- redundante con otra fuente canónica;
- histórica y candidata a archivo;
- aparentemente no usada, pendiente de verificación;
- sensible y sujeta a controles reforzados.

La revisión debe buscar uso en:

- frontend y servicios;
- backend y funciones;
- consultas SQL, vistas y RPC;
- triggers;
- integraciones externas;
- reportes y exportaciones;
- RLS policies;
- procesos manuales documentados.

Una columna sin referencia en el frontend no es necesariamente una columna sin uso.

## 6. Campos faltantes

Las tablas relacionadas con corridas demo deberían evaluar, según su dominio, la necesidad de:

- `id`;
- `demo_run_id`;
- `scenario_id`;
- `injection_id`;
- `organization_id` o `prospect_profile_id`, cuando exista un modelo aprobado;
- `is_simulated`;
- `source`;
- `seed`;
- `status`;
- `created_at`;
- `updated_at`;
- `created_by`;
- `policy_id`;
- `policy_version`;
- `quality_attempt_id`;
- `certification_id`;
- `metadata` controlada;
- referencias específicas a proyecto, unidad, reserva o evidencia.

No todas las columnas pertenecen a todas las tablas. La normalización final debe evitar tanto duplicación innecesaria como objetos JSON opacos imposibles de auditar.

## 7. Tablas nuevas requeridas para el Motor Demo

La propuesta inicial considera:

| Tabla | Responsabilidad |
|---|---|
| `demo_runs` | Cabecera de una ejecución completa y certificable. |
| `demo_run_scenarios` | Escenario construido, readiness, narrativa y semilla operacional. |
| `demo_run_injections` | Metadatos y configuración de la inyección simulada. |
| `demo_quality_gate_attempts` | Historial de verificaciones, rechazos y regeneraciones. |
| `demo_quality_certifications` | Certificación final y autorización de persistencia. |
| `demo_reservations` | Reservas simuladas vinculadas a corrida e inventario. |
| `demo_internal_messages` | Mensajes internos simulados. |
| `demo_sales_reports` | Reportes simulados de vendedoras. |
| `demo_marta_vapi_logs` | Logs simulados de Marta Voz / Vapi. |
| `demo_marta_whatsapp_followups` | Seguimientos simulados de Marta Texto / WhatsApp. |
| `demo_intelligence_signals` | Señales simuladas de H-OperIA Intelligence. |
| `demo_operational_evidence` | Evidencia transversal ligada a entidades fuente. |

Los nombres son propuestas arquitectónicas, no instrucciones SQL. Antes de crearlas debe validarse si existen tablas equivalentes, convenciones de nombres vigentes o requerimientos de separación por esquema.

## 8. Auditoría RLS

### Estado actual

Pendiente de inspección real. Debe inventariarse qué tablas tienen RLS habilitado, qué policies existen, qué roles participan y si hay accesos mediante service role.

### Riesgos

- tablas expuestas sin RLS;
- policies excesivamente amplias;
- mezcla de datos demo y reales sin aislamiento;
- acceso cruzado entre organizaciones o corridas;
- uso del cliente para operaciones administrativas;
- dependencias implícitas del `service_role`;
- lectura o escritura de corridas no certificadas.

### RLS objetivo

- denegar por defecto;
- aislar datos por organización, perfil autorizado o contexto equivalente;
- aislar cada corrida mediante `demo_run_id`;
- exigir `is_simulated = true` en tablas demo;
- limitar escritura a procesos autorizados;
- impedir persistencia de una corrida sin certificación válida;
- separar claramente capacidades de lectura, creación, actualización y administración.

### Policies objetivo

Las policies deberán cubrir, como mínimo:

- lectura de corridas demo autorizadas;
- escritura por el proceso de persistencia aprobado;
- acceso administrativo auditado;
- lectura de entidades dependientes solo si su corrida es accesible;
- bloqueo de mezcla entre datos reales y demo;
- protección de intentos y certificaciones contra alteración no autorizada.

La implementación final debe evitar que una policy dependa de información controlable libremente por el cliente.

## 9. Integridad y auditoría técnica

### Foreign keys

- todas las entidades demo deben vincularse a `demo_runs`;
- escenarios e inyecciones deben pertenecer a una corrida;
- intentos y certificaciones deben mantener su cadena de trazabilidad;
- evidencias deben referenciar una entidad fuente válida;
- el comportamiento `ON DELETE` debe decidirse explícitamente, evitando cascadas destructivas accidentales.

### Índices

Evaluar índices para:

- `demo_run_id`;
- `scenario_id`;
- `status`;
- `created_at`;
- `certification_id`;
- referencias a proyecto, unidad y reserva;
- consultas visuales frecuentes del Centro Demo.

Los índices deben responder a consultas demostradas, no agregarse indiscriminadamente.

### Constraints

Definir:

- `NOT NULL` para identidad y trazabilidad esenciales;
- `CHECK` para estados, cantidades no negativas y `is_simulated`;
- unicidad de IDs externos cuando corresponda;
- consistencia entre certificación, aprobación y autorización de persistencia;
- exclusión de estados incompatibles.

### Timestamps

Usar timestamps con zona horaria y distinguir:

- creación;
- actualización;
- generación de corrida;
- inicio y fin de verificación;
- certificación;
- persistencia;
- archivo o revocación.

### Triggers

Los triggers futuros deben ser mínimos, documentados y verificables. Pueden apoyar `updated_at` o auditoría, pero no deben ocultar lógica crítica de negocio ni certificar automáticamente una corrida.

### Columnas auditables

Considerar:

- `created_by`;
- `updated_by`;
- `source`;
- `engine_version`;
- `policy_version`;
- `seed`;
- `is_simulated`;
- `quality_attempt_id`;
- `certification_id`;
- `persisted_at`;
- `archived_at`.

## 10. Datos reales frente a datos demo

Los datos demo deben:

- estar marcados explícitamente con `is_simulated = true`;
- pertenecer a una corrida identificable;
- usar etiquetas ficticias y seguras;
- conservar su seed, versión de motor y política;
- mantenerse separados de entidades reales;
- poder limpiarse o archivarse por corrida sin afectar producción.

Los datos reales deben residir en dominios y controles propios. No debe inferirse que una tabla demo puede convertirse en tabla productiva solo retirando la palabra `demo`.

Si una tabla compartida fuese inevitable, deberá existir una estrategia aprobada de aislamiento, constraints, RLS, retención y auditoría. La opción preferente para esta etapa es separación explícita.

## 11. Flujo futuro

```text
DemoRun certificado
        ↓
Supabase
        ↓
Proyección visual
        ↓
Centro Demo H-OperIA
```

Interpretación:

1. El Motor Demo genera y encapsula una corrida.
2. El quality gate verifica, rechaza o certifica.
3. Solo la corrida certificada queda autorizada para persistencia.
4. Supabase conserva la memoria persistente y trazable.
5. Una capa de proyección transforma esa memoria para consumo visual.
6. El Centro Demo presenta el escenario sin convertirse en fuente canónica.

## 12. Matriz de origen, persistencia y proyección visual

| Dato generado | Origen lógico | Tabla destino propuesta | Sección visual destino |
|---|---|---|---|
| Cabecera de corrida | `DemoRun` | `demo_runs` | Selector e identidad de corrida |
| Escenario y readiness | `DemoScenarioBuilderOutput` | `demo_run_scenarios` | Resumen de escenario y preparación |
| Inyección y seed | `DemoScenarioInjection` | `demo_run_injections` | Estado de carga y trazabilidad |
| Intento de calidad | Quality gate futuro | `demo_quality_gate_attempts` | Historial de control de calidad |
| Certificación | Quality gate futuro | `demo_quality_certifications` | Sello de aprobación |
| Reservas simuladas | `injection.reservations` | `demo_reservations` | Reservas y seguimiento comercial |
| Mensajes internos | `injection.internalMessages` | `demo_internal_messages` | Bandeja o actividad interna |
| Reportes de vendedoras | `injection.salesReports` | `demo_sales_reports` | Rendimiento y reportes comerciales |
| Logs Marta/Vapi | `injection.martaVapiLogs` | `demo_marta_vapi_logs` | Actividad de voz |
| Seguimientos WhatsApp | `injection.martaWhatsAppFollowUps` | `demo_marta_whatsapp_followups` | Seguimientos de Marta Texto |
| Señales Intelligence | `injection.intelligenceSignals` | `demo_intelligence_signals` | Riesgos, oportunidades y alertas |
| Evidencias operacionales | `injection.operationalEvidence` | `demo_operational_evidence` | Bitácora y soporte verificable |

Los nombres de secciones visuales son destinos conceptuales. Este documento no modifica la UI ni define componentes.

## 13. Riesgos antes de eliminar tablas o campos

- pérdida irreversible de datos;
- ruptura de foreign keys o consultas implícitas;
- fallos en vistas, funciones, triggers o policies;
- interrupción de integraciones externas;
- eliminación de evidencia histórica o auditable;
- mezcla accidental de datos demo y reales durante una migración;
- divergencia entre entornos;
- imposibilidad de reversión;
- eliminación basada solo en búsqueda de código incompleta;
- degradación de rendimiento por retirar índices o estructuras todavía útiles.

Toda eliminación requiere evidencia, respaldo verificado, plan de reversión, prueba en entorno seguro y aprobación humana.

## 14. Orden seguro propuesto

1. **Inventariar:** levantar tablas, columnas, relaciones, RLS, policies, vistas, funciones, triggers, índices, volúmenes y consumidores.
2. **Respaldar:** generar y comprobar respaldos recuperables antes de cualquier cambio.
3. **Clasificar:** marcar cada activo como conservar, modificar, migrar, archivar o candidato a eliminar.
4. **Limpiar:** retirar únicamente activos aprobados, empezando por cambios reversibles y de menor riesgo.
5. **Crear faltantes:** implementar tablas, constraints, relaciones y policies del Motor Demo mediante migraciones revisadas.
6. **Probar:** validar integridad, seguridad, aislamiento demo/real, calidad y restauración.
7. **Conectar:** persistir exclusivamente `DemoRun` certificados mediante una capa controlada.
8. **Visualizar:** proyectar datos persistentes hacia el Centro Demo sin trasladar lógica canónica a la UI.

Cada fase debe producir evidencia revisable antes de avanzar a la siguiente.

## 15. Conclusión

Supabase debe funcionar como memoria persistente, segura y auditable del Motor Demo, no como el final del flujo ni como sustituto del Centro Demo. La visualización debe consumir una proyección controlada de corridas certificadas.

**No debe ejecutarse SQL, eliminarse una tabla o campo, modificarse RLS ni conectarse persistencia real hasta completar el inventario, la revisión técnica y la aprobación humana explícita.**

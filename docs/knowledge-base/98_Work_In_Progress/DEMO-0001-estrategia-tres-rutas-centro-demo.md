# DEMO-0001 — Estrategia de Tres Rutas para el Centro Demo

## 1. Contexto

Durante AMENA 73 se consolidaron avances estructurales del Catálogo Comercial Parametrizable:

- `public.project_catalog`
- `public.project_commercial_types`

También se decidió que la Fase 6 directiva / H - OperIA Intelligence causal no debe formar parte del Centro Demo inicial como capacidad interactiva completa, porque requiere evidencia operacional suficiente, SQL/analítica estructurada y RAG.

## 2. Decisión estratégica

El Centro Demo se organizará en tres rutas:

- Ruta 1: Demo AMENA actual de respaldo.
- Ruta 2: Demo genérico/manual no parametrizable.
- Ruta 3: Demo productivo/parametrizable real.

## 3. Ruta 1 — Demo AMENA actual de respaldo

### Descripción

Aprovechar la App Pública / Centro Demo actual tal como existe hoy, terminando pendientes conocidos.

### Objetivo

Tener una versión funcional inmediata para cualquier eventualidad comercial.

### Alcance

- Conservar estructura visual actual.
- Conservar imágenes y textos actuales mientras no se cree la versión genérica.
- Terminar pendientes conocidos.
- No prometer parametrización completa.
- No prometer H - OperIA Intelligence causal.

### Uso recomendado

Demo rápida de respaldo.

## 4. Ruta 2 — Demo genérico/manual no parametrizable

### Descripción

Crear una copia controlada de la demo actual, preservando la mayor cantidad posible del trabajo ya realizado y sustituyendo manualmente el contenido asociado al proyecto original.

### Objetivo

Contar con una demo limpia, ficticia-realista, presentable y sin riesgo de uso indebido de imágenes, textos o contenido de una constructora/proyecto real.

### Alcance

- Cambiar manualmente el nombre del proyecto.
- Sustituir la imagen general del proyecto por una imagen equivalente pero distinta.
- Sustituir las imágenes de modelos por imágenes ficticias-realistas o generalistas.
- Cambiar los nombres de modelos.
- Cambiar los textos comerciales.
- Cambiar las especificaciones.
- Cambiar los precios.
- Ajustar el contexto geográfico y narrativo.
- Conservar la estructura visual y el flujo de la demo actual.
- Conservar el valor de la arquitectura Supabase ya construida y de los bloques documentados.
- No exigir parametrización todavía.
- No depender todavía de carga real desde Supabase para la presentación inmediata.

### Regla

Esta ruta puede usar contenido generalista o generado para demo, siempre que sea coherente, profesional y no infrinja derechos de terceros.

### Uso recomendado

Demo comercial principal de corto plazo.

### Aclaración AMENA 74 sobre la Ruta 2

La Ruta 2 / Frente B no es una demo nueva construida desde cero. Es una transición práctica y comercial basada en una copia controlada de la demo actual. Su principio rector es: **“copiar, preservar, neutralizar manualmente y avanzar; no rehacer”**.

Desde este momento, la diferencia entre la demo AMENA tradicional y la Ruta 2 será principalmente manual y visible:

- Nombres.
- Textos.
- Narrativa comercial.
- Imágenes.
- Modelos.
- Precios.
- Especificaciones.
- Referencias explícitas al proyecto original.
- Cualquier contenido que amarre la demo a AMENA cuando no convenga comercialmente.

La Ruta 1 AMENA no se elimina, no se archiva y no se invalida. Si AMENA reaparece como oportunidad comercial, podrá presentarse la demo con imágenes propias de AMENA cuando estén disponibles; su ausencia no será un bloqueo absoluto.

La Ruta 2 mantiene el valor de la arquitectura Supabase ya construida y de los bloques documentados, pero no constituye la versión final productiva. Su finalidad inmediata es terminar una demo vendible y presentable sin mezclar ese objetivo con la construcción de la solución productiva definitiva.

## 5. Ruta 3 — Demo productivo/parametrizable real

### Descripción

Evolución futura, diferida hasta después de terminar y validar el demo, hacia una versión alimentada desde Supabase y desde la arquitectura del Catálogo Comercial Parametrizable.

### Objetivo

Convertir la demo en una base cercana a producción, donde imágenes, textos, modelos, atributos, inventario, precios, disponibilidad y publicación provengan de datos parametrizados.

### Alcance futuro

- `project_catalog`.
- `project_commercial_types`.
- Atributos configurables.
- Modelos/familias.
- Inventario.
- Precios referenciales.
- Disponibilidad básica.
- Activos comerciales asociados.
- Publicación controlada de bloques visuales.
- App Pública leyendo datos dinámicos.
- Eventual versión productiva.

### Uso recomendado

Base para producción real y futuras demos parametrizables por prospecto.

## 6. Regla de no contradicción

La Ruta 2 no contradice la arquitectura parametrizable.

La Ruta 2 es una solución comercial pragmática de corto plazo.

La Ruta 3 sigue siendo la dirección estratégica productiva, pero no debe mezclarse con el objetivo inmediato de terminar una demo presentable.

## 7. Regla de protección comercial

No se deben usar imágenes, textos, nombres comerciales, modelos, precios o materiales de una empresa real para vender a terceros si eso puede generar conflicto de uso o percepción indebida.

Por eso, la Ruta 2 debe reemplazar manualmente el contenido sensible por contenido ficticio-realista, equivalente y propio para demo.

## 8. Relación con Inventario Inicial Demo / MOC Vitrina

El Inventario Inicial Demo / MOC Vitrina sigue siendo relevante, pero tendrá dos expresiones:

- Versión manual visual para la Ruta 2.
- Versión parametrizada desde Supabase para la Ruta 3.

En la Ruta 2, el inventario puede ser visual/manual.

En la Ruta 3, el inventario deberá estar gobernado por la arquitectura de datos.

## 9. Publicación controlada y espacios vacíos

La Ruta 3 deberá contemplar una capa futura de publicación controlada de bloques visuales para evitar mostrar secciones vacías.

Toda sección visual debe mostrarse solo si:

- Está marcada como visible.
- Tiene contenido suficiente.
- El contenido está aprobado o habilitado para demo.
- Existe un fallback autorizado.

Si no cumple esas condiciones, la sección debe ocultarse completamente.

## 10. Cantidades variables y parametrización

Las cantidades variables de torres, pisos, modelos, unidades, etapas, polígonos, lotes, casas, paquetes o servicios no deben resolverse con campos fijos ni pantallas rígidas.

Deben resolverse mediante:

- Registros repetibles.
- Relaciones padre-hijo.
- Configuración de visibilidad/publicación por proyecto.

Por ejemplo, un proyecto puede tener 10 torres y otro 15; una torre puede tener 5 pisos y otra 7; un piso puede tener 7 apartamentos y otro 10; y un proyecto puede tener 3 modelos y otro 8. La base y la App Pública no deben cambiar por esas cantidades; deben cambiar los datos.

## 11. Relación con producción

El trabajo realizado en Supabase reducirá significativamente el tiempo, riesgo y costo de la versión productiva, pero producción exigirá endurecimiento adicional:

- Seguridad.
- RLS/policies.
- Roles.
- Validaciones.
- Operación real.
- Auditoría.
- Administración de contenidos.
- Responsabilidad comercial.

## 12. Próxima acción recomendada

AMENA 74 debe iniciar con Reconstrucción Certificada y luego decidir entre:

- A. Continuar Bloque 6 — Atributos Configurables por Tipo Comercial.
- B. Abrir un frente corto para la Ruta 2 — Demo genérico/manual no parametrizable.

La secuencia estratégica general queda establecida así:

1. Terminar un demo vendible y presentable.
2. Usarlo para presentar y validar.
3. Construir después la versión final/productiva.

## 13. Dictamen

La estrategia de tres rutas queda adoptada como marco rector del Centro Demo:

- Ruta 1: respaldo inmediato.
- Ruta 2: demo comercial principal de corto plazo.
- Ruta 3: demo productivo/parametrizable real.

## 14. Actualización AMENA 79 — Backlog corregido del Centro Demo

Fecha de consolidación documental: 2026-07-14.

Fuente:

```text
Observaciones al centro demo 260714.docx
```

Documento fundacional de referencia:

```text
docs/ADR-001-marco-rector-ecosistema-demostracion.md
```

Este backlog aplica los principios permanentes registrados en `ADR-001`, especialmente:

- nomenclatura oficial de la Suite H - OperIA;
- formato sectorial H - OperIA Inmobiliaria;
- H - OperIA Intelligence como componente nombrado;
- eslogan vigente: Humanización de las operaciones con inteligencia artificial;
- credibilidad integral del demo;
- secuencia Información operacional -> Conocimiento accionable -> Decisiones verificables -> Acciones concretas -> Evidencias demostrables;
- reutilización de mejoras primero como capacidades de plataforma;
- no abrir múltiples frentes simultáneamente;
- VPS de Hostinger como entorno final de validación comercial.

Este documento conserva decisiones operativas vigentes, tareas futuras y elementos fuera de alcance inmediato. Los principios permanentes no se duplican íntegramente aquí; deben consultarse en `ADR-001`.

## 15. Criterios rectores operativos

- Cerrar primero la Ruta 2 genérica/manual como frente prioritario vigente.
- No iniciar todavía el traslado funcional a la App Pública específica de AMENA.
- Registrar mejoras funcionales que después deban trasladarse a AMENA específica, sin implementarlas ahora.
- Usar provisionalmente `Empresa Demo` como empresa activa y `Proyecto de Empresa Demo` como proyecto activo mientras no exista parametrización multiempresa.
- Usar `AMENA` o `AMENA Comalapa` solo cuando represente el proyecto inmobiliario específico.
- Usar lenguaje de datos simulados local: configurar, auditar, regenerar, cargar datos simulados, carga demo local y carga no persistida.
- No usar "inyectar" cuando se trate solo de estado local o simulación; reservarlo para una operación técnica real verificada.
- Distinguir explícitamente funcionalidades operativas actuales, simulaciones controladas y capacidades futuras.
- Validar en desarrollo local solo como prueba de desarrollo; la validación comercial final corresponde al ecosistema desplegado en VPS de Hostinger.

## 16. Backlog priorizado

### 16.1 Microajustes inmediatos del Centro Demo

| ID | Observación | Objetivo comercial | Repositorio probable | Aplicación | Tipo de cambio | Prioridad | Complejidad | Dependencias | Riesgo | Orden recomendado | Estado propuesto |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CD-01 | Sustituir empresa/proyecto activos por `Empresa Demo` y `Proyecto de Empresa Demo`. | Evitar que el demo parezca atado a AMENA mientras no hay multiempresa. | `AMENA_Comalapa` | Centro Demo | Copy/configuración visible | P0 | Baja | Ninguna técnica | Bajo | 1 | Listo para implementar después |
| CD-02 | Corregir menciones residuales de AMENA en zonas genéricas, especialmente Fase 04. | Mantener neutralidad comercial sin borrar AMENA cuando represente el proyecto inmobiliario específico. | `AMENA_Comalapa` | Centro Demo | Copy/nomenclatura | P0 | Baja | Revisión visual | Medio | 2 | Listo para revisión |
| CD-03 | Preparar nomenclatura oficial: `Suite H - OperIA` y `H - OperIA Inmobiliaria`. | Posicionar la plataforma como suite y el demo inmobiliario como primer componente sectorial. | `AMENA_Comalapa` | Centro Demo / narrativa transversal | Naming/productización | P1 | Media | Confirmar dónde debe aparecer primero | Medio | 3 | Requiere alcance humano |
| CD-04 | Ajustar Fase 04 para describir configurar, auditar, regenerar y cargar datos simulados. | Explicar el valor del Centro Demo como estación de preparación, control y evidencia. | `AMENA_Comalapa` | Centro Demo | Copy funcional | P0 | Baja | Texto rector definido | Bajo | 4 | Listo para implementar después |
| CD-05 | Revisar Fase 05 por posible incoherencia narrativa similar. | Evitar saltos durante la presentación ejecutiva. | `AMENA_Comalapa` | Centro Demo | Copy/narrativa | P1 | Baja | Revisión visual posterior | Bajo | 5 | Listo para análisis puntual |
| CD-06 | Marcar Fase 06 como futura/no operativa. | Evitar prometer funcionalidad que todavía no existe. | `AMENA_Comalapa` | Centro Demo | Estado/copy visual | P0 | Baja | Ninguna | Bajo | 6 | Listo para implementar después |
| CD-07 | Aplicar credibilidad integral a hallazgos: reemplazar expresiones genéricas por casos específicos, trazables y demostrables. | Que el demo se perciba confiable, concreto y accionable. | `AMENA_Comalapa` | Centro Demo / Expediente Vivo | Datos demo + navegación | P0 | Media | Definir casos y expedientes disponibles o ficticios | Medio | 7 | Requiere mapeo de casos |
| CD-08 | Crear evidencias simuladas convincentes cuando haga falta: expedientes, notas, abonos, actividades, seguimientos u otras consecuencias visibles. | Mostrar que la información conduce a acciones verificables dentro del demo. | `AMENA_Comalapa` | Centro Demo / Evidencia Viva | Fixtures/carga demo local no persistida | P1 | Media | Definir escenarios demostrables | Medio | 8 | Requiere confirmación de casos |

### 16.2 Pruebas funcionales entre aplicaciones

| ID | Observación | Objetivo comercial | Repositorio probable | Aplicación | Tipo de cambio | Prioridad | Complejidad | Dependencias | Riesgo | Orden recomendado | Estado propuesto |
|---|---|---|---|---|---|---|---|---|---|---|---|
| QA-01 | Probar acceso a Registro de Seguimiento Comercial en desarrollo local y luego en VPS. | Permitir demostración de operación comercial posterior a reserva. | `AMENA_Comalapa` / entorno desplegado | Registro de Seguimiento Comercial | Prueba funcional local + VPS | P0 | Media | Rutas/URLs y despliegue disponibles | Medio | 9 | Pendiente |
| QA-02 | Probar acceso a Mensajes entre el Equipo en desarrollo local y luego en VPS. | Mostrar coordinación interna como parte de la operación. | `AMENA_Comalapa` / entorno desplegado | Mensajes entre el Equipo | Prueba funcional local + VPS | P0 | Media | Rutas/URLs y despliegue disponibles | Medio | 10 | Pendiente |
| QA-03 | Verificar que datos ingresados en Registro y Mensajes aparezcan reflejados en Fase 03, primero local y luego integrado en VPS. | Comprobar trazabilidad entre aplicaciones y Centro Demo. | `AMENA_Comalapa` / VPS Hostinger | Centro Demo Fase 03 | Prueba integrada | P0 | Alta | QA-01, QA-02, comunicación entre apps, Backend Demo API si aplica | Alto | 11 | Pendiente, no asumir integración |
| QA-04 | Probar los cuatro botones de Voluntarios en desarrollo y después en VPS de Hostinger. | Garantizar que la sesión demo pueda activar accesos y comunicaciones reales. | `AMENA_Comalapa` / VPS Hostinger | Centro Demo / Voluntarios | Prueba funcional + prueba desplegada | P1 | Media | WhatsApp y correo activos, configurados y accesibles desde VPS | Alto | 12 | Pendiente |

### 16.3 Mejoras de Ruta 2 que después deben trasladarse a AMENA específica

| ID | Observación | Objetivo comercial | Repositorio probable | Aplicación | Tipo de cambio | Prioridad | Complejidad | Dependencias | Riesgo | Orden recomendado | Estado propuesto |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R2-01 | Concluir primero verificación visual de Ruta 2 genérica/manual. | Cerrar el demo vendible inmediato sin dispersión. | Repositorio Ruta 2 / ubicación real | App Pública Reservas Ruta 2 | QA visual / estabilización | P0 | Media | No abrir AMENA específica todavía | Alto si se abren dos frentes | 13 | Prioridad funcional vigente |
| R2-02 | Registrar mejoras funcionales recientes de Ruta 2 para traslado posterior a AMENA específica. | No perder avances si se reactiva interés de AMENA. | Ruta 2 + AMENA específica futura | App Pública AMENA específica | Backlog de paridad funcional | P1 | Media | Cerrar Ruta 2 primero | Medio | 14 | Corto plazo, no implementar ahora |
| R2-03 | Separar mejoras funcionales de cambios cosméticos como imágenes/nombres. | Trasladar valor funcional, no personalizaciones accidentales. | Ruta 2 / AMENA específica | Reservas | Clasificación funcional | P1 | Baja | Inventario de cambios recientes | Bajo | 15 | Pendiente de inventario |

### 16.4 Evolución arquitectónica futura

| ID | Observación | Objetivo comercial | Repositorio probable | Aplicación | Tipo de cambio | Prioridad | Complejidad | Dependencias | Riesgo | Orden recomendado | Estado propuesto |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ARQ-01 | Crear mecanismo para parametrizar nuevas empresas/proyectos. | Escalar Centro Demo sin editar código por cliente. | Futuro Motor Multi-Demo / Centro Demo | Centro Demo / Motor Demo | Arquitectura | P2 | Alta | Cerrar demo actual; definir modelo de datos | Alto | 16 | Futuro |
| ARQ-02 | Formalizar la nomenclatura `Suite H - OperIA`. | Construir una arquitectura de producto modular y coherente. | Documentación rectora / arquitectura | Ecosistema H - OperIA | Naming/arquitectura | P2 | Media | Confirmación de alcance documental y visual | Medio | 17 | Futuro |
| ARQ-03 | Definir `H - OperIA Inmobiliaria` como primer componente sectorial. | Convertir el demo inmobiliario en línea de producto dentro de la suite. | Documentación + apps visibles | Centro Demo / apps inmobiliarias | Naming/productización | P2 | Media | ARQ-02 | Medio | 18 | Futuro preparado |
| ARQ-04 | Mantener Fase 06 como futura/no operativa. | Preservar confianza y evitar sobrepromesa. | `AMENA_Comalapa` ahora; arquitectura futura después | Centro Demo | Roadmap/narrativa | P1 | Baja | Ninguna | Bajo | 19 | Señalizar ahora, desarrollar después |
| ARQ-05 | Planificar despliegue final en VPS de Hostinger para todas las apps necesarias de la demo. | Validar la demostración en el entorno comercial real. | Repositorios de apps + VPS | Centro Demo, Reservas, Registro, Mensajes, Backend Demo API | DevOps/despliegue | P1 | Alta | URLs/subdominios, variables, backend, WhatsApp, correo | Alto | 20 | Futuro, no implementar ahora |

## 17. Primer paquete de trabajo cerrado

Primer paquete autorizado para ejecución futura, sin abrir Ruta 2 ni AMENA específica:

- Empresa activa: `Empresa Demo`.
- Proyecto activo: `Proyecto de Empresa Demo`.
- Revisión contextual de menciones genéricas de AMENA.
- Coherencia narrativa de Fase 04.
- Fase 06 claramente futura/no operativa.
- Introducción mínima y contextual de `Suite H - OperIA` y `H - OperIA Inmobiliaria`.

Criterio de cierre del paquete:

> El Centro Demo queda preparado para una demostración comercial consistente, manteniendo explícitamente la separación entre funcionalidades operativas actuales, simulaciones controladas y capacidades futuras.

Fuera de alcance inmediato:

- implementar código;
- conectar Ruta 2;
- modificar AMENA específica;
- ejecutar SQL;
- abrir Supabase;
- iniciar Bloque 6;
- preparar persistencia;
- iniciar despliegue en VPS;
- activar WhatsApp o correo.

## 18. Decisiones humanas pendientes

- Confirmar en qué pantallas debe aparecer `Suite H - OperIA`.
- Confirmar en qué pantallas debe aparecer `H - OperIA Inmobiliaria`.
- Confirmar si AMENA debe conservarse únicamente como proyecto específico o también en algún rótulo histórico.
- Definir personas, empresas, casos, expedientes y evidencias ficticias para credibilidad integral.
- Confirmar qué Expedientes Vivos existen y cuáles deben simularse.
- Confirmar URLs/subdominios esperados en VPS de Hostinger.
- Confirmar variables de entorno necesarias para cada app desplegada.
- Confirmar disponibilidad y rol del Backend Demo API.
- Confirmar motores/servicios de WhatsApp y correo para el entorno desplegado.
- Confirmar cuándo se hará ensayo integral en VPS.
- Confirmar repositorio/ruta de la App Pública específica de AMENA antes de planificar traslado funcional.

## 19. Referencias cruzadas

Principios permanentes:

```text
docs/ADR-001-marco-rector-ecosistema-demostracion.md
```

El presente documento aplica esos principios como backlog operativo vigente del Centro Demo.

La actualización queda vinculada al documento fuente:

```text
Observaciones al centro demo 260714.docx
```

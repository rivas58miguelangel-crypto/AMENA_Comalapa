# DEMO-0001 — Estrategia de Tres Rutas para el Centro Demo

## 1. Contexto

Durante AMENA 73 se consolidaron avances estructurales del Catálogo Comercial Parametrizable:

- `public.project_catalog`
- `public.project_commercial_types`

También se decidió que la Fase 6 directiva / H-OperIA Intelligence causal no debe formar parte del Centro Demo inicial como capacidad interactiva completa, porque requiere evidencia operacional suficiente, SQL/analítica estructurada y RAG.

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
- No prometer H-OperIA Intelligence causal.

### Uso recomendado

Demo rápida de respaldo.

## 4. Ruta 2 — Demo genérico/manual no parametrizable

### Descripción

Crear una versión equivalente a la demo actual, pero sustituyendo manualmente el contenido asociado al proyecto original.

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
- No exigir parametrización todavía.
- No depender todavía de carga real desde Supabase para la presentación inmediata.

### Regla

Esta ruta puede usar contenido generalista o generado para demo, siempre que sea coherente, profesional y no infrinja derechos de terceros.

### Uso recomendado

Demo comercial principal de corto plazo.

## 5. Ruta 3 — Demo productivo/parametrizable real

### Descripción

Evolución futura hacia una versión alimentada desde Supabase y desde la arquitectura del Catálogo Comercial Parametrizable.

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

La Ruta 3 sigue siendo la dirección estratégica productiva.

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

## 13. Dictamen

La estrategia de tres rutas queda adoptada como marco rector del Centro Demo:

- Ruta 1: respaldo inmediato.
- Ruta 2: demo comercial principal de corto plazo.
- Ruta 3: demo productivo/parametrizable real.

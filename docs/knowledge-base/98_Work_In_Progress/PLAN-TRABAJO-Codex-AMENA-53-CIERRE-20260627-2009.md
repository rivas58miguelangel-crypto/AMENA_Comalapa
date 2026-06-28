# Plan de Trabajo  Cierre Codex AMENA 53

**Proyecto:** H-OperIA  Centro Demo  
**Sesión:** Codex AMENA 53  
**Fecha y hora de respaldo:** 2026-06-27 20:09:21  
**Estado Git base:** ece1c1f docs: backup codex amena 53 work plan

## Estado confirmado al cierre

- Equipo: PC
- Repositorio: C:\Amena\Codex\AMENA_Comalapa
- Rama: centro-mando-admin10
- Working tree: limpio
- HEAD == origin/centro-mando-admin10
- Último commit confirmado: ece1c1f

## Decisión arquitectónica crítica

Centro Demo será una aplicación independiente.

No debe quedar acoplado como módulo permanente del Admin productivo.

Mientras siga en este repositorio, cualquier solución debe tratarse como capa temporal de demostración, fácilmente removible o sustituible por una fuente formal futura, principalmente Supabase.

## Causa raíz identificada

Los 7 hallazgos de FASE 05 existen dentro del Centro Demo, pero no aparecen en las páginas Admin destino.

El botón Ver en Admin solo cambia de página.

Las páginas Admin no consumen ni renderizan los hallazgos generados por la corrida demo.

## Prioridad 1  Diagnóstico inicial de mañana

Pasar a Codex la instrucción de diagnóstico sobre:

- materialización visual de hallazgos;
- capa temporal tipo DemoEvidenceBridge / DemoInjectedFindingsBanner / DemoOverlay;
- no acoplar Centro Demo al Admin productivo;
- preparar arquitectura compatible con Supabase futuro.

## Prioridad 2  Materialización de hallazgos en Admin

Cada página destino debe mostrar el hallazgo que FASE 05 promete:

1. Centro Ejecutivo
2. Expediente Vivo
3. Inventario / Construcción
4. Documentos
5. Finanzas / Pagos
6. Servicio Cliente
7. Ventas / Vendedoras

Cada bloque debe marcarse como:

- Evidencia Demo
- Hallazgo Demo
- Fuente
- Motivo de priorización
- Estado de verificación

## Prioridad 3  FASE 04

Pendientes:

- Cambiar "Cantidad configurada" por "Cantidad a generar".
- No mostrar 20 defectuosos antes de generar.
- Mostrar ceros cuando no hay corrida activa.
- Mantener valores sugeridos solo como configuración editable.
- Revisar flujo de reinicio.
- Diferenciar:
  - cantidad a generar;
  - cantidad generada;
  - defectuosos;
  - aprobados;
  - inyectados.

## Prioridad 4  Navegación

Pendientes:

- Navegar a sección exacta dentro de cada página.
- Agregar botón Volver al Centro Demo.
- No depender del botón Atrás del navegador.

## Prioridad 5  Supabase

Pendiente futuro:

- Diseñar tablas reales para:
  - demo runs;
  - hallazgos;
  - evidencias;
  - VAPI logs;
  - verificaciones;
  - materialización en Admin.

Todavía no persistir hasta cerrar contrato de datos.

## Prioridad 6  VAPI

Pendiente futuro:

- Si un hallazgo proviene de Marta Voz / VAPI, debe existir log verificable.
- Enlace futuro a VAPI Logs.
- Evidencia futura también en Supabase.

## Principio rector

La demo no debe limitarse a decir que H-OperIA Intelligence encontró algo.

Debe permitir verificar el circuito completo:

FASE 04 genera, audita, aprueba e inyecta.

FASE 05 interpreta y prioriza.

Admin muestra el hallazgo en la página correspondiente.

Luego VAPI y Supabase permitirán verificar la trazabilidad técnica.

## Instrucción inicial sugerida para Codex AMENA 54

No modificar archivos.

Diagnosticar arquitectura limpia para materializar visualmente los hallazgos de FASE 05 en páginas Admin, usando una capa temporal de demostración que no acople permanentemente Centro Demo al Admin productivo.

Reportar propuesta antes de editar.

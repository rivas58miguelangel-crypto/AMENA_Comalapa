# Narrativa Demo

Este documento registra decisiones narrativas cerradas de la demostración.

## Regla inicial

No reinterpretar fases ya acordadas sin autorización expresa.

## FASE 04 — Centro de Mando y Evidencia de la Operación

Estado: Decisión narrativa cerrada.

Esta fase está compuesta por dos capas claramente diferenciadas.

### CAPA 01 — Preparación e Inyección de Datos Simulados

#### Propósito

Preparar la operación demostrativa que posteriormente será utilizada por H-OperIA Intelligence.

Debe permitir:

- generar datos simulados;
- validar la calidad de los datos;
- regenerarlos cuando no cumplan los criterios;
- configurar la cantidad de registros por categoría;
- ejecutar la inyección de datos.

Las categorías son únicamente:

- Gestión de Reservas.
- Marta.
- Vapi (logs y structured outputs).
- Registro de Seguimiento Comercial.
- Mensajes entre el Equipo.

H-OperIA Intelligence NO genera datos simulados.
Su función comienza en la FASE 05, donde interpreta la información generada por estas aplicaciones.

### CAPA 02 — Estado Consolidado de la Corrida

Debe mostrar el estado posterior a la inyección:

- empresa demo;
- proyecto;
- DemoRunId;
- fuente;
- última actualización;
- cantidades inyectadas por categoría;
- evidencias generadas;
- aplicaciones impactadas;
- trazabilidad;
- estado visible de Supabase como "No verificado" cuando no exista conexión real.

### Restricciones

- No duplicar encabezados de FASE 04.
- Debe existir un único encabezado para toda la fase.
- No simular conexión real con Supabase.
- No convertir esta fase en interpretación comercial.
- La interpretación corresponde exclusivamente a la FASE 05.

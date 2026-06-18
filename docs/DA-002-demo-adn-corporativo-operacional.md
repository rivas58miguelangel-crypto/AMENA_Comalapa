# DA-002 — ADN Corporativo y Operacional del Cliente como capa rectora del Centro Demo

## Estado

Aprobada.

## Contexto

El Centro Demo de H-OperIA será utilizado con diferentes empresas constructoras e inmobiliarias. Aunque pertenezcan a la misma industria, cada cliente puede operar con estructuras distintas: torres, casas, lotes, manzanas, etapas, niveles, modelos, unidades, políticas comerciales, roles internos, documentos, vocabulario, diseño gráfico e identidad corporativa.

Por lo tanto, el Centro Demo no debe generar escenarios genéricos sin comprender previamente la realidad del cliente.

## Decisión

Se crea el concepto de ADN Corporativo y Operacional del Cliente como capa rectora del Centro Demo.

Ninguna simulación, reserva, seguimiento, reporte, mensaje, señal de inteligencia o dashboard debe generarse sin considerar ese ADN.

## Componentes del ADN

1. Identidad corporativa.
2. Identidad del proyecto.
3. Imagen gráfica y branding.
4. Inventario inmobiliario.
5. Estructura comercial.
6. Reglas operacionales.
7. Roles organizacionales.
8. Documentos requeridos.
9. Estados del proceso.
10. Indicadores ejecutivos.
11. Preguntas estratégicas de dirección.
12. Criterios de credibilidad de datos demo.

## Implicación para el Centro Demo

El Centro Demo debe permitir:

- cargar o seleccionar un perfil de empresa demo,
- entender el tipo de inventario del proyecto,
- adaptar el vocabulario visible,
- generar datos simulados creíbles,
- limpiar escenarios previos,
- inyectar nuevos lotes de operaciones,
- reiniciar el demo para otro cliente,
- mantener coherencia visual con la identidad del prospecto.

## Regla crítica

H-OperIA no debe simular perfección.

Debe simular una operación realista con oportunidades, riesgos, retrasos, objeciones, documentos pendientes, conversaciones incompletas y señales ejecutivas razonables.

## Consecuencia técnica

El archivo `src/App.tsx` deberá seccionarse gradualmente en componentes más pequeños, iniciando por los componentes relacionados con el Centro Demo.

La primera zona a modularizar será la gestión de escenarios demo, incluyendo:

- perfil de empresa demo,
- inyección de escenario,
- limpieza de escenario,
- reinicio de demo,
- criterios de generación de datos creíbles.
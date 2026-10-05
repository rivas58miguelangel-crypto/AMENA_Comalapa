# SKILL-0005 - Gestor de Continuidad y Versionado de Trabajo IA

## Estado
Especificacion inicial alineada con KB-0003, OPS-0001 e IME-0001.

## Objetivo
Evitar que el trabajo dependa de la memoria humana o del modelo y reducir la reapertura de decisiones ya resueltas.

## Problema observado
Se han creado planes, transiciones, documentos y reglas correctas, pero el trabajo puede descarrilarse si esos activos no se consultan antes de ejecutar.

## Principio
La continuidad depende de informacion documentada, verificable y trazable. La memoria conversacional sirve como apoyo, no como fuente rectora.

## Secuencia obligatoria antes de intervenir
1. Identificar proyecto y repositorio rector.
2. Verificar estado Git cuando corresponda.
3. Consultar IME.
4. Consultar documento de transicion aplicable.
5. Leer documentos fuente del tema.
6. Identificar ultima version aprobada.
7. Clasificar informacion:
   - vigente;
   - pendiente;
   - obsoleta;
   - propuesta;
   - aprobada.
8. Solo entonces diagnosticar o modificar.

## Regla de versionado de entregables
Cada pieza importante debe tener:
- nombre canonico;
- estado;
- fecha/version;
- ubicacion;
- responsable;
- relacion con version anterior.

## Estados recomendados
- BORRADOR;
- EN REVISION;
- APROBADO;
- FINAL;
- OBSOLETO;
- SUSTITUIDO POR.

## Cierre de paquete
Cada paquete debe terminar con:
- que quedo aprobado;
- que quedo pendiente;
- siguiente paso exacto;
- documentos actualizados;
- commit o estado Git cuando aplique.

## Medida de exito
La siguiente sesion debe poder continuar sin reconstruir manualmente la historia desde el chat completo.

## Relacion con documentos existentes
Esta skill operacionaliza:
- KB-0003 - Continuidad del Conocimiento entre Chats;
- OPS-0001 - PC/Laptop/Git;
- IME-0001 - Indice Maestro de Ejecucion.

No los sustituye.

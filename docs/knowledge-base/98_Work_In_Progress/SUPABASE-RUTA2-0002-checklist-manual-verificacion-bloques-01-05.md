# SUPABASE-RUTA2-0002 - Checklist Manual de Verificacion Bloques 01 a 05

Fecha de creacion documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: checklist manual revisable. No constituye consulta directa a Supabase, SQL ejecutable, migracion, modificacion de datos ni autorizacion para tocar Supabase, Ruta 2 o Reservas tradicional.

## 1. Proposito del documento

Definir un checklist manual seguro para verificar en el panel de Supabase el estado real de los Bloques 01 a 05 antes de tocar codigo de Ruta 2.

Este documento debe permitir registrar hallazgos de forma ordenada sin exponer secretos, sin ejecutar SQL de modificacion y sin confundir documentacion previa con verificacion actual.

## 2. Contexto

Ruta 2 no debe tocarse todavia.

Antes de cualquier implementacion se debe verificar Supabase real:

- existencia de tablas;
- relaciones;
- datos minimos;
- estados;
- permisos o RLS;
- suficiencia para una integracion segura.

La auditoria `SUPABASE-RUTA2-0001-auditoria-preintegracion-bloques-01-05.md` quedo pendiente de verificacion directa porque no habia una via local segura ya configurada para consulta automatica.

No se encontro en Admin una via local segura para consultar Supabase sin exponer secretos:

- no `.env`;
- no `.env.local`;
- no `supabase.toml`;
- no script seguro de lectura ya configurado.

La verificacion debera hacerse manualmente desde el panel de Supabase o mediante un metodo seguro posterior, aprobado de forma explicita.

## 3. Regla de seguridad

Durante esta verificacion:

- no copiar secretos;
- no pegar tokens;
- no compartir claves;
- no exponer `.env`;
- no imprimir credenciales;
- no ejecutar SQL de modificacion;
- no insertar datos;
- no actualizar datos;
- no borrar datos;
- no modificar policies;
- no modificar RLS;
- no crear tablas;
- no crear migraciones;
- usar solo lectura/observacion.

Si una verificacion requiere SQL, debe tratarse como paso posterior y pedir aprobacion humana explicita antes de ejecutarlo.

## 4. Tablas a verificar visualmente en Supabase

Tablas esperadas segun Bloques 01 a 05:

- `organizations`;
- `projects`;
- `project_branding`;
- `project_assets`;
- `project_catalog`;
- `project_commercial_types`;
- `project_inventory`.

El objetivo no es modificar estas tablas. El objetivo es observar si existen, si tienen estructura coherente y si contienen datos minimos utilizables.

## 5. Checklist por tabla

### `organizations`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un registro activo/utilizable.
- [ ] Se observan campos de origen/ambiente/estado cuando aplique.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `projects`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un proyecto activo/utilizable.
- [ ] Hay relacion clara con `organization_id`.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `project_branding`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un branding activo/utilizable.
- [ ] Hay relacion clara con `project_id`.
- [ ] Existen datos minimos de nombre publico, colores, copy o configuracion visual.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `project_assets`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un asset activo/utilizable.
- [ ] Hay relacion clara con `project_id`.
- [ ] Existen assets minimos para experiencia publica o preview.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `project_catalog`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un catalogo activo, validado o utilizable.
- [ ] Hay relacion clara con `project_id`.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `project_commercial_types`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un tipo comercial activo, validado o utilizable.
- [ ] Hay relacion clara con `project_catalog_id`.
- [ ] Hay relacion clara con `project_id` cuando aplique.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

### `project_inventory`

- [ ] Existe la tabla.
- [ ] Tiene columnas esperadas.
- [ ] Tiene datos.
- [ ] Filas aproximadas: `_____`.
- [ ] Hay al menos un registro de inventario activo/utilizable.
- [ ] Hay relacion clara con `project_id`.
- [ ] Hay relacion clara con `project_catalog_id` cuando aplique.
- [ ] Hay estados o flags de visibilidad/seleccion suficientes para Ruta 2.
- [ ] Hay senales de datos demo, legacy o produccion.
- [ ] Observaciones: `_____`.

## 6. Relaciones minimas a verificar

Relaciones a observar manualmente:

- [ ] `organizations` -> `projects`.
- [ ] `projects` -> `project_branding`.
- [ ] `projects` -> `project_assets`.
- [ ] `projects` -> `project_catalog`.
- [ ] `project_catalog` -> `project_commercial_types`.
- [ ] `projects` / `project_catalog` -> `project_inventory`, segun diseno vigente.

Preguntas de control:

- [ ] Los registros pertenecen a un mismo proyecto verificable.
- [ ] Los IDs usados en tablas dependientes existen en tablas padre.
- [ ] No hay registros huerfanos evidentes.
- [ ] No se mezclan datos demo, legacy y produccion sin marca clara.
- [ ] El catalogo, tipos e inventario parecen pertenecer al mismo contexto comercial.

## 7. Datos minimos requeridos para iniciar integracion Ruta 2

Para considerar viable una integracion inicial, deberia existir:

- [ ] una organizacion identificable;
- [ ] un proyecto identificable;
- [ ] branding minimo;
- [ ] assets minimos;
- [ ] catalogo activo o validado;
- [ ] tipos comerciales activos o validados;
- [ ] inventario base utilizable;
- [ ] estado/flags que permitan saber si los datos son demo, produccion, legacy o activos;
- [ ] datos suficientes para no degradar la demo comercial;
- [ ] criterio claro de que datos se usarian para Ruta 2.

Si cualquiera de estos puntos falta, no deberia iniciarse implementacion funcional sin una decision humana posterior.

## 8. RLS / permisos

Verificar solo en modo observacion:

- [ ] Si las tablas tienen RLS habilitado.
- [ ] Si existe una politica segura de lectura publica.
- [ ] Si no existe lectura publica, si parece necesaria una capa intermedia.
- [ ] Si la lectura deberia pasar por Edge Function, API interna o servicio seguro.
- [ ] Si hay riesgo de exponer datos sensibles al consumir desde app publica.

No hacer durante esta verificacion:

- modificar RLS;
- crear policies;
- editar policies;
- desactivar RLS;
- cambiar permisos;
- ejecutar SQL para probar permisos sin aprobacion posterior.

Solo registrar hallazgos.

## 9. Plantilla de captura manual

Usar esta plantilla para cada tabla:

| Tabla | Existe si/no | Filas aproximadas | Datos minimos si/no | Relacion valida si/no | Riesgo | Accion recomendada |
| --- | --- | --- | --- | --- | --- | --- |
| `organizations` |  |  |  |  |  |  |
| `projects` |  |  |  |  |  |  |
| `project_branding` |  |  |  |  |  |  |
| `project_assets` |  |  |  |  |  |  |
| `project_catalog` |  |  |  |  |  |  |
| `project_commercial_types` |  |  |  |  |  |  |
| `project_inventory` |  |  |  |  |  |  |

Notas generales:

```text
Fecha de verificacion manual:
Persona que verifica:
Proyecto Supabase revisado:
Observaciones:
Riesgos:
Decision recomendada:
```

No incluir tokens, claves, URLs privadas ni capturas que expongan secretos.

## 10. Como interpretar resultados

Codigos de interpretacion:

- Verde: la tabla existe, tiene datos minimos y relaciones coherentes.
- Amarillo: la tabla existe, pero faltan datos, estados o relaciones claras.
- Rojo: la tabla no existe o no es usable para Ruta 2.
- Gris: no se pudo verificar.

Lectura recomendada:

- Si todas las tablas criticas estan en verde, puede evaluarse pasar a diseno tecnico de integracion Fase 1.
- Si hay amarillos, conviene preparar correcciones o carga minima revisable antes de tocar Ruta 2.
- Si hay rojos, no debe iniciarse integracion funcional.
- Si hay grises, debe completarse la verificacion antes de decidir.

## 11. Decisiones posibles despues de la verificacion

Despues de completar el checklist manual, las decisiones posibles son:

1. Pasar a diseno tecnico de integracion Fase 1.
2. Crear SQL revisable de poblacion minima.
3. Corregir o ejecutar Bloques pendientes, solo con aprobacion humana posterior.
4. Preparar una auditoria tecnica segura de solo lectura.
5. Mantener Ruta 2 manual mientras se prepara Supabase.
6. Posponer Bloque 6 funcional hasta confirmar Bloques 01 a 05.

Ninguna de estas decisiones se ejecuta por este documento. Todas requieren autorizacion humana posterior.

## 12. Proximo paso recomendado

Revisar este checklist.

Si queda aprobado, commitearlo como documento rector de verificacion manual.

Despues Miguel podra usarlo para revisar manualmente Supabase y traer resultados al chat.

Con esos resultados se decidira si:

- se puede iniciar integracion Ruta 2 Fase 1;
- primero se debe poblar u ordenar Supabase;
- se debe preparar un metodo seguro posterior de verificacion;
- o Ruta 2 debe mantenerse manual mientras Supabase queda listo.

Regla final:

```text
No tocar codigo de Ruta 2 hasta saber si Supabase tiene estructura, datos y permisos suficientes para sostener la integracion.
```

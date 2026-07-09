# SUPABASE-RUTA2-0006 - Protocolo de Ejecucion Controlada Bloques 01 a 05

Fecha de diseno documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es un protocolo documental revisable.

No ejecuta SQL.

No toca Supabase.

No inserta, actualiza ni borra datos.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No modifica codigo.

No crea migraciones ejecutables.

No avanza Bloque 6 funcionalmente.

Su objetivo es preparar una futura ejecucion controlada, humana y segura del SQL revisable documentado en `SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md`, solo si una aprobacion humana posterior autoriza avanzar.

## 1. Proposito del protocolo

Definir el procedimiento documental previo, durante y posterior a una posible ejecucion futura del SQL de poblacion minima demo/generica para Bloques Supabase 01 a 05.

El protocolo busca evitar:

- ejecutar SQL contra una estructura no verificada;
- poblar datos duplicados o incoherentes;
- conectar Ruta 2 contra datos incompletos;
- confundir SQL revisable con SQL ejecutado;
- avanzar Bloque 6 antes de que Bloques 01 a 05 esten poblados, coherentes y validados.

## 2. Alcance exacto

Este protocolo aplica exclusivamente a la futura ejecucion controlada del SQL revisable de poblacion minima definido en:

```text
docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md
```

Tablas incluidas:

- `public.organizations`
- `public.projects`
- `public.project_branding`
- `public.project_assets`
- `public.project_catalog`
- `public.project_commercial_types`
- `public.project_inventory`

Queda fuera de alcance:

- Bloque 6 funcional;
- `project_commercial_type_attributes`;
- integracion de Ruta 2;
- conexion de apps;
- cambios de codigo;
- migraciones ejecutables;
- reservas reales;
- disponibilidad real;
- precios reales productivos;
- datos reales de clientes;
- cambios en Reservas tradicional.

## 3. Estado operativo de partida

Estado certificado al inicio de AMENA 77:

```text
Repositorio: C:\Amena\Codex\AMENA_Comalapa
Rama: centro-mando-admin10
HEAD local: 67f9a35c87046e2fdf8620f54009de653841e682
origin/centro-mando-admin10: 67f9a35c87046e2fdf8620f54009de653841e682
ahead/behind: 0 0
working tree: limpio
ultimo commit: 67f9a35 docs: add transition document for Codex AMENA 76
```

Estado Supabase documentado:

- Las tablas esperadas de Bloques 01 a 05 aparentemente existen.
- La verificacion manual humana previa indico que las tablas revisadas no tenian datos.
- No existe aun autorizacion para ejecutar el SQL de `SUPABASE-RUTA2-0005`.
- No existe aun autorizacion para conectar Ruta 2.

## 4. Prerrequisitos antes de cualquier ejecucion futura

Antes de ejecutar cualquier SQL derivado de `SUPABASE-RUTA2-0005`, deben cumplirse todos estos prerrequisitos:

- autorizacion humana explicita para iniciar verificacion real en Supabase;
- autorizacion humana explicita para ejecutar SQL, separada de la autorizacion de verificacion;
- acceso seguro al panel o mecanismo aprobado de Supabase sin copiar secretos al chat;
- confirmacion de proyecto Supabase correcto;
- respaldo o estrategia de recuperacion definida;
- confirmacion de que la ejecucion sera sobre ambiente autorizado;
- revision humana completa del SQL final a ejecutar;
- plan de rollback o limpieza aprobado;
- criterio de exito y criterio de aborto acordados;
- responsable humano identificado para ejecutar y certificar la evidencia.

## 5. Verificaciones necesarias en Supabase real

Antes de ejecutar, verificar manualmente o mediante metodo seguro aprobado:

### 5.1 Existencia de tablas

- [ ] `public.organizations`
- [ ] `public.projects`
- [ ] `public.project_branding`
- [ ] `public.project_assets`
- [ ] `public.project_catalog`
- [ ] `public.project_commercial_types`
- [ ] `public.project_inventory`

### 5.2 Columnas y tipos

Confirmar columnas exactas, tipos de dato, nullable/defaults y restricciones de:

- [ ] `organizations`
- [ ] `projects`
- [ ] `project_branding`
- [ ] `project_assets`
- [ ] `project_catalog`
- [ ] `project_commercial_types`
- [ ] `project_inventory`

### 5.3 Constraints y valores permitidos

Confirmar:

- [ ] `data_origin` permite `fase_04_demo`.
- [ ] `operational_environment` permite `demo`.
- [ ] `legacy_status` permite `none`.
- [ ] `public_visibility` permite `preview`.
- [ ] estados `validated`, `active`, `reference_only`, `not_applicable` son compatibles donde correspondan.
- [ ] constraints unique usados por el SQL existen o se ajusta la estrategia de idempotencia.

### 5.4 Foreign keys y relaciones

Confirmar:

- [ ] `projects.organization_id -> organizations.id`.
- [ ] `project_branding.project_id -> projects.id`.
- [ ] `project_assets.project_id -> projects.id`.
- [ ] `project_catalog.project_id -> projects.id`.
- [ ] `project_commercial_types(project_id, project_catalog_id) -> project_catalog(project_id, id)`.
- [ ] `project_inventory(project_id, project_catalog_id) -> project_catalog(project_id, id)`, si esa FK existe y esta vigente.

### 5.5 RLS / policies / permisos

Confirmar:

- [ ] si RLS esta activo en cada tabla;
- [ ] si existen policies;
- [ ] si la ejecucion requiere rol especifico;
- [ ] si la lectura futura por Ruta 2 requeriria una capa segura;
- [ ] que este protocolo no autoriza modificar RLS ni policies.

## 6. Validaciones previas

Antes de ejecutar:

1. Comparar `SUPABASE-RUTA2-0005` contra la estructura real.
2. Ajustar el SQL revisable si hay diferencias de columnas, constraints o relaciones.
3. Verificar que el dataset demo no usa datos reales.
4. Verificar que no se usa identidad de AMENA original como cliente.
5. Confirmar que no hay precios reales ni disponibilidad real.
6. Confirmar que no se crean reservas.
7. Confirmar que no se toca Ruta 2 ni Reservas tradicional.
8. Confirmar que el SQL es idempotente o que existe un plan claro ante duplicados.
9. Confirmar que el rollback documental esta definido.
10. Registrar evidencia previa.

## 7. Evidencia previa requerida

Antes de ejecutar, capturar evidencia de:

- tablas existentes;
- conteo de filas por tabla;
- estructura visible de columnas;
- constraints o relaciones verificadas;
- estado de RLS/policies, sin exponer secretos;
- aprobacion humana para ejecucion;
- version exacta del SQL que se ejecutaria;
- fecha, hora y responsable humano.

La evidencia no debe incluir:

- service role keys;
- anon keys;
- tokens;
- credenciales;
- URLs sensibles si no estan aprobadas para documentacion;
- capturas con secretos visibles.

## 8. Criterios de exito

Una ejecucion futura solo puede considerarse exitosa si:

- el SQL aprobado se ejecuta sin errores;
- las siete tablas quedan con datos demo minimos esperados;
- los registros quedan marcados como `fase_04_demo`, `demo` y `none` donde corresponda;
- no se insertan datos reales de clientes;
- no se crean reservas reales;
- no se crean precios reales ni disponibilidad real;
- no se modifica codigo;
- no se modifica Ruta 2;
- no se modifica Reservas tradicional;
- se captura evidencia posterior;
- se documenta el resultado en un nuevo documento de resultado/verificacion.

## 9. Criterios de aborto

Abortar antes de ejecutar si ocurre cualquiera de estas condiciones:

- no se confirma el proyecto Supabase correcto;
- alguna tabla esperada no existe;
- columnas reales no coinciden con el SQL revisable;
- constraints o FKs no coinciden;
- RLS/policies generan incertidumbre no resuelta;
- ya existen datos y no hay criterio claro para evitar duplicados;
- el SQL requiere cambios no revisados;
- se detectan datos reales de clientes en el dataset propuesto;
- no existe plan de rollback/limpieza;
- falta aprobacion humana explicita;
- existe duda sobre ambiente demo vs produccion;
- se intenta usar este protocolo para conectar Ruta 2 o avanzar Bloque 6.

Abortar despues de iniciar si:

- aparece un error SQL;
- se inserta parcialmente sin control;
- los conteos posteriores no coinciden con lo esperado;
- se detecta duplicidad;
- se detecta afectacion a datos no demo;
- el responsable humano pierde certeza sobre el alcance.

## 10. Validaciones posteriores

Si en el futuro se ejecuta el SQL con autorizacion humana, validar despues:

- conteo de filas por tabla;
- existencia de organizacion demo;
- existencia de proyecto demo vinculado a organizacion demo;
- existencia de branding demo vinculado al proyecto;
- existencia de asset placeholder demo;
- existencia de catalogo demo vinculado al proyecto;
- existencia de tipos comerciales demo vinculados al catalogo;
- existencia de inventario demo vinculado al proyecto y catalogo;
- ausencia de precios reales;
- ausencia de disponibilidad real;
- ausencia de reservas;
- que Ruta 2 no fue modificada;
- que Reservas tradicional no fue modificada;
- que Bloque 6 no fue avanzado funcionalmente.

## 11. Plan de rollback documental

Antes de ejecutar debe existir una estrategia documentada para revertir o limpiar la poblacion demo si fuera necesario.

El plan de rollback debe definir:

- que registros fueron creados;
- como identificarlos por `data_origin`, `operational_environment`, codigos, nombres y metadata;
- orden seguro de limpieza respetando dependencias;
- responsable humano;
- evidencia previa a la limpieza;
- evidencia posterior a la limpieza;
- aprobacion humana separada para ejecutar cualquier limpieza.

Orden conceptual de limpieza, si se aprobara en el futuro:

```text
project_inventory
-> project_commercial_types
-> project_catalog
-> project_assets
-> project_branding
-> projects
-> organizations
```

Este orden es conceptual. No constituye SQL de rollback ni autorizacion para borrar datos.

## 12. Checklist humano de autorizacion

Antes de ejecutar, el humano responsable debe confirmar:

- [ ] Lei `SUPABASE-RUTA2-0005`.
- [ ] Lei este protocolo `SUPABASE-RUTA2-0006`.
- [ ] Verifique el proyecto Supabase correcto.
- [ ] Verifique tablas.
- [ ] Verifique columnas.
- [ ] Verifique constraints.
- [ ] Verifique foreign keys.
- [ ] Verifique RLS/policies.
- [ ] Confirme que no hay secretos expuestos.
- [ ] Confirme que no hay datos reales de clientes.
- [ ] Confirme que no hay precios reales.
- [ ] Confirme que no hay disponibilidad real.
- [ ] Confirme que no hay reservas reales.
- [ ] Confirme plan de rollback/limpieza.
- [ ] Autorizo explicitamente la ejecucion controlada.
- [ ] Entiendo que ejecutar SQL no significa que Ruta 2 ya consuma estos datos.

## 13. Evidencia posterior requerida

Despues de una ejecucion futura autorizada, capturar:

- resultado de ejecucion;
- conteo de filas por tabla;
- registros creados o reutilizados;
- validacion de relaciones;
- validacion de datos demo;
- ausencia de datos reales;
- ausencia de cambios en Ruta 2;
- ausencia de cambios en Reservas tradicional;
- confirmacion de que Bloque 6 no fue aplicado;
- decision sobre si procede disenar una fase posterior de integracion Ruta 2.

## 14. Relacion con SUPABASE-RUTA2-0005

`SUPABASE-RUTA2-0005` contiene SQL revisable.

Este documento define el protocolo de seguridad y control para una posible ejecucion futura.

La relacion correcta es:

```text
SUPABASE-RUTA2-0005
-> SQL revisable de poblacion minima

SUPABASE-RUTA2-0006
-> protocolo documental para revisar, autorizar, ejecutar y evidenciar una posible ejecucion futura
```

Ninguno de los dos documentos ejecuta SQL por si mismo.

Ninguno de los dos documentos autoriza conectar Ruta 2.

## 15. Por que Bloque 6 sigue pospuesto

Bloque 6 define atributos configurables por tipo comercial.

Sigue pospuesto funcionalmente porque:

- Ruta 2 todavia no consume Bloques 01 a 05;
- las tablas de Bloques 01 a 05 requieren poblacion minima coherente;
- la poblacion minima todavia no ha sido ejecutada;
- aun falta validar estructura real, datos y permisos;
- no existe consumo funcional en codigo;
- aplicar atributos antes de catalogo, tipos e inventario poblados generaria una arquitectura desconectada.

Regla vigente:

```text
Primero Bloques 01 a 05 poblados y coherentes.
Despues evaluacion de integracion Ruta 2.
Solo despues retomar Bloque 6 funcionalmente.
```

## 16. Confirmacion final

Este documento no ejecuta nada.

No se toco Supabase.

No se ejecuto SQL.

No se insertaron, actualizaron ni borraron datos.

No se modifico Ruta 2.

No se modifico Reservas tradicional.

No se modifico codigo.

No se creo migracion ejecutable.

No se avanzo Bloque 6 funcionalmente.

El siguiente paso recomendado es revisar humanamente este protocolo antes de usarlo como base para cualquier autorizacion futura de verificacion o ejecucion controlada.

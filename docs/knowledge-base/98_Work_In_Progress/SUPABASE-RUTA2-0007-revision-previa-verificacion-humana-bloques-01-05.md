# SUPABASE-RUTA2-0007 - Revision Previa a Verificacion Humana Bloques 01 a 05

Fecha de revision documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es una revision documental previa a verificacion humana.

No toca Supabase.

No ejecuta SQL.

No inserta, actualiza ni borra datos.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No crea migraciones ejecutables.

No avanza Bloque 6 funcionalmente.

Su objetivo es confirmar si los documentos `SUPABASE-RUTA2-0005` y `SUPABASE-RUTA2-0006` son suficientes, claros y seguros para que Miguel pueda realizar una futura verificacion humana en Supabase antes de considerar cualquier ejecucion controlada.

## 1. Proposito del documento

Establecer una revision final documental antes de que una persona autorizada revise manualmente Supabase real para Bloques 01 a 05.

Este documento no aprueba ejecucion SQL. Solo prepara el criterio de lectura humana.

## 2. Documentos base revisados

Documentos base:

- `SUPABASE-RUTA2-0005-sql-revisable-poblacion-minima-bloques-01-05.sql.md`
- `SUPABASE-RUTA2-0006-protocolo-ejecucion-controlada-bloques-01-05.md`
- `SUPABASE-RUTA2-0004-diseno-poblacion-minima-bloques-01-05.md`
- `SUPABASE-RUTA2-0003-resultado-verificacion-manual-tablas-vacias.md`
- `SUPABASE-RUTA2-0002-checklist-manual-verificacion-bloques-01-05.md`
- `SUPABASE-RUTA2-0001-auditoria-preintegracion-bloques-01-05.md`

Documentos de contexto operativo:

- `RUTA2-SUPABASE-0003-plan-implementacion-faseada.md`
- `RUTA2-SUPABASE-0002-mapa-conversion-funcional.md`
- `RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md`
- `RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md`
- `RUTA2-PRODUCCION-0001-genesis-version-productiva.md`
- `TRANSICION-Codex-AMENA-76-A-77-20260709.md`

## 3. Que ya esta listo documentalmente

Ya esta listo documentalmente:

1. La brecha entre Ruta 2 y Bloques Supabase 01 a 05.
2. La confirmacion documental de que Ruta 2 sigue como demo manual/generica.
3. La confirmacion documental de que Reservas tradicional tampoco consume funcionalmente Bloques 01 a 05.
4. La evidencia humana previa de que las tablas esperadas parecian existir, pero estaban vacias.
5. El diseno conceptual de poblacion minima demo/generica.
6. El SQL revisable de poblacion minima en `SUPABASE-RUTA2-0005`.
7. El protocolo documental de ejecucion controlada en `SUPABASE-RUTA2-0006`.
8. La separacion entre SQL revisable, SQL ejecutado y consumo funcional por la app.
9. La regla de que Bloque 6 queda pospuesto hasta que Bloques 01 a 05 esten poblados, coherentes y funcionalmente integrables.

Lectura operativa:

```text
Diseno documental: listo.
SQL revisable: listo.
Protocolo de control: listo.
Verificacion real Supabase actualizada: pendiente.
Ejecucion SQL: no autorizada.
Integracion Ruta 2: no autorizada.
Bloque 6 funcional: pospuesto.
```

## 4. Que no esta verificado todavia en Supabase real

Todavia no esta verificado en Supabase real:

- estructura exacta actual de cada tabla;
- columnas reales vigentes;
- tipos de dato reales;
- nullable/defaults reales;
- constraints vigentes;
- unique constraints vigentes;
- foreign keys vigentes;
- estado real de RLS;
- policies existentes;
- permisos requeridos para insertar;
- existencia real de `project_inventory_project_catalog_fk`;
- existencia real de `project_commercial_types_catalog_fk`;
- disponibilidad de `gen_random_uuid()`;
- si los valores propuestos por el SQL siguen permitidos;
- si ya existen filas agregadas despues de la verificacion humana anterior;
- si hay datos demo, legacy o production que puedan generar duplicados;
- si el ambiente correcto de ejecucion esta claramente identificado.

Esta falta de verificacion no invalida `SUPABASE-RUTA2-0005` ni `SUPABASE-RUTA2-0006`. Significa que no deben ejecutarse hasta completar verificacion humana y aprobacion posterior.

## 5. Que debe revisar Miguel manualmente en Supabase

Miguel debe revisar manualmente, sin copiar secretos y sin ejecutar cambios:

### 5.1 Tablas

- [ ] `organizations`
- [ ] `projects`
- [ ] `project_branding`
- [ ] `project_assets`
- [ ] `project_catalog`
- [ ] `project_commercial_types`
- [ ] `project_inventory`

### 5.2 Datos existentes

Por cada tabla:

- [ ] existe si/no;
- [ ] cantidad aproximada de filas;
- [ ] si hay filas demo;
- [ ] si hay filas production;
- [ ] si hay filas legacy;
- [ ] si hay datos que parezcan reales de clientes;
- [ ] si hay datos que puedan duplicar la propuesta `RUTA2-DEMO` / `ruta2-demo`.

### 5.3 Estructura

Por cada tabla:

- [ ] columnas visibles;
- [ ] columnas obligatorias;
- [ ] valores default;
- [ ] tipos de datos;
- [ ] campos JSON;
- [ ] campos de estado;
- [ ] campos de ambiente/origen.

### 5.4 Relaciones y permisos

Revisar, si el panel lo permite:

- [ ] relaciones `organizations -> projects`;
- [ ] relaciones `projects -> project_branding`;
- [ ] relaciones `projects -> project_assets`;
- [ ] relaciones `projects -> project_catalog`;
- [ ] relaciones `project_catalog -> project_commercial_types`;
- [ ] relaciones `project_catalog -> project_inventory`, si existen;
- [ ] RLS activo/inactivo;
- [ ] policies visibles;
- [ ] notas de permisos relevantes.

## 6. Evidencia que debe capturarse

La evidencia debe ser suficiente para decidir si el SQL revisable puede mantenerse, ajustarse o descartarse antes de una futura ejecucion.

Evidencia recomendada:

- captura o registro textual de lista de tablas;
- conteo aproximado de filas por tabla;
- captura o transcripcion de columnas por tabla;
- captura o transcripcion de constraints/FKs si el panel lo muestra;
- captura o transcripcion del estado RLS/policies;
- observacion humana sobre si hay datos previos;
- observacion humana sobre si hay datos sensibles o reales;
- fecha y hora de verificacion;
- nombre de quien verifica;
- conclusion humana: verde, amarillo o rojo.

No capturar ni compartir:

- service role keys;
- anon keys;
- tokens;
- contrasenas;
- URLs sensibles si no estan aprobadas;
- variables de entorno;
- capturas que muestren secretos.

## 7. Preguntas abiertas

Preguntas que siguen abiertas:

1. Las tablas existen actualmente con las mismas columnas documentadas?
2. Las tablas siguen vacias o ya tienen datos?
3. Existen constraints unique suficientes para la estrategia `on conflict` propuesta?
4. Existen las FKs compuestas previstas por Bloques 04 y 05?
5. `project_inventory.project_catalog_id` esta relacionado fisicamente con `project_catalog` en Supabase real?
6. RLS esta activo o inactivo?
7. Las policies actuales permiten insercion controlada?
8. El SQL debe ejecutarse en una sola transaccion?
9. Hace falta ajustar datos demo para evitar duplicados?
10. Hace falta separar aun mas el dataset demo de cualquier ambiente productivo?
11. El panel de Supabase permite capturar evidencia suficiente sin exponer secretos?

## 8. Riesgos vivos

Riesgos que siguen vivos:

- ejecutar SQL contra columnas diferentes;
- duplicar datos demo;
- insertar datos en ambiente equivocado;
- confundir tabla existente con tabla lista;
- confundir SQL ejecutado con consumo funcional por Ruta 2;
- asumir permisos/RLS sin verificarlos;
- usar metadata auxiliar como fuente permanente;
- avanzar Bloque 6 sin Bloques 01 a 05 poblados;
- conectar Ruta 2 contra datos incompletos;
- romper la demo manual por adelantar integracion;
- documentar evidencia con secretos visibles;
- no tener rollback documental.

## 9. Condiciones minimas antes de ejecutar cualquier SQL

Antes de ejecutar cualquier SQL deben cumplirse todas estas condiciones:

1. Verificacion humana Supabase completada.
2. Evidencia capturada sin secretos.
3. Estructura real contrastada contra `SUPABASE-RUTA2-0005`.
4. Diferencias documentadas.
5. SQL ajustado si fuera necesario.
6. Protocolo `SUPABASE-RUTA2-0006` revisado y aceptado.
7. Rollback/limpieza definido.
8. Proyecto Supabase correcto confirmado.
9. Dataset demo confirmado como no sensible y no real.
10. Aprobacion humana explicita para ejecucion.

Sin estas condiciones, el SQL debe permanecer como documento revisable.

## 10. Que no debe hacerse todavia

No debe hacerse todavia:

- tocar Supabase;
- ejecutar SQL;
- insertar datos;
- actualizar datos;
- borrar datos;
- modificar RLS;
- modificar policies;
- modificar Ruta 2;
- modificar Reservas tradicional;
- modificar codigo;
- crear migraciones ejecutables;
- conectar Ruta 2;
- sustituir `src/constants.ts`;
- sustituir `src/services/inventoryService.ts`;
- avanzar Bloque 6 funcionalmente;
- crear atributos configurables funcionales;
- tratar el dataset demo como productivo.

## 11. Por que Ruta 2 sigue desconectada

Ruta 2 sigue desconectada porque:

- hoy funciona como demo manual/generica;
- no consume funcionalmente `project_catalog`;
- no consume funcionalmente `project_commercial_types`;
- no consume funcionalmente `project_inventory`;
- no consume funcionalmente `organizations`, `projects`, `project_branding` ni `project_assets`;
- sus datos comerciales visibles siguen viniendo de recursos locales/manuales/mock;
- las tablas esperadas de Supabase necesitan verificacion actualizada y poblacion minima coherente;
- conectar ahora podria romper la demo o dejarla sin datos suficientes.

Regla vigente:

```text
Ruta 2 no debe conectarse hasta que Bloques 01 a 05 esten verificados, poblados, coherentes y aprobados para consumo funcional futuro.
```

## 12. Por que Bloque 6 sigue pospuesto

Bloque 6 sigue pospuesto porque:

- depende de tipos comerciales gobernados;
- los tipos comerciales aun no estan confirmados como poblados en Supabase real;
- Ruta 2 aun no consume Bloques 01 a 05;
- no hay integracion funcional base sobre la cual aplicar atributos;
- activar atributos antes de catalogo, tipos e inventario generaria una capa desconectada;
- Bloque 6 no debe convertirse en metadata libre ni sustituir modelos futuros.

Secuencia vigente:

```text
Verificar Supabase real
-> poblar minimo Bloques 01 a 05, si se autoriza
-> validar coherencia
-> decidir integracion Ruta 2
-> solo despues retomar Bloque 6 funcionalmente
```

## 13. Conclusion

`SUPABASE-RUTA2-0005` y `SUPABASE-RUTA2-0006` son suficientes como base documental para una futura verificacion humana en Supabase.

No son suficientes para ejecutar SQL todavia.

El siguiente paso correcto es que Miguel realice la verificacion humana en Supabase real siguiendo este documento y el protocolo `SUPABASE-RUTA2-0006`, sin ejecutar cambios y sin exponer secretos.

La decision posterior debe ser una de estas:

1. mantener SQL como esta;
2. ajustar SQL por diferencias reales de estructura;
3. detener ejecucion por riesgo;
4. preparar autorizacion humana especifica de ejecucion controlada.

## 14. Confirmacion final

Este documento no ejecuta nada.

No se toco Supabase.

No se ejecuto SQL.

No se modifico codigo.

No se modifico Ruta 2.

No se modifico Reservas tradicional.

No se creo migracion ejecutable.

No se avanzo Bloque 6 funcionalmente.

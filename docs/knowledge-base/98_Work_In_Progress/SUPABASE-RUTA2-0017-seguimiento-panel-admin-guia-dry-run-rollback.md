# SUPABASE-RUTA2-0017 - Seguimiento Panel Admin Guia Dry-Run con Rollback

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## 1. Proposito

Registrar formalmente que `SUPABASE-RUTA2-0016` no debe quedar como un documento oculto o enterrado dentro de la KB.

La guia operativa humana de dry-run con `ROLLBACK` obligatorio debe convertirse, en una fase posterior autorizada, en un pendiente formal de producto/UI dentro del Centro de Mando/Admin.

El objetivo es asegurar que un operador interno autorizado reciba instrucciones claras y visibles cuando exista riesgo operacional.

Este documento no implementa UI.

Este documento no autoriza ejecucion SQL.

Este documento no toca Supabase.

## 2. Documento Fuente

Documento fuente:

`docs/knowledge-base/98_Work_In_Progress/SUPABASE-RUTA2-0016-guia-operativa-humana-dry-run-rollback-obligatorio.md`

`SUPABASE-RUTA2-0016` ya esta versionado, commiteado y publicado como guia operativa humana.

La advertencia de Miguel queda incorporada como principio operativo:

Una guia guardada solo en documentacion puede convertirse en un tesoro escondido si ningun operador autorizado puede verla cuando la necesita.

## 3. Publico Objetivo Futuro

La futura experiencia visible debe estar orientada a:

- Miguel / dueno del demo;
- administrador tecnico;
- operador autorizado del Centro de Mando;
- futuro rol interno de gestion de datos demo.

Este publico requiere instrucciones claras, visibles y accionables antes de cualquier prueba dry-run.

## 4. Publico No Objetivo

La futura experiencia no debe estar orientada a:

- usuario final publico de App Reservas;
- prospecto o cliente externo;
- vendedora sin rol tecnico autorizado;
- cualquier usuario sin permiso de gestion Supabase/demo data;
- visitantes de Ruta 2;
- operadores sin responsabilidad tecnica sobre datos demo.

La guia no debe exponerse en la App Publica de Reservas.

La guia no debe exponerse a clientes o prospectos finales.

## 5. Experiencia Futura Deseada en Centro de Mando

Se propone crear, en fase posterior autorizada, un panel admin-only llamado:

`Guia Segura Dry-Run Supabase Ruta 2`

El panel deberia incluir:

- semaforo de estado;
- checklist antes de prechecks;
- seccion para mostrar prechecks;
- advertencia visible: `No COMMIT`;
- advertencia visible: `ROLLBACK obligatorio`;
- bloque de emergencia: `Si Supabase se detiene antes del ROLLBACK final`;
- instrucciones de reporte;
- recordatorio de capturar error;
- instruccion de detener prueba ante duda;
- instruccion de informar a Miguel/admin tecnico.

El panel debe evitar que un operador confunda:

- dry-run con ejecucion persistente;
- poblacion minima con integracion de Ruta 2;
- prueba con autorizacion de `COMMIT`;
- tabla poblada con consumo funcional por la app.

## 6. Vivencia del Operador Ante Riesgo

La experiencia futura debe explicar de forma humana que hacer ante cada riesgo.

### Si Hay Duplicados

El operador deberia ver una advertencia clara:

`Se detectaron duplicados. Detener prueba. No ejecutar COMMIT. No modificar datos. Capturar evidencia e informar al responsable autorizado.`

Respuesta esperada:

- detenerse;
- no hacer `COMMIT`;
- no hacer `UPDATE`;
- no hacer `DELETE`;
- no hacer `INSERT`;
- no hacer `ALTER`;
- capturar evidencia;
- informar al responsable autorizado.

### Si Existe Conflicto con Hero Image Primario

El operador deberia ver una advertencia clara:

`Ya existe un hero_image primario para el proyecto demo. No insertar otro asset primario. Detener y escalar decision.`

Respuesta esperada:

- detenerse;
- no reemplazar asset;
- no borrar asset;
- no insertar otro asset primario;
- no improvisar cambios;
- capturar evidencia;
- informar a Miguel/admin tecnico.

### Si Supabase Muestra Error SQL

El operador deberia ver una instruccion clara:

`Error SQL detectado. No corregir manualmente. Ejecutar ROLLBACK si la transaccion sigue abierta. Capturar evidencia y detener prueba.`

Respuesta esperada:

- no hacer `COMMIT`;
- no ejecutar comandos adicionales de escritura;
- ejecutar `ROLLBACK` manual si aplica;
- capturar evidencia;
- detener prueba;
- volver a analisis documental.

### Si el Script No Llega al ROLLBACK Final

El operador deberia ver una instruccion de emergencia:

`El script no llego al ROLLBACK final. Ejecutar ROLLBACK manual antes de cualquier otra accion.`

Respuesta esperada:

- ejecutar `ROLLBACK` manual si la transaccion sigue abierta;
- no hacer `COMMIT`;
- no intentar reparar datos;
- capturar evidencia;
- informar al responsable autorizado.

### Si Hay Duda Humana

El operador deberia ver una regla simple:

`Ante duda humana, detenerse. No persistir. No improvisar.`

Respuesta esperada:

- detenerse;
- no hacer `COMMIT`;
- no ejecutar escrituras;
- capturar evidencia si corresponde;
- consultar a Miguel/admin tecnico.

## 7. Garantia Actual

`SUPABASE-RUTA2-0016` esta versionado, commiteado y publicado.

Eso reduce el riesgo de olvido porque la guia ya existe dentro del repositorio rector.

Sin embargo, esta garantia no equivale a UI implementada.

La garantia razonable aumenta con este documento `SUPABASE-RUTA2-0017`, porque deja un seguimiento especifico para convertir la guia en experiencia visible.

## 8. Garantia Pendiente

La garantia fuerte solo existira cuando se implemente un panel visible dentro del Centro de Mando/Admin.

Ese panel debera ser interno, admin-only o restringido a operadores autorizados.

Este documento debe usarse como requisito futuro de implementacion.

Hasta que exista ese panel, la guia sigue dependiendo de lectura documental humana.

## 9. Decisiones Vigentes

No implementar UI todavia.

No ejecutar SQL.

No tocar Supabase.

No insertar datos.

No actualizar datos.

No borrar datos.

No crear migraciones.

No crear archivo `.sql` ejecutable.

No autorizar `COMMIT`.

No exponer esta guia al usuario final publico.

Ruta 2 sigue desconectada.

Bloque 6 sigue pospuesto.

Dry-run exitoso no equivale a autorizacion de `COMMIT`.

Poblar datos no equivale a integrar.

Tabla poblada no equivale a consumo funcional.

## 10. Acciones Explicitamente No Realizadas

Durante la creacion de este documento:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos.
- No se actualizaron datos.
- No se borraron datos.
- No se modifico codigo.
- No se implemento UI.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se modifico la App Publica de Reservas.
- No se creo migracion.
- No se creo archivo `.sql`.
- No se crearon constraints nuevos.
- No se avanzo Bloque 6 funcionalmente.
- No se expuso esta guia al usuario final publico.

## 11. Proximo Paso Futuro Recomendado

Cuando Miguel autorice trabajo de UI/Admin, crear un componente o panel dentro del Centro de Mando basado en:

- `SUPABASE-RUTA2-0016-guia-operativa-humana-dry-run-rollback-obligatorio.md`;
- `SUPABASE-RUTA2-0017-seguimiento-panel-admin-guia-dry-run-rollback.md`.

Antes de implementar, se debe verificar:

- repositorio correcto;
- aplicacion correcta;
- rama correcta;
- ubicacion funcional correcta dentro del Admin/Centro de Mando;
- permisos del rol interno/autorizado;
- que la experiencia no se exponga en la App Publica de Reservas;
- que no se confunda guia de dry-run con autorizacion para ejecutar `COMMIT`.

El siguiente paso inmediato sigue siendo documental o de revision humana, no implementacion automatica.

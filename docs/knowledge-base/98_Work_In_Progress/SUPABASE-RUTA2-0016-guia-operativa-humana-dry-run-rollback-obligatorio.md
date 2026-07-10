# SUPABASE-RUTA2-0016 - Guia Operativa Humana Dry-Run con Rollback Obligatorio

Fecha de diseno documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia Principal

Este documento es una guia operativa futura.

No ejecutar todavia.

No autoriza `COMMIT`.

No autoriza persistencia de datos.

No conecta Ruta 2.

No modifica Ruta 2.

No modifica Reservas tradicional.

No modifica codigo.

No toca Supabase.

No ejecuta SQL.

No avanza Bloque 6 funcionalmente.

No crea migraciones ejecutables.

No crea archivo `.sql` ejecutable.

No crea constraints nuevos.

Esta guia no esta dirigida al usuario final publico de la App de Reservas.

Esta guia esta dirigida a usuarios internos o autorizados del sistema.

## 1. Proposito

Crear una guia practica, clara y segura para que un usuario interno/autorizado pueda realizar en el futuro una prueba dry-run en Supabase, sin persistir datos, sin `COMMIT` y con `ROLLBACK` obligatorio.

La guia se basa en `SUPABASE-RUTA2-0015`, pero no sustituye una autorizacion humana posterior.

El objetivo es reducir riesgo operativo antes de cualquier prueba futura de poblacion minima demo/generica para Bloques Supabase 01 a 05.

## 2. Publico Objetivo

Esta guia esta pensada para:

- Miguel / dueno del demo;
- administrador tecnico;
- operador autorizado del Centro de Mando;
- futuro rol interno de gestion de datos demo.

No esta pensada para:

- usuario final publico de la App de Reservas;
- cliente o prospecto final;
- visitante de Ruta 2;
- operador sin autorizacion tecnica;
- cualquier persona que no entienda la diferencia entre dry-run, `ROLLBACK`, `COMMIT` y persistencia de datos.

## 3. Advertencia Sobre Visibilidad

Una guia operativa guardada solo en una carpeta documental puede convertirse en un tesoro escondido si ningun usuario autorizado del sistema puede verla cuando la necesita.

Por esa razon, este documento deja establecido que en una fase posterior esta guia debe convertirse en una experiencia visible dentro del Centro de Mando/Admin.

Esa experiencia futura podria tomar la forma de:

- panel de seguridad operacional;
- checklist guiado antes de dry-run;
- pantalla de prechecks;
- advertencias visibles de `ROLLBACK`;
- bloqueo explicito de `COMMIT`;
- guia de emergencia si Supabase se detiene antes del `ROLLBACK` final.

Esta capacidad futura debe ser admin-only o interna/autorizada.

No debe exponerse en la App Publica de Reservas.

No debe exponerse a clientes o prospectos finales.

## 4. Relacion con Documentos Previos

### SUPABASE-RUTA2-0015

Contiene el paquete dry-run ajustado con `ROLLBACK` obligatorio, validaciones especificas del dataset Ruta 2 y regla humana de emergencia.

Esta guia explica como deberia operarse humanamente ese paquete en una fase futura autorizada.

### SUPABASE-RUTA2-0014

Registra el dictamen tecnico que exigio corregir dos puntos antes de cualquier dry-run:

- validaciones posteriores demasiado amplias;
- falta de regla explicita de emergencia para `ROLLBACK` manual.

### SUPABASE-RUTA2-0011

Registra riesgos preventivos del seed:

- posible falta de unique constraint visible sobre `organizations.short_name`;
- posible falta de unique constraint visible sobre `projects.code`;
- riesgo de conflicto con `project_assets` por `hero_image` primario.

Esta guia conserva esos riesgos como senales de aborto.

## 5. Condiciones Antes de Iniciar

Antes de cualquier intento futuro, confirmar:

- PowerShell verificado;
- repositorio limpio;
- rama `centro-mando-admin10`;
- `HEAD == origin/centro-mando-admin10`;
- proyecto Supabase correcto: `amena-demo-03`;
- schema correcto: `public`;
- sin secretos visibles;
- sin tokens visibles;
- sin claves copiadas o impresas;
- operador descansado;
- operador con tiempo suficiente;
- no hacerlo con prisa;
- no hacerlo durante una llamada comercial;
- no hacerlo si hay duda sobre el alcance.

Si cualquiera de estas condiciones falla, no iniciar.

## 6. Procedimiento Humano Recomendado

### Fase A - Preparacion

1. Abrir Supabase manualmente.
2. Confirmar que el proyecto visible es `amena-demo-03`.
3. Confirmar que el schema visible es `public`.
4. Abrir SQL Editor.
5. No pegar todavia todo el paquete.
6. Revisar que no haya secretos visibles en pantalla.
7. Abrir `SUPABASE-RUTA2-0015` como referencia documental.
8. Confirmar que se entiende que la prueba debe terminar en `ROLLBACK`.

### Fase B - Prechecks

1. Copiar solo los prechecks de lectura de `SUPABASE-RUTA2-0015`.
2. Ejecutar solo prechecks.
3. Revisar resultados manualmente.
4. Abortar si `organizations` con `short_name = 'RUTA2-DEMO'` es mayor que `1`.
5. Abortar si `projects` con `code = 'ruta2-demo'` dentro de la organizacion demo es mayor que `1`.
6. Abortar si ya existe `hero_image` primario y hay duda sobre su uso.
7. No avanzar si hay resultado ambiguo.
8. No corregir nada con `INSERT`, `UPDATE`, `DELETE`, `ALTER` ni `DROP`.

### Fase C - Dry-Run Transaccional

Solo pasar a esta fase si los prechecks son aceptables.

1. Copiar el bloque completo dry-run de `SUPABASE-RUTA2-0015`.
2. Verificar visualmente que el bloque contiene `BEGIN`.
3. Verificar visualmente que no existe `COMMIT`.
4. Verificar visualmente que termina con `ROLLBACK`.
5. Verificar que la seccion de validaciones posteriores usa:
   - `organizations.short_name = 'RUTA2-DEMO'`;
   - `projects.code = 'ruta2-demo'`;
   - `project_catalog.catalog_code = 'catalogo-ruta2-demo'`;
   - relaciones por `organization_id`, `project_id` y `project_catalog_id`.
6. Ejecutar solo si hay autorizacion humana posterior y atencion completa.
7. No hacer cambios manuales mientras corre.

### Fase D - Revision de Resultados

1. Revisar conteos especificos Ruta 2.
2. Revisar evidencia de organizacion demo.
3. Revisar evidencia de proyecto demo.
4. Revisar evidencia de branding del proyecto demo.
5. Revisar evidencia de hero asset del proyecto demo, si aplica.
6. Revisar evidencia de catalogo demo.
7. Revisar evidencia de tipos comerciales del catalogo demo.
8. Revisar evidencia de inventario del catalogo demo.
9. Confirmar que el `ROLLBACK` se ejecuto.
10. No hacer `COMMIT`.
11. Capturar evidencia visual o textual del resultado.

### Fase E - Emergencia

Si ocurre error antes del `ROLLBACK` final:

1. Ejecutar `ROLLBACK` manual inmediatamente.
2. No intentar arreglar con `UPDATE`.
3. No intentar arreglar con `DELETE`.
4. No intentar arreglar con `INSERT`.
5. No intentar arreglar con `ALTER`.
6. No ejecutar `COMMIT`.
7. Capturar evidencia del error.
8. Detener la prueba.
9. Volver al analisis documental antes de cualquier nuevo intento.

Esta fase tambien aplica si Supabase no responde, si la pantalla queda en estado inesperado, si el operador pierde la conexion, si aparece un resultado ambiguo o si surge duda humana.

## 7. Checklist Antes de Ejecutar Dry-Run

Antes de cualquier prueba futura, confirmar:

- estoy en `amena-demo-03`;
- estoy en schema `public`;
- no hay secretos visibles;
- revise prechecks;
- no hay duplicados peligrosos;
- entiendo que `organizations > 1` para `RUTA2-DEMO` obliga a abortar;
- entiendo que `projects > 1` para `ruta2-demo` obliga a abortar;
- entiendo que conflicto de `hero_image` primario puede obligar a abortar;
- el SQL no contiene `COMMIT`;
- el SQL contiene `BEGIN`;
- el SQL termina en `ROLLBACK`;
- entiendo que no debe persistir datos;
- entiendo que Ruta 2 no se modifica;
- entiendo que Bloque 6 no avanza.

## 8. Checklist Despues

Despues de cualquier prueba futura, confirmar:

- `ROLLBACK` ejecutado;
- no hubo `COMMIT`;
- se capturo resultado;
- se capturo cualquier error si existio;
- Ruta 2 no se modifico;
- Reservas tradicional no se modifico;
- Bloque 6 no se avanzo;
- no se toco codigo;
- no se creo migracion;
- no se creo archivo `.sql` ejecutable;
- no se confundio dry-run con ejecucion persistente.

## 9. Senales de Aborto

Abortar ante cualquiera de estas senales:

- duda humana;
- error SQL;
- pantalla inesperada;
- duplicados;
- conflicto de `hero_image`;
- Supabase no responde;
- el script no llega a `ROLLBACK`;
- tentacion de hacer `COMMIT`;
- intento de modificar el paquete durante la ejecucion;
- intento de corregir con `UPDATE`, `DELETE`, `INSERT`, `ALTER` o `DROP`;
- presion por hacerlo rapido;
- usuario no autorizado presente;
- secretos visibles en pantalla.

## 10. Nivel de Riesgo

Riesgo bajo:

- se revisan prechecks;
- se confirma que no hay `COMMIT`;
- se confirma `ROLLBACK` obligatorio;
- se aplica regla de emergencia;
- se opera sin prisa;
- se captura evidencia.

Riesgo medio:

- se ejecuta con prisa;
- no se revisan evidencias con calma;
- se omite capturar resultados;
- se confunde conteo amplio con validacion especifica Ruta 2.

Riesgo alto:

- alguien modifica `ROLLBACK` por `COMMIT`;
- alguien ignora prechecks;
- alguien intenta corregir manualmente con escritura;
- alguien intenta conectar Ruta 2 despues de un dry-run;
- alguien interpreta dry-run exitoso como aprobacion productiva.

## 11. Requisito Futuro de Producto/Admin

En una fase posterior debe crearse una pantalla o panel admin-only dentro del Centro de Mando/Admin para guiar este proceso.

Ese panel deberia:

- mostrar advertencias de seguridad operacional;
- mostrar checklist antes de dry-run;
- mostrar prechecks guiados;
- exigir confirmacion humana por fase;
- impedir que un operador confunda dry-run con ejecucion persistente;
- destacar que no debe existir `COMMIT`;
- destacar que debe existir `ROLLBACK`;
- mostrar la guia de emergencia si Supabase se detiene antes del `ROLLBACK` final;
- mantener registro de evidencia capturada;
- mantener esta capacidad fuera de la App Publica de Reservas.

Este requisito no autoriza implementar UI todavia.

Solo deja establecida la necesidad futura para que la guia no quede escondida en la documentacion.

## 12. Decisiones Vigentes

Ruta 2 sigue desconectada.

Bloque 6 sigue pospuesto.

Dry-run exitoso no equivale a autorizacion de `COMMIT`.

Poblar datos no equivale a integrar.

Tabla poblada no equivale a consumo funcional.

Solo consumo real en codigo permite declarar que un bloque esta aplicado funcionalmente en Ruta 2.

La guia operativa debe ser interna/autorizada, no publica.

## 13. Acciones Explicitamente No Realizadas

Durante la creacion de este documento:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos.
- No se actualizaron datos.
- No se borraron datos.
- No se modifico codigo.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se modifico la App Publica de Reservas.
- No se avanzo Bloque 6 funcionalmente.
- No se creo migracion ejecutable.
- No se creo archivo `.sql` ejecutable.
- No se crearon constraints nuevos.
- No se implemento UI.
- No se expuso esta guia al usuario final publico.

## 14. Proximo Paso Recomendado

Revisar humanamente esta guia antes de cualquier prueba futura.

Si la guia queda aprobada, el siguiente paso seguro no es ejecutar automaticamente, sino decidir si Miguel autoriza una prueba dry-run controlada usando `SUPABASE-RUTA2-0015`, con `ROLLBACK` obligatorio y con la regla de emergencia activa.

En paralelo, debe quedar en backlog futuro del Centro de Mando/Admin convertir esta guia en una experiencia interna visible, guiada y segura.

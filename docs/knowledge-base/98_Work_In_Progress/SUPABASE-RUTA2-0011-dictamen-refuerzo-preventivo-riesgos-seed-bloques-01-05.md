# SUPABASE-RUTA2-0011 - Dictamen y Refuerzo Preventivo de Riesgos Seed Bloques 01 a 05

Fecha de dictamen documental: 2026-07-10

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector

Rama de trabajo: `centro-mando-admin10`

## Advertencia principal

Este documento es un dictamen documental preventivo.

No toca Supabase.

No ejecuta SQL.

No inserta, actualiza ni borra datos.

No modifica codigo.

No modifica Ruta 2 Reservas.

No modifica Reservas tradicional.

No crea migraciones ejecutables.

No crea archivo `.sql`.

No crea constraints nuevos en Supabase.

No avanza Bloque 6 funcionalmente.

## 1. Contexto

Miguel completo la revision humana de columnas, constraints y foreign keys tabla por tabla siguiendo la linea documental de `SUPABASE-RUTA2-0010`.

Resultado humano:

- la estructura real parece compatible con `SUPABASE-RUTA2-0005`;
- el SQL seed sigue siendo una propuesta revisable;
- todavia no se ejecuto SQL;
- todavia no se modifico Supabase;
- todavia no se insertaron datos.

Durante la revision surgio una pregunta operativa:

```text
Conviene corregir o reforzar las posibles puertas de falla detectadas?
```

Dictamen corto:

```text
Si conviene reforzar.
Pero no tocando Supabase todavia.
El refuerzo debe hacerse a nivel documental/SQL revisable antes de cualquier ejecucion futura.
```

## 2. Riesgos detectados

### 2.1 `organizations.short_name`

Riesgo:

```text
organizations no muestra unique constraint sobre short_name.
```

Impacto:

- el SQL de `SUPABASE-RUTA2-0005` usa `short_name = 'RUTA2-DEMO'` para detectar si ya existe la organizacion demo;
- si hay multiples registros con ese `short_name`, el SQL podria escoger un candidato ambiguo;
- la poblacion posterior podria quedar vinculada a una organizacion incorrecta o duplicada.

### 2.2 `projects.code`

Riesgo:

```text
projects no muestra unique constraint sobre code.
```

Impacto:

- el SQL de `SUPABASE-RUTA2-0005` usa `organization_id + code = 'ruta2-demo'` para detectar si ya existe el proyecto demo;
- si hay multiples proyectos candidatos para la misma organizacion, la cadena catalogo/tipos/inventario podria quedar ambigua;
- la idempotencia documental no queda plenamente protegida por constraints fisicos.

### 2.3 `project_assets` y asset primario

Riesgo:

```text
project_assets tiene unique index parcial para un solo asset primario por project_id + asset_type cuando is_primary = true.
```

Impacto:

- el SQL propone insertar un `hero_image` primario;
- si ya existe otro `hero_image` primario para el mismo `project_id`, el insert podria fallar;
- no conviene improvisar `UPDATE` ni `DELETE` para reemplazar un asset primario sin decision humana especifica.

## 3. Dictamen operativo

Dictamen:

1. No conviene tocar Supabase todavia.
2. No conviene crear constraints nuevos ahora.
3. No conviene modificar RLS, policies ni estructura.
4. Si conviene reforzar el SQL revisable antes de cualquier ejecucion futura.
5. El refuerzo debe consistir en verificaciones previas y criterios de aborto, no en cambios fisicos directos.

Razon:

```text
El riesgo actual no exige cambiar la estructura de Supabase.
Exige evitar que una ejecucion futura proceda con ambiguedad.
```

## 4. Refuerzo recomendado para `organizations`

Antes de ejecutar cualquier insert sobre `public.organizations`, el paquete reforzado debe incluir una verificacion previa de duplicados por:

```text
short_name = 'RUTA2-DEMO'
```

Reglas recomendadas:

- mantener la logica `WHERE NOT EXISTS`;
- contar candidatos existentes antes de insertar;
- si no existe ninguno, permitir insert controlado;
- si existe exactamente uno, reutilizarlo solo si es claramente demo;
- si existen dos o mas, abortar;
- no resolver duplicados con `UPDATE`;
- no borrar duplicados;
- no crear unique constraint en esta fase.

Criterio de aborto:

```text
Abortar si count(*) where short_name = 'RUTA2-DEMO' > 1.
```

## 5. Refuerzo recomendado para `projects`

Antes de ejecutar cualquier insert sobre `public.projects`, el paquete reforzado debe incluir una verificacion previa de duplicados por:

```text
organization_id + code = 'ruta2-demo'
```

Reglas recomendadas:

- mantener la logica `WHERE NOT EXISTS`;
- contar candidatos existentes antes de insertar;
- si no existe ninguno, permitir insert controlado;
- si existe exactamente uno, reutilizarlo solo si pertenece a la organizacion demo correcta;
- si existen dos o mas, abortar;
- no resolver duplicados con `UPDATE`;
- no borrar duplicados;
- no crear unique constraint en esta fase.

Criterio de aborto:

```text
Abortar si existe mas de un proyecto con code = 'ruta2-demo' para la organizacion demo.
```

## 6. Refuerzo recomendado para `project_assets`

Antes de insertar un `hero_image` primario, el paquete reforzado debe verificar si ya existe otro asset primario del mismo tipo para el mismo proyecto:

```text
project_id = proyecto demo
asset_type = 'hero_image'
is_primary = true
```

Reglas recomendadas:

- si no existe `hero_image` primario, permitir insert controlado;
- si existe exactamente uno, abortar o dejar constancia para decision humana;
- si existen multiples, abortar;
- no improvisar `UPDATE`;
- no improvisar `DELETE`;
- no reemplazar assets sin autorizacion documental especifica;
- no modificar el unique index parcial.

Criterio de aborto:

```text
Abortar si ya existe un hero_image primario para el mismo project_id.
```

Alternativa futura:

Si Miguel quiere reemplazar el asset primario existente, debe crearse un documento separado que defina:

- evidencia del asset actual;
- motivo de reemplazo;
- SQL revisable especifico;
- rollback;
- autorizacion humana separada.

## 7. Decision sobre SUPABASE-RUTA2-0005

Decision:

```text
SUPABASE-RUTA2-0005 no debe ejecutarse tal como esta.
```

Antes de cualquier ejecucion futura debe prepararse una version documental reforzada del paquete humano controlado.

Esa version debe:

- incorporar checks previos de duplicados;
- incorporar criterios de aborto explicitos;
- mantener `COMMIT` y `ROLLBACK` bajo decision humana;
- no crear constraints nuevos;
- no modificar datos existentes;
- no resolver conflictos mediante `UPDATE` o `DELETE` improvisados.

## 8. Decision sobre Ruta 2

Ruta 2 sigue desconectada.

Motivos:

- no se ha ejecutado poblacion minima;
- no se ha validado resultado de seed;
- no hay consumo funcional en codigo;
- la tarea actual es reforzar seguridad documental, no integrar apps.

Regla:

```text
Reforzar SQL revisable no equivale a conectar Ruta 2.
```

## 9. Decision sobre Bloque 6

Bloque 6 sigue pospuesto.

Motivos:

- Bloques 01 a 05 aun no estan poblados;
- no hay integracion funcional Ruta 2;
- no se debe crear capa de atributos sobre una base no ejecutada;
- no se debe usar Bloque 6 como sustituto de catalogo, tipos o inventario.

Regla:

```text
Primero seed reforzado, ejecucion controlada y validacion de Bloques 01 a 05.
Despues evaluacion de integracion Ruta 2.
Solo despues Bloque 6 funcional.
```

## 10. Acciones explicitamente no realizadas

Durante este dictamen:

- No se toco Supabase.
- No se ejecuto SQL.
- No se insertaron datos.
- No se actualizaron datos.
- No se borraron datos.
- No se modifico codigo.
- No se modifico Ruta 2 Reservas.
- No se modifico Reservas tradicional.
- No se creo archivo `.sql`.
- No se creo migracion ejecutable.
- No se crearon constraints nuevos en Supabase.
- No se modificaron constraints existentes.
- No se modifico RLS.
- No se modificaron policies.
- No se avanzo Bloque 6 funcionalmente.

## 11. Proximo paso recomendado

Crear, en una fase posterior y solo con autorizacion humana, un documento reforzado derivado de `SUPABASE-RUTA2-0009` que incorpore:

- verificacion previa de duplicados en `organizations`;
- verificacion previa de duplicados en `projects`;
- verificacion previa de asset primario en `project_assets`;
- criterios de aborto antes de cualquier insert;
- paquete transaccional humano con `BEGIN`, SQL reforzado, SELECTs de validacion, `COMMIT` comentado y `ROLLBACK` disponible.

Ese documento debera seguir siendo Markdown revisable, no `.sql` ejecutable, salvo autorizacion humana posterior especifica.

## 12. Confirmacion final

Este documento no ejecuta nada.

No corrige Supabase.

No crea constraints.

No modifica datos.

Solo establece que el siguiente paso seguro es reforzar documentalmente el paquete de ejecucion antes de cualquier SQL futuro.

# SUPABASE-RUTA2-0020 - Estado certificado de Supabase Ruta 2 en pausa formal

Fecha de cierre documental: 2026-07-11
Dry-run humano certificado: 2026-07-10
Repositorio base: AMENA_Comalapa
Rama base certificada antes de este paquete: centro-mando-admin10
HEAD base certificado antes de este paquete: 6b5b468ead7d2381b436a847eebbb3c75a6bf088

## 1. Decision formal

Se declara pausado el frente Supabase Ruta 2 para Centro Demo.

La pausa no invalida el trabajo tecnico realizado. Lo preserva en estado documental verificable para una reanudacion posterior con autorizacion explicita.

Durante esta pausa no se autoriza:

- ejecutar SQL;
- abrir Supabase;
- crear, borrar o modificar tablas;
- preparar persistencia;
- reemplazar ROLLBACK por COMMIT;
- ejecutar COMMIT SQL;
- crear migraciones;
- modificar aplicaciones;
- cambiar repositorios operativos;
- reutilizar tablas legacy para aparentar integracion.

## 2. Que quedo demostrado por el dry-run humano

El documento SUPABASE-RUTA2-0018 certifico que el paquete SUPABASE-RUTA2-0015 fue ejecutado manualmente en modo dry-run con ROLLBACK obligatorio.

El dry-run demostro:

1. Las siete tablas base aceptaron inserciones temporales coherentes dentro de una transaccion.
2. Las dependencias entre organization, project, branding, assets, catalog, commercial types e inventory resolvieron correctamente en el lote probado.
3. Los guards previos evitaron avanzar sobre marcadores preexistentes.
4. Los SELECT internos permitieron observar datos temporales consistentes.
5. El ROLLBACK elimino los datos temporales.
6. La verificacion posterior confirmo conteos cero para los marcadores del lote.

El dry-run no demostro:

1. Que exista un paquete persistente listo.
2. Que sea seguro reemplazar ROLLBACK por COMMIT.
3. Que las aplicaciones ya lean o escriban estas tablas.
4. Que RLS, permisos, servicios y hooks esten listos.
5. Que Bloque 06 este cubierto.
6. Que las tablas operativas de reservas, pagos, mensajes, citas o CRM esten integradas.
7. Que los datos sean definitivos de produccion.

## 3. Estado de las siete tablas rectoras

| tabla | estado tecnico | datos persistidos | dependencia clave | riesgo pendiente |
|---|---|---:|---|---|
| organizations | Probada temporalmente | No | Raiz del lote | Posible unicidad no visible sobre short_name |
| projects | Probada temporalmente | No | organizations.id | Posible unicidad no visible sobre code |
| project_branding | Probada temporalmente | No | projects.id | Definicion final de copy/branding |
| project_assets | Probada temporalmente | No | projects.id | Hero primario y colision de asset principal |
| project_catalog | Probada temporalmente | No | projects.id | Catalogos y codigos aun demo |
| project_commercial_types | Probada temporalmente | No | project_catalog.id | Tipos comerciales y atributos no extendidos |
| project_inventory | Probada temporalmente | No | projects.id + project_catalog.id | Inventario demo y estados comerciales |

Decision: tecnicamente estan aptas como base para preparar un paquete persistente futuro, pero no quedan autorizadas por esta pausa.

## 4. Datos temporales observados en el dry-run

El dry-run observo marcadores Ruta 2 Demo y unidades temporales, entre ellas:

- RUTA2-DEMO como organization.short_name.
- ruta2-demo como projects.code.
- Hero primario temporal en project_assets.
- Codigos de inventario de ejemplo:
  - INV-RUTA2-CUR-001
  - INV-RUTA2-RES-001
  - INV-RUTA2-RES-002
  - INV-RUTA2-SRV-001

Todos esos datos fueron revertidos. No quedaron persistidos.

## 5. Datos que siguen siendo placeholders, genericos o no definitivos

Permanecen no definitivos:

- nombres comerciales finales;
- textos de branding y claims;
- URL real de hero_image;
- imagenes adicionales;
- sectores, manzanas, lotes y unidades finales;
- precios, areas, disponibilidad y atributos comerciales;
- atributos parametrizados del Bloque 06;
- relacion con reservas reales;
- relacion con ventas, citas, pagos o mensajes;
- permisos RLS por rol y aplicacion.

## 6. Paquetes SQL documentados y estado

| paquete/documento | funcion | estado al cierre |
|---|---|---|
| SUPABASE-RUTA2-0005 | Primer paquete semilla | Historico/superado |
| SUPABASE-RUTA2-0009 | Ajuste posterior | Historico/superado |
| SUPABASE-RUTA2-0012 | Guia de dry-run obligatorio | Vigente como antecedente |
| SUPABASE-RUTA2-0013 | Semilla endurecida | Antecedente tecnico |
| SUPABASE-RUTA2-0015 | Paquete ajustado de dry-run con ROLLBACK | Paquete vigente de prueba, no persistente |
| SUPABASE-RUTA2-0016 | Guia operativa humana | Vigente como guia |
| SUPABASE-RUTA2-0017 | Seguimiento panel admin | Futuro, no implementado |
| SUPABASE-RUTA2-0018 | Resultado dry-run humano exitoso | Evidencia certificada |

No existe en este cierre un paquete persistente autorizado.
No existe en este cierre un rollback compensatorio persistente autorizado.
No debe convertirse SUPABASE-RUTA2-0015 en persistente por sustitucion mecanica de ROLLBACK por COMMIT.

## 7. Dependencias reales preservadas

El paquete de prueba respeto las siguientes dependencias:

- projects.organization_id depende de organizations.id.
- project_branding.project_id depende de projects.id.
- project_assets.project_id depende de projects.id.
- project_catalog.project_id depende de projects.id.
- project_inventory.project_id depende de projects.id.
- project_inventory.project_catalog_id depende de project_catalog.id.
- project_commercial_types.project_catalog_id depende de project_catalog.id.

Tambien se preservaron criterios de ON CONFLICT o unicidad observada/documentada:

- project_branding por project_id.
- project_catalog por project_id + catalog_code.
- project_commercial_types por project_catalog_id + type_code.
- project_inventory por project_id + inventory_code.

Riesgos aun pendientes:

- organizations.short_name podria no tener constraint unico visible.
- projects.code podria no tener constraint unico visible.
- hero primario puede requerir regla explicita para evitar mas de un primario por proyecto.
- RLS y permisos no fueron certificados.

## 8. Alcance completado

Quedo completado:

1. Inventario documental inicial.
2. Identificacion de tablas rectoras nuevas.
3. Identificacion de tablas legacy que no deben usarse.
4. Paquete dry-run con ROLLBACK para siete tablas.
5. Guia humana de ejecucion.
6. Ejecucion humana exitosa del dry-run.
7. Verificacion post-rollback.
8. Pausa formal documentada.

## 9. Alcance no completado

No quedo completado:

1. Persistencia de las siete tablas.
2. Paquete persistente controlado.
3. Rollback compensatorio para persistencia parcial.
4. Integracion de Centro de Mando con lectura real de Ruta 2.
5. Integracion de App Publica con reservas canonicas.
6. Integracion de Vendedoras/Operaciones Comerciales.
7. Integracion de Mensajeria Operacional.
8. Integracion de Marta.
9. Integracion de H-OperIA Intelligence.
10. Bloque 06.
11. RLS por flujo y rol.
12. Auditoria completa de datos actuales de tablas operativas.

## 10. Consecuencia de la pausa

Ruta 2 queda como frente tecnicamente avanzado pero no conectado ni persistido.

El Centro Demo no debe presentarse como conectado a Supabase Ruta 2 hasta que una fase posterior autorice, ejecute y certifique:

1. paquete persistente;
2. verificacion post-commit;
3. rollback compensatorio o estrategia de contingencia;
4. conexion funcional minima desde aplicacion;
5. evidencia visible y tecnica.

## 11. Confirmacion de alcance

- SQL no ejecutado durante este cierre documental.
- Supabase no abierto durante este cierre documental.
- Aplicaciones no modificadas.
- Esquema no modificado.
- Persistencia no autorizada.
- Commit SQL no creado.

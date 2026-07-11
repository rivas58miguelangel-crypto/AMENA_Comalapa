# SUPABASE-RUTA2-0022 - Manifiesto del paquete de cierre Supabase Ruta 2

Fecha de cierre documental: 2026-07-10
Proyecto: AMENA / H-OperIA / Centro Demo
Estado: paquete documental de pausa formal

## 0. Certificacion Git del paquete

Repositorio: C:\Amena\Codex\AMENA_Comalapa
Rama: centro-mando-admin10
Commit de cierre anterior auditado: 3df31b47d23b1648fcabd341d5408772ec8f17c0
Commit correctivo documental: el commit Git que contiene esta version corregida del manifiesto; su hash final debe certificarse en la entrega posterior al commit, porque un commit no puede contener literalmente su propio hash sin alterar el hash.
HEAD local/remoto al iniciar correccion: 3df31b47d23b1648fcabd341d5408772ec8f17c0
Ahead/behind al iniciar correccion: 0 0
Working tree al iniciar correccion: limpio
HEAD local/remoto final: debe certificarse despues de commit y push.
Ahead/behind final: debe certificarse despues de commit y push.
Working tree final: debe certificarse despues de commit y push.

Esta certificacion no registra ejecucion SQL ni apertura de Supabase. Registra solo el estado Git del paquete documental.

## 1. Proposito del manifiesto

Este manifiesto organiza el paquete de cierre Supabase Ruta 2 y establece que documentos deben considerarse vigentes, historicos, superados o pendientes.

Su finalidad es impedir que una reanudacion futura parta desde cero o tome como vigente un documento que ya fue reemplazado por evidencia posterior.

## 2. Documentos de cierre creados en este paquete

| documento | funcion | estado |
|---|---|---|
| SUPABASE-RUTA2-0019-clasificacion-definitiva-tablas-pausa-formal.md | Clasifica tablas rectoras, operativas, proyectadas, legacy, tecnicas e indeterminadas | Vigente |
| SUPABASE-RUTA2-0020-estado-certificado-supabase-ruta2-pausa-formal.md | Certifica estado tecnico de siete tablas, dry-run y pendientes | Vigente |
| SUPABASE-RUTA2-0021-pausa-formal-protocolo-reanudacion-supabase-ruta2.md | Define pausa formal, prohibiciones y protocolo de reanudacion | Rector operativo vigente |
| SUPABASE-RUTA2-0022-manifiesto-paquete-cierre-supabase-ruta2.md | Mapa de documentos y lectura futura | Vigente |

## 3. Orden recomendado de lectura futura

Para reanudar Ruta 2, leer en este orden:

1. SUPABASE-RUTA2-0022, para conocer el mapa documental.
2. SUPABASE-RUTA2-0021, para conocer prohibiciones y protocolo. Es obligatorio leerlo y cumplirlo antes de cualquier reanudacion.
3. SUPABASE-RUTA2-0020, para conocer estado certificado.
4. SUPABASE-RUTA2-0019, para conocer clasificacion de tablas.
5. SUPABASE-RUTA2-0018, para conocer evidencia del dry-run humano.
6. SUPABASE-RUTA2-0015, para conocer el paquete dry-run vigente.
7. SUPABASE-RUTA2-0016, para conocer la guia operativa humana.
8. SUPABASE-RUTA2-0010 y 0011, para columnas, constraints, FKs y riesgos.
9. SUPABASE-0001 - Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual, y SUPABASE-0007, para modelo rector preliminar e inventario.
10. Bloques 01 a 06 y documentos puente, para contexto de diseno.
11. TRANSICION-Codex-AMENA-77-A-78-20260710.md, para continuidad entre agentes.

## 4. Serie SUPABASE-RUTA2

| documento | funcion resumida | estado al cierre |
|---|---|---|
| SUPABASE-RUTA2-0001 | Inicio/contexto Ruta 2 | Historico |
| SUPABASE-RUTA2-0002 | Avance documental temprano | Historico |
| SUPABASE-RUTA2-0003 | Avance documental temprano | Historico |
| SUPABASE-RUTA2-0004 | Preparacion tecnica temprana | Historico |
| SUPABASE-RUTA2-0005 | Primer paquete semilla con SQL historico | Antecedente superado; no usar como instruccion operativa directa |
| SUPABASE-RUTA2-0006 | Revision/ajuste temprano | Historico |
| SUPABASE-RUTA2-0007 | Revision/ajuste temprano | Historico |
| SUPABASE-RUTA2-0008 | Revision/ajuste temprano | Historico |
| SUPABASE-RUTA2-0009 | Paquete ajustado previo con SQL historico | Superado por 0015; no usar como instruccion operativa directa |
| SUPABASE-RUTA2-0010 | Columnas, constraints y FKs | Vigente como referencia tecnica |
| SUPABASE-RUTA2-0011 | Dictamen de riesgos | Vigente como referencia de riesgo |
| SUPABASE-RUTA2-0012 | Guia de dry-run obligatorio | Antecedente; no usar como instruccion operativa directa sin nueva revision |
| SUPABASE-RUTA2-0013 | Semilla endurecida con SQL historico | Antecedente superado; no usar como instruccion operativa directa |
| SUPABASE-RUTA2-0014 | Ajuste/evaluacion intermedia | Historico |
| SUPABASE-RUTA2-0015 | Unico paquete dry-run realmente ejecutado el 2026-07-10 | Vigente solo como evidencia de dry-run; no utilizar como persistente |
| SUPABASE-RUTA2-0016 | Guia operativa humana usada en la ejecucion de 2026-07-10 | Vigente como antecedente de guia; no reutilizar sin nueva revision |
| SUPABASE-RUTA2-0017 | Seguimiento panel admin futuro | Pendiente/no implementado |
| SUPABASE-RUTA2-0018 | Resultado dry-run humano exitoso con ROLLBACK | Evidencia certificada del resultado humano |
| SUPABASE-RUTA2-0019 | Clasificacion definitiva de tablas | Vigente |
| SUPABASE-RUTA2-0020 | Estado certificado en pausa formal | Vigente |
| SUPABASE-RUTA2-0021 | Protocolo de reanudacion | Rector operativo vigente |
| SUPABASE-RUTA2-0022 | Manifiesto de cierre | Vigente |

## 5. Documentos externos de soporte

| documento | valor | estado |
|---|---|---|
| SUPABASE-0001 | Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual | Referencia tecnica |
| SUPABASE-0007 | Inventario y clasificacion previa de tablas | Referencia tecnica |
| PERSISTENCIA-0001 | Arquitectura rectora de persistencia | Referencia conceptual |
| PD-0002 | Catalogo comercial parametrizable | Referencia conceptual |
| PD-0003 | Catalogo comercial jerarquico | Referencia conceptual |
| RUTA2-BLOQUES-SUPABASE-0001 | Puente de integracion | Referencia |
| RESERVAS-SUPABASE-0001 | Aclaracion Admin/Reservas Ruta 2 | Referencia |
| RUTA2-SUPABASE-0002 | Mapa de conversion funcional | Referencia |
| RUTA2-SUPABASE-0003 | Plan faseado | Referencia |

## 6. Estado de SQL al cierre

No existe SQL persistente autorizado.

Existe un paquete de dry-run con ROLLBACK obligatorio documentado en SUPABASE-RUTA2-0015.

Ese paquete fue el unico dry-run realmente ejecutado el 2026-07-10. No puede transformarse en persistente cambiando ROLLBACK por COMMIT.

Existen antecedentes SQL o pseudo-SQL que no deben ejecutarse sin revisar su vigencia:

- BLOQUE-01-nucleo-institucional.sql
- BLOQUE-02-identidad-proyecto.sql
- BLOQUE-03-project-inventory.sql
- BLOQUE-04-project-catalog.sql.md
- BLOQUE-05-project-commercial-types.sql.md
- BLOQUE-06-project-commercial-type-attributes.sql.md

Bloque 06 sigue fuera de alcance.

Cualquier documento con SQL historico debe considerarse no ejecutable sin nueva revision y autorizacion humana explicita.

## 6.1 Contexto exacto del dry-run certificado

- Proyecto Supabase observado: amena-demo-03.
- Schema observado: public.
- Prechecks certificados: 0 / 0 / 0.
- Dataset temporal observado dentro de transaccion.
- Inventarios temporales observados: INV-RUTA2-CUR-001, INV-RUTA2-RES-001, INV-RUTA2-RES-002 e INV-RUTA2-SRV-001.
- ROLLBACK ejecutado.
- COMMIT no ejecutado.
- Conteos post-ROLLBACK en cero.
- Marcadores de las siete tablas en cero.
- Ausencia de persistencia certificada.

## 7. Estado funcional al cierre

| area | estado |
|---|---|
| Siete tablas rectoras | Probadas en dry-run, sin persistencia |
| Centro de Mando/Admin | No conectado funcionalmente a Ruta 2 |
| App Publica de Reservas | Persistencia parcial de eventos; reserva canonica no certificada |
| App Vendedoras/Operaciones | No conectada a las siete tablas rectoras |
| Mensajeria Operacional | No conectada a Ruta 2 |
| Marta | No conectada a Ruta 2 |
| H-OperIA Intelligence | No conectada a Ruta 2 |
| Bloque 06 | Pendiente |

Regla rectora: poblacion persistente no equivale a integracion funcional; integracion funcional no equivale a operacion productiva.

## 7.1 Tablas legacy no utilizables para el demo nuevo

No deben usarse como base nueva de Ruta 2:

- property_inventory;
- property_models;
- inventory_import_batches.

## 8. Prohibiciones que debe heredar cualquier agente futuro

1. No ejecutar SQL por memoria.
2. No abrir Supabase sin autorizacion.
3. No preparar persistencia sin paquete nuevo.
4. No convertir ROLLBACK en COMMIT.
5. No usar legacy como atajo.
6. No crear migraciones automaticas.
7. No modificar apps dentro del frente pausado.
8. No afirmar conexion funcional si solo existe documentacion.
9. No afirmar persistencia si solo existe dry-run.
10. No continuar si falta evidencia.

## 9. Punto exacto de reanudacion

Si se reanuda Supabase Ruta 2, el punto correcto no es ejecutar SQL.

El punto correcto es:

1. leer este manifiesto;
2. confirmar Git;
3. confirmar autorizacion de alcance;
4. reconstruir estado documental;
5. decidir si el siguiente frente es:
   - auditoria visual del Centro Demo;
   - paquete persistente controlado;
   - integracion funcional minima;
   - tandas futuras;
   - reservas publicas.

Al cierre de este paquete, el siguiente frente autorizado es solo la revision integral del Centro Demo visible/presentable.

La obligacion inicial de cualquier reanudacion es leer y cumplir SUPABASE-RUTA2-0021. El punto de reanudacion no es ejecutar SQL.

## 10. Confirmacion de cierre

- SQL no ejecutado.
- Supabase no abierto.
- Schema no modificado.
- Aplicaciones no modificadas.
- Paquete persistente no preparado.
- COMMIT SQL no ejecutado.
- Commit y push documental de cierre realizados.
- Push de codigo de aplicacion no requerido.

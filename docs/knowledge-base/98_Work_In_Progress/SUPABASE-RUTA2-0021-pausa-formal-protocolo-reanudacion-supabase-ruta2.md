# SUPABASE-RUTA2-0021 - Pausa formal y protocolo de reanudacion Supabase Ruta 2

Fecha de cierre documental: 2026-07-10
Proyecto: AMENA / H-OperIA / Centro Demo
Estado: pausa formal

## 1. Declaracion de pausa

El frente Supabase Ruta 2 queda pausado formalmente.

La pausa no significa abandono. Significa congelamiento controlado del estado tecnico para evitar ejecuciones parciales, inferencias peligrosas o integraciones aparentes.

## 2. Prohibiciones vigentes durante la pausa

Hasta nueva autorizacion explicita, queda prohibido:

1. ejecutar SQL;
2. abrir Supabase;
3. crear tablas;
4. borrar tablas;
5. modificar schema;
6. preparar paquete persistente;
7. reemplazar ROLLBACK por COMMIT;
8. ejecutar COMMIT SQL;
9. crear migraciones;
10. modificar aplicaciones;
11. modificar repositorios operativos;
12. conectar pantallas a tablas sin mapa funcional;
13. reutilizar property_inventory, property_models o inventory_import_batches para el demo nuevo;
14. presentar datos simulados como persistidos;
15. asumir que una tabla existe porque esta documentada;
16. asumir que una tabla funciona porque existe;
17. asumir que el dry-run equivale a persistencia;
18. asumir que Bloque 06 esta validado;
19. asumir que RLS y permisos estan listos;
20. extender el alcance sin nueva decision.

## 3. Documentos minimos a leer antes de reanudar

Antes de retomar Ruta 2, un agente humano o Codex debe leer completamente:

- TRANSICION-Codex-AMENA-77-A-78-20260710.md
- SUPABASE-0001 - Modelo Rector Definitivo y Clasificacion Preliminar del Esquema Actual.md
- SUPABASE-0007 - Inventario y Clasificacion de Tablas Supabase Existentes Frente al Plan Maestro SQL.md
- SUPABASE-RUTA2-0010
- SUPABASE-RUTA2-0011
- SUPABASE-RUTA2-0015
- SUPABASE-RUTA2-0016
- SUPABASE-RUTA2-0017, si aplica al frente UI futuro
- SUPABASE-RUTA2-0018
- SUPABASE-RUTA2-0019
- SUPABASE-RUTA2-0020
- SUPABASE-RUTA2-0021
- SUPABASE-RUTA2-0022
- BLOQUE-01 a BLOQUE-06
- RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md
- RESERVAS-SUPABASE-0001-aclaracion-admin-reservas-ruta2.md
- RUTA2-SUPABASE-0002-mapa-conversion-funcional.md
- RUTA2-SUPABASE-0003-plan-implementacion-faseada.md

## 4. Protocolo obligatorio de reanudacion

La reanudacion debe ejecutarse por compuertas.

### Compuerta 1: certificacion Git

1. Confirmar repositorio correcto: AMENA_Comalapa.
2. Confirmar rama autorizada.
3. Confirmar HEAD local.
4. Confirmar HEAD remoto.
5. Confirmar ahead/behind.
6. Confirmar working tree limpio.
7. Confirmar que no hay archivos no rastreados relevantes.

Detener si hay divergencia no explicada.

### Compuerta 2: reconstruccion documental

1. Leer los documentos minimos listados.
2. Identificar el ultimo documento vigente de la serie SUPABASE-RUTA2.
3. Verificar numeracion antes de crear documentos nuevos.
4. Confirmar que 0015 sigue siendo dry-run, no persistente.
5. Confirmar que 0018 sigue siendo evidencia del dry-run con ROLLBACK.
6. Confirmar que 0019, 0020, 0021 y 0022 no fueron reemplazados por documentos posteriores.

Detener si existe un documento posterior no revisado.

### Compuerta 3: certificacion de alcance

1. Definir si el frente autorizado es documental, persistente, UI o auditoria.
2. Confirmar si se permite abrir Supabase.
3. Confirmar si se permite SQL.
4. Confirmar si se permite modificar aplicaciones.
5. Confirmar si se permite commit y push.

Detener si la autorizacion es ambigua.

### Compuerta 4: auditoria de tablas

1. Reconfirmar las siete tablas rectoras.
2. Reconfirmar tablas operativas existentes.
3. Reconfirmar tablas legacy no utilizables.
4. Reconfirmar tablas tecnicas/auxiliares.
5. Reconfirmar tablas indeterminadas.
6. Reconfirmar si Bloque 06 sigue fuera de alcance.
7. Inspeccionar el schema real autorizado antes de cualquier ejecucion.
8. Revisar constraints.
9. Revisar indices.
10. Revisar claves foraneas.
11. Revisar triggers.
12. Revisar RLS.
13. Revisar policies.
14. Revisar funciones.
15. Revisar vistas.
16. Revisar RPC.
17. Revisar consumidores actuales.
18. Revisar cambios de codigo ocurridos durante la pausa.
19. Revisar cambios de schema ocurridos durante la pausa.

Detener si alguna tabla cambia de categoria sin justificacion documental.

Detener si cualquier cambio de schema, constraints, indices, claves foraneas, triggers, RLS, policies, funciones, vistas, RPC, consumidores o codigo ocurrido durante la pausa invalida la evidencia anterior.

Cualquier cambio relevante durante la pausa obliga a evaluar y, cuando corresponda, repetir el dry-run. No puede reutilizarse automaticamente la certificacion humana de 2026-07-10.

### Compuerta 5: paquete persistente futuro

Solo si la autorizacion futura lo permite:

1. Preparar un paquete persistente separado del dry-run.
2. Mantener prechecks.
3. Mantener guards.
4. Mantener validaciones internas.
5. Definir COMMIT explicito solo en el paquete persistente.
6. Definir rollback compensatorio separado.
7. Definir evidencia post-commit.
8. Definir criterio de abortar.

Detener si se intenta convertir 0015 directamente en paquete persistente.

Regla rectora: poblacion persistente no equivale a integracion funcional; integracion funcional no equivale a operacion productiva.

### Compuerta 6: integracion funcional futura

Antes de conectar una app:

1. Definir pantalla exacta.
2. Definir consumidor.
3. Definir servicio o repositorio de acceso.
4. Definir campos leidos.
5. Definir campos escritos.
6. Definir permisos RLS.
7. Definir manejo de error.
8. Definir evidencia visible.
9. Definir prueba manual.

Detener si la app solo aparenta persistencia con mocks, console.log o estado local.

## 5. Criterios de paro inmediato

Debe detenerse el trabajo si ocurre cualquiera de estos casos:

- working tree sucio no explicado;
- HEAD local y remoto divergentes;
- documentos de Ruta 2 posteriores no revisados;
- SQL requerido pero no autorizado;
- Supabase requerido pero no autorizado;
- paquete persistente inexistente;
- rollback compensatorio inexistente para una carga persistente;
- duda sobre constraints, FKs, RLS o ON CONFLICT;
- intento de usar property_inventory, property_models o inventory_import_batches como base nueva;
- intento de incluir Bloque 06 sin dictamen;
- intento de presentar datos locales como datos Supabase;
- error parcial sin estrategia de contingencia.

## 6. Riesgos y deuda tecnica preservados

Riesgos vigentes:

1. Ruta 2 sigue desconectada de la aplicacion.
2. Las siete tablas no tienen datos persistidos.
3. RLS no esta certificado.
4. Bloque 06 no esta cubierto.
5. App Publica tiene persistencia parcial de eventos, pero no reserva canonica completa certificada.
6. Centro de Mando no muestra todavia datos reales de estas siete tablas.
7. Tablas legacy podrian tentar una integracion rapida pero incorrecta.
8. Datos comerciales finales no estan cerrados.

Deuda tecnica:

1. Crear paquete persistente controlado.
2. Crear rollback compensatorio.
3. Definir servicios/repositorios de acceso por app.
4. Definir RLS por rol y flujo.
5. Conectar Centro Demo a lectura real.
6. Conectar seleccion y reserva publica a tablas canonicas.
7. Diseñar Bloque 06.
8. Crear evidencia operativa demostrable.

## 7. Que no debe inferirse

No debe inferirse que:

- dry-run exitoso equivale a autorizacion de persistencia;
- una tabla documentada existe en Supabase;
- una tabla existente tiene los constraints esperados;
- una tabla existente tiene RLS correcto;
- operational_records puede reemplazar cualquier tabla especializada;
- property_inventory, property_models o inventory_import_batches son aceptables para Ruta 2;
- la App Publica ya guarda reservas canonicas;
- Centro de Mando ya esta conectado a Ruta 2;
- Bloque 06 esta aprobado;
- el siguiente paso tecnico es automaticamente SQL.

## 8. Siguiente frente autorizado

El siguiente frente autorizado despues de esta pausa no es persistencia.

El siguiente frente autorizado es una revision integral del Centro Demo visible y presentable:

- que se ve;
- que se puede mostrar;
- que esta simulado;
- que esta desconectado;
- que necesita pulido visual;
- que necesita narrativa demo;
- que debe ocultarse o marcarse como no conectado.

Ese frente debe iniciar con auditoria, no con implementacion.

## 9. Confirmacion de alcance

- SQL no ejecutado.
- Supabase no abierto.
- Esquema no modificado.
- Aplicaciones no modificadas.
- Persistencia no autorizada.

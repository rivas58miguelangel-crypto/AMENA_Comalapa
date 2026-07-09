# RUTA2-PRODUCCION-0001 - Genesis de Version Productiva

Fecha de decision documental: 2026-07-09

Repositorio rector: `C:\Amena\Codex\AMENA_Comalapa`

Aplicacion rectora: Admin / repositorio rector.

Estado: documento estrategico-operativo inicial. No constituye integracion funcional, SQL ejecutable, migracion ni autorizacion para tocar Supabase.

## 1. Proposito del documento

Dejar formalmente establecido que la App Publica de Reservas Ruta 2, aunque hoy es una demo generica/manual, debe entenderse como la genesis practica de la futura version real/productiva cuando un cliente apruebe el demo.

Este documento no convierte Ruta 2 en produccion. Define como debe interpretarse estrategicamente Ruta 2 dentro del camino hacia produccion.

## 2. Contexto de origen

Ruta 2 fue creada como demo generica/manual para buscar nuevos clientes y nuevos proyectos.

Su objetivo inmediato es comercial:

- permitir presentar una experiencia no amarrada a AMENA original;
- neutralizar identidad, imagenes y textos sensibles del proyecto original;
- conservar el valor del flujo ya construido;
- acelerar conversaciones comerciales con prospectos.

La prioridad humana actual es acelerar la busqueda de empresas/proyectos nuevos ante el riesgo de enfriamiento del interes del proyecto AMENA original.

Por eso Ruta 2 debe proteger velocidad comercial sin confundirse con la arquitectura productiva final.

## 3. Definicion estrategica

Ruta 2 no es todavia la version productiva final.

Ruta 2 si debe considerarse el punto de partida practico, comercial y funcional de la version productiva futura cuando un cliente apruebe el demo.

La produccion real no debe empezar desde cero. Debe partir de la experiencia validada en Ruta 2, conservando lo que ya haya demostrado valor comercial, claridad de recorrido, aceptacion del cliente y utilidad funcional.

Principio rector:

```text
Ruta 2 vende y valida la experiencia. Admin/Supabase gobierna la arquitectura productiva. La version real debe nacer de la convergencia entre ambas.
```

## 4. Que se aprovecharia de Ruta 2 para produccion

Elementos aprovechables de Ruta 2 cuando un cliente apruebe el demo:

- experiencia publica generica;
- estructura visual;
- flujo de seleccion/interes/reserva;
- narrativa comercial;
- comportamiento de presentacion de productos/proyectos;
- aprendizajes de campos requeridos por industria;
- textos, pantallas y recorrido del usuario;
- logica de demo validada por cliente;
- componentes que puedan conservarse sin comprometer arquitectura;
- criterios de interaccion que el cliente haya aprobado durante la demostracion;
- secuencia de decision del usuario final;
- puntos de friccion detectados en la presentacion comercial.

Ruta 2 debe funcionar como evidencia practica de lo que conviene preservar, no como excusa para congelar una arquitectura hardcoded.

## 5. Que no esta listo todavia para produccion

Ruta 2 no esta lista aun como produccion real porque conserva brechas estructurales:

- datos comerciales hardcoded/manuales;
- catalogo no parametrizado;
- ausencia funcional de `project_catalog`;
- ausencia funcional de `project_commercial_types`;
- ausencia funcional de `project_inventory`;
- ausencia funcional de `organizations`;
- ausencia funcional de `projects`;
- ausencia funcional de `project_branding`;
- ausencia funcional de `project_assets`;
- ausencia de atributos configurables conectados;
- ausencia de administracion real por empresa/proyecto;
- precios no productivos;
- disponibilidad no productiva;
- modelos/familias no productivos;
- variantes comerciales no productivas;
- unidades comerciales no productivas;
- datos demo que no deben tratarse como datos reales del cliente.

La existencia de cliente Supabase parcial para eventos no equivale a integracion productiva con el Catalogo Comercial Parametrizable.

## 6. Conversion necesaria para volver Ruta 2 productiva

Para convertir Ruta 2 en version productiva futura, sera necesario:

- reemplazar datos manuales por Supabase gobernado;
- conectar Ruta 2 con Bloques 01 a 05 antes de beneficiarse de Bloque 6;
- usar `project_catalog` como dominio rector;
- usar `project_commercial_types` para tipos comerciales;
- usar `project_inventory` o la estructura que corresponda para inventario comercial;
- incorporar atributos configurables solo despues de tener el catalogo base integrado;
- separar demo, produccion y datos del cliente;
- definir carga inicial de datos del cliente/proyecto;
- definir mecanismo de administracion y mantenimiento;
- definir como se validan cambios antes de publicarse;
- definir como se mantiene trazabilidad comercial y tecnica;
- retirar o encapsular constantes hardcoded cuando exista fuente persistente gobernada.

La conversion productiva debe ser planificada, no improvisada sobre la demo.

## 7. Relacion con RUTA2-BLOQUES-SUPABASE-0001

`RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md` explica la brecha actual entre Ruta 2 y los Bloques Supabase.

Este documento explica como Ruta 2 debe convertirse en genesis de produccion cuando el demo sea aprobado.

Ambos documentos son complementarios:

- el puente explica el estado tecnico/arquitectonico actual;
- este documento explica la lectura estrategica y productiva de Ruta 2;
- juntos evitan dos errores opuestos: creer que Ruta 2 ya es productiva, o descartarla como si no tuviera valor para produccion.

## 8. Relacion con BLOQUE-06

Bloque 6 sigue siendo valido como arquitectura de atributos configurables.

Sin embargo, Bloque 6 no debe asumirse aplicable funcionalmente a Ruta 2 hasta conectar primero Bloques 01 a 05.

Bloque 6 sera parte de la conversion productiva, no de la demo manual inmediata.

Lectura correcta:

```text
BLOQUE-06 define arquitectura futura de atributos configurables.
Ruta 2 valida experiencia comercial manual.
La produccion futura debera conectar primero catalogo, tipos e inventario antes de activar atributos configurables en la app.
```

## 9. Secuencia recomendada cuando un cliente apruebe Ruta 2

Cuando un cliente apruebe Ruta 2 como base de trabajo, la secuencia recomendada es:

1. Clonar o ramificar la base validada de Ruta 2.
2. Certificar que componentes visuales y funcionales se conservan.
3. Crear configuracion del cliente/proyecto.
4. Cargar catalogo base.
5. Mapear tipos comerciales.
6. Conectar inventario.
7. Incorporar atributos configurables.
8. Sustituir constantes/hardcoded por datos persistentes.
9. Validar experiencia publica.
10. Validar trazabilidad.
11. Preparar despliegue productivo.

Esta secuencia debe preservar velocidad comercial, pero sin saltarse la arquitectura rectora.

## 10. Riesgos si no se documenta esta genesis

Riesgos principales:

1. Creer que Ruta 2 ya es productiva.
2. Rehacer desde cero innecesariamente.
3. Perder aprendizajes comerciales del demo.
4. Sobrearquitecturar antes de vender.
5. Vender una demo sin plan claro de conversion.
6. Confundir datos demo con datos del cliente.
7. Confundir cliente Supabase parcial con arquitectura productiva.
8. Desconectar el trabajo de Admin/Supabase de la prioridad comercial inmediata.
9. Convertir una decision comercial urgente en deuda tecnica invisible.

## 11. Decision operativa

Decision registrada:

- Ruta 2 queda definida como prioridad comercial inmediata.
- Admin/Supabase queda definido como arquitectura rectora.
- La version productiva futura debe nacer de la convergencia entre Ruta 2 validada comercialmente y Bloques Supabase integrados funcionalmente.

Implicaciones:

- Ruta 2 debe conservarse como activo comercial.
- Bloques Supabase deben seguir como base rectora de produccion.
- La conversion productiva requiere puente explicito, no salto directo.
- Bloque 6 puede seguir como diseno arquitectonico, pero su aplicacion funcional a Ruta 2 depende de integrar antes Bloques 01 a 05.

## 12. Proximo paso recomendado

Revisar este documento junto con:

- `RUTA2-BLOQUES-SUPABASE-0001-puente-integracion.md`;
- `BLOQUE-06-project-commercial-type-attributes.sql.md`.

Luego decidir si los tres documentos se commitean juntos en un commit documental unico.

Recomendacion preliminar:

Si los tres documentos quedan aprobados, conviene commitearlos juntos porque forman una unidad de contexto:

- Bloque 6 define la arquitectura de atributos configurables;
- el puente Ruta 2 - Bloques Supabase define la brecha actual;
- este documento define la lectura estrategica de Ruta 2 como genesis productiva futura.

Ese commit conjunto evitaria publicar Bloque 6 sin el contexto comercial y operativo que explica su relacion real con Ruta 2.

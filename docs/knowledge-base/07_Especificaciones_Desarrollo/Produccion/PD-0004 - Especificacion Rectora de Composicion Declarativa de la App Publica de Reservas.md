# PD-0004 - Especificacion Rectora de Composicion Declarativa de la App Publica de Reservas

## Estado

Especificacion arquitectonica rectora para produccion futura.

Este documento formaliza el alcance que debera resolver un futuro documento tecnico completo para la App Publica de Reservas reutilizable, configurable y agnostica respecto al cliente, proyecto o activo comercial.

No autoriza desarrollo productivo, SQL, esquema definitivo de base de datos, JSON final, codigo, componentes concretos, endpoints, migraciones ni integraciones.

## 1. Proposito

La futura App Publica de Reservas debera ser una aplicacion reutilizable capaz de presentar, explicar, comparar y conducir una seleccion o reserva sobre ofertas comerciales de distintas industrias sin reescribir su marco base para cada cliente o proyecto.

La arquitectura futura debera separar con claridad tres capas coordinadas:

1. Design System H - OperIA: reglas estructurales estables de experiencia e interfaz.
2. Branding del cliente o proyecto: identidad comercial dominante y configurable.
3. Catalogo y configuracion de presentacion: contenido comercial, capacidades y reglas que determinan que secciones aplican.

La finalidad no es uniformar visualmente a los clientes bajo la marca H - OperIA. Es permitir una experiencia publica coherente, accesible y resistente a contenido variable sin competir con la identidad comercial del cliente.

## 2. Relacion con documentos rectores

PD-0004 se subordina a los fundamentos, gobernanza y restricciones vigentes, incluyendo:

- GOV-0001 y GOV-0002 para continuidad y bootstrap metodologico.
- KB-0003, KB-0004 y FO-COC-0001 para trazabilidad documental y madurez de especificaciones.
- ADR-001 y DEMO-0001 para separar Centro Demo, Ruta 2 y produccion futura.
- IME-0001 y la transicion Codex AMENA 79 a 80 para respetar prioridades vigentes y no abrir frentes no autorizados.
- FH-0001 para la funcion de H - OperIA como infraestructura de apoyo y no como sustituto del criterio o identidad de la organizacion.
- PD-0001 para arquitectura White Label y parametrizacion de cliente/proyecto.
- PD-0002 y PD-0003 para catalogo comercial, inventario, tipos, jerarquias, activos y reglas comerciales de presentacion.
- Serie ACO, serie SUPABASE, PERSISTENCIA-0001 y el paquete de pausa formal de Supabase Ruta 2 cuando una futura implementacion requiera persistencia.

PD-0004 no reemplaza PD-0001, PD-0002 ni PD-0003.

- PD-0001 define la identidad White Label y sus parametros.
- PD-0002 define la Fuente Comercial, activos y reglas comerciales de presentacion.
- PD-0003 define la jerarquia del catalogo comercial.
- PD-0004 define el contrato rector de composicion de la experiencia publica: como una interfaz estable decide mostrar, ocultar, reordenar o recomponer secciones sin vacios y sin mezclar Design System con branding.

## 3. Separacion entre Design System y branding del cliente

### 3.1 Design System H - OperIA

El Design System define reglas de experiencia reutilizables y no la identidad comercial dominante. Como minimo debera gobernar:

- geometria;
- comportamiento visual y de interaccion;
- accesibilidad;
- radios;
- sombras;
- botones;
- tarjetas;
- badges;
- estados;
- focus;
- densidad;
- ritmo visual;
- reglas responsivas;
- jerarquia funcional;
- dimensiones tactiles y consistencia de controles.

Estas reglas deben permanecer estables aunque cambie el cliente, el sector, el tipo de activo o la narrativa comercial.

### 3.2 Branding del cliente o proyecto

El branding define la identidad comercial que la persona usuaria debe percibir como principal. Como minimo debera poder definir:

- nombre;
- logotipo;
- colores;
- tipografia comercial;
- imagenes;
- videos;
- iconografia;
- favicon;
- tono narrativo;
- CTA;
- textos;
- footer;
- recursos promocionales.

El branding no debera alterar la semantica, accesibilidad, estructura o comportamiento esencial del Design System. El Design System tampoco debera imponer la paleta, marca o tono H - OperIA sobre el cliente.

### 3.3 Presencia de H - OperIA

H - OperIA sera tecnologia habilitadora secundaria y discreta. Su firma podra configurarse en footer, legal, informacion tecnologica o contexto de acompanamiento cuando aplique.

No debera competir con logotipo, hero, CTA comercial principal, fotografia, narrativa ni identidad dominante del cliente o proyecto.

## 4. Catalogo comercial agnostico

La App Publica no debe asumir vivienda ni inmobiliaria como dominio universal. Debe consumir una Fuente Comercial gobernada y poder representar, entre otros:

- casas;
- apartamentos;
- torres;
- terrenos;
- lotes;
- oficinas;
- bodegas;
- locales comerciales;
- proyectos turisticos;
- hoteles;
- vehiculos;
- maquinaria;
- espacios recreativos;
- cuerpos de agua o pequenos lagos;
- cualquier otro activo, unidad, servicio o producto comercializable.

El futuro documento tecnico debera resolver, sin fijar en este documento su implementacion fisica:

- taxonomia de tipos comerciales;
- atributos comunes;
- atributos especificos por tipo;
- variantes;
- unidades;
- disponibilidad;
- precios;
- estados;
- recursos visuales;
- especificaciones;
- relaciones entre catalogo e inventario.

La interfaz publica debera proyectar estos conceptos sin convertir nombres, rutas o jerarquias inmobiliarias en supuestos obligatorios del producto base.

## 5. Composicion condicional por proyecto

Toda seccion relevante de la experiencia publica debera poder mostrarse, ocultarse, activarse, desactivarse, reordenarse o quedar condicionada por contenido real y valido.

El alcance minimo incluye:

- hero;
- galerias;
- imagenes;
- videos;
- mapas;
- amenidades;
- especificaciones;
- modelos;
- tipologias;
- inventario;
- precios;
- disponibilidad;
- testimonios;
- ubicacion;
- recorridos;
- documentos;
- formularios;
- CTA;
- bloques promocionales;
- comparadores;
- secciones legales;
- contacto;
- acompanamiento;
- footer.

La condicion de una seccion puede depender de capacidades comerciales, contenido disponible, permisos, estado de publicacion, etapa comercial, canal o configuracion del proyecto. El futuro documento tecnico debera definir la precedencia entre estas condiciones.

## 6. Prevencion de espacios vacios y degradacion visual

La composicion condicional es un requisito de calidad, no una mejora cosmetica.

- Ninguna seccion debe renderizarse sin contenido minimo valido.
- No deben aparecer imagenes vacias, titulos sin contenido, tarjetas incompletas ni separadores huerfanos.
- La ausencia de un bloque no debe romper la continuidad, jerarquia, navegacion ni ritmo visual.
- El layout debe recomponerse automaticamente al ocultar, sustituir o limitar una seccion.
- Los fallbacks autorizados deben ser intencionales y semanticamente utiles; nunca un espacio reservado sin valor.

## 7. Configuracion declarativa

El futuro documento tecnico debera exigir una configuracion declarativa por cliente y proyecto. No se define aqui su JSON, almacenamiento ni contrato fisico final.

La configuracion debera poder controlar:

- visibilidad;
- orden;
- contenido;
- assets;
- variantes;
- dependencias;
- requisitos minimos;
- defaults;
- fallbacks;
- estados vacios;
- validacion previa a publicacion.

El principio rector es que el codigo y el marco visual base permanezcan estables, mientras lo variable se expresa mediante configuracion gobernada y contenido validado.

## 8. Dependencias entre secciones

El futuro diseno debera contemplar dependencias explicitamente verificables. Como minimo:

- una galeria no aparece sin imagenes validas;
- un mapa no aparece sin coordenadas o recurso valido;
- amenidades no aparecen sin elementos validos;
- un precio no aparece si el modelo comercial no lo permite;
- inventario no aparece sin unidades o oferta equivalente;
- el CTA se adapta segun disponibilidad y etapa comercial;
- un video no aparece sin fuente valida;
- un comparador no aparece sin elementos comparables.

Las dependencias no deben residir como excepciones dispersas en pantallas individuales. El futuro documento tecnico debera definir como se declaran, validan, explican y prueban.

## 9. Validacion, previsualizacion y publicacion

La futura arquitectura debera definir un ciclo gobernado para:

- validacion de configuracion;
- validacion de contenido;
- validacion de assets;
- previsualizacion;
- advertencias;
- errores bloqueantes;
- publicacion;
- reversion;
- auditoria;
- control de versiones;
- pruebas visuales responsivas.

Una configuracion no debera publicarse si deja secciones incompletas, rompe la experiencia en un viewport soportado, usa recursos invalidos o incumple requisitos minimos declarados.

## 10. Responsive y PWA

La App Publica debe mantener prioridad movil y compatibilidad PWA, pero no puede limitarse a un unico formato. La composicion condicional debera conservar integridad en:

- telefono;
- tablet;
- laptop;
- escritorio.

Ocultar, reordenar o sustituir una seccion no debe provocar saltos de layout, controles inaccesibles, superposiciones, perdida de contexto, targets tactiles insuficientes ni degradacion de accesibilidad en ninguno de esos formatos.

## 11. Fuera de alcance inmediato

Este documento no:

- autoriza desarrollo productivo;
- abre Bloque 6;
- reactiva Supabase;
- conecta Ruta 2;
- modifica la App Publica actual;
- altera el Centro Demo;
- cambia prioridades del demo;
- define SQL, esquema definitivo, JSON final, endpoints, migraciones, componentes concretos ni integraciones.

La pausa formal de Supabase Ruta 2 y las restricciones de la transicion vigente permanecen sin cambio.

## 12. Trabajo futuro obligatorio

Un futuro documento tecnico completo debera desarrollar y someter a revision:

- modelo de configuracion;
- contratos;
- esquema de datos;
- taxonomia;
- capacidades;
- validadores;
- renderizado condicional;
- biblioteca de componentes;
- administracion del catalogo;
- administracion de inventario;
- carga de assets;
- preview;
- publicacion;
- auditoria;
- pruebas;
- migracion desde proyectos existentes.

Tambien debera definir limites claros entre configuracion de marca, configuracion de experiencia, Fuente Comercial, inventario, actividad de reserva y evidencia operacional.

## 13. Criterios de aceptacion del futuro documento tecnico

El futuro documento tecnico se considerara suficiente solo si establece criterios verificables que aseguren, como minimo:

- ningun activo comercial esta hardcodeado como vivienda;
- ninguna seccion aparece vacia;
- todas las secciones aplicables pueden habilitarse, deshabilitarse, reordenarse o condicionarse;
- el branding puede cambiar sin tocar logica;
- el Design System permanece estable;
- la aplicacion se recompone correctamente cuando falta contenido;
- el contenido puede validarse antes de publicar;
- funciona en movil, tablet y escritorio;
- H - OperIA permanece como tecnologia secundaria;
- la configuracion, el contenido y la publicacion conservan trazabilidad, versionamiento y posibilidad de reversion.

## Criterio de cierre de PD-0004

PD-0004 queda cumplido como especificacion rectora cuando permita delimitar sin ambiguedad el alcance del futuro diseno tecnico de composicion publica, sin confundirlo con White Label, catalogo, inventario, Ruta 2, Centro Demo ni implementacion inmediata.

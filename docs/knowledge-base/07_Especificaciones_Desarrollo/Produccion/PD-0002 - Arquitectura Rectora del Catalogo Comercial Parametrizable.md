# PD-0002 - Arquitectura Rectora del Catalogo Comercial Parametrizable

## Estado

Especificacion arquitectonica rectora.

Documento creado para definir la arquitectura del Catalogo Comercial Parametrizable de H-OperIA.

Este documento no implementa codigo, no ejecuta SQL, no altera Supabase, no modifica el Centro Demo actual y no autoriza por si solo ninguna migracion, cambio de interfaz, integracion ni desarrollo funcional inmediato.

Su proposito es dejar disenada la arquitectura para una implementacion futura, incremental y gobernada, una vez concluido el Centro Demo.

## Relacion con documentos rectores

Este documento se subordina a:

- ACO-0001 a ACO-0006.
- SUPABASE-0001 a SUPABASE-0006.
- PERSISTENCIA-0001.
- PD-0001 - Arquitectura White Label y Parametrizacion de Produccion.
- ADR-001 - Marco rector del ecosistema de demostracion.
- DA-002 - ADN Corporativo y Operacional del Cliente como capa rectora del Centro Demo.
- DEMO-0001, cuando aplique al uso demostrativo.

PD-0002 no reemplaza PD-0001.

PD-0001 define la arquitectura White Label y la parametrizacion de produccion.

PD-0002 define el dominio comercial parametrizable que permite que una organizacion administre, presente y gobierne los productos, unidades, activos, atributos, disponibilidad, condiciones y reglas comerciales que seran consumidos por Reservas, Marta, H-OperIA Intelligence, Centro Demo y futuras aplicaciones productivas.

## Restricciones

Este documento no autoriza:

- crear tablas;
- modificar tablas;
- ejecutar SQL;
- crear buckets;
- subir activos;
- conectar Supabase;
- cambiar RLS;
- crear policies;
- crear triggers;
- crear funciones;
- modificar codigo;
- modificar la App Publica de Reservas;
- modificar el Centro Demo;
- redisenar pantallas existentes;
- introducir datos productivos reales;
- mezclar datos demo con datos productivos;
- hacer commits sin autorizacion humana posterior.

Cualquier implementacion futura debera tener diseno revisable, validacion humana, plan de ejecucion, plan de rollback, registro documental y trazabilidad Git.

## Vision general

El Catalogo Comercial Parametrizable es el dominio transversal de H-OperIA encargado de representar lo que una organizacion ofrece, vende, reserva, presenta, compara, explica, documenta y gobierna comercialmente.

En una empresa inmobiliaria puede representar:

- casas;
- apartamentos;
- torres;
- niveles;
- lotes;
- manzanas;
- etapas;
- modelos;
- amenidades;
- areas comunes;
- documentos descargables;
- condiciones comerciales;
- disponibilidad;
- precios;
- avance de obra;
- imagenes;
- videos;
- planos;
- ubicaciones;
- atributos tecnicos.

En otras industrias puede representar:

- vehiculos;
- maquinaria;
- paquetes de servicios;
- membresias;
- bodegas;
- terrenos;
- fincas;
- espacios comerciales;
- campos verdes;
- lagos artificiales;
- eventos;
- cursos;
- productos fisicos;
- productos digitales;
- combinaciones de productos y servicios.

La arquitectura no debe asumir que todos los proyectos venden el mismo tipo de elemento.

El Catalogo Comercial Parametrizable debe permitir que H-OperIA conserve un marco comun, mientras cada cliente, industria, proyecto o producto define sus propias estructuras, atributos, activos y reglas de presentacion.

## Diferenciación formal entre Catálogo, Inventario, Activos, Branding y Persistencia

El Catalogo Comercial Parametrizable es el dominio rector que define la Fuente Comercial de lo que una organizacion o proyecto puede ofrecer, describir, mostrar, reservar, cotizar, comparar, documentar o analizar.

Para evitar acoplamientos futuros, deben distinguirse cinco responsabilidades:

1. Catalogo:
   - define familias, tipos, modelos, productos, unidades, atributos, reglas comerciales y reglas de presentacion;
   - conserva la Fuente Comercial estructural;
   - determina que elementos existen como oferta posible;
   - gobierna la relacion entre producto, disponibilidad, precio, activos, documentos y condiciones.

2. Inventario:
   - es un subconjunto del catalogo;
   - representa elementos comercializables concretos o agrupaciones vendibles;
   - puede incluir unidades, lotes, apartamentos, casas, fincas, variantes, paquetes, cupos o servicios;
   - no debe gobernar por si solo branding, reservas, simulacion, inteligencia ni experiencia visual completa.

3. Activos:
   - representan recursos comerciales asociados al catalogo o inventario;
   - pueden incluir imagenes, videos, planos, fichas, documentos, renders, mapas, amenidades o evidencias;
   - deben distinguir activos de producto, activos de unidad, activos de amenidad, activos documentales y activos de marca;
   - no sustituyen la entidad comercial que representan.

4. Branding:
   - pertenece principalmente a PD-0001 y al dominio White Label;
   - define identidad visual, marca, presencia, colores, logotipos, tipografia, textos base y configuracion de cliente/proyecto;
   - puede relacionarse con el catalogo, pero no debe confundirse con la oferta comercial.

5. Persistencia:
   - implementa fisicamente los dominios aprobados;
   - no define por si misma la arquitectura conceptual;
   - debe seguir a documentos rectores, disenos SQL revisables, validacion humana y trazabilidad;
   - puede materializar catalogo, inventario, activos, reglas y eventos, pero no sustituye sus limites de dominio.

La Fuente Comercial pertenece al catalogo o a otro dominio rector autorizado.

La Actividad Operacional pertenece a dominios consumidores como Reservas, Mensajeria Operacional, Marta, Intelligence, Expediente Vivo, seguimiento, llamadas, documentos o evidencia.

La Actividad Operacional puede derivarse de la Fuente Comercial, pero no debe reemplazarla ni inventarla.

## Principio rector

El codigo base debe permanecer estable.

Lo variable debe vivir en configuracion gobernada.

Toda actividad operacional registrada por H-OperIA debe poder trazarse hasta una Fuente Comercial previamente definida. Ninguna reserva, interaccion, precio, disponibilidad, saldo, documento, evidencia o senal de inteligencia podra existir sin una entidad fuente identificable dentro del Catalogo Comercial Parametrizable o de otro dominio rector autorizado.

El catalogo no existe para llenar pantallas.

Existe para que cada aplicacion de H-OperIA pueda saber:

- que se ofrece;
- como se clasifica;
- donde se ubica;
- que atributos tiene;
- que disponibilidad posee;
- que precio o condicion aplica;
- que activos lo representan;
- que se puede mostrar publicamente;
- que requiere validacion humana;
- que evidencia sostiene la informacion;
- que relacion tiene con reservas, seguimiento, documentos, pagos, servicio, Marta e Intelligence.

## Naturaleza transversal del dominio

El Catalogo Comercial Parametrizable no pertenece exclusivamente a la App Publica de Reservas.

Tampoco pertenece exclusivamente al Centro Demo.

Tampoco es solo White Label.

Es un dominio transversal porque alimenta:

- App Publica de Reservas;
- App de Vendedoras;
- Mensajeria Operacional;
- Marta Texto;
- Marta Voz cuando aplique;
- H-OperIA Intelligence;
- Admin productivo;
- Centro Demo;
- dashboards;
- reportes ejecutivos;
- flujos documentales;
- flujos financieros;
- servicio al cliente;
- aprendizaje organizacional.

Sin embargo, cada consumidor debe recibir solo la vista, profundidad y permisos que le corresponden.

## Separacion entre Centro Demo y Produccion

### Centro Demo

La implementacion simplificada para Centro Demo debe permitir demostrar el valor del catalogo sin construir todavia todo el modulo productivo.

Debe poder:

- preparar una empresa demo;
- definir un proyecto demo;
- seleccionar o generar un tipo de inventario demo;
- crear datos simulados plausibles;
- asociar reservas simuladas con unidades, lotes, modelos o productos;
- mostrar activos demo suficientes para la narrativa;
- regenerar escenarios cuando sea necesario;
- auditar calidad de datos simulados;
- aprobar datos antes de inyectarlos;
- limpiar o reemplazar escenarios anteriores;
- mantener separacion demo/productiva.

La version Centro Demo puede usar datos reducidos, estructuras simplificadas, fixtures, contratos TypeScript o persistencia demo futura.

No debe presentarse como modulo productivo completo.

No debe alimentar decisiones productivas reales.

No debe convertir evidencia demo en evidencia productiva.

No debe bloquear la entrega del Demo por exigir capacidades productivas completas.

### Produccion

La arquitectura definitiva de Produccion debe permitir administrar un catalogo comercial real, gobernado y reutilizable.

Debe poder:

- crear organizaciones y proyectos reales;
- definir tipos de producto;
- definir familias comerciales;
- definir estructuras jerarquicas;
- administrar modelos;
- administrar unidades vendibles;
- administrar lotes, casas, apartamentos u otros elementos;
- registrar atributos tecnicos y comerciales;
- administrar precios y condiciones;
- administrar disponibilidad;
- administrar activos multimedia;
- definir documentos asociados;
- definir reglas de presentacion;
- validar configuraciones antes de activarlas;
- versionar cambios;
- revertir configuraciones;
- alimentar Reservas, Marta, Intelligence y aplicaciones internas;
- preservar trazabilidad y gobierno.

La version productiva no debe depender del Centro Demo.

El Centro Demo puede inspirar casos de uso, pero no gobierna el modelo productivo.

## Responsabilidades del dominio

El Catalogo Comercial Parametrizable debe ser responsable de:

1. Identidad comercial del producto o unidad.
2. Clasificacion del producto o unidad.
3. Jerarquia comercial y fisica.
4. Atributos tecnicos.
5. Atributos comerciales.
6. Disponibilidad.
7. Condiciones comerciales.
8. Activos visuales y documentales.
9. Reglas de presentacion por aplicacion.
10. Separacion demo/productiva.
11. Versionamiento.
12. Validacion.
13. Gobernanza.
14. Trazabilidad.
15. Relacion con reservas y seguimiento comercial.
16. Relacion con H-OperIA Intelligence.
17. Relacion con White Label.
18. Soporte multiindustria.

## Limites del dominio

El catalogo no debe absorber otros dominios.

No reemplaza Reservas.

No reemplaza Clientes.

No reemplaza Pagos.

No reemplaza Documentos.

No reemplaza Servicio al Cliente.

No reemplaza Expediente Vivo.

No reemplaza Evidencia Operacional.

No reemplaza H-OperIA Intelligence.

No reemplaza White Label.

No reemplaza Centro Demo.

El catalogo declara lo ofrecible y sus condiciones comerciales.

Reservas registra interes, seleccion, bloqueo, pre-reserva, reserva o formalizacion.

Expediente Vivo conecta el recorrido de un cliente o caso.

Evidencia respalda afirmaciones, cambios y decisiones.

Intelligence interpreta patrones, riesgos, oportunidades y recomendaciones.

White Label define identidad visual y parametrizacion de experiencia.

## Relacion con Reservas

La App Publica de Reservas debe consumir el catalogo, no inventarlo.

Reservas necesita saber:

- que proyectos estan visibles;
- que tipos de productos se ofrecen;
- que unidades o productos pueden seleccionarse;
- que disponibilidad tienen;
- que precio o rango aplica;
- que imagenes o activos debe mostrar;
- que documentos o condiciones deben estar visibles;
- que secciones aplican para ese proyecto;
- que campos debe solicitar;
- que restricciones existen antes de confirmar una seleccion.

Reservas no debe convertirse en la fuente maestra del inventario.

Reservas puede capturar:

- interes;
- seleccion;
- datos de contacto;
- fuente;
- estado inicial;
- evidencia de seleccion;
- fecha/hora;
- canal;
- contexto de campaña.

Pero el estado maestro de producto, disponibilidad, precio, activos y condiciones debe vivir en el Catalogo Comercial Parametrizable o en los dominios fisicos derivados de el.

## Relacion con Marta

Marta debe usar el catalogo como fuente contextual, no como autoridad autonoma.

Marta puede:

- responder preguntas sobre productos disponibles;
- explicar modelos;
- comparar opciones;
- acompañar al cliente en la seleccion;
- sugerir siguiente paso;
- aclarar documentos o condiciones;
- registrar dudas frecuentes;
- identificar intencion o preferencia;
- escalar casos sensibles a humanos.

Marta no debe:

- inventar disponibilidad;
- prometer precios no validados;
- confirmar condiciones sin fuente;
- sustituir decision humana;
- ocultar incertidumbre;
- mezclar catalogo demo con catalogo productivo;
- presentar una inferencia como hecho comercial.

Cuando Marta use informacion del catalogo, debe poder conservar:

- fuente;
- fecha de vigencia;
- nivel de certeza;
- estado de validacion;
- relacion con proyecto, producto, unidad o modelo;
- necesidad de verificacion humana cuando aplique.

## Relacion con H-OperIA Intelligence

H-OperIA Intelligence consume el catalogo para detectar:

- productos con alta demanda;
- unidades con presion comercial;
- modelos con mejor conversion;
- disponibilidad critica;
- inconsistencias entre promesas y realidad;
- oportunidades de campana;
- riesgos por baja disponibilidad;
- riesgos por informacion incompleta;
- patrones por precio, modelo, sector, etapa o amenidad;
- brechas entre inventario publicado y seguimiento humano;
- posibles contradicciones entre documentos, mensajes, reservas y catalogo.

Intelligence no debe modificar el catalogo directamente.

Puede recomendar:

- revisar disponibilidad;
- actualizar activos;
- corregir atributos;
- validar precios;
- destacar productos;
- ocultar temporalmente una unidad;
- revisar contradicciones;
- generar alertas para responsables.

Pero cualquier cambio productivo debe ser validado por responsable humano o flujo gobernado.

## Relacion con persistencia

El catalogo debera traducirse progresivamente a persistencia fisica.

La arquitectura fisica futura podria requerir entidades como:

- product_catalogs;
- product_families;
- product_types;
- project_inventory;
- product_models;
- sellable_units;
- unit_attributes;
- unit_availability;
- unit_prices;
- unit_media_assets;
- commercial_documents;
- catalog_presentation_rules;
- catalog_visibility_rules;
- catalog_versions;
- catalog_validation_events.

Estos nombres son candidatos conceptuales.

No constituyen SQL aprobado.

Tampoco constituyen obligacion de crear todas esas entidades en una primera implementacion.

El diseno fisico debera distinguir entre:

- entidades base de catalogo;
- inventario como subconjunto comercial;
- activos comerciales;
- reglas de presentacion;
- eventos de validacion;
- semillas demo;
- actividad operacional derivada;
- evidencia o senales generadas por otros dominios.

La persistencia no debe convertir actividad operacional en Fuente Comercial salvo que exista un proceso rector de validacion, migracion y aprobacion.

El diseno fisico debera definirse en una fase posterior, separada, revisable y validada.

## Relacion con White Label

White Label define la identidad visual y operativa del cliente/proyecto.

El Catalogo Comercial Parametrizable define que se ofrece y como se organiza comercialmente.

Ambos dominios se relacionan, pero no son lo mismo.

PD-0001 cubre:

- colores;
- logotipos;
- favicon;
- tipografia;
- imagenes de marca;
- presencia H-OperIA;
- parametros visuales;
- textos comerciales;
- plantillas;
- configuracion por cliente/proyecto.

PD-0002 cubre:

- tipos de productos;
- jerarquias comerciales;
- modelos;
- unidades;
- lotes;
- atributos;
- disponibilidad;
- precios;
- activos asociados a productos;
- reglas de presentacion del catalogo;
- estructura variable por industria.

Una imagen puede ser activo White Label si representa marca.

Una imagen puede ser activo de catalogo si representa producto, unidad, amenidad, plano, video o documento comercial.

El diseno futuro debera evitar duplicidad y permitir vinculos claros entre ambos dominios.

## Soporte multiindustria

El catalogo debe poder representar industrias distintas sin reescribir la aplicacion base.

Ejemplos:

### Inmobiliaria vertical

- torres;
- niveles;
- apartamentos;
- modelos;
- amenidades;
- parqueos;
- bodegas;
- vistas;
- orientacion;
- estado de avance.

### Inmobiliaria horizontal

- etapas;
- sectores;
- manzanas;
- lotes;
- casas;
- modelos de casa;
- areas verdes;
- accesos;
- urbanizacion;
- amenidades.

### Desarrollos mixtos

- torres;
- apartamentos;
- casas;
- lotes;
- comercios;
- amenidades compartidas;
- fases de entrega.

### Fincas, terrenos o campos verdes

- parcelas;
- tamanos;
- topografia;
- acceso;
- uso permitido;
- recursos naturales;
- lagos artificiales;
- caminos;
- servicios disponibles;
- restricciones.

### Productos no inmobiliarios

- categorias;
- modelos;
- variantes;
- colores;
- tallas;
- especificaciones tecnicas;
- inventario;
- disponibilidad;
- imagenes;
- videos;
- documentos;
- garantia;
- condiciones.

## Soporte para multiples tipos de productos

El catalogo debe distinguir:

- producto;
- modelo;
- variante;
- unidad vendible;
- paquete;
- servicio;
- amenidad;
- activo;
- documento;
- condicion comercial.

Una unidad vendible puede ser:

- una casa especifica;
- un apartamento especifico;
- un lote especifico;
- una finca;
- un espacio comercial;
- una membresia;
- una maquinaria;
- un producto fisico;
- un producto digital;
- un paquete de servicios.

Un modelo no siempre es una unidad.

Un producto puede tener muchas unidades.

Una unidad puede heredar atributos de un modelo y sobrescribir atributos propios.

Una amenidad puede pertenecer a un proyecto, etapa, sector, torre, manzana, producto o unidad, segun el caso.

## Reglas de presentacion

La App Publica de Reservas y otras aplicaciones deben poder mostrar u ocultar secciones segun configuracion.

El marco base de la aplicacion debe permanecer estable.

La configuracion debe decidir si se muestran:

- selector de tipo de producto;
- mapa maestro;
- sectores;
- torres;
- niveles;
- manzanas;
- lotes;
- modelos;
- unidades;
- galeria;
- videos;
- planos;
- amenidades;
- precios;
- rangos de precio;
- disponibilidad;
- documentos descargables;
- comparador;
- formulario de interes;
- flujo de reserva;
- solicitud de llamada humana;
- mensajes de Marta.

Una seccion no aplicable debe ocultarse o reemplazarse por una presentacion adecuada.

Ejemplos:

- Si el proyecto solo vende lotes, no debe mostrarse selector de torres.
- Si el proyecto vende apartamentos, puede mostrar torres y niveles.
- Si el proyecto vende casas, puede mostrar manzanas, modelos y lotes.
- Si el proyecto vende productos por talla/color, puede mostrar variantes.
- Si el proyecto vende servicios, puede mostrar paquetes y beneficios.

Ocultar una seccion no debe romper trazabilidad.

La configuracion debe declarar por que una seccion aplica o no aplica.

## Parametrización y Contrato de Presentación

El catalogo debe alimentar interfaces sin obligar a redisenar la App Publica de Reservas, las vistas internas o las experiencias asistidas por Marta para cada cliente.

Para lograrlo, debe existir un contrato de presentacion estable.

Ese contrato debe definir posiciones funcionales que puedan llenarse, ocultarse, reordenarse o adaptarse mediante configuracion.

Ejemplos de posiciones:

- encabezado comercial del proyecto;
- selector de familia o tipo de producto;
- mapa, plano o visualizador principal;
- jerarquia de ubicacion;
- listado de modelos;
- listado de unidades;
- detalle de producto;
- galeria de imagenes;
- videos;
- planos o documentos tecnicos;
- amenidades;
- atributos destacados;
- precios o rangos;
- disponibilidad;
- condiciones comerciales;
- llamadas a la accion;
- mensajes de Marta;
- evidencia o documentos descargables.

Una posicion puede estar activa, oculta, sustituida o limitada segun industria, proyecto, permisos, estado de validacion, canal, usuario o etapa comercial.

El contrato de presentacion no debe definir la logica de negocio de Reservas.

Tampoco debe definir identidad visual White Label.

Debe declarar como la Fuente Comercial se proyecta hacia pantallas, asistentes, reportes y flujos operacionales sin convertir la interfaz en fuente maestra.

La App Publica de Reservas debe conservar su marco base.

El catalogo debe permitir que ese marco muestre casas, apartamentos, lotes, fincas, amenidades, paquetes, servicios u otros productos mediante parametros, no mediante redisenos por cliente.

## Reglas de gobernanza

Toda configuracion de catalogo productivo debe tener:

- responsable;
- fecha de creacion;
- fecha de validacion;
- estado;
- version;
- fuente;
- evidencia;
- fecha de activacion;
- fecha de retiro cuando aplique;
- historial de cambios;
- motivo de cambio;
- posibilidad de reversion.

Estados minimos recomendados:

- draft;
- in_review;
- validated;
- active;
- inactive;
- archived;
- rejected.

La informacion activa debe ser distinguible de informacion historica, demo, legacy o pendiente.

## Reglas de separacion demo/productiva

El catalogo demo puede parecerse al catalogo productivo.

No debe confundirse con el.

Toda informacion demo debe conservar:

- condicion simulada;
- proposito;
- escenario;
- corrida;
- fecha de generacion;
- fuente demo;
- estado de aprobacion demo.

Toda informacion productiva debe conservar:

- fuente real;
- responsable real;
- evidencia;
- estado de validacion;
- vigencia;
- control de acceso;
- trazabilidad de cambio.

## Relación con Semillas Demo y Datos Simulados.

El Centro Demo podra utilizar datos simulados para demostrar capacidades de H-OperIA.

Dichos datos deberan derivarse siempre de una semilla inicial identificable y trazable.

La semilla demo puede provenir de:

- carga manual preparada para la demostracion;
- informacion preparada por el usuario;
- informacion publica del prospecto;
- plantilla interna aprobada;
- combinacion gobernada de las anteriores.

PD-0002 no define la logica del Motor Demo.

PD-0002 define la Fuente Comercial Parametrizable que el Motor Demo puede usar como insumo.

El Motor Demo administra:

- generacion de escenarios;
- corridas demo;
- variaciones simuladas;
- actividad operacional simulada;
- reservas simuladas;
- mensajes simulados;
- llamadas simuladas;
- seguimientos simulados;
- senales simuladas para Intelligence;
- evidencias demo;
- limpieza o regeneracion de escenarios.

El catalogo demo debe poder relacionarse conceptualmente con entidades como:

- demo_runs;
- demo_scenarios;
- demo_inventory;
- reservas simuladas;
- mensajes simulados;
- llamadas simuladas;
- seguimientos simulados;
- evidencia demo;
- senales de Intelligence en contexto demo.

Estos nombres son referencias conceptuales a dominios o estructuras demo.

No constituyen SQL aprobado.

La semilla demo define una oferta base.

La actividad operacional simulada representa comportamiento derivado de esa oferta base.

La actividad simulada no debe crear por si misma una nueva verdad comercial.

## Credibilidad y Trazabilidad de la Oferta Demo.

El Centro Demo debe ser creible sin convertirse en produccion.

Para lograrlo, ninguna unidad, lote, apartamento, casa, modelo, amenidad, precio, disponibilidad, saldo, documento, evidencia o condicion comercial demo debe existir sin una fuente inicial identificable.

La fuente inicial debe declarar, como minimo:

- origen;
- proposito;
- responsable o preparador;
- fecha de preparacion;
- escenario;
- nivel de simulacion;
- estado de aprobacion demo;
- restricciones de uso.

Cuando el Demo use informacion publica de un prospecto, debe conservar referencia de origen y separar hecho observado de inferencia generada.

Cuando el Demo use datos inventados para narrativa, debe conservar su condicion simulada.

Cuando el Demo use datos preparados por el usuario, debe conservar su condicion de insumo proporcionado.

La oferta demo puede ser plausible.

No debe presentarse como oferta productiva real.

La disponibilidad demo puede cambiar por simulacion.

Pero todo cambio simulado debe poder trazarse a una Fuente Comercial inicial y a una corrida o escenario demo.

El saldo, precio, reserva, bloqueo, documento o evidencia demo no debe sobrevivir como dato productivo sin migracion, validacion y aprobacion independiente.

## Version simplificada para Centro Demo

La primera version simplificada puede limitarse a:

- empresa demo;
- proyecto demo;
- tipo de desarrollo;
- modelos basicos;
- unidades o lotes simulados;
- disponibilidad simulada;
- precios opcionales o rangos ficticios;
- amenidades basicas;
- activos visuales minimos;
- cantidades por tipo de dato a generar;
- inyeccion de reservas simuladas;
- evidencia demo.

Cada elemento simplificado debe poder vincularse con una semilla inicial, escenario o corrida demo.

La version simplificada puede derivar actividad operacional simulada, pero no debe usar esa actividad como fuente comercial primaria.

No requiere:

- admin productivo completo;
- carga masiva;
- editor visual avanzado;
- buckets productivos;
- RLS productiva;
- versionamiento profundo;
- reglas complejas de precios;
- sincronizacion con reservas reales.

## Arquitectura definitiva para Produccion

La arquitectura definitiva debera incluir:

- cuadro maestro de catalogo;
- editor de proyectos;
- editor de tipos de producto;
- editor de modelos;
- editor de unidades vendibles;
- editor de atributos;
- editor de activos;
- editor de documentos;
- editor de amenidades;
- control de disponibilidad;
- control de precios y condiciones;
- reglas de visibilidad;
- reglas de presentacion;
- flujo de validacion;
- historial;
- auditoria;
- integracion con Reservas;
- integracion con Marta;
- integracion con Intelligence;
- integracion con White Label;
- integracion con Expediente Vivo;
- integracion con Evidencia Operacional.

El cuadro maestro productivo debera permitir captura manual, importaciones controladas, revision asistida, validacion humana, versionamiento, activacion, retiro y auditoria de cambios.

La administracion productiva podra evolucionar desde formularios simples hacia herramientas mas completas, siempre que conserve el mismo dominio rector.

La version productiva no debe depender de que el Centro Demo haya simulado previamente el mismo producto, unidad o escenario.

## Captura Asistida Futura desde Fuentes Públicas.

En etapas posteriores, H-OperIA podra incorporar capacidades de captura asistida desde fuentes publicas o materiales proporcionados por prospectos.

Esta capacidad podria ayudar a preparar una primera semilla comercial para Centro Demo o una carga inicial revisable para Produccion.

Fuentes posibles:

- sitio web publico del prospecto;
- brochures publicos;
- fichas comerciales publicas;
- publicaciones institucionales;
- imagenes o documentos proporcionados por el usuario;
- listados preparados para revision humana.

La captura asistida no debe operar como verdad automatica.

Debe producir insumos revisables.

Toda informacion capturada debe conservar:

- fuente;
- fecha de captura;
- responsable de revision;
- nivel de confianza;
- transformaciones aplicadas;
- estado de validacion;
- restricciones de uso;
- evidencia asociada cuando aplique.

El resultado de captura asistida no debe activar reservas, precios, disponibilidad, saldos o documentos sin validacion humana o flujo gobernado.

PD-0002 reconoce esta capacidad como evolucion futura.

No define scraping, agentes de extraccion, automatizacion, prompts, integraciones externas ni procesamiento tecnico.

## Evolucion por etapas

El Catalogo Comercial Parametrizable debe desarrollarse de forma incremental.

No se exige que todas las capacidades existan desde la primera implementacion.

### Etapa 0 - Especificacion arquitectonica

Objetivo:

- definir vision, limites, responsabilidades y hoja de ruta.

Resultado:

- este documento.

No implementa nada.

### Etapa 1 - Centro Demo simplificado

Objetivo:

- permitir que el Centro Demo represente empresas/proyectos demo con inventario y activos basicos sin tocar produccion.

Alcance posible:

- estructura demo minima;
- generacion de escenario;
- regeneracion;
- auditoria;
- aprobacion;
- inyeccion;
- limpieza.

Restriccion:

- no conectar a produccion real.

### Etapa 2 - Contrato de catalogo neutral

Objetivo:

- definir un contrato de datos neutral que pueda representar distintos tipos de productos.

Alcance posible:

- product types;
- product models;
- sellable units;
- attributes;
- availability;
- assets;
- presentation rules.

Restriccion:

- aun puede no existir UI productiva completa.

### Etapa 3 - Persistencia base

Objetivo:

- disenar y ejecutar un primer bloque SQL revisable para catalogo productivo.

Alcance posible:

- tablas base del catalogo;
- relaciones con organizations y projects;
- separacion demo/productiva/legacy;
- constraints minimos;
- comentarios;
- sin automatismos complejos.

Restriccion:

- requiere aprobacion humana explicita y trazabilidad documental.

### Etapa 4 - Administracion productiva inicial

Objetivo:

- permitir administrar inventario comercial real mediante un cuadro maestro basico.

Alcance posible:

- altas;
- edicion controlada;
- estados;
- validacion;
- activos;
- disponibilidad;
- reglas simples de presentacion.

Restriccion:

- no asumir automatizacion total.

### Etapa 5 - Conexion con App Publica de Reservas

Objetivo:

- alimentar la App Publica con catalogo real sin redisenar el marco principal.

Alcance posible:

- secciones visibles por configuracion;
- datos de proyecto;
- modelos;
- unidades;
- disponibilidad;
- activos;
- condiciones;
- seleccion de unidad o producto.

Restriccion:

- Reservas consume catalogo, no lo gobierna.

### Etapa 6 - Integracion con Marta

Objetivo:

- permitir que Marta consulte informacion gobernada del catalogo.

Alcance posible:

- respuestas contextuales;
- comparacion de opciones;
- explicacion de modelos;
- escalamiento humano;
- registro de dudas.

Restriccion:

- Marta no decide ni promete sin fuente valida.

### Etapa 7 - Integracion con H-OperIA Intelligence

Objetivo:

- permitir lectura ejecutiva y operacional del catalogo.

Alcance posible:

- señales de disponibilidad;
- oportunidades;
- riesgos;
- patrones de conversion;
- contradicciones;
- recomendaciones.

Restriccion:

- Intelligence recomienda; humanos validan cambios.

### Etapa 8 - Cuadro maestro productivo completo

Objetivo:

- consolidar el modulo maestro productivo.

Alcance posible:

- administracion multiempresa;
- multiindustria;
- multiusuario;
- validacion avanzada;
- auditoria;
- versionamiento;
- carga masiva;
- activos multimedia;
- reglas complejas de presentacion;
- reportes;
- integracion completa con reservas, Marta e Intelligence.

Restriccion:

- debe mantener compatibilidad con la arquitectura rectora.

## Hoja de ruta tecnica por etapas

### Ruta A - Sin tocar el Demo actual

1. Mantener el Centro Demo actual sin alteraciones.
2. Usar este documento como insumo arquitectonico.
3. Cerrar primero el Demo con su alcance vigente.
4. Evitar que el catalogo productivo retrase la presentacion.

### Ruta B - Preparacion conceptual post-Demo

1. Auditar codigo actual de Reservas, Admin y Motor Demo.
2. Identificar estructuras reales de inventario ya hardcodeadas o simuladas.
3. Mapear elementos hacia dominio neutral de catalogo.
4. Definir contrato minimo del catalogo.
5. Definir que queda demo y que queda produccion.

### Ruta C - Diseno fisico controlado

1. Disenar bloque SQL especifico para catalogo.
2. Revisar relaciones con organizations y projects.
3. Separar product catalog de reservas.
4. Separar activos de marca de activos de producto.
5. Separar disponibilidad de reserva.
6. Validar con humanos.
7. Ejecutar solo despues de aprobacion explicita.

### Ruta D - Implementacion productiva incremental

1. Crear persistencia base.
2. Crear servicio de lectura.
3. Crear vista administrativa minima.
4. Conectar App Publica en modo lectura.
5. Conectar Reservas.
6. Conectar Marta.
7. Conectar Intelligence.
8. Incorporar versionamiento y auditoria avanzada.

## Criterios de coherencia

El catalogo sera coherente si:

1. No sustituye Reservas.
2. No sustituye White Label.
3. No sustituye Expediente Vivo.
4. No mezcla demo con produccion.
5. Permite multiples industrias.
6. Permite multiples tipos de productos.
7. Soporta ocultar o mostrar secciones por configuracion.
8. Conserva trazabilidad de fuente y validacion.
9. Permite implementacion incremental.
10. No obliga a redisenar la App Publica por cada cliente.
11. Alimenta a Marta sin darle autoridad final.
12. Alimenta a Intelligence sin ocultar incertidumbre.
13. Permite administracion productiva futura.
14. Puede evolucionar desde una version demo simplificada hacia un modulo maestro productivo.
15. Distingue Catalogo, Inventario, Activos, Branding y Persistencia.
16. Distingue Fuente Comercial de Actividad Operacional.
17. Exige semilla trazable para datos demo.
18. Impide que actividad simulada se convierta en verdad comercial.
19. Mantiene el contrato de presentacion sin redisenar la App Publica por cliente.
20. Trata la captura asistida futura como insumo revisable, no como verdad automatica.

## Riesgos arquitectonicos

### Riesgo de sobrealcance

Intentar construir el modulo completo antes de cerrar el Centro Demo puede retrasar la entrega.

Mitigacion:

- separar especificacion, demo simplificado y produccion definitiva.

### Riesgo de inventario hardcodeado permanente

Usar constantes locales como solucion definitiva impediria escalar a clientes reales.

Mitigacion:

- tratar hardcode/demo como insumo temporal, no como fuente rectora.

### Riesgo de acoplar Reservas al catalogo

Si Reservas administra inventario, el dominio queda atrapado en una app.

Mitigacion:

- Reservas consume catalogo; catalogo gobierna oferta comercial.

### Riesgo de confundir activos de marca y activos de producto

Logos y colores no son lo mismo que fotos, planos, videos o documentos de una unidad.

Mitigacion:

- mantener relacion clara entre PD-0001 y PD-0002.

### Riesgo de promesas comerciales sin evidencia

Disponibilidad, precio o condiciones pueden cambiar.

Mitigacion:

- exigir fuente, vigencia, responsable, validacion y estado.

### Riesgo de convertir demo en produccion

Una corrida demo no valida disponibilidad real.

Mitigacion:

- preservar separacion demo/productiva y etiquetas de simulacion.

### Riesgo de actividad operacional sin fuente comercial

Reservas, mensajes, llamadas, seguimientos, documentos o senales de Intelligence podrian generarse sin entidad fuente identificable.

Mitigacion:

- exigir trazabilidad desde toda actividad operacional hacia una Fuente Comercial o dominio rector autorizado.

### Riesgo de semilla demo no trazable

Un escenario demo podria parecer realista aunque sus unidades, precios, saldos o disponibilidad no tengan origen declarado.

Mitigacion:

- exigir semilla inicial, escenario, corrida, fuente, estado de aprobacion y condicion simulada.

### Riesgo de confundir captura asistida con verdad comercial

La informacion extraida desde fuentes publicas o materiales de prospectos podria contener errores, omisiones o datos desactualizados.

Mitigacion:

- tratar captura asistida como insumo revisable y exigir validacion humana antes de activar oferta, precio, disponibilidad, saldo o documento.

## Decisiones rectoras

1. El Catalogo Comercial Parametrizable sera un dominio transversal.
2. Su primera implementacion no debera ser completa.
3. El Centro Demo podra usar una version simplificada.
4. Produccion requerira un modulo maestro gobernado.
5. La App Publica de Reservas debera consumir catalogo, no gobernarlo.
6. Marta podra consultar catalogo, pero no prometer sin fuente valida.
7. Intelligence podra interpretar catalogo, pero no modificarlo directamente.
8. White Label y Catalogo Comercial son dominios relacionados pero distintos.
9. El catalogo debera soportar multiples industrias y tipos de productos.
10. Toda traduccion fisica futura requerira diseno SQL revisable y aprobacion humana.
11. El inventario sera tratado como subconjunto del catalogo, no como dominio equivalente.
12. Los activos comerciales deberan distinguirse de los activos de marca.
13. La Fuente Comercial debera distinguirse de la Actividad Operacional.
14. El Centro Demo podra usar datos simulados derivados de semilla trazable.
15. El Motor Demo administrara la simulacion; PD-0002 no define esa logica.
16. La captura asistida futura desde fuentes publicas sera insumo revisable, no verdad automatica.

## Cierre

PD-0002 queda cumplido si permite entender como H-OperIA debe evolucionar desde una demostracion comercial con inventario simplificado hacia un Catalogo Comercial Parametrizable productivo, multiempresa, multiindustria y gobernado.

Este documento prepara arquitectura.

No implementa el modulo.

No altera el Centro Demo.

No retrasa la entrega del Demo.

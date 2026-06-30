# PD-0001 - Arquitectura White Label y Parametrizacion de Produccion

## Estado

Proyecto pendiente de desarrollo de produccion.

No forma parte del Demo Ejecutivo actual.

No pertenece al modulo Constructor de Escenarios del Centro Demo.

## Objetivo

Disenar una arquitectura de parametrizacion para que las aplicaciones productivas de H-OperIA puedan adaptarse a la identidad visual y operativa de cada cliente o proyecto sin modificar manualmente el codigo fuente.

## Naturaleza del proyecto

Este proyecto pertenece al producto de produccion.

Su proposito es configurar clientes reales.

No crea escenarios temporales de demostracion.

No debe depender del Centro Demo.

## Principio rector

El codigo debe permanecer estable.

Lo variable debe gestionarse mediante configuracion.

## Elementos parametrizables

La arquitectura debera permitir parametrizar:

- Nombre del cliente.
- Nombre del proyecto.
- Logotipo.
- Favicon.
- Colores primarios.
- Colores secundarios.
- Color de acento.
- Fondo.
- Tipografia.
- Fotografias.
- Banners.
- Textos comerciales.
- Modelos o productos.
- Precios.
- Inventario.
- Plantillas de correo.
- Plantillas de WhatsApp.
- Mensajes de Marta.
- Terminos visibles.
- Enlaces.
- Documentos descargables.

## Arquitectura visual

Las aplicaciones productivas podran adoptar la identidad del cliente o proyecto.

Sin embargo, H-OperIA debera conservar presencia como plataforma tecnologica.

Ejemplo conceptual:

Cliente / Proyecto

Gestion de Reservas

Impulsado por H-OperIA

## Aplicaciones impactadas

La parametrizacion debera aplicar, segun corresponda, a:

- App Publica de Reservas.
- App de Vendedoras.
- Mensajeria Operacional.
- Admin productivo.
- Marta.
- H-OperIA Intelligence.
- Correos.
- WhatsApp.

## Centro de Mando

El diseno actual del Centro de Mando se considera exitoso.

No debera modificarse visualmente salvo autorizacion expresa.

## Configuracion por cliente y proyecto

Debe soportarse:

- Un cliente con un proyecto.
- Un cliente con multiples proyectos.
- Proyectos con identidades visuales distintas dentro del mismo cliente.
- Configuracion heredada desde cliente hacia proyecto.
- Sobrescritura visual por proyecto cuando sea necesario.

## Mecanismo tecnico sugerido

Usar variables de configuracion como:

- brandPrimary
- brandSecondary
- brandAccent
- brandBackground
- brandText
- clientLogo
- projectLogo
- poweredByHoperia
- projectImages
- commercialTexts
- pricingConfig
- inventoryConfig

Estas variables podran vivir inicialmente en archivos de configuracion y posteriormente en Supabase.

## Integracion con Supabase

En produccion, la configuracion debera persistirse de manera estructurada.

Posibles entidades:

- clients
- projects
- project_branding
- project_inventory
- project_assets
- project_messages
- project_documents
- project_ai_context

## Validacion

Toda configuracion productiva debera pasar por validacion antes de activarse.

Validar:

- Coherencia visual.
- Contraste.
- Existencia de imagenes.
- Existencia de textos obligatorios.
- Formatos de precios.
- Links.
- Logos.
- Plantillas de mensajes.
- Campos minimos.

## Gobernanza

Cada configuracion debera tener:

- version;
- fecha de activacion;
- responsable;
- estado;
- historial de cambios;
- posibilidad de reversion.

## Relacion con el Plan Maestro

Este proyecto:

- Pertenece al desarrollo de produccion.
- Debe abordarse despues del Demo Ejecutivo.
- No debe confundirse con el Constructor de Escenarios del Centro Demo.
- Permitira que H-OperIA escale a clientes reales sin redisenar manualmente cada aplicacion.
- Sera clave para convertir H-OperIA en una plataforma multiempresa y multiproyecto.

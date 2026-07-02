# TRANSICION - Codex AMENA 59 a Codex AMENA 60

Fecha de generacion: 2026-07-02 12:51

Documento de transicion generado al cierre operativo de Codex AMENA 59, conforme a la Fase de Cierre del Chat definida en KB-0003.

Este documento prepara la continuidad hacia Codex AMENA 60 desde la Base de Conocimiento rectora ubicada en:

C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base

---

## Estado Git

### AMENA_Comalapa

* Repositorio: C:\Amena\Codex\AMENA_Comalapa
* Rama: centro-mando-admin10
* HEAD: eabe782 docs: add VAPI-0001 recording migration audit plan
* HEAD == origin/centro-mando-admin10: si
* Working tree: limpio antes de crear este documento de transicion

Ultimos commits relevantes:

* eabe782 docs: add VAPI-0001 recording migration audit plan
* 954693d docs: align bootstrap protocol with knowledge continuity governance
* 9bcfbbe docs: clarify knowledge base governance across repositories
* c0d0f61 docs: add transition document for Codex AMENA 58
* 442e1f9 docs: clarify chat closure transition procedure

### AMENA_Reservas_Publica_Codex_260602

* Repositorio: C:\Amena\Codex\AMENA_Reservas_Publica_Codex_260602
* Rama: feature/complete-tracking-funnel
* HEAD: 7d6b957 feat: show reservation continuity in post-reservation flow
* HEAD == origin/feature/complete-tracking-funnel: si
* Working tree: modificado, con src/App.tsx pendiente de validacion manual y sin commit

Ultimos commits relevantes:

* 7d6b957 feat: show reservation continuity in post-reservation flow
* 75d2c8d fix: normalize post-reservation navigation
* 0e50e92 fix: add vite environment type declarations
* 5e6f1b7 fix: unify reservations browser branding h-operia
* 864828b fix: support reservations dated subfolder deployment

---

## Trabajo concluido

Durante Codex AMENA 59 se concluyo trabajo documental de gobernanza y continuidad en AMENA_Comalapa:

* Fortalecimiento de KB-0003 para aclarar que la Base de Conocimiento oficial reside actualmente en C:\Amena\Codex\AMENA_Comalapa\docs\knowledge-base y aplica como fuente rectora para todos los repositorios del ecosistema.
* Fortalecimiento de GOV-0002 para incorporar la Etapa 0 - Reconstruccion del Contexto obligatoria antes de cambiar al repositorio operativo.
* Incorporacion de VAPI-0001 como pendiente tecnico prioritario para auditar la migracion de descarga autenticada de grabaciones de Marta/Vapi antes del 15 de julio de 2026.
* Actualizacion de IME-0001 para registrar el pendiente IME-010 | VAPI-0001.
* Publicacion en GitHub de los documentos concluidos en AMENA_Comalapa hasta eabe782.

Tambien se trabajo en AMENA_Reservas_Publica_Codex_260602 sobre una propuesta no confirmada todavia para replantear AcompanamientoAmenaScreen como mapa de opciones. Ese cambio permanece sin commit y requiere validacion manual antes de cualquier decision.

---

## Decisiones arquitectonicas nuevas

### Acompanamiento Inteligente

El mapa conceptual fue aprobado como direccion de producto.

La pantalla Acompanamiento Inteligente debe funcionar como un mapa de opciones, no como una ruta unica ni como pantalla de ejecucion lineal.

Dos rutas principales:

* Continuar con Marta.
* Continuar con un asesor.

Cada ruta contiene subopciones.

El mapa sera el punto permanente de regreso para que el cliente pueda utilizar una, varias o todas las opciones disponibles, en el orden que prefiera.

### Marta

Marta es un unico agente.

Marta es multicanal:

* texto;
* voz;
* futuro Web Widget.

El canal no cambia el expediente. Texto, voz o Web Widget deben alimentar la misma continuidad conceptual del cliente y no deben crear expedientes separados por canal.

### Refinamiento Inteligente

La IA:

* NO vende;
* NO negocia;
* NO ofrece soluciones;
* NO promete resultados;
* NO asume compromisos.

Su unica funcion consiste en ayudar al cliente a construir un expediente de requerimientos mediante una conversacion natural de descubrimiento y refinamiento.

Ese expediente sera entregado posteriormente al equipo humano.

### Transparencia

La IA debe explicar antes de iniciar la conversacion:

* cual es su funcion;
* cuales son sus limites;
* que el expediente sera revisado por un humano.

La IA debe repetir ese mismo principio al finalizar la conversacion.

### WhatsApp

El mensaje consolidado de WhatsApp NO se enviara inmediatamente despues de reservar la unidad.

Se enviara unicamente al finalizar todo el recorrido de acompanamiento.

Debe incluir:

* confirmacion memorable;
* resumen consolidado;
* proximos pasos;
* enlace permanente al Web Widget de Marta.

### Datos de contacto

Los datos utilizados para el seguimiento provienen exclusivamente del registro inicial de la aplicacion.

No volveran a solicitarse durante el flujo.

---

## Pendientes abiertos

* Implementar navegacion funcional del mapa de Acompanamiento Inteligente.
* Activar todos los botones del mapa sin romper la arquitectura aprobada.
* Separar las tarjetas de:
  * datos de contacto;
  * confirmacion de recepcion del WhatsApp.
* Redisenar completamente la pantalla de Refinamiento Inteligente.
* Documentar la gobernanza de los agentes inteligentes.
* Crear el dominio documental de Gobernanza IA.
* Evaluar arquitectura definitiva del Web Widget de Marta.
* Mantener Vapi como arquitectura preferida hasta nueva evaluacion.
* Validar manualmente la propuesta actual no commiteada en src/App.tsx de Reservas antes de aprobar, ajustar, descartar o commitear.
* Mantener VAPI-0001 como pendiente de alta prioridad para auditoria inmediatamente despues de estabilizar Centro Demo y antes del 15 de julio de 2026.

---

## Proximo objetivo

La primera microcirugia de AMENA 60 sera:

Implementar completamente la navegacion del mapa de Acompanamiento Inteligente sin alterar la arquitectura aprobada.

Condiciones iniciales para AMENA 60:

1. Reconstruir contexto desde AMENA_Comalapa segun KB-0003 y GOV-0002.
2. Confirmar estado Git de AMENA_Comalapa.
3. Confirmar estado Git de AMENA_Reservas_Publica_Codex_260602.
4. Revisar el cambio pendiente en src/App.tsx antes de decidir si se ajusta, se restaura o se convierte en commit.
5. No tocar Supabase, servicios externos, API keys ni integraciones Vapi sin autorizacion expresa.

---

## Documentos que debe leer Codex AMENA 60

Como minimo:

* docs/knowledge-base/98_Work_In_Progress/IME-0001 - Indice Maestro de Ejecucion.md
* docs/knowledge-base/00_Gobernanza/GOV-0001 - Sistema de Continuidad del Conocimiento.md
* docs/knowledge-base/00_Gobernanza/GOV-0002 - Protocolo de Inicializacion de Nuevos Proyectos y Bootstrap Metodologico.md
* docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0003 - Especificacion de Continuidad del Conocimiento entre Chats.md
* docs/knowledge-base/07_Especificaciones_Desarrollo/KB-0004 - Arquitectura de Madurez del Conocimiento.md
* docs/knowledge-base/98_Work_In_Progress/VAPI-0001 - Auditoria y migracion de descarga autenticada de grabaciones de Marta.md
* Este documento de transicion.

---

## Advertencias operativas

* No asumir que la propuesta actual de AcompanamientoAmenaScreen esta aprobada para commit.
* No hacer commit en Reservas sin validacion manual del usuario.
* No probar Vapi con credenciales reales todavia.
* No exponer API keys en documentos, logs, commits ni capturas.
* No mover la Base de Conocimiento fuera de AMENA_Comalapa sin microcirugia documental/tecnica especifica.

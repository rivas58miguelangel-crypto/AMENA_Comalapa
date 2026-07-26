# TRANSICIÓN CODEX AMENA 86 → 87

## 1. Propósito

Registrar la transición formal del chat operativo Codex AMENA 86 hacia Codex AMENA 87, dejando certificado el estado del proyecto, decisiones tomadas, commits publicados, riesgos pendientes, restricciones vigentes y próximo objetivo recomendado.

Este documento no implementa código, no toca App Pública, no toca backend, no toca Supabase, no toca WhatsApp, no opera Meta, no opera Dokploy, no modifica `package.json`, no modifica `.env`, no instala dependencias y no autoriza despliegues.

## 2. Protocolos aplicados

Transición preparada conforme a:

- `KB-0003`
- `FO-COC-0001`
- `ADR-002`
- `REG-0001`
- `CF-0001`

## 3. Estado certificado de repositorios

### Repositorio rector / Centro Demo

Ruta:

`C:\Amena\Codex\AMENA_Comalapa`

Rama:

`centro-mando-admin10`

HEAD certificado:

`ad265af54e29382759b1347b2de2b1b8f2e87c4b`

Último commit:

`feat: show demo live file simulated movements`

Estado:

- HEAD == `origin/centro-mando-admin10`
- Ahead/behind: `0 0`
- Working tree: limpio

### App Pública Ruta 2

Ruta:

`C:\Amena\Codex\AMENA_Reservas_Publica_Ruta2`

Rama:

`codex/ruta-2-reservas-generico-manual`

HEAD certificado:

`7c6121e6387a2ce8959b010909e854551b4dfa08`

Último commit:

`feat: prepare simulated case 2 whatsapp closure flow`

Estado:

Limpio / sincronizado según certificación previa.

### Backend Demo API

Ruta:

`C:\Amena\Codex\AMENA_Demo_API`

Rama:

`main`

HEAD certificado:

`c43ed25a62879dbab7df5789d6bd5c347e524f0b`

Estado:

Endpoint Caso 2 preparado, no conectado desde App Pública.

Endpoint:

`POST /send-reservation-summary-whatsapp`

## 4. Commits y documentos recientes publicados

### A. UI/estado simulado Caso 2 publicado

Commit:

`2b621877bb98465d4f36ad256338df9c383ee6fa`

Mensaje:

`docs: record simulated case 2 whatsapp closure flow`

Documento:

`docs/knowledge-base/98_Work_In_Progress/META-WHATSAPP-CASO2-0003-ui-estado-simulado-cierre-publicado.md`

### B. Documento rector Expediente Vivo / movimientos simulados

Commit:

`756e6d89320b1250d03e88c43894a35fab467964`

Mensaje:

`docs: define demo live file simulated movements`

Documento:

`docs/knowledge-base/98_Work_In_Progress/CENTRO-DEMO-EXPEDIENTE-VIVO-0004-movimientos-simulados-post-reserva.md`

### C. Microcirugía visual Expediente Vivo demo

Commit:

`ad265af54e29382759b1347b2de2b1b8f2e87c4b`

Mensaje:

`feat: show demo live file simulated movements`

Archivo:

`src/App.tsx`

Alcance:

Visualización fixture/local demo del Expediente Vivo demo con movimientos simulados post-reserva.

## 5. WhatsApp / Meta

Plantilla Caso 1:

`h_operia_demo_reservation_link`

Estado:

En revisión.

Plantilla Caso 2:

`h_operia_reservation_summary`

Estado:

En revisión.

Decisión vigente:

Mientras ambas plantillas sigan en revisión, no activar envío real WhatsApp.

Caso 2:

El flujo UI/estado está preparado en App Pública Ruta 2 como simulado, pero no conecta backend ni envía WhatsApp real.

MartaLink:

No es centro técnico ni operativo del Caso 2. Es solo variable secundaria útil dentro de la plantilla. Si el cliente usa ese enlace en el futuro, bien. Si no lo usa, no afecta el cierre ni el expediente.

## 6. App Pública Ruta 2

Commit:

`7c6121e6387a2ce8959b010909e854551b4dfa08`

Mensaje:

`feat: prepare simulated case 2 whatsapp closure flow`

Alcance:

UI/estado simulado para WhatsApp Caso 2 al cierre final.

Incluye:

- preparación visual de confirmación;
- `provider_accepted` como aceptación del proveedor, no entrega;
- pregunta de recepción;
- reintento controlado;
- salida con seguimiento humano;
- sin envío real;
- sin backend;
- sin endpoint real.

## 7. Centro Demo / Expediente Vivo

Commit:

`ad265af54e29382759b1347b2de2b1b8f2e87c4b`

Mensaje:

`feat: show demo live file simulated movements`

Alcance:

`src/App.tsx` agrega visualización fixture/local del Expediente Vivo demo con movimientos simulados post-reserva.

Restricciones preservadas:

- no conecta backend;
- no conecta Supabase;
- no conecta WhatsApp;
- no opera Meta;
- no opera Dokploy;
- no toca App Pública;
- no usa datos reales;
- muestra `demo_run_id`, `reservation_id` y `expediente_id`;
- `demo_movement_count = 7` como ejemplo configurable;
- `7` no es regla fija;
- `20` datos simulados tampoco es regla fija;
- teléfono, correo y WhatsApp son canales, no identidad principal.

## 8. Cadena operativa vigente

Decisión conceptual vigente:

```text
información recibida
→ verificación
→ ordenamiento
→ análisis
→ recomendación
→ acción sugerida humana
```

Aclaraciones:

- los movimientos simulados deben entrar al Expediente Vivo del cliente;
- las acciones sugeridas deben mostrarse dentro del expediente;
- H - OperIA Intelligence sugiere acciones;
- la IA no decide ni ejecuta automáticamente.

## 9. Observaciones humanas recientes

El usuario entregó observaciones críticas sobre la página de Expediente Vivo:

- eliminar lista/cuadro de clientes visible como reporte no solicitado;
- reemplazar por buscador simple;
- mientras no se seleccione cliente, la parte inferior debe quedar en blanco;
- al seleccionar cliente, el expediente aparece debajo y crece hacia abajo;
- evitar información confusa;
- evitar tabla pesada para vendedores;
- los movimientos simulados deben mostrarse de forma práctica y trazable dentro del expediente.

## 10. Decisión estratégica sobre Capa 00 / Proyecto Demo

El usuario identificó una Génesis 0:

Proyecto Demo simulado / lógica del proyecto inmobiliario.

Incluye conceptualmente:

- terreno;
- sectores;
- manzanas;
- lotes;
- torres;
- niveles;
- unidades;
- modelos;
- precios;
- disponibilidad;
- amenidades;
- activos comerciales;
- reglas comerciales mínimas.

Pero se decidió no abrir ahora ese frente como desarrollo.

Decisión vigente:

Para la demo actual, la Capa 00 se explicará verbalmente como narrativa:

> Para esta demostración, el proyecto inmobiliario ya fue precargado como Proyecto Demo simulado. Por eso la App Pública puede mostrar unidades, modelos, sectores, precios y amenidades. Hoy no estamos demostrando la creación del proyecto, sino lo que ocurre desde la reserva hasta el Expediente Vivo y la inteligencia operativa.

Restricciones de esta decisión:

- no crear documento `0005` todavía;
- no hacer microcirugía de Capa 00 todavía;
- no construir base de datos;
- no extraer URL real;
- no abrir inventario real;
- no tocar Supabase.

## 11. Microcorrección local descartada

Se aplicó localmente una microcorrección de tildes/copy en `src/App.tsx`, pero no fue commiteada ni pusheada.

Luego se descartó mediante:

```bash
git restore -- src/App.tsx
```

Resultado:

Repositorio limpio en HEAD `ad265af54e29382759b1347b2de2b1b8f2e87c4b`.

## 12. Próximo objetivo recomendado

El siguiente chat debe iniciar con validación visual humana del Centro Demo publicado.

Prioridad:

1. Levantar Centro Demo local.
2. Revisar vista Expediente Vivo demo.
3. Confirmar si el bloque nuevo ayuda o confunde.
4. Detectar solo ajustes imprescindibles para presentación.
5. Evitar nuevas arquitecturas grandes antes de tener el demo presentable.

No iniciar todavía:

- Capa 00 como desarrollo;
- base de datos;
- extracción desde URL;
- Supabase;
- conexión real WhatsApp;
- nuevos documentos rectores, salvo decisión explícita;
- microcirugías amplias.

## 13. Riesgos pendientes

Riesgos a vigilar:

- que el bloque de movimientos se vea demasiado tabular;
- que Expediente Vivo aún muestre lista de clientes como reporte;
- que no esté clara la diferencia entre cliente existente y génesis de cliente nuevo;
- que Capa 00 abra un frente demasiado grande;
- que Meta siga sin aprobar plantillas;
- que el demo se demore por solicitudes no esenciales.

## 14. Recomendación de transición

El nuevo chat debe reconstruir contexto desde este documento de transición y comenzar por validación visual local del Centro Demo, no por nueva arquitectura.

La prioridad inmediata no es crear más capas, documentos o integraciones. La prioridad es mirar el demo publicado, decidir si comunica bien y aplicar solo ajustes imprescindibles para presentación.

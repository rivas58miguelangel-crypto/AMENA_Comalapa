# Architecture Decisions

## DA-001 - Separacion de agentes y canales

Estado: Propuesta inicial  
Fecha: 2026-06-16  
Contexto: AMENA_Comalapa / Centro de Mando Admin

### Contexto

El Centro de Mando Admin ya representa una demo local/mock donde Marta, Vapi, WhatsApp texto y H-OperIA Intelligence aparecen cerca dentro del flujo operativo. Esa cercania visual no debe convertirse en confusion arquitectonica: cada agente y cada canal debe tener responsabilidad propia, datos propios y limites claros.

La decision separa tres capacidades:

- Marta Voz, basada en Vapi, para llamadas de voz.
- Marta Texto, motor propio de H-OperIA, para WhatsApp texto y futuro widget web.
- H-OperIA Intelligence, agente separado para analisis interno, senales y recomendaciones.

### Decision

1. Marta Voz = Vapi = llamadas de voz.
   - Marta Voz usa Vapi para interacciones telefonicas o de voz.
   - Vapi no debe convertirse en el motor principal de WhatsApp texto.
   - Los logs tecnicos de Vapi se preservan completos en una tabla propia.

2. Marta Texto = motor propio H-OperIA.
   - Marta Texto atendera WhatsApp texto y el futuro widget web.
   - WhatsApp texto no depende de Vapi.
   - Marta Texto usara backend propio y Supabase.
   - Marta Voz y Marta Texto pueden compartir memoria conversacional cuando aplique.

3. H-OperIA Intelligence = agente separado.
   - H-OperIA Intelligence analiza informacion operacional.
   - Genera senales, riesgos, tareas, reportes y recomendaciones.
   - Atiende consultas internas, especialmente modo Premium Director General.
   - Director General Premium consulta a H-OperIA Intelligence, no a Marta.
   - H-OperIA Intelligence no debe confundirse con Marta.

### Alcance

Esta decision aplica a:

- Centro Demo del Admin.
- Futuras integraciones con Vapi.
- Futuras integraciones de WhatsApp texto.
- Futuro widget web de Marta Texto.
- Diseno de tablas Supabase relacionadas con conversaciones, logs, memoria, evidencias y senales.
- Modo Premium Director General y consultas internas.

### No Decisiones

Esta decision no implementa todavia:

- Conexion real con Vapi.
- Consulta real a APIs de Vapi.
- Envio real de WhatsApp.
- Backend propio de Marta Texto.
- Tablas Supabase nuevas.
- Migraciones SQL.
- Retiro del fallback local/mock.

### Implicaciones Tecnicas

- Los Vapi logs deben almacenarse completos en una tabla propia, por ejemplo `demo_vapi_call_logs` para demo y `vapi_call_logs` para produccion.
- Marta Texto debe tener almacenamiento propio para conversaciones y mensajes de texto, independiente de Vapi.
- La memoria conversacional compartida debe relacionarse por cliente, reserva, organizacion y, en demo, por `demo_run_id`.
- H-OperIA Intelligence debe consumir datos operacionales de varias fuentes, no reemplazar a Marta.
- `operational_records` es bitacora/evidencia transversal, no storage canonico unico.
- Los datos canonicos deben vivir en tablas propias segun su dominio: llamadas Vapi, conversaciones texto, reservas, reportes, senales y evidencias.

### Modelo De Datos Implicado

Tablas o familias de tablas esperadas:

- `demo_vapi_call_logs` y `vapi_call_logs`
- `marta_text_conversations`
- `marta_text_messages`
- `conversation_memory`
- `intelligence_signals`
- `operational_evidence`
- `operational_records`

En demo, las tablas deben poder relacionarse por `demo_run_id`. En produccion, deben relacionarse por `organization_id`, `client_id`, `reservation_id` y otros identificadores canonicos del dominio.

### Reglas De Producto

- Marta Voz atiende voz y conserva evidencia tecnica de llamadas.
- Marta Texto atiende WhatsApp texto y futuro widget web.
- WhatsApp texto no depende de Vapi.
- Marta Voz y Marta Texto pueden compartir memoria conversacional si existe relacion operacional valida.
- H-OperIA Intelligence analiza, resume, prioriza y recomienda para usuarios internos.
- H-OperIA Intelligence no habla como Marta con clientes finales.
- Director General Premium consulta a H-OperIA Intelligence, no a Marta.
- La demo actual local/mock no debe borrarse todavia.

### Consecuencias

Consecuencias positivas:

- Evita acoplar WhatsApp texto a Vapi.
- Preserva logs tecnicos de voz sin perder payloads o salidas estructuradas.
- Permite evolucionar Marta Texto con backend propio.
- Permite que H-OperIA Intelligence use datos conversacionales sin confundirse con el agente conversacional.
- Mantiene una ruta clara desde demo local hacia persistencia Supabase.

Riesgos y deuda tecnica:

- Habra mas tablas y servicios que coordinar.
- La memoria compartida debe disenarse con cuidado para evitar duplicidad o mezcla indebida de contextos.
- La UI actual aun mezcla visualmente Marta, Vapi e Intelligence; debe mantenerse clara al conectar datos reales.
- El fallback local/mock debe conservarse hasta que la persistencia y lectura Supabase sean estables.

Proximos pasos sugeridos:

- Definir SQL revisable para `demo_vapi_call_logs` y `vapi_call_logs`.
- Definir tablas de Marta Texto y memoria conversacional.
- Definir un servicio de persistencia opcional para la demo local.
- Conectar Supabase de forma incremental sin romper el flujo visual actual.

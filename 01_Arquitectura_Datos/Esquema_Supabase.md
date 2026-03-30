# ESQUEMA DE BASE DE DATOS - AMENA SAAS
## Tabla: Inventario_Global (1,400 registros)
- unit_id: UUID (Llave primaria)
- category: ENUM ('Casa', 'Apartamento')
- model: STRING (Aura, Amanecer, etc.)
- status: ENUM ('Disponible', 'Pre-reservado', 'Vendido')
- price_current: DECIMAL
- last_update: TIMESTAMP

## Tabla: Log_Llamadas_IA (Integración Vapi)
- call_id: UUID
- lead_phone: STRING
- sentiment_analysis: STRING (Interesado, No interesado, Dudoso)
- appointment_date: TIMESTAMP (Sincronizado con GHL)

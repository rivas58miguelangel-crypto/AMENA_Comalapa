import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import type {
  DocumentRecord,
  InteractionRecord,
  OperationalRecord,
  OperationalRecordStatus,
  OperationalRecordType,
  OperationalSummary,
  PaymentRecord,
} from '../types/operationalRecord';

type RawOperationalRecord = Record<string, unknown>;

const demoOperationalRecords: OperationalRecord[] = [
  {
    id: 'demo-interaction-001',
    type: 'interaction',
    title: 'WhatsApp de seguimiento financiero',
    clientName: 'Carlos Mendez',
    status: 'in_progress',
    createdAt: '2026-05-20T10:21:00.000Z',
    channel: 'whatsapp',
    priority: 'medium',
    notes: 'Consulta sobre monto pendiente y copia a decisor secundario.',
  },
  {
    id: 'demo-document-001',
    type: 'document',
    title: 'Constancia laboral recibida',
    clientName: 'Ana Lopez',
    status: 'observed',
    createdAt: '2026-05-20T11:10:00.000Z',
    documentName: 'Constancia laboral',
    documentStatus: 'observed',
    dueDate: '2026-05-22',
  },
  {
    id: 'demo-payment-001',
    type: 'payment',
    title: 'Compromiso de prima inicial',
    clientName: 'Maria Fernanda',
    status: 'pending',
    createdAt: '2026-05-20T12:00:00.000Z',
    amount: 5000,
    currency: 'USD',
    dueDate: '2026-05-24',
  },
];

const fallbackRecords = (): OperationalRecord[] => demoOperationalRecords;

const textValue = (value: unknown, fallback = ''): string =>
  typeof value === 'string' && value.trim() ? value : fallback;

const numberValue = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const normalizeStatus = (value: unknown): OperationalRecordStatus => {
  const status = textValue(value, 'pending');
  return ['pending', 'in_progress', 'completed', 'observed', 'overdue'].includes(status)
    ? (status as OperationalRecordStatus)
    : 'pending';
};

const normalizeType = (value: unknown): OperationalRecordType => {
  const type = textValue(value, 'interaction');
  return ['interaction', 'document', 'payment'].includes(type)
    ? (type as OperationalRecordType)
    : 'interaction';
};

const mapOperationalRecord = (row: RawOperationalRecord): OperationalRecord => {
  const type = normalizeType(row.type);
  const base = {
    id: textValue(row.id, crypto.randomUUID()),
    type,
    title: textValue(row.title, 'Registro operacional'),
    clientName: textValue(row.clientName ?? row.client_name, 'Cliente sin nombre'),
    status: normalizeStatus(row.status),
    createdAt: textValue(row.createdAt ?? row.created_at, new Date().toISOString()),
    updatedAt: textValue(row.updatedAt ?? row.updated_at, undefined),
    notes: textValue(row.notes, undefined),
  };

  if (type === 'document') {
    return {
      ...base,
      type,
      documentName: textValue(row.documentName ?? row.document_name, 'Documento'),
      documentStatus: textValue(row.documentStatus ?? row.document_status, 'expected') as DocumentRecord['documentStatus'],
      dueDate: textValue(row.dueDate ?? row.due_date, undefined),
    };
  }

  if (type === 'payment') {
    return {
      ...base,
      type,
      amount: numberValue(row.amount),
      currency: textValue(row.currency, 'USD'),
      dueDate: textValue(row.dueDate ?? row.due_date, undefined),
      paidAt: textValue(row.paidAt ?? row.paid_at, undefined),
    };
  }

  return {
    ...base,
    type,
    channel: textValue(row.channel, 'system') as InteractionRecord['channel'],
    priority: textValue(row.priority, undefined) as InteractionRecord['priority'],
  };
};

const buildSummary = (records: OperationalRecord[], source: OperationalSummary['source']): OperationalSummary => ({
  total: records.length,
  interactions: records.filter((record) => record.type === 'interaction').length,
  documents: records.filter((record) => record.type === 'document').length,
  payments: records.filter((record) => record.type === 'payment').length,
  pending: records.filter((record) => record.status === 'pending' || record.status === 'in_progress').length,
  overdue: records.filter((record) => record.status === 'overdue').length,
  source,
});

export async function getOperationalRecords(): Promise<OperationalRecord[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackRecords();
  }

  try {
    const { data, error } = await supabase
      .from('operational_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return fallbackRecords();
    }

    return data.map((row) => mapOperationalRecord(row as RawOperationalRecord));
  } catch {
    return fallbackRecords();
  }
}

export async function getOperationalSummary(): Promise<OperationalSummary> {
  if (!isSupabaseConfigured || !supabase) {
    return buildSummary(fallbackRecords(), 'demo');
  }

  try {
    const records = await getOperationalRecords();
    return buildSummary(records, records === demoOperationalRecords ? 'demo' : 'supabase');
  } catch {
    return buildSummary(fallbackRecords(), 'demo');
  }
}


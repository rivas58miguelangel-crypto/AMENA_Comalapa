export type OperationalRecordType = 'interaction' | 'document' | 'payment';

export type OperationalRecordStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'observed'
  | 'overdue';

export interface OperationalRecordBase {
  id: string;
  type: OperationalRecordType;
  title: string;
  clientName: string;
  status: OperationalRecordStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface InteractionRecord extends OperationalRecordBase {
  type: 'interaction';
  channel: 'whatsapp' | 'email' | 'call' | 'meeting' | 'system';
  priority?: 'low' | 'medium' | 'high';
  reservationId?: string;
  createdBy?: string;
  interactionType?: string;
  nextStep?: string;
}

export interface DocumentRecord extends OperationalRecordBase {
  type: 'document';
  documentName: string;
  documentStatus: 'expected' | 'received' | 'observed' | 'approved';
  dueDate?: string;
}

export interface PaymentRecord extends OperationalRecordBase {
  type: 'payment';
  amount: number;
  currency: string;
  dueDate?: string;
  paidAt?: string;
}

export type OperationalRecord = InteractionRecord | DocumentRecord | PaymentRecord;

export interface OperationalSummary {
  total: number;
  interactions: number;
  documents: number;
  payments: number;
  pending: number;
  overdue: number;
  source: 'supabase' | 'demo';
}

export interface CreateHumanInteractionRecordInput {
  reservation_id: string;
  customer_name: string;
  title: string;
  description: string;
  channel: InteractionRecord['channel'];
  created_by: string;
  interaction_type: string;
  priority: NonNullable<InteractionRecord['priority']>;
  next_step: string;
  created_at?: string;
}

export interface CreateHumanInteractionRecordResult {
  record: InteractionRecord;
  source: 'supabase' | 'demo';
  saved: boolean;
  error?: string;
}

export interface ComplianceInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerTin: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  taxAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'flagged';
  source: IntegrationProvider;
  validationErrors?: ValidationError[];
}

export type IntegrationProvider = 'zoho' | 'whatsapp' | 'quickbooks';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

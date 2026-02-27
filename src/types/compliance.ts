export interface ComplianceInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerTin: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'flagged';
  firsStatus?: 'pending' | 'submitted' | 'approved' | 'rejected';
  validationErrors?: ValidationError[];
  flaggedFields?: FlaggedField[];
  irn?: string;
  qrCode?: string;
  submittedAt?: Date;
  approvedAt?: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

export interface FlaggedField {
  field: string;
  value: any;
  expected: any;
  message: string;
  editable: boolean;
}

export interface FIRSField {
  name: string;
  path: string;
  required: boolean;
  type: 'string' | 'number' | 'date' | 'boolean';
  maxLength?: number;
  pattern?: RegExp;
  description: string;
}

export interface ComplianceSummary {
  total: number;
  flagged: number;
  inReview: number;
  cleared: number;
  approvalRate: number;
  averageResponseTime: number;
}

export interface ClearanceStatus {
  stage: 'validation' | 'submission' | 'buyer_review' | 'firs_approval' | 'completed';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  estimatedCompletion?: Date;
  message?: string;
}

export interface TimerStatus {
  totalSeconds: number;
  remainingSeconds: number;
  percentage: number;
  isExpired: boolean;
  warningLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface RegulatoryInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerTin: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  vatAmount: number;
  status: 'draft' | 'submitted' | 'buyer_review' | 'approved' | 'rejected';
  firsStatus?: {
    irn?: string;
    qrCode?: string;
    signature?: string;
    submittedAt?: Date;
    respondedAt?: Date;
  };
  clearanceStatus?: ClearanceStatus;
  timer?: TimerStatus;
}

export interface ClearanceStatus {
  stage: 'validation' | 'submission' | 'buyer_review' | 'firs_approval' | 'completed';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  estimatedCompletion?: Date;
  message?: string;
  details?: {
    validationScore?: number;
    submissionId?: string;
    buyerDeadline?: Date;
    firsResponseTime?: number;
  };
}

export interface TimerStatus {
  totalSeconds: number;
  remainingSeconds: number;
  percentage: number;
  isExpired: boolean;
  warningLevel: 'low' | 'medium' | 'high' | 'critical';
  expiresAt: Date;
}

export interface IRNData {
  irn: string;
  qrCode: string;
  signature: string;
  generatedAt: Date;
  expiryDate?: Date;
}

export interface CSIData {
  csid: string;
  status: 'active' | 'expiring' | 'expired';
  expiresAt?: Date;
  certificateDetails?: {
    issuer: string;
    subject: string;
    validFrom: Date;
    validTo: Date;
  };
}

export interface StampedInvoice {
  id: string;
  invoiceId: string;
  pdfUrl: string;
  stampedAt: Date;
  verified: boolean;
  metadata: Record<string, any>;
}

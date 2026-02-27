import apiClient from './client';
import { 
  ComplianceInvoice, 
  ComplianceSummary, 
  ValidationError,
  ClearanceStatus,
  TimerStatus 
} from '@/types/compliance';

export const complianceApi = {
  // Get flagged invoices
  getFlagged: async (): Promise<ComplianceInvoice[]> => {
    return apiClient.get('/compliance/flagged');
  },

  // Get compliance summary
  getSummary: async (): Promise<ComplianceSummary> => {
    return apiClient.get('/compliance/summary');
  },

  // Validate invoice
  validateInvoice: async (invoiceId: string): Promise<{
    valid: boolean;
    errors: ValidationError[];
  }> => {
    return apiClient.post(`/compliance/validate/${invoiceId}`);
  },

  // Re-validate and clear
  revalidateAndClear: async (invoiceId: string, corrections: Record<string, any>): Promise<{
    success: boolean;
    message: string;
    irn?: string;
  }> => {
    return apiClient.post(`/compliance/clear/${invoiceId}`, { corrections });
  },

  // Update flagged field
  updateField: async (invoiceId: string, field: string, value: any): Promise<{
    success: boolean;
    validationErrors?: ValidationError[];
  }> => {
    return apiClient.patch(`/compliance/invoice/${invoiceId}/field`, { field, value });
  },

  // Get clearance status
  getClearanceStatus: async (invoiceId: string): Promise<ClearanceStatus> => {
    return apiClient.get(`/compliance/clearance/${invoiceId}/status`);
  },

  // Get 72-hour timer status
  getTimerStatus: async (invoiceId: string): Promise<TimerStatus> => {
    return apiClient.get(`/compliance/timer/${invoiceId}`);
  },

  // Get invoice IRN
  getIRN: async (invoiceId: string): Promise<{ irn: string; qrCode: string }> => {
    return apiClient.get(`/compliance/irn/${invoiceId}`);
  },

  // Bulk validate
  bulkValidate: async (invoiceIds: string[]): Promise<{
    total: number;
    passed: number;
    failed: number;
    results: Record<string, any>;
  }> => {
    return apiClient.post('/compliance/bulk-validate', { invoiceIds });
  },

  // Export flagged list
  exportFlagged: async (format: 'csv' | 'excel' = 'csv'): Promise<Blob> => {
    return apiClient.get('/compliance/export', { 
      params: { format },
      responseType: 'blob' 
    });
  },
};

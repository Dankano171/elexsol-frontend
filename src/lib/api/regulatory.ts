import apiClient from './client';
import { 
  RegulatoryInvoice, 
  ClearanceStatus, 
  TimerStatus,
  IRNData,
  CSIData,
  StampedInvoice 
} from '@/types/regulatory';

export const regulatoryApi = {
  // Get invoices in clearance
  getInvoices: async (status?: string): Promise<RegulatoryInvoice[]> => {
    return apiClient.get('/regulatory/invoices', { params: { status } });
  },

  // Get invoice by ID
  getInvoice: async (id: string): Promise<RegulatoryInvoice> => {
    return apiClient.get(`/regulatory/invoices/${id}`);
  },

  // Get clearance status
  getClearanceStatus: async (invoiceId: string): Promise<ClearanceStatus> => {
    return apiClient.get(`/regulatory/clearance/${invoiceId}/status`);
  },

  // Get timer status
  getTimerStatus: async (invoiceId: string): Promise<TimerStatus> => {
    return apiClient.get(`/regulatory/timer/${invoiceId}`);
  },

  // Get IRN
  getIRN: async (invoiceId: string): Promise<IRNData> => {
    return apiClient.get(`/regulatory/irn/${invoiceId}`);
  },

  // Get CSID
  getCSID: async (): Promise<CSIData> => {
    return apiClient.get('/regulatory/csid');
  },

  // Download stamped invoice
  downloadStampedInvoice: async (invoiceId: string): Promise<Blob> => {
    return apiClient.get(`/regulatory/invoice/${invoiceId}/stamped`, {
      responseType: 'blob',
    });
  },

  // Verify stamped invoice
  verifyStampedInvoice: async (invoiceId: string): Promise<{ verified: boolean; message?: string }> => {
    return apiClient.post(`/regulatory/invoice/${invoiceId}/verify`);
  },

  // Get clearance history
  getClearanceHistory: async (invoiceId: string): Promise<any[]> => {
    return apiClient.get(`/regulatory/clearance/${invoiceId}/history`);
  },

  // Request extension
  requestExtension: async (invoiceId: string, reason: string): Promise<{ granted: boolean; newDeadline?: Date }> => {
    return apiClient.post(`/regulatory/clearance/${invoiceId}/extend`, { reason });
  },
};

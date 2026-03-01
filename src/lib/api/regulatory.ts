import apiClient from './client';

export const regulatoryApi = {
  getInvoices: (status?: string) =>
    apiClient.get('/regulatory/invoices', { params: { status } }),
  getInvoice: (id: string) =>
    apiClient.get(`/regulatory/invoices/${id}`),
  getClearanceStatus: (invoiceId: string) =>
    apiClient.get(`/regulatory/clearance/${invoiceId}/status`),
  getTimerStatus: (invoiceId: string) =>
    apiClient.get(`/regulatory/timer/${invoiceId}`),
  getIRN: (invoiceId: string) =>
    apiClient.get(`/regulatory/irn/${invoiceId}`),
  getCSID: () =>
    apiClient.get('/regulatory/csid'),
  downloadStampedInvoice: (invoiceId: string) =>
    apiClient.get(`/regulatory/invoice/${invoiceId}/stamped`, { responseType: 'blob' } as any),
  verifyStampedInvoice: (invoiceId: string) =>
    apiClient.post(`/regulatory/invoice/${invoiceId}/verify`),
};

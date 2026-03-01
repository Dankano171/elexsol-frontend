import apiClient from './client';

export const complianceApi = {
  getFlaggedInvoices: (page: number = 1, limit: number = 20) =>
    apiClient.get('/compliance/flagged', { params: { page, limit } }),
  getSummary: () =>
    apiClient.get('/compliance/summary'),
  validateInvoice: (invoiceId: string) =>
    apiClient.post(`/compliance/validate/${invoiceId}`),
  revalidateAndClear: (invoiceId: string, corrections: Record<string, any>) =>
    apiClient.post(`/compliance/clear/${invoiceId}`, { corrections }),
  updateField: (invoiceId: string, field: string, value: any) =>
    apiClient.patch(`/compliance/invoice/${invoiceId}/field`, { field, value }),
  bulkValidate: (invoiceIds: string[]) =>
    apiClient.post('/compliance/bulk-validate', { invoiceIds }),
  exportFlagged: (format: 'csv' | 'excel' = 'csv') =>
    apiClient.get('/compliance/export', { params: { format }, responseType: 'blob' } as any),
};

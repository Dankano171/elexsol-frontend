import apiClient from './client';

export const invoicesApi = {
  getAll: (params?: any) =>
    apiClient.get('/invoices', { params }),
  getById: (id: string) =>
    apiClient.get(`/invoices/${id}`),
  create: (data: any) =>
    apiClient.post('/invoices', data),
  update: (id: string, data: any) =>
    apiClient.put(`/invoices/${id}`, data),
  delete: (id: string) =>
    apiClient.delete(`/invoices/${id}`),
  submitToFIRS: (id: string) =>
    apiClient.post(`/invoices/${id}/firs/submit`),
  getFIRSStatus: (id: string) =>
    apiClient.get(`/invoices/${id}/firs/status`),
  downloadPDF: (id: string) =>
    apiClient.get(`/invoices/${id}/pdf`, { responseType: 'blob' } as any),
  getStats: () =>
    apiClient.get('/invoices/stats'),
  getAgingReport: () =>
    apiClient.get('/invoices/aging'),
};

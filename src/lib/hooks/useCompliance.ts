import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceApi } from '@/lib/api/compliance';
import { mockComplianceInvoices } from '@/lib/mock-data';
import { toast } from 'sonner';

export function useCompliance() {
  const queryClient = useQueryClient();

  const invoicesQuery = useQuery({
    queryKey: ['compliance', 'invoices'],
    queryFn: async () => {
      const res = await complianceApi.getFlaggedInvoices();
      return res as any;
    },
    retry: 1,
  });

  const summaryQuery = useQuery({
    queryKey: ['compliance', 'summary'],
    queryFn: async () => {
      const res = await complianceApi.getSummary();
      return res as any;
    },
    retry: 1,
  });

  const validateMutation = useMutation({
    mutationFn: (invoiceId: string) => complianceApi.validateInvoice(invoiceId),
    onSuccess: () => {
      toast.success('Invoice validated');
      queryClient.invalidateQueries({ queryKey: ['compliance'] });
    },
    onError: (error: Error) => toast.error(error.message || 'Validation failed'),
  });

  const updateFieldMutation = useMutation({
    mutationFn: ({ invoiceId, field, value }: { invoiceId: string; field: string; value: any }) =>
      complianceApi.updateField(invoiceId, field, value),
    onSuccess: () => {
      toast.success('Field updated');
      queryClient.invalidateQueries({ queryKey: ['compliance'] });
    },
    onError: (error: Error) => toast.error(error.message || 'Update failed'),
  });

  const bulkValidateMutation = useMutation({
    mutationFn: (invoiceIds: string[]) => complianceApi.bulkValidate(invoiceIds),
    onSuccess: () => {
      toast.success('Bulk validation complete');
      queryClient.invalidateQueries({ queryKey: ['compliance'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const exportMutation = useMutation({
    mutationFn: (format: 'csv' | 'excel') => complianceApi.exportFlagged(format),
    onSuccess: (data: any) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compliance-export.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Export downloaded');
    },
    onError: (error: Error) => toast.error(error.message || 'Export failed'),
  });

  return {
    invoices: invoicesQuery.data ?? mockComplianceInvoices,
    isLoading: invoicesQuery.isLoading,
    summary: summaryQuery.data,
    validate: validateMutation.mutate,
    updateField: updateFieldMutation.mutate,
    bulkValidate: bulkValidateMutation.mutate,
    exportFlagged: exportMutation.mutate,
  };
}

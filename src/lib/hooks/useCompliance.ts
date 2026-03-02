import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceApi } from '@/lib/api/compliance';
import { mockComplianceInvoices } from '@/lib/mock-data';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { toast } from 'sonner';

export function useCompliance() {
  const queryClient = useQueryClient();
  const demo = isDemoAccount();

  const invoicesQuery = useQuery({
    queryKey: ['compliance', 'invoices'],
    queryFn: () => complianceApi.getFlaggedInvoices() as Promise<any>,
    enabled: !demo,
    retry: 1,
  });

  const summaryQuery = useQuery({
    queryKey: ['compliance', 'summary'],
    queryFn: () => complianceApi.getSummary() as Promise<any>,
    enabled: !demo,
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

  if (demo) {
    return {
      invoices: mockComplianceInvoices,
      isLoading: false,
      error: null,
      refetch: () => {},
      summary: null,
      validate: validateMutation.mutate,
      updateField: updateFieldMutation.mutate,
      bulkValidate: bulkValidateMutation.mutate,
      exportFlagged: exportMutation.mutate,
    };
  }

  return {
    invoices: invoicesQuery.data ?? [],
    isLoading: invoicesQuery.isLoading,
    error: invoicesQuery.error,
    refetch: invoicesQuery.refetch,
    summary: summaryQuery.data,
    validate: validateMutation.mutate,
    updateField: updateFieldMutation.mutate,
    bulkValidate: bulkValidateMutation.mutate,
    exportFlagged: exportMutation.mutate,
  };
}

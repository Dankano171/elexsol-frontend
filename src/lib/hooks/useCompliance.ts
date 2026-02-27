import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceApi } from '@/lib/api/compliance';
import { toast } from 'sonner';

export const useCompliance = () => {
  const queryClient = useQueryClient();

  // Get flagged invoices
  const flaggedQuery = useQuery({
    queryKey: ['compliance', 'flagged'],
    queryFn: () => complianceApi.getFlagged(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get summary
  const summaryQuery = useQuery({
    queryKey: ['compliance', 'summary'],
    queryFn: () => complianceApi.getSummary(),
    refetchInterval: 60000,
  });

  // Re-validate and clear
  const revalidateMutation = useMutation({
    mutationFn: ({ invoiceId, corrections }: { invoiceId: string; corrections: Record<string, any> }) =>
      complianceApi.revalidateAndClear(invoiceId, corrections),
    onSuccess: (data, { invoiceId }) => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'flagged'] });
      queryClient.invalidateQueries({ queryKey: ['compliance', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] });
      
      if (data.success) {
        toast.success('Invoice cleared successfully');
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to re-validate');
    },
  });

  // Update field
  const updateFieldMutation = useMutation({
    mutationFn: ({ invoiceId, field, value }: { invoiceId: string; field: string; value: any }) =>
      complianceApi.updateField(invoiceId, field, value),
    onSuccess: (data, { invoiceId }) => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'flagged'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] });
      
      if (!data.success && data.validationErrors) {
        toast.error('Validation failed');
      }
    },
  });

  // Validate single invoice
  const validateMutation = useMutation({
    mutationFn: complianceApi.validateInvoice,
    onSuccess: (data, invoiceId) => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'flagged'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] });
      
      if (data.valid) {
        toast.success('Invoice is valid');
      } else {
        toast.error(`Found ${data.errors.length} validation errors`);
      }
    },
  });

  // Bulk validate
  const bulkValidateMutation = useMutation({
    mutationFn: complianceApi.bulkValidate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'flagged'] });
      toast.success(`Validated ${data.total} invoices: ${data.passed} passed, ${data.failed} failed`);
    },
  });

  // Get clearance status
  const getClearanceStatus = (invoiceId: string) => {
    return useQuery({
      queryKey: ['compliance', 'clearance', invoiceId],
      queryFn: () => complianceApi.getClearanceStatus(invoiceId),
      enabled: !!invoiceId,
      refetchInterval: 10000, // Refetch every 10 seconds
    });
  };

  // Get timer status
  const getTimerStatus = (invoiceId: string) => {
    return useQuery({
      queryKey: ['compliance', 'timer', invoiceId],
      queryFn: () => complianceApi.getTimerStatus(invoiceId),
      enabled: !!invoiceId,
      refetchInterval: 1000, // Refetch every second for countdown
    });
  };

  // Get IRN
  const getIRN = (invoiceId: string) => {
    return useQuery({
      queryKey: ['compliance', 'irn', invoiceId],
      queryFn: () => complianceApi.getIRN(invoiceId),
      enabled: !!invoiceId,
    });
  };

  return {
    // Data
    flaggedInvoices: flaggedQuery.data,
    isLoadingFlagged: flaggedQuery.isLoading,
    summary: summaryQuery.data,
    isLoadingSummary: summaryQuery.isLoading,

    // Actions
    revalidate: revalidateMutation.mutate,
    isRevalidating: revalidateMutation.isPending,

    updateField: updateFieldMutation.mutate,
    isUpdating: updateFieldMutation.isPending,

    validate: validateMutation.mutate,
    isValidating: validateMutation.isPending,

    bulkValidate: bulkValidateMutation.mutate,
    isBulkValidating: bulkValidateMutation.isPending,

    // Queries
    getClearanceStatus,
    getTimerStatus,
    getIRN,

    // Refresh
    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance'] });
    },
  };
};

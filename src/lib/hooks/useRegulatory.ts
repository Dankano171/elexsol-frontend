import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { regulatoryApi } from '@/lib/api/regulatory';
import { toast } from 'sonner';

export const useRegulatory = (invoiceId?: string) => {
  const queryClient = useQueryClient();

  // Get invoices
  const invoicesQuery = useQuery({
    queryKey: ['regulatory', 'invoices'],
    queryFn: () => regulatoryApi.getInvoices(),
    refetchInterval: 30000,
  });

  // Get single invoice
  const invoiceQuery = useQuery({
    queryKey: ['regulatory', 'invoice', invoiceId],
    queryFn: () => regulatoryApi.getInvoice(invoiceId!),
    enabled: !!invoiceId,
    refetchInterval: 10000,
  });

  // Get clearance status
  const clearanceStatusQuery = useQuery({
    queryKey: ['regulatory', 'clearance', invoiceId],
    queryFn: () => regulatoryApi.getClearanceStatus(invoiceId!),
    enabled: !!invoiceId,
    refetchInterval: 10000,
  });

  // Get timer status
  const timerStatusQuery = useQuery({
    queryKey: ['regulatory', 'timer', invoiceId],
    queryFn: () => regulatoryApi.getTimerStatus(invoiceId!),
    enabled: !!invoiceId,
    refetchInterval: 1000, // Update every second
  });

  // Get IRN
  const irnQuery = useQuery({
    queryKey: ['regulatory', 'irn', invoiceId],
    queryFn: () => regulatoryApi.getIRN(invoiceId!),
    enabled: !!invoiceId && !!clearanceStatusQuery.data?.stage === 'firs_approval',
  });

  // Get CSID
  const csidQuery = useQuery({
    queryKey: ['regulatory', 'csid'],
    queryFn: () => regulatoryApi.getCSID(),
    refetchInterval: 3600000, // Update every hour
  });

  // Download stamped invoice
  const downloadMutation = useMutation({
    mutationFn: (id: string) => regulatoryApi.downloadStampedInvoice(id),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stamped-invoice-${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error: Error) => {
      toast.error('Failed to download invoice');
    },
  });

  // Verify invoice
  const verifyMutation = useMutation({
    mutationFn: (id: string) => regulatoryApi.verifyStampedInvoice(id),
    onSuccess: (data) => {
      if (data.verified) {
        toast.success('Invoice verified successfully');
      } else {
        toast.error(data.message || 'Verification failed');
      }
    },
  });

  // Request extension
  const extendMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      regulatoryApi.requestExtension(id, reason),
    onSuccess: (data) => {
      if (data.granted) {
        toast.success('Extension granted');
        queryClient.invalidateQueries({ queryKey: ['regulatory', 'timer', invoiceId] });
      } else {
        toast.error('Extension request denied');
      }
    },
  });

  return {
    // Queries
    invoices: invoicesQuery.data,
    isLoadingInvoices: invoicesQuery.isLoading,
    invoice: invoiceQuery.data,
    isLoadingInvoice: invoiceQuery.isLoading,
    clearanceStatus: clearanceStatusQuery.data,
    isLoadingStatus: clearanceStatusQuery.isLoading,
    timerStatus: timerStatusQuery.data,
    irn: irnQuery.data,
    csid: csidQuery.data,

    // Mutations
    downloadStamped: downloadMutation.mutate,
    isDownloading: downloadMutation.isPending,
    verify: verifyMutation.mutate,
    isVerifying: verifyMutation.isPending,
    requestExtension: extendMutation.mutate,
    isRequestingExtension: extendMutation.isPending,

    // Refresh
    refresh: () => {
      queryClient.invalidateQueries({ queryKey: ['regulatory'] });
    },
  };
};

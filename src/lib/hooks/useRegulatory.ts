import { useQuery, useMutation } from '@tanstack/react-query';
import { regulatoryApi } from '@/lib/api/regulatory';
import { toast } from 'sonner';

export function useRegulatory() {
  const invoicesQuery = useQuery({
    queryKey: ['regulatory', 'invoices'],
    queryFn: () => regulatoryApi.getInvoices(),
    retry: 1,
  });

  const downloadMutation = useMutation({
    mutationFn: (invoiceId: string) => regulatoryApi.downloadStampedInvoice(invoiceId),
    onSuccess: (data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stamped-invoice.pdf';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Invoice downloaded');
    },
    onError: (error: Error) => toast.error(error.message || 'Download failed'),
  });

  return {
    invoices: invoicesQuery.data,
    isLoading: invoicesQuery.isLoading,
    downloadStamped: downloadMutation.mutate,
    downloading: downloadMutation.isPending,
  };
}

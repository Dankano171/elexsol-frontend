import { useQuery, useMutation } from '@tanstack/react-query';
import { regulatoryApi } from '@/lib/api/regulatory';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';
import { toast } from 'sonner';

// Mock clearance data for demo
const mockClearances = [
  { id: '1', invoiceNumber: 'INV-2024-0848', customerName: 'MTN Nigeria', amount: 2_800_000, submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 60).toISOString(), status: 'processing', irn: 'IRN-NG-2024-00384721', stage: 2 },
  { id: '2', invoiceNumber: 'INV-2024-0851', customerName: 'Flour Mills of Nigeria', amount: 5_600_000, submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 24).toISOString(), status: 'processing', irn: 'IRN-NG-2024-00384698', stage: 3 },
  { id: '3', invoiceNumber: 'INV-2024-0845', customerName: 'Access Bank Plc', amount: 1_200_000, submittedAt: new Date(Date.now() - 3600000 * 70).toISOString(), expiresAt: new Date(Date.now() + 3600000 * 2).toISOString(), status: 'pending', irn: 'IRN-NG-2024-00384655', stage: 1 },
  { id: '4', invoiceNumber: 'INV-2024-0840', customerName: 'Dangote Industries', amount: 4_500_000, submittedAt: new Date(Date.now() - 3600000 * 80).toISOString(), expiresAt: new Date(Date.now() - 3600000 * 8).toISOString(), status: 'expired', irn: 'IRN-NG-2024-00384601', stage: 4 },
  { id: '5', invoiceNumber: 'INV-2024-0838', customerName: 'Nigerian Breweries', amount: 890_000, submittedAt: new Date(Date.now() - 3600000 * 96).toISOString(), expiresAt: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'cleared', irn: 'IRN-NG-2024-00384590', csid: 'CSID-NG-2024-99281734', stage: 4 },
];

export function useRegulatory() {
  const demo = isDemoAccount();

  const invoicesQuery = useQuery({
    queryKey: ['regulatory', 'invoices'],
    queryFn: () => regulatoryApi.getInvoices() as Promise<any>,
    enabled: !demo,
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

  if (demo) {
    return {
      invoices: mockClearances,
      isLoading: false,
      error: null,
      refetch: () => {},
      downloadStamped: downloadMutation.mutate,
      downloading: false,
    };
  }

  return {
    invoices: invoicesQuery.data ?? [],
    isLoading: invoicesQuery.isLoading,
    error: invoicesQuery.error,
    refetch: invoicesQuery.refetch,
    downloadStamped: downloadMutation.mutate,
    downloading: downloadMutation.isPending,
  };
}

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import apiClient from '@/lib/api/client';
import { toast } from 'sonner';

const TIERS = [
  {
    id: 'tier-3',
    name: 'Tier 3 — Starter',
    price: '₦15,000/mo',
    features: ['Up to 500 invoices/mo', 'Basic compliance checks', 'Email support'],
  },
  {
    id: 'tier-2',
    name: 'Tier 2 — Professional',
    price: '₦45,000/mo',
    features: ['Unlimited invoices', 'Advanced analytics & forecasting', 'Priority support', 'Multi-user access'],
    popular: true,
  },
];

export default function BillingTab() {
  const { accountTier, hasPaymentDetails, setAccountTier, setPaymentDetails } = useOnboardingStore();
  const [selectedTier, setSelectedTier] = useState<string | null>(accountTier);
  const [savingTier, setSavingTier] = useState(false);
  const [connectingPayment, setConnectingPayment] = useState(false);

  const handleSaveTier = async () => {
    if (!selectedTier) {
      toast.error('Please select an account tier.');
      return;
    }
    setSavingTier(true);
    try {
      await apiClient.post('/settings/account-tier', { tier: selectedTier });
      setAccountTier(selectedTier);
      toast.success(`Account tier set to ${selectedTier === 'tier-2' ? 'Professional' : 'Starter'}.`);
    } catch {
      // Global interceptor handles error toast
    } finally {
      setSavingTier(false);
    }
  };

  const handleConnectPayment = async () => {
    setConnectingPayment(true);
    try {
      await apiClient.post('/settings/payment-method', { method: 'card' });
      setPaymentDetails(true);
      toast.success('Payment method connected successfully.');
    } catch {
      // Global interceptor handles error toast
    } finally {
      setConnectingPayment(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Tier Selection */}
      <Card className="p-6 shadow-card border-none space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Account Tier</h3>
          <p className="text-xs text-muted-foreground">Select the plan that fits your business</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIERS.map(tier => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={`relative rounded-xl border-2 p-5 text-left transition-all ${
                selectedTier === tier.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-2.5 right-4 text-[10px] bg-primary text-primary-foreground">
                  Popular
                </Badge>
              )}
              <p className="text-sm font-semibold text-foreground">{tier.name}</p>
              <p className="text-lg font-bold text-primary mt-1">{tier.price}</p>
              <ul className="mt-3 space-y-1.5">
                {tier.features.map(f => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-success shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <Button onClick={handleSaveTier} className="text-xs" disabled={savingTier || !selectedTier}>
          {savingTier ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</>
          ) : (
            <><Zap className="w-3.5 h-3.5 mr-1.5" /> Confirm Tier</>
          )}
        </Button>
      </Card>

      {/* Payment Method */}
      <Card className="p-6 shadow-card border-none space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Payment Method</h3>
            <p className="text-xs text-muted-foreground">Connect a payment method for billing</p>
          </div>
          {hasPaymentDetails && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
              Connected
            </Badge>
          )}
        </div>
        <Separator />
        <Button
          variant={hasPaymentDetails ? 'outline' : 'default'}
          onClick={handleConnectPayment}
          className="text-xs"
          disabled={connectingPayment}
        >
          {connectingPayment ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Connecting...</>
          ) : hasPaymentDetails ? (
            <><CreditCard className="w-3.5 h-3.5 mr-1.5" /> Update Payment Method</>
          ) : (
            <><CreditCard className="w-3.5 h-3.5 mr-1.5" /> Connect Payment Method</>
          )}
        </Button>
      </Card>
    </motion.div>
  );
}

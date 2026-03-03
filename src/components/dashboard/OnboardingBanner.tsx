import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { isDemoAccount } from '@/lib/utils/isDemoAccount';

export default function OnboardingBanner() {
  const navigate = useNavigate();
  const { hasCryptoKeys, hasPaymentDetails, accountTier } = useOnboardingStore();
  const complete = hasCryptoKeys && hasPaymentDetails && !!accountTier;

  if (complete || isDemoAccount()) return null;

  const missing: string[] = [];
  if (!hasCryptoKeys) missing.push('FIRS Cryptographic Keys');
  if (!accountTier) missing.push('Account Tier');
  if (!hasPaymentDetails) missing.push('Payment Details');

  return (
    <div className="mb-4 rounded-xl border border-warning/30 bg-warning/10 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            ⚠️ Action Required: Invoice compliance processing is suspended.
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Please configure your {missing.join(', ')} to activate.
          </p>
        </div>
      </div>
      <Button
        size="sm"
        className="shrink-0 text-xs font-medium"
        onClick={() => navigate('/settings')}
      >
        Complete Setup <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </Button>
    </div>
  );
}

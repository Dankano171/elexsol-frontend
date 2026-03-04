import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useOnboardingStore } from '@/lib/store/onboardingStore';

interface Step {
  title: string;
  description: string;
  completed: boolean;
  link: string;
}

export default function DashboardOnboarding() {
  const navigate = useNavigate();
  const { hasCryptoKeys, hasPaymentDetails, accountTier } = useOnboardingStore();

  const steps: Step[] = [
    {
      title: 'Select Subscription Tier',
      description: 'Choose Tier 2 or Tier 3 to match your FIRS reporting obligations.',
      completed: !!accountTier,
      link: '/settings?tab=billing',
    },
    {
      title: 'Add Payment Details',
      description: 'Add a payment method to activate invoicing and receipt services.',
      completed: hasPaymentDetails,
      link: '/settings?tab=billing',
    },
    {
      title: 'Upload FIRS Credentials',
      description: 'Upload your CSID and Private Key for cryptographic signing compliance.',
      completed: hasCryptoKeys,
      link: '/settings?tab=firs',
    },
    {
      title: 'Connect Accounting Source',
      description: 'Link Zoho, QuickBooks, or another data source to sync invoices automatically.',
      completed: false, // always incomplete for now — requires integration check
      link: '/integrations',
    },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="shadow-elevated border-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Complete Your Setup</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {completedCount} of {steps.length} steps completed
              </p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-2 mt-4" />
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                step.completed ? 'opacity-60' : 'hover:bg-accent/50'
              }`}
            >
              {step.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${step.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
              {!step.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary shrink-0"
                  onClick={() => navigate(step.link)}
                >
                  Action <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

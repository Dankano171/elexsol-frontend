import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, ctaLabel = 'Get Started', ctaLink = '/settings', onAction, children }: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-card border-none p-12 flex flex-col items-center text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">{description}</p>
        {children}
        <Button size="lg" onClick={onAction ?? (() => navigate(ctaLink!))} className="font-semibold">
          {ctaLabel} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </motion.div>
  );
}

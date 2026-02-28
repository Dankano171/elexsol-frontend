import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  delay?: number;
}

const variantStyles = {
  default: 'bg-card',
  primary: 'gradient-primary text-primary-foreground',
  success: 'gradient-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
};

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };

export default function KPICard({ title, value, subtitle, icon: Icon, trend, trendValue, variant = 'default', delay = 0 }: KPICardProps) {
  const isPrimary = variant !== 'default';
  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={`p-5 ${variantStyles[variant]} shadow-card hover:shadow-elevated transition-shadow border-none`}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={`text-xs font-medium uppercase tracking-wider ${isPrimary ? 'opacity-80' : 'text-muted-foreground'}`}>
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center gap-1.5">
              {TrendIcon && (
                <TrendIcon className={`w-3.5 h-3.5 ${
                  isPrimary ? 'opacity-80' :
                  trend === 'up' ? 'text-success' :
                  trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                }`} />
              )}
              <span className={`text-xs ${isPrimary ? 'opacity-80' : 'text-muted-foreground'}`}>
                {trendValue && <span className="font-medium">{trendValue}</span>} {subtitle}
              </span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isPrimary ? 'bg-white/15' : 'bg-primary/8'
          }`}>
            <Icon className={`w-5 h-5 ${isPrimary ? '' : 'text-primary'}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

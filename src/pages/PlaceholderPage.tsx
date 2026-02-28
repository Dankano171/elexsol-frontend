import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      <Card className="p-12 shadow-card border-none flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          This module is under development. Check back soon for {title.toLowerCase()} features.
        </p>
      </Card>
    </DashboardLayout>
  );
}

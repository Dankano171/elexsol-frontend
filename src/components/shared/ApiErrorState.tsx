import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ApiErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ApiErrorState({ message, onRetry }: ApiErrorStateProps) {
  return (
    <Card className="p-8 shadow-card border-none text-center">
      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">Failed to load data</h3>
      <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
        {message || 'Unable to connect to the server. Please check your connection and try again.'}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Retry
        </Button>
      )}
    </Card>
  );
}

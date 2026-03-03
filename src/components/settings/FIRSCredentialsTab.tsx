import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { KeyRound, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import apiClient from '@/lib/api/client';
import { toast } from 'sonner';

export default function FIRSCredentialsTab() {
  const { hasCryptoKeys, setCryptoKeys } = useOnboardingStore();
  const [csid, setCsid] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!csid.trim() || !privateKey.trim()) {
      toast.error('Both CSID and Private Key are required.');
      return;
    }
    setSaving(true);
    try {
      await apiClient.post('/settings/firs-credentials', { csid, privateKey });
      setCryptoKeys(true);
      toast.success('FIRS credentials saved and vaulted securely.');
    } catch (error: any) {
      // Global interceptor handles the toast, but update state
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6 shadow-card border-none space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-primary" />
              FIRS Cryptographic Signatures
            </h3>
            <p className="text-xs text-muted-foreground">
              Configure your FIRS clearance credentials for e-invoicing compliance
            </p>
          </div>
          {hasCryptoKeys && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-success">
              <ShieldCheck className="w-4 h-4" /> Configured
            </span>
          )}
        </div>
        <Separator />

        <div className="space-y-4 max-w-lg">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Cryptographic Stamp Identifier (CSID)</Label>
            <Input
              placeholder="Enter your CSID from FIRS portal"
              value={csid}
              onChange={e => setCsid(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium">Private Key</Label>
            <Input
              type="password"
              placeholder="Enter your private signing key"
              value={privateKey}
              onChange={e => setPrivateKey(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 border border-border">
          <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Secured via AES-256 Encryption.</span>{' '}
            Your keys are vaulted and never exposed in transit or at rest.
          </p>
        </div>

        <Button onClick={handleSave} className="text-xs" disabled={saving}>
          {saving ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</>
          ) : (
            <><ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Save Credentials</>
          )}
        </Button>
      </Card>
    </motion.div>
  );
}

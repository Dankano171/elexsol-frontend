import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';

export default function SecurityTab() {
  const { user } = useAuthStore();
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });

  const handlePasswordChange = async () => {
    if (passwordData.newPass !== passwordData.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPass.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    try {
      await authApi.changePassword(passwordData.current, passwordData.newPass);
      toast.success('Password updated successfully');
      setPasswordData({ current: '', newPass: '', confirm: '' });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update password');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="p-6 shadow-card border-none space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Password</h3>
          <p className="text-xs text-muted-foreground">Change your account password</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs">Current Password</Label>
            <Input type="password" value={passwordData.current} onChange={e => setPasswordData(p => ({ ...p, current: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">New Password</Label>
            <Input type="password" value={passwordData.newPass} onChange={e => setPasswordData(p => ({ ...p, newPass: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Confirm Password</Label>
            <Input type="password" value={passwordData.confirm} onChange={e => setPasswordData(p => ({ ...p, confirm: e.target.value }))} />
          </div>
        </div>
        <Button onClick={handlePasswordChange} className="text-xs">Update Password</Button>
      </Card>

      <Card className="p-6 shadow-card border-none space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Two-Factor Authentication</h3>
            <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Badge variant="outline" className={`text-xs ${user?.mfaEnabled ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground'}`}>
            {user?.mfaEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Authenticator App</p>
            <p className="text-xs text-muted-foreground">Google Authenticator or similar TOTP app</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            {user?.mfaEnabled ? 'Reconfigure' : 'Setup'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Backup Codes</p>
            <p className="text-xs text-muted-foreground">3 of 8 codes remaining</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">Regenerate</Button>
        </div>
      </Card>
    </motion.div>
  );
}

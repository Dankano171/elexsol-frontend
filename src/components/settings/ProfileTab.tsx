import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Save, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { toast } from 'sonner';

export default function ProfileTab() {
  const { user } = useAuthStore();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6 shadow-card border-none space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Personal Information</h3>
          <p className="text-xs text-muted-foreground">Update your personal details</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-xs">First Name</Label>
            <Input id="firstName" defaultValue={user?.firstName || 'Adebayo'} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-xs">Last Name</Label>
            <Input id="lastName" defaultValue={user?.lastName || 'Ogunlesi'} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs">Email Address</Label>
            <Input id="email" defaultValue={user?.email || 'adebayo@elexsol.ng'} type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs">Phone Number</Label>
            <Input id="phone" defaultValue="+234 802 345 6789" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-xs">Role</Label>
          <div className="flex items-center gap-2">
            <Input id="role" defaultValue={user?.role || 'Finance Manager'} disabled className="max-w-xs" />
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              {user?.role || 'Manager'}
            </Badge>
          </div>
        </div>
        <Button onClick={handleSave} className="text-xs" disabled={saving}>
          {saving ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Saving...</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</>}
        </Button>
      </Card>
    </motion.div>
  );
}

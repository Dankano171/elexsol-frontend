import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Save, CheckCircle2 } from 'lucide-react';
import { NIGERIAN_STATES } from '@/lib/constants/nigerian-states';
import { useAuthStore } from '@/lib/store/authStore';
import { toast } from 'sonner';

export default function BusinessTab() {
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
          <h3 className="text-sm font-semibold text-foreground mb-1">Business Details</h3>
          <p className="text-xs text-muted-foreground">Manage your business information for FIRS compliance</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Business Name</Label>
            <Input defaultValue={user?.businessName || 'Elexsol Technologies Ltd'} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Tax Identification Number (TIN)</Label>
            <Input defaultValue="1234567890" maxLength={10} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Industry</Label>
            <Select defaultValue="technology">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="oil_gas">Oil & Gas</SelectItem>
                <SelectItem value="retail">Retail & Trade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">State</Label>
            <Select defaultValue="Lagos">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs">Business Address</Label>
            <Input defaultValue="12 Adeola Odeku Street, Victoria Island" />
          </div>
        </div>
        <Button onClick={handleSave} className="text-xs" disabled={saving}>
          {saving ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Saving...</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</>}
        </Button>
      </Card>
    </motion.div>
  );
}

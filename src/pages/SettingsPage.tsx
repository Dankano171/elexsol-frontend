import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { User, Building2, Bell, Shield, Palette, Save, CheckCircle2 } from 'lucide-react';
import { NIGERIAN_STATES } from '@/lib/constants/nigerian-states';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account & preferences">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="business"><Building2 className="w-4 h-4 mr-1.5" /> Business</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-1.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-1.5" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
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
                  <Input id="firstName" defaultValue="Adebayo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                  <Input id="lastName" defaultValue="Ogunlesi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">Email Address</Label>
                  <Input id="email" defaultValue="adebayo@elexsol.ng" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 802 345 6789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <div className="flex items-center gap-2">
                  <Input id="role" defaultValue="Finance Manager" disabled className="max-w-xs" />
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">Manager</Badge>
                </div>
              </div>
              <Button onClick={handleSave} className="text-xs">
                {saved ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Saved</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</>}
              </Button>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="business">
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
                  <Input defaultValue="Elexsol Technologies Ltd" />
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
              <Button onClick={handleSave} className="text-xs">
                {saved ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Saved</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</>}
              </Button>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-6 shadow-card border-none space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Notification Preferences</h3>
                <p className="text-xs text-muted-foreground">Choose how you want to be notified</p>
              </div>
              <Separator />
              <div className="space-y-4">
                {[
                  { label: 'Compliance Alerts', desc: 'Get notified when invoices are flagged or require attention', defaultOn: true },
                  { label: 'CSID Expiry Warnings', desc: 'Alert when clearance timer is below 12 hours', defaultOn: true },
                  { label: 'Payment Received', desc: 'Notification for incoming payments', defaultOn: true },
                  { label: 'Sync Failures', desc: 'Alert when integration sync encounters errors', defaultOn: true },
                  { label: 'Weekly Digest', desc: 'Summary of key metrics every Monday', defaultOn: false },
                  { label: 'Marketing Updates', desc: 'Product updates and new feature announcements', defaultOn: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultOn} />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
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
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Confirm Password</Label>
                  <Input type="password" />
                </div>
              </div>
              <Button onClick={handleSave} className="text-xs">Update Password</Button>
            </Card>

            <Card className="p-6 shadow-card border-none space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Two-Factor Authentication</h3>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">Enabled</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Authenticator App</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator or similar TOTP app</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Reconfigure</Button>
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

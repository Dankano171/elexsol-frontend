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
import { User, Building2, Bell, Shield, Save, CheckCircle2, Lock, CreditCard, KeyRound, ShieldCheck } from 'lucide-react';
import { NIGERIAN_STATES } from '@/lib/constants/nigerian-states';
import { useAuthStore } from '@/lib/store/authStore';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';

import ProfileTab from '@/components/settings/ProfileTab';
import BusinessTab from '@/components/settings/BusinessTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';
import FIRSCredentialsTab from '@/components/settings/FIRSCredentialsTab';
import BillingTab from '@/components/settings/BillingTab';

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="Manage your account & preferences">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="business"><Building2 className="w-4 h-4 mr-1.5" /> Business</TabsTrigger>
          <TabsTrigger value="firs"><KeyRound className="w-4 h-4 mr-1.5" /> FIRS Credentials</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-1.5" /> Billing & Plans</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-1.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-1.5" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="business"><BusinessTab /></TabsContent>
        <TabsContent value="firs"><FIRSCredentialsTab /></TabsContent>
        <TabsContent value="billing"><BillingTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

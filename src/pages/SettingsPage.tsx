import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, Bell, Shield, CreditCard, KeyRound } from 'lucide-react';

import ProfileTab from '@/components/settings/ProfileTab';
import BusinessTab from '@/components/settings/BusinessTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';
import FIRSCredentialsTab from '@/components/settings/FIRSCredentialsTab';
import BillingTab from '@/components/settings/BillingTab';

const VALID_TABS = ['profile', 'business', 'firs', 'billing', 'notifications', 'security'];

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'profile';
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'profile';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account & preferences">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
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

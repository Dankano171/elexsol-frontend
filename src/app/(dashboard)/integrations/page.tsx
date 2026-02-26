'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-gray-600 mt-1">
            Connect your business tools for seamless data sync
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Zoho Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">Z</span>
              </div>
              <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                Connected
              </span>
            </div>
            <CardTitle className="mt-4">Zoho Books</CardTitle>
            <CardDescription>
              Sync invoices, contacts, and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last sync</span>
                <span className="font-medium">2 minutes ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Records</span>
                <span className="font-medium">1,234 synced</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">W</span>
              </div>
              <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                Expiring Soon
              </span>
            </div>
            <CardTitle className="mt-4">WhatsApp Business</CardTitle>
            <CardDescription>
              Send invoices and payment reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Token expires</span>
                <span className="font-medium text-warning">in 3 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages sent</span>
                <span className="font-medium">5,678</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Reconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QuickBooks Card */}
        <Card className="hover:shadow-lg transition-shadow opacity-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">Q</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Disconnected
              </span>
            </div>
            <CardTitle className="mt-4">QuickBooks</CardTitle>
            <CardDescription>
              Sync accounting and financial data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Connect</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

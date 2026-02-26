'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Link2,
  Shield,
  Download,
  Upload,
  Users,
  Settings,
} from 'lucide-react';

const actions = [
  {
    id: 'create-invoice',
    label: 'Create Invoice',
    icon: FileText,
    href: '/invoices/create',
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: 'connect-integration',
    label: 'Connect Integration',
    icon: Link2,
    href: '/integrations',
    color: 'text-purple-500 bg-purple-50',
  },
  {
    id: 'run-compliance',
    label: 'Run Compliance',
    icon: Shield,
    href: '/compliance',
    color: 'text-green-500 bg-green-50',
  },
  {
    id: 'export-reports',
    label: 'Export Reports',
    icon: Download,
    href: '/reports',
    color: 'text-orange-500 bg-orange-50',
  },
  {
    id: 'bulk-upload',
    label: 'Bulk Upload',
    icon: Upload,
    href: '/invoices/upload',
    color: 'text-indigo-500 bg-indigo-50',
  },
  {
    id: 'manage-team',
    label: 'Manage Team',
    icon: Users,
    href: '/team',
    color: 'text-pink-500 bg-pink-50',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto py-3 flex flex-col items-center space-y-1"
              asChild
            >
              <a href={action.href}>
                <div className={cn('p-2 rounded-full', action.color)}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-xs">{action.label}</span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

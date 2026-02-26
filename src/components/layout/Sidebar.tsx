'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link2,
  Shield,
  FileText,
  BarChart3,
  Settings,
  Users,
  AlertTriangle,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: Link2,
  },
  {
    name: 'Compliance',
    href: '/compliance',
    icon: Shield,
  },
  {
    name: 'Invoices',
    href: '/invoices',
    icon: FileText,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn('w-64 bg-white border-r border-gray-200', className)}>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-white' : 'text-gray-400')} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Compliance Alert */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">3 invoices flagged</p>
              <p className="text-xs text-yellow-700 mt-1">
                Review and fix compliance issues
              </p>
              <Link
                href="/compliance/flagged"
                className="text-xs font-medium text-yellow-800 hover:text-yellow-900 mt-2 inline-block"
              >
                View flagged →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

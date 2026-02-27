'use client';

import { useState } from 'react';
import { AdminUser } from '@/types/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Shield, ShieldAlert } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AdminTableProps {
  users: AdminUser[];
  onEdit?: (user: AdminUser) => void;
  onDelete?: (userId: string) => void;
  onToggleMFA?: (userId: string) => void;
}

export function AdminTable({ users, onEdit, onDelete, onToggleMFA }: AdminTableProps) {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>MFA</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'super_admin' ? 'destructive' : 'default'}>
                  {user.role === 'super_admin' ? (
                    <ShieldAlert className="h-3 w-3 mr-1" />
                  ) : (
                    <Shield className="h-3 w-3 mr-1" />
                  )}
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.mfaEnabled ? (
                  <Badge variant="success">Enabled</Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {user.lastLogin
                  ? formatDistanceToNow(user.lastLogin, { addSuffix: true })
                  : 'Never'
                }
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit?.(user)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleMFA?.(user.id)}>
                      {user.mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-error"
                      onClick={() => onDelete?.(user.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

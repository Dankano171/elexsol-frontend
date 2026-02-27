'use client';

import { useState } from 'react';
import { AuditLogEntry } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import { Search } from 'lucide-react';

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export function AuditLog({ logs }: AuditLogProps) {
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(
    (log) =>
      log.adminEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entityType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audit Log</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <Badge variant="outline" className="mt-0.5">
                {log.action}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{log.adminEmail}</span>
                  {' '}{log.action.toLowerCase()}{' '}
                  <span className="font-mono text-xs">{log.entityType}</span>
                  {log.entityId && (
                    <span className="text-xs text-gray-500 ml-1">
                      [{log.entityId}]
                    </span>
                  )}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatDateTime(log.timestamp)}
                  </span>
                  {log.ipAddress && (
                    <>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{log.ipAddress}</span>
                    </>
                  )}
                </div>
                {Object.keys(log.details).length > 0 && (
                  <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No audit logs found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

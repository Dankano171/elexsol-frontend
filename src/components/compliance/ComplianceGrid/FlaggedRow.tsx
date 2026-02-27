'use client';

import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { ComplianceInvoice } from '@/types/compliance';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { InlineEditor } from '../InlineEditor';
import { cn } from '@/lib/utils';

interface FlaggedRowProps {
  row: Row<ComplianceInvoice>;
}

export function FlaggedRow({ row }: FlaggedRowProps) {
  const [expanded, setExpanded] = useState(false);
  const invoice = row.original;

  return (
    <>
      <TableRow className="border-l-4 border-l-error bg-error/5">
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {cell.column.id === 'actions' ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ) : cell.column.id === 'status' ? (
              <Badge variant="destructive" className="flex items-center w-fit">
                <AlertCircle className="h-3 w-3 mr-1" />
                Flagged
              </Badge>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </TableCell>
        ))}
      </TableRow>

      {/* Expanded Error Details */}
      {expanded && (
        <TableRow>
          <TableCell colSpan={row.getVisibleCells().length} className="bg-gray-50 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Validation Errors</h4>
              <div className="space-y-3">
                {invoice.validationErrors?.map((error, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-error">{error.field}</p>
                        <p className="text-sm text-gray-600 mt-1">{error.message}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {error.code}
                      </Badge>
                    </div>
                    
                    {/* Inline Editor for editable fields */}
                    {error.field && (
                      <div className="mt-3 pt-3 border-t">
                        <InlineEditor
                          invoiceId={invoice.id}
                          field={error.field}
                          currentValue={invoice[error.field as keyof ComplianceInvoice]}
                          onSave={() => setExpanded(false)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

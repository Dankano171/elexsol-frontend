'use client';

import { Row } from '@tanstack/react-table';
import { ComplianceInvoice } from '@/types/compliance';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { flexRender } from '@tanstack/react-table';
import { Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface GridRowProps {
  row: Row<ComplianceInvoice>;
}

export function GridRow({ row }: GridRowProps) {
  return (
    <TableRow data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {cell.column.id === 'actions' ? (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/invoices/${row.original.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

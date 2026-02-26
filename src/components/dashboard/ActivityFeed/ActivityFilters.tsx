'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

interface ActivityFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export function ActivityFilters({ filter, onFilterChange }: ActivityFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filter} onValueChange={onFilterChange}>
          <DropdownMenuRadioItem value="all">All activities</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="unread">Unread</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="actionable">Action required</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="invoice_created">Invoices</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="invoice_paid">Payments</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compliance_flagged">Compliance</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="integration_synced">Integrations</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

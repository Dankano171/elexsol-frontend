'use client';

import { useIntegrationStore } from '@/lib/store/integrationStore';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, ArrowUpDown } from 'lucide-react';

export function IntegrationFilters() {
  const {
    filterProvider,
    setFilterProvider,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useIntegrationStore();

  return (
    <div className="flex items-center space-x-2">
      {/* Provider Filter */}
      <Select value={filterProvider} onValueChange={setFilterProvider}>
        <SelectTrigger className="w-[140px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="All Providers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Providers</SelectItem>
          <SelectItem value="zoho">Zoho</SelectItem>
          <SelectItem value="whatsapp">WhatsApp</SelectItem>
          <SelectItem value="quickbooks">QuickBooks</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
        <SelectTrigger className="w-[140px]">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="lastSync">Last Sync</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Order Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        <ArrowUpDown className={cn(
          'h-4 w-4 transition-transform',
          sortOrder === 'desc' && 'rotate-180'
        )} />
      </Button>
    </div>
  );
}

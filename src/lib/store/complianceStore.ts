import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ComplianceState {
  selectedInvoices: string[];
  expandedRows: string[];
  columnVisibility: Record<string, boolean>;
  columnWidths: Record<string, number>;
  filters: {
    status?: string[];
    dateRange?: { from: Date; to: Date };
    customer?: string;
  };
  sortBy: { id: string; desc: boolean }[];
  pageSize: number;
  currentPage: number;

  setSelectedInvoices: (invoiceIds: string[]) => void;
  toggleRow: (invoiceId: string) => void;
  selectAll: () => void;
  clearSelected: () => void;
  
  setExpandedRows: (rows: string[]) => void;
  toggleExpanded: (invoiceId: string) => void;
  
  setColumnVisibility: (visibility: Record<string, boolean>) => void;
  setColumnWidth: (columnId: string, width: number) => void;
  
  setFilters: (filters: Partial<ComplianceState['filters']>) => void;
  clearFilters: () => void;
  
  setSortBy: (sortBy: { id: string; desc: boolean }[]) => void;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  
  resetTable: () => void;
}

export const useComplianceStore = create<ComplianceState>()(
  persist(
    (set, get) => ({
      selectedInvoices: [],
      expandedRows: [],
      columnVisibility: {
        select: true,
        invoiceNumber: true,
        customerName: true,
        issueDate: true,
        dueDate: true,
        totalAmount: true,
        status: true,
        actions: true,
      },
      columnWidths: {},
      filters: {},
      sortBy: [{ id: 'issueDate', desc: true }],
      pageSize: 10,
      currentPage: 1,

      setSelectedInvoices: (invoiceIds) =>
        set({ selectedInvoices: invoiceIds }),

      toggleRow: (invoiceId) =>
        set((state) => ({
          selectedInvoices: state.selectedInvoices.includes(invoiceId)
            ? state.selectedInvoices.filter((id) => id !== invoiceId)
            : [...state.selectedInvoices, invoiceId],
        })),

      selectAll: () =>
        set((state) => ({
          selectedInvoices: [], // This would need access to all IDs
        })),

      clearSelected: () =>
        set({ selectedInvoices: [] }),

      setExpandedRows: (rows) =>
        set({ expandedRows: rows }),

      toggleExpanded: (invoiceId) =>
        set((state) => ({
          expandedRows: state.expandedRows.includes(invoiceId)
            ? state.expandedRows.filter((id) => id !== invoiceId)
            : [...state.expandedRows, invoiceId],
        })),

      setColumnVisibility: (visibility) =>
        set({ columnVisibility: visibility }),

      setColumnWidth: (columnId, width) =>
        set((state) => ({
          columnWidths: {
            ...state.columnWidths,
            [columnId]: width,
          },
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      clearFilters: () =>
        set({ filters: {} }),

      setSortBy: (sortBy) =>
        set({ sortBy }),

      setPageSize: (size) =>
        set({ pageSize: size, currentPage: 1 }),

      setCurrentPage: (page) =>
        set({ currentPage: page }),

      resetTable: () =>
        set({
          selectedInvoices: [],
          expandedRows: [],
          columnVisibility: {
            select: true,
            invoiceNumber: true,
            customerName: true,
            issueDate: true,
            dueDate: true,
            totalAmount: true,
            status: true,
            actions: true,
          },
          filters: {},
          sortBy: [{ id: 'issueDate', desc: true }],
          pageSize: 10,
          currentPage: 1,
        }),
    }),
    {
      name: 'compliance-storage',
      partialize: (state) => ({
        columnVisibility: state.columnVisibility,
        columnWidths: state.columnWidths,
        pageSize: state.pageSize,
      }),
    }
  )
);

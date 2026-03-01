import { create } from 'zustand';

interface ComplianceState {
  selectedRows: string[];
  statusFilter: string;
  toggleRow: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setStatusFilter: (status: string) => void;
}

export const useComplianceStore = create<ComplianceState>((set) => ({
  selectedRows: [],
  statusFilter: 'all',
  toggleRow: (id) => set((s) => ({
    selectedRows: s.selectedRows.includes(id)
      ? s.selectedRows.filter(r => r !== id)
      : [...s.selectedRows, id],
  })),
  selectAll: (ids) => set({ selectedRows: ids }),
  clearSelection: () => set({ selectedRows: [] }),
  setStatusFilter: (status) => set({ statusFilter: status }),
}));

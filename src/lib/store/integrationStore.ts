import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Integration, IntegrationProvider } from '@/types/integrations';

interface IntegrationState {
  activeSyncs: Record<string, boolean>;
  lastSyncResults: Record<string, any>;
  expandedCards: string[];
  filterProvider: IntegrationProvider | 'all';
  sortBy: 'name' | 'status' | 'lastSync';
  sortOrder: 'asc' | 'desc';

  setActiveSync: (integrationId: string, isSyncing: boolean) => void;
  setSyncResult: (integrationId: string, result: any) => void;
  toggleExpanded: (integrationId: string) => void;
  setFilterProvider: (provider: IntegrationProvider | 'all') => void;
  setSortBy: (sortBy: 'name' | 'status' | 'lastSync') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearSyncResults: () => void;
}

export const useIntegrationStore = create<IntegrationState>()(
  persist(
    (set, get) => ({
      activeSyncs: {},
      lastSyncResults: {},
      expandedCards: [],
      filterProvider: 'all',
      sortBy: 'lastSync',
      sortOrder: 'desc',

      setActiveSync: (integrationId, isSyncing) =>
        set((state) => ({
          activeSyncs: {
            ...state.activeSyncs,
            [integrationId]: isSyncing,
          },
        })),

      setSyncResult: (integrationId, result) =>
        set((state) => ({
          lastSyncResults: {
            ...state.lastSyncResults,
            [integrationId]: result,
          },
          activeSyncs: {
            ...state.activeSyncs,
            [integrationId]: false,
          },
        })),

      toggleExpanded: (integrationId) =>
        set((state) => ({
          expandedCards: state.expandedCards.includes(integrationId)
            ? state.expandedCards.filter((id) => id !== integrationId)
            : [...state.expandedCards, integrationId],
        })),

      setFilterProvider: (provider) =>
        set({ filterProvider: provider }),

      setSortBy: (sortBy) =>
        set({ sortBy }),

      setSortOrder: (order) =>
        set({ sortOrder: order }),

      clearSyncResults: () =>
        set({ lastSyncResults: {} }),
    }),
    {
      name: 'integration-storage',
      partialize: (state) => ({
        expandedCards: state.expandedCards,
        filterProvider: state.filterProvider,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }),
    }
  )
);

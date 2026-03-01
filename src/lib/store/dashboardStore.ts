import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  chartPeriod: 'week' | 'month' | 'quarter' | 'year';
  setChartPeriod: (period: DashboardState['chartPeriod']) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      chartPeriod: 'month',
      setChartPeriod: (period) => set({ chartPeriod: period }),
    }),
    { name: 'dashboard-storage' }
  )
);

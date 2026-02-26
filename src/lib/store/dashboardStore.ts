import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityItem } from '@/types/dashboard';

interface DashboardState {
  dismissedActivities: string[];
  acknowledgedActivities: string[];
  chartPreferences: {
    revenuePeriod: 'week' | 'month' | 'quarter' | 'year';
    velocityPeriod: 'month' | 'quarter';
  };
  favoriteMetrics: string[];
  
  dismissActivity: (activityId: string) => void;
  acknowledgeActivity: (activityId: string) => void;
  setChartPeriod: (chart: 'revenue' | 'velocity', period: any) => void;
  toggleFavoriteMetric: (metricId: string) => void;
  isActivityDismissed: (activityId: string) => boolean;
  isActivityAcknowledged: (activityId: string) => boolean;
  isMetricFavorite: (metricId: string) => boolean;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      dismissedActivities: [],
      acknowledgedActivities: [],
      chartPreferences: {
        revenuePeriod: 'month',
        velocityPeriod: 'month',
      },
      favoriteMetrics: ['revenue', 'paymentVelocity', 'cashFlow'],

      dismissActivity: (activityId) =>
        set((state) => ({
          dismissedActivities: [...state.dismissedActivities, activityId],
        })),

      acknowledgeActivity: (activityId) =>
        set((state) => ({
          acknowledgedActivities: [...state.acknowledgedActivities, activityId],
        })),

      setChartPeriod: (chart, period) =>
        set((state) => ({
          chartPreferences: {
            ...state.chartPreferences,
            [`${chart}Period`]: period,
          },
        })),

      toggleFavoriteMetric: (metricId) =>
        set((state) => ({
          favoriteMetrics: state.favoriteMetrics.includes(metricId)
            ? state.favoriteMetrics.filter((id) => id !== metricId)
            : [...state.favoriteMetrics, metricId],
        })),

      isActivityDismissed: (activityId) =>
        get().dismissedActivities.includes(activityId),

      isActivityAcknowledged: (activityId) =>
        get().acknowledgedActivities.includes(activityId),

      isMetricFavorite: (metricId) =>
        get().favoriteMetrics.includes(metricId),
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        chartPreferences: state.chartPreferences,
        favoriteMetrics: state.favoriteMetrics,
      }),
    }
  )
);

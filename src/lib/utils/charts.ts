import { formatNigerianNumber } from './utils';

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const defaultChartDimensions: ChartDimensions = {
  width: 800,
  height: 400,
  margin: { top: 20, right: 30, bottom: 50, left: 60 },
};

export const chartColors = {
  primary: '#0056b3',
  secondary: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8',
  gray: '#6c757d',
  lightGray: '#e9ecef',
  gradients: {
    primary: ['#0056b3', '#4d94ff'],
    secondary: ['#28a745', '#5cb85c'],
    warning: ['#ffc107', '#ffdb6d'],
  },
};

export const formatChartValue = (value: number, type: 'currency' | 'number' | 'percent' | 'days'): string => {
  switch (type) {
    case 'currency':
      return formatNigerianNumber(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'days':
      return `${value.toFixed(0)}d`;
    default:
      return value.toLocaleString();
  }
};

export const calculateMovingAverage = (data: number[], window: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - window + 1);
    const end = i + 1;
    const windowData = data.slice(start, end);
    const average = windowData.reduce((a, b) => a + b, 0) / windowData.length;
    result.push(average);
  }
  return result;
};

export const findAnomalies = (data: number[], threshold: number = 2): number[] => {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(
    data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length
  );
  
  return data.map(value => Math.abs(value - mean) > threshold * stdDev ? value : 0);
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getChartAspectRatio = (width: number): number => {
  if (width < 640) return 0.75; // Mobile
  if (width < 1024) return 0.6; // Tablet
  return 0.5; // Desktop
};

export const getResponsiveFontSize = (width: number): { axis: number; label: number } => {
  if (width < 640) {
    return { axis: 10, label: 12 };
  }
  if (width < 1024) {
    return { axis: 11, label: 13 };
  }
  return { axis: 12, label: 14 };
};

'use client';

import { TimerStatus } from '@/types/regulatory';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TimerProgressProps {
  status: TimerStatus;
  size?: number;
}

export function TimerProgress({ status, size = 120 }: TimerProgressProps) {
  const getColor = () => {
    if (status.isExpired) return '#dc3545';
    switch (status.warningLevel) {
      case 'low':
        return '#28a745';
      case 'medium':
        return '#ffc107';
      case 'high':
      case 'critical':
        return '#dc3545';
      default:
        return '#0056b3';
    }
  };

  const hours = Math.floor(status.remainingSeconds / 3600);
  const minutes = Math.floor((status.remainingSeconds % 3600) / 60);
  const seconds = status.remainingSeconds % 60;

  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={status.percentage}
        text={`${hours}h`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: getColor(),
          textColor: getColor(),
          trailColor: '#e9ecef',
        })}
      />
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

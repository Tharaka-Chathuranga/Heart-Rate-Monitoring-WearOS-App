export interface HeartRateData {
  heartRate: number;
  timestamp: number;
}

export interface HealthKitResponse {
  value: number;
  startDate: string;
  endDate: string;
  unit: string;
}

export interface MonitoringState {
  heartRate: number | null;
  isMonitoring: boolean;
  error: string | null;
}
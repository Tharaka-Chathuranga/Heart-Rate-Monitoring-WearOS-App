import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { HealthKitService } from './HealthKitService';

type HeartRateCallback = (rate: number) => void;

export class HeartRateMonitor {
  private listeners: Array<{ remove: () => void }>;

  constructor() {
    this.listeners = [];
  }

  async initialize(): Promise<void> {
    if (Platform.OS === 'ios') {
      await HealthKitService.initialize();
    }
  }

  startMonitoring(callback: HeartRateCallback): void {
    if (Platform.OS === 'ios') {
      HealthKitService.startHeartRateMonitoring((error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        callback(results.value);
      });
    }
  }

  stopMonitoring(): void {
    this.listeners.forEach(listener => listener.remove());
    this.listeners = [];
  }
}
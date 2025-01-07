import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import SensorManager from 'react-native-sensors';

interface SensorData {
  value: number;
  timestamp: number;
}

export class HeartRateSensor {
  private eventEmitter: NativeEventEmitter | null = null;
  private subscription: any = null;

  async initialize(): Promise<void> {
    if (Platform.OS === 'android') {
      // Request permissions for Android
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
          {
            title: "Heart Rate Sensor Permission",
            message: "This app needs access to your heart rate sensor",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Body sensors permission denied');
        }
      } catch (err) {
        throw new Error('Failed to request sensor permission');
      }
    }
  }

  startReading(onHeartRate: (rate: number) => void): void {
    if (Platform.OS === 'android') {
      // Android implementation using native sensor
      SensorManager.startHeartRateUpdate((data: SensorData) => {
        onHeartRate(data.value);
      });
    }
  }

  stopReading(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}


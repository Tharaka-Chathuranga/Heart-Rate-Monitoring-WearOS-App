
import AppleHealthKit, {
  HealthInputOptions,
  HealthObserver,
  HealthValue,
} from 'react-native-health';
import { Platform } from 'react-native';
import { HealthKitResponse } from 'src/types/heartRate';

const PERMS = AppleHealthKit.Constants.Permissions;

const healthKitOptions = {
  permissions: {
    read: [PERMS.HeartRate],
  },
};

export class HealthKitService {
  static initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Platform.OS !== 'ios') {
        reject(new Error('HealthKit is only available on iOS'));
        return;
      }

      AppleHealthKit.initHealthKit(healthKitOptions, (error: string) => {
        if (error) {
          reject(new Error(error));
          return;
        }
        resolve();
      });
    });
  }

  static startHeartRateMonitoring(
    callback: (error: string | null, results: HealthKitResponse) => void
  ): void {
    const options: HealthInputOptions = {
      unit: 'bpm',
    };

    AppleHealthKit.observeHeartRate(options, callback);
  }
}
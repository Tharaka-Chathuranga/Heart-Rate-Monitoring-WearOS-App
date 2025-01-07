// import { useState, useEffect } from 'react';
// import { HeartRateMonitor } from 'src/services/HeartRateMonitor';
// import { HeartRateData, MonitoringState } from 'src/types/heartRate';
// import { sendHeartRate } from 'src/api/heartRateApi';
//
// export const useHeartRate = (): MonitoringState & {
//   startMonitoring: () => Promise<void>;
//   stopMonitoring: () => void;
// } => {
//   const [state, setState] = useState<MonitoringState>({
//     heartRate: null,
//     isMonitoring: false,
//     error: null,
//   });
//
//   const monitor = new HeartRateMonitor();
//
//   const startMonitoring = async (): Promise<void> => {
//     try {
//       await monitor.initialize();
//       setState(prev => ({ ...prev, isMonitoring: true }));
//
//       monitor.startMonitoring((rate: number) => {
//         setState(prev => ({ ...prev, heartRate: rate }));
//         const heartRateData: HeartRateData = {
//           heartRate: rate,
//           timestamp: Date.now(),
//         };
//         sendHeartRate(heartRateData).catch(console.error);
//       });
//     } catch (err) {
//       setState(prev => ({
//         ...prev,
//         error: err instanceof Error ? err.message : 'Unknown error',
//         isMonitoring: false,
//       }));
//     }
//   };
//
//   const stopMonitoring = (): void => {
//     monitor.stopMonitoring();
//     setState(prev => ({ ...prev, isMonitoring: false }));
//   };
//
//   useEffect(() => {
//     return () => {
//       stopMonitoring();
//     };
//   }, []);
//
//   return {
//     ...state,
//     startMonitoring,
//     stopMonitoring,
//   };
// };
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { HeartRateSensor } from '../services/HeartRateSensor';
import { HeartRateSimulator } from '../services/HeartRateSimulator';

interface UseHeartRateOptions {
  simulateData?: boolean;
  initialActivity?: 'rest' | 'walking' | 'running';
}

export const useHeartRate = (options: UseHeartRateOptions = {}) => {
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentActivity, setCurrentActivity] = useState(options.initialActivity || 'rest');

  const sensor = options.simulateData ? new HeartRateSimulator() : new HeartRateSensor();

  const startMonitoring = async () => {
    try {
      if (!options.simulateData) {
        await sensor.initialize();
      }
      setIsMonitoring(true);

      if (options.simulateData) {
        (sensor as HeartRateSimulator).setActivity(currentActivity);
        (sensor as HeartRateSimulator).startSimulation((rate) => {
          setHeartRate(rate);
        });
      } else {
        (sensor as HeartRateSensor).startReading((rate) => {
          setHeartRate(rate);
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsMonitoring(false);
    }
  };

  const stopMonitoring = () => {
    if (options.simulateData) {
      (sensor as HeartRateSimulator).stopSimulation();
    } else {
      (sensor as HeartRateSensor).stopReading();
    }
    setIsMonitoring(false);
  };

  const changeActivity = (activity: 'rest' | 'walking' | 'running') => {
    if (options.simulateData) {
      setCurrentActivity(activity);
      (sensor as HeartRateSimulator).setActivity(activity);
    }
  };

  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, []);

  return {
    heartRate,
    isMonitoring,
    error,
    currentActivity,
    startMonitoring,
    stopMonitoring,
    changeActivity
  };
};
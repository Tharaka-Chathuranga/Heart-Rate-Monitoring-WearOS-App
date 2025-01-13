import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { HeartRateSensor } from '../services/HeartRateSensor';
import { HeartRateSimulator } from '../services/HeartRateSimulator';
import { HeartRateData } from '../models/HeartRateData';
import { sendHeartRate } from '../api/heartRateApi';
import { connectWebSocket } from '../api/heartRateApi';

interface UseHeartRateOptions {
  simulateData?: boolean;
  initialActivity?: 'rest' | 'walking' | 'running';
}

export const useHeartRate = (options: UseHeartRateOptions = {}) => {
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentActivity, setCurrentActivity] = useState(options.initialActivity || 'rest');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const sensor = options.simulateData ? new HeartRateSimulator() : new HeartRateSensor();
  const handleHeartRateUpdate = async (rate: number) => {
    setHeartRate(rate);
    const heartRateData = HeartRateData.create(rate);
    try {
      await sendHeartRate(heartRateData);
    } catch (error) {
      console.error('Error sending heart rate data:', error);
    }
  };
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
          handleHeartRateUpdate(rate);
        });
      } else {
        (sensor as HeartRateSensor).startReading((rate) => {
          setHeartRate(rate);
           handleHeartRateUpdate(rate);
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
     connectWebSocket();
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
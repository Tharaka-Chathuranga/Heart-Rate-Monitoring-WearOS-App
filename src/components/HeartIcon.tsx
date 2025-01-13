import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

export const HeartIcon = ({ pulsing = true, isMonitoring = false, heartRate = 0 }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const progressValue = React.useRef(new Animated.Value(0)).current;
  const waveValue = React.useRef(new Animated.Value(0)).current;

  // Calculate progress percentage based on BPM (assuming max BPM is 220)
  const bpmProgress = Math.min(heartRate / 220, 1);

  React.useEffect(() => {
    if (pulsing) {
      const pulseAnimation = Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(pulseAnimation).start();
    }

    if (isMonitoring) {
      // Update progress based on BPM
      Animated.timing(progressValue, {
        toValue: bpmProgress,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      // Animate ECG wave
      const waveAnimation = Animated.sequence([
        Animated.timing(waveValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(waveValue, {
          toValue: -0.2,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(waveValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(waveValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]);

      // Adjust loop duration based on BPM
      const interval = heartRate ? (60000 / heartRate) : 1000;
      Animated.loop(
        Animated.sequence([
          waveAnimation,
          Animated.delay(interval - 600), // Subtract wave animation duration
        ])
      ).start();
    }
  }, [pulsing, isMonitoring, heartRate]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const circumference = 2 * Math.PI * 40;

  const progressStroke = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // ECG wave path generator
  const getWavePath = (value) => {
    const baseY = 12;
    const amplitude = 6 * value;
    return `
      M 4 ${baseY}
      L 8 ${baseY}
      L 10 ${baseY - amplitude}
      L 12 ${baseY + amplitude * 2}
      L 14 ${baseY - amplitude}
      L 16 ${baseY}
      L 20 ${baseY}
    `;
  };

  const animatedWavePath = waveValue.interpolate({
    inputRange: [-0.2, 0, 1],
    outputRange: [
      getWavePath(0),
      getWavePath(0),
      getWavePath(1),
    ],
  });

  return (
    <View style={styles.heartWrapper}>
      {isMonitoring && (
        <Svg width="100" height="100" style={styles.progressRing}>
          {/* Background circle */}
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#333333"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r="40"
            stroke="#FF0000"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressStroke}
            strokeLinecap="round"
          />
        </Svg>
      )}
      <Animated.View style={[styles.heartContainer, { transform: [{ scale: scaleValue }] }]}>
        <Svg height="40" width="40" viewBox="0 0 24 24">
          {/* Heart shape */}
          <Path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#FF0000"
          />
          {/* ECG wave */}
          {isMonitoring && (
            <AnimatedPath
              d={animatedWavePath}
              stroke="white"
              strokeWidth="0.5"
              fill="none"
            />
          )}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  heartWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  progressRing: {
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


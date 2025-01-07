// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
//
// interface HeartRateDisplayProps {
//   heartRate: number | null;
// }
//
// export const HeartRateDisplay: React.FC<HeartRateDisplayProps> = ({ heartRate }) => (
//   <View style={styles.container}>
//     <Text style={styles.value}>{heartRate ?? '--'}</Text>
//     <Text style={styles.unit}>BPM</Text>
//   </View>
// );
//
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   value: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#E91E63',
//   },
//   unit: {
//     fontSize: 18,
//     color: '#666',
//   },
// });
//
// import React from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { HeartIcon } from './HeartIcon';
//
// export const HeartRateDisplay = ({ heartRate }) => (
//   <View style={styles.container}>
//     <HeartIcon pulsing={!!heartRate} />
//     <Text style={styles.value}>{heartRate ?? '--'} BPM</Text>
//     <View style={styles.dotsContainer}>
//       <View style={styles.dot} />
//       <View style={styles.dot} />
//       <View style={styles.dot} />
//     </View>
//   </View>
// );
//
// const { width } = Dimensions.get('window');
// const fontSize = Math.round(width * 0.08); // 8% of screen width
//
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '40%',
//     width: '100%',
//   },
//   value: {
//     fontSize,
//     fontWeight: '500',
//     color: '#FFFFFF',
//     marginBottom: '5%',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '15%',
//     height: '5%',
//   },
//   dot: {
//     width: '20%',
//     aspectRatio: 1,
//     borderRadius: 50,
//     backgroundColor: '#666666',
//     marginHorizontal: '5%',
//   },
// });

import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { HeartIcon } from './HeartIcon';
interface HeartRateDisplayProps {
  heartRate: number | null;
  isMonitoring: boolean | null;
}
export const HeartRateDisplay = ({ heartRate, isMonitoring }) => (
//   <View style={styles.container}>
//     <HeartIcon pulsing={!!heartRate} isMonitoring={isMonitoring} />
//     <Text style={styles.value}>{heartRate ?? '--'} BPM</Text>
//     <View style={styles.dotsContainer}>
//       <View style={styles.dot} />
//       <View style={styles.dot} />
//       <View style={styles.dot} />
//     </View>
//   </View>
<View style={styles.container}>
    <HeartIcon
      pulsing={!!heartRate}
      isMonitoring={isMonitoring}
      heartRate={heartRate}
    />
    <Text style={styles.value}>{heartRate ?? '--'} BPM</Text>
    <View style={styles.dotsContainer}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  </View>
);

const { width } = Dimensions.get('window');
const fontSize = Math.round(width * 0.08);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  value: {
    height: '10%',
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '5%',
  },
  dot: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#666666',
    marginHorizontal: '5%',
  },});
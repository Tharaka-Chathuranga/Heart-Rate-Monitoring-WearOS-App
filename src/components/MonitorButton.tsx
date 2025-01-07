// import React from 'react';
// import { StyleSheet, TouchableOpacity, Text } from 'react-native';
//
// interface MonitorButtonProps {
//   onPress: () => void;
//   isMonitoring: boolean;
// }
//
// export const MonitorButton: React.FC<MonitorButtonProps> = ({ onPress, isMonitoring }) => (
//   <TouchableOpacity
//     style={[styles.button, isMonitoring && styles.buttonMonitoring]}
//     onPress={onPress}
//     disabled={isMonitoring}
//   >
//     <Text style={styles.buttonText}>
//       {isMonitoring ? 'Monitoring...' : 'Start Monitoring'}
//     </Text>
//   </TouchableOpacity>
// );
//
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#6200EE',
//     padding: 15,
//     borderRadius: 25,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonMonitoring: {
//     backgroundColor: '#3700B3',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

export const MonitorButton = ({ onPress, isMonitoring }) => (
  <TouchableOpacity
    style={[styles.button, isMonitoring && styles.buttonMonitoring]}
    onPress={onPress}
    disabled={isMonitoring}
  >
    <Text style={styles.buttonText}>
      {isMonitoring ? 'Monitoring...' : 'Start'}
    </Text>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');
const buttonFontSize = Math.round(width * 0.045); // 4.5% of screen width

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    padding: '3%',
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
  },
  buttonMonitoring: {
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: buttonFontSize,
    fontWeight: '500',
  },
});
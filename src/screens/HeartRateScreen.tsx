// // import React from 'react';
// // import { StyleSheet, View, Alert } from 'react-native';
// // import { HeartRateDisplay } from 'src/components/HeartRateDisplay';
// // import { MonitorButton } from 'src/components/MonitorButton';
// // import { useHeartRate } from 'src/hooks/useHeartRate';
// //
// // export const HeartRateScreen: React.FC = () => {
// //   const { heartRate, isMonitoring, error, startMonitoring } = useHeartRate();
// //
// //   React.useEffect(() => {
// //     if (error) {
// //       Alert.alert('Error', error);
// //     }
// //   }, [error]);
// //
// //   return (
// //     <View style={styles.container}>
// //       <HeartRateDisplay heartRate={heartRate} />
// //       <MonitorButton
// //         onPress={startMonitoring}
// //         isMonitoring={isMonitoring}
// //       />
// //     </View>
// //   );
// // };
// //
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#F5F5F5',
// //     padding: 20,
// //   },
// // });
// //
// //
// //
// // // import React from 'react';
// // // import { View, Text, StyleSheet } from 'react-native';
// // //
// // // export const HeartRateScreen: React.FC = () => {
// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Heart Rate Monitor</Text>
// // //       {/* Add heart rate display logic here */}
// // //     </View>
// // //   );
// // // };
// // //
// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#f5f5f5',
// // //   },
// // //   title: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //   },
// // // });
// import React from 'react';
// import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
// import { HeartRateDisplay } from '../components/HeartRateDisplay';
// import { MonitorButton } from '../components/MonitorButton';
// import { useHeartRate } from '../hooks/useHeartRate';
//
// export const HeartRateScreen: React.FC = () => {
//   const {
//     heartRate,
//     isMonitoring,
//     error,
//     currentActivity,
//     startMonitoring,
//     stopMonitoring,
//     changeActivity
//   } = useHeartRate({
//     simulateData: true, // Set to true for simulation
//     initialActivity: 'rest'
//   });
//
//   React.useEffect(() => {
//     if (error) {
//       Alert.alert('Error', error);
//     }
//   }, [error]);
//
//   const activities = ['rest', 'walking', 'running'] as const;
//
//   return (
//     <View style={styles.container}>
//       <HeartRateDisplay heartRate={heartRate} />
//       <MonitorButton
//         onPress={startMonitoring}
//         isMonitoring={isMonitoring}
//       />
//
//       {isMonitoring && (
//         <View style={styles.activitiesContainer}>
//           {activities.map((activity) => (
//             <TouchableOpacity
//               key={activity}
//               style={[
//                 styles.activityButton,
//                 currentActivity === activity && styles.activeButton
//               ]}
//               onPress={() => changeActivity(activity)}
//             >
//               <Text style={styles.activityText}>
//                 {activity.charAt(0).toUpperCase() + activity.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   activitiesContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     gap: 10,
//   },
//   activityButton: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#DDD',
//   },
//   activeButton: {
//     backgroundColor: '#6200EE',
//   },
//   activityText: {
//     color: '#000',
//     fontSize: 14,
//   },
// });

// import React from 'react';
// import { StyleSheet, View, Dimensions } from 'react-native';
// import { HeartRateDisplay } from '../components/HeartRateDisplay';
// import { MonitorButton } from '../components/MonitorButton';
// import { useHeartRate } from '../hooks/useHeartRate';
//
// export const HeartRateScreen = () => {
//   const { heartRate, isMonitoring, error, startMonitoring } = useHeartRate();
//
//   React.useEffect(() => {
//     if (error) {
//       console.error('Heart Rate Error:', error);
//     }
//   }, [error]);
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <HeartRateDisplay heartRate={heartRate} />
//         <MonitorButton
//           onPress={startMonitoring}
//           isMonitoring={isMonitoring}
//         />
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#000000',
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '5%',
//   },
// });

import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { HeartRateDisplay } from '../components/HeartRateDisplay';
import { MonitorButton } from '../components/MonitorButton';
import { useHeartRate } from '../hooks/useHeartRate';

export const HeartRateScreen = () => {
  const {
    heartRate,
    isMonitoring,
    error,
    currentActivity,
    startMonitoring,
    stopMonitoring,
    changeActivity
  } = useHeartRate({
    simulateData: true, // Set to true for simulation
    initialActivity: 'rest'
  });


  const activities = ['rest', 'walking', 'running'] as const;

  React.useEffect(() => {
    if (error) {
      console.error('Heart Rate Error:', error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HeartRateDisplay
          heartRate={heartRate}
          isMonitoring={isMonitoring}
        />
      <MonitorButton
        onPress={startMonitoring}
        isMonitoring={isMonitoring}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
});
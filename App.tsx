import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native';
import { HeartRateScreen } from 'src/screens/HeartRateScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HeartRateScreen />
    </SafeAreaView>
  );
};

export default App;

// import React from 'react';
// import { StyleSheet, View, StatusBar } from 'react-native';
// import { HeartRateScreen } from './src/screens/HeartRateScreen';
// import { MessageDisplayScreen } from './src/screens/MessageDisplayScreen';
// const App = () => {
//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//      <MessageDisplayScreen/>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
// export default App;


// import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from 'src/navigation/AppNavigator';
//
// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <SafeAreaView style={{ flex: 1 }}>
//         <StatusBar barStyle="dark-content" />
//         <AppNavigator />
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// };
//
// export default App;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Your existing home screen
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import { HeartRateScreen } from 'src/screens/HeartRateScreen';
import { EmergencyContact } from '../types/alert';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const contacts: EmergencyContact[] = [
    // Add your emergency contacts here
    { id: '1', name: 'John Doe', phone: '1234567890', relationship: 'Friend', isDoctor: false },
  ];

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HeartRateScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
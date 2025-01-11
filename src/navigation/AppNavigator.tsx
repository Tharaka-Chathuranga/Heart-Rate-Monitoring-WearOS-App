import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Your existing home screen
import EmergencyAlertScreen from '../screens/EmergencyAlertScreen';
import { EmergencyContact } from '../types/alert';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const contacts: EmergencyContact[] = [
    // Add your emergency contacts here
    { id: '1', name: 'John Doe', phone: '1234567890', relationship: 'Friend', isDoctor: false },
  ];

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EmergencyAlert" options={{ title: 'Emergency Alert' }}>
        {(props) => <EmergencyAlertScreen {...props} contacts={contacts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
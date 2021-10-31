import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login/login';
const Stack = createNativeStackNavigator();

export default class BeforeLoginStack extends React.Component {
    render() {
      return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      );
    }
  }

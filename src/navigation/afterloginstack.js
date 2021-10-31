import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default class AfterLoginStack extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }} />
        
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={({ navigation }) => ({
          })} />
      </Stack.Navigator>
    );
  }
}

import React, { useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BeforeLoginStack from './beforeloginstack';
import AfterLoginStack from './afterloginstack';
import {AuthContext} from './context';
import {getAuthToken, setAuthToken} from '../utils/local-storage';
import {navigationRef} from './NavigationService';

const RootStack = createNativeStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AfterLoginStack}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={BeforeLoginStack}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  useEffect(() => {
    getAuthToken()
      .then(token => {       
        if (token) {
          setUserToken(token);
        } else {
          setUserToken(null);
        }
        setTimeout(()=>{
          setIsLoading(false);
        },1000);
      })
      .catch(error => {
        setUserToken(null);
        setIsLoading(false);
      });
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: u => {
        setIsLoading(false);
        setUserToken(u);
      },
      signUp: u => {
        setIsLoading(false);
        setUserToken(u);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        setAuthToken(null);
      }
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef} value={authContext}>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

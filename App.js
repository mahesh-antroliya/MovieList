/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainNavigation from './src/navigation/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    );
  }
}

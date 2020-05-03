import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigator/AppNavigator';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import store from './store/store';

enableScreens();

export default function App() {
  const [fontLoaded] = useFonts({
    'avenir-book': require('./assets/fonts/Avenir-Book.otf'),
    'avenir-medium': require('./assets/fonts/Avenir-Medium.otf'),
    ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as Navigator from './PokedexNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator.MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

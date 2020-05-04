import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen, {
  PokemonDetailScreenOptions,
} from '../screens/PokemonDetailScreen';
import MoveListScreen from '../screens/MoveListScreen';
import MoveDetailScreen from '../screens/MoveDetailScreen';
import ItemListScreen from '../screens/ItemListScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

import { defaultNavigatorOptions } from './default-options';

const PokemonStackNavigator = createStackNavigator();
export const PokemonNavigator = () => {
  return (
    <PokemonStackNavigator.Navigator screenOptions={defaultNavigatorOptions}>
      <PokemonStackNavigator.Screen
        name="PokemonList"
        component={PokemonListScreen}
      />
      <PokemonStackNavigator.Screen
        name="PokemonDetails"
        component={PokemonDetailScreen}
        options={PokemonDetailScreenOptions}
      />
    </PokemonStackNavigator.Navigator>
  );
};

const MoveStackNavigator = createStackNavigator();
const MoveNavigator = () => {
  return (
    <MoveStackNavigator.Navigator screenOptions={defaultNavigatorOptions}>
      <MoveStackNavigator.Screen name="MoveList" component={MoveListScreen} />
      <MoveStackNavigator.Screen
        name="MoveDetail"
        component={MoveDetailScreen}
      />
    </MoveStackNavigator.Navigator>
  );
};

const ItemStackNavigator = createStackNavigator();
const ItemNavigator = () => {
  return (
    <ItemStackNavigator.Navigator screenOptions={defaultNavigatorOptions}>
      <ItemStackNavigator.Screen name="ItemList" component={ItemListScreen} />
      <ItemStackNavigator.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
      />
    </ItemStackNavigator.Navigator>
  );
};

const MainStackNavigator = createBottomTabNavigator();
export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <MainStackNavigator.Screen
        name="Pokémon"
        component={PokemonNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require('../assets/pikachu-tab-icon.png')}
              style={{ width: 26, height: 26, opacity: focused ? 1 : 0.3 }}
              color={color}
            />
          ),
        }}
      />
      <MainStackNavigator.Screen
        name="Moves"
        component={MoveNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require('../assets/moves-tab-icon.png')}
              color={color}
              style={{ width: 26, height: 26, opacity: focused ? 1 : 0.3 }}
            />
          ),
        }}
      />
      <MainStackNavigator.Screen
        name="Items"
        component={ItemNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require('../assets/items-tab-icon.png')}
              color={color}
              style={{ width: 26, height: 26, opacity: focused ? 1 : 0.3 }}
            />
          ),
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

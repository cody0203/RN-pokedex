import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomSearchBar from '../components/CustomSearchBar';
import { Button } from 'react-native-elements';

const MoveListScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');

  const searchInputHandler = (value) => {
    setSearchInput(value);
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Moves',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Search"
            iconName="search"
            onPress={() => navigation.navigate('Search')}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <Text>Move List Screen!</Text>

      <Button title="test" onPress={() => console.log('a')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MoveListScreen;

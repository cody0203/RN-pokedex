import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';

const ItemListScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Items',
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
    <View>
      <Text>Item List Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemListScreen;

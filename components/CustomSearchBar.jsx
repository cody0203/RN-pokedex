import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';

const CustomSearchBar = ({ value, onChangeText, loading, placeholder }) => {
  return (
    <SearchBar
      platform="default"
      lightTheme
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBar}
      round
      onChangeText={onChangeText}
      value={value}
      showLoading={loading}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderBottomColor: '#ddd',
    borderTopColor: 'transparent',
    alignSelf: 'center',
  },
  searchBar: {
    height: 35,
  },
});

export default CustomSearchBar;

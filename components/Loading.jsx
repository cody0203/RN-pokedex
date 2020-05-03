import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ style }) => {
  return (
    <ActivityIndicator style={{ ...styles.loading, style }} size="large" />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;

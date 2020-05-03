import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ children, style }) => {
  return (
    <Text style={{ ...styles.text, ...style }} numberOfLines={2}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'avenir-medium',
    flexShrink: 1,
  },
});

export default Title;

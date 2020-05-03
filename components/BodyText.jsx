import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = ({ children, style }) => {
  return (
    <Text style={{ ...styles.bodyText, ...style }} numberOfLines={2}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'avenir-book',
    flexShrink: 1,
    color: '#ddd',
  },
});

export default BodyText;

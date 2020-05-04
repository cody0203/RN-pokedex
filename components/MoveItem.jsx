import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Title from './Title';
import BodyText from './BodyText';

import { TYPE_MAPPING } from '../constants/types-mapping';

const MoveItem = ({ name, desc, type, index, data }) => {
  return (
    <View
      style={{
        ...styles.moveContainer,
        borderBottomColor:
          index === data.length - 1 ? 'transparent' : '#E3E3E3',
      }}
    >
      <View style={styles.nameContainer}>
        <Title style={styles.title}>{name}</Title>
        <BodyText style={styles.desc}>{desc}</BodyText>
      </View>
      <Image source={TYPE_MAPPING[type].uri} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  moveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  nameContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 19,
    color: '#4F4F4F',
  },
  desc: {
    flexShrink: 1,
    color: '#A4A4A4',
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default MoveItem;

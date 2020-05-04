import React, { useEffect } from 'react';
import { get, capitalize } from 'lodash';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Loading from '../components/Loading';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Title from '../components/Title';

import * as actions from '../store/move/move.actions';
import { TYPE_MAPPING } from '../constants/types-mapping';
import { transformedColor } from '../utils/helper';
import BodyText from '../components/BodyText';

const MoveDetailScreen = ({ navigation, route }) => {
  // INITIAL
  const dispatch = useDispatch();
  const { moveId } = route.params;
  const { setOptions } = navigation;

  // REDUX ACTION
  const { moveDetailLoading, moveDetailData } = useSelector((store) =>
    get(store, 'moveReducer.moveDetail')
  );

  // REUSEABLE
  const moveType = get(moveDetailData, 'type.name');
  const moveName = get(moveDetailData, 'name');
  const getBackgroundColor = moveType
    ? TYPE_MAPPING[capitalize(moveType).trim()].bgColor
    : 'white';
  const desc = get(moveDetailData, 'effect_entries[0].effect');
  // LIFECYCLE HOOKS
  useEffect(() => {
    dispatch(actions.fetchMoveDetailStart(moveId));
  }, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Favorite"
              iconName="keyboard-arrow-left"
              onPress={() => navigation.goBack()}
              color="white"
              size={40}
            />
          </HeaderButtons>
        );
      },
      headerBackTitle: null,
      headerBackground: () => (
        <LinearGradient
          colors={
            moveDetailLoading
              ? ['white', 'white']
              : transformedColor(getBackgroundColor).colors
          }
          start={[0, 1]}
          locations={transformedColor(getBackgroundColor).locations}
          style={{
            height: '100%',
          }}
        />
      ),
      headerBackTitle: null,
      headerTitle: () => null,
      headerBackTitleStyle: {
        fontFamily: 'avenir-book',
        color: 'white',
      },
    });
  }, [moveDetailLoading]);

  if (moveDetailLoading) {
    return <Loading />;
  }

  return (
    <LinearGradient
      colors={transformedColor(getBackgroundColor).colors}
      start={[0, 1]}
      locations={transformedColor(getBackgroundColor).locations}
      style={{
        height: '100%',
      }}
    >
      <View style={styles.screen}>
        <View style={styles.avatarContainer}>
          <Image
            source={TYPE_MAPPING[capitalize(moveType).trim()].uri}
            style={styles.avatar}
          />
        </View>
        <View style={styles.mainContentContainer}>
          <View style={styles.nameContainer}>
            <Title style={styles.name}>{moveName}</Title>
            <Image
              source={TYPE_MAPPING[capitalize(moveType).trim()].tag}
              style={styles.tag}
            />
            <View style={styles.descContainer}>
              <BodyText style={styles.desc}>{desc}</BodyText>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  avatarContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  mainContentContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 110,
    height: '100%',
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  name: {
    fontFamily: 'avenir-book',
    fontSize: 40,
  },
  tag: {
    marginVertical: 15,
    width: 110,
    height: 30,
  },
  descContainer: {},
  desc: {
    fontSize: 15,
    color: '#4F4F4F',
    marginHorizontal: 15,
  },
});

export default MoveDetailScreen;

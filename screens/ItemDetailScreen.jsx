import React, { useEffect } from 'react';
import { get, capitalize } from 'lodash';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Loading from '../components/Loading';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Title from '../components/Title';

import * as actions from '../store/item/item.actions';
import BodyText from '../components/BodyText';

const ItemDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { itemId } = route.params;
  const { setOptions } = navigation;
  const gradientColors = ['#84E090', '#75DEDD'];
  const gradiendLocations = [0, 1];
  // REDUX ACTION
  const { itemDetailLoading, itemDetailData } = useSelector((store) =>
    get(store, 'itemReducer.itemDetail')
  );

  // REUSEABLE
  const itemName = get(itemDetailData, 'name');
  const cost = get(itemDetailData, 'cost');
  const effect = get(itemDetailData, 'effect_entries[0].effect');
  const avatar = get(itemDetailData, 'sprites.default');

  // LIFECYCLE HOOKS
  useEffect(() => {
    dispatch(actions.fetchItemDetailStart(itemId));
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
          colors={gradientColors}
          start={[0, 1]}
          locations={gradiendLocations}
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
  }, [itemDetailLoading]);


  return (
    <LinearGradient
      colors={gradientColors}
      start={[0, 1]}
      locations={gradiendLocations}
      style={{
        height: '100%',
      }}
    >
      {itemDetailLoading ? (
        <Loading />
      ) : (
        <View style={styles.screen}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: `https://www.serebii.net/itemdex/sprites/pgl/${itemName
                  .replace(/ /g, '')
                  .toLowerCase()}.png`,
              }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.mainContentContainer}>
            <View style={styles.nameContainer}>
              <Title style={styles.name}>{itemName}</Title>
            </View>

            <View style={styles.costContainer}>
              <BodyText style={styles.cost}>{cost}</BodyText>
              <Image
                source={require('../assets/currency.png')}
                style={styles.currencyImage}
              />
            </View>

            <View style={styles.effectContainer}>
              <BodyText style={styles.effect} numberOfLines={100}>
                {effect.replace(/\n:/g, '\n\n').replace(/[^\S\r\n]+/g, ' ')}
              </BodyText>
            </View>
          </View>
        </View>
      )}
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
    width: 80,
    height: 80,
  },
  mainContentContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 75,
    height: '100%',
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  name: {
    fontFamily: 'avenir-book',
    fontSize: 40,
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cost: {
    fontSize: 19,
    marginRight: 10,
    color: '#4F4F4F',
  },
  currencyImage: {
    width: 11,
    height: 15,
  },
  effectContainer: {
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effect: {
    fontSize: 15,
    color: '#4F4F4F',
    textAlign: 'center',
  },
});

export default ItemDetailScreen;

import React, { useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Loading from '../components/Loading';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PokemonDetailButtonGroup from '../components/PokemonDetail/PokemonDetailButtonGroup';
import PokemonDetailStats from '../components/PokemonDetail/PokemonDetailStats';
import PokemonDetailEvolutions from '../components/PokemonDetail/PokemonDetailEvolutions';
import PokemonDetailMoves from '../components/PokemonDetail/PokemonDetailMoves';

import { TYPE_MAPPING } from '../constants/types-mapping';
import { transformedColor } from '../utils/helper';

import * as actions from '../store/pokemon/pokemon.actions';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const PokemonDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { pokemonId } = route.params;
  const { setOptions } = navigation;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentTab, setCurrentTab] = useState(1);

  const { pokemonDetailLoading, pokemonDetailData } = useSelector((store) =>
    get(store, 'pokemonReducer.pokemonDetail')
  );

  const pokemonName = get(pokemonDetailData, 'name');
  const pokemonTypes = get(pokemonDetailData, 'field_pokemon_type');
  const avatar = get(pokemonDetailData, 'avatar');
  const STA = get(pokemonDetailData, 'sta');
  const ATK = get(pokemonDetailData, 'atk');
  const DEF = get(pokemonDetailData, 'def');
  const CP = get(pokemonDetailData, 'cp');
  const generation = get(pokemonDetailData, 'field_pokemon_generation');
  const captureRate = get(pokemonDetailData, 'catch_rate');
  const fleeRate = get(pokemonDetailData, 'field_flee_rate');
  const getBackgroundColor = pokemonTypes
    ? TYPE_MAPPING[pokemonTypes[0].trim()].bgColor
    : 'white';

  const evolutions = get(pokemonDetailData, 'evolutions');

  useEffect(() => {
    dispatch(actions.fetchPokemonDetailStart(pokemonId));
  }, [pokemonId]);

  const opacityAnimated = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 1.5, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  });

  const invertedOpacityAnimated = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const groupButtonAnimated = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT + 100, HEADER_MAX_HEIGHT + 100],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const invertedGroupButtonAnimated = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT + 100, HEADER_MAX_HEIGHT + 100],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  // Set header options
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
            pokemonDetailLoading
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
      headerTitle: () => (
        <Animated.Text
          style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'avenir-medium',
            opacity: invertedOpacityAnimated,
          }}
        >
          {pokemonName}
        </Animated.Text>
      ),
      headerBackTitleStyle: {
        fontFamily: 'avenir-book',
        color: 'white',
      },
    });
  }, [pokemonDetailLoading]);

  const changeTabHandler = (tab) => setCurrentTab(tab);

  if (pokemonDetailLoading) {
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
        <Animated.View
          style={{
            ...styles.overlayGroupButton,
            opacity: invertedGroupButtonAnimated,
          }}
        >
          <PokemonDetailButtonGroup
            linerBackgroundColor={transformedColor(getBackgroundColor).colors}
            titleColor={transformedColor(getBackgroundColor).colors[0]}
            currentTab={currentTab}
            changeTabHandler={changeTabHandler}
          />
        </Animated.View>
        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
        >
          <View style={styles.avatarContainer}>
            <Animated.Image
              source={{ uri: avatar }}
              style={{ ...styles.avatar, opacity: opacityAnimated }}
            />
          </View>

          <View style={styles.mainContentContainer}>
            <View style={styles.titleContainer}>
              <Animated.Text
                style={{
                  ...styles.title,
                  opacity: opacityAnimated,
                }}
              >
                {pokemonName}
              </Animated.Text>
            </View>

            <View style={styles.tagContainer}>
              {pokemonTypes &&
                pokemonTypes.map((type) => (
                  <Image
                    source={TYPE_MAPPING[type.trim()].tag}
                    key={type}
                    style={styles.tag}
                  />
                ))}
            </View>

            <Animated.View
              style={{
                opacity: groupButtonAnimated,
              }}
            >
              <PokemonDetailButtonGroup
                linerBackgroundColor={
                  transformedColor(getBackgroundColor).colors
                }
                titleColor={transformedColor(getBackgroundColor).colors[0]}
                currentTab={currentTab}
                changeTabHandler={changeTabHandler}
              />
            </Animated.View>

            {currentTab === 1 && (
              <PokemonDetailStats
                mainColor={transformedColor(getBackgroundColor).colors[0]}
                STA={STA}
                ATK={ATK}
                DEF={DEF}
                CP={CP}
                generation={generation}
                captureRate={captureRate}
                fleeRate={fleeRate}
              />
            )}

            {currentTab === 2 && (
              <PokemonDetailEvolutions totalEvolutions={evolutions} />
            )}

            {currentTab === 3 && <PokemonDetailMoves />}
          </View>
        </Animated.ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  header: {
    marginTop: 50,
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  avatarContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 3,
    height: 170,
  },
  avatar: {
    flex: 1,
    height: 170,
    width: 170,
    resizeMode: 'stretch',
  },
  mainContentContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 150,
    minHeight: 800,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontFamily: 'avenir-book',
    fontSize: 40,
    marginTop: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tag: {
    marginHorizontal: 15,
    width: 110,
    height: 30,
  },
  overlayGroupButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
  },
});

export default PokemonDetailScreen;

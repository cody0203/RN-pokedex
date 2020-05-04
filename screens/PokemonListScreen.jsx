import React, { useEffect, useRef, useState } from 'react';
import { get, isEmpty } from 'lodash';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';

import CustomSearchBar from '../components/CustomSearchBar';
import Loading from '../components/Loading';
import Title from '../components/Title';
import BodyText from '../components/BodyText';

import * as actions from '../store/pokemon/pokemon.actions';
import { TYPE_MAPPING } from '../constants/types-mapping';
import * as customHooks from '../utils/custom-hooks';
import { zeroPad, isCloseToBottom } from '../utils/helper';

const PokemonListScreen = ({ navigation }) => {
  // REDUX DATA
  const {
    pokemonListData,
    pokemonListLoading,
    pokemonListMeta,
  } = useSelector((store) => get(store, 'pokemonReducer.pokemonList'));

  // REUSEABLE
  const dispatch = useDispatch();
  const listRef = useRef(null);
  useScrollToTop(listRef);
  const [searchInput, setSearchInput] = useState('');
  const [tempData, setTempData] = useState([]);
  const [multipleFetch, setMultipleFetch] = useState(false);
  const debouncedSearchInput = customHooks.useDebounce(searchInput, 200);
  const currentPage = get(pokemonListMeta, 'currentPage');
  const pages = get(pokemonListMeta, 'pages');
  const isLastPage = pages && pages[pages.length - 1] === currentPage;

  const renderListFooterHandler = () => {
    if (!pokemonListLoading || isLastPage) return null;

    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  };

  const searchInputHandler = (value) => {
    setSearchInput(value);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    if (pokemonListData && currentPage === 1) {
      setTempData(pokemonListData);
      return;
    }

    if (pokemonListData && currentPage !== 1) {
      setTempData(tempData.concat(pokemonListData));
    }
  }, [pokemonListData, currentPage]);

  useEffect(() => {
    dispatch(
      actions.fetchPokemonListStart({
        name: debouncedSearchInput,
      })
    );
    if (listRef.current && debouncedSearchInput.length >= 1) {
      listRef.current.scrollToIndex({ animated: true, offset: 0, index: 0 });
    }
  }, [debouncedSearchInput, dispatch, listRef]);

  const renderPokemonList = ({ item }) => {
    const name = get(item, 'name');
    const types = get(item, 'field_pokemon_type');
    const number = get(item, 'id');
    const avatar = get(item, 'avatar');

    const goToDetailsHandler = () => {
      navigation.navigate('PokemonDetails', { pokemonId: number });
    };

    return (
      <TouchableOpacity onPress={goToDetailsHandler}>
        <View style={styles.pokemonItemContainer}>
          <View style={styles.commonInfo}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.nameContainer}>
              <Title style={styles.name}>{name}</Title>
              <BodyText style={styles.number}>#{zeroPad(number, 3)}</BodyText>
            </View>
          </View>
          <View style={styles.typeContainer}>
            {types &&
              types.map((type, index) => (
                <Image
                  source={TYPE_MAPPING[type.trim()].uri}
                  style={styles.type}
                  PlaceholderContent={<ActivityIndicator />}
                  key={index}
                />
              ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <CustomSearchBar
        value={searchInput}
        onChangeText={searchInputHandler}
        loading={pokemonListLoading}
        placeholder="Enter pokemon's name"
      />

      {pokemonListLoading && !multipleFetch ? (
        <Loading />
      ) : (
        <FlatList
          ref={listRef}
          data={tempData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPokemonList}
          contentContainerStyle={styles.list}
          onEndThreshold={0.5}
          ListFooterComponent={renderListFooterHandler}
          ListFooterComponentStyle={{
            paddingVertical: tempData && tempData.length > 5 && 25,
          }}
          scrollEventThrottle={400}
          onEndReached={({ distanceFromEnd }) => {
            if (!pokemonListLoading && !isLastPage && pokemonListMeta) {
              setMultipleFetch(true);
            }
          }}
          onScroll={({ nativeEvent }) => {
            if (
              isCloseToBottom(nativeEvent) &&
              !isLastPage &&
              pokemonListMeta &&
              debouncedSearchInput.length <= 0
            ) {
              dispatch(
                actions.fetchPokemonListStart({
                  page: currentPage + 1,
                  limit: 10,
                })
              );
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: {
    backgroundColor: 'white',
  },
  pokemonItemContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  commonInfo: {
    width: '70%',

    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  name: {
    fontSize: Dimensions.get('window').width < 400 ? 14 : 19,
    color: '#4F4F4F',
    flexShrink: 1,
  },
  number: {
    fontSize: Dimensions.get('window').width < 400 ? 10 : 15,
    color: '#A4A4A4',
  },
  typeContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-end',
  },
  type: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    borderRadius: 40,
  },
});

export default PokemonListScreen;

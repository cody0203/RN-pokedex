import React, { useEffect, useState, useRef } from 'react';
import { get } from 'lodash';
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
import CustomSearchBar from '../components/CustomSearchBar';
import { useScrollToTop } from '@react-navigation/native';

import Loading from '../components/Loading';

import * as actions from '../store/move/move.actions';
import { TYPE_MAPPING } from '../constants/types-mapping';

import * as customHooks from '../utils/custom-hooks';
import { isCloseToBottom } from '../utils/helper';

import Title from '../components/Title';

const MoveListScreen = ({ navigation }) => {
  // REDUX DATA
  const { moveListData, moveListMeta, moveListLoading } = useSelector((store) =>
    get(store, 'moveReducer.moveList')
  );

  // REUSEABLE
  const dispatch = useDispatch();
  const listRef = useRef(null);
  useScrollToTop(listRef);
  const [searchInput, setSearchInput] = useState('');
  const [tempData, setTempData] = useState([]);
  const [multipleFetch, setMultipleFetch] = useState(false);
  const debouncedSearchInput = customHooks.useDebounce(searchInput, 200);
  const currentPage = get(moveListMeta, 'currentPage');
  const pages = get(moveListMeta, 'pages');
  const isLastPage = pages && pages[pages.length - 1] === currentPage;

  const renderListFooterHandler = () => {
    if (!moveListLoading || isLastPage) return null;

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
    dispatch(
      actions.fetchMoveListStart({
        name: debouncedSearchInput,
      })
    );
    if (listRef.current && debouncedSearchInput.length >= 1) {
      listRef.current.scrollToIndex({ animated: true, offset: 0, index: 0 });
    }
  }, [debouncedSearchInput, dispatch, listRef]);

  useEffect(() => {
    if (moveListData && currentPage === 1) {
      setTempData(moveListData);
      return;
    }

    if (moveListData && currentPage !== 1) {
      setTempData(tempData.concat(moveListData));
    }
  }, [moveListData, currentPage]);

  const renderMoveList = ({ item }) => {
    const type = get(item, 'type.name');
    const moveId = get(item, 'id');

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MoveDetail', { moveId })}
      >
        <View style={styles.moveItem}>
          <Title style={styles.name}>{item.name}</Title>

          {type && (
            <Image
              source={get(
                TYPE_MAPPING[
                  type.charAt(0).toUpperCase() + type.slice(1).trim()
                ],
                'uri'
              )}
              style={styles.type}
              PlaceholderContent={<ActivityIndicator />}
              key={type.name}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <CustomSearchBar
        value={searchInput}
        onChangeText={searchInputHandler}
        loading={moveListLoading}
        placeholder="Enter move's name"
      />

      {moveListLoading && !multipleFetch ? (
        <Loading />
      ) : (
        <FlatList
          ref={listRef}
          data={tempData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMoveList}
          contentContainerStyle={styles.list}
          onEndThreshold={0.5}
          ListFooterComponent={renderListFooterHandler}
          ListFooterComponentStyle={{
            paddingVertical: tempData && tempData.length > 5 && 25,
          }}
          scrollEventThrottle={400}
          onEndReached={({ distanceFromEnd }) => {
            if (!moveListLoading && !isLastPage && moveListMeta) {
              setMultipleFetch(true);
            }
          }}
          onScroll={({ nativeEvent }) => {
            if (
              isCloseToBottom(nativeEvent) &&
              !isLastPage &&
              moveListMeta &&
              debouncedSearchInput.length <= 0
            ) {
              dispatch(
                actions.fetchMoveListStart({
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
  screen: {
    flex: 1,
  },
  type: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    borderRadius: 50,
  },
  list: {
    backgroundColor: 'white',
  },
  moveItem: {
    marginHorizontal: 15,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: Dimensions.get('window').width < 400 ? 14 : 19,
  },
});

export default MoveListScreen;

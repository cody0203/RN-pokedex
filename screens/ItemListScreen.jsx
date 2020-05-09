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
import Title from '../components/Title';
import BodyText from '../components/BodyText';

import * as actions from '../store/item/item.actions';

import * as customHooks from '../utils/custom-hooks';
import { isCloseToBottom } from '../utils/helper';

const ItemListScreen = ({ navigation }) => {
  // REDUX DATA
  const { itemListData, itemListMeta, itemListLoading } = useSelector((store) =>
    get(store, 'itemReducer.itemList')
  );

  // REUSEABLE
  const dispatch = useDispatch();
  const listRef = useRef(null);
  useScrollToTop(listRef);
  const [searchInput, setSearchInput] = useState('');
  const [tempData, setTempData] = useState([]);
  const [multipleFetch, setMultipleFetch] = useState(false);
  const debouncedSearchInput = customHooks.useDebounce(searchInput, 200);
  const currentPage = get(itemListMeta, 'currentPage');
  const pages = get(itemListMeta, 'pages');
  const isLastPage = pages && pages[pages.length - 1] === currentPage;

  const renderListFooterHandler = () => {
    if (!itemListLoading || isLastPage) return null;

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
      actions.fetchItemListStart({
        name: debouncedSearchInput,
      })
    );
    if (listRef.current && debouncedSearchInput.length >= 1) {
      listRef.current.scrollToIndex({ animated: true, offset: 0, index: 0 });
    }
  }, [debouncedSearchInput, dispatch, listRef]);

  useEffect(() => {
    if (itemListData && currentPage === 1) {
      setTempData(itemListData);
      return;
    }

    if (itemListData && currentPage !== 1) {
      setTempData(tempData.concat(itemListData));
    }
  }, [itemListData, currentPage]);

  const renderMoveList = ({ item }) => {
    const avatar = get(item, 'sprites.default');
    const itemId = get(item, 'id');
    const cost = get(item, 'cost');

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemDetail', { itemId })}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemDetail}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Title style={styles.name}>{item.name}</Title>
          </View>
          <View style={styles.costContainer}>
            <BodyText style={styles.cost}>{cost}</BodyText>
            <Image
              style={styles.currencyIcon}
              source={require('../assets/currency.png')}
            />
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
        loading={itemListLoading}
        placeholder="Enter move's name"
      />

      {itemListLoading && !multipleFetch ? (
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
            if (!itemListLoading && !isLastPage && itemListMeta) {
              setMultipleFetch(true);
            }
          }}
          onScroll={({ nativeEvent }) => {
            if (
              isCloseToBottom(nativeEvent) &&
              !isLastPage &&
              itemListMeta &&
              debouncedSearchInput.length <= 0
            ) {
              dispatch(
                actions.fetchItemListStart({
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  list: {
    backgroundColor: 'white',
  },
  itemContainer: {
    marginHorizontal: 15,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: Dimensions.get('window').width < 400 ? 14 : 19,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    color: '#A4A4A4',
    fontSize: 17,
  },
  currencyIcon: {
    width: 11,
    height: 15,
    marginLeft: 10,
  },
});
export default ItemListScreen;

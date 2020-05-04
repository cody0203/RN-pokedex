import React, { useEffect, useState, useRef } from 'react';
import { get } from 'lodash';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomSearchBar from '../components/CustomSearchBar';
import { useScrollToTop } from '@react-navigation/native';

import { Button } from 'react-native-elements';
import Loading from '../components/Loading';

import * as actions from '../store/move/move.actions';
import * as customHooks from '../utils/custom-hooks';
import { isCloseToBottom } from '../utils/helper';

import Title from '../components/Title';

const MoveListScreen = ({ navigation }) => {
    // REDUX DATA
    const { moveListData, moveListMeta, moveListLoading } = useSelector((store) => get(store, 'moveReducer.moveList'));

    console.log(moveListData, moveListLoading);
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
        return (
            <View>
                <Title>{item.name}</Title>
            </View>
        );
    };

    return (
        <View>
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

const styles = StyleSheet.create({});

export default MoveListScreen;
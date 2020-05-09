import { put, takeLatest, call } from 'redux-saga/effects';
import * as apis from './item.apis';
import * as types from './item.types';
import * as actions from './item.actions';

function* fetchItemListAsync({ payload }) {
  try {
    const response = yield call(apis.fetchItemList, payload);
    const { data, meta } = response.data;

    yield put(actions.fetchItemListSuccess({ data, meta }));
  } catch (error) {
    yield put(actions.fetchItemListFailure(error.message));
  }
}

function* fetchItemDetailAsync({ payload }) {
  try {
    const response = yield call(apis.fetchItemDetail, payload);
    const data = response.data;
    console.log(data);
    yield put(actions.fetchItemDetailSuccess(data));
  } catch (error) {
    yield put(actions.fetchItemDetailFailure(error.message));
  }
}

export function* itemSagas() {
  yield takeLatest(types.FETCH_ITEM_LIST.START, fetchItemListAsync);
  yield takeLatest(types.FETCH_ITEM_DETAIL.START, fetchItemDetailAsync);
}

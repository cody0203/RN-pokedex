import { put, takeLatest, call } from 'redux-saga/effects';
import * as apis from './move.apis';
import * as types from './move.types';
import * as actions from './move.actions';

function* fetchMoveListAsync({ payload }) {
  try {
    const response = yield call(apis.fetchMoveList, payload);
    const { data, meta } = response.data;

    yield put(actions.fetchMoveListSuccess({ data, meta }));
  } catch (error) {
    yield put(actions.fetchMoveListFailure(error.message));
  }
}

function* fetchMoveDetailAsync({ payload }) {
  try {
    const response = yield call(apis.fetchMoveDetails, payload);
    const data = response.data;
    yield put(actions.fetchMoveDetailSuccess(data));
  } catch (error) {
    yield put(actions.fetchMoveDetailFailure(error.message));
  }
}

export function* moveSagas() {
  yield takeLatest(types.FETCH_MOVE_LIST.START, fetchMoveListAsync);
  yield takeLatest(types.FETCH_MOVE_DETAIL.START, fetchMoveDetailAsync);
}

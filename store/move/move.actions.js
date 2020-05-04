import { createAction } from 'redux-actions';
import * as types from './move.types';

export const fetchMoveListStart = createAction(types.FETCH_MOVE_LIST.START, (payload) => payload);
export const fetchMoveListSuccess = createAction(types.FETCH_MOVE_LIST.SUCCESS, (payload) => payload);
export const fetchMoveListFailure = createAction(types.FETCH_MOVE_LIST.FAILURE, (error) => error);

export const fetchMoveDetailStart = createAction(types.FETCH_MOVE_DETAIL.START, (payload) => payload);
export const fetchMoveDetailSuccess = createAction(types.FETCH_MOVE_DETAIL.SUCCESS, (payload) => payload);
export const fetchMoveDetailFailure = createAction(types.FETCH_MOVE_DETAIL.FAILURE, (error) => error);

import { createAction } from 'redux-actions';
import * as types from './item.types';

export const fetchItemListStart = createAction(
  types.FETCH_ITEM_LIST.START,
  (payload) => payload
);

export const fetchItemListSuccess = createAction(
  types.FETCH_ITEM_LIST.SUCCESS,
  (payload) => payload
);

export const fetchItemListFailure = createAction(
  types.FETCH_ITEM_LIST.FAILURE,
  (error) => error
);

export const fetchItemDetailStart = createAction(
  types.FETCH_ITEM_DETAIL.START,
  (payload) => payload
);

export const fetchItemDetailSuccess = createAction(
  types.FETCH_ITEM_DETAIL.SUCCESS,
  (payload) => payload
);

export const fetchItemDetailFailure = createAction(
  types.FETCH_ITEM_DETAIL.FAILURE,
  (error) => error
);

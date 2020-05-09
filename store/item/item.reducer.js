import * as types from './item.types';

const INITIAL_STATE = {
  itemList: {
    itemListData: null,
    itemListMeta: null,
    itemListLoading: true,
  },
  itemDetail: {
    itemDetailData: null,
    itemDetailLoading: true,
  },
  error: null,
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ITEM_LIST.START:
      return {
        ...state,
        itemList: {
          itemListData: null,
          itemListMeta: null,
          itemListLoading: true,
        },
      };

    case types.FETCH_ITEM_LIST.SUCCESS:
      const itemListData = action.payload.data;
      const itemListMeta = action.payload.meta;
      return {
        ...state,
        itemList: {
          itemListData,
          itemListMeta,
          itemListLoading: false,
        },
      };

    case types.FETCH_ITEM_LIST.FAILURE:
      return {
        ...state,
        itemList: {
          itemListData: null,
          itemListMeta: null,
          itemListLoading: false,
        },
        error: action.payload,
      };

    case types.FETCH_ITEM_DETAIL.START:
      return {
        ...state,
        itemDetail: {
          itemDetailData: null,
          itemDetailLoading: true,
        },
      };

    case types.FETCH_ITEM_DETAIL.SUCCESS:
      return {
        ...state,
        itemDetail: {
          itemDetailData: action.payload,
          itemDetailLoading: false,
        },
      };

    case types.FETCH_ITEM_DETAIL.FAILURE:
      return {
        ...state,
        itemDetail: {
          itemDetailData: null,
          itemDetailLoading: false,
        },
        error: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;

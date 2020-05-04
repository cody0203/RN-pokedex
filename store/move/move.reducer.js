import * as types from './move.types';

const INITIAL_STATE = {
    moveList: {
        moveListData: null,
        moveListMeta: null,
        moveListLoading: true,
    },
    moveDetail: {
        moveDetailData: null,
        moveDetailLoading: true,
    },
    error: null,
};

const moveReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_MOVE_LIST.START:
            return {
                ...state,
                moveList: {
                    moveListData: null,
                    moveListMeta: null,
                    moveListLoading: true,
                },
            };

        case types.FETCH_MOVE_LIST.SUCCESS:
            const moveListData = action.payload.data;
            const moveListMeta = action.payload.meta;

            return {
                ...state,
                moveList: {
                    moveListData,
                    moveListMeta,
                    moveListLoading: false,
                },
            };

        case types.FETCH_MOVE_LIST.FAILURE:
            return {
                ...state,
                moveList: {
                    moveListData: null,
                    moveListMeta: null,
                    moveListLoading: false,
                },
                error: action.payload,
            };

        case types.FETCH_MOVE_DETAIL.START:
            return {
                ...state,
                moveDetail: {
                    moveDetailData: null,
                    moveDetailLoading: true,
                },
            };

        case types.FETCH_MOVE_DETAIL.SUCCESS:
            return {
                ...state,
                moveDetail: {
                    moveDetailData: action.payload,
                    moveDetailLoading: false,
                },
            };

        case types.FETCH_MOVE_DETAIL.FAILURE:
            return {
                ...state,
                moveDetail: {
                    moveDetailData: null,
                    moveDetailLoading: false,
                },
                error: action.payload,
            };
        default:
            return state;
    }
};

export default moveReducer;

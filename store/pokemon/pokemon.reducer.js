import * as types from './pokemon.types';

const INITIAL_STATE = {
  pokemonList: {
    pokemonListData: null,
    pokemonListMeta: null,
    pokemonListLoading: true,
  },
  pokemonDetail: {
    pokemonDetailData: null,
    pokemonDetailLoading: true,
  },
  error: null,
};

const pokemonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_POKEMON_LIST.START:
      return {
        ...state,
        pokemonList: {
          pokemonListData: null,
          pokemonListMeta: null,
          pokemonListLoading: true,
        },
      };

    case types.FETCH_POKEMON_LIST.SUCCESS:
      const pokemonListData = action.payload.data;
      const pokemonListMeta = action.payload.meta;
      return {
        ...state,
        pokemonList: {
          pokemonListData,
          pokemonListMeta,
          pokemonListLoading: false,
        },
      };

    case types.FETCH_POKEMON_LIST.FAILURE:
      return {
        ...state,
        pokemonList: {
          pokemonListData: null,
          pokemonListMeta: null,
          pokemonListLoading: false,
        },
        error: action.payload,
      };

    case types.FETCH_POKEMON_DETAIL.START:
      return {
        ...state,
        pokemonDetail: {
          pokemonDetailData: null,
          pokemonDetailLoading: true,
        },
      };

    case types.FETCH_POKEMON_DETAIL.SUCCESS:
      const pokemonDetailData = action.payload;
      return {
        ...state,
        pokemonDetail: {
          pokemonDetailData,
          pokemonDetailLoading: false,
        },
      };

    case types.FETCH_POKEMON_DETAIL.FAILURE:
      return {
        ...state,
        pokemonDetail: {
          pokemonDetailData: null,
          pokemonDetailLoading: false,
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default pokemonReducer;

import { createAction } from 'redux-actions';
import * as types from './pokemon.types';

export const fetchPokemonListStart = createAction(
  types.FETCH_POKEMON_LIST.START,
  (payload) => payload
);

export const fetchPokemonListSuccess = createAction(
  types.FETCH_POKEMON_LIST.SUCCESS,
  (payload) => payload
);

export const fetchPokemonListFailure = createAction(
  types.FETCH_POKEMON_LIST.FAILURE,
  (error) => error
);

export const fetchPokemonDetailStart = createAction(
  types.FETCH_POKEMON_DETAIL.START,
  (payload) => payload
);

export const fetchPokemonDetailSuccess = createAction(
  types.FETCH_POKEMON_DETAIL.SUCCESS,
  (payload) => payload
);

export const fetchPokemonDetailFailure = createAction(
  types.FETCH_POKEMON_DETAIL.FAILURE,
  (error) => error
);

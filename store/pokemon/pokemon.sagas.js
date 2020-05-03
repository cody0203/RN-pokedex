import { put, takeLatest, call, all } from 'redux-saga/effects';
import { get } from 'lodash';
import * as apis from './pokemon.apis';
import * as types from './pokemon.types';
import * as actions from './pokemon.actions';

function* fetchPokemonListAsync({ payload }) {
  try {
    const response = yield call(apis.fetchPokemonList, payload);

    const { data, meta } = response.data;
    yield put(actions.fetchPokemonListSuccess({ data, meta }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchPokemonListFailure(error.message));
  }
}

function* fetchPokemonDetailAsync({ payload }) {
  try {
    const response = yield call(apis.fetchPokemonDetail, payload);
    yield put(actions.fetchPokemonDetailSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchPokemonDetailFailure(error.message));
  }
}

export function* pokemonSagas() {
  yield takeLatest(types.FETCH_POKEMON_LIST.START, fetchPokemonListAsync);
  yield takeLatest(types.FETCH_POKEMON_DETAIL.START, fetchPokemonDetailAsync);
}

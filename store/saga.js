import { all, fork } from 'redux-saga/effects';
import { pokemonSagas } from './pokemon/pokemon.sagas';

function* rootSaga() {
  yield all([fork(pokemonSagas)]);
}

export default rootSaga;

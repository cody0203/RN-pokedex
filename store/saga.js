import { all, fork } from 'redux-saga/effects';
import { pokemonSagas } from './pokemon/pokemon.sagas';
import { moveSagas } from './move/move.sagas';
import { itemSagas } from './item/item.sagas';

function* rootSaga() {
  yield all([fork(pokemonSagas), fork(moveSagas), fork(itemSagas)]);
}

export default rootSaga;

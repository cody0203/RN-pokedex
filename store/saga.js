import { all, fork } from 'redux-saga/effects';
import { pokemonSagas } from './pokemon/pokemon.sagas';
import { moveSagas } from './move/move.sagas';

function* rootSaga() {
    yield all([fork(pokemonSagas), fork(moveSagas)]);
}

export default rootSaga;

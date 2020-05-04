import { combineReducers } from 'redux';
import pokemonReducer from './pokemon/pokemon.reducer';
import moveReducer from './move/move.reducer';

const rootReducer = combineReducers({
    pokemonReducer: pokemonReducer,
    moveReducer: moveReducer,
});

export default rootReducer;

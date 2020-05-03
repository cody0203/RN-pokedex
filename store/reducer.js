import { combineReducers } from 'redux';
import pokemonReducer from './pokemon/pokemon.reducer';

const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
});

export default rootReducer;

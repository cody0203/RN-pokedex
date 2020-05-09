import { combineReducers } from 'redux';
import pokemonReducer from './pokemon/pokemon.reducer';
import moveReducer from './move/move.reducer';
import itemReducer from './item/item.reducer';

const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
  moveReducer: moveReducer,
  itemReducer: itemReducer,
});

export default rootReducer;

import React from 'react';
import { get } from 'lodash';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MoveItem from '../MoveItem';

const PokemonDetailMoves = () => {
  const { pokemonDetailData } = useSelector((store) =>
    get(store, 'pokemonReducer.pokemonDetail')
  );

  const moves = get(pokemonDetailData, 'moves');

  return (
    <View>
      {moves &&
        moves.map((move, index) => (
          <View key={move.id}>
            <MoveItem
              name={move.name
                .replace('-', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              type={move.type.name.replace(/\b\w/g, (l) => l.toUpperCase())}
              desc={move.effect_entries[0].short_effect}
              index={index}
              data={moves}
            />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PokemonDetailMoves;

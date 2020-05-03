import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import Title from '../Title';

const PokemonDetailEvolutions = ({ totalEvolutions }) => {
  return (
    <View style={styles.evolutionContainer}>
      {totalEvolutions.length > 1 ? (
        totalEvolutions.map((pokemon, index) => {
          return (
            <View key={pokemon.number}>
              {index < totalEvolutions.length - 1 && (
                <View style={styles.rowContainer}>
                  <View style={styles.firstTypeContainer}>
                    <View style={styles.avatarContainer}>
                      <View style={styles.firstColumn}>
                        <Image
                          style={styles.avatar}
                          source={{ uri: pokemon.avatar }}
                        />

                        <Title style={styles.pokemonName}>{pokemon.name}</Title>
                      </View>
                      <Image
                        style={styles.arrow}
                        source={require('../../assets/arrow.png')}
                      />
                    </View>
                  </View>

                  <View style={styles.resultContainer}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: totalEvolutions[index + 1].avatar,
                      }}
                    />
                    <Title style={styles.pokemonName}>
                      {totalEvolutions[index + 1].name}
                    </Title>
                  </View>
                </View>
              )}
            </View>
          );
        })
      ) : (
        <View>
          <Title>This pokemon have only 1 type</Title>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  evolutionContainer: {
    marginHorizontal: Dimensions.get('window').width < 400 ? 20 : 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: Dimensions.get('window').width < 400 ? 80 : 100,
    height: Dimensions.get('window').width < 400 ? 80 : 100,
    marginVertical: 30,
    flex: 1,
  },
  arrow: {
    maxWidth: 100,
    marginHorizontal: Dimensions.get('window').width < 400 ? 10 : 20,
  },
  pokemonName: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
  },
  resultContainer: {},
});

export default PokemonDetailEvolutions;

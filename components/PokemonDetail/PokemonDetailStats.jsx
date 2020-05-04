import React from 'react';
import { get } from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';

import { zeroPad } from '../../utils/helper';

import BodyText from '../BodyText';
import Title from '../Title';

const maxStats = {
  STA: 400,
  ATK: 400,
  DEF: 400,
  CP: 4000,
};

const PokemonDetailStats = ({
  mainColor,
  STA = 0,
  DEF = 0,
  ATK = 0,
  CP = 0,
  generation,
  captureRate,
  fleeRate,
}) => {
  const stats = [
    { label: 'STA', value: STA },
    { label: 'ATK', value: ATK },
    { label: 'DEF', value: DEF },
    { label: 'CP', value: CP },
  ];

  const { pokemonDetailData } = useSelector((store) =>
    get(store, 'pokemonReducer.pokemonDetail')
  );

  const abilities = get(pokemonDetailData, 'abilities_data');
  const sprites = get(pokemonDetailData, 'sprites');

  console.log(pokemonDetailData);
  return (
    <View style={styles.statsContainer}>
      <View style={styles.sectionContainer}>
        {stats.map((stat) => (
          <View style={styles.statCountContainer} key={stat.label}>
            <BodyText style={{ ...styles.statLabel, color: mainColor }}>
              {stat.label}
            </BodyText>
            <BodyText style={styles.statNumber}>
              {zeroPad(stat.value, 3)}
            </BodyText>
            <Progress.Bar
              progress={stat.value / maxStats[stat.label]}
              unfilledColor="#F0F0F0"
              color={mainColor}
              borderColor="transparent"
              width={300}
              height={8}
            />
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Title style={{ ...styles.sectionTitle, color: mainColor }}>
          Capture
        </Title>

        <View style={styles.captureContainer}>
          <View style={styles.captureContentContainer}>
            <Title style={{ ...styles.captureTitle, color: mainColor }}>
              Generation
            </Title>
            <BodyText style={styles.captureContent}>{generation}</BodyText>
          </View>
          <View
            style={{
              ...styles.captureContentContainer,
              borderColor: '#ddd',
              borderLeftWidth: 1,
              borderRightWidth: 1,
            }}
          >
            <Title style={{ ...styles.captureTitle, color: mainColor }}>
              Capture Rate
            </Title>
            <BodyText style={styles.captureContent}>{captureRate}</BodyText>
          </View>
          <View style={styles.captureContentContainer}>
            <Title style={{ ...styles.captureTitle, color: mainColor }}>
              Flee Rate
            </Title>
            <BodyText style={styles.captureContent}>{fleeRate}</BodyText>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Title style={{ ...styles.sectionTitle, color: mainColor }}>
          Abilities
        </Title>

        {abilities &&
          abilities.map((ability, i) => (
            <View
              key={i}
              style={{
                ...styles.abilitySectionContainer,
                borderBottomColor: i === abilities.length - 1 && 'transparent',
              }}
            >
              <View style={styles.abilityTitleContainer}>
                <Title style={{ ...styles.abilityTitle, color: mainColor }}>
                  {ability.name}
                </Title>
                <Title>
                  {ability.is_hidden && (
                    <Icon name="eye-with-line" color={mainColor} size={16} />
                  )}
                </Title>
              </View>
              <BodyText>{ability.effect_entries[0].short_effect}</BodyText>
            </View>
          ))}
      </View>

      {sprites && (
        <View style={styles.sectionContainer}>
          <Title style={{ ...styles.sectionTitle, color: mainColor }}>
            Sprites
          </Title>
          <View style={styles.spritesContainer}>
            {sprites.front_default && (
              <View>
                <Title style={{ ...styles.spriteTitle, color: mainColor }}>
                  Normal Front
                </Title>
                <Image
                  source={{ uri: sprites.front_default }}
                  style={styles.spriteImage}
                />
              </View>
            )}
            {sprites.back_default && (
              <View>
                <Title style={{ ...styles.spriteTitle, color: mainColor }}>
                  Normal Back
                </Title>
                <Image
                  source={{ uri: sprites.back_default }}
                  style={styles.spriteImage}
                />
              </View>
            )}
          </View>

          <View style={{ ...styles.spritesContainer, marginBottom: 0 }}>
            {sprites.front_shiny && (
              <View>
                <Title style={{ ...styles.spriteTitle, color: mainColor }}>
                  Shiny Front
                </Title>
                <Image
                  source={{ uri: sprites.front_shiny }}
                  style={styles.spriteImage}
                />
              </View>
            )}
            {sprites.back_shiny && (
              <View>
                <Title style={{ ...styles.spriteTitle, color: mainColor }}>
                  Shiny Back
                </Title>
                <Image
                  source={{ uri: sprites.back_shiny }}
                  style={styles.spriteImage}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 30,
  },
  statCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  captureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captureContentContainer: {
    paddingHorizontal: 15,
  },
  captureTitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  captureContent: {
    fontSize: 16,
  },
  abilitySectionContainer: {
    padding: 15,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  abilityTitleContainer: {
    flexDirection: 'row',
  },
  abilityTitle: {
    textTransform: 'capitalize',
    fontSize: 18,
    marginRight: 10,
  },
  spritesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  spriteImage: {
    width: 96,
    height: 96,
  },
  spriteTitle: {
    fontSize: 18,
  },
});

export default PokemonDetailStats;

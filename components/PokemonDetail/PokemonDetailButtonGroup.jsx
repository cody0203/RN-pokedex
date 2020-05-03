import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const PokemonDetailButtonGroup = ({
  linerBackgroundColor,
  titleColor,
  currentTab,
  changeTabHandler,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="STATS"
        onPress={changeTabHandler.bind(this, 1)}
        ViewComponent={LinearGradient}
        buttonStyle={{
          borderRadius: Dimensions.get('window').width < 400 ? 18 : 20,
        }}
        style={styles.tabButton}
        linearGradientProps={
          currentTab === 1
            ? {
                colors: linerBackgroundColor,
                start: { x: 0, y: 1 },
              }
            : {
                colors: ['white', 'white'],
                start: { x: 0, y: 1 },
              }
        }
        titleStyle={{
          color: currentTab !== 1 ? titleColor : 'white',
          fontSize: Dimensions.get('window').width < 400 ? 12 : 15,
        }}
      />
      <Button
        title="EVOLUTIONS"
        ViewComponent={LinearGradient}
        buttonStyle={{
          borderRadius: Dimensions.get('window').width < 400 ? 18 : 20,
        }}
        style={styles.tabButton}
        linearGradientProps={
          currentTab === 2
            ? {
                colors: linerBackgroundColor,
                start: { x: 0, y: 1 },
              }
            : {
                colors: ['white', 'white'],
                start: { x: 0, y: 1 },
              }
        }
        titleStyle={{
          color: currentTab !== 2 ? titleColor : 'white',
          fontSize: Dimensions.get('window').width < 400 ? 12 : 15,
        }}
        onPress={changeTabHandler.bind(this, 2)}
      />

      <Button
        title="MOVES"
        ViewComponent={LinearGradient}
        buttonStyle={{
          borderRadius: Dimensions.get('window').width < 400 ? 18 : 20,
        }}
        style={styles.tabButton}
        linearGradientProps={
          currentTab === 3
            ? {
                colors: linerBackgroundColor,
                start: { x: 0, y: 1 },
              }
            : {
                colors: ['white', 'white'],
                start: { x: 0, y: 1 },
              }
        }
        titleStyle={{
          color: currentTab !== 3 ? titleColor : 'white',
          fontSize: Dimensions.get('window').width < 400 ? 12 : 15,
        }}
        onPress={changeTabHandler.bind(this, 3)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tabButton: {
    width: Dimensions.get('window').width / 3 - 10,
    borderColor: 'transparent',
  },
});

export default PokemonDetailButtonGroup;

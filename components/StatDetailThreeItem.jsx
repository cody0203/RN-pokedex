import React from 'react';
import { View, StyleSheet } from 'react-native';

import Title from './Title';
import BodyText from './BodyText';
import { Dimensions } from 'react-native';

const StatDetailThreeItem = ({
  mainTitle,
  mainColor,
  section_1,
  section_2,
  section_3,
  sectionStyle,
}) => {
  return (
    <View style={styles.mainContainer}>
      {mainTitle && (
        <Title style={{ ...styles.mainTitle, color: mainColor }}>
          {mainTitle}
        </Title>
      )}

      <View style={{ ...styles.sectionContainer, ...sectionStyle }}>
        <View style={styles.sectionContentContainer}>
          <Title style={{ ...styles.sectionTitle, color: mainColor }}>
            {section_1.title}
          </Title>
          <BodyText style={styles.sectionContent}>{section_1.content}</BodyText>
        </View>
        <View
          style={{
            ...styles.sectionContentContainer,
            borderColor: '#ddd',
            borderLeftWidth: 1,
            borderRightWidth: 1,
          }}
        >
          <Title
            style={{
              ...styles.sectionTitle,
              color: mainColor,
            }}
          >
            {section_2.title}
          </Title>
          <BodyText style={styles.sectionContent}>{section_2.content}</BodyText>
        </View>
        <View style={styles.sectionContentContainer}>
          <Title style={{ ...styles.sectionTitle, color: mainColor }}>
            {section_3.title}
          </Title>
          <BodyText style={styles.sectionContent}>{section_3.content}</BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 15,
  },
  mainTitle: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 30,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContentContainer: {
    width: Dimensions.get('window').width / 3,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StatDetailThreeItem;

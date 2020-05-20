/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import data from './data.json';

const TTIView = () => (
  <View style={styles.container}>
    <Text style={styles.titleText}>TTIView</Text>
    <Text style={styles.sizeText}>Size: {data.size}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 160, 192)',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 32,
    textAlign: 'center',
  },
  sizeText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default TTIView;

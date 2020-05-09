import React, {Component, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import MainStackNavigator from './src/navigation/MainStackNavigator';

function App() {
  return <MainStackNavigator />;
}

export default App;

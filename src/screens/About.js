import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Brought you by ....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textLink: {
    color: '#000',
    fontSize: 18,
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#AAA',
    borderRadius: 5,
    padding: 30,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  shareButton: {
    margin: 30,
  },
});

export default About;

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function DetailsView(props) {
  const {route, navigation} = props;
  const {item} = route.params;
  const {meeting_name, start_time, virtual_meeting_link} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{meeting_name}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Start Time: {start_time}</Text>
        <Text style={styles.cardText}>{virtual_meeting_link}</Text>
      </View>
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
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default DetailsView;

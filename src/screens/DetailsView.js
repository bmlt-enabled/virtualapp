import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Share,
  Button,
} from 'react-native';

function DetailsView(props) {
  const {route, navigation} = props;
  const {item} = route.params;
  const {meeting_name, start_time, comments} = item;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share Meeting',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{meeting_name}</Text>
      <Text style={styles.text}>{start_time}</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => Linking.openURL(comments)}>
          <Text style={styles.cardText}>{comments}</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={onShare} title="Share" />
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

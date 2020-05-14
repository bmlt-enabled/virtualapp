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
import Clipboard from '@react-native-community/clipboard';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

function DetailsView(props) {
  const {route} = props;
  const {item, weekday} = route.params;
  const {meeting_name, start_time, comments, location_info} = item;
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: `${meeting_name}\n${weekday} ${start_time}\n${comments}\n${location_info}`,
          title: 'Virtual Meeting Shared',
        },
        {
          subject: 'Virtual Meeting Shared',
        },
      );
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
      <Text style={styles.text}>{weekday}</Text>
      <Text style={styles.text}>{start_time}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(comments)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.textLink}>{comments}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.locationInfo}>{location_info}</Text>
      <TouchableOpacity
        onPress={() =>
          Clipboard.setString(
            `${meeting_name}\n${weekday} ${start_time}\n${comments}\n${location_info}`,
          )
        }>
        <FontAwesome5Icon name="copy" style={styles.copyIcon} size={24} />
      </TouchableOpacity>
      <Button style={styles.shareButton} onPress={onShare} title="Share" />
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
  locationInfo: {
    color: '#000',
    fontSize: 16,
    marginBottom: 20,
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
  copyIcon: {
    marginBottom: 10,
  },
  shareButton: {
    margin: 20,
  },
});

export default DetailsView;

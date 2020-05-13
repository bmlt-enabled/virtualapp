import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';

function DetailsList(props) {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let that = this;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  }, [that]);

  const getLocation = (that) => {
    Geolocation.getCurrentPosition(
      (position) => {
        let currentLongitude = JSON.stringify(position.coords.longitude);
        let currentLatitude = JSON.stringify(position.coords.latitude);

        fetch(
          `https://vphone.bmltenabled.org/api/getMeetings.php?results_count=100&suppress_voice_results=false&latitude=${currentLatitude}&longitude=${currentLongitude}`,
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData(data.filteredList);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          console.log(item.meeting_name);
          return (
            <ListItem
              title={item.meeting_name}
              subtitle={item.start_time}
              bottomDivider
              onPress={() => {
                navigation.navigate('DetailsView', {item: item});
              }}
              chevron
            />
          );
        }}
        keyExtractor={(item) => item.id_bigint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default DetailsList;

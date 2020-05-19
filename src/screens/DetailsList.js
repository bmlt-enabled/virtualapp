import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function DetailsList(props) {
  const {navigation} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let that = this;

  const getData = () => {
    setLoading(true);
    setRefreshing(true);
    let timezone_id = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let url = `https://vphone.bmltenabled.org/api/getMeetings.php?results_count=100&suppress_voice_results=false&latitude=0&longitude=0&timezone_id=${timezone_id}`;
    console.log(url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res.filteredList);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    getData();
  };

  useEffect(() => {
    getData(setLoading, setData);
  }, [that]);

  const weekdays = [
    '',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id_bigint}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({item}) => {
        return (
          <ListItem
            title={item.meeting_name}
            subtitle={`${weekdays[item.weekday_tinyint]} ${item.start_time}`}
            bottomDivider
            onPress={() => {
              navigation.navigate('DetailsView', {
                item: item,
                weekday: weekdays[item.weekday_tinyint],
              });
            }}
            chevron
          />
        );
      }}
    />
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

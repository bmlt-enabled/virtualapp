import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ListItem} from 'react-native-elements';

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

export default DetailsList;

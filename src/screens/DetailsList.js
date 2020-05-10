import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function DetailsList(props) {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://vphone.bmltenabled.org/api/getMeetings.php?results_count=100&suppress_voice_results=false&latitude=35.5648713&longitude=-78.6682395',
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.filteredList);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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

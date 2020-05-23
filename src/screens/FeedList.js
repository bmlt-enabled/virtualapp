import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function FeedList(props) {
  const {navigation} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let that = this;

  const getData = () => {
    setLoading(true);
    setRefreshing(true);
    let url = 'https://virtualflyers.org/wp-json/wp/v2/posts?_embed';
    console.log(url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
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

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({item}) => {
        return (
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  title: item.title.rendered,
                  message: item.title.rendered,
                  url: item._embedded['wp:featuredmedia'][0].source_url,
                  subject: item.title.rendered,
                });
              }}
              style={{margin: 5, backgroundColor: 'black', padding: 5}}>
              <Text style={{color: 'white'}}>{item.title.rendered}</Text>
              <Image
                source={{
                  uri: item._embedded['wp:featuredmedia'][0].source_url,
                }}
                style={{
                  height: undefined,
                  width: '100%',
                  aspectRatio: 1,
                }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

export default FeedList;

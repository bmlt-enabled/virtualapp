import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FeedList from '../screens/FeedList';

const Stack = createStackNavigator();

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      screenOptions={{gestureEnabled: true}}>
      <Stack.Screen
        name="FeedList"
        component={FeedList}
        options={{title: 'Feed'}}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;

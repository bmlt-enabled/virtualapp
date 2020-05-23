import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Meetings from '../navigation/MeetingStackNavigator';
import Feed from '../navigation/FeedStackNavigator';
import About from '../screens/About';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Meetings"
        screenOptions={{gestureEnabled: true}}>
        <Tab.Screen
          name="Meetings"
          component={Meetings}
          options={{
            tabBarLabel: 'Meetings',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5Icon name="stream" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5Icon name="bullhorn" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5Icon name="question" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;

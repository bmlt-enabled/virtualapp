import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Meetings from '../navigation/MeetingStackNavigator';
import About from '../screens/About';

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
          options={{title: 'Meetings'}}
        />
        <Tab.Screen name="About" component={About} options={{title: 'About'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;

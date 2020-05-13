import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DetailsList from '../screens/DetailsList';
import DetailsView from '../screens/DetailsView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DetailsList"
        screenOptions={{gestureEnabled: true}}>
        <Stack.Screen
          name="DetailsList"
          component={DetailsList}
          options={{title: 'Virtual NA Meetings'}}
        />
        <Stack.Screen
          name="DetailsView"
          component={DetailsView}
          options={({route}) => ({
            title: 'Meeting Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;

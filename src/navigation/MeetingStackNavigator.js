import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DetailsList from '../screens/DetailsList';
import DetailsView from '../screens/DetailsView';

const Stack = createStackNavigator();

function MeetingStackNavigator() {
  return (
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
  );
}

export default MeetingStackNavigator;

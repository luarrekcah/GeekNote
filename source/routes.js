import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/Main';
import NewCard from './screens/NewCard';
import Card from './screens/Card';
import NewItem from './screens/NewItem';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Main"
          component={Main}
          //options={{title: 'GeekNote'}}
        />
        <Stack.Screen
          name="NewCard"
          component={NewCard}
          //options={{title: 'Card'}}
        />
        <Stack.Screen
          name="Card"
          component={Card} /*options={{title: 'Card'}}*/
        />
        <Stack.Screen
          name="NewItem"
          component={NewItem}
          //options={{title: 'Item'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './components/Home';
import Config from './components/Config';
import Colors from '../../Global/colorScheme';

const Tab = createBottomTabNavigator();

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Cards') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Config') {
            iconName = focused ? 'options' : 'options-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.color.primary,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Home">
      <Tab.Screen name="Cards" component={Home} />
      <Tab.Screen name="Config" component={Config} />
    </Tab.Navigator>
  );
};

export default Main;

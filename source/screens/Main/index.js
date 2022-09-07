import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './components/Home';
import Colors from '../../Global/colorScheme';

const Tab = createBottomTabNavigator();

import Geek from '../Geek';
import Notes from '../Notes';
import Diary from '../Diary';

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: Colors.color.purple},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Cards') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Geek') {
            iconName = focused ? 'tablet-portrait' : 'tablet-portrait-outline';
          } else if (route.name === 'Notes') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Diary') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.color.white,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Cards">
      <Tab.Screen name="Cards" component={Home} />
      <Tab.Screen name="Geek" component={Geek} />
      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
  );
};

export default Main;

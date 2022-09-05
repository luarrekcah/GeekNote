import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './components/Home';
import Colors from '../../Global/colorScheme';

const Tab = createBottomTabNavigator();

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: '#5D38DF'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Cards') {
            iconName = focused ? 'apps' : 'apps-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.color.white,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Cards">
      <Tab.Screen name="Cards" component={Home} />
    </Tab.Navigator>
  );
};

export default Main;

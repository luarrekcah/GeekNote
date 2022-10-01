import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../Global/colorScheme';

const Tab = createBottomTabNavigator();

import Geek from '../Geek';
import Notes from '../Notes';
import Diary from '../Diary';
import Home from './components/Home';
import Initial from '../Initial';

const Main = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: Colors.blacktheme.primary},
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
          } /*else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }*/
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.blacktheme.white,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Initial">
      <Tab.Screen name="Cards" component={Home} />
      <Tab.Screen name="Geek" component={Geek} />
      <Tab.Screen
        name="Initial"
        component={Initial}
        options={({route}) => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <LinearGradient
                style={styles.iconTabRound}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#321075', '#9d80d8']}>
                <Icon name="home" size={26} color="#fff" />
              </LinearGradient>
            </View>
          ),
        })}
      />
      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#9C27B0',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default Main;

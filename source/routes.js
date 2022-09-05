import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Main from './screens/Main';
import NewCard from './screens/NewCard';
import Card from './screens/Card';
import NewItem from './screens/NewItem';
import Config from './screens/Config';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: '#5D38DF'},
            headerTransparent: false,
            headerTitle: 'GeekNote',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Config');
                }}>
                <Icon name="settings" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Config"
          component={Config}
          options={({route, navigation}) => ({
            headerStyle: {backgroundColor: '#5D38DF'},
            headerTransparent: false,
            headerTitle: 'Configurações',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="NewCard"
          component={NewCard}
          options={({route, navigation}) => ({
            headerStyle: {backgroundColor: '#5D38DF'},
            headerTransparent: false,
            headerTitle:
              route.params.card.title === ''
                ? 'Novo Card'
                : `Editando ${route.params.card.title}`,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Card"
          component={Card}
          options={({route, navigation}) => ({
            headerStyle: {backgroundColor: '#5D38DF'},
            headerTransparent: false,
            headerTitle: route.params.card.title,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="NewItem"
          component={NewItem}
          options={({route, navigation}) => ({
            headerStyle: {backgroundColor: '#5D38DF'},
            headerTransparent: false,
            headerTitle:
              route.params.item.title === ''
                ? 'Novo item'
                : `Editando ${route.params.item.title}`,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

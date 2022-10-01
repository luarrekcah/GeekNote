import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Global/colorScheme';

const Initial = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#321075', '#9d80d8']}>
        <Text>Seja bem vindo!</Text>
      </LinearGradient>
      <View style={styles.main}>
        <Text>Cards aq</Text>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blacktheme.backgroundColor,
  },
  header: {
    height: 150,
  },
  main: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -30,
    backgroundColor: Colors.blacktheme.backgroundColor,
    height: 300,
  },
});

export default Initial;

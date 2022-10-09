import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Global/colorScheme';
import CustomTheme from '../../Global/CustomTheme';

const Initial = ({navigation}) => {
  const [theme, setTheme] = React.useState(CustomTheme());
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <LinearGradient
        style={styles.header}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={theme.home.header}>
        <Text>Seja bem vindo!</Text>
      </LinearGradient>
      <View style={[styles.main, {backgroundColor: theme.backgroundColor}]}>
        <Text>Cards aq</Text>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
  },
  main: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -30,
    height: 300,
  },
});

export default Initial;

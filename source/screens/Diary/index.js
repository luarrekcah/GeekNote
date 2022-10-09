import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FAB} from 'react-native-paper';
import CustomTheme from '../../Global/CustomTheme';

const Diary = ({navigation}) => {
  const [diary, setDiary] = React.useState([]);
  //const [refreshing, setRefreshing] = React.useState(false);
  const [theme] = React.useState(CustomTheme());

  const loadData = () => {
    if (AsyncStorage.getItem('diary')) {
      AsyncStorage.getItem('diary').then(data => {
        const dba = JSON.parse(data);
        setDiary(dba);
      });
    } else {
      setDiary(null);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView>
        {diary === null || diary.length === 0 ? (
          <View style={styles.nullWarn}>
            <Text style={[styles.nullWarnText, {color: theme.white}]}>
              Seja bem vindo(a) a ala diary!
            </Text>
            <Text style={[styles.nullWarnTextSec, {color: theme.gray}]}>
              Adicione uma nota do seu dia e desfrute
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>Aaa ooo</Text>
          </View>
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, {backgroundColor: theme.primary}]}
        onPress={() =>
          navigation.navigate('NewDiary', {note: {title: '', content: ''}})
        }
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  nullWarn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  nullWarnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nullWarnTextSec: {
    fontSize: 15,
  },
});

export default Diary;

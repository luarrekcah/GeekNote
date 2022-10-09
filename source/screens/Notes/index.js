import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FAB} from 'react-native-paper';
import CustomTheme from '../../Global/CustomTheme';

const Notes = ({navigation}) => {
  const [notes, setNotes] = React.useState([]);
  //const [refreshing, setRefreshing] = React.useState(false);
  const [theme, setTheme] = React.useState(CustomTheme());

  const loadData = () => {
    if (AsyncStorage.getItem('notes')) {
      AsyncStorage.getItem('notes').then(data => {
        const dba = JSON.parse(data);
        setNotes(dba);
      });
    } else {
      setNotes(null);
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
        {notes === null || notes.length === 0 ? (
          <View style={styles.nullWarn}>
            <Text style={[styles.nullWarnText, {color: theme.white}]}>
              Seja bem vindo(a) a ala Notes!
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
          navigation.navigate('NewNote', {note: {title: '', content: ''}})
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

export default Notes;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FAB} from 'react-native-paper';
import Colors from '../../Global/colorScheme';

const Notes = ({navigation}) => {
  const [notes, setNotes] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
    <View style={styles.container}>
      <ScrollView>
        {notes === null || notes.length === 0 ? (
          <View style={styles.nullWarn}>
            <Text style={styles.nullWarnText}>
              Seja bem vindo(a) a ala Notes!
            </Text>
            <Text style={styles.nullWarnTextSec}>
              Adicione uma nota e desfrute
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
        style={styles.fab}
        onPress={() =>
          navigation.navigate('NewCard', {card: {title: '', description: ''}})
        }
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.purple,
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
    color: Colors.color.white,
  },
  nullWarnTextSec: {
    fontSize: 15,
    color: Colors.color.gray,
  },
});

export default Notes;

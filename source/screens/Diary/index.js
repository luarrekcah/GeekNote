import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FAB} from 'react-native-paper';
import Colors from '../../Global/colorScheme';

const Diary = ({navigation}) => {
  const [diary, setDiary] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
    <View style={styles.container}>
      <ScrollView>
        {diary === null || diary.length === 0 ? (
          <View style={styles.nullWarn}>
            <Text style={styles.nullWarnText}>
              Seja bem vindo(a) a ala diary!
            </Text>
            <Text style={styles.nullWarnTextSec}>
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
        style={styles.fab}
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
    backgroundColor: '#1A1A1A',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.blacktheme.primary,
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
    color: Colors.blacktheme.white,
  },
  nullWarnTextSec: {
    fontSize: 15,
    color: Colors.blacktheme.gray,
  },
});

export default Diary;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB, List} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';

const Home = ({navigation}) => {
  const [db, setdb] = useState([]);
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  useEffect(() => {
    if (AsyncStorage.getItem('db')) {
      AsyncStorage.getItem('db').then(data => {
        const dba = JSON.parse(data);
        setdb(dba);
      });
    } else {
      setdb(null);
    }
  }, []);

  return (
    <View style={styles.container}>
      {db === null ? (
        <View style={styles.nullWarn}>
          <Text style={styles.nullWarnText}>Seja bem vindo ao app!</Text>
          <Text style={styles.nullWarnTextSec}>
            Adicione uma nota ou um card inicial
          </Text>
        </View>
      ) : (
        <List.Section>
          <List.Subheader>Cards</List.Subheader>
          <List.Subheader>Anotações</List.Subheader>
          <FlatList
            data={db}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.itemsContainer}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </List.Section>
      )}
      <FAB.Group
        open={open}
        icon={open ? 'close' : 'pen'}
        actions={[
          {
            icon: 'card',
            label: 'Novo Card',
            onPress: () => console.log('Pressed notifications'),
          },
          {
            icon: 'pen',
            label: 'Nova anotação básica',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
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
  },
  nullWarnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.color.gray,
  },
  nullWarnTextSec: {
    fontSize: 15,
    color: Colors.color.gray,
  },
});

export default Home;

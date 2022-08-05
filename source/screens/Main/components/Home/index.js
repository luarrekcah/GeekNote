import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB, Portal, Provider} from 'react-native-paper';
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

  console.log(typeof db);

  return (
    <View style={styles.container}>
      <Text>Cards</Text>
      {db === null ? (
        <Text>Adicione uma nota!</Text>
      ) : (
        <FlatList
          data={db}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.itemsContainer}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
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
});

export default Home;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB, List} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';

const Home = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  useEffect(() => {
    if (AsyncStorage.getItem('cards')) {
      AsyncStorage.getItem('cards').then(data => {
        const dba = JSON.parse(data);
        setCards(dba);
        console.log(dba);
      });
    } else {
      setCards(null);
    }
  }, []);

  return (
    <View style={styles.container}>
      {cards === null ? (
        <View style={styles.nullWarn}>
          <Text style={styles.nullWarnText}>Seja bem vindo ao app!</Text>
          <Text style={styles.nullWarnTextSec}>
            Adicione uma nota ou um card inicial
          </Text>
        </View>
      ) : (
        <List.Section>
          <FlatList
            data={cards}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>{item.title}</Text>
                  <Text style={styles.itemsDesc}>{item.description}</Text>
                  <Text style={styles.itemsValue}>R$000,00</Text>
                </View>
              </TouchableOpacity>
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
            onPress: () => navigation.navigate('NewCard'),
          },
          {
            icon: 'pen',
            label: 'Nova anotação básica',
            onPress: () => navigation.navigate('NewAnnotation'),
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
  itemsContainer: {
    padding: 40,
    backgroundColor: Colors.color.fulldark,
    borderRadius: 40,
    margin: 10,
  },
  itemsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsDesc: {
    fontSize: 20,
    marginVertical: 20,
  },
  itemsValue: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;

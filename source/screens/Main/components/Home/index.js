import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Searchbar, FAB, List} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';

const Home = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [state, setState] = useState({open: false});
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (AsyncStorage.getItem('cards')) {
      AsyncStorage.getItem('cards').then(data => {
        const dba = JSON.parse(data);
        setCards(dba);
      });
    } else {
      setCards(null);
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (AsyncStorage.getItem('cards')) {
      AsyncStorage.getItem('cards').then(data => {
        const dba = JSON.parse(data);
        setCards(dba);
      });
    } else {
      setCards(null);
    }
  }, []);

  const openCard = cardId => {
    const card = cards.find(item => item.id === cardId);
    navigation.navigate('Card', {card: card});
  };

  const getValue = item => {
    let values = 0;
    item.items.forEach((itemIn, i) => {
      values += itemIn.value.replace(',', '.') / 1;
      console.log(itemIn);
    });
    return values.toString().replace('.', ',');
  };

  return (
    <View style={styles.container}>
      {cards === null || cards.length === 0 ? (
        <View style={styles.nullWarn}>
          <Text style={styles.nullWarnText}>Seja bem vindo ao app!</Text>
          <Text style={styles.nullWarnTextSec}>
            Adicione uma nota ou um card inicial
          </Text>
        </View>
      ) : (
        <List.Section>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <FlatList
            data={cards}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => openCard(item.id)}>
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>{item.title}</Text>
                  <Text style={styles.itemsDesc}>{item.description}</Text>
                  <Text style={styles.itemsValue}>R${getValue(item)}</Text>
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
    backgroundColor: Colors.color.card.background,
    borderRadius: 40,
    margin: 10,
  },
  itemsTitle: {
    color: Colors.color.card.text,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsDesc: {
    color: Colors.color.card.text,
    fontSize: 20,
    marginVertical: 20,
  },
  itemsValue: {
    color: Colors.color.card.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;

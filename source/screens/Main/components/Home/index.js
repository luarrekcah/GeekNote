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
import {FAB, List} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadData = () => {
    if (AsyncStorage.getItem('cards')) {
      AsyncStorage.getItem('cards').then(data => {
        const dba = JSON.parse(data);
        setCards(dba);
      });
    } else {
      setCards(null);
    }
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const openCard = cardId => {
    const card = cards.find(item => item.id === cardId);
    navigation.navigate('Card', {card: card});
  };

  const getValue = item => {
    let values = 0;
    item.items.forEach((itemIn, i) => {
      values += itemIn.value.replace(',', '.') / 1;
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

                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.buttonsCardTop}
                      onPress={() => {
                        navigation.navigate('NewCard', {
                          card: item,
                          isEdit: true,
                        });
                      }}>
                      <Icon name="settings" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemsDesc}>{item.description}</Text>
                  <Text style={styles.itemsValue}>R${getValue(item)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </List.Section>
      )}
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
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
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
  buttonsCardTop: {
    bottom: 45,
  },
});

export default Home;

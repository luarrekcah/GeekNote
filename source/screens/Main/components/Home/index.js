import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

  const getTotal = () => {
    let totalValue = 0;
    cards.forEach(item => {
      item.items.forEach((itemIn, i) => {
        totalValue += itemIn.value.replace(',', '.') / 1;
      });
    });
    return totalValue.toString().replace('.', ',');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {cards === null || cards.length === 0 ? (
          <View style={styles.nullWarn}>
            <Text style={styles.nullWarnText}>
              Seja bem vindo(a) a ala cards!
            </Text>
            <Text style={styles.nullWarnTextSec}>
              Adicione um card inicial e desfrute
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Cards Total</Text>
              <View style={styles.valueHeaderBackground}>
                <Text style={styles.valueHeader}>R${getTotal()}</Text>
              </View>
            </View>
            <List.Section>
              <View style={{top: -100}}>
                {cards.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => openCard(item.id)}
                      key={item.id}>
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
                            <Icon name="edit" size={30} color="#fff" />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.itemsDesc}>{item.description}</Text>
                        <Text style={styles.itemsValue}>
                          R${getValue(item)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </List.Section>
          </>
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
  header: {
    paddingTop: 10,
    backgroundColor: Colors.color.purple,
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
  },
  valueHeaderBackground: {
    alignSelf: 'center',
    backgroundColor: Colors.color.card.background,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  valueHeader: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
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

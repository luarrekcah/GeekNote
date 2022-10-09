import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Linking,
} from 'react-native';
import Colors from '../../Global/colorScheme';
import {FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../Global/CustomTheme';

const Card = ({route, navigation}) => {
  const {card} = route.params;

  const [allCards, setAllCards] = React.useState([]);
  const [cardNow, setCardNow] = React.useState(card);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getValue = item => {
    let values = 0;
    item.items.forEach((itemIn, i) => {
      values += itemIn.value.replace(',', '.') / 1;
    });
    return values.toString().replace('.', ',');
  };

  const loadData = () => {
    if (AsyncStorage.getItem('cards')) {
      AsyncStorage.getItem('cards').then(data => {
        const dba = JSON.parse(data);
        const cardAc = dba.find(item => item.id === card.id);
        setCardNow(cardAc);
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    wait(2000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = async itemId => {
    //let newAllCards = [];
    const newItems = cardNow.items.filter(item => item.id !== itemId);
    cardNow.items = newItems;
    setCardNow(cardNow);
    allCards.push(cardNow);
    //newAllCards += allCards;
    await AsyncStorage.setItem('cards', JSON.stringify(allCards));
    setAllCards(allCards);
    loadData();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: CustomTheme().backgroundColor},
      ]}>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsDesc}>{card.description}</Text>
        <Text style={styles.itemsValue}>R${getValue(card)}</Text>
      </View>
      <View style={styles.container}>
        {card.items.length !== 0 ? (
          <FlatList
            data={cardNow.items}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.containerItem}>
                    <View style={styles.topItem}>
                      <Text style={styles.titleItem}>{item.title}</Text>
                      <Text style={styles.descItem}>{item.description}</Text>
                      <Text style={styles.titleItem}>R${item.value}</Text>
                    </View>
                    <View style={styles.bottomItem}>
                      <TouchableOpacity
                        style={styles.buttonItem}
                        onPress={() => {
                          Linking.openURL(item.link);
                        }}>
                        <Icon
                          name="link"
                          size={30}
                          color={Colors.blacktheme.card.text}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonItem}
                        onPress={() => {
                          navigation.navigate('NewItem', {
                            item: item,
                            card: card,
                            isEdit: true,
                          });
                        }}>
                        <Icon
                          name="edit"
                          size={30}
                          color={Colors.blacktheme.card.text}
                          selectionColor={Colors.blacktheme.card.text}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonItem}
                        onPress={() => {
                          deleteItem(item.id);
                        }}>
                        <Icon
                          name="delete"
                          size={30}
                          color={Colors.blacktheme.card.text}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.nullWarn}>
            <Text style={styles.nullWarnText}>
              Seja bem vindo ao card {cardNow.title}!
            </Text>
            <Text style={styles.nullWarnTextSec}>
              Aqui você pode adicionar items para compor ele.
            </Text>
          </View>
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() =>
            navigation.navigate('NewItem', {
              card: card,
              item: {title: '', description: '', link: '', value: ''},
            })
          }
        />
      </View>
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
    backgroundColor: Colors.blacktheme.primary,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.blacktheme.card.background,
  },
  topItem: {
    flex: 3,
    alignSelf: 'space-between',
  },
  titleItem: {
    color: Colors.blacktheme.card.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descItem: {
    color: Colors.blacktheme.card.text,
    fontSize: 15,
  },
  buttonItem: {
    marginHorizontal: 10,
  },
  bottomItem: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'space-between',
  },
  nullWarn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nullWarnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blacktheme.gray,
  },
  nullWarnTextSec: {
    fontSize: 15,
    color: Colors.blacktheme.gray,
  },
  itemsContainer: {
    backgroundColor: Colors.blacktheme.card.background,
    padding: 20,
    flexDirection: 'row',
  },
  itemsDesc: {
    color: Colors.blacktheme.card.text,
    fontSize: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  itemsValue: {
    color: Colors.blacktheme.card.text,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;

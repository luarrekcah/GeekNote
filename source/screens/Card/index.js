import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Colors from '../../Global/colorScheme';
import {List, FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({route, navigation}) => {
  const {card} = route.params;

  const [cardNow, setCardNow] = React.useState(card);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getValue = item => {
    let values = 0;
    item.items.forEach((itemIn, i) => {
      values += itemIn.value.replace(',', '.') / 1;
      console.log(itemIn);
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

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>{card.title}</Text>
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
            renderItem={({item}) => (
              <TouchableOpacity>
                <View>
                  <Text>
                    <List.Item
                      title={item.title}
                      description={item.description}
                      left={props => <List.Icon {...props} icon="pen" />}
                    />
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.nullWarn}>
            <Text style={styles.nullWarnText}>Seja bem vindo ao card!</Text>
            <Text style={styles.nullWarnTextSec}>
              Aqui você pode adicionar items para compor ele.
            </Text>
          </View>
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('NewItem', {card: card})}
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
    backgroundColor: Colors.color.card.background,
    padding: 20,
    flexDirection: 'row',
  },
  itemsTitle: {
    color: Colors.color.card.text,
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsDesc: {
    color: Colors.color.card.text,
    fontSize: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  itemsValue: {
    color: Colors.color.card.text,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;

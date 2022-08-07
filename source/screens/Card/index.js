import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../Global/colorScheme';
import {FAB} from 'react-native-paper';

const Card = ({route, navigation}) => {
  const {card} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>{card.title}</Text>
        <Text style={styles.itemsDesc}>{card.description}</Text>
        <Text style={styles.itemsValue}>R$000</Text>
      </View>
      <View style={styles.container}>
        {card.items.length !== 0 ? (
          <Text>Item</Text>
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
          onPress={() => console.log('Pressed')}
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

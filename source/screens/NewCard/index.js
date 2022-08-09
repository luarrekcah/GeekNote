import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewCard = ({route, navigation}) => {
  const {card} = route.params;
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState(card.title || '');
  const [description, setDescription] = useState(card.description || '');
  const {isEdit} = route.params || false;

  useEffect(() => {
    AsyncStorage.getItem('cards').then(data => {
      if (data) {
        const cardAsync = JSON.parse(data);
        setCards(cardAsync);
      }
    });
  }, []);

  const isValid = () => {
    if (title !== undefined && title !== '') {
      return true;
    }
    return false;
  };

  const saveData = async () => {
    if (isValid()) {
      if (isEdit) {
        let newCards = cards;
        newCards.map(item => {
          if (item.id === card.id) {
            item.title = title;
            item.description = description;
            item.items = card.items;
          }
          return item;
        });
        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
        navigation.goBack();
      } else {
        const id = Math.random(5000).toString();
        const data = {
          id,
          title,
          description,
          items: [],
        };
        cards.push(data);
        await AsyncStorage.setItem('cards', JSON.stringify(cards));
        navigation.goBack();
      }
    }
  };

  const deleteData = async () => {
    let newCards = cards.filter(item => item.id !== card.id);
    await AsyncStorage.setItem('cards', JSON.stringify(newCards));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
      />
      <Button
        style={styles.saveButton}
        icon="send"
        mode="contained"
        onPress={() => saveData()}>
        {isEdit ? 'Atualizar' : 'Adicionar'}
      </Button>
      {isEdit ? (
        <Button
          style={styles.deleteButton}
          icon="delete"
          mode="contained"
          onPress={() => deleteData()}>
          Deletar
        </Button>
      ) : (
        ''
      )}
      <TouchableOpacity>
        <Text
          style={styles.cancelButton}
          onPress={() => {
            navigation.goBack({reload: true});
          }}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    fontSize: 16,
    borderBottomColor: Colors.color.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.color.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonInvalid: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    color: Colors.color.gray,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#95a5a6',
  },
  deleteButton: {
    backgroundColor: Colors.color.gray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default NewCard;

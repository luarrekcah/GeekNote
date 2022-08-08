import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewItem = ({route, navigation}) => {
  const [allCards, setAllCards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [value, setValue] = useState('');

  const {card} = route.params;

  useEffect(() => {
    AsyncStorage.getItem('cards').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setAllCards(cards);
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
      const id = Math.random(5000).toString();
      const data = {
        id,
        title,
        description,
        link,
        value,
      };
      let newAllCards = [];
      const cardActually = allCards.find(item => item.id === card.id);
      cardActually.items.push(data);
      newAllCards.push(cardActually);
      newAllCards += allCards.filter(item => item.id !== card.id);
      setAllCards(newAllCards);
      await AsyncStorage.setItem('cards', JSON.stringify(allCards));
      navigation.goBack();
    }
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
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={link}
        onChangeText={text => {
          setLink(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="000,00"
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
      />
      <Button
        style={styles.saveButton}
        icon="send"
        mode="contained"
        onPress={() => saveData()}>
        Adicionar
      </Button>

      <TouchableOpacity>
        <Text
          style={styles.cancelButton}
          onPress={() => {
            navigation.goBack();
          }}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
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
});

export default NewItem;

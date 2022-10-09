import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewItem = ({route, navigation}) => {
  const {item, card} = route.params;
  const {isEdit} = route.params || false;
  const [allCards, setAllCards] = useState([]);
  const [title, setTitle] = useState(item.title || '');
  const [description, setDescription] = useState(item.description || '');
  const [link, setLink] = useState(item.link || '');
  const [value, setValue] = useState(item.value || '');

  useEffect(() => {
    AsyncStorage.getItem('cards').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setAllCards(cards);
      }
    });
  }, []);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const isValid = () => {
    if (
      title !== undefined &&
      title !== '' &&
      link.toLowerCase().includes('http') &&
      (value !== '' || isNaN(value))
    ) {
      return true;
    }
    showToast('Verifique os dados inseridos.');
    return false;
  };

  const saveData = async () => {
    if (isValid()) {
      if (isEdit) {
        const newAllCards = allCards.map(cardMap => {
          if (cardMap.id === card.id) {
            cardMap.items.map(it => {
              if (it.id === item.id) {
                it.title = title;
                it.description = description;
                it.link = link;
                it.value = value;
              }
            });
          }
          return cardMap;
        });
        await AsyncStorage.setItem('cards', JSON.stringify(newAllCards));
        navigation.goBack();
      } else {
        const id = Math.random(5000).toString();
        const data = {
          id,
          title,
          description,
          link,
          value,
        };
        const newAllCards = allCards.map(cardMap => {
          if (cardMap.id === card.id) {
            cardMap.items.push(data);
          }
        });
        setAllCards(newAllCards);
        await AsyncStorage.setItem('cards', JSON.stringify(allCards));
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título (obrigatório)"
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (opcional)"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Link (obrigatório, ao menos digite 'http')"
        value={link}
        onChangeText={text => {
          setLink(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="0000,00 (não coloque '.' para divisão de milhar)"
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
        {isEdit ? 'Atualizar' : 'Adicionar'}
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
    backgroundColor: Colors.blacktheme.backgroundColor,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.blacktheme.primary,
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
    color: Colors.blacktheme.gray,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#95a5a6',
  },
});

export default NewItem;

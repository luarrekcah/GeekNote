import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewCard = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('cards').then(data => {
      if (data) {
        const card = JSON.parse(data);
        setCards(card);
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
        items: [],
      };
      cards.push(data);

      await AsyncStorage.setItem('cards', JSON.stringify(cards));
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
});

export default NewCard;

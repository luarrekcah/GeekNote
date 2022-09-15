import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewNote = ({route, navigation}) => {
  const {note} = route.params;
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');
  const {isEdit} = route.params || false;

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const isValid = () => {
    if (title !== undefined && title !== '') {
      if (title.length > 16) {
        showToast(
          'Seu título é muito grande!',
        );
        return false;
      }
      return true;
    }
    showToast('Seu título não pode ficar vazio.');
    return false;
  };

  const saveData = async () => {
    if (isValid()) {
      if (isEdit) {
       //save note if is edit
      } else {
        //save note 
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título breve (obrigatório)"
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
        value={content}
        onChangeText={text => {
          setContent(text);
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
          onPress={() => console.log('delete')}>
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
    backgroundColor: '#1A1A1A',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.color.purple,
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

export default NewNote;

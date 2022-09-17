import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {SafeAreaView} from 'react-native-safe-area-context';

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
        showToast('Seu título é muito grande!');
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

  const richText = React.useRef();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Button>Salvar</Button>
        </View>
        <RichToolbar
          selectedButtonStyle={{
            backgroundColor: Colors.blacktheme.primary,
          }}
          selectedIconTint={Colors.blacktheme.white}
          editor={richText}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.checkboxList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.blockquote,
            actions.alignCenter,
          ]}
          iconMap={{
            [actions.heading1]: ({tintColor}) => (
              <Text style={[{color: tintColor}]}>H1</Text>
            ),
          }}
        />
        <ScrollView>
          <RichEditor
            initialHeight={Dimensions.get('window').height}
            ref={richText}
            onChange={descriptionText => setContent(descriptionText)}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
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
  deleteButton: {
    backgroundColor: Colors.blacktheme.gray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default NewNote;

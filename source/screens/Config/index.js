import React from 'react';
import {View, ScrollView, Linking, StyleSheet} from 'react-native';
import {List, Dialog, Paragraph, Divider, Button} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const Config = ({navigation}) => {
  const {version} = require('../../../package.json');

  const [visible, setVisible] = React.useState(false);

  const [loggedIn, setloggedIn] = React.useState(false);
  const [user, setUser] = React.useState([]);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    getCurrentUserInfo();
    GoogleSignin.configure({
      androidClientId:
        '240509455563-i6a7vt7bpchjckd1nc8jdgv8ghdkkfb8.apps.googleusercontent.com',
      //offlineAccess: true,
    });
  }, []);

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser({userInfo});
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  const singIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setloggedIn(true);
      setUser({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setUser([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>Usuário</List.Subheader>
          {loggedIn ? (
            <>
              <List.Item
                title="Salvar dados"
                left={() => (
                  <List.Icon color={Colors.color.purple} icon="cloud-upload" />
                )}
                onPress={() => {
                  console.log('Salvar dados na conta:');
                  console.log(user);
                }}
              />
              <List.Item
                title="Carregar dados"
                left={() => (
                  <List.Icon
                    color={Colors.color.purple}
                    icon="cloud-download"
                  />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Deslogar do Google"
                left={() => (
                  <List.Icon color={Colors.color.purple} icon="logout" />
                )}
                onPress={() => signOut()}
              />
            </>
          ) : (
            <GoogleSigninButton
              style={{width: '100%'}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                singIn();
              }}
              disabled={false}
            />
          )}

          <List.Item
            title="Excluir dados"
            left={() => (
              <List.Icon color={Colors.color.purple} icon="trash-can" />
            )}
            onPress={showDialog}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Sobre</List.Subheader>
          <List.Item
            title="Termos de uso"
            left={() => (
              <List.Icon color={Colors.color.purple} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/tos');
            }}
          />
          <List.Item
            title="Política de privacidade"
            left={() => (
              <List.Icon color={Colors.color.purple} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/pop');
            }}
          />
          <List.Item
            title="Relatar problema"
            left={() => <List.Icon color={Colors.color.purple} icon="bug" />}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Doar"
            left={() => (
              <List.Icon color={Colors.color.purple} icon="piggy-bank" />
            )}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Versão"
            description={version}
            left={() => (
              <List.Icon color={Colors.color.purple} icon="android" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/updates');
            }}
          />
        </List.Section>
      </ScrollView>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Deseja mesmo apagar seus dados?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Ao limpar os dados, também serão perdidos seus dados salvos na
            núvem, caso queira limpar apenas os dados do app, apague os dados do
            aplicativo.
          </Paragraph>
          <Divider />
          <Paragraph>
            Informações do App &gt; Armazenamento e cache &gt; Limpar
            armazenamento
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancelar</Button>
          <Button
            onPress={async () => {
              await AsyncStorage.setItem('cards', JSON.stringify([]));
              await AsyncStorage.setItem('livros', JSON.stringify([]));
              await AsyncStorage.setItem('animes', JSON.stringify([]));
              await AsyncStorage.setItem('filmes', JSON.stringify([]));
              hideDialog();
            }}>
            Deletar tudo
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Config;

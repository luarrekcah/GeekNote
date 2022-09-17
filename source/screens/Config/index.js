import React from 'react';
import {
  View,
  ScrollView,
  Linking,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {List, Dialog, Paragraph, Divider, Button} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';

const Config = ({navigation}) => {
  const {version} = require('../../../package.json');

  const [visible, setVisible] = React.useState(false);

  const [loggedIn, setloggedIn] = React.useState(false);

  const [user, setUser] = React.useState([]);

  const [cards, setCards] = React.useState([]);
  const [livros, setlivros] = React.useState([]);
  const [animes, setanimes] = React.useState([]);
  const [filmes, setfilmes] = React.useState([]);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    getCurrentUserInfo();
    GoogleSignin.configure({
      androidClientId:
        '240509455563-i6a7vt7bpchjckd1nc8jdgv8ghdkkfb8.apps.googleusercontent.com',
      //offlineAccess: true,
    });
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

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

  const loadData = () => {
    AsyncStorage.getItem('cards').then(data => {
      const dba = JSON.parse(data);
      setCards(dba);
    });
    AsyncStorage.getItem('livros').then(data => {
      const dba = JSON.parse(data);
      setlivros(dba);
    });
    AsyncStorage.getItem('animes').then(data => {
      const dba = JSON.parse(data);
      setanimes(dba);
    });
    AsyncStorage.getItem('filmes').then(data => {
      const dba = JSON.parse(data);
      setfilmes(dba);
    });
  };

  const saveData = () => {
    database()
      .ref('/geeknote/users/')
      .once('value')
      .then(snapshot => {
        let users = [];

        if (snapshot.val() !== null) {
          users = snapshot.val();
        }

        const checkUser = () => {
          return users.find(item => item.email === user.userInfo.user.email);
        };

        if (checkUser(user.userInfo.user.email) !== undefined) {
          const newUsers = users.map(item => {
            if (item.email === user.userInfo.user.email) {
              item.data.cards = cards;
              item.data.geek.livros = livros;
              item.data.geek.animes = animes;
              item.data.geek.filmes = filmes;
            }
            return item;
          });
          database()
            .ref('/geeknote/users/')
            .set(newUsers)
            .then(() => {
              return showToast('Dados atualizados.');
            });
        } else {
          users.push({
            email: user.userInfo.user.email,
            data: {
              cards,
              geek: {
                livros,
                animes,
                filmes,
              },
              notes: '',
              diary: '',
            },
          });
          database()
            .ref('/geeknote/users/')
            .set(users)
            .then(() => {
              return showToast('Dados Salvos.');
            });
        }
      });
  };

  const loadCloudData = () => {
    database()
      .ref('/geeknote/users/')
      .once('value')
      .then(async snapshot => {
        let users = [];

        if (snapshot.val() !== null) {
          users = snapshot.val();
        }

        const checkUser = () => {
          return users.find(item => item.email === user.userInfo.user.email);
        };

        if (checkUser(user.userInfo.user.email) !== undefined) {
          const userCloud = checkUser(user.userInfo.user.email);

          await AsyncStorage.setItem(
            'cards',
            JSON.stringify(userCloud.data.cards),
          );
          await AsyncStorage.setItem(
            'livros',
            JSON.stringify(userCloud.data.geek.livros),
          );
          await AsyncStorage.setItem(
            'animes',
            JSON.stringify(userCloud.data.geek.animes),
          );
          await AsyncStorage.setItem(
            'filmes',
            JSON.stringify(userCloud.data.geek.filmes),
          );

          showToast('Dados carregados da nuvem.');
        } else {
          showToast('Salve seus dados antes de carregar da núvem.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader style={{color: Colors.blacktheme.card.text}}>
            Usuário
          </List.Subheader>
          {loggedIn ? (
            <>
              <List.Item
                title="Salvar dados"
                titleStyle={{color: Colors.blacktheme.card.text}}
                left={() => (
                  <List.Icon
                    color={Colors.blacktheme.primary}
                    icon="cloud-upload"
                  />
                )}
                onPress={() => saveData()}
              />
              <List.Item
                title="Carregar dados"
                titleStyle={{color: Colors.blacktheme.card.text}}
                left={() => (
                  <List.Icon
                    color={Colors.blacktheme.primary}
                    icon="cloud-download"
                  />
                )}
                onPress={() => loadCloudData()}
              />
              <List.Item
                title="Deslogar do Google"
                titleStyle={{color: Colors.blacktheme.card.text}}
                left={() => (
                  <List.Icon color={Colors.blacktheme.primary} icon="logout" />
                )}
                onPress={() => signOut()}
              />
            </>
          ) : (
            <GoogleSigninButton
              style={styles.googleButton}
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
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="trash-can" />
            )}
            onPress={showDialog}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={{color: Colors.blacktheme.card.text}}>
            Comunidade
          </List.Subheader>
          <List.Item
            title="Discord"
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="discord" />
            )}
            onPress={() => {
              Linking.openURL('https://discord.gg/PxZW7d3dvb');
            }}
          />
          <List.Subheader style={{color: Colors.blacktheme.card.text}}>
            Sobre
          </List.Subheader>

          <List.Item
            title="Termos de uso"
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/tos');
            }}
          />
          <List.Item
            title="Política de privacidade"
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/pop');
            }}
          />
          <List.Item
            title="Relatar problema"
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="bug" />
            )}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Doar"
            titleStyle={{color: Colors.blacktheme.card.text}}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="piggy-bank" />
            )}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Versão"
            titleStyle={{color: Colors.blacktheme.card.text}}
            description={version}
            left={() => (
              <List.Icon color={Colors.blacktheme.primary} icon="android" />
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
    backgroundColor: Colors.blacktheme.backgroundColor,
  },
  googleButton: {
    width: '100%',
  },
});

export default Config;

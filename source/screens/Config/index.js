import React from 'react';
import {
  View,
  ScrollView,
  Linking,
  StyleSheet,
  ToastAndroid,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {List, Dialog, Paragraph, Divider, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';

import CustomTheme from '../../Global/CustomTheme';

const Config = ({navigation}) => {
  const {version} = require('../../../package.json');

  const [theme, setTheme] = React.useState(CustomTheme());

  const [modalVisible, setModalVisible] = React.useState(false);

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
  }, [navigation, theme]);

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
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView>
        <List.Section>
          <List.Subheader style={{color: theme.config.section}}>
            Usuário
          </List.Subheader>
          {loggedIn ? (
            <>
              <List.Item
                title="Salvar dados"
                titleStyle={{color: theme.config.text}}
                description="Salvar seus dados na núvem"
                descriptionStyle={{color: theme.gray}}
                left={() => (
                  <List.Icon color={theme.config.icon} icon="cloud-upload" />
                )}
                onPress={() => saveData()}
              />
              <List.Item
                title="Carregar dados"
                titleStyle={{color: theme.config.text}}
                description="Carregar seus dados da núvem"
                descriptionStyle={{color: theme.gray}}
                left={() => (
                  <List.Icon color={theme.config.icon} icon="cloud-download" />
                )}
                onPress={() => loadCloudData()}
              />
              <List.Item
                title="Deslogar do Google"
                titleStyle={{color: theme.config.text}}
                description="Sair ou trocar conta"
                descriptionStyle={{color: theme.gray}}
                left={() => (
                  <List.Icon color={theme.config.icon} icon="logout" />
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
            titleStyle={{color: theme.config.text}}
            description="Apagar dados da núvem e app"
            descriptionStyle={{color: theme.gray}}
            left={() => (
              <List.Icon color={theme.config.icon} icon="trash-can" />
            )}
            onPress={showDialog}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={{color: theme.config.section}}>
            Comunidade
          </List.Subheader>
          <List.Item
            title="Discord"
            titleStyle={{color: theme.config.text}}
            description="Será um prazer lhe receber na nossa comunidade!"
            descriptionStyle={{color: theme.gray}}
            left={() => <List.Icon color={theme.config.icon} icon="discord" />}
            onPress={() => {
              Linking.openURL('https://discord.gg/PxZW7d3dvb');
            }}
          />
          <List.Subheader style={{color: theme.config.section}}>
            Visual
          </List.Subheader>
          <List.Item
            title="Tema"
            description="Altere o esquema de cores do aplicativo"
            titleStyle={{color: theme.config.text}}
            descriptionStyle={{color: theme.gray}}
            left={() => <List.Icon color={theme.config.icon} icon="palette" />}
            onPress={() => {
              setModalVisible(true);
            }}
          />
          <List.Subheader style={{color: theme.config.section}}>
            Sobre
          </List.Subheader>

          <List.Item
            title="Termos de uso"
            titleStyle={{color: theme.config.text}}
            left={() => (
              <List.Icon color={theme.config.icon} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/tos');
            }}
          />
          <List.Item
            title="Política de privacidade"
            titleStyle={{color: theme.config.text}}
            left={() => (
              <List.Icon color={theme.config.icon} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/pop');
            }}
          />
          <List.Item
            title="Relatar problema"
            titleStyle={{color: theme.config.text}}
            left={() => <List.Icon color={theme.config.icon} icon="bug" />}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Doar"
            titleStyle={{color: theme.config.text}}
            left={() => (
              <List.Icon color={theme.config.icon} icon="piggy-bank" />
            )}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Versão"
            titleStyle={{color: theme.config.text}}
            descriptionStyle={{color: theme.gray}}
            description={version}
            left={() => <List.Icon color={theme.config.icon} icon="android" />}
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.modalView, {backgroundColor: theme.primary}]}>
            <View style={styles.detail} />
            <List.Subheader style={{color: theme.config.section}}>
              Selecione seu tema
            </List.Subheader>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem('colorScheme', 'ligththeme');
                  console.log('seted ligth theme');
                  setModalVisible(false);
                }}>
                <LinearGradient
                  style={styles.colorTab}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['#c6ccc8', '#6e1717']}>
                  <Text>LIGHT</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem('colorScheme', 'blacktheme');
                  console.log('seted black theme');
                  setModalVisible(false);
                }}>
                <LinearGradient
                  style={styles.colorTab}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['#0f0f0f', '#5e0909']}>
                  <Text>BLACK</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem('colorScheme', 'darkness');
                  console.log('seted darkness');
                  setModalVisible(false);
                }}>
                <LinearGradient
                  style={styles.colorTab}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['#0f0f0f', '#2b2b2a']}>
                  <Text>DARKNESS</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.setItem('colorScheme', 'purpledark');
                  console.log('seted purple dark');
                  setModalVisible(false);
                }}>
                <LinearGradient
                  style={styles.colorTab}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['#321075', '#9d80d8']}>
                  <Text>PURPLE DARK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  googleButton: {
    width: '100%',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  detail: {
    width: 100,
    height: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 15,
    borderRadius: 20,
  },
  colorTab: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 30,
  },
});

export default Config;

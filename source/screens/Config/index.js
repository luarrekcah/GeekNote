import React, {useEffect} from 'react';
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
  const [visible, setVisible] = React.useState(false);

  const [isSignedInn, setIsSignedIn] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  /*
  useEffect(() => {

  }, [isSignedInn]);
  */

  const isSignedIn = async () => {
    const isSignedInv = await GoogleSignin.isSignedIn();
    setIsSignedIn({isLoginScreenPresented: !isSignedInv});
    console.log(isSignedInn.isLoginScreenPresented);
    return isSignedInn;
  };

  GoogleSignin.configure({
    androidClientId:
      '240509455563-i6a7vt7bpchjckd1nc8jdgv8ghdkkfb8.apps.googleusercontent.com',
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>
            Usuário (Login pelo Google desativado para melhorias)
          </List.Subheader>
          {isSignedIn().isLoginScreenPresented === true ? (
            <>
              <List.Item
                title="Salvar dados"
                left={() => (
                  <List.Icon color={Colors.color.purple} icon="save" />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Carregar dados"
                left={() => (
                  <List.Icon color={Colors.color.purple} icon="load" />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Deslogar do Google"
                left={() => (
                  <List.Icon color={Colors.color.purple} icon="google" />
                )}
                onPress={async () => {
                  try {
                    await GoogleSignin.signOut();
                    console.log('deslogado');
                    await AsyncStorage.setItem('user', JSON.stringify(null));
                    navigation.goBack();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
            </>
          ) : (
            <GoogleSigninButton
              style={{width: '100%'}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={async () => {
                try {
                  await GoogleSignin.hasPlayServices();
                  const userInfo = await GoogleSignin.signIn();
                  console.log({userInfo});
                  await AsyncStorage.setItem(
                    'user',
                    JSON.stringify({userInfo}),
                  );
                  navigation.goBack();
                } catch (error) {
                  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                  } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                  } else if (
                    error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                  ) {
                    // play services not available or outdated
                  } else {
                    // some other error happened
                  }
                }
              }}
              disabled={true}
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
            description="3.0.0 BETA"
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

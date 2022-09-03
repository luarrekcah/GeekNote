import React from 'react';
import {View, ScrollView, Linking, StyleSheet} from 'react-native';
import {List, Dialog, Paragraph, Divider, Button} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>Usuário</List.Subheader>
          <List.Item
            title="Excluir dados"
            left={() => (
              <List.Icon color={Colors.color.primary} icon="trash-can" />
            )}
            onPress={showDialog}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Sobre</List.Subheader>
          <List.Item
            title="Termos de uso"
            left={() => (
              <List.Icon color={Colors.color.primary} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/tos');
            }}
          />
          <List.Item
            title="Política de privacidade"
            left={() => (
              <List.Icon color={Colors.color.primary} icon="information" />
            )}
            onPress={() => {
              Linking.openURL('https://geeknote.devluar.com/pop');
            }}
          />
          <List.Item
            title="Relatar problema"
            left={() => <List.Icon color={Colors.color.primary} icon="bug" />}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Doar"
            left={() => (
              <List.Icon color={Colors.color.primary} icon="piggy-bank" />
            )}
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <List.Item
            title="Versão"
            description="1.4.0 BETA"
            left={() => (
              <List.Icon color={Colors.color.primary} icon="android" />
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

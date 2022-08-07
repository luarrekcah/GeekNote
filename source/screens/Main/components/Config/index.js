import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import Colors from '../../../../Global/colorScheme';

const Config = () => {
  return (
    <View>
      <List.Section>
        <List.Subheader>Desenvolvimento</List.Subheader>
        <List.Item
          title="Doar"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="piggy-bank" />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Usuário</List.Subheader>
        <List.Item
          title="Excluir dados"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="trash-can" />
          )}
        />
        <List.Item
          title="Deslogar"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="account-remove" />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Sobre</List.Subheader>
        <List.Item
          title="Termos de uso"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="information" />
          )}
        />
        <List.Item
          title="Política de privacidade"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="information" />
          )}
        />
        <List.Item
          title="Relatar problema"
          left={() => <List.Icon color={Colors.color.primary} icon="bug" />}
        />
        <List.Item
          title="Versão"
          description="1.0.0 BETA"
          left={() => <List.Icon color={Colors.color.primary} icon="android" />}
        />
      </List.Section>
    </View>
  );
};

export default Config;

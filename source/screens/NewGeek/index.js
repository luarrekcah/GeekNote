import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Colors from '../../Global/colorScheme';

const NewGeek = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const search = () => {
    const {type} = route.params;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Pesquise seu Geek"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Text style={styles.text}>Pesquise e selecione o correto!</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  text: {
    color: Colors.color.white,
    margin: 10,
    alignSelf: 'center',
  },
});

export default NewGeek;

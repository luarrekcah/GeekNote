import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import Colors from '../../Global/colorScheme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewGeek = ({navigation, route}) => {
  const {type} = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = React.useState();

  const search = () => {
    switch (type) {
      case 'livro':
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyDxaJ8eShgOJW0_nQ-AV6XJZmiue__eGW8`,
        )
          .then(response => response.json())
          .then(result => {
            setData(result.items);
          });
        break;
      case 'anime':
        axios({
          method: 'get',
          url: `https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}`,
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          setData(response.data.data);
        });
        break;
      case 'filme':
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=74775892abb41dcb7869eca1a286962e&query=${searchQuery}`,
        )
          .then(response => response.json())
          .then(result => {
            setData(result.results);
          });
        break;
    }
    RenderResults(type);
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const RenderResults = () => {
    if (type === 'livro') {
      return (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async () => {
                AsyncStorage.getItem('livros').then(async res => {
                  const allLivros = JSON.parse(res) || [];
                  allLivros.push(item);
                  await AsyncStorage.setItem(
                    'livros',
                    JSON.stringify(allLivros),
                  );
                });
                navigation.goBack();
              }}>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri:
                      item.volumeInfo.imageLinks === undefined
                        ? 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/livro_sem_capa_120814.png'
                        : item.volumeInfo.imageLinks.thumbnail,
                  }}
                />
                <Text style={styles.text}>
                  {item.volumeInfo.title.slice(0, 22) +
                    '\n' +
                    item.volumeInfo.title.slice(22, 44)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    } else if (type === 'anime') {
      return (
        <FlatList
          data={data}
          keyExtractor={item => '_' + item.id}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async () => {
                AsyncStorage.getItem('animes').then(async res => {
                  const allAnimes = JSON.parse(res) || [];
                  allAnimes.push(item);
                  await AsyncStorage.setItem(
                    'animes',
                    JSON.stringify(allAnimes),
                  );
                });
                navigation.goBack();
              }}>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: item.attributes.posterImage.original,
                  }}
                />
                <Text style={styles.text}>
                  {item.attributes.canonicalTitle.slice(0, 22) +
                    '\n' +
                    item.attributes.canonicalTitle.slice(22, 44)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    } else {
      return (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async () => {
                AsyncStorage.getItem('filmes').then(async res => {
                  const allFilmes = JSON.parse(res) || [];
                  allFilmes.push(item);
                  await AsyncStorage.setItem(
                    'filmes',
                    JSON.stringify(allFilmes),
                  );
                });
                navigation.goBack();
              }}>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
                  }}
                />
                <Text style={styles.text}>
                  {item.title.slice(0, 22) + '\n' + item.title.slice(22, 44)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Pesquise seu Geek"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Button style={styles.searchButton} onPress={search}>
        Pesquisar
      </Button>
      <RenderResults />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  searchButton: {
    backgroundColor: Colors.color.white,
    padding: 5,
    borderRadius: 20,
    margin: 5,
  },
  text: {
    color: Colors.color.white,
    margin: 10,
    alignSelf: 'center',
  },
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  stretch: {
    alignSelf: 'center',
    width: 150,
    height: 200,
  },
});

export default NewGeek;

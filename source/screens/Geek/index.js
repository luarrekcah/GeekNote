import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Global/colorScheme';

const Geek = ({navigation}) => {
  const [livros, setLivros] = React.useState();
  const [animes, setAnimes] = React.useState();
  const [filmes, setFilmes] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    AsyncStorage.getItem('livros').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setLivros(cards);
      }
    });
    AsyncStorage.getItem('animes').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setAnimes(cards);
      }
    });
    AsyncStorage.getItem('filmes').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setFilmes(cards);
      }
    });
  }, []);

  const loadData = () => {
    AsyncStorage.getItem('livros').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setLivros(cards);
      }
    });
    AsyncStorage.getItem('animes').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setAnimes(cards);
      }
    });
    AsyncStorage.getItem('filmes').then(data => {
      if (data) {
        const cards = JSON.parse(data);
        setFilmes(cards);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Livros</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewGeek', {type: 'livro'});
            }}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={livros}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewGeek', {item: item, type: 'livro'});
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
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Animes</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewGeek', {type: 'anime'});
            }}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={animes}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewGeek', {item: item, type: 'anime'});
              }}>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: item.attributes.posterImage.original,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Filmes/Séries</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewGeek', {type: 'filme'});
            }}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filmes}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewGeek', {item: item, type: 'filme'});
              }}>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  listBar: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'space-between',
    borderRadius: 20,
    backgroundColor: Colors.color.purple,
  },
  textListBar: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.color.white,
  },
  card: {
    marginHorizontal: 10,
  },
  stretch: {
    width: 150,
    height: 200,
  },
});

export default Geek;

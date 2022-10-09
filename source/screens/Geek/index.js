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
import {Button, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Global/colorScheme';
import CustomTheme from '../../Global/CustomTheme';

const Geek = ({navigation}) => {
  const [livros, setLivros] = React.useState();
  const [animes, setAnimes] = React.useState();
  const [filmes, setFilmes] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const [theme, setTheme] = React.useState(CustomTheme());

  const [modal, setmodal] = React.useState();

  const [modalType, setmodalType] = React.useState();

  const [visible, setVisible] = React.useState(false);

  const showModal = (item, type) => {
    setVisible(true);
    setmodal(item);
    setmodalType(type);
  };

  const hideModal = () => {
    setVisible(false);
    setmodal(undefined);
  };

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const itemDelete = async type => {
    if (type === 'livro') {
      const newBooks = livros.filter(item => {
        if (item.id === modal.id) {
          return;
        }
        return item;
      });
      setLivros(newBooks);
      hideModal();
      await AsyncStorage.setItem('livros', JSON.stringify(newBooks));
    } else if (type === 'anime') {
      const newAnimes = animes.filter(item => {
        if (item.id === modal.id) {
          return;
        }
        return item;
      });
      setAnimes(newAnimes);
      hideModal();
      await AsyncStorage.setItem('animes', JSON.stringify(newAnimes));
    } else {
      const newFilmes = filmes.filter(item => {
        if (item.id === modal.id) {
          return;
        }
        return item;
      });
      setFilmes(newFilmes);
      hideModal();
      await AsyncStorage.setItem('filmes', JSON.stringify(newFilmes));
    }
  };

  const RenderModal = () => {
    if (modalType === 'livro') {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          {modal !== undefined ? (
            <View>
              <Image
                style={styles.capaModal}
                source={{
                  uri:
                    modal.volumeInfo.imageLinks === undefined
                      ? 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/livro_sem_capa_120814.png'
                      : modal.volumeInfo.imageLinks.thumbnail,
                }}
              />
              <Text style={[styles.title, {color: theme.white}]}>
                {modal.volumeInfo.title}
              </Text>
              <Button
                style={styles.deleteButton}
                icon="trash-can"
                onPress={() => itemDelete('livro')}
                mode="contained">
                DELETAR
              </Button>
            </View>
          ) : (
            ''
          )}
        </Modal>
      );
    } else if (modalType === 'anime') {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          {modal !== undefined ? (
            <View>
              <Image
                style={styles.capaModal}
                source={{
                  uri: modal.attributes.posterImage.original,
                }}
              />
              <Text style={[styles.title, {color: theme.white}]}>
                {modal.attributes.canonicalTitle}
              </Text>
              <Button
                style={styles.deleteButton}
                icon="trash-can"
                onPress={() => itemDelete('anime')}
                mode="contained">
                DELETAR
              </Button>
            </View>
          ) : (
            ''
          )}
        </Modal>
      );
    } else {
      return (
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          {modal !== undefined ? (
            <View>
              <Image
                style={styles.capaModal}
                source={{
                  uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${modal.poster_path}`,
                }}
              />
              <Text style={[styles.title, {color: theme.white}]}>
                {modal.title}
              </Text>
              <Button
                style={styles.deleteButton}
                icon="trash-can"
                onPress={() => itemDelete('filme')}
                mode="contained">
                DELETAR
              </Button>
            </View>
          ) : (
            ''
          )}
        </Modal>
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={[styles.listBar, {backgroundColor: theme.card.background}]}>
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
              onLongPress={() => {
                showModal(item, 'livro');
              }}
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
        <View
          style={[styles.listBar, {backgroundColor: theme.card.background}]}>
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
              onLongPress={() => {
                showModal(item, 'anime');
              }}
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
        <View
          style={[styles.listBar, {backgroundColor: theme.card.background}]}>
          <Text style={[styles.textListBar, {color: theme.white}]}>
            Meus Filmes/Séries
          </Text>
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
              onLongPress={() => {
                showModal(item, 'filme');
              }}
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
      <RenderModal />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
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
  },
  textListBar: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    marginHorizontal: 10,
  },
  stretch: {
    width: 150,
    height: 200,
  },
  modalStyle: {
    borderRadius: 40,
    padding: 40,
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: '#78160d',
    marginVertical: 10,
  },
  capaModal: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default Geek;

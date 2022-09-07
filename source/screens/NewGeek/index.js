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
        axios({
          method: 'get',
          url: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          setData(response.items);
          console.log(response._response);
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
        axios({
          method: 'get',
          url: `http://www.omdbapi.com/?t=${searchQuery}&plot=full`,
          params: {
            token:
              '03ANYolqsFZ-6M5Vmu9jMtGzwrXtpOiyOBG5GKkrkiCAhCTT4wLqSd3mMTJlx45vzhLdgebGaBpbZzgQNjktxj0pFtsga8DeWFJDJPBidlbjaQWyV_IARUD3idCYHvoa_Le3pAp34WR2UEokw0NCw2njF6KVX8xUeirPO1WbCJP3daT5WPqpLxy1fNDba5DROgC-S_Kb7-xYVGAuuMxpPsIDZ35-YRK4g8YHwXMO10-O5vlMYv0YqlnOsu_NHE5DPieQAb_ZeAv9uLKcS4SwlwJfWFEwcTvAeW6cIXftq5E2UWZG8veUphROyMJh7UpIfcZIVaPpl8QAvviHHep26UtpnZMTeWnEHVtMnLwuqusM8UJwR6k6lTOwIK2f1zb0jP_T-Pdtvo_1uvEFHEMfhxmprLGNAmrDc1Xele7t0zTLPWZN2mTp_81PlTbE5f0O5z-_bTdf-rcjytYr0CCiuN9Pm3YU4j7bEAgkQ21096KP3CuGVrsr7G4bnj-8-tMpPlqnx8IefGtx15',
          },
        }).then(response => {
          console.log(response);
        });
        break;
    }
    RenderResults(type);
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const RenderResults = () => {
    console.log(type);
    if (type === 'livro') {
      return (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: item.volumeInfo.imageLinks.thumbnail,
                  }}
                />
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
                  console.log(res);
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
            <TouchableOpacity>
              <View style={styles.card}>
                <Image
                  style={styles.stretch}
                  source={{
                    uri: item.volumeInfo.imageLinks.thumbnail,
                  }}
                />
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import ImageView from 'react-native-image-viewing';
import Colors from '../../Global/colorScheme';

const ViewGeek = ({navigation, route}) => {
  const {item, type} = route.params;
  const [visibleImageViewer, setIsVisibleImageViewer] = React.useState(false);

  const Render = () => {
    if (type === 'livro') {
      return (
        <View>
          <ImageView
            images={
              item.volumeInfo.imageLinks === undefined
                ? [
                    {
                      uri: 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/livro_sem_capa_120814.png',
                    },
                  ]
                : [{uri: item.volumeInfo.imageLinks.thumbnail}]
            }
            imageIndex={0}
            visible={visibleImageViewer}
            onRequestClose={() => setIsVisibleImageViewer(false)}
          />
          <View style={styles.center}>
            <TouchableOpacity onPress={() => setIsVisibleImageViewer(true)}>
              <Image
                style={styles.capa}
                source={{
                  uri:
                    item.volumeInfo.imageLinks === undefined
                      ? 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/livro_sem_capa_120814.png'
                      : item.volumeInfo.imageLinks.thumbnail,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTwo}>
            <View style={styles.center}>
              <Text style={styles.smallText}>
                Categoria:{' '}
                {item.volumeInfo.categories !== undefined
                  ? item.volumeInfo.categories.join('|')
                  : 'Não informado'}{' '}
                | {item.volumeInfo.pageCount} Páginas
              </Text>
              <Text style={styles.title}>{item.volumeInfo.title}</Text>
              <Text style={styles.smallText}>{item.volumeInfo.subtitle}</Text>
              <Button
                style={styles.button}
                onPress={() => {
                  Linking.openURL(item.volumeInfo.canonicalVolumeLink);
                }}>
                VER LIVRO
              </Button>
            </View>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.smallText}>{item.volumeInfo.description}</Text>
          </View>
        </View>
      );
    } else if (type === 'anime') {
      return (
        <View>
          <ImageView
            images={[{uri: item.attributes.posterImage.original}]}
            imageIndex={0}
            visible={visibleImageViewer}
            onRequestClose={() => setIsVisibleImageViewer(false)}
          />
          <View style={styles.center}>
            <TouchableOpacity onPress={() => setIsVisibleImageViewer(true)}>
              <Image
                style={styles.capa}
                source={{
                  uri: item.attributes.posterImage.original,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTwo}>
            <View style={styles.center}>
              <Text style={styles.smallText}>
                {item.attributes.episodeCount} Episódios |{' '}
                {item.attributes.episodeCount}min/ep | Notas:{' '}
                {item.attributes.averageRating}
              </Text>
              <Text style={styles.title}>{item.attributes.canonicalTitle}</Text>
              <Text style={styles.smallText}>
                {item.attributes.titles.ja_jp}
              </Text>
              <Button
                style={styles.button}
                onPress={() => {
                  Linking.openURL(
                    'https://www.youtube.com/watch?v=' +
                      item.attributes.youtubeVideoId,
                  );
                }}>
                VER ANIME (NÃO DISPONÍVEL)
              </Button>
            </View>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.smallText}>{item.attributes.description}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <ImageView
            images={[
              {
                uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
              },
            ]}
            imageIndex={0}
            visible={visibleImageViewer}
            onRequestClose={() => setIsVisibleImageViewer(false)}
          />
          <View style={styles.center}>
            <TouchableOpacity onPress={() => setIsVisibleImageViewer(true)}>
              <Image
                style={styles.capa}
                source={{
                  uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTwo}>
            <View style={styles.center}>
              <Text style={styles.smallText}>Notas: {item.vote_average}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.smallText}>{item.original_title}</Text>
              <Button
                style={styles.button}
                onPress={() => {
                  Linking.openURL('https://www.youtube.com');
                }}>
                VER FILME (NÃO DISPONÍVEL)
              </Button>
            </View>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.smallText}>{item.overview}</Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Render />
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  containerTwo: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.blacktheme.primary,
    height: '100%',
  },
  capa: {
    width: 200,
    height: 300,
    margin: 40,
  },
  center: {
    alignItems: 'center',
  },
  smallText: {
    color: Colors.blacktheme.white,
    padding: 10,
    alignContent: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  },
  title: {
    padding: 10,
    color: Colors.blacktheme.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.blacktheme.white,
    margin: 20,
    paddingHorizontal: 60,
    borderRadius: 100,
  },
});

export default ViewGeek;

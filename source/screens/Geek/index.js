import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Global/colorScheme';

const Geek = ({navigation}) => {
  const data = [
    {
      kind: 'books#volume',
      id: 'CMcdmmYLwHgC',
      etag: 'ghQlI1IMBbI',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/CMcdmmYLwHgC',
      volumeInfo: {
        title: 'Tubarões no Brasil',
        subtitle: 'guia prático de identificação',
        authors: ['Marcelo Szpilman'],
        publisher: 'Mauad Editora Ltda',
        publishedDate: '2004',
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '8590069133',
          },
          {
            type: 'ISBN_13',
            identifier: '9788590069133',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 160,
        printType: 'BOOK',
        categories: ['Sharks'],
        averageRating: 5,
        ratingsCount: 2,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '2.1.2.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=CMcdmmYLwHgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=CMcdmmYLwHgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'pt-BR',
        previewLink:
          'http://books.google.com.br/books?id=CMcdmmYLwHgC&printsec=frontcover&dq=brasil&hl=&cd=1&source=gbs_api',
        infoLink:
          'http://books.google.com.br/books?id=CMcdmmYLwHgC&dq=brasil&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Tubar%C3%B5es_no_Brasil.html?hl=&id=CMcdmmYLwHgC',
      },
      saleInfo: {
        country: 'BR',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'BR',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=CMcdmmYLwHgC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Livros</Text>
          <TouchableOpacity>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
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
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Animes</Text>
          <TouchableOpacity>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.listBar}>
          <Text style={styles.textListBar}>Meus Filmes/Séries</Text>
          <TouchableOpacity>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
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

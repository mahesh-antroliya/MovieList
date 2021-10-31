import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  Pressable,
  Button,
} from 'react-native';
import {AuthContext} from '../../navigation/context';
import Input from '../../components/Input';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getMovieList} from '../../services/api';
import {FlatList} from 'react-native-gesture-handler';
import {
  setSearchItem,
  getSearchItem,
  getAuthToken,
} from '../../utils/local-storage';

export default function Home(props) {
  const {signOut, getUser} = React.useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState();
  const [movieList, setMovieList] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedSearch, setSavedSearch] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const flatListRef = useRef();
  const [user, setUser] = useState();

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <Button onPress={onSignOut} title="Logout" />,
    });
  }, [props.navigation]);

  useEffect(async () => {
    const searchItems = await getSearchItem();
    if (searchItems) {
      setSavedSearch(searchItems);
    }
    const tempUser = await getAuthToken();
    setUser(tempUser);
  }, []);

  function searchMoview(page, text) {
    const pageNumber = page ? page : 1;

    if (searchText || text) {
      setLoading(true);
      setShowSearchBox(false);
      Keyboard.dismiss();
      const searchTerm = text ? text : searchText;
      getMovieList(searchTerm, pageNumber)
        .then(res => {
          console.log('Response', res, pageNumber, searchTerm);
          const {Search, totalResults, Response} = res;
          setLoading(false);

          if (pageNumber == 1) {
            saveSearchItem(searchText);
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
            setMovieList(Search);
            setPage(pageNumber);
          } else {
            const data = [...movieList, ...Search];
            setMovieList(data);
          }
          setHasMoreData(parseInt(totalResults) > 10);
        })
        .catch(error => {
          console.log('Error', error);
        });
    }
  }

  async function saveSearchItem(item) {
    savedSearch.push(item);
    const tempSavedSearch = [...new Set(savedSearch)];
    setSavedSearch(tempSavedSearch);
    await setSearchItem(tempSavedSearch);
  }

  function onSignOut() {
    Alert.alert('Moview List', 'Are you sure you want to logout?', [
      {text: 'Yes', onPress: signOut},
      {text: 'No', onPress: null},
    ]);
  }

  function renderMovieItem({item, index}) {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => {
          props.navigation.navigate('MovieDetail', {
            movie: item,
          });
        }}>
        <Image source={{uri: item.Poster}} style={styles.poster} />
        <View style={{marginHorizontal: 10, flex: 1}}>
          <Text style={styles.movieTitle}>{item.Title}</Text>
          <Text style={styles.movieYear}>{item.Year}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function ListFooterComponent() {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      );
    }
    return null;
  }

  function handleLoadMore({distanceFromEnd}) {
    if (hasMoreData && !loading) {
      const newPage = page + 1;
      setPage(newPage);
      searchMoview(newPage);
    }
  }

  function onSearchItemClick(item) {
    setSearchText(item);
    searchMoview(1, item);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome {user?.name}!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Search Movie"
            placeholderTextColor={'#A2A2B8'}
            style={styles.inputText}
            value={searchText}
            onChangeText={setSearchText}
            placeholderStyle={styles.placeholderStyle}
            onFocus={() => {
              console.log('focus');
              setShowSearchBox(true);
            }}
          />
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => {
              searchMoview();
            }}>
            <FeatherIcon name={'search'} size={25} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={movieList}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovieItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.01}
          ListFooterComponent={ListFooterComponent}
          keyboardShouldPersistTaps={'handled'}
        />
        {showSearchBox && savedSearch.length > 0 && (
          <View style={styles.searchBox}>
            <FlatList
              data={savedSearch}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <Pressable
                    key={item}
                    style={styles.searchItem}
                    onPress={() => {
                      onSearchItemClick(item);
                    }}>
                    <Text style={{fontSize: 16}}>{item}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 15,
    marginLeft: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    maxHeight: 200,
    width: '95%',
    top: 110,
    marginHorizontal: 10,
    borderRadius: 5,
    paddingBottom: 5,
    overflow: 'hidden',
  },
  searchItem: {
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  footer: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  movieItem: {
    marginTop: 10,
    flexDirection: 'row',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    fontSize: 18,
  },
  poster: {
    height: 60,
    width: 60,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  
});

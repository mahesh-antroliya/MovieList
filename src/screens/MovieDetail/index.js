import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
export default function MovieDetail({route}) {
  const movie = route.params.movie;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>{movie.Title}</Text>
        <Text style={styles.yearText}>{movie.Year}</Text>
        <Image source={{uri: movie.Poster}} style={styles.posterImage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yearText: {
    fontSize: 18,
  },
  posterImage: {
    height: 200,
    width: 200,
    marginTop: 10,
  },
});

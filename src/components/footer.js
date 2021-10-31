import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {isIphoneX} from '../utils/isIphoneX';
export default function Footer(props) {
  return (
    <View
      style={[styles.container,props.noBorder?{ 
      borderTopWidth: 0}:null]}>
      <Text
        style={styles.text}>
        KNIGHTPARK LTD
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    height: isIphoneX() ? 70 : 40,
    backgroundColor: '#4986C2',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopColor: '#E9EA78',
    borderTopWidth: 1,
  },
  text:{
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  }
})
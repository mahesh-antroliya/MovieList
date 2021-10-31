import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import colors from '../theme/colors';
import {AuthContext} from '../navigation/context';

function  DrawerComponent (props) {
  const {signOut,getUser} = React.useContext(AuthContext);



    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle={'light-content'} />
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
          <View style={{alignItems: 'center'}}>
          </View>
        </TouchableOpacity>

        <View style={style.middleView}>
          <TouchableOpacity
            style={style.buttonContainer}
            >
            <Text style={style.buttonText}>Home</Text>
          </TouchableOpacity>
          
        </View>
        <View style={style.footerView}> 
          <TouchableOpacity
            style={style.buttonContainer}
            onPress={signOut}>
            <Text style={style.buttonText}>Logout</Text>
          </TouchableOpacity></View>
      </SafeAreaView>
    );
  
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
  topView: {},
  headerTitle: {},
  middleView: {
    marginHorizontal: 20,
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Bicyclette-Regular',
  },
});



export default (DrawerComponent);

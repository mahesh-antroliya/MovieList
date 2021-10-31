import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/Input';
import {AuthContext} from '../../navigation/context';
import {setAuthToken} from '../../utils/local-storage';
import {login} from '../../services/api';
export default function Login(props) {
  const {signIn} = React.useContext(AuthContext);
  const [authDetail, setAuthDetail] = useState({
    userName: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function doLogin() {
    const errors = validateForm();
    if (errors) return;

    setLoading(true);

    login(authDetail.userName)
      .then(response => {
        console.log('LOgin res', response);
        setLoading(false);
        signIn(response[0]);
        setAuthToken(response[0]);
      })
      .catch(error => {
        console.log('Error', error);
        setLoading(false);
        setErrors({message:'No user for this username'});
      });
  }

  const handlers = {
    userName: userName => handleChange('userName', userName),
  };

  function handleChange(field, value) {
    const user = authDetail;
    user[field] = value;
    setAuthDetail({...authDetail, user});
  }

  function validateForm() {
    const {userName} = authDetail;
    const errors = {};

    if (!userName) {
      errors.userName = 'Username required';
    }

    setErrors(errors);
    return Object.keys(errors).length !== 0;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{marginHorizontal: 25}}>
          <Text style={styles.headerText}>Movie List</Text>
          <Input
            placeholder="Username"
            placeholderTextColor={'#A2A2B8'}
            style={styles.input}
            value={authDetail.userName}
            onChangeText={handlers.userName}
            placeholderStyle={{fontWeight: 'bold', fontSize: 20}}
          />

          {errors.userName && (
            <Text style={styles.errorMassage}>{errors.userName}</Text>
          )}

          {errors.message && (
            <Text style={styles.errorMassage}>{errors.message}</Text>
          )}

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size={24} color={'#4986C2'} />
            ) : (
              <TouchableOpacity onPress={doLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginHorizontal: 25,
  },
  headerText: {
    color: '#365d8c',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 15,
    marginLeft: 5,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#365d8c',
    width: Dimensions.get('window').width - 50,
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    height: 45,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMassage: {
    marginTop: 10,
    color: '#f00',

},
});

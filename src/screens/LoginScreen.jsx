import React,{useState} from 'react';
import {View, Text, TouchableOpacity,  TextInput, StyleSheet, Alert} from 'react-native';
import Background from '../utils/background';
import Btn from '../utils/btn';
import {Colors} from '../themes/colors';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if(email=='' || password==''){
      Alert.alert('Enter email and password correctly. Some fields maybe empty!')
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user.uid);
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        setError('Sign-in failed. Check your email and password.');
        console.error('Sign-in Error:', error);
      });
  };

  const onsignin = () => {
    navigation.navigate('SignupScreen')
  }

  return (
      <Background>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.loginText}>Login to your account</Text>

            <TextInput
            placeholder="Email"
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't remember password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPass')}>
              <Text style={styles.signupLink}>click here</Text>
            </TouchableOpacity>
          </View>
          <Btn textColor='white' bgColor={Colors.lgray} btnLabel="Login" Press={() => handleSignIn()} />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => onsignin()}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 440,
  },
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 550,
    width: 450,
    borderTopLeftRadius: 150,
    borderBottomRightRadius: 200,
    paddingTop: 100,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    color: Colors.lblue,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'grey',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '70%',
    marginTop: 20,
    marginRight: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 3,
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    color: Colors.lblue,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default SignInScreen;


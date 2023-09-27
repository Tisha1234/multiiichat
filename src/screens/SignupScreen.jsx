import React,{useState} from 'react';
import {View, Text, TouchableOpacity,  TextInput, StyleSheet,Alert} from 'react-native';
import Background from '../utils/background';
import Btn from '../utils/btn';
import {Colors} from '../themes/colors';
import auth from '@react-native-firebase/auth';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  const onRegister = async () => {
    if(email=='' || password==''){
      Alert.alert('Enter email and password correctly. Some fields maybe empty!')
      return;
    }
      try{
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        if (userCredential.user && userCredential.user.uid) {
          console.log("User ID:", userCredential.user.uid);
          Alert.alert('User account created!');
          navigation.navigate('ProfilepicScreen',{
            userId:userCredential.user.uid,
          });
        } else {
          console.error("Invalid userCredential:", userCredential);
        }
      }
      catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('An error occurred while registering.');
          console.error('Registration Error:', error);
        }
      }
    };

  const onLogin = () => {
    navigation.navigate('LoginScreen');
  }

  return (
      <Background>
        <View style={styles.container}>
          <Text style={styles.title}>SignUp</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.welcomeText}>Welcome!!</Text>
            <Text style={styles.loginText}>Create your account</Text>

            <TextInput
            placeholder="Email"
            style={[styles.inputBox, { color: Colors.lgray }]}
            placeholderTextColor= {Colors.lgray}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={[styles.inputBox, { color: Colors.lgray }]}
            placeholderTextColor= {Colors.lgray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonWrapper}>
          <Btn textColor='white' bgColor={Colors.lgray} btnLabel="SignUp" Press={() => onRegister()} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have a account? </Text>
            <TouchableOpacity onPress={() => onLogin()}>
              <Text style={styles.signupLink}>Login</Text>
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
    width: "100%",
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
    width:"100%",
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
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
    marginTop: 20,
    marginHorizontal: 30,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color:Colors.lgray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    color: Colors.lblue,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row', // Ensure the button is centered horizontally
    justifyContent: 'center',
    marginTop: 20, // Adjust the margin as needed
    marginHorizontal: 20, // 20dp spacing on both sides of the button
  },
});

export default SignUpScreen;


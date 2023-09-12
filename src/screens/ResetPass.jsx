import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text,Alert,ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from '../themes/colors';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const sendPasswordResetEmail = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      setResetSent(true);
      
    } catch (error) {
      Alert.alert('Error sending password reset email, recheck your email.');
    }
  };

  return (
    <View style={styles.container}>
      <View >
        <ImageBackground style={styles.imgbackg} source={require('../assets/card.jpg')}>
        <View style={{flex: 1, alignItems: 'center'}}>
      {resetSent ? (
        <Text style={{color:Colors.black,fontSize:25}}>Password reset email sent. Check your inbox.You can login once you reset your password.</Text>
      ) : (
        <>
        <Text style={{padding:40,fontSize:20,color:Colors.black}}>Enter your email address to reset password..</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Button title="Send Reset Email" onPress={sendPasswordResetEmail} />
        </>
      )}
      </View>
      </ImageBackground>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.lblue
  },
  input: {
    width: 300,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 10,
  },
  imgbackg: {
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   height:350,
   marginTop:200,
   width:400,
  }
 
});

export default ForgotPasswordScreen;

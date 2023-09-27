import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from '../utils/background';
import Btn from '../utils/btn';
import {Colors} from '../themes/colors';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const onLogin = () => {
        navigation.navigate('LoginScreen');
      };
      const onsignin = () => {
        navigation.navigate('SignupScreen')
      }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Let's start</Text>
        <Text style={styles.subtitle}>Chatting..</Text>
        <Text style={styles.subtext}>with MultiiChat...</Text>
        <View style={styles.buttonContainer}>
          <Btn
            bgColor={Colors.lblue}
            textColor="white"
            btnLabel="Login"
            Press={() => onLogin()}
          />
          <Btn
            bgColor="white"
            textColor={Colors.lgray}
            btnLabel="Signup"
            Press={() => onsignin()}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Center vertically
      alignItems: 'center',     // Center horizontally
      marginVertical: 25,
    },
    title: {
      color: 'white',
      fontSize: 64,
      marginBottom: 40,
    },
    subtitle: {
      color: 'white',
      fontSize: 64,
      marginBottom:15
    },
    subtext: {
      color: 'white',
      fontSize: 40,
      marginBottom: 20,
    },
    buttonContainer: {
      marginTop: 40,
      marginBottom:30 
    },
  });

export default Home;
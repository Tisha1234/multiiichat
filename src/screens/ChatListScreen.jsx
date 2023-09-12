import {View,TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import ChatList from '../components/ChatList';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../themes/colors';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserID] = useState(null);

const fetchUserData = () => {
  const user = auth().currentUser;
  if (user) {
    console.log('uid->', user.uid);
    setUserID(user.uid);
  } else {
    console.log('no user');
  }
};

useEffect(() => {
  fetchUserData();
}, []);

useFocusEffect(
  React.useCallback(() => {
    console.log('executed')
    fetchUserData(); // Refresh the user data
  }, [])
);

  const onNavigate = () => {
    navigation.navigate('ContactScreen',{
       userId: userId,
     });
  };
  
  const onLogOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
        navigation.navigate('LoginScreen')
      })
      .catch((error) => {
        console.error('Sign-out Error:', error);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatList userId={userId} />
      </ScrollView>
      <TouchableOpacity style={styles.contactIcon} onPress={onNavigate}>
        <VectorIcon
          name="message-reply-text"
          type="MaterialCommunityIcons"
          size={22}
          color={Colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactIcon1} onPress={onLogOut}>
        <VectorIcon
          type="MaterialCommunityIcons"
          name="logout"
          color={Colors.secondaryColor}
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.lblue,
    flex: 1,
  },
  contactIcon: {
    backgroundColor: Colors.black,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  contactIcon1: {
    backgroundColor: Colors.black,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 90,
    right: 20,
  },
});

export default ChatListScreen;
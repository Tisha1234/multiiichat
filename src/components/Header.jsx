import {View, StyleSheet,Image, Text} from 'react-native';
import React,{ useEffect, useState }from 'react';
import {Colors} from '../themes/colors';
import VectorIcon from '../utils/VectorIcon';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Header = () => {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [username, setUsername] = useState('');

    useEffect( () => {
      // Check if a user is signed in
      getUserData();
    },[]);


    const getUserData = async () => {
      const user = auth().currentUser;
      
      if (user) {
        const userId = user.uid;
    
        try {
          const userRef = await firestore().collection('users').doc(userId).get();
          const userData = userRef.data();
          
          if (userData) {
            const profilePictureUrl = userData.profilePictureUrl;
            const profileusername = userData.name;
            console.log('User Profile Picture URL:', profilePictureUrl);
            setUserProfilePic(profilePictureUrl);
            setUsername(profileusername);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    }
  }

  return (
    <View style={styles.container}>
      {userProfilePic && (
        <Image
          source={{ uri: userProfilePic }}
          style={styles.profilePic}
        />
      )}
      <View style={styles.headerTextContainer}>
      <Text style={{color:Colors.secondaryColor,fontSize:28,textAlign:'center'}}>{username.toUpperCase()}</Text>
    </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    padding: 16,
     flexDirection: 'row',
     justifyContent:'space-evenly'
  },
profilePic: {
  width: 50,
  height: 50,
  borderRadius: 18,
},
headerTextContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
});

export default Header;
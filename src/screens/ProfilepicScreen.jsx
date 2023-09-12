import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/colors';

const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const {userId} = props.route.params;
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

const renderFileUri = () => {
  if (profilePicture) {
    return <Image
      source={{ uri: profilePicture }}
      style={styles.images}
    />
  } else {
    return <Image
      source={require('../assets/man.jpg')}
      style={styles.images}
    />
  }
}


  const handleImageUpload = async () => {
    const options = {
      title: 'Select Profile Picture',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    console.log('done till here')
  
    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        try {
        
          let fetchedResponse= {uri: response.assets[0].uri};
          //console.log('check-',fetchedResponse);
          
          setProfilePicture(fetchedResponse.uri);
          console.log('done upload');
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    });
  };
  
  const handleSaveProfile = async () => {
    console.log('uid-',userId);

    if (!userName || !profilePicture) {
      console.log('Please enter a name and select a profile picture');
      return;
    }

    // Upload the image to Firebase Storage
    const imageRef = storage().ref(`profile_pictures/${userId}`);
    const response = await fetch(profilePicture);
    const blob = await response.blob();
    await imageRef.put(blob);


    // Get the image URL
    const imageUrl = await imageRef.getDownloadURL();

    // Store user data in Firestore
    const userRef = firestore().collection('users').doc(userId);
    await userRef.set({
      name: userName,
      profilePictureUrl: imageUrl,
    });

    console.log('User data stored successfully');
    Alert.alert('Profile created.. Kindly login with your Email-id and password..');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <TouchableOpacity onPress={handleImageUpload} style={styles.imagePicker}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        {renderFileUri()}
        </View>
      <Text style={{textAlign:'center',marginTop:30}}>Profile Pic</Text>
      <Text style={{textAlign:'center',color:Colors.red}}>Kindly click on the image above to set your profile picture.</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
      />
      <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.lblue,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 3
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  imagePicker: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

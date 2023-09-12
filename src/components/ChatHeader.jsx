import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import VectorIcon from '../utils/VectorIcon';
import {Colors} from '../themes/colors';
import {useNavigation} from '@react-navigation/native';


const ChatHeader = ({contactUserRef}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    useEffect(() => {
      getContactData();
    }, [contactUserRef]);
  
    const getContactData = async () => {
      const contactSnapshot = await contactUserRef.get();
      const data = contactSnapshot.data();
      const name = data.name;
      const profile = data.profilePictureUrl;
      setUser({name, profile});
    };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <VectorIcon
          name="arrow-back"
          type="Ionicons"
          size={24}
          color={Colors.white}
          onPress={() => navigation.goBack()}
        />
        {user?.profile && (
          <Image source={{uri: user.profile}} style={styles.profilePhoto} />
        )}
        {user?.name && (
          <Text style={styles.username}>{user.name}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePhoto: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginLeft:40,
    marginRight:40,
  },
  username: {
    fontSize: 22,
    color: Colors.white,
    marginLeft: 10,
    marginLeft:30
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginHorizontal: 25,
  },
});

export default ChatHeader;
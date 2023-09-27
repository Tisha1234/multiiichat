import {View, Text, Image, StyleSheet,RefreshControl, TouchableOpacity,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/colors';
import VectorIcon from '../utils/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const ChatList = ({userId}) => {
  const navigation = useNavigation();
  const [chatList, setChatList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const fetchData = async () => {
    setRefreshing(true);

      // getChatList()
      // .then(chatData => {
      //   setChatList(chatData);
      //   console.log('check');
      // })
      // .catch(error => {
      //   console.log('error :', error);
      // })

      try {
        const chatData = await getChatList();
        setChatList(chatData);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setRefreshing(false); 
      }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const onRefresh = () => {
    fetchData(); 
  };

  const getChatList = async () => {
    const userRef = firestore().collection('users').doc(userId);

    const allChatDoc = await firestore()
      .collection('chats')
      .where('participants', 'array-contains', userRef)
      .get();

    const chatData = await Promise.all(
      allChatDoc.docs.map(async chatDoc => {
        // Get User data from user data with reference of chats
        const data = chatDoc.data();
        const participants = await Promise.all(
          data.participants
            .filter(item => {
              return item.id != userId;
            })
            .map(async user => {
              const userDoc = await user.get();
              const userData = await userDoc.data();
              const id = user?.id;
              const name = userData?.name;
              const profile = userData?.profilePictureUrl;
              //console.log('check:',name);
              return {id, name, profile};
            }),
        );

        const chatDocRef = chatDoc.ref;
        const lastMessageDoc = await chatDocRef
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();

        const lastMessage = lastMessageDoc?.docs?.length
          ? lastMessageDoc.docs[0].data()
          : {};

        return {
          lastMessage,
          otherUser: participants[0],
        };
      }),
    );
    return chatData;
  };

  const onNavigate = contactId => {
    navigation.navigate('ChatScreen', {
      contactId: contactId,
      userId: userId,
    });
  };

  return (
    <ScrollView
    contentContainerStyle={styles.container1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} // Call onRefresh when "Pull to Refresh" is triggered
        />
      }
    >
      {chatList.map(item => (
        <View key={item.otherUser?.id}>
          <TouchableOpacity
            onPress={() => onNavigate(item.otherUser?.id)}
            style={styles.container}>
            <View style={styles.leftContainer}>
              {item.otherUser?.profile && (
                <Image
                  source={{uri: item.otherUser?.profile}}
                  style={styles.profileImg}
                />
              )}
              <View>
                <Text style={styles.username}>{item.otherUser?.name}</Text>
                <Text style={styles.message}>{item.lastMessage.body}</Text>
              </View>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.timeStamp}>
                {item.lastMessage.timestamp?.toDate().toDateString()}
              </Text>
              {item.mute && (
                <VectorIcon
                  type="MaterialCommunityIcons"
                  name="volume-variant-off"
                  size={22}
                  color={Colors.textGrey}
                  style={styles.muteIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexGrow: 1, 
    justifyContent: 'flex-start', 
  },
  profileImg: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 15,
  },
  container: {
    backgroundColor: Colors.lblue,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    color: Colors.black,
    fontSize: 16,
  },
  message: {
    color: Colors.black,
    fontSize: 14,
    marginTop: 5,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  timeStamp: {
    color: Colors.black,
    fontSize: 12,
  },
  muteIcon: {
    marginTop: 5,
    marginLeft: 20,
  },
});

export default ChatList;
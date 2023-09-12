import { StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import Wallpaper from '../assets/wall.jpg';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = (props) => {
  const {contactId, userId} = props.route.params;

  const generateChatId = () => {
    const sortedUserIds = [userId, contactId].sort();
    const chatId = sortedUserIds.join('_');
    return chatId;
  };

  const chatId = generateChatId();
  const chatRef = firestore().collection('chats').doc(chatId);
  const useRef = firestore().collection('users').doc(userId);
  const contactUserRef = firestore().collection('users').doc(contactId);

  const createChatRoom = async () => {
    const chatSnapShot = await chatRef.get();
    if (!chatSnapShot.exists) {
      const participants = [useRef, contactUserRef];
      await chatRef.set({participants});
    }
  };

  createChatRoom();

    return (
        <>
            <ChatHeader contactUserRef={contactUserRef} />
            <ImageBackground source={Wallpaper} style={styles.Wallpaper}>
            <ChatBody chatId={chatId} userId={userId} />
            </ImageBackground>
            <ChatFooter chatRef={chatRef} userId={userId} />
          </>
        );
    }

      
      
    export default ChatScreen;

    const styles=StyleSheet.create({
      Wallpaper:{
        flex:1,
        paddingHorizontal:12,
        paddingBottom:5,
      },
    });
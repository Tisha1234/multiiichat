import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ContactHeader from '../components/ContactHeader';
import ContactList from '../components/ContactList';
import {Colors} from '../themes/colors';

const ContactScreen = (props) => {
  const {userId} = props.route.params;

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <ContactHeader />
      <ContactList userId={userId}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: Colors.lblue,
  },
 });

export default ContactScreen;
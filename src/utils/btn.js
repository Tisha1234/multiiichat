import { Text, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import React from 'react';

export default function Btn({bgColor, btnLabel, textColor, Press}) {
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth - 60; 

  return (
    <TouchableOpacity
      onPress={Press}
      style={[styles.button, { backgroundColor: bgColor, width: buttonWidth }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{btnLabel}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center', 
    paddingVertical: 10,
    marginVertical:20,
    marginHorizontal: 30, 
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

//   return (
//     <View style={styles.container}>
//     <TouchableOpacity
//     onPress={Press}
//       style={{
//         backgroundColor: bgColor,
//         borderRadius: 100,
//         alignItems: 'center',
//         width: 350,
//         paddingVertical: 10,
//         // marginRight:30,
//         // marginTop:20,
//         //marginHorizontal:10,
//       }}>
//       <Text style={{color: textColor, fontSize: 25, fontWeight: 'bold'}}>
//         {btnLabel}
//       </Text>
//     </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin:20,
//   },
// });
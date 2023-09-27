import React from 'react';
import {View, ImageBackground,StyleSheet} from 'react-native';

// const Background = ({ children }) => {
//   return (
//     <View>
//       <ImageBackground source={require("../assets/wall.jpg")} style={{ height: '100%' }} />
//       <View style={{ position: "absolute" }}>
//         {children}
//       </View>
//     </View>
//   );
// }
const Background = ({ children }) => {
return (
  <ImageBackground source={require("../assets/wall.jpg")} style={styles.background}>
    <View style={styles.container}>
      {children}
    </View>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  background: {
    //flex: 1,
    height:"100%",
    resizeMode: 'cover', // You can adjust this to your needs (cover, contain, etc.)
  },
  container: {
    flex: 1,
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay background color if needed
  },
});

export default Background;
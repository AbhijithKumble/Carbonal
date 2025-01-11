import { Image, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/images/profilepic.webp")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
 
  image: {
    width: 30,
    height: 30,
    top: 10, // Distance from the top
    left: 350, // Distance from the right
    borderRadius: 15, // Makes the image circular
    marginBottom:20,
  },
});

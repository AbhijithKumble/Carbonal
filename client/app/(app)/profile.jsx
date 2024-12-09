import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View>
      <Image
      source={require("../../assets/images/profilepic.webp")}
      style={styles.image}/>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
 image:{
  
  width:30,
  height:30,
  marginLeft:350,
  marginTop:20,
  borderRadius:20,
 }
})
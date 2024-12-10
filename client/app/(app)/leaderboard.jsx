import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Leaderboard = () => {
  const handlePress = (buttonNumber) => {
    console.log(`Button ${buttonNumber} pressed`);
  };
  return (
    <SafeAreaView style={styles.container} >
       <Pressable style={styles.box} onPress={() => handlePress(1)}>
            <Image
              source={require("../../assets/images/leaderboard.webp")} // Replace with your image path
              style={styles.image}
            />
            <Text style={styles.buttonText}>LEADERBOARD</Text>
          </Pressable>
    </SafeAreaView>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  box: {
    position:"absolute",
    width:330,
    maxWidth: "width" * 0.9,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent box background
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top:580,
    left:15,
  },
  image: {
    width:330,
    maxWidth: "width" * 0.9,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    
   
  },
  buttonText: {
    position: "absolute",
    top: "50%",
    left: "25%",
    fontFamily:'Blimps',
    
    color: "#fff",
    fontSize: 25,
    
    textAlign: "center",
  },
})
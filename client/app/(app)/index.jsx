import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView,StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";
import Welcome from './welcome';
import Location from './location';
import Profile from "./profile";

const Index = () => {
  const handlePress = (buttonNumber) => {
    console.log(`Button ${buttonNumber} pressed`);
  };

  return (
    
    <ImageBackground
      source={require("../../assets/images/leavesdark.jpeg")} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView>
      <Profile/>
      <Location/>
      <View style={styles.container}>
    
        
        <Welcome/>
    
        <View style={styles.row1}>
          <Pressable style={styles.box} onPress={() => handlePress(1)}>
            {/* <Image
              source={require("../../assets/images/icon1.png")} // Replace with your image path
              style={styles.image}
            /> */}
            <Text style={styles.buttonText}>Box 1</Text>
          </Pressable>
          <Pressable style={styles.box} onPress={() => handlePress(2)}>
            {/* <Image
              source={require("../../assets/images/icon2.png")} // Replace with your image path
              style={styles.image}
            /> */}
            <Text style={styles.buttonText}>Box 2</Text>
          </Pressable>
        </View>
        <View style={styles.row2}>
          <Pressable style={styles.box} onPress={() => handlePress(3)}>
            {/* <Image
              source={require("../../assets/images/icon3.png")} // Replace with your image path
              style={styles.image}
            /> */}
            <Text style={styles.buttonText}>Box 3</Text>
          </Pressable>
          <Pressable style={styles.box} onPress={() => handlePress(4)}>
            {/* <Image
              source={require("../../assets/images/icon4.png")} // Replace with your image path
              style={styles.image}
            /> */}
            <Text style={styles.buttonText}>Box 4</Text>
          </Pressable>
        </View>
      </View>
      </SafeAreaView>
    </ImageBackground>
    
  );
};

export default Index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    
  },
  container: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:240,
    
   
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    
  
    marginTop:180,
    
  },
  box: {
    width: "40%",
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
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});


import { Link, router, Stack } from "expo-router";
import React from "react";
import { SafeAreaView,StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";
import Welcome from './welcome';
import Locationreact from './locations';

import { Link, router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";


import Profile from "./profile";
import Leaderboard from "./leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Index = () => {



  const signOut = () => {

    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    router.push("sign-in");

  }

  const handlePress = (buttonNumber) => {
    console.log(`Button ${buttonNumber} pressed`);
  };

  const signOut = () => {


    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('userId', '');
    AsyncStorage.setItem('token', '');
    router.push("sign-in");

  }
 


  return (
    <ImageBackground
      source={require("../../assets/images/leavesdark.jpeg")} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView>
        <Leaderboard />
        <Profile />
        <Locationreact />
        <View style={styles.container}>
          <Welcome />

          <Pressable style={styles.boxed} onPress={signOut}>
            
            <Text>SignOut</Text>
          </Pressable>



          <View style={styles.row1}>
            <Link href="./(footprint)" asChild>
              <Pressable style={styles.box} onPress={() => handlePress(1)}>
                <Image
                  source={require("../../assets/images/footprint.jpeg")} // Replace with your image path
                  style={styles.image}
                />
                <Text style={styles.buttonText}>FOOTPRINT</Text>
              </Pressable>
            </Link>

  



            <Link href="./(tips)" asChild>
              <Pressable style={styles.box} onPress={() => handlePress(2)}>
                <Image
                  source={require("../../assets/images/quicktip.png")} // Replace with your image path
                  style={styles.image2}
                />
                <Text style={styles.buttonTexttips}>TIPS</Text>
              </Pressable>
            </Link>
          </View>

  
          <View style={styles.row2}>
            <Link href="./(challenges)" asChild>
              <Pressable style={styles.box} onPress={() => handlePress(3)}>
                <Image
                  source={require("../../assets/images/challenges.jpeg")}


          <View style={styles.row2}>
            <Link href="./(challenges)" asChild>
              <Pressable style={styles.box}>
                <Image
                  source={require("../../assets/images/challenges.jpeg")} // Replace with your image path

                  style={styles.image}
                />
                <Text style={styles.buttonTextchallenge}>CHALLENGES</Text>
              </Pressable>
            </Link>

  
            <Link href="./(progress)" asChild>
              <Pressable style={styles.box} onPress={() => handlePress(4)}>
                <Image
                  source={require("../../assets/images/progress.jpeg")}


            <Link href="./(progress)" asChild>
              <Pressable style={styles.box} onPress={() => handlePress(4)}>
                <Image
                  source={require("../../assets/images/progress.jpeg")} // Replace with your image path

                  style={styles.image}
                />
                <Text style={styles.buttonText}>PROGRESS</Text>
              </Pressable>
            </Link>
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
    marginTop:180,
    
   
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    
  
    marginTop:170,
    

  },
  boxed: {
    position: "absolute",
    width: 60,
    marginTop: -40,
    maxWidth: "width" * 0.9,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  


  
  
  box: {
    width: 160,
    maxWidth: "width" * 0.9,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
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
    width:160,
    maxWidth: "width" * 0.9,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,

  },
  image2: {
    width:160,
    maxWidth: "width" * 0.9,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    
    borderRadius: 10,
 
    elevation: 5,
  },
  buttonText: {
    position: "absolute",
    top: "110%",
    left: "40%",
    transform: [{ translateX: -50 }, { translateY: -50 }], // Centers the text
    color: "#fff",
    fontSize: 28,

    textAlign: "center",
    fontFamily: 'Blimps',
  },
  buttonTexttips: {
    position: "absolute",
    top: "110%",
    left: "65%",
    transform: [{ translateX: -50 }, { translateY: -50 }], // Centers the text
    color: "#fff",
    fontSize: 28,
    
    textAlign: "center",

    fontFamily:'Blimps',



  },
  buttonTextchallenge: {
    position: "absolute",
    top: "110%",
    left: "35%",
    transform: [{ translateX: -50 }, { translateY: -50 }], // Centers the text
    color: "#fff",
    fontSize: 28,
    
    textAlign: "center",

    fontFamily:'Blimps',

  },
});

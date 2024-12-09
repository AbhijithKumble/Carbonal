import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'

const Welcome = () => {
    const [loaded]=useFonts({
        Blimps:require('../../assets/fonts/Blimps.ttf'),
    });
    if(!loaded){
        console.log(1);
        return null;
    }
  return (
   <SafeAreaView>
   <View style={styles.box}>
      <Text style={styles.text}>WELCOME USER</Text>
      <Text style={styles.quote}>Quote for the day:</Text>
    </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
    box:{
        width: "90%",
        height:150,
        backgroundColor: "#a6bdb5",
        
        alignItems: "center",
        marginTop:70,
        marginHorizontal:20,
        borderRadius: 26,
    },
    text: {
        color: "#3c7962",
        fontSize: 40,
     
        fontFamily:'Blimps',
        marginTop:10,
      },
      quote: {
        color: "#3c7962",
        fontSize: 25,
     
        fontFamily:'Blimps',
        marginTop:5,
      },

});
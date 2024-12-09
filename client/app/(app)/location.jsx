import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Location = () => {
  return (
    <SafeAreaView>
    
      <Text style={styles.text} >LOCATION</Text>
    
    </SafeAreaView>
  )
}

export default Location

const styles = StyleSheet.create({
  text:{
    position:"absolute",
    marginTop:-20,
    color:"#fffafa",
    fontSize: 24,
    fontFamily:'Blimps',
    marginHorizontal:70,
    alignItems:"flex-start"
  }
})
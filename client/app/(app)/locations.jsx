import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Locationreact = () => {
  const [locate, setLocation] = useState();

  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>location</Text>
    </SafeAreaView>
  );
};

export default Locationreact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    margin: 20,
    textAlign: 'center',
    fontFamily: 'Blimps', // Use the loaded font here
  },
});

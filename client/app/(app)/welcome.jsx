import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import ip from '../../utils/ip.js';

const Welcome = () => {
  const [loaded] = useFonts({
    Blimps: require('../../assets/fonts/Blimps.ttf'),
  });

  const [myQuote, setMyQuote] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(ip+'/quote');
        const quote = typeof response.data === 'string' ? response.data : response.data.text; // Handle both object and string responses
        setMyQuote(quote || "No quote available"); // Fallback if quote is empty
        console.log(myQuote);
      } catch (error) {
        console.error(error);
        setMyQuote("Error fetching quote");
      }
    };
    
    fetchQuotes();
  }, []);

  if (!loaded) {
    return null; // Wait for fonts to load
  }

  return (
    <SafeAreaView>
      <View style={styles.box}>
        <Text style={styles.text}>WELCOME USER</Text>
        <Text style={styles.quote}>Quote for the day:</Text>
        <Text style={styles.quotescss}>"{myQuote}"</Text> 
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  quotescss: {
    color: '#3c7962',
    fontSize: 15,
    fontFamily: 'Blimps',
    marginTop: 0,
  },
  box: {
    width: '90%',
    height: 170,
    backgroundColor: '#a6bdb5',
    alignItems: 'center',
    marginTop: 0,
    marginHorizontal: 20,
    borderRadius: 26,
  },
  text: {
    color: '#3c7962',
    fontSize: 40,
    fontFamily: 'Blimps',
    marginTop: 10,
  },
  quote: {
    color: '#3c7962',
    fontSize: 25,
    fontFamily: 'Blimps',
    marginTop: 5,
  },
});

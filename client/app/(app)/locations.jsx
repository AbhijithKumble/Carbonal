import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Locationreact = () => {
  const [locate, setLocation] = useState();
  const [address,setAddress]=useState();
  useEffect(()=>{
    const getPermissions=async () =>{
      let { status } =await Location.requestForegroundPermissionsAsync();
      if(status!=='granted'){
        console.log("please grant location permission");
        return;
      }
      let currentlocation=await Location.getCurrentPositionAsync({});
      setLocation(currentlocation);
      
    };
    const reversegeocode=async ()=>{
      const reverseaddress=await Location.reverseGeocodeAsync({
        longitude:locate.coords.longitude,
        latitude:locate.coords.latitude
      });
      if (reverseaddress.length > 0) {
        const { name,district,city, region,  } = reverseaddress[0]; // Extract details
        setAddress(`no ${name},${district},${city}, \n${region}`); // Format the address
      } else {
        setError('Unable to retrieve address.');
      }

  };
    getPermissions();
    reversegeocode();
  },[]);
  
  return (
    <SafeAreaView >
      <Text style={styles.text}>{address}</Text>
    </SafeAreaView>
  );
};

export default Locationreact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fffafa',
    fontSize: 14,

    textAlign: 'center',
    fontFamily: 'Blimps', 
    marginTop:-40,
  },
});

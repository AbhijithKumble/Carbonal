import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Locationreact = () => {
  const [locate, setLocation] = useState();
  const [address,setAddress]=useState();
  const fetchLocation = useCallback(async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        return;
      }

      // Fetch current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Reverse geocode the location
      const reverseAddress = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseAddress.length > 0) {
        const { name, district, city, region } = reverseAddress[0];
        setAddress(`No ${name}, ${district}, ${city}, ${region}`);
        setError(""); // Clear error on success
      } else {
        setError("Unable to fetch address");
      }
    } catch (err) {
      setError("Error fetching location data");
      
    }
  }, []);

  // Fetch location on initial load and periodically every minute
  useEffect(() => {
    fetchLocation(); // Fetch on component mount

    const interval = setInterval(() => {
      fetchLocation(); // Fetch every minute
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fetchLocation]);

  
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

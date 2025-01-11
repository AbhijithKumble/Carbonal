import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from "react-native";
import ip from '../../../utils/ip.js'
const Tips = () => {
  const [Usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch userId from AsyncStorage
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          setId(storedId);
          console.log("Fetched userId:", storedId);
          const response = await axios.get(ip+`/usage/${storedId}`);
          setUsage(response.data);
        } else {
          console.error("Id is not available.");
        }
      } catch (error) {
        console.error("Error fetching usages data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  if (!Usage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No usage data available for this user.</Text>
      </View>
    );
  }

  return (

    <View style={styles.container}>
      <ImageBackground
      source={require("../../../assets/images/tipsback.jpeg")}
      style={styles.background}
      >

    

      <Text style={styles.tips}>Tips</Text>
      <Text style={styles.pers}>Personal Tip</Text>
      <View style={styles.personaltip}>
  {Usage.petrolLitres > 200 ? (
    <Text style={styles.ptext}>
      Petrol usage is extremely high. Consider using public transport or carpooling regularly. Switching to a more fuel-efficient vehicle can also make a big difference.
    </Text>
  ) : Usage.petrolLitres > 100 ? (
    <Text style={styles.ptext}>
      Petrol usage is above average. Try using a bicycle or walking for short distances, and combine errands to reduce trips.
    </Text>
  ) : Usage.petrolLitres > 50 ? (
    <Text style={styles.ptext}>
      Petrol usage is moderate. Opt for public transport a few times a week or explore carpooling options with colleagues or friends.
    </Text>
  ) : (
    <Text style={styles.ptext}>
      Good job on keeping petrol usage low! Continue to explore sustainable travel options.
    </Text>
  )}
    {Usage.dieselLitres > 200 ? (
    <Text style={styles.ptext}>
      Diesel usage is very high. Consider switching to electric or hybrid vehicles for long-term savings and environmental benefits. Optimize your routes to minimize fuel consumption.
    </Text>
  ) : Usage.dieselLitres > 100 ? (
    <Text style={styles.ptext}>
      Diesel usage is above average. Schedule regular vehicle maintenance to improve fuel efficiency. Reduce idling and explore alternative transport options when possible.
    </Text>
  ) : Usage.dieselLitres > 50 ? (
    <Text style={styles.ptext}>
      Diesel usage is moderate. Use fuel-efficient driving techniques such as maintaining a steady speed and avoiding rapid acceleration.
    </Text>
  ) : (
    <Text style={styles.ptext}>
      Great job keeping diesel usage low! Keep up the eco-friendly habits by minimizing unnecessary trips and exploring alternative energy sources.
    </Text>
  )}
  {Usage.meatFishKg >20 ? (
    <Text style={styles.ptext}>
      Your meat consumption is quite high. Consider incorporating more plant-based meals into your diet. Not only is this healthier, but it also significantly reduces your carbon footprint. Start with meat-free Mondays!
    </Text>
  ) : 20>Usage.meatFishKg > 10 ? (
    <Text style={styles.ptext}>
      Your meat consumption is above average. Try balancing your diet with more legumes, grains, and vegetables. Explore recipes that use meat as a flavor enhancer rather than the main ingredient.
    </Text>
  ) : 10>Usage.meatFishKg > 5 ? (
    <Text style={styles.ptext}>
      Your meat consumption is moderate. Gradually reduce portion sizes or substitute some meals with plant-based proteins like tofu, lentils, or chickpeas.
    </Text>
  ) : (
    <Text style={styles.ptext}>
      Great job keeping meat consumption low! A plant-forward diet is excellent for your health and the environment. Keep exploring sustainable food choices.
    </Text>
  )}
   {Usage.laptopsDesktops + Usage.phones + Usage.otherGadgets > 10 ? (
    <Text style={styles.ptext}>
      Owning multiple gadgets increases e-waste. Donate unused devices or sell them to recycling programs. Aim for shared usage and reduce gadget purchases.
    </Text>
  ) : Usage.laptopsDesktops + Usage.phones + Usage.otherGadgets > 5 ? (
    <Text style={styles.ptext}>
      Reduce your electronics footprint by considering multi-functional devices and repairing rather than replacing old gadgets.
    </Text>
  ) : (
    <Text style={styles.ptext}>
      Your gadget usage is sustainable. Continue recycling old devices and choosing energy-efficient options for future purchases.
    </Text>
  )}
</View>
</ImageBackground>
    </View>
  );
};

export default Tips;

const styles = StyleSheet.create({
  background: {
            // Make the background fill the screen
    resizeMode: "cover", // Scale the image to cover the area
    flex:1,
    width:'100%',
    height:'100%',
  },
  ptext: {
    fontFamily: "Blimps",
    fontSize: 18,
    color: "#333333",
    marginVertical: 5,
  },
  personaltip: {
    
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: "center",
    width: "90%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  tips: {
    fontFamily: "Blimps",
    fontSize: 45, // Increased size for prominence
    color: "#FFFFFF", // White for better contrast with green
    textAlign: "center",
    marginTop: 20, // Position it closer to the top
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  pers: {
    fontFamily: "Blimps",
    fontSize: 28, // Smaller than the main header
    color: "#FFFFE0", // Pale yellow for contrast
    textAlign: "center",
    marginVertical: 10, // Space between the header and content
  },
  errorText: {
    fontFamily: "Blimps",
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
});

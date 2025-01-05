import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const House = ({
  electricityUnits, setElectricityUnits,
  cleanEnergyPercentage, setCleanEnergyPercentage,
  fossilFuelCost, setFossilFuelCost,
  livingSpace, setLivingSpace,
  waterUsageMultiplier, setWaterUsageMultiplier
}) => {
  const [Id, setId] = useState("");

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          setId(storedId);

        } else {
          console.error("Id is not available.");
        }
      } catch (err) {
        console.error("Error retrieving Id from AsyncStorage:", err);
      }
    };
    fetchId();
  }, []);

  // Update electricity units in the backend
  const updateElectricityUnits = async () => {
   
    if (!Id) {
      console.error("Cannot update: User ID is not available.");
      return;
    }

    try {
      console.log(Id);
      const response = await axios.put(`http://192.168.0.101:3000/usage/${Id}`, {
        electricityUnits: parseFloat(electricityUnits),
        fossilFuelCost: parseFloat(electricityUnits),
       
      });

      if (response.status === 200) {
        console.log("Electricity units updated successfully:", response.data);
      } else {
        console.error("Failed to update electricity units:", response.data);
      }
    } catch (err) {
      console.error("Error updating electricity units:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Electricity Units/Year</Text>

        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={electricityUnits}
          onChangeText={setElectricityUnits}
        />
       

        <Text style={styles.textInput}>
          Percentage of Clean Energy : {cleanEnergyPercentage.toPrecision(2)}%
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={cleanEnergyPercentage}
          onValueChange={setCleanEnergyPercentage}
        />

        <Text style={styles.textInput}>Fossil Fuel Cost/Year (Rupees)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={fossilFuelCost}
          onChangeText={setFossilFuelCost}
        />

        <Text style={styles.textInput}>Living Space (sq.ft)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={livingSpace}
          onChangeText={setLivingSpace}
        />

        <Text style={styles.textInput}>
          Water Usage Multiplier : {waterUsageMultiplier}x
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={waterUsageMultiplier}
          onValueChange={setWaterUsageMultiplier}
        />
         <Pressable onPress={updateElectricityUnits} style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontFamily: "Blimps",
    fontSize: 30,
    textAlign: "center",
  },
  textInputContainer: {
    padding: 10,
  },
  textInput: {
    fontFamily: "Blimps",
    fontSize: 20,
    textAlign: "left",
    paddingTop: 10,
  },
  placeholderInput: {
    backgroundColor: "#ddf5ed",
    fontFamily: "Blimps",
    fontSize: 15,
    textAlign: "left",
    paddingLeft: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  slider: {
    marginTop: 20,
  },
});

export default House;

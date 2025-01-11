import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ip from '../../utils/ip';

const Food = ({
  meatFishKg, setMeatFishKg,
  eggsNo, setEggsNo,
  dairyLitres, setDairyLitres, 
  fruitsVeggiesKg, setFruitsVeggiesKg, 
  snacksDrinksCalories, setSnacksDrinksCalories
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
  const Updatefood = async () => {
    if (!Id) {
      console.error("Cannot update: User ID is not available.");
      return;
    }
  
    const meatValue = parseFloat(meatFishKg);
    if (isNaN(meatValue)) {
      console.error("Invalid value for Meat/Fish Kg.");
      return;
    }
  
    try {
      const response = await axios.put(ip+`/usage/${Id}`, {
        meatFishKg: meatValue,
        
      });
  
      if (response.status === 200) {
        console.log("Food units updated successfully:", response.data);
      } else {
        console.error("Failed to update food units:", response.data);
      }
    } catch (err) {
      console.error("Error updating food units:", err.response?.data || err.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Food</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Meat/Fish (Kg/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={meatFishKg}
          onChangeText={setMeatFishKg}
        />

        <Text style={styles.textInput}>Eggs (Nos/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={eggsNo}
          onChangeText={setEggsNo}
        />

        <Text style={styles.textInput}>Dairy (Litres/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={dairyLitres}
          onChangeText={setDairyLitres}
        />

        <Text style={styles.textInput}>Fruits & Vegetables (Kg/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={fruitsVeggiesKg}
          onChangeText={setFruitsVeggiesKg}
        />

        <Text style={styles.textInput}>Snacks, Drinks, etc... (Calories/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={snacksDrinksCalories}
          onChangeText={setSnacksDrinksCalories}
        />
        <Pressable onPress={Updatefood} style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ... other container styles from Location component
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
  heading: {
    fontFamily: 'Blimps',
    fontSize: 30,
    textAlign: 'center',
  },
  textInputContainer: {
    padding: 10,
  },
  textInput: {
    fontFamily: 'Blimps',
    fontSize: 20,
    textAlign: 'left',
  },
  placeholderInput: {
    backgroundColor: '#ddf5ed',
    fontFamily: 'Blimps',
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 10,
    borderRadius: 20,
  },
});

export default Food;

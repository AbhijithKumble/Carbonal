import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ip from '../../utils/ip';

const Others = ({
  phones, setPhones,
  laptopsDesktops, setLaptopsDesktops,
  otherGadgets, setOtherGadgets
}) => {

  const [Id, setId] = useState("");
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
  const updateOthers = async () => {
   
    if (!Id) {
      console.error("Cannot update: User ID is not available.");
      return;
    }

    try {
      console.log(Id);
      const response = await axios.put(ip+`/usage/${Id}`, {
        phones:parseFloat(phones),
        laptopsDesktops:parseFloat(laptopsDesktops),
        otherGadgets:parseFloat(otherGadgets),
      });

      if (response.status === 200) {
        console.log("Electricity units updated successfully:", response.data);
      } else {
        console.error("Failed to update electricity units:", response.data);
      }
    } catch (err) {
      console.error("Error updating electricity units:",  err.response?.data||err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Others</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Number of Phones</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={phones}
          onChangeText={setPhones}
        />

        <Text style={styles.textInput}>Number of Laptops/Desktops</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={laptopsDesktops}
          onChangeText={setLaptopsDesktops}
        />

        <Text style={styles.textInput}>Number of Other Gadgets</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={otherGadgets}
          onChangeText={setOtherGadgets}
        />
         <Pressable onPress={updateOthers} style={styles.saveButton}>
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

export default Others;

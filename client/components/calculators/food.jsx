import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Food = ({
  meatFishKg, setMeatFishKg,
  eggsNo, setEggsNo,
  dairyLitres, setDairyLitres, 
  fruitsVeggiesKg, setFruitsVeggiesKg, 
  snacksDrinksCalories, setSnacksDrinksCalories
}) => {
  const [] = useState('');

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ... other container styles from Location component
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

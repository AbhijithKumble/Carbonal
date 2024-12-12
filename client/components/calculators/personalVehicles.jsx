import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const PersonalVehicles = ({
  petrolLitres, setPetrolLitres,
  dieselLitres, setDieselLitres
}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Personal Vehicle</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Petrol Consumption (Litres/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={petrolLitres}
          onChangeText={setPetrolLitres}
        />

        <Text style={styles.textInput}>Diesel Consumption (Litres/Year)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={dieselLitres}
          onChangeText={setDieselLitres}
        />
      </View>
    </View>
  );
};

export default PersonalVehicles;
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
    gap: 10,
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
    marginBottom: 20,
  },
});


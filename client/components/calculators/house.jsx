import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';

const House = ({
  electricityUnits, setElectricityUnits,
  cleanEnergyPercentage, setCleanEnergyPercentage,
  fossilFuelCost, setFossilFuelCost,
  livingSpace, setLivingSpace,
  waterUsageMultiplier, setWaterUsageMultiplier
}) => {

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

        <Text style={styles.textInput}>Percentage of Clean Energy : {cleanEnergyPercentage.toPrecision(2)}%</Text>

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

        <Text style={styles.textInput}>Water Usage Multiplier : {waterUsageMultiplier}x</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={waterUsageMultiplier}
          onValueChange={setWaterUsageMultiplier}
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
    paddingTop: 10,
  },
  placeholderInput: {
    backgroundColor: '#ddf5ed',
    fontFamily: 'Blimps',
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  slider: {
    // Add styles for the slider if needed, e.g., width, height, track color, thumb color
  },
});

export default House;

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Shopping = ({
  goodsCost, setGoodsCost,
  servicesCost, setServicesCost
}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Goods Cost/Year (Rupees)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={goodsCost}
          onChangeText={setGoodsCost}
        />

        <Text style={styles.textInput}>Services Cost/Year (Rupees)</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={servicesCost}
          onChangeText={setServicesCost}
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

export default Shopping;

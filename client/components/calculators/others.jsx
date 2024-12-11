import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Others = ({
  phones, setPhones,
  laptopsDesktops, setLaptopsDesktops,
  otherGadgets, setOtherGadgets
}) => {

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

export default Others;

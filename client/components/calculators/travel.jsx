import { StyleSheet, Text, TextInput, View } from 'react-native';

const Travel = ({
  kmsPerYear, setKmsPerYear
}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Travel</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Kilometers Traveled per Year</Text>
        <TextInput
          style={styles.placeholderInput}
          keyboardType="numeric"
          value={kmsPerYear}
          onChangeText={setKmsPerYear}
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

export default Travel;

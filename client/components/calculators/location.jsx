import { StyleSheet, Text, TextInput, View } from "react-native";

const Location = ({
  streetLocality,
  setStreetLocality,
  city,
  setCity,
  state,
  setState,
  country,
  setCountry
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Location</Text>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInput}>Street/Locality</Text>
        <TextInput
          placeholder="city 19"
          style={styles.placeholderInput}
        />
        <Text style={styles.textInput}>City</Text>
        <TextInput
          placeholder="city 19"
          style={styles.placeholderInput}
        />
        <Text style={styles.textInput}>State</Text>
        <TextInput
          placeholder="city 19"
          style={styles.placeholderInput}
        />
        <Text style={styles.textInput}>Country</Text>
        <TextInput
          placeholder="city 19"
          style={styles.placeholderInput}
        />
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {

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

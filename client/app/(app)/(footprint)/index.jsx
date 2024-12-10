import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Travel from "../../../components/calculators/travel";
import House from "../../../components/calculators/house";
import Shopping from "../../../components/calculators/shopping";
import Location from "../../../components/calculators/location";
import Food from "../../../components/calculators/food";
import PersonalVehicles from "../../../components/calculators/personalVehicles";
import Others from "../../../components/calculators/others";
import TotalFootPrint from "../../../components/calculators/totalFootprint";

const Index = () => {
  const [pressedButton, setPressedButton] = useState(null);
  const Titles = {
    1: {
      'name': 'Location',
      'component': <Location />
    },
    2: {
      'name': 'House',
      'component': <House />
    },
    3: {
      'name': 'Shopping',
      'component': <Shopping />
    },
    4: {
      'name': 'Travel',
      'component': <Travel />
    },
    5: {
      'name': 'Food',
      'component': <Food />
    },
    6: {
      'name': 'PersonalVehicles',
      'component': <PersonalVehicles />
    },
    7: {
      'name': 'Others',
      'component': <Others />
    },
    8: {
      'name': 'TotalFootPrint',
      'component': <TotalFootPrint />
    },

  };


  const handlePress = (buttonIndex) => {
    setPressedButton(buttonIndex);
  };

  return (
    <View style={styles.screenView}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>LET'S CALCULATE FOOTPRINT</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {[...Array(8)].map((_, index) => (
            <Button
              key={index}
              title={`${Titles[index + 1]['name']}`}
              onPress={() => handlePress(index)}
              color={pressedButton === index ? '#0d522c' : 'lightgreen'}
              style={[styles.button, {
                flex: 1,
                margin: 5,
              }]}
            />
          ))}
        </View>

        {pressedButton !== null && (
          <View>
            {
              Titles[pressedButton + 1]['component']
            }
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: "#c2d8d1",
    height: "100%"
  },
  headingView: {
  },
  headingText: {
    textAlign: "center",
    fontFamily: 'Blimps',
    fontSize: 30,
    marginHorizontal: 50,
    color: "#0d522c",
  },
  clickablesView: {
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // Add more styles as needed
  },
  componentBelow: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default Index;

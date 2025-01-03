import { Button, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TotalFootPrint = ({ totalFootprint }) => {
  const [email, setEmail] = useState("");

  // Fetch email from AsyncStorage
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        } else {
          console.error("Email is not available.");
        }
      } catch (err) {
        console.error("Error retrieving email from AsyncStorage:", err);
      }
    };
    fetchEmail();
  }, []);

  const update = () => {
    if (!email) {
      console.error("Cannot update: Email is not available.");
      return;
    }

    const formdata = {
      email: email,
      footprint: totalFootprint,
    };

    axios
      .post("http://192.168.0.101:3000/footprint", formdata)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.totalFootprintContainer}>
      <Text style={styles.totalFootprintText}>
        Total Carbon Footprint: {totalFootprint.toFixed(2)} kg CO2
      </Text>
      <Button title="Save" onPress={update} style={styles.googleText} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalFootprintContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#d8e6e1",
    borderRadius: 10,
    alignItems: "center",
  },
  totalFootprintText: {
    fontFamily: "Blimps",
    fontSize: 22,
    color: "#0d522c",
  },
  googleText: {
    marginTop: 20,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    paddingVertical: 12,
    backgroundColor: "#3c7962",
    color: "white",
    fontFamily: "Blimps",
    fontSize: 16,
  },
});

export default TotalFootPrint;

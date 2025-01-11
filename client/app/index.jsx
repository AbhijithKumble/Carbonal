import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useEffect, useState } from "react";
import Index from "./(app)";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LoginNav = () => {
  return (

    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>
            Welcome! How would you like to take your first step towards sustainability?
          </Text>
          <Link style={styles.sign} href="/sign-in">
            <Text style={styles.buttonText}>Sign In</Text>
          </Link>
          <Link style={styles.sign} href="/sign-up">
            <Text style={styles.buttonText}>Sign Up</Text>
          </Link>

          <Link style={styles.sign} href="./(app)">
            <Text style={styles.buttonText}>index</Text>
          </Link>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const HomeNav = () => {
  return (<Index />);
};

const Page = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("isLoggedIn");
        console.log("Retrieved isLoggedIn:", data);
        setisLoggedIn(data === "true"); // Boolean comparison
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
        setisLoggedIn(false); // Default to false on error
      }
    };
    getData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <HomeNav /> : <LoginNav />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  sign: {
    width: 320,
    maxWidth: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 30,
    marginLeft: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Blimps",
  },
});

export default Page;

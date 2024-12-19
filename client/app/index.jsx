import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>
          Welcome! How would you like to take your first step towards sustainability?
        </Text>
        {/* <Button
          title="Go to (app) Index"
          onPress={() => router.push("/(app)")}
        /> */}
        <Link style={styles.sign} href="/sign-in">
          <Text style={styles.buttonText}>Sign In</Text>
        </Link>
        <Link style={styles.sign} href="/sign-up">
          <Text style={styles.buttonText}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
};

export default Page;

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
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  sign: {
    width: 320,
    maxWidth: "90%",
    height: 40,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop:30,
    marginLeft:5,
  },
  buttonText: {
    color: "#000", // Makes text visible
    fontSize: 18,
    textAlign: "center", // Ensures the text is centered horizontally
    lineHeight:30, // Centers text vertically within the box
    fontFamily: "Blimps", // Use your custom font here if available
  },
});

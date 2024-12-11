import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Button
        title="Go to (app) Index"
        onPress={() => router.push("/(app)")}
      />
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
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
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});


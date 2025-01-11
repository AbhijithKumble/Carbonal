import React from "react";
import { Alert, View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../utils/ip.js";
import { useRouter } from "expo-router";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${ip}/auth/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
        dateJoined: new Date().toISOString(),
      });

      if (response.data.token) {
        const { token, userId } = response.data;

        Alert.alert("Success", "Sign-up successful!");
        reset(); // Clear the form
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("email", data.email);
        await AsyncStorage.setItem("userId", userId);

        router.push("/(app)");
      } else {
        Alert.alert("Error", "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", `Network Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            style={[styles.input, errors.name && styles.errorInput]}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            style={[styles.input, errors.email && styles.errorInput]}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required", minLength: 6 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={[styles.input, errors.password && styles.errorInput]}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Confirm Password is required",
          validate: (value) => value === password || "Passwords must match",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirm Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <Pressable style={styles.googleText} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#c4dad2",
  },
  text: {
    color: "white",
    fontFamily: "Blimps",
  },
  header: {
    fontSize: 24,
    fontFamily: "Blimps",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#77bba2",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
    paddingVertical: 12,
    backgroundColor: "#3c7962",
    color: "white",
    fontFamily: "Blimps",
    fontSize: 16,
  },
});

export default SignUp;

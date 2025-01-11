import React from "react";
import { Alert, Button, View, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import ip from '../utils/ip.js'
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
        dateJoined: new Date().toISOString(), // Automatically include the current date
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
    <View style={{ padding: 20 }}>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
          />
        )}
      />
      {errors.name && <Text style={{ color: "red" }}>{errors.name.message}</Text>}

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
            style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
          />
        )}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

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
            style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
          />
        )}
      />
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password.message}</Text>
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
            style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>
      )}

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default SignUp;


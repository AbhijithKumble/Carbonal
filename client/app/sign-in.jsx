import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://192.168.0.108:3001/signin", data);
  
      console.log("Server Response:", response.data);
  
      if (response.data.token) {
        Alert.alert("Sign Up Successful", "You are now signed in!");
        router.push("/(app)");
      } else if(response.data.data==="User already present"){
        router.push("/(app)");
       
      }
      else {
        Alert.alert("Error", "Invalid credentials.");
      }
    } catch (error) {
      console.error("Sign-up error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        Alert.alert("Error", "Unauthorized: Invalid credentials or access.");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value.email}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            placeholder="Password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value.password}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
      
      <FontAwesome5.Button  name="google" onPress={() =>{console.log(1)}}
        >
  <Text style={styles.googleText}>Log In With Google</Text>
</FontAwesome5.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignIn;

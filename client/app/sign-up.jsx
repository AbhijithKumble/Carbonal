import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const SignUp = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    Alert.alert("Sign Up Successful", `Welcome, ${data.email}!`);
  };

  const password = watch("password");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {/* Email Field */}
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
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password Field */}
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
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Confirm Password Field */}
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Please confirm your password.",
          validate: (value) =>
            value === password || "Passwords do not match.",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
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

export default SignUp;

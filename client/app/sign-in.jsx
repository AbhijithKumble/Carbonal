import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    if (data.email && data.password) {
      try {
        const response = await axios.post("http://localhost:3000/signin", {
          email: data.email,
          password: data.password,
        });

        // Check if the response has a token
        if (response.data.token) {
          // Store the token (e.g., in AsyncStorage, Context, or Redux)
          Alert.alert("Sign In Successful", `Token: ${response.data.token}`);
          reset(); // Reset form fields after successful submission
        } else {
          Alert.alert("Error", "Failed to sign in. Please try again.");
        }
      } catch (error) {
        setLoading(false); // Stop loading
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else {
      setLoading(false); // Stop loading
      Alert.alert("Error", "Please provide both email and password.");
    }
  };
/*
  const handleError = () => {
    Alert.alert("Form Error", "Please fill in all fields correctly.");
  };
*/

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
            value={value}
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
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
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

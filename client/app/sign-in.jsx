
import React, { useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

const SignIn = () => {
 


  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://192.168.0.104:3000/signin", data);
  
      console.log("Server Response:", response.data);
  
      if (response.data.token) {
     
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
        
        // Alert.alert("Error", "Unauthorized: Invalid credentials or access.");
      } else {
        // Alert.alert("Error", "Something went wrong. Please try again later.");
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
            value={value.email.email}
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

      <Pressable style={styles.googleText} title="google signin"  onPress={handleSubmit(onSubmit)} >
        <Text style={styles.text} >Sign In</Text>
      </Pressable>
      
      <Pressable style={styles.googleText} title="google" onPress={googlesignin}
        >
      <Text style={styles.text} >Log In With Google</Text>
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
  text:{
    color:"white",
    fontFamily: "Blimps", 
  },
  header: {
    fontSize: 24,
    fontFamily:"Blimps",
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
    marginTop: 20, // Create a gap above the Google button
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    height:50,
    
    alignItems:"center",
    textAlign:"center",
    alignContent:"center",
    paddingVertical:12,
    backgroundColor:"#3c7962",
    color:"white",
    fontFamily: "Blimps", 
    fontSize:16,
  },
});

export default SignIn;

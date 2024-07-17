import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DoctorSignup = () => {
  const navigation = useNavigation();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    navigation.navigate("DoctorLogin");
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://192.168.188.100:8000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration, e.g., navigate to login screen
        navigation.navigate("DoctorLogin");
      } else {
        // Handle registration failure
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup Failed", error);
      setError("Signup failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.logo}>DiabetesCare.</Text>
        <Text style={styles.header}>Register as a Healthcare Provider</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.text}>
            Already have an Account?{" "}
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "80%",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#657787",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0052CC",
    padding: 12,
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  link: {
    color: "#0052CC",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default DoctorSignup;

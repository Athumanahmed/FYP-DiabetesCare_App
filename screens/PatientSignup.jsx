import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    navigation.navigate("PatientLogin");
  };

  const handleSignup = async () => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      // If successful, navigate to Login screen
      navigation.navigate("PatientLogin");
    } catch (error) {
      setError(error.message || "Signup failed");
      console.error("Signup Error:", error);
    }

    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            style={{ width: 300, height: 300, borderRadius: 150 }}
            source={require("../assets/health.png")}
          />
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
            }}
          >
            DiabetesCare.
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Register to start your health session now
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              fontSize: 18,
            }}
            placeholder="Enter your username"
            placeholderTextColor={"gray"}
            value={username}
            onChangeText={setusername}
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              fontSize: 18,
            }}
            placeholder="Enter your email"
            placeholderTextColor={"gray"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              fontSize: 18,
            }}
            placeholder="Enter your Password"
            placeholderTextColor={"gray"}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}
        <TouchableOpacity
          style={{ backgroundColor: "#007BFF", padding: 15, borderRadius: 10 }}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>Already have an Account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={{ fontSize: 18, color: "#007BFF", fontWeight: "bold" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

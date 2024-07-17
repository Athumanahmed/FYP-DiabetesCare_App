import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    navigation.navigate("PatientSignup");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace with your backend API endpoint for login
      const response = await fetch("http://192.168.188.100:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      // If successful, navigate to Dashboard or another screen
      navigation.navigate("Dashboard");
    } catch (error) {
      setError(error.message || "Login failed");
      console.error("Login Error:", error);
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "80%" }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../assets/health.png")}
          />
          <Text style={{ fontSize: 36, fontWeight: "bold", color: "blue", textAlign: "center" }}>
            DiabetesCare.
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center" }}>
            Login to start your health session now
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, fontSize: 18 }}
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
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, fontSize: 18 }}
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
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Don't have an Account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={{ fontSize: 18, color: "#007BFF", fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const DoctorLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    navigation.navigate("DoctorSignup");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://192.168.188.100:8000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns a user object and a token
        console.log(data); // Log the response for debugging
        navigation.navigate("RegisterDoctor", { user: data.user });
      } else {
        // Handle errors returned from the backend
        Alert.alert("Login Failed", data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white w-full h-full flex items-center justify-center ">
      <View className="w-full justify-around flex pt-30 pb-5">
        <View className="flex items-center justify-center rounded-full mb-2">
          <Image
            className="w-[300] h-[300]"
            source={require("../assets/health.png")}
          />
        </View>
        <View className="flex items-center justify-center ">
          <Text className="text-6xl font-bold text-center tracking-wider text-blue-800">
            DiabetesCare.
          </Text>
        </View>
        <View className="flex items-center mb-5">
          <Text className="font-semibold text-xl text-slate-400">
            Login as a Healthcare Provider
          </Text>
        </View>
        <View className="flex items-center justify-center mx-4 space-y-4">
          <View className="bg-black/5 p-4 rounded-xl w-full mb-2">
            <TextInput
              className="text-lg"
              placeholder="Enter your email"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="bg-black/5 p-4 rounded-xl w-full mb-3">
            <TextInput
              className="text-lg"
              placeholder="Enter your Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View className="w-full">
            <TouchableOpacity
              className="p-3 rounded-lg mb-3 bg-blue-800"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-xl font-semibold">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-lg mr-4">Don't have an Account?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text className="text-blue-900 text-lg font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorLogin;

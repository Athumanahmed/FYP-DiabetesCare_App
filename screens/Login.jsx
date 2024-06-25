import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { account } from "../config/Appwrite"; 

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        // If there's an active session, log out
        await account.deleteSession("current");
      } catch (error) {
        // No active session found, no action needed
        console.log("No active session found.");
      }
    };

    checkSession();
  }, []);

  const handleLogin = async () => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log(response);
      navigation.navigate("Dashboard");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
      console.error(error);
    }
    setLoading(false);
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
            Login to start your health session now
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

export default Login;

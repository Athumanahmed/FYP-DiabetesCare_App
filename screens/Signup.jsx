import React, { useEffect, useState } from "react";
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
import { account } from "../config/Appwrite";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
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

  const handleSignup = async () => {
    //  email validation 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await account.create("unique()", email, password, name);
      console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white w-full h-full ">
      <View className="w-full justify-around flex pt-30 pb-5">
        <View className="flex items-center justify-center rounded-full mb-2">
          <Image
            className="w-[300] h-[300] rounded-full"
            source={require("../assets/health.png")}
          />
        </View>
        <View className="flex items-center justify-center ">
          <Text className="text-6xl font-bold text-center tracking-wider text-blue-800">
            DiabetesCare.
          </Text>
        </View>
        {/* header */}
        <View className="flex items-center mb-5">
          <Text className="font-semibold text-xl text-slate-400">
            Register to start your health session now
          </Text>
        </View>
        {/* form */}
        <View className="flex items-center justify-center mx-4 space-y-4">
          <View className="bg-black/5 p-4 rounded-xl w-full mb-2">
            <TextInput
              className="text-lg"
              placeholder="Enter your Name"
              placeholderTextColor={"gray"}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
          </View>
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

          {error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : null}

          <View className="w-full">
            <TouchableOpacity
              className="p-3 rounded-lg mb-3 bg-blue-800"
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-xl font-semibold">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-lg mr-4">Already have an Account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-blue-900 text-lg font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

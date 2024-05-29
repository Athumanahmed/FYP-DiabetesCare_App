import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Splash = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <View className="bg-white h-full w-full">
      <View className="w-full justify-around flex mt-40">
        <View className="flex items-center justify-center rounded-full mb-2">
          <Image
            className="w-[300] h-[300] rounded-full"
            source={require("../assets/health.png")}
          />
        </View>

        <View className="flex items-center justify-center mt-5 mb-5">
          <Text className="text-6xl font-bold text-center tracking-wider text-blue-800">
            DiabetesCare.
          </Text>
        </View>
        <View className="flex items-center justify-center mb-5">
          <TouchableOpacity
            className=" p-3 rounded-lg mb-3 bg-blue-800 w-[80%]"
            onPress={handleLogin}
          >
            <Text className="text-white text-center text-xl font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center">
          <TouchableOpacity
            className=" p-3 rounded-lg mb-3 bg-slate-300 w-[80%]"
            onPress={handleSignup}
          >
            <Text className="text-black text-center text-xl font-semibold">
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Splash;

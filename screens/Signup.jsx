import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
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
          <Animated.Text
            entering={FadeInUp.delay(400).duration(2000).springify().damping(4)}
            className="text-6xl font-bold text-center tracking-wider text-blue-800"
          >
            DiabetesCare.
          </Animated.Text>
        </View>
        {/* heaer */}
        <View className="flex items-center mb-5">
          <Text className="font-semibold text-xl text-slate-400">
            Register to start your health session now
          </Text>
        </View>
        {/* form */}
        <View className="flex items-center justify-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-4 rounded-xl w-full mb-2"
          >
            <TextInput
              className="text-lg"
              placeholder="Enter your Name"
              placeholderTextColor={"gray"}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-4 rounded-xl w-full mb-2"
          >
            <TextInput
              className="text-lg"
              placeholder="Enter your email"
              placeholderTextColor={"gray"}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).delay(200).springify()}
            className="bg-black/5 p-4 rounded-xl w-full mb-3"
          >
            <TextInput
              className="text-lg"
              placeholder="Enter your Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(400).springify()}
            className="w-full"
          >
            <TouchableOpacity className=" p-3 rounded-lg mb-3 bg-blue-800">
              <Text className="text-white text-center text-xl font-semibold">
                Register
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(600).springify()}
            className="flex-row justify-center"
          >
            <Text className="text-lg mr-4">Already have an Account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-blue-900 text-lg font-bold">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

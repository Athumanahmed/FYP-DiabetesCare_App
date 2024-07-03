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
      <View className="w-full justify-around flex mt-20">
        <Text className="text-7xl font-bold text-center tracking-wider text-blue-800">
          DiabetesCare.
        </Text>
        <View className="flex items-center justify-center rounded-full mb-1">
          <Image
            className="w-[300] h-[300] rounded-full"
            source={require("../assets/health.png")}
          />
        </View>

        <View className="flex items-center justify-center">
          <Text className="flex items-center text-justify font-light  text-lg pl-5 pr-5 mb-3">
            Welcome to{" "}
            <Text className="font-extrabold text-blue-800">DiabetesCare</Text>{" "}
            your trusted companion in managing diabetes with ease and
            confidence. Our mobile application is designed to provide you with
            comprehensive tools and resources to help you stay on top of your
            health. With DiabetesCare, you can effortlessly monitor your blood
            sugar levels, medications, and daily activities, ensuring you have a
            clear understanding of your health status at all times.
          </Text>

          <Text className="flex items-center text-justify font-light  text-lg pl-5 pr-5 mb-4">
            Our personalized health tracking features allow you to log and
            analyze your blood sugar readings, providing valuable insights to
            help you and your healthcare provider make informed decisions.
            You'll receive timely medication reminders, ensuring you never miss
            a dose and maintain your treatment plan effectively. Dive into our
            extensive library of educational resources, where you can learn
            about the best dietary practices, exercise routines, and lifestyle
            adjustments to manage your diabetes more effectively.
          </Text>
        </View>
        <View className="flex items-center justify-center">
          <TouchableOpacity
            className=" p-3 rounded-lg mb-3 bg-blue-800 w-[80%]"
            onPress={handleLogin}
          >
            <Text className="text-white text-center text-xl font-semibold">
              Start your Session Now.
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center mt-4 font-semibold">
          HammaBros Technologies Copyright &copy; 2024{" "}
          <Text className="font-extrabold text-blue-800">DiabetesCare</Text>
        </Text>
      </View>
    </View>
  );
};

export default Splash;

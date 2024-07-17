//import liraries
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// create a component
const MyComponent = () => {
  const navigation = useNavigation();

  const handledoctor = () => {
    navigation.navigate("DoctorLogin");
  };

  const handlepatient = () => {
    navigation.navigate("PatientLogin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text className="text-6xl  font-bold text-center tracking-wider text-blue-800">
          DiabetesCare.
        </Text>
        <Text style={styles.title}>Continue As</Text>
        <TouchableOpacity
          className=" p-3 rounded-lg mb-3 bg-blue-800 w-[90%]"
          onPress={handledoctor}
        >
          <Text className="text-white text-center text-xl font-semibold">
            Healthcare Provider
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" p-3 rounded-lg mb-3 bg-blue-800 w-[90%]"
          onPress={handlepatient}
        >
          <Text className="text-white text-center text-xl font-semibold">
            Patient
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:10
  },
  buttonContainer: {
    width: "80%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
});

//make this component available to the app
export default MyComponent;

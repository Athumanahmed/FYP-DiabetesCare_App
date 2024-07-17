import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const RegisterPatient = ({ navigation }) => {
  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    email: "",
    date_of_birth: "",
    phone_number: "",
    home_address: "",
    diagnosis_date: "",
    diabetes_type: "",
    medications: "",
    allergies: "",
    emergency_contact: "",
    doctor_name: "",
    insurance_information: "",
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // const response = await fetch(
      //   `http://192.168.188.100:8000/api/doctors/${doctorId}/patients`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(form),
      //   }
      // );

      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message || "Registration failed");
      // }

      // Registration successful, navigate to next screen
      navigation.navigate("DoctorDashboard"); // Navigate to doctor dashboard or other screen
    } catch (error) {
      console.error("Patient Registration Error:", error.message);
      // Handle error, e.g., show error message
      // Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patient Registration</Text>

      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/([A-Z])/g, " $1").trim()}
          value={form[key]}
          onChangeText={(value) => handleInputChange(key, value)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Patient</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#0052CC",
    padding: 12,
    borderRadius: 20,
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterPatient;

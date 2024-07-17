import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const RegisterDoctor = ({ navigation }) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    gender: "",
    phone_number: "",
    hospital_name: "",
    specialization: "",
    years_of_experience: "",
    medical_licence_number: "",
    qualifications: "",
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://192.168.188.100:8000/api/doctors/register-doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message || "Registration failed");
      }

      // Registration successful, navigate to next screen
      navigation.navigate("RegisterPatient"); // Navigate to patient registration or other screen
    } catch (error) {
      console.error(error.message);
      // Handle error, e.g., show error message
      // Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Healthcare Provider Registration</Text>

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
        <Text style={styles.buttonText}>Register</Text>
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
    marginTop: 20,
    color: "blue",
    fontSize: 28,
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

export default RegisterDoctor;

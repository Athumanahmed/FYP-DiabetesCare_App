import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

const BloodSugarLog = () => {
  const [bloodSugar, setBloodSugar] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [notes, setNotes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const logEntry = {
      date: new Date().toLocaleDateString(),
      bloodSugar,
      mealType,
      time: currentTime,
      notes,
    };

    setSubmittedData(logEntry);
    setModalVisible(true);

    try {
      // Retrieve existing log entries
      const storedLogs = await AsyncStorage.getItem("logEntries");
      const logEntries = storedLogs ? JSON.parse(storedLogs) : [];

      // Add the new log entry
      logEntries.push(logEntry);

      // Save the updated log entries back to AsyncStorage
      await AsyncStorage.setItem("logEntries", JSON.stringify(logEntries));
    } catch (error) {
      console.error("Failed to save log entry", error);
    }

    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("LogHistory", { newLog: logEntry });
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Blood Sugar</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter blood sugar value (mg/dL)"
        keyboardType="numeric"
        value={bloodSugar}
        onChangeText={setBloodSugar}
      />

      <Picker
        selectedValue={mealType}
        style={styles.picker}
        onValueChange={(itemValue) => setMealType(itemValue)}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Additional notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <FontAwesome5 name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submitted Data</Text>
            <Text style={styles.modalText}>
              Blood Sugar: {submittedData.bloodSugar} mg/dL
            </Text>
            <Text style={styles.modalText}>
              Meal Type: {submittedData.mealType}
            </Text>
            <Text style={styles.modalText}>Time: {submittedData.time}</Text>
            <Text style={styles.modalText}>Notes: {submittedData.notes}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  picker: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default BloodSugarLog;

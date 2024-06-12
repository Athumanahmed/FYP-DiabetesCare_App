import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { databases } from "../config/Appwrite";

const BloodSugarLog = () => {
  const [bloodSugar, setBloodSugar] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [isFasting, setIsFasting] = useState("No");
  const [notes, setNotes] = useState("");
  const [healthStatus, setHealthStatus] = useState("Normal");
  const [customHealthStatus, setCustomHealthStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
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
      healthStatus:
        healthStatus === "Other" ? customHealthStatus : healthStatus,
    };

    setSubmittedData(logEntry);
    setModalVisible(true);

    // Clear input fields
    setBloodSugar("");
    setMealType("Breakfast");
    setIsFasting("No");
    setNotes("");
    setHealthStatus("Normal");
    setCustomHealthStatus("");

    const handleRefresh = () => {
      setRefreshing(true);
      // Clear input fields
      setBloodSugar("");
      setMealType("Breakfast");
      setIsFasting("No");
      setNotes("");
      setHealthStatus("Normal");
      setCustomHealthStatus("");
      setRefreshing(false);
    };

    try {
      // Retrieve existing log entries
      const storedLogs = await AsyncStorage.getItem("logEntries");
      const logEntries = storedLogs ? JSON.parse(storedLogs) : [];

      // Add the new log entry
      logEntries.push(logEntry);

      // Save the updated log entries back to AsyncStorage
      await AsyncStorage.setItem("logEntries", JSON.stringify(logEntries));

      const response = await databases.createDocument(
        "66682e8d0021614bfa8d",
        "666973ef00235f00e2b7",
        "unique()",
        {
          bloodSugar,
          mealType,
          isFasting,
          notes,
          healthStatus,
          customHealthStatus,
        }
      );

      console.log("Document created successfully:", response);
    } catch (error) {
      console.error("Failed to save log entry", error);
      console.error("Error creating document:", error);
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

      <Text style={styles.label}>Blood Sugar Value (mg/dL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter blood sugar value"
        keyboardType="numeric"
        value={bloodSugar}
        onChangeText={setBloodSugar}
      />

      <Text style={styles.label}>Meal Type</Text>
      <Picker
        selectedValue={mealType}
        style={styles.picker}
        onValueChange={(itemValue) => setMealType(itemValue)}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Fasting" value="Fasting" />
      </Picker>

      {mealType === "Fasting" && (
        <>
          <Text style={styles.label}>Are you fasting Today?</Text>
          <Picker
            selectedValue={isFasting}
            style={styles.picker}
            onValueChange={(itemValue) => setIsFasting(itemValue)}
          >
            <Picker.Item label="No" value="No" />
            <Picker.Item label="Yes" value="Yes" />
          </Picker>
        </>
      )}

      <Text style={styles.label}>Current Health Status</Text>
      <Picker
        selectedValue={healthStatus}
        style={styles.picker}
        onValueChange={(itemValue) => setHealthStatus(itemValue)}
      >
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Feeling Dizzy" value="Feeling Dizzy" />
        <Picker.Item label="Feeling Weak" value="Feeling Weak" />
        <Picker.Item label="Feeling Tired" value="Feeling Tired" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      {healthStatus === "Other" && (
        <>
          <Text style={styles.label}>Custom Health Status</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your health status"
            value={customHealthStatus}
            onChangeText={setCustomHealthStatus}
          />
        </>
      )}

      <Text style={styles.label}>Other Health Conditions</Text>
      <TextInput
        style={styles.input}
        placeholder="Other Health Conditions.."
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
            <Text style={styles.modalText}>
              Health Status: {submittedData.healthStatus}
            </Text>
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
    borderRadius: 10,
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

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BloodSugarLog;

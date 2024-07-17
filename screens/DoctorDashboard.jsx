import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from new package

const DoctorDashboard = ({ navigation }) => {
  // Sample data for demonstration purposes
  const doctorName = "Dr. John Doe";
  const totalPatients = 1;
  const typeOneDiabetesPatients = 0;
  const typeTwoDiabetesPatients = 1;
  const patients = [
    {
      id: "1",
      name: "Patient A",
      bloodSugarRecords: [
        { id: "1", date: "2024-07-01", bloodSugar: "120 mg/dL" },
        { id: "2", date: "2024-07-02", bloodSugar: "150 mg/dL" },
      ],
    },
    {
      id: "2",
      name: "Patient B",
      bloodSugarRecords: [
        { id: "3", date: "2024-07-01", bloodSugar: "110 mg/dL" },
        { id: "4", date: "2024-07-02", bloodSugar: "140 mg/dL" },
      ],
    },
    // Add more patients as needed
  ];

  const handleLogout = () => {
    // Handle logout functionality
    navigation.navigate("Choice");
  };

  const [isPrescribeModalVisible, setPrescribeModalVisible] = useState(false);
  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const handlePrescribeMedication = () => {
    setPrescribeModalVisible(true);
  };

  const handleSendNotification = () => {
    setNotificationModalVisible(true);
  };

  const handlePrescribeConfirm = () => {
    // Handle prescribe medication logic
    setPrescribeModalVisible(false);
    if (selectedPatient && medicationName && dosage) {
      Alert.alert(`Prescribed medication to ${selectedPatient} is successful`);
      // Reset medication fields after confirmation
      setMedicationName("");
      setDosage("");
      setInstructions("");
    } else {
      Alert.alert("Please fill out all fields");
    }
  };

  const handleNotificationConfirm = () => {
    // Handle send notification logic
    setNotificationModalVisible(false);
    if (selectedPatient && notificationTitle && notificationMessage) {
      Alert.alert(`Notification sent to ${selectedPatient}`);
      // Reset notification fields after confirmation
      setNotificationTitle("");
      setNotificationMessage("");
    } else {
      Alert.alert("Please fill out all fields");
    }
  };

  // Function to render blood sugar records grouped by date
  const renderBloodSugarRecords = () => {
    return patients.map((patient) => (
      <View key={patient.id}>
        <Text style={styles.patientName}>{patient.name}</Text>
        {patient.bloodSugarRecords.map((record) => (
          <View key={record.id} style={styles.patientItem}>
            <Text style={styles.bloodSugarDate}>{record.date}</Text>
            <Text style={styles.bloodSugar}>{record.bloodSugar}</Text>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor's Dashboard</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrescribeMedication}
          >
            <Text style={styles.buttonText}>Prescribe Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendNotification}
          >
            <Text style={styles.buttonText}>Send Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.welcomeMessage}>Health Evaluation Summary</Text>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Patients Registered</Text>
          <Text style={styles.cardData}>{totalPatients}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patients with Type One Diabetes</Text>
          <Text style={styles.cardData}>{typeOneDiabetesPatients}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patients with Type Two Diabetes</Text>
          <Text style={styles.cardData}>{typeTwoDiabetesPatients}</Text>
        </View>
      </View>
      <Text style={styles.patientListTitle}>Patient's Blood Sugar records</Text>
      {/* <View style={styles.patientRecordsContainer}>
        {renderBloodSugarRecords()}
      </View> */}

      {/* Prescription Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPrescribeModalVisible}
        onRequestClose={() => setPrescribeModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Prescribe Medication</Text>
          <Picker
            selectedValue={selectedPatient}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedPatient(itemValue)}
          >
            <Picker.Item label="Select Patient" value="" />
            {patients.map((patient) => (
              <Picker.Item
                key={patient.id}
                label={patient.name}
                value={patient.name}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Medication Name"
            value={medicationName}
            onChangeText={setMedicationName}
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={dosage}
            onChangeText={setDosage}
          />
          <TextInput
            style={styles.input}
            placeholder="Additional Instructions"
            value={instructions}
            onChangeText={setInstructions}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrescribeConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPrescribeModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNotificationModalVisible}
        onRequestClose={() => setNotificationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Send Notification</Text>
          <Picker
            selectedValue={selectedPatient}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedPatient(itemValue)}
          >
            <Picker.Item label="Select Patient" value="" />
            {patients.map((patient) => (
              <Picker.Item
                key={patient.id}
                label={patient.name}
                value={patient.name}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Notification Title"
            value={notificationTitle}
            onChangeText={setNotificationTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Notification Message"
            value={notificationMessage}
            onChangeText={setNotificationMessage}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleNotificationConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setNotificationModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardData: {
    fontSize: 24,
    fontWeight: "bold",
  },
  patientListTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  patientRecordsContainer: {
    marginTop: 10,
  },
  patientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bloodSugarDate: {
    fontSize: 16,
    color: "#666",
  },
  bloodSugar: {
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    height: 40,
    width: "80%",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    height: 40,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default DoctorDashboard;

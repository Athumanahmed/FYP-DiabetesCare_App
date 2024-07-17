import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databases } from "../config/Appwrite";

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [notes, setNotes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentMedicationIndex, setCurrentMedicationIndex] = useState(null);
  const navigation = useNavigation();

  const handleSaveMedication = async () => {
    const newMedication = {
      name: medicationName,
      dosage,
      frequency,
      notes,
    };

    let updatedMedications = [];

    if (editing) {
      updatedMedications = [...medications];
      updatedMedications[currentMedicationIndex] = newMedication;
      setEditing(false);
    } else {
      updatedMedications = [...medications, newMedication];
    }

    setMedications(updatedMedications);

    try {
      await AsyncStorage.setItem(
        "medications",
        JSON.stringify(updatedMedications)
      );

      const response = await databases.createDocument(
        "66682e8d0021614bfa8d",
        "666a1e070024e9236fdb",
        "unique()",
        {
          medicationName,
          dosage,
          frequency,
          notes,
        }
      );

      console.log("Document created successfully:", response);
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
      console.error("Error creating document:", error);
    }

    setMedicationName("");
    setDosage("");
    setFrequency("Daily");
    setNotes("");

    setModalVisible(false);
  };

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const storedMedications = await AsyncStorage.getItem("medications");
        if (storedMedications) {
          setMedications(JSON.parse(storedMedications));
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadMedications();
  }, []);

  const handleEditMedication = (index) => {
    const medication = medications[index];
    setMedicationName(medication.name);
    setDosage(medication.dosage);
    setFrequency(medication.frequency);
    setNotes(medication.notes);
    setCurrentMedicationIndex(index);
    setEditing(true);
    setModalVisible(true);
  };

  const handleDeleteMedication = async (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);

    try {
      await AsyncStorage.setItem(
        "medications",
        JSON.stringify(updatedMedications)
      );
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medications</Text>
      <ScrollView style={styles.medicationList}>
        {medications.map((medication, index) => (
          <View key={index} style={styles.medicationItem}>
            <Text style={styles.medicationText}>Name: {medication.name}</Text>
            <Text style={styles.medicationText}>
              Dosage: {medication.dosage}
            </Text>
            <Text style={styles.medicationText}>
              Frequency: {medication.frequency}
            </Text>

            <Text style={styles.medicationText}>
              Any medical side effects: {medication.notes}
            </Text>
            <View style={styles.medicationActions}>
              <TouchableOpacity onPress={() => handleEditMedication(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteMedication(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setMedicationName("");
          setDosage("");
          setFrequency("Daily");
          setNotes("");
          setEditing(false);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add/Edit Medication</Text>
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
            <Text style={styles.label}>Frequency</Text>
            <Picker
              selectedValue={frequency}
              style={styles.picker}
              onValueChange={(itemValue) => setFrequency(itemValue)}
            >
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Twice a Day" value="Twice a Day" />
              <Picker.Item label="Weekly" value="Weekly" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Any medical side effects"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveMedication}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialCommunityIcons name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialCommunityIcons name="food" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <MaterialCommunityIcons name="bell" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialCommunityIcons name="account" size={30} color="black" />
        </TouchableOpacity>
      </View>
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
  medicationList: {
    marginBottom: 20,
  },
  medicationItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  medicationText: {
    fontSize: 16,
  },
  medicationActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    color: "#007BFF",
  },
  deleteButton: {
    color: "#FF0000",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});

export default Medications;

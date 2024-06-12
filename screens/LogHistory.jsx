import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const LogHistoryScreen = () => {
  const [logEntries, setLogEntries] = useState([]);

  useEffect(() => {
    const loadLogEntries = async () => {
      try {
        const storedLogEntries = await AsyncStorage.getItem("logEntries");
        if (storedLogEntries) {
          setLogEntries(JSON.parse(storedLogEntries));
        }
      } catch (error) {
        console.error("Failed to load log entries:", error);
      }
    };

    loadLogEntries();
  }, []);

  const clearLogHistory = async () => {
    try {
      await AsyncStorage.removeItem("logEntries");
      setLogEntries([]);
      Alert.alert("Success", "Log history cleared.");
    } catch (error) {
      console.error("Failed to clear log history:", error);
      Alert.alert("Error", "Failed to clear log history.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.logEntry}>
      <Text style={styles.logText}>Date: {item.date}</Text>
      <Text style={styles.logText}>Time: {item.time}</Text>
      <Text style={styles.logText}>Blood Sugar: {item.bloodSugar} mg/dL</Text>
      <Text style={styles.logText}>Meal: {item.mealType}</Text>
      <Text style={styles.logText}>Note: {item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blood Sugar Log History</Text>
        <TouchableOpacity onPress={clearLogHistory}>
          <Icon name="delete" size={30} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={logEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.noDataText}>No log entries available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logEntry: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default LogHistoryScreen;

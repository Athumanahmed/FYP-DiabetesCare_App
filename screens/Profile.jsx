// Import libraries
import {
  FontAwesome5,
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// Sample user data (replace this with actual user data from your state or props)
const userData = {
  name: "John Doe",
  age: 45,
  gender: "Male",
  email: "johndoe@example.com",
  phone: "+1234567890",
  address: "123 Main St, Springfield",
  bloodSugarLevel: "120 mg/dL",
  bloodPressure: "130/80 mmHg",
  weight: "80 kg",
  diabetesType: "Type 2",
  medications: "Metformin, Insulin",
};

// Create a component
const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          {/* <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          /> */}
          <View style={styles.profilePicContainer}>
            <FontAwesome5 name="user" size={64} color="white" />
          </View>
        </View>

        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            <FontAwesome5 name="user" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>{userData.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="birthday-cake" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>Age: {userData.age}</Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="venus-mars" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Gender: {userData.gender}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="envelope" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>{userData.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="phone" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>{userData.phone}</Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="map-marker-alt" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>{userData.address}</Text>
          </View>
          <View style={styles.profileItem}>
            <Feather name="droplet" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Blood Sugar Level: {userData.bloodSugarLevel}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Feather name="activity" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Blood Pressure: {userData.bloodPressure}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="weight" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Weight: {userData.weight}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <FontAwesome5 name="notes-medical" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Diabetes Type: {userData.diabetesType}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <MaterialIcons name="local-pharmacy" size={24} color="#7D7D7D" />
            <Text style={styles.profileItemText}>
              Medications: {userData.medications}
            </Text>
          </View>
        </View>
      </ScrollView>

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

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "lightgray",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileDetails: {
    padding: 20,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileItemText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#7D7D7D",
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

// Make this component available to the app
export default Profile;

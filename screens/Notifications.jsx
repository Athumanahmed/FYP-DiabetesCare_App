import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import NotificationItem from "./NotificationItem";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    message: "Doctor moved time session on 17 April, 12:00 PM",
    time: "2 hours ago",
    profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    backgroundColor: "#E0F7FA",
  },
  {
    id: "2",
    message: "Doctor moved time session on 17 April, 12:00 PM",
    time: "5 hours ago",
    profileImage: "https://randomuser.me/api/portraits/men/26.jpg",
    backgroundColor: "#F1F8E9",
  },

  // Add more notifications here
];

const Notifications = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            message={item.message}
            time={item.time}
            profileImage={item.profileImage}
            backgroundColor={item.backgroundColor}
          />
        )}
        contentContainerStyle={styles.notificationsList}
      />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <FontAwesome5 name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="restaurant" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user" size={24} color="black" />
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
  notificationsList: {
    paddingBottom: 20,
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

export default Notifications;

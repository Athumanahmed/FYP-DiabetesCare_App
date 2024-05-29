import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const NotificationItem = ({ message, time, profileImage, backgroundColor }) => (
  <View style={[styles.notificationItem, { backgroundColor }]}>
    <Image source={{ uri: profileImage }} style={styles.profileImage} />
    <View style={styles.messageContainer}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    color: "#A0A0A0",
    fontSize: 14,
  },
});

export default NotificationItem;

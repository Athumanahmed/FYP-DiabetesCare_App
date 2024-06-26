import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Articles = ({ navigation }) => {
  const recommendations = [
    {
      title: "Healthy Eating",
      image: require("../assets/healthy_eating.jpg"),
      content:
        "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy. These nutrients include protein, carbohydrates, fat, water, vitamins, and minerals.",
    },
    {
      title: "Managing Stress",
      image: require("../assets/stress_management.jpeg"),
      content:
        "Managing stress is crucial for maintaining your health. Chronic stress can lead to various health issues including high blood pressure, heart disease, obesity, and diabetes. Learn effective strategies to manage stress and improve your well-being.",
    },

    {
      title: "Understanding Diabetes",
      image: require("../assets/stress_management.jpeg"),
      content:
        "Managing stress is crucial for maintaining your health. Chronic stress can lead to various health issues including high blood pressure, heart disease, obesity, and diabetes. Learn effective strategies to manage stress and improve your well-being.",
    },

    {
      title: "Diabetes and Heart Health: What You Need to Know",
      image: require("../assets/stress_management.jpeg"),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, Kwang</Text>
        <Image
          style={styles.profileImage}
          source={require("../assets/profile.png")}
        />
      </View>

      <View style={styles.recommendations}>
        {recommendations.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendationCard}
            onPress={() =>
              navigation.navigate("ArticleDetail", { article: item })
            }
          >
            <Image style={styles.recommendationImage} source={item.image} />
            <Text style={styles.recommendationText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  recommendationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recommendationCard: {
    width: "48%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginVertical: 10,
  },
  recommendationImage: {
    width: "100%",
    height: 100,
  },
  recommendationText: {
    padding: 10,
    fontSize: 14,
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

export default Articles;

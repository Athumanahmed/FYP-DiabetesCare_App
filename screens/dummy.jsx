import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import { account } from "../config/Appwrite";

const Dashboard2 = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [110, 120, 130, 140, 135, 125, 130],
        strokeWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await account.get();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="bars" size={24} color="black" />
        <Image
          source={require("../assets/health.png")}
          style={styles.profileImage}
        />
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcome}>Hello {user ? user.name : "User"}</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      {/* Blood Glucose Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blood Glucose Overview</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" mg/dL"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Dashboard Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionBox, styles.greenBox]}
          onPress={() => navigation.navigate("BloodSugarLog")}
        >
          <FontAwesome5
            name="syringe"
            size={40}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Blood Glucose Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionBox, styles.blueBox]}
          onPress={() => navigation.navigate("LogHistory")}
        >
          <MaterialIcons
            name="timeline"
            size={40}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Glucose Level Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionBox, styles.pinkBox]}
          onPress={() => navigation.navigate("Articles")}
        >
          <MaterialCommunityIcons
            name="newspaper"
            size={40}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Health Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionBox, styles.beigeBox]}
          onPress={() => navigation.navigate("Medications")}
        >
          <MaterialCommunityIcons
            name="pill"
            size={40}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Medications</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <FontAwesome5 name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DietTips")}>
          <MaterialIcons name="restaurant" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterPatient")}
        >
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#7B7B7B",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  icon: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionBox: {
    width: "48%",
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  greenBox: {
    backgroundColor: "#CFF1D6",
  },
  blueBox: {
    backgroundColor: "#E0E7FF",
  },
  pinkBox: {
    backgroundColor: "#FADADD",
  },
  beigeBox: {
    backgroundColor: "#FFEFD5",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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

export default Dashboard2;

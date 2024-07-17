import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ArticleDetail = ({ navigation, route }) => {
  const { article } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={article.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>

      <Text style={styles.sectionTitle}>Why It's Important</Text>
      <Text style={styles.sectionContent}>
        Understanding the importance of healthy eating is crucial for diabetes
        management. Eating the right foods can help maintain blood sugar levels,
        improve overall health, and prevent complications.
      </Text>

      <Text style={styles.sectionTitle}>Tips for Healthy Eating</Text>
      <Text style={styles.sectionContent}>
        - Include a variety of vegetables and fruits in your diet. - Choose
        whole grains over refined grains. - Opt for lean protein sources like
        fish, chicken, and legumes. - Limit the intake of sugary foods and
        beverages.
      </Text>

      <Text style={styles.sectionTitle}>Conclusion</Text>
      <Text style={styles.sectionContent}>
        Making informed food choices and maintaining a balanced diet are key
        components of diabetes care. By following these tips, you can better
        manage your condition and improve your quality of life.
      </Text>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
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

export default ArticleDetail;

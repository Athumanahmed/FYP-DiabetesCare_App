import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Splash from "./screens/Splash";
import Dashboard from "./screens/Dashboard";
import Notifications from "./screens/Notifications";
import BloodSugarLog from "./screens/BloodSugarLog";
import LogHistory from "./screens/LogHistory";
import Articles from "./screens/Articles";
import ArticleDetail from "./screens/ArticleDetail";
import Medications from "./screens/Medications";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="BloodSugarLog" component={BloodSugarLog} />
        <Stack.Screen name="LogHistory" component={LogHistory} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Medications" component={Medications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

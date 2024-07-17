import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientSignup from "./screens/PatientSignup";
import PatientLogin from "./screens/PatientLogin";
import DoctorSignup from "./screens/DoctorSignup";
import DoctorLogin from "./screens/DoctorLogin";
import Choice from "./screens/Choice";
import Splash from "./screens/Splash";
import Dashboard from "./screens/Dashboard";
import Notifications from "./screens/Notifications";
import BloodSugarLog from "./screens/BloodSugarLog";
import LogHistory from "./screens/LogHistory";
import Articles from "./screens/Articles";
import ArticleDetail from "./screens/ArticleDetail";
import Medications from "./screens/Medications";
import Profile from "./screens/Profile";
import RegisterDoctor from "./screens/RegisterDoctor";
import RegisterPatient from "./screens/RegisterPatient";
import DoctorDashboard from "./screens/DoctorDashboard";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Choice" component={Choice} />
        <Stack.Screen name="PatientLogin" component={PatientLogin} />
        <Stack.Screen name="PatientSignup" component={PatientSignup} />
        <Stack.Screen name="DoctorSignup" component={DoctorSignup} />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="BloodSugarLog" component={BloodSugarLog} />
        <Stack.Screen name="LogHistory" component={LogHistory} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Medications" component={Medications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="RegisterDoctor" component={RegisterDoctor} />
        <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

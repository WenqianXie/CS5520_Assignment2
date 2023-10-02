import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Stack } from "react-native";
import Tab from "./routes/MainContainer";
import MainContainer from "./routes/MainContainer";
import { mainContainerStyles } from "./additions/HelperStyles";
import AddExpenses from "./screens/AddExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="AddExpenses" component={AddExpenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

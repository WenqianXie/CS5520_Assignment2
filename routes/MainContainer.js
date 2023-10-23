import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import OverbudgetExpenses from "../screens/OverbudgetExpenses";
import { colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();

function addHandler({ navigation }) {
  navigation.navigate("AddExpenses");
}

export default function MainContainer({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.darkGreen },
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: { backgroundColor: colors.darkGreen },
        headerTitle: "All Expenses",
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        headerRight: ({ color, size }) => (
          <Pressable onPress={() => addHandler({ navigation })}>
            <FontAwesome
              name="plus"
              size={size}
              color={colors.white}
              style={{ marginRight: 20 }}
            />
          </Pressable>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Overbudget"
        component={OverbudgetExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" size={size} color={color} />
          ),
          headerTitle: "Overbudget Expenses",
        }}
      />
    </Tab.Navigator>
  );
}

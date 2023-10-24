import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import OverbudgetExpenses from "../screens/OverbudgetExpenses";
import { colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/FirebaseSetup";

const Tab = createBottomTabNavigator();

function addHandler({ navigation }) {
  navigation.navigate("AddExpenses");
}

export default function MainContainer({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    onSnapshot(collection(database, "expenses"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        let expensesList = [];
        querySnapshot.docs.forEach((docSnap) => {
          expensesList.push({ ...docSnap.data(), id: docSnap.id });
        });
        setExpenses(expensesList);
      }
    });
  }, []);

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
        // component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      >
        {(props) => <AllExpenses {...props} expenses={expenses} />}
      </Tab.Screen>
      <Tab.Screen
        name="Overbudget"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" size={size} color={color} />
          ),
          headerTitle: "Overbudget Expenses",
        }}
      >
        {(props) => <OverbudgetExpenses {...props} expenses={expenses} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

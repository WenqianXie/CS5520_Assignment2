import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import OverbudgetExpenses from "../screens/OverbudgetExpenses";
import { colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/FirebaseSetup";
// this is a main container component to navigate between the AllExpenses and OverbudgetExpenses screens

const Tab = createBottomTabNavigator(); // this is a tab navigator

function addHandler({ navigation }) {
  navigation.navigate("AddExpenses");
} // this is a helper function to navigate to the AddExpenses screen

export default function MainContainer({ navigation }) {
  const [expenses, setExpenses] = useState([]); // this is a state variable to store the expenses
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "expenses"),
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          let expensesList = [];
          querySnapshot.docs.forEach((docSnap) => {
            expensesList.push({ ...docSnap.data(), id: docSnap.id });
          });
          setExpenses(expensesList); // add the expenses to the expensesList array
        } else {
          setExpenses([]); // if the expenses collection is empty (deleted from the database), set the expensesList array to empty
        }
      }
    ); // this is a listener to the expenses collection in the database

    return () => {
      unsubscribe();
    }; // this is a cleanup function to unsubscribe from the listener
  }, []);

  return (
    // this is a tab navigator to navigate between the AllExpenses and OverbudgetExpenses screens
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.darkGreen },
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: { backgroundColor: colors.darkGreen },
        headerTitle: "All Expenses",
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        headerRight: ({ size }) => (
          <Pressable onPress={() => addHandler({ navigation })}>
            <FontAwesome
              name="plus"
              size={size}
              color={colors.white}
              style={{ marginRight: 20 }}
            />
          </Pressable>
        ),
      }} // this is a screen options object to customize the header and tab bar
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      >
        {(props) => <AllExpenses {...props} expenses={expenses} />}
        {/* this is a screen component to pass the expenses state variable to the AllExpenses screen */}
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
        {/* this is a screen component to pass the expenses state variable to the OverbudgetExpenses screen */}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

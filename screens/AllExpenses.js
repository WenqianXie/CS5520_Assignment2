import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { generalStyles } from "../additions/HelperStyles";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/FirebaseSetup";

export default function AllExpenses({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    onSnapshot(collection(database, "expenses"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        let newArray = [];
        querySnapshot.docs.forEach((docSnap) => {
          newArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        setExpenses(newArray);
      }
    });
  }, []);
  return (
    <View>
      {expenses.map((expense) => (
        <View key={expense.id}>
          <Text>{expense.item}</Text>
          <Text>{expense.unitPrice}</Text>
          <Text>{expense.quantity}</Text>
        </View>
      ))}
    </View>
  );
}

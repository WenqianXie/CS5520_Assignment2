import { View, Text, Button } from "react-native";
import React from "react";

export default function AllExpenses({ navigation }) {
  const addHandler = () => {
    navigation.navigate("AddExpenses");
  };
  return (
    <View>
      <Text>AllExpenses</Text>
      <Button title="add" onPress={addHandler} />
    </View>
  );
}

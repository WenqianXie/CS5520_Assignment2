import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";

export default function OverbudgetExpenses({ navigation, expenses }) {
  const [pressedItem, setPressedItem] = useState(null);
  return (
    <View style={generalStyles.contianer}>
      <FlatList
        data={expenses.filter((item) => item.overbudget)}
        // this is a FlatList to display the expenses that are overbudget (filter the expenses array to get the expenses that are overbudget)
        keyExtractor={(expense) => expense.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("AddExpenses", { item, title: "Edit" })
            }
            onPressIn={() => setPressedItem(item.id)} // set the pressed item to the id of the item that is pressed
            onPressOut={() => setPressedItem(null)} // set the pressed item to null when the press is released
          >
            <View
              key={item.id}
              style={[
                generalStyles.expensesList,
                { opacity: pressedItem === item.id ? 0.5 : 1 },
              ]}
            >
              <Text style={generalStyles.labelText}>{item.item}</Text>
              <View style={generalStyles.icon}>
                <FontAwesome
                  name="warning"
                  size={18}
                  color={colors.darkGreen}
                />
                <Text style={generalStyles.expense}>
                  {item.quantity} * {item.unitPrice} ={" "}
                  {item.quantity * item.unitPrice}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  ); // the rest same as AllExpenses.js
}

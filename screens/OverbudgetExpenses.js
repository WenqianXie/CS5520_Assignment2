import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";

export default function OverbudgetExpenses({ navigation, expenses }) {
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
          >
            <View key={item.id} style={generalStyles.expensesList}>
              <Text style={generalStyles.labelText}>{item.item}</Text>
              <View style={generalStyles.icon}>
                <FontAwesome
                  name="warning"
                  size={18}
                  color={colors.darkGreen}
                />
                <Text style={generalStyles.expense}>
                  {item.quantity} * {item.unitPrice}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  ); // the rest same as AllExpenses.js
}

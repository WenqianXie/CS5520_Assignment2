import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";

export default function AllExpenses({ navigation, expenses }) {
  return (
    <View style={generalStyles.contianer}>
      <FlatList
        data={expenses}
        keyExtractor={(expense) => expense.id}
        // this is a FlatList to display all the expenses
        renderItem={({ item }) => (
          <Pressable
            onPress={
              () => navigation.navigate("AddExpenses", { item, title: "Edit" })
              // navigate to the AddExpenses screen and pass the item and title as props
            }
          >
            <View key={item.id} style={generalStyles.expensesList}>
              <Text style={generalStyles.labelText}>{item.item}</Text>
              <View style={generalStyles.icon}>
                {item.overbudget === true ? (
                  <FontAwesome
                    name="warning"
                    size={18}
                    color={colors.darkGreen}
                  /> // if the item is overbudget, display the warning icon, otherwise null
                ) : null}
                <Text style={generalStyles.expense}>
                  {item.quantity} * {item.unitPrice}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

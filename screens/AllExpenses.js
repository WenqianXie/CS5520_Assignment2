import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";

export default function AllExpenses({ navigation, expenses }) {
  // function editHandler({ navigation, expenses }) {
  //   const expenseData = expenses.map((expense) => ({
  //     item: expense.item,
  //     quantity: expense.quantity,
  //     unitPrice: expense.unitPrice,
  //   }));
  //   navigation.navigate("AddExpenses", { expenses: expenseData });
  // }

  return (
    <View style={generalStyles.contianer}>
      <FlatList
        data={expenses}
        keyExtractor={(expense) => expense.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("AddExpenses", { route: item })}
          >
            <View key={item.id} style={generalStyles.expensesList}>
              <Text style={generalStyles.labelText}>{item.item}</Text>
              <View style={generalStyles.icon}>
                {item.overbudget === true ? (
                  <FontAwesome
                    name="warning"
                    size={18}
                    color={colors.darkGreen}
                  />
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

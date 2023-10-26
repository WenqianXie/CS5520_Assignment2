import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import { FontAwesome } from "@expo/vector-icons";

export default function AllExpenses({ navigation, expenses }) {
  const [pressedItem, setPressedItem] = useState(null);
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
            onPressIn={() => setPressedItem(item.id)} // set the pressed item to the id of the item that is pressed
            onPressOut={() => setPressedItem(null)} // set the pressed item to null when the press is released
          >
            <View
              key={item.id}
              style={[
                generalStyles.expensesList,
                { opacity: pressedItem === item.id ? 0.5 : 1 }, // if the pressed item is the same as the item id, set the opacity to 0.5
              ]}
            >
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

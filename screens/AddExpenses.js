import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { writeToDB } from "../firebase/FirebaseHelper";

export default function AddExpenses({ navigation }) {
  const [item, setItem] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [quantities, setQuantities] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
  ]);

  const cancelHandler = () => {
    setItem(null);
    setUnitPrice(null);
    setQuantity(null);
    navigation.navigate("Home");
  };

  const saveHandler = () => {
    if (
      validateItem(item) &&
      validateUnitPrice(unitPrice) &&
      validateQuantity(quantity)
    ) {
      setItem(item);
      setUnitPrice(unitPrice);
      setQuantity(quantity);
      const expense = {
        item: item,
        unitPrice: unitPrice,
        quantity: quantity,
        total: unitPrice * quantity,
      };
      console.log(expense);
      writeToDB(expense);
      cancelHandler();
      navigation.navigate("Home");
    }
  };

  const validateItem = (item) => {
    if (item === null) {
      alert("Please enter an item.");
      return false;
    }
    return true;
  };

  const validateUnitPrice = () => {
    if (
      unitPrice === null ||
      isNaN(unitPrice) ||
      unitPrice <= 0 ||
      unitPrice.toString().includes("-") ||
      unitPrice.toString().match(/[a-z]/i)
    ) {
      alert("Please enter a valid unit price.");
      return false;
    }
    return true;
  };

  const validateQuantity = () => {
    if (quantity === null) {
      alert("Please enter a valid quantity.");
      return false;
    }
    return true;
  };

  return (
    <View style={generalStyles.contianer}>
      <View style={[generalStyles.label, { marginTop: 50 }]}>
        <Text style={generalStyles.labelText}>Items*</Text>
        <TextInput
          style={generalStyles.input}
          value={item}
          onChangeText={setItem}
        />
      </View>
      <View style={generalStyles.label}>
        <Text style={generalStyles.labelText}>Unit Price*</Text>
        <TextInput style={generalStyles.input} onChangeText={setUnitPrice} />
      </View>
      <View style={generalStyles.label}>
        <Text style={generalStyles.labelText}>Quantity*</Text>
        <DropDownPicker
          style={generalStyles.input}
          open={isOpen}
          value={quantity}
          items={quantities}
          setOpen={setIsOpen}
          setValue={setQuantity}
          setItems={setQuantities}
          placeholder=""
        />
      </View>
      <View style={generalStyles.buttonContainer}>
        <Pressable style={generalStyles.button} onPress={cancelHandler}>
          <Text style={generalStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={generalStyles.button} onPress={saveHandler}>
          <Text style={generalStyles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

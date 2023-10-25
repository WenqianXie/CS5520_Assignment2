import { View, Text, Pressable, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { generalStyles } from "../additions/HelperStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { writeToDB } from "../firebase/FirebaseHelper";
import Checkbox from "expo-checkbox";

export default function AddExpenses({ navigation, route }) {
  const [item, setItem] = useState(route?.params?.item?.item || null);
  // this is a state variable to store the item name
  // if it is passed from the AllExpenses or OverbudgetExpenses screen, otherwise null
  const [unitPrice, setUnitPrice] = useState(
    route?.params?.item?.unitPrice || null
  );
  // this is a state variable to store the unit price of the item
  // if it is passed from the AllExpenses or OverbudgetExpenses screen, otherwise null
  const [quantity, setQuantity] = useState(
    route?.params?.item?.quantity || null
  );
  // this is a state variable to store the quantity of the item
  // if it is passed from the AllExpenses or OverbudgetExpenses screen, otherwise null
  const total = unitPrice * quantity;
  const [overbudget, setOverbudget] = useState(500);
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
  // this is a state variable to store the quantities of the item.
  // it uses a dropdown picker to select the quantity
  const [isChecked, setIsChecked] = useState(false);
  // this is a state variable to store the checkbox value

  function cancelHandler() {
    setItem(null);
    setUnitPrice(null);
    setQuantity(null);
    navigation.navigate("Home");
  }
  // this is a helper function to reset the state variables and navigate to the Home screen

  const saveHandler = () => {
    if (
      validateItem(item) &&
      validateUnitPrice(unitPrice) &&
      validateQuantity(quantity) &&
      (route?.params?.item?.overbudget === true
        ? validateIsChecked(isChecked)
        : true)
      // validate the item, unit price, quantity and checkbox (if the item is overbudget)
    ) {
      setItem(item);
      setUnitPrice(unitPrice);
      setQuantity(quantity);
      // set the state variables to the input values
      const expense = {
        item: item,
        unitPrice: unitPrice,
        quantity: quantity,
        total: total,
        overbudget: total > overbudget ? true : false,
      };
      console.log(expense);
      if (route?.params?.item?.id) {
        // if the item already exists in the database, update it
        Alert.alert("Important", "Do you want to save the changes?", [
          // show an alert to confirm the update
          {
            text: "Cancel",
            onPress: () => {},
          },
          // if the user selects cancel, do nothing
          {
            text: "Yes",
            onPress: () => {
              writeToDB(expense, route.params.item.id);
              cancelHandler();
              navigation.navigate("Home");
            },
            // if the user selects yes, update the item and navigate to the Home screen
          },
        ]);
      } else {
        writeToDB(expense, null);
        cancelHandler();
        navigation.navigate("Home");
        // if the item does not exist in the database, add it and navigate to the Home screen
      }
    }
  };

  const validateItem = (item) => {
    if (item === null) {
      alert("Please enter an item.");
      return false;
    }
    return true;
  };
  // this is a helper function to validate the item (it cannot be null)

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
  // this is a helper function to validate the unit price (it cannot be null, negative, zero or a string)

  const validateQuantity = () => {
    if (quantity === null) {
      alert("Please enter a valid quantity.");
      return false;
    }
    return true;
  };
  // this is a helper function to validate the quantity (it cannot be null)

  const validateIsChecked = () => {
    if (isChecked === false) {
      alert("Please check the checkbox.");
      return false;
    }
    return true;
  };
  // this is a helper function to validate the checkbox
  // (it must be checked if the item is overbudget)

  return (
    <View style={generalStyles.contianer}>
      <View style={[generalStyles.label, { marginTop: 20 }]}>
        <Text style={generalStyles.labelText}>Items*</Text>
        <TextInput
          style={generalStyles.input}
          value={item}
          onChangeText={setItem} // this is a text input to enter the item name
        />
      </View>
      <View style={generalStyles.label}>
        <Text style={generalStyles.labelText}>Unit Price*</Text>
        <TextInput
          style={generalStyles.input}
          value={unitPrice}
          onChangeText={setUnitPrice} // this is a text input to enter the unit price
        />
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
        {/* this is a dropdown picker to select the quantity */}
      </View>
      {route?.params?.item?.overbudget && (
        <View style={generalStyles.checkboxContainer}>
          <Text style={generalStyles.labelText}>
            This item is marked as overbudget. Select the checkbox if you would
            like to approve it.
          </Text>
          <Checkbox value={isChecked} onValueChange={setIsChecked} />
        </View>
        // if the item is overbudget, show a checkbox to approve it
      )}
      <View style={generalStyles.buttonContainer}>
        <Pressable style={generalStyles.button} onPress={cancelHandler}>
          <Text style={generalStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={generalStyles.button} onPress={saveHandler}>
          <Text style={generalStyles.buttonText}>Save</Text>
        </Pressable>
        {/* these are buttons to cancel or save the item */}
      </View>
    </View>
  );
}

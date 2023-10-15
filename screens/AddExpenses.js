import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { generalStyles, colors } from "../additions/HelperStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AddExpenses({ navigation }) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    // <View style={generalStyles.contianer}>
    //   <View style={generalStyles.headerContianer}>
    //     <Text style={generalStyles.headerText}>Add Expenses</Text>
    //     <TouchableOpacity
    //       // style={generalStyles.plusStyle}
    //       onPress={goBackHandler}
    //     >
    //       <Icon name="back" size={15} color={colors.white} />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View>
      <Text>hello</Text>
    </View>
  );
}

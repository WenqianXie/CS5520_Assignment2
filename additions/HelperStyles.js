import { StyleSheet } from "react-native";

export const colors = {
  yellow: "#f0e68c",
  grey: "#808080",
  darkGreen: "#5f9ea0",
  lightGreen: "#f0f8ff",
  white: "#f8f8ff",
};
export const generalStyles = StyleSheet.create({
  contianer: {
    backgroundColor: colors.lightGreen,
    flex: 1,
  },
  // tabBarIcon: {
  //   color: colors.yellow,
  //   size: 24,
  // },
  headerContianer: {
    backgroundColor: colors.darkGreen,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
    // paddingTop: 60,
    // paddingBottom: 10,
  },
  headerText: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 25,
    // marginTop: 60,
    fontWeight: "bold",
    // fontFamily: "Aaril",
  },
  plusStyle: {
    marginLeft: 50,
  },
});

export const mainContainerStyles = StyleSheet.create({
  tabBar: { backgroundColor: colors.darkGreen },
});

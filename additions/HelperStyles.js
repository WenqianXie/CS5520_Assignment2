import { StyleSheet } from "react-native";

export const colors = {
  yellow: "#ffd700",
  grey: "#808080",
  darkPurple: "#4b0082",
  lightPurple: "#b0c4de",
  white: "#f8f8ff",
};
export const gneralStyles = StyleSheet.create({
  contianer: {
    backgroundColor: colors.lightPurple,
  },
  header: {
    backgroundColor: colors.darkPurple,
    // headerTitleAlign: "center",
    // elevation: 0,
    // fontSize: 30,
  },
});

export const mainContainerStyles = StyleSheet.create({
  tabBar: { backgroundColor: colors.darkPurple },
});

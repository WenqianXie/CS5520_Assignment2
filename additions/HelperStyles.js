import { StyleSheet } from "react-native";

export const colors = {
  yellow: "#f0e68c",
  grey: "#808080",
  darkGreen: "#556b2f",
  lightGreen: "#f5f5dc",
  white: "#f8f8ff",
  lightYellow: "#fafad2",
};
export const generalStyles = StyleSheet.create({
  contianer: {
    backgroundColor: colors.lightGreen,
    flex: 1,
    alignContent: "center",
  },
  label: {
    padding: 15,
  },
  labelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: colors.lightYellow,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 200,
  },
  button: {
    backgroundColor: colors.darkGreen,
    padding: 10,
    height: 40,
    width: 100,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    alignSelf: "center",
  },
});

export const mainContainerStyles = StyleSheet.create({
  tabBar: { backgroundColor: colors.darkGreen },
});

import MainContainer from "./routes/MainContainer";
import AddExpenses from "./screens/AddExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "./additions/HelperStyles";
import { AntDesign } from "@expo/vector-icons";
import { deleteFromDB } from "./firebase/FirebaseHelper";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen
          name="AddExpenses"
          component={AddExpenses}
          options={({ route, navigation }) => ({
            headerShown: true,
            headerTitle: route?.params?.title || "Add An Expense",
            headerTintColor: colors.white,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: colors.darkGreen },
            headerRight: () =>
              route?.params?.title ? (
                <AntDesign
                  name="delete"
                  size={18}
                  color={colors.white}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    Alert.alert(
                      "Important",
                      "Do you want to delete the item?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            deleteFromDB(route.params.item.id);
                            navigation.navigate("Home");
                          },
                        },
                      ]
                    );
                  }}
                />
              ) : null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

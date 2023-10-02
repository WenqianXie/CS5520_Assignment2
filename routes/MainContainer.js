import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import AddExpenses from "../screens/AddExpenses";
import OverbudgetExpenses from "../screens/OverbudgetExpenses";
import { Ionicons } from "@expo/vector-icons";
import { colors, mainContainerStyles } from "../additions/HelperStyles";
import { TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

const home = "Home";
const overbudget = "Overbudget";
const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName, color, size) {
  let iconName;

  if (routeName === home) {
    iconName = "home";
  } else if (routeName === overbudget) {
    iconName = "alert";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function MainContainer() {
  // const navigation = useNavigation();

  // const navigateToAddExpenses = ({ navigation }) => {
  //   navigation.navigate("AddExpenses");
  // };

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteNaame={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.grey,
      })}
    >
      <Tab.Screen
        name={home}
        component={AllExpenses}
        options={() => ({
          tabBarLabel: "Home",
          // title: "All Expenses",
          tabBarStyle: mainContainerStyles.tabBar,
          headerShown: false,
          // headerStyle: { backgroundColor: colors.darkPurple },
          // headerTitleAlign: "center",
          // headerTintColor: colors.white,
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={navigateToAddExpenses}
          //     style={{ marginRight: 15 }}
          //   >
          //     <Ionicons name="add" size={20} color={colors.white} />
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Tab.Screen
        name={overbudget}
        component={OverbudgetExpenses}
        options={{
          tabBarLabel: "Overbudget",
          title: "Overbudget Expenses",
          tabBarStyle: mainContainerStyles.tabBar,
          headerStyle: { backgroundColor: colors.darkPurple },
          headerTitleAlign: "center",
          headerTintColor: colors.white,
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

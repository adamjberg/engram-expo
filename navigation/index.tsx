/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Daily" component={BottomTabNavigator} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{headerTitle: "engram", headerLeft: () => { return null }}} />
      <Drawer.Screen name="Sign Up" component={LoginScreen} options={{headerTitle: "engram", headerLeft: () => { return null }}} initialParams={{ isSignUp: true }} />
    </Drawer.Navigator>
  );
}

/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Link,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../redux/actions/UserActions";

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

const selectUser = (state: any) => { return state.user };

function RootNavigator() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  React.useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      {!user ? (
        <Drawer.Screen
          name="SignUp"
          component={LoginScreen}
          options={{
            title: "Sign Up",
            headerTitle: "engram",
            headerLeft: () => {
              return null;
            },
          }}
          initialParams={{ isSignUp: true }}
        />
      ) : null}
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Log In",
          headerTitle: "engram",
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Drawer.Screen name="Daily" component={BottomTabNavigator} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

function LogoutScreen() {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  React.useEffect(() => {
    logout(dispatch);
  }, []);
  return <Link style={{fontSize: 24, textAlign: "center", color: theme === "light" ? "black" : "white"}} to="/login">Return to login</Link>;
}

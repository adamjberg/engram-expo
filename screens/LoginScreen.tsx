import * as React from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { Link } from "@react-navigation/native";
import { getMe, login, signup } from "../api/UserApi";
import { TextInput } from "../components/Themed";
import { Button } from "react-native-elements";
import { getTextColor } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { fetchNotes } from "../redux/actions/NotesActions";
import { useDispatch } from "react-redux";
const Logo = require("../assets/images/adaptive-icon.png");

type LoginScreenProps = {
  navigation: any;
  route: {
    params?: {
      isSignUp?: boolean;
    };
  };
};

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isSignUp = route.params?.isSignUp;

  async function handleSubmit() {
    try {
      if (isSignUp) {
        await signup({ username, email, password });
      } else {
        await login({ username, password });
        await fetchNotes(dispatch);
      }
      navigation.navigate("Daily");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    logo: {
      width: 256,
      height: 256,
      marginVertical: 32,
    },
    input: {
      fontSize: 24,
      width: 256,
      marginBottom: 8,
      color: getTextColor(theme),
    },
    primaryButton: {
      width: 256,
    },
    link: {
      marginVertical: 8,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Image style={styles.logo} source={Logo} />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder={"Username"}
      />
      {isSignUp ? (
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          autoCompleteType="off"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize={"none"}
          placeholder={"Email"}
        />
      ) : null}
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder={"Password"}
        secureTextEntry={true}
      />
      <Button
        style={styles.primaryButton}
        title={isSignUp ? "Sign Up" : "Login"}
        onPress={handleSubmit}
      />
      {isSignUp ? (
        <Link style={styles.link} to="/login">
          Already have an account? Log in
        </Link>
      ) : (
        <Link style={styles.link} to="/signup">
          Don't have an account? Sign Up
        </Link>
      )}
    </KeyboardAvoidingView>
  );
}

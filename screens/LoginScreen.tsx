import * as React from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import { login, signup } from "../api/UserApi";
import { TextInput } from "../components/Themed";

type LoginScreenProps = {
  navigation: any;
  route: {
    params: {
      isSignUp: boolean;
    }
  }
}

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isSignUp = route.params.isSignUp;

  async function handleSubmit() {
    try {
      if (isSignUp) {
        signup({ username, email, password })
      } else {
        await login({ username, password });
      }
      navigation.navigate("Daily");
    } catch(err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
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
      <Button title={isSignUp ? "Sign Up" : "Login"} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    alignContent: "center"
  },
  input: {
    fontSize: 24,
    width: "100%",
    maxWidth: 800,
    textAlign: "center",
    marginBottom: 8
  }
});

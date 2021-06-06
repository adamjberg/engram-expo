import * as React from "react";

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import { login } from "../api/UserApi";
import { View, Text, TextInput } from "../components/Themed";

type LoginScreenProps = {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit() {
    await login({ username, password });
    navigation.navigate("Daily");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TextInput
        // style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCompleteType="off"
        autoCorrect={false}
        placeholder={"Username"}
      />
      <TextInput
        // style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoCompleteType="off"
        autoCorrect={false}
        placeholder={"Password"}
      />
      <Button title="Login" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

import * as React from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import { login } from "../api/UserApi";
import { TextInput } from "../components/Themed";

type LoginScreenProps = {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit() {
    try {
      await login({ username, password });
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
      <Button title="Login" onPress={handleSubmit} />
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

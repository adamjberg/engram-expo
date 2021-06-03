import * as React from "react";
import { Button, StyleSheet } from "react-native";

import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { View, Text, TextInput } from "../components/Themed";

export default function LogScreen() {
  const [body, setBody] = React.useState("");
  const [notes, setNotes] = React.useState<{ key: string; body: string }[]>([]);

  function handleSubmit() {
    setNotes([...notes, { key: String(notes.length), body }]);
    setBody("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={85}
      style={styles.container}
    >
      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={notes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.body}</Text>
          )}
        />
      </View>
      <View style={styles.textBoxWrapper}>
        <View style={styles.textBox}>
          <TextInput
            style={styles.input}
            onSubmitEditing={handleSubmit}
            onChangeText={setBody}
            value={body}
            returnKeyType="done"
            autoCompleteType="off"
            autoCorrect={false}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const Separator = () => {
  return <View style={styles.listItemSeparator}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    maxWidth: 800,
  },
  listItem: {
    padding: 4,
    fontSize: 24,
    borderBottomWidth: 3,
    borderBottomColor: "#FF0000",
  },
  listItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#424242",
  },
  input: {
    flexGrow: 1,
    backgroundColor: "#424242",
    borderBottomWidth: 1,
    borderBottomColor: "#3f51b5",
    padding: 8,
  },
  textBoxWrapper: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#424242",
    padding: 16,
  },
  textBox: {
    width: "100%",
    maxWidth: 800,
    flexDirection: "row",
  },
});
import * as React from "react";
import { Button, StyleSheet } from "react-native";

import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { createNote, Note } from "../api/NoteApi";
import { View, Text, TextInput } from "../components/Themed";
import moment from "moment";

export default function LogScreen() {
  const [body, setBody] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);

  async function handleSubmit() {
    const note = await createNote({ body, date: moment().format("YYYY-MM-DD") });
    setNotes([...notes, note]);
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
          keyExtractor={(item)=> { return item._id }}
          style={styles.list}
          data={notes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{item.body}</ListItem.Title>
              </ListItem.Content>
              {/* <ListItem.Chevron /> */}
            </ListItem>
          )}
        />
      </View>
      <View style={styles.textBoxWrapper}>
        <View style={styles.textBox}>
          <TextInput
            blurOnSubmit={false}
            style={styles.input}
            onSubmitEditing={handleSubmit}
            onChangeText={setBody}
            value={body}
            returnKeyType="done"
            autoCompleteType="off"
            autoCorrect={false}
            placeholder={"What's on your mind?"}
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
    width: "100%",
    maxWidth: 800,
    margin: "auto",
  },
  listItem: {
    backgroundColor: "rgba(0,0,0, 0)"
  },
  listItemTitle: {
    color: "white"
  },
  listItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#424242",
  },
  input: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#3f51b5",
    padding: 8,
  },
  textBoxWrapper: {
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  textBox: {
    width: "100%",
    maxWidth: 800,
    flexDirection: "row",
  },
});

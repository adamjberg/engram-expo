import * as React from "react";
import { Button, StyleSheet } from "react-native";

import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { createNote, Note } from "../api/NoteApi";
import { View, TextInput, useThemeColor, ListItemTitle } from "../components/Themed";
import moment from "moment";
import DateHeader from "../components/DateHeader";
import useColorScheme from "../hooks/useColorScheme";

export default function LogScreen() {
  const [body, setBody] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [date, setDate] = React.useState(new Date());
  const theme = useColorScheme();

  async function handleSubmit() {
    let dateString = moment(date).format("YYYY-MM-DD")
    let noteToCreate: Note = { body, date: dateString };
    if (false) {
      const createdNote = await createNote(noteToCreate);
      setNotes([...notes, createdNote]);
    } else {
      setNotes([...notes, noteToCreate]);
    }
    
    setBody("");
  }

  function handleDateChanged(date: Date) {
    setDate(date);
  }

  const Separator = () => {
    return <View style={styles.listItemSeparator}></View>;
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
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
      backgroundColor: "rgba(0,0,0, 0)",
    },
    listItemTitle: {
      color: "white",
    },
    listItemSeparator: {
      height: 1,
      width: "100%",
      backgroundColor: theme === "light" ? "#EEE" :"#424242",
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={85}
      style={styles.container}
    >
      <View style={styles.content}>
        <DateHeader date={date} onChange={handleDateChanged} />
        <FlatList
          keyExtractor={(item, index) => {
            if (item._id) {
              return item._id
            } else {
              return String(index)
            }
          }}
          style={styles.list}
          data={notes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItemTitle>
                  {item.body}
                </ListItemTitle>
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

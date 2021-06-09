import * as React from "react";
import { StyleSheet } from "react-native";

import { Alert, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { clearNotesCache, createNote, getNotes, Note } from "../api/NoteApi";
import {
  View,
  TextInput,
  ListItemTitle,
} from "../components/Themed";
import moment from "moment";
import DateHeader from "../components/DateHeader";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNotes } from "../redux/actions/NotesActions";

export type LogScreenProps = {
  route: {
    params?: {
      type?: string;
    };
  };
};

const selectNotes = (state: any) => { return state.notes };


export default function LogScreen({ route }: LogScreenProps) {
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();
  const listRef = React.useRef<FlatList | null>(null);
  const [body, setBody] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const theme = useColorScheme();
  const type = route.params?.type;
  let allowedTypes = ["note", "task", "task_completed", "event"];
  if (type) {
    if (type === "task") {
      allowedTypes = ["task", "task_completed"]
    } else {
      allowedTypes = [type]
    }
  }

  const filteredNotes = notes.filter((note: Note) => {
    if (note.date !== moment(date).format("YYYY-MM-DD")) {
      return false
    }
    if (allowedTypes.includes(note.type) === false) {
      return false;
    }
    return true;
    
  });

  React.useEffect(() => {
    refetchNotes();
  }, [date, route.params?.type]);

  async function refetchNotes() {
    fetchNotes(dispatch).catch(handleGenericError)
  }

  async function handleSubmit() {
    let dateString = moment(date).format("YYYY-MM-DD");
    let noteToCreate: Note = { body, type: type || "note", date: dateString };
    try {
      await addNote(dispatch, noteToCreate);

      setBody("");

      setTimeout(() => {
        listRef.current?.scrollToEnd();
      }, 100)
    } catch(err) {
      handleGenericError(err);
    }
  }

  function handleDateChanged(date: Date) {
    setDate(date);
  }
  
  function handleGenericError(err: Error) {
    Alert.alert("Error", err.message)
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
      backgroundColor: "rgba(0,0,0, 0)",
    },
    listItemTitle: {
      color: "white",
    },
    listItemSeparator: {
      height: 1,
      width: "100%",
      backgroundColor: theme === "light" ? "#EEE" : "#424242",
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

  function handleTodayPressed() {
    setDate(new Date());
  }

  function handleRefreshPressed() {
    clearNotesCache();
    refetchNotes();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={85}
      style={styles.container}
    >
      <View style={styles.content}>
        <DateHeader
          date={date}
          onChange={handleDateChanged}
          onToday={handleTodayPressed}
          onRefresh={handleRefreshPressed}
        />
        <FlatList
          ref={listRef}
          keyExtractor={(item, index) => {
            if (item._id) {
              return item._id;
            } else {
              return String(index);
            }
          }}
          style={styles.list}
          data={filteredNotes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItemTitle>{item.body}</ListItemTitle>
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
            autoCapitalize={"none"}
            placeholder={"What's on your mind?"}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

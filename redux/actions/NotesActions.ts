import { Dispatch } from "redux";
import { getNotes, Note } from "../../api/NoteApi";

export async function fetchNotes(dispatch: Dispatch) {
  const notes = await getNotes();
  dispatch({ type: 'FETCH_NOTES', payload: notes })
}

// export const addNote = (note: Note) => {
//   return {
//     type: "ADD_NOTE",
//     payload: note
//   }
// }

// export const remoteNote = (id: string) => {
//   return {
//     type: "ADD_NOTE",
//     payload: id
//   }
// }
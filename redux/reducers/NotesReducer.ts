import { combineReducers } from "redux";
import { Note } from "../../api/NoteApi";

const INITIAL_STATE: Note[] = [];


type RemoveNoteAction = {
  type: "REMOVE_NOTE";
  payload: string;
}

type AddNoteAction = {
  type: "ADD_NOTE";
  payload: Note;
}

type FetchNotesAction = {
  type: "FETCH_NOTES";
  payload: Note[];
}

const notesReducer = (state = INITIAL_STATE, action: AddNoteAction | FetchNotesAction | RemoveNoteAction) => {
  switch(action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];
    case "FETCH_NOTES":
      return [...action.payload];
    case "REMOVE_NOTE":
      const stateCopy = [...state];
      const index = stateCopy.findIndex((note) => { return note._id === action.payload })
      stateCopy.splice(index, 1);
      return stateCopy;
    default:
      return state;
  }
}

export default combineReducers({
  notes: notesReducer
})
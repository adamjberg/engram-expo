import { combineReducers } from "redux";
import NotesReducer from "./NotesReducer";
import DateReducer from "./DateReducer";

export default combineReducers({
    notes: NotesReducer,
    date: DateReducer
})
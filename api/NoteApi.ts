import qs from "querystring";
import { baseUrl } from "./Api";

export type Note = {
  _id?: string;
  body: string;
  date: string;
  type: string;
};

export async function createNote(note: Note): Promise<Note> {
  const res = await fetch(`${baseUrl}/api/notes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export type GetNotesParams = {
  type?: string;
  since?: string;
  before?: string;
}

let getNotesPromise: Promise<Note[]> | null = null;

export async function getNotes(params?: GetNotesParams): Promise<Note[]> {
  if (getNotesPromise) {
    return getNotesPromise;
  }

  getNotesPromise = new Promise(async (resolve, reject) => {
    try {
      const query = qs.stringify(params);
      const res = await fetch(`${baseUrl}/api/notes?${query}`);
      resolve(res.json());
    }
    catch(err) {
      reject(err);
    }
  })

  return getNotesPromise;  
}

export function clearNotesCache() {
  getNotesPromise = null;
}

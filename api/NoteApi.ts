export type Note = {
  _id?: string;
  body: string;
  date: string;
};

export async function createNote(note: Note): Promise<Note> {
  const res = await fetch("https://engram.xyzdigital.com/api/notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

import { remult } from "remult";
import { Note } from "../../shared/Note";
import { editorContent, selectedNote } from "./notes";

export const saveNote = async () => {
    if (selectedNote.value) {
        await remult.repo(Note).update(selectedNote.value?.id, { content: editorContent.value });
    }
};

// const updateNote = async (note: Partial<Note>) => {

// }

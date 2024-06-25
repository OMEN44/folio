import { remult } from "remult";
import { ref } from "vue";
import { Note } from "../../shared/Note";
import { loadNotes, selectedNote } from "./notes";

export const noteDetails = ref<{ title: string; author: number; parent: number }>({
    title: "",
    author: 0,
    parent: 0,
});

export const editNoteTitle = () => {
    if (noteDetails.value.title !== "") {
        remult
            .repo(Note)
            .update(selectedNote.value?.id!, { title: noteDetails.value.title })
            .then(() => {
                loadNotes(true);
                console.log("updated");
            });
    }
};

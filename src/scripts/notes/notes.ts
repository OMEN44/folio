import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { NoteFolder } from "../../shared/NoteFolder";
import { remult } from "remult";
import { setPermissionLevel } from "../login";

const menuContent = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
export const selectedNote = ref<Note | null>(null);
export const editorContent = ref<string>();

// for styling
export const menuIndex = ref<number>(0);

export const MenuContent = readonly(menuContent);

export const loadNotes = async () => {
    await setPermissionLevel();
    let notes: Note[] = await remult.repo(Note).find({ include: { author: true, parent: true } });
    let folders: NoteFolder[] = await remult
        .repo(NoteFolder)
        .find({ include: { author: true, parent: true } });

    let elements: Array<{ isNote: boolean; element: Note | NoteFolder }> = [];

    notes.forEach((note) => {
        elements.push({ isNote: true, element: note });
    });
    folders.forEach((folder) => {
        elements.push({ isNote: false, element: folder });
    });

    menuContent.value = elements;
};

import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { NoteFolder } from "../../shared/NoteFolder";
import { remult } from "remult";
import { setPermissionLevel } from "../login";
import router from "../../plugins/router";

const menuContent = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
export const selectedNote = ref<Note | null>(null);
export const editorContent = ref<string>();

// for styling
export const menuIndex = ref<number>(0);

export const MenuContent = readonly(menuContent);

export const loadNotes = async (updateSelected?: boolean) => {
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

    if (updateSelected) selectNote(router.currentRoute.value.params.id as string);
};

export const selectNote = (id: string) => {
    remult
        .repo(Note)
        .findId(id, { include: { author: true, parent: true } })
        .then((note) => {
            if (note !== undefined) {
                selectedNote.value = note;
                editorContent.value = note.content;
            }
        });
};

import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { NoteFolder } from "../../shared/NoteFolder";
import { remult } from "remult";
import { setPermissionLevel } from "../login";

const menuContent = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
export const MenuContent = readonly(menuContent);

export const loadNotes = async () => {
    await setPermissionLevel();
    let notes: Note[] = await remult.repo(Note).find({ include: { author: true, parent: true } });
    let folders: NoteFolder[] = await remult
        .repo(NoteFolder)
        .find({ include: { author: true, parent: true } });

    notes.forEach((note) => {
        menuContent.value.push({ isNote: true, element: note });
    });
    folders.forEach((folder) => {
        menuContent.value.push({ isNote: false, element: folder });
    });
};

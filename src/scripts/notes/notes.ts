import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { NoteFolder } from "../../shared/NoteFolder";
import { remult } from "remult";
import { setPermissionLevel } from "../login";
import router from "../../plugins/router";
import { closeOverlay, OverlayType, setOverlayContent } from "../overlay";
import { saveNote } from "./toolbar";

const menuContent = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
export const selectedNote = ref<Note | null>(null);
export const editorContent = ref<string>();

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

    if (updateSelected) updateSelectedNote();
};

const updateSelectedNote = async (id?: string) => {
    const note = await remult
        .repo(Note)
        .findId(id ? id : (router.currentRoute.value.params.id as string), {
            include: { author: true, parent: true },
        });

    if (note !== undefined) {
        selectedNote.value = note;
        editorContent.value = note.content;
    } else {
        selectedNote.value = null;
        editorContent.value = undefined;
    }
};

router.beforeEach(async (to, _from) => {
    if (
        editorContent.value !== selectedNote.value?.content &&
        to.name === "notes" &&
        selectedNote.value !== null
    ) {
        setOverlayContent(getSaveChangesOverlay(to.params.id as string));
        return false;
    } else {
        if (to.params.id !== undefined && to.params.id !== "") {
            updateSelectedNote(to.params.id as string);
        } else {
            selectedNote.value = null;
            editorContent.value = undefined;
        }
        return true;
    }
});

const getSaveChangesOverlay = (nextId: string): OverlayType => ({
    title: "Unsaved changes",
    content: "You have unsaved changes in your note. Do you want to save them?",
    buttons: [
        {
            name: "Save",
            primary: true,
            action: async () => {
                // I cannot fathom why the route needs to be updated before saving the note but it works
                const noteToSave = selectedNote.value!;
                const contentToSave = editorContent.value;
                editorContent.value = selectedNote.value!.content;
                await router.push({ name: "notes", params: { id: nextId } });
                await saveNote(noteToSave, contentToSave);
                closeOverlay();
            },
        },
        {
            name: "Discard",
            primary: false,
            action: () => {
                editorContent.value = selectedNote.value!.content;
                closeOverlay();
                router.push({ name: "notes", params: { id: nextId } });
            },
        },
        {
            name: "Cancel",
            primary: false,
            action: () => closeOverlay(),
        },
    ],
});

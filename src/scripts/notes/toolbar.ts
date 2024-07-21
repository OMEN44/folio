import { remult } from "remult";
import { Note } from "../../shared/Note";
import { editorContent, loadNotes, selectedNote } from "./notes";
import { readonly, ref } from "vue";
import { NoteFolder } from "../../shared/NoteFolder";
import { Account } from "../../shared/Account";
import { closeOverlay, setOverlayContent } from "../overlay";
import router from "../../plugins/router";
import { addNotification } from "../notification";

const folders = ref<NoteFolder[]>([]);
const errorMessage = ref<string>();

export const createForm = ref<{
    isNote: boolean;
    parentId: number;
    title: string;
    isPublic: boolean;
}>({
    isNote: true,
    parentId: -1,
    title: "",
    isPublic: false,
});

export const Folders = readonly(folders);
export const ErrorMessage = readonly(errorMessage);

export const loadFolders = () => {
    remult
        .repo(NoteFolder)
        .find()
        .then((res) => (folders.value = res));
};

export const create = () => {
    if (createForm.value.title !== "") {
        let repo;
        if (createForm.value.isNote) {
            repo = remult.repo(Note);
        } else {
            repo = remult.repo(NoteFolder);
        }
        repo.find({ where: { title: createForm.value.title } }).then(async (res) => {
            if (res.length !== 0) {
                errorMessage.value = `${
                    createForm.value.isNote ? "Note" : "Folder"
                } exists with this title`;
            } else {
                const author: Account = await remult.repo(Account).findId(remult.user!.id);
                repo.insert({
                    title: createForm.value.title,
                    public: createForm.value.isPublic,
                    parent: folders.value[createForm.value.parentId],
                    content: "<p></p>",
                    author: author,
                }).then(() => {
                    addNotification(
                        `Created ${createForm.value.isNote ? "note" : "folder"}: ${
                            createForm.value.title
                        }`
                    );
                    createForm.value.title = "";
                    closeOverlay();
                    loadNotes();
                });
            }
        });
    }
};

export const saveNote = async (note: Note | null, content: string | undefined) => {
    if (note) {
        await remult.repo(Note).update(note.id, { content: content });
        addNotification(`Changes saved`);
        loadNotes(true);
    }
};

export const saveCurrentNote = async () => {
    if (selectedNote.value) {
        await remult.repo(Note).update(selectedNote.value.id, { content: editorContent.value });
        addNotification(`Changes saved`);
        loadNotes(true);
    }
};

export const deleteNote = () => {
    if (selectedNote.value) {
        setOverlayContent({
            title: "Delete Note",
            content: `Are you sure you want to delete: ${selectedNote.value.title}`,
            buttons: [
                {
                    name: "Yes",
                    primary: true,
                    action() {
                        remult
                            .repo(Note)
                            .delete(selectedNote.value!.id)
                            .then(() => {
                                addNotification(`Deleted note: ${selectedNote.value?.title}`);
                                selectedNote.value = null;
                                editorContent.value = undefined;
                                loadNotes();
                                closeOverlay();
                                router.push({ name: "notes", params: { id: "" } });
                            });
                    },
                },
                {
                    name: "No",
                    primary: false,
                    action() {
                        closeOverlay();
                    },
                },
            ],
        });
    }
};

export const togglePublicity = (targetId?: string) => {
    const noteId: string = targetId ? targetId : selectedNote.value!.id;

    remult
        .repo(Note)
        .findId(noteId)
        .then((res) => {
            remult
                .repo(Note)
                .update(noteId, { public: !res.public })
                .then(() => loadNotes(targetId === undefined));
        });
};

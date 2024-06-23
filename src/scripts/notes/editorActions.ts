import { remult } from "remult";
import { Note } from "../../shared/Note";
import { editorContent, loadNotes, selectedNote } from "./notes";
import { readonly, ref } from "vue";
import { NoteFolder } from "../../shared/NoteFolder";
import { Account } from "../../shared/Account";
import { closeOverlay, setOverlayContent } from "../overlay";
import router from "../../plugins/router";

const folders = ref<NoteFolder[]>([]);
const errorMessage = ref<string>();

export const creatForm = ref<{
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
    if (creatForm.value.title !== "") {
        let repo;
        if (creatForm.value.isNote) {
            repo = remult.repo(Note);
        } else {
            repo = remult.repo(NoteFolder);
        }
        repo.find({ where: { title: creatForm.value.title } }).then(async (res) => {
            if (res.length !== 0) {
                errorMessage.value = `${
                    creatForm.value.isNote ? "Note" : "Folder"
                } exists with this title`;
            } else {
                const author: Account = await remult.repo(Account).findId(remult.user!.id);
                repo.insert({
                    title: creatForm.value.title,
                    public: creatForm.value.isPublic,
                    parent: folders.value[creatForm.value.parentId],
                    author: author,
                }).then(() => {
                    loadNotes();
                });
            }
        });
    }
};

export const saveNote = async () => {
    if (selectedNote.value) {
        await remult.repo(Note).update(selectedNote.value?.id, { content: editorContent.value });
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
                                // Notification here
                                selectedNote.value = null;
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

import { remult } from "remult";
import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { loadNotes, selectedNote } from "./notes";
import { Account } from "../../shared/Account";
import { NoteFolder } from "../../shared/NoteFolder";

const userList = ref<Account[]>([]);
const folderList = ref<NoteFolder[]>([]);

export const folderEditor = ref<{ title: string; author: number; parent: number }>({
    title: "",
    author: -1,
    parent: -1,
});
export const noteEditor = ref<{ title: string; author: number; parent: number }>({
    title: "",
    author: -1,
    parent: -1,
});

export const UserList = readonly(userList);
export const FolderList = readonly(folderList);

export const wordCount = ref<number>(0);

export const editNoteTitle = () => {
    if (noteEditor.value.title !== "") {
        remult
            .repo(Note)
            .update(selectedNote.value?.id!, { title: noteEditor.value.title })
            .then(() => {
                loadNotes(true);
            });
    }
};

export const loadElementEditor = (isNote: boolean, element: Note | NoteFolder) => {
    loadAccounts();
    loadFolders();

    if (isNote) {
        userList.value.forEach((user, index) => {
            if (user.id === element.author?.id) noteEditor.value.author = index;
        });
        folderList.value.forEach((folder, index) => {
            if (folder.id === element.parent?.id) noteEditor.value.parent = index;
        });
    } else {
        userList.value.forEach((user, index) => {
            if (user.id === element.author?.id) folderEditor.value.author = index;
        });
        folderList.value.forEach((folder, index) => {
            if (folder.id === element.parent?.id) folderEditor.value.parent = index;
        });
    }

    console.log("changed");
};

export const loadAccounts = () => {
    userList.value = [];

    remult
        .repo(Account)
        .find()
        .then((res) => (userList.value = res));
};

export const loadFolders = () => {
    folderList.value = [];

    remult
        .repo(NoteFolder)
        .find()
        .then((res) => (folderList.value = res));
};

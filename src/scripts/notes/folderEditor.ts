import { remult } from "remult";
import { readonly, ref } from "vue";
import { Note } from "../../shared/Note";
import { loadNotes, selectedNote } from "./notes";
import { Account } from "../../shared/Account";
import { NoteFolder } from "../../shared/NoteFolder";
import { closeOverlay, setOverlayContent } from "../overlay";
import { addNotification } from "../notification";
import router from "../../plugins/router";

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
export const selectedFolder = ref<NoteFolder | null>(null);

export const UserList = readonly(userList);
export const FolderList = readonly(folderList);

export const wordCount = ref<number>(0);

export const editElementTitle = (isNote: boolean) => {
    const repo = remult.repo(isNote ? Note : NoteFolder);
    if ((isNote && noteEditor.value.title !== "") || (!isNote && folderEditor.value.title !== "")) {
        repo.update(isNote ? selectedNote.value!.id : selectedFolder.value!.id, {
            title: isNote ? noteEditor.value.title : folderEditor.value.title,
        }).then(() => {
            loadNotes(true);
        });
    }
};

export const changeParentFolder = (isNote: boolean) => {
    const repo = remult.repo(isNote ? Note : NoteFolder);
    const parentIndex = isNote ? noteEditor.value.parent : folderEditor.value.parent;

    repo.update(isNote ? selectedNote.value!.id : selectedFolder.value!.id, {
        parent: parentIndex == -1 ? null : folderList.value[parentIndex],
    }).then(() => loadNotes());
};

export const changeAuthor = (isNote: boolean) => {
    const repo = remult.repo(isNote ? Note : NoteFolder);
    setOverlayContent({
        title: "Confirm changing author",
        content: `By transferring ownership to ${
            userList.value[isNote ? noteEditor.value.author : folderEditor.value.author].username
        } you will no longer be able to edit this ${
            isNote ? "note" : "folder"
        }. Are you sure you want to continue?`,
        buttons: [
            {
                name: "Yes",
                primary: true,
                action() {
                    repo.update(isNote ? selectedNote.value!.id : selectedFolder.value!.id, {
                        author: userList.value[
                            isNote ? noteEditor.value.author : folderEditor.value.author
                        ],
                    }).then(() => {
                        router.push({ name: "notes", params: { id: "" } }).then(() => {
                            selectedNote.value = null;
                            loadNotes(true);
                        });
                        addNotification("Author updated");
                        closeOverlay();
                    });
                },
            },
            {
                name: "No",
                primary: false,
                action() {
                    loadElementEditor(isNote, isNote ? selectedNote.value! : selectedFolder.value!);
                    closeOverlay();
                },
            },
        ],
    });
};

export const deleteFolder = () => {
    setOverlayContent({
        title: "Confirm deleting folder",
        content: `When this folder is deleted it's contents will be relocated to the root folder. Are you sure you want to continue?`,
        buttons: [
            {
                name: "Yes",
                primary: true,
                action() {
                    remult
                        .repo(NoteFolder)
                        .delete(selectedFolder.value!.id)
                        .then(() => {
                            closeOverlay();
                            loadNotes();
                            selectedFolder.value = null;
                        });
                },
            },
            {
                name: "No",
                primary: false,
                action() {
                    setOverlayContent("note-form-folder");
                },
            },
        ],
    });
};

export const toggleFolderPublicity = () => {
    remult
        .repo(NoteFolder)
        .findId(selectedFolder.value!.id)
        .then((res) => {
            remult
                .repo(NoteFolder)
                .update(selectedFolder.value!.id, { public: !res.public })
                .then((updatedFolder) => {
                    loadNotes(true);
                    selectedFolder.value = updatedFolder;
                });
        });
};

export const loadElementEditor = async (isNote: boolean, element: Note | NoteFolder) => {
    await loadAccounts();
    await loadFolders();

    if (element === null) return;

    if (isNote) {
        userList.value.forEach((user, index) => {
            if (user.id === element.author?.id) noteEditor.value.author = index;
        });
        noteEditor.value.parent = -1;
        folderList.value.forEach((folder, index) => {
            if (folder.id === element.parent?.id) noteEditor.value.parent = index;
        });
    } else {
        userList.value.forEach((user, index) => {
            if (user.id === element.author?.id) folderEditor.value.author = index;
        });
        folderEditor.value.parent = -1;

        //remove illegal options
        //helper function returns the folder id's of all of a folders children
        const findChildren = (folders: NoteFolder[], parentId: string): string[] => {
            let children: string[] = [];
            for (const folder of folders) {
                if (folder.parent?.id === parentId) {
                    children.push(folder.id);
                    children = children.concat(findChildren(folders, folder.id));
                }
            }
            return children;
        };

        let childrenIds = findChildren(folderList.value, selectedFolder.value!.id);
        childrenIds.push(selectedFolder.value!.id);

        folderList.value = folderList.value.filter((folder) => !childrenIds.includes(folder.id));

        folderList.value.forEach((folder, index) => {
            if (folder.id === element.parent?.id) folderEditor.value.parent = index;
        });
    }
};

export const loadAccounts = async () => {
    userList.value = await remult.repo(Account).find();
};

export const loadFolders = async () => {
    folderList.value = await remult
        .repo(NoteFolder)
        .find({ include: { author: true, parent: true } });
};

<script setup lang="ts">
import {
    faImage,
    faLock,
    faLockOpen,
    faPrint,
    faSave,
    faShare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { deleteNote, saveNote, togglePublicity } from "../../scripts/notes/toolbar";
import { addNotification } from "../../scripts/notification";
import {
    changeAuthor,
    changeParentFolder,
    editElementTitle,
    FolderList,
    loadElementEditor,
    noteEditor,
    UserList,
    wordCount,
} from "../../scripts/notes/folderEditor";
import { AccessLevel } from "../../scripts/login";
import { remult } from "remult";
import { editorContent, selectedNote } from "../../scripts/notes/notes";
import { watch } from "vue";

const print = () => {
    var printContents = editorContent.value!;
    var a = window.open("", "", "");
    a!.document.write("<html>");
    a!.document.write(`<body><h1>${selectedNote.value?.title}</h1>`);
    a!.document.write(printContents);
    a!.document.write("</body></html>");
    a!.document.close();
    a!.print();
};

const copyLink = () => {
    navigator.clipboard.writeText(window.location.toString());
    addNotification("Copied link to clipboard");
};

const hasAccess = (): boolean =>
    AccessLevel.value < 3 && selectedNote.value?.author?.id === remult.user?.id;

watch(selectedNote, () => {
    loadElementEditor(true, selectedNote.value!);
});
</script>

<template>
    <template v-if="selectedNote !== null">
        <div class="div-note-toolbar">
            <div class="tools">
                <font-awesome-icon
                    class="option-icon"
                    v-if="hasAccess()"
                    :icon="faSave"
                    @click="saveNote" />
                <font-awesome-icon
                    class="option-icon"
                    v-if="hasAccess()"
                    :icon="faTrash"
                    @click="deleteNote" />
                <font-awesome-icon
                    class="option-icon"
                    :icon="selectedNote?.public ? faLockOpen : faLock"
                    v-if="hasAccess()"
                    @click="togglePublicity()" />
                <font-awesome-icon class="option-icon" :icon="faImage" v-if="hasAccess()" />
                <font-awesome-icon class="option-icon" :icon="faPrint" @click="print" />
                <font-awesome-icon class="option-icon" :icon="faShare" @click="copyLink" />
            </div>
            <form @submit.prevent v-if="hasAccess()">
                <label for="title">Edit title</label>
                <div class="inline-submit">
                    <span
                        ><input
                            id="title"
                            type="text"
                            :placeholder="selectedNote.title"
                            v-model="noteEditor.title"
                    /></span>
                    <button class="button-normal" type="submit" @click="editElementTitle(true)">
                        Go
                    </button>
                </div>

                <label for="author">Change author</label>
                <span>
                    <select id="author" v-model="noteEditor.author" @change="changeAuthor(true)">
                        <option v-for="(user, index) in UserList" :value="index">
                            {{ user.username }}
                        </option>
                    </select>
                </span>

                <label for="parent">Change parent folder</label>
                <span>
                    <select
                        id="parent"
                        v-model="noteEditor.parent"
                        @change="changeParentFolder(true)">
                        <option value="-1">Root folder</option>
                        <option v-for="(user, index) in FolderList" :value="index">
                            {{ user.title }}
                        </option>
                    </select>
                </span>
            </form>

            <table>
                <tr>
                    <th>Note Info</th>
                </tr>
                <tr>
                    <td>Author:</td>
                    <td>{{ selectedNote.author?.username }}</td>
                </tr>
                <tr>
                    <td>Word count:</td>
                    <td v-if="editorContent">
                        {{ wordCount }}
                    </td>
                </tr>
                <tr>
                    <td>Last edit:</td>
                    <td>{{ selectedNote.lastEdit.toDateString() }}</td>
                </tr>
                <tr>
                    <td>Created:</td>
                    <td>{{ selectedNote.createdAt?.toDateString() }}</td>
                </tr>
            </table>
        </div>
    </template>
    <p v-else style="margin: 10px; opacity: 0.7">Select a note to access editor tool bar</p>
</template>

<style scoped lang="scss">
.div-note-toolbar {
    display: flex;
    flex-direction: column;
    width: 300px;

    @media (max-width: 800px) {
        width: 75vw;
    }

    .tools {
        display: flex;
        flex-wrap: wrap;
    }

    table {
        margin: 10px 5px 5px 5px;
        border-radius: 5px;
        padding: 5px;
        background-color: var(--blue-background);

        th {
            text-align: left;
            font-size: 20px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        width: 100%;

        label {
            font-size: 18px;
            margin-top: 5px;
        }

        // make inputs full length
        span {
            flex: 1;

            input,
            select {
                width: 100% !important;
            }
        }

        .inline-submit {
            display: flex;
            width: 100%;

            button {
                margin: 0 5px;

                &:hover {
                    transform: none !important;
                }
            }
        }
    }
}
</style>

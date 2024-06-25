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
import { deleteNote, saveNote, togglePublicity } from "../../scripts/notes/editorActions";
import { editorContent, selectedNote } from "../../scripts/notes/notes";
import { addNotification } from "../../scripts/notification";
import { editNoteTitle, noteDetails, wordCount } from "../../scripts/notes/noteOptions";

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
</script>

<template>
    <div class="div-note-toolbar">
        <div class="tools">
            <font-awesome-icon class="option-icon" :icon="faSave" @click="saveNote" />
            <font-awesome-icon class="option-icon" :icon="faTrash" @click="deleteNote" />
            <font-awesome-icon
                class="option-icon"
                :icon="selectedNote?.public ? faLockOpen : faLock"
                @click="togglePublicity()" />
            <font-awesome-icon class="option-icon" :icon="faImage" />
            <font-awesome-icon class="option-icon" :icon="faPrint" @click="print" />
            <font-awesome-icon class="option-icon" :icon="faShare" @click="copyLink" />
        </div>
        <form @submit.prevent v-if="selectedNote !== null">
            <label for="title">Edit title</label>
            <div class="inline-submit">
                <span
                    ><input
                        id="title"
                        type="text"
                        :placeholder="selectedNote.title"
                        v-model="noteDetails.title"
                /></span>
                <button class="button-normal" type="submit" @click="editNoteTitle">Go</button>
            </div>

            <label for="author">Change author</label>
            <span>
                <select id="author">
                    <option value="1">{{ selectedNote.author?.username }}</option>
                </select>
            </span>

            <label for="parent">Change parent folder</label>
            <span>
                <select id="parent">
                    <option value="1">{{ selectedNote.parent?.title }}</option>
                </select>
            </span>

            <table>
                <tr>
                    <th>Note Info</th>
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
        </form>
    </div>
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

    form {
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        width: 100%;

        label {
            font-size: 18px;
            margin-top: 5px;
        }

        table {
            margin-top: 10px;
            border-radius: 5px;
            padding: 5px;
            background-color: var(--blue-background);

            th {
                text-align: left;
                font-size: 20px;
            }
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

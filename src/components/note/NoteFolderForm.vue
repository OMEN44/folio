<script setup lang="ts">
import { faLock, faLockOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    changeAuthor,
    changeParentFolder,
    deleteFolder,
    editElementTitle,
    folderEditor,
    FolderList,
    loadElementEditor,
    selectedFolder,
    toggleFolderPublicity,
    UserList,
} from "../../scripts/notes/folderEditor";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

loadElementEditor(false, selectedFolder.value!);
</script>

<template>
    <form @submit.prevent>
        <label for="title">Edit title</label>
        <div class="inline-submit">
            <span>
                <input
                    id="title"
                    type="text"
                    :placeholder="selectedFolder?.title"
                    v-model="folderEditor.title" />
            </span>
            <button class="button-normal" type="submit" @click="editElementTitle(false)">Go</button>
        </div>

        <label for="author">Change author</label>
        <span>
            <select id="author" v-model="folderEditor.author" @change="changeAuthor(false)">
                <option v-for="(user, index) in UserList" :value="index">
                    {{ user.username }}
                </option>
            </select>
        </span>

        <label for="parent">Change parent folder</label>
        <span>
            <select id="parent" v-model="folderEditor.parent" @change="changeParentFolder(false)">
                <option value="-1">Root folder</option>
                <option v-for="(user, index) in FolderList" :value="index">
                    {{ user.title }}
                </option>
            </select>
        </span>
        <div class="tools">
            <font-awesome-icon class="option-icon" :icon="faTrash" @click="deleteFolder" />
            <font-awesome-icon
                class="option-icon"
                :icon="selectedFolder?.public ? faLockOpen : faLock"
                @click="toggleFolderPublicity" />
        </div>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    max-width: 350px;

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

    .tools {
        height: fit-content;
        margin: 10px 0 -5px 0;
    }
}
</style>

<script setup lang="ts">
import {
    create,
    createForm,
    ErrorMessage,
    Folders,
    loadFolders,
} from "../../scripts/notes/toolbar";
import { closeOverlay } from "../../scripts/overlay";

loadFolders();
</script>

<template>
    <form @submit.prevent>
        <h2>Create new note or folder</h2>
        <strong v-text="ErrorMessage"></strong>
        <div class="div-selector">
            <p :class="{ selected: createForm.isNote }" @click="createForm.isNote = true">Note</p>
            <p :class="{ selected: !createForm.isNote }" @click="createForm.isNote = false">
                Folder
            </p>
            <div class="checkbox">
                <input type="checkbox" id="checkbox" v-model="createForm.isPublic" />
                <label for="checkbox">Public</label>
            </div>
        </div>

        <select v-model="createForm.parentId">
            <option value="-1">No parent folder</option>
            <option v-for="(folder, index) in Folders" :value="index">
                {{ folder.title }}
            </option>
        </select>

        <input
            type="text"
            v-model="createForm.title"
            :placeholder="`${createForm.isNote ? 'Note' : 'Folder'} title`" />

        <div class="div-buttons">
            <button class="button-normal" type="submit" @click="create">Submit</button>
            <button class="button-normal" @click="closeOverlay">Cancel</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
form {
    padding: 5px;
    max-width: 400px;
    width: 80vw;
    display: flex;
    flex-direction: column;

    @media (max-width: 800px) {
        width: 80vw;

        h2 {
            font-size: 24px;
        }
    }

    p {
        font-size: 18px;
        margin: 5px 0 2px 0;
    }

    select {
        margin-bottom: 10px;
    }

    .div-selector {
        display: flex;
        flex-direction: row;
        margin: 10px 0 10px 0;
        // margin: 10px 0 -2px 0;

        .selected {
            background-color: var(--blue-background);
        }

        .checkbox {
            display: flex;

            * {
                margin: auto 2px;
            }
        }

        p {
            margin-right: 15px;
            background-color: color-mix(in srgb, var(--blue-background) 35%, var(--background) 65%);
            border-radius: 4px;
            // border-radius: 4px 4px 0 0;
            padding: 5px 9px;
            text-align: center;
            cursor: pointer;
            width: fit-content;
        }
    }

    .div-buttons {
        margin: 10px 0 0 -5px;
    }
}
</style>

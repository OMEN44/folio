<script setup lang="ts">
import { folderEditor, FolderList, UserList } from "../../scripts/notes/noteOptions";

// loadElementEditor()
</script>

<template>
    <form @submit.prevent>
        <label for="title">Edit title</label>
        <div class="inline-submit">
            <span
                ><input id="title" type="text" :placeholder="'title'" v-model="folderEditor.title"
            /></span>
            <button class="button-normal" type="submit" @click="">Go</button>
        </div>

        <label for="author">Change author</label>
        <span>
            <select id="author" v-model="folderEditor.parent">
                <option v-for="(user, index) in UserList" :value="index">
                    {{ user.username }}
                </option>
            </select>
        </span>

        <label for="parent">Change parent folder</label>
        <span>
            <select id="parent" v-model="folderEditor.parent">
                <option v-for="(user, index) in FolderList" :value="index">
                    {{ user.title }}
                </option>
            </select>
        </span>

        <button class="button-normal" type="button" @click="">Delete</button>
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
}
</style>

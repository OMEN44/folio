<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faSearch,
    faFilter,
    faAdd,
    faLock,
    faLockOpen,
    faSave,
    faTrash,
    faUndo,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import NoteMenu from "../components/NoteMenu.vue";
import NoteEditor from "../components/NoteEditor.vue";
</script>

<template>
    <div class="div-notes-container">
        <div class="div-notes-header">
            <h1>Notes</h1>
            <div class="div-options">
                <font-awesome-icon class="option-icon" :icon="faSearch" />
                <font-awesome-icon class="option-icon" :icon="faFilter" />
                <font-awesome-icon class="option-icon" :icon="faAdd" />
            </div>
        </div>
        <div class="div-notes-content">
            <note-menu />
            <note-editor />
            <div class="div-note-toolbar">
                <font-awesome-icon class="option-icon" :icon="true ? faLock : faLockOpen" />
                <font-awesome-icon class="option-icon" :icon="faSave" />
                <font-awesome-icon class="option-icon" :icon="faTrash" />
                <font-awesome-icon class="option-icon" :icon="faUndo" />
                <font-awesome-icon class="option-icon" :icon="faImage" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.div-notes-container {
    width: 100%;
    height: calc(100% - 15px);
    display: flex;
    flex-direction: column;

    .div-notes-header {
        display: flex;
        flex-direction: column;
        padding: 15px 35px;

        h1 {
            font-family: kode mono;
            font-size: 50px;

            @media (max-width: 400px) {
                margin-top: 62px;
            }
        }

        .div-options {
            display: flex;
            flex-direction: row;
            height: fit-content;
        }
    }

    .div-notes-content {
        display: flex;
        flex-direction: row;
        margin: 10px 35px;
        flex: 1;

        .div-note-toolbar {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>

<script setup lang="ts">
import {
    faImage,
    faLock,
    faLockOpen,
    faSave,
    faTrash,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { deleteNote, saveNote } from "../../scripts/notes/editorActions";
</script>

<template>
    <div class="div-note-toolbar">
        <font-awesome-icon class="option-icon" :icon="true ? faLock : faLockOpen" />
        <font-awesome-icon class="option-icon" :icon="faSave" @click="saveNote" />
        <font-awesome-icon class="option-icon" :icon="faTrash" @click="deleteNote" />
        <font-awesome-icon class="option-icon" :icon="faUndo" />
        <font-awesome-icon class="option-icon" :icon="faImage" />
    </div>
</template>

<style scoped lang="scss"></style>

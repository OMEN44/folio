<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import NoteMenu from "../components/NoteMenu.vue";
import NoteEditor from "../components/NoteEditor.vue";
import { nextTick, onMounted, watch } from "vue";
import { editorContent, loadNotes, selectedNote } from "../scripts/notes/notes";
import router from "../plugins/router";
import { remult } from "remult";
import { Note } from "../shared/Note";
import NoteToolbar from "../components/NoteToolbar.vue";

onMounted(() => {
    nextTick(() => {
        loadNotes();
    });

    if (router.currentRoute.value.params.id !== "") {
        selectNote(router.currentRoute.value.params.id as string);
    }

    watch(
        () => router.currentRoute.value.params.id,
        (value) => {
            selectNote(value as string);
        }
    );
});

const selectNote = (id: string) => {
    remult
        .repo(Note)
        .findId(id, { include: { author: true, parent: true } })
        .then((note) => {
            selectedNote.value = note;
            editorContent.value = note.content;
        });
};
</script>

<template>
    <div class="div-notes-container">
        <div class="div-notes-header">
            <h1>Notes</h1>
            <div class="div-options">
                <font-awesome-icon class="option-icon" :icon="faSearch" />
                <font-awesome-icon class="option-icon" :icon="faAdd" />
            </div>
        </div>
        <div class="div-note">
            <div class="div-note-content">
                <note-menu />
                <note-editor
                    :content="editorContent"
                    @update:content="($event) => (editorContent = $event)" />
                <NoteToolbar />
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
    overflow: auto;

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

    .div-note {
        flex-direction: row;
        margin: 10px;
        flex: 1;
        width: calc(100% - 20px);
        position: relative;

        .div-note-content {
            display: flex;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;

            .div-note-toolbar {
                display: flex;
                flex-direction: column;
                width: fit-content;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faAdd, faFolder, faEllipsis, faSave } from "@fortawesome/free-solid-svg-icons";
import NoteMenu from "../components/note/NoteMenu.vue";
import NoteEditor from "../components/note/NoteEditor.vue";
import { nextTick, onMounted } from "vue";
import { editorContent, loadNotes, selectedNote } from "../scripts/notes/notes";
import NoteToolbar from "../components/note/NoteToolbar.vue";
import { setOverlayContent } from "../scripts/overlay";
import { AccessLevel } from "../scripts/login";
import { saveNote } from "../scripts/notes/toolbar";

onMounted(() => {
    nextTick(async () => {
        await loadNotes();
    });
});
</script>

<template>
    <div class="div-notes-container">
        <div class="div-notes-header">
            <h1>Notes</h1>
            <div class="div-options">
                <font-awesome-icon
                    class="option-icon"
                    :icon="faAdd"
                    v-if="AccessLevel < 3"
                    @click="setOverlayContent('note-form-create')" />
                <font-awesome-icon class="option-icon" :icon="faSearch" />
                <font-awesome-icon
                    class="option-icon mobile-show"
                    :icon="faFolder"
                    @click="setOverlayContent('note-menu')" />
                <font-awesome-icon
                    class="option-icon mobile-show"
                    v-if="AccessLevel < 3"
                    :icon="faEllipsis"
                    @click="setOverlayContent('note-tools')" />
                <font-awesome-icon
                    class="option-icon"
                    v-if="AccessLevel < 3 && selectedNote !== null"
                    :icon="faSave"
                    @click="saveNote" />
            </div>
        </div>
        <div class="div-note">
            <div class="div-note-content">
                <note-menu class="mobile-hide" />
                <note-editor
                    :content="editorContent"
                    @update:content="($event) => (editorContent = $event)" />
                <NoteToolbar class="mobile-hide" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mobile-show {
    display: none;
}

@media (max-width: 800px) {
    .mobile-hide {
        display: none !important;
    }

    .mobile-show {
        display: block;
    }
}

.div-notes-container {
    width: 100%;
    height: calc(100% - 15px);
    display: flex;
    flex-direction: column;
    overflow: auto;

    @media (max-width: 600px) {
        height: 100%;
    }

    .div-notes-header {
        display: flex;
        flex-direction: column;
        padding: 15px 35px;

        @media (max-width: 600px) {
            padding: 15px 15px 0 15px;
        }

        h1 {
            font-family: kode mono;
            font-size: 50px;

            @media (max-width: 600px) {
                font-size: 40px;
            }
        }

        .div-options {
            display: flex;
            flex-direction: row;
            height: fit-content;
            margin-left: -5px;
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
        }
    }
}
</style>

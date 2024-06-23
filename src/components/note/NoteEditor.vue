<script setup lang="ts">
import { Editor, EditorContent, HTMLContent } from "@tiptap/vue-3";
import { selectedNote } from "../../scripts/notes/notes";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { watch } from "vue";
import { remult } from "remult";
import { AccessLevel } from "../../scripts/login";
import { onBeforeRouteLeave } from "vue-router";

const props = defineProps<{ content?: string }>();
const emits = defineEmits(["update:content"]);

let editor = new Editor({
    extensions: [StarterKit, Image],
    content: props.content,
    editable: false,
    onUpdate: () => {
        emits("update:content", editor!.getHTML());
    },
});

watch(
    () => AccessLevel.value,
    () => {
        editor!.setEditable(selectedNote.value?.author?.id === remult.user?.id);
        if (!selectedNote.value?.public && AccessLevel.value >= 3) selectedNote.value = null;
    }
);

watch(
    () => props.content,
    (value) => {
        if (editor!.getHTML() !== value) editor!.commands.setContent(value as HTMLContent, false);
        editor!.setEditable(selectedNote.value?.author?.id === remult.user?.id);
    }
);

onBeforeRouteLeave(() => {
    selectedNote.value = null;
});
</script>

<template>
    <span class="left-decoration"></span>
    <div class="div-note-editor">
        <template v-if="selectedNote !== null">
            <div class="editor-container">
                <h1>{{ selectedNote.title }}</h1>
                <editor-content class="editor" :editor="editor" />
            </div>
        </template>
        <template v-else>
            <p>Select a note to edit.</p>
        </template>
    </div>
    <span class="right-decoration"></span>
</template>

<style scoped lang="scss">
.div-note-editor {
    margin: 0 20px;
    padding: 0 20px;
    border: 2px var(--blue);
    border-style: none solid;
    flex: 1;

    .editor-container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .editor {
            flex: 1;
            overflow-y: auto;
        }
    }
}

span {
    position: relative;
}

.left-decoration::after,
.left-decoration::before,
.right-decoration::after,
.right-decoration::before {
    content: "";
    position: absolute;
    background-color: var(--blue);
    width: 7px;
    height: 30px;
    border-radius: 5px;
}

.left-decoration::after {
    bottom: -5px;
    left: 15px;
    border-top-right-radius: 0;
}

.left-decoration::before {
    top: -5px;
    left: 15px;
    border-bottom-right-radius: 0;
}

.right-decoration::after {
    bottom: -5px;
    right: 15px;
    border-top-left-radius: 0;
}

.right-decoration::before {
    top: -5px;
    right: 15px;
    border-bottom-left-radius: 0;
}
</style>

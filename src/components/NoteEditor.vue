<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = useEditor({
    content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
    extensions: [StarterKit],
});
</script>

<template>
    <span class="left-decoration"></span>
    <div class="div-note-editor">
        <editor-content :editor="editor" />
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
}

span {
    position: relative;
}

.textarea-output {
    height: 100%;
    width: 100%;
    resize: none;
    color: var(--text);
    background-color: transparent;
    border: none;
}

.textarea:focus {
    outline: none;
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

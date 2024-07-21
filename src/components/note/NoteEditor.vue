<script setup lang="ts">
import { Editor, EditorContent, HTMLContent } from "@tiptap/vue-3";
import { selectedNote } from "../../scripts/notes/notes";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { watch } from "vue";
import { remult } from "remult";
import { AccessLevel, setPermissionLevel } from "../../scripts/login";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAdd, faFileEdit, faFolder } from "@fortawesome/free-solid-svg-icons";
import { setOverlayContent } from "../../scripts/overlay";
import { wordCount } from "../../scripts/notes/folderEditor";
import { saveCurrentNote } from "../../scripts/notes/toolbar";

const props = defineProps<{ content?: string }>();
const emits = defineEmits(["update:content"]);
setPermissionLevel();

let editor = new Editor({
    extensions: [StarterKit, Image, CharacterCount],
    content: props.content,
    editable: false,
    onUpdate: () => {
        emits("update:content", editor!.getHTML());
        wordCount.value = editor.storage.characterCount.words();
    },
    onCreate: () => {
        editor!.setEditable(selectedNote.value?.author?.id === remult.user?.id);
        if (!selectedNote.value?.public && AccessLevel.value >= 3) selectedNote.value = null;
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
</script>

<template>
    <span class="left-decoration"></span>
    <div
        class="div-note-editor"
        @keydown.ctrl.prevent="
            (e) => {
                if (e.key === 's') saveCurrentNote();
            }
        ">
        <template v-if="selectedNote !== null">
            <div class="editor-container">
                <h1>{{ selectedNote.title }}</h1>
                <editor-content class="editor" :editor="editor" />
            </div>
        </template>
        <template v-else>
            <div class="tips">
                <FontAwesomeIcon class="edit-icon" :icon="faFileEdit" />
                <h2>No note is open</h2>
                <div class="tip" @click="setOverlayContent('note-menu')">
                    <FontAwesomeIcon :icon="faFolder" />
                    <p>Browse notes</p>
                </div>
                <div
                    class="tip"
                    @click="setOverlayContent('note-form-create')"
                    v-if="AccessLevel < 3">
                    <FontAwesomeIcon :icon="faAdd" />
                    <p>Create a new note</p>
                </div>
            </div>
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
    position: relative;

    h1 {
        text-decoration: underline var(--blue-background) 5px;
        margin-bottom: 5px;
    }

    @media (max-width: 600px) {
        border-style: none;
        margin: 0;
        padding: 0 5px;

        h1 {
            font-size: 26px;
        }
    }

    .editor-container {
        display: flex;
        flex-direction: column;
        height: 100%;

        @media print {
            body {
                visibility: hidden;
            }

            .editor {
                visibility: visible;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

        .editor {
            flex: 1;
            overflow-y: auto;
            // made sure the editor is only taking up remaining space
            width: calc(100vw - 600px - 40px - 4px - 84px);

            @media (max-width: 800px) {
                width: calc(100vw - 128px);
            }

            @media (max-width: 600px) {
                width: calc(100vw - 44px);
            }

            .tiptap {
                width: 100%;
            }
        }
    }

    .tips {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .edit-icon {
            width: 100%;
            height: 75px;
            opacity: 0.4;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 20px;
            text-align: center;
            opacity: 0.4;
        }

        .tip {
            display: flex;
            padding: 5px 10px;
            margin: 10px auto;
            background-color: var(--blue-background);
            border-radius: 5px;
            cursor: pointer;

            p {
                white-space: nowrap;
            }

            svg {
                margin: auto 10px auto 0;
            }
        }
    }
}

span {
    position: relative;

    @media (max-width: 600px) {
        display: none;
    }
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

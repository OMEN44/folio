<script setup lang="ts">
import { Editor, EditorContent, HTMLContent } from "@tiptap/vue-3";
import { selectedNote } from "../../scripts/notes/notes";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { watch } from "vue";
import { remult } from "remult";
import { AccessLevel } from "../../scripts/login";
import { onBeforeRouteLeave } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAdd, faFolder } from "@fortawesome/free-solid-svg-icons";
import { setOverlayContent } from "../../scripts/overlay";

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
            <div class="tips">
                <div class="tip" @click="setOverlayContent('note-menu')">
                    <FontAwesomeIcon :icon="faFolder" />
                    <p>Find a note to edit</p>
                </div>
                <div class="tip" @click="setOverlayContent('note-form-create')">
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
        background-color: var(--blue-background);
        padding: 5px 10px;
        border-radius: 5px;
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

        .editor {
            flex: 1;
            overflow-y: auto;
        }
    }

    .tips {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .tip {
            display: flex;
            padding: 5px 10px;
            margin: 10px 0;
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

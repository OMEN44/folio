<script setup lang="ts">
import { faCaretDown, faCaretUp, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref, watch } from "vue";
import { Note } from "../../shared/Note";
import { NoteFolder } from "../../shared/NoteFolder";
import { MenuContent, selectedNote } from "../../scripts/notes/notes";
import { AccessLevel } from "../../scripts/login";
import router from "../../plugins/router";

const props = defineProps<{ thisFolder?: NoteFolder; depth?: number }>();
const children = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
const rootFolder = ref<boolean>(false);
const folderOpen = ref<boolean>(true);

const loadFolder = () => {
    rootFolder.value = props.thisFolder === undefined;
    children.value = [];
    MenuContent.value.forEach((element) => {
        if (
            (element.element.parent === null && rootFolder.value) ||
            element.element.parent?.id === props.thisFolder?.id
        ) {
            children.value.push(element);
        }
    });

    children.value.sort((a, b) => {
        return a.element.title > b.element.title ? 1 : -1;
    });
};

// load when created and when source is changed
onMounted(() => loadFolder());

watch(
    () => MenuContent.value,
    () => loadFolder()
);
</script>

<template>
    <div class="folder" :class="{ root: rootFolder }">
        <div
            @click="folderOpen = !folderOpen"
            class="folder-header"
            :style="{ display: rootFolder ? 'none' : 'flex' }">
            <div class="spacer" v-if="depth" v-for="_ in depth - 1" />
            <FontAwesomeIcon class="caret" :icon="folderOpen ? faCaretDown : faCaretUp" />
            <p>{{ thisFolder?.title }}</p>
        </div>
        <div v-if="folderOpen" class="folder-content" :class="{ root: rootFolder }">
            <div v-for="element in children">
                <NoteMenuFolder
                    v-if="
                        !element.isNote &&
                        (element.element.public || (!element.element.public && AccessLevel < 3))
                    "
                    :thisFolder="element.element"
                    :depth="depth ? 1 + depth : 1" />
                <template
                    v-else-if="
                        element.element.public || (!element.element.public && AccessLevel < 3)
                    ">
                    <div
                        class="note"
                        :class="{ selected: selectedNote?.id === element.element.id }"
                        @click="router.push({ name: 'notes', params: { id: element.element.id } })">
                        <div class="spacer" v-if="depth" v-for="_ in depth" />
                        <font-awesome-icon
                            v-if="AccessLevel < 3"
                            class="folder-option"
                            :icon="element.element.public ? faLockOpen : faLock" />
                        <p>{{ element.element.title }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.root {
    border: none !important;
}

.spacer {
    height: 38px;
    margin-top: -4px;
    width: 10px;
    border-right: 2px var(--blue-background) solid;
}

.folder {
    display: flex;
    flex-direction: column;
    width: 300px;

    @media (max-width: 800px) {
        width: 75vw;
    }

    p {
        font-size: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .folder-header,
    .note {
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px 2px 0;
        margin: 3px 0;
        height: 32px;

        &.selected,
        &:hover {
            background-color: var(--blue-background);
        }
    }

    .folder-header {
        display: flex;

        .caret {
            margin: auto 10px auto 5px;
        }
    }

    .folder-content {
        display: flex;
        flex-direction: column;

        .note {
            display: flex;
            // margin: auto 10px;

            p {
                margin-left: 10px;
            }

            svg {
                margin: auto 0 auto 10px;
            }
        }
    }
}
</style>

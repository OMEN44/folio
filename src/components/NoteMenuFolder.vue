<script setup lang="ts">
import { faCaretDown, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref, watch } from "vue";
import { Note } from "../shared/Note";
import { NoteFolder } from "../shared/NoteFolder";
import { MenuContent } from "../scripts/notes/notes";
import { AccessLevel } from "../scripts/login";

const props = defineProps<{ thisFolder?: NoteFolder }>();
const children = ref<Array<{ isNote: boolean; element: Note | NoteFolder }>>([]);
const rootFolder = ref<boolean>(false);

const loadFolder = () => {
    rootFolder.value = props.thisFolder === undefined;
    MenuContent.value.forEach((element) => {
        if (
            (element.element.parent === null && rootFolder.value) ||
            element.element.parent?.id === props.thisFolder?.id
        ) {
            children.value.push(element);
        }
    });

    console.log(children.value);
};

// load when created and when source is changed
onMounted(() => {
    loadFolder();
});

watch(MenuContent.value, () => {
    loadFolder();
});
</script>

<template>
    <div class="folder" :class="{ root: rootFolder }">
        <div class="folder-header">
            <p>Folder name</p>
            <FontAwesomeIcon class="caret" :icon="faCaretDown" />
        </div>
        <div class="folder-content">
            <div v-for="element in children">
                <NoteMenuFolder
                    v-if="
                        !element.isNote &&
                        (element.element.public || (!element.element.public && AccessLevel < 3))
                    "
                    :thisFolder="element.element" />
                <template
                    v-else-if="
                        element.element.public || (!element.element.public && AccessLevel < 3)
                    ">
                    <div class="note">
                        <font-awesome-icon
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
.folder {
    display: flex;
    flex-direction: column;

    .folder-header {
        padding: 5px 10px;
        margin: 5px 0;
        display: flex;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.4s;

        &:hover {
            background-color: var(--blue-background);
        }

        .caret {
            margin: auto 0 auto 15px;
        }

        p {
            font-size: 20px;
        }
    }

    .folder-content {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        padding-left: 5px;
        border-left: var(--blue-background) 2px solid;

        .note {
            height: fit-content;
            width: 100%;
            max-width: 250px;
            padding: 5px 10px;
            margin: 5px 0;
            display: flex;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.4s;

            &:hover {
                background-color: var(--blue-background);
            }

            svg {
                margin: auto 15px auto 0;
            }

            p {
                font-size: 20px;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, watch } from "vue";
import { Note } from "../shared/Note";
import { remult } from "remult";
import { NoteFolder } from "../shared/NoteFolder";

const notes = ref<Note[]>([]);
const folders = ref<NoteFolder[]>([]);
const selectedIndex = ref<number>(-1);

watch(selectedIndex, () => {
    (document.getElementsByClassName("div-menu")[0] as HTMLDivElement).style.setProperty(
        "--slider",
        `calc(40px * ${selectedIndex.value} + 5px * (${selectedIndex.value} + 1))`
    );
});

selectedIndex.value = 0;

remult
    .repo(Note)
    .find()
    .then((res) => {
        notes.value = res;
    });

remult
    .repo(NoteFolder)
    .find()
    .then((res) => {
        folders.value = res;
    });
</script>

<template>
    <div class="div-menu">
        <div
            v-for="(note, index) in notes"
            :class="`div-note ${index == selectedIndex ? 'selected' : ''}`"
            @click="selectedIndex = index">
            <font-awesome-icon class="folder-option" :icon="note.public ? faLockOpen : faLock" />
            <p>{{ note.title }}</p>
        </div>
        <!-- <div class="div-folder">
            <div class="div-folder-header">
                <font-awesome-icon class="folder-option" :icon="false ? faCaretUp : faCaretDown" />
                <p>Title</p>
                <font-awesome-icon class="folder-option" :icon="faEllipsis" />
            </div>
            <div class="div-note" v-for="_ in 3">
                <div class="div-note-header">
                    <h3>Title</h3>
                    <kbd>By username</kbd>
                </div>
                <p>Last edited</p>
            </div>
        </div>
        <div class="div-note">
            <div class="div-note-header">
                <h3>Title</h3>
                <kbd>By username</kbd>
            </div>
            <p>Last edited</p>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
.div-menu {
    min-width: 150px;
    position: relative;
    --slider: 0;

    &::after {
        content: "";
        position: absolute;
        background-color: var(--blue);
        width: 4px;
        height: 40px;
        top: var(--slider);
        right: 0;
        border-radius: 10px;
        transition: top 1s;
    }

    .selected,
    .div-note:hover {
        background-color: var(--blue-background);
    }

    .div-note {
        height: 40px;
        padding: 5px 10px;
        margin: 5px 0;
        display: flex;
        cursor: pointer;
        border-radius: 5px;

        svg {
            margin: auto 15px auto 0;
        }

        p {
            font-size: 20px;
        }
    }

    .div-folder {
        border: 2px var(--blue) solid;
        border-radius: 4px;
        padding: 5px 5px 0 5px;
        margin: 5px;

        .folder-option {
            margin: auto 5px;
        }

        .div-folder-header {
            display: flex;
            flex-direction: row;

            p {
                font-weight: bold;
            }
        }

        .div-note {
            margin: 5px 0;
        }
    }
}
</style>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiNotePlus } from '@mdi/js'
import { ref } from "vue";
import getAxios from "../plugins/axios";
import { notify } from "../script/notification";

const props = defineProps(['user', 'notes', 'selected'])
const emit = defineEmits(['updateNotes'])

const titleInput = ref('')

const changeSelection = (e) => emit("updateNotes", Number(e.target.id))

// Create new note
const createNote = (e) => {
    e.preventDefault()
    if (titleInput.value !== '') {
        getAxios().post('notes/create', {
            title: titleInput.value
        }).then(() => {
            titleInput.value = '';
            emit("updateNotes", props.selected)
            notify('New note created.')
        }).catch(error => notify(error.response.data.error))
    }
}
</script>

<template>
    <div>
        <!-- Create note -->
        <form class="form-create" v-if="props.user !== null && props.user.access < 2">
            <input class="input-text-border" type="text" v-model="titleInput" placeholder="New note title...">
            <button class="button-border" @click="createNote">
                <svg-icon type="mdi" :path="mdiNotePlus" />
            </button>
        </form>
        <!-- select note -->
        <div class="div-note" v-for="(element, index) in props.notes" :id="String(index)" @click="changeSelection"
            :class="{ highlight: index === props.selected }">
            <h3>{{ element['title'] }}</h3>
            <span v-if="element['authorName'] !== undefined">By {{ element['authorName'] }}</span>
        </div>
    </div>
</template>

<style scoped>
.div-note {
    height: fit-content;
    padding: 10px 15px;
    margin: 6px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    z-index: 0;
    border-radius: 8px;
}

.highlight {
    background-color: var(--accent);
}

.div-note:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary);
    transition: 0.5s;
    transform-origin: left;
    transform: scaleX(0);
    z-index: -1;
}

.div-note:hover::before {
    transition: transform 0.5s;
    transform-origin: left;
    transform: scaleX(1);
}

.form-create {
    margin: 10px;
    display: flex;
    flex-direction: row;
}

input {
    border-radius: 4px;
    border: none;
    height: 42px;
    margin: 5px;
    color: var(--text);
    background-color: var(--accent);
    font-size: 16px;
    padding: 0 0 0 10px;
}

input:focus {
    outline: none;
}

.div-note * {
    pointer-events: none;
}
</style>
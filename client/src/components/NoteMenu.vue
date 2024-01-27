<script setup>
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiPlus } from '@mdi/js'
import { ref, watch } from "vue";
import getAxios from "../plugins/axios";

const props = defineProps(['loggedIn', 'notes'])
const emit = defineEmits(['updateNotes'])

const selected = ref(0)
const titleInput = ref('')
const isPrivate = ref(true)

watch(props, () => {
    if (props.notes.length < (1 + selected.value))
        selected.value = 0;
})

const changeSelection = (e) => {
    selected.value = Number(e.target.id)
    emit("updateNotes", Number(e.target.id))
}

// Create new note
const createNote = (e) => {
    e.preventDefault()
    if (titleInput.value !== '') {
        getAxios().post('notes/create', {
            title: titleInput.value,
            access: isPrivate.value,
        }).then(() => {
            titleInput.value = '';
            emit("updateNotes", selected.value)
        }).catch(error => console.log(error.response.data.error))
    }
}
</script>

<template>
    <div>
        <!-- Create note -->
        <div class="div-add-note" v-if="!props.loggedIn">
            <form class="form-create">
                <div class="div-create-inputs">
                    <input class="input-text-border" type="text" v-model="titleInput" placeholder="New note title...">
                    <label><input type="checkbox" v-model="isPrivate">Private</label>
                </div>
                <button class="button-border" @click="createNote">
                    <svg-icon type="mdi" :path="mdiPlus" />
                </button>
            </form>
        </div>
        <!-- select note -->
        <div class="div-note" v-for="(element, index) in props.notes" :id="index" @click="changeSelection"
            :class="{ highlight: index === selected }">
            <h3>{{ element['title'] }}</h3>
            <span>{{ element['route'] }}</span>
        </div>
    </div>
</template>

<style scoped>
.div-add-note {
    display: flex;
    flex-direction: column;
}

/*Hover effect*/

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

.div-create-inputs {
    margin-right: 8px;
    display: flex;
    flex-direction: column;
}

.div-create-inputs input[type=checkbox] {
    margin-top: 8px;
}

.div-create-inputs input[type=text] {
    border-radius: 4px;
    border: none;
    height: 24px;
    color: var(--text);
    background-color: var(--accent);
    font-size: 14px;
    padding-left: 4px;
}

.div-create-inputs input[type=text]:focus {
    outline: none;
}

.div-note * {
    pointer-events: none;
}
</style>
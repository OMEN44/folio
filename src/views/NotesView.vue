<script setup lang="ts">

import axios from "axios";
import {ref} from "vue";
import store from '@/store'
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import SvgIcon from "@jamescoyle/vue-icon"
import {mdiPlus} from '@mdi/js'

const notes = ref(null)
const selected = ref(0)
const accessLevel = ref(1);
const titleInput = ref('')
const isPrivate = ref(true)

if (store.getters.isAuthenticated) {
  axios.get('http://localhost:3000/access-level', {
    headers: {
      Authorization: `Bearer ${store.getters.token}`
    }
  }).then(response => {
    if (response.data.valid && response.data.access === 0)
      accessLevel.value = 0
  }).catch(() => accessLevel.value = 1)
}

const initNotes = () => {
  axios.get('http://localhost:3000/notes', {
    headers: {
      Authorization: `Bearer ${store.getters.token}`
    }
  }).then(result => {
    if (result.data.value.length > 0) {
      notes.value = result.data.value.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        route: note.route,
        isPrivate: note.private,
        authorId: note['user.id'],
        authorName: note['user.username']
      }))
    }
  }).catch(error => console.log(error))
}

const changeSelection = (e) => {
  selected.value = Number(e.target.id)
  editor.value.changeNote(notes.value[selected.value].content)
}

const deleteNote = () => {
  selected.value = 0;
  initNotes()
  editor.value.changeNote(notes.value[selected.value].content)
}

const editor = ref(null)
initNotes()


// Create new note
const createNote = (e: Event) => {
  e.preventDefault()
  if (titleInput.value !== '') {
    axios.post('http://localhost:3000/notes/create',
        {
          title: titleInput.value,
          access: isPrivate.value,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getters.token}`
          }
        })
        .then(() => {
          console.log('done')
          titleInput.value = '';
          initNotes()
        })
        .catch(error => console.log(error.response.data.error))
  }
}

</script>

<template>
  <div class="div-container">
    <div class="div-menu">
      <span class="circle" id="center"/>
      <div class="div-title">
        <h1>Notes</h1>
        <span class="circle" id="tl"/>
        <span class="circle" id="bl"/>
        <span class="circle" id="center"/>
        <span class="v-shape"/>
      </div>
      <div class="div-menu-body">
        <div class="div-note"
             v-for="(element, index) in notes"
             @click="changeSelection"
             :class="{highlight: index === selected}"
             :id="index">
          <h3>{{ element['title'] }}</h3>
          <span>{{ element['route'] }}</span>
        </div>
        <div class="div-add-note" v-if="!accessLevel">
          <form>
            <input type="text" v-model="titleInput">
            <input type="checkbox" v-model="isPrivate">
            <button class="button-border" @click="createNote">
              <svg-icon type="mdi" :path="mdiPlus"/>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="div-notes-content">
      <div class="div-title">
        <h1 v-if="notes !== null" v-html="notes[selected].title"></h1>
        <span class="circle" id="tr"/>
        <span class="circle" id="br"/>
      </div>
      <MarkdownEditor ref="editor"
                      v-if="notes !== null && notes.length > 0"
                      :raw-markdown="notes[selected].content"
                      :editor-open="accessLevel"
                      :id="notes[selected].id"
                      :private="notes[selected].isPrivate"
                      @note-deleted="deleteNote"
                      @update-note="initNotes"/>
    </div>
  </div>
</template>

<style scoped>
.div-container {
  display: flex;
  margin: 60px 80px;
  border-top: var(--primary) 4px solid;
}

.div-title {
  border-bottom: var(--primary) 4px solid;
  padding: 10px 5px;
  text-align: center;
  position: relative;
  background-color: var(--accent);
}

.div-menu {
  border-right: var(--primary) 4px solid;
  min-width: 200px;
  position: relative;
}

.div-notes-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.div-note * {
  pointer-events: none;
}

.div-add-note {
  display: flex;
  flex-direction: column;
  text-align: center;
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
  transition:0.5s;
  transform-origin:left;
  transform:scaleX(0);
  z-index: -1;
}

.div-note:hover::before {
  transition:transform 0.5s;
  transform-origin:left;
  transform:scaleX(1);
}

/*Circles:*/
.circle {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  z-index: 1;
}

.v-shape:before {
  z-index: 1;
  content:"";
  position: absolute;
  top: 0;
  right: -22px;
  border-width: 20px;
  border-style: solid;
  border-color: var(--primary) transparent transparent transparent;
}

.v-shape:after {
  z-index: 1;
  content:"";
  position: absolute;
  top: -6px;
  right: -22px;
  border-width: 20px;
  border-style: solid;
  border-color: var(--background) transparent transparent transparent;
}

#tl {
  top: -12px;
  left: -10px;
}

#bl {
  bottom: -12px;
  left: -10px;
}

#tr {
  top: -12px;
  right: -10px;
}

#br {
  bottom: -12px;
  right: -10px;
}

#center {
  bottom: -12px;
  right: -12px;
}
</style>
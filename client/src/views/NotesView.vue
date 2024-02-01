<script setup lang="ts">

import { Ref, ref } from "vue";
import store from '../store/index'
import NoteEditor from "../components/NoteEditor.vue";
import getAxios from "../plugins/axios";
import NoteMenu from "../components/NoteMenu.vue";

const notes = ref([])
const activeUser = ref(null);
const editor = ref(null)
const selected = ref(0)

const initNotes = (selection?) => {
  selected.value = selection === undefined ? 0 : selection
  // Ensure user access is restricted
  if (store.getters.isAuthenticated) {
    getAxios().get('auth')
      .then(response => {
        if (response.data.valid)
          activeUser.value = response.data.value
      }).catch(() => activeUser.value = null)
  }
  // format data for dispaly
  getAxios().get('notes')
    .then(result => {
      // Map notes to a new array for dispaly
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
        // Set title to active note
      } else {
        // If there are no notes push a placeholder
        notes.value = [{
          id: -1,
          title: 'No notes found',
          content: 'Login to create a note!',
          route: '',
          isPrivate: false,
        }]
      }
      //update editor component
      editor.value.changeNote(notes.value[selected.value], selected.value)
    }).catch(error => console.log(error))
}

initNotes()

</script>

<template>
  <div class="div-container">
    <div class="div-menu">
      <span class="circle" id="center" />
      <div class="div-title">
        <h1>Notes</h1>
        <span class="circle" id="tl" />
        <span class="circle" id="bl" />
        <span class="circle" id="center" />
        <span class="v-shape" />
      </div>
      <NoteMenu :user="activeUser" :notes="notes" :selected="selected" @update-notes="initNotes" />
    </div>
    <div class="div-notes-content">
      <div class="div-title">
        <h1 v-html="notes[selected] === undefined ? 'No notes found' : notes[selected].title"></h1>
        <span class="circle" id="tr" />
        <span class="circle" id="br" />
      </div>
      <NoteEditor ref="editor" :user="activeUser" @update-note="initNotes" />
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

/*Circles:*/

.v-shape:before {
  z-index: 1;
  content: "";
  position: absolute;
  top: 0;
  right: -22px;
  border-width: 20px;
  border-style: solid;
  border-color: var(--primary) transparent transparent transparent;
}

.v-shape:after {
  z-index: 1;
  content: "";
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
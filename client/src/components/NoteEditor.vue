<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiDelete, mdiContentSave, mdiReload, mdiLock, mdiLockOpenVariant } from '@mdi/js'
import 'highlight.js/styles/github-dark.css'
import getAxios from '../plugins/axios';
import { ref } from 'vue'

const props = defineProps(['user'])
const emit = defineEmits(['updateNote'])

const raw = ref('Nothing selected')
const note = ref<NoteType | null>(null)

// Markdown renderer
import MarkdownIt from "markdown-it";
import MarkdownItHighlightJs from "markdown-it-highlightjs"

import sub from "markdown-it-sub"
import sup from "markdown-it-sup"
import { full as emoji } from "markdown-it-emoji"
import container from "markdown-it-container"
import anchor from "markdown-it-anchor"
import multiTable from "markdown-it-multimd-table"
import taskList from "markdown-it-task-lists"
import mark from "markdown-it-mark"
import { notify } from "../script/notification";
import { NoteType } from "../script/notes";
import Overlay from "./Overlay.vue";
import { onBeforeRouteLeave } from "vue-router";

const md = MarkdownIt()
  .use(MarkdownItHighlightJs)
  .use(sup)
  .use(sub)
  .use(emoji)
  .use(container)
  .use(anchor)
  .use(multiTable)
  .use(taskList)
  .use(mark)

const overlay = ref<InstanceType<typeof Overlay>>()

const changeNote = (newNote, selectedIndex) => {
  if (note.value !== null && note.value !== undefined && raw.value !== note.value.content) {
    overlay.value.openOverlay({
      title: 'Changes are unsaved',
      content: 'Would you like to save changes before leaving',
      buttons: [
        {
          name: 'Yes',
          primary: true,
          action: () => {
            saveNote()
            overlay.value.closeOverlay()
            updateEditor(newNote, selectedIndex)
          }
        },
        {
          name: 'No',
          primary: false,
          action: () => {
            overlay.value.closeOverlay()
            updateEditor(newNote, selectedIndex)
          }
        }
      ]
    })
  } else { updateEditor(newNote, selectedIndex) }
}

const updateEditor = (newNote, selectedIndex) => {
  if (newNote !== undefined) {
    note.value = newNote
    note.value.selectedIndex = selectedIndex
    raw.value = note.value.content
  }
}

const onUpdate = (e?) => {
  const textArea = document.getElementsByTagName('textarea')[0]
  if (e)
    raw.value = e.target.value
  textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px - 52px')
}

const deleteNote = () => {
  if (note.value.id === -1) return;
  overlay.value.openOverlay({
    title: `Delete the note: ${note.value.title}?`,
    buttons: [
      {
        name: 'Yes',
        primary: true,
        action: () => {
          notify(`Deleted the note: ${note.value.title}`)
          getAxios().post('/notes/delete', {
            id: note.value.id
          })
            .then(() => emit('updateNote', 0))
            .catch(error => console.log(error.response.data.error))
          overlay.value.closeOverlay()
        }
      },
      {
        name: 'No',
        primary: false,
        action: () => overlay.value.closeOverlay()
      }
    ]
  })
}

const saveNote = () => {
  notify(`Changes saved`)
  updateNote({
    id: note.value.id,
    content: raw.value,
    isPrivate: note.value.isPrivate
  })
}

const togglePrivate = () => {
  updateNote({
    id: note.value.id,
    content: raw.value,
    isPrivate: !note.value.isPrivate
  })
  note.value.isPrivate = !note.value.isPrivate
  notify(`${note.value.title} is now a ${note.value.isPrivate ? 'private' : 'public'} note.`)
}

const undoChanges = () => {
  overlay.value.openOverlay({
    title: 'Undo all changes?',
    buttons: [
      {
        name: 'Yes',
        primary: true,
        action: () => {
          raw.value = note.value.content
          overlay.value.closeOverlay()
        }
      },
      {
        name: 'No',
        primary: false,
        action: () => overlay.value.closeOverlay()
      }
    ]
  })
}

const updateNote = (noteData) => {
  if (note.value.id === -1) return;
  getAxios().post('/notes/update', noteData)
    .then(() => emit('updateNote', note.value.selectedIndex))
    .catch(error => console.log(error.response.data.error))
}

onBeforeRouteLeave((to, from, next) => {
  if (note.value !== null && note.value !== undefined && raw.value !== note.value.content) {
    overlay.value.openOverlay({
      title: 'Changes are unsaved',
      content: 'Would you like to save changes before leaving',
      buttons: [
        {
          name: 'Yes',
          primary: true,
          action: () => {
            saveNote()
            overlay.value.closeOverlay()
            next()
          }
        },
        {
          name: 'No',
          primary: false,
          action: () => {
            overlay.value.closeOverlay()
            next()
          }
        }
      ]
    })
  } else next()
})

defineExpose({ changeNote })
</script>
<template>
  <overlay ref="overlay" />
  <div class="div-editor-container">
    <div class="div-input" v-if="note !== null && props.user !== null && note.authorId === props.user.userId">
      <span class="circle" />
      <div class="div-input-controls">
        <button class="button-border" @click="saveNote">
          <svg-icon class="icon" type="mdi" :path="mdiContentSave" />
        </button>
        <button class="button-border" @click="undoChanges">
          <svg-icon class="icon" type="mdi" :path="mdiReload" />
        </button>
        <button class="button-border" @click="deleteNote">
          <svg-icon class="icon" type="mdi" :path="mdiDelete" />
        </button>
        <button class="button-border" @click="togglePrivate">
          <svg-icon class="icon" type="mdi" :path="note !== null && note.isPrivate ? mdiLock : mdiLockOpenVariant" />
        </button>
      </div>
      <textarea ref="textArea" :value="raw" @keydown.ctrl.s.prevent.stop="saveNote" @input="onUpdate"></textarea>
    </div>
    <div class="div-output" v-html="md.render(<string>raw)"></div>
  </div>
</template>

<style scoped>
.div-editor-container {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.div-input {
  position: relative;
  width: 40%;
  border-style: none solid none none;
  border-width: 4px;
  border-color: var(--primary);
}

.circle {
  bottom: -12px;
  right: -12px;
}

.div-input-controls {
  display: flex;
  flex-direction: row;
  margin: 5px;
  height: 52px;
}

textarea {
  padding: 5px;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  font-size: 15px;
  color: var(--text);
  background-color: transparent;
}

textarea:focus {
  outline: none;
}

.div-output {
  padding: 10px;
  flex: 1;
}
</style>
<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiDelete, mdiContentSave, mdiReload, mdiLock, mdiLockOpenVariant } from '@mdi/js'
import 'highlight.js/styles/github-dark.css'
import getAxios from '../plugins/axios';
import { ref } from 'vue'

const props = defineProps(['user'])
const emit = defineEmits(['updateNote'])

const raw = ref('Nothing selected')
const note = ref(null)

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

const changeNote = (newNote, selectedIndex) => {
  note.value = newNote
  note.value.selectedIndex = selectedIndex
  raw.value = note.value.content
}

const onUpdate = (e?) => {
  const textArea = document.getElementsByTagName('textarea')[0]
  if (e)
    raw.value = e.target.value
  textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px - 52px')
}

const deleteNote = (e) => {
  if (note.value.id === -1) return;
  getAxios().post('/notes/delete', {
    id: note.value.id
  })
    .then(() => emit('updateNote'))
    .catch(error => console.log(error.response.data.error))
}

const saveNote = () => updateNote({
  id: note.value.id,
  content: raw.value,
  isPrivate: note.value.isPrivate
})

const togglePrivate = () => {
  updateNote({
    id: note.value.id,
    content: raw.value,
    isPrivate: !note.value.isPrivate
  })
  note.value.isPrivate = !note.value.isPrivate
}

const undoChanges = () => raw.value = note.value.content

const updateNote = (noteData) => {
  if (note.value.id === -1) return;
  getAxios().post('/notes/update', noteData)
    .then(() => emit('updateNote', note.value.selectedIndex))
    .catch(error => console.log(error.response.data.error))
}

defineExpose({ changeNote })
</script>
<template>
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
      <textarea ref="textArea" :value="raw" @input="onUpdate"></textarea>
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
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  bottom: -12px;
  right: -12px;
  z-index: 1;
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
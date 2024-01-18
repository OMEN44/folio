<script setup lang="ts">
import {watch, defineProps, onMounted, ref} from 'vue'

const props = defineProps(['rawMarkdown', 'editorOpen', 'id', 'private'])
const emit = defineEmits(['noteDeleted', 'updateNote'])

const raw = ref(null)

// Mark down imports
import MarkdownIt from "markdown-it";
import MarkdownItHighlightJs from "markdown-it-highlightjs"

import sub from "markdown-it-sub"
import sup from "markdown-it-sup"
import {full as emoji} from "markdown-it-emoji"
import container from "markdown-it-container"
import anchor from "markdown-it-anchor"
import multiTable from "markdown-it-multimd-table"
import taskList from "markdown-it-task-lists"
import mark from "markdown-it-mark"

//icon imports
import SvgIcon from "@jamescoyle/vue-icon"
import {mdiClose, mdiContentSave, mdiReload} from '@mdi/js'

import 'highlight.js/styles/github-dark.css'
import axios from "axios";
import store from '@/store'

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


const changeNote = (content) => raw.value = content
const onUpdate = (e) => {
  raw.value = e.target.value
  e.target.style.height = 'auto';
  e.target.style.height = (e.target.scrollHeight) + 'px';
}
const onTextareaLoad = (e) => {
  e.target.style.height = (e.target.scrollHeight) + 'px;overflow-y:hidden;';
}

watch(raw, () => {
  const textArea = document.getElementsByTagName('textarea')[0]
  textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px;overflow-y:hidden;');
})

raw.value = props.rawMarkdown

defineExpose({changeNote})

const deleteNote = (e) => {
  if (props.id === -1) return;
  axios.post('http://localhost:3000/notes/delete',
      {
        id: props.id
      },
      {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      })
      .then(() => emit('noteDeleted'))
      .catch(error => console.log(error.response.data.error))
}

const saveNote = (e) => {
  if (props.id === -1) return;
  axios.post('http://localhost:3000/notes/update',
      {
        id: props.id,
        content: raw.value,
        access: props.private
      },
      {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      })
      .then(() => emit('updateNote'))
      .catch(error => console.log(error.response.data.error))
}

const undoChanges = (e) => raw.value = props.rawMarkdown

</script>

<template>
  <div class="div-editor-container">
    <div class="div-input" :class="{hidden: props.editorOpen !== 0}">
      <div class="div-input-controls">
        <button class="button-border" @click="saveNote">
          <svg-icon class="icon" type="mdi" :path="mdiContentSave"/>
        </button>
        <button class="button-border" @click="undoChanges">
          <svg-icon class="icon" type="mdi" :path="mdiReload"/>
        </button>
        <button class="button-border" @click="deleteNote">
          <svg-icon class="icon" type="mdi" :path="mdiClose"/>
        </button>
      </div>
      <textarea :value="raw"
                @input="onUpdate"
                @load="onTextareaLoad"></textarea>
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
  width: 40%;
  border-style: none solid none none;
  border-width: 4px;
  border-color: var(--primary);
}

.div-input-controls {
  display: flex;
  flex-direction: row;
  margin: 5px;
}

textarea {
  padding: 5px;
  width: 100%;
  height: fit-content;
  resize: none;
  border: none;
  font-size: 15px;
  color: var(--text);
  background-color: var(--background);
}

textarea:focus {
  outline: none;
}

.div-output {
  padding: 10px;
  flex: 1;
}
</style>
<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiDelete, mdiContentSave, mdiReload, mdiLock, mdiLockOpenVariant } from '@mdi/js'
import { onBeforeRouteLeave } from "vue-router";
import { Note, RawMarkdown, deleteNote, onUpdate, overlay, saveNote, togglePrivate, undoChanges, textArea } from "../script/noteEditor";

const props = defineProps(['user'])

watch(() => textArea.value?.scrollHeight, () => {
  console.log('change')
})

// Markdown renderer
import MarkdownIt from "markdown-it";
import MarkdownItHighlightJs from "markdown-it-highlightjs"
import 'highlight.js/styles/github-dark.css'
import sub from "markdown-it-sub"
import sup from "markdown-it-sup"
import { full as emoji } from "markdown-it-emoji"
import container from "markdown-it-container"
import anchor from "markdown-it-anchor"
import multiTable from "markdown-it-multimd-table"
import taskList from "markdown-it-task-lists"
import mark from "markdown-it-mark"
import Overlay from "./Overlay.vue";
import { watch } from "vue";
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



onBeforeRouteLeave((to, from, next) => {
  if (Note.value.id !== -1 && RawMarkdown.value !== Note.value.content) {
    overlay.value?.openOverlay({
      title: 'Changes are unsaved',
      content: `Would you like to save changes before leaving\n${RawMarkdown.value} !== ${Note.value.content}`,
      buttons: [
        {
          name: 'Yes',
          primary: true,
          action: () => {
            saveNote()
            overlay.value?.closeOverlay()
            next()
          }
        },
        {
          name: 'No',
          primary: false,
          action: () => {
            overlay.value?.closeOverlay()
            next()
          }
        }
      ]
    })
  } else next()
})

</script>
<template>
  <overlay ref="overlay" />
  <div class="div-editor-container">
    <div class="div-input" v-if="Note !== null && props.user !== null && Note.authorId === props.user.userId">
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
          <svg-icon class="icon" type="mdi" :path="Note !== null && Note.isPrivate ? mdiLock : mdiLockOpenVariant" />
        </button>
      </div>
      <textarea ref="textArea" :value="RawMarkdown" @keydown.ctrl.s.prevent.stop="saveNote" @input="onUpdate"></textarea>
    </div>
    <div class="div-output" v-html="md.render(<string>RawMarkdown)"></div>
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

@media (max-width: 1100px) {
  .div-editor-container {
    flex-direction: column;
  }

  .div-input {
    width: auto;
    height: fit-content;
    border-style: none none solid none;
    border-width: 4px;
    border-color: var(--primary);
  }
}
</style>
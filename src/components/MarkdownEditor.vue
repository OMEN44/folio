<script setup lang="ts">
import {watch, defineProps, onMounted, ref} from 'vue'

const props = defineProps(['rawMarkdown', 'editorOpen'])
const raw = ref(null)

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

import 'highlight.js/styles/github-dark.css'

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

</script>

<template>
  <div class="div-editor-container">
    <div class="div-input" :class="{hidden: props.editorOpen !== 0}">
      <div class="div-input-controls">
        <button>Save</button>
        <button>Discard changes</button>
        <button>Delete note</button>
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

}

textarea {
  padding-left: 5px;
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
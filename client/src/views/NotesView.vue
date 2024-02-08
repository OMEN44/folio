<script setup lang="ts">

import { watch } from "vue";
import NoteEditor from "../components/NoteEditor.vue";
import NoteMenu from "../components/NoteMenu.vue";
import { ActiveUser, Notes, Selected, initNotes } from "../script/notes";
import { useRoute } from "vue-router";

watch(() => useRoute(), () => {
  initNotes()
})

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
      <NoteMenu :user="ActiveUser" :notes="Notes" :selected="Selected" @update-notes="initNotes" />
    </div>
    <div class="div-notes-content">
      <div class="div-title">
        <h1 v-html="Notes[Selected] === undefined ? 'No notes found' : Notes[Selected].title"></h1>
        <span class="circle" id="tr" />
        <span class="circle" id="br" />
      </div>
      <NoteEditor :user="ActiveUser" />
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
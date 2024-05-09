<script setup lang="ts">

import { watch } from "vue";
import NoteEditor from "../components/NoteEditor.vue";
import NoteMenu from "../components/NoteMenu.vue";
import { ActiveUser, Notes, Selected, initNotes, showMenu, editTitle, TitleEditorActive, titleInput, saveTitle } from "../script/notes";
import { useRoute } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiMenu, mdiContentSave } from '@mdi/js'

watch(() => useRoute(), () => {
  initNotes()
})

initNotes()

window.matchMedia('(max-width: 800px)').addEventListener('change', (e) => {
  if (e.matches)
    showMenu.value = false
})

</script>

<template>
  
  <div class="div-container">
    <div class="div-menu" :class="{ 'show-menu': showMenu }">
      <div class="div-title">
        <h1>Notes</h1>
        <span class="circle tl" />
        <span class="circle bl" />
        <span class="v-shape" />
        <span class="arrow" />
        <span class="angle-tr" />
      </div>
      <div class="div-note-menu" style="background-color: cadetblue;"></div>
      <!-- <NoteMenu :user="ActiveUser" :notes="Notes" :selected="Selected" @update-notes="initNotes" /> -->
      <span class="circle tl mobile" />
      <span class="circle bl mobile" />
    </div>
    <div class="div-notes-content">
      <!-- <span class="angle-tl" /> -->
      <div class="div-title" @dblclick="editTitle">
        <button class="button-menu" @click="showMenu = !showMenu">
          <svg-icon class="icon" type="mdi" :path="mdiMenu" />
        </button>
        <h1 v-if="!TitleEditorActive" v-text="Notes[Selected] === undefined ? 'No notes found' : Notes[Selected].title">
        </h1>
        <!-- Edit title -->
        <form v-if="TitleEditorActive" class="form-title-editor">
          <input type="text" v-model="titleInput" maxlength="24"
            :placeholder="Notes[Selected] === undefined ? 'No notes found' : Notes[Selected].title" autofocus>
          <button @click.prevent="saveTitle">
            <svg-icon type="mdi" class="icon" :path="mdiContentSave" />
          </button>
        </form>
        <span class="circle tr" />
        <span class="circle br" />
        <span class="circle" id="center" />
      </div>
      <span class="circle" id="center" />
      <!-- <NoteEditor :user="ActiveUser" /> -->
      <div class="div-note-editor" style="background-color: darkcyan;"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.div-container {
  display: flex;
  margin: 60px 80px;
  border-top: var(--primary) 4px solid;

  @media (max-width: 1000px) {
    margin: 40px 0;
  }
}

.div-title {
  border-bottom: 4px solid var(--primary);
  display: flex;
  flex-direction: row;
  position: relative;

  h1 {
    margin: auto 5px;
  }

  .angle-tr {
    display: none;
  }
}

.div-menu {
  min-width: 25%;
  border-right: 4px solid var(--primary);

  @media (max-width: 800px) {
    display: none;
  }
}

.show-menu {
  display: block;
}

.div-notes-content {
  flex: 1;

  @media (max-width: 800px) {
    
  }
}


@media (max-width: 800px) {
  .circle {
    display: none;
  }

  .v-shape {
    display: none;
  }
}

// .form-title-editor {
//   margin: 0 10px;
//   display: flex;
//   flex-direction: row;
//   height: 48px;
//   width: 100%;

//   input {
//     flex: 1;
//     font-size: 2em;
//     width: 100%;
//     background-color: transparent;
//     color: var(--text);
//     border: none;

//     &:focus {
//       outline: none;
//     }
//   }

//   button {
//     background-color: transparent;
//     border: none;
//     padding-top: 3px;
//     height: 100%;
//     width: 50px;

//     &:focus {
//       outline: none;
//     }
//   }

//   .icon {
//     width: 40px;
//     height: 40px;
//   }
// }

// .div-container {
//   display: flex;
//   margin: 60px 80px;
//   border-top: var(--primary) 4px solid;
// }

// .div-title {
//   border-bottom: var(--primary) 4px solid;
//   padding: 10px 5px;
//   text-align: center;
//   position: relative;
//   background-color: var(--accent);
//   display: flex;
//   flex-direction: row;
// }

// h1 {
//   margin: auto;
// }

// .div-menu {
//   min-width: 300px;
//   position: relative;
// }

// .div-notes-content {
//   border-left: var(--primary) 4px solid;
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   position: relative;
//   width: 100%;
// }

// .button-menu {
//   display: none;
// }

// .icon {
//   transition: color 0.5s;
// }

// .icon:hover {
//   color: var(--primary);
//   cursor: pointer;
// }

// /*Circles:*/

// .mobile {
//   display: none;
// }

// .angle-tl::after,
// .angle-tl::before {

//   z-index: 3;
//   top: -4px;
//   left: -4px;
// }

// .tl {
//   top: -12px;
//   left: -10px;
// }

// .bl {
//   bottom: -12px;
//   left: -10px;
// }

// .tr {
//   top: -12px;
//   right: -10px;
// }

// .br {
//   bottom: -12px;
//   right: -10px;
// }

// .arrow::after,
// .arrow::before {
//   display: none;
// }

// .angle-tr::after,
// .angle-tr::before {
//   display: none;
// }

// #center {
//   bottom: -12px;
//   left: -12px;
// }

// @media (max-width: 1000px) {
//   .mobile {
//     display: block;
//   }

//   .div-container {
//     margin: 60px 0;
//   }

//   .div-menu {
//     display: none;
//   }

//   .button-menu {
//     display: block;
//     margin: 0;
//     background-color: transparent;
//     border: none;
//     padding: 3px 0 0 5px;
//   }

//   .show-menu {
//     z-index: 4;
//     background-color: var(--background);
//     border: 4px var(--primary);
//     border-style: solid solid none solid;
//     display: block;
//     position: absolute;
//     margin: 70px 0 0 25px;
//   }

//   .show-menu .v-shape {
//     display: none;
//   }

//   .tl {
//     top: auto;
//     left: auto;
//     bottom: -12px;
//     right: -12px;
//   }

//   .arrow::before {
//     display: block;
//     content: "";
//     position: absolute;
//     top: -25px;
//     left: -4px;
//     border-width: 0 25px 25px 0;
//     border-style: solid;
//     border-color: var(--primary) transparent;
//   }

//   .arrow:after {
//     display: block;
//     content: "";
//     position: absolute;
//     top: -15px;
//     left: 0;
//     border-width: 0 19px 19px 0;
//     border-style: solid;
//     border-color: var(--accent) transparent;
//   }

//   .angle-tr::after,
//   .angle-tr::before {
//     display: block;
//     top: -4px;
//     right: -4px;
//   }
// }
</style>
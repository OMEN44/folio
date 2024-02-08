<script setup>
import TextBox from './TextBox.vue';
import { ref } from 'vue';
import getAxios from '../plugins/axios';
import { notify } from '../script/notification';
import { updateTimeline } from '../script/timeline';

const errorMessage = ref('')
const notes = ref([])
const editorOptions = ref({
  title: '',
  date: '',
  about: '',
  noteId: -1
})

// setup

getAxios().get('/notes/public')
  .then((res) => {
    if (res.data.value.length > 0) {
      res.data.value.forEach((note) => {
        notes.value.push({
          label: `${note.title} - By ${note['user.username']}`,
          id: note.id
        })
      })
    }
  })

const createEvent = (e) => {
  e.preventDefault(e)
  if (editorOptions.value.title === '' || editorOptions.value.title === '' || editorOptions.value.about === '') {
    errorMessage.value = 'Must fill all inputs!'
    return
  }
  getAxios().post('/timeline/create', editorOptions.value)
    .then(response => {
      errorMessage.value = response.data.message
      editorOptions.value.title = ''
      editorOptions.value.about = ''
      editorOptions.value.date = ''
      updateTimeline()
      notify('Created new timeline event.')
    }).catch(error => {
      errorMessage.value = error.response.data.error
    })
}
</script>

<template>
  <TextBox title="Create new event" class="div-create-event" :width="editorWidth">
    <form class="form-create">
      <div class="form-top">
        <div>
          <label>Title</label><input v-model="editorOptions.title" type="text">
        </div>
        <div style="margin-left: 10px">
          <label>Date</label><input v-model="editorOptions.date" type="date">
        </div>
      </div>
      <label>About</label><textarea v-model="editorOptions.about" style="max-width: calc(100%)"></textarea>
      <label>Select a public note to link with the event</label>
      <select v-model="editorOptions.noteId">
        <option value="-1">No note yet</option>
        <option v-for="note in notes" :value="note.id">{{ note.label }}</option>
      </select>
      <div class="form-top">
        <button @click="createEvent">Submit</button>
        <span v-html="errorMessage"></span>
      </div>
    </form>
  </TextBox>
</template>

<style scoped>
.div-create-event {
  margin: 0 auto 20px auto;
  position: relative;
}

.form-create {
  display: flex;
  flex-direction: column;
}

.form-top {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}

.form-create label {
  display: block;
}

.form-create button {
  margin-top: 10px;
  width: 150px;
}

.form-top span {
  margin: 12px 0 0 5px;
}

label {
  margin-top: 8px;
}
</style>
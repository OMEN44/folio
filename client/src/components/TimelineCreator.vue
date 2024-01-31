<script setup>
import TextBox from './TextBox.vue';
import { ref } from 'vue';
import getAxios from '../plugins/axios';
import { notify } from '../script/notification';

const emit = defineEmits(['updateTimeline'])

const errorMessage = ref('')
const editorOptions = ref({
  title: '',
  date: '',
  about: ''
})

const createEvent = (e) => {
  e.preventDefault(e)
  if (editorOptions.value.title === '' || editorOptions.value.title === '' || editorOptions.value.about === '') {
    errorMessage.value = 'Must fill all inputs!'
    return
  }
  getAxios().post(
    '/timeline/create',
    {
      title: editorOptions.value.title,
      about: editorOptions.value.about,
      date: editorOptions.value.date
    }
  ).then(response => {
    errorMessage.value = response.data.message
    editorOptions.value.title = ''
    editorOptions.value.about = ''
    editorOptions.value.date = ''
    emit('updateTimeline')
    notify('Created new timeline event.')
  }).catch(error => {
    errorMessage.value = error.response.data.error
  })
}
</script>

<template>
  <TextBox title="Create new event" class="div-create-event" :width="500">
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
</style>
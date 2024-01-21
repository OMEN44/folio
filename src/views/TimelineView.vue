<script setup lang="ts">
import TimelineEvent from "../components/TimelineEvent.vue";
import { ref } from "vue";

import SvgIcon from "@jamescoyle/vue-icon"
import { mdiClose } from '@mdi/js'
import store from '../store/index'
import TextBox from "../components/TextBox.vue";
import { getCurrentInstance } from 'vue';
import TimelineSeach from "../components/TimelineSeach.vue";
import http from '../plugins/axios'

const axios = getCurrentInstance().appContext.config.globalProperties.$axios

const timelineDisplayData = ref(null)
const loggedIn = ref(false)

const checkAccess = () => {
  if (store.getters.isAuthenticated) {
    axios.get('/access-level')
      .then(response => {
        console.log(response.data)
        console.log(store.getters.token);
        if (response.data.valid && response.data.access === 0) {
          loggedIn.value = true
        }
      }).catch(() => loggedIn.value = false)
  }
}

checkAccess()

const initTimeline = (filters?) => {
  axios.get('/timeline')
    .then(response => {
        console.log('2');        
      if (response.data.value === undefined) return
      let timelineData = response.data.value.sort((a, b) => {
        return a.date > b.date ? 1 : -1
      })
      let currentYear = 0
      response.data.value.forEach((element) => {
        if (new Date(element.date).getFullYear() > currentYear) {
          currentYear = new Date(element.date).getFullYear()
          element.newYear = true
        }
      })
      timelineDisplayData.value = timelineData.map((project) => ({
        id: project.id,
        title: project.title,
        about: project.about,
        route: null,
        newYear: (project.newYear !== undefined),
        date: new Date(project.date)
      }))
      timelineDisplayData.value.sort((a, b) => {
        if (filters.newest)
          return a.date < b.date ? 1 : -1
        else
          return a.date > b.date ? 1 : -1
      })
    })
}

initTimeline()

const createTitle = ref('')
const createDate = ref('')
const createAbout = ref('')
const createEventError = ref('')

const createEvent = (e) => {
  e.preventDefault(e)
  checkAccess()
  if (createTitle.value === '' || createDate.value === '' || createAbout.value === '') {
    createEventError.value = 'Must fill all inputs!'
    return
  }
  if (loggedIn.value) {
    axios.post(
      '/timeline',
      {
        title: createTitle.value,
        about: createAbout.value,
        date: createDate.value
      }
    ).then(response => {
      console.log(response.data.message)
      createEventError.value = response.data.message
      initTimeline()
      createTitle.value = ''
      createDate.value = ''
      createAbout.value = ''
    }).catch(error => {
      createEventError.value = error.response.data.error
    })
  }
}

</script>

<template>
  <div class="container">
    <div class="div-intro">
      <h1>What is this?</h1>
      <p>I have been interested in robots and computers for as long as I can remember, this passion has sparked many
        projects starting from humble lego and taking me to where I am today. This timeline showcases most (or at least
        the ones that got close to finished) of my projects, including images and links to dedicated pages where
        possible.<br />I hope that at least one of the entries can inspire someone, somewhere to start their own project!
      </p>
    </div>
    <TextBox title="Create new event" v-if="loggedIn" class="div-create-event" :width="500">
      <form class="form-create">
        <div class="form-top">
          <div>
            <label>Title</label><input v-model="createTitle" type="text">
          </div>
          <div style="margin-left: 10px">
            <label>Date</label><input v-model="createDate" type="date">
          </div>
        </div>
        <label>About</label><textarea v-model="createAbout" style="max-width: calc(100%)"></textarea>
        <div class="form-top">
          <button @click="createEvent">Submit</button>
          <span v-html="createEventError"></span>
        </div>
      </form>
    </TextBox>
    <TimelineSeach />
    <div class="div-timeline">
      <timeline-event @event-deleted="initTimeline" v-for="(item) in timelineDisplayData" v-bind="item" />
    </div>
  </div>
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

.container {
  margin: 0 10%;
}

.div-intro {
  text-align: center;
  padding: 50px 50px;
}

.div-timeline {
  margin: 20px;
  padding-left: 40px;
  border-left: solid 4px var(--primary);
}

.hidden {
  display: none;
}
</style>
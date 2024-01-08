<script setup lang="ts">
import TimelineEvent from "@/components/TimelineEvent.vue";
import { ref, onMounted, onBeforeMount } from "vue";

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTagSearch, mdiFilter, mdiClose } from '@mdi/js'
import axios from "axios";
import store from '@/store'
import TextBox from "@/components/TextBox.vue";

const timelineData = ref(null)
const timelineDisplayData = ref(null)
const searchValue = ref('')
const filterHidden = ref(true)

const oldestFirst = ref(true)
const newestFirst = ref(false)
const onlyLinks = ref(false)
const loggedIn = ref(false)

const checkAccess = () => {
  if (store.getters.isAuthenticated) {
    axios.get('http://localhost:3000/access-level', {
      headers: {
        Authorization: `Bearer ${store.getters.token}`
      }
    }).then(response => {
      if (response.data.valid && response.data.access === 0)
        loggedIn.value = true
    }).catch(() => loggedIn.value = false)
  }
}

const initTimeline = () => {
  axios.get('http://localhost:3000/timeline')
      .then(response => {
        timelineData.value = response.data.data
        timelineData.value = timelineData.value.sort((a, b) => {
          return a.date > b.date ? 1 : -1
        })
        let currentYear = 0
        timelineData.value.forEach((element) => {
          if (new Date(element.date).getFullYear() > currentYear) {
            currentYear = new Date(element.date).getFullYear()
            element.newYear = true
          }
        })
        resetTimeline()
      })
}

checkAccess()
initTimeline()

const resetTimeline = () => {
  timelineDisplayData.value = timelineData.value.map((project) => ({
    id: project.id,
    title: project.title,
    about: project.about,
    route: null,
    newYear: (project.newYear !== undefined),
    date: new Date(project.date)
  }))
  timelineDisplayData.value.sort((a, b) => {
    if (oldestFirst.value)
      return a.date > b.date ? 1 : -1
    else if (newestFirst.value)
      return a.date < b.date ? 1 : -1
  })
}

const cancel = () => {
  resetTimeline();
  searchValue.value = '';
}

const search = (e) => {
  e.preventDefault()
  resetTimeline()
  if (searchValue.value === '') return

  timelineDisplayData.value = timelineDisplayData.value
      .filter(project => {
        return project.title.toLowerCase().includes(searchValue.value.toLowerCase())
            || project.about.toLowerCase().includes(searchValue.value.toLowerCase())
      })

  timelineDisplayData.value = timelineDisplayData.value.sort((a, b) => {
    return a.date > b.date ? 1 : -1
  })
  let currentYear = 0
  timelineDisplayData.value.forEach((element) => {
    if (new Date(element.date).getFullYear() > currentYear) {
      currentYear = new Date(element.date).getFullYear()
      element.newYear = true
    }
  })
}
const openFilter = () => filterHidden.value = !filterHidden.value
const filterClick = (e) => {
  try {
    if (e.originalTarget.attributes.id.value === 'newestFirst') {
      oldestFirst.value = false
      timelineDisplayData.value.sort((a, b) => {
        return a.date < b.date ? 1 : -1
      })
    } else if (e.originalTarget.attributes.id.value === 'oldestFirst') {
      newestFirst.value = false
      resetTimeline()
    } else if (e.originalTarget.attributes.id.value === 'onlyLinks') {
      if (!onlyLinks.value)
        timelineDisplayData.value = timelineDisplayData.value
            .filter(project => {
              return project.route !== null
            })
      else
        resetTimeline()
    }
  } catch (e) {}
}

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
        'http://localhost:3000/timeline',
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
      <p>I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. This timeline showcases most (or at least the ones that got close to finished) of my projects, including images and links to dedicated pages where possible.<br/>I hope that at least one of the entries can inspire someone, somewhere to start their own project!</p>
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
    <form class="filter">
      <input class="input-filter" v-model="searchValue" placeholder="Search Timeline">
      <button class="button-filter" type="button" @click="cancel">
        <svg-icon class="icon" type="mdi" :size="30" :path="mdiClose"></svg-icon>
      </button>
      <button class="button-filter" type="submit" @click="search">
        <svg-icon class="icon" type="mdi" :size="30" :path="mdiTagSearch"></svg-icon>
      </button>
      <button class="button-filter" @click="openFilter" type="button">
        <svg-icon class="icon" type="mdi" :size="30" :path="mdiFilter"></svg-icon>
      </button>
      <span class="span-bl"/>
      <span class="span-tl"/>
      <span class="span-br"/>
      <span class="span-tr"/>
      <form id="filter" @click="filterClick" class="filter-menu" :class="{hidden: filterHidden}">
        <label><input id="oldestFirst"  v-model="oldestFirst" type="checkbox"/>Oldest to newest</label>
        <label><input id="newestFirst"  v-model="newestFirst" type="checkbox"/>Newest to Oldest</label>
        <label><input id="onlyLinks"    v-model="onlyLinks"   type="checkbox"/>Only projects with links</label>
      </form>
    </form>
    <div class="div-timeline">
      <timeline-event
          @event-deleted="initTimeline"
          v-for="(item, index) in timelineDisplayData"
          v-bind="item"
      />
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

.filter-menu {
  background-color: var(--accent);
  width: 250px;
  padding: 10px;
  position: absolute;
  right: -10px;
  top: 45px;
  margin: 15px;
  z-index: 10;
  border: var(--primary) solid 4px;
  display: flex;
  flex-direction: column;
}

.filter-menu input {
  margin-right: 10px;
  border: var(--primary) solid 2px;
}

.filter-menu:before {
  content: '';
  width: 15px;
  height: 15px;
  border: 10px solid;
  position: absolute;
  top: -24px;
  right: 3px;
  border-color: transparent transparent var(--primary) transparent;
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

.filter {
  margin: 0 auto;
  display: flex;
  position: relative;
  width: 80%;
  background-color: var(--accent);
  flex-direction: row;
  justify-content: space-between;
  border: var(--primary) solid;
  border-width: 4px 0 4px 4px;
}

.input-filter {
  width: 90%;
  height: 40px;
  border: none;
  padding-left: 15px;
  font-size: 18px;
  background-color: transparent;
  color: var(--text);
}

.input-filter:focus {
  outline: none;
}

.button-filter {
  border: none;
  background-color: transparent;
}

.span-tl:before {
  content:"";
  position: absolute;
  border-width: 20px 20px 0 0;
  left: -4px;
  top: -4px;
  border-style: solid;
  border-color: var(--primary) transparent;
}

.span-tl:after {
  content:"";
  position: absolute;
  border-width: 14px 14px 0 0;
  left: -4px;
  top: -4px;
  border-style: solid;
  border-color: var(--background) transparent;
}

.span-bl:before {
  content:"";
  position: absolute;
  left: -4px;
  bottom: -4px;
  border-width: 20px 0 0 20px;
  border-style: solid;
  border-color: transparent var(--primary);
}

.span-bl:after {
  content:"";
  position: absolute;
  left: -4px;
  bottom: -4px;
  border-width: 14px 0 0 14px;
  border-style: solid;
  border-color: transparent var(--background);
}

.span-tr {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  right: -12px;
  top: -12px;
}

.span-br {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  right: -12px;
  bottom: -12px;
}

.hidden {
  display: none;
}
</style>
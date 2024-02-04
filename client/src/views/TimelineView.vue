<script setup lang="ts">
import TimelineEvent from "../components/TimelineEvent.vue";
import { ref } from "vue";
import store from '../store/index'
import TimelineSeach from "../components/TimelineSeach.vue";
import getAxios from "../plugins/axios";
import TimelineCreator from "../components/TimelineCreator.vue";
import { TimelineEventType } from "../script/timeline";

const timelineDisplayData = ref<TimelineEventType | null>(null)
const accessLevel = ref(3)

const updateTimeline = (filters?) => {
  // If logged in check users access level
  if (store.getters.isAuthenticated) {
    getAxios().get('/auth')
      .then(response => {
        if (response.data.valid)
          accessLevel.value = response.data.value.access
      }).catch(() => { })
  }

  // Get timeline data and format it
  getAxios().get('/timeline')
    .then(response => {
      if (response.data.value === undefined) return
      let rawData = response.data.value
      // filter for links option on filter
      if (filters && filters.onlyLinks)
        rawData = response.data.value.filter(event => {
          return event.noteId !== null
        })
      // Filter for search term
      if (filters && filters.searchTerm !== '') {
        rawData = rawData.filter(event => {
          return event.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
            || event.about.toLowerCase().includes(filters.searchTerm.toLowerCase())
            || event.date.toLowerCase().includes(filters.searchTerm.toLowerCase())
        })
      }
      // sort by date
      rawData.sort((a, b) => {
        if (filters && filters.newest)
          return a.date < b.date ? 1 : -1
        else
          return a.date > b.date ? 1 : -1
      })
      // give first event in the year the newYear tag
      let currentYear = (filters && filters.newest) ? 10000 : 0
      rawData.forEach((event) => {
        let isFirst = false
        const fullYear = new Date(event.date).getFullYear()
        if (filters && filters.newest)
          isFirst = fullYear < currentYear
        else
          isFirst = fullYear > currentYear
        if (isFirst) {
          currentYear = fullYear
          event.newYear = true
        }
      })
      // Format the raw Data for display
      timelineDisplayData.value = rawData.map((project) => ({
        id: project.id,
        title: project.title,
        about: project.about,
        noteId: project.noteId,
        newYear: (project.newYear !== undefined),
        date: new Date(project.date)
      }))
    })
}

updateTimeline()
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
    <Timeline-creator v-if="accessLevel < 2" @updateTimeline="updateTimeline" />
    <Timeline-seach @updateTimeline="updateTimeline" />
    <div class="div-timeline">
      <timeline-event @event-deleted="updateTimeline" v-for="(item) in timelineDisplayData" :event-data="item"
        :access-level="accessLevel" />
    </div>
  </div>
</template>

<style scoped>
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
</style>
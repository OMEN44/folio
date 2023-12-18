<script setup>
import TimelineEvent from "@/components/TimelineEvent.vue";
import { ref, onMounted, onBeforeMount } from "vue";

import data from '../assets/projects.json'

const timelineData = ref(
  data.projects.map((project) => ({
    title: `${project.year} - ${project.name}`,
    route: project.route,
    image: project.image,
    about: project.description
  }))
)

</script>

<template>
  <div class="div-intro">
    <h2>What is this?</h2>
    <p>I have been interested in robots and computers for as long as i can remember. This passion has sparked many projects starting from humble lego taking me to where i am today. This timeline show cases most (or atleast the ones that got close to finished) of my projects, including images and links to dedicated pages where possible. I hope that atleast one of the entries can inspire someone somewhere to start their own project!</p>
  </div>
  <div class="div-timeline">
    <timeline-event v-for="(item, index) in timelineData" v-bind="item"/>
  </div>
</template>

<style scoped>
.div-intro {
  text-align: center;
  padding: 50px 100px;
}

.div-timeline {
  margin: 20px;
  padding-left: 35px;
  border-left: solid 4px var(--primary);
}
</style>
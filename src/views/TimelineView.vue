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

fetch("http://localhost:3000/")
    .then(response => { return response.json() })
    .then(data => {
      console.log(data);
    })

</script>

<template>
  <div class="container">
    <div class="div-intro">
      <h1>What is this?</h1>
      <p>I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. This timeline showcases most (or at least the ones that got close to finished) of my projects, including images and links to dedicated pages where possible.<br/>I hope that at least one of the entries can inspire someone, somewhere to start their own project!</p>
    </div>
    <div class="filter">
      
    </div>
    <div class="div-timeline">
      <timeline-event v-for="(item, index) in timelineData" v-bind="item"/>
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
  padding-left: 35px;
  border-left: solid 4px var(--primary);
}
</style>
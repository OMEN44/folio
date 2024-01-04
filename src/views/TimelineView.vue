<script setup>
import TimelineEvent from "@/components/TimelineEvent.vue";
import { ref, onMounted, onBeforeMount } from "vue";

import data from '../assets/projects.json'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTagSearch, mdiFilter } from '@mdi/js'

const timelineData = ref(
  data.projects.map((project) => ({
    title: `${project.year} - ${project.name}`,
    route: project.route,
    image: project.image,
    about: project.description
  }))
)

/*axios.get('http://localhost:3000/api/protected', {
  headers: {
    Authorization: `Bearer ${store.getters.token}`
  }
}).then(res => {
  console.log(res.data)
}).catch(error => {
  console.log("nut")
})*/

</script>

<template>
  <div class="container">
    <div class="div-intro">
      <h1>What is this?</h1>
      <p>I have been interested in robots and computers for as long as I can remember, this passion has sparked many projects starting from humble lego and taking me to where I am today. This timeline showcases most (or at least the ones that got close to finished) of my projects, including images and links to dedicated pages where possible.<br/>I hope that at least one of the entries can inspire someone, somewhere to start their own project!</p>
    </div>
    <div class="filter">
      <input class="input-filter">
      <button class="button-filter">
        <svg-icon class="icon" type="mdi" :size="30" :path="mdiTagSearch"></svg-icon>
      </button>
      <button class="button-filter">
        <svg-icon class="icon" type="mdi" :size="30" :path="mdiFilter"></svg-icon>
      </button>
      <span class="span-bl"/>
      <span class="span-tl"/>
      <span class="span-br"/>
      <span class="span-tr"/>
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

.filter {
  margin: 0 auto;
  display: flex;
  position: relative;
  width: 80%;
  background-color: var(--secondary-transparent);
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

.icon {
  transition: color 0.5s;
  color: var(--text);
}

.icon:hover {
  color: var(--primary)
}
</style>
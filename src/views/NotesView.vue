<script setup lang="ts">

import axios from "axios";
import {ref} from "vue";

/*axios.get('http://localhost:3000/api/protected', {
  headers: {
    Authorization: `Bearer ${store.getters.token}`
  }
}).then(res => {
  console.log(res.data)
}).catch(error => {
  console.log("nut")
})*/

const dummyData = ref([
  {
    name: 'example1',
    route: '/example-route1'
  },
  {
    name: 'example2',
    route: '/example-route2'
  },
  {
    name: 'example3',
    route: '/example-route3'
  },
  {
    name: 'example4',
    route: '/example-route4'
  }
])

const selected = ref(2)

const dummyMarkdown = ref(`
# This is a header!
paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph
paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph
paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph

## Small header
balls

## Another SMall header
Hello world!

`)

</script>

<template>
  <div class="div-container">
    <div class="div-menu">
      <span class="circle" id="center"/>
      <div class="div-title">
        <h1>Notes</h1>
        <span class="circle" id="tl"/>
        <span class="circle" id="bl"/>
        <span class="circle" id="center"/>
        <span class="v-shape"/>
      </div>
      <div class="div-menu-body">
        <div class="div-note" v-for="(element, index) in dummyData" :class="{highlight: index === selected}">
          <h3>{{ element.name }}</h3>
          <span>{{ element.route }}</span>
        </div>
      </div>
    </div>
    <div class="div-content">
      <div class="div-title">
        <h1>Example</h1>
        <span class="circle" id="tr"/>
        <span class="circle" id="br"/>
      </div>
      <div class="div-content-body" v-html="dummyMarkdown">

      </div>
    </div>
  </div>
</template>

<style scoped>
.div-container {
  display: flex;
  flex-direction: row;
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
  width: fit-content;
  min-width: 200px;
  position: relative;
}

.div-content {
  width: 100%;
}

.div-content-body {
  padding: 10px;
}

/*Hover effect*/

.div-note {
  padding: 5px 10px;
  margin: 0;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
}

.highlight {
  background-color: var(--accent);
}

.div-note:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--secondary);
  transition:0.5s;
  transform-origin:left;
  transform:scaleX(0);
  z-index: -1;
}

.div-note:hover::before {
  transition:transform 0.5s;
  transform-origin:left;
  transform:scaleX(1);
}

/*Circles:*/
.circle {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  z-index: 1;
}

.v-shape:before {
  z-index: 1;
  content:"";
  position: absolute;
  top: 0;
  right: -22px;
  border-width: 20px;
  border-style: solid;
  border-color: var(--primary) transparent transparent transparent;
}

.v-shape:after {
  z-index: 1;
  content:"";
  position: absolute;
  top: -6px;
  right: -22px;
  border-width: 20px;
  border-style: solid;
  border-color: var(--background) transparent transparent transparent;
}

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
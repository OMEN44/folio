<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps(['title', 'route', 'about', 'image', 'date', 'newYear'])


</script>

<template>
  <div class="div-timeline-event">
    <span :class="{year: props.newYear, circle: !props.newYear}">
      {{ (props.newYear ? props.date.getFullYear() : '') }}
    </span>
    <div class="div-header">
      <h2>{{ props.title }}</h2>
<!--      <router-link :v-if="props.route !== null" :to="props.route">
        <svg-icon type="mdi" :size="40" :path="mdiOpenInApp"></svg-icon>
      </router-link>-->
    </div>
    <div class="div-content">
      <p>{{ props.about }}</p>
      <img v-if="props.image !== null" :src="props.image" :alt="props.image" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.div-timeline-event {
  padding: 10px 50px 10px 10px;
  border-image: linear-gradient(to right, var(--primary), transparent) 1;
  border-top: 4px solid;
  margin-bottom: 25px;
  position: relative;
  background: linear-gradient(to bottom right, var(--secondary), transparent, transparent);
  transition: background-image 0.5s;
}

.div-timeline-event:hover {
  background: linear-gradient(to bottom right, var(--secondary), transparent);
}

.year {
  left: -69px;
  top: -17px;
  content: '';
  background-color: var(--background);
  border: var(--primary) 4px solid;
  border-radius: 20%;
  width: 60px;
  height: 35px;
  position: absolute;
  text-align: center;
  padding-top: 3px;
  font-size: 18px;
}

.circle {
  left: -48px;
  top: -13px;
  content: '';
  background-color: var(--background);
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
}

.div-timeline-event::before {
  left: -40px;
  top: -4px;
  position: absolute;
  width: 40px;
  height: 4px;
  background-color: var(--primary);
  content: '';
}

.div-content {
  display: flex;
  flex-direction: row;
}

.div-header {
  display: flex;
  align-items: center;
}

i {
  color: var(--text);
  transition: color 0.5s;
  margin-top: 5px;
  margin-right: 5px;
}

i:hover {
  color: var(--primary);
}

img {
  margin-left: 10px;
}
</style>
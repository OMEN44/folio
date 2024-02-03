<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete, mdiOpenInNew } from '@mdi/js'
import getAxios from '../plugins/axios'
import { notify } from '../script/notification';
import router from '../router';

const props = defineProps(['id', 'title', 'noteId', 'about', 'image', 'date', 'newYear', 'accessLevel'])
const emit = defineEmits(['eventDeleted'])

const deleteEvent = () => {
  getAxios().post('/timeline/delete', { id: props.id })
    .then(() => {
      notify('Deleted timeline event')
      emit('eventDeleted')
    })
    .catch(error => console.log(error))
}

const openNote = (e) => {
  router.push({ path: '/notes', query: { id: props.noteId } })
}

</script>

<template>
  <div class="div-timeline-event">
    <span :class="{ year: props.newYear, circle: !props.newYear }">
      {{ (props.newYear ? props.date.getFullYear() : '') }}
    </span>
    <div class="div-header">
      <div class="div-title">
        <h2>{{ props.title }}</h2>
        <svg-icon v-if="props.noteId > 0" class="icon-note icon icon-hover" type="mdi" :size="40" :path="mdiOpenInNew"
          @click="openNote"></svg-icon>
      </div>
      <svg-icon @click="deleteEvent" v-if="props.accessLevel < 2" class="icon icon-hover" type="mdi" :size="30"
        :path="mdiDelete"></svg-icon>
    </div>
    <p class="p-date">{{ props.date.toLocaleString('default', { month: 'long' }) }} {{ props.date.getFullYear() }}</p>
    <div class="div-content">
      <p>{{ props.about }} </p>
      <img v-if="props.image !== null" :src="props.image" :alt="props.image" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.icon-note {
  height: 20px;
}

.div-header:before {
  content: "";
  position: absolute;
  top: 0;
  left: -25px;
  border-width: 25px 0 0 25px;
  border-style: solid;
  border-color: var(--primary) transparent;
}

.div-header:after {
  content: "";
  position: absolute;
  top: 0;
  left: -19px;
  border-width: 20px 0 0 20px;
  border-style: solid;
  border-color: var(--accent) transparent;
}

.div-timeline-event {
  padding: 10px;
  border: 4px solid;
  border-color: var(--primary) transparent transparent var(--primary);
  margin: 0 0 25px 15px;
  position: relative;
  background-color: var(--accent);
}

.year {
  left: -92px;
  top: -19px;
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
  left: -71px;
  top: -13px;
}

.div-timeline-event::before {
  left: -60px;
  top: -4px;
  position: absolute;
  width: 60px;
  height: 4px;
  background-color: var(--primary);
  content: '';
}

.div-content {
  display: flex;
  flex-direction: row;
}

.div-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.div-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.p-date {
  margin-bottom: 8px;
  font-size: 16px;
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
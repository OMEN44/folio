<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose } from '@mdi/js'
import getAxios from '../plugins/axios'
import { notify } from '../script/notification';

const props = defineProps(['id', 'title', 'route', 'about', 'image', 'date', 'newYear', 'accessLevel'])
const emit = defineEmits(['eventDeleted'])

const deleteEvent = () => {
  getAxios().post('/timeline/delete', { id: props.id })
    .then(() => {
      notify('Deleted timeline event')
      emit('eventDeleted')
    })
    .catch(error => console.log(error))
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
        <!--      <router-link :v-if="props.route !== null" :to="props.route">
                <svg-icon type="mdi" :size="40" :path="mdiOpenInApp"></svg-icon>
              </router-link>-->
      </div>
      <svg-icon @click="deleteEvent" v-if="props.accessLevel < 2" class="icon icon-hover" type="mdi" :size="30"
        :path="mdiClose"></svg-icon>
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
  content: '';
  background-color: var(--background);
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
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
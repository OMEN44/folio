<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete, mdiOpenInNew } from '@mdi/js'
import getAxios from '../plugins/axios'
import { notify } from '../script/notification';
import router from '../router';
import Overlay from './Overlay.vue';
import { ref } from 'vue';
import { AccessLevel, TimelineEventType, updateTimeline } from '../script/timeline';

const props = defineProps<{ eventData: TimelineEventType }>()

const openNote = () => {
  router.push({ path: '/notes', query: { id: props.eventData.noteId } })
}

// Overlay controlls
const overlay = ref<InstanceType<typeof Overlay>>(null)

const confirmDeleteEvent = (e) => {
  overlay.value.openOverlay(
    {
      title: 'Deleting Timeline Event',
      content: `Are you sure you want to deleted the timeline event: ${props.eventData.title}`,
      buttons: [
        {
          name: 'Yes',
          primary: true,
          action: () => {
            getAxios().post('/timeline/delete', { id: props.eventData.id })
              .then(() => {
                notify('Deleted timeline event')
                updateTimeline()
              })
              .catch(error => console.log(error))
            overlay.value.closeOverlay()
          }
        },
        {
          name: 'No',
          primary: false,
          action: (e) => overlay.value.closeOverlay()
        }
      ]
    }
  )
}

</script>

<template>
  <overlay ref="overlay" />
  <div class="div-timeline-event">
    <span class="circle"></span>
    <span :class="{ year: props.eventData.newYear }">
      {{ (props.eventData.newYear ? props.eventData.date.getFullYear() : '') }}
    </span>
    <div class="div-header">
      <div class="div-title">
        <h2>{{ props.eventData.title }}</h2>
        <svg-icon v-if="props.eventData.noteId > 0" class="icon-note icon icon-hover" type="mdi" :size="40"
          :path="mdiOpenInNew" @click="openNote"></svg-icon>
      </div>
      <svg-icon @click="confirmDeleteEvent" v-if="AccessLevel < 2" class="icon icon-hover" type="mdi" :size="30"
        :path="mdiDelete"></svg-icon>
    </div>
    <p class="p-date">{{ props.eventData.date.toLocaleString('default', { month: 'long' }) }} {{
      props.eventData.date.getFullYear() }}</p>
    <div class="div-content">
      <p>{{ props.eventData.about }} </p>
      <!-- <img v-if="props.eventData.image !== null" :src="props.eventData.image" :alt="props.eventData.image" /> -->
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.icon-note {
  height: 20px;
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
  z-index: 3;
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

@media (min-width: 800px) {
  .year {
    left: -92px;
  }
}

@media (max-width: 800px) {
  .div-timeline-event::before {
    width: 30px;
    left: -30px;
  }

  .div-header:before {
    border-width: 20px 0 0 20px;
    left: -20px;
  }

  .div-header:after {
    border-width: 15px 0 0 15px;
    left: -14px;
  }

  .year {
    right: -20px;
  }

  .circle {
    left: -46px;
  }
}
</style>
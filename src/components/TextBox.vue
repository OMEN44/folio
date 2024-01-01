<script setup lang="ts">
import {ref, onBeforeMount} from "vue";

const props = defineProps<{
  title: string,
  width?: number,
  appearance?: string
}>();

const widthValue = ref(null)
const appearance = ref(null)

onBeforeMount(() => {
  widthValue.value = (props.width) === undefined ? 300 : props.width;
  appearance.value = props.appearance === undefined ? "basic" : props.appearance;
})

</script>

<template>
  <div class="div-container" :class="appearance" :style="{ width: widthValue + 'px'}">
    <div class="div-title" :class="appearance">
      <h2>{{ props.title }}</h2>
    </div>
    <div class="div-content" :class="appearance">
      <slot></slot>
    </div>
    <span :class="appearance + ' tl'"/>
    <span :class="appearance + ' tr'"/>
    <span :class="appearance + ' br'"/>
    <span :class="appearance + ' bl'"/>
  </div>
</template>

<style scoped>
.div-container {
  position: relative;
  width: fit-content;
}

.div-title {
  padding: 10px 20px;
  border: var(--primary) solid;
}

h2 {
  font-size: 26px;
}

.div-content {
  background-color: var(--secondary);
  padding: 10px;
}

/* Basic appearance styling */

.div-content.basic {
  width: 100%;
}

.div-title.basic {
  border-width: 4px 0;
  text-align: center;
}

span.basic {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
}

.basic.tl {
  top: -8px;
  left: -10px;
}

.basic.tr {
  top: -8px;
  right: -10px;
}

.basic.br {
  top: 46px;
  right: -10px;
}

.basic.bl {
  top: 46px;
  left: -10px;
}

/* Rounded appearance styling */

.div-content.rounded {
  width: calc(100% - 15px);
}

.div-title.rounded {
  border-width: 4px 4px 4px 0;
}

.rounded.tr:before {
  content:"";
  position: absolute;
  top: 0;
  right: 0;
  border-width: 20px 0 0 20px;
  border-style: solid;
  border-color: var(--primary) transparent;
}

.rounded.tr:after {
  content:"";
  position: absolute;
  top: 0;
  right: 0;
  border-width: 14px 0 0 14px;
  border-style: solid;
  border-color: var(--background) transparent;
}

.rounded.br:before {
  content:"";
  position: absolute;
  top: 38px;
  right: 0;
  border-width: 20px 20px 0 0;
  border-style: solid;
  border-color: transparent var(--primary);
}

.rounded.br:after {
  content:"";
  position: absolute;
  top: 44px;
  right: 0;
  border-width: 14px 14px 0 0;
  border-style: solid;
  border-color: transparent var(--background);
}

.rounded.tl {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  top: -8px;
  left: -10px;
}

.rounded.bl {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  top: 46px;
  left: -10px;
}

/* Faded appearance styling */

.faded.div-container {
  border: 4px solid;
  border-image: linear-gradient(to bottom right, var(--primary), transparent, var(--primary)) 1;
}

.faded.div-title {
  border: 0;
  background-color: var(--secondary);
  padding: 5px 10px;
  border-radius: 0 8px 0 0;
}

.faded.div-content {
  border-radius: 0 0 0 8px;
}

.faded.tl {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  top: -12px;
  left: -12px;
}

.faded.br {
  background-color: var(--background);
  display: block;
  position: absolute;
  border: var(--primary) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  bottom: -12px;
  right: -12px;
}
</style>
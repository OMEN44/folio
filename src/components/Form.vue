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
  border: var(--accent) solid;
}

h2 {
  font-size: 26px;
}

.div-content {
  background-color: var(--accent-hover);
  padding: 10px;
}

/*Styling here*/

.faded.div-container {
  border: 4px solid;
  border-image: linear-gradient(to bottom right, var(--accent), transparent, var(--accent)) 1;
}

.faded.div-title {
  border: 0px;
  background-color: var(--accent-hover);
  padding: 5px 10px;
  border-radius: 0 8px 0 0;
}

.faded.div-content {
  border-radius: 0 0 0 8px;
}

.faded.tl {
  background-color: var(--primary);
  display: block;
  position: absolute;
  border: var(--accent) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  top: -12px;
  left: -12px;
}

.faded.br {
  background-color: var(--primary);
  display: block;
  position: absolute;
  border: var(--accent) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  bottom: -12px;
  right: -12px;
}

</style>
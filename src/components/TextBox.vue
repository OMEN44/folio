<script setup>
const props = defineProps({
  title: String,
  content: String,
  width: String
})


</script>

<template>
  <div class="div-container" :style="{ width: (props.width === undefined ? 400 : Number(props.width)) + 'px'}">
    <span class="circle left top"/>
    <span class="circle left bottom"/><!---->
    <span class="circle right top"/>
    <span class="circle right bottom"/>
    <div class="div-title">
      <h2>{{ props.title }}</h2>
    </div>
    <div class="div-content">
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.div-container {
  position: relative;
  width: fit-content;
}

.circle {
  background-color: var(--primary);
  display: block;
  position: absolute;
  border: var(--accent) 4px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
}

.div-title {
  padding: 10px 20px;
  border: var(--accent) solid;
  border-width: 4px 0;
}

h2 {
  font-size: 26px;
}

.div-content {
  background-color: var(--accent-hover);
  padding: 10px;
}

.left {
  left: -10px;
}

.right {
  right: -10px;
}

.top {
  top: -8px;
}

.bottom {
  top: 46px;
}
</style>
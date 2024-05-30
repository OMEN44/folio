<script setup lang="ts">
import TextBox from "../components/TextBox.vue";

defineProps<{ priority: number }>();
// Use priority value to get data for spotlight
</script>

<template>
  <div class="div-spotlight">
    <text-box title="Placeholder"> This is some content </text-box>
  </div>
</template>

<style scoped lang="scss"></style>

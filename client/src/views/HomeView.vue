<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()
console.log(cookies.get('userId'))
</script>

<template>
  <p>Hi my name is Huon 👍</p>
</template>

<style scoped></style>
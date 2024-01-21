<script setup>
import axios from '../plugins/axios';
import store from '../store';

console.log(store.getters.token);

axios().get('access-level')
  .then(res => console.log(res.data))
  .catch(e => {})
</script>

<template>
  <p>Hi my name is Huon 👍</p>
</template>

<style scoped></style>
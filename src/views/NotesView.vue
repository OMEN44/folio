<script setup lang="ts">


import axios from "axios";

axios.get('http://localhost:3000/api/protected', {
  headers: {
    Authorization: `Bearer ${store.getters.token}`
  }
}).then(res => {
  console.log(res.data)
}).catch(error => {
  console.log("nut")
})

</script>

<template>
<p>This is the retricted notes page</p>
</template>

<style scoped>

</style>
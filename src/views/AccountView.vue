<script setup lang="ts">
import TextBox from "@/components/TextBox.vue";
import axios from "axios";
import { useStore } from "vuex";
import store from '@/store'

const login = async () => {
  const user = (<HTMLInputElement> document.getElementById("username")).value;
  const pass = (<HTMLInputElement> document.getElementById("password")).value;

  try {
      const response = await axios.post('http://localhost:3000/api/login',
        {
            username: user,
            password: pass
        });
      const token = response.data.token;
      await store.dispatch('login', token)
  }  catch (error) {
      console.error('login failed', error)
  }
}

</script>

<template>
    <TextBox class="form-login" title="Login" :width="400" appearance="faded">
      <form class="form-content">
        Login to access private pages and contribute.
        <input id="username" type="text">
        <input id="password" type="password">
        <button @click="login()" type="button">Submit</button>
      </form>
    </TextBox>


</template>

<style scoped>
.form-login {
  margin: 100px auto;
}

.form-content {
  display: flex;
  flex-direction: column;
}
</style>
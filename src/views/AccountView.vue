<script setup lang="ts">
import TextBox from "@/components/TextBox.vue";
import axios from "axios";
import store from '@/store'
import {onMounted, ref} from "vue";

const formContent = ref(null)
const error = ref('test')

const logout = async (e) => {
  await store.dispatch('logout');
  switchFormContent(false)
}

const login = async (e) => {
  e.preventDefault()
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
    switchFormContent(true)
  }  catch (error) {
    console.error('login failed', error)
  }
}

const switchFormContent = (loggedIn) => {
  if (loggedIn) {
    document.getElementById('logout').classList.remove('hidden')
    document.getElementById('login').classList.add('hidden')
  } else {
    document.getElementById('logout').classList.add('hidden')
    document.getElementById('login').classList.remove('hidden')
  }
}

onMounted(() => {
  switchFormContent(store.getters.isAuthenticated)
})

</script>

<template>
  <TextBox class="form-login" title="Welcome!" :width="350" appearance="faded">
    <div id="login">
      <form class="form-content">
        <p>Login to access private pages and contribute.</p>
        <span v-html="error"></span>
        <input id="username" type="text" placeholder="Username">
        <input id="password" type="password" placeholder="Password">
        <button @click="login" type="submit">Submit</button>
        <button @click="register" type="button">Register</button>
      </form>
    </div>
    <div id="logout">
      You are logged in as:
      <button @click="logout">Logout</button>
    </div>
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

input {
  width: 250px;
  margin: 5px auto;
  padding: 5px;
  border: var(--background) solid 2px;
  border-radius: 2px;
}
.form-content p {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  width: 180px;
  margin: 5px auto;
  padding: 5px;
  border: var(--background) solid 2px;
  background-color: var(--secondary);
  transition: background-color 0.5s;
  border-radius: 2px;
}

button:hover {
  background-color: var(--primary);
}

span {
  margin: auto;
}

.hidden {
  display: none;
}
</style>
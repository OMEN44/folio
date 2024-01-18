<script setup lang="ts">
import TextBox from "@/components/TextBox.vue";
import axios from "axios";
import store from '@/store'
import {onMounted, ref} from "vue";
import '@/assets/base.css'

const errorMessage = ref('')

const logout = async (e) => {
  await store.dispatch('logout');
  errorMessage.value = ''
  switchFormContent('login')
}

const login = async (e) => {
  e.preventDefault()
  const user = (<HTMLInputElement> document.getElementById("username-login")).value;
  const pass = (<HTMLInputElement> document.getElementById("password-login")).value;

  try {
    axios.post('http://localhost:3000/login',
    {
      username: user,
      password: pass
    }).then(async response => {
      const data = response.data;
      await store.dispatch('login', data.token)
      errorMessage.value = data.username
      switchFormContent('logout')
    }).catch(error => {
      if (error.response.status === 401) {
        errorMessage.value = error.response.data.error
      }
    });
  }  catch (error) {
    console.error('login failed', error)
  }
}

const register = async (e) => {
  e.preventDefault()

  const user = (<HTMLInputElement> document.getElementById("username-register")).value;
  const email = (<HTMLInputElement> document.getElementById("email-register")).value;
  const pass = (<HTMLInputElement> document.getElementById("password-register")).value;

  axios.post('http://localhost:3000/register', {
    username: user,
    password: pass,
    email: email
  }).then(response => {
    errorMessage.value = response.data.message
    switchFormContent('login')
  }).catch(error => {
    if (error.response.status === 409)
      errorMessage.value = error.response.data.error
    else
      console.error(error)
  })
}

const switchFormContent = (content) => {
  if (content === 'logout') {
    document.getElementById('logout').classList.remove('hidden')
    document.getElementById('login').classList.add('hidden')
    document.getElementById('register').classList.add('hidden')
  } else if (content === 'login') {
    document.getElementById('logout').classList.add('hidden')
    document.getElementById('login').classList.remove('hidden')
    document.getElementById('register').classList.add('hidden')
  } else if (content === 'register') {
    document.getElementById('logout').classList.add('hidden')
    document.getElementById('login').classList.add('hidden')
    document.getElementById('register').classList.remove('hidden')
  }
}

onMounted(() => {
  switchFormContent(store.getters.isAuthenticated ? 'logout' : 'login')
})

</script>

<template>
  <TextBox class="form-login" title="Welcome!" :width="350" appearance="faded">
    <div id="login">
      <form class="form-content">
        <p>Login to access private pages and contribute.</p>
        <span v-html="errorMessage"></span>
        <input id="username-login" type="text" placeholder="Username">
        <input id="password-login" type="password" placeholder="Password">
        <div class="div-buttons">
          <button class="button-border" @click="login" type="submit">Submit</button>
          <button class="button-border" @click="switchFormContent('register')" type="button">Register</button>
        </div>
      </form>
    </div>
    <div id="register">
      <form class="form-content">
        <p>Login to access private pages and contribute.</p>
        <span v-html="errorMessage"></span>
        <input id="username-register" type="text" placeholder="Username">
        <input id="email-register" type="text" placeholder="Email">
        <input id="password-register" type="password" placeholder="Password">
        <div class="div-buttons">
          <button class="button-border" @click="register" type="submit">Submit</button>
          <button class="button-border" @click="logout" type="button">Cancel</button>
        </div>
      </form>
    </div>
    <div id="logout">
      <div class="div-logout">
        <div class="div-logout-content">
          <p>You are logged in as:</p>
          <span v-html="errorMessage"></span>
        </div>
        <button class="button-border" @click="logout">Logout</button>
      </div>
    </div>
  </TextBox>
</template>

<style scoped>
#logout span {
  margin: 0 6px;
  font-size: 20px;
}

.div-logout {
  display: flex;
  flex-direction: column;
}

.div-buttons {
  display: flex;
  flex-direction: row;
  margin: auto;
}

#logout button {
  margin: 20px auto;
}

.div-logout-content {
  display: flex;
  flex-direction: row;
}

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
  padding: 5px 10px;
  background-color: var(--accent);
  color: var(--text);
  font-size: 20px;
  border: none;
  border-radius: 8px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px var(--accent) inset !important;
}

input:focus {
  outline: none;
}

.form-content p {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  margin: 5px;
}

span {
  margin: auto;
}
</style>
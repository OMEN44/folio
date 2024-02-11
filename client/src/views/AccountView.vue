<script setup lang="ts">
import TextBox from "../components/TextBox.vue";
import { onMounted, ref } from "vue";
import '@/assets/base.css'
import getAxios from '../plugins/axios'
import { getUserData } from "../script/utils";
import { useCookies } from "vue3-cookies";

const errorMessage = ref('')
const accessLevel = ref(-1)
const { cookies } = useCookies()

const logout = async (e) => {
  cookies.remove('authToken')
  errorMessage.value = ''
  switchFormContent('login')
}

const login = async (e) => {
  e.preventDefault()
  const user = (<HTMLInputElement>document.getElementById("username-login")).value;
  const pass = (<HTMLInputElement>document.getElementById("password-login")).value;

  try {
    getAxios().post('/login',
      {
        username: user,
        password: pass
      }).then(async response => {
        const data = response.data;
        cookies.set('authToken', data.token, '7d')
        errorMessage.value = data.username
        switchFormContent('logout')
      }).catch(error => {
        if (error.response.status === 401) {
          errorMessage.value = error.response.data.error
        }
      });
  } catch (error) {
    console.error('login failed', error)
  }
}

const register = async (e) => {
  e.preventDefault()

  const user = (<HTMLInputElement>document.getElementById("username-register")).value;
  const email = (<HTMLInputElement>document.getElementById("email-register")).value;
  const pass = (<HTMLInputElement>document.getElementById("password-register")).value;

  getAxios().post('/login/register', {
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
    getUserData().then(res => {
      errorMessage.value = res.username
      accessLevel.value = res.accessLevel
    })
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
  switchFormContent(cookies.isKey('authToken') ? 'logout' : 'login')
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
      <div v-if="accessLevel === 0">
        <h3>To do list:</h3>
        <ul>
          <li>Overhaul login page</li>
          <li>Overhaul TextBox component</li>
          <li>Create mobile stylings</li>
          <li>Encrypt password</li>
          <li>Add overlays for confirmation</li>
          <li>Split notes into 2 files</li>
        </ul>
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
input:-webkit-autofill:active {
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
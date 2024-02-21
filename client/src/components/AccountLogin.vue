<script setup lang="ts">
import changeLog from '../assets/changelog.json'

import {
    IsShown,
    switchAccountView,
    Message,
    login,
    register,
    logout,
    updateAccessLevel,
    loadLoginData,
    username,
    password,
    email,
    User,
    Users
} from '../script/Account';

const escape = (e?) => {
    if (e.target.classList[0] !== 'div-overlay') return
    switchAccountView(0)
}

// @ts-ignore
const ver: string = APP_VERSION

loadLoginData()
</script>

<template>
    <div v-if="IsShown !== 0" class="div-overlay" @click="escape">
        <form class="form-content" @submit.prevent>
            <span class="circle tl"></span>
            <span class="circle tr"></span>
            <span class="circle bl"></span>
            <span class="circle br"></span>
            <!-- Login -->
            <div class="div-login" v-if="IsShown === 1">
                <p>Login to access private pages and contribute.</p>
                <span v-html="Message"></span>
                <input ref="username" id="username-login" type="text" placeholder="Username">
                <input ref="password" id="password-login" type="password" placeholder="Password">
                <div class="div-buttons">
                    <button class="button-border" @click="login" type="submit">Submit</button>
                    <button class="button-border" @click="switchAccountView(3)" type="button">Register</button>
                </div>
            </div>
            <!-- Logout -->
            <div class="div-login" v-if="IsShown === 2">
                <p>You are logged in as: <span v-html="Message"></span></p>
                <div class="div-buttons">
                    <button class="button-border" @click="logout" type="submit">Logout</button>
                </div>
                <div class="div-changelog">
                    <h3>Folio Change log <span>currently v{{ ver }}</span></h3>
                    <h4 v-for="change in changeLog">{{ change.version }}<span> - {{ change.message }}</span></h4>
                </div>
                <div class="div-accounts" v-if="User !== null && User.access === 0">
                    <h3>Edit user access level</h3>
                    <div class="div-user-list">
                        <div class="div-user" v-for="(user) in Users">
                            <div>
                                <p>{{ user.name }}</p>
                                <span>{{ user.email }}</span>
                            </div>
                            <select
                                @change="(e) => updateAccessLevel(Number((e.target as HTMLInputElement).value), user.id)"
                                :value="user.access">
                                <option value="0">0 - Super User</option>
                                <option value="1">1 - Admin</option>
                                <option value="2">2 - Editor</option>
                                <option value="3">3 - Nitwit</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Register -->
            <div class="div-login" v-if="IsShown === 3">
                <p>Login to access private pages and contribute.</p>
                <span v-html="Message"></span>
                <input ref="username" id="username-register" type="text" placeholder="Username">
                <input ref="email" id="email-register" type="text" placeholder="Email">
                <input ref="password" id="password-register" type="password" placeholder="Password">
                <div class="div-buttons">
                    <button class="button-border" @click="register" type="submit">Submit</button>
                    <button class="button-border" @click="switchAccountView(1)" type="button">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.div-changelog {
    margin: 10px 0;
    max-height: 200px;
    overflow-y: scroll;

    span {
        font-size: 14px;
        font-weight: lighter;
    }
}

.div-user-list {
    max-height: 200px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.div-user-list::-webkit-scrollbar {
    display: none;
}

.div-user {
    background-color: var(--secondary);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    justify-content: space-between;
    margin: 5px 0;

    @media (max-width: 800px) {
        flex-direction: column;
    }

    p {
        margin: 0;
    }

    select {
        height: fit-content;
        margin: auto 0;

        @media (max-width: 800px) {
            margin: 5px 0;
        }
    }

    div {
        display: flex;
        flex-direction: column;
    }

    span {
        font-size: 14px;
    }
}

.div-overlay {
    background-color: var(--background-transparent);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
}

.form-content {
    z-index: 12;
    height: fit-content;
    display: fixed;
    margin: 100px auto;

    width: 400px;
    background-color: var(--accent);
    border: 4px var(--primary);
    border-style: solid none;
    position: relative;
    padding: 20px;
}

.primary {
    background-color: var(--primary);
}

button {
    background-color: var(--secondary);
}

input {
    width: 250px;
    margin: 5px;
    padding: 5px 10px;
    background-color: var(--accent);
    color: var(--text);
    font-size: 20px;
    border: none;
    border-radius: 8px;
    border: 3px var(--secondary) solid;
    transition: 0.5s;
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

.div-options {
    margin: 10px 0 0 0;
}

/* Circle positons */
.tl {
    top: -12px;
    left: -10px;
}

.tr {
    top: -12px;
    right: -10px;
}

.bl {
    bottom: -12px;
    left: -10px;
}

.br {
    bottom: -12px;
    right: -10px;
}

@media (max-width: 800px) {
    .form-content {
        width: 80%;
        margin: 100px auto;
    }
}
</style>
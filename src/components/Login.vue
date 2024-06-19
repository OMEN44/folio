<script setup lang="ts">
import { onMounted } from "vue";
import { ErrorMessage, formIndex, login, loginDetails, logout, register } from "../scripts/login";
import { remult } from "remult";

onMounted(async () => {
    formIndex.value = remult.authenticated() ? 2 : 0;
});
</script>

<template>
    <form class="div-account" @submit.prevent>
        <div class="div-login" v-if="formIndex === 0">
            <h2>Welcome user</h2>
            <span v-html="ErrorMessage"></span>
            <input autofocus v-model="loginDetails.username" type="text" placeholder="Username" />
            <input v-model="loginDetails.password" type="password" placeholder="Password" />
            <div class="div-buttons">
                <button class="button-normal" type="submit" @click="login">Submit</button>
                <button class="button-normal" type="button" @click="formIndex = 1">Register</button>
            </div>
        </div>
        <div class="div-register" v-if="formIndex === 1">
            <h2>Welcome new user</h2>
            <span v-html="ErrorMessage"></span>
            <input v-model="loginDetails.username" type="text" placeholder="Username" />
            <input v-model="loginDetails.email" type="text" placeholder="Email" />
            <input v-model="loginDetails.password" type="password" placeholder="Password" />
            <input
                v-model="loginDetails.confirmPassword"
                type="password"
                placeholder="Confirm Password" />
            <div class="div-buttons">
                <button class="button-normal" type="submit" @submit.prevent="register">
                    Submit
                </button>
                <button class="button-normal" type="button" @click="formIndex = 0">Cancel</button>
            </div>
        </div>
        <div class="div-logout" v-if="formIndex === 2">
            <h2>You are logged in as: {{ remult.user?.name }}</h2>
            <span v-html="ErrorMessage"></span>
            <div class="div-buttons">
                <button class="button-normal" type="submit" @click.prevent="logout">Log out</button>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.div-account {
    padding: 10px;
    width: 80vw;

    div {
        display: flex;
        flex-direction: column;

        input {
            margin: 5px 0;
        }

        span {
            min-height: 24px;
            word-wrap: break-word;
        }

        .div-buttons {
            flex-direction: row;
            margin: 5px auto 0 auto;
        }
    }
}
</style>

<script setup lang="ts">
import emailjs from "@emailjs/browser";
import { ref } from "vue";

const status = ref<string>("");
const formInput = ref<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
});

emailjs.init(import.meta.env.VITE_APP_EMAILJS_KEY);

const send = () => {
    status.value = "Sending message...";
    emailjs
        .send(import.meta.env.VITE_APP_EMAILJS_SERVICE, import.meta.env.VITE_APP_EMAILJS_TEMPLATE, {
            name: formInput.value.name,
            email: formInput.value.email,
            message: formInput.value.message,
        })
        .then((res) => {
            if (res.status === 200) {
                status.value = "Message sent!";
                formInput.value = { name: "", email: "", message: "" };
            } else {
                status.value = "Message failed to send. Try again later.";
            }
            console.log(res.status);
        });
};
</script>

<template>
    <form @submit.prevent>
        <h2>Message me</h2>
        <p>Have a question for me or about one of my projects?</p>
        <span v-text="status"></span>
        <input type="text" placeholder="Name" v-model="formInput.name" />
        <input type="email" placeholder="Email" v-model="formInput.email" />
        <textarea placeholder="Message" v-model="formInput.message"></textarea>
        <button class="button-normal" type="submit" @click="send">Submit</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    max-width: 440px;

    @media (max-width: 600px) {
        width: 80vw;
    }

    input,
    textarea {
        margin: 10px 5px 0 5px;
        width: calc(100% - 10px);
        resize: vertical;
        max-height: 60vh;
    }

    p,
    h2 {
        width: calc(100% - 10px);
        margin: {
            left: 5px;
            right: 5px;
        }
    }

    p {
        font-size: 18px;
    }

    button {
        width: fit-content;
        margin: 10px auto 0 auto;
    }
}
</style>

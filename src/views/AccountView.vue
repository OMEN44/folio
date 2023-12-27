<script setup lang="ts">
import TextBox from "@/components/TextBox.vue";

const login = () => {
  const user = (<HTMLInputElement> document.getElementById("username")).value;
  const pass = (<HTMLInputElement> document.getElementById("password")).value;

  console.log(user + " logged in with password: " + pass);
}

</script>

<template>
    <TextBox class="form-login" title="Login" :width="400" appearance="faded">
      <div class="form-content">
        Login to access private pages and contribute.
        <input id="username" type="text">
        <input id="password" type="password">
        <button @click="login()">Submit</button>
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
</style>
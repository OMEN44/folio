<script setup lang="ts">
import { ref } from "vue";

window.visualViewport?.addEventListener("resize", (e: Event) => {
    console.log(e);
    const target: VisualViewport = e.currentTarget! as VisualViewport;
    message.value =
        "Height: " +
        target.height +
        ", width: " +
        target.width +
        ", " +
        target.offsetLeft +
        " " +
        target.offsetTop +
        ", " +
        target.pageLeft.toString() +
        " " +
        target.pageTop.toString();
});

const message = ref<any>("Press on the input to open keyboard");
</script>

<template>
    <div>
        <p>{{ message }}</p>
        <input type="text" />
    </div>
</template>

<style scoped>
div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import Overlay from "./components/Overlay.vue";
import Terminal from "./components/Terminal.vue";
import getAxios from "./plugins/axios";
import { closeOverlay, ShowOverlay } from "./scripts/overlay";
import { commandInput, prefix, showTerminal } from "./scripts/terminal";
import { remult } from "remult";
import { setPermissionLevel } from "./scripts/login";

window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
        case "T":
            if (e.altKey && e.shiftKey && !ShowOverlay.value) {
                showTerminal.value = true;
                prefix.value.directory = window.location.pathname;
                commandInput.value?.focus();
            }
            break;
        case "Escape":
            showTerminal.value = false;
            closeOverlay();
            break;
    }
});

onMounted(async () => {
    remult.user = await getAxios()
        .get("user")
        .then((response) => {
            return response.data;
        });

    // update terminal prefix
    prefix.value.admin = remult.authenticated() ? remult.user?.roles![0] === "0" : false;
    prefix.value.username = remult.authenticated() ? remult.user?.name! : "guest";

    setPermissionLevel();

    //adjust screen height

    document.body.style.setProperty("--view-height", window.visualViewport?.height + "px");
});

window.visualViewport?.addEventListener("resize", (e: Event) => {
    const target: VisualViewport = e.currentTarget! as VisualViewport;
    document.body.style.setProperty("--view-height", target.height + "px");
});

window.visualViewport?.addEventListener("scroll", (e: Event) => {
    e.preventDefault();
    // const target: VisualViewport = e.currentTarget! as VisualViewport;
    console.log(e);
    console.log(document.body.offsetTop);
    console.log(document.body.offsetParent);
    console.log("asd");
});
</script>

<template>
    <Overlay />
    <Terminal />
    <nav-bar />
    <div class="div-view-container">
        <RouterView />
    </div>
</template>

<style scoped lang="scss">
/* width */
::-webkit-scrollbar {
    display: none;
}

.div-view-container {
    margin: 10px;
    background-color: var(--background);
    border: solid 2px var(--blue);
    border-radius: 5px;
    height: calc(var(--view-height) - 20px);
    overflow-x: hidden;
    overflow-y: scroll;

    h1 {
        margin: 0;
    }
}
</style>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Overlay from "./components/Overlay.vue";
import Terminal from "./components/Terminal.vue";
import { closeOverlay, ShowOverlay } from "./scripts/overlay";
import { commandInput, showTerminal } from "./scripts/terminal";

window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
        case "T":
            if (e.altKey && e.shiftKey && !ShowOverlay.value) {
                showTerminal.value = true;
                commandInput.value?.focus();
            }
            break;
        case "Escape":
            showTerminal.value = false;
            closeOverlay();
            break;
    }
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
    height: calc(100vh - 20px);
    overflow-x: hidden;
    overflow-y: scroll;

    h1 {
        margin: 0;
    }
}
</style>

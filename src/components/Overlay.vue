<script setup lang="ts">
import { closeOverlay, OverlayContent, ShowOverlay } from "../scripts/overlay";
import OverlayAccount from "./Login.vue";
import TimelineFilter from "./TimelineFilter.vue";
import TimelineForm from "./TimelineForm.vue";
import TimelineSearch from "./TimelineSearch.vue";
</script>

<template>
    <div class="overlay-container" v-if="ShowOverlay" @click="closeOverlay()">
        <div class="div-overlay-border">
            <div class="div-overlay-content" @click="(e) => e.stopPropagation()">
                <overlay-account v-if="OverlayContent === 'login'" />
                <TimelineSearch v-if="OverlayContent === 'timeline-search'" />
                <TimelineFilter v-if="OverlayContent === 'timeline-filter'" />
                <TimelineForm v-if="OverlayContent === 'timeline-form'" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.overlay-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    backdrop-filter: blur(5px);

    .div-overlay-border {
        position: inherit;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px var(--blue) solid;
        background-color: var(--blue-background);
        border-radius: 8px;
        padding: 10px;

        .div-overlay-content {
            width: fit-content;
            height: fit-content;
            background-color: var(--background);
            border-radius: 8px;
            padding: 10px;
        }
    }
}
</style>

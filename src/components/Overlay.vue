<script setup lang="ts">
import {
    closeOverlay,
    loadCloseEvents,
    OverlayContent,
    OverlayType,
    ShowOverlay,
} from "../scripts/overlay";
import { clearInput, editing, setEditing } from "../scripts/timeline/creator";
import OverlayAccount from "./Login.vue";
import NoteCreateForm from "./note/NoteCreateForm.vue";
import NoteMenu from "./note/NoteMenu.vue";
import NoteToolbar from "./note/NoteToolbar.vue";
import TimelineForm from "./timeline/TimelineForm.vue";
import TimelineSearch from "./timeline/TimelineSearch.vue";

loadCloseEvents([
    {
        label: "timeline-form",
        action: () => {
            if (editing !== "") {
                setEditing("");
                clearInput();
            }
        },
    },
]);
</script>

<template>
    <div class="overlay-container" v-if="ShowOverlay" @click="closeOverlay()">
        <div class="div-overlay-border">
            <div class="div-overlay-content" @click="(e) => e.stopPropagation()">
                <div v-if="OverlayContent === ''"></div>
                <overlay-account v-else-if="OverlayContent === 'login'" />
                <TimelineSearch v-else-if="OverlayContent === 'timeline-search'" />
                <TimelineForm v-else-if="OverlayContent === 'timeline-form'" />
                <NoteCreateForm v-else-if="OverlayContent === 'note-form-create'" />
                <NoteMenu v-else-if="OverlayContent === 'note-menu'" />
                <NoteToolbar v-else-if="OverlayContent === 'note-tools'" />
                <template v-else>
                    <div class="div-overlay">
                        <h2>{{ (OverlayContent as OverlayType).title }}</h2>
                        <p>{{ (OverlayContent as OverlayType).content }}</p>
                        <div class="div-actions">
                            <button
                                class="button-normal"
                                v-for="button in (OverlayContent as OverlayType).buttons"
                                :class="{ 'primary-action': button.primary }"
                                @click="button.action">
                                {{ button.name }}
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-overlay {
    padding: 5px;

    @media (max-width: 600px) {
        width: 80vw;

        h2 {
            font-size: 25px;
        }
    }

    .div-actions {
        margin-top: 10px;
        .primary-action {
            background-color: color-mix(in srgb, var(--blue-background) 50%, var(--background) 50%);
        }
    }
}

.overlay-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: var(--view-height);
    // height: 100vh;
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
            max-height: calc(var(--view-height) - 60px);
            background-color: var(--background);
            border-radius: 8px;
            padding: 10px;
            overflow-y: auto;
        }
    }
}
</style>

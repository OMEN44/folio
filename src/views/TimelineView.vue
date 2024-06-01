<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faFilter, faAdd } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
import TimelineEvent from "../components/TimelineEvent.vue";

const yearRef = ref<HTMLParagraphElement | null>();
const year = ref<number>(new Date().getFullYear());

const changeYear = (e: Event) => {
    const percent =
        (e.target as HTMLDivElement).scrollTop /
        ((e.target as HTMLDivElement).scrollHeight -
            ((e.target as HTMLDivElement).parentElement as HTMLDivElement)
                .scrollHeight);

    yearRef.value!.style.top = `calc((100% - 75px) * ${percent})`;
    // This one is funny:
    //yearRef.value!.style.left = `calc((100% - 75px) * ${percent} * ${percent} * ${percent})`;
};
</script>

<template>
    <div class="div-timeline-container">
        <div class="div-timeline-header">
            <h1>Timeline</h1>
            <div class="div-options">
                <font-awesome-icon class="option-icon" :icon="faSearch" />
                <font-awesome-icon class="option-icon" :icon="faFilter" />
                <font-awesome-icon class="option-icon" :icon="faAdd" />
            </div>
        </div>
        <div class="div-timeline">
            <p class="year" v-text="year" ref="yearRef"></p>
            <div class="div-events" @scroll="changeYear">
                <timeline-event v-for="i in 30" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-timeline-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .div-timeline-header {
        display: flex;
        flex-direction: column;
        padding: 15px 35px;

        h1 {
            font-family: kode mono;
            font-size: 50px;

            @media (max-width: 400px) {
                margin-top: 62px;
            }
        }

        .div-options {
            display: flex;
            flex-direction: row;
            height: fit-content;

            .option-icon {
                background-color: var(--blue-background);
                border-radius: 4px;
                width: 30px;
                height: 30px;
                padding: 5px;
                margin-right: 10px;
            }
        }
    }

    .div-timeline {
        border-left: 2px var(--blue) solid;
        flex: 1;
        margin: 10px 10px 25px 40px;
        position: relative;

        @media (max-width: 600px) {
            border: none;
            margin: 10px 0 5px 0;

            &::before,
            &::after {
                display: none;
            }
        }

        .div-events {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            overflow-y: scroll;
            scrollbar-width: none;
            padding: 0 5% 0 calc(5% + 40px);

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .year {
            writing-mode: vertical-lr;
            font-weight: bold;
            font-size: 20px;
            position: absolute;
            left: 0;
            top: 0%;
            background-color: var(--blue-background);
            padding: 0 2px;
            height: 75px;
            text-align: center;
            border-radius: 0 6px 6px 0;
        }

        // The positions are kinda yucky cause they are
        &::after {
            position: absolute;
            content: "";
            background-color: var(--blue);
            width: 7px;
            height: 25px;
            bottom: -5px;
            left: -7px;
            border-radius: 5px 0 5px 5px;
        }

        &::before {
            position: absolute;
            content: "";
            background-color: var(--blue);
            width: 7px;
            height: 25px;
            top: -5px;
            left: -7px;
            border-radius: 5px 5px 0 5px;
        }
    }
}
</style>

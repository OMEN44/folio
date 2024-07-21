<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { ref, watch } from "vue";
import TimelineEvent from "../components/timeline/TimelineEvent.vue";
import { TimelineData, updateTimeline, year } from "../scripts/timeline/timeline";
import { Timeline } from "../shared/Timeline";
import { AccessLevel } from "../scripts/login";
import { setOverlayContent } from "../scripts/overlay";
import { removeSearchTag, searchForm } from "../scripts/timeline/search";

updateTimeline();

watch(searchForm, () => updateTimeline(), { deep: true, immediate: true });

const yearRef = ref<HTMLParagraphElement | null>();

const changeYear = (e: Event) => {
    let percent =
        (e.target as HTMLDivElement).scrollTop /
        ((e.target as HTMLDivElement).scrollHeight -
            ((e.target as HTMLDivElement).parentElement as HTMLDivElement).scrollHeight);

    if (percent > 1) percent = 1;

    yearRef.value!.style.top = `calc((100% - 75px) * ${percent})`;
    // This one is funny:
    // yearRef.value!.style.left = `calc((100% - 75px) * ${percent} * ${percent} * ${percent})`;

    year.value =
        TimelineData.value[
            Math.round((100 * percent) / (100 / (TimelineData.value.length - 1)))
        ].date.getFullYear();
};
</script>

<template>
    <div class="div-timeline-container">
        <div class="div-timeline-header">
            <h1>Timeline</h1>
            <div class="div-options">
                <font-awesome-icon
                    v-if="AccessLevel === 0"
                    class="option-icon"
                    :icon="faAdd"
                    @click="setOverlayContent('timeline-form')" />
                <div class="div-search" @click="setOverlayContent('timeline-search')">
                    <font-awesome-icon :icon="faSearch" />
                    <p v-if="searchForm.searchTags.length === 0">Search</p>
                    <span v-for="tag in searchForm.searchTags" @click.stop="removeSearchTag(tag)">
                        <p>{{ tag }}</p>
                        <font-awesome-icon class="icon-remove" :icon="faRemove" />
                    </span>
                </div>
            </div>
        </div>
        <div class="div-timeline">
            <p class="year" v-text="year" ref="yearRef"></p>
            <div class="div-events" @scroll="changeYear">
                <timeline-event v-for="event in TimelineData" :event-data="(event as Timeline)" />
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

            @media (max-width: 600px) {
                font-size: 40px;
            }
        }

        .div-options {
            display: flex;
            flex-direction: row;
            height: fit-content;
            margin-left: -5px;

            .div-search {
                padding: 0 5px;
                background-color: var(--blue-background);
                display: flex;
                height: fit-content;
                margin: 5px;
                border-radius: 4px;
                cursor: pointer;
                flex-wrap: wrap;

                svg {
                    width: 24px;
                    height: 24px;
                    padding: 8px 3px;
                }

                p {
                    margin: auto 5px;
                    font-size: 20px;
                }

                span {
                    background-color: var(--blue-background);
                    // padding: 5px;
                    margin: 5px;
                    border-radius: 4px;
                    font-size: 18px;
                    transition: transform 0.5s;
                    display: flex;

                    &:hover {
                        transform: scale(1.05);
                    }

                    .icon-remove {
                        width: 25px;
                        height: 25px;
                        margin: auto 2px auto auto;
                        padding: 0;
                    }
                }
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

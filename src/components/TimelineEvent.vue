<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Timeline } from "../shared/Timeline";

const props = defineProps<{ eventData: Timeline }>();
console.log(props.eventData.image);
</script>

<template>
    <div class="div-event-container">
        <div class="div-header">
            <h2>{{ eventData.title }}</h2>
            <kbd>
                {{
                    eventData.date.toLocaleString("default", { month: "long" })
                }}
                {{ eventData.date.getFullYear() }}
            </kbd>
        </div>
        <div class="div-body">
            <p>
                {{ eventData.content }}
            </p>
            <img :src="eventData.image?.path" alt="" />
        </div>
        <div class="div-footer">
            <font-awesome-icon class="option-icon-small" :icon="faEdit" />
            <font-awesome-icon class="option-icon-small" :icon="faTrash" />
            <span class="tag" v-for="tag in eventData.tags">{{ tag }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-event-container {
    margin: 10px 0 40px 0;

    .div-header {
        border-bottom: 2px solid var(--blue);
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        position: relative;

        @media (max-width: 700px) {
            flex-direction: column;
            margin-bottom: 5px;
        }

        kbd {
            margin-top: auto;
            font-size: 20px;
            padding: 5px 5px 5px 15px;

            @media (max-width: 500px) {
                padding: 0 5px 5px 0;
            }
        }

        h2 {
            font-weight: bold;
            font-size: 35px;

            @media (max-width: 500px) {
                font-size: 27px;
            }
        }

        &::before,
        &::after {
            position: absolute;
            content: "";
            background-color: var(--blue);
            width: 25px;
            height: 7px;
            bottom: -7px;
        }

        &::before {
            left: -5px;
            border-radius: 5px 0 5px 5px;
        }

        &::after {
            right: -5px;
            border-radius: 0 5px 5px 5px;
        }
    }

    .div-body {
        display: flex;
        flex-direction: row;
        padding: 10px;
        font-size: 20px;
        align-items: center;

        img {
            max-width: 300px;
            height: 100%;
            margin: 10px;

            @media (max-width: 700px) {
                margin: 15px 0;
            }
        }

        @media (max-width: 700px) {
            flex-direction: column;
            font-size: 16px;
        }
    }

    .div-footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        span {
            background-color: var(--blue-background);
            border-radius: 4px;
            margin: 5px;
            padding: 3px 7px;
            text-align: center;
        }
    }
}
</style>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Spotlight } from "../shared/Spotlight";

defineProps<{ data: Spotlight }>();
// Use priority value to get data for spotlight
</script>

<template>
    <div class="div-spotlight" :class="{ divider: data.priority }">
        <div class="image-border" v-if="data.timeline?.image">
            <img :src="data.timeline?.image.path" />
        </div>
        <div class="div-content">
            <h2>
                {{ data.timeline?.title }}
                <font-awesome-icon class="option-icon-small" :icon="faLink" />
            </h2>
            <p v-text="data.timeline?.content" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-spotlight {
    margin: 40px auto;
    width: 80%;
    display: flex;
    flex-direction: row;

    @media (max-width: 700px) {
        flex-direction: column-reverse;
    }

    .image-border {
        border: 2px var(--blue) solid;
        border-radius: 10px;
        height: fit-content;
        width: fit-content;
        margin: auto 60px auto 10px;
        padding: 10px;
        background-color: var(--blue-background);

        @media (max-width: 700px) {
            margin: 20px auto 0 auto;
            max-width: 100%;
        }

        img {
            max-width: 300px;
            min-width: 100px;
            height: 100%;
            border-radius: 15px;

            @media (max-width: 700px) {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .div-content {
        p {
            font-size: 22px;
        }

        h2 {
            font-weight: 500;
        }

        .option-icon-small {
            margin: 10px 0 0 5px;
        }
    }
}

.divider {
    border-top: 2px var(--blue) solid;
    padding-top: 40px;
    position: relative;

    &::after,
    &::before {
        content: "";
        position: absolute;
        background-color: var(--blue);
        width: 20px;
        height: 7px;
    }

    &::before {
        top: -2px;
        left: -5px;
        border-radius: 5px 0 5px 5px;
    }

    &::after {
        top: -7px;
        right: -5px;
        border-radius: 5px 5px 5px 0;
    }
}
</style>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Spotlight } from "../shared/Spotlight";
import { goToLink } from "../scripts/timeline/editor";
import { addSearchTag } from "../scripts/timeline/search";
import router from "../plugins/router";

defineProps<{ data: Spotlight }>();

const searchForTag = (tag: string) => {
    addSearchTag(tag);
    router.push({ name: "timeline" });
};
</script>

<template>
    <div class="div-spotlight" :class="{ divider: data.priority }">
        <div class="image-border" v-if="data.timeline?.image">
            <img :src="data.timeline?.image.path" />
        </div>
        <div class="div-content">
            <h2>
                {{ data.timeline?.title }}
                <font-awesome-icon
                    class="option-icon-small"
                    :icon="faLink"
                    v-if="data.timeline!.note || data.timeline!.url"
                    @click="goToLink(data.timeline!)" />
            </h2>
            <p v-text="data.timeline?.content" />
            <div class="tags">
                <span
                    v-for="tag in data.timeline?.tags"
                    :key="tag"
                    class="tag"
                    @click="searchForTag(tag)">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-spotlight {
    margin: 40px auto;
    width: 80%;
    display: flex;
    flex-direction: row-reverse;

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

        .tags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .tag {
                background-color: var(--blue-background);
                border-radius: 4px;
                margin: 5px;
                padding: 3px 7px;
                text-align: center;
                cursor: pointer;
                transition: transform 0.5s;

                &:hover {
                    transform: scale(1.05);
                }
            }
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

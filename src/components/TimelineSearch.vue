<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { addSearchTag, removeSearchTag, searchForm, searchInput } from "../scripts/timeline/search";
</script>

<template>
    <form class="div-search-container" @submit.prevent="addSearchTag">
        <input type="text" placeholder="Enter a seach term" v-model="searchInput" />
        <div class="div-search-tags">
            <p class="search-hint" v-if="searchForm.searchTags.length === 0">
                Press enter to add a search term
            </p>
            <span v-for="tag in searchForm.searchTags" @click="removeSearchTag(tag)">
                {{ tag }}
                <font-awesome-icon class="icon-remove" :icon="faRemove" />
            </span>
        </div>
        <div class="div-filters">
            <div class="div-order">
                <h3>Order by:</h3>
                <div class="div-filter-input">
                    <input
                        type="radio"
                        name="order"
                        id="new-to-old"
                        value="1"
                        v-model="searchForm.orderBy"
                        checked />
                    <label for="new-to-old">Newest to oldest</label>
                </div>
                <div class="div-filter-input">
                    <input
                        type="radio"
                        name="order"
                        id="old-to-new"
                        value="2"
                        v-model="searchForm.orderBy" />
                    <label for="old-to-new">Oldest to newest</label>
                </div>
            </div>
            <div class="div-include">
                <h3>Filter:</h3>
                <div class="div-filter-input">
                    <input type="checkbox" id="has-link" v-model="searchForm.hasLink" />
                    <label for="has-link">Has link</label>
                </div>
                <div class="div-filter-input">
                    <input type="checkbox" id="has-image" v-model="searchForm.hasImage" />
                    <label for="has-image">Has image</label>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.div-search-container {
    max-width: 700px;
    width: 80vw;

    input {
        border-bottom-color: var(--blue-background);
        width: calc(100% - 10px);
        margin: 5px;
        transition: border 0.5s;
    }

    input:focus {
        border-bottom-color: var(--blue);
    }

    .div-search-tags {
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .search-hint {
            margin: auto 10px;
            opacity: 0.5;
            height: 47px;
            padding: 13px 0;
        }

        span {
            background-color: var(--blue-background);
            padding: 5px;
            margin: 5px;
            border-radius: 4px;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.5s;

            &:hover {
                transform: scale(1.05);
            }

            .icon-remove {
                margin: 0 2px;
            }
        }
    }

    .div-filters {
        display: flex;

        @media (max-width: 500px) {
            flex-direction: column;

            .div-include {
                margin-top: 10px;
            }
        }

        .div-order,
        .div-include {
            flex: 1;

            .div-filter-input {
                display: flex;

                input {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    margin: 5px;
                    border: 2px var(--blue-background) solid;
                    border-radius: 4px;
                    position: relative;

                    &:hover {
                        border: 2px var(--blue) solid;
                    }

                    &:checked::after {
                        content: "";
                        background-color: var(--blue);
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        top: 3px;
                        left: 3px;
                        border-radius: 50%;
                    }
                }

                label {
                    margin: auto 2px;
                    word-wrap: normal;
                }
            }
        }
    }
}
</style>

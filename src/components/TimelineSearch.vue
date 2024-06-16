<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <form class="div-search-container">
        <input type="text" placeholder="Enter a seach term" />
        <div class="div-search-tags">
            <span v-for="_ in 4">
                Example
                <font-awesome-icon class="icon-remove" :icon="faRemove" />
            </span>
        </div>
        <div class="div-filters">
            <div class="div-order">
                <h3>Order by:</h3>
                <div class="div-filter-input">
                    <input type="radio" name="order" id="new-to-old" value="new-to-old" checked />
                    <label for="new-to-old">Newest to oldest</label>
                </div>
                <div class="div-filter-input">
                    <input type="radio" name="order" id="old-to-new" value="old-to-new" />
                    <label for="old-to-new">Newest to oldest</label>
                </div>
                <div class="div-filter-input">
                    <input type="radio" name="order" id="other" value="other" />
                    <label for="other">other</label>
                </div>
            </div>
            <div class="div-include">
                <h3>Filter:</h3>
                <div class="div-filter-input">
                    <input type="checkbox" id="has-link" value="has-link" />
                    <label for="has-link">Has link</label>
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

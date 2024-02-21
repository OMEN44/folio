<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiFilter, mdiClose } from '@mdi/js'
import { ref } from "vue";
import { updateTimeline } from "../script/timeline";

const hideFilter = ref(true)
const searchOptions = ref({
    searchTerm: '',
    onlyLinks: false,
    newest: true,
    oldest: false
})

const cancel = () => {
    updateTimeline(searchOptions.value)
    searchOptions.value.searchTerm = '';
}

const search = () => {
    if (searchOptions.value.searchTerm === '') return
    updateTimeline(searchOptions.value)
}

const filterClick = (e) => {
    try {
        if (e.originalTarget.attributes.id.value === 'newestFirst') {
            searchOptions.value.oldest = searchOptions.value.newest
        } else if (e.originalTarget.attributes.id.value === 'oldestFirst') {
            searchOptions.value.newest = searchOptions.value.oldest
        }
        updateTimeline(searchOptions.value)
    } catch (_) { }
}
</script>

<template>
    <form class="filter" @submit="(e) => e.preventDefault()">
        <input class="input-filter" v-model="searchOptions.searchTerm" placeholder="Search Timeline" @input="search">
        <button class="button-filter" type="button" @click="cancel">
            <svg-icon class="icon icon-hover" type="mdi" :size="30" :path="mdiClose"></svg-icon>
        </button>
        <button class="button-filter" @click="hideFilter = !hideFilter" type="button">
            <svg-icon class="icon icon-hover" type="mdi" :size="30" :path="mdiFilter"></svg-icon>
        </button>
        <span class="span-bl" />
        <span class="span-tl" />
        <span class="span-br" />
        <span class="span-tr" />
        <form id="filter" @click="filterClick" class="filter-menu" v-if="!hideFilter">
            <label>
                <input id="oldestFirst" v-model="searchOptions.oldest" type="checkbox" />Oldest to newest
            </label>
            <label>
                <input id="newestFirst" v-model="searchOptions.newest" type="checkbox" />Newest to Oldest
            </label>
            <label>
                <input id="onlyLinks" v-model="searchOptions.onlyLinks" type="checkbox" />Only projects with links
            </label>
        </form>
    </form>
</template>

<style scoped>
.filter-menu {
    pointer-events: none;
    background-color: var(--accent);
    width: 250px;
    padding: 10px;
    position: absolute;
    right: -10px;
    top: 45px;
    margin: 15px;
    z-index: 10;
    border: var(--primary) solid 4px;
    display: flex;
    flex-direction: column;
}

.filter-menu input {
    pointer-events: all;
    margin-right: 10px;
    border: var(--primary) solid 2px;
}

.filter-menu:before {
    content: '';
    width: 15px;
    height: 15px;
    border: 10px solid;
    position: absolute;
    top: -24px;
    right: 3px;
    border-color: transparent transparent var(--primary) transparent;
}

.filter {
    line-height: 0.3;
    margin: 0 auto;
    display: flex;
    position: relative;
    width: 80%;
    background-color: var(--accent);
    flex-direction: row;
    justify-content: space-between;
    border: var(--primary) solid;
    border-width: 4px 0 4px 4px;
}

.input-filter {
    width: 90%;
    height: 40px;
    border: none;
    padding-left: 15px;
    font-size: 18px;
    background-color: transparent;
    color: var(--text);
}

.input-filter:focus {
    outline: none;
}

.button-filter {
    border: none;
    background-color: transparent;
}

.span-tl:before {
    content: "";
    position: absolute;
    border-width: 20px 20px 0 0;
    left: -4px;
    top: -4px;
    border-style: solid;
    border-color: var(--primary) transparent;
}

.span-tl:after {
    content: "";
    position: absolute;
    border-width: 14px 14px 0 0;
    left: -4px;
    top: -4px;
    border-style: solid;
    border-color: var(--background) transparent;
}

.span-bl:before {
    content: "";
    position: absolute;
    left: -4px;
    bottom: -4px;
    border-width: 20px 0 0 20px;
    border-style: solid;
    border-color: transparent var(--primary);
}

.span-bl:after {
    content: "";
    position: absolute;
    left: -4px;
    bottom: -4px;
    border-width: 14px 0 0 14px;
    border-style: solid;
    border-color: transparent var(--background);
}

.span-tr {
    background-color: var(--background);
    display: block;
    position: absolute;
    border: var(--primary) 4px solid;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    right: -12px;
    top: -12px;
}

.span-br {
    background-color: var(--background);
    display: block;
    position: absolute;
    border: var(--primary) 4px solid;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    right: -12px;
    bottom: -12px;
}
</style>
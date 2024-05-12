<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiMenu} from '@mdi/js'

</script>

<template>
    <div class="div-nav-container">
        <div class="div-icon">
            <svg-icon type="mdi" :path="mdiMenu" :size="40"></svg-icon>
        </div>
        <ul class="page-links">
            <li>Home</li>
            <li>Timeline</li>
            <li>Notes</li>
            <li>Other</li>
        </ul>
        <ul class="external-links">
            <li>Home</li>
            <li>Timeline</li>
            <li>Notes</li>
            <li>Other</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.div-nav-container {
    position: fixed;
    top: 0;
    right: 0;
    transition: width 0.5s ease-in-out;
    width: 62px;
    height: fit-content;
    margin: 10px;
    border: 2px var(--blue-border);
    border-style: none none solid solid;
    border-radius: 0 0 0 4px;
    background-color: var(--background);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 3;

    &:hover {
        width: 80%
    }

    .div-icon {
        text-align: center;
        padding: 7px 10px;
        svg {
            margin-bottom: -8px;
        }
    }

    ul {
        list-style-type: none;
    }

    li {
        margin: 10px 20px;
        display: inline;
    }
}
</style>
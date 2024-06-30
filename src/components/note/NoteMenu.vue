<script setup lang="ts">
import NoteDirectoryObject from "./NoteDirectoryObject.vue";
</script>

<template>
    <div class="div-menu">
        <NoteDirectoryObject />
    </div>
</template>

<style scoped lang="scss">
.div-menu {
    min-width: 150px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>

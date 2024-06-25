<script setup lang="ts">
import NoteMenuFolder from "./../note/NoteMenuFolder.vue";
</script>

<template>
    <div class="div-menu">
        <NoteMenuFolder />
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

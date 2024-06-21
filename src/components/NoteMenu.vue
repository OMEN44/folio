<script setup lang="ts">
import { ref } from "vue";
import NoteMenuFolder from "./NoteMenuFolder.vue";

const selectedIndex = ref<number>(-1);

// watch(selectedIndex, () => {
//     (document.getElementsByClassName("div-menu")[0] as HTMLDivElement).style.setProperty(
//         "--slider",
//         `calc(40px * ${selectedIndex.value} + 5px * (${selectedIndex.value} + 1))`
//     );
// });

selectedIndex.value = 0;
</script>

<template>
    <div class="div-menu">
        <NoteMenuFolder />
    </div>
</template>

<style scoped lang="scss">
.div-menu {
    min-width: 150px;
    position: relative;
    --slider: 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    // &::after {
    //     content: "";
    //     position: absolute;
    //     background-color: var(--blue);
    //     width: 4px;
    //     height: 40px;
    //     top: var(--slider);
    //     right: 0;
    //     border-radius: 10px;
    //     transition: top 0.5s;
    // }
}
</style>

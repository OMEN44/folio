<script setup lang="ts">

</script>

<template>
    <div class="overlay-container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.overlay-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
	backdrop-filter: blur(5px);
}
</style>
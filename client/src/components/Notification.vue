<script setup lang="ts">
import { ref, watch } from 'vue';
import { notificationList, remove } from '../script/notification';

const container = ref<HTMLElement | null>(null)
watch(notificationList, () => {
    if (container.value)
        container.value.scrollTop = container.value.scrollHeight
}, { deep: true })
</script>

<template>
    <div class="div-container" ref="container">
        <div class="div-message" v-for="(notification, index) in notificationList"
            :class="{ 'hide': notification.hidden, 'clear': notification.cleared }" :id="String(index)" @click="remove">
            <p>{{ notification.message }}</p>
        </div>
    </div>
</template>

<style scoped>
.div-container {
    z-index: 10;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 10px;
    bottom: 25px;
    max-height: 163px;
    overflow: hidden;
}

.div-message {
    background-color: var(--secondary);
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0;
    transition: transform 0.5s, margin 0.5s, padding 0.5s, height 0.5s, font-size 0.5s;
    width: fit-content;
}

.hide {
    transform: translateX(-130%);
}

.clear {
    margin: 0;
    padding: 0;
    height: 0;
    font-size: 0;
}

p {
    pointer-events: none;
}
</style>
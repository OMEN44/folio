<script setup lang="ts">
import { Notifications, removeNotification } from "../scripts/notification";
</script>

<template>
    <div class="notification-container">
        <div
            class="notification"
            v-for="(notification, index) in Notifications"
            :class="{ hide: notification.hidden, clear: notification.cleared }"
            @click="removeNotification(index)">
            <p>{{ notification.message }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.notification-container {
    position: absolute;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    padding-top: auto;

    // background-color: gray;

    bottom: 25px;
    right: 0;
    z-index: 50;

    .notification {
        transition: all 0.5s;
        overflow: hidden;
        background-color: var(--background);
        border: 2px var(--blue-background) solid;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 10px 25px 0 auto;
        width: fit-content;
        cursor: pointer;
    }

    .hide {
        transform: translateX(200%);
    }

    .clear {
        margin: 0 0 0 auto;
        padding: 0;
        height: 0;
        font-size: 0;
        border-width: 0;
    }
}
</style>

<script setup lang="ts">
defineProps<{
    title: string;
    titleLocation?: string;
}>();
</script>

<template>
    <div
        class="div-text-box-container"
        :class="titleLocation ? titleLocation : 'left'"
    >
        <div class="div-header">
            <h1>{{ title }}</h1>
        </div>
        <div class="div-body">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-text-box-container {
    margin: 20px 5%;
    display: flex;
    flex-direction: column;

    .div-header {
        position: relative;
        background-color: var(--background);
        margin-bottom: -3px;
        z-index: 3;
    }

    .div-body {
        border: 2px var(--blue) solid;
        border-radius: 5px;
        padding: 10px;
    }
}

.left {
    align-items: flex-start;
    .div-header {
        border: var(--blue) 2px;
        border-style: solid none none solid;
        border-radius: 5px 0 0 0;
        padding: 5px 25px 5px 15px;

        ::before {
            content: "";
            position: absolute;
            right: -5px;
            top: -2px;
            background-color: var(--blue);
            height: 6px;
            width: 17px;
            border-radius: 4px 0 4px 4px;
        }

        ::after {
            content: "";
            position: absolute;
            bottom: -3px;
            right: -5px;
            background-color: var(--blue);
            height: 6px;
            width: 17px;
            border-radius: 0 4px 4px 4px;
        }
    }
}

.right {
    align-items: flex-end;
    .div-header {
        border: var(--blue) 2px;
        border-style: solid solid none none;
        border-radius: 0 5px 0 0;
        padding: 5px 15px 5px 25px;

        ::before {
            content: "";
            position: absolute;
            left: -5px;
            top: -2px;
            background-color: var(--blue);
            height: 6px;
            width: 17px;
            border-radius: 4px 0 4px 4px;
        }

        ::after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: -5px;
            background-color: var(--blue);
            height: 6px;
            width: 17px;
            border-radius: 0 4px 4px 4px;
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { OverlayType } from '../script/overlay';

const emits = defineEmits(['result'])

const isHidden = ref<boolean>(true)
const config = ref<OverlayType | null>(null)

const escape = (e?) => {
    if (e.target.classList[0] !== 'div-overlay') return
    config.value = null
}

const executeAction = (e) => {
    emits('result', config.value.buttons[Number(e.target.id)].action(e))
}

const openOverlay = (configData: OverlayType) => {
    isHidden.value = false
    config.value = configData
}

const closeOverlay = () => {
    isHidden.value = true
    config.value = null
}

defineExpose({ openOverlay, closeOverlay })

</script>

<template>
    <div v-if="!isHidden && config !== undefined && config !== null" class="div-overlay" @click="escape">
        <div class="div-content">
            <span class="circle tl"></span>
            <span class="circle tr"></span>
            <span class="circle bl"></span>
            <span class="circle br"></span>
            <h2>{{ config.title }}</h2>
            <p>{{ config.content }}</p>
            <div class="div-options">
                <button class="button-border" v-for="(option, index) in config.buttons" :class="{ primary: option.primary }"
                    @click="executeAction" :id="String(index)">
                    {{ option.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.div-overlay {
    background-color: var(--background-transparent);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
}

.div-content {
    z-index: 12;
    width: 200px;
    height: fit-content;
    display: fixed;
    margin-left: calc(50% - 200px);
    margin-top: calc(100vh / 2 - 100px);
    width: 400px;
    background-color: var(--accent);
    border: 4px var(--primary);
    border-style: solid none;
    position: relative;
    padding: 20px;
}

.primary {
    background-color: var(--primary);
}

button {
    background-color: var(--secondary);
}

.div-options {
    margin: 10px 0 0 0;
}

/* Circle positons */
.tl {
    top: -12px;
    left: -10px;
}

.tr {
    top: -12px;
    right: -10px;
}

.bl {
    bottom: -12px;
    left: -10px;
}

.br {
    bottom: -12px;
    right: -10px;
}
</style>
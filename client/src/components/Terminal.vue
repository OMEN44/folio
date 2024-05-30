<script setup lang="ts">
import { commandInput, commandHandler, loadTerminal, Outputs, Prefix, showTerminal } from '../scripts/terminal';
</script>

<template>
<div class="div-terminal-container" v-if="showTerminal" @click="showTerminal = false">
    <div class="div-terminal" @click="(e) => {commandInput?.focus(); e.stopPropagation()}">
        <p class="output" v-for="output in Outputs">
            <span v-if="output[0]"><span class="dark-blue" v-text="Prefix[0]"/>:<span class="blue" v-text="output[0]"/>$</span> {{ output[1] }}
        </p>
        <div class="div-input" @keydown="commandHandler">
            <p><span v-for="(term, index) in Prefix" :class="{'dark-blue': index === 0, blue: index == 2}" v-text="term"/></p>
            <input autofocus type="text" ref="commandInput" @focus="loadTerminal($route.fullPath)">
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.blue {
    color: var(--blue-alt);
}

.dark-blue {
    color: var(--blue-border);
}

.div-terminal-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
	backdrop-filter: blur(5px);

    p {
        font-family: ubuntu mono;
    }

    span {
        font-family: ubuntu mono;
    }

    .div-terminal {
        position: inherit;
        background-color: var(--background);
        border: 2px var(--blue-border) solid;
        border-radius: 8px;
        width: 80%;
        height: 80%;
        margin: 5% 0 0 10%;
        font-family: ubuntu mono;
        font-size: 20px;
        padding: 15px;
        overflow-y: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        .div-input {
            display: flex;
            flex-direction: row;

            input {
                flex: 1;
                color: var(--text);
                background-color: transparent;
                font-size: 20px;
                border: none;
                margin-left: 9px;
            }
        }
    }
}
</style>
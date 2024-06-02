<script setup lang="ts">
import {
    commandInput,
    commandHandler,
    loadTerminal,
    Outputs,
    Prefix,
    showTerminal,
} from "../scripts/terminal";
</script>

<template>
    <div
        class="div-terminal-container"
        v-if="showTerminal"
        @click="showTerminal = false"
    >
        <div class="div-terminal-border">
            <div
                class="div-terminal"
                @click="
                    (e) => {
                        commandInput?.focus();
                        e.stopPropagation();
                    }
                "
            >
                <p class="output" v-for="output in Outputs">
                    <span v-if="output[0]"
                        ><span class="dark-blue" v-text="Prefix[0]" />:<span
                            class="blue"
                            v-text="output[0]"
                        />$</span
                    >
                    {{ output[1] }}
                </p>
                <div class="div-input" @keydown="commandHandler">
                    <p>
                        <span
                            v-for="(term, index) in Prefix"
                            :class="{
                                'dark-blue': index === 0,
                                blue: index == 2,
                            }"
                            v-text="term"
                        />
                    </p>
                    <input
                        autofocus
                        type="text"
                        ref="commandInput"
                        @focus="loadTerminal($route.fullPath)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.blue {
    color: var(--blue-alt);
}

.dark-blue {
    color: var(--blue);
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
        overflow-wrap: break-word;
    }

    span {
        font-family: ubuntu mono;
    }

    .div-terminal-border {
        position: inherit;
        border: 2px var(--blue) solid;
        border-radius: 8px;
        width: 80%;
        height: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--blue-background);
        padding: 10px;

        .div-terminal {
            background-color: var(--background);
            font-family: ubuntu mono;
            font-size: 20px;
            padding: 15px;
            overflow-y: scroll;
            overflow-x: hidden;
            scrollbar-width: none;
            border-radius: 8px;
            height: 100%;
            width: 100%;

            @media (max-width: 700px) {
                margin: 10px 0 0 10px;
                height: 60%;
                width: calc(100vw - 20px);
                font-size: 16px;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            .div-input {
                display: flex;
                flex-direction: row;

                @media (max-width: 700px) {
                    width: calc(100vw - 20px - 30px);
                }

                input {
                    flex: 1;
                    color: var(--text);
                    background-color: transparent;
                    font-size: 20px;
                    border: none;
                    margin-left: 9px;
                    width: 100%;

                    @media (max-width: 700px) {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>

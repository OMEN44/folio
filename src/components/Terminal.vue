<script setup lang="ts">
import { adviceCommand, jokeCommand } from "../scripts/commands/adviceCommand";
import {
    cdCommand,
    editPermCommand,
    exitCommand,
    helpCommand,
    logoutCommand,
    lsCommand,
    spotlightCommand,
    testCommand,
    themeCommand,
    whoamiCommand,
} from "../scripts/commands/systemCommands";
import { formatString, outputToHTML, prefixToString } from "../scripts/commands/Command";
import {
    commandInput,
    commandHandler,
    Outputs,
    prefix,
    showTerminal,
    loadCommands,
} from "../scripts/terminal";
import { onMounted } from "vue";

loadCommands([
    cdCommand,
    testCommand,
    adviceCommand,
    exitCommand,
    lsCommand,
    themeCommand,
    spotlightCommand,
    whoamiCommand,
    logoutCommand,
    jokeCommand,
    editPermCommand,
    helpCommand,
]);

onMounted(() => {
    prefix.value.directory = window.location.pathname;
});
</script>

<template>
    <div class="div-terminal-container" v-if="showTerminal" @click="showTerminal = false">
        <div class="div-terminal-border">
            <div class="div-terminal" @click.stop="commandInput?.focus()">
                <p
                    class="output"
                    v-for="output in Outputs"
                    v-html="outputToHTML(output)"
                    @click.stop></p>
                <div class="div-input" @keydown="commandHandler">
                    <p v-html="formatString(prefixToString(prefix))"></p>
                    <input
                        autofocus
                        autocorrect="off"
                        spellcheck="false"
                        autocapitalize="off"
                        type="text"
                        ref="commandInput" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-terminal-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: var(--view-height);
    // height: 100vh;
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

        @media (max-width: 700px) {
            height: calc(95% - 20px);
            width: 95%;
            transform: translate(-50%);
            top: 20px;
        }

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
            cursor: text;

            @media (max-width: 700px) {
                font-size: 16px;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            .output {
                width: fit-content;
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
                    padding: 1px 2px;
                    border-radius: 0;

                    @media (max-width: 700px) {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>

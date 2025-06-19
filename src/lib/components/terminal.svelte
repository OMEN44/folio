<script lang="ts">
    import { ping, pong } from "$lib/scripts/commands/system";
    import {
        commandHandler,
        commandHistory,
        getActivePrefix,
        loadCommands,
    } from "$lib/scripts/terminal.svelte";

    loadCommands([pong, ping]);

    let input = $state<HTMLInputElement | null>(null);

    const focusInput = () => {
        if (input) {
            input.focus();
            input.select();
        }
    };
</script>

<div class="terminal-container">
    <div class="terminal" tabindex="0" role="button" onclick={focusInput} onkeydown={() => {}}>
        <div class="command-output">
            {#each commandHistory as command}
                <p>{command}</p>
            {/each}
        </div>
        <form class="command-input">
            {@html getActivePrefix(true) + "&nbsp;"}
            <input
                type="text"
                onkeydown={commandHandler}
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
            />
        </form>
    </div>
</div>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    :global(.primary, .secondary) {
        font-family: monospace;
        font-size: 16px;
    }

    :global(.primary) {
        color: var.$primary;
    }

    :global(.secondary) {
        color: var.$primary-a;
    }

    .terminal-container {
        margin: var.$gap;
        padding: 0 var.$gap;
        border-radius: 8px;
        background-color: var.$primary-b;

        height: 0px; // Without a height, the flex container will not expand
        flex: auto;

        .terminal {
            // border: var.$b-thickness solid var.$primary;
            // padding: 0 var.$gap;
            // border-radius: var.$b-radius;
            // background-color: var.$background;

            height: 100%;
            font-family: monospace;
            display: flex;
            flex-direction: column;

            * {
                font-size: 16px;
            }

            .command-output {
                flex: 1;
                overflow-y: auto;
            }

            .command-input {
                height: 30px;
                width: 100%;
                display: flex;
                flex-direction: row;

                input {
                    width: 0;
                    flex: 1;
                    background-color: transparent;
                    border: none;
                    // border: 2px solid red;
                    font-family: monospace;
                    outline: none;
                    margin: 0 0 6px -4px;

                    &::placeholder {
                        color: var.$text;
                        opacity: 0.5;
                    }
                }
            }
        }
    }
</style>

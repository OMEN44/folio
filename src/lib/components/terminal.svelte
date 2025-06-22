<script lang="ts">
    import { ping, pong } from "$lib/scripts/commands/system";
    import { theme } from "$lib/scripts/commands/theme";
    import {
        commandHandler,
        commandHistory,
        getActivePrefix,
        loadCommands,
        parseCommandOutput,
    } from "$lib/scripts/terminal.svelte";
    import { onMount } from "svelte";

    loadCommands([pong, ping, theme]);

    let input = $state<HTMLInputElement | null>(null);
    let focused = $state(false);

    const focusInput = () => {
        if (input) {
            input.focus();
            input.select();
        }
    };

    export const stop = (event: Event) => {
        event.stopPropagation();
    };

    onMount(() => {
        if (input) {
            input.addEventListener("focus", () => {
                focused = true;
            });
            // unfocuse event handler got annoying, so commented out
            // input.addEventListener("blur", () => {
            //     focused = false;
            // });
        }
    });
</script>

<div class="terminal-container">
    <div
        class="terminal"
        class:focused
        tabindex="0"
        role="button"
        onclick={focusInput}
        onkeydown={() => {}}
    >
        <div class="command-output" class:focused>
            {#each commandHistory as command}
                <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
                <p onclick={stop}>{@html parseCommandOutput(command)}</p>
            {/each}
        </div>
        <form class="command-input">
            {@html getActivePrefix(true) + "&nbsp;"}
            <input
                bind:this={input}
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
        height: 0px; // Without a height, the flex container will not expand
        flex: auto;
        padding-bottom: var.$gap;

        // .terminal .focused {
        //     // background-color: blue !important;
        //     height: fit-content;
        // }

        .terminal {
            margin: var.$gap;
            padding: 4px var.$gap 0 var.$gap;
            border-radius: 8px;
            background-color: var.$primary-a;

            height: fit-content;
            font-family: monospace;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease-out;

            &.focused {
                height: 100%;
            }

            * {
                font-size: 16px;
            }

            .command-output {
                transition: all 0.3s ease-out;
                flex: none;
                height: 0px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    display: none;
                }

                &.focused {
                    flex: 1;
                }
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

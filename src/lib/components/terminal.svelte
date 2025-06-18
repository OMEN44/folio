<script lang="ts">
    let commandHistory = $state<string[]>([]);

    for (let i = 0; i < 10; i++) {
        commandHistory.push(`Command ${i + 1}`);
    }
</script>

<div class="terminal-container">
    <div class="command-output">
        {#each commandHistory as command}
            <p>{command}</p>
            <p>{command}</p>
        {/each}
    </div>
    <div class="command-input">
        <p>guest@huon.dev:~$&nbsp;</p>
        <input
            type="text"
            onclick={() => {
                commandHistory.push("toot");
            }}
        />
    </div>
</div>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .terminal-container {
        padding: 0 var.$gap;
        height: 0px; // Without a height, the flex container will not expand
        flex: auto;
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
                margin: 0 0 6px 0;

                &::placeholder {
                    color: var.$text;
                    opacity: 0.5;
                }
            }
        }
    }
</style>
